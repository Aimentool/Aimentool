document.addEventListener('DOMContentLoaded', () => {
    // AOS Init
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50
    });

    // Modal kezelés
    window.openModal = (type) => {
        const modal = document.getElementById('legalModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        
        modal.style.display = 'block';
        title.innerText = type.toUpperCase();
        
        // Egyszerűsített tartalom betöltés
        const content = {
            'aszf': '<p>Általános Szerződési Feltételek...</p>',
            'adatkezelési': '<p>Adatvédelmi tájékoztató...</p>',
            'impresszum': '<p>AIMentool - 2025</p>'
        };
        body.innerHTML = content[type] || 'Betöltés...';
    };

    window.closeModal = () => {
        document.getElementById('legalModal').style.display = 'none';
    };

    // Modal bezárása kívülre kattintáskor
    window.onclick = (e) => {
        const modal = document.getElementById('legalModal');
        if (e.target == modal) closeModal();
    };
});
