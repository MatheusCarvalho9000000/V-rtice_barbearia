/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 1: COMPORTAMENTO DO CABEÇALHO
   - Estado "rolado" após 80px
   - Link da sessão atual (IntersectionObserver)
   - Menu mobile (Esc, aria-expanded, trava de scroll)
   - Entrada com fade após a abertura do hero (~1800ms)
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var header = doc.getElementById("site-header");
  if (!header) return;

  var toggle = doc.getElementById("menu-toggle");
  var menu = doc.getElementById("menu-mobile");
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desktop = window.matchMedia("(min-width: 1024px)");

  /* ---- Entrada: aparece depois da abertura do hero ---- */
  var atraso = parseInt(header.getAttribute("data-entrada-delay"), 10);
  if (isNaN(atraso)) atraso = 1800;
  setTimeout(function () { header.classList.add("is-ready"); }, reduz ? 0 : atraso);

  /* ---- Estado ao rolar ---- */
  function aoRolar() {
    header.classList.toggle("is-scrolled", window.scrollY > 80);
  }
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  /* ---- Link da sessão atual ---- */
  var links = Array.prototype.slice.call(doc.querySelectorAll("[data-nav-link]"));
  var mapa = {};
  links.forEach(function (a) {
    var id = (a.getAttribute("href") || "").replace("#", "");
    (mapa[id] = mapa[id] || []).push(a);
  });

  function marcar(id) {
    links.forEach(function (a) {
      var ativo = (a.getAttribute("href") === "#" + id);
      a.classList.toggle("is-active", ativo);
      if (ativo) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var visiveis = {};
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visiveis[e.target.id] = e.isIntersecting; });
      // Em ordem de documento: a última sessão que cruza a faixa de leitura vence
      var atual = null;
      Object.keys(mapa).forEach(function (id) { if (visiveis[id]) atual = id; });
      marcar(atual || "");
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    Object.keys(mapa).forEach(function (id) {
      var alvo = doc.getElementById(id);
      if (alvo) obs.observe(alvo);
    });
  }

  /* ---- Menu mobile ---- */
  if (!toggle || !menu) return;

  function aberto() { return menu.classList.contains("is-open"); }

  function abrir() {
    menu.classList.add("is-open");
    menu.removeAttribute("inert");
    header.classList.add("menu-aberto");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    doc.body.classList.add("menu-travado");
    var primeiro = menu.querySelector("a");
    if (primeiro) setTimeout(function () { primeiro.focus({ preventScroll: true }); }, 50);
  }

  function fechar(devolverFoco) {
    menu.classList.remove("is-open");
    menu.setAttribute("inert", "");
    header.classList.remove("menu-aberto");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    doc.body.classList.remove("menu-travado");
    if (devolverFoco) toggle.focus();
  }

  toggle.addEventListener("click", function () { aberto() ? fechar(false) : abrir(); });

  // Fechar ao tocar em qualquer link/botão dentro do menu (libera o scroll antes da âncora)
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) fechar(false);
  });

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && aberto()) { fechar(true); return; }
    // Mantém o foco dentro do menu enquanto aberto (inclui o botão de fechar)
    if (e.key === "Tab" && aberto()) {
      var foco = Array.prototype.slice.call(menu.querySelectorAll("a[href]"));
      foco.unshift(toggle);
      var i = foco.indexOf(doc.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); foco[foco.length - 1].focus(); }
      else if (!e.shiftKey && i === foco.length - 1) { e.preventDefault(); foco[0].focus(); }
    }
  });

  // Ao ir para desktop, garante o menu fechado
  desktop.addEventListener("change", function (e) { if (e.matches && aberto()) fechar(false); });
})();
