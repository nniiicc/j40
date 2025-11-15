"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";
import EntryForm from "@/components/EntryForm";
import ColorEntryTile, { ColorEntry } from "@/components/ColorEntryTile";
import { supabase, DbColorEntry } from "@/lib/supabase";

export default function HomePage() {
  const [entries, setEntries] = useState<ColorEntry[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("none");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch entries from Supabase on mount
  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from('color_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
      } else if (data) {
        // Transform database format to app format
        const transformed: ColorEntry[] = data.map((entry: DbColorEntry) => ({
          id: entry.id,
          submitter: entry.submitter,
          colorHex: entry.color_hex,
          colorName: entry.color_name,
          yearMet: entry.year_met,
          message: entry.message,
          photoUrl: entry.photo_url,
        }));
        setEntries(transformed);
      }
      setIsLoading(false);
    }

    fetchEntries();
  }, []);

  const sorted = useMemo(() => {
    if (sortOrder === "none") return entries;

    return [...entries].sort((a, b) => {
      const yearA = Number(a.yearMet);
      const yearB = Number(b.yearMet);

      if (sortOrder === "asc") {
        return yearA - yearB; // Oldest first
      } else {
        return yearB - yearA; // Newest first
      }
    });
  }, [entries, sortOrder]);

  async function handleSubmit(entry: Omit<ColorEntry, "id">) {
    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('color_entries')
      .insert({
        submitter: entry.submitter,
        color_hex: entry.colorHex,
        color_name: entry.colorName,
        year_met: entry.yearMet,
        message: entry.message,
        photo_url: entry.photoUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting entry:', error);
      alert('Failed to save entry. Please try again.');
    } else if (data) {
      // Add to local state immediately
      const newEntry: ColorEntry = {
        id: data.id,
        submitter: data.submitter,
        colorHex: data.color_hex,
        colorName: data.color_name,
        yearMet: data.year_met,
        message: data.message,
        photoUrl: data.photo_url,
      };
      setEntries(prev => [newEntry, ...prev]);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <Container>
          <div className="space-y-12">
            {/* Hero + Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-start">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] opacity-60 mb-3"></p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                    What color is {" "}
                    <span className="text-cyan-400">Lowd?</span>
                  </h1>
                  <p className="text-sm sm:text-base opacity-80 leading-relaxed mt-3 sm:mt-4">
                    Choose a color that represents your particular experience of Julia and add a birthday message. Scroll down to see how much we agree on the answer, or add a photo that inspired your choice. You can sort results by year to see whether people who met Julia at different times in her life chose different colors.
                  </p>
                  <div className="mt-4">
                    <Link href="/about">
                      <Button variant="primary" size="sm">
                        About
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <Card>
                <h2 className="text-sm font-semibold mb-2 uppercase tracking-wide opacity-80">Add your color</h2>
                <p className="text-xs opacity-70 mb-4"></p>
                <EntryForm onSubmit={handleSubmit} />
                {isSubmitting && (
                  <p className="text-xs text-cyan-400 mt-2">Saving...</p>
                )}
              </Card>
            </div>

            {/* Color Wall Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl sm:text-2xl font-bold">What color is Lowd?</h2>
                    <div className="inline-flex items-center gap-2 text-xs opacity-70 bg-white/5 rounded-full px-3 py-1">
                      <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>{entries.length} submitted</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm opacity-70">
                    Click any tile to read the birthday message
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <label className="opacity-70">Sort by year:</label>
                  <select
                    className="bg-white/5 border border-white/15 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm outline-none focus:border-cyan-400/70 transition-colors"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="none">Default</option>
                    <option value="asc">Oldest first</option>
                    <option value="desc">Newest first</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12 opacity-70">
                  <p>Loading colors...</p>
                </div>
              ) : sorted.length === 0 ? (
                <div className="text-center py-12 opacity-70">
                  <p>No colors yet. Be the first to add one!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {sorted.map(entry => (
                    <ColorEntryTile key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-white/10 py-6">
        <Container>
          <p className="text-xs opacity-50 text-center">
            Made with love for Julia's 40th
          </p>
        </Container>
      </footer>
    </div>
  );
}
