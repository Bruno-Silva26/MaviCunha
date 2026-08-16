<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'

/**
 * Dropdown customizado (não um <select> nativo): no Android/iOS o picker nativo
 * é desenhado pelo sistema e ignora todo o CSS da página, ficando fora do visual do site.
 */
const props = defineProps<{
  label?: string
  opcoes: { rotulo: string; valor: string }[]
}>()

const modelo = defineModel<string>({ default: '' })

const aberto = ref(false)
const raiz = ref<HTMLElement | null>(null)

const rotuloSelecionado = computed(() => props.opcoes.find((o) => o.valor === modelo.value)?.rotulo ?? '')

function selecionar(valor: string) {
  modelo.value = valor
  aberto.value = false
}

onClickOutside(raiz, () => { aberto.value = false })
onKeyStroke('Escape', () => { aberto.value = false })
</script>

<template>
  <div ref="raiz" class="campo campo-select">
    <span v-if="label" class="campo__rotulo">{{ label }}</span>

    <button
      type="button"
      class="campo__input campo-select__gatilho"
      :aria-expanded="aberto"
      @click="aberto = !aberto"
    >
      <span>{{ rotuloSelecionado }}</span>
      <span class="campo-select__seta" :class="{ 'campo-select__seta--aberta': aberto }" aria-hidden="true">▾</span>
    </button>

    <ul v-if="aberto" class="campo-select__lista" role="listbox">
      <li
        v-for="opcao in opcoes"
        :key="opcao.valor"
        role="option"
        :aria-selected="opcao.valor === modelo"
        class="campo-select__opcao"
        :class="{ 'campo-select__opcao--ativa': opcao.valor === modelo }"
        @click="selecionar(opcao.valor)"
      >
        {{ opcao.rotulo }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.campo-select { position: relative; }

.campo-select__gatilho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.campo-select__seta { font-size: 11px; color: var(--texto-fraco); transition: transform var(--transicao); }
.campo-select__seta--aberta { transform: rotate(180deg); }

.campo-select__lista {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  padding: 6px;
  border-radius: var(--raio-p);
  border: 1px solid var(--linha);
  background: var(--preto);
  box-shadow: 0 18px 40px rgba(0, 0, 0, .5);
}

.campo-select__opcao {
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--texto);
  cursor: pointer;
}
.campo-select__opcao:hover { background: rgba(255, 255, 255, .06); }
.campo-select__opcao--ativa { color: var(--preto); background: var(--amarelo); }
</style>
