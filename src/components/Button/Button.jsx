import s from './Button.module.css';

/**
 * Botão da identidade Genos. Vira <a> quando recebe href, senão <button>.
 *
 * variant: 'primary' (laranja) | 'ghost' (contorno)
 * size:    'md' | 'sm'
 * block:   ocupa a largura toda
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...props
}) {
  const classes = [s.btn, s[variant], size === 'sm' && s.sm, block && s.block, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
