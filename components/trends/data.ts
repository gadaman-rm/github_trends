import type { Period, Repository } from "./types";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data";

/** Formats repository statistics with US thousands separators. */
export function formatNumber(value: number | string | null | undefined) {
  if (value == null) return "—";
  return Number(value).toLocaleString("en-US");
}

/** Fetches the trending repositories for the requested time period. */
export async function fetchPeriod(period: Period): Promise<Repository[]> {
  const response = await fetch(`${BASE_URL}/${period}/all.json`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { items?: Repository[] };
  return data.items || [];
}
