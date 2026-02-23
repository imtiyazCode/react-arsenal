import { useState } from "react";
import Skeleton from "./Skeleton";
import "./SkeletonUsecase.css";

/* ── Fake data shown after "loading" ─────────────────── */
const profile = {
  name: "Alex Johnson",
  role: "Senior Engineer · San Francisco",
  bio: "Building delightful interfaces one component at a time.",
  avatar: "https://i.pravatar.cc/80?img=12",
};

const articles = [
  { id: 1, title: "Understanding React Portals", tag: "React", time: "5 min read" },
  { id: 2, title: "CSS Grid in 2025", tag: "CSS", time: "3 min read" },
  { id: 3, title: "TypeScript Utility Types", tag: "TypeScript", time: "7 min read" },
];

/* ── Sub-components ───────────────────────────────────── */
const ProfileCardSkeleton = () => (
  <div className="su-profile-card">
    <Skeleton variant="circular" width={64} height={64} />
    <div className="su-profile-info">
      <Skeleton variant="text" width="60%" height={16} />
      <Skeleton variant="text" width="40%" height={12} style={{ marginTop: 8 }} />
      <Skeleton variant="text" width="90%" height={12} style={{ marginTop: 8 }} />
    </div>
  </div>
);

const ProfileCardLoaded = () => (
  <div className="su-profile-card su-profile-card--loaded">
    <img src={profile.avatar} alt={profile.name} className="su-avatar" />
    <div className="su-profile-info">
      <p className="su-name">{profile.name}</p>
      <p className="su-role">{profile.role}</p>
      <p className="su-bio">{profile.bio}</p>
    </div>
  </div>
);

const ArticleListSkeleton = () => (
  <ul className="su-article-list">
    {[1, 2, 3].map((i) => (
      <li key={i} className="su-article-item">
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="text" width="70%" height={14} style={{ marginTop: 10 }} />
        <Skeleton variant="text" width="35%" height={11} style={{ marginTop: 6 }} />
      </li>
    ))}
  </ul>
);

const ArticleListLoaded = () => (
  <ul className="su-article-list">
    {articles.map((a) => (
      <li key={a.id} className="su-article-item su-article-item--loaded">
        <div className="su-article-img">{a.tag}</div>
        <p className="su-article-title">{a.title}</p>
        <p className="su-article-meta">{a.time}</p>
      </li>
    ))}
  </ul>
);

/* ── Main Usecase ─────────────────────────────────────── */
const SkeletonUsecase = () => {
  const [loaded, setLoaded] = useState(false);

  const toggle = () => setLoaded((prev) => !prev);

  return (
    <section className="su-root">
      <h1 className="su-heading">Skeleton Loading Component By @code.clash</h1>
      <p className="su-subheading">
        Toggle between skeleton placeholders and actual content.
      </p>

      <button className="su-toggle-btn" onClick={toggle}>
        {loaded ? "↺ Show Skeleton" : "⚡ Load Content"}
      </button>

      <div className="su-grid">
        {/* Profile card */}
        <div className="su-section">
          <h2 className="su-section-title">Profile Card</h2>
          {loaded ? <ProfileCardLoaded /> : <ProfileCardSkeleton />}
        </div>

        {/* Article list */}
        <div className="su-section">
          <h2 className="su-section-title">Article Feed</h2>
          {loaded ? <ArticleListLoaded /> : <ArticleListSkeleton />}
        </div>

        {/* Primitive showcase */}
        <div className="su-section su-section--full">
          <h2 className="su-section-title">All Variants</h2>
          <div className="su-variants">
            <div className="su-variant-item">
              <span className="su-label">text</span>
              <Skeleton variant="text" />
            </div>
            <div className="su-variant-item">
              <span className="su-label">circular</span>
              <Skeleton variant="circular" />
            </div>
            <div className="su-variant-item su-variant-item--wide">
              <span className="su-label">rectangular</span>
              <Skeleton variant="rectangular" height={80} />
            </div>
            <div className="su-variant-item su-variant-item--wide">
              <span className="su-label">card</span>
              <Skeleton variant="card" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonUsecase;
