import Stat from './Stat';
import { STATS } from '../../data/stats';
import s from './Stats.module.css';

export default function Stats() {
  return (
    <section className={s.stats}>
      <div className={`container ${s.grid}`}>
        {STATS.map((item) => (
          <Stat key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
