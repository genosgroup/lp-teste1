# LP Teste 1 — Genos

Landing page do **Genos**, consultoria de marketing para clínicas odontológicas.
Identidade visual preta e laranja.

> ⚠️ **Página de demonstração.** Os números, cases e depoimentos são fictícios e servem
> apenas de espaço reservado. Substitua por dados reais antes de qualquer uso comercial.

---

## Stack

- [React 19](https://react.dev) — componentes por seção
- [Vite](https://vite.dev) — dev server e build
- **CSS Modules** — um `.module.css` por componente, com escopo local
- Sem framework de CSS: o design system vive nas variáveis de `src/styles/base.css`

## Estrutura

```
.
├── index.html                   # casca da página: meta tags, fontes e <div id="root">
├── vite.config.js               # base do GitHub Pages e plugin do React
├── public/                      # copiado tal e qual para o build
│   ├── favicon.svg
│   ├── og-cover.svg             # imagem de compartilhamento (OG)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .nojekyll
└── src/
    ├── main.jsx                 # ponto de entrada (createRoot)
    ├── App.jsx                  # ordem das seções da página
    ├── config/site.js           # WhatsApp, e-mail e links de navegação
    ├── data/                    # o conteúdo de cada seção, separado do layout
    │   ├── pains.js  steps.js  services.js
    │   ├── cases.js  testimonials.js  faq.js
    │   └── stats.js  heroMetrics.js
    ├── hooks/
    │   ├── useReveal.js         # animação de entrada ao rolar
    │   ├── useScrolled.js       # sombra do header
    │   └── usePrefersReducedMotion.js
    ├── lib/revealObserver.js    # um IntersectionObserver para toda a página
    ├── styles/
    │   ├── base.css             # variáveis, reset, tipografia, .container
    │   └── grid.module.css      # grade de 3 colunas compartilhada
    └── components/              # uma pasta por componente: .jsx + .module.css
        ├── Header/  Hero/  Stats/  Pains/  Method/
        ├── Services/  Results/  Testimonials/  Faq/
        ├── LeadSection/  LeadForm/  Footer/  WhatsAppFloat/
        └── Button/  BrandLogo/  Section/  SectionHead/  Eyebrow/  Counter/
```

Cada seção segue o mesmo padrão: um componente-container (`Services.jsx`) que lê o
conteúdo de `src/data/` e renderiza um componente-item (`Service.jsx`) por registro.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173/lp-teste1/
```

Outros comandos:

```bash
npm run build      # gera dist/
npm run preview    # serve o dist/ para conferência antes de publicar
```

---

## Publicação

### GitHub Pages (recomendado para este caso)

1. Vá em **Settings → Pages** no repositório.
2. Em *Build and deployment → Source*, escolha **GitHub Actions**.
3. Pronto. O workflow `.github/workflows/deploy.yml` roda `npm ci && npm run build`
   e publica a pasta `dist/` a cada push.

A URL fica: `https://genosgroup.github.io/lp-teste1/`

> O repositório precisa ser **público** para o Pages funcionar no plano gratuito.
> Em repositório privado, o Pages exige GitHub Pro/Team.

### Cloudflare Pages / Netlify / Vercel

Build command `npm run build`, output directory `dist`. Nesses serviços o site fica na
raiz do domínio — troque `base` em `vite.config.js` para `'/'`.

---

## Personalização rápida

| O que mudar | Onde |
|---|---|
| Número de WhatsApp | `src/config/site.js` (constante `WHATSAPP`) |
| E-mail de contato | `src/config/site.js` (constante `EMAIL`) |
| Cores da marca | `src/styles/base.css` → bloco `:root` (`--laranja`, `--preto`) |
| Textos das seções | `src/data/` — um arquivo por seção |
| Título, hero e CTA | o `.jsx` da seção correspondente em `src/components/` |
| Ordem das seções | `src/App.jsx` |
| Domínio no SEO | `index.html` (`canonical`, `og:*`), `public/robots.txt`, `public/sitemap.xml` |
| Caminho da publicação | `vite.config.js` (`base`) |

### Formulário de lead

`src/components/LeadForm/LeadForm.jsx` valida os campos no navegador e, ao enviar, monta
uma mensagem com os dados e abre o WhatsApp. Não há backend — nada é armazenado.

Para receber os leads por e-mail ou em uma planilha, troque o `window.open` do
`aoEnviar` por um `fetch` para um serviço de formulários. Exemplo com
[Formspree](https://formspree.io) (plano gratuito):

```js
await fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados)
});
```

Alternativas equivalentes: Web3Forms, Getform, Basin ou uma Cloudflare Function.

---

## Acessibilidade e performance

- HTML semântico, `skip link`, `aria-*` no menu e no status do formulário.
- Respeita `prefers-reduced-motion` (desliga animações e contadores).
- Sem imagens pesadas: logo e capa são SVG.
- Layout responsivo em 2 breakpoints (980px, 720px).
