"use client";

import Image from "next/image";
import { useState } from "react";

export type ColorEntry = {
  id: number;
  photoUrl: string;
  colorHex: string;
  colorName: string;
  submitter: string;
  yearMet: string;
  message: string;
};

export default function ColorEntryTile({ entry }: { entry: ColorEntry }) {
  const [open, setOpen] = useState(false);

  // Check if photo is provided (not empty string)
  const hasPhoto = entry.photoUrl && entry.photoUrl.length > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(v => !v)}
      className="group w-full text-left overflow-hidden rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-xl transition-all shadow-md"
      aria-expanded={open}
    >
      {/* Conditional layout: show both photo and color if photo exists, otherwise just color */}
      {hasPhoto ? (
        <div className="grid grid-cols-2">
          {/* Photo */}
          <div className="aspect-square relative bg-slate-200 dark:bg-slate-800">
            <Image
              src={entry.photoUrl}
              alt={entry.colorName}
              fill
              className="object-cover"
            />
          </div>

          {/* Color Swatch - Pantone Style */}
          <div
            className="relative aspect-square"
            style={{ background: entry.colorHex }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-white px-3 py-2">
              <div className="flex items-end justify-between">
                <h3 className="text-sm font-bold text-black leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {entry.colorName}
                </h3>
                <p className="text-xs text-black font-normal leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {entry.colorHex.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Just Color Swatch - Full Width (aspect-[2/1] to match 2-column grid height) */
        <div
          className="relative aspect-[2/1]"
          style={{ background: entry.colorHex }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-white px-3 py-2">
            <div className="flex items-end justify-between">
              <h3 className="text-sm font-bold text-black leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {entry.colorName}
              </h3>
              <p className="text-xs text-black font-normal leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {entry.colorHex.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Details - Full Width Below */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-600 dark:text-slate-400">Met in {entry.yearMet}</span>
          <span className="text-slate-500 dark:text-slate-500">by <span className="font-semibold text-cyan-600 dark:text-cyan-400">{entry.submitter}</span></span>
        </div>

        {/* Message (expandable) - Spans Full Width */}
        <div
          className={`text-sm leading-relaxed text-slate-700 dark:text-slate-300 transition-all duration-300 ${
            open ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <p>{entry.message}</p>
        </div>

        {/* Toggle hint */}
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-600">
            {open ? "▲ Hide" : "▼ Read message"}
          </span>
        </div>
      </div>
    </button>
  );
}
