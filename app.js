(() => {
  "use strict";

  const config = window.FASTPRESS_START || {};
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("#site-nav");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());

  // Sticky header shadow
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
    });
  }

  // Form
  const form = document.querySelector("[data-lead-form]");
  if (!form) return;

  const status = form.querySelector("[data-status]");
  const button = form.querySelector('button[type="submit"]');
  const defaultLabel = button ? button.innerHTML : "";

  const setStatus = (message, kind) => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-ok", "is-err");
    if (kind) status.classList.add(kind);
  };

  const ensureDelivered = async (response) => {
    let body = null;
    try {
      body = await response.json();
    } catch {
      // FormSubmit can return an empty body on some errors.
    }
    if (!response.ok) {
      throw new Error((body && body.message) || `Request failed (${response.status})`);
    }
    if (body && String(body.success).toLowerCase() === "false") {
      throw new Error(body.message || "The form service rejected the message.");
    }
    return body;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!button || button.disabled) return;

    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const honey = String(data.get("_honey") || "").trim();

    // Silent drop for bots; humans never see this field.
    if (honey) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("That email does not look right. Check it and try again.", "is-err");
      form.querySelector("#email")?.focus();
      return;
    }

    if (window.location.protocol === "file:") {
      setStatus("Open this page through a local server or a real host before submitting.", "is-err");
      return;
    }

    const payload = Object.fromEntries(data.entries());
    delete payload._honey;
    payload.source = payload.source || "FastPress Start";
    payload.page = window.location.href;
    payload.date = new Date().toISOString();
    payload._subject = payload._subject || "FastPress Start checklist request";
    payload._template = payload._template || "table";
    payload._captcha = payload._captcha || "false";

    const endpoint = config.formEndpoint;
    if (!endpoint || !/^https?:\/\//.test(endpoint)) {
      setStatus("This demo form has no endpoint. Email " + (config.contactEmail || "the site owner") + " instead.", "is-err");
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";
    setStatus("Sending…");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      await ensureDelivered(response);
      form.reset();
      setStatus("Sent. Check your inbox for the checklist.", "is-ok");
    } catch (error) {
      const reason = error && error.name === "AbortError" ? "The request timed out." : "The form did not send.";
      setStatus(`${reason} Email ${config.contactEmail || "the site owner"} and I will send it manually.`, "is-err");
    } finally {
      clearTimeout(timer);
      button.disabled = false;
      button.innerHTML = defaultLabel;
    }
  });
})();
