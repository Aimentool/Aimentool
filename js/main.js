/* ======================
   MOBILE MENU
====================== */
function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("hidden");
}

/* ======================
   INFOHUB
====================== */
const faq = [
    { q: "Mi az AIMentool?", a: "Egy komplex digitális rendszer vállalkozásoknak." },
    { q: "Kinek ajánlott?", a: "KKV-knak és egyéni vállalkozóknak." },
    { q: "Milyen gyors az indulás?", a: "Akár 7–14 napon belül." }
];

const hub = document.getElementById("hub-container");
const search = document.getElementById("searchInput");

function renderFaq(list) {
    hub.innerHTML = "";
    list.forEach(item => {
        const div = document.createElement("div");
        div.className = "glass-card p-6 cursor-pointer";
        div.innerHTML = `<strong>${item.q}</strong>`;
        div.onclick = () => openInfo(item.q, item.a);
        hub.appendChild(div);
    });
}

search.oninput = () => {
    renderFaq(
        faq.filter(f => f.q.toLowerCase().includes(search.value.toLowerCase()))
    );
};

renderFaq(faq);

function openInfo(q,a) {
    document.getElementById("modalQ").innerText = q;
    document.getElementById("modalA").innerText = a;
    document.getElementById("infoModal").classList.remove("hidden");
}
function closeInfo() {
    document.getElementById("infoModal").classList.add("hidden");
}

/* ======================
   LEGAL
====================== */
function openLegal() {
    document.getElementById("legalModal").classList.remove("hidden");
}
function closeLegal() {
    document.getElementById("legalModal").classList.add("hidden");
}
