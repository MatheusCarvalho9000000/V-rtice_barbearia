/* ==========================================================================
   VÉRTICE BARBEARIA — SESSÃO 13: LÓGICA DE CONTATO, RODAPÉ E BOTÃO FLUTUANTE
   - Preenchimento dinâmico de contato com base em VERTICE_CONFIG
   - Linha do rodapé que se desenha ao entrar na tela
   - Botão flutuante de WhatsApp inteligente:
     * surge após 80% da altura do Hero
     * oculta automaticamente enquanto #agendamento estiver visível
   - Ação de voltar ao topo suave
   ========================================================================== */
(function (global) {
  "use strict";

  var doc = document;
  var config = global.VERTICE_CONFIG || {};

  /* ---- 1. Preenchimento Dinâmico de Localização e Contato ---- */
  function configurarDadosContato() {
    // Cidade e Endereço
    var elCidade = doc.getElementById("contato-cidade");
    var elEndereco = doc.getElementById("contato-endereco");
    var elItemEndereco = doc.getElementById("contato-item-endereco");

    if (elCidade && config.CIDADE) {
      elCidade.textContent = config.CIDADE;
    }

    if (config.ENDERECO && config.ENDERECO.trim()) {
      if (elEndereco) elEndereco.textContent = config.ENDERECO;
      if (elItemEndereco) elItemEndereco.hidden = false;
    } else {
      if (elItemEndereco) elItemEndereco.hidden = true;
    }

    // Horários
    var elHorarios = doc.getElementById("contato-horarios");
    if (elHorarios) {
      if (config.HORARIOS && config.HORARIOS.length > 0) {
        var textoHorarios = config.HORARIOS.map(function (h) {
          return h.dias + ": " + h.horas;
        }).join(" · ");
        elHorarios.textContent = textoHorarios;
      } else {
        elHorarios.textContent = config.TEXTO_SEM_HORARIOS || "Consulte os horários pelo WhatsApp";
      }
    }

    // Botões de contato
    var btnWhats = doc.getElementById("contato-btn-whatsapp");
    if (btnWhats && global.buildWhatsAppLink) {
      btnWhats.href = global.buildWhatsAppLink("Olá, Vértice! Quero agendar um horário.");
      btnWhats.target = "_blank";
      btnWhats.rel = "noopener noreferrer";
    }

    var btnInsta = doc.getElementById("contato-btn-insta");
    if (btnInsta && config.INSTAGRAM_URL) {
      btnInsta.href = config.INSTAGRAM_URL;
    }

    var btnMapa = doc.getElementById("contato-btn-mapa");
    if (btnMapa) {
      if (config.MAPS_URL && config.MAPS_URL.trim()) {
        btnMapa.href = config.MAPS_URL;
        btnMapa.hidden = false;
      } else {
        btnMapa.hidden = true;
      }
    }

    // Links no rodapé
    var footerWhats = doc.getElementById("footer-whatsapp");
    if (footerWhats && global.buildWhatsAppLink) {
      footerWhats.href = global.buildWhatsAppLink("Olá, Vértice! Quero agendar um horário.");
    }

    var footerInsta = doc.getElementById("footer-instagram");
    if (footerInsta && config.INSTAGRAM_URL) {
      footerInsta.href = config.INSTAGRAM_URL;
      if (config.INSTAGRAM_HANDLE) {
        footerInsta.textContent = config.INSTAGRAM_HANDLE;
      }
    }

    var footerCidade = doc.getElementById("footer-cidade");
    if (footerCidade && config.CIDADE) {
      footerCidade.textContent = config.CIDADE;
    }
  }

  /* ---- 2. Linha superior do rodapé (desenho ao entrar) ---- */
  function iniciarLinhaRodape() {
    var footer = doc.querySelector(".site-footer");
    var linha = doc.querySelector(".site-footer__linha");
    if (!footer || !linha) return;

    if ("IntersectionObserver" in global) {
      var obsFooter = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            linha.classList.add("is-in");
            obsFooter.unobserve(footer);
          }
        });
      }, { threshold: 0.1 });
      obsFooter.observe(footer);
    } else {
      linha.classList.add("is-in");
    }
  }

  /* ---- 3. Botão Flutuante de WhatsApp ---- */
  function iniciarBotaoFlutuante() {
    var btnFloat = doc.getElementById("btn-whatsapp-flutuante");
    if (!btnFloat) return;

    if (global.buildWhatsAppLink) {
      btnFloat.href = global.buildWhatsAppLink("Olá, Vértice! Quero agendar um horário.");
    }

    var hero = doc.getElementById("hero");
    var secaoAgendamento = doc.getElementById("agendamento");

    var passouHero = false;
    var sobreAgendamento = false;

    function atualizarVisibilidade() {
      if (passouHero && !sobreAgendamento) {
        btnFloat.classList.add("is-visivel");
        btnFloat.classList.remove("is-oculto");
      } else {
        btnFloat.classList.remove("is-visivel");
        btnFloat.classList.add("is-oculto");
      }
    }

    function checarScroll() {
      var limiteHero = hero ? hero.offsetHeight * 0.8 : global.innerHeight * 0.8;
      passouHero = global.scrollY > limiteHero;
      atualizarVisibilidade();
    }

    global.addEventListener("scroll", checarScroll, { passive: true });
    global.addEventListener("resize", checarScroll, { passive: true });

    // Observa se a sessão #agendamento está visível na tela
    if (secaoAgendamento && "IntersectionObserver" in global) {
      var obsAgendamento = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          sobreAgendamento = e.isIntersecting;
          atualizarVisibilidade();
        });
      }, { threshold: 0.05 });
      obsAgendamento.observe(secaoAgendamento);
    }

    checarScroll();
  }

  /* ---- 4. Ação de Voltar ao Topo ---- */
  function iniciarVoltarAoTopo() {
    var btnTopo = doc.getElementById("btn-voltar-topo");
    if (!btnTopo) return;

    btnTopo.addEventListener("click", function (e) {
      e.preventDefault();
      global.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Inicialização ---- */
  function init() {
    configurarDadosContato();
    iniciarLinhaRodape();
    iniciarBotaoFlutuante();
    iniciarVoltarAoTopo();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
