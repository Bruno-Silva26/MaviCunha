<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { candidata } = useSiteContent()
</script>

<template>
  <div class="erro">
    <div class="erro__halo" aria-hidden="true" />
    <p class="erro__codigo">{{ error.statusCode }}</p>
    <h1 class="erro__titulo">Essa página saiu de campanha</h1>
    <p class="erro__texto">
      O link não existe ou foi movido. Volte para a página principal e continue com a
      {{ candidata.nome }} {{ candidata.numero }}.
    </p>
    <BaseButton href="/" variante="solido" seta @click.prevent="clearError({ redirect: '/' })">
      Voltar para o início
    </BaseButton>
  </div>
</template>

<style scoped>
.erro {
  position: relative;
  display: grid;
  place-content: center;
  justify-items: center;
  min-height: 100vh;
  padding: var(--pad);
  text-align: center;
  background: var(--preto);
  color: var(--texto);
  font-family: var(--fonte);
  overflow: hidden;
}
.erro__halo {
  position: absolute;
  top: -180px;
  width: 760px;
  height: 520px;
  background: radial-gradient(closest-side, rgba(255, 212, 0, .16), transparent);
  filter: blur(20px);
  animation: breathe 9s ease-in-out infinite;
}
.erro__codigo {
  position: relative;
  font-family: var(--fonte-titulo);
  font-size: clamp(80px, 16vw, 180px);
  line-height: .9;
  color: var(--amarelo);
}
.erro__titulo {
  position: relative;
  margin-top: 12px;
  font-family: var(--fonte-titulo);
  font-size: clamp(28px, 4vw, 46px);
  letter-spacing: -.03em;
}
.erro__texto {
  position: relative;
  margin: 18px 0 34px;
  max-width: 46ch;
  font-size: 18px;
  line-height: 1.6;
  color: var(--texto-suave);
}
</style>
