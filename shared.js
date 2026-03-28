// Hamburger / mobile nav
(function() {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavClose = document.getElementById('mobileNavClose');
  function toggleNav(open) {
    mobileNav.classList.toggle('open', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  hamburger.addEventListener('click', function() { toggleNav(true); });
  mobileNavClose.addEventListener('click', function() { toggleNav(false); });
  mobileNav.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', function() { toggleNav(false); }); });
})();

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Floating book + WhatsApp buttons
const fb = document.getElementById('floatBook');
const fw = document.getElementById('floatWa');
window.addEventListener('scroll', () => {
  const show = window.scrollY > 300;
  fb.classList.toggle('show', show);
  fw.classList.toggle('show', show);
});
