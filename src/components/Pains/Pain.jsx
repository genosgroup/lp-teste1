import { useReveal } from '../../hooks/useReveal';
import s from './Pains.module.css';

export default function Pain({ num, titulo, texto }) {
  const { ref, revealClass } = useReveal();

  return (
    <article ref={ref} className={`${s.pain} ${revealClass}`}>
      <span className={s.num}>{num}</span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </article>
  );
}
