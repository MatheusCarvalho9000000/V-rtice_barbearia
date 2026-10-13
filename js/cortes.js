/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 5: LÓGICA DE CORTES
   - Troca de abas com transição suave e indicador deslizante
   - Navegação por teclado (ArrowLeft, ArrowRight, Home, End)
   - Clique em "Quero este corte": pré-seleciona o corte para o agendamento
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var secao = doc.getElementById("cortes");
  if (!secao) return;

  var tablist = secao.querySelector('[role="tablist"]');
  var tabs = Array.prototype.slice.call(secao.querySelectorAll('[role="tab"]'));
  var paineis = Array.prototype.slice.call(secao.querySelectorAll('[role="tabpanel"]'));
  var indicador = secao.querySelector(".cortes__tab-indicator");

  if (!tablist || tabs.length === 0) return;

  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Atualiza o indicador deslizante sob a aba ativa ---- */
  function posicionarIndicador(abaAtiva) {
    if (!indicador || !abaAtiva) return;
    var largura = abaAtiva.offsetWidth;
    var esquerda = abaAtiva.offsetLeft;
    indicador.style.width = largura + "px";
    indicador.style.transform = "translateX(" + esquerda + "px)";
  }

  /* ---- Troca de aba ---- */
  function ativarAba(novaAba, focar) {
    var abaAtual = tabs.find(function (t) { return t.getAttribute("aria-selected") === "true"; });
    if (abaAtual === novaAba) return;

    var idAlvo = novaAba.getAttribute("aria-controls");
    var novoPainel = doc.getElementById(idAlvo);
    var painelAtual = paineis.find(function (p) { return !p.hidden; });

    // Atualiza estados aria das abas
    tabs.forEach(function (t) {
      var ativa = (t === novaAba);
      t.setAttribute("aria-selected", ativa ? "true" : "false");
      t.setAttribute("tabindex", ativa ? "0" : "-1");
    });

    posicionarIndicador(novaAba);

    if (focar) novaAba.focus();

    // Transição suave de painéis (fade-out + fade-in)
    if (painelAtual && !reduz) {
      painelAtual.classList.add("is-leaving");
      setTimeout(function () {
        painelAtual.hidden = true;
        painelAtual.classList.remove("is-leaving");

        if (novoPainel) {
          novoPainel.hidden = false;
          novoPainel.classList.add("is-entering");
          setTimeout(function () { novoPainel.classList.remove("is-entering"); }, 500);
        }
      }, 250);
    } else {
      paineis.forEach(function (p) { p.hidden = (p !== novoPainel); });
    }
  }

  // Cliques nas abas
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      ativarAba(tab, false);
    });
  });

  // Navegação por teclado nas abas (WAI-ARIA Tab pattern)
  tablist.addEventListener("keydown", function (e) {
    var indexAtual = tabs.indexOf(doc.activeElement);
    if (indexAtual === -1) return;

    var proximoIndex = -1;
    if (e.key === "ArrowRight") {
      proximoIndex = (indexAtual + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      proximoIndex = (indexAtual - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      proximoIndex = 0;
    } else if (e.key === "End") {
      proximoIndex = tabs.length - 1;
    }

    if (proximoIndex !== -1) {
      e.preventDefault();
      ativarAba(tabs[proximoIndex], true);
    }
  });

  // Inicializa a posição do indicador ao carregar e no resize
  function initIndicador() {
    var ativa = tabs.find(function (t) { return t.getAttribute("aria-selected") === "true"; }) || tabs[0];
    posicionarIndicador(ativa);
  }

  window.addEventListener("resize", initIndicador, { passive: true });
  if (doc.readyState === "complete") initIndicador();
  else window.addEventListener("load", initIndicador);
  setTimeout(initIndicador, 100);

  /* ---- Interação "Quero este corte" ---- */
  secao.addEventListener("click", function (e) {
    var link = e.target.closest("[data-corte]");
    if (!link) return;

    e.preventDefault();
    var nomeCorte = link.getAttribute("data-corte") || "";

    // Armazena estado global para quando o formulário de agendamento (Sessão 12) for montado
    window.VERTICE_ESTADO = window.VERTICE_ESTADO || {};
    window.VERTICE_ESTADO.corteSelecionado = nomeCorte;

    // Se o campo do formulário de agendamento já existir, preenche e aplica brilho
    var campoCorte = doc.getElementById("agendamento-corte") || doc.querySelector('[name="corte"]');
    if (campoCorte) {
      campoCorte.value = nomeCorte;
      campoCorte.classList.remove("campo-pulse");
      void campoCorte.offsetWidth; // reflow
      campoCorte.classList.add("campo-pulse");
    }

    // Atualiza links de WhatsApp dependentes, se existirem
    var linkWhatsAppAgendamento = doc.getElementById("agendamento-whatsapp");
    if (linkWhatsAppAgendamento && window.buildWhatsAppLink && window.whatsAppMensagem) {
      linkWhatsAppAgendamento.href = window.buildWhatsAppLink(window.whatsAppMensagem("corte", nomeCorte));
    }

    // Rola suavemente até o agendamento
    var destino = doc.getElementById("agendamento");
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
})();
