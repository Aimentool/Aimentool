const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h, particles = [], mouse = { x: 0, y: 0 };

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const PARTICLE_COUNT = isMobile ? 70 : 140;
const CONNECT_DIST = isMobile ? 90 : 140;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
    constructor(tx, ty) {
        this.tx = tx;
        this.ty = ty;
        this.x = tx + Math.random() * 20;
        this.y = ty + Math.random() * 20;
        this.vx = 0;
        this.vy = 0;
        this.phase = Math.random() * Math.PI * 2;
    }

    update() {
        const dx = this.tx - this.x;
        const dy = this.ty - this.y;

        this.vx += dx * 0.002;
        this.vy += dy * 0.002;

        const mx = this.x - mouse.x;
        const my = this.y - mouse.y;
        const dist = Math.sqrt(mx * mx + my * my);
        if (dist < 120) {
            this.vx += mx * 0.01;
            this.vy += my * 0.01;
        }

        this.vx *= 0.92;
        this.vy *= 0.92;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(t) {
        const pulse = Math.sin(t * 0.002 + this.phase) * 1.5 + 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120,208,194,0.9)";
        ctx.shadowBlur = isMobile ? 8 : 15;
        ctx.shadowColor = "#78D0C2";
        ctx.fill();
    }
}

function createShape() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const t = i / PARTICLE_COUNT;
        const x = w * 0.3 + t * w * 0.4;
        const y = h * 0.65 - Math.pow(t, 1.8) * h * 0.5 + Math.sin(t * 6) * 30;
        particles.push(new Particle(x, y));
    }
}

createShape();

canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < CONNECT_DIST) {
                ctx.strokeStyle = `rgba(31,175,154,${1 - d / CONNECT_DIST})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    particles.forEach(p => p.update());
    drawConnections();
    particles.forEach(p => p.draw(t));

    requestAnimationFrame(animate);
}

animate(0);
