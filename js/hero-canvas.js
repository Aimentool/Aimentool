/* =========================================================
   PC HERO – FINOM, ORGANIKUS, NEM TOLAKODÓ
   ========================================================= */

const pcCanvas = document.getElementById("heroCanvas");

if (pcCanvas && window.innerWidth >= 768) {
    const ctx = pcCanvas.getContext("2d");
    let w, h, t = 0;

    function resize() {
        w = pcCanvas.width = window.innerWidth;
        h = pcCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const arcs = Array.from({ length: 7 }).map(() => ({
        x: Math.random() * w * 0.6 + w * 0.2,
        y: Math.random() * h * 0.6 + h * 0.2,
        r: Math.random() * 160 + 180,
        phase: Math.random() * Math.PI * 2
    }));

    function animatePC() {
        t += 0.005;
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";

        arcs.forEach(a => {
            const p = Math.sin(t + a.phase) * 0.25 + 1;
            ctx.beginPath();
            ctx.arc(a.x, a.y, a.r * p, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(120,208,194,0.12)";
            ctx.lineWidth = 2;
            ctx.shadowBlur = 26;
            ctx.shadowColor = "#78D0C2";
            ctx.stroke();
        });

        requestAnimationFrame(animatePC);
    }

    animatePC();
}

/* =========================================================
   MOBIL HERO – LEVÉL EREZET, LASSÚ KIRAJZOLÁS
   ========================================================= */

const mobileCanvas = document.getElementById("neural-canvas");

if (mobileCanvas && window.innerWidth < 768) {
    const ctx = mobileCanvas.getContext("2d");
    let w, h, progress = 0;

    function resize() {
        w = mobileCanvas.width = window.innerWidth;
        h = mobileCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const spine = [];
    const veins = [];

    // FŐ LEVÉL GERINC
    for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        spine.push({
            x: w * 0.5 + Math.sin(t * 2) * 18,
            y: h * (0.85 - t * 0.7)
        });
    }

    // OLDAL EREK
    spine.forEach((p, i) => {
        if (i % 3 === 0 && i > 4) {
            const len = Math.random() * 60 + 40;
            const dir = Math.random() > 0.5 ? 1 : -1;
            veins.push({
                start: p,
                end: {
                    x: p.x + dir * len,
                    y: p.y - len * 0.3
                }
            });
        }
    });

    function drawLeaf() {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";

        const max = Math.floor(spine.length * progress);

        // GERINC
        ctx.beginPath();
        spine.slice(0, max).forEach((p, i) => {
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = "rgba(100,255,218,0.9)";
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 22;
        ctx.shadowColor = "#64ffda";
        ctx.stroke();

        // OLDAL EREK
        veins.forEach(v => {
            if (Math.random() < progress) {
                ctx.beginPath();
                ctx.moveTo(v.start.x, v.start.y);
                ctx.lineTo(v.end.x, v.end.y);
                ctx.strokeStyle = "rgba(100,255,218,0.45)";
                ctx.lineWidth = 1.2;
                ctx.shadowBlur = 12;
                ctx.stroke();
            }
        });

        progress += 0.0035;
        if (progress < 1) requestAnimationFrame(drawLeaf);
    }

    drawLeaf();
}
