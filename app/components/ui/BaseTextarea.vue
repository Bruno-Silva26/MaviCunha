<script setup lang="ts">
/** Área de texto, usada nos formulários do painel. */
withDefaults(
  defineProps<{
    label?: string
    obrigatorio?: boolean
    placeholder?: string
    linhas?: number
  }>(),
  { obrigatorio: false, linhas: 4 }
)

const modelo = defineModel<string>({ default: '' })

defineOptions({ inheritAttrs: false })
</script>

<template>
  <label class="campo">
    <span v-if="label" class="campo__rotulo">{{ label }}</span>
    <textarea
      v-model="modelo"
      :required="obrigatorio"
      :placeholder="placeholder"
      :rows="linhas"
      class="campo__input"
      v-bind="$attrs"
    />
  </label>
</template>
