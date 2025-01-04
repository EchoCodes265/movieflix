import { useEffect, useCallback, useRef } from 'react';

export function useInfiniteScroll(
  onLoadMore: () => void,
  hasMore: boolean = true,
  threshold: number = 0.8
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !hasMore) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        { threshold }
      );

      observer.current.observe(node);
    },
    [onLoadMore, hasMore, threshold]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return loadMoreRef;
}