import Section from '../Section/Section';
import SectionHead from '../SectionHead/SectionHead';
import Pain from './Pain';
import { PAINS } from '../../data/pains';
import grid from '../../styles/grid.module.css';

export default function Pains() {
  return (
    <Section id="dores">
      <SectionHead
        eyebrow="O diagnóstico"
        titulo="Se algum destes pontos parece familiar, o problema não é o seu dentista."
        sub="É o processo entre o anúncio e a cadeira."
      />
      <div className={grid.grid3}>
        {PAINS.map((pain) => (
          <Pain key={pain.num} {...pain} />
        ))}
      </div>
    </Section>
  );
}
