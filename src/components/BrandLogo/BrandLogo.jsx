import s from './BrandLogo.module.css';

/** Assinatura "Genos." com o símbolo — usada no header e no rodapé. */
export default function BrandLogo({ href = '#topo', ariaLabel = 'Genos — página inicial' }) {
  return (
    <a className={s.brand} href={href} aria-label={ariaLabel}>
      <svg className={s.mark} viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="#FF6B00" />
        <path
          d="M28.5 14.2a9 9 0 1 0 1.1 9.6h-9.1v-4.2h13.2v1.9"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="3.4"
          strokeLinecap="square"
        />
      </svg>
      <span className={s.text}>
        Genos<span className={s.dot}>.</span>
      </span>
    </a>
  );
}
