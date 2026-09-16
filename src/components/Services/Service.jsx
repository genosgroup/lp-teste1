import { useReveal } from '../../hooks/useReveal';
import s from './Services.module.css';

export default function Service({ icone, titulo, texto }) {
  const { ref, revealClass } = useReveal();

  return (
    <article ref={ref} className={`${s.service} ${revealClass}`}>
      <div className={s.icon} aria-hidden="true">
        {icone}
      </div>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </article>
  );
}
