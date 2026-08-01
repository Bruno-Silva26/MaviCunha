<script setup lang="ts">
import foto from '~/assets/images/foto-quem.png'

const { candidata, sobre, valores } = useSiteContent()
</script>

<template>
  <section id="quem" class="quem container grade-2">
    <div v-reveal class="quem__foto">
      <img :src="foto" :alt="candidata.nome" loading="lazy">
      <p class="quem__selo">
        <span class="quem__selo-numero">{{ candidata.numero }}</span>
        <span>{{ candidata.partido }}</span>
      </p>
    </div>

    <div v-reveal="120">
      <p class="eyebrow">{{ sobre.eyebrow }}</p>
      <h2 class="titulo">
        <template v-for="(linha, i) in sobre.titulo" :key="linha">
          <br v-if="i">{{ linha }}
        </template>
      </h2>

      <p v-for="(paragrafo, i) in sobre.paragrafos" :key="paragrafo" class="texto quem__paragrafo">
        {{ paragrafo }}
        <strong v-if="i === sobre.paragrafos.length - 1" class="quem__destaque">{{ sobre.destaque }}</strong>
      </p>

      <ul class="valores">
        <li v-for="valor in valores" :key="valor.titulo" class="valores__item">
          <p class="valores__titulo">{{ valor.titulo }}</p>
          <p class="valores__texto">{{ valor.texto }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.quem { padding-block: var(--secao); }

.quem__foto { position: relative; }
.quem__foto img {
  display: block;
  width: 100%;
  height: 540px;
  object-fit: cover;
  object-position: 50% 22%;
  border-radius: 28px;
}

.quem__selo {
  position: absolute;
  left: -16px;
  bottom: -18px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px 12px 12px;
  border-radius: var(--raio-pill);
  background: var(--amarelo);
  color: var(--preto);
  box-shadow: 0 18px 40px rgba(0, 0, 0, .45);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.quem__selo-numero {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--preto);
  color: var(--amarelo);
  font-family: var(--fonte-titulo);
  font-size: 13px;
}

.quem__paragrafo { margin-top: 18px; max-width: 60ch; }
.quem__destaque { color: var(--amarelo); }

.valores {
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 14px;
}
.valores__item {
  padding: 28px 24px;
  border-radius: 22px;
  border: 1px solid var(--linha);
  background: var(--vidro-forte);
  transition: border-color var(--transicao), transform var(--transicao);
}
.valores__item:hover { border-color: rgba(255, 212, 0, .5); transform: translateY(-3px); }
.valores__titulo { font-family: var(--fonte-titulo); font-size: 16px; color: var(--amarelo); }
.valores__texto { margin-top: 10px; font-size: 15px; line-height: 1.55; color: rgba(244, 241, 234, .6); }

@media (max-width: 720px) {
  .quem__foto img { height: 400px; }
  .quem__selo { left: 12px; }
}
</style>
