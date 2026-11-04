import RepositoryCard from "./RepositoryCard";
import type { Repository } from "./trends/types";

type TrendGridProps = {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

/** Renders the repository cards or the current loading, error, or empty state. */
export default function TrendGrid({
  repositories,
  loading,
  error,
  onRetry,
}: TrendGridProps) {
  return (
    <main className="trend-grid" aria-live="polite">
      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Fetching trending repositories…</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>⚠️ {error}</p>
          <button className="retry-btn" type="button" onClick={onRetry}>
            Try again
          </button>
        </div>
      ) : repositories.length === 0 ? (
        <div className="empty-container">
          <p>😕 No trending repositories found for this period.</p>
        </div>
      ) : (
        repositories.map((repository, index) => (
          <RepositoryCard
            repository={repository}
            index={index}
            key={`${repository.url || repository.title || "repository"}-${index}`}
          />
        ))
      )}
    </main>
  );
}
