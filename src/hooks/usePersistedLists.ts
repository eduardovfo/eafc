"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PLAYERS, DEFAULT_TEAMS } from "@/constants/defaultLists";
import type { PersistedLists } from "@/types";

const STORAGE_KEY = "sorteio-times-lists";

const defaultLists: PersistedLists = {
  teams: DEFAULT_TEAMS,
  players: DEFAULT_PLAYERS,
};

export function usePersistedLists() {
  const [teamsText, setTeamsText] = useState("");
  const [playersText, setPlayersText] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedLists;
        setTeamsText(parsed.teams?.trim() ? parsed.teams : defaultLists.teams);
        setPlayersText(
          parsed.players?.trim() ? parsed.players : defaultLists.players,
        );
      } else {
        setTeamsText(defaultLists.teams);
        setPlayersText(defaultLists.players);
      }
    } catch {
      setTeamsText(defaultLists.teams);
      setPlayersText(defaultLists.players);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const data: PersistedLists = { teams: teamsText, players: playersText };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [teamsText, playersText, hydrated]);

  const clearLists = useCallback(() => {
    setTeamsText(defaultLists.teams);
    setPlayersText(defaultLists.players);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLists));
  }, []);

  return {
    teamsText,
    setTeamsText,
    playersText,
    setPlayersText,
    clearLists,
    hydrated,
  };
}
