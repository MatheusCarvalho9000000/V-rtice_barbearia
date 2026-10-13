# Vértice Barbearia — Especificação da Landing Page

> Slogan: **Precisão que define seu estilo.**
> Frase de apoio da marca: **Mais que um corte, uma escolha.**

---

## Como usar este documento (instruções para a IA / IDE)

1. Este documento descreve uma **landing page de uma página só** (one page) para a Vértice Barbearia, em São Bento do Sul, SC.
2. O desenvolvimento é dividido em **sessões numeradas (SESSÃO 0 a SESSÃO 13)**. Implemente **uma sessão por vez**, na ordem. Não adiantar sessões futuras.
3. A **SESSÃO 0 (Fundação)** cria os tokens de design, as animações reutilizáveis e o arquivo de configuração. Todas as outras sessões **reutilizam** esses itens pelo nome (ex.: `--champagne`, `data-anim="up"`, `.btn--primary`). Não recriar nem duplicar.
4. Ao concluir cada sessão: listar os arquivos criados/alterados e confirmar os critérios de aceite da sessão antes de seguir.
5. Stack livre. Se não houver definição, usar **HTML + CSS + JavaScript puro**, com `IntersectionObserver` para animações de rolagem (leve, sem dependências). Alternativas aceitas: Vite + React, Next.js, GSAP/ScrollTrigger ou Framer Motion, desde que o resultado visual descrito seja o mesmo.
6. Idioma do site: **português do Brasil**. Os textos entre aspas neste documento são os textos finais da página.
7. Sessões marcadas como **(opcional)** podem ser puladas sem quebrar a página.

---

## Visão geral

| Item | Definição |
|---|---|
| Tipo | Landing page de uma página, responsiva (mobile first) |
| Objetivo | Apresentar a barbearia, os cortes, os serviços e levar o visitante a **agendar pelo WhatsApp** |
| Público | Pessoas que valorizam a aparência e procuram atendimento profissional; jovens adultos e profissionais, sem excluir quem prefere cortes tradicionais |
| Tom de voz | Direto, seguro, acolhedor. Frases curtas, verbos claros. Sem exagero e sem prometer "o melhor da cidade" |
| Sensação visual | Contemporâneo, escuro, sofisticado. Madeira, metal escovado, luz quente. **Sem** bigodes, navalhas decorativas ou referências vintage |
| Ação principal | Botão "Agendar pelo WhatsApp" presente no cabeçalho, no hero, no botão flutuante e na sessão de agendamento |

### Ordem das sessões na página

| Sessão | Nome | Fundo |
|---|---|---|
| 0 | Fundação (tokens, animações, config) | — |
| 1 | Cabeçalho e navegação | Transparente → grafite |
| 2 | Hero | Imagens em transição + overlay grafite |
| 3 | Sobre a Vértice | Grafite |
| 4 | Diferenciais | Grafite elevado |
| 5 | Cortes | Grafite |
| 6 | Serviços | **Off-white** |
| 7 | Combos | Grafite |
| 8 | Como funciona (6 etapas) | **Verde profundo** |
| 9 | Espaço (imagens em transição ao rolar) | Grafite |
| 10 | Fundadores *(opcional)* | Off-white |
| 11 | Perguntas frequentes *(opcional)* | Grafite |
| 12 | Agendamento (formulário que abre o WhatsApp) | Degradê verde profundo → grafite |
| 13 | Localização, contato e rodapé + acabamento final | Grafite |

O botão flutuante do WhatsApp e o acabamento global (SEO, acessibilidade, desempenho) estão descritos na SESSÃO 13.

---

# SESSÃO 0 — Fundação

**Objetivo:** criar a base compartilhada por todas as sessões. Nenhuma sessão visual é construída aqui.

## 0.1 Arquivo de configuração (único lugar para editar dados do negócio)

Criar um arquivo de configuração (`config.js`, `site.config.json` ou equivalente) com:

| Chave | Valor inicial | Observação |
|---|---|---|
| `WHATSAPP_NUMBER` | `"55XXXXXXXXXXX"` (DDI + DDD + número, só dígitos) | **A definir.** O cartão de visita do material mostra "(47) 88999-9999", mas é exemplo de layout; confirmar antes de publicar |
| `INSTAGRAM_URL` | `"https://instagram.com/verticebarbearia"` | Handle visto no cartão do material; confirmar |
| `INSTAGRAM_HANDLE` | `"@verticebarbearia"` | idem |
| `CIDADE` | `"São Bento do Sul, SC"` | |
| `ENDERECO` | `""` | A definir. A fachada do material mostra o número 285; rua ainda não definida |
| `HORARIOS` | `[]` | A definir. Se vazio, o bloco de horários exibe "Consulte os horários pelo WhatsApp" |
| `MAPS_URL` | `""` | A definir. Se vazio, ocultar o botão "Abrir no mapa" e o mapa |
| `COMBOS[].duracao` / `COMBOS[].preco` | `""` | A definir. Se vazio, o card mostra "Valores sob consulta no WhatsApp" |

**Função utilitária obrigatória:** `buildWhatsAppLink(mensagem)` que retorna
`https://wa.me/{WHATSAPP_NUMBER}?text={encodeURIComponent(mensagem)}`.
Todo botão de WhatsApp do site usa essa função.

**Mensagens padrão de WhatsApp:**
- Genérica: "Olá, Vértice! Quero agendar um horário."
- A partir de um corte: "Olá, Vértice! Quero agendar um horário para o corte: {nome do corte}."
- A partir de um combo/serviço: "Olá, Vértice! Quero agendar o serviço: {nome}."

## 0.2 Ativos (imagens e logo)

| Arquivo enviado | O que mostra | Uso previsto | Cuidados |
|---|---|---|---|
| `area_01.jpg` | Salão com cadeiras de couro caramelo, bancada com produtos e espelho com luz embutida em painel de madeira escura (paisagem, alta resolução) | Hero (slide), Sobre, Espaço (estações) | As cadeiras caramelo diferem das cadeiras pretas do restante do material. Aplicar o tratamento de cor unificado (0.5) |
| `area_02.jpg` | Bancada com duas cubas brancas, espelhos, prateleiras de madeira e cadeiras pretas (imagem quadrada, resolução média) | Espaço (lavagem e cuidados), faixa em Serviços | Não usar em tela cheia no hero (ficaria suave demais). Usar com largura limitada ou em faixa recortada |
| `area_03.jpg` | Recepção com balcão em pedra clara, espelhos em arco com luz e cadeiras pretas | Opcional (Espaço ou galeria) | **Há um logotipo de outra marca ("L'atelier 35") visível na parede ao fundo, à esquerda.** Recortar mostrando apenas o lado direito (espelhos em arco e cadeiras) ou não usar |
| `estabelecimento.png` | **Colagem de 3 imagens**: fachada noturna com o logo Vértice (parte superior), corredor de estações (inferior esquerda), recepção com sofá e balcão (inferior direita) | Hero, Espaço, Localização | **Separar a colagem em 3 arquivos** antes de usar: `fachada`, `estacoes-corredor`, `recepcao-espera` |
| `identidade_visual.png` | Prancha da marca: logo, variações, paleta, tipografia (Montserrat) e aplicações | **Somente referência.** Não publicar no site | — |
| `Vértice_Barbearia_Logo_Lockup.png` | Logo completo em champagne sobre fundo preto, com slogan | Hero e rodapé | O fundo é preto sólido. Em fundos escuros usar `mix-blend-mode: screen` para o preto desaparecer, ou solicitar versão com transparência/SVG |

