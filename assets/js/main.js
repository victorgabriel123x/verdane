/* ==========================================================================
   VERDANT HOUSE · animações
   Lenis (smooth scroll) + GSAP/ScrollTrigger.
   Tudo degrada com elegância: sem JS, sem lib ou com "reduzir movimento",
   a página continua completa e legível.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ---------- MENU MOBILE ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  drawer.querySelectorAll('a, button').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- NAVBAR AO ROLAR ---------- */
  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- SMOOTH SCROLL (Lenis) ---------- */
  var lenis = null;
  if (!reduced && typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.6
    });
    if (hasGSAP) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
    }
  }

  /* âncoras internas */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.scrollY - 12;
      if (lenis) lenis.scrollTo(y, { duration: 1.2 });
      else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------- SEM GSAP / MOVIMENTO REDUZIDO ---------- */
  if (!hasGSAP || reduced) {
    document.querySelectorAll('.r, .r-fade').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    return;
  }

  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  /* Espera as webfonts assentarem antes de medir linhas — senão o agrupamento
     linha-a-linha é calculado sobre a fonte de fallback e quebra no lugar errado. */
  function whenFontsReady(cb) {
    var fired = false;
    var go = function () { if (!fired) { fired = true; cb(); } };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); }
    setTimeout(go, 1200);
  }

  /* ---------- QUEBRA DE TÍTULOS EM LINHAS (reveal linha a linha) ---------- */
  /* Duas passadas:
     1) medição — cada palavra num <span> inline comum, com espaços reais como
        nós de texto entre eles, para o navegador quebrar as linhas do jeito dele;
     2) reconstrução — cada linha vira um bloco de texto normal.
     Nada de inline-block com espaço embutido: o navegador colapsa o espaço no
     fim de um inline-block e as palavras acabam grudadas. */
  function splitLines(el) {
    var words = el.textContent.replace(/\s+/g, ' ').trim().split(' ');
    if (!words[0]) return [];

    el.textContent = '';
    var probes = words.map(function (w, i) {
      var s = document.createElement('span');
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      return s;
    });

    // agrupa as palavras por posição vertical → linhas reais depois do wrap
    var lines = [], cur = null, lastTop = null;
    probes.forEach(function (s, i) {
      var top = Math.round(s.getBoundingClientRect().top);
      if (lastTop === null || Math.abs(top - lastTop) > 2) {
        cur = []; lines.push(cur); lastTop = top;
      }
      cur.push(words[i]);
    });

    el.textContent = '';
    return lines.map(function (group) {
      var mask = document.createElement('span');
      mask.style.cssText = 'display:block;overflow:hidden;';
      var inner = document.createElement('span');
      inner.style.cssText = 'display:block;will-change:transform,opacity;';
      inner.textContent = group.join(' ');
      mask.appendChild(inner);
      el.appendChild(mask);
      return inner;
    });
  }

  /* a tagline da hero fica escondida desde já, para não piscar antes do reveal */
  var heroLines = gsap.utils.toArray('.hero__tag .line');
  gsap.set(heroLines, { yPercent: 100, opacity: 0 });
  heroLines.forEach(function (p) {
    var w = document.createElement('span');
    w.style.cssText = 'display:block;overflow:hidden';
    p.parentNode.insertBefore(w, p); w.appendChild(p);
  });

  /* ---------- ENTRADA DA HERO (imediata — nada de tela vazia esperando fonte) ---------- */
  var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.hero__media img', { scale: 1.16, duration: 2.4, ease: 'power2.out' }, 0)
    .fromTo('.hero__eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.2)
    .fromTo('.hero__mark', { opacity: 0, y: 34, filter: 'blur(8px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 }, 0.3)
    .to(heroLines, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12 }, 0.7)
    .fromTo('.hero .btn-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1)
    .fromTo('.hero__foot', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 1.2)
    .fromTo('.scrollcue', { opacity: 0 }, { opacity: 1, duration: .8 }, 1.45);

  /* ---------- SPLIT DOS TÍTULOS (só depois da fonte, para medir a linha certa) ---------- */
  whenFontsReady(function () {
    document.querySelectorAll('[data-split]').forEach(function (el) {
      var lines = splitLines(el);
      gsap.set(lines, { yPercent: 108, opacity: 0 });
      ST.create({
        trigger: el, start: 'top 86%', once: true,
        onEnter: function () {
          gsap.to(lines, {
            yPercent: 0, opacity: 1, duration: 1.15,
            ease: 'expo.out', stagger: 0.085
          });
        }
      });
    });
    ST.refresh();
  });

  /* parallax da hero */
  gsap.to('#heroImg', {
    yPercent: 9, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__in', {
    yPercent: 14, opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* ---------- REVEALS GERAIS ----------
     A hero é excluída: ela já é animada pela timeline acima e dois tweens
     disputando a mesma opacity fazem o texto piscar. */
  gsap.utils.toArray('.hero .r, .hero .r-fade').forEach(function (el) {
    el.classList.remove('r', 'r-fade');
  });
  gsap.utils.toArray('.r').forEach(function (el) {
    gsap.fromTo(el, { opacity: 0, y: 28 }, {
      opacity: 1, y: 0, duration: 1.05, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });
  gsap.utils.toArray('.r-fade').forEach(function (el) {
    gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1, duration: 1.25, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  /* stagger nos pratos e na galeria */
  [['.dishes .dish', 0.09], ['.gal figure', 0.07], ['.ig__strip figure', 0.05], ['.exp__item', 0.11]]
    .forEach(function (pair) {
      var items = gsap.utils.toArray(pair[0]);
      if (!items.length) return;
      gsap.fromTo(items, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: pair[1],
        scrollTrigger: { trigger: items[0].parentNode, start: 'top 82%', once: true }
      });
    });

  /* ---------- PARALLAX DE IMAGENS ---------- */
  gsap.utils.toArray('[data-par]').forEach(function (img) {
    var amt = parseFloat(img.dataset.par) * 100;
    gsap.fromTo(img, { yPercent: -amt / 2 }, {
      yPercent: amt / 2, ease: 'none',
      scrollTrigger: { trigger: img.closest('figure, .frame, .drinks') || img, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ---------- LINHAS DOURADAS SENDO DESENHADAS ---------- */
  gsap.utils.toArray('.rule').forEach(function (rule) {
    gsap.fromTo(rule, { scaleX: 0.24, opacity: 0 }, {
      scaleX: 1, opacity: 1, duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: rule, start: 'top 90%', once: true }
    });
  });

  /* traços do mapa desenhados */
  gsap.utils.toArray('.map .grid-lines path').forEach(function (p, i) {
    var len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(p, {
      strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', delay: i * 0.07,
      scrollTrigger: { trigger: '.map', start: 'top 82%', once: true }
    });
  });

  /* ---------- ASSINATURA: o holofote dourado ---------- */
  /* A CSS centra o foco com translateX(-50%); o GSAP assume esse transform,
     então o -50% passa a viver no xPercent e a deriva oscila em volta dele. */
  var spot = document.getElementById('spot');
  gsap.set(spot, { xPercent: -50, x: 0 });
  gsap.to(spot, {
    yPercent: 30, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 }
  });
  gsap.to(spot, {
    xPercent: -42, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1
  });
  // a luz respira mais forte quando uma seção "acesa" entra em cena
  ['.drinks', '.finale', '#localizacao'].forEach(function (sel) {
    var s = document.querySelector(sel); if (!s) return;
    ST.create({
      trigger: s, start: 'top 62%', end: 'bottom 38%',
      onEnter:      function () { gsap.to(spot, { opacity: 1, duration: 1.4, ease: 'sine.out' }); },
      onLeave:      function () { gsap.to(spot, { opacity: .72, duration: 1.4 }); },
      onEnterBack:  function () { gsap.to(spot, { opacity: 1, duration: 1.4 }); },
      onLeaveBack:  function () { gsap.to(spot, { opacity: .72, duration: 1.4 }); }
    });
  });

  /* recalcula depois que fontes e imagens assentam */
  window.addEventListener('load', function () { ST.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
})();
