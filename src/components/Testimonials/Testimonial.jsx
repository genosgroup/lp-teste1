import { useReveal } from '../../hooks/useReveal';
import s from './Testimonials.module.css';

export default function Testimonial({ texto, autor, clinica }) {
  const { ref, revealClass } = useReveal();

  return (
    <figure ref={ref} className={`${s.quote} ${revealClass}`}>
      <blockquote>{texto}</blockquote>
      <figcaption>
        <strong>{autor}</strong>
        <span>{clinica}</span>
      </figcaption>
    </figure>
  );
}
