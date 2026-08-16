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
  background: var(--destaque-bg);
  color: var(--tinta-sobre-destaque);
  border-color: var(--destaque-bg);
  transform: translateY(-3px);
}
.rede--destaque { border-color: color-mix(in srgb, var(--destaque-bg) 35%, transparent); background: color-mix(in srgb, var(--destaque-bg) 8%, transparent); }

.rede__sigla {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 16px;
  background: color-mix(in srgb, var(--destaque-bg) 16%, transparent);
  color: var(--destaque);
  font-family: var(--fonte-titulo);
  font-size: 18px;
}
.rede:hover .rede__sigla { background: color-mix(in srgb, var(--tinta-sobre-destaque) 10%, transparent); color: var(--tinta-sobre-destaque); }

.rede__info { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
.rede__nome { font-family: var(--fonte-titulo); font-size: 18px; }
.rede__handle { font-size: 14.5px; opacity: .6; }
.rede__seta { font-size: 20px; opacity: .5; }

/* modo felina: os cards de redes já nascem rosa, com sigla e texto em branco */
.site[data-felina='1'] .rede {
  background: var(--destaque-bg);
  color: var(--tinta-sobre-destaque);
  border-color: var(--destaque-bg);
}
.site[data-felina='1'] .rede__sigla {
  background: color-mix(in srgb, var(--tinta-sobre-destaque) 18%, transparent);
  color: var(--tinta-sobre-destaque);
}
.site[data-felina='1'] .rede:hover {
  background: var(--inv-bg);
  color: var(--inv-tinta);
  border-color: var(--inv-bg);
}
.site[data-felina='1'] .rede:hover .rede__sigla {
  background: color-mix(in srgb, var(--inv-tinta) 12%, transparent);
  color: var(--inv-tinta);
}
</style>
