document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE MENU */
    window.toggleMenu = function () {
        document.getElementById("mobileMenu").classList.toggle("hidden");
    };

    /* MODAL */
    window.openModal = function (title, content) {
        const modal = document.getElementById("modal");
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalContent").innerText = content;
        modal.classList.remove("hidden");
    };

    window.closeModal = function () {
        document.getElementById("modal").classList.add("hidden");
    };

    /* INFOHUB */
    const faq = [
        { q: "Mi az AIMentool?", a: "Az AIMentool egy digitális operációs rendszer vállalkozásoknak." },
        { q: "Kinek ajánlott?", a: "Egyéni vállalkozóknak és KKV-knak." },
        { q: "Milyen gyors az indulás?", a: "Akár 7–14 napon belül." }
    ];

    const hub = document.getElementById("hub-container");
    const search = document.getElementById("searchInput");

    function renderFaq(list) {
        hub.innerHTML = "";
        list.forEach(i => {
            const d = document.createElement("div");
            d.className = "glass-card p-6 cursor-pointer";
            d.innerHTML = `<strong>${i.q}</strong>`;
            d.onclick = () => openModal(i.q, i.a);
            hub.appendChild(d);
        });
    }

    search.oninput = () =>
        renderFaq(faq.filter(f =>
            f.q.toLowerCase().includes(search.value.toLowerCase())
        ));

    renderFaq(faq);

    /* SERVICES */
    const sc = document.getElementById("servicesContainer");
    if (sc && typeof services !== "undefined") {
        services.forEach(s => {
            const d = document.createElement("div");
            d.className = "glass-card p-8 flex flex-col" + (s.featured ? " featured" : "");
            d.innerHTML = `
                ${s.featured ? '<span class="badge">Leggyakoribb</span>' : ""}
                <h3>${s.title}</h3>
                <div class="price">${s.price}</div>
                <ul class="list">
                    ${s.items.map(i => `<li>${i}</li>`).join("")}
                </ul>
                <a href="mailto:info@aimentool.hu"
                   class="card-btn ${s.featured ? "primary" : ""}">
                   ${s.cta}
                </a>
            `;
            sc.appendChild(d);
        });
    }

});
