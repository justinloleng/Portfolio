/* ══════════════════════════════════════════════
   ASSC PORTFOLIO — MAIN.JS
   Animations, Scroll Triggers, Carousels
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── GSAP SETUP ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── CUSTOM CURSOR ── */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  const hoverTargets = document.querySelectorAll('a, button, .project-card, .stack-item, .assc-title, .btn-enter');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '0.6';
  });

  /* ── ASSC TITLE JIGGLE ON CLICK ── */
  const asscTitle = document.querySelector('.assc-title');
  if (asscTitle) {
    asscTitle.addEventListener('click', () => {
      asscTitle.classList.remove('jiggle');
      void asscTitle.offsetWidth;
      asscTitle.classList.add('jiggle');
      setTimeout(() => asscTitle.classList.remove('jiggle'), 800);
    });
  }

  /* ── REVEAL ON SCROLL (only non-card .reveal-items) ── */
  document.querySelectorAll('.reveal-item').forEach(el => {
    // Skip project cards — handled separately below
    if (el.classList.contains('project-card')) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('revealed'),
      once: true
    });
  });

  /* ── SECTION LABELS SLIDE IN ── */
  document.querySelectorAll('.section-label').forEach(label => {
    gsap.from(label, {
      x: -60, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: label, start: 'top 85%', once: true }
    });
  });

  /* ── HERO PARALLAX ── */
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ── ASSC TITLE STAGGER ── */
  gsap.from('.assc-line',   { y: 80, opacity: 0, rotateZ: 8, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.6 });
  gsap.from('.hero-handle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 });
  gsap.from('.hero-role',   { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.5 });
  gsap.from('.btn-enter',   { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.7 });

  /* ── PROJECT CARDS ── */
  const cards = document.querySelectorAll('.project-card');

  // ✅ FIX: add a CSS class to make cards visible by default
  // This avoids GSAP inline style conflicts that caused the disappear bug
  cards.forEach(card => {
    card.classList.add('card-visible');
  });

  // Animate in once when section enters view
  ScrollTrigger.create({
    trigger: '.projects-section',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out'
          // ✅ NO clearProps — explicit "to" values keep cards visible after animation
        }
      );
    }
  });

  /* ── PROJECTS HORIZONTAL DRAG SCROLL ── */
  const trackWrap = document.querySelector('.projects-track-wrap');
  if (trackWrap) {
    let isDown          = false;
    let startX          = 0;
    let startScrollLeft = 0;
    let hasDragged      = false;

    trackWrap.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      isDown          = true;
      hasDragged      = false;
      startX          = e.clientX;
      startScrollLeft = trackWrap.scrollLeft;
      trackWrap.classList.add('is-dragging');
    });

    document.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      trackWrap.classList.remove('is-dragging');
    });

    document.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) hasDragged = true;
      trackWrap.scrollLeft = startScrollLeft - dx;
    });

    trackWrap.addEventListener('click', e => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    let touchStartX     = 0;
    let touchScrollLeft = 0;

    trackWrap.addEventListener('touchstart', e => {
      touchStartX     = e.touches[0].clientX;
      touchScrollLeft = trackWrap.scrollLeft;
    }, { passive: true });

    trackWrap.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - touchStartX;
      trackWrap.scrollLeft = touchScrollLeft - dx;
    }, { passive: true });
  }

  /* ── VISUAL LOG CAROUSEL ── */
  const logTrack = document.getElementById('log-track');
  const logDots  = document.querySelectorAll('.log-dot');
  let currentSlide  = 0;
  const totalSlides = 5;
  let autoPlayInterval;

  function goToSlide(idx) {
    currentSlide = idx;
    logTrack.style.transform = `translateX(${-(idx * 100 / totalSlides)}%)`;
    logDots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
  }

  logDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.idx));
      resetAutoPlay();
    });
  });

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => goToSlide((currentSlide + 1) % totalSlides), 4500);
  }
  resetAutoPlay();

  /* ── NAV SCROLL EFFECT ── */
  const nav = document.getElementById('main-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.pageYOffset;
    nav.style.borderBottomColor = curr > 100
      ? 'rgba(232,160,191,0.15)'
      : 'rgba(255,255,255,0.05)';
    lastScroll = curr;
  }, { passive: true });

  /* ── SMOOTH SCROLL FOR NAV LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── CONTACT HEADLINE SCROLL ANIMATION ── */
  gsap.from('.contact-headline', {
    y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-section', start: 'top 70%', once: true }
  });

  /* ── TECH STACK STAGGER ── */
  document.querySelectorAll('.stack-group').forEach(group => {
    gsap.from(group.querySelectorAll('.stack-item'), {
      y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true }
    });
  });

  /* ── NOISE RIPPLE ON SCROLL ── */
  const noiseOverlay = document.querySelector('.noise-overlay');
  if (noiseOverlay) {
    window.addEventListener('scroll', () => {
      const speed = Math.abs(window.pageYOffset - lastScroll);
      noiseOverlay.style.opacity = Math.min(0.08, 0.03 + speed * 0.002);
    }, { passive: true });
  }

  /* ── NAME SLASH / CROSSOUT TOGGLE ── */
  const heroHandle = document.getElementById('hero-handle');
  if (heroHandle) {
    heroHandle.addEventListener('click', () => {
      heroHandle.classList.toggle('name-crossed');
    });
  }

  /* ── CONTACT HEADLINE RUN AWAY ── */
  const contactHeadline = document.querySelector('.contact-headline');
  if (contactHeadline) {
    let isRunning = false;
    contactHeadline.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      gsap.to(contactHeadline, {
        x: '-120vw', opacity: 0, duration: 0.55, ease: 'power3.in',
        onComplete: () => {
          gsap.set(contactHeadline, { x: '120vw', opacity: 0 });
          gsap.to(contactHeadline, {
            x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            onComplete: () => { isRunning = false; }
          });
        }
      });
    });
  }

});