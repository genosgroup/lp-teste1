import s from './LeadForm.module.css';

/** Envelope de um campo: rótulo, controle e mensagem de erro. */
export default function Field({ id, label, optional, erro, children }) {
  return (
    <div className={`${s.field} ${erro ? s.invalid : ''}`}>
      <label htmlFor={id}>
        {label} {optional && <span className={s.optional}>(opcional)</span>}
      </label>
      {children}
      <span className={s.error}>{erro}</span>
    </div>
  );
}
