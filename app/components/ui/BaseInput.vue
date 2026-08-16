<script setup lang="ts">
/** Campo de texto único, usado nos formulários do painel. */
type Tipo = 'text' | 'email' | 'password' | 'url' | 'datetime-local'

withDefaults(
  defineProps<{
    label?: string
    tipo?: Tipo
    obrigatorio?: boolean
    placeholder?: string
  }>(),
  { tipo: 'text', obrigatorio: false }
)

const modelo = defineModel<string>({ default: '' })

defineOptions({ inheritAttrs: false })
</script>

<template>
  <label class="campo">
    <span v-if="label" class="campo__rotulo">{{ label }}</span>
    <input
      v-model="modelo"
      :type="tipo"
      :required="obrigatorio"
      :placeholder="placeholder"
      class="campo__input"
      v-bind="$attrs"
    >
  </label>
</template>
