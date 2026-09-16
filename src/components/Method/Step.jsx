import { useReveal } from '../../hooks/useReveal';
import s from './Method.module.css';

export default function Step({ num, titulo, texto, prazo }) {
  const { ref, revealClass } = useReveal();

  return (
    <li ref={ref} className={`${s.step} ${revealClass}`}>
      <span className={s.num}>{num}</span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <span className={s.tag}>{prazo}</span>
    </li>
  );
}
