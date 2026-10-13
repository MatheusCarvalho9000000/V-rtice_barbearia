/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 7: LÓGICA DE COMBOS
   - Pré-seleção do combo para o agendamento
   - Sincronização do indicador de rolagem no mobile
   - Exibição de valores/duração a partir do config
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var secao = doc.getElementById("combos");
  if (!secao) return;

  var wrapper = secao.querySelector(".combos__carrossel-wrapper");
  var barra = secao.querySelector(".combos__ind-barra");

  /* ---- Sincronização da barra indicadora no mobile ---- */
  if (wrapper && barra) {
    var atualizando = false;
    var atualizarInd = function () {
      atualizando = false;
      var scrollMax = wrapper.scrollWidth - wrapper.clientWidth;
      if (scrollMax > 0) {
        var progresso = wrapper.scrollLeft / scrollMax;
        var maxTranslate = 400; // porcentagem máxima de deslocamento da barra de 20%
        barra.style.transform = "translateX(" + (progresso * maxTranslate) + "%)";
      }
    };

    wrapper.addEventListener("scroll", function () {
      if (!atualizando) {
        atualizando = true;
        window.requestAnimationFrame(atualizarInd);
      }
    }, { passive: true });
  }

  /* ---- Preenchimento dinâmico a partir do config (se configurado) ---- */
  if (window.VERTICE_CONFIG && Array.isArray(window.VERTICE_CONFIG.COMBOS)) {
    window.VERTICE_CONFIG.COMBOS.forEach(function (c) {
      if (!c.id) return;
      var card = secao.querySelector('[data-combo-id="' + c.id + '"]');
      if (!card) return;

      var meta = card.querySelector(".combos__card-meta");
      if (!meta) return;

      if (c.preco || c.duracao) {
        meta.innerHTML = "";
        if (c.duracao) {
          var spanDur = doc.createElement("span");
          spanDur.className = "combos__card-duracao";
          spanDur.textContent = c.duracao;
          meta.appendChild(spanDur);
        }
        if (c.preco) {
          var spanPreco = doc.createElement("span");
          spanPreco.className = "combos__card-valor";
          spanPreco.textContent = c.preco;
          meta.appendChild(spanPreco);
        }
      }
    });
  }

  /* ---- Interação "Agendar" ---- */
  secao.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-combo]");
    if (!btn) return;

    e.preventDefault();
    var nomeCombo = btn.getAttribute("data-combo") || "";

    // Salva no estado compartilhado
    window.VERTICE_ESTADO = window.VERTICE_ESTADO || {};
    window.VERTICE_ESTADO.comboSelecionado = nomeCombo;

    // Se o campo do formulário de agendamento já existir, preenche e aplica brilho
    var campoCombo = doc.getElementById("agendamento-combo") || doc.querySelector('[name="combo"]') || doc.getElementById("agendamento-servico");
    if (campoCombo) {
      campoCombo.value = nomeCombo;
      campoCombo.classList.remove("campo-pulse");
      void campoCombo.offsetWidth;
      campoCombo.classList.add("campo-pulse");
    }

    // Atualiza links de WhatsApp do agendamento se existirem
    var linkWhatsAppAgendamento = doc.getElementById("agendamento-whatsapp");
    if (linkWhatsAppAgendamento && window.buildWhatsAppLink && window.whatsAppMensagem) {
      linkWhatsAppAgendamento.href = window.buildWhatsAppLink(window.whatsAppMensagem("servico", nomeCombo));
    }

    // Rola suavemente até o agendamento
    var destino = doc.getElementById("agendamento");
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
})();
