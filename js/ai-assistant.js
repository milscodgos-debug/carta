const assistantRules = [
  {
    keys: ["tempo", "time", "vida"],
    reply: "O tempo e o recurso mais democratico do universo: todos recebem 24 horas. Que decisao sua de hoje honraria melhor esse presente?"
  },
  {
    keys: ["medo", "fear", "fracasso", "failure"],
    reply: "Fracasso costuma ser rascunho de maturidade. Qual seria uma micro-acao segura para voce testar ainda nesta semana?"
  },
  {
    keys: ["proposito", "purpose", "legado", "legacy"],
    reply: "Legado nao e fama: e impacto repetido. Pense em uma pessoa, um ambiente e um habito que voce pode melhorar a partir de hoje."
  },
  {
    keys: ["ansiedade", "anxiety", "mente"],
    reply: "Quando a mente acelera, o corpo pode virar ancora. Tente 60 segundos de respiracao 4-4-6 e depois nomeie 3 coisas sob seu controle."
  }
];

const assistantLog = document.getElementById("assistantLog");
const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");

function appendLine(author, text) {
  if (!assistantLog) return;
  const line = document.createElement("p");
  line.innerHTML = `<strong>${author}:</strong> ${text}`;
  assistantLog.appendChild(line);
  assistantLog.scrollTop = assistantLog.scrollHeight;
}

if (assistantLog) {
  appendLine("Assistente", "Pergunte sobre proposito, tempo, fracasso ou equilibrio mental.");
}

if (assistantForm) {
  assistantForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = assistantInput.value.trim();
    if (!question) return;

    appendLine("Voce", question);

    const normalized = question.toLowerCase();
    const match = assistantRules.find((rule) =>
      rule.keys.some((key) => normalized.includes(key))
    );

    const fallback = "Posso sugerir reflexoes praticas: qual situacao voce esta vivendo agora e qual resultado deseja nos proximos 7 dias?";
    appendLine("Assistente", match ? match.reply : fallback);

    assistantInput.value = "";
  });
}
