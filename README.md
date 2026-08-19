# LP Teste 1 — Genos

Landing page de teste do **Genos**, consultoria de marketing para clínicas odontológicas.
Identidade visual preta e laranja.

> ⚠️ **Página de demonstração.** Os números, cases e depoimentos são fictícios e servem
> apenas de espaço reservado. Substitua por dados reais antes de qualquer uso comercial.

---

## Stack

Nenhuma. É HTML, CSS e JavaScript puros — sem build, sem dependência, sem `npm install`.
Isso é proposital: uma LP estática abre rápido, custa zero para hospedar e funciona em
qualquer serviço (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3...).

## Estrutura

```
.
├── index.html                 # a página inteira (todas as seções)
├── assets/
│   ├── css/styles.css         # design system: cores, tipografia, componentes
│   ├── js/main.js             # menu, animações, contadores e formulário
│   └── img/                   # favicon e imagem de compartilhamento (OG)
├── robots.txt                 # libera indexação pelos buscadores
├── sitemap.xml                # mapa do site
├── .nojekyll                  # impede o GitHub Pages de processar com Jekyll
└── .github/workflows/deploy.yml  # publica no GitHub Pages a cada push
```

## Rodar localmente

Basta abrir o `index.html` no navegador. Para um servidor local (recomendado, evita
problemas de caminho relativo):

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

---

## Publicação

### GitHub Pages (recomendado para este caso)

1. Vá em **Settings → Pages** no repositório.
2. Em *Build and deployment → Source*, escolha **GitHub Actions**.
3. Pronto. O workflow `.github/workflows/deploy.yml` publica a cada push.

A URL fica: `https://genosgroup.github.io/lp-teste1/`

> O repositório precisa ser **público** para o Pages funcionar no plano gratuito.
> Em repositório privado, o Pages exige GitHub Pro/Team.

Alternativa sem Actions: em *Source*, escolha **Deploy from a branch** → branch desejada → pasta `/ (root)`.

### Cloudflare Pages

Conecte o repositório em [pages.cloudflare.com](https://pages.cloudflare.com):
build command vazio, output directory `/`. Nenhum arquivo adicional é necessário.

---

## Personalização rápida

| O que mudar | Onde |
|---|---|
| Número de WhatsApp | `assets/js/main.js` (constante `WHATSAPP`) + links `wa.me` no `index.html` |
| Cores da marca | `assets/css/styles.css` → bloco `:root` (`--laranja`, `--preto`) |
| Textos e seções | `index.html` — cada seção é comentada (`<!-- ============ HERO ============ -->`) |
| E-mail de contato | `index.html`, rodapé |
| Domínio no SEO | `index.html` (`<link rel="canonical">`, `og:*`), `robots.txt`, `sitemap.xml` |

### Formulário de lead

O formulário (`#leadForm`) valida os campos no navegador e, ao enviar, monta uma mensagem
com os dados e abre o WhatsApp. Não há backend — nada é armazenado no servidor.

Para receber os leads por e-mail ou em uma planilha, troque o envio por um serviço de
formulários. Exemplo com [Formspree](https://formspree.io) (plano gratuito):

```html
<form id="leadForm" action="https://formspree.io/f/SEU_ID" method="POST">
```

...e remova o `e.preventDefault()` do `submit` em `assets/js/main.js`.
Alternativas equivalentes: Web3Forms, Getform, Basin ou uma Cloudflare Function.

---

## Acessibilidade e performance

- HTML semântico, `skip link`, `aria-*` no menu e no status do formulário.
- Respeita `prefers-reduced-motion` (desliga animações).
- Sem imagens pesadas: logo e capa são SVG.
- Layout responsivo em 3 breakpoints (980px, 720px).
