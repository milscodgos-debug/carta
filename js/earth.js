const earth = document.querySelector(".earth");

if (earth) {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 14;
    const y = (event.clientY / window.innerHeight - 0.5) * -14;
    earth.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}
