document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Modulok betöltése (Egyszerű fetch loader)
    const loadSection = async (id, path) => {
        try {
            const response = await fetch(path);
            if (response.ok) {
                document.getElementById(id).innerHTML = await response.text();
            } else {
                console.error(`Hiba a betöltésnél: ${path}`);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Párhuzamos betöltés a gyorsaságért
    await Promise.all([
        loadSection('hero-root', 'sections/hero.html'),
        loadSection('services-root', 'sections/services.html'),
        loadSection('info-root', 'sections/info-hub.html'),
        loadSection('pricing-root', 'sections/pricing.html'),
        loadSection('footer-root', 'sections/footer.html')
    ]);

    // 2. AOS Animációk indítása (miután a DOM felépült)
    if(typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // 3. Modal Kezelés
    window.openModal = (type) => {
        const modal = document.getElementById('legalModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        
        modal.style.display = 'block';
        title.innerText = type === 'aszf' ? 'Általános Szerződési Feltételek' : 'Adatkezelési Tájékoztató';
        body.innerHTML = type === 'aszf' ? '<p>Ez az ÁSZF helye...</p>' : '<p>Ez az GDPR helye...</p>';
    };

    window.closeModal = () => {
        document.getElementById('legalModal').style.display = 'none';
    };
});