**Boas práticas de arquivos:**
- Renomear sem acentos nem espaços (ex.: `vertice-logo-lockup.png`).
- Converter fotos para **WebP** (qualidade ~80) e gerar versões 800w, 1280w e 1920w quando possível. Manter JPG/PNG como fallback.
- Todas as imagens abaixo da primeira dobra usam `loading="lazy"`; as imagens do hero usam carregamento prioritário (a primeira) e as demais após o carregamento da página.
- Símbolo "V": se possível recriar como **SVG** (duas linhas que se encontram em um vértice, com o pequeno triângulo recortado no canto esquerdo superior, como no logo). Usar o SVG no cabeçalho, nos marcadores e no motivo de linhas.

## 0.3 Cores (tokens CSS)

Cores oficiais da marca (prancha de identidade):

| Token | Hex | Uso |
|---|---|---|
| `--grafite` | `#171717` | Fundo principal, texto sobre fundos claros |
| `--offwhite` | `#E9E1D4` | Texto sobre fundos escuros, fundo das sessões claras |
| `--champagne` | `#B49A73` | Cor de destaque: linhas, ícones, botões, detalhes |
| `--verde` | `#414638` | Cor de apoio: sessão "Como funciona", botões secundários, degradês |

Tons derivados (criados para este projeto, mantendo a paleta):

| Token | Hex | Uso |
|---|---|---|
| `--grafite-elevado` | `#212121` | Superfícies um nível acima do fundo (sessão Diferenciais, campos de formulário) |
| `--champagne-claro` | `#E3D3B3` | Ponto claro dos degradês de botão |
| `--champagne-escuro` | `#8A7550` | Detalhes e ícones sobre fundo off-white |
| `--verde-medio` | `#5A6350` | Ponto claro dos degradês verdes |
| `--texto-suave` | `rgba(233,225,212,.72)` | Texto secundário sobre fundo escuro |
| `--linha` | `rgba(233,225,212,.14)` | Divisórias finas sobre fundo escuro |
| `--linha-clara` | `rgba(23,23,23,.16)` | Divisórias finas sobre fundo off-white |

**Regras de contraste:**
- Sobre fundo escuro: texto `--offwhite` ou `--texto-suave`; destaques em `--champagne`.
- Sobre fundo off-white: texto `--grafite`; destaques em `--champagne-escuro`. **Nunca** usar `--champagne` como cor de texto sobre off-white (contraste insuficiente).
- Texto do botão champagne: `--grafite`. Texto do botão verde: `--offwhite`.

## 0.4 Tipografia

- Família única: **Montserrat** (Google Fonts), conforme a prancha de identidade. Pesos carregados: 300, 400, 500, 600. Usar `font-display: swap`.
- Estilo da marca: letras largas e espaçadas nos títulos de marca (wordmark, slogan, navegação, botões); títulos de sessão em caixa normal para leitura confortável.

| Elemento | Tamanho | Peso | Espaçamento / estilo |
|---|---|---|---|
| H1 (hero) | `clamp(2.4rem, 6.2vw, 5rem)` | 500 | `letter-spacing: .01em`, `line-height: 1.08` |
| H2 (título de sessão) | `clamp(1.9rem, 4vw, 3.2rem)` | 500 | `letter-spacing: .005em`, `line-height: 1.15` |
| H3 (título de bloco) | `clamp(1.15rem, 2vw, 1.5rem)` | 500 | `line-height: 1.3` |
| Corpo | `1rem` (16px), `1.0625rem` em ≥1024px | 400 | `line-height: 1.7`, largura máxima de linha ~62 caracteres |
| Texto pequeno | `.875rem` | 400 | |
| Botões, navegação, slogan | `.8125rem` | 600 | Maiúsculas, `letter-spacing: .18em` |

## 0.5 Grid, espaçamento e tratamento de imagem

- Container: `max-width: 1200px`, padding lateral `clamp(20px, 5vw, 64px)`.
- Espaço vertical entre sessões: `padding-block: clamp(80px, 12vw, 160px)`.
- Breakpoints: 480, 768, 1024, 1280.
- Âncoras: `scroll-behavior: smooth` e `scroll-margin-top` igual à altura do cabeçalho.
- Raio de borda: **2px** em botões, campos e imagens (visual reto e preciso, coerente com o logo geométrico).
- Sombras: evitar sombras cinzas genéricas. Profundidade vem de camadas de cor, linhas finas e luz quente nas imagens.
- **Tratamento unificado das fotos:** `filter: saturate(.85) contrast(1.05) brightness(.95)` e uma camada `--grafite` a 15–25% por cima, para que fotos de origens diferentes pareçam da mesma barbearia.

## 0.6 Motivo visual: "linhas do vértice"

O nome Vértice é "o ponto em que diferentes linhas se encontram". O motivo gráfico do site são **duas linhas finas (1px, `--champagne`) que partem de lados opostos e se encontram em um ponto**, formando um "V" aberto.

- Aparece desenhado (animação de traço) no Hero, no Sobre e no fundo do Agendamento.
- Também usado como divisória entre sessões: uma linha diagonal curta que se encontra com outra no centro.
- Marcador de listas: símbolo "V" pequeno (8–10px) em `--champagne` (ou `--champagne-escuro` sobre off-white).
- Usar com moderação: nunca mais de um motivo grande por tela.

## 0.7 Botões

Todos os botões: altura mínima 52px, padding `16px 32px`, raio 2px, texto em maiúsculas (ver 0.4), cursor pointer, transição de 400ms.

| Classe | Aparência | Comportamento do degradê |
|---|---|---|
| `.btn--primary` | Fundo em degradê horizontal `#A88E66 → #E3D3B3 → #A88E66` com `background-size: 200% 100%`; texto `--grafite` | **Hover/foco:** `background-position` desliza de 0% para 100%, a cor "caminha" do champagne escuro ao claro, com elevação de 2px. **Repouso (só nos CTAs principais: hero, agendamento, botão flutuante):** animação lenta contínua de 6s, ida e volta |
| `.btn--secondary` | Transparente com borda 1px `--champagne`; texto `--offwhite` | **Hover:** um degradê champagne preenche o botão da esquerda para a direita (`background-size: 200%`) e o texto passa a `--grafite` |
| `.btn--verde` | Fundo em degradê `#414638 → #5A6350 → #414638` com borda 1px `--champagne`; texto `--offwhite` | Mesmo deslocamento de `background-position` do primário. Usado no formulário e em CTAs sobre áreas claras |
| `.btn--link` | Texto + linha inferior de 1px em `--champagne` | **Hover:** a linha se estende da esquerda para a direita |

Estado de foco por teclado: anel de 2px `--offwhite` com offset de 3px (visível em todos os fundos). Estado desabilitado: opacidade 45%, sem animação.

## 0.8 Catálogo de animações (reutilizável)

Implementar como atributos `data-anim` + classes CSS + um único script observador.

**Animação de rolagem principal — "sobe, aparece e desaparece" (`data-anim="up"`):**

