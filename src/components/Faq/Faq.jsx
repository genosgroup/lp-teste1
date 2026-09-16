import Section from '../Section/Section';
import SectionHead from '../SectionHead/SectionHead';
import FaqItem from './FaqItem';
import { FAQ } from '../../data/faq';
import s from './Faq.module.css';

export default function Faq() {
  return (
    <Section id="faq" alt narrow>
      <SectionHead eyebrow="Dúvidas" titulo="Perguntas frequentes" />
      <div className={s.faq}>
        {FAQ.map((item) => (
          <FaqItem key={item.pergunta} {...item} />
        ))}
      </div>
    </Section>
  );
}
