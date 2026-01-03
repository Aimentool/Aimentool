// InfoHub Content
const hubData = [
    { q: "Mi az AIMentool?", a: "Egy komplex üzleti operációs rendszer, amely az AI segítségével automatizálja a marketinget, az értékesítést és az adminisztrációt." },
    { q: "Kinek ajánlott?", a: "Olyan kkv-knak és egyéni vállalkozóknak, akik napi 2-4 órát szeretnének felszabadítani a rutinfeladatok alól." },
    { q: "Biztonság és GDPR?", a: "Rendszereink 256 bites titkosítással dolgoznak, és maradéktalanul megfelelnek az EU-s adatvédelmi előírásoknak." },
    { q: "Emberi kontroll?", a: "Az AI csak a végrehajtó. A stratégiai döntéseket és a végső jóváhagyást minden esetben a felhasználó (Ön) tartja a kezében." }
];

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    
    // Render InfoHub
    const container = document.getElementById('hub-container');
    hubData.forEach(item => {
        container.innerHTML += `
            <div class="glass-card p-6 cursor-pointer group">
                <h4 class="font-bold text-[#78D0C2] mb-3 group-hover:translate-x-1 transition-transform">${item.q}</h4>
                <p class="text-sm text-[#BCE8E1]/60 leading-relaxed">${item.a}</p>
            </div>
        `;
    });
});

// Modal Logic
function openLegal(type) {
    const modal = document.getElementById('legalModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    modal.classList.remove('hidden');
    
    if(type === 'aszf') {
        title.innerText = "Általános Szerződési Feltételek";
        body.innerHTML = "<p>Az AIMentool szolgáltatásait havidíjas rendszerben biztosítja. A szerződés határozatlan időre szól...</p>";
    } else if(type === 'adatkezelés') {
        title.innerText = "Adatkezelési Tájékoztató";
        body.innerHTML = "<p>Személyes adatait kizárólag a szolgáltatás teljesítéséhez használjuk fel. Harmadik félnek nem adjuk ki...</p>";
    }
}

function closeModal() {
    document.getElementById('legalModal').classList.add('hidden');
}
