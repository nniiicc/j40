import { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white/80 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg backdrop-blur-sm transition-colors ${className}`}>
      {children}
    </div>
  );
}
