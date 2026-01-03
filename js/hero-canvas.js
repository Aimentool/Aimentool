const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let t = 0;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const CONFIG = {
    pulseCount: isMobile ? 3 : 6,
    sparkleCount: isMobile ? 20 : 45,
    flowCount: isMobile ? 2 : 4
};

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ===============================
   🔴 PULSE ZONES (LASSÚ LÜKTETÉS)
================================ */

const pulses = Array.from({ length: CONFIG.pulseCount }).map(() => ({
    x: Math.random() * w * 0.6 + w * 0.3,
    y: Math.random() * h * 0.6 + h * 0.2,
    r: Math.random() * 120 + 180,
    phase: Math.random() * Math.PI * 2
}));

function drawPulses() {
    pulses.forEach(p => {
        const pulse = Math.sin(t * 0.015 + p.phase) * 0.15 + 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(120,208,194,0.12)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#78D0C2";
        ctx.stroke();
    });
}

/* ===============================
   🟣 FLOWING LIGHT (EREK / HÁLÓ)
================================ */

const flows = Array.from({ length: CONFIG.flowCount }).map(() => ({
    y: Math.random() * h * 0.5 + h * 0.3,
    speed: Math.random() * 0.6 + 0.4
}));

function drawFlows() {
    flows.forEach(f => {
        const x = (t * f.speed * 0.6) % w;

        ctx.beginPath();
        ctx.moveTo(x - 120, f.y);
        ctx.lineTo(x, f.y - 40);
        ctx.lineTo(x + 120, f.y - 80);

        ctx.strokeStyle = "rgba(180,255,240,0.35)";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#BCE8E1";
        ctx.stroke();
    });
}

/* ===============================
   🟡 SPARKLES (CSILLOGÁS)
================================ */

const sparkles = Array.from({ length: CONFIG.sparkleCount }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    life: Math.random()
}));

function drawSparkles() {
    sparkles.forEach(s => {
        s.life -= 0.01;

        if (s.life <= 0) {
            s.x = Math.random() * w;
            s.y = Math.random() * h;
            s.r = Math.random() * 2 + 1;
            s.life = 1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,140,${s.life})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FFD86A";
        ctx.fill();
    });
}

/* ===============================
   LOOP
================================ */

function animate() {
    t++;

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    drawPulses();    // 🔴
    drawFlows();     // 🟣
    drawSparkles();  // 🟡

    requestAnimationFrame(animate);
}

animate();
