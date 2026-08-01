<script setup lang="ts">
const { redes, redesSecao } = useSiteContent()
</script>

<template>
  <section id="redes" class="redes container">
    <SectionHeading
      v-reveal
      :eyebrow="redesSecao.eyebrow"
      :titulo="redesSecao.titulo"
      :intro="redesSecao.intro"
      layout="linha"
      tamanho="md"
      class="redes__cabecalho"
    />

    <div class="redes__grade">
      <a
        v-for="(rede, i) in redes"
        :key="rede.nome"
        v-reveal="i * 60"
        :href="rede.href"
        target="_blank"
        rel="noopener"
        class="rede"
        :class="{ 'rede--destaque': rede.destaque }"
      >
        <span class="rede__sigla">{{ rede.sigla }}</span>
        <span class="rede__info">
          <span class="rede__nome">{{ rede.nome }}</span>
          <span class="rede__handle">{{ rede.handle }}</span>
        </span>
        <span class="rede__seta" aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.redes { padding: 0 var(--pad) 130px; }

.redes__cabecalho :deep(.cabecalho__intro) { max-width: 38ch; font-size: 16.5px; }

.redes__grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 14px;
  margin-top: 44px;
}

.rede {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 28px;
  border-radius: 24px;
  border: 1px solid var(--linha);
  background: linear-gradient(150deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .01));
  color: var(--texto);
  transition: background var(--transicao), color var(--transicao),
    border-color var(--transicao), transform var(--transicao);
}
.rede:hover {
  background: var(--amarelo);
  color: var(--preto);
  border-color: var(--amarelo);
  transform: translateY(-3px);
}
.rede--destaque { border-color: rgba(255, 212, 0, .35); background: rgba(255, 212, 0, .08); }

.rede__sigla {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 16px;
  background: rgba(255, 212, 0, .16);
  color: var(--amarelo);
  font-family: var(--fonte-titulo);
  font-size: 18px;
}
.rede:hover .rede__sigla { background: rgba(10, 10, 10, .1); color: var(--preto); }

.rede__info { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
.rede__nome { font-family: var(--fonte-titulo); font-size: 18px; }
.rede__handle { font-size: 14.5px; opacity: .6; }
.rede__seta { font-size: 20px; opacity: .5; }
</style>
