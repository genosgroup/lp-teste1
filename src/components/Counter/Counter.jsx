import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const DURACAO = 1500;

function formatar(valor, casas) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

/**
 * Número que conta de 0 até o alvo quando entra na viewport.
 *
 * decimal={1} com target={42} renderiza 4,2 (o alvo é sempre inteiro).
 * Com movimento reduzido, mostra o valor final sem animar.
 */
export default function Counter({
  target,
  decimal = 0,
  prefix = '',
  suffix = '',
  as: Tag = 'span',
  className
}) {
  const ref = useRef(null);
  const semAnimacao = usePrefersReducedMotion();
  const final = decimal ? target / 10 ** decimal : target;

  const [texto, setTexto] = useState(() =>
    semAnimacao ? prefix + formatar(final, decimal) + suffix : '0'
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mostrarFinal = () => setTexto(prefix + formatar(final, decimal) + suffix);

    if (semAnimacao || typeof IntersectionObserver === 'undefined') {
      mostrarFinal();
      return undefined;
    }

    let frame = null;
    let inicio = null;

    const passo = (t) => {
      if (!inicio) inicio = t;
      const p = Math.min((t - inicio) / DURACAO, 1);
      const eased = 1 - (1 - p) ** 3; // easeOutCubic
      setTexto(prefix + formatar(final * eased, decimal) + suffix);
      if (p < 1) frame = requestAnimationFrame(passo);
      else mostrarFinal();
    };

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          obs.unobserve(entrada.target);
          frame = requestAnimationFrame(passo);
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [final, decimal, prefix, suffix, semAnimacao]);

  return (
    <Tag ref={ref} className={className}>
      {texto}
    </Tag>
  );
}
