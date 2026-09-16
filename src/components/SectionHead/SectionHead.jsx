import Eyebrow from '../Eyebrow/Eyebrow';
import { useReveal } from '../../hooks/useReveal';
import s from './SectionHead.module.css';

/** Cabeçalho centralizado: rótulo, título e subtítulo opcional. */
export default function SectionHead({ eyebrow, titulo, sub }) {
  const { ref, revealClass } = useReveal();

  return (
    <header ref={ref} className={`${s.head} ${revealClass}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{titulo}</h2>
      {sub && <p className={s.sub}>{sub}</p>}
    </header>
  );
}
