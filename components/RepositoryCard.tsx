import { formatNumber } from "./trends/data";
import type { Repository } from "./trends/types";

/** Renders the repository/book icon shown beside each repository name. */
function RepositoryIcon() {
  return (
    <svg
      className="repo-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
      />
    </svg>
  );
}

/** Renders a star or fork icon for repository statistics. */
function StatIcon({ type }: { type: "star" | "fork" }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      {type === "star" ? (
        <path
          fill="currentColor"
          d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
        />
      )}
    </svg>
  );
}

/** Displays a repository's rank, details, statistics, and contributors. */
export default function RepositoryCard({
  repository,
  index,
}: {
  repository: Repository;
  index: number;
}) {
  return (
    <article className="repo-card">
      <span className="repo-rank">#{index + 1}</span>
      <div className="repo-header">
        <RepositoryIcon />
        <a
          className="repo-name"
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repository.title || "Unknown"}
        </a>
      </div>
      <p className="repo-desc">
        {repository.description || "No description provided."}
      </p>
      <div className="repo-meta">
        {repository.language && (
          <span className="stat">
            <span
              className="language-dot"
              style={{
                backgroundColor: repository.languageColor || "#8b949e",
              }}
            />
            {repository.language}
          </span>
        )}
        <span className="stat">
          <StatIcon type="star" />
          {formatNumber(repository.stars)}
        </span>
        <span className="stat">
          <StatIcon type="fork" />
          {formatNumber(repository.forks)}
        </span>
        {repository.addStars ? (
          <span className="stat stars-gained">
            +{formatNumber(repository.addStars)} stars
          </span>
        ) : null}
      </div>
      {repository.contributors && repository.contributors.length > 0 && (
        <div className="repo-contributors">
          {repository.contributors
            .slice(0, 5)
            .map((contributor, avatarIndex) => (
              <img
                className="avatar"
                src={contributor.avatar}
                alt={contributor.name || "contributor"}
                loading="lazy"
                title={contributor.name || ""}
                key={`${contributor.avatar}-${avatarIndex}`}
              />
            ))}
          {repository.contributors.length > 5 && (
            <span className="more">
              +{repository.contributors.length - 5}
            </span>
          )}
        </div>
      )}
    </article>
  );
}
