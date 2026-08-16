<script setup lang="ts">
const { eventosSecao } = useSiteContent()
const { eventos } = await useCandidateData()

const destaque = computed(() => eventos.value.find((evento) => evento.is_destaque) ?? eventos.value[0] ?? null)
const outros = computed(() => eventos.value.filter((evento) => evento.id !== destaque.value?.id))

const formatarData = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', weekday: 'long' }).format(new Date(isoString))

const formatarDataCurta = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(isoString))

const formatarHora = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(isoString))
</script>

<template>
  <section v-if="destaque" id="eventos" class="eventos">
    <div v-reveal class="container">
      <SectionHeading
        :eyebrow="eventosSecao.eyebrow"
        :titulo="eventosSecao.titulo"
        :intro="eventosSecao.intro"
        tom="claro"
        layout="linha"
      />

      <div class="eventos__grade">
        <article class="eventos__destaque">
          <p class="eventos__selo">Próximo encontro</p>
          <h3 class="eventos__titulo">{{ destaque.titulo }}</h3>

          <div class="eventos__quando">
            <p class="eventos__data">{{ formatarData(destaque.data_hora) }}</p>
            <p class="eventos__hora">{{ formatarHora(destaque.data_hora) }}</p>
          </div>

          <p v-if="destaque.local" class="eventos__local">
            {{ destaque.local }}<span v-if="destaque.endereco"> · {{ destaque.endereco }}</span>
          </p>

          <p v-if="destaque.descricao" class="eventos__texto">{{ destaque.descricao }}</p>
          <p v-if="destaque.entrada_info" class="eventos__entrada">{{ destaque.entrada_info }}</p>
        </article>

        <ul v-if="outros.length" class="eventos__lista">
          <li v-for="evento in outros" :key="evento.id" class="eventos__item">
            <p class="eventos__item-data">{{ formatarDataCurta(evento.data_hora) }}</p>
            <div>
              <p class="eventos__item-titulo">{{ evento.titulo }}</p>
              <p v-if="evento.local" class="eventos__item-local">{{ evento.local }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eventos { padding: 0 var(--pad) var(--secao); }

.eventos__grade {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr));
  gap: 24px;
}

.eventos__destaque {
  padding: 44px 40px;
  border-radius: var(--raio-m);
  border: 1px solid rgba(255, 212, 0, .35);
  background: var(--vidro-forte);
}

.eventos__selo {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--amarelo);
}

.eventos__titulo {
  margin-top: 14px;
  font-family: var(--fonte-titulo);
  font-size: clamp(24px, 2.4vw, 32px);
  line-height: 1.1;
  letter-spacing: -.02em;
  text-wrap: balance;
}

.eventos__quando { display: flex; align-items: baseline; gap: 12px; margin-top: 20px; }
.eventos__data { font-size: 16px; font-weight: 700; text-transform: capitalize; }
.eventos__hora { font-size: 15px; color: var(--texto-fraco); }

.eventos__local { margin-top: 8px; font-size: 15px; color: var(--texto-suave); }
.eventos__texto { margin-top: 16px; font-size: 16px; line-height: 1.6; color: var(--texto-suave); }
.eventos__entrada {
  margin-top: 18px;
  display: inline-block;
  padding: 8px 16px;
  border-radius: var(--raio-pill);
  background: rgba(255, 212, 0, .1);
  font-size: 13px;
  font-weight: 700;
  color: var(--amarelo);
}

.eventos__lista { display: grid; gap: 10px; align-content: start; }
.eventos__item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  border-radius: var(--raio-p);
  background: var(--vidro);
}
.eventos__item-data {
  flex: none;
  font-family: var(--fonte-titulo);
  font-size: 13px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--amarelo);
}
.eventos__item-titulo { font-size: 15.5px; font-weight: 700; }
.eventos__item-local { margin-top: 2px; font-size: 13.5px; color: var(--texto-fraco); }

@media (max-width: 720px) {
  .eventos__destaque { padding: 32px 26px; }
}
</style>
