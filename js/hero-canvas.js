const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

let width, height, points = [];

function init() {
    resize();
    createPoints();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createPoints() {
    // Statikus diagram-pontok generálása az ív mentén
    for(let i = 0; i < 20; i++) {
        points.push({
            x: (width * 0.2) + (i * width * 0.03),
            y: (height * 0.7) - (Math.pow(i, 1.8) * 1.5),
            originalY: (height * 0.7) - (Math.pow(i, 1.8) * 1.5)
        });
    }
}

function drawLeaf(t) {
    ctx.beginPath();
    ctx.strokeStyle = '#1FAF9A';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#1FAF9A';
    
    // Fő szár (levél alapja)
    ctx.moveTo(points[0].x, points[0].y);
    for(let p of points) {
        ctx.lineTo(p.x, p.y + Math.sin(t + p.x) * 5);
    }
    ctx.stroke();

    // Levél "erek" és háló rajzolása (tech vibe)
    points.forEach((p, i) => {
        if(i % 3 === 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#E6F7F4';
            ctx.fill();
        }
    });
}

function animate() {
    const t = Date.now() * 0.001;
    ctx.clearRect(0, 0, width, height);
    drawLeaf(t);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
