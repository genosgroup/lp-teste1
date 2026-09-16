import Section from '../Section/Section';
import SectionHead from '../SectionHead/SectionHead';
import Testimonial from './Testimonial';
import { TESTIMONIALS } from '../../data/testimonials';
import grid from '../../styles/grid.module.css';

export default function Testimonials() {
  return (
    <Section id="depoimentos">
      <SectionHead eyebrow="Depoimentos" titulo="Quem já trocou achismo por processo." />
      <div className={grid.grid3}>
        {TESTIMONIALS.map((item) => (
          <Testimonial key={item.autor} {...item} />
        ))}
      </div>
    </Section>
  );
}
