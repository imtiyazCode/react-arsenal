import DarkModeToggler from "../DarkModeToggler";
import useDarkMode from "../hooks/useDarkMode";
import "./DarkModeUsecase.css";

const features = [
  {
    icon: "🌗",
    title: "System preference",
    desc: "Automatically matches prefers-color-scheme on first load.",
  },
  {
    icon: "💾",
    title: "Persistent",
    desc: "User choice is stored in localStorage and restored across sessions.",
  },
  {
    icon: "🎨",
    title: "CSS variables",
    desc: "Drives a token-based theme via data-theme on <html>.",
  },
];

const DarkModeUsecase = () => {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className={`dmu-root${isDark ? " dmu-root--dark" : ""}`}>
      {/* ── Top bar ── */}
      <header className="dmu-topbar">
        <span className="dmu-brand">react-arsenal</span>
        <div className="dmu-topbar-right">
          <span className="dmu-theme-label">
            {isDark ? "Dark" : "Light"} mode
          </span>
          <DarkModeToggler isDark={isDark} onChange={setIsDark} size="md" />
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="dmu-hero">
        <h1 className="dmu-hero-title">
          Dark Mode <span>Toggler</span>
        </h1>
        <p className="dmu-hero-sub">
          A accessible, animated toggle with OS-preference detection and
          localStorage persistence. By <strong>@code.clash</strong>
        </p>
      </section>

      {/* ── Feature cards ── */}
      <div className="dmu-grid">
        {features.map((f) => (
          <div key={f.title} className="dmu-card">
            <div className="dmu-card-icon">{f.icon}</div>
            <p className="dmu-card-title">{f.title}</p>
            <p className="dmu-card-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Size variants ── */}
      <section className="dmu-showcase">
        <h2 className="dmu-showcase-title">Size Variants</h2>
        <div className="dmu-variants-table">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="dmu-variant-row">
              <div className="dmu-variant-label">
                <span className="dmu-variant-name">size=&quot;{size}&quot;</span>
                <span className="dmu-variant-hint">
                  {size === "sm" && "44 × 22 px — inline or compact navbars"}
                  {size === "md" && "56 × 28 px — default, topbars"}
                  {size === "lg" && "72 × 36 px — hero / settings pages"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="dmu-badge">{size}</span>
                <DarkModeToggler isDark={isDark} onChange={setIsDark} size={size} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DarkModeUsecase;
