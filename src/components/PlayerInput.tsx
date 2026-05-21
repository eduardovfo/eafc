"use client";

import { Users } from "lucide-react";
import { DEFAULT_PLAYERS } from "@/constants/defaultLists";

interface PlayerInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PlayerInput({ value, onChange }: PlayerInputProps) {
  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/90">
      <header className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          <Users className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Jogadores
        </h2>
      </header>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={DEFAULT_PLAYERS}
        rows={12}
        className="min-h-[220px] w-full flex-1 resize-y rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 transition-colors duration-200 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/30 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/30"
        spellCheck={false}
      />
    </section>
  );
}
