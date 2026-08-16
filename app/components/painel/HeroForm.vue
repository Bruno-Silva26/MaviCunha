<script setup lang="ts">
const { candidate, refresh } = await useCandidateData()
const { atualizarCandidato, enviarImagemHero } = useCandidateAdmin()

const CAMPOS = [
  'badge_1',
  'badge_2',
  'titulo_1',
  'titulo_2',
  'subtitulo',
  'descricao',
  'botao_1_texto',
  'botao_1_link',
  'botao_2_texto',
  'botao_2_link'
] as const

const form = reactive<Record<(typeof CAMPOS)[number], string>>({
  badge_1: '', badge_2: '', titulo_1: '', titulo_2: '', subtitulo: '', descricao: '',
  botao_1_texto: '', botao_1_link: '', botao_2_texto: '', botao_2_link: ''
})

function sincronizarComCandidato() {
  if (!candidate.value) return
  for (const campo of CAMPOS) form[campo] = candidate.value[campo] ?? ''
}
watch(candidate, sincronizarComCandidato, { immediate: true })

const sujo = computed(() => {
  if (!candidate.value) return false
  return CAMPOS.some((campo) => form[campo] !== (candidate.value?.[campo] ?? ''))
})

const arquivoImagem = ref<File | null>(null)
const urlPreview = computed(() => {
  if (arquivoImagem.value) return URL.createObjectURL(arquivoImagem.value)
  return candidate.value?.imagem_url ?? null
})

function selecionarImagem(evento: Event) {
  const input = evento.target as HTMLInputElement
  arquivoImagem.value = input.files?.[0] ?? null
}

const salvando = ref(false)
const mensagem = ref<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)

async function salvar() {
  if (!candidate.value) return
  salvando.value = true
  mensagem.value = null

  try {
    if (arquivoImagem.value) {
      await enviarImagemHero(candidate.value.id, candidate.value.imagem_url, arquivoImagem.value)
      arquivoImagem.value = null
    }
    await atualizarCandidato(candidate.value.id, { ...form })
    await refresh()
    mensagem.value = { tipo: 'sucesso', texto: 'Hero atualizado com sucesso.' }
  } catch {
    mensagem.value = { tipo: 'erro', texto: 'Não foi possível salvar. Tente novamente.' }
  } finally {
    salvando.value = false
  }
}
</script>

<template>
  <form v-if="candidate" class="hero-form" @submit.prevent="salvar">
    <div class="hero-form__grade">
      <div class="hero-form__campos">
        <div class="hero-form__linha">
          <BaseInput v-model="form.badge_1" label="Badge 1" />
          <BaseInput v-model="form.badge_2" label="Badge 2" />
        </div>

        <div class="hero-form__linha">
          <BaseInput v-model="form.titulo_1" label="Título 1 (primeiro nome)" />
          <BaseInput v-model="form.titulo_2" label="Título 2 (sobrenome)" />
        </div>

        <BaseInput v-model="form.subtitulo" label="Subtítulo" />
        <BaseTextarea v-model="form.descricao" label="Descrição" :linhas="4" />

        <div class="hero-form__linha">
          <BaseInput v-model="form.botao_1_texto" label="Texto do botão 1" />
          <LinkField v-model="form.botao_1_link" label="Link do botão 1" />
        </div>

        <div class="hero-form__linha">
          <BaseInput v-model="form.botao_2_texto" label="Texto do botão 2" />
          <LinkField v-model="form.botao_2_link" label="Link do botão 2" />
        </div>
      </div>

      <div class="hero-form__imagem">
        <span class="campo__rotulo">Imagem principal</span>
        <div class="hero-form__preview">
          <img v-if="urlPreview" :src="urlPreview" alt="Prévia da imagem do hero">
        </div>
        <label class="hero-form__upload">
          Escolher nova imagem
          <input type="file" accept="image/*" class="sr-only" @change="selecionarImagem">
        </label>
      </div>
    </div>

    <p v-if="mensagem" class="hero-form__mensagem" :class="`hero-form__mensagem--${mensagem.tipo}`">
      {{ mensagem.texto }}
    </p>

    <BaseButton tipo="submit" variante="solido" :disabled="salvando || (!sujo && !arquivoImagem)" class="hero-form__salvar">
      {{ salvando ? 'Salvando…' : 'Salvar' }}
    </BaseButton>
  </form>
</template>

<style scoped>
.hero-form__grade {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 40px;
}

.hero-form__campos { display: grid; gap: 20px; }
.hero-form__linha { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 20px; }

.hero-form__imagem { display: grid; gap: 10px; align-content: start; }

.hero-form__preview {
  aspect-ratio: 1200 / 1800;
  border-radius: var(--raio-p);
  overflow: hidden;
  background: var(--vidro);
  border: 1px solid var(--linha);
}
.hero-form__preview img { width: 100%; height: 100%; object-fit: contain; object-position: bottom center; }

.hero-form__upload {
  padding: 12px 18px;
  border-radius: var(--raio-pill);
  border: 1px solid var(--linha);
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color var(--transicao), color var(--transicao);
}
.hero-form__upload:hover { border-color: var(--amarelo); color: var(--amarelo); }

.hero-form__mensagem { margin-top: 24px; font-size: 14px; }
.hero-form__mensagem--sucesso { color: var(--amarelo); }
.hero-form__mensagem--erro { color: #ff6b6b; }

.hero-form__salvar { margin-top: 28px; }

@media (max-width: 720px) {
  .hero-form__grade { grid-template-columns: 1fr; }
}
</style>
