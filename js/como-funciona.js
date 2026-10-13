/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 8: LÓGICA DE COMO FUNCIONA
   - Destaque dos nós e numerais da timeline conforme a linha de progresso avança
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var secao = doc.getElementById("como-funciona");
  if (!secao) return;

  var timeline = secao.querySelector(".como-funciona__timeline");
  var etapas = Array.prototype.slice.call(secao.querySelectorAll(".como-funciona__etapa"));
  if (!timeline || etapas.length === 0) return;

  var pendente = false;

  function atualizarNos() {
    pendente = false;
    var vh = window.innerHeight;
    var gatilho = vh * 0.6; // mesma linha de frente usada pelo progresso na Sessão 0

    etapas.forEach(function (etapa) {
      var no = etapa.querySelector(".como-funciona__no");
      if (!no) return;

      var r = no.getBoundingClientRect();
      var alcancado = r.top <= gatilho;
      var atual = Math.abs(r.top - gatilho) < 140;

      etapa.classList.toggle("is-passada", alcancado);
      etapa.classList.toggle("is-ativa", atual);
    });
  }

  function pedirAtualizacao() {
    if (pendente) return;
    pendente = true;
    window.requestAnimationFrame(atualizarNos);
  }

  window.addEventListener("scroll", pedirAtualizacao, { passive: true });
  window.addEventListener("resize", pedirAtualizacao, { passive: true });

  if (doc.readyState === "complete") atualizarNos();
  else window.addEventListener("load", atualizarNos);
})();
