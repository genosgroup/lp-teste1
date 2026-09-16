import { useRef, useState } from 'react';
import Button from '../Button/Button';
import Field from './Field';
import { useReveal } from '../../hooks/useReveal';
import { whatsappLink } from '../../config/site';
import s from './LeadForm.module.css';

const VAZIO = {
  nome: '',
  clinica: '',
  whatsapp: '',
  cidade: '',
  faturamento: '',
  desafio: ''
};

const OBRIGATORIOS = ['nome', 'clinica', 'whatsapp', 'cidade', 'faturamento'];

const FAIXAS = [
  'Até R$ 30 mil',
  'R$ 30 mil a R$ 80 mil',
  'R$ 80 mil a R$ 200 mil',
  'Acima de R$ 200 mil'
];

/** Máscara (00) 00000-0000 */
function mascararTelefone(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 0) return `(${d}`;
  return d;
}

function validar(dados) {
  const erros = {};

  OBRIGATORIOS.forEach((campo) => {
    const valor = dados[campo].trim();

    if (!valor) {
      erros[campo] = 'Campo obrigatório.';
      return;
    }
    if (campo === 'nome' && valor.length < 3) {
      erros[campo] = 'Informe o nome completo.';
      return;
    }
    if (campo === 'whatsapp' && valor.replace(/\D/g, '').length < 10) {
      erros[campo] = 'Informe DDD + número.';
    }
  });

  return erros;
}

function montarMensagem(dados) {
  const linhas = [
    'Olá! Quero solicitar o diagnóstico gratuito do Genos.',
    '',
    `Nome: ${dados.nome.trim()}`,
    `Clínica: ${dados.clinica.trim()}`,
    `WhatsApp: ${dados.whatsapp.trim()}`,
    `Cidade: ${dados.cidade.trim()}`,
    `Faturamento: ${dados.faturamento}`
  ];
  if (dados.desafio.trim()) linhas.push(`Desafio: ${dados.desafio.trim()}`);
  return linhas.join('\n');
}

export default function LeadForm() {
  const { ref, revealClass } = useReveal();
  const [dados, setDados] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [status, setStatus] = useState('');
  const campos = useRef({});

  // Digitar em um campo limpa o erro dele, como na versão original.
  function aoDigitar(campo, valor) {
    setDados((atual) => ({
      ...atual,
      [campo]: campo === 'whatsapp' ? mascararTelefone(valor) : valor
    }));
    setErros((atual) => {
      if (!atual[campo]) return atual;
      const { [campo]: _, ...resto } = atual;
      return resto;
    });
  }

  function aoEnviar(e) {
    e.preventDefault();
    setStatus('');

    const novosErros = validar(dados);
    setErros(novosErros);

    const primeiro = OBRIGATORIOS.find((campo) => novosErros[campo]);
    if (primeiro) {
      setStatus('Revise os campos destacados.');
      campos.current[primeiro]?.focus();
      return;
    }

    // Sem backend: a LP monta a mensagem e abre o WhatsApp.
    // Para receber por e-mail, veja as instruções no README.
    setStatus('Tudo certo! Abrindo o WhatsApp…');
    window.open(whatsappLink(montarMensagem(dados)), '_blank', 'noopener');
    setDados(VAZIO);
  }

  const registrar = (campo) => (el) => {
    campos.current[campo] = el;
  };

  return (
    <form ref={ref} className={`${s.form} ${revealClass}`} onSubmit={aoEnviar} noValidate>
      <h3 className={s.title}>Solicitar diagnóstico</h3>

      <Field id="nome" label="Nome completo" erro={erros.nome}>
        <input
          type="text"
          id="nome"
          name="nome"
          ref={registrar('nome')}
          value={dados.nome}
          onChange={(e) => aoDigitar('nome', e.target.value)}
          autoComplete="name"
          placeholder="Dra. Marina Alves"
        />
      </Field>

      <Field id="clinica" label="Nome da clínica" erro={erros.clinica}>
        <input
          type="text"
          id="clinica"
          name="clinica"
          ref={registrar('clinica')}
          value={dados.clinica}
          onChange={(e) => aoDigitar('clinica', e.target.value)}
          autoComplete="organization"
          placeholder="Clínica Sorriso Vivo"
        />
      </Field>

      <div className={s.row}>
        <Field id="whatsapp" label="WhatsApp" erro={erros.whatsapp}>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            ref={registrar('whatsapp')}
            value={dados.whatsapp}
            onChange={(e) => aoDigitar('whatsapp', e.target.value)}
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
        </Field>

        <Field id="cidade" label="Cidade" erro={erros.cidade}>
          <input
            type="text"
            id="cidade"
            name="cidade"
            ref={registrar('cidade')}
            value={dados.cidade}
            onChange={(e) => aoDigitar('cidade', e.target.value)}
            autoComplete="address-level2"
            placeholder="São Paulo/SP"
          />
        </Field>
      </div>

      <Field id="faturamento" label="Faturamento mensal aproximado" erro={erros.faturamento}>
        <select
          id="faturamento"
          name="faturamento"
          ref={registrar('faturamento')}
          value={dados.faturamento}
          onChange={(e) => aoDigitar('faturamento', e.target.value)}
        >
          <option value="">Selecione uma faixa</option>
          {FAIXAS.map((faixa) => (
            <option key={faixa}>{faixa}</option>
          ))}
        </select>
      </Field>

      <Field id="desafio" label="Maior desafio hoje" optional>
        <textarea
          id="desafio"
          name="desafio"
          ref={registrar('desafio')}
          value={dados.desafio}
          onChange={(e) => aoDigitar('desafio', e.target.value)}
          rows={3}
          placeholder="Ex.: recebo contatos, mas poucos viram consulta."
        />
      </Field>

      <Button type="submit" block className={s.submit}>
        Enviar e falar com um consultor
      </Button>

      <p className={s.note}>
        Ao enviar, você é direcionado ao WhatsApp com a mensagem pronta. Seus dados não são
        compartilhados com terceiros.
      </p>
      <p className={s.status} role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
