"use client";

import { Shield } from "lucide-react";
import { DEFAULT_TEAMS } from "@/constants/defaultLists";

interface TeamInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TeamInput({ value, onChange }: TeamInputProps) {
  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/90">
      <header className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
          <Shield className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Times
        </h2>
      </header>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={DEFAULT_TEAMS}
        rows={12}
        className="min-h-[220px] w-full flex-1 resize-y rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/30"
        spellCheck={false}
      />
    </section>
  );
}
