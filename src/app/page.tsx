"use client";

import { useCallback, useState } from "react";
import { AlertCircle, Copy, Dices, Sparkles, Trash2 } from "lucide-react";
import { PlayerInput } from "@/components/PlayerInput";
import { ResultCard } from "@/components/ResultCard";
import { TeamInput } from "@/components/TeamInput";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toast } from "@/components/Toast";
import { usePersistedLists } from "@/hooks/usePersistedLists";
import type { DrawPair } from "@/types";
import { performDraw } from "@/utils/draw";
import { formatCopyText } from "@/utils/formatResult";
import { parseLines } from "@/utils/parseLines";

export default function Home() {
  const {
    teamsText,
    setTeamsText,
    playersText,
    setPlayersText,
    clearLists,
    hydrated,
  } = usePersistedLists();

  const [results, setResults] = useState<DrawPair[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const runDraw = useCallback(() => {
    setError(null);
    const teams = parseLines(teamsText);
    const players = parseLines(playersText);

    if (teams.length === 0 || players.length === 0) {
      setError("Informe ao menos um time e um jogador.");
      return;
    }

    if (players.length > teams.length) {
      setError(
        "Quantidade de jogadores não pode ser maior que quantidade de times",
      );
      return;
    }

    setResults(performDraw(teams, players, results));
  }, [teamsText, playersText, results]);

  const handleClear = useCallback(() => {
    clearLists();
    setResults([]);
    setError(null);
  }, [clearLists]);

  const handleCopy = useCallback(async () => {
    if (results.length === 0) return;
    try {
      await navigator.clipboard.writeText(formatCopyText(results));
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 2500);
    } catch {
      setError("Não foi possível copiar o resultado.");
    }
  }, [results]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/15" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Sorteio justo e rápido
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Sorteio de Times
            </h1>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-400">
              Cole a lista de times e jogadores para realizar o sorteio
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TeamInput value={teamsText} onChange={setTeamsText} />
          <PlayerInput value={playersText} onChange={setPlayersText} />
        </div>

        {error && (
          <div
            role="alert"
            className="animate-fade-in mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={runDraw}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]"
          >
            <Dices className="h-5 w-5" />
            Sortear
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Trash2 className="h-5 w-5" />
            Limpar
          </button>
        </div>

        {results.length > 0 && (
          <section className="animate-fade-in space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Resultado do Sorteio
              </h2>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
              >
                <Copy className="h-4 w-4" />
                Copiar resultado
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/60">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((pair, index) => (
                  <ResultCard
                    key={`${index}-${pair.player}`}
                    pair={pair}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Toast message="Resultado copiado" visible={toastVisible} />
    </div>
  );
}
