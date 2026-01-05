const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h, t = 0;
const mobile = window.innerWidth < 768;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const sparks = Array.from({ length: mobile ? 40 : 90 }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    life: Math.random()
}));

const pulses = Array.from({ length: mobile ? 4 : 8 }).map(() => ({
    x: Math.random() * w * .6 + w * .3,
    y: Math.random() * h * .6 + h * .2,
    r: Math.random() * 80 + 120,
    phase: Math.random() * Math.PI * 2
}));

function animate() {
    t++;
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = "lighter";

    // Sparkles
    sparks.forEach(s => {
        s.life -= .01;
        if (s.life <= 0) {
            s.x = Math.random() * w;
            s.y = Math.random() * h;
            s.life = 1;
        }
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(120,208,194,${s.life})`;
        ctx.shadowBlur = mobile ? 10 : 20;
        ctx.shadowColor = "#78D0C2";
        ctx.fill();
    });

    // Pulsing halos
    pulses.forEach(p => {
        const pulse = Math.sin(t * 0.015 + p.phase) * .15 + 1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r * pulse,0,Math.PI*2);
        ctx.strokeStyle = "rgba(120,208,194,.12)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#78D0C2";
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}
animate();
