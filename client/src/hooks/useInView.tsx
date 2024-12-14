import { useState, useEffect, RefObject } from "react";

interface Options extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

const useInView = (ref: RefObject<Element | null>, options?: Options) => {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (options?.triggerOnce && isInView) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView, options, ref]);

  return isInView;
};

export default useInView;
