<script setup lang="ts">
import { onClickOutside, onKeyStroke, useScrollLock } from '@vueuse/core'

const { candidata, menu } = useSiteContent()
const { progresso, rolou } = useScrollProgress()

const cabecalho = ref<HTMLElement | null>(null)
const menuAberto = ref(false)

// trava o scroll do body enquanto o menu mobile estiver aberto
const scrollTravado = useScrollLock(import.meta.client ? document.body : null)
watch(menuAberto, (aberto) => { scrollTravado.value = aberto })

const fechar = () => { menuAberto.value = false }

onClickOutside(cabecalho, fechar)
onKeyStroke('Escape', fechar)
</script>

<template>
  <header ref="cabecalho" class="header" :class="{ 'header--rolado': rolou, 'header--aberto': menuAberto }">
    <!-- progresso de leitura -->
    <span
      class="header__progresso"
      :style="{ transform: `scaleX(${progresso})` }"
      aria-hidden="true"
    />

    <div class="header__barra">
      <a class="logo" href="#topo" @click="fechar">
        <LogoMark variante="simbolo" :rotulo="candidata.nome" />
        <span class="logo__nome">
          {{ candidata.nome }}
          <span class="logo__numero">{{ candidata.numero }}</span>
        </span>
      </a>

      <nav class="nav" aria-label="Navegação principal">
        <a v-for="item in menu" :key="item.href" class="nav__link" :href="item.href">
          {{ item.rotulo }}
        </a>
      </nav>

      <div class="acoes">
        <BaseButton href="#apoie" variante="linha" tamanho="sm" caixa-alta>Doar</BaseButton>
        <BaseButton href="#grupo" variante="solido" tamanho="sm" caixa-alta>Entrar no grupo</BaseButton>
      </div>

      <div class="header__controles">
        <FelinaToggle />

        <button
          class="hamburguer"
          :aria-expanded="menuAberto"
          aria-controls="menu-mobile"
          :aria-label="menuAberto ? 'Fechar menu' : 'Abrir menu'"
          @click="menuAberto = !menuAberto"
        >
          <span class="hamburguer__linha" />
          <span class="hamburguer__linha" />
        </button>
      </div>
    </div>

    <Transition name="gaveta">
      <nav v-show="menuAberto" id="menu-mobile" class="gaveta" aria-label="Navegação mobile">
        <a
          v-for="item in menu"
          :key="item.href"
          class="gaveta__link"
          :href="item.href"
          @click="fechar"
        >
          {{ item.rotulo }}
        </a>
        <div class="gaveta__acoes" @click="fechar">
          <BaseButton href="#apoie" variante="linha" tamanho="md">Doar</BaseButton>
          <BaseButton href="#grupo" variante="solido" tamanho="md">Entrar no grupo</BaseButton>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: color-mix(in srgb, var(--superficie) 78%, transparent);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--linha);
  transition: background var(--transicao), border-color var(--transicao);
}
.header--rolado { background: color-mix(in srgb, var(--superficie) 94%, transparent); }
.header--aberto { background: color-mix(in srgb, var(--superficie) 98%, transparent); }

.header__progresso {
  position: absolute;
  inset: auto 0 -1px;
  height: 2px;
  background: var(--destaque-bg);
  transform-origin: 0 50%;
  transform: scaleX(0);
}

.header__barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: var(--max);
  margin-inline: auto;
  padding: 12px 28px;
  min-height: 82px;
}

/* ---- marca ---- */
.logo { display: flex; align-items: center; gap: 11px; color: var(--texto); }
.logo__nome {
  display: flex;
  align-items: baseline;
  gap: 7px;
  font-family: var(--fonte-titulo);
  font-size: 17px;
  letter-spacing: -.02em;
  white-space: nowrap;
}
.logo__numero { font-size: 12px; color: var(--destaque); }

/* ---- navegação ---- */
.nav {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.nav__link {
  padding: 10px 11px;
  border-radius: var(--raio-pill);
  color: var(--texto-suave);
  white-space: nowrap;
  transition: background var(--transicao), color var(--transicao);
}
.nav__link:hover { background: rgba(255, 255, 255, .07); color: var(--branco); }

.acoes { display: flex; align-items: center; gap: 10px; }

.header__controles { display: flex; align-items: center; gap: 14px; }

/* ---- botão hamburguer ---- */
.hamburguer {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 46px;
  height: 46px;
  padding: 0 12px;
  border-radius: 14px;
  border: 1px solid var(--linha);
}
.hamburguer__linha {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--texto);
  transition: transform .25s var(--mola), opacity .25s var(--mola);
}
.header--aberto .hamburguer__linha:first-child { transform: translateY(4px) rotate(45deg); }
.header--aberto .hamburguer__linha:last-child { transform: translateY(-4px) rotate(-45deg); }

/* ---- gaveta mobile ---- */
.gaveta {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px var(--pad) 26px;
  border-top: 1px solid var(--linha);
}
.gaveta__link {
  padding: 15px 4px;
  border-bottom: 1px solid var(--linha);
  color: var(--texto);
  font-family: var(--fonte-titulo);
  font-size: 20px;
  letter-spacing: -.02em;
}
.gaveta__link:hover { color: var(--destaque); }
.gaveta__acoes { display: grid; gap: 10px; margin-top: 22px; }

.gaveta-enter-active,
.gaveta-leave-active { transition: opacity .25s ease, transform .25s var(--mola); }
.gaveta-enter-from,
.gaveta-leave-to { opacity: 0; transform: translateY(-8px); }

/* limiar mais largo que antes: o interruptor do modo felina fica sempre visível
   no header (mesmo com o menu já recolhido no hambúrguer), então nav + ações
   precisam sumir mais cedo para sobrar espaço e não estourar a largura. */
@media (max-width: 1320px) {
  .nav, .acoes { display: none; }
  .hamburguer { display: flex; }
  .gaveta { display: flex; }
  .header__barra { padding-inline: var(--pad); min-height: 72px; }
}

/* logo + interruptor + hambúrguer não cabem lado a lado em telas bem estreitas:
   o nome sai, o símbolo sozinho já identifica a marca. */
@media (max-width: 420px) {
  .logo__nome { display: none; }
}
</style>
