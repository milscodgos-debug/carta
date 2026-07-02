const shareButtons = document.querySelectorAll("[data-share]");
const qrImage = document.getElementById("qrCode");
const shareCountNode = document.getElementById("shareCount");

function incrementShares() {
  const next = Number(localStorage.getItem("hum_shares") || "0") + 1;
  localStorage.setItem("hum_shares", String(next));
  if (shareCountNode) shareCountNode.textContent = String(next);
}

function buildShareText() {
  return window.i18n?.t(
    "shareText",
    "Uma mensagem sobre humanidade, aprendizado e legado para ler hoje."
  );
}

function shareTarget(network) {
  const text = encodeURIComponent(buildShareText());
  const url = encodeURIComponent(window.location.href);
  if (network === "whatsapp") return `https://wa.me/?text=${text}%20${url}`;
  if (network === "telegram") return `https://t.me/share/url?url=${url}&text=${text}`;
  if (network === "facebook") return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (network === "x") return `https://x.com/intent/tweet?url=${url}&text=${text}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
}

shareButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const network = btn.dataset.share;
    if (network === "native" && navigator.share) {
      await navigator.share({
        title: document.title,
        text: buildShareText(),
        url: window.location.href
      });
      incrementShares();
      return;
    }

    window.open(shareTarget(network), "_blank", "noopener,noreferrer");
    incrementShares();
  });
});

if (qrImage) {
  const current = encodeURIComponent(window.location.href);
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${current}`;
}

if (shareCountNode) {
  shareCountNode.textContent = localStorage.getItem("hum_shares") || "0";
}
