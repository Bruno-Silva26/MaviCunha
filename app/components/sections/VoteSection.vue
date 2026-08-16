<script setup lang="ts">
import arte from '~/assets/images/arte-campanha.png'

const { campanha, candidata, links } = useSiteContent()

const legenda = computed(() =>
  [candidata.nome, candidata.cargo, campanha.numero, `CNPJ: ${candidata.cnpj}`, candidata.partido].join(' • ')
)
</script>

<template>
  <section id="vote" class="vote">
    <div v-reveal class="vote__painel">
      <span class="vote__trama" aria-hidden="true" />

      <div class="vote__grade">
        <div class="vote__texto">
          <p class="vote__tarja">{{ campanha.tarja }}</p>
          <p class="vote__vote">Vote</p>
          <p class="vote__nome">{{ candidata.nome }}</p>
          <p class="vote__numero">{{ campanha.numero }}</p>
          <p class="vote__chamada">{{ campanha.chamada }}</p>

          <div class="vote__acoes">
            <BaseButton :href="links.whatsappGrupo" externo variante="inverso" tamanho="lg" seta>
              Divulgar o {{ campanha.numero }}
            </BaseButton>
            <BaseButton href="#apoie" variante="linha" tamanho="lg">Doar para a campanha</BaseButton>
          </div>
        </div>

        <div class="vote__arteWrap">
          <img
            :src="arte"
            class="vote__arte"
            :alt="`${candidata.nome}, candidata a ${candidata.cargo}, número ${campanha.numero}`"
            loading="lazy"
          >
          <p class="vote__legenda">{{ legenda }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vote { padding: 0 var(--pad) var(--secao); }

.vote__painel {
  position: relative;
  overflow: hidden;
  max-width: var(--max);
  margin-inline: auto;
  border-radius: var(--raio-g);
  background: radial-gradient(130% 110% at 8% 0%, var(--destaque-bg2), var(--destaque-bg) 58%);
  color: var(--tinta-sobre-destaque);
}

.vote__trama {
  position: absolute;
  inset: 0;
  opacity: .16;
  background-image: radial-gradient(currentColor 1.6px, transparent 1.7px);
  background-size: 22px 22px;
  pointer-events: none;
}

.vote__grade {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
  gap: 24px;
  align-items: end;
}

.vote__texto { padding: 64px 26px 60px 56px; }

.vote__tarja {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  border-radius: var(--raio-pill);
  border: 1.5px solid color-mix(in srgb, currentColor 45%, transparent);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .24em;
  text-transform: uppercase;
}

.vote__vote { margin-top: 34px; font-family: var(--fonte-titulo); font-size: clamp(52px, 7vw, 104px); line-height: .86; letter-spacing: -.045em; color: #fff; }
.vote__nome { margin-top: 2px; font-family: var(--fonte-titulo); font-size: clamp(38px, 4.6vw, 66px); line-height: .9; letter-spacing: -.035em; color: rgba(255, 255, 255, .78); }
.vote__numero {
  margin-top: 26px;
  font-family: var(--fonte-titulo);
  font-size: clamp(84px, 11vw, 208px);
  line-height: .82;
  letter-spacing: -.06em;
  color: #fff;
  text-shadow: 6px 6px 0 color-mix(in srgb, var(--tinta-sobre-destaque) 78%, transparent);
}
/* no modo felina o número volta a "furar" o painel mostrando a cor da página,
   como no design original — só o modo padrão pediu o número branco */
.site[data-felina='1'] .vote__numero { color: var(--superficie); }
.vote__chamada { margin-top: 34px; max-width: 34ch; font-size: 19px; line-height: 1.6; font-weight: 600; opacity: .85; text-wrap: pretty; }

.vote__acoes { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
/* o botão "linha" herda a cor global --texto; aqui ele precisa da tinta do próprio painel */
.vote__acoes :deep(.btn--linha) {
  border-color: color-mix(in srgb, currentColor 45%, transparent);
  color: inherit;
}
.vote__acoes :deep(.btn--linha:hover) { background: var(--inv-bg); border-color: var(--inv-bg); color: var(--inv-tinta); }

.vote__arteWrap {
  position: relative;
  justify-self: end;
  align-self: end;
  width: 100%;
  max-width: 620px;
}

.vote__arte {
  display: block;
  width: 100%;
  border-radius: 36px 0 var(--raio-g) 0;
}

/* ficha legal da campanha, na vertical, rente à ponta direita da imagem */
.vote__legenda {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin: 0;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: .04em;
  color: rgba(255, 255, 255, .72);
  text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  white-space: nowrap;
  pointer-events: none;
}

@media (max-width: 720px) {
  .vote__texto { padding: 48px 22px 40px; }
  .vote__legenda { right: 8px; font-size: 7px; }
}
</style>
