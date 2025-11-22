import { useState, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';
import type { UseInfinityScrollProps } from '../types/types';

export const useInfinityScroll = <T>({
  fetchData,
  initialPage = 1,
  hasMore: externalHasMore,
  threshold = 0.1,
  enabled = true,
}: UseInfinityScrollProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [internalHasMore, setInternalHasMore] = useState(true);

  const hasMore = externalHasMore !== undefined ? externalHasMore : internalHasMore;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      const newData = await fetchData(page);
      
      if (newData.length < 20) {
        setInternalHasMore(false);
      } else {
        setData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, loading, hasMore, enabled]);

  // Сброс состояния при изменении зависимостей
  useEffect(() => {
    setData([]);
    setPage(initialPage);
    setInternalHasMore(true);
    setError(null);
  }, [fetchData, initialPage, enabled]);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    onIntersect: loadMore,
    enabled: hasMore && !loading && enabled,
  });

  return {
    data,
    loading,
    error,
    hasMore,
    targetRef,
    isIntersecting,
    loadMore,
    reset: () => {
      setData([]);
      setPage(initialPage);
      setInternalHasMore(true);
      setError(null);
    },
  };
};