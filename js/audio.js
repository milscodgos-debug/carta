let ctx;
let oscillators = [];
let gainNode;

function setupAudio() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = ctx.createGain();
  gainNode.gain.value = 0.02;
  gainNode.connect(ctx.destination);

  [174.61, 220, 261.63].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = idx === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    const detune = ctx.createGain();
    detune.gain.value = idx === 1 ? 0.7 : 0.5;
    osc.connect(detune);
    detune.connect(gainNode);
    osc.start();
    oscillators.push(osc);
  });
}

const audioToggle = document.getElementById("audioToggle");

if (audioToggle) {
  audioToggle.addEventListener("click", async () => {
    setupAudio();
    if (ctx.state === "suspended") {
      await ctx.resume();
      audioToggle.dataset.on = "true";
      audioToggle.textContent = window.i18n?.t("audioOff", "Silenciar");
      return;
    }

    if (audioToggle.dataset.on === "true") {
      gainNode.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
      audioToggle.dataset.on = "false";
      audioToggle.textContent = window.i18n?.t("audioOn", "Ativar musica");
    } else {
      gainNode.gain.setTargetAtTime(0.02, ctx.currentTime, 0.08);
      audioToggle.dataset.on = "true";
      audioToggle.textContent = window.i18n?.t("audioOff", "Silenciar");
    }
  });
}

document.addEventListener("language:changed", () => {
  if (!audioToggle) return;
  if (audioToggle.dataset.on === "true") {
    audioToggle.textContent = window.i18n?.t("audioOff", "Silenciar");
  } else {
    audioToggle.textContent = window.i18n?.t("audioOn", "Ativar musica");
  }
});
