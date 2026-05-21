"use client";

import { User } from "lucide-react";
import { TeamBadge } from "@/components/TeamBadge";
import type { DrawPair } from "@/types";

interface ResultCardProps {
  pair: DrawPair;
  index: number;
}

export function ResultCard({ pair, index }: ResultCardProps) {
  return (
    <article
      className="animate-fade-in-up flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-700/80 dark:from-slate-900 dark:to-slate-800/80 dark:hover:border-indigo-500/40"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-3">
        <TeamBadge teamName={pair.team} size={48} />
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
          {pair.team}
        </p>
      </div>
      <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-slate-600 dark:border-slate-700 dark:text-slate-300">
        <User className="h-4 w-4 shrink-0 text-indigo-500" aria-hidden />
        <p className="text-base font-medium">{pair.player}</p>
      </div>
    </article>
  );
}
