import Section from '../Section/Section';
import SectionHead from '../SectionHead/SectionHead';
import Case from './Case';
import { CASES } from '../../data/cases';
import grid from '../../styles/grid.module.css';

export default function Results() {
  return (
    <Section id="resultados" alt>
      <SectionHead
        eyebrow="Resultados"
        titulo="Casos reais de clínicas parceiras."
        sub="Números de exemplo — substitua pelos cases auditados da sua operação."
      />
      <div className={grid.grid3}>
        {CASES.map((item) => (
          <Case key={item.tag} {...item} />
        ))}
      </div>
    </Section>
  );
}
