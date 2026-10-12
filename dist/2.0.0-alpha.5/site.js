// Docs-site client: live examples (resettable), component playground with event log, search, theme control.
// Plain script (no modules) so it can be inlined/loaded after ui.js.

(function () {
  const UI = window.UI;
  const base = document.documentElement.dataset.base || "/";

  // ---- live examples ---------------------------------------------------------------------
  function runExample(root, source) {
    const stage = root.querySelector("[data-stage]");
    stage.innerHTML = "";
    const tpl = document.createElement("template");
    tpl.innerHTML = source;
    const scripts = [...tpl.content.querySelectorAll("script")];
    for (const s of scripts) s.remove();
    stage.append(tpl.content);
    for (const s of scripts) {
      const n = document.createElement("script");
      n.textContent = s.textContent;
      stage.append(n);
    }
  }

  for (const root of document.querySelectorAll("[data-example]")) {
    const source = root.querySelector("template[data-source]").innerHTML.trim();
    runExample(root, source);
    root.querySelector("[data-example-reset]")?.addEventListener("click", () => runExample(root, source));
  }

  // ---- playground ------------------------------------------------------------------------
  const pg = document.querySelector("[data-playground]");
  if (pg) {
    const component = JSON.parse(document.getElementById("component-data").textContent);
    const stage = pg.querySelector("[data-pg-stage]");
    const controls = pg.querySelector("[data-pg-controls]");
    const out = pg.querySelector("[data-pg-html]");
    const log = pg.querySelector("[data-pg-log]");
    const state = {};
    const slotted = component.docs.examples?.[0] ?? "";
    const inner = (() => {
      const t = document.createElement("template");
      t.innerHTML = slotted;
      const first = t.content.querySelector(component.tag);
      return first ? first.innerHTML : "";
    })();

    function build() {
      const el = document.createElement(component.tag);
      for (const [k, v] of Object.entries(state)) {
        const p = component.props.find(x => x.name === k);
        if (!p?.attribute) continue;
        if (p.type === "boolean") { if (v) el.setAttribute(p.attribute, ""); }
        else if (v !== "" && v != null) el.setAttribute(p.attribute, v);
      }
      el.innerHTML = inner;
      stage.replaceChildren(el);
      for (const name of Object.keys(component.docs.events ?? {})) {
        el.addEventListener(name, e => {
          const li = document.createElement("li");
          li.textContent = `${e.type} ${JSON.stringify(e.detail ?? null)}`;
          log.prepend(li);
        });
      }
      out.textContent = el.outerHTML;
      window.__pgEl = el;
    }

    for (const p of component.props) {
      if (!p.attribute || ["busy"].includes(p.name)) continue;
      const label = document.createElement("label");
      label.className = "pg-field";
      const text = document.createElement("span");
      text.textContent = p.name;
      text.title = p.description;
      let input;
      if (p.type === "boolean") {
        input = document.createElement("input");
        input.type = "checkbox";
        input.checked = !!p.default;
        state[p.name] = !!p.default;
        input.addEventListener("change", () => { state[p.name] = input.checked; build(); });
      } else {
        input = document.createElement("input");
        input.type = p.type === "number" ? "number" : "text";
        input.className = "ui-input";
        input.value = p.default ?? "";
        state[p.name] = input.value;
        input.addEventListener("input", () => { state[p.name] = input.value; build(); });
      }
      label.append(text, input);
      controls.append(label);
    }
    pg.querySelector("[data-pg-copy]")?.addEventListener("click", () => navigator.clipboard?.writeText(out.textContent));
    pg.querySelector("[data-pg-open]")?.addEventListener("click", () => window.__pgEl?.show?.());
    build();
  }

  // ---- search ----------------------------------------------------------------------------
  let index = null;
  async function loadIndex() {
    if (!index) index = await (await fetch(base + "search-index.json")).json();
    return index;
  }
  function score(entry, q) {
    const t = entry.title.toLowerCase();
    if (t === q) return 100;
    if (t.startsWith(q)) return 60;
    if ((entry.keywords || "").toLowerCase().includes(q)) return 45;
    if ((entry.headings || "").toLowerCase().includes(q)) return 30;
    if ((entry.body || "").toLowerCase().includes(q)) return 10;
    return 0;
  }
  const dlg = document.getElementById("search-dialog");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  async function runSearch() {
    const q = input.value.trim().toLowerCase();
    const idx = await loadIndex();
    const hits = q ? idx.map(e => ({ e, s: score(e, q) })).filter(x => x.s).sort((a, b) => b.s - a.s).slice(0, 12) : [];
    results.replaceChildren(...hits.map(({ e }) => {
      const a = document.createElement("a");
      a.href = base + e.url;
      a.textContent = e.title;
      a.className = "search-hit";
      const li = document.createElement("li");
      li.append(a);
      return li;
    }));
  }
  function openSearch() {
    if (!dlg) return;
    dlg.showModal();
    input.value = "";
    results.replaceChildren();
    input.focus();
  }
  input?.addEventListener("input", runSearch);
  input?.addEventListener("keydown", e => { if (e.key === "Enter") results.querySelector("a")?.click(); });
  dlg?.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  document.querySelector("[data-open-search]")?.addEventListener("click", openSearch);
  if (UI?.keys) {
    UI.keys.register("docs:search", "mod+k", openSearch, { description: "Search docs", allowInInput: true });
    UI.keys.register("docs:search-slash", "/", openSearch, { description: "Search docs" });
  }
})();
