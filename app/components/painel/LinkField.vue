<script setup lang="ts">
import { ancorasDaPagina } from '~/data/painel'

const props = defineProps<{ label: string }>()
const modelo = defineModel<string>({ default: '' })

const PERSONALIZADO = '__personalizado__'

const ehAncoraConhecida = (valor: string) => ancorasDaPagina.some((ancora) => ancora.valor === valor)

const opcaoSelecionada = ref(ehAncoraConhecida(modelo.value) ? modelo.value : PERSONALIZADO)
const valorPersonalizado = ref(opcaoSelecionada.value === PERSONALIZADO ? modelo.value : '')

watch(opcaoSelecionada, (opcao) => {
  modelo.value = opcao === PERSONALIZADO ? valorPersonalizado.value : opcao
})

watch(valorPersonalizado, (valor) => {
  if (opcaoSelecionada.value === PERSONALIZADO) modelo.value = valor
})

const opcoesSelect = [...ancorasDaPagina.map((a) => ({ rotulo: a.rotulo, valor: a.valor })), { rotulo: 'Link personalizado', valor: PERSONALIZADO }]
</script>

<template>
  <div class="link-campo">
    <BaseSelect v-model="opcaoSelecionada" :label="props.label" :opcoes="opcoesSelect" />
    <BaseInput
      v-if="opcaoSelecionada === PERSONALIZADO"
      v-model="valorPersonalizado"
      tipo="url"
      placeholder="https://…"
    />
  </div>
</template>

<style scoped>
.link-campo { display: grid; gap: 10px; }
</style>
