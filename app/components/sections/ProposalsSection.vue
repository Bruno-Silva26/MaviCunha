<script setup lang="ts">
const { propostasSecao } = useSiteContent()
const { propostas } = await useCandidateData()

const numero = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="propostas" class="propostas">
    <div v-reveal class="propostas__painel">
      <SectionHeading
        :eyebrow="propostasSecao.eyebrow"
        :titulo="propostasSecao.titulo"
        :intro="propostasSecao.intro"
        tom="escuro"
        layout="linha"
      />

      <ul class="propostas__lista">
        <li v-for="(proposta, i) in propostas" :key="proposta.id" class="card">
          <p class="card__numero">{{ numero(i) }}</p>
          <h3 class="card__titulo">{{ proposta.titulo }}</h3>
          <p class="card__texto">{{ proposta.descricao }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.propostas { padding: 0 var(--pad) var(--secao); }

.propostas__painel {
  max-width: var(--max);
  margin-inline: auto;
  padding: 80px 56px 72px;
  border-radius: var(--raio-g);
  background: var(--painel-bandeiras);
  color: var(--preto);
  transition: color .3s ease;
}
/* modo felina: o painel vira preto, então a tinta precisa virar clara */
.site[data-felina='1'] .propostas__painel { color: var(--texto); }

.propostas__lista {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 16px;
}

.card {
  /* min-height dá presença aos cards quando são poucos: o número fica no topo
     e o texto é empurrado para a base, preenchendo a altura sem esticar a fonte.
     O tingimento usa currentColor: escuro sobre o painel amarelo, claro sobre o preto do modo felina. */
  display: flex;
  flex-direction: column;
  min-height: 320px;
  padding: 40px 36px 44px;
  border-radius: var(--raio-m);
  background: color-mix(in srgb, currentColor 6%, transparent);
  transition: background .25s ease, color .25s ease;
}
.card:hover { background: var(--tinta-sobre-destaque); color: var(--destaque-bg); }

.card__numero {
  font-family: var(--fonte-titulo);
  font-size: 13px;
  letter-spacing: .2em;
  opacity: .5;
}
.card__titulo {
  margin-top: auto;
  padding-top: 24px;
  font-family: var(--fonte-titulo);
  font-size: clamp(26px, 2.1vw, 32px);
  line-height: 1.08;
  letter-spacing: -.02em;
  text-wrap: balance;
}
.card__texto { margin-top: 16px; font-size: 17px; line-height: 1.6; font-weight: 500; opacity: .72; }

@media (max-width: 720px) {
  .propostas__painel { padding: 52px 24px 48px; }
  .propostas__lista { margin-top: 40px; }
  .card { min-height: 0; padding: 34px 26px 38px; }
  .card__titulo { margin-top: 18px; padding-top: 0; }
}
</style>
