import Section from '../Section/Section';
import Eyebrow from '../Eyebrow/Eyebrow';
import LeadForm from '../LeadForm/LeadForm';
import { useReveal } from '../../hooks/useReveal';
import s from './LeadSection.module.css';

const BENEFICIOS = [
  'Auditoria do funil e do custo por paciente',
  'Mapa de oportunidades por especialidade',
  'Plano de ação de 90 dias',
  'Sem compromisso e sem custo'
];

export default function LeadSection() {
  const { ref, revealClass } = useReveal();

  return (
    <Section id="diagnostico" className={s.ctaSection} bare>
      <div className={`container ${s.grid}`}>
        <div ref={ref} className={`${s.copy} ${revealClass}`}>
          <Eyebrow>Diagnóstico gratuito</Eyebrow>
          <h2>45 minutos que mostram onde a sua clínica perde dinheiro.</h2>
          <p>
            Analisamos o seu funil atual, o ticket por procedimento e a capacidade de agenda.
            Você sai com um plano por escrito — contratando ou não.
          </p>
          <ul className={s.checkList}>
            {BENEFICIOS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <LeadForm />
      </div>
    </Section>
  );
}
