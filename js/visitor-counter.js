const visitNode = document.getElementById("visitCount");
const countryNode = document.getElementById("countryCode");
const langNode = document.getElementById("languageUsed");
const readNode = document.getElementById("avgRead");

const visits = Number(localStorage.getItem("hum_visits") || "0") + 1;
localStorage.setItem("hum_visits", String(visits));
if (visitNode) visitNode.textContent = String(visits);

const localeParts = new Intl.Locale(navigator.language || "pt-BR");
if (countryNode) {
  countryNode.textContent = localeParts.region || "--";
}
if (langNode) {
  langNode.textContent = (navigator.language || "pt-BR").toUpperCase();
}

let startedAt = Date.now();

window.addEventListener("beforeunload", () => {
  const seconds = Math.max(5, Math.round((Date.now() - startedAt) / 1000));
  const previousTotal = Number(localStorage.getItem("hum_read_total") || "0");
  const previousSessions = Number(localStorage.getItem("hum_read_sessions") || "0");
  localStorage.setItem("hum_read_total", String(previousTotal + seconds));
  localStorage.setItem("hum_read_sessions", String(previousSessions + 1));
});

function paintAverage() {
  const total = Number(localStorage.getItem("hum_read_total") || "0");
  const sessions = Number(localStorage.getItem("hum_read_sessions") || "0");
  const avg = sessions ? Math.round(total / sessions) : 0;
  if (readNode) readNode.textContent = `${avg}s`;
}

paintAverage();
