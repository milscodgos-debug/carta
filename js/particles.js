const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const stars = [];
const meteors = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars.length = 0;
  const count = Math.floor((canvas.width * canvas.height) / 13000);
  for (let i = 0; i < count; i += 1) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.3 + 0.04
    });
  }
}

function maybeMeteor() {
  if (Math.random() < 0.007) {
    meteors.push({
      x: Math.random() * canvas.width * 0.8,
      y: Math.random() * canvas.height * 0.4,
      len: Math.random() * 120 + 70,
      speed: Math.random() * 7 + 7,
      life: 1
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.alpha += Math.sin(Date.now() * 0.001 * star.speed) * 0.004;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0.1, Math.min(1, star.alpha))})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });

  maybeMeteor();
  meteors.forEach((meteor) => {
    meteor.x += meteor.speed;
    meteor.y += meteor.speed * 0.48;
    meteor.life -= 0.02;
    const grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.len, meteor.y - meteor.len * 0.45);
    grad.addColorStop(0, `rgba(255,220,180,${Math.max(0, meteor.life)})`);
    grad.addColorStop(1, "rgba(255,220,180,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(meteor.x - meteor.len, meteor.y - meteor.len * 0.45);
    ctx.stroke();
  });

  while (meteors.length && meteors[0].life <= 0) {
    meteors.shift();
  }

  requestAnimationFrame(draw);
}

resizeCanvas();
createStars();
draw();

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});
