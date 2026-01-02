document.addEventListener('DOMContentLoaded', () => {
    
    // 1. AOS (Scroll animáció) inicializálás
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50
    });

    // 2. Levél lebegő animáció (Parallax hatás)
    const leafContainer = document.querySelector('.hero-leaf-container');
    if(leafContainer) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            leafContainer.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        });
    }

    // 3. Simább görgetés a horgonyokhoz
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log("AIMentool System v3.0 - Online");
});
