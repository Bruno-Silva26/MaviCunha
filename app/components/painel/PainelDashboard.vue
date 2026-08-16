<script setup lang="ts">
const abas = [
  { id: 'hero', rotulo: 'Hero' },
  { id: 'propostas', rotulo: 'Propostas' },
  { id: 'eventos', rotulo: 'Eventos' }
] as const

type AbaId = (typeof abas)[number]['id']

const abaAtiva = ref<AbaId>('hero')
</script>

<template>
  <div class="dashboard">
    <p class="dashboard__eyebrow">Painel administrativo</p>
    <h1 class="dashboard__titulo">Conteúdo do site</h1>

    <div class="dashboard__abas" role="tablist">
      <button
        v-for="aba in abas"
        :key="aba.id"
        role="tab"
        :aria-selected="abaAtiva === aba.id"
        class="dashboard__aba"
        :class="{ 'dashboard__aba--ativa': abaAtiva === aba.id }"
        @click="abaAtiva = aba.id"
      >
        {{ aba.rotulo }}
      </button>
    </div>

    <section class="dashboard__painel">
      <HeroForm v-if="abaAtiva === 'hero'" />
      <PropostasPainel v-else-if="abaAtiva === 'propostas'" />
      <EventosPainel v-else />
    </section>
  </div>
</template>

<style scoped>
.dashboard__eyebrow {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--amarelo);
}

.dashboard__titulo {
  margin-top: 12px;
  font-family: var(--fonte-titulo);
  font-size: clamp(32px, 4vw, 46px);
  letter-spacing: -.03em;
}

.dashboard__abas {
  display: flex;
  gap: 8px;
  margin-top: 36px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--linha);
  overflow-x: auto;
}

.dashboard__aba {
  flex: none;
  padding: 12px 20px;
  border-radius: var(--raio-pill) var(--raio-pill) 0 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--texto-fraco);
  transition: color var(--transicao), background var(--transicao);
}
.dashboard__aba:hover { color: var(--texto); }
.dashboard__aba--ativa { color: var(--preto); background: var(--amarelo); }

.dashboard__painel { margin-top: 40px; }
</style>
