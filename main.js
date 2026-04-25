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

  // Track mouse position
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth ring follow with lerp
  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Hover expand on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .stack-item, .assc-title, .btn-enter');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Click pulse
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

  // Hide cursor when leaving window
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
      // Remove class first to allow re-triggering
      asscTitle.classList.remove('jiggle');
      // Force reflow so browser registers the removal
      void asscTitle.offsetWidth;
      asscTitle.classList.add('jiggle');
      // Remove class after animation ends
      setTimeout(() => asscTitle.classList.remove('jiggle'), 800);
    });
  }
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
    // Slide out to the left
    gsap.to(contactHeadline, {
      x: '-120vw',
      opacity: 0,
      duration: 0.55,
      ease: 'power3.in',
      onComplete: () => {
        // Instantly reposition off-screen RIGHT, then slide back in
        gsap.set(contactHeadline, { x: '120vw', opacity: 0 });
        gsap.to(contactHeadline, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => { isRunning = false; }
        });
      }
    });
  });
}
});
