const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let time = 0;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const CONFIG = {
    nodes: isMobile ? 90 : 160,
    connectDist: isMobile ? 90 : 140,
    pulseSpeed: 0.002,
    energySpeed: 0.004,
    sparkleCount: isMobile ? 25 : 60
};

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ===============================
   CORE GEOMETRY
================================ */

const spine = [];
const nodes = [];
const sparks = [];

function buildSpine() {
    spine.length = 0;
    const steps = 80;

    for (let i = 0; i < steps; i++) {
        const t = i / steps;
        spine.push({
            x: w * 0.15 + t * w * 0.55,
            y: h * 0.72 - Math.pow(t, 1.9) * h * 0.55
        });
    }
}

function buildNodes() {
    nodes.length = 0;

    spine.forEach((p, i) => {
        if (i % 2 === 0) {
            nodes.push({
                x: p.x + Math.random() * 12,
                y: p.y + Math.random() * 12,
                tx: p.x,
                ty: p.y,
                phase: Math.random() * Math.PI * 2,
                energy: Math.random()
            });
        }
    });

    // levél kontúr
    for (let i = 0; i < 40; i++) {
        const t = i / 40;
        nodes.push({
            x: w * 0.7 + Math.sin(t * Math.PI) * 120,
            y: h * 0.35 - t * 180,
            tx: w * 0.7 + Math.sin(t * Math.PI) * 120,
            ty: h * 0.35 - t * 180,
            phase: Math.random() * Math.PI * 2,
            energy: Math.random()
        });
    }
}

function buildSparks() {
    sparks.length = 0;
    for (let i = 0; i < CONFIG.sparkleCount; i++) {
        sparks.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.8,
            r: Math.random() * 2 + 1,
            life: Math.random()
        });
    }
}

buildSpine();
buildNodes();
buildSparks();

/* ===============================
   DRAWING
================================ */

function drawSpine() {
    const pulse = Math.sin(time * CONFIG.pulseSpeed) * 0.4 + 1.4;

    ctx.beginPath();
    ctx.lineWidth = 3 * pulse;
    ctx.strokeStyle = "#78D0C2";
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#78D0C2";

    spine.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });

    ctx.stroke();
}

function drawNodes() {
    nodes.forEach(n => {
        n.x += (n.tx - n.x) * 0.02;
        n.y += (n.ty - n.y) * 0.02;

        const twinkle = Math.sin(time * 0.003 + n.phase) * 1.5 + 2.5;

        ctx.beginPath();
        ctx.arc(n.x, n.y, twinkle, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230,247,244,0.9)";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#E6F7F4";
        ctx.fill();
    });
}

function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < CONFIG.connectDist) {
                const flow = (time * CONFIG.energySpeed + nodes[i].energy) % 1;
                ctx.strokeStyle = `rgba(120,208,194,${1 - d / CONFIG.connectDist})`;
                ctx.lineWidth = 1.2;

                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(
                    nodes[i].x + (nodes[j].x - nodes[i].x) * flow,
                    nodes[i].y + (nodes[j].y - nodes[i].y) * flow
                );
                ctx.stroke();
            }
        }
    }
}

function drawSparks() {
    sparks.forEach(s => {
        s.life -= 0.01;
        if (s.life <= 0) {
            s.x = Math.random() * w;
            s.y = Math.random() * h * 0.8;
            s.r = Math.random() * 3 + 1;
            s.life = 1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,120,${s.life})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#FFD86A";
        ctx.fill();
    });
}

/* ===============================
   LOOP
================================ */

function animate() {
    time++;

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    drawSpine();        // 🔴 lüktetés
    drawConnections(); // 🟣 futó fény
    drawNodes();       // neuron pontok
    drawSparks();      // 🟡 csillogás

    requestAnimationFrame(animate);
}

animate();
