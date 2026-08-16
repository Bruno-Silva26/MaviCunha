<script setup lang="ts">
import foto from '~/assets/images/foto-livro.jpeg'

const { candidata, links, missao } = useSiteContent()
</script>

<template>
  <section id="missao" class="missao container grade-2">
    <div v-reveal>
      <p class="eyebrow">{{ candidata.partido }} · {{ candidata.numero }}</p>
      <h2 class="titulo">{{ missao.titulo }}</h2>
      <p class="texto missao__texto">{{ missao.texto }}</p>

      <ul class="pilares">
        <li v-for="pilar in missao.pilares" :key="pilar" class="pilares__item">
          <span class="pilares__ponto" />{{ pilar }}
        </li>
      </ul>

      <BaseButton
        :href="links.livroAmarelo"
        externo
        variante="contorno"
        seta
        class="missao__btn"
      >
        {{ missao.cta }}
      </BaseButton>
    </div>

    <img
      v-reveal="120"
      :src="foto"
      :alt="`${candidata.nome} com os livros amarelos`"
      class="missao__foto"
      loading="lazy"
    >
  </section>
</template>

<style scoped>
.missao { padding: 0 var(--pad) var(--secao); }
.missao__texto { margin-top: 26px; max-width: 56ch; }

.pilares { margin-top: 36px; display: grid; gap: 10px; }
.pilares__item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 22px;
  border-radius: var(--raio-p);
  background: var(--vidro);
  font-size: 16.5px;
  font-weight: 600;
  color: var(--texto-suave);
}
.pilares__ponto {
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 50%;
  background: var(--destaque-bg);
}

.missao__btn { margin-top: 34px; }

.missao__foto {
  display: block;
  width: 100%;
  height: 560px;
  object-fit: cover;
  object-position: 50% 45%;
  border-radius: 32px;
}

@media (max-width: 720px) {
  .missao__foto { height: 420px; }
}
</style>
