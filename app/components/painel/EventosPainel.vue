<script setup lang="ts">
import type { EventoRecord } from '~/types/database'

const { candidate, eventos, refresh } = await useCandidateData()
const { criarEvento, atualizarEvento, excluirEvento } = useCandidateAdmin()

const EM_BRANCO = {
  titulo: '', data_hora: '', local: '', endereco: '', descricao: '', entrada_info: '', is_destaque: false
}

const idEmEdicao = ref<string | null>(null)
const idConfirmandoExclusao = ref<string | null>(null)
const formAberto = ref(false)
const form = reactive({ ...EM_BRANCO })
const salvando = ref(false)
const erro = ref('')

function paraDatetimeLocal(iso: string) {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

function paraISO(datetimeLocal: string) {
  return new Date(datetimeLocal).toISOString()
}

function formatarQuando(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

function abrirNovo() {
  idEmEdicao.value = null
  Object.assign(form, EM_BRANCO)
  formAberto.value = true
  erro.value = ''
}

function abrirEdicao(evento: EventoRecord) {
  idEmEdicao.value = evento.id
  form.titulo = evento.titulo
  form.data_hora = paraDatetimeLocal(evento.data_hora)
  form.local = evento.local ?? ''
  form.endereco = evento.endereco ?? ''
  form.descricao = evento.descricao ?? ''
  form.entrada_info = evento.entrada_info ?? ''
  form.is_destaque = evento.is_destaque
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
    const valores = { ...form, data_hora: paraISO(form.data_hora) }
    if (idEmEdicao.value) {
      await atualizarEvento(idEmEdicao.value, valores)
    } else {
      await criarEvento(candidate.value.id, valores)
    }
    await refresh()
    fechar()
  } catch {
    erro.value = 'Não foi possível salvar. Verifique a data e tente novamente.'
  } finally {
    salvando.value = false
  }
}

async function excluir(evento: EventoRecord) {
  if (idConfirmandoExclusao.value !== evento.id) {
    idConfirmandoExclusao.value = evento.id
    return
  }
  idConfirmandoExclusao.value = null
  await excluirEvento(evento.id)
  await refresh()
}

async function marcarDestaque(evento: EventoRecord) {
  await atualizarEvento(evento.id, { is_destaque: true })
  await refresh()
}
</script>

<template>
  <div class="eventos-painel">
    <ul class="eventos-painel__lista">
      <li v-for="evento in eventos" :key="evento.id" class="eventos-painel__item">
        <div class="eventos-painel__texto">
          <p class="eventos-painel__titulo">
            {{ evento.titulo }}
            <span v-if="evento.is_destaque" class="eventos-painel__badge">Destaque</span>
          </p>
          <p class="eventos-painel__quando">{{ formatarQuando(evento.data_hora) }}<span v-if="evento.local"> · {{ evento.local }}</span></p>
        </div>
        <div class="eventos-painel__acoes">
          <template v-if="idConfirmandoExclusao === evento.id">
            <button type="button" class="eventos-painel__excluir" @click="excluir(evento)">Confirmar exclusão?</button>
            <button type="button" @click="idConfirmandoExclusao = null">Cancelar</button>
          </template>
          <template v-else>
            <button v-if="!evento.is_destaque" type="button" @click="marcarDestaque(evento)">Marcar destaque</button>
            <button type="button" @click="abrirEdicao(evento)">Editar</button>
            <button type="button" class="eventos-painel__excluir" @click="excluir(evento)">Excluir</button>
          </template>
        </div>
      </li>
      <li v-if="!eventos.length" class="eventos-painel__vazio">Nenhum evento cadastrado ainda.</li>
    </ul>

    <BaseButton v-if="!formAberto" variante="linha" @click="abrirNovo">+ Adicionar evento</BaseButton>

    <form v-else class="eventos-painel__form" @submit.prevent="salvar">
      <h3 class="eventos-painel__form-titulo">{{ idEmEdicao ? 'Editar evento' : 'Novo evento' }}</h3>

      <BaseInput v-model="form.titulo" label="Título" obrigatorio />
      <BaseInput v-model="form.data_hora" label="Data e hora" tipo="datetime-local" obrigatorio />

      <div class="eventos-painel__linha">
        <BaseInput v-model="form.local" label="Local" />
        <BaseInput v-model="form.endereco" label="Endereço" />
      </div>

      <BaseTextarea v-model="form.descricao" label="Descrição" :linhas="3" />
      <BaseInput v-model="form.entrada_info" label="Informação de entrada" placeholder="Ex: Gratuita, sem inscrição" />

      <label class="eventos-painel__destaque">
        <input v-model="form.is_destaque" type="checkbox">
        Marcar como evento em destaque (próximo encontro)
      </label>

      <p v-if="erro" class="eventos-painel__erro" role="alert">{{ erro }}</p>

      <div class="eventos-painel__form-acoes">
        <BaseButton tipo="submit" variante="solido" :disabled="salvando">{{ salvando ? 'Salvando…' : 'Salvar' }}</BaseButton>
        <BaseButton tipo="button" variante="linha" @click="fechar">Cancelar</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.eventos-painel__lista { display: grid; gap: 10px; margin-bottom: 24px; }

.eventos-painel__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: var(--raio-p);
  background: var(--vidro);
}

.eventos-painel__texto { flex: 1; min-width: 0; }
.eventos-painel__titulo { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.eventos-painel__badge {
  padding: 3px 10px;
  border-radius: var(--raio-pill);
  background: var(--amarelo);
  color: var(--preto);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}
.eventos-painel__quando { margin-top: 4px; font-size: 13.5px; color: var(--texto-fraco); }

.eventos-painel__acoes { display: flex; gap: 8px; font-size: 13px; font-weight: 700; flex: none; }
.eventos-painel__acoes button { padding: 8px 14px; border-radius: var(--raio-pill); border: 1px solid var(--linha); white-space: nowrap; }
.eventos-painel__acoes button:hover { border-color: var(--amarelo); color: var(--amarelo); }
.eventos-painel__excluir:hover { border-color: #ff6b6b; color: #ff6b6b; }

.eventos-painel__vazio { padding: 20px; color: var(--texto-fraco); font-size: 14px; }

.eventos-painel__form {
  margin-top: 24px;
  padding: 24px;
  border-radius: var(--raio-p);
  border: 1px solid var(--linha);
  display: grid;
  gap: 16px;
}
.eventos-painel__form-titulo { font-family: var(--fonte-titulo); font-size: 18px; }
.eventos-painel__linha { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 16px; }
.eventos-painel__destaque { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.eventos-painel__form-acoes { display: flex; gap: 10px; }
.eventos-painel__erro { font-size: 14px; color: #ff6b6b; }

@media (max-width: 640px) {
  .eventos-painel__item { flex-wrap: wrap; }
  .eventos-painel__texto { flex-basis: 100%; order: 1; }
  .eventos-painel__acoes { order: 2; flex-wrap: wrap; }
}
</style>
