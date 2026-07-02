const i18n = {
  lang: "pt",
  messages: {},
  async init() {
    const select = document.getElementById("langSelect");
    const browser = (navigator.language || "pt").slice(0, 2).toLowerCase();
    const saved = localStorage.getItem("hum_lang");
    const supported = ["pt", "en", "es", "fr", "de"];
    this.lang = saved || (supported.includes(browser) ? browser : "pt");
    await this.setLanguage(this.lang);
    if (select) {
      select.value = this.lang;
      select.addEventListener("change", async (event) => {
        await this.setLanguage(event.target.value);
      });
    }
  },
  async setLanguage(lang) {
    this.lang = lang;
    localStorage.setItem("hum_lang", lang);
    const res = await fetch(`locales/${lang}.json`);
    this.messages = await res.json();
    document.documentElement.lang = lang;
    document.title = this.messages.siteTitle || "A Humanidade";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (this.messages[key]) {
        node.textContent = this.messages[key];
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      if (this.messages[key]) {
        node.placeholder = this.messages[key];
      }
    });
    document.dispatchEvent(new CustomEvent("language:changed", { detail: { lang } }));
  },
  t(key, fallback = "") {
    return this.messages[key] || fallback;
  }
};

window.i18n = i18n;
