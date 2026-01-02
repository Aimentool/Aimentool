const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* NODES */
const nodes = Array.from({ length: 120 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25
}));

/* GRAPH */
const graph = Array.from({ length: 50 }, (_, i) => ({
  x: i / 49,
  y: Math.random() * 0.45 + 0.35
}));

let t = 0;

function drawNetwork() {
  nodes.forEach(a => {
    nodes.forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 160) {
        ctx.strokeStyle = `rgba(200,255,240,${1 - d / 160})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    });
  });

  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  });
}

function drawGraph() {
  ctx.save();
  ctx.translate(w * 0.3, h * 0.7);

  ctx.beginPath();
  graph.forEach((p, i) => {
    const x = p.x * w * 0.55;
    const y = -p.y * h * 0.5 + Math.sin(t + i * 0.25) * 12;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "rgba(140,255,220,0.95)";
  ctx.lineWidth = 3;
  ctx.shadowBlur = 30;
  ctx.shadowColor = "rgba(140,255,220,0.9)";
  ctx.stroke();

  graph.forEach(p => {
    const x = p.x * w * 0.55;
    const y = -p.y * h * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  });

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;
  });

  drawNetwork();
  drawGraph();

  t += 0.015;
  requestAnimationFrame(animate);
}

animate();
