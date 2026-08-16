<script setup lang="ts">
const { eventosSecao, candidata, links } = useSiteContent()
const { eventos } = await useCandidateData()

const destaque = computed(() => eventos.value.find((evento) => evento.is_destaque) ?? eventos.value[0] ?? null)
const outros = computed(() => eventos.value.filter((evento) => evento.id !== destaque.value?.id).slice(0, 3))

const formatarData = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date(isoString))

const formatarHora = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(isoString))

const formatarDia = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(new Date(isoString))

const formatarMes = (isoString: string) =>
  new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(isoString)).replace('.', '')
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
        <!-- evento principal: papiro -->
        <article class="papiro">
          <span class="papiro__rolete" />

          <div class="papiro__folha">
            <p class="papiro__marca"><span />Próximo encontro</p>
            <p class="papiro__data">{{ formatarData(destaque.data_hora) }} · {{ formatarHora(destaque.data_hora) }}</p>
            <h3 class="papiro__titulo">{{ destaque.titulo }}</h3>
            <p v-if="destaque.descricao" class="papiro__texto">{{ destaque.descricao }}</p>

            <dl v-if="destaque.local || destaque.endereco || destaque.entrada_info" class="papiro__infos">
              <div v-if="destaque.local">
                <dt>Local</dt>
                <dd>{{ destaque.local }}</dd>
              </div>
              <div v-if="destaque.endereco">
                <dt>Endereço</dt>
                <dd>{{ destaque.endereco }}</dd>
              </div>
              <div v-if="destaque.entrada_info">
                <dt>Entrada</dt>
                <dd>{{ destaque.entrada_info }}</dd>
              </div>
            </dl>

            <div class="papiro__rodape">
              <BaseButton :href="links.whatsappGrupo" externo seta class="papiro__btn">
                Confirmar presença
              </BaseButton>
              <span class="papiro__selo">
                <strong>{{ candidata.numero }}</strong>
                <em>Missão</em>
              </span>
            </div>
          </div>

          <span class="papiro__rolete" />
        </article>

        <!-- lista dos próximos -->
        <div v-if="outros.length" class="proximos">
          <p class="proximos__marca">Depois disso</p>
          <div v-for="evento in outros" :key="evento.id" class="proximos__item">
            <span class="proximos__data">
              <strong>{{ formatarDia(evento.data_hora) }}</strong>
              <em>{{ formatarMes(evento.data_hora) }}</em>
            </span>
            <span>
              <span class="proximos__titulo">{{ evento.titulo }}</span>
              <span v-if="evento.local" class="proximos__local">{{ evento.local }}</span>
            </span>
          </div>
          <a :href="links.whatsappGrupo" target="_blank" rel="noopener" class="proximos__todos">
            Agenda completa no grupo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eventos { padding: 0 var(--pad) var(--secao); }

.eventos__grade {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(520px, 100%), 1fr));
  gap: 48px;
  align-items: start;
}

/* ---- papiro ---- */
.papiro { position: relative; padding-inline: 18px; transform: rotate(-.5deg); }

