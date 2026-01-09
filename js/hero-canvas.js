const canvas = document.getElementById("heroCanvas");
if (!canvas) return;

const ctx = canvas.getContext("2d");

let w, h, t = 0;
const isMobile = window.innerWidth < 768;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ======================
   PULSES
   ====================== */
const pulseCount = isMobile ? 18 : 8;

const pulses = Array.from({ length: pulseCount }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * (isMobile ? 70 : 140) + 60,
    phase: Math.random() * Math.PI * 2
}));

/* ======================
   SPARKLES (MOBILE EXTRA)
   ====================== */
const sparkles = isMobile
    ? Array.from({ length: 60 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        p: Math.random() * Math.PI * 2
    }))
    : [];

function animate() {
    t += 0.6;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    /* Pulses */
    pulses.forEach(p => {
        const pulse = Math.sin(t * 0.02 + p.phase) * 0.25 + 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isMobile
            ? "rgba(120,208,194,0.22)"
            : "rgba(120,208,194,0.14)";
        ctx.lineWidth = isMobile ? 2.5 : 2;
        ctx.shadowBlur = isMobile ? 35 : 28;
        ctx.shadowColor = "#78D0C2";
        ctx.stroke();
    });

    /* Sparkles (mobile only) */
    sparkles.forEach(s => {
        const flicker = Math.sin(t * 0.08 + s.p) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * flicker, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230,247,244,0.6)";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
