<script setup lang="ts">
/**
 * Marca da campanha.
 * TODO: hoje é um recorte por `background-position` da arte original (JPEG).
 * Quando existir um SVG/PNG transparente, troque por <img> e apague os recortes.
 */
import logo from '~/assets/images/logo-mavi.jpeg'

withDefaults(
  defineProps<{
    /** simbolo = só a onça (header) · completa = nome + partido (rodapé) */
    variante?: 'simbolo' | 'completa'
    rotulo?: string
  }>(),
  { variante: 'simbolo', rotulo: 'Mavi Cunha' }
)
</script>

<template>
  <span
    class="marca"
    :class="`marca--${variante}`"
    :style="{ backgroundImage: `url(${logo})` }"
    role="img"
    :aria-label="rotulo"
  />
</template>

<style scoped>
.marca {
  display: block;
  flex: none;
  background-repeat: no-repeat;
}

.marca--simbolo {
  width: 72px;
  height: 34px;
  border-radius: 8px;
  background-size: 115.2px 144px;
  background-position: -21.3px -42.1px;
}

.marca--completa {
  width: 214px;
  height: 152px;
  border-radius: var(--raio-p);
  background-size: 331px 414px;
  background-position: -58px -114px;
}
</style>
