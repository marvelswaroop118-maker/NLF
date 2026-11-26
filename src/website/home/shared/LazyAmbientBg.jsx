import { useEffect, useRef, useState } from 'react';

export default function LazyAmbientBg({ children, rootMargin = '500px 0px' }) {
  const hostRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const isNear = entries.some((entry) => entry.isIntersecting);
        setMounted(isNear);
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={hostRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {mounted ? children : null}
    </div>
  );
}
