/** Displays the page title and a link to the trending data source. */
export default function Header() {
  return (
    <header className="header">
      <h1>🔥 GitHub Trends</h1>
      <p>
        Top repositories trending right now — switch between{" "}
        <strong>daily</strong>, <strong>weekly</strong>, and{" "}
        <strong>monthly</strong> windows.
      </p>
      <p className="note">
        Powered by the community-maintained{" "}
        <a
          href="https://github.com/isboyjc/github-trending-api"
          target="_blank"
          rel="noopener"
        >
          github-trending-api
        </a>
        . Data is refreshed periodically.
      </p>
    </header>
  );
}
