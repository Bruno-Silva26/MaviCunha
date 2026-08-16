<script setup lang="ts">
const { usuario, sair } = useAuth()
</script>

<template>
  <div class="painel-shell">
    <header class="painel-topo">
      <a href="/" class="painel-voltar">← Voltar para o site</a>
      <button v-if="usuario" class="painel-sair" @click="sair">Sair</button>
    </header>
    <main class="painel-corpo">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.painel-shell {
  min-height: 100vh;
  background: var(--preto);
  color: var(--texto);
  font-family: var(--fonte);
}

.painel-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px var(--pad);
  border-bottom: 1px solid var(--linha);
}

.painel-voltar {
  font-size: 13px;
  font-weight: 700;
  color: var(--texto-suave);
  transition: color var(--transicao);
}
.painel-voltar:hover { color: var(--amarelo); }

.painel-sair {
  padding: 10px 20px;
  border-radius: var(--raio-pill);
  border: 1px solid var(--linha);
  color: var(--texto);
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  transition: border-color var(--transicao), color var(--transicao);
}
.painel-sair:hover { border-color: var(--amarelo); color: var(--amarelo); }

.painel-corpo {
  max-width: 960px;
  margin-inline: auto;
  padding: 48px var(--pad) 96px;
}
</style>
