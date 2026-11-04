"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import PageFooter from "./PageFooter";
import PeriodTabs from "./PeriodTabs";
import TrendGrid from "./TrendGrid";
import { fetchPeriod } from "./trends/data";
import { PERIODS, type Period, type Repository } from "./trends/types";

/** Loads trend data and composes the page's presentational components. */
export default function Trends() {
  const cache = useRef(new Map<Period, Repository[]>());
  const [period, setPeriod] = useState<Period>("daily");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [badges, setBadges] = useState<Record<Period, string | number>>({
    daily: "—",
    weekly: "—",
    monthly: "—",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load the selected period, reusing cached results unless the user retries.
  useEffect(() => {
    let active = true;
    const cached = refreshKey === 0 ? cache.current.get(period) : undefined;

    if (cached) {
      setRepositories(cached);
      setBadges((current) => ({ ...current, [period]: cached.length }));
      setLoading(false);
      setError(null);
      return () => {
        active = false;
      };
    }

    setLoading(true);
    setError(null);

    fetchPeriod(period)
      .then((items) => {
        cache.current.set(period, items);
        if (active) {
          setRepositories(items);
          setBadges((current) => ({ ...current, [period]: items.length }));
        }
      })
      .catch((cause: unknown) => {
        console.error(`Error loading ${period}:`, cause);
        if (active) {
          const message =
            cause instanceof Error ? cause.message : "Check your connection.";
          setError(`Could not load ${period} trends. ${message}`);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [period, refreshKey]);

  // Prefetch other periods so their repository-count badges appear early.
  useEffect(() => {
    PERIODS.filter((item) => item !== "daily").forEach((item) => {
      void fetchPeriod(item)
        .then((items) => {
          cache.current.set(item, items);
          setBadges((current) => ({ ...current, [item]: items.length }));
        })
        .catch((cause: unknown) => {
          console.warn(`Pre-fetch failed for ${item}:`, cause);
        });
    });
  }, []);

  /** Clears the active period's cached data and requests it again. */
  function retry() {
    cache.current.delete(period);
    setRefreshKey((current) => current + 1);
  }

  /** Selects a new period and uses its cache when available. */
  function changePeriod(nextPeriod: Period) {
    setPeriod(nextPeriod);
    setRefreshKey(0);
  }

  return (
    <>
      <Header />
      <PeriodTabs
        activePeriod={period}
        badges={badges}
        onPeriodChange={changePeriod}
      />
      <TrendGrid
        repositories={repositories}
        loading={loading}
        error={error}
        onRetry={retry}
      />
      <PageFooter />
    </>
  );
}
