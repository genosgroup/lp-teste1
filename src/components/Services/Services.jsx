import Section from '../Section/Section';
import SectionHead from '../SectionHead/SectionHead';
import Service from './Service';
import { SERVICES } from '../../data/services';
import grid from '../../styles/grid.module.css';

export default function Services() {
  return (
    <Section id="servicos">
      <SectionHead eyebrow="O que entregamos" titulo="Consultoria completa, não peça avulsa." />
      <div className={grid.grid3}>
        {SERVICES.map((service) => (
          <Service key={service.titulo} {...service} />
        ))}
      </div>
    </Section>
  );
}
