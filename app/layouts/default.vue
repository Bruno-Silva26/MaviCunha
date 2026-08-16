<script setup lang="ts">
const { felina, transicionando, bote, lerPreferencia } = useFelina()

onMounted(lerPreferencia)
</script>

<template>
  <div class="site" :data-felina="felina ? '1' : null" :class="{ 'felina-transicao': transicionando, 'site--tremor': bote }">
    <a class="pular" href="#conteudo">Pular para o conteúdo</a>
    <AppHeader />
    <main id="conteudo">
      <slot />
    </main>
    <AppFooter />
    <FelinaBote />
  </div>
</template>

<style scoped>
.site {
  background: var(--superficie);
  color: var(--texto);
  transition: background-color .2s ease;
}
.site--tremor { animation: tremor .55s ease-in-out; }

.pular {
  position: absolute;
  left: 16px;
  top: -100px;
  z-index: 100;
  padding: 14px 22px;
  border-radius: var(--raio-pill);
  background: var(--destaque-bg);
  color: var(--tinta-sobre-destaque);
  font-weight: 800;
  transition: top var(--transicao);
}
.pular:focus-visible { top: 16px; color: var(--tinta-sobre-destaque); }
</style>
