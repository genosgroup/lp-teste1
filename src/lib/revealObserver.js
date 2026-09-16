/* Um único IntersectionObserver para todos os elementos com reveal.
   Cada elemento avisa o seu componente uma vez e sai da observação. */

const callbacks = new Map();
let observer = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const cb = callbacks.get(entrada.target);
        if (cb) cb();
        callbacks.delete(entrada.target);
        observer.unobserve(entrada.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
  );

  return observer;
}

/**
 * Observa um elemento e chama `aoRevelar` quando ele entra na viewport.
 * Sem IntersectionObserver (navegador antigo), revela na hora.
 * Retorna a função de limpeza.
 */
export function observeReveal(el, aoRevelar) {
  if (!el) return undefined;

  if (typeof IntersectionObserver === 'undefined') {
    aoRevelar();
    return undefined;
  }

  callbacks.set(el, aoRevelar);
  const obs = getObserver();
  obs.observe(el);

  return () => {
    callbacks.delete(el);
    obs.unobserve(el);
  };
}
