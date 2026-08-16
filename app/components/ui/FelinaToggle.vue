<script setup lang="ts">
const CHAVE_DICA = 'mavi:felina-dica-vista'

const { felina, alternar } = useFelina()
const mostrarDica = ref(false)

let timerAutoOcultar: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (felina.value) return
  try {
    if (localStorage.getItem(CHAVE_DICA) === '1') return
  } catch { /* sem storage */ }

  setTimeout(() => {
    if (felina.value) return
    mostrarDica.value = true
    timerAutoOcultar = setTimeout(esconderDica, 7000)
  }, 900)
})

function esconderDica() {
  mostrarDica.value = false
  clearTimeout(timerAutoOcultar)
  try { localStorage.setItem(CHAVE_DICA, '1') } catch { /* sem storage */ }
}

function aoClicar() {
  esconderDica()
  alternar()
}
</script>

<template>
  <span class="felina-envoltorio">
    <Transition name="dica">
      <p v-if="mostrarDica" class="felina-dica" role="status">
        Ative o seu lado felino
        <button type="button" class="felina-dica__fechar" aria-label="Dispensar dica" @click="esconderDica">×</button>
      </p>
    </Transition>

    <button type="button" class="felina" :aria-pressed="felina" @click="aoClicar">
      <span class="felina__trilho">
        <span class="felina__pata" aria-hidden="true">
          <span class="felina__coxim" />
          <span class="felina__dedo felina__dedo--1" />
          <span class="felina__dedo felina__dedo--2" />
          <span class="felina__dedo felina__dedo--3" />
          <span class="felina__dedo felina__dedo--4" />
        </span>
        <span class="felina__botao" />
      </span>
      <span class="sr-only">Modo felina</span>
    </button>
  </span>
</template>

<style scoped>
.felina-envoltorio {
  position: relative;
  display: inline-flex;
  flex: none;
}

.felina {
  display: inline-flex;
  align-items: center;
  flex: none;
}

/* ---- balão de dica ---- */
.felina-dica {
  position: absolute;
  top: calc(100% + 14px);
  right: -6px;
  z-index: 70;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 10px 12px 10px 16px;
  border-radius: var(--raio-p);
  background: var(--destaque-bg);
  color: var(--tinta-sobre-destaque);
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 14px 30px -8px rgba(0, 0, 0, .5);
}
.felina-dica::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 22px;
  width: 12px;
  height: 12px;
  border-radius: 3px 0 0 0;
  background: var(--destaque-bg);
  transform: rotate(45deg);
}
.felina-dica__fechar {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 15px;
  line-height: 1;
  color: inherit;
  opacity: .7;
}
.felina-dica__fechar:hover { opacity: 1; background: rgba(0, 0, 0, .12); }

.dica-enter-active { transition: opacity .35s var(--mola), transform .35s var(--mola); }
.dica-leave-active { transition: opacity .2s ease, transform .2s ease; }
.dica-enter-from,
.dica-leave-to { opacity: 0; transform: translateY(-6px) scale(.96); }

.felina__trilho {
  position: relative;
  display: block;
  width: 66px;
  height: 34px;
  flex: none;
  border-radius: var(--raio-pill);
  background: var(--trilho-bg, #141414);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, .28);
  transition: background-color .55s cubic-bezier(.4, 0, .2, 1);
}
.site[data-felina='1'] .felina__trilho { background: var(--destaque-bg); }

.felina__pata {
  position: absolute;
  left: 9px;
  top: 9px;
  display: block;
  width: 17px;
  height: 16px;
  transition: opacity .45s ease, transform .55s cubic-bezier(.34, 1.5, .42, 1);
}
.felina__coxim {
  position: absolute;
  left: 3.5px;
  bottom: 0;
  width: 10px;
  height: 8px;
  border-radius: 56% 56% 46% 46% / 70% 70% 40% 40%;
  background: rgba(244, 241, 234, .45);
}
.site[data-felina='1'] .felina__coxim { background: #fff; }
.felina__dedo { position: absolute; width: 4.4px; border-radius: 50%; background: rgba(244, 241, 234, .45); }
.site[data-felina='1'] .felina__dedo { background: #fff; }
.felina__dedo--1 { left: 0; top: 4px; height: 5.4px; }
.felina__dedo--2 { left: 4.6px; top: .6px; height: 5.6px; }
.felina__dedo--3 { left: 9.3px; top: .6px; height: 5.6px; }
.felina__dedo--4 { left: 13.4px; top: 4px; height: 5.4px; }

.felina__botao {
  position: absolute;
  top: 4px;
  left: 4px;
  display: block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .35);
  transform: translateX(0);
  transition: transform .55s cubic-bezier(.34, 1.5, .42, 1), box-shadow .55s ease;
}
.site[data-felina='1'] .felina__botao { transform: translateX(32px); }
</style>
