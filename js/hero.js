/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 2: ORQUESTRAÇÃO DO HERO
   Sequência de abertura (ms): 0 slide 1 · 300 V desenhado · 900/1020 H1 ·
   1400 subtítulo · 1650 botões · 1800 cabeçalho (header.js) · 2200 indicadores + ciclo.
   Depende de: js/config.js, js/animations.js (Vertice.crossfade / Vertice.shine).
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var hero = doc.getElementById("hero");
  if (!hero || !window.Vertice) return;

  var INTERVALO = 6500;     // troca de slides
  var CROSSFADE = 1600;     // duração do crossfade
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var slidesEl = hero.querySelector(".hero__slides");
  var conteudo = hero.querySelector(".hero__conteudo");
  var inds = Array.prototype.slice.call(hero.querySelectorAll(".hero__ind"));
  var simboloV = hero.querySelector(".hero__v");

  hero.style.setProperty("--hero-intervalo", INTERVALO + "ms");

  /* Cidade vinda do config */
  var cidade = hero.querySelector("[data-hero-cidade]");
  if (cidade && window.VERTICE_CONFIG) cidade.textContent = window.VERTICE_CONFIG.CIDADE;

  /* ---- Barra de progresso do indicador ativo ---- */
  function reiniciarBarra(i) {
    inds.forEach(function (b, k) {
      b.classList.remove("is-ativo");
      if (k === i) b.removeAttribute("aria-current");
    });
    void hero.offsetWidth;                        // reflow: reinicia a animação CSS
    if (inds[i]) {
      inds[i].classList.add("is-ativo");
      inds[i].setAttribute("aria-current", "true");
    }
    inds.forEach(function (b, k) { if (k !== i) b.removeAttribute("aria-current"); });
  }

  /* ---- Crossfade (Sessão 0) ---- */
  var ligadoControles = false;
  var cf = window.Vertice.crossfade(slidesEl, {
    interval: INTERVALO,
    duration: CROSSFADE,
    onChange: function (i) { if (ligadoControles) reiniciarBarra(i); }
  });

  inds.forEach(function (b, i) {
    b.addEventListener("click", function () { cf.goTo(i); });
  });

  /* ---- Imagens secundárias: só depois do evento load ---- */
  function carregarRestante() {
    hero.querySelectorAll("img[data-src]").forEach(function (img) {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
  }
  if (doc.readyState === "complete") carregarRestante();
  else window.addEventListener("load", carregarRestante);

  /* ---- Pausa quando a aba está oculta (o crossfade pausa o próprio timer) ---- */
  doc.addEventListener("visibilitychange", function () {
    if (doc.hidden) {
      hero.classList.add("is-pausado");
    } else {
      hero.classList.remove("is-pausado");
      if (ligadoControles && !reduz) reiniciarBarra(cf.index);   // ressincroniza com o timer
    }
  });

  /* ---- Abertura orquestrada ---- */
  function abrirControles() {
    ligadoControles = true;
    hero.classList.add("is-controles");
    reiniciarBarra(cf.index);
    if (!reduz) cf.start();
  }

  if (reduz) {
    // Só o slide 1, todo o conteúdo já visível, sem rotação automática
    hero.classList.add("is-open", "is-controles", "is-aberto");
    ligadoControles = true;
    reiniciarBarra(0);
  } else {
    // Dois quadros: garante que o estado inicial (grafite/oculto) foi pintado antes de abrir
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { hero.classList.add("is-open"); });
    });
    setTimeout(function () { if (simboloV) window.Vertice.shine(simboloV); }, 300 + 900);
    setTimeout(abrirControles, 2200);
    setTimeout(function () { hero.classList.add("is-aberto"); }, 2500);
  }

  /* ---- Ao rolar: o conteúdo sobe levemente e some (saída de data-anim="up") ---- */
  if (!reduz && conteudo) {
    var pendente = false;
    var atualizar = function () {
      pendente = false;
      var altura = hero.offsetHeight || window.innerHeight;
      var p = Math.min(1, Math.max(0, window.scrollY / (altura * 0.6)));
      conteudo.style.setProperty("--hp-o", (1 - p).toFixed(3));
      conteudo.style.setProperty("--hp-y", (-p * 40).toFixed(1) + "px");
    };
    window.addEventListener("scroll", function () {
      if (pendente) return;
      pendente = true;
      window.requestAnimationFrame(atualizar);
    }, { passive: true });
    atualizar();
  }
})();
