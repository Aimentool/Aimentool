const loadSection = async (id, path) => {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error(`Hiba betöltésnél: ${path}`, e);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadSection("nav-root", "sections/nav.html"),
    loadSection("hero-root", "sections/hero.html"),
    loadSection("system-root", "sections/system.html"),
    loadSection("pricing-root", "sections/pricing.html"),
    loadSection("infohub-root", "sections/infohub.html"),
    loadSection("contact-root", "sections/contact.html"),
    loadSection("footer-root", "sections/footer.html"),
  ]);
});
