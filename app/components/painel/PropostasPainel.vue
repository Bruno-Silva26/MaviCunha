<script setup lang="ts">
import type { PropostaRecord } from '~/types/database'

const { candidate, propostas, refresh } = await useCandidateData()
const { criarProposta, atualizarProposta, excluirProposta } = useCandidateAdmin()

const EM_BRANCO = { titulo: '', descricao: '' }

const idEmEdicao = ref<string | null>(null)
const idConfirmandoExclusao = ref<string | null>(null)
const formAberto = ref(false)
const form = reactive({ ...EM_BRANCO })
const salvando = ref(false)
const erro = ref('')

function abrirNovo() {
  idEmEdicao.value = null
  Object.assign(form, EM_BRANCO)
  formAberto.value = true
  erro.value = ''
}

function abrirEdicao(proposta: PropostaRecord) {
  idEmEdicao.value = proposta.id
  form.titulo = proposta.titulo
  form.descricao = proposta.descricao ?? ''
  formAberto.value = true
  erro.value = ''
}

function fechar() {
  formAberto.value = false
  erro.value = ''
}

async function salvar() {
  if (!candidate.value) return
  salvando.value = true
  erro.value = ''

  try {
    if (idEmEdicao.value) {
      await atualizarProposta(idEmEdicao.value, { titulo: form.titulo, descricao: form.descricao })
    } else {
      const proximaOrdem = propostas.value.length
        ? Math.max(...propostas.value.map((p) => p.ordem)) + 1
        : 1
      await criarProposta(candidate.value.id, { titulo: form.titulo, descricao: form.descricao, ordem: proximaOrdem })
    }
    await refresh()
    fechar()
  } catch {
    erro.value = 'Não foi possível salvar. Tente novamente.'
  } finally {
    salvando.value = false
  }
}

async function excluir(proposta: PropostaRecord) {
  if (idConfirmandoExclusao.value !== proposta.id) {
    idConfirmandoExclusao.value = proposta.id
    return
  }
  idConfirmandoExclusao.value = null
  await excluirProposta(proposta.id)
  await refresh()
}

async function mover(indice: number, direcao: -1 | 1) {
  const alvo = propostas.value[indice + direcao]
  const atual = propostas.value[indice]
  if (!alvo || !atual) return

  await Promise.all([
    atualizarProposta(atual.id, { ordem: alvo.ordem }),
    atualizarProposta(alvo.id, { ordem: atual.ordem })
  ])
  await refresh()
}
</script>

<template>
  <div class="propostas-painel">
    <ul class="propostas-painel__lista">
      <li v-for="(proposta, i) in propostas" :key="proposta.id" class="propostas-painel__item">
        <div class="propostas-painel__ordem">
          <button type="button" :disabled="i === 0" aria-label="Mover para cima" @click="mover(i, -1)">↑</button>
          <button type="button" :disabled="i === propostas.length - 1" aria-label="Mover para baixo" @click="mover(i, 1)">↓</button>
        </div>
        <div class="propostas-painel__texto">
          <p class="propostas-painel__titulo">{{ proposta.titulo }}</p>
          <p class="propostas-painel__descricao">{{ proposta.descricao }}</p>
        </div>
        <div class="propostas-painel__acoes">
          <template v-if="idConfirmandoExclusao === proposta.id">
            <button type="button" class="propostas-painel__excluir" @click="excluir(proposta)">Confirmar exclusão?</button>
            <button type="button" @click="idConfirmandoExclusao = null">Cancelar</button>
          </template>
          <template v-else>
            <button type="button" @click="abrirEdicao(proposta)">Editar</button>
            <button type="button" class="propostas-painel__excluir" @click="excluir(proposta)">Excluir</button>
          </template>
        </div>
      </li>
    </ul>

    <BaseButton v-if="!formAberto" variante="linha" @click="abrirNovo">+ Adicionar proposta</BaseButton>

    <form v-else class="propostas-painel__form" @submit.prevent="salvar">
      <h3 class="propostas-painel__form-titulo">{{ idEmEdicao ? 'Editar proposta' : 'Nova proposta' }}</h3>
      <BaseInput v-model="form.titulo" label="Título" obrigatorio />
      <BaseTextarea v-model="form.descricao" label="Descrição" :linhas="3" />

      <p v-if="erro" class="propostas-painel__erro" role="alert">{{ erro }}</p>

      <div class="propostas-painel__form-acoes">
        <BaseButton tipo="submit" variante="solido" :disabled="salvando">{{ salvando ? 'Salvando…' : 'Salvar' }}</BaseButton>
        <BaseButton tipo="button" variante="linha" @click="fechar">Cancelar</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.propostas-painel__lista { display: grid; gap: 10px; margin-bottom: 24px; }

.propostas-painel__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: var(--raio-p);
  background: var(--vidro);
}

.propostas-painel__ordem { display: flex; flex-direction: column; gap: 2px; }
.propostas-painel__ordem button {
  width: 26px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid var(--linha);
  color: var(--texto-fraco);
}
.propostas-painel__ordem button:disabled { opacity: .3; }
.propostas-painel__ordem button:not(:disabled):hover { border-color: var(--amarelo); color: var(--amarelo); }

.propostas-painel__texto { flex: 1; min-width: 0; }
.propostas-painel__titulo { font-weight: 700; }
.propostas-painel__descricao { margin-top: 4px; font-size: 13.5px; color: var(--texto-fraco); }

.propostas-painel__acoes { display: flex; gap: 8px; font-size: 13px; font-weight: 700; flex: none; }
.propostas-painel__acoes button { padding: 8px 14px; border-radius: var(--raio-pill); border: 1px solid var(--linha); }
.propostas-painel__acoes button:hover { border-color: var(--amarelo); color: var(--amarelo); }
.propostas-painel__excluir:hover { border-color: #ff6b6b; color: #ff6b6b; }

.propostas-painel__form {
  margin-top: 24px;
  padding: 24px;
  border-radius: var(--raio-p);
  border: 1px solid var(--linha);
  display: grid;
  gap: 16px;
}
.propostas-painel__form-titulo { font-family: var(--fonte-titulo); font-size: 18px; }
.propostas-painel__form-acoes { display: flex; gap: 10px; }
.propostas-painel__erro { font-size: 14px; color: #ff6b6b; }

@media (max-width: 640px) {
  .propostas-painel__item { flex-wrap: wrap; }
  .propostas-painel__texto { flex-basis: 100%; order: 1; }
  .propostas-painel__acoes { order: 2; flex-wrap: wrap; }
}
</style>
