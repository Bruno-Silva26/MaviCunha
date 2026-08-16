<script setup lang="ts">
/** Select simples, usado nos formulários do painel. */
defineProps<{
  label?: string
  opcoes: { rotulo: string; valor: string }[]
}>()

const modelo = defineModel<string>({ default: '' })

defineOptions({ inheritAttrs: false })
</script>

<template>
  <label class="campo">
    <span v-if="label" class="campo__rotulo">{{ label }}</span>
    <select v-model="modelo" class="campo__input" v-bind="$attrs">
      <option v-for="opcao in opcoes" :key="opcao.valor" :value="opcao.valor">{{ opcao.rotulo }}</option>
    </select>
  </label>
</template>
