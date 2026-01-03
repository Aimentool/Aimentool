const hubData = [
    { q: "Mi az AIMentool?", a: "Egy komplex üzleti operációs rendszer, amely az AI segítségével automatizálja a marketinget, az értékesítést és az adminisztrációt." },
    { q: "Kinek ajánlott?", a: "Olyan kkv-knak és egyéni vállalkozóknak, akik napi 2–4 órát szeretnének felszabadítani a rutinfeladatok alól." },
    { q: "Biztonság és GDPR?", a: "Rendszereink megfelelnek az EU-s adatvédelmi előírásoknak." },
    { q: "Emberi kontroll?", a: "Az AI csak végrehajt, a döntés mindig az Öné." }
];

document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
    const c = document.getElementById("hub-container");
    hubData.forEach(i => {
        c.innerHTML += `
            <div class="glass-card p-6">
                <h4 class="font-bold text-[#78D0C2] mb-2">${i.q}</h4>
                <p class="text-sm text-[#BCE8E1]/60">${i.a}</p>
            </div>`;
    });
});
