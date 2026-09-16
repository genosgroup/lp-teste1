import s from './Eyebrow.module.css';

/** Rótulo laranja em caixa alta acima dos títulos de seção. */
export default function Eyebrow({ children }) {
  return <span className={s.eyebrow}>{children}</span>;
}
