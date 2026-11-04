import { PERIODS, type Period } from "./trends/types";

const periodLabels: Record<Period, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

type PeriodTabsProps = {
  activePeriod: Period;
  badges: Record<Period, string | number>;
  onPeriodChange: (period: Period) => void;
};

/** Renders the period selector and repository-count badges. */
export default function PeriodTabs({
  activePeriod,
  badges,
  onPeriodChange,
}: PeriodTabsProps) {
  return (
    <nav className="tabs" role="tablist" aria-label="Trending period">
      {PERIODS.map((period) => (
        <button
          className={`tab-btn${activePeriod === period ? " active" : ""}`}
          data-period={period}
          role="tab"
          aria-selected={activePeriod === period}
          type="button"
          key={period}
          onClick={() => onPeriodChange(period)}
        >
          {periodLabels[period]} <span className="badge">{badges[period]}</span>
        </button>
      ))}
    </nav>
  );
}
