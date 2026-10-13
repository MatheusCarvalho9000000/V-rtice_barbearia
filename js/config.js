/* ==========================================================================
   VÉRTICE BARBEARIA — CONFIGURAÇÃO (SESSÃO 0)
   ÚNICO lugar para editar dados do negócio.
   ========================================================================== */
(function (global) {
  "use strict";

  var CONFIG = {
    /* A DEFINIR: DDI + DDD + número, só dígitos. O cartão do material mostra
       "(47) 88999-9999", mas é exemplo de layout; confirmar antes de publicar. */
    WHATSAPP_NUMBER: "55XXXXXXXXXXX",

    /* Handle visto no cartão do material; confirmar. */
    INSTAGRAM_URL: "https://instagram.com/verticebarbearia",
    INSTAGRAM_HANDLE: "@verticebarbearia",

    CIDADE: "São Bento do Sul, SC",

    /* A DEFINIR: a fachada do material mostra o número 285; rua ainda não definida. */
    ENDERECO: "",

    /* A DEFINIR. Formato sugerido: [{ dias: "Seg a Sex", horas: "09h às 19h" }].
       Se vazio, o bloco exibe TEXTO_SEM_HORARIOS. */
    HORARIOS: [],
    TEXTO_SEM_HORARIOS: "Consulte os horários pelo WhatsApp",

    /* A DEFINIR. Se vazio, ocultar o botão "Abrir no mapa" e o mapa. */
    MAPS_URL: "",

    /* duracao / preco vazios => card mostra TEXTO_SEM_VALORES. */
    TEXTO_SEM_VALORES: "Valores sob consulta no WhatsApp",
    COMBOS: [
      { id: "express",  nome: "Vértice Express",  duracao: "", preco: "" },
      { id: "corte",    nome: "Vértice Corte",    duracao: "", preco: "" },
      { id: "barba",    nome: "Vértice Barba",    duracao: "", preco: "" },
      { id: "completo", nome: "Vértice Completo", duracao: "", preco: "" },
      { id: "prime",    nome: "Vértice Prime",    duracao: "", preco: "" }
    ],

    /* Mensagens padrão de WhatsApp. {nome} é substituído. */
    MENSAGENS: {
      generica: "Olá, Vértice! Quero agendar um horário.",
      corte:    "Olá, Vértice! Quero agendar um horário para o corte: {nome}.",
      servico:  "Olá, Vértice! Quero agendar o serviço: {nome}."
    }
  };

  /**
   * Monta o link do WhatsApp. Todo botão de WhatsApp do site usa esta função.
   * @param {string} [mensagem] texto livre; se omitido usa a mensagem genérica.
   * @returns {string} https://wa.me/{WHATSAPP_NUMBER}?text={mensagem codificada}
   */
  function buildWhatsAppLink(mensagem) {
    var texto = (mensagem === undefined || mensagem === null) ? CONFIG.MENSAGENS.generica : mensagem;
    var numero = String(CONFIG.WHATSAPP_NUMBER).replace(/\D/g, "") || CONFIG.WHATSAPP_NUMBER;
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
  }

  /** Atalho: mensagem padrão por tipo ("generica" | "corte" | "servico"). */
  function whatsAppMensagem(tipo, nome) {
    var modelo = CONFIG.MENSAGENS[tipo] || CONFIG.MENSAGENS.generica;
    return modelo.replace("{nome}", nome || "");
  }

  /* Preenche automaticamente <a data-whatsapp="generica|corte|servico" data-nome="..."> */
  function ligarBotoesWhatsApp(raiz) {
    (raiz || document).querySelectorAll("[data-whatsapp]").forEach(function (el) {
      var tipo = el.getAttribute("data-whatsapp") || "generica";
      el.setAttribute("href", buildWhatsAppLink(whatsAppMensagem(tipo, el.getAttribute("data-nome"))));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  global.VERTICE_CONFIG = CONFIG;
  global.buildWhatsAppLink = buildWhatsAppLink;
  global.whatsAppMensagem = whatsAppMensagem;
  global.ligarBotoesWhatsApp = ligarBotoesWhatsApp;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { ligarBotoesWhatsApp(); });
  } else {
    ligarBotoesWhatsApp();
  }
})(window);
