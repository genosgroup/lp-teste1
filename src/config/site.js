/* Ponto único de configuração da LP: contato, navegação e textos do rodapé. */

/* Troque pelo número real da clínica/consultoria.
   Formato: código do país + DDD + número (só dígitos). */
export const WHATSAPP = '5511999999999';

export const EMAIL = 'contato@genos.com.br';

/** Monta um link wa.me já com a mensagem codificada. */
export function whatsappLink(mensagem) {
  const base = `https://wa.me/${WHATSAPP}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const NAV_LINKS = [
  { href: '#metodo', label: 'Método' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' }
];

export const FOOTER_NAV = [
  {
    titulo: 'Navegue',
    links: [
      { href: '#metodo', label: 'Método' },
      { href: '#servicos', label: 'Serviços' },
      { href: '#resultados', label: 'Resultados' },
      { href: '#faq', label: 'FAQ' }
    ]
  },
  {
    titulo: 'Contato',
    links: [
      { href: '#diagnostico', label: 'Diagnóstico gratuito' },
      { href: `mailto:${EMAIL}`, label: EMAIL },
      { href: `https://wa.me/${WHATSAPP}`, label: 'WhatsApp', external: true }
    ]
  }
];
