import { useCallback, useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import "./InfiniteScrollUsecase.css";

/* ── Types ────────────────────────────────────────────── */
interface Post {
  id: number;
  author: string;
  initials: string;
  color: string;
  time: string;
  title: string;
  body: string;
  tags: string[];
}

/* ── Fake data factory ────────────────────────────────── */
const AUTHORS = [
  { name: "Alex Kim", initials: "AK", color: "#7c3aed" },
  { name: "Sara Okonkwo", initials: "SO", color: "#0891b2" },
  { name: "Ryan Patel", initials: "RP", color: "#b45309" },
  { name: "Mei Chen", initials: "MC", color: "#be185d" },
  { name: "James Adler", initials: "JA", color: "#15803d" },
];

const TITLES = [
  "Why I rewrote my app in TypeScript",
  "CSS Grid tricks you didn't know",
  "React 19 Actions — a deep dive",
  "When to use useMemo (and when not to)",
  "Building accessible modals from scratch",
  "The IntersectionObserver API, explained",
  "Vite vs Webpack in 2025",
  "State management without Redux",
  "Optimistic UI patterns in React",
  "Container queries are finally here",
];

const BODIES = [
  "A short exploration of how this technique changed the way I think about component architecture and code reuse.",
  "Turns out the solution was simpler than I expected — no library needed, just a few lines of vanilla CSS.",
  "After migrating three projects I've landed on a pattern that keeps things predictable and easy to reason about.",
  "The performance gains were real, but the improved developer experience made the biggest difference long-term.",
];

const TAGS_POOL = [
  ["TypeScript", "DX"],
  ["CSS", "Layout"],
  ["React", "Hooks"],
  ["Performance", "Web"],
  ["Accessibility", "HTML"],
  ["Tooling", "Build"],
];

const PAGE_SIZE = 8;
const TOTAL_PAGES = 6;

function makePosts(page: number): Post[] {
  return Array.from({ length: PAGE_SIZE }, (_, i) => {
    const idx = (page - 1) * PAGE_SIZE + i;
    const author = AUTHORS[idx % AUTHORS.length];
    return {
      id: idx + 1,
      author: author.name,
      initials: author.initials,
      color: author.color,
      time: `${idx + 1}m ago`,
      title: TITLES[idx % TITLES.length],
      body: BODIES[idx % BODIES.length],
      tags: TAGS_POOL[idx % TAGS_POOL.length],
    };
  });
}

/** Simulates a paginated API call */
function fetchPage(page: number): Promise<Post[]> {
  const delay = page === 4 ? 2500 : 600;
  return new Promise((resolve) =>
    setTimeout(() => resolve(makePosts(page)), delay)
  );
}

/* ── Component ────────────────────────────────────────── */
const InfiniteScrollUsecase = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    const batch = await fetchPage(nextPage);
    setPosts((prev) => [...prev, ...batch]);
    setPage(nextPage);
    setIsLoading(false);
    if (nextPage >= TOTAL_PAGES) setHasMore(false);
  }, [page]);

  const totalLoaded = posts.length;
  const totalItems = TOTAL_PAGES * PAGE_SIZE;

  return (
    <section className="isu-root">
      <h1 className="isu-heading">Infinite Scroll By @code.clash</h1>
      <p className="isu-subheading">
        Scroll down — new posts load automatically via{" "}
        <strong>IntersectionObserver</strong>. No libraries, no lodash, just
        the browser.
      </p>

      {/* Stats */}
      <div className="isu-stats">
        <div className="isu-stat">
          <span className="isu-stat-value">{totalLoaded}</span>
          <span className="isu-stat-label">Loaded</span>
        </div>
        <div className="isu-stat">
          <span className="isu-stat-value">{totalItems - totalLoaded}</span>
          <span className="isu-stat-label">Remaining</span>
        </div>
        <div className="isu-stat">
          <span className="isu-stat-value">{page}/{TOTAL_PAGES}</span>
          <span className="isu-stat-label">Page</span>
        </div>
      </div>

      {/* List */}
      <InfiniteScroll
        className="isu-list"
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
      >
        {posts.map((post) => (
          <article key={post.id} className="isu-card">
            <div
              className="isu-avatar"
              style={{ background: post.color }}
              aria-hidden="true"
            >
              {post.initials}
            </div>

            <div className="isu-card-body">
              <div className="isu-card-header">
                <span className="isu-author">{post.author}</span>
                <span className="isu-time">{post.time}</span>
              </div>
              <p className="isu-card-title">{post.title}</p>
              <p className="isu-card-text">{post.body}</p>
              <div className="isu-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="isu-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default InfiniteScrollUsecase;