- Cada elemento marcado só fica **visível quando está dentro de uma faixa central da tela** (entre 12% e 88% da altura da viewport). Usar `IntersectionObserver` com `rootMargin: "-12% 0px -12% 0px"`.
- **Entrando por baixo** (rolando para baixo): começa com `opacity: 0` e `translateY(48px)`, vai a `opacity: 1` e `translateY(0)`. Duração 800ms, curva `cubic-bezier(.22, 1, .36, 1)`.
- **Saindo por cima** (rolando para baixo): vai a `opacity: 0` e `translateY(-32px)`, duração 500ms.
- **É reversível:** ao rolar para cima, o elemento reaparece descendo da posição acima; ao voltar, sobe novamente. Detectar a direção comparando a posição do elemento com a viewport.
- **Escalonamento (stagger):** filhos dentro de um grupo (`data-anim-group`) entram com atraso de 90ms entre si (máximo de 6 atrasos; depois repetir o último).
- **Mobile:** deslocamento reduzido para 24px e duração de 600ms.

**Elementos que nunca desaparecem** (usar `data-anim="up-once"`: sobem e aparecem uma vez e permanecem): formulário, campos, botões do CTA final, perguntas frequentes abertas, rodapé, informações de contato. Também não aplicar o desaparecimento em elementos mais altos que a faixa de visibilidade; nesse caso animar cada filho individualmente.

**Outras animações do catálogo:**

| Nome | Atributo / classe | Descrição |
|---|---|---|
| Linha subindo (títulos grandes) | `data-anim="lines"` | O título é dividido por linha; cada linha sobe de dentro de uma máscara (`overflow: hidden`) com `translateY(100%) → 0`, 900ms, atraso de 120ms entre linhas |
| Desenho de linha | `data-anim="draw"` | Traços SVG com `stroke-dasharray`/`stroke-dashoffset`: desenham-se em 1200ms ao entrar na faixa visível. Usado nas linhas do vértice |
| Linha ligada ao scroll | `data-anim="progress"` | A altura/largura de uma linha cresce proporcionalmente ao scroll da sessão. Usado na linha do tempo (SESSÃO 8) |
| Troca de imagem (crossfade) | `.crossfade` | Imagens empilhadas; a ativa tem `opacity: 1`, as demais `0`, transição de 1600ms `ease-in-out`. Pode ser temporizada (Hero) ou guiada pelo scroll (Espaço) |
| Zoom lento (Ken Burns) | `.kenburns` | `scale(1) → scale(1.08)` em 8s, apenas na imagem ativa |
| Paralaxe suave | `data-parallax="0.15"` | Deslocamento vertical de no máximo ±30px em imagens decorativas. Desativar no mobile |
| Brilho no logo | `.shine` | Faixa de luz champagne atravessando o símbolo "V" uma vez, no carregamento |

**Momento orquestrado (a animação de destaque do site):** a abertura do Hero (ver SESSÃO 2). As demais animações devem ser discretas; evitar efeitos de hover em todo card e evitar mover tudo ao mesmo tempo.

**Acessibilidade de movimento:** em `@media (prefers-reduced-motion: reduce)`: remover translações e zoom, manter apenas transições de opacidade curtas (200ms), crossfade sem Ken Burns e **sem rotação automática de imagens** (mostrar apenas a primeira), degradês dos botões estáticos.

**Desempenho:** animar somente `transform` e `opacity` (e `background-position` nos botões). Usar `will-change` apenas durante a animação. Pausar rotações quando a aba estiver oculta (`visibilitychange`).

## Critérios de aceite da SESSÃO 0
- Tokens de cor, tipografia, espaçamento e botões disponíveis globalmente e documentados no CSS.
- Script de animação funcionando com uma página de teste: elemento sobe/aparece, desaparece ao sair por cima e reaparece ao voltar.
- `buildWhatsAppLink` funcional com texto codificado.
- Fontes carregando com fallback (`system-ui, sans-serif`).
- `prefers-reduced-motion` respeitado.

---

# SESSÃO 1 — Cabeçalho e navegação

**Objetivo:** navegação fixa, discreta, com CTA de agendamento sempre à mão.

**Estrutura (desktop):** logo à esquerda; links ao centro/direita; botão à direita.
- Logo: símbolo "V" em SVG + texto "VÉRTICE" em Montserrat 500, `letter-spacing: .38em`, `--offwhite`. Altura total ~28px.
- Links (maiúsculas, `.8125rem`, `letter-spacing: .18em`): **Sobre · Cortes · Serviços · Experiência · Espaço · Contato** (sem pontos no código; apenas espaçamento de 32px entre eles). Destinos: `#sobre`, `#cortes`, `#servicos`, `#como-funciona`, `#espaco`, `#contato`.
- Botão `.btn--primary` compacto (altura 44px): "Agendar".

**Estados:**
- No topo da página: fundo **transparente**, sem borda.
- Após rolar ~80px: fundo `--grafite` a 88% com `backdrop-filter: blur(12px)` e linha inferior 1px `--linha`. Altura reduz de 88px para 68px (transição 300ms).
- Link da sessão atual: sublinhado de 1px em `--champagne` (detecção por `IntersectionObserver`).
- Hover nos links: a linha inferior cresce da esquerda para a direita (300ms).

**Mobile (<1024px):** logo à esquerda, botão "Agendar" compacto e ícone de menu (duas linhas que formam um "V" ao abrir). O menu abre em **tela cheia** com fundo `--grafite`; os links aparecem em fila com `data-anim` de subida e atraso de 70ms entre eles, em tipografia grande (`1.75rem`, peso 400, sem maiúsculas). Rodapé do menu: botão de WhatsApp e @ do Instagram. Fechar ao tocar em um link ou no "X"; travar o scroll do corpo enquanto aberto.

**Animação:** o cabeçalho entra com fade de 600ms depois da abertura do hero (ver SESSÃO 2, ~1800ms).

**Aceite:** navegação por teclado completa (Tab/Enter/Esc no menu mobile), `aria-expanded` no botão do menu, link ativo correto, âncoras com offset certo.

---

# SESSÃO 2 — Hero

**Objetivo:** causar impressão imediata e levar ao agendamento. É a sessão mais importante visualmente.

**Layout:** `height: 100svh`, `min-height: 640px`. Conteúdo alinhado à **esquerda** dentro do container, ancorado no terço inferior da tela (deixa a imagem respirar na parte superior).

## Fundo: troca de imagens (crossfade)

Quatro slides empilhados, em `object-fit: cover`, nesta ordem:

1. **Fachada noturna** (recorte superior de `estabelecimento.png`) — o logo Vértice ilumina a entrada.
2. **Estações de corte** (`area_01.jpg`).
3. **Corredor de estações** (recorte inferior esquerdo de `estabelecimento.png`).
4. **Recepção e espera** (recorte inferior direito de `estabelecimento.png`).

Parâmetros:
- Intervalo entre trocas: **6,5s**. Duração do crossfade: **1,6s**.
- Slide ativo com Ken Burns (zoom lento 1.0 → 1.08 em 8s); ao sair, o slide continua o zoom enquanto desaparece.
- Cada slide tem foco ajustado por `object-position` (ex.: fachada centralizada no letreiro; cadeiras de `area_01` à direita para o texto ficar sobre a madeira escura).
- Imagem 1 carregada de forma prioritária; as outras carregadas após o evento `load`.

