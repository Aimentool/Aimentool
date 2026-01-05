const data = [
    { q: "Mi az AIMentool?", a: "Egy komplex digitális rendszer vállalkozásoknak." },
    { q: "Kinek ajánlott?", a: "KKV-knak és egyéni vállalkozóknak." },
    { q: "Milyen gyors az indulás?", a: "Akár 7–14 napon belül." }
];

const container = document.getElementById("hub-container");
const input = document.getElementById("searchInput");

function render(items) {
    container.innerHTML = "";
    items.forEach(i => {
        const div = document.createElement("div");
        div.className = "glass-card p-6 cursor-pointer";
        div.innerHTML = `<strong>${i.q}</strong>`;
        div.onclick = () => alert(i.a);
        container.appendChild(div);
    });
}

input.oninput = () => {
    render(data.filter(d => d.q.toLowerCase().includes(input.value.toLowerCase())));
};

render(data);

function openLegal() {
    document.getElementById("legalModal").classList.remove("hidden");
}
function closeLegal() {
    document.getElementById("legalModal").classList.add("hidden");
}
