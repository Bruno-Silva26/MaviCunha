<script setup lang="ts">
/**
 * O bote da onça: efeito de garras que cruza a tela quando o modo felina liga.
 * Renderizado uma vez em layouts/default.vue e teleportado para o body, para
 * cobrir a tela inteira independente de onde o interruptor esteja no DOM.
 */
const { bote } = useFelina()

const garras = [
  { r: -26, top: 8, atraso: 0 },
  { r: -22, top: 30, atraso: .06 },
  { r: -30, top: 52, atraso: .12 },
  { r: -24, top: 74, atraso: .19 }
]
</script>

<template>
  <Teleport to="body">
    <div v-if="bote" class="bote" aria-hidden="true">
      <div class="bote__clarao" />
      <div
        v-for="(g, i) in garras"
        :key="i"
        class="bote__garra"
        :style="{
          top: `${g.top}%`,
          height: `${14 - i}px`,
          '--r': `${g.r}deg`,
          animationDelay: `${g.atraso}s`
        }"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.bote {
  position: fixed;
  inset: 0;
  z-index: 999;
  overflow: hidden;
  pointer-events: none;
}
.bote__clarao {
  position: absolute;
  inset: 0;
  background: radial-gradient(65% 65% at 50% 45%, rgba(224, 13, 109, .32), rgba(246, 169, 17, .14) 55%, transparent 78%);
  animation: clarao .6s ease-out forwards;
}

.bote__garra {
  position: absolute;
  left: -15%;
  width: 130%;
  transform-origin: left center;
  border-radius: 50%;
  clip-path: polygon(0 50%, 10% 4%, 52% 0, 90% 8%, 100% 50%, 90% 92%, 52% 100%, 10% 96%);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), #fff 14%, #E00D6D 46%, #fff 74%, rgba(255, 255, 255, 0));
  box-shadow: 0 0 26px rgba(224, 13, 109, .85), 0 0 60px rgba(224, 13, 109, .45);
  animation: garra .95s cubic-bezier(.2, .9, .15, 1) forwards;
}
</style>
