<script setup lang="ts">
import cofrinho from '~/assets/images/foto-vaquinha.png'

const { doacao, links } = useSiteContent()
</script>

<template>
  <section id="apoie" class="apoie">
    <div v-reveal class="apoie__painel">
      <div class="apoie__texto">
        <SectionHeading
          :eyebrow="doacao.eyebrow"
          :titulo="doacao.titulo"
          :intro="doacao.descricao"
          tom="escuro"
        />

        <div class="apoie__valores">
          <span v-for="valor in doacao.valores" :key="valor" class="chip">{{ valor }}</span>
          <span class="chip chip--vazio">{{ doacao.outroValor }}</span>
        </div>

        <BaseButton
          :href="links.vaquinha"
          externo
          variante="inverso"
          tamanho="lg"
          seta
          class="apoie__btn"
        >
          {{ doacao.cta }}
        </BaseButton>
      </div>

      <div class="apoie__imagem">
        <img :src="cofrinho" alt="Cofrinho da onça" loading="lazy">
      </div>
    </div>
  </section>
</template>

<style scoped>
.apoie { padding: 0 var(--pad) var(--secao); }

.apoie__painel {
  max-width: var(--max);
  margin-inline: auto;
  border-radius: var(--raio-g);
  overflow: hidden;
  /* tinta própria do painel: não segue --superficie/--texto (a página troca pra
     amarelo/branco no modo felina), fica sempre um cartão claro com tinta escura */
  background: var(--painel-vaquinha-tinta);
  color: var(--painel-vaquinha-bg);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr));
}

.apoie__texto { padding: 88px 56px; }
.apoie__texto :deep(.cabecalho__eyebrow) { opacity: .55; }
.apoie__texto :deep(.cabecalho__titulo) {
  font-size: clamp(38px, 4.2vw, 62px);
  line-height: .94;
  letter-spacing: -.035em;
}
.apoie__texto :deep(.cabecalho__intro) {
  margin-top: 26px;
  max-width: 50ch;
  font-size: 19px;
  line-height: 1.65;
  font-weight: 500;
  opacity: .68;
}

.apoie__valores { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 36px; }
.chip {
  padding: 14px 28px;
  border-radius: var(--raio-pill);
  background: var(--painel-vaquinha-bg);
  color: var(--destaque);
  font-family: var(--fonte-titulo);
  font-size: 19px;
}
.chip--vazio { background: none; color: var(--painel-vaquinha-bg); border: 1.5px solid color-mix(in srgb, var(--painel-vaquinha-bg) 25%, transparent); }

.apoie__btn { margin-top: 34px; }
/* o botão "inverso" usa --superficie (a página, que vira amarelo no felina); aqui
   ele precisa ficar preso à tinta escura do próprio painel, não à da página */
.apoie__btn.btn--inverso { background: var(--painel-vaquinha-bg); color: var(--destaque); }
.apoie__btn.btn--inverso:hover { background: var(--inv-bg); color: var(--inv-tinta); box-shadow: inset 0 0 0 1.5px var(--painel-vaquinha-bg); }

.apoie__imagem {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 680px;
  padding: 16px;
  background: radial-gradient(70% 60% at 50% 45%, color-mix(in srgb, var(--destaque-bg) 35%, transparent), transparent 72%);
}
.apoie__imagem img {
  display: block;
  width: 110%;
  max-width: none;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 24px 40px color-mix(in srgb, var(--painel-vaquinha-bg) 22%, transparent));
}

@media (max-width: 720px) {
  .apoie__texto { padding: 56px 24px; }
  .apoie__imagem { min-height: 420px; }
}
</style>
