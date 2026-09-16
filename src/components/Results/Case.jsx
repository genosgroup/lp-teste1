import { useReveal } from '../../hooks/useReveal';
import s from './Results.module.css';

export default function Case({ tag, destaque, descricao, itens }) {
  const { ref, revealClass } = useReveal();

  return (
    <article ref={ref} className={`${s.case} ${revealClass}`}>
      <span className={s.tag}>{tag}</span>
      <strong className={s.big}>{destaque}</strong>
      <p className={s.desc}>{descricao}</p>
      <ul className={s.list}>
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
