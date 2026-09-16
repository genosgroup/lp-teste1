import { useEffect, useState } from 'react';

/** true assim que a página passa de `limite` pixels — usado na sombra do header. */
export function useScrolled(limite = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const aoRolar = () => setScrolled(window.scrollY > limite);
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener('scroll', aoRolar);
  }, [limite]);

  return scrolled;
}
