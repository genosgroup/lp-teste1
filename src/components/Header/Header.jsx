import { useState } from 'react';
import BrandLogo from '../BrandLogo/BrandLogo';
import Button from '../Button/Button';
import { useScrolled } from '../../hooks/useScrolled';
import { NAV_LINKS } from '../../config/site';
import s from './Header.module.css';

export default function Header() {
  const scrolled = useScrolled();
  const [aberto, setAberto] = useState(false);

  // Qualquer clique num link fecha o menu mobile.
  const fechar = () => setAberto(false);

  return (
    <header className={`${s.siteHeader} ${scrolled ? s.scrolled : ''}`} id="topo">
      <div className={`container ${s.inner}`}>
        <BrandLogo />

        <nav
          className={`${s.nav} ${aberto ? s.open : ''}`}
          id="nav"
          aria-label="Navegação principal"
          onClick={fechar}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <Button href="#diagnostico" size="sm" className={s.navCta}>
            Diagnóstico gratuito
          </Button>
        </nav>

        <button
          type="button"
          className={s.toggle}
          id="navToggle"
          aria-expanded={aberto}
          aria-controls="nav"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
