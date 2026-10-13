/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 11: ACORDEÃO DE DÚVIDAS FREQUENTES
   - Controle de expansão/recolhimento com aria-expanded e aria-controls
   - Apenas um item aberto por vez
   - Navegação por teclado acessível (Setas para cima/baixo, Home, End)
   - Garante que itens abertos recebam data-anim="up-once" e não sumam no scroll
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var secao = doc.getElementById("duvidas");
  if (!secao) return;

  var triggers = Array.prototype.slice.call(secao.querySelectorAll(".duvidas__trigger"));
  if (triggers.length === 0) return;

  function alternarItem(triggerAtual, forcarAberto) {
    var expandido = triggerAtual.getAttribute("aria-expanded") === "true";
    var deveAbrir = forcarAberto !== undefined ? forcarAberto : !expandido;
    var itemAtual = triggerAtual.closest(".duvidas__item");

    if (deveAbrir) {
      // Fecha outros itens (um aberto por vez)
      triggers.forEach(function (outroTrigger) {
        if (outroTrigger !== triggerAtual) {
          outroTrigger.setAttribute("aria-expanded", "false");
          var outroItem = outroTrigger.closest(".duvidas__item");
          if (outroItem) {
            outroItem.classList.remove("is-aberto");
          }
        }
      });

      // Abre o item atual
      triggerAtual.setAttribute("aria-expanded", "true");
      if (itemAtual) {
        itemAtual.classList.add("is-aberto");
        // Spec: respostas abertas não desaparecem ao rolar (up-once)
        itemAtual.setAttribute("data-anim", "up-once");
        itemAtual.classList.add("is-in");
        itemAtual.classList.remove("is-above");
      }
    } else {
      // Fecha o item atual
      triggerAtual.setAttribute("aria-expanded", "false");
      if (itemAtual) {
        itemAtual.classList.remove("is-aberto");
      }
    }
  }

  // Interação via clique
  triggers.forEach(function (trigger, index) {
    trigger.addEventListener("click", function () {
      alternarItem(trigger);
    });

    // Navegação acessível por teclado (W3C WAI-ARIA Accordion Pattern)
    trigger.addEventListener("keydown", function (e) {
      var tecla = e.key;
      var total = triggers.length;

      if (tecla === "ArrowDown") {
        e.preventDefault();
        var proximo = (index + 1) % total;
        triggers[proximo].focus();
      } else if (tecla === "ArrowUp") {
        e.preventDefault();
        var anterior = (index - 1 + total) % total;
        triggers[anterior].focus();
      } else if (tecla === "Home") {
        e.preventDefault();
        triggers[0].focus();
      } else if (tecla === "End") {
        e.preventDefault();
        triggers[total - 1].focus();
      }
    });
  });
})();
