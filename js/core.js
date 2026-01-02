async function load(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(file);
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", () => {
  load("nav-root", "sections/nav.html");
  load("hero-root", "sections/hero.html");
  load("system-root", "sections/system.html");
  load("pricing-root", "sections/pricing.html");
  load("infohub-root", "sections/infohub.html");
  load("contact-root", "sections/contact.html");
  load("footer-root", "sections/footer.html");
});
