document.addEventListener('DOMContentLoaded', () => {
    
    // 1. AOS Inicializálás
    AOS.init({ duration: 1000, once: true, offset: 50 });

    // 2. Parallax Levél Effekt
    const leafContainer = document.querySelector('.hero-leaf-container');
    if(leafContainer) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            leafContainer.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        });
    }

    // 3. Sima görgetés
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. MODAL KEZELÉS (EZ AZ ÚJ RÉSZ)
    window.openModal = (type) => {
        const modal = document.getElementById('legalModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        
        // Tartalom betöltése típus szerint
        const contents = {
            'aszf': 'Ez a weboldal Általános Szerződési Feltételei (Minta). Itt részletezzük a szolgáltatás nyújtásának feltételeit...',
            'adat': 'Adatkezelési Tájékoztató (GDPR). Személyes adatait bizalmasan kezeljük és harmadik félnek nem adjuk ki...',
            'impresszum': 'AIMentool System<br>Székhely: Budapest<br>Email: info@aimentool.com<br>Adószám: 12345678-1-42'
        };

        title.innerText = type === 'aszf' ? 'Általános Szerződési Feltételek' : 
                          type === 'adat' ? 'Adatkezelési Tájékoztató' : 'Impresszum';
        
        body.innerHTML = `<p>${contents[type] || 'Hamarosan...'}</p>`;
        
        // Megjelenítés
        modal.classList.remove('hidden');
    };

    window.closeModal = () => {
        document.getElementById('legalModal').classList.add('hidden');
    };

    // ESC gombra bezárás
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") window.closeModal();
    });

    console.log("AIMentool System v3.5 - Full Modules Online");
});
