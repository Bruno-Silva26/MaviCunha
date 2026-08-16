import type { CandidateRecord, EventoRecord, PropostaRecord } from '~/types/database'

type CandidatoEditavel = Partial<Omit<CandidateRecord, 'id' | 'slug' | 'updated_at'>>
type PropostaEditavel = { titulo: string; descricao: string; ordem: number }
type EventoEditavel = {
  titulo: string
  data_hora: string
  local: string
  endereco: string
  descricao: string
  entrada_info: string
  is_destaque: boolean
}

const MARCADOR_BUCKET = '/candidate-images/'

/** Caminho do objeto no bucket a partir da URL pública salva no banco. */
function caminhoNoBucket(urlPublica: string) {
  const indice = urlPublica.indexOf(MARCADOR_BUCKET)
  return indice === -1 ? null : urlPublica.slice(indice + MARCADOR_BUCKET.length)
}

/** Mutações restritas ao admin autenticado — leitura pública continua em useCandidateData. */
export function useCandidateAdmin() {
  const supabase = useSupabase()

  const atualizarCandidato = async (id: string, valores: CandidatoEditavel) => {
    const { error } = await supabase.from('candidates').update(valores).eq('id', id)
    if (error) throw error
  }

  const enviarImagemHero = async (candidateId: string, imagemAtualUrl: string | null, arquivo: File) => {
    const extensao = arquivo.name.split('.').pop() ?? 'jpg'
    const caminho = `${candidateId}/hero-${Date.now()}.${extensao}`

    const { error: erroUpload } = await supabase.storage
      .from('candidate-images')
      .upload(caminho, arquivo, { cacheControl: '3600' })
    if (erroUpload) throw erroUpload

    const { data } = supabase.storage.from('candidate-images').getPublicUrl(caminho)
    await atualizarCandidato(candidateId, { imagem_url: data.publicUrl })

    if (imagemAtualUrl) {
      const caminhoAntigo = caminhoNoBucket(imagemAtualUrl)
      if (caminhoAntigo) await supabase.storage.from('candidate-images').remove([caminhoAntigo])
    }

    return data.publicUrl
  }

  const criarProposta = async (candidateId: string, valores: PropostaEditavel) => {
    const { error } = await supabase.from('propostas').insert({ candidate_id: candidateId, ...valores })
    if (error) throw error
  }

  const atualizarProposta = async (id: string, valores: Partial<PropostaEditavel>) => {
    const { error } = await supabase.from('propostas').update(valores).eq('id', id)
    if (error) throw error
  }

  const excluirProposta = async (id: string) => {
    const { error } = await supabase.from('propostas').delete().eq('id', id)
    if (error) throw error
  }

  const criarEvento = async (candidateId: string, valores: EventoEditavel) => {
    const { error } = await supabase.from('eventos').insert({ candidate_id: candidateId, ...valores })
    if (error) throw error
  }

  const atualizarEvento = async (id: string, valores: Partial<EventoEditavel>) => {
    const { error } = await supabase.from('eventos').update(valores).eq('id', id)
    if (error) throw error
  }

  const excluirEvento = async (id: string) => {
    const { error } = await supabase.from('eventos').delete().eq('id', id)
    if (error) throw error
  }

  return {
    atualizarCandidato,
    enviarImagemHero,
    criarProposta,
    atualizarProposta,
    excluirProposta,
    criarEvento,
    atualizarEvento,
    excluirEvento
  }
}

export type { CandidatoEditavel, EventoEditavel, EventoRecord, PropostaEditavel, PropostaRecord }
