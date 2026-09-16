import Counter from '../Counter/Counter';
import { useReveal } from '../../hooks/useReveal';
import s from './Stats.module.css';

/** Um número da faixa de estatísticas. */
export default function Stat({ target, decimal, prefix, suffix, label }) {
  const { ref, revealClass } = useReveal();

  return (
    <div ref={ref} className={`${s.stat} ${revealClass}`}>
      <Counter as="strong" target={target} decimal={decimal} prefix={prefix} suffix={suffix} />
      <span>{label}</span>
    </div>
  );
}
