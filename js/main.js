/* ================= MOBILE MENU ================= */
function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("hidden");
}

/* ================= INFOHUB MODAL ================= */
function openInfo(q, a) {
    document.getElementById("modalQ").innerText = q;
    document.getElementById("modalA").innerText = a;
    document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo() {
    document.getElementById("infoModal").classList.add("hidden");
}

/* ================= LEGAL MODAL ================= */
function openLegal() {
    document.getElementById("legalModal").classList.remove("hidden");
}

function closeLegal() {
    document.getElementById("legalModal").classList.add("hidden");
}

/* ================= INFOHUB DATA + SEARCH ================= */
const faq = [
    {
        q: "Mi az AIMentool?",
        a: "Az AIMentool egy digitális operációs rendszer vállalkozásoknak, amely weboldalakat, automatizációt és AI-megoldásokat fog össze egy kézben."
    },
    {
        q: "Kinek ajánlott?",
        a: "Egyéni vállalkozóknak és KKV-knak, akik hatékony, mérhető online jelenlétet szeretnének."
    },
    {
        q: "Milyen gyors az indulás?",
        a: "Az alap rendszer akár 7–14 napon belül elindulhat."
    }
];

const hub = document.getElementById("hub-container");
const search = document.getElementById("searchInput");

function renderFaq(list) {
    hub.innerHTML = "";
    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "glass-card p-6 cursor-pointer";
        card.innerHTML = `<strong>${item.q}</strong>`;
        card.onclick = () => openInfo(item.q, item.a);
        hub.appendChild(card);
    });
}

search.oninput = () => {
    renderFaq(
        faq.filter(f =>
            f.q.toLowerCase().includes(search.value.toLowerCase())
        )
    );
};

renderFaq(faq);
