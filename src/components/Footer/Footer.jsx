import BrandLogo from '../BrandLogo/BrandLogo';
import { FOOTER_NAV } from '../../config/site';
import s from './Footer.module.css';

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className={s.siteFooter}>
      <div className={`container ${s.inner}`}>
        <div className={s.brand}>
          <BrandLogo ariaLabel="Genos — topo da página" />
          <p>Consultoria de marketing para clínicas odontológicas. Método, dado e agenda cheia.</p>
        </div>

        <nav className={s.nav} aria-label="Rodapé">
          {FOOTER_NAV.map((coluna) => (
            <div key={coluna.titulo}>
              <h4>{coluna.titulo}</h4>
              {coluna.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${s.bottom}`}>
        <span>© {ano} Genos Group. Todos os direitos reservados.</span>
        <span className={s.demo}>
          Página de demonstração — números, cases e depoimentos são fictícios.
        </span>
      </div>
    </footer>
  );
}
