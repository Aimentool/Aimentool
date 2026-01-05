const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h, t = 0;
const isMobile = window.innerWidth < 768;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* PC-re pulzáló fénykarikák, mobilon kikapcsolva */
const pulses = isMobile
    ? []
    : Array.from({ length: 8 }).map(() => ({
        x: Math.random() * w * 0.6 + w * 0.3,
        y: Math.random() * h * 0.6 + h * 0.2,
        r: Math.random() * 100 + 140,
        phase: Math.random() * Math.PI * 2
    }));

function animate() {
    t++;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    pulses.forEach(p => {
        const pulse = Math.sin(t * 0.015 + p.phase) * 0.18 + 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(120,208,194,0.14)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 28;
        ctx.shadowColor = "#78D0C2";
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

animate();
