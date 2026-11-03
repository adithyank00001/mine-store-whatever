"use client";

import { useEffect, useState } from "react";

const LICENSE_STOCK_KEY = "store-license-stock-v7";
const LICENSE_MAX = 13;
const LICENSE_TICK_MS = 60 * 60 * 1000;

type LicenseStockState = {
  count: number;
  nextTickMs: number;
};

let memoryLicenseStock: LicenseStockState | null = null;

function clampLicenseCount(value: number) {
  if (!Number.isFinite(value)) return LICENSE_MAX;
  return Math.min(LICENSE_MAX, Math.max(1, Math.round(value)));
}

function readLicenseStockState(): LicenseStockState | null {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(LICENSE_STOCK_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LicenseStockState>;
      if (
        typeof parsed.count === "number" &&
        typeof parsed.nextTickMs === "number" &&
        Number.isFinite(parsed.nextTickMs)
      ) {
        const state = {
          count: clampLicenseCount(parsed.count),
          nextTickMs: parsed.nextTickMs,
        };
        memoryLicenseStock = state;
        return state;
      }
    }
  } catch {
    // Quota / private mode
  }
  return memoryLicenseStock;
}

function writeLicenseStockState(state: LicenseStockState) {
  memoryLicenseStock = state;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LICENSE_STOCK_KEY, JSON.stringify(state));
    }
  } catch {
    // Quota / private mode
  }
}

function resolveLicenseStock(now = Date.now()): number {
  const existing = readLicenseStockState();

  if (!existing) {
    const state = {
      count: LICENSE_MAX,
      nextTickMs: now + LICENSE_TICK_MS,
    };
    writeLicenseStockState(state);
    return state.count;
  }

  let { count, nextTickMs } = existing;

  if (now >= nextTickMs) {
    const elapsedTicks = Math.floor((now - nextTickMs) / LICENSE_TICK_MS) + 1;
    for (let i = 0; i < elapsedTicks; i++) {
      count = count <= 1 ? LICENSE_MAX : count - 1;
    }
    nextTickMs = nextTickMs + elapsedTicks * LICENSE_TICK_MS;
    if (nextTickMs <= now) {
      nextTickMs = now + LICENSE_TICK_MS;
    }
  }

  count = clampLicenseCount(count);
  writeLicenseStockState({ count, nextTickMs });
  return count;
}

/**
 * Shared license stock counter hook.
 * Drops by 1 every hour; at 1, resets to max.
 */
export function useLicenseStock() {
  const [stockCount, setStockCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    function sync() {
      if (cancelled) return;
      setStockCount(resolveLicenseStock());
    }

    sync();
    const interval = window.setInterval(sync, 10_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return { stockCount: stockCount ?? LICENSE_MAX };
}

