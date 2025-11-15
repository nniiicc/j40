"use client";

import Link from "next/link";
import Container from "./Container";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <Container className="py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="text-xs sm:text-sm uppercase tracking-[0.2em] opacity-70 hover:opacity-100 transition-opacity">
          J40
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="text-[11px] sm:text-xs opacity-70 hover:opacity-100 transition-opacity">
            Colors
          </Link>
          <Link href="/about" className="text-[11px] sm:text-xs opacity-70 hover:opacity-100 transition-opacity">
            About
          </Link>
        </nav>
      </Container>
    </header>
  );
}
