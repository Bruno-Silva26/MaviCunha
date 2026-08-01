# Mavi Cunha 14 — Landing page (Nuxt 4 + Vue 3 + VueUse)

Landing page de pré-campanha para Deputada Federal por Mato Grosso do Sul.
Porte do protótipo (`../prototipo`, Vue + Vite puro) para **Nuxt**, mantendo o mesmo design
e ganhando renderização no servidor (SEO), componentização e conteúdo tipado.

## Rodar

```bash
npm install
```

```bash
npm run dev
```

Sobe em http://localhost:3000.

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento (Vite, com HMR) |
| `npm run build` | build de produção com SSR (`.output/`) |
| `npm run generate` | site estático pré-renderizado (`.output/public/`) |
| `npm run preview` | roda o build localmente |
| `npm run typecheck` | checagem de tipos |

**Publicar:** `npm run generate` e suba `.output/public` em Vercel, Netlify, Cloudflare Pages
ou GitHub Pages. Em Vercel/Netlify o `npm run build` (SSR) também funciona sem configuração.

## Estrutura

```
nuxt.config.ts                  # módulos, CSS global, <head>, prerender
app/
  app.vue                       # casca (layout + página)
  error.vue                     # 404 / erro, no mesmo visual
  layouts/default.vue           # header + main + footer + "pular para o conteúdo"
  pages/index.vue               # ordem das seções + SEO (useSeoMeta, JSON-LD)
  data/site.ts                  # ⭐ TEXTOS E LINKS — edite aqui
  types/content.ts              # contratos do conteúdo
  composables/
    useSiteContent.ts           # acesso ao conteúdo (auto-importado)
    usePointerGlow.ts           # brilho amarelo que segue o cursor
    useScrollProgress.ts        # barra de progresso + estado do header
  plugins/reveal.ts             # diretiva v-reveal (revelar ao rolar)
  assets/
    css/tokens.css              # variáveis de cor, raio, espaçamento, fonte
    css/base.css                # reset + keyframes
    css/utilities.css           # .container, .titulo, .texto, .grade-2, reveal
    images/                     # imagens da campanha
  components/
    ui/                         # BaseButton, SectionHeading, LogoMark
    layout/                     # AppHeader, AppFooter
    sections/                   # HeroSection, MarqueeBar, AboutSection,
                                # ProposalsSection, MissionSection, DonateSection,
                                # WhatsappSection, SocialSection
public/robots.txt
```

Componentes são auto-importados **sem prefixo de pasta** (`<HeroSection />`, não
`<SectionsHeroSection />`) — configurado em `nuxt.config.ts`.

## Onde mexer

**Textos, links, propostas, redes:** tudo em `app/data/site.ts`. Nenhum componente tem texto
editorial solto; se precisar de um texto novo, adicione ao `site.ts` e tipe em `types/content.ts`.

**Cores, raios e espaçamentos:** `app/assets/css/tokens.css`.

| Variável | Valor | Uso |
|---|---|---|
| `--amarelo` | `#FFD400` | cor da campanha / Partido Missão |
| `--preto` | `#0A0A0A` | fundo |
| `--creme` | `#F4F1EA` | fundo da seção de doação |
| `--secao` | `120px` | respiro vertical entre seções |

**Tipografia:** Archivo + Archivo Black (Google Fonts, declarado no `nuxt.config.ts`).

**CTAs:** sempre via `<BaseButton>` (`variante`: solido/linha/contorno/inverso ·
`tamanho`: sm/md/lg/xl). Não escreva CSS de botão dentro das seções.

## O que mudou em relação ao protótipo

- **SSR/SSG**: o HTML sai pronto do servidor — o texto é indexável e o compartilhamento no
  WhatsApp mostra o cartão certo.
- **Menu mobile** de verdade (gaveta com trava de scroll, fechar no Esc e no clique fora),
  em vez do menu quebrando linha.
- **Barra de progresso** de leitura no topo e header que ganha contraste ao rolar.
- **Revelação ao rolar** (`v-reveal`) nas seções, respeitando `prefers-reduced-motion`.
- **Conteúdo tipado** em `data/site.ts` + `types/content.ts`.
- **Acessibilidade**: link "pular para o conteúdo", foco visível, `aria-*` no menu.
- Marquee pausa no hover; imagens abaixo da dobra com `loading="lazy"`.

## Pendências antes de publicar

1. **Links reais** em `app/data/site.ts`: vaquinha, grupo de WhatsApp, Instagram, TikTok,
   YouTube, X, Facebook e e-mail (hoje são `#`).
2. **Textos reais**: bio, as 6 propostas e a descrição da vaquinha ainda são provisórios.
3. **Logo**: `LogoMark.vue` ainda recorta a arte original por `background-position`.
   Com um SVG/PNG transparente, troque por `<img>` e apague os recortes.
4. **Imagem OG**: colocar `public/og-image.jpg` (1200×630) e conferir a URL do site em
   `nuxt.config.ts` (`runtimeConfig.public.siteUrl`).
5. **Peso das imagens**: `foto-hero.png` (6,8 MB) e `foto-livro.jpeg` (3,1 MB) precisam virar
   `.webp` redimensionados — é o maior ganho de performance disponível hoje.
6. **Conformidade eleitoral**: número da candidata, CNPJ de campanha e aviso legal no rodapé.

## Detalhes de implementação

- **Brilho no cursor** (`usePointerGlow`): a posição é escrita direto no `style` do elemento
  dentro de um `requestAnimationFrame`, de propósito fora da reatividade do Vue — não
  re-renderiza a cada pixel. Ignora `pointerType === 'touch'`.
- **Grades responsivas** usam `repeat(auto-fit, minmax(min(Xpx, 100%), 1fr))`: as colunas se
  reorganizam sozinhas, quase sem media query de layout.
- **`v-reveal`** só aplica o estado inicial (invisível) no client e não faz nada quando o
  usuário pede menos movimento — sem JS, a página aparece inteira.
