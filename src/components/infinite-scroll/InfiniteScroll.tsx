import React, { useRef } from "react";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import "./InfiniteScroll.css";

interface IInfiniteScrollProps {
  /** Fired when the sentinel enters the viewport */
  onLoadMore: () => void;
  /** When false the sentinel stops being observed */
  hasMore: boolean;
  /** Prevents double-firing while a fetch is in progress */
  isLoading?: boolean;
  /** Custom loading indicator — defaults to the built-in spinner */
  loader?: React.ReactNode;
  /** Shown beneath the list when hasMore is false */
  endMessage?: React.ReactNode;
  /** IntersectionObserver threshold (0–1). Default 0.1 */
  threshold?: number;
  /** IntersectionObserver rootMargin. Default "0px" */
  rootMargin?: string;
  /** Extra className on the outer wrapper */
  className?: string;
  children: React.ReactNode;
}

const DefaultSpinner = () => (
  <div className="is-sentinel">
    <span className="is-spinner" role="status" aria-label="Loading more…" />
  </div>
);

const DefaultEndMessage = () => (
  <div className="is-end-message">
    <span className="is-end-icon">🎉</span>
    <span>You&apos;re all caught up!</span>
  </div>
);

const InfiniteScroll: React.FC<IInfiniteScrollProps> = ({
  onLoadMore,
  hasMore,
  isLoading = false,
  loader = <DefaultSpinner />,
  endMessage = <DefaultEndMessage />,
  threshold = 0.1,
  rootMargin = "0px",
  className = "",
  children,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(sentinelRef, onLoadMore, {
    threshold,
    rootMargin,
    // Disable while loading or when there are no more pages
    enabled: hasMore && !isLoading,
  });

  return (
    <div className={className}>
      {children}

      {/* Sentinel / status area */}
      {isLoading && loader}
      {!hasMore && endMessage}
      {hasMore && !isLoading && <div ref={sentinelRef} aria-hidden="true" />}
    </div>
  );
};

export default InfiniteScroll;
