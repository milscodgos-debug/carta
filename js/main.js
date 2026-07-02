const revealNodes = document.querySelectorAll(".reveal");
const typingNode = document.getElementById("typingText");
const startBtn = document.getElementById("startReading");
const readerTarget = document.getElementById("inicio");
const narratorBtn = document.getElementById("narratorBtn");
const finale = document.getElementById("finale");
const themeToggle = document.getElementById("themeToggle");
const fontSizeRange = document.getElementById("fontSizeRange");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 }
);

revealNodes.forEach((node) => observer.observe(node));

if (startBtn && readerTarget) {
  startBtn.addEventListener("click", () => {
    readerTarget.scrollIntoView({ behavior: "smooth" });
  });
}

if (finale) {
  const finaleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) finale.classList.add("active");
      });
    },
    { threshold: 0.4 }
  );
  finaleObserver.observe(finale);
}

let typingIndex = 0;
let phraseIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingNode) return;
  const phrases = window.i18n?.t("typingPhrases", [
    "Voce esta vivo. Isso ja e extraordinario.",
    "A pergunta nao e se o tempo passa. E como voce vai usa-lo.",
    "A humanidade avanca quando o bem vira habito."
  ]);

  if (!Array.isArray(phrases) || !phrases.length) return;

  const current = String(phrases[phraseIndex]);
  const speed = deleting ? 34 : 62;

  typingNode.textContent = current.slice(0, typingIndex);

  if (!deleting) {
    typingIndex += 1;
    if (typingIndex > current.length + 6) {
      deleting = true;
    }
  } else {
    typingIndex -= 1;
    if (typingIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingIndex = 0;
    }
  }

  window.setTimeout(typeLoop, speed);
}

document.addEventListener("language:changed", () => {
  typingIndex = 0;
  phraseIndex = 0;
  deleting = false;
});

typeLoop();

if (narratorBtn && "speechSynthesis" in window) {
  narratorBtn.addEventListener("click", () => {
    const cards = Array.from(document.querySelectorAll(".card p"))
      .map((node) => node.textContent)
      .join(" ");

    const utterance = new SpeechSynthesisUtterance(cards);
    utterance.lang = document.documentElement.lang || "pt-BR";
    utterance.rate = 0.95;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("hum_theme") || "dark";
  if (savedTheme === "light") document.body.classList.add("light");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const mode = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("hum_theme", mode);
  });
}

if (fontSizeRange) {
  const saved = localStorage.getItem("hum_font") || "100";
  document.documentElement.style.fontSize = `${saved}%`;
  fontSizeRange.value = saved;
  fontSizeRange.addEventListener("input", () => {
    document.documentElement.style.fontSize = `${fontSizeRange.value}%`;
    localStorage.setItem("hum_font", fontSizeRange.value);
  });
}

(async () => {
  await window.i18n.init();
})();