**Camadas de proteção para leitura (sobre as imagens):**
1. `linear-gradient(90deg, rgba(23,23,23,.88) 0%, rgba(23,23,23,.55) 45%, rgba(23,23,23,.15) 100%)` (lado do texto mais escuro).
2. `linear-gradient(180deg, rgba(23,23,23,.55) 0%, rgba(23,23,23,0) 30%, rgba(23,23,23,.92) 100%)` (topo para o cabeçalho, base para os controles).

## Conteúdo

- Símbolo "V" em SVG (champagne), ~56px, acima do título.
- **H1:** "Precisão que define seu estilo."
  (quebra em duas linhas no desktop: "Precisão que define" / "seu estilo.")
- **Subtítulo** (`--texto-suave`, máx. 52 caracteres de largura por linha, ~3 linhas): "Barbearia contemporânea em São Bento do Sul. Cortes, barba e cuidados pensados para o seu cabelo e a sua rotina, com consulta antes de cada corte."
- **Botões:**
  - `.btn--primary` (com animação de repouso): "Agendar pelo WhatsApp" → `buildWhatsAppLink("Olá, Vértice! Quero agendar um horário.")`
  - `.btn--secondary`: "Ver cortes e serviços" → rolagem suave até `#cortes`.
- **Controles inferiores:** indicadores dos 4 slides como **linhas finas de 40px**; a linha do slide ativo se preenche em `--champagne` durante os 6,5s (barra de progresso). Clicar em uma linha troca o slide. No canto inferior direito: "São Bento do Sul, SC" em texto pequeno e, ao lado, a indicação de rolagem (linha vertical de 48px com um ponto que desce em loop).

## Sequência de abertura (momento orquestrado)

| Tempo | Evento |
|---|---|
| 0 ms | Tela em `--grafite`; primeiro slide faz fade-in de 1200ms |
| 300 ms | Símbolo "V" é **desenhado** (traço SVG, 900ms) e recebe o brilho `.shine` ao final |
| 900 ms | Linha 1 do H1 sobe da máscara |
| 1020 ms | Linha 2 do H1 sobe da máscara |
| 1400 ms | Subtítulo aparece (subida + fade) |
| 1650 ms | Botões aparecem em sequência (90ms entre eles) |
| 1800 ms | Cabeçalho (SESSÃO 1) aparece |
| 2200 ms | Indicadores de slide aparecem e o ciclo de troca começa |

**Comportamento ao rolar:** o conteúdo do hero sobe levemente e faz fade-out conforme o usuário desce (`data-anim="up"` na saída). A imagem de fundo tem paralaxe suave (0.15).

**Responsivo:** no mobile, título `2.4rem`, conteúdo alinhado à esquerda com padding inferior de 96px (espaço para o botão flutuante), botões empilhados em largura total. As imagens usam `object-position` específico para mostrar o letreiro/cadeiras no formato retrato.

**Aceite:** texto legível sobre todos os slides; crossfade sem "piscar" nem salto; troca pausa quando a aba está oculta; com `prefers-reduced-motion` mostra só o slide 1 e todo o conteúdo já visível; botão abre o WhatsApp com a mensagem correta.

---

# SESSÃO 3 — Sobre a Vértice

**Objetivo:** explicar o conceito da marca e mostrar que o atendimento é personalizado.

**Âncora:** `id="sobre"`. Fundo `--grafite`.

**Layout (desktop):** grid de 12 colunas. Texto nas colunas 1–6; imagem nas colunas 8–12, levemente deslocada para baixo (offset de 48px) para criar assimetria. Abaixo, uma linha com três blocos (Missão, Visão, Valores).

## Conteúdo

- **H2** (`data-anim="lines"`): "O ponto em que tudo se encontra"
- **Parágrafo 1:** "Vértice é o ponto em que diferentes linhas se encontram. Na barbearia, essas linhas são a personalidade do cliente, a habilidade do profissional e o resultado final do serviço."
- **Parágrafo 2:** "Aqui ninguém precisa seguir um padrão. Cada pessoa tem cabelo, rotina e preferências diferentes, e o nosso trabalho é encontrar o corte ou o tratamento que combina com você, seja um degradê moderno ou um corte social bem executado."
- **Bloco Missão:** "Oferecer serviços de barbearia de qualidade, com técnica, atenção aos detalhes e respeito à identidade de cada cliente."
- **Bloco Visão:** "Ser referência local em barbearia moderna, reconhecida pela qualidade dos serviços, pela experiência de atendimento e pela identidade da marca."
- **Bloco Valores:** "Precisão, profissionalismo, criatividade, higiene, pontualidade, respeito e evolução constante." Exibir como lista de palavras separadas por espaçamento (cada uma com o marcador "V" pequeno), sem ícones.

## Design visual

- **Imagem:** recorte vertical (proporção 4:5) de `area_01.jpg` com tratamento unificado (0.5). O canto superior esquerdo da imagem tem **corte diagonal** (`clip-path`) de ~48px, ecoando o ângulo do logo.
- **Linhas do vértice:** SVG sobreposto à lateral da imagem, duas linhas finas champagne que descem e se encontram num ponto; desenhadas ao entrar na tela (`data-anim="draw"`).
- Missão, Visão e Valores: três colunas separadas por **divisórias verticais de 1px** (`--linha`), sem cards. Título de cada bloco em H3 com `--champagne`.

## Animações
- Título por linhas; parágrafos com `data-anim="up"` em grupo (stagger).
- Imagem com paralaxe suave e fade-in; linhas do vértice desenhadas.
- Três blocos entram em stagger de 90ms.

**Responsivo:** tudo em uma coluna; imagem vem depois do segundo parágrafo, com proporção 4:3; blocos empilhados com divisórias horizontais.

**Aceite:** hierarquia clara, leitura fluida, animações ativando na faixa visível e reversíveis.

---

# SESSÃO 4 — Diferenciais

**Objetivo:** resumir em cinco pilares por que escolher a Vértice.

**Âncora:** `id="diferenciais"`. Fundo `--grafite-elevado`.

## Conteúdo

- **H2:** "O que sustenta o nosso trabalho"
- Cinco itens (título + frase):
  1. **Consulta antes do corte** — "Entendemos o seu pedido antes de ligar a máquina."
  2. **Precisão técnica** — "Simetria, acabamento e consistência em cada visita."
  3. **Personalização** — "Adaptamos a referência ao seu cabelo e à sua rotina."
  4. **Experiência moderna** — "Ambiente confortável, agendamento organizado e comunicação digital."
  5. **Evolução contínua** — "Acompanhamos as tendências e aprimoramos as técnicas da equipe."

## Design visual

- Lista de **cinco linhas largas** (não cards): cada linha tem o título em tipografia grande (`clamp(1.4rem, 3vw, 2.2rem)`, peso 400) à esquerda e a frase à direita, separadas por divisórias horizontais de 1px (`--linha`). Sem numeração (não é uma sequência).
- Marcador "V" champagne à esquerda de cada título.
- **Hover (desktop):** a divisória superior da linha vira um degradê champagne que se estende da esquerda para a direita, e o título se desloca 8px para a direita.
- **Mobile:** vira acordeão simples; as frases aparecem abaixo dos títulos (todas visíveis, sem precisar tocar).

## Animações
- Linhas entram com `data-anim="up"` em stagger de 90ms; a divisória de cada linha se desenha da esquerda para a direita.

**Aceite:** leitura rápida em 5 segundos; hover suave; sem sobreposição no mobile.

---

# SESSÃO 5 — Cortes

