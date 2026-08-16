<script setup lang="ts">
const { grupo, links } = useSiteContent()
</script>

<template>
  <section id="grupo" class="grupo">
    <div v-reveal class="grupo__painel">
      <p class="eyebrow">{{ grupo.eyebrow }}</p>
      <h2 class="grupo__titulo">{{ grupo.titulo }}</h2>
      <p class="grupo__texto">{{ grupo.texto }}</p>

      <BaseButton
        :href="links.whatsappGrupo"
        externo
        variante="solido"
        tamanho="xl"
        seta
        class="grupo__btn"
      >
        {{ grupo.cta }}
      </BaseButton>
    
    </div>
  </section>
</template>

<style scoped>
.grupo { padding: 0 var(--pad) var(--secao); }

.grupo__painel {
  position: relative;
  overflow: hidden;
  max-width: var(--max);
  margin-inline: auto;
  padding: 96px 40px;
  border-radius: var(--raio-g);
  border: 1px solid color-mix(in srgb, var(--destaque-bg) 22%, transparent);
  background: radial-gradient(90% 130% at 50% 0%, color-mix(in srgb, var(--destaque-bg) 16%, transparent), rgba(255, 255, 255, .02));
  text-align: center;
}

.grupo__titulo {
  margin: 20px auto 0;
  max-width: 18ch;
  font-family: var(--fonte-titulo);
  font-size: clamp(40px, 4.8vw, 70px);
  line-height: .94;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.grupo__texto {
  margin: 24px auto 0;
  max-width: 56ch;
  font-size: 19px;
  line-height: 1.65;
  color: var(--texto-suave);
  text-wrap: pretty;
}
.grupo__btn { margin-top: 40px; }


@media (max-width: 720px) {
  .grupo__painel { padding: 64px 22px; }
  .grupo__btn { width: 100%; }
}
</style>
