"use client";

import { FormEvent, useRef, useState } from "react";
import Button from "./Button";
import type { ColorEntry } from "./ColorEntryTile";
import { supabase } from "@/lib/supabase";

type FormEntry = Omit<ColorEntry, "id">;

// Helper function to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Helper function to convert Hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 50, l: 50 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function EntryForm({ onSubmit }: { onSubmit: (entry: FormEntry) => void }) {
  const [colorHex, setColorHex] = useState("#2E7D32");
  const [hue, setHue] = useState(hexToHsl("#2E7D32").h);
  const [saturation, setSaturation] = useState(hexToHsl("#2E7D32").s);
  const [lightness, setLightness] = useState(hexToHsl("#2E7D32").l);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const colorNameRef = useRef<HTMLInputElement | null>(null);
  const yearMetRef = useRef<HTMLSelectElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function updateColorFromHSL(h: number, s: number, l: number) {
    setHue(h);
    setSaturation(s);
    setLightness(l);
    setColorHex(hslToHex(h, s, l));
  }

  function handleHexChange(hex: string) {
    setColorHex(hex);
    const hsl = hexToHsl(hex);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    // Create preview URL for display
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsUploading(true);

    const submitter = nameRef.current?.value.trim() || "Anonymous";
    const colorName = colorNameRef.current?.value.trim() || "Untitled color";
    const yearMet = yearMetRef.current?.value || "2000";
    const message = messageRef.current?.value.trim() || "";

    let photoUrl = "";

    // Upload photo to Supabase Storage if one was selected
    if (photoFile) {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, photoFile);

      if (uploadError) {
        console.error('Error uploading photo:', uploadError);
        alert('Failed to upload photo. Please try again.');
        setIsUploading(false);
        return;
      }

      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    onSubmit({ submitter, colorHex, colorName, yearMet, message, photoUrl });

    // Reset form
    if (colorNameRef.current) colorNameRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPhotoFile(null);
    setPhotoPreview("");
    setIsUploading(false);
  }

  return (
    <form className="space-y-3 text-xs" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block opacity-80">Your name</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="e.g. Alex"
            className="w-full rounded-md bg-transparent border-2 border-slate-600 dark:border-white/20 px-2 py-1.5 outline-none focus:border-cyan-400 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block opacity-80">Year you met Julia</label>
          <select
            ref={yearMetRef}
            className="w-full rounded-md bg-transparent border-2 border-slate-600 dark:border-white/20 px-2 py-1.5 outline-none focus:border-cyan-400 transition-colors text-slate-900 dark:text-white"
            defaultValue="2000"
          >
            {Array.from({ length: 2025 - 1985 + 1 }, (_, i) => 2025 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block opacity-80">Color name</label>
        <input
          ref={colorNameRef}
          type="text"
          placeholder="e.g. Ocean Blue, Sunset Gold"
          className="w-full rounded-md bg-transparent border-2 border-slate-600 dark:border-white/20 px-2 py-1.5 outline-none focus:border-cyan-400 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Enhanced Color Picker */}
      <div className="space-y-3 p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10">
        <label className="block opacity-80 text-xs sm:text-sm font-medium">Choose your color</label>

        {/* Large Color Preview */}
        <div className="flex items-center gap-3">
          <div
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg border-2 border-slate-300 dark:border-white/20 shadow-lg flex-shrink-0"
            style={{ background: colorHex }}
          />
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={colorHex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-full rounded-md bg-transparent border-2 border-slate-600 dark:border-white/20 px-2 sm:px-3 py-1.5 sm:py-2 outline-none focus:border-cyan-400 transition-colors font-mono text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Hue Slider */}
        <div className="space-y-2">
          <label className="text-xs opacity-70">Hue</label>
          <div className="relative h-8 rounded-lg overflow-hidden" style={{
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
          }}>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => updateColorFromHSL(Number(e.target.value), saturation, lightness)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-10 bg-white border-2 border-slate-900 rounded-full pointer-events-none shadow-lg"
              style={{ left: `${(hue / 360) * 100}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </div>

        {/* Saturation Slider */}
        <div className="space-y-2">
          <label className="text-xs opacity-70">Saturation</label>
          <div className="relative h-6 rounded-lg overflow-hidden border border-slate-300 dark:border-white/20" style={{
            background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`
          }}>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => updateColorFromHSL(hue, Number(e.target.value), lightness)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-white border-2 border-slate-900 rounded-full pointer-events-none shadow-lg"
              style={{ left: `${saturation}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </div>

        {/* Lightness Slider */}
        <div className="space-y-2">
          <label className="text-xs opacity-70">Lightness</label>
          <div className="relative h-6 rounded-lg overflow-hidden border border-slate-300 dark:border-white/20" style={{
            background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`
          }}>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => updateColorFromHSL(hue, saturation, Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-white border-2 border-slate-900 rounded-full pointer-events-none shadow-lg"
              style={{ left: `${lightness}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block opacity-80">Photo (optional)</label>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-[11px] file:mr-2 file:rounded-md file:border-0 file:bg-cyan-500/80 file:px-2 file:py-1 file:text-xs file:font-medium file:text-white hover:file:bg-cyan-400 file:cursor-pointer"
          />
          {photoPreview && (
            <span className="opacity-70 text-[11px] text-green-400">
              Photo selected
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block opacity-80">Birthday message</label>
        <textarea
          ref={messageRef}
          rows={3}
          placeholder="Share why this color represents Julia to you..."
          className="w-full rounded-md bg-transparent border-2 border-slate-600 dark:border-white/20 px-2 py-1.5 outline-none focus:border-cyan-400 resize-none transition-colors text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="flex justify-end pt-1">
        <Button type="submit" size="sm" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Add to wall"}
        </Button>
      </div>
    </form>
  );
}
