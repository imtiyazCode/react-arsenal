import { useEffect, useRef } from "react";

interface IUseIntersectionObserverOptions {
  /** 0–1: how much of the target must be visible to trigger. Default 0.1 */
  threshold?: number;
  /** CSS margin around the root. Default "0px" */
  rootMargin?: string;
  /** Set to false to temporarily disable the observer */
  enabled?: boolean;
}

/**
 * Attaches an IntersectionObserver to `targetRef`.
 * `onIntersect` is called once every time the target becomes visible
 * (and `enabled` is true). The observer is automatically cleaned up.
 */
function useIntersectionObserver(
  targetRef: React.RefObject<Element | null>,
  onIntersect: () => void,
  {
    threshold = 0.1,
    rootMargin = "0px",
    enabled = true,
  }: IUseIntersectionObserverOptions = {}
): void {
  // Stable ref so we never need `onIntersect` as an effect dependency
  const callbackRef = useRef(onIntersect);
  useEffect(() => {
    callbackRef.current = onIntersect;
  });

  useEffect(() => {
    if (!enabled) return;

    const el = targetRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          callbackRef.current();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, threshold, rootMargin, enabled]);
}

export default useIntersectionObserver;
