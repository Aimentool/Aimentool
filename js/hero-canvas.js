const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
let w, h, t = 0;
const mobile = innerWidth < 768;

function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const sparks = Array.from({ length: mobile ? 30 : 80 }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    life: Math.random()
}));

function animate() {
    t++;
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = "lighter";

    sparks.forEach(s => {
        s.life -= .01;
        if (s.life < 0) {
            s.x = Math.random() * w;
            s.y = Math.random() * h;
            s.life = 1;
        }
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(120,208,194,${s.life})`;
        ctx.shadowBlur = mobile ? 8 : 18;
        ctx.shadowColor = "#78D0C2";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
animate();
