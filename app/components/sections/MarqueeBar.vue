<script setup lang="ts">
const { marquee } = useSiteContent()
</script>

<template>
  <div class="faixa" aria-hidden="true">
    <div class="faixa__trilho">
      <!-- duas cópias idênticas: a animação corre até -50% e reinicia sem emenda -->
      <span v-for="copia in 2" :key="copia" class="faixa__grupo">
        <template v-for="palavra in marquee" :key="palavra">
          <span>{{ palavra }}</span>
          <span class="faixa__barra">/</span>
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.faixa {
  position: relative;
  padding-block: 10px;
  background: rgba(255, 255, 255, .03);
  border-block: 1px solid rgba(255, 212, 0, .14);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.faixa__trilho {
  display: flex;
  width: max-content;
  animation: marquee 44s linear infinite;
}

.faixa:hover .faixa__trilho { animation-play-state: paused; }

.faixa__grupo {
  display: flex;
  align-items: center;
  gap: 34px;
  padding-right: 34px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .32em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--texto-fraco);
}
.faixa__barra { color: var(--amarelo); }
</style>
