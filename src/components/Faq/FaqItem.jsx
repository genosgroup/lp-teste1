import { useReveal } from '../../hooks/useReveal';

export default function FaqItem({ pergunta, resposta }) {
  const { ref, revealClass } = useReveal();

  return (
    <details ref={ref} className={revealClass}>
      <summary>{pergunta}</summary>
      <p>{resposta}</p>
    </details>
  );
}
