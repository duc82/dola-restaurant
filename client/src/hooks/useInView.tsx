import { useState, useEffect, RefObject } from "react";

interface Options {
  threshold: number;
  rootMargin: string;
  triggerOnce: boolean;
}

const useInView = (ref: RefObject<Element>, options?: Partial<Options>) => {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (options?.triggerOnce && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: options?.rootMargin || "0px",
        threshold: options?.threshold || 0,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView, options, ref]);

  return isInView;
};

export default useInView;
