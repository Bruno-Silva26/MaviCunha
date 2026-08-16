<script setup lang="ts">
/**
 * Botão/link único da campanha. Renderiza <a> quando recebe `href`, senão <button>.
 * Variantes e tamanhos cobrem todos os CTAs do site — nada de botão avulso nas seções.
 */
type Variante = 'solido' | 'linha' | 'contorno' | 'inverso'
type Tamanho = 'sm' | 'md' | 'lg' | 'xl'
type TipoBotao = 'button' | 'submit'

const props = withDefaults(
  defineProps<{
    href?: string
    variante?: Variante
    tamanho?: Tamanho
    externo?: boolean
    seta?: boolean
    caixaAlta?: boolean
    tipo?: TipoBotao
  }>(),
  { variante: 'solido', tamanho: 'md', externo: false, seta: false, caixaAlta: false, tipo: 'button' }
)

const tag = computed(() => (props.href ? 'a' : 'button'))

const atributos = computed(() =>
  props.href
    ? { href: props.href, ...(props.externo ? { target: '_blank', rel: 'noopener' } : {}) }
    : { type: props.tipo }
)
</script>

<template>
  <component
    :is="tag"
    v-bind="atributos"
    class="btn"
    :class="[`btn--${variante}`, `btn--${tamanho}`, { 'btn--caixa-alta': caixaAlta }]"
  >
    <slot />
    <span v-if="seta" class="btn__seta" aria-hidden="true">→</span>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: var(--raio-pill);
  font-family: var(--fonte);
  font-weight: 800;
  white-space: nowrap;
  text-align: center;
  transition: background var(--transicao), color var(--transicao),
    border-color var(--transicao), transform var(--transicao), box-shadow var(--transicao);
}

/* ---- tamanhos ---- */
.btn--sm { padding: 13px 24px; font-size: 12px; }
.btn--md { padding: 19px 34px; font-size: 14.5px; }
.btn--lg { padding: 21px 40px; font-size: 15px; gap: 12px; }
.btn--xl { padding: 23px 48px; font-size: 16px; gap: 12px; }

.btn--caixa-alta { letter-spacing: .12em; text-transform: uppercase; }

/* ---- variantes ---- */
.btn--solido { background: var(--amarelo); color: var(--preto); }
.btn--solido:hover { background: var(--branco); color: var(--preto); }
.btn--solido:not(.btn--sm):hover { transform: translateY(-2px); }

.btn--linha { border-color: rgba(244, 241, 234, .24); color: var(--texto); }
.btn--linha:hover { border-color: var(--amarelo); color: var(--amarelo); }

.btn--contorno { border-color: rgba(255, 212, 0, .55); color: var(--amarelo); }
.btn--contorno:hover { background: var(--amarelo); color: var(--preto); }

.btn--inverso { background: var(--preto); color: var(--amarelo); }
.btn--inverso:hover {
  background: var(--amarelo);
  color: var(--preto);
  box-shadow: inset 0 0 0 1.5px var(--preto);
}

.btn__seta { transition: transform var(--transicao); }
.btn:hover .btn__seta { transform: translateX(3px); }
</style>
