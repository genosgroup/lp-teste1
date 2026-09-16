import Section from '../Section/Section';
import SectionHead from '../SectionHead/SectionHead';
import Step from './Step';
import { STEPS } from '../../data/steps';
import s from './Method.module.css';

export default function Method() {
  return (
    <Section id="metodo" alt>
      <SectionHead
        eyebrow="Método Genos"
        titulo="Quatro etapas. Nenhuma delas opcional."
        sub="O mesmo processo aplicado em todas as clínicas — calibrado para a sua realidade."
      />
      <ol className={s.steps}>
        {STEPS.map((step) => (
          <Step key={step.num} {...step} />
        ))}
      </ol>
    </Section>
  );
}
