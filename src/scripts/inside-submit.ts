// Behaviour for the /inside/submit form: steps, validation, autosave and sending.
// Markup lives in components/inside/submit/SubmitWizard.astro.

type FieldError = [name: string, message: string];

const MIN_WORDS = 30;
const SAVE_KEY = "inside-submit-draft-v1";
const SAVED_FIELDS = ["headline", "category", "format", "draft", "mediaLink"];
const STEP_NAMES = ["Your profile", "Your story", "Review"];

/** Returns +234XXXXXXXXXX for a valid Nigerian mobile number, otherwise "". */
function normalisePhone(raw: string): string {
  const digits = raw.replace(/[\s\-().]/g, "");
  if (/^0[789][01]\d{8}$/.test(digits)) return `+234${digits.slice(1)}`;
  if (/^\+?234[789][01]\d{8}$/.test(digits)) return `+${digits.replace(/^\+/, "")}`;
  return "";
}

const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

const withProtocol = (v: string): string => (/^https?:\/\//i.test(v) ? v : `https://${v}`);

function isHttpUrl(v: string): boolean {
  try {
    return new URL(withProtocol(v)).hostname.includes(".");
  } catch {
    return false;
  }
}

export function initSubmitWizard(): void {
  const form = document.querySelector<HTMLFormElement>("[data-submit-form]");
  if (!form) return;

  const endpoint = form.dataset.endpoint ?? "";
  const helpEmail = form.dataset.helpEmail ?? "";
  const panels = Array.from(form.querySelectorAll<HTMLElement>("[data-step-panel]"));
  const dots = Array.from(form.querySelectorAll<HTMLElement>("[data-step-dot]"));
  const statusEl = form.querySelector<HTMLElement>("[data-step-status]");
  const formError = form.querySelector<HTMLElement>("[data-form-error]");
  const submitBtn = form.querySelector<HTMLButtonElement>("[data-submit]");
  const success = document.querySelector<HTMLElement>("[data-success]");
  const wordCountEl = form.querySelector<HTMLElement>("[data-word-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current = 1;

  // ---- Reading values -------------------------------------------------

  const field = (name: string) =>
    form.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      `[name="${name}"]`,
    );

  /** Trimmed value of a field. Radios return the checked value; checkboxes "yes" or "". */
  function val(name: string): string {
    const els = form!.querySelectorAll<HTMLInputElement>(`[name="${name}"]`);
    if (els.length === 0) return "";
    const first = els[0];
    if (first.type === "radio") {
      return Array.from(els).find((e) => e.checked)?.value ?? "";
    }
    if (first.type === "checkbox") return first.checked ? first.value : "";
    return first.value.trim();
  }

  // ---- Errors ---------------------------------------------------------

  function clearErrors(): void {
    form!.querySelectorAll<HTMLElement>("[id$='-error']").forEach((el) => {
      el.hidden = true;
      el.textContent = "";
    });
    form!.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  }

  function setError(name: string, message: string): void {
    const err = form!.querySelector<HTMLElement>(`#${name}-error`);
    if (err) {
      err.textContent = message;
      err.hidden = false;
    }
    const el = field(name);
    if (el && (el as HTMLInputElement).type !== "radio") el.setAttribute("aria-invalid", "true");
  }

  // ---- Validation -----------------------------------------------------

  function validate(step: number): FieldError[] {
    const errors: FieldError[] = [];

    if (step === 1) {
      if (val("name").length < 2) errors.push(["name", "Enter your full name."]);
      if (!normalisePhone(val("whatsapp"))) {
        errors.push(["whatsapp", "Enter a Nigerian WhatsApp number, like 0801 234 5678."]);
      }
      if (!/^\S+@\S+\.\S+$/.test(val("email"))) {
        errors.push(["email", "Enter a valid email address."]);
      }
      if (!val("campus")) errors.push(["campus", "Choose where you're based."]);
    }

    if (step === 2) {
      if (val("headline").length < 5) errors.push(["headline", "Give your story a headline."]);
      if (!val("category")) errors.push(["category", "Pick a category."]);
      if (val("format") === "media") {
        if (!isHttpUrl(val("mediaLink"))) {
          errors.push(["mediaLink", "Paste a link that starts with https://."]);
        }
      } else if (countWords(val("draft")) < MIN_WORDS) {
        errors.push(["draft", `Write at least ${MIN_WORDS} words. A short pitch is fine.`]);
      }
    }

    if (step === 3 && !val("agree")) {
      errors.push(["agree", "Please confirm this before you send."]);
    }

    return errors;
  }

  function checkStep(step: number): boolean {
    clearErrors();
    const errors = validate(step);
    errors.forEach(([name, message]) => setError(name, message));
    if (errors.length > 0) {
      const target = field(errors[0][0]);
      target?.focus();
      return false;
    }
    return true;
  }

  // ---- Steps ----------------------------------------------------------

  function renderReview(): void {
    const set = (key: string, text: string) => {
      const el = form!.querySelector<HTMLElement>(`[data-review="${key}"]`);
      if (el) el.textContent = text;
    };
    const checked = form!.querySelector<HTMLInputElement>("input[name='category']:checked");
    set("byline", val("byline") || val("name"));
    set("whatsapp", normalisePhone(val("whatsapp")));
    set("email", val("email"));
    set("campus", val("campus"));
    set("headline", val("headline"));
    set("category", checked?.dataset.label ?? "");
    set(
      "format",
      val("format") === "media"
        ? "Video or audio link"
        : `Written story, ${countWords(val("draft"))} words`,
    );
  }

  function show(step: number, focus = true): void {
    current = step;
    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.stepPanel) !== step;
    });
    dots.forEach((dot, i) => {
      const n = i + 1;
      dot.dataset.state = n < step ? "done" : n === step ? "current" : "todo";
      if (n === step) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
    if (statusEl) statusEl.textContent = `Step ${step} of 3 · ${STEP_NAMES[step - 1]}`;
    if (step === 3) renderReview();
    if (focus) {
      const panel = panels[step - 1];
      panel.querySelector<HTMLElement>("[data-step-title]")?.focus({ preventScroll: true });
      panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  // ---- Format toggle and word count -----------------------------------

  function syncFormat(): void {
    const format = val("format") || "written";
    form!.querySelectorAll<HTMLElement>("[data-format-panel]").forEach((panel) => {
      const active = panel.dataset.formatPanel === format;
      panel.hidden = !active;
      panel
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
        .forEach((el) => {
          el.disabled = !active;
        });
    });
  }

  function syncWordCount(): void {
    const n = countWords(field("draft")?.value ?? "");
    if (wordCountEl) wordCountEl.textContent = `${n} ${n === 1 ? "word" : "words"}`;
  }

  // ---- Autosave (story fields only, never contact details) -------------

  function rawValue(name: string): string {
    const els = form!.querySelectorAll<HTMLInputElement>(`[name="${name}"]`);
    if (els.length === 0) return "";
    if (els[0].type === "radio") return Array.from(els).find((e) => e.checked)?.value ?? "";
    return els[0].value;
  }

  function save(): void {
    try {
      const data: Record<string, string> = {};
      SAVED_FIELDS.forEach((name) => {
        data[name] = rawValue(name);
      });
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable: skip autosave */
    }
  }

  function restore(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Record<string, string>;
      SAVED_FIELDS.forEach((name) => {
        const value = data[name];
        if (!value) return;
        const els = form!.querySelectorAll<HTMLInputElement>(`[name="${name}"]`);
        if (els[0]?.type === "radio") {
          els.forEach((el) => {
            el.checked = el.value === value;
          });
        } else if (els[0]) {
          els[0].value = value;
        }
      });
    } catch {
      /* ignore corrupt or unavailable storage */
    }
  }

  function clearSaved(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      /* ignore */
    }
  }

  // ---- Sending --------------------------------------------------------

  function buildBody(): URLSearchParams {
    const p = new URLSearchParams();
    const format = val("format");
    p.set("name", val("name"));
    p.set("byline", val("byline") || val("name"));
    p.set("whatsapp", normalisePhone(val("whatsapp")));
    p.set("email", val("email"));
    p.set("campus", val("campus"));
    p.set("bio", val("bio"));
    p.set("headline", val("headline"));
    p.set("category", val("category"));
    p.set("format", format);
    if (format === "media") {
      p.set("media_link", withProtocol(val("mediaLink")));
    } else {
      p.set("draft", val("draft"));
      p.set("word_count", String(countWords(val("draft"))));
    }
    p.set("agreed_to_terms", "yes");
    p.set("submitted_at", new Date().toISOString());
    p.set("source", "inside/submit");
    return p;
  }

  function showSuccess(): void {
    clearSaved();
    form!.hidden = true;
    if (!success) return;
    const first = val("byline").split(/\s+/)[0] || val("name").split(/\s+/)[0] || "";
    const nameEl = success.querySelector<HTMLElement>("[data-success-name]");
    if (nameEl) nameEl.textContent = first ? `, ${first}` : "";
    success.hidden = false;
    success.querySelector<HTMLElement>("[data-success-title]")?.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function showFormError(): void {
    if (!formError) return;
    formError.textContent =
      `We couldn't send your story. Check your connection and try again. ` +
      (helpEmail ? `If it keeps failing, email ${helpEmail}.` : "");
    formError.hidden = false;
  }

  async function send(): Promise<void> {
    if (!endpoint) {
      if (import.meta.env.DEV) {
        console.info("[inside/submit] No endpoint set. Dev mode: pretending it worked.", Object.fromEntries(buildBody()));
        await new Promise((resolve) => setTimeout(resolve, 600));
        return;
      }
      throw new Error("Submissions are not connected to an endpoint yet.");
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: buildBody(),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Endpoint replied ${res.status}`);
    } finally {
      window.clearTimeout(timer);
    }
  }

  // ---- Wiring ---------------------------------------------------------

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (current < 3) {
      if (checkStep(current)) show(current + 1);
      return;
    }

    // Re-check every step so nothing slips through.
    for (const step of [1, 2, 3]) {
      if (!checkStep(step)) {
        if (step !== current) show(step, false);
        field(validate(step)[0][0])?.focus();
        return;
      }
    }

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (val("company")) {
      showSuccess();
      return;
    }

    if (formError) formError.hidden = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    try {
      await send();
      showSuccess();
    } catch (error) {
      console.warn("[inside/submit]", error);
      showFormError();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send my story";
      }
    }
  });

  form.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearErrors();
      show(Math.max(1, current - 1));
    });
  });

  form.querySelectorAll("input[name='format']").forEach((el) => {
    el.addEventListener("change", () => {
      syncFormat();
      save();
    });
  });

  field("draft")?.addEventListener("input", () => {
    syncWordCount();
    save();
  });
  ["headline", "mediaLink"].forEach((name) => field(name)?.addEventListener("input", save));
  form.querySelectorAll("input[name='category']").forEach((el) => el.addEventListener("change", save));

  // Clear a field's error as soon as the person edits it.
  function clearFieldError(name: string): void {
    if (!name) return;
    const err = form!.querySelector<HTMLElement>(`#${name}-error`);
    if (err) {
      err.hidden = true;
      err.textContent = "";
    }
    field(name)?.removeAttribute("aria-invalid");
  }
  form.addEventListener("input", (e) => clearFieldError((e.target as HTMLInputElement).name));
  form.addEventListener("change", (e) => clearFieldError((e.target as HTMLInputElement).name));

  restore();
  syncFormat();
  syncWordCount();
  show(1, false);
}
