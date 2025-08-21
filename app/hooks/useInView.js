"use client";

import { useEffect, useState, useRef } from 'react';

/**
 * A simple and reusable hook to determine if a component is in the viewport.
 * @param {object} options - IntersectionObserver options (e.g., threshold, rootMargin).
 * @returns {[React.RefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's in view.
 */
export const useInView = (options = { threshold: 0.1 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to trigger this once.
        if (entry.isIntersecting) {
          setInView(true);
          // Stop observing the element once it's visible.
          observer.unobserve(entry.target);
        }
      },
      options
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, inView];
};