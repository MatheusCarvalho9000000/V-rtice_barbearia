/* ==========================================================================
   VÉRTICE BARBEARIA — MOTOR DE ANIMAÇÕES (SESSÃO 0)
   Único script observador. Sem dependências.
   API pública: window.Vertice = { init(raiz), crossfade(container, opcoes), shine(el) }
   Chame Vertice.init(elemento) após inserir conteúdo dinâmico (ex.: troca de abas).
   ========================================================================== */
(function (global) {
  "use strict";

  var doc = document;
  var reduzMovimento = global.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ehMobile = function () { return global.innerWidth < 768; };
  var clamp = function (v, min, max) { return Math.min(max, Math.max(min, v)); };

  /* ---------------------------------------------------------------
     1. data-anim = "up" | "up-once"  (IntersectionObserver)
     Faixa visível: entre 12% e 88% da altura da viewport.
     --------------------------------------------------------------- */
  var obsUp = null;
  var obsOnce = null;

  function criarObservadores() {
    if (obsUp) return;
    var opcoes = { rootMargin: "-12% 0px -12% 0px", threshold: 0 };

    // Reversível: entra por baixo, sai por cima, reaparece ao voltar
    obsUp = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var el = e.target;
        if (e.isIntersecting) {
          el.classList.remove("is-above");
          el.classList.add("is-in");
        } else {
          el.classList.remove("is-in");
          // Posição relativa à faixa: se o elemento está acima dela, saiu por cima
          var raiz = e.rootBounds;
          var acima = raiz ? e.boundingClientRect.top < raiz.top : e.boundingClientRect.top < 0;
          el.classList.toggle("is-above", acima);
        }
      });
    }, opcoes);

    // Uma vez: sobe, aparece e permanece (também linhas de título e traços SVG)
    obsOnce = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        obsOnce.unobserve(e.target);
      });
    }, opcoes);
  }

  function aplicarStagger(raiz) {
    raiz.querySelectorAll("[data-anim-group]").forEach(function (grupo) {
      var filhos = grupo.querySelectorAll(":scope > [data-anim], :scope > * > [data-anim]");
      Array.prototype.forEach.call(filhos, function (filho, i) {
        // Máximo de 6 atrasos; depois repete o último
        filho.style.setProperty("--anim-i", Math.min(i, 5));
      });
    });
  }

  function iniciarUp(raiz) {
    var faixa = global.innerHeight * 0.76;
    raiz.querySelectorAll('[data-anim="up"], [data-anim="up-once"]').forEach(function (el) {
      if (el.__vUp) return;
      el.__vUp = true;
      var once = el.getAttribute("data-anim") === "up-once";

      // Elementos mais altos que a faixa visível não devem desaparecer
      if (!once && el.offsetHeight > faixa) {
        once = true;
        el.setAttribute("data-anim", "up-once");
      }
      if (reduzMovimento) { el.classList.add("is-in"); return; }
      (once ? obsOnce : obsUp).observe(el);
    });
  }

  /* ---------------------------------------------------------------
     2. data-anim = "lines"  (título dividido por linha, com máscara)
     --------------------------------------------------------------- */
  function dividirLinhas(el) {
    var texto = el.__vTexto || (el.__vTexto = el.textContent.replace(/\s+/g, " ").trim());
    el.textContent = "";
    var palavras = texto.split(" ");
    var spans = palavras.map(function (p, i) {
      var s = doc.createElement("span");
      s.style.display = "inline-block";
      s.textContent = p;
      el.appendChild(s);
      if (i < palavras.length - 1) el.appendChild(doc.createTextNode(" "));
      return s;
    });

    // Agrupa palavras pela posição vertical
    var linhas = [], topoAtual = null;
    spans.forEach(function (s, i) {
      var top = s.offsetTop;
      if (topoAtual === null || Math.abs(top - topoAtual) > 4) {
        linhas.push([]);
        topoAtual = top;
      }
      linhas[linhas.length - 1].push(palavras[i]);
    });

    el.textContent = "";
    el.setAttribute("aria-label", texto);
    linhas.forEach(function (ws, i) {
      var mascara = doc.createElement("span");
      mascara.className = "anim-line";
      mascara.setAttribute("aria-hidden", "true");
      var interno = doc.createElement("span");
      interno.className = "anim-line__inner";
      interno.style.setProperty("--line-i", i);
      interno.textContent = ws.join(" ");
      mascara.appendChild(interno);
      el.appendChild(mascara);
    });
    el.classList.add("is-split");
  }

  function iniciarLines(raiz) {
    raiz.querySelectorAll('[data-anim="lines"]').forEach(function (el) {
      if (el.__vLines) return;
      el.__vLines = true;
      dividirLinhas(el);
      if (reduzMovimento) el.classList.add("is-in");
      else obsOnce.observe(el);
    });
  }

  var timerResize;
  function reDividirLinhas() {
    doc.querySelectorAll('[data-anim="lines"].is-split').forEach(dividirLinhas);
  }

  /* ---------------------------------------------------------------
     3. data-anim = "draw"  (traços SVG)
     --------------------------------------------------------------- */
  function iniciarDraw(raiz) {
    raiz.querySelectorAll('[data-anim="draw"]').forEach(function (el) {
      if (el.__vDraw) return;
      el.__vDraw = true;
      var alvos = el.matches("path, line, polyline") ? [el] : el.querySelectorAll("path, line, polyline");
      Array.prototype.forEach.call(alvos, function (a) { a.setAttribute("pathLength", "1"); });
      if (reduzMovimento) el.classList.add("is-in");
      else obsOnce.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     4. data-anim = "progress" e data-parallax  (ligados ao scroll)
     --------------------------------------------------------------- */
  var progressos = [];
  var paralaxes = [];
  var rafPendente = false;

  function iniciarScroll(raiz) {
    raiz.querySelectorAll('[data-anim="progress"]').forEach(function (el) {
      if (el.__vProg) return;
      el.__vProg = true;
      progressos.push(el);
    });
    raiz.querySelectorAll("[data-parallax]").forEach(function (el) {
      if (el.__vPar) return;
      el.__vPar = true;
      paralaxes.push(el);
    });
    atualizarScroll();
  }

  function atualizarScroll() {
    rafPendente = false;
    var vh = global.innerHeight;

    progressos.forEach(function (el) {
      var seletor = el.getAttribute("data-progress-target");
      var alvo = (seletor && el.closest(seletor)) || el.closest("section") || el.parentElement;
      var r = alvo.getBoundingClientRect();
      // Progresso 0 quando o topo da sessão chega a 60% da tela; 1 quando o fim chega a 60%
      var p = clamp((vh * 0.6 - r.top) / r.height, 0, 1);
      el.style.setProperty("--progress", p.toFixed(4));
    });

    if (reduzMovimento || ehMobile()) {
      paralaxes.forEach(function (el) { el.style.removeProperty("--py"); });
      return;
    }
    paralaxes.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var fator = parseFloat(el.getAttribute("data-parallax")) || 0.15;
      var distancia = r.top + r.height / 2 - vh / 2;
      var py = clamp(-distancia * fator, -30, 30);      // máx. ±30px
      el.style.setProperty("--py", py.toFixed(1) + "px");
    });
  }

  function pedirAtualizacao() {
    if (rafPendente) return;
    rafPendente = true;
    global.requestAnimationFrame(atualizarScroll);
  }

  /* ---------------------------------------------------------------
     5. Crossfade (temporizado ou controlado manualmente) + Ken Burns
     Filhos diretos do container são os slides.
     --------------------------------------------------------------- */
  function crossfade(container, opcoes) {
    opcoes = opcoes || {};
    var intervalo = opcoes.interval || 6500;
    var duracao = opcoes.duration || 1600;
    var slides = Array.prototype.slice.call(container.children);
    var atual = -1, timer = null, ativo = false;

    function ir(i) {
      i = (i + slides.length) % slides.length;
      if (i === atual) return;
      var anterior = slides[atual];
      if (anterior) {
        anterior.classList.remove("is-active");
        anterior.classList.add("is-leaving");           // continua o zoom enquanto some
        setTimeout(function () { anterior.classList.remove("is-leaving"); }, duracao + 100);
      }
      slides[i].classList.remove("is-leaving");
      slides[i].classList.add("is-active");
      atual = i;
      if (opcoes.onChange) opcoes.onChange(i, slides[i]);
    }

    function agendar() {
      clearTimeout(timer);
      if (!ativo || reduzMovimento || doc.hidden) return;
      timer = setTimeout(function () { ir(atual + 1); agendar(); }, intervalo);
    }

    var api = {
      goTo: function (i) { ir(i); agendar(); },       // reinicia o ciclo
      next: function () { ir(atual + 1); agendar(); },
      start: function () { ativo = true; agendar(); },
      stop: function () { ativo = false; clearTimeout(timer); },
      get index() { return atual; },
      get length() { return slides.length; }
    };

    // Pausa quando a aba está oculta
    doc.addEventListener("visibilitychange", function () {
      if (doc.hidden) clearTimeout(timer); else agendar();
    });

    ir(opcoes.start || 0);
    return api;
  }

  function iniciarCrossfade(raiz) {
    // Auto-inicialização: <div class="crossfade" data-crossfade-interval="6500">
    raiz.querySelectorAll(".crossfade[data-crossfade-interval]").forEach(function (el) {
      if (el.__vCf) return;
      el.__vCf = crossfade(el, { interval: parseInt(el.getAttribute("data-crossfade-interval"), 10) });
      el.__vCf.start();
    });
  }

  /* ---------------------------------------------------------------
     6. Brilho no logo (.shine) — uma vez, no carregamento
     --------------------------------------------------------------- */
  function shine(el) {
    if (reduzMovimento) return;
    el.classList.add("is-shining");
  }
  function iniciarShine() {
    doc.querySelectorAll(".shine[data-shine-delay]").forEach(function (el) {
      var atraso = parseInt(el.getAttribute("data-shine-delay"), 10) || 0;
      setTimeout(function () { shine(el); }, atraso);
    });
  }

  /* ---------------------------------------------------------------
     Inicialização
     --------------------------------------------------------------- */
  function init(raiz) {
    raiz = raiz || doc;
    criarObservadores();
    aplicarStagger(raiz);
    iniciarLines(raiz);
    iniciarUp(raiz);
    iniciarDraw(raiz);
    iniciarScroll(raiz);
    iniciarCrossfade(raiz);
  }

  global.Vertice = { init: init, crossfade: crossfade, shine: shine };

  function aoCarregarDOM() {
    // Garante o estado "oculto" apenas com JS ativo
    doc.documentElement.classList.add("js");
    // Aguarda as fontes para medir corretamente as linhas dos títulos
    var pronto = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
    pronto.then(function () { init(); });
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", aoCarregarDOM);
  else aoCarregarDOM();

  global.addEventListener("load", iniciarShine);
  global.addEventListener("scroll", pedirAtualizacao, { passive: true });
  global.addEventListener("resize", function () {
    pedirAtualizacao();
    clearTimeout(timerResize);
    timerResize = setTimeout(reDividirLinhas, 200);
  });
})(window);
