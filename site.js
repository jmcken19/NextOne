/* NextOne Fellowship — shared nav behaviour for every page. */
(function () {
  'use strict';

  /* Nav background once the page scrolls (home page only; inner pages use .solid) */
  const nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('solid')) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Hamburger / mobile menu */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const setOpen = (isOpen) => {
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });
  /* Close the menu if the window grows past the mobile breakpoint */
  window.matchMedia('(min-width: 769px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
}());
