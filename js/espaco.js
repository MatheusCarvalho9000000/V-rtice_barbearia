/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 9: LÓGICA DO ESPAÇO
   - Crossfade das imagens guiado pela visibilidade dos blocos de texto ao rolar
   - Sincronização das 4 linhas verticais do indicador de progresso
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var secao = doc.getElementById("espaco");
  if (!secao) return;

  var blocos = Array.prototype.slice.call(secao.querySelectorAll(".espaco__bloco"));
  var slides = Array.prototype.slice.call(secao.querySelectorAll(".espaco__slide"));
  var indicadores = Array.prototype.slice.call(secao.querySelectorAll(".espaco__ind-linha"));

  if (blocos.length === 0 || slides.length === 0) return;

  var indexAtivo = 0;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ativarSlide(i) {
    if (i < 0 || i >= slides.length || i === indexAtivo) return;

    var slideAnterior = slides[indexAtivo];
    var novoSlide = slides[i];

    // O novo slide entra primeiro
    novoSlide.classList.add("is-active");

    // O slide anterior só sai após a nova imagem estar visível, evitando piscar
    setTimeout(function () {
      if (slideAnterior && slideAnterior !== novoSlide) {
        slideAnterior.classList.remove("is-active");
      }
    }, reduz ? 0 : 250);

    indexAtivo = i;

    // Atualiza o indicador vertical
    indicadores.forEach(function (linha, k) {
      linha.classList.toggle("is-ativa", k === i);
    });
  }

  // Inicializa o primeiro slide e indicador
  if (slides[0]) slides[0].classList.add("is-active");
  if (indicadores[0]) indicadores[0].classList.add("is-ativa");

  // IntersectionObserver para detectar qual bloco de texto está centralizado na tela
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          var idx = parseInt(entrada.target.getAttribute("data-espaco-index"), 10);
          if (!isNaN(idx)) {
            ativarSlide(idx);
          }
        }
      });
    }, {
      rootMargin: "-35% 0px -40% 0px",
      threshold: 0
    });

    blocos.forEach(function (bloco) {
      obs.observe(bloco);
    });
  }
})();
