import { useEffect, useRef, useState } from 'react';
import { observeReveal } from '../lib/revealObserver';

/**
 * Animação de entrada ao rolar a página.
 * Uso:
 *   const { ref, revealClass } = useReveal();
 *   <article ref={ref} className={`${s.card} ${revealClass}`}>
 *
 * As classes .reveal/.visible são globais (src/styles/base.css) porque o
 * efeito é o mesmo em todas as seções.
 */
export function useReveal() {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => observeReveal(ref.current, () => setVisivel(true)), []);

  return { ref, revealClass: visivel ? 'reveal visible' : 'reveal' };
}
