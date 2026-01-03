const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h, t = 0;
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const paths = [
    { x1: .42, y1: .72, x2: .55, y2: .48 },
    { x1: .45, y1: .75, x2: .62, y2: .52 },
    { x1: .48, y1: .78, x2: .68, y2: .6 }
];

function drawOverlay() {
    paths.forEach((p, i) => {
        const prog = (Math.sin(t * 0.01 + i) + 1) / 2;
        ctx.beginPath();
        ctx.moveTo(w * p.x1, h * p.y1);
        ctx.lineTo(
            w * (p.x1 + (p.x2 - p.x1) * prog),
            h * (p.y1 + (p.y2 - p.y1) * prog)
        );
        ctx.strokeStyle = "rgba(120,208,194,0.35)";
        ctx.lineWidth = isMobile ? 1 : 2;
        ctx.shadowBlur = isMobile ? 10 : 20;
        ctx.shadowColor = "#78D0C2";
        ctx.stroke();
    });
}

function animate() {
    t++;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    drawOverlay();
    requestAnimationFrame(animate);
}
animate();
