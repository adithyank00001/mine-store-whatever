"use client";

import { useEffect, useState } from "react";

const OFFER_TIMER_KEY = "store-offer-timer-v13";
const OFFER_START_MS = (44 * 60 + 28) * 1000;
const OFFER_SOFT_FLOOR_MS = 3 * 60 * 1000;
const OFFER_SOFT_RESET_MS = (28 * 60 + 58) * 1000;
const OFFER_MIDNIGHT_RESET_IF_UNDER_MS = 10 * 60 * 1000;

const OFFER_SOFT_RESET_SAFE_MS =
  OFFER_SOFT_RESET_MS > OFFER_SOFT_FLOOR_MS
    ? OFFER_SOFT_RESET_MS
    : OFFER_SOFT_FLOOR_MS + 60_000;

type OfferTimerState = {
  deadlineMs: number;
  dayKey: string;
};

let memoryOfferTimer: OfferTimerState | null = null;

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

export function formatCountdown(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

function localDayKey(now = Date.now()) {
  const d = new Date(now);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function isValidDayKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function readOfferTimerState(): OfferTimerState | null {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(OFFER_TIMER_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OfferTimerState>;
      if (
        typeof parsed.deadlineMs === "number" &&
        Number.isFinite(parsed.deadlineMs) &&
        parsed.deadlineMs > 0 &&
        isValidDayKey(parsed.dayKey)
      ) {
        const state = {
          deadlineMs: parsed.deadlineMs,
          dayKey: parsed.dayKey,
        };
        memoryOfferTimer = state;
        return state;
      }
    }
  } catch {
    // Quota / private mode
  }
  return memoryOfferTimer;
}

function writeOfferTimerState(state: OfferTimerState) {
  memoryOfferTimer = state;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(OFFER_TIMER_KEY, JSON.stringify(state));
    }
  } catch {
    // Quota / private mode
  }
}

function resolveOfferTimer(now = Date.now()): {
  deadlineMs: number;
  remainingSeconds: number;
} {
  const today = localDayKey(now);
  const existing = readOfferTimerState();

  let deadlineMs = existing?.deadlineMs ?? now + OFFER_START_MS;
  let dayKey =
    existing && isValidDayKey(existing.dayKey) ? existing.dayKey : today;

  if (!existing) {
    writeOfferTimerState({ deadlineMs, dayKey: today });
    return {
      deadlineMs,
      remainingSeconds: Math.floor(OFFER_START_MS / 1000),
    };
  }

  // Midnight crossed: reset only when less than 10 minutes remain
  if (dayKey !== today) {
    const remainingAtMidnight = deadlineMs - now;
    if (
      !Number.isFinite(remainingAtMidnight) ||
      remainingAtMidnight < OFFER_MIDNIGHT_RESET_IF_UNDER_MS
    ) {
      deadlineMs = now + OFFER_START_MS;
    }
    dayKey = today;
  }

  let remainingMs = deadlineMs - now;

  // Absurd future deadline (corrupt storage / bad clock) → clamp
  if (!Number.isFinite(remainingMs) || remainingMs > OFFER_START_MS) {
    deadlineMs = now + OFFER_START_MS;
    remainingMs = OFFER_START_MS;
  }

  // Soft loop: at/under floor → restart at soft reset
  if (remainingMs > 0 && remainingMs <= OFFER_SOFT_FLOOR_MS) {
    deadlineMs = now + OFFER_SOFT_RESET_SAFE_MS;
    remainingMs = OFFER_SOFT_RESET_SAFE_MS;
  }

  // Fully expired → fresh start
  if (remainingMs <= 0) {
    deadlineMs = now + OFFER_START_MS;
    remainingMs = OFFER_START_MS;
  }

  writeOfferTimerState({ deadlineMs, dayKey });

  return {
    deadlineMs,
    remainingSeconds: Math.max(0, Math.floor(remainingMs / 1000)),
  };
}

/**
 * Shared urgency countdown timer hook.
 * Hydration-safe: returns null remainingSeconds until mounted on the client.
 */
export function useOfferTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    function sync() {
      if (cancelled) return;
      setRemainingSeconds(resolveOfferTimer().remainingSeconds);
    }

    function onVisible() {
      if (document.visibilityState === "visible") {
        sync();
      }
    }

    sync();
    const timerId = window.setInterval(sync, 1000);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", sync);

    return () => {
      cancelled = true;
      window.clearInterval(timerId);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return {
    remainingSeconds,
    formattedTime:
      remainingSeconds == null ? "--:--:--" : formatCountdown(remainingSeconds),
    isExpired: remainingSeconds != null && remainingSeconds <= 0,
  };
}

