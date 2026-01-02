const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* NETWORK */
const nodes = Array.from({ length: 120 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3
}));

/* GRAPH */
const graph = Array.from({ length: 40 }, (_, i) => ({
  x: i / 39,
  y: 0.35 + Math.random() * 0.3
}));

let t = 0;

function drawNetwork() {
  nodes.forEach(a => {
    nodes.forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 140) {
        ctx.strokeStyle = `rgba(119,215,185,${1 - d / 140})`;
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
  ctx.translate(w * 0.25, h * 0.65);
  ctx.beginPath();

  graph.forEach((p, i) => {
    const x = p.x * w * 0.5;
    const y = -p.y * h * 0.4 + Math.sin(t + i * 0.3) * 10;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "rgba(180,255,230,0.9)";
  ctx.lineWidth = 3;
  ctx.shadowBlur = 30;
  ctx.shadowColor = "rgba(180,255,230,0.9)";
  ctx.stroke();
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