**Objetivo:** mostrar a variedade de cortes e levar o visitante a pedir um horário já com o corte escolhido.

**Âncora:** `id="cortes"`. Fundo `--grafite`.

## Conteúdo

- **H2** (`data-anim="lines"`): "Cortes para cada cabelo e cada rotina"
- **Texto de introdução:** "Trabalhamos diferentes comprimentos, texturas e estilos. Uma foto pode servir de referência, mas o corte é adaptado à densidade, à textura, ao comprimento e ao resultado que você quer."
- **Abas** (4 categorias): `Degradês e máquina` · `Modernos e texturizados` · `Clássicos e sociais` · `Cacheados, crespos e compridos`

### Aba 1 — Degradês e máquina
| Corte | Descrição |
|---|---|
| Low fade | Degradê baixo, discreto e versátil. |
| Mid fade | Degradê médio, com contraste equilibrado. |
| High fade | Degradê alto, com aparência mais marcada. |
| Skin fade | Degradê que chega à pele nas regiões inferiores. |
| Taper fade | Acabamento gradual nas costeletas e na nuca. |
| Buzz cut | Curto, uniforme e de baixa manutenção. |
| Crew cut | Curto, com um pouco mais de comprimento no topo. |

### Aba 2 — Modernos e texturizados
| Corte | Descrição |
|---|---|
| Textured crop | Topo texturizado com acabamento contemporâneo. |
| French crop | Franja curta e formato definido. |
| Mullet moderno | Contraste entre laterais e comprimento atrás. |
| Burst fade | Degradê arredondado ao redor das orelhas. |
| Undercut | Laterais curtas em contraste com o topo. |
| Quiff | Cabelo frontal com volume e direcionamento. |
| Slick back | Cabelo penteado para trás, com o acabamento que você escolher. |

### Aba 3 — Clássicos e sociais
| Corte | Descrição |
|---|---|
| Corte social tradicional | Limpo, sóbrio e bem executado. |
| Side part | Divisão lateral. |
| Corte executivo | Sóbrio, pensado para a rotina profissional. |
| Corte na tesoura | Acabamento natural. |
| Corte médio | Laterais controladas. |
| Riscas e desenhos discretos | Feitos quando solicitados. |

### Aba 4 — Cacheados, crespos e compridos
Aqui **não há lista de cortes**; exibir um texto e uma lista de serviços:
- Texto: "Atendemos cabelos cacheados, crespos, ondulados e compridos. Respeitamos a textura natural dos fios e orientamos sobre a manutenção do estilo escolhido."
- Lista com marcador "V": Definição de formato · Controle de volume · Texturização · Acabamento de contornos · Corte feito predominantemente na tesoura (escrever como itens separados, sem pontos médios).

**Fechamento da sessão (abaixo das abas):** "Não encontrou o seu estilo? Leve uma referência. A gente interpreta com você." + botão `.btn--secondary` "Falar com a Vértice" (WhatsApp, mensagem genérica).

## Design visual

- **Abas** em linha horizontal: texto em maiúsculas pequenas (`.8125rem`, `letter-spacing: .18em`); aba ativa em `--offwhite` com uma linha de 2px em degradê champagne sob ela, que **desliza** de uma aba para a outra (transição de 400ms). Abas inativas em `--texto-suave`.
- **Lista de cortes:** grade de 2 colunas (desktop) com **linhas** (não cards): nome do corte em `1.25rem` peso 500, descrição em `--texto-suave` e, à direita, o link `.btn--link` "Quero este corte".
- **Hover/foco na linha:** a divisória inferior se desenha em champagne da esquerda para a direita e o nome se desloca 8px.
- Não há fotos de cortes nos materiais enviados. Prever um **slot opcional de imagem** por corte (miniatura 64×64 ou imagem de destaque) que fica oculto enquanto não houver arquivo. Quando existirem fotos reais, exibi-las em destaque ao passar o mouse sobre o corte.

## Interação

- Clique em "Quero este corte": rola até `#agendamento` (SESSÃO 12) e **pré-seleciona o corte** no campo "Corte ou estilo" do formulário, com um pulso rápido de brilho no campo para mostrar o que mudou. Também grava o corte para uso na mensagem do WhatsApp.
- Troca de abas: a lista atual faz fade-out + leve deslocamento para cima (250ms) e a nova entra com subida e fade (500ms). Navegação por setas do teclado entre abas (`role="tablist"`).
- Mobile: abas viram **chips rolantes na horizontal** (scroll com snap), fixadas no topo da sessão enquanto ela é visível; lista em 1 coluna.

**Aceite:** troca de abas fluida; "Quero este corte" leva ao formulário já preenchido; todos os cortes do material estão presentes; a aba 4 não exibe lista de cortes.

---

# SESSÃO 6 — Serviços

**Objetivo:** mostrar que a Vértice é um espaço completo de barbearia e cuidados, não apenas corte.

**Âncora:** `id="servicos"`. Fundo `--offwhite` (única grande quebra de claridade no início da página; texto em `--grafite`).

## Conteúdo

- **H2** (`data-anim="lines"`): "Mais que um corte, uma escolha."
- **Texto:** "A Vértice é um espaço completo de barbearia e cuidados pessoais. Cada serviço pode ser contratado separadamente ou combinado em uma única visita."
- **Quatro blocos de serviços:**

**Barba**
- Aparar e alinhar a barba
- Modelagem personalizada
- Definição de contornos
- Barba completa com tesoura e máquina
- Barbear tradicional com navalha, feito por profissional qualificado e com os cuidados de higiene adequados
- Produtos para hidratação e finalização da barba

**Sobrancelhas e acabamentos**
- Limpeza e alinhamento das sobrancelhas, preservando o formato natural
- Acabamento de costeletas e contornos
- Finalização detalhada da nuca

**Cuidados capilares**
- Lavagem profissional
- Hidratação capilar
- Tratamentos cosméticos para os fios
- Esfoliação cosmética do couro cabeludo, quando adequada
- Camuflagem de fios brancos
- Coloração e descoloração, mediante avaliação prévia e agendamento

**Finalização e estilo**
- Aplicação de pomadas, pastas, ceras e outros produtos
- Orientação sobre os produtos adequados para cada tipo de cabelo
- Finalização para eventos e ocasiões especiais

- **Nota (texto pequeno, abaixo dos blocos):** "Procedimentos químicos são realizados somente com avaliação prévia, produtos apropriados e profissionais capacitados."

## Design visual

- **Faixa de imagem no topo da sessão:** recorte panorâmico (21:9) de `area_02.jpg` (cubas, madeira e espelhos), com tratamento unificado e paralaxe suave. O contraste entre a foto escura e o fundo off-white é intencional.
- Quatro colunas no desktop (2×2 no tablet, 1 coluna no mobile). Cada bloco tem **linha superior de 1px** em `--linha-clara` que, ao entrar na tela, se desenha em `--champagne-escuro`; título H3 em `--grafite`; lista com marcador "V" em `--champagne-escuro`.
- Espaçamento generoso entre itens da lista (12px) e `line-height` 1.5.
- Botão ao final da sessão: `.btn--verde` "Agendar um serviço" → `#agendamento`.

## Animações
- Título por linhas; faixa de imagem com paralaxe; colunas em stagger (`data-anim="up"`, 90ms); itens das listas aparecem em grupo.

**Aceite:** contraste correto (nenhum texto champagne sobre off-white); listas completas conforme o material; nota dos procedimentos químicos visível.

