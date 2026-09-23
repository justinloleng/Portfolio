/* ==============================================
   JUSTIN GERALD LOLENG - PORTFOLIO
   Theme, navigation and GSAP animations
   ============================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const hasGsap = !!(window.gsap && window.ScrollTrigger);

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add('anim-ready');
  } else {
    root.classList.remove('js'); // no GSAP: show everything as-is
  }

  /* ==================================================
     THEME (dusk / night)
  ================================================== */
  const themeBtn = $('#themeToggle');
  const bgNight = $('#bgNight');
  const bgStars = $('#bgStars');
  const bgGlow = $('#bgGlow');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncThemeButton() {
    const dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Background layers get inline opacity from GSAP so the crossfade can tween from wherever it is
  function paintThemeLayers(duration) {
    if (!hasGsap) return;
    const dark = currentTheme() === 'dark';
    gsap.to(bgNight, { opacity: dark ? 1 : 0, duration, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(bgStars, { opacity: dark ? 1 : 0, duration: duration * 1.3, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(bgGlow, { opacity: dark ? 0 : 1, duration, ease: 'power2.inOut', overwrite: 'auto' });
  }

  function setTheme(theme, animate) {
    root.setAttribute('data-theme', theme);
    syncThemeButton();
    paintThemeLayers(animate ? 1.4 : 0);
    if (animate && hasGsap) {
      const icon = theme === 'dark' ? $('.icon-moon', themeBtn) : $('.icon-sun', themeBtn);
      gsap.fromTo(icon, { rotate: -120, scale: 0.3 }, { rotate: 0, scale: 1, duration: 0.6, ease: 'back.out(2.2)' });
    }
  }

  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    setTheme(next, true);
  });

  // Follow the OS setting until the visitor picks one
  if (window.matchMedia) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
      if (!saved) setTheme(e.matches ? 'dark' : 'light', true);
    });
  }

  syncThemeButton();
  paintThemeLayers(0);

  /* ==================================================
     NAV: scrolled state, mobile menu
  ================================================== */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const menuBtn = $('#menuToggle');

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('is-open')));
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('is-open') && !e.target.closest('#navLinks, #menuToggle')) setMenu(false);
  });

  /* ==================================================
     COPY EMAIL + TOAST
  ================================================== */
  const toast = $('#toast');
  let toastTimer = 0;

  function showToast(msg) {
    toast.textContent = msg;
    if (hasGsap) {
      gsap.killTweensOf(toast);
      gsap.fromTo(toast, { y: 90 }, { y: 0, duration: 0.45, ease: 'back.out(2)' });
      gsap.to(toast, { y: 90, duration: 0.35, ease: 'power2.in', delay: 2.4 });
    } else {
      toast.style.transform = 'none';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toast.style.transform = ''; }, 2400);
    }
  }

  $('#copyEmail').addEventListener('click', () => {
    const email = 'lolengjustingerald@gmail.com';
    const done = () => showToast('Email copied to clipboard');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(done, () => showToast(email));
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.remove();
      ok ? done() : showToast(email);
    }
  });

  /* ==================================================
     STACK: marquee rows (built from the chips) + filter
  ================================================== */
  const chips = $$('#bento .chip');

  function marqueeItem(chip) {
    const item = document.createElement('span');
    item.className = 'marquee__item';
    const icon = $('.chip__icon', chip).cloneNode(true);
    const name = document.createElement('span');
    name.textContent = $('.chip__name', chip).textContent;
    item.append(icon, name);
    return item;
  }

  function buildMarquee() {
    const withLogos = chips.filter((c) => $('img.chip__icon', c) && !/Workbench/.test(c.textContent));
    const half = Math.ceil(withLogos.length / 2);
    [[$('#marqueeA'), withLogos.slice(0, half)], [$('#marqueeB'), withLogos.slice(half)]].forEach(([row, list]) => {
      // Two identical copies so shifting by -50% loops seamlessly
      for (let copy = 0; copy < 2; copy++) list.forEach((c) => row.appendChild(marqueeItem(c)));
    });
  }
  buildMarquee();

  const filterBtns = $$('.filter__btn');
  function applyFilter(mode) {
    filterBtns.forEach((b) => {
      const on = b.dataset.filter === mode;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const pro = chips.filter((c) => c.hasAttribute('data-pro'));
    const rest = chips.filter((c) => !c.hasAttribute('data-pro'));
    if (!hasGsap) {
      rest.forEach((c) => { c.style.opacity = mode === 'pro' ? '0.3' : ''; });
      return;
    }
    if (mode === 'pro') {
      gsap.to(rest, { opacity: 0.22, scale: 0.96, filter: 'grayscale(1)', duration: 0.35, stagger: 0.012, overwrite: 'auto' });
      gsap.fromTo(pro, { scale: 0.92 }, { opacity: 1, scale: 1, filter: 'grayscale(0)', duration: 0.5, stagger: 0.03, ease: 'back.out(3)', overwrite: 'auto' });
    } else {
      gsap.to(chips, { opacity: 1, scale: 1, filter: 'grayscale(0)', duration: 0.35, stagger: 0.01, overwrite: 'auto', clearProps: 'filter,transform' });
    }
  }
  filterBtns.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* ==================================================
     FOOTER TRAY CLOCK (Philippine time)
  ================================================== */
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Manila' });
  function tick() {
    const now = new Date();
    clock.textContent = fmt.format(now);
    clock.setAttribute('datetime', now.toISOString());
  }
  tick();
  setInterval(tick, 15000);

  if (!hasGsap) return;

  /* ==================================================
     EVERYTHING BELOW IS GSAP
  ================================================== */

  // Split text into word > char spans, keeping real spaces so lines can still wrap
  function splitChars(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const out = [];
    words.forEach((w, i) => {
      const word = document.createElement('span');
      word.style.display = 'inline-block';
      word.style.whiteSpace = 'nowrap';
      for (const ch of w) {
        const c = document.createElement('span');
        c.className = 'char';
        c.textContent = ch;
        word.appendChild(c);
        out.push(c);
      }
      el.appendChild(word);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return out;
  }

  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    return words.map((w, i) => {
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      return s;
    });
  }

  /* ---------- Stars + shooting stars (visible at night) ---------- */
  function buildStars(animated) {
    const count = window.innerWidth < 700 ? 28 : 56;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star' + (Math.random() < 0.18 ? ' star--big' : '');
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      bgStars.appendChild(s);
      if (animated) {
        gsap.fromTo(s, { opacity: gsap.utils.random(0.1, 0.4) }, {
          opacity: gsap.utils.random(0.7, 1),
          duration: gsap.utils.random(0.8, 2.6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 3)
        });
      } else {
        s.style.opacity = gsap.utils.random(0.4, 1).toFixed(2);
      }
    }
  }

  function shootingStar() {
    if (currentTheme() === 'dark' && !document.hidden) {
      const el = document.createElement('span');
      el.className = 'shooting-star';
      el.style.left = gsap.utils.random(35, 95) + '%';
      el.style.top = gsap.utils.random(2, 40) + '%';
      bgStars.appendChild(el);
      gsap.timeline({ onComplete: () => el.remove() })
        .set(el, { rotation: 156, scaleX: 0.2 })
        .to(el, { x: -460, y: 205, scaleX: 1, duration: 1.1, ease: 'power1.in' }, 0)
        .to(el, { opacity: 1, duration: 0.25 }, 0)
        .to(el, { opacity: 0, duration: 0.35 }, 0.75);
    }
    gsap.delayedCall(gsap.utils.random(3.5, 8), shootingStar);
  }

  /* ---------- Hero intro ---------- */
  function heroIntro() {
    const lines = $$('.hero__line');
    const chars = lines.flatMap(splitChars);
    gsap.set(lines, { visibility: 'visible' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.bg', { scale: 1.18, duration: 2.4, ease: 'power2.out' }, 0)
      .from(nav, { yPercent: -110, autoAlpha: 0, duration: 0.8, clearProps: 'transform' }, 0.2)
      .from(chars, {
        yPercent: 120,
        autoAlpha: 0,
        rotate: () => gsap.utils.random(-14, 14),
        duration: 0.7,
        ease: 'back.out(1.8)',
        stagger: 0.035
      }, 0.35)
      .fromTo('[data-hero]', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.9)
      .fromTo('[data-hero-window]', { autoAlpha: 0, x: 60, rotateY: -18, transformPerspective: 900 },
        { autoAlpha: 1, x: 0, rotateY: 0, duration: 1, clearProps: 'transform' }, 1.1)
      .from('.scroll-cue', { autoAlpha: 0, y: -10, duration: 0.6 }, 1.8)
      .add(typeTerminal(), 1.6)
      .add(() => startRotator(), 2.2);

    gsap.to('.scroll-cue svg', { y: 6, duration: 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    // Fade the cue's contents (not the cue itself, which the intro above animates) as the page scrolls
    gsap.fromTo('.scroll-cue > *', { opacity: 1 }, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: '15% top', scrub: true }
    });
  }

  /* ---------- status.exe: types itself out ---------- */
  function typeTerminal() {
    const term = $('#terminal');
    const caret = $('.t-caret', term);
    term.style.minHeight = term.offsetHeight + 'px'; // lock height so nothing below jumps while typing
    const walker = document.createTreeWalker(term, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    }
    const tl = gsap.timeline();
    nodes.forEach((node) => {
      const full = node.nodeValue;
      const line = node.parentElement.closest('p');
      const isOutput = line.classList.contains('t-out');
      const state = { n: 0 };
      node.nodeValue = '';
      tl.to(state, {
        n: full.length,
        duration: full.length * (isOutput ? 0.006 : 0.03),
        ease: 'none',
        onStart: () => line.appendChild(caret), // caret rides along with the line being typed
        onUpdate: () => { node.nodeValue = full.slice(0, Math.round(state.n)); }
      }, isOutput ? '+=0.05' : '+=0.12');
    });
    return tl;
  }

  /* ---------- "I build ___" rotator ---------- */
  const PHRASES = ['full-stack web apps', 'REST APIs with RBAC', 'clean, fast UIs', 'things that ship'];

  function startRotator() {
    const rot = $('#rotator');
    let i = 0;

    // Fix the box to the widest phrase (in em, so it follows the responsive font size).
    // A changing width reflows the whole line every frame, which made the hero flicker.
    const fontPx = parseFloat(getComputedStyle(rot).fontSize);
    const widest = Math.max(...PHRASES.map((p) => { rot.textContent = p; return rot.getBoundingClientRect().width; }));
    rot.style.width = (widest / fontPx).toFixed(3) + 'em';
    rot.classList.add('is-stacked');

    // Each phrase is its own layer stacked in one grid cell, so the next one can roll in
    // while the previous rolls out and the box is never empty
    function phrase(text) {
      const layer = document.createElement('span');
      layer.className = 'rotator__phrase';
      const chars = Array.from(text).map((ch) => {
        const c = document.createElement('span');
        c.className = 'char';
        c.textContent = ch;
        layer.appendChild(c);
        return c;
      });
      rot.appendChild(layer);
      return { layer, chars };
    }

    rot.textContent = '';
    let current = phrase(PHRASES[0]);
    function next() {
      i = (i + 1) % PHRASES.length;
      const old = current;
      current = phrase(PHRASES[i]);
      gsap.to(old.chars, {
        yPercent: -110,
        autoAlpha: 0,
        duration: 0.35,
        stagger: 0.012,
        ease: 'power2.in',
        onComplete: () => old.layer.remove()
      });
      gsap.from(current.chars, { yPercent: 110, autoAlpha: 0, duration: 0.45, stagger: 0.015, ease: 'back.out(2)', delay: 0.12 });
      gsap.delayedCall(2.8, next);
    }
    gsap.delayedCall(2.4, next);
  }

  /* ---------- Background parallax + readability scrim ---------- */
  function scrollBackground() {
    gsap.set('.bg__layer', { transformOrigin: '50% 100%' });
    gsap.fromTo('.bg__layer', { scale: 1.14 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 }
    });
    gsap.to('#bgScrim', {
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top 30%', scrub: true }
    });
    // Slow breathing glow on the dusk horizon
    gsap.set(bgGlow, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
    gsap.to(bgGlow, { scale: 1.25, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  /* ---------- Section reveals ---------- */
  function reveals() {
    $$('.section__title').forEach((title) => {
      const words = splitWords(title);
      gsap.set(title, { visibility: 'visible' });
      gsap.from(words, {
        yPercent: 90,
        autoAlpha: 0,
        rotate: 5,
        duration: 0.8,
        stagger: 0.09,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: title, start: 'top 88%', once: true }
      });
    });

    ScrollTrigger.batch('[data-reveal]:not(.section__title)', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(batch, { autoAlpha: 0, y: 48 }, {
          autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', clearProps: 'transform'
        });
        batch.forEach((el, i) => {
          const kids = $$('.chip, .tags li, .project__points li, .facts > div, .stat', el);
          if (kids.length) {
            gsap.from(kids, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.04, delay: 0.3 + i * 0.12, ease: 'power2.out' });
          }
        });
      }
    });

    // Count-up stats
    $$('.stat__num[data-count]').forEach((el) => {
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const state = { v: 0 };
      el.textContent = '0' + suffix;
      gsap.to(state, {
        v: end,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = Math.round(state.v) + suffix; }
      });
    });

    // Timeline rail draws as you scroll; each stop lights up when the rail reaches it
    gsap.fromTo('#timelineFill', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#timeline', start: 'top 70%', end: 'bottom 55%', scrub: true }
    });
    $$('.tl').forEach((item) => {
      ScrollTrigger.create({ trigger: item, start: 'top 62%', toggleClass: 'is-lit' });
    });
  }

  /* ---------- Marquee: constant drift, boosted by scroll speed ---------- */
  function marquee() {
    const a = gsap.to('#marqueeA', { xPercent: -50, duration: 45, ease: 'none', repeat: -1 });
    const b = gsap.fromTo('#marqueeB', { xPercent: -50 }, { xPercent: 0, duration: 50, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      trigger: '.marquee',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
        gsap.to([a, b], {
          timeScale: boost,
          duration: 0.2,
          overwrite: true,
          onComplete: () => gsap.to([a, b], { timeScale: 1, duration: 1.2, ease: 'power1.out' })
        });
      }
    });
  }

  /* ---------- Nav: sliding indicator under the active section ---------- */
  function navIndicator() {
    const indicator = $('#navIndicator');
    const links = $$('a[data-section]', navLinks);
    let active = null;

    function moveTo(link) {
      active = link;
      links.forEach((l) => l.classList.toggle('is-active', l === link));
      if (!link || getComputedStyle(indicator).display === 'none') {
        gsap.to(indicator, { opacity: 0, duration: 0.3 });
        return;
      }
      gsap.to(indicator, { x: link.offsetLeft + 8, width: link.offsetWidth - 16, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }

    links.forEach((link) => {
      const section = document.getElementById(link.dataset.section);
      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) moveTo(link);
          else if (active === link) moveTo(null);
        }
      });
    });
    window.addEventListener('resize', () => { if (active) moveTo(active); });
  }

  /* ---------- Project cards tilt toward the pointer ---------- */
  function tilt() {
    $$('[data-tilt]').forEach((card) => {
      gsap.set(card, { transformPerspective: 1000 });
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 6);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      });
      card.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
  }

  /* ---------- Buttons: small squash on press ---------- */
  function buttonPop() {
    $$('.btn, .icon-btn, .filter__btn').forEach((btn) => {
      btn.addEventListener('pointerdown', () => {
        gsap.fromTo(btn, { scaleX: 1.06, scaleY: 0.9 }, { scaleX: 1, scaleY: 1, duration: 0.45, ease: 'elastic.out(1.2, 0.4)', clearProps: 'scale' });
      });
    });
  }

  /* ==================================================
     BOOT
  ================================================== */
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    buildStars(true);
    gsap.delayedCall(2.5, shootingStar);
    heroIntro();
    scrollBackground();
    reveals();
    marquee();
    navIndicator();
    buttonPop();
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) tilt();
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    buildStars(false);
    gsap.set('[data-reveal], [data-hero], [data-hero-window], .hero__line', { visibility: 'visible' });
    navIndicator();
  });

  // Pixel font metrics change layout once it loads, so re-measure trigger positions
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
