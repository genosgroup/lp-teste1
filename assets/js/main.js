/* =========================================================
   Genos — Landing Page
   Interações: menu, scroll, reveal, contadores e formulário
   ========================================================= */
(function () {
  'use strict';

  /* -------- CONFIGURAÇÃO -------------------------------
     Troque pelo número real da clínica/consultoria.
     Formato: código do país + DDD + número (só dígitos).  */
  var WHATSAPP = '5511999999999';

  /* -------- Ano no rodapé ------------------------------ */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* -------- Header com sombra ao rolar ----------------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Menu mobile -------------------------------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  toggle.addEventListener('click', function () {
    var aberto = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* -------- Reveal ao entrar na viewport --------------- */
  var alvos = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('visible'); });
  }

  /* -------- Contadores animados ------------------------ */
  function animarContador(el) {
    var alvo = parseFloat(el.dataset.target);
    var casas = parseInt(el.dataset.decimal || '0', 10);
    var prefixo = el.dataset.prefix || '';
    var sufixo = el.dataset.suffix || '';
    var duracao = 1500;
    var inicio = null;

    // data-decimal="1" com target 42 renderiza 4,2
    var final = casas ? alvo / Math.pow(10, casas) : alvo;

    function formatar(v) {
      return v.toLocaleString('pt-BR', {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
      });
    }

    function passo(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / duracao, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefixo + formatar(final * eased) + sufixo;
      if (p < 1) requestAnimationFrame(passo);
      else el.textContent = prefixo + formatar(final) + sufixo;
    }

    requestAnimationFrame(passo);
  }

  var contadores = document.querySelectorAll('.counter');
  var semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (semAnimacao || !('IntersectionObserver' in window)) {
    contadores.forEach(function (el) {
      var casas = parseInt(el.dataset.decimal || '0', 10);
      var v = parseFloat(el.dataset.target) / Math.pow(10, casas);
      el.textContent = (el.dataset.prefix || '') +
        v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) +
        (el.dataset.suffix || '');
    });
  } else {
    var obsNum = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          obsNum.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.5 });

    contadores.forEach(function (el) { obsNum.observe(el); });
  }

  /* -------- Formulário de lead ------------------------- */
  var form = document.getElementById('leadForm');
  var status = document.getElementById('formStatus');
  var whatsInput = document.getElementById('whatsapp');

  // Máscara (00) 00000-0000
  whatsInput.addEventListener('input', function () {
    var d = this.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 6) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    else if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    else if (d.length > 0) out = '(' + d;
    this.value = out;
  });

  function marcarErro(campo, mensagem) {
    var wrapper = campo.closest('.field');
    wrapper.classList.add('invalid');
    var alvo = wrapper.querySelector('[data-error-for="' + campo.id + '"]');
    if (alvo) alvo.textContent = mensagem;
  }

  function limparErro(campo) {
    var wrapper = campo.closest('.field');
    wrapper.classList.remove('invalid');
    var alvo = wrapper.querySelector('[data-error-for="' + campo.id + '"]');
    if (alvo) alvo.textContent = '';
  }

  form.addEventListener('input', function (e) {
    if (e.target.matches('input, select')) limparErro(e.target);
  });

  function validar() {
    var erros = [];
    var obrigatorios = form.querySelectorAll('[required]');

    obrigatorios.forEach(function (campo) {
      var valor = campo.value.trim();

      if (!valor) {
        marcarErro(campo, 'Campo obrigatório.');
        erros.push(campo);
        return;
      }
      if (campo.id === 'nome' && valor.length < 3) {
        marcarErro(campo, 'Informe o nome completo.');
        erros.push(campo);
        return;
      }
      if (campo.id === 'whatsapp' && valor.replace(/\D/g, '').length < 10) {
        marcarErro(campo, 'Informe DDD + número.');
        erros.push(campo);
      }
    });

    return erros;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    var erros = validar();
    if (erros.length) {
      status.textContent = 'Revise os campos destacados.';
      erros[0].focus();
      return;
    }

    var dados = {
      nome: form.nome.value.trim(),
      clinica: form.clinica.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      cidade: form.cidade.value.trim(),
      faturamento: form.faturamento.value,
      desafio: form.desafio.value.trim()
    };

    // Sem backend: a LP monta a mensagem e abre o WhatsApp.
    // Para receber por e-mail, veja as instruções no README.
    var linhas = [
      'Olá! Quero solicitar o diagnóstico gratuito do Genos.',
      '',
      'Nome: ' + dados.nome,
      'Clínica: ' + dados.clinica,
      'WhatsApp: ' + dados.whatsapp,
      'Cidade: ' + dados.cidade,
      'Faturamento: ' + dados.faturamento
    ];
    if (dados.desafio) linhas.push('Desafio: ' + dados.desafio);

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n'));

    status.textContent = 'Tudo certo! Abrindo o WhatsApp…';
    window.open(url, '_blank', 'noopener');
    form.reset();
  });
})();
