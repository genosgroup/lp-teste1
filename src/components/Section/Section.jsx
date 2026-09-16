import s from './Section.module.css';

/**
 * Casca das seções: espaçamento vertical padrão e variante de fundo.
 *
 * alt=true      -> fundo #111 com bordas (seções alternadas)
 * narrow=true   -> container de 820px (usado no FAQ)
 * bare=true     -> não renderiza o .container interno (a seção monta o seu)
 */
export default function Section({
  id,
  alt = false,
  narrow = false,
  bare = false,
  className = '',
  children
}) {
  const classes = [s.section, alt && s.alt, className].filter(Boolean).join(' ');
  const containerClasses = narrow ? 'container container-narrow' : 'container';

  return (
    <section className={classes} id={id}>
      {bare ? children : <div className={containerClasses}>{children}</div>}
    </section>
  );
}
