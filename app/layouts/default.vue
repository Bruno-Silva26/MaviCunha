<template>
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <AppHeader />
  <main id="conteudo">
    <slot />
  </main>
  <AppFooter />
</template>

<style scoped>
.pular {
  position: absolute;
  left: 16px;
  top: -100px;
  z-index: 100;
  padding: 14px 22px;
  border-radius: var(--raio-pill);
  background: var(--amarelo);
  color: var(--preto);
  font-weight: 800;
  transition: top var(--transicao);
}
.pular:focus-visible { top: 16px; color: var(--preto); }
</style>