.papiro__rolete {
  position: relative;
  display: block;
  height: 30px;
  margin-inline: -18px;
  border-radius: 15px;
  background: linear-gradient(180deg, #7A5B2C 0%, #8B6935 14%, #5A4118 46%, #33240D 78%, #1E1406 100%);
  box-shadow: 0 10px 18px rgba(0, 0, 0, .45);
}
.papiro__rolete::before,
.papiro__rolete::after {
  content: '';
  position: absolute;
  top: -4px;
  width: 26px;
  height: 38px;
  border-radius: 50%;
  background: radial-gradient(circle at 62% 34%, #8B6935, #33240D 70%, #180F04);
}
.papiro__rolete::before { left: 0; }
.papiro__rolete::after { right: 0; }

.papiro__folha {
  position: relative;
  padding: clamp(40px, 5vw, 64px) clamp(26px, 4.5vw, 58px) clamp(46px, 5.5vw, 68px);
  color: #2B1E08;
  background-image:
    radial-gradient(38% 46% at 18% 24%, rgba(163, 124, 64, .16), transparent 70%),
    radial-gradient(30% 34% at 78% 12%, rgba(150, 110, 52, .14), transparent 72%),
    radial-gradient(44% 40% at 88% 74%, rgba(140, 102, 48, .15), transparent 70%),
    radial-gradient(34% 30% at 34% 88%, rgba(155, 116, 56, .13), transparent 72%),
    radial-gradient(60% 50% at 52% 46%, rgba(255, 250, 236, .55), transparent 78%),
    repeating-linear-gradient(91deg, rgba(139, 105, 53, .055) 0 1px, transparent 1px 11px),
    repeating-linear-gradient(1deg, rgba(139, 105, 53, .035) 0 1px, transparent 1px 14px),
    linear-gradient(168deg, #F3EAD3, #E9DCBE 42%, #DFCEA9);
  box-shadow:
    0 40px 70px -24px rgba(0, 0, 0, .6),
    inset 0 0 44px rgba(122, 84, 28, .2),
    inset 0 0 130px rgba(122, 84, 28, .16),
    inset 0 26px 30px -26px rgba(80, 54, 16, .45),
    inset 0 -26px 30px -26px rgba(80, 54, 16, .35);
  /* bordas irregulares, como folha rasgada */
  clip-path: polygon(0.4% 0, 99.6% 0, 99.1% 9%, 100% 19%, 99.3% 31%, 99.8% 44%, 98.9% 57%, 99.7% 69%, 99.1% 82%, 99.9% 92%, 99.4% 100%, 0.5% 100%, 0.1% 90%, 0.9% 79%, 0.2% 66%, 1% 54%, 0.3% 41%, 0.8% 28%, 0.1% 17%, 0.6% 8%);
}

.papiro__marca {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .26em;
  text-transform: uppercase;
  opacity: .62;
}
.papiro__marca span { width: 38px; height: 1.5px; background: rgba(43, 30, 8, .42); }

.papiro__data { margin-top: 26px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(15px, 1.5vw, 18px); font-style: italic; opacity: .7; }
.papiro__titulo { margin-top: 12px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(32px, 3.8vw, 52px); line-height: 1.04; letter-spacing: -.015em; text-wrap: balance; }
.papiro__texto { margin-top: 22px; max-width: 46ch; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; line-height: 1.78; opacity: .8; text-wrap: pretty; }

.papiro__infos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(170px, 100%), 1fr));
  gap: 20px;
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1.5px solid rgba(43, 30, 8, .16);
}
.papiro__infos dt { font-size: 10.5px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; opacity: .5; }
.papiro__infos dd { margin-top: 8px; font-size: 16px; font-weight: 700; }

.papiro__rodape { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 26px; margin-top: 40px; }
.papiro__btn {
  --btn-papiro-bg: #2B1E08;
  --btn-papiro-tinta: #FFE7B0;
  background: var(--btn-papiro-bg) !important;
  color: var(--btn-papiro-tinta) !important;
}
.papiro__btn:hover { background: var(--destaque-bg) !important; color: var(--btn-papiro-bg) !important; }

/* selo de cera */
.papiro__selo {
  flex: none;
  display: grid;
  place-items: center;
  width: 98px;
  height: 98px;
  padding: 0 8px;
  border-radius: 47% 53% 51% 49% / 49% 46% 54% 51%;
  background: radial-gradient(circle at 32% 26%, #FFE875, #FFD400 52%, #D9AE00 88%);
  color: #2B1E08;
  box-shadow: 0 12px 20px -6px rgba(70, 48, 8, .5), inset 0 -5px 10px rgba(150, 110, 0, .45), inset 0 4px 8px rgba(255, 255, 220, .5);
  transform: rotate(-8deg);
}
/* o número tem tamanho variável (14, 1400…) — encolhe para não estourar o selo redondo */
.papiro__selo strong { font-family: var(--fonte-titulo); font-size: clamp(16px, 5vw, 24px); line-height: 1; white-space: nowrap; }
.papiro__selo em { font-size: 8.5px; font-style: normal; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; opacity: .85; }

/* ---- lista dos próximos ---- */
.proximos { display: grid; gap: 14px; }
.proximos__marca { margin-bottom: 6px; font-size: 11.5px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; color: var(--texto-fraco); }

.proximos__item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 26px;
  border-radius: 22px;
  border: 1px solid var(--linha);
  background: var(--vidro-forte);
  color: var(--texto);
  transition: border-color var(--transicao), transform var(--transicao);
}
.proximos__item:hover { border-color: color-mix(in srgb, var(--destaque-bg) 45%, transparent); transform: translateY(-2px); }

.proximos__data { flex: none; text-align: center; }
.proximos__data strong { display: block; font-family: var(--fonte-titulo); font-size: 26px; line-height: 1; color: var(--destaque); text-transform: capitalize; }
.proximos__data em { display: block; margin-top: 4px; font-size: 10.5px; font-style: normal; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; opacity: .55; }

.proximos__titulo { display: block; font-size: 17px; font-weight: 800; }
.proximos__local { display: block; margin-top: 6px; font-size: 14.5px; color: var(--texto-fraco); }

.proximos__todos {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  padding: 22px 26px;
  border-radius: 22px;
  border: 1px dashed color-mix(in srgb, var(--destaque-bg) 40%, transparent);
  color: var(--destaque);
  font-size: 14.5px;
  font-weight: 800;
}
.proximos__todos:hover { background: var(--inv-bg); border-color: var(--inv-bg); color: var(--inv-tinta); }

@media (max-width: 720px) {
  .eventos__grade { gap: 32px; }
  .papiro__folha { padding: 34px 22px 44px; }
}
</style>
