import { useRef, useCallback } from 'react';

export const useScrollToSection = () => {
  const refMap = useRef<Record<string, React.RefObject<HTMLElement>>>({});

  const registerRef = useCallback(
    (href: string, ref: React.RefObject<HTMLElement>) => {
      refMap.current[href] = ref;
    },
    []
  );

  const scrollToSection = useCallback((href: string) => {
    const ref = refMap.current[href];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    registerRef,
    scrollToSection,
  };
};
