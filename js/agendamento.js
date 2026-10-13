/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 12: LÓGICA DE AGENDAMENTO
   - Validação no cliente sem recarregar a página
   - Montagem de mensagem do WhatsApp omitindo linhas vazias e formatando data
   - Abertura de wa.me em nova aba com feedback e link de fallback
   - Suporte a pré-seleção vinda de Cortes (Sessão 5) e Combos (Sessão 7)
   - Data mínima como a data atual
   - Configuração dinâmica de links auxiliares (WhatsApp direto e Instagram)
   ========================================================================== */
(function (global) {
  "use strict";

  var doc = document;
  var secao = doc.getElementById("agendamento");
  if (!secao) return;

  var form = secao.querySelector("#form-agendamento");
  if (!form) return;

  var campoNome = doc.getElementById("agendamento-nome");
  var campoServico = doc.getElementById("agendamento-servico");
  var campoCorte = doc.getElementById("agendamento-corte");
  var campoData = doc.getElementById("agendamento-data");
  var campoObs = doc.getElementById("agendamento-obs");
  var erroNome = doc.getElementById("erro-nome");
  var erroServico = doc.getElementById("erro-servico");
  var boxFeedback = doc.getElementById("agendamento-feedback");
  var fallbackLink = doc.getElementById("agendamento-fallback-link");

  var linkWhatsDireto = doc.getElementById("agendamento-direto-whatsapp");
  var linkInstagram = doc.getElementById("agendamento-link-instagram");

  /* ---- Define data mínima como hoje (YYYY-MM-DD) ---- */
  if (campoData) {
    try {
      var hoje = new Date();
      var ano = hoje.getFullYear();
      var mes = String(hoje.getMonth() + 1).padStart(2, "0");
      var dia = String(hoje.getDate()).padStart(2, "0");
      campoData.min = ano + "-" + mes + "-" + dia;
    } catch (e) {}
  }

  /* ---- Configura links de apoio ---- */
  if (linkWhatsDireto && global.buildWhatsAppLink) {
    linkWhatsDireto.href = global.buildWhatsAppLink("Olá, Vértice! Quero agendar um horário.");
    linkWhatsDireto.target = "_blank";
    linkWhatsDireto.rel = "noopener noreferrer";
  }

  if (linkInstagram && global.VERTICE_CONFIG) {
    linkInstagram.href = global.VERTICE_CONFIG.INSTAGRAM_URL;
  }

  /* ---- Formatação de Data dd/mm/aaaa ---- */
  function formatarDataBR(dataISO) {
    if (!dataISO) return "";
    var partes = dataISO.split("-");
    if (partes.length === 3) {
      return partes[2] + "/" + partes[1] + "/" + partes[0];
    }
    return dataISO;
  }

  /* ---- Obter período selecionado (chips) ---- */
  function obterPeriodoSelecionado() {
    var radio = form.querySelector('input[name="periodo"]:checked');
    return radio ? radio.value.trim() : "";
  }

  /* ---- Aplica brilho de pulso de 800ms ---- */
  function pulsarCampo(el) {
    if (!el) return;
    el.classList.remove("campo-pulse");
    void el.offsetWidth; // força reflow
    el.classList.add("campo-pulse");
  }

  /* ---- Seleciona valor no <select> de forma flexível (com ou sem prefixo "Vértice") ---- */
  function definirValorSelect(selectEl, valorDesejado) {
    if (!selectEl || !valorDesejado) return false;
    var vLimpo = valorDesejado.trim();
    var vSemPrefixo = vLimpo.replace(/^Vértice\s+/i, "");

    // 1. Tenta correspondência exata de valor
    for (var i = 0; i < selectEl.options.length; i++) {
      var opt = selectEl.options[i];
      if (opt.value === vLimpo || opt.value === vSemPrefixo || opt.text === vLimpo || opt.text === vSemPrefixo) {
        selectEl.selectedIndex = i;
        pulsarCampo(selectEl);
        return true;
      }
    }
    return false;
  }

  /* ---- Aplica pré-seleção inicial se já existir em VERTICE_ESTADO ---- */
  function aplicarPreSelecoesGlobais() {
    var estado = global.VERTICE_ESTADO;
    if (!estado) return;

    if (estado.comboSelecionado && campoServico) {
      definirValorSelect(campoServico, estado.comboSelecionado);
    }

    if (estado.corteSelecionado && campoCorte) {
      definirValorSelect(campoCorte, estado.corteSelecionado);
    }
  }

  aplicarPreSelecoesGlobais();

  /* Listener global para interceptar cliques vindos de Cortes (Sessão 5) ou Combos (Sessão 7) */
  doc.addEventListener("click", function (e) {
    var btnCombo = e.target.closest("[data-combo]");
    if (btnCombo && campoServico) {
      var combo = btnCombo.getAttribute("data-combo");
      if (combo) {
        definirValorSelect(campoServico, combo);
        if (erroServico) {
          erroServico.textContent = "";
          erroServico.classList.remove("is-visivel");
          campoServico.classList.remove("is-invalido");
        }
      }
    }

    var btnCorte = e.target.closest("[data-corte]");
    if (btnCorte && campoCorte) {
      var corte = btnCorte.getAttribute("data-corte");
      if (corte) {
        definirValorSelect(campoCorte, corte);
      }
    }
  });

  /* ---- Limpeza de erros ao digitar / alterar ---- */
  if (campoNome) {
    campoNome.addEventListener("input", function () {
      campoNome.classList.remove("is-invalido");
      campoNome.removeAttribute("aria-invalid");
      if (erroNome) {
        erroNome.textContent = "";
        erroNome.classList.remove("is-visivel");
      }
    });
  }

  if (campoServico) {
    campoServico.addEventListener("change", function () {
      campoServico.classList.remove("is-invalido");
      campoServico.removeAttribute("aria-invalid");
      if (erroServico) {
        erroServico.textContent = "";
        erroServico.classList.remove("is-visivel");
      }
    });
  }

  /* ---- Submissão do Formulário ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nome = (campoNome ? campoNome.value : "").trim();
    var servico = (campoServico ? campoServico.value : "").trim();
    var corte = (campoCorte ? campoCorte.value : "").trim();
    var data = campoData ? campoData.value : "";
    var periodo = obterPeriodoSelecionado();
    var obs = (campoObs ? campoObs.value : "").trim();

    var valido = true;
    var primeiroInvalido = null;

    // 1. Validação de Nome (Obrigatório)
    if (!nome) {
      valido = false;
      if (campoNome) {
        campoNome.classList.add("is-invalido");
        campoNome.setAttribute("aria-invalid", "true");
        if (erroNome) {
          erroNome.textContent = "Informe seu nome para continuar.";
          erroNome.classList.add("is-visivel");
        }
        primeiroInvalido = campoNome;
      }
    }

    // 2. Validação de Serviço / Combo (Obrigatório)
    if (!servico) {
      valido = false;
      if (campoServico) {
        campoServico.classList.add("is-invalido");
        campoServico.setAttribute("aria-invalid", "true");
        if (erroServico) {
          erroServico.textContent = "Selecione um serviço ou combo para continuar.";
          erroServico.classList.add("is-visivel");
        }
        if (!primeiroInvalido) primeiroInvalido = campoServico;
      }
    }

    if (!valido) {
      if (primeiroInvalido) primeiroInvalido.focus();
      return;
    }

    // 3. Montagem da Mensagem do WhatsApp conforme a especificação:
    // Olá, Vértice! Meu nome é {nome} e quero agendar.
    // Serviço: {serviço}
    // Corte ou estilo: {corte}
    // Dia de preferência: {data}
    // Período: {período}
    // Observações: {observações}
    // (Omitir as linhas dos campos vazios. Formatar a data como dd/mm/aaaa.)

    var linhas = [
      "Olá, Vértice! Meu nome é " + nome + " e quero agendar.",
      "Serviço: " + servico
    ];

    if (corte) {
      linhas.push("Corte ou estilo: " + corte);
    }

    if (data) {
      linhas.push("Dia de preferência: " + formatarDataBR(data));
    }

    if (periodo) {
      linhas.push("Período: " + periodo);
    }

    if (obs) {
      linhas.push("Observações: " + obs);
    }

    var mensagemFinal = linhas.join("\n");

    // 4. Montar URL e abrir em nova aba
    var urlWhats = global.buildWhatsAppLink
      ? global.buildWhatsAppLink(mensagemFinal)
      : "https://wa.me/?text=" + encodeURIComponent(mensagemFinal);

    try {
      global.open(urlWhats, "_blank", "noopener,noreferrer");
    } catch (err) {}

    // 5. Exibir feedback e fallback para o usuário
    if (fallbackLink) {
      fallbackLink.href = urlWhats;
    }
    if (boxFeedback) {
      boxFeedback.hidden = false;
    }
  });

  /* Expor utilitário global */
  global.VerticeAgendamento = {
    selecionarCorte: function (nomeCorte) {
      if (campoCorte) definirValorSelect(campoCorte, nomeCorte);
    },
    selecionarCombo: function (nomeCombo) {
      if (campoServico) definirValorSelect(campoServico, nomeCombo);
    }
  };
})(window);
