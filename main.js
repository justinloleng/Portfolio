/* ══════════════════════════════════════════════
   ASSC PORTFOLIO — MAIN.JS
   Animations, Scroll Triggers, Carousels
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── GSAP SETUP ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── REVEAL ON SCROLL ── */
  const revealItems = document.querySelectorAll('.reveal-item');
  revealItems.forEach(el => {
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
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ── HERO PARALLAX ── */
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ── ASSC TITLE STAGGER ── */
  gsap.from('.assc-line', {
    y: 80,
    opacity: 0,
    rotateZ: 8,
    duration: 1,
    stagger: 0.15,
    ease: 'power4.out',
    delay: 0.6
  });

  gsap.from('.hero-handle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.3
  });

  gsap.from('.hero-role', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.5
  });

  gsap.from('.btn-enter', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.7
  });

  /* ── PROJECTS HORIZONTAL DRAG SCROLL ── */
  const trackWrap = document.querySelector('.projects-track-wrap');
  if (trackWrap) {
    let isDown = false;
    let startX, scrollLeft;

    trackWrap.addEventListener('mousedown', e => {
      isDown = true;
      trackWrap.style.cursor = 'grabbing';
      startX = e.pageX - trackWrap.offsetLeft;
      scrollLeft = trackWrap.scrollLeft;
    });

    trackWrap.addEventListener('mouseleave', () => {
      isDown = false;
      trackWrap.style.cursor = 'grab';
    });

    trackWrap.addEventListener('mouseup', () => {
      isDown = false;
      trackWrap.style.cursor = 'grab';
    });

    trackWrap.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - trackWrap.offsetLeft;
      const walk = (x - startX) * 1.5;
      trackWrap.scrollLeft = scrollLeft - walk;
    });
  }

  /* ── VISUAL LOG CAROUSEL ── */
  const logTrack = document.getElementById('log-track');
  const logDots = document.querySelectorAll('.log-dot');
  let currentSlide = 0;
  const totalSlides = 5;
  let autoPlayInterval;

  function goToSlide(idx) {
    currentSlide = idx;
    const offset = -(idx * 100 / totalSlides);
    logTrack.style.transform = `translateX(${offset}%)`;
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

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 4500);
  }

  resetAutoPlay();

  /* ── NAV SCROLL EFFECT ── */
  const nav = document.getElementById('main-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.pageYOffset;
    if (curr > 100) {
      nav.style.borderBottomColor = 'rgba(232,160,191,0.15)';
    } else {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.05)';
    }
    lastScroll = curr;
  }, { passive: true });

  /* ── SMOOTH SCROLL FOR NAV LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── CONTACT HEADLINE ANIMATION ── */
  gsap.from('.contact-headline', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 70%',
      once: true
    }
  });

  /* ── TECH STACK STAGGER ── */
  document.querySelectorAll('.stack-group').forEach(group => {
    const items = group.querySelectorAll('.stack-item');
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ── PROJECT CARDS STAGGER ── */
  const cards = document.querySelectorAll('.project-card');
  gsap.from(cards, {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-section',
      start: 'top 75%',
      once: true
    }
  });

  /* ── NOISE RIPPLE ON SCROLL (subtle opacity pulse) ── */
  const noiseOverlay = document.querySelector('.noise-overlay');
  if (noiseOverlay) {
    window.addEventListener('scroll', () => {
      const scrollSpeed = Math.abs(window.pageYOffset - lastScroll);
      const opacity = Math.min(0.08, 0.03 + scrollSpeed * 0.002);
      noiseOverlay.style.opacity = opacity;
    }, { passive: true });
  }

});