---

# SESSÃO 7 — Combos

**Objetivo:** simplificar a escolha com serviços individuais e combinações.

**Âncora:** `id="combos"`. Fundo `--grafite`.

## Conteúdo

- **H2:** "Do ajuste rápido à experiência completa"
- **Texto:** "Escolha um serviço individual ou combine em uma única visita."
- **Cinco cards**, do mais enxuto ao mais completo (nomes são propostas iniciais do material):

| Nome | Descrição |
|---|---|
| **Vértice Express** | Manutenção rápida para renovar contornos ou fazer ajustes específicos. |
| **Vértice Corte** | Corte de cabelo com consulta inicial, execução técnica e finalização. |
| **Vértice Barba** | Modelagem da barba, acabamento dos contornos e aplicação de produtos adequados. |
| **Vértice Completo** | Corte de cabelo e serviço de barba em uma única visita. |
| **Vértice Prime** | A experiência mais completa: corte, barba e cuidados cosméticos adicionais definidos previamente. |

- Cada card exibe, quando existirem no config: duração e preço. Se estiverem vazios: "Valores sob consulta no WhatsApp".
- Botão de cada card: `.btn--secondary` "Agendar" → `#agendamento` com o combo pré-selecionado.

> **Observação de negócio:** o material informa que duração, conteúdo e preço de cada opção devem ser definidos antes da divulgação. O Express precisa de escopo bem definido para o cliente saber exatamente o que contrata.

## Design visual

- **Desktop:** 5 colunas iguais separadas por divisórias verticais 1px (`--linha`), sem sombras. Cada coluna: nome em H3, descrição em `--texto-suave`, rodapé com duração/preço e botão.
- **Destaque do Prime:** borda superior de 2px com **degradê champagne animado** (move de uma cor à outra em loop lento de 8s) e fundo levemente mais claro (`--grafite-elevado`). Selo discreto "Experiência completa" em texto pequeno.
- **Hover (desktop):** a coluna ganha fundo `--grafite-elevado` com transição de 300ms e o botão passa a `.btn--primary` (degradê desliza).
- **Mobile:** carrossel horizontal com `scroll-snap` (um card e meio visível por vez) e indicador de posição com linhas finas.

## Animações
- Cards entram em stagger lateral (cada um sobe 48px com 90ms de atraso).
- O degradê do Prime anima continuamente (desativado com `prefers-reduced-motion`).

**Aceite:** botões pré-selecionam o combo no formulário; cards sem preço exibem a mensagem padrão; carrossel mobile sem cortar texto.

---

# SESSÃO 8 — Como funciona

**Objetivo:** mostrar o processo de atendimento e transmitir transparência. Aqui a numeração é adequada, pois é uma **sequência real de 6 etapas**.

