<script setup lang="ts">
/**
 * Marca da campanha.
 * TODO: hoje é um recorte por `background-position` da arte original (JPEG).
 * Quando existir um SVG/PNG transparente, troque por <img> e apague os recortes.
 *
 * No modo felina a marca troca para a arte branca da onça, sobre uma placa
 * escura própria — a única parte do header/rodapé que muda de imagem.
 */
import logo from '~/assets/images/logo-mavi.jpeg'
import logoFelinaSimbolo from '~/assets/images/logo-branca.png'
import logoFelinaCompleta from '~/assets/images/logo-felina-v.jpeg'

const props = withDefaults(
  defineProps<{
    /** simbolo = só a onça (header) · completa = nome + partido (rodapé) */
    variante?: 'simbolo' | 'completa'
    rotulo?: string
  }>(),
  { variante: 'simbolo', rotulo: 'Mavi Cunha' }
)

const { felina } = useFelina()

const imagem = computed(() =>
  felina.value
    ? (props.variante === 'simbolo' ? logoFelinaSimbolo : logoFelinaCompleta)
    : logo
)
</script>

<template>
  <span
    class="marca"
    :class="[`marca--${variante}`, { 'marca--felina': felina }]"
    :style="{ backgroundImage: `url(${imagem})` }"
    role="img"
    :aria-label="rotulo"
  />
</template>

<style scoped>
.marca {
  display: block;
  flex: none;
  background-repeat: no-repeat;
  transition: width .5s cubic-bezier(.33, .1, .25, 1), height .5s cubic-bezier(.33, .1, .25, 1), background-color .5s ease;
}

.marca--simbolo {
  width: 72px;
  height: 34px;
  border-radius: 8px;
  background-size: 115.2px 144px;
  background-position: -21.3px -42.1px;
}
.marca--simbolo.marca--felina {
  width: 126px;
  height: 46px;
  padding: 7px 12px;
  background-color: #2B0714;
  background-size: contain;
  background-position: center;
}

.marca--completa {
  width: 214px;
  height: 152px;
  border-radius: var(--raio-p);
  background-size: 331px 414px;
  background-position: -58px -114px;
}
.marca--completa.marca--felina {
  background-color: #fff;
  background-size: contain;
  background-position: center;
}
</style>
