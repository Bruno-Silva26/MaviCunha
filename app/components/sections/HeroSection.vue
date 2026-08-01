<script setup lang="ts">
import foto from '~/assets/images/foto-hero.png'

const { candidata, hero } = useSiteContent()
const { area, brilho } = usePointerGlow()
</script>

<template>
  <section id="topo" ref="area" class="hero">
    <div ref="brilho" class="hero__cursor" aria-hidden="true" />
    <div class="hero__halo" aria-hidden="true" />

    <div class="hero__grade">
      <div class="hero__texto">
        <p class="selo">
          {{ hero.selo }}
          <span class="selo__numero">{{ candidata.partido.replace('Partido ', '') }} {{ candidata.numero }}</span>
        </p>

        <h1 class="hero__titulo">
          {{ candidata.primeiroNome }}<br><span>{{ candidata.sobrenome }}</span>
        </h1>

        <div class="hero__cargo">
          <span class="hero__risco" />
          <p>{{ candidata.cargo }} · {{ candidata.local }}</p>
        </div>

        <p class="hero__slogan">{{ candidata.slogan }}</p>

        <div class="hero__botoes">
          <BaseButton href="#apoie" variante="solido" seta>{{ hero.ctaPrimario }}</BaseButton>
          <BaseButton href="#propostas" variante="linha">{{ hero.ctaSecundario }}</BaseButton>
        </div>
      </div>

      <div class="hero__foto">
        <div class="hero__brilhoFoto" aria-hidden="true" />
        <img :src="foto" :alt="candidata.nome" width="1200" height="1800" fetchpriority="high">
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 56px var(--pad) 0;
}

.hero__cursor {
  position: absolute;
  top: 0;
  left: 0;
  width: 620px;
  height: 620px;
  margin: -310px 0 0 -310px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 212, 0, .42), rgba(255, 212, 0, .12) 42%, transparent 68%);
  filter: blur(60px);
  opacity: 0;
  transition: opacity .5s ease;
  pointer-events: none;
  will-change: transform;
}

.hero__halo {
  position: absolute;
  left: 50%;
  top: -160px;
  width: 900px;
  height: 520px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, rgba(255, 212, 0, .14), transparent);
  filter: blur(20px);
  pointer-events: none;
  animation: breathe 9s ease-in-out infinite;
}

.hero__grade {
  position: relative;
  max-width: var(--max);
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr));
  gap: 48px;
  align-items: center;
  min-height: calc(100vh - 150px);
}

.hero__texto {
  padding-block: 32px 72px;
  animation: rise .8s var(--mola) both;
}

.selo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px 9px 16px;
  border-radius: var(--raio-pill);
  border: 1px solid rgba(255, 212, 0, .35);
  background: rgba(255, 212, 0, .06);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--amarelo);
}
.selo__numero {
  padding: 5px 12px;
  border-radius: var(--raio-pill);
  background: var(--amarelo);
  color: var(--preto);
  letter-spacing: .12em;
}

.hero__titulo {
  margin-top: 26px;
  font-family: var(--fonte-titulo);
  font-size: clamp(56px, 7vw, 112px);
  line-height: .88;
  letter-spacing: -.04em;
}
.hero__titulo span { color: var(--amarelo); }

.hero__cargo { display: flex; align-items: center; gap: 14px; margin-top: 26px; }
.hero__cargo p {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(244, 241, 234, .8);
}
.hero__risco { width: 44px; height: 2px; border-radius: 2px; background: rgba(255, 212, 0, .7); }

.hero__slogan {
  margin-top: 26px;
  max-width: 46ch;
  font-size: 20px;
  line-height: 1.6;
  color: rgba(244, 241, 234, .68);
  text-wrap: pretty;
}

.hero__botoes { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 38px; }

.hero__foto {
  position: relative;
  align-self: end;
  height: min(80vh, 780px);
}
.hero__foto img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, .55));
}
.hero__brilhoFoto {
  position: absolute;
  left: 50%;
  bottom: 4%;
  width: 88%;
  height: 82%;
  transform: translateX(-50%);
  border-radius: 999px 999px 260px 260px;
  background: radial-gradient(60% 60% at 50% 45%, rgba(255, 212, 0, .28), rgba(255, 212, 0, .06) 60%, transparent 78%);
  filter: blur(6px);
}

@media (max-width: 720px) {
  .hero { padding-top: 32px; }
  .hero__texto { padding-bottom: 40px; }
  .hero__foto { height: min(62vh, 520px); }
  .hero__botoes .btn { flex: 1 1 auto; }
}
</style>