**Âncora:** `id="como-funciona"`. Fundo `--verde` (#414638), texto `--offwhite`. É a principal sessão em verde profundo.

## Conteúdo

- **H2** (`data-anim="lines"`): "Como é um corte na Vértice"
- **Introdução:** "Um processo claro, para que você participe de cada decisão."
- **Etapas:**
  1. **Agendamento** — "Pelo WhatsApp ou pelo Instagram. Você escolhe o serviço e consulta os horários disponíveis."
  2. **Consulta inicial** — "Antes do corte, o barbeiro pergunta qual estilo você quer, como costuma arrumar o cabelo, quanto tempo dedica à manutenção e se tem alguma referência."
  3. **Avaliação e definição** — "Observamos comprimento, textura e caimento, recomendamos possibilidades e explicamos as adaptações necessárias. Você aprova a proposta antes de começar."
  4. **Execução técnica** — "Máquina, tesoura, navalhete ou o instrumento certo para o serviço, trabalhando por etapas: proporções, transições e simetria."
  5. **Acabamento e finalização** — "Conferimos o resultado, fazemos os ajustes, removemos os fios soltos e aplicamos produtos de finalização quando apropriado."
  6. **Conferência com você** — "Você observa o resultado e pode pedir pequenos ajustes dentro do serviço contratado. Também explicamos como reproduzir a finalização em casa e manter o corte."
- **Frase de fechamento:** "A ideia é você sair satisfeito com a execução e sabendo cuidar do próprio cabelo."

## Design visual

- **Linha do tempo vertical** centralizada no desktop (etapas alternando esquerda/direita) e alinhada à esquerda no mobile.
- Linha central de 1px em `rgba(233,225,212,.25)`; sobre ela, uma **linha champagne de progresso** que cresce conforme o usuário rola a sessão (`data-anim="progress"`).
- Cada etapa tem um **nó** (círculo de 14px com borda champagne) que se preenche de champagne quando a linha de progresso o alcança. Numeral grande ("1" a "6") em `clamp(3rem, 7vw, 5.5rem)`, peso 300, `--champagne` a 60% de opacidade, atrás do título.
- Textos em `--offwhite`; título da etapa em H3.

## Animações
- Cada etapa entra com `data-anim="up"` vindo do lado do seu alinhamento (esquerda ou direita, 40px) e **desaparece suavemente ao sair por cima**, enquanto a linha de progresso permanece preenchida.
- A frase de fechamento sobe e permanece (`up-once`).

**Aceite:** linha de progresso acompanha o scroll sem tremer; nó e numeral da etapa atual ficam em destaque; contraste adequado em verde.

---

# SESSÃO 9 — Espaço (imagens em transição ao rolar)

**Objetivo:** apresentar o ambiente com uma transição de imagens guiada pelo scroll.

**Âncora:** `id="espaco"`. Fundo `--grafite`.

## Conteúdo

- **H2:** "Um espaço pensado para você ficar à vontade"
- **Quatro blocos de texto** (cada um associado a uma imagem):

| # | Título | Texto | Imagem |
|---|---|---|---|
| 1 | Fachada | "Um ambiente moderno, organizado e confortável, sem depender da estética das barbearias antigas." | Fachada noturna (recorte superior de `estabelecimento.png`) |
| 2 | Estações de corte | "Estações bem iluminadas, espelhos amplos, cadeiras profissionais e bancadas organizadas." | `area_01.jpg` |
| 3 | Lavagem e cuidados | "Lavagem profissional e cuidados capilares em um espaço preparado para isso." | `area_02.jpg` |
| 4 | Recepção e espera | "Área de espera confortável, climatização, playlist contemporânea e produtos bem apresentados." | Recepção (recorte inferior direito de `estabelecimento.png`) |

- Linha de materiais ao final: "Grafite e preto, madeira, metal escovado e verde profundo." (texto pequeno, `--texto-suave`).

## Design visual

- **Desktop:** layout de duas colunas. À **direita**, um palco de imagem **fixo (`position: sticky`)** ocupando ~55% da largura e ~80% da altura da tela, com cantos retos e borda 1px `--linha`. À **esquerda**, os quatro blocos de texto rolam normalmente (cada bloco com altura ≈ 70vh para dar tempo à transição).
- Conforme cada bloco entra na faixa central, a imagem do palco faz **crossfade** (1,2s) para a imagem correspondente, com leve zoom (1.04 → 1.0) e a máscara de revelação por **cortina diagonal** (clip-path angular, ecoando o "V") opcional se o desempenho permitir.
- Indicador de progresso ao lado do palco: 4 linhas finas verticais; a atual em `--champagne`.
- **Mobile:** palco sticky no topo (altura 38vh) com os textos rolando abaixo; mesma troca por crossfade.
- Rodapé da sessão: `.btn--secondary` "Conhecer pessoalmente" → `#contato`.

## Animações
- Blocos de texto com `data-anim="up"` (aparecem e desaparecem conforme a rolagem).
- Crossfade guiado por `IntersectionObserver` com a visibilidade do bloco; a imagem anterior só some quando a próxima já está visível (evita flash de fundo).

**Aceite:** nenhuma imagem "pula"; palco sticky não cobre o texto em nenhum breakpoint; sem imagens estouradas ou pixeladas (limitar a largura máxima de `area_02.jpg`).

---

# SESSÃO 10 — Fundadores *(opcional)*

**Objetivo:** humanizar a marca com a história dos sócios (fictícios).

**Âncora:** `id="fundadores"`. Fundo `--offwhite`, texto `--grafite`.

## Conteúdo

- **H2:** "Quem está por trás da Vértice"
- **História:** "André e Beatriz se conheceram trabalhando com cuidados capilares e perceberam que muitos lugares priorizam a execução rápida do corte, sem tempo para entender o cliente. Criaram a Vértice a partir de uma ideia simples: um bom corte não depende só de seguir uma referência, mas de saber interpretá-la."
- **André Ribeiro** — *cofundador e barbeiro técnico.* "Destaca-se pelos cortes com degradê, pela precisão dos acabamentos e pela atenção à simetria. Estuda tendências e adapta estilos populares às características de cada cliente."
- **Beatriz Moreira** — *cofundadora e especialista em estilo.* "Perfil criativo, com preferência por cortes na tesoura, texturização e estilos contemporâneos. Entende o que o cliente quer transmitir com a aparência e traduz isso em um resultado que cabe na rotina."

## Design visual
- Duas colunas com retrato em proporção 4:5. **Não há fotos nos materiais:** usar placeholder elegante (círculo/retângulo `--grafite` com as iniciais "AR" e "BM" em Montserrat 300, borda em degradê champagne) pronto para ser substituído por fotos reais.
- Nome em H3, função em texto pequeno `--champagne-escuro`.
- História em coluna central acima, com a primeira frase em tamanho maior.

## Animações
- Colunas sobem em stagger; borda dos retratos desenha-se (traço) ao entrar.

**Aceite:** placeholders trocáveis por foto sem mexer em CSS; contraste correto sobre off-white.

---

# SESSÃO 11 — Perguntas frequentes *(opcional)*

**Objetivo:** reduzir dúvidas antes do agendamento. Respostas baseadas somente no que o material define (nada de regras novas, como prazos de cancelamento).

**Âncora:** `id="duvidas"`. Fundo `--grafite`.

## Conteúdo

- **H2:** "Dúvidas frequentes"
- **Perguntas e respostas:**
  1. **Preciso levar uma referência?** — "Não é obrigatório, mas ajuda. Uma foto serve de referência e o corte é adaptado à densidade, à textura, ao comprimento e ao resultado que você deseja."
  2. **Vocês atendem cabelos cacheados, crespos, ondulados e compridos?** — "Sim. Respeitamos a textura natural dos fios e orientamos sobre a manutenção do estilo escolhido."
  3. **Vocês fazem barbear com navalha?** — "Sim, o barbear tradicional é feito por profissional qualificado, com os cuidados de higiene adequados."
  4. **Fazem coloração, descoloração e camuflagem de fios brancos?** — "Sim, mediante avaliação prévia e agendamento, com produtos apropriados e profissionais capacitados."
  5. **Posso pedir ajustes depois do corte?** — "Sim. Ao final você confere o resultado e pode pedir pequenos ajustes dentro do serviço contratado."
  6. **Como faço para agendar?** — "Pelo botão de WhatsApp desta página ou pelo nosso Instagram. Você escolhe o serviço e consulta os horários disponíveis."

## Design visual
- Acordeão em lista única, largura máxima de 820px, centralizado. Cada item separado por divisória 1px `--linha`.
- Pergunta em `1.125rem` peso 500; ícone de abrir/fechar formado por **duas linhas que se encontram** (o "+" vira "−" girando 90° em 300ms), em `--champagne`.
- Abrir/fechar: altura animada (grid-template-rows 0fr → 1fr) em 400ms; resposta em `--texto-suave`.
- Apenas um item aberto por vez (opcional).

## Animações
- Lista com `data-anim="up"` em stagger; respostas abertas **não desaparecem** ao rolar (`up-once`).

**Aceite:** acessível (`button` com `aria-expanded`, `aria-controls`); foco visível; funciona sem JavaScript de animação (conteúdo legível).

---

# SESSÃO 12 — Agendamento

**Objetivo:** converter. O formulário **não envia dados para servidor**: ele monta uma mensagem e abre o WhatsApp.

**Âncora:** `id="agendamento"`. Fundo em **degradê diagonal** `--verde` → `--grafite` (de cima à esquerda para baixo à direita), com as linhas do vértice em grande escala (opacidade 12%) ao fundo, desenhadas ao entrar.

## Conteúdo

- **H2** (`data-anim="lines"`): "Reserve o seu horário"
- **Texto:** "Escolha o serviço, diga o dia e o período de preferência e envie pelo WhatsApp. A gente confirma os horários disponíveis por lá."
- **Campos do formulário:**

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Seu nome | texto | Sim | |
| Serviço ou combo | select | Sim | Opções: Vértice Express, Corte, Barba, Completo, Prime, e serviços avulsos (Sobrancelha e acabamentos, Cuidados capilares, Coloração ou descoloração, Outro) |
| Corte ou estilo | select ou texto livre | Não | Opções: cortes da SESSÃO 5 + "Ainda não sei, quero conversar" |
| Dia de preferência | data | Não | `min` = hoje |
| Período | seleção (chips) | Não | Manhã · Tarde · Noite (sem separador de pontos no código) |
| Observações | área de texto | Não | "Tem alguma referência ou preferência? Você pode enviar a foto direto no WhatsApp." |

- **Botão principal** (`.btn--primary`, com animação de repouso, largura total no mobile): "Enviar pelo WhatsApp"
- **Ao lado/abaixo:** `.btn--link` "Prefiro falar direto no WhatsApp" (mensagem genérica) e `.btn--link` "Chamar no Instagram" (`INSTAGRAM_URL`).
- **Texto pequeno:** "Precisa remarcar ou cancelar? Fale com a gente pelo mesmo WhatsApp."
- **Aviso de privacidade (texto pequeno):** "Os dados deste formulário não ficam guardados no site. Eles só vão na mensagem que você enviar pelo WhatsApp."

## Mensagem gerada (exemplo)

```
Olá, Vértice! Meu nome é {nome} e quero agendar.
Serviço: {serviço}
Corte ou estilo: {corte}
Dia de preferência: {data}
Período: {período}
Observações: {observações}
```
Omitir as linhas dos campos vazios. Formatar a data como `dd/mm/aaaa`.

## Design visual
- Layout em duas colunas no desktop: à esquerda título e texto; à direita o formulário em um painel de `--grafite-elevado` com borda 1px `--linha` (sem sombra).
- Campos: fundo `--grafite`, borda 1px `--linha`, raio 2px, altura 52px, texto `--offwhite`, rótulo flutuante acima do campo em `.875rem`. `color-scheme: dark` para o seletor de data.
- Foco do campo: borda `--champagne` + linha de 2px em degradê champagne na base que se desenha em 300ms.
- Chips de período: borda 1px; selecionado = fundo em degradê champagne e texto `--grafite`.
- Erros: mensagem textual abaixo do campo dizendo o que corrigir (ex.: "Informe seu nome para continuar."), em `--champagne-claro`, sem depender só de cor.

## Comportamento
1. Clique em "Quero este corte" (SESSÃO 5) ou "Agendar" (SESSÃO 7) rola até aqui e pré-seleciona o campo correspondente, com pulso de brilho de 800ms.
2. Ao enviar com campos válidos: abrir `buildWhatsAppLink(mensagem)` em nova aba (`target="_blank"`, `rel="noopener"`) e exibir abaixo do botão: "Abrindo o WhatsApp… Se não abriu, toque aqui." (link com o mesmo endereço).
3. Validação no cliente, sem recarregar a página.

## Animações
- Título por linhas; painel do formulário sobe (`up-once`); linhas do vértice desenhadas ao fundo.
- O botão principal mantém a animação de degradê em repouso; no clique, breve compressão (scale .98).

**Aceite:** mensagem chega ao WhatsApp corretamente codificada (acentos e quebras de linha); campos vazios não aparecem; pré-seleção vinda de outras sessões funciona; formulário utilizável só com teclado.

---

# SESSÃO 13 — Localização, contato, rodapé e acabamento final

**Objetivo:** informar onde a Vértice está, fechar a página e entregar o polimento (botão flutuante, SEO, acessibilidade, desempenho).

## 13.1 Localização e contato

**Âncora:** `id="contato"`. Fundo `--grafite`.

- **H2:** "Venha conhecer a Vértice"
- **Cidade:** "São Bento do Sul, SC"
- **Endereço:** valor de `ENDERECO` (se vazio, exibir apenas a cidade).
- **Horários:** valor de `HORARIOS` (se vazio: "Consulte os horários pelo WhatsApp").
- **Botões:** `.btn--primary` "Agendar pelo WhatsApp", `.btn--secondary` "Ver no Instagram" e, se houver `MAPS_URL`, `.btn--link` "Abrir no mapa".
- **Mapa:** se `MAPS_URL` existir, incorporar mapa com filtro escuro (`filter: grayscale(1) invert(.9) contrast(.9)`) ou imagem estática; se não existir, usar a **foto da fachada** como imagem lateral.
- **Layout:** duas colunas (informações à esquerda, fachada/mapa à direita); mobile em uma coluna com a fachada primeiro.
- Animações: `data-anim="up-once"` (não desaparecem).

## 13.2 Rodapé

- Fundo `--grafite` com **linha superior de 1px `--champagne`** (a linha se desenha da esquerda para a direita ao entrar).
- Logo lockup (símbolo + "VÉRTICE" + "BARBEARIA") centralizado ou à esquerda, com o slogan "Precisão que define seu estilo." em texto pequeno com `letter-spacing: .2em`.
- Colunas: navegação (os mesmos links do cabeçalho), contato (WhatsApp, Instagram, cidade) e uma linha final: "© 2026 Vértice Barbearia. Todos os direitos reservados."
- *(Opcional)* nota discreta: "Projeto demonstrativo." caso a barbearia seja apresentada como fictícia.
- Botão "Voltar ao topo" (seta com duas linhas formando um "V" invertido).

## 13.3 Botão flutuante de WhatsApp

- Posição: canto inferior direito (20px das bordas, respeitando `env(safe-area-inset-bottom)`).
- Aparência: pílula com ícone de WhatsApp + texto "Agendar" no desktop; apenas ícone circular (56px) no mobile. Fundo `.btn--verde` (degradê verde → verde médio com borda champagne) com **animação de degradê em repouso**.
- Comportamento: surge (fade + subida) depois que o usuário passa ~80% da altura do hero; **oculta** enquanto `#agendamento` estiver visível na tela; ação: `buildWhatsAppLink` com mensagem genérica. `aria-label="Agendar pelo WhatsApp"`.

## 13.4 SEO

- `<title>`: "Vértice Barbearia | Barbearia em São Bento do Sul, SC"
- `<meta name="description">`: "Barbearia contemporânea em São Bento do Sul. Cortes, barba e cuidados com consulta antes de cada corte. Agende pelo WhatsApp."
- Open Graph e Twitter Card com a imagem da fachada (1200×630, recortada).
- Dados estruturados JSON-LD (`BarberShop` ou `HairSalon`) com nome, slogan, cidade/região e telefone/endereço quando definidos.
- Um único `<h1>` (o do hero), hierarquia de títulos sequencial, landmarks semânticos (`header`, `main`, `section` com `aria-labelledby`, `footer`).
- Favicon: símbolo "V" em champagne sobre grafite.

## 13.5 Acessibilidade e desempenho

- Contraste mínimo AA em todos os textos; foco visível em todos os elementos interativos; navegação completa por teclado; `lang="pt-BR"`.
- Textos alternativos descritivos nas imagens (ex.: "Cadeiras de barbeiro em couro diante de espelhos com iluminação quente"); imagens decorativas com `alt=""`.
- Link "Pular para o conteúdo" no início da página.
- Meta de desempenho: LCP < 2,5s em 4G; CLS < 0,1; imagens com `width`/`height` definidos; fontes com `preconnect`.
- Testar em: Chrome, Safari (iOS), Firefox, Edge; larguras de 360px, 768px, 1024px e 1440px.

**Aceite final:** a página inteira rola sem saltos; todas as âncoras funcionam; todos os botões de WhatsApp abrem a conversa; nenhuma animação bloqueia a leitura; versão com `prefers-reduced-motion` totalmente legível.

---

# Pendências e dados a definir (antes de publicar)

1. Número do WhatsApp (o do cartão do material é exemplo) e confirmação do @ do Instagram.
2. Endereço completo (a fachada indica o nº 285; falta a rua) e link do mapa.
3. Horários de funcionamento.
4. Duração e preço de cada combo; escopo exato do Vértice Express.
5. Política de cancelamento e remarcação (hoje o site só orienta a falar pelo WhatsApp).
6. Logo em SVG ou PNG com transparência (o lockup atual tem fundo preto).
7. Separar a colagem `estabelecimento.png` em 3 imagens; recortar `area_03.jpg` para remover o logotipo "L'atelier 35" ou não usá-la.
8. Fotos reais de cortes (portfólio, sempre com autorização dos clientes) e fotos da equipe, quando existirem.

# Checklist geral de entrega

- [ ] Sessão 0: tokens, animações, config e utilitário do WhatsApp
- [ ] Sessão 1: cabeçalho e menu mobile
- [ ] Sessão 2: hero com crossfade e abertura orquestrada
- [ ] Sessão 3: sobre
- [ ] Sessão 4: diferenciais
- [ ] Sessão 5: cortes com abas e pré-seleção
- [ ] Sessão 6: serviços
- [ ] Sessão 7: combos
- [ ] Sessão 8: como funciona com linha do tempo
- [ ] Sessão 9: espaço com imagens em transição
- [ ] Sessão 10: fundadores (opcional)
- [ ] Sessão 11: dúvidas frequentes (opcional)
- [ ] Sessão 12: agendamento via WhatsApp
- [ ] Sessão 13: contato, rodapé, botão flutuante, SEO e acessibilidade
