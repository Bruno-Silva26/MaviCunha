<script setup lang="ts">
/** Cabeçalho padrão das seções: eyebrow + título + texto de apoio opcional. */
withDefaults(
  defineProps<{
    eyebrow: string
    titulo: string
    intro?: string
    /** claro = sobre fundo preto · escuro = sobre o painel amarelo/creme */
    tom?: 'claro' | 'escuro'
    /** coluna = tudo empilhado · linha = título à esquerda e intro à direita */
    layout?: 'coluna' | 'linha'
    tamanho?: 'md' | 'lg'
  }>(),
  { tom: 'claro', layout: 'coluna', tamanho: 'lg' }
)
</script>

<template>
  <header class="cabecalho" :class="[`cabecalho--${tom}`, `cabecalho--${layout}`]">
    <div>
      <p class="cabecalho__eyebrow">{{ eyebrow }}</p>
      <h2 class="cabecalho__titulo" :class="`cabecalho__titulo--${tamanho}`">
        <slot name="titulo">{{ titulo }}</slot>
      </h2>
    </div>
    <p v-if="intro || $slots.intro" class="cabecalho__intro">
      <slot name="intro">{{ intro }}</slot>
    </p>
  </header>
</template>

<style scoped>
.cabecalho--linha {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: 32px 56px;
  align-items: end;
}

.cabecalho__eyebrow {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .24em;
  text-transform: uppercase;
}

.cabecalho__titulo {
  margin-top: 18px;
  font-family: var(--fonte-titulo);
  line-height: .92;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.cabecalho__titulo--lg { font-size: clamp(40px, 4.8vw, 70px); }
.cabecalho__titulo--md { font-size: clamp(34px, 3.8vw, 54px); }

.cabecalho__intro {
  font-size: 19px;
  line-height: 1.6;
  text-wrap: pretty;
}
.cabecalho--coluna .cabecalho__intro { margin-top: 22px; max-width: 56ch; }

/* tons */
.cabecalho--claro .cabecalho__eyebrow { color: var(--amarelo); }
.cabecalho--claro .cabecalho__intro { color: var(--texto-fraco); }

.cabecalho--escuro { color: var(--preto); }
.cabecalho--escuro .cabecalho__eyebrow { opacity: .65; }
.cabecalho--escuro .cabecalho__intro { font-weight: 600; opacity: .78; }
</style>
