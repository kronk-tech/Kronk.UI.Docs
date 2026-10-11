/*! Kronk UI v2 */
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // packages/core/src/template/directives.js
  var directives_exports = {};
  __export(directives_exports, {
    classes: () => classes,
    nothing: () => nothing,
    ref: () => ref,
    repeat: () => repeat,
    unsafeHTML: () => unsafeHTML
  });
  var nothing = Symbol("ui:nothing");
  function unsafeHTML(value) {
    return { __ui: "unsafe", value };
  }
  function repeat(items, keyFn, itemFn) {
    return { __ui: "repeat", items, keyFn, itemFn };
  }
  function classes(...args) {
    const out = [];
    for (const a of args) {
      if (!a) continue;
      if (typeof a === "string") out.push(a);
      else if (typeof a === "object") {
        for (const [k, v] of Object.entries(a)) if (v) out.push(k);
      }
    }
    return out.join(" ");
  }
  function ref(callback) {
    return { __ui: "ref", callback };
  }

  // packages/core/src/template/html.js
  var TemplateResult = class {
    constructor(strings, values) {
      this.strings = strings;
      this.values = values;
    }
  };
  function html(strings, ...values) {
    return new TemplateResult(strings, values);
  }
  var ATTR_BINDING = /([@.?]?[^\s"'<>/=]+)=(["']?)$/;
  function toFragment(tpl, doc) {
    const { strings, values } = tpl;
    let raw = "";
    const attrBindings = /* @__PURE__ */ new Map();
    const quoteSkip = /* @__PURE__ */ new Set();
    for (let i = 0; i < strings.length; i++) {
      let s = strings[i];
      if (quoteSkip.has(i)) s = s.slice(1);
      if (i < values.length) {
        const m = ATTR_BINDING.exec(s);
        if (m) {
          s = s.slice(0, m.index) + `data-ui-b${i}=""`;
          attrBindings.set(i, { name: m[1] });
          if (m[2]) quoteSkip.add(i + 1);
          raw += s;
        } else {
          raw += s + `<!--ui-slot-${i}-->`;
        }
      } else {
        raw += s;
      }
    }
    const tmpl = doc.createElement("template");
    tmpl.innerHTML = raw;
    const root = tmpl.content;
    for (const [i, { name }] of attrBindings) {
      const el = root.querySelector(`[data-ui-b${i}]`);
      if (!el) continue;
      el.removeAttribute(`data-ui-b${i}`);
      const v = values[i];
      if (name[0] === "@") {
        if (typeof v === "function") el.addEventListener(name.slice(1), v);
      } else if (name[0] === ".") {
        el[name.slice(1)] = v;
      } else if (name[0] === "?") {
        if (v) el.setAttribute(name.slice(1), "");
      } else if (v && v.__ui === "ref") {
        v.callback(el);
      } else if (v !== nothing && v != null && v !== false) {
        el.setAttribute(name, v === true ? "" : String(v));
      }
    }
    const comments = [];
    const walker = doc.createTreeWalker(
      root,
      128
      /* SHOW_COMMENT */
    );
    while (walker.nextNode()) comments.push(walker.currentNode);
    for (const c of comments) {
      const m = /^ui-slot-(\d+)$/.exec(c.data);
      if (!m) continue;
      c.replaceWith(toNodes(values[Number(m[1])], doc));
    }
    return root;
  }
  function toNodes(v, doc) {
    const frag = doc.createDocumentFragment();
    appendValue(frag, v, doc);
    return frag;
  }
  function appendValue(frag, v, doc) {
    if (v == null || v === false || v === true || v === nothing) return;
    if (v instanceof TemplateResult) {
      frag.appendChild(toFragment(v, doc));
    } else if (v instanceof Node) {
      frag.appendChild(v);
    } else if (Array.isArray(v)) {
      for (const item of v) appendValue(frag, item, doc);
    } else if (v.__ui === "repeat") {
      v.items.forEach((item, index) => appendValue(frag, v.itemFn(item, v.keyFn(item), index), doc));
    } else if (v.__ui === "unsafe") {
      const t = doc.createElement("template");
      t.innerHTML = String(v.value);
      frag.appendChild(t.content);
    } else if (typeof v === "string" || typeof v === "number" || typeof v === "bigint") {
      frag.appendChild(doc.createTextNode(String(v)));
    }
  }
  function render(tpl, container) {
    const doc = container.ownerDocument;
    container.replaceChildren(toNodes(tpl, doc));
  }

  // packages/core/src/base/props.js
  function allProps(Class) {
    const chain = [];
    for (let c = Class; c && c !== HTMLElement; c = Object.getPrototypeOf(c)) {
      if (Object.prototype.hasOwnProperty.call(c, "props")) chain.unshift(c.props);
    }
    return Object.assign({}, ...chain);
  }
  function coerce(value, type) {
    switch (type) {
      case "boolean":
        return value !== null && value !== void 0 && value !== false && value !== "false";
      case "number":
        return value === "" || value == null ? null : Number(value);
      case "string":
        return value == null ? "" : String(value);
      case "array":
        return Array.isArray(value) ? value : typeof value === "string" ? safeJson(value, []) : [];
      case "object":
        return value && typeof value === "object" ? value : typeof value === "string" ? safeJson(value, {}) : {};
      default:
        return value;
    }
  }
  function safeJson(s, fallback) {
    try {
      return JSON.parse(s);
    } catch {
      return fallback;
    }
  }
  function reflect(el, attr, value, type) {
    if (type === "array" || type === "object") return;
    if (type === "boolean") {
      if (value) {
        if (!el.hasAttribute(attr)) el.setAttribute(attr, "");
      } else el.removeAttribute(attr);
      return;
    }
    if (value == null || value === false || value === "") {
      if (el.hasAttribute(attr)) el.removeAttribute(attr);
    } else if (el.getAttribute(attr) !== String(value)) {
      el.setAttribute(attr, String(value));
    }
  }
  function installProps(Class) {
    if (Object.prototype.hasOwnProperty.call(Class, "__propsInstalled")) return;
    Object.defineProperty(Class, "__propsInstalled", { value: true });
    const schema = allProps(Class);
    const proto = Class.prototype;
    for (const [name, desc] of Object.entries(schema)) {
      if (Object.getOwnPropertyDescriptor(proto, name)?.get) continue;
      Object.defineProperty(proto, name, {
        configurable: true,
        enumerable: true,
        get() {
          const v = this.__props?.[name];
          return v === void 0 ? Array.isArray(desc.default) ? desc.default.slice() : desc.default : v;
        },
        set(value) {
          const store2 = this.__props || (this.__props = {});
          const old = this[name];
          const next = coerce(value, desc.type);
          if (old === next && store2[name] !== void 0) return;
          store2[name] = next;
          if (desc.attribute && this.__reflecting !== desc.attribute) {
            this.__reflecting = desc.attribute;
            try {
              reflect(this, desc.attribute, next, desc.type);
            } finally {
              this.__reflecting = null;
            }
          }
          this.propsChanged?.(name, old, next);
          this.requestRender?.();
        }
      });
    }
  }
  function observedAttributesOf(Class) {
    return Object.values(allProps(Class)).map((d) => d.attribute).filter(Boolean);
  }

  // packages/core/src/base/UIElement.js
  var nextUid = 0;
  var UIElement = class _UIElement extends HTMLElement {
    static tag = "";
    static props = {
      disabled: { type: "boolean", attribute: "disabled", default: false },
      busy: { type: "boolean", attribute: "data-ui-busy", default: false }
    };
    /** Host class mapping for tier-A components: { class: "ui-x", modifiers: { prop: "ui-x--{}" | "ui-x--flag" } } */
    static host = null;
    static slots = [];
    static docs = null;
    static get observedAttributes() {
      return observedAttributesOf(this);
    }
    /** Register the element (installs prop accessors first). */
    static define(name = this.tag) {
      if (!name) throw new Error("UIElement.define: tag required");
      installProps(this);
      if (!customElements.get(name)) customElements.define(name, this);
      else if (true) console.warn(`[UI-W001] <${name}> is already defined`);
    }
    constructor() {
      super();
      this.__props = {};
      this.__cleanup = /* @__PURE__ */ new Set();
      this.__renderQueued = false;
      this.__connected = false;
      this.__initialised = false;
    }
    connectedCallback() {
      this.__connected = true;
      this.__syncAttributes();
      if (!this.__initialised) {
        this.__initialised = true;
        this.captureLightDom();
        this.init();
      }
      this.applyHost();
      if (this.hasTemplate) this.requestRender();
      else this.markReady();
    }
    markReady() {
      if (this.hasAttribute("ui-ready")) return;
      this.setAttribute("ui-ready", "");
      this.emit("ui-ready", { element: this }, { bubbles: false });
    }
    disconnectedCallback() {
      this.__connected = false;
      this.teardown();
    }
    attributeChangedCallback(attr, _old, value) {
      if (this.__reflecting === attr) return;
      for (const [name, desc] of Object.entries(allProps(this.constructor))) {
        if (desc.attribute === attr) {
          this.__reflecting = attr;
          try {
            this[name] = desc.type === "boolean" ? value !== null : value;
          } finally {
            this.__reflecting = null;
          }
          break;
        }
      }
    }
    __syncAttributes() {
      for (const [name, desc] of Object.entries(allProps(this.constructor))) {
        if (desc.attribute && this.hasAttribute(desc.attribute) && this.__props[name] === void 0) {
          this.__reflecting = desc.attribute;
          try {
            this[name] = desc.type === "boolean" ? true : this.getAttribute(desc.attribute);
          } finally {
            this.__reflecting = null;
          }
        }
      }
    }
    /** One-time hook. Override. */
    init() {
    }
    /** Called on disconnect: runs registered cleanups. Override and call super. */
    teardown() {
      for (const fn of this.__cleanup) {
        try {
          fn();
        } catch (e) {
          if (true) console.error(e);
        }
      }
      this.__cleanup.clear();
      this.__initialised = false;
    }
    /** Light-DOM children as supplied by the author, captured once (before first render). */
    captureLightDom() {
      if (!this.__captured) this.__captured = [...this.childNodes];
      return this.__captured;
    }
    get slotted() {
      return this.__captured ?? [];
    }
    applyHost() {
      const host = this.constructor.host;
      if (!host) return;
      if (host.class) this.classList.add(host.class);
      for (const [prop, pattern] of Object.entries(host.modifiers ?? {})) {
        const value = this[prop];
        if (pattern.includes("{}")) {
          const prefix = pattern.split("{}")[0];
          for (const c of [...this.classList]) if (c.startsWith(prefix)) this.classList.remove(c);
          if (value && value !== "md" && value !== "default") this.classList.add(pattern.replace("{}", value));
        } else {
          this.classList.toggle(pattern, Boolean(value));
        }
      }
    }
    propsChanged(_name, _old, _next) {
      if (this.__connected) this.applyHost();
    }
    requestRender() {
      if (!this.__connected || this.__renderQueued || !this.hasTemplate) return;
      this.__renderQueued = true;
      queueMicrotask(() => {
        this.__renderQueued = false;
        if (this.__connected) this.performRender();
      });
    }
    /** Tier-B components override template() and set hasTemplate = true. */
    get hasTemplate() {
      return this.template !== _UIElement.prototype.template;
    }
    template() {
      return null;
    }
    performRender() {
      const tpl = this.template();
      if (tpl) render(tpl, this);
      this.afterRender();
      this.markReady();
    }
    afterRender() {
    }
    uid() {
      if (!this.__uid) this.__uid = `ui-${this.localName.replace(/^ui-/, "")}-${++nextUid}`;
      return this.__uid;
    }
    registerCleanup(fn) {
      this.__cleanup.add(fn);
    }
    emit(type, detail, options = {}) {
      if (!type.startsWith("ui-")) console.warn(`[UI-W002] custom event "${type}" must start with "ui-"`);
      const event = new CustomEvent(type, {
        detail,
        bubbles: options.bubbles ?? true,
        composed: options.composed ?? true,
        cancelable: options.cancelable ?? false
      });
      this.dispatchEvent(event);
      return event;
    }
    on(type, handler, options) {
      this.addEventListener(type, handler, options);
      this.registerCleanup(() => this.removeEventListener(type, handler, options));
    }
    once(type, handler, options) {
      this.on(type, handler, { ...typeof options === "object" ? options : {}, once: true });
    }
    off(type, handler, options) {
      this.removeEventListener(type, handler, options);
    }
    async whileBusy(promise) {
      this.busy = true;
      try {
        return await promise;
      } finally {
        this.busy = false;
      }
    }
  };

  // packages/core/src/base/UIFormElement.js
  var UIFormElement = class extends UIElement {
    static props = {
      name: { type: "string", attribute: "name", default: "" },
      value: { type: "string", attribute: "value", default: "" },
      label: { type: "string", attribute: "label", default: "" },
      required: { type: "boolean", attribute: "required", default: false },
      readonly: { type: "boolean", attribute: "readonly", default: false },
      primary: { type: "boolean", attribute: "primary", default: false }
    };
    init() {
      this.__defaultValue = this.value;
      const form2 = this.closest("form");
      if (form2) {
        const onReset = () => queueMicrotask(() => this.reset());
        form2.addEventListener("reset", onReset);
        this.registerCleanup(() => form2.removeEventListener("reset", onReset));
      }
    }
    get form() {
      return this.closest("form");
    }
    get control() {
      return this.querySelector("input, select, textarea, button");
    }
    get validity() {
      return this.control?.validity ?? { valid: true };
    }
    get validationMessage() {
      return this.control?.validationMessage ?? "";
    }
    checkValidity() {
      return this.control?.checkValidity?.() ?? true;
    }
    reportValidity() {
      return this.control?.reportValidity?.() ?? true;
    }
    setCustomValidity(message) {
      this.control?.setCustomValidity?.(message);
    }
    focus(options) {
      this.control?.focus(options);
    }
    select() {
      this.control?.select?.();
    }
    reset() {
      this.value = this.__defaultValue ?? "";
      this.requestRender();
    }
  };

  // packages/core/src/base/UIListElement.js
  var UIListElement = class extends UIFormElement {
    static props = {
      filterText: { type: "string", attribute: "filter-text", default: "" },
      multiple: { type: "boolean", attribute: "multiple", default: false },
      hotkeys: { type: "boolean", attribute: "hotkeys", default: false },
      numbered: { type: "boolean", attribute: "numbered", default: false }
    };
    __optionsAssigned = false;
    __options = [];
    __activeIndex = -1;
    get options() {
      return this.__optionsAssigned ? this.__options : this.readChildOptions();
    }
    set options(value) {
      const list = typeof value === "string" ? JSON.parse(value) : value;
      this.__optionsAssigned = true;
      this.__options = Array.isArray(list) ? list.slice() : [];
      this.optionsChanged();
    }
    optionsChanged() {
      this.requestRender();
    }
    addOption(option, index = this.options.length) {
      const next = this.options.slice();
      next.splice(index, 0, option);
      this.options = next;
    }
    addOptions(options) {
      this.options = [...this.options, ...options];
    }
    removeOption(value) {
      this.options = this.options.filter((o) => o.value !== value);
    }
    updateOption(value, patch) {
      this.options = this.options.map((o) => o.value === value ? { ...o, ...patch } : o);
    }
    clearOptions() {
      this.options = [];
    }
    getOption(value) {
      return this.options.find((o) => o.value === value);
    }
    optionFilter(option, query) {
      const hay = `${option.label ?? ""} ${option.keywords ?? ""}`.toLocaleLowerCase();
      return hay.includes(query.toLocaleLowerCase());
    }
    get filteredOptions() {
      const q = this.filterText.trim();
      return q ? this.options.filter((o) => this.optionFilter(o, q)) : this.options;
    }
    next() {
      this.moveActive(1);
    }
    prev() {
      this.moveActive(-1);
    }
    first() {
      this.__activeIndex = 0;
      this.requestRender();
    }
    last() {
      this.__activeIndex = Math.max(0, this.filteredOptions.length - 1);
      this.requestRender();
    }
    moveActive(delta) {
      const n = this.filteredOptions.length;
      if (!n) return;
      this.__activeIndex = (this.__activeIndex + delta + n) % n;
      this.requestRender();
    }
    readChildOptions() {
      const out = [];
      const walk = (parent, group) => {
        for (const child of parent.children) {
          if (child.localName === "ui-option-group") walk(child, child.getAttribute("label") ?? "");
          else if (child.localName === "ui-option") {
            const meta = child.querySelector("ui-option-meta");
            const label = [...child.childNodes].filter((n) => n !== meta).map((n) => n.textContent).join("").trim();
            out.push({
              value: child.getAttribute("value") ?? label,
              label,
              meta: meta?.textContent.trim() ?? "",
              group,
              disabled: child.hasAttribute("disabled"),
              selected: child.hasAttribute("selected")
            });
          }
        }
      };
      walk(this.__sourceRoot ?? this, "");
      return out;
    }
  };

  // packages/core/src/base/UIOverlayElement.js
  var UIOverlayElement = class extends UIElement {
    static props = {
      open: { type: "boolean", attribute: "open", default: false }
    };
    __closePromise = null;
    __resolveClose = null;
    __previousFocus = null;
    /** Subclasses implement the actual presentation. */
    presentOpen() {
    }
    presentClose() {
    }
    show() {
      if (this.open && this.__closePromise) return this.__closePromise;
      this.__previousFocus = document.activeElement;
      this.__closePromise = new Promise((resolve) => {
        this.__resolveClose = resolve;
      });
      this.open = true;
      this.presentOpen();
      this.emit("ui-open", {});
      return this.__closePromise;
    }
    hide(result, reason = "api") {
      return this.close(result, reason);
    }
    close(result, reason = "api") {
      if (!this.open) return;
      const ev = this.emit("ui-before-close", { reason, result }, { cancelable: true });
      if (ev.defaultPrevented) return;
      this.open = false;
      this.presentClose();
      this.emit("ui-close", { result, reason });
      this.__resolveClose?.(result);
      this.__resolveClose = null;
      this.__closePromise = null;
      const prev = this.__previousFocus;
      this.__previousFocus = null;
      prev?.focus?.();
    }
    toggle() {
      return this.open ? this.close(void 0, "toggle") : this.show();
    }
    /** Invoker Commands API hook: <button commandfor=id command="show-modal"> */
    command(event) {
      const c = event.command;
      if (c === "show-modal" || c === "--ui-open") {
        event.preventDefault();
        this.show();
      } else if (c === "close" || c === "--ui-close") {
        event.preventDefault();
        this.close(void 0, "command");
      } else if (c === "--ui-toggle") {
        event.preventDefault();
        this.toggle();
      }
    }
    init() {
      this.addEventListener("command", (e) => this.command(e));
    }
  };

  // packages/core/src/services/registry.js
  var components = /* @__PURE__ */ new Map();
  function define(Class) {
    const tag = Class.tag;
    if (!tag) throw new Error("UI.define: Class.tag is required");
    installProps(Class);
    if (!customElements.get(tag)) customElements.define(tag, Class);
    else if (true) console.warn(`[UI-W001] <${tag}> is already defined`);
    components.set(tag, Class);
  }
  var getComponents = () => components;
  var whenDefined = (tag) => customElements.whenDefined(tag);

  // packages/core/src/services/create.js
  function flatten(list) {
    return list.flat(Infinity);
  }
  function makeFactory(tag) {
    return (props = {}, ...children) => {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(props)) {
        if (key === "class") el.className = value;
        else if (key === "style" && value && typeof value === "object") Object.assign(el.style, value);
        else if (key === "dataset") Object.assign(el.dataset, value);
        else if (key === "aria") for (const [k, v] of Object.entries(value)) el.setAttribute(`aria-${k}`, v);
        else if (key === "on") for (const [type, fn] of Object.entries(value)) el.addEventListener(type, fn);
        else el[key] = value;
      }
      for (const child of flatten(children)) {
        if (child == null || child === false) continue;
        if (child instanceof TemplateResult) {
          const holder = document.createElement("div");
          render(child, holder);
          el.append(...holder.childNodes);
        } else el.append(child instanceof Node ? child : document.createTextNode(String(child)));
      }
      return el;
    };
  }
  function buildCreateNamespace(UI2, components2) {
    const ns = {};
    for (const tag of components2.keys()) {
      const name = tag.replace(/^ui-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      ns[name] = makeFactory(tag);
    }
    UI2.create = ns;
  }

  // packages/core/src/services/theme.js
  var KEY = "ui-theme";
  function store(value) {
    try {
      if (value === null) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, value);
    } catch {
    }
  }
  var theme = {
    get() {
      const t = document.documentElement.dataset.theme;
      return t === "light" || t === "dark" ? t : "system";
    },
    resolved() {
      const t = theme.get();
      return t === "system" ? matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : t;
    },
    set(value) {
      if (value === "system") {
        delete document.documentElement.dataset.theme;
        store(null);
      } else if (value === "light" || value === "dark") {
        document.documentElement.dataset.theme = value;
        store(value);
      } else return;
      document.dispatchEvent(new CustomEvent("ui-theme-change", { detail: { theme: value, resolved: theme.resolved() } }));
    },
    init() {
      try {
        const saved = localStorage.getItem(KEY);
        if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
      } catch {
      }
    }
  };

  // packages/core/src/services/keys.js
  var bindings = /* @__PURE__ */ new Map();
  var installed = false;
  var isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  function parse(combo) {
    const parts = combo.toLowerCase().split("+").map((s) => s.trim());
    const key = parts.pop();
    return { key, mod: parts.includes("mod"), ctrl: parts.includes("ctrl"), alt: parts.includes("alt"), shift: parts.includes("shift"), meta: parts.includes("meta") };
  }
  function matches(spec, e) {
    const mod = isMac() ? e.metaKey : e.ctrlKey;
    return e.key.toLowerCase() === spec.key && (spec.mod ? mod : isMac() ? e.metaKey === spec.meta : e.ctrlKey === (spec.ctrl || false) && e.metaKey === spec.meta) && e.altKey === spec.alt && (e.shiftKey === spec.shift || spec.key.length > 1 || /[^a-z0-9]/.test(spec.key));
  }
  function install() {
    if (installed) return;
    installed = true;
    document.addEventListener("keydown", (e) => {
      const t = e.target;
      const typing = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      for (const b of bindings.values()) {
        if (typing && !b.allowInInput && !(b.spec.mod || b.spec.ctrl || b.spec.alt || b.spec.meta)) continue;
        if (matches(b.spec, e)) {
          e.preventDefault();
          b.handler(e);
          return;
        }
      }
    });
  }
  var keys = {
    /** Register a shortcut. Returns an unregister function. */
    register(id, combo, handler, options = {}) {
      install();
      if (bindings.has(id)) console.warn(`[UI-W010] key binding "${id}" replaced`);
      bindings.set(id, { combo, spec: parse(combo), handler, description: options.description ?? "", allowInInput: !!options.allowInInput });
      return () => bindings.delete(id);
    },
    unregister(id) {
      bindings.delete(id);
    },
    list() {
      return [...bindings].map(([id, b]) => ({ id, combo: b.combo, description: b.description }));
    },
    /** Platform-sensitive display parts, e.g. "mod+k" -> ["⌘","K"] or ["Ctrl","K"]. */
    format(combo) {
      const mac = isMac();
      return combo.split("+").map((p) => {
        const k = p.trim().toLowerCase();
        if (k === "mod") return mac ? "\u2318" : "Ctrl";
        if (k === "ctrl") return mac ? "\u2303" : "Ctrl";
        if (k === "alt") return mac ? "\u2325" : "Alt";
        if (k === "shift") return mac ? "\u21E7" : "Shift";
        if (k === "meta") return mac ? "\u2318" : "Win";
        if (k === "escape") return "Esc";
        return k.length === 1 ? k.toUpperCase() : k[0].toUpperCase() + k.slice(1);
      });
    }
  };

  // packages/core/src/services/commands.js
  var registry = /* @__PURE__ */ new Map();
  var commands = {
    register(cmd) {
      if (!cmd?.id || typeof cmd.run !== "function") throw new Error("UI.commands.register: { id, label, run } required");
      if (registry.has(cmd.id)) console.warn(`[UI-W011] duplicate command id "${cmd.id}"`);
      registry.set(cmd.id, cmd);
      const off = cmd.shortcut ? keys.register(`cmd:${cmd.id}`, cmd.shortcut, () => cmd.run(), { description: cmd.label }) : null;
      return () => {
        registry.delete(cmd.id);
        off?.();
      };
    },
    list() {
      return [...registry.values()];
    },
    run(id) {
      return registry.get(id)?.run();
    }
  };

  // packages/core/src/services/i18n.js
  var defaults = {
    "select.empty": "No options found",
    "select.placeholder": "Select\u2026",
    "modal.close": "Close",
    "modal.ok": "OK",
    "modal.cancel": "Cancel",
    "toast.dismiss": "Dismiss",
    "input.showPassword": "Show password",
    "input.hidePassword": "Hide password",
    "pagination.previous": "Previous page",
    "pagination.next": "Next page"
  };
  var messages = { ...defaults };
  var i18n = {
    t(key, vars = {}) {
      const s = messages[key] ?? key;
      return s.replace(/\{(\w+)\}/g, (_, k) => k in vars ? String(vars[k]) : `{${k}}`);
    },
    set(catalogue) {
      messages = { ...messages, ...catalogue };
    },
    reset() {
      messages = { ...defaults };
    },
    keys() {
      return Object.keys(defaults);
    }
  };

  // packages/core/src/services/form.js
  var form = {
    /** Serialise a form (including <ui-*> inner controls) to a plain object. Repeated names become arrays. */
    serialize(formEl) {
      const out = {};
      for (const [k, v] of new FormData(formEl)) {
        if (k in out) out[k] = [].concat(out[k], v);
        else out[k] = v;
      }
      return out;
    },
    /** Fill controls by name. */
    fill(formEl, data) {
      for (const [k, v] of Object.entries(data)) {
        const el = formEl.elements.namedItem(k);
        if (!el) continue;
        if ("value" in el) el.value = v;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    },
    reset(formEl) {
      formEl.reset();
    }
  };

  // packages/core/src/services/dialog.js
  function open(options = {}) {
    const modal = document.createElement("ui-modal");
    modal.heading = options.title ?? "";
    if (options.size) modal.size = options.size;
    if (options.dismissible === false) modal.dismissible = false;
    const body = document.createElement("div");
    if (options.body instanceof Node) body.append(options.body);
    else if (options.body != null) {
      const p = document.createElement("p");
      p.textContent = String(options.body);
      body.append(p);
    }
    let input = null;
    if (options.input) {
      input = document.createElement("input");
      input.className = "ui-input";
      input.value = options.defaultValue ?? "";
      input.setAttribute("autofocus", "");
      body.append(input);
    }
    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.className = "ui-modal__actions";
    for (const action of options.actions ?? []) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ui-button" + (action.primary ? " ui-button--primary" : "");
      btn.textContent = action.label;
      btn.addEventListener("click", () => {
        const result = action.value === "submit" ? input?.value ?? "" : action.value;
        modal.close(result, "action");
      });
      footer.append(btn);
    }
    modal.append(body, footer);
    document.body.append(modal);
    if (input) input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") modal.close(input.value, "enter");
    });
    return modal.show().finally(() => modal.remove());
  }
  var dialog = {
    open,
    alert: (message, o = {}) => open({ ...o, body: message, actions: [{ value: true, primary: true, label: o.okText ?? i18n.t("modal.ok") }] }).then(() => void 0),
    confirm: (message, o = {}) => open({
      ...o,
      body: message,
      actions: [
        { value: false, label: o.cancelText ?? i18n.t("modal.cancel") },
        { value: true, primary: true, label: o.okText ?? i18n.t("modal.ok") }
      ]
    }).then((r) => r === true),
    prompt: (message, o = {}) => open({
      ...o,
      body: message,
      input: true,
      actions: [
        { value: null, label: o.cancelText ?? i18n.t("modal.cancel") },
        { value: "submit", primary: true, label: o.okText ?? i18n.t("modal.ok") }
      ]
    }).then((r) => r === void 0 ? null : r)
  };

  // packages/core/src/components/toast/ui-toast-region.js
  var toastId = 0;
  var UIToastRegion = class extends UIElement {
    static tag = "ui-toast-region";
    static props = {
      limit: { type: "number", attribute: "limit", default: 5 },
      placement: { type: "string", attribute: "placement", default: "bottom-end" }
    };
    static host = { class: "ui-toast-region" };
    static docs = true ? {
      summary: "Stacking region for toasts; created on demand by UI.toast().",
      category: "Feedback",
      props: { limit: "Maximum simultaneously visible toasts.", placement: "Screen corner." },
      events: { "ui-toast-show": "Toast shown; detail { id }.", "ui-toast-dismiss": "Toast removed; detail { id, reason }." },
      methods: { showToast: "showToast(message, { type, duration, action }) -> { id, dismiss }." },
      examples: ["<ui-toast-region></ui-toast-region>", '<ui-toast-region limit="2"></ui-toast-region>']
    } : null;
    init() {
      this.setAttribute("role", "region");
      this.setAttribute("aria-live", "polite");
      this.__toasts = /* @__PURE__ */ new Map();
    }
    teardown() {
      for (const t of this.__toasts?.values() ?? []) clearTimeout(t.timer);
      this.__toasts?.clear();
      super.teardown();
    }
    showToast(message, options = {}) {
      const id = `ui-toast-${++toastId}`;
      const { type = "info", duration = 4e3, action } = options;
      const el = document.createElement("div");
      el.className = `ui-toast ui-toast--${type}`;
      el.id = id;
      el.setAttribute("role", type === "danger" ? "alert" : "status");
      const text = document.createElement("span");
      text.className = "ui-toast__message";
      text.textContent = message;
      el.append(text);
      if (action) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "ui-toast__action";
        b.textContent = action.label;
        b.addEventListener("click", () => {
          action.run?.();
          dismiss("user");
        });
        el.append(b);
      }
      const close = document.createElement("button");
      close.type = "button";
      close.className = "ui-toast__close";
      close.setAttribute("aria-label", i18n.t("toast.dismiss"));
      close.textContent = "\xD7";
      close.addEventListener("click", () => dismiss("user"));
      el.append(close);
      const dismiss = (reason = "api") => {
        const entry = this.__toasts.get(id);
        if (!entry) return;
        clearTimeout(entry.timer);
        this.__toasts.delete(id);
        el.remove();
        this.emit("ui-toast-dismiss", { id, reason });
      };
      const timer = duration > 0 ? setTimeout(() => dismiss("timeout"), duration) : null;
      this.__toasts.set(id, { timer, dismiss });
      this.append(el);
      while (this.__toasts.size > (this.limit || 5)) this.__toasts.values().next().value.dismiss("api");
      this.emit("ui-toast-show", { id });
      return { id, dismiss: () => dismiss("api") };
    }
  };
  var region = null;
  function toast(message, options = {}) {
    if (!region || !region.isConnected) {
      region = document.createElement("ui-toast-region");
      document.body.append(region);
    }
    return region.showToast(message, options);
  }

  // packages/core/src/components/host-component.js
  function hostComponent({ tag, cls, props = {}, modifiers = {}, docs }) {
    const Class = class extends UIElement {
      static tag = tag;
      static props = props;
      static host = { class: cls, modifiers };
      static docs = true ? docs : null;
    };
    Object.defineProperty(Class, "name", { value: "UI" + tag.slice(3).replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase()) });
    return Class;
  }
  var str = (attribute, def = "") => ({ type: "string", attribute, default: def });
  var bool = (attribute) => ({ type: "boolean", attribute, default: false });

  // packages/core/src/components/badge/ui-badge.js
  var UIBadge = hostComponent({
    tag: "ui-badge",
    cls: "ui-badge",
    props: { variant: str("variant", ""), outline: bool("outline") },
    modifiers: { variant: "ui-badge--{}", outline: "ui-badge--outline" },
    docs: {
      summary: "Small status label.",
      category: "Display",
      status: "stable",
      since: "2.0.0",
      props: { variant: "Colour variant: primary, success, warning, danger or info.", outline: "Use the transparent outline style." },
      slots: { "": "Badge text or icon." },
      examples: ["<ui-badge>Default</ui-badge>", '<ui-badge variant="success">Success</ui-badge>', "<ui-badge outline>Outline</ui-badge>"]
    }
  });

  // packages/core/src/components/button/ui-button.js
  var UIButton = class extends UIElement {
    static tag = "ui-button";
    static props = {
      type: { type: "string", attribute: "type", default: "button" },
      href: { type: "string", attribute: "href", default: "" },
      variant: { type: "string", attribute: "variant", default: "" },
      primary: { type: "boolean", attribute: "primary", default: false }
    };
    static docs = true ? {
      summary: "Styled button or link.",
      category: "Forms",
      status: "stable",
      since: "2.0.0",
      props: { type: "Native button type (button, submit, reset).", href: "When set, renders an anchor.", variant: "Visual variant.", primary: "Primary emphasis." },
      slots: { "": "Button content." },
      examples: ["<ui-button>Save</ui-button>", '<ui-button primary type="submit">Submit</ui-button>', '<ui-button href="https://example.com">Link</ui-button>']
    } : null;
    init() {
      this.__button = this.href ? document.createElement("a") : document.createElement("button");
      this.__button.append(...this.slotted);
      this.replaceChildren(this.__button);
      this.syncControl();
    }
    get control() {
      return this.__button;
    }
    propsChanged(name, old, next) {
      super.propsChanged(name, old, next);
      this.syncControl();
    }
    syncControl() {
      const b = this.__button;
      if (!b) return;
      let cls = "ui-button";
      if (this.primary) cls += " ui-button--primary";
      if (this.variant) cls += ` ui-button--${this.variant}`;
      b.className = cls;
      if (b instanceof HTMLButtonElement) {
        b.type = this.type;
        b.disabled = this.disabled;
      } else {
        b.href = this.href;
        b.toggleAttribute("aria-disabled", this.disabled);
      }
    }
  };

  // packages/core/src/components/input/ui-input.js
  var FORWARD = ["placeholder", "min", "max", "step", "pattern", "minlength", "maxlength", "autocomplete", "inputmode", "accept", "multiple", "list", "size"];
  var UIInput = class extends UIFormElement {
    static tag = "ui-input";
    static props = {
      type: { type: "string", attribute: "type", default: "text" },
      checked: { type: "boolean", attribute: "checked", default: false },
      placeholder: { type: "string", attribute: "placeholder", default: "" }
    };
    static docs = true ? {
      summary: "Labelled native input (text, email, password, number, date, file, color, checkbox, radio, range, \u2026).",
      category: "Forms",
      status: "stable",
      since: "2.0.0",
      props: {
        type: "Native input type.",
        value: "Current value.",
        checked: "Checked state for checkbox and radio.",
        placeholder: "Placeholder text.",
        name: "Form field name.",
        label: "Visible label.",
        required: "Mark as required.",
        readonly: "Read-only.",
        primary: "Primary label emphasis."
      },
      events: { "ui-change": "Native change; detail { value, previous }.", "ui-input": "Native input; detail { value }." },
      slots: {},
      examples: ['<ui-input label="Email" type="email" name="email"></ui-input>', '<ui-input label="Volume" type="range" value="40"></ui-input>', '<ui-input label="Password" type="password"></ui-input>']
    } : null;
    init() {
      super.init();
      const id = this.id ? `${this.id}-control` : `${this.uid()}-control`;
      const label = document.createElement("label");
      label.className = "ui-label" + (this.primary ? " ui-label--primary" : "");
      label.htmlFor = id;
      label.setAttribute("type", this.type);
      const text = document.createElement("p");
      text.className = "ui-label__text";
      const input = document.createElement("input");
      input.className = "ui-input";
      input.id = id;
      label.append(text, input);
      this.replaceChildren(label);
      this.__label = label;
      this.__text = text;
      this.__input = input;
      input.addEventListener("input", () => {
        this.__props.value = input.value;
        if (this.type === "checkbox" || this.type === "radio") this.__props.checked = input.checked;
        if (this.type === "range") this.style.setProperty("--range-value", input.value);
        this.emit("ui-input", { value: input.value }, { bubbles: false });
      });
      input.addEventListener("change", () => {
        const previous = this.__lastValue ?? "";
        this.__lastValue = input.value;
        this.emit("ui-change", { value: input.value, previous });
      });
      if (this.type === "password") this.buildPasswordToggle();
      this.sync();
    }
    get control() {
      return this.__input;
    }
    get files() {
      return this.__input?.files;
    }
    buildPasswordToggle() {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ui-label__action";
      btn.setAttribute("aria-label", i18n.t("input.showPassword"));
      btn.innerHTML = '<i class="fa-solid fa-eye" aria-hidden="true"></i>';
      btn.addEventListener("click", () => {
        const show = this.__input.type === "password";
        this.__input.type = show ? "text" : "password";
        btn.setAttribute("aria-label", i18n.t(show ? "input.hidePassword" : "input.showPassword"));
      });
      this.__label.append(btn);
    }
    propsChanged(name, old, next) {
      super.propsChanged(name, old, next);
      this.sync();
    }
    sync() {
      const input = this.__input;
      if (!input) return;
      input.type = this.type;
      this.__label.setAttribute("type", this.type);
      this.__text.textContent = this.label;
      this.__text.hidden = !this.label;
      input.name = this.name;
      input.required = this.required;
      input.readOnly = this.readonly;
      input.disabled = this.disabled;
      input.placeholder = this.placeholder;
      if (this.type === "checkbox" || this.type === "radio") input.checked = this.checked;
      if (this.type !== "file" && input.value !== this.value) input.value = this.value;
      for (const a of FORWARD) {
        if (this.hasAttribute(a) && a !== "placeholder") input.setAttribute(a, this.getAttribute(a));
      }
      if (this.type === "range") this.style.setProperty("--range-value", input.value);
      this.__label.classList.toggle("ui-label--primary", this.primary);
    }
    reset() {
      super.reset();
      this.sync();
    }
  };

  // packages/core/src/components/textarea/ui-textarea.js
  var UITextarea = class extends UIFormElement {
    static tag = "ui-textarea";
    static props = {
      rows: { type: "number", attribute: "rows", default: 3 },
      placeholder: { type: "string", attribute: "placeholder", default: "" },
      maxlength: { type: "number", attribute: "maxlength", default: null },
      autosize: { type: "boolean", attribute: "autosize", default: false }
    };
    static docs = true ? {
      summary: "Labelled multi-line text input.",
      category: "Forms",
      props: { rows: "Visible rows.", placeholder: "Placeholder.", maxlength: "Maximum length.", autosize: "Grow with content.", name: "Form field name.", value: "Current text.", label: "Visible label.", required: "Mark as required.", readonly: "Read-only.", primary: "Primary label emphasis." },
      events: { "ui-input": "Typing; detail { value }.", "ui-change": "Committed change; detail { value, previous }." },
      examples: ['<ui-textarea label="Notes" rows="4"></ui-textarea>', '<ui-textarea label="Auto" autosize></ui-textarea>']
    } : null;
    init() {
      super.init();
      const label = document.createElement("label");
      label.className = "ui-label";
      const text = document.createElement("p");
      text.className = "ui-label__text";
      const ta = document.createElement("textarea");
      ta.className = "ui-input ui-textarea";
      label.append(text, ta);
      this.replaceChildren(label);
      this.__text = text;
      this.__ta = ta;
      ta.addEventListener("input", () => {
        this.__props.value = ta.value;
        this.autoGrow();
        this.emit("ui-input", { value: ta.value }, { bubbles: false });
      });
      ta.addEventListener("change", () => {
        const previous = this.__last ?? "";
        this.__last = ta.value;
        this.emit("ui-change", { value: ta.value, previous });
      });
      this.sync();
    }
    get control() {
      return this.__ta;
    }
    autoGrow() {
      if (!this.autosize || !this.__ta) return;
      this.__ta.style.height = "auto";
      this.__ta.style.height = `${this.__ta.scrollHeight}px`;
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      this.sync();
    }
    sync() {
      const ta = this.__ta;
      if (!ta) return;
      this.__text.textContent = this.label;
      this.__text.hidden = !this.label;
      ta.name = this.name;
      ta.rows = this.rows ?? 3;
      ta.placeholder = this.placeholder;
      ta.required = this.required;
      ta.readOnly = this.readonly;
      ta.disabled = this.disabled;
      if (this.maxlength != null) ta.maxLength = this.maxlength;
      if (ta.value !== this.value) ta.value = this.value;
      this.autoGrow();
    }
    reset() {
      super.reset();
      this.sync();
    }
  };

  // packages/core/src/components/switch/ui-switch.js
  var UISwitch = class extends UIFormElement {
    static tag = "ui-switch";
    static props = {
      checked: { type: "boolean", attribute: "checked", default: false }
    };
    static docs = true ? {
      summary: "Toggle switch backed by a native checkbox.",
      category: "Forms",
      props: { checked: "On/off state.", name: "Form field name.", value: "Submitted value when on.", label: "Visible label.", required: "Mark as required.", readonly: "Read-only.", primary: "Primary label emphasis." },
      events: { "ui-change": "Toggled by the user; detail { checked, value, previous }." },
      methods: { toggle: "Flip the state." },
      examples: ['<ui-switch label="Notifications" name="notifications" checked></ui-switch>', '<ui-switch label="Disabled" disabled></ui-switch>']
    } : null;
    init() {
      super.init();
      const label = document.createElement("label");
      label.className = "ui-switch";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "ui-switch__input";
      input.setAttribute("role", "switch");
      const track = document.createElement("span");
      track.className = "ui-switch__track";
      const text = document.createElement("span");
      text.className = "ui-switch__label";
      label.append(input, track, text);
      this.replaceChildren(label);
      this.__input = input;
      this.__text = text;
      input.addEventListener("change", () => {
        const previous = this.checked;
        this.checked = input.checked;
        this.emit("ui-change", { checked: input.checked, value: this.value || "on", previous, source: "user" });
      });
      this.__defaultChecked = this.checked;
      this.sync();
    }
    get control() {
      return this.__input;
    }
    toggle() {
      this.checked = !this.checked;
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      this.sync();
    }
    sync() {
      const i = this.__input;
      if (!i) return;
      i.name = this.name;
      i.value = this.value || "on";
      i.checked = this.checked;
      i.disabled = this.disabled;
      i.setAttribute("aria-checked", String(this.checked));
      this.__text.textContent = this.label;
    }
    reset() {
      this.checked = this.__defaultChecked;
    }
  };

  // packages/core/src/components/select/ui-select.js
  var UISelect = class extends UIListElement {
    static tag = "ui-select";
    static props = {
      mode: { type: "string", attribute: "mode", default: "combobox" },
      placeholder: { type: "string", attribute: "placeholder", default: "" },
      emptyText: { type: "string", attribute: "empty-text", default: "" },
      inline: { type: "boolean", attribute: "inline", default: false }
    };
    static docs = true ? {
      summary: "Native, searchable, or inline select control.",
      category: "Forms",
      status: "stable",
      since: "2.0.0",
      props: {
        mode: "combobox, native or inline.",
        value: "Selected option value.",
        options: "Property-only array of { value, label, meta?, group?, disabled? }.",
        name: "Name of the form control.",
        label: "Visible label.",
        placeholder: "Combobox placeholder.",
        emptyText: "Text when no option matches.",
        inline: "Always show the option list.",
        numbered: "Show option numbering.",
        hotkeys: "Select with digits 1\u20139 when no filter is active.",
        filterText: "Current filter query.",
        multiple: "Reserved; not implemented in this build.",
        required: "Mark as required.",
        readonly: "Read-only.",
        primary: "Primary label emphasis."
      },
      events: {
        "ui-change": "User picked an option; detail { value, option, previous, source }.",
        "ui-filter": "Filter query changed; detail { query }."
      },
      methods: { clear: "Clear the selection.", getOption: "Find an option by value." },
      slots: { "": "ui-option and ui-option-group children." },
      examples: [
        '<ui-select label="Country" name="country" value="nl"><ui-option value="nl">Netherlands</ui-option><ui-option value="be">Belgium</ui-option></ui-select>',
        '<ui-select label="Native" mode="native"><ui-option value="a">Alpha</ui-option><ui-option value="b">Beta</ui-option></ui-select>'
      ]
    } : null;
    init() {
      super.init();
      const src = document.createElement("div");
      src.append(...this.slotted);
      this.__sourceRoot = src;
      this.build();
      this.sync();
    }
    get isInline() {
      return this.inline || this.mode === "inline";
    }
    get isNative() {
      return this.mode === "native";
    }
    get control() {
      return this.__hidden ?? this.__native;
    }
    optionsChanged() {
      this.sync();
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      if (!this.__initialised) return;
      if (n === "value" || n === "disabled" || n === "filterText") this.sync();
      if (n === "mode" || n === "inline") {
        this.build();
        this.sync();
      }
      if (n === "label" && this.__labelText) this.__labelText.textContent = this.label;
    }
    build() {
      this.__outsideCleanup?.();
      const id = this.id || (this.id = this.uid());
      const label = document.createElement("label");
      label.className = "ui-label" + (this.primary ? " ui-label--primary" : "");
      this.__labelText = null;
      if (this.label) {
        const t = document.createElement("p");
        t.className = "ui-label__text";
        t.textContent = this.label;
        label.append(t);
        this.__labelText = t;
      }
      this.__hidden = this.__native = this.__input = this.__list = null;
      if (this.isNative) {
        const sel = document.createElement("select");
        sel.className = "ui-input ui-select";
        sel.id = `${id}-native`;
        label.htmlFor = sel.id;
        sel.name = this.name;
        sel.addEventListener("change", () => this.pick(sel.value, "user"));
        label.append(sel);
        this.__native = sel;
      } else {
        const wrap = document.createElement("div");
        wrap.className = "ui-select-search" + (this.isInline ? " ui-select-search--inline" : "") + (this.numbered ? " ui-select-search--numbered" : "");
        const input = document.createElement("input");
        input.className = "ui-input ui-select ui-select--search";
        input.id = `${id}-input`;
        label.htmlFor = input.id;
        input.type = "text";
        input.autocomplete = "off";
        input.setAttribute("role", "combobox");
        input.setAttribute("aria-autocomplete", "list");
        input.setAttribute("aria-controls", `${id}-options`);
        input.setAttribute("aria-expanded", String(this.isInline));
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = this.name;
        const list = document.createElement("div");
        list.className = "ui-select__options";
        list.id = `${id}-options`;
        list.setAttribute("role", "listbox");
        list.hidden = !this.isInline;
        wrap.append(input, hidden, list);
        label.append(wrap);
        Object.assign(this, { __input: input, __hidden: hidden, __list: list });
        input.addEventListener("input", () => {
          this.filterText = input.value;
          this.__activeIndex = 0;
          this.emit("ui-filter", { query: this.filterText });
          this.openList();
          this.renderList();
        });
        input.addEventListener("focus", () => {
          input.select();
          this.openList();
        });
        input.addEventListener("keydown", (e) => this.onKeydown(e));
        list.addEventListener("mousedown", (e) => e.preventDefault());
        const onOutside = (e) => {
          if (!this.contains(e.target)) this.closeList();
        };
        document.addEventListener("pointerdown", onOutside);
        this.__outsideCleanup = () => document.removeEventListener("pointerdown", onOutside);
        this.registerCleanup(this.__outsideCleanup);
      }
      this.replaceChildren(label);
    }
    sync() {
      if (this.isNative) {
        const sel = this.__native;
        if (!sel) return;
        sel.disabled = this.disabled;
        sel.required = this.required;
        sel.replaceChildren(...this.options.map((o2) => {
          const opt = document.createElement("option");
          opt.value = o2.value;
          opt.textContent = o2.label;
          opt.disabled = !!o2.disabled;
          opt.selected = o2.value === this.value;
          return opt;
        }));
        if (this.value) sel.value = this.value;
        return;
      }
      if (!this.__input) return;
      const o = this.getOption(this.value);
      this.__input.disabled = this.disabled;
      this.__input.readOnly = this.readonly;
      this.__input.required = this.required;
      this.__input.placeholder = this.placeholder || i18n.t("select.placeholder");
      if (document.activeElement !== this.__input || !this.filterText) this.__input.value = o?.label ?? "";
      this.__hidden.value = o ? this.value : "";
      this.renderList();
    }
    renderList() {
      const list = this.__list;
      if (!list) return;
      const opts = this.filteredOptions;
      const nodes = [];
      if (!opts.length) {
        const p = document.createElement("p");
        p.className = "ui-select__empty";
        p.textContent = this.emptyText || i18n.t("select.empty");
        nodes.push(p);
      }
      let lastGroup = null;
      opts.forEach((o, i) => {
        if (o.group && o.group !== lastGroup) {
          const g = document.createElement("p");
          g.className = "ui-select__group";
          g.textContent = o.group;
          nodes.push(g);
        }
        lastGroup = o.group;
        const b = document.createElement("button");
        b.type = "button";
        b.className = "ui-select__option";
        b.id = `${this.id}-opt-${i}`;
        b.dataset.selectOption = o.value;
        b.setAttribute("role", "option");
        b.setAttribute("aria-selected", String(o.value === this.value));
        if (i === this.__activeIndex) {
          b.classList.add("ui-select__option--active");
          this.__input?.setAttribute("aria-activedescendant", b.id);
        }
        b.disabled = !!o.disabled;
        b.append(document.createTextNode(o.label));
        if (o.meta) {
          const m = document.createElement("span");
          m.className = "ui-select__meta";
          m.textContent = o.meta;
          b.append(m);
        }
        b.addEventListener("click", () => {
          this.pick(o.value, "user");
          this.closeList();
        });
        nodes.push(b);
      });
      list.replaceChildren(...nodes);
    }
    pick(value, source) {
      const option = this.getOption(value);
      if (!option || option.disabled) return;
      const previous = this.value;
      this.filterText = "";
      if (previous === value) {
        this.sync();
        return;
      }
      this.value = value;
      this.sync();
      if (source === "user") {
        this.control?.dispatchEvent(new Event("input", { bubbles: true }));
        this.control?.dispatchEvent(new Event("change", { bubbles: true }));
        this.emit("ui-change", { value, option, previous, source });
      }
    }
    clear() {
      this.value = "";
      this.filterText = "";
      this.sync();
    }
    openList() {
      if (this.isInline || !this.__list) return;
      this.__list.hidden = false;
      this.__input.setAttribute("aria-expanded", "true");
    }
    closeList() {
      if (this.isInline || !this.__list) return;
      this.__list.hidden = true;
      this.__input.setAttribute("aria-expanded", "false");
      if (this.filterText) {
        this.filterText = "";
        this.sync();
      }
    }
    onKeydown(e) {
      const opts = this.filteredOptions;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.openList();
        this.__activeIndex = Math.min(this.__activeIndex + 1, opts.length - 1);
        this.renderList();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.__activeIndex = Math.max(this.__activeIndex - 1, 0);
        this.renderList();
      } else if (e.key === "Home" && !this.filterText) {
        this.__activeIndex = 0;
        this.renderList();
      } else if (e.key === "End" && !this.filterText) {
        this.__activeIndex = opts.length - 1;
        this.renderList();
      } else if (e.key === "Enter") {
        const a = opts[this.__activeIndex];
        if (a && !this.__list.hidden) {
          e.preventDefault();
          this.pick(a.value, "user");
          this.closeList();
        }
      } else if (e.key === "Escape") {
        this.closeList();
        this.sync();
      } else if (this.hotkeys && !this.filterText && /^[1-9]$/.test(e.key) && opts[Number(e.key) - 1]) {
        e.preventDefault();
        this.pick(opts[Number(e.key) - 1].value, "user");
        this.closeList();
      }
    }
  };

  // packages/core/src/components/select/ui-option.js
  var UIOption = class extends UIElement {
    static tag = "ui-option";
    static props = {
      value: { type: "string", attribute: "value", default: "" }
    };
    static docs = true ? {
      summary: "Declarative option for ui-select.",
      category: "Forms",
      props: { value: "Submitted option value.", disabled: "Prevents selection." },
      slots: { "": "Visible label; may contain a ui-option-meta." },
      examples: ['<ui-select label="Pick"><ui-option value="a">Alpha</ui-option></ui-select>', '<ui-select label="Pick"><ui-option value="b" disabled>Beta</ui-option></ui-select>']
    } : null;
  };
  var UIOptionGroup = class extends UIElement {
    static tag = "ui-option-group";
    static props = { label: { type: "string", attribute: "label", default: "" } };
    static docs = true ? {
      summary: "Group of ui-option elements.",
      category: "Forms",
      props: { label: "Group heading." },
      slots: { "": "ui-option children." },
      examples: ['<ui-select label="Pick"><ui-option-group label="Letters"><ui-option value="a">A</ui-option></ui-option-group></ui-select>', '<ui-select label="Pick"><ui-option-group label="Numbers"><ui-option value="1">1</ui-option></ui-option-group></ui-select>']
    } : null;
  };
  var UIOptionMeta = class extends UIElement {
    static tag = "ui-option-meta";
    static docs = true ? {
      summary: "Secondary text displayed beside an option label (excluded from filtering and the selected label).",
      category: "Forms",
      slots: { "": "Metadata text." },
      examples: ['<ui-select label="Pick"><ui-option value="a">Alpha<ui-option-meta>first</ui-option-meta></ui-option></ui-select>', '<ui-select label="Pick"><ui-option value="b">Beta<ui-option-meta>second</ui-option-meta></ui-option></ui-select>']
    } : null;
  };

  // packages/core/src/components/modal/ui-modal.js
  var UIModal = class extends UIOverlayElement {
    static tag = "ui-modal";
    static props = {
      heading: { type: "string", attribute: "heading", default: "" },
      size: { type: "string", attribute: "size", default: "md" },
      dismissible: { type: "boolean", attribute: "dismissible", default: true },
      modal: { type: "boolean", attribute: "modal", default: true }
    };
    static docs = true ? {
      summary: "Native <dialog> with promise-based open and close.",
      category: "Overlays",
      status: "stable",
      since: "2.0.0",
      props: {
        open: "Open state (reflected).",
        heading: "Dialog heading.",
        size: "sm, md or lg.",
        dismissible: "Escape and backdrop dismissal.",
        modal: "Use showModal() (default) or non-modal show()."
      },
      events: {
        "ui-open": "Fired after opening.",
        "ui-before-close": "Cancelable; detail { reason, result }.",
        "ui-close": "Fired after closing; detail { result, reason }."
      },
      methods: { show: "Open; returns a promise resolving with the close result.", hide: "Close with an optional result." },
      slots: { header: "Custom header.", "": "Body.", footer: "Footer actions." },
      examples: [
        `<ui-modal id="m" heading="Hello">Body text</ui-modal><ui-button onclick="document.getElementById('m').show()">Open</ui-button>`,
        `<ui-modal id="m2" heading="Sized" size="sm">Small dialog</ui-modal><ui-button onclick="document.getElementById('m2').show()">Open small</ui-button>`
      ]
    } : null;
    init() {
      super.init();
      const dialog2 = document.createElement("dialog");
      dialog2.className = "ui-modal";
      const header = document.createElement("header");
      header.className = "ui-modal__header";
      const body = document.createElement("section");
      body.className = "ui-modal__body";
      const footer = document.createElement("footer");
      footer.className = "ui-modal__footer";
      for (const node of this.slotted) {
        const slot = node.nodeType === 1 ? node.getAttribute("slot") : null;
        if (slot === "header") header.append(node);
        else if (slot === "footer") footer.append(node);
        else body.append(node);
      }
      this.__heading = document.createElement("h3");
      this.__heading.className = "ui-header";
      if (!header.childNodes.length) header.append(this.__heading);
      footer.hidden = !footer.childNodes.length;
      dialog2.append(header, body, footer);
      this.replaceChildren(dialog2);
      this.__dialog = dialog2;
      dialog2.addEventListener("cancel", (e) => {
        e.preventDefault();
        if (this.dismissible) this.close(void 0, "escape");
      });
      dialog2.addEventListener("pointerdown", (e) => {
        this.__downOutside = this.isOutside(e);
      });
      dialog2.addEventListener("click", (e) => {
        if (this.dismissible && this.__downOutside && this.isOutside(e)) this.close(void 0, "backdrop");
        this.__downOutside = false;
      });
      this.syncView();
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      this.syncView();
    }
    syncView() {
      if (!this.__dialog) return;
      this.__heading.textContent = this.heading;
      this.__dialog.className = "ui-modal" + (this.size !== "md" ? ` ui-modal--${this.size}` : "");
    }
    presentOpen() {
      if (this.__dialog.open) return;
      if (this.modal) this.__dialog.showModal();
      else this.__dialog.show();
      queueMicrotask(() => (this.querySelector("[autofocus]") ?? this.querySelector("button, input, select, textarea"))?.focus());
    }
    presentClose() {
      if (this.__dialog?.open) this.__dialog.close();
    }
    isOutside(e) {
      const r = this.__dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    }
  };

  // packages/core/src/components/tabs/ui-tabs.js
  var UITab = class extends UIElement {
    static tag = "ui-tab";
    static props = { value: { type: "string", attribute: "value", default: "" } };
    static docs = true ? { summary: "Tab trigger inside ui-tabs.", category: "Navigation", props: { value: "Tab id; matches a ui-tab-panel value.", disabled: "Not selectable." }, slots: { "": "Tab label." }, examples: ['<ui-tabs><ui-tab value="a">A</ui-tab><ui-tab-panel value="a">Panel A</ui-tab-panel></ui-tabs>', '<ui-tabs value="b"><ui-tab value="a">A</ui-tab><ui-tab value="b">B</ui-tab><ui-tab-panel value="a">One</ui-tab-panel><ui-tab-panel value="b">Two</ui-tab-panel></ui-tabs>'] } : null;
  };
  var UITabPanel = class extends UIElement {
    static tag = "ui-tab-panel";
    static props = { value: { type: "string", attribute: "value", default: "" } };
    static docs = true ? { summary: "Panel shown for the matching ui-tab.", category: "Navigation", props: { value: "Matches a ui-tab value." }, slots: { "": "Panel content." }, examples: ['<ui-tabs><ui-tab value="a">A</ui-tab><ui-tab-panel value="a">Panel</ui-tab-panel></ui-tabs>', '<ui-tabs><ui-tab value="x">X</ui-tab><ui-tab-panel value="x"><p>Rich</p></ui-tab-panel></ui-tabs>'] } : null;
  };
  var UITabs = class extends UIElement {
    static tag = "ui-tabs";
    static props = { value: { type: "string", attribute: "value", default: "" } };
    static docs = true ? {
      summary: "Tabbed content with full keyboard and ARIA support.",
      category: "Navigation",
      props: { value: "Selected tab value; defaults to the first enabled tab." },
      events: { "ui-change": "User changed tab; detail { value, previous, source }." },
      methods: { select: "Select a tab by value: select(value, { emit })." },
      slots: { "": "ui-tab and ui-tab-panel children." },
      examples: ['<ui-tabs value="overview"><ui-tab value="overview">Overview</ui-tab><ui-tab value="history">History</ui-tab><ui-tab-panel value="overview">Overview content</ui-tab-panel><ui-tab-panel value="history">History content</ui-tab-panel></ui-tabs>', '<ui-tabs><ui-tab value="one">One</ui-tab><ui-tab value="two" disabled>Two</ui-tab><ui-tab-panel value="one">First</ui-tab-panel></ui-tabs>']
    } : null;
    init() {
      const tabs = this.slotted.filter((n) => n.localName === "ui-tab");
      const panels = this.slotted.filter((n) => n.localName === "ui-tab-panel");
      const list = document.createElement("div");
      list.className = "ui-tabs__list";
      list.setAttribute("role", "tablist");
      this.__buttons = tabs.map((t) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "ui-tabs__tab";
        b.setAttribute("role", "tab");
        b.dataset.value = t.getAttribute("value") ?? "";
        b.id = `${this.uid()}-tab-${b.dataset.value}`;
        b.disabled = t.hasAttribute("disabled");
        b.append(...t.childNodes);
        b.addEventListener("click", () => this.select(b.dataset.value, { emit: true }));
        return b;
      });
      list.append(...this.__buttons);
      this.__panels = panels.map((p) => {
        const el = document.createElement("div");
        el.className = "ui-tabs__panel";
        el.setAttribute("role", "tabpanel");
        el.dataset.value = p.getAttribute("value") ?? "";
        el.id = `${this.uid()}-panel-${el.dataset.value}`;
        el.tabIndex = 0;
        el.append(...p.childNodes);
        return el;
      });
      for (const b of this.__buttons) {
        const p = this.__panels.find((x) => x.dataset.value === b.dataset.value);
        if (p) {
          b.setAttribute("aria-controls", p.id);
          p.setAttribute("aria-labelledby", b.id);
        }
      }
      this.replaceChildren(list, ...this.__panels);
      list.addEventListener("keydown", (e) => this.onKey(e));
      if (!this.value || !this.__buttons.some((b) => b.dataset.value === this.value && !b.disabled)) {
        const first = this.__buttons.find((b) => !b.disabled);
        if (first) this.__props.value = first.dataset.value;
      }
      this.sync();
    }
    select(value, { emit = false } = {}) {
      const btn = this.__buttons?.find((b) => b.dataset.value === value && !b.disabled);
      if (!btn) return;
      const previous = this.value;
      if (previous === value) return;
      this.value = value;
      this.sync();
      if (emit) this.emit("ui-change", { value, previous, source: "user" });
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      if (n === "value") this.sync();
    }
    sync() {
      if (!this.__buttons) return;
      for (const b of this.__buttons) {
        const on = b.dataset.value === this.value;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        b.classList.toggle("ui-tabs__tab--active", on);
      }
      for (const p of this.__panels) p.hidden = p.dataset.value !== this.value;
    }
    onKey(e) {
      const enabled = this.__buttons.filter((b) => !b.disabled);
      const i = enabled.findIndex((b) => b.dataset.value === this.value);
      let n = -1;
      if (e.key === "ArrowRight") n = (i + 1) % enabled.length;
      else if (e.key === "ArrowLeft") n = (i - 1 + enabled.length) % enabled.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = enabled.length - 1;
      if (n < 0) return;
      e.preventDefault();
      enabled[n].focus();
      this.select(enabled[n].dataset.value, { emit: true });
    }
  };

  // packages/core/src/components/details/ui-details.js
  var UIDetails = class extends UIElement {
    static tag = "ui-details";
    static props = {
      open: { type: "boolean", attribute: "open", default: false },
      heading: { type: "string", attribute: "heading", default: "" },
      subheading: { type: "string", attribute: "subheading", default: "" },
      group: { type: "string", attribute: "group", default: "" }
    };
    static docs = true ? {
      summary: "Disclosure built on native <details>.",
      category: "Display",
      props: { open: "Expanded state (reflected).", heading: "Summary heading.", subheading: "Secondary line.", group: "Exclusive group name." },
      events: { "ui-toggle": "Opened or closed; detail { open }." },
      slots: { "": "Content." },
      examples: ['<ui-details heading="More" subheading="Click to expand">Hidden content</ui-details>', '<ui-details heading="A" group="g">One</ui-details><ui-details heading="B" group="g">Two</ui-details>']
    } : null;
    init() {
      const d = document.createElement("details");
      d.className = "ui-details";
      const s = document.createElement("summary");
      s.className = "ui-details__summary";
      const c = document.createElement("div");
      c.className = "ui-details__summary-content";
      this.__h = document.createElement("div");
      this.__h.className = "ui-details__heading";
      this.__sh = document.createElement("div");
      this.__sh.className = "ui-details__subheading";
      c.append(this.__h, this.__sh);
      s.append(c);
      const body = document.createElement("div");
      body.className = "ui-details__content";
      body.append(...this.slotted);
      d.append(s, body);
      this.replaceChildren(d);
      this.__d = d;
      d.addEventListener("toggle", () => {
        if (this.open !== d.open) this.open = d.open;
        if (d.open && this.group) {
          for (const other of document.querySelectorAll(`ui-details[group="${CSS.escape(this.group)}"]`)) if (other !== this && other.open) other.open = false;
        }
        this.emit("ui-toggle", { open: d.open });
      });
      this.sync();
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      this.sync();
    }
    sync() {
      if (!this.__d) return;
      this.__h.textContent = this.heading;
      this.__sh.textContent = this.subheading;
      this.__sh.hidden = !this.subheading;
      if (this.__d.open !== this.open) this.__d.open = this.open;
    }
    toggle() {
      this.open = !this.open;
    }
  };

  // packages/core/src/components/listbox/ui-listbox.js
  var UIListbox = class extends UIElement {
    static tag = "ui-listbox";
    static props = {
      filterable: { type: "boolean", attribute: "filterable", default: false },
      numbered: { type: "boolean", attribute: "numbered", default: false },
      hotkeys: { type: "boolean", attribute: "hotkeys", default: false },
      emptyText: { type: "string", attribute: "empty-text", default: "No items" },
      value: { type: "string", attribute: "value", default: "" }
    };
    static docs = true ? {
      summary: "Keyed, filterable list with keyboard navigation and a custom item template.",
      category: "Lists",
      props: { filterable: "Show a filter input.", numbered: "Number the items.", hotkeys: "Digits 1\u20139 select the n-th item.", emptyText: "Text when nothing matches.", value: "Selected item key." },
      events: {
        "ui-change": "Selection changed; detail { value, item, index, previous, source }.",
        "ui-activate": "Item activated (Enter / double click); detail { item, index }.",
        "ui-filter": "Filter changed; detail { query }."
      },
      methods: {
        setItems: "Replace all items.",
        addItem: "addItem(item, index?).",
        removeItem: "removeItem(key).",
        updateItem: "updateItem(key, patch).",
        select: "select(key, { emit }).",
        next: "Move active item.",
        prev: "Move active item.",
        first: "First item.",
        last: "Last item.",
        focusItem: "Make an item active.",
        scrollToItem: "Scroll an item into view."
      },
      examples: [
        '<ui-listbox id="lb1" filterable></ui-listbox><script>document.getElementById("lb1").setItems([{id:"a",label:"Alpha"},{id:"b",label:"Beta"}])<\/script>',
        '<ui-listbox id="lb2" numbered></ui-listbox><script>document.getElementById("lb2").setItems([{id:"1",label:"One"},{id:"2",label:"Two"}])<\/script>'
      ]
    } : null;
    __items = [];
    __query = "";
    __active = -1;
    /** (item) => key */
    itemKey = (item) => item.id ?? item.value;
    /** (item) => searchable/display text */
    itemLabel = (item) => item.label ?? String(this.itemKey(item));
    /** (item, { index, selected, active }) => TemplateResult | Node | string */
    itemTemplate = null;
    get items() {
      return this.__items;
    }
    set items(list) {
      this.setItems(list);
    }
    init() {
      this.__root = document.createElement("div");
      this.__root.className = "ui-choices ui-listbox";
      this.__filter = document.createElement("input");
      this.__filter.className = "ui-input ui-listbox__filter";
      this.__filter.type = "search";
      this.__filter.hidden = !this.filterable;
      this.__filter.setAttribute("aria-label", "Filter");
      this.__list = document.createElement("div");
      this.__list.className = "ui-listbox__list";
      this.__list.setAttribute("role", "listbox");
      this.__list.id = `${this.uid()}-list`;
      this.__list.tabIndex = 0;
      this.__root.append(this.__filter, this.__list);
      this.replaceChildren(this.__root);
      this.__filter.addEventListener("input", () => {
        this.__query = this.__filter.value;
        this.__active = 0;
        this.emit("ui-filter", { query: this.__query });
        this.draw();
      });
      this.__filter.addEventListener("keydown", (e) => this.onKey(e));
      this.__list.addEventListener("keydown", (e) => this.onKey(e));
      this.__list.addEventListener("click", (e) => {
        const row = e.target.closest("[data-key]");
        if (row) this.select(row.dataset.key, { emit: true, source: "user" });
      });
      this.__list.addEventListener("dblclick", (e) => {
        const row = e.target.closest("[data-key]");
        if (row) this.activate(row.dataset.key);
      });
      this.draw();
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      if (!this.__list) return;
      if (n === "filterable") this.__filter.hidden = !this.filterable;
      this.draw();
    }
    visible() {
      const q = this.__query.trim().toLocaleLowerCase();
      return q ? this.__items.filter((i) => this.itemLabel(i).toLocaleLowerCase().includes(q)) : this.__items;
    }
    setItems(list) {
      this.__items = Array.isArray(list) ? list.slice() : [];
      this.draw();
    }
    addItem(item, index = this.__items.length) {
      this.__items.splice(index, 0, item);
      this.draw();
    }
    removeItem(key) {
      this.__items = this.__items.filter((i) => String(this.itemKey(i)) !== String(key));
      this.draw();
    }
    updateItem(key, patch) {
      this.__items = this.__items.map((i) => String(this.itemKey(i)) === String(key) ? { ...i, ...patch } : i);
      this.draw();
    }
    select(key, { emit = false, source = "api" } = {}) {
      const items = this.__items;
      const index = items.findIndex((i) => String(this.itemKey(i)) === String(key));
      if (index < 0) return;
      const previous = this.value;
      this.value = String(key);
      this.__active = this.visible().findIndex((i) => String(this.itemKey(i)) === String(key));
      this.draw();
      if (emit) this.emit("ui-change", { value: String(key), item: items[index], index, previous, source });
    }
    activate(key) {
      const index = this.__items.findIndex((i) => String(this.itemKey(i)) === String(key));
      if (index >= 0) this.emit("ui-activate", { item: this.__items[index], index });
    }
    next() {
      this.move(1);
    }
    prev() {
      this.move(-1);
    }
    first() {
      this.__active = 0;
      this.draw();
      this.scrollActive();
    }
    last() {
      this.__active = this.visible().length - 1;
      this.draw();
      this.scrollActive();
    }
    focusItem(key) {
      this.__active = this.visible().findIndex((i) => String(this.itemKey(i)) === String(key));
      this.draw();
      this.scrollActive();
    }
    scrollToItem(key) {
      this.__list?.querySelector(`[data-key="${CSS.escape(String(key))}"]`)?.scrollIntoView({ block: "nearest" });
    }
    move(d) {
      const n = this.visible().length;
      if (!n) return;
      this.__active = Math.max(0, Math.min(n - 1, this.__active + d));
      this.draw();
      this.scrollActive();
    }
    scrollActive() {
      this.__list.querySelector("[data-active]")?.scrollIntoView({ block: "nearest" });
    }
    onKey(e) {
      const vis = this.visible();
      const activeItem = vis[this.__active];
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.move(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.move(-1);
          break;
        case "PageDown":
          e.preventDefault();
          this.move(10);
          break;
        case "PageUp":
          e.preventDefault();
          this.move(-10);
          break;
        case "Home":
          if (e.target !== this.__filter) {
            e.preventDefault();
            this.first();
          }
          break;
        case "End":
          if (e.target !== this.__filter) {
            e.preventDefault();
            this.last();
          }
          break;
        case "Enter":
          if (activeItem) {
            e.preventDefault();
            const key = this.itemKey(activeItem);
            this.select(key, { emit: true, source: "keyboard" });
            this.activate(key);
          }
          break;
        case "Escape":
          if (this.__query) {
            this.__filter.value = "";
            this.__query = "";
            this.draw();
          }
          break;
        default:
          if (this.hotkeys && !this.__query && /^[1-9]$/.test(e.key) && vis[Number(e.key) - 1]) {
            e.preventDefault();
            this.select(this.itemKey(vis[Number(e.key) - 1]), { emit: true, source: "keyboard" });
          }
      }
    }
    draw() {
      if (!this.__list) return;
      const vis = this.visible();
      if (this.__active >= vis.length) this.__active = vis.length - 1;
      const prevScroll = this.__list.scrollTop;
      const rows = vis.map((item, index) => {
        const key = String(this.itemKey(item));
        const selected = key === this.value;
        const active = index === this.__active;
        const row = document.createElement("div");
        row.className = "ui-choice ui-listbox__item" + (selected ? " ui-choice--selected" : "");
        row.id = `${this.__list.id}-${index}`;
        row.dataset.key = key;
        row.setAttribute("role", "option");
        row.setAttribute("aria-selected", String(selected));
        if (active) {
          row.dataset.active = "";
          this.__list.setAttribute("aria-activedescendant", row.id);
        }
        if (this.itemTemplate) {
          const out = this.itemTemplate(item, { index, selected, active });
          if (out instanceof Node) row.append(out);
          else if (typeof out === "string") row.textContent = out;
          else render(out, row);
        } else {
          render(html`${this.numbered ? `${index + 1}. ` : ""}${this.itemLabel(item)}`, row);
        }
        return row;
      });
      if (!rows.length) {
        const p = document.createElement("p");
        p.className = "ui-choices__empty";
        p.textContent = this.emptyText;
        rows.push(p);
      }
      this.__list.replaceChildren(...rows);
      this.__list.scrollTop = prevScroll;
    }
  };

  // packages/core/src/components/layout/layout.js
  var gapDoc = "Spacing: xs, sm, md, lg or xl.";
  var UIContainer = hostComponent({
    tag: "ui-container",
    cls: "ui-container",
    props: { size: str("size", "md") },
    modifiers: { size: "ui-container--{}" },
    docs: {
      summary: "Centred, width-constrained page container.",
      category: "Layout",
      props: { size: "Max width: sm, md, lg, xl or full." },
      slots: { "": "Page content." },
      examples: ['<ui-container size="sm"><p>Narrow content</p></ui-container>', '<ui-container size="xl"><p>Wide content</p></ui-container>']
    }
  });
  var UIStack = hostComponent({
    tag: "ui-stack",
    cls: "ui-stack",
    props: { gap: str("gap", "md") },
    modifiers: { gap: "ui-stack--{}" },
    docs: {
      summary: "Vertical layout primitive.",
      category: "Layout",
      props: { gap: gapDoc },
      slots: { "": "Stacked content." },
      examples: ["<ui-stack><p>One</p><p>Two</p></ui-stack>", '<ui-stack gap="lg"><p>One</p><p>Two</p></ui-stack>']
    }
  });
  var UICluster = hostComponent({
    tag: "ui-cluster",
    cls: "ui-cluster",
    props: { gap: str("gap", "md"), between: bool("between"), end: bool("end"), nowrap: bool("nowrap") },
    modifiers: { gap: "ui-cluster--{}", between: "ui-cluster--between", end: "ui-cluster--end", nowrap: "ui-cluster--nowrap" },
    docs: {
      summary: "Horizontal, wrapping layout primitive.",
      category: "Layout",
      props: { gap: gapDoc, between: "Distribute with space-between.", end: "Align to the end.", nowrap: "Disable wrapping." },
      slots: { "": "Inline content." },
      examples: ["<ui-cluster><ui-badge>A</ui-badge><ui-badge>B</ui-badge></ui-cluster>", "<ui-cluster between><span>Left</span><span>Right</span></ui-cluster>"]
    }
  });
  var UIGrid = hostComponent({
    tag: "ui-grid",
    cls: "ui-grid",
    props: { cols: str("cols", ""), gap: str("gap", "md") },
    modifiers: { cols: "ui-grid--{}", gap: "ui-grid--gap-{}" },
    docs: {
      summary: "Column grid.",
      category: "Layout",
      props: { cols: "Column count: 2, 3, 4, 6 or 12.", gap: gapDoc },
      slots: { "": "ui-grid-col children or any content." },
      examples: ['<ui-grid cols="2"><div>1</div><div>2</div></ui-grid>', '<ui-grid cols="3" gap="lg"><div>1</div><div>2</div><div>3</div></ui-grid>']
    }
  });
  var UIGridCol = hostComponent({
    tag: "ui-grid-col",
    cls: "ui-grid__col",
    props: { span: str("span", "") },
    modifiers: { span: "ui-grid__col--span-{}" },
    docs: {
      summary: "Grid column spanning several tracks.",
      category: "Layout",
      props: { span: "Number of columns to span (2, 3, 4, 6 or 12)." },
      slots: { "": "Column content." },
      examples: ['<ui-grid cols="4"><ui-grid-col span="3">Wide</ui-grid-col><ui-grid-col>Narrow</ui-grid-col></ui-grid>', '<ui-grid cols="2"><ui-grid-col span="2">Full</ui-grid-col></ui-grid>']
    }
  });

  // packages/core/src/components/card/card.js
  var UICard = hostComponent({
    tag: "ui-card",
    cls: "ui-card",
    props: { size: str("size", "md"), flat: bool("flat"), ghost: bool("ghost"), primary: bool("primary"), dashed: bool("dashed") },
    modifiers: { size: "ui-card--{}", flat: "ui-card--flat", ghost: "ui-card--ghost", primary: "ui-card--primary", dashed: "ui-card--dashed" },
    docs: {
      summary: "Surface container with optional header, body and footer.",
      category: "Display",
      props: { size: "sm, md or lg.", flat: "Remove shadow.", ghost: "Transparent surface.", primary: "Primary accent.", dashed: "Dashed border." },
      slots: { "": "ui-card-header, ui-card-body, ui-card-footer." },
      examples: ["<ui-card><ui-card-header>Title</ui-card-header><ui-card-body>Body</ui-card-body></ui-card>", '<ui-card dashed size="lg"><ui-card-body>Dashed</ui-card-body></ui-card>']
    }
  });
  var part = (tag, cls, summary) => hostComponent({ tag, cls, docs: { summary, category: "Display", slots: { "": "Content." }, examples: [`<ui-card><${tag}>Content</${tag}></ui-card>`, `<ui-card><${tag}><strong>Rich</strong> content</${tag}></ui-card>`] } });
  var UICardHeader = part("ui-card-header", "ui-card__header", "Card header.");
  var UICardBody = part("ui-card-body", "ui-card__body", "Card body.");
  var UICardFooter = part("ui-card-footer", "ui-card__footer", "Card footer.");

  // packages/core/src/components/spinner/ui-spinner.js
  var UISpinner = hostComponent({
    tag: "ui-spinner",
    cls: "ui-spinner",
    props: { size: str("size", "md"), inverse: bool("inverse") },
    modifiers: { size: "ui-spinner--{}", inverse: "ui-spinner--inverse" },
    docs: {
      summary: "Loading indicator.",
      category: "Feedback",
      props: { size: "sm, md or lg.", inverse: "Light variant for dark backgrounds." },
      examples: ["<ui-spinner></ui-spinner>", '<ui-spinner size="sm"></ui-spinner>']
    }
  });

  // packages/core/src/components/shell/shell.js
  var part2 = (tag, cls, summary) => hostComponent({ tag, cls, docs: { summary, category: "Shell", slots: { "": "Content." }, examples: [`<${tag}>Content</${tag}>`, `<${tag}><strong>Rich</strong></${tag}>`] } });
  var UITopbar = part2("ui-topbar", "ui-topbar", "Application top bar.");
  var UISidebar = part2("ui-sidebar", "ui-sidebar", "Application sidebar.");
  var UISidebarHeader = part2("ui-sidebar-header", "ui-sidebar__header", "Sidebar header.");
  var UISidebarBody = part2("ui-sidebar-body", "ui-sidebar__body", "Sidebar body.");
  var UISidebarFooter = part2("ui-sidebar-footer", "ui-sidebar__footer", "Sidebar footer.");
  var UINav = part2("ui-nav", "ui-nav", "Navigation list.");
  var UINavSection = part2("ui-nav-section", "ui-nav__section", "Navigation section.");
  var UIShell = class extends UIElement {
    static tag = "ui-shell";
    static props = {
      collapsed: bool("collapsed"),
      sidebarOpen: bool("sidebar-open"),
      persist: bool("persist")
    };
    static host = { class: "ui-shell", modifiers: { collapsed: "ui-shell--collapsed" } };
    static docs = true ? {
      summary: "Application shell with collapsible sidebar and top bar.",
      category: "Shell",
      props: { collapsed: "Collapse the sidebar.", sidebarOpen: "Mobile sidebar open state.", persist: "Remember the collapsed state in localStorage." },
      events: { "ui-shell-change": "Collapsed or sidebar state changed." },
      methods: { toggle: "Toggle collapsed state.", openSidebar: "Open the mobile sidebar.", closeSidebar: "Close the mobile sidebar." },
      slots: { "": "ui-topbar, ui-sidebar and page content." },
      examples: ["<ui-shell><ui-topbar>App</ui-topbar><ui-sidebar>Menu</ui-sidebar><main>Content</main></ui-shell>", "<ui-shell collapsed><ui-sidebar>Menu</ui-sidebar><main>Content</main></ui-shell>"]
    } : null;
    init() {
      if (this.persist) {
        try {
          this.collapsed = localStorage.getItem("ui-shell-collapsed") === "true";
        } catch {
        }
      }
      this.on("keydown", (e) => {
        if (e.key === "Escape" && this.sidebarOpen) this.closeSidebar();
      });
      this.addEventListener("command", (e) => {
        if (e.command === "--ui-toggle") {
          e.preventDefault();
          this.toggle();
        }
      });
    }
    propsChanged(name, old, next) {
      super.propsChanged(name, old, next);
      if (!this.__connected) return;
      this.toggleAttribute("data-sidebar-open", this.sidebarOpen);
      if (this.persist && name === "collapsed") {
        try {
          localStorage.setItem("ui-shell-collapsed", String(this.collapsed));
        } catch {
        }
      }
      if (name === "collapsed" || name === "sidebarOpen") this.emit("ui-shell-change", { collapsed: this.collapsed, sidebarOpen: this.sidebarOpen });
    }
    toggle() {
      this.collapsed = !this.collapsed;
    }
    openSidebar() {
      this.sidebarOpen = true;
    }
    closeSidebar() {
      this.sidebarOpen = false;
    }
  };
  var UINavItem = class extends UIElement {
    static tag = "ui-nav-item";
    static props = {
      href: { type: "string", attribute: "href", default: "" },
      icon: { type: "string", attribute: "icon", default: "" },
      match: { type: "string", attribute: "match", default: "" }
    };
    static docs = true ? {
      summary: "Navigation item with icon and label.",
      category: "Shell",
      props: { href: "Link target.", icon: "Font Awesome icon name.", match: "exact or prefix: derive active state from location." },
      slots: { "": "Label text." },
      examples: ['<ui-nav><ui-nav-item href="/" icon="house">Home</ui-nav-item></ui-nav>', '<ui-nav><ui-nav-item href="/docs" match="prefix">Docs</ui-nav-item></ui-nav>']
    } : null;
    template() {
      const a = document.createElement("a");
      a.className = "ui-nav__item";
      a.href = this.href || "#";
      if (this.icon) {
        const i = document.createElement("i");
        i.className = `ui-nav__icon fa-solid fa-${this.icon}`;
        i.setAttribute("aria-hidden", "true");
        a.append(i);
      }
      const label = document.createElement("span");
      label.className = "ui-nav__label";
      label.append(...this.slotted.map((n) => n.cloneNode(true)));
      a.append(label);
      const path = location.pathname;
      const active = this.match === "exact" ? path === a.pathname : this.match === "prefix" ? path.startsWith(a.pathname) : false;
      if (active) {
        a.setAttribute("aria-current", "page");
        a.classList.add("ui-nav__item--active");
      }
      return a;
    }
  };
  var UINavbarLink = class extends UIElement {
    static tag = "ui-navbar-link";
    static host = { class: "ui-navbar-link" };
    static props = { href: { type: "string", attribute: "href", default: "" }, icon: { type: "string", attribute: "data-icon", default: "" } };
    static docs = true ? { summary: "Top bar link with optional icon.", category: "Shell", props: { href: "Link target.", icon: "Font Awesome icon name." }, slots: { "": "Label." }, examples: ['<ui-navbar-link href="/">Home</ui-navbar-link>', '<ui-navbar-link href="/x" icon="gear">Settings</ui-navbar-link>'] } : null;
  };

  // packages/core/src/components/display/display.js
  var UIAlert = class extends UIElement {
    static tag = "ui-alert";
    static props = {
      variant: str("variant", "info"),
      heading: str("heading", "")
    };
    static host = { class: "ui-alert", modifiers: { variant: "ui-alert--{}" } };
    static docs = true ? {
      summary: "Inline status message.",
      category: "Feedback",
      props: { variant: "info, success, warning or danger.", heading: "Alert title." },
      slots: { "": "Message body." },
      examples: ['<ui-alert variant="warning" heading="Attention">Check your input.</ui-alert>', '<ui-alert variant="success">Saved.</ui-alert>']
    } : null;
    template() {
      return html`<i class="ui-alert__icon" aria-hidden="true"></i><div>${this.heading ? html`<p class="ui-alert__title">${this.heading}</p>` : nothing}<div class="ui-alert__body">${this.slotted.map((n) => n.cloneNode(true))}</div></div>`;
    }
  };
  var UIProgress = class extends UIElement {
    static tag = "ui-progress";
    static props = {
      value: { type: "number", attribute: "value", default: 0 },
      max: { type: "number", attribute: "max", default: 100 },
      indeterminate: { type: "boolean", attribute: "indeterminate", default: false },
      size: str("size", "md"),
      variant: str("variant", "")
    };
    static host = { class: "ui-progress", modifiers: { size: "ui-progress--{}", variant: "ui-progress--{}", indeterminate: "ui-progress--indeterminate" } };
    static docs = true ? {
      summary: "Progress bar.",
      category: "Feedback",
      props: { value: "Current value.", max: "Maximum value.", indeterminate: "Unknown progress.", size: "sm, md or lg.", variant: "Colour variant." },
      examples: ['<ui-progress value="40"></ui-progress>', "<ui-progress indeterminate></ui-progress>"]
    } : null;
    template() {
      const pct = Math.max(0, Math.min(100, (this.value ?? 0) / (this.max || 100) * 100));
      return html`<div class="ui-progress__bar" style=${this.indeterminate ? "" : `width:${pct}%`}></div>`;
    }
    afterRender() {
      this.setAttribute("role", "progressbar");
      this.setAttribute("aria-valuemin", "0");
      this.setAttribute("aria-valuemax", String(this.max));
      if (this.indeterminate) this.removeAttribute("aria-valuenow");
      else this.setAttribute("aria-valuenow", String(this.value));
    }
  };
  var UIHeader = class extends UIElement {
    static tag = "ui-header";
    static props = {
      level: { type: "number", attribute: "level", default: 2 },
      size: str("size", ""),
      muted: { type: "boolean", attribute: "muted", default: false }
    };
    static docs = true ? {
      summary: "Semantic heading.",
      category: "Display",
      props: { level: "Heading level 1\u20136.", size: "Visual size override xs\u20133xl.", muted: "Muted colour." },
      slots: { "": "Heading text." },
      examples: ['<ui-header level="1">Title</ui-header>', '<ui-header level="3" size="xl" muted>Subtitle</ui-header>']
    } : null;
    template() {
      const lvl = Math.min(6, Math.max(1, this.level || 2));
      const h = document.createElement(`h${lvl}`);
      h.className = "ui-header" + (this.size ? ` ui-header--${this.size}` : "") + (this.muted ? " ui-header--muted" : "");
      h.append(...this.slotted.map((n) => n.cloneNode(true)));
      return h;
    }
  };
  var UIKbd = class extends UIElement {
    static tag = "ui-kbd";
    static props = { keys: str("keys", "") };
    static docs = true ? { summary: "Keyboard shortcut hint.", category: "Display", props: { keys: 'Combo such as "mod+k".' }, examples: ['<ui-kbd keys="mod+k"></ui-kbd>', '<ui-kbd keys="shift+/"></ui-kbd>'] } : null;
    template() {
      return html`${keys.format(this.keys).map((k) => html`<kbd class="ui-kbd">${k}</kbd>`)}`;
    }
  };
  var UIIcon = class extends UIElement {
    static tag = "ui-icon";
    static props = { name: str("name", ""), iconStyle: str("icon-style", "solid"), label: str("label", "") };
    static docs = true ? { summary: "Font Awesome icon.", category: "Display", props: { name: "Icon name without prefix.", iconStyle: "solid, regular, light, brands\u2026", label: "Accessible label; omit for decorative icons." }, examples: ['<ui-icon name="check" label="Completed"></ui-icon>', '<ui-icon name="star" icon-style="regular"></ui-icon>'] } : null;
    template() {
      const i = document.createElement("i");
      i.className = `fa-${this.iconStyle} fa-${this.name}`;
      if (this.label) {
        i.setAttribute("role", "img");
        i.setAttribute("aria-label", this.label);
      } else i.setAttribute("aria-hidden", "true");
      return i;
    }
  };
  var UITable = hostComponent({
    tag: "ui-table",
    cls: "ui-table",
    props: { striped: { type: "boolean", attribute: "striped", default: false }, bordered: { type: "boolean", attribute: "bordered", default: false }, size: str("size", "md") },
    modifiers: { striped: "ui-table--striped", bordered: "ui-table--bordered", size: "ui-table--{}" },
    docs: {
      summary: "Styled wrapper for a native table.",
      category: "Display",
      props: { striped: "Zebra rows.", bordered: "Cell borders.", size: "sm, md or lg." },
      slots: { "": "A native <table>." },
      examples: ["<ui-table striped><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table></ui-table>", "<ui-table bordered><table><tr><td>x</td></tr></table></ui-table>"]
    }
  });
  var UITableWrapper = hostComponent({
    tag: "ui-table-wrapper",
    cls: "ui-table-wrapper",
    docs: { summary: "Horizontal scroll wrapper for tables.", category: "Display", slots: { "": "ui-table." }, examples: ["<ui-table-wrapper><ui-table><table><tr><td>x</td></tr></table></ui-table></ui-table-wrapper>", "<ui-table-wrapper>Scrollable</ui-table-wrapper>"] }
  });

  // packages/core/src/components/misc/misc.js
  var UISplitPane = class extends UIElement {
    static tag = "ui-split-pane";
    static props = {
      value: { type: "number", attribute: "value", default: 50 },
      vertical: { type: "boolean", attribute: "vertical", default: false }
    };
    static host = { class: "ui-split-pane", modifiers: { vertical: "ui-split-pane--vertical" } };
    static docs = true ? {
      summary: "Two resizable panes with a draggable, keyboard-accessible divider.",
      category: "Layout",
      props: { value: "First pane size in percent (10\u201390).", vertical: "Stack panes vertically." },
      events: { "ui-resize": "Size changed; detail { value }." },
      methods: { set: "set(percent).", get: "Current percent.", reset: "Restore the initial split." },
      slots: { "": "Exactly two child elements." },
      examples: ['<ui-split-pane style="height:8rem"><div>Left</div><div>Right</div></ui-split-pane>', '<ui-split-pane vertical value="30" style="height:10rem"><div>Top</div><div>Bottom</div></ui-split-pane>']
    } : null;
    init() {
      this.__initial = this.value;
      const [a, b] = this.slotted.filter((n) => n.nodeType === 1);
      this.__divider = document.createElement("div");
      this.__divider.className = "ui-split-pane__divider";
      this.__divider.setAttribute("role", "separator");
      this.__divider.tabIndex = 0;
      this.replaceChildren(...[a, this.__divider, b].filter(Boolean));
      this.__a = a;
      this.__divider.addEventListener("pointerdown", (e) => {
        this.__divider.setPointerCapture(e.pointerId);
        const move = (ev) => {
          const r = this.getBoundingClientRect();
          this.set(this.vertical ? (ev.clientY - r.top) / r.height * 100 : (ev.clientX - r.left) / r.width * 100, true);
        };
        const up = () => {
          this.__divider.removeEventListener("pointermove", move);
          this.__divider.removeEventListener("pointerup", up);
        };
        this.__divider.addEventListener("pointermove", move);
        this.__divider.addEventListener("pointerup", up);
      });
      this.__divider.addEventListener("dblclick", () => this.reset());
      this.__divider.addEventListener("keydown", (e) => {
        const step = e.shiftKey ? 10 : 1;
        const dec = this.vertical ? "ArrowUp" : "ArrowLeft";
        const inc = this.vertical ? "ArrowDown" : "ArrowRight";
        if (e.key === dec) this.set(this.value - step, true);
        else if (e.key === inc) this.set(this.value + step, true);
        else if (e.key === "Home") this.set(10, true);
        else if (e.key === "End") this.set(90, true);
        else return;
        e.preventDefault();
      });
      this.sync();
    }
    get() {
      return this.value;
    }
    set(percent, emit = false) {
      this.value = Math.max(10, Math.min(90, Number(percent)));
      if (emit) this.emit("ui-resize", { value: this.value });
    }
    reset() {
      this.set(this.__initial, true);
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      this.sync();
    }
    sync() {
      if (!this.__a) return;
      const v = this.value;
      this.style.setProperty("--ui-split", `${v}%`);
      this.style.display = "flex";
      this.style.flexDirection = this.vertical ? "column" : "row";
      this.__a.style.flex = `0 0 ${v}%`;
      this.__divider.setAttribute("aria-orientation", this.vertical ? "horizontal" : "vertical");
      this.__divider.setAttribute("aria-valuenow", String(Math.round(v)));
      this.__divider.setAttribute("aria-valuemin", "10");
      this.__divider.setAttribute("aria-valuemax", "90");
    }
  };
  var UITooltip = class extends UIElement {
    static tag = "ui-tooltip";
    static props = {
      for: { type: "string", attribute: "for", default: "" },
      delay: { type: "number", attribute: "delay", default: 400 }
    };
    static host = { class: "ui-tooltip" };
    static docs = true ? {
      summary: "Accessible tooltip attached to an anchor element.",
      category: "Overlays",
      props: { for: "id of the anchor element.", delay: "Open delay in ms." },
      slots: { "": "Tooltip content." },
      examples: ['<ui-button id="tt1">Hover me</ui-button><ui-tooltip for="tt1">Helpful text</ui-tooltip>', '<ui-button id="tt2">Focus me</ui-button><ui-tooltip for="tt2" delay="0">Instant</ui-tooltip>']
    } : null;
    init() {
      this.setAttribute("role", "tooltip");
      this.id ||= this.uid();
      this.hidden = true;
      queueMicrotask(() => this.attach());
    }
    attach() {
      const a = document.getElementById(this.for);
      if (!a) {
        if (true) console.warn(`[UI-W020] ui-tooltip: no element with id "${this.for}"`);
        return;
      }
      a.setAttribute("aria-describedby", this.id);
      let timer;
      const open2 = () => {
        if (a.hasAttribute("disabled") || a.hidden) return;
        timer = setTimeout(() => {
          this.hidden = false;
          this.place(a);
        }, this.delay);
      };
      const close = () => {
        clearTimeout(timer);
        this.hidden = true;
      };
      const esc = (e) => {
        if (e.key === "Escape") close();
      };
      for (const [ev, fn] of [["pointerenter", open2], ["focusin", open2], ["pointerleave", close], ["focusout", close], ["keydown", esc]]) {
        a.addEventListener(ev, fn);
        this.registerCleanup(() => a.removeEventListener(ev, fn));
      }
      this.registerCleanup(() => clearTimeout(timer));
    }
    place(anchor) {
      const r = anchor.getBoundingClientRect();
      Object.assign(this.style, { position: "fixed", zIndex: "1000" });
      const t = this.getBoundingClientRect();
      let top = r.top - t.height - 6;
      if (top < 4) top = r.bottom + 6;
      const left = Math.max(4, Math.min(innerWidth - t.width - 4, r.left + r.width / 2 - t.width / 2));
      this.style.top = `${top}px`;
      this.style.left = `${left}px`;
    }
  };
  var UIThemeToggle = class extends UIElement {
    static tag = "ui-theme-toggle";
    static host = { class: "ui-theme-toggle" };
    static docs = true ? { summary: "Cycles light, dark and system theme through UI.theme.", category: "Display", methods: { setTheme: "setTheme('light' | 'dark' | 'system')." }, examples: ["<ui-theme-toggle></ui-theme-toggle>", "<ui-cluster><span>Theme</span><ui-theme-toggle></ui-theme-toggle></ui-cluster>"] } : null;
    init() {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ui-button";
      b.addEventListener("click", () => {
        const order = ["light", "dark", "system"];
        this.setTheme(order[(order.indexOf(theme.get()) + 1) % 3]);
      });
      this.__b = b;
      this.replaceChildren(b);
      const h = () => this.sync();
      document.addEventListener("ui-theme-change", h);
      this.registerCleanup(() => document.removeEventListener("ui-theme-change", h));
      this.sync();
    }
    setTheme(v) {
      theme.set(v);
    }
    sync() {
      this.__b.textContent = `Theme: ${theme.get()}`;
    }
  };
  var UISkeleton = class extends UIElement {
    static tag = "ui-skeleton";
    static props = {
      width: { type: "string", attribute: "width", default: "100%" },
      height: { type: "string", attribute: "height", default: "1rem" },
      circle: { type: "boolean", attribute: "circle", default: false }
    };
    static host = { class: "ui-skeleton", modifiers: { circle: "ui-skeleton--circle" } };
    static docs = true ? { summary: "Loading placeholder.", category: "Feedback", props: { width: "CSS width.", height: "CSS height.", circle: "Round shape." }, examples: ['<ui-skeleton width="12rem"></ui-skeleton>', '<ui-skeleton circle width="3rem" height="3rem"></ui-skeleton>'] } : null;
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      this.style.width = this.width;
      this.style.height = this.height;
    }
    init() {
      this.style.display = "block";
      this.style.width = this.width;
      this.style.height = this.height;
      this.setAttribute("aria-hidden", "true");
    }
  };
  var UIAvatar = class extends UIElement {
    static tag = "ui-avatar";
    static props = {
      src: { type: "string", attribute: "src", default: "" },
      name: { type: "string", attribute: "name", default: "" },
      size: { type: "string", attribute: "size", default: "md" }
    };
    static host = { class: "ui-avatar", modifiers: { size: "ui-avatar--{}" } };
    static docs = true ? { summary: "User avatar with image, initials or icon fallback.", category: "Display", props: { src: "Image URL.", name: "Full name used for initials and alt text.", size: "sm, md or lg." }, examples: ['<ui-avatar name="Ada Lovelace"></ui-avatar>', '<ui-avatar size="lg"></ui-avatar>'] } : null;
    template() {
      if (this.src) {
        const img = document.createElement("img");
        img.src = this.src;
        img.alt = this.name;
        img.addEventListener("error", () => {
          this.src = "";
        });
        return img;
      }
      const initials = this.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
      const span = document.createElement("span");
      if (initials) span.textContent = initials;
      else {
        span.className = "fa-solid fa-user";
        span.setAttribute("aria-hidden", "true");
      }
      return span;
    }
  };
  var UIEmptyState = class extends UIElement {
    static tag = "ui-empty-state";
    static props = {
      heading: { type: "string", attribute: "heading", default: "" },
      description: { type: "string", attribute: "description", default: "" },
      icon: { type: "string", attribute: "icon", default: "" }
    };
    static host = { class: "ui-empty-state" };
    static docs = true ? { summary: "Placeholder for empty content with an optional action.", category: "Feedback", props: { heading: "Title.", description: "Explanation.", icon: "Font Awesome icon name." }, slots: { action: "Call to action." }, examples: ['<ui-empty-state heading="No projects" description="Create one to start." icon="folder-open"></ui-empty-state>', '<ui-empty-state heading="Nothing here"></ui-empty-state>'] } : null;
    init() {
      const action = this.slotted.filter((n) => n.nodeType === 1 && n.getAttribute("slot") === "action");
      this.__action = action;
      this.draw();
    }
    propsChanged(n, o, v) {
      super.propsChanged(n, o, v);
      if (this.__action) this.draw();
    }
    draw() {
      const out = [];
      if (this.icon) {
        const i = document.createElement("i");
        i.className = `fa-solid fa-${this.icon}`;
        i.setAttribute("aria-hidden", "true");
        out.push(i);
      }
      const h = document.createElement("p");
      h.className = "ui-empty-state__title";
      h.textContent = this.heading;
      out.push(h);
      if (this.description) {
        const d = document.createElement("p");
        d.textContent = this.description;
        out.push(d);
      }
      out.push(...this.__action);
      this.replaceChildren(...out);
    }
  };
  var UIBreadcrumbs = class extends UIElement {
    static tag = "ui-breadcrumbs";
    static docs = true ? { summary: "Breadcrumb trail.", category: "Navigation", slots: { "": "Links; the last element is the current page." }, examples: ['<ui-breadcrumbs><a href="/">Home</a><a href="/p">Projects</a><span>Current</span></ui-breadcrumbs>', '<ui-breadcrumbs><a href="/">Home</a><span>Here</span></ui-breadcrumbs>'] } : null;
    init() {
      const nav = document.createElement("nav");
      nav.setAttribute("aria-label", "Breadcrumb");
      const ol = document.createElement("ol");
      ol.className = "ui-breadcrumbs";
      const items = this.slotted.filter((n) => n.nodeType === 1);
      items.forEach((el, i) => {
        const li = document.createElement("li");
        if (i === items.length - 1) el.setAttribute("aria-current", "page");
        li.append(el);
        ol.append(li);
      });
      nav.append(ol);
      this.replaceChildren(nav);
    }
  };
  var UIPagination = class extends UIElement {
    static tag = "ui-pagination";
    static props = {
      page: { type: "number", attribute: "page", default: 1 },
      pages: { type: "number", attribute: "pages", default: 1 }
    };
    static docs = true ? {
      summary: "Page selector.",
      category: "Navigation",
      props: { page: "Current page (1-based).", pages: "Total pages." },
      events: { "ui-change": "Page changed; detail { page, previous, source }." },
      methods: { select: "select(page, { emit })." },
      examples: ['<ui-pagination page="3" pages="12"></ui-pagination>', '<ui-pagination pages="3"></ui-pagination>']
    } : null;
    select(page, { emit = false } = {}) {
      const p = Math.max(1, Math.min(this.pages, page));
      const previous = this.page;
      if (p === previous) return;
      this.page = p;
      if (emit) this.emit("ui-change", { page: p, previous, source: "user" });
    }
    template() {
      const nav = document.createElement("nav");
      nav.setAttribute("aria-label", "Pagination");
      const mk = (label, page, { current = false, disabled = false, aria } = {}) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "ui-button" + (current ? " ui-button--primary" : "");
        b.textContent = label;
        b.disabled = disabled;
        if (aria) b.setAttribute("aria-label", aria);
        if (current) b.setAttribute("aria-current", "page");
        b.addEventListener("click", () => this.select(page, { emit: true }));
        return b;
      };
      nav.append(mk("\u2039", this.page - 1, { disabled: this.page <= 1, aria: i18n.t("pagination.previous") }));
      const shown = /* @__PURE__ */ new Set([1, this.pages, this.page - 1, this.page, this.page + 1]);
      let last = 0;
      for (let p = 1; p <= this.pages; p++) {
        if (!shown.has(p)) continue;
        if (p - last > 1) nav.append(Object.assign(document.createElement("span"), { textContent: "\u2026" }));
        nav.append(mk(String(p), p, { current: p === this.page }));
        last = p;
      }
      nav.append(mk("\u203A", this.page + 1, { disabled: this.page >= this.pages, aria: i18n.t("pagination.next") }));
      return nav;
    }
  };

  // packages/core/src/components/index.js
  var allComponents = [
    UIBadge,
    UIButton,
    UIInput,
    UITextarea,
    UISwitch,
    UISelect,
    UIOption,
    UIOptionGroup,
    UIOptionMeta,
    UIModal,
    UITabs,
    UITab,
    UITabPanel,
    UIToastRegion,
    UIDetails,
    UIListbox,
    UIContainer,
    UIStack,
    UICluster,
    UIGrid,
    UIGridCol,
    UICard,
    UICardHeader,
    UICardBody,
    UICardFooter,
    UISpinner,
    UIShell,
    UITopbar,
    UISidebar,
    UISidebarHeader,
    UISidebarBody,
    UISidebarFooter,
    UINav,
    UINavSection,
    UINavItem,
    UINavbarLink,
    UIAlert,
    UIProgress,
    UIHeader,
    UIKbd,
    UIIcon,
    UITable,
    UITableWrapper,
    UISplitPane,
    UITooltip,
    UIThemeToggle,
    UISkeleton,
    UIAvatar,
    UIEmptyState,
    UIBreadcrumbs,
    UIPagination
  ];

  // packages/core/src/index.js
  theme.init();
  for (const Component of allComponents) define(Component);
  var UI = {
    version: "2.0.0-alpha.3",
    components: getComponents(),
    define,
    whenDefined,
    html,
    render,
    ...directives_exports,
    Element: UIElement,
    FormElement: UIFormElement,
    ListElement: UIListElement,
    OverlayElement: UIOverlayElement,
    theme,
    keys,
    commands,
    i18n,
    form,
    dialog,
    toast,
    alert: (...a) => dialog.alert(...a),
    confirm: (...a) => dialog.confirm(...a),
    prompt: (...a) => dialog.prompt(...a)
  };
  buildCreateNamespace(UI, UI.components);
  if (typeof window !== "undefined") window.UI = UI;
  var index_default = UI;
})();
//# sourceMappingURL=ui.dev.js.map
