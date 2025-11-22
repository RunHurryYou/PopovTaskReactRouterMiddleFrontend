import { useEffect, useRef, useState, type RefCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onIntersect?: () => void;
  enabled?: boolean;
}

interface UseIntersectionObserverReturn {
  targetRef: RefCallback<Element>;
  isIntersecting: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetElementRef = useRef<Element | null>(null);

  const targetRef: RefCallback<Element> = (element) => {
    targetElementRef.current = element;
  };

  useEffect(() => {
    if (!enabled || !targetElementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting && onIntersect) {
          onIntersect();
        }
      },
      { threshold, root, rootMargin }
    );

    const currentTarget = targetElementRef.current;
    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [threshold, root, rootMargin, onIntersect, enabled]);

  return { targetRef, isIntersecting };
};