import { Fragment } from 'react';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import { useReveal } from '../../hooks/useReveal';
import { HERO_METRICS } from '../../data/heroMetrics';
import s from './Hero.module.css';

export default function Hero() {
  const copy = useReveal();
  const card = useReveal();

  return (
    <section className={s.hero}>
      <div className={s.glow} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <div ref={copy.ref} className={copy.revealClass}>
          <span className={s.pill}>
            <span className={s.pillDot} />
            Consultoria especializada em odontologia
          </span>

          <h1>
            A sua clínica não necessita de mais anúncios.
            <br />
            <em>Precisa de agenda previsível.</em>
          </h1>

          <p className={s.lead}>
            O Genos estrutura aquisição, atendimento e recompra para clínicas odontológicas —
            do primeiro clique ao paciente sentado na cadeira. Sem promessa mágica, com processo.
          </p>

          <div className={s.actions}>
            <Button href="#diagnostico">Quero o diagnóstico gratuito</Button>
            <Button href="#metodo" variant="ghost">
              Ver como funciona
            </Button>
          </div>

          <ul className={s.proof}>
            <li>
              <strong>Foco único</strong> em odontologia
            </li>
            <li>
              <strong>Sem fidelidade</strong> de 12 meses
            </li>
            <li>
              <strong>Relatório</strong> semanal aberto
            </li>
          </ul>
        </div>

        <aside
          ref={card.ref}
          className={`${s.card} ${card.revealClass}`}
          aria-label="Resumo de resultados"
        >
          <div className={s.cardHead}>
            <span className={s.cardLabel}>Painel da clínica</span>
            <span className={s.cardLive}>
              <i />
              ao vivo
            </span>
          </div>

          {HERO_METRICS.map((metrica) => (
            <Fragment key={metrica.label}>
              <div className={s.metricRow}>
                <span>{metrica.label}</span>
                {metrica.prefix || metrica.suffix ? (
                  <strong>
                    {metrica.prefix}
                    <Counter target={metrica.target} />
                    {metrica.suffix}
                  </strong>
                ) : (
                  <Counter as="strong" target={metrica.target} />
                )}
              </div>
              <div className={s.bar}>
                <i style={{ '--w': metrica.largura }} />
              </div>
            </Fragment>
          ))}

          <p className={s.cardFoot}>Exemplo ilustrativo de painel entregue aos clientes.</p>
        </aside>
      </div>
    </section>
  );
}
