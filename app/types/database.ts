/** Contratos das tabelas do Supabase (conteúdo editável pelo painel). */

export interface CandidateRecord {
  id: string
  slug: string
  badge_1: string | null
  badge_2: string | null
  titulo_1: string | null
  titulo_2: string | null
  subtitulo: string | null
  descricao: string | null
  botao_1_texto: string | null
  botao_1_link: string | null
  botao_2_texto: string | null
  botao_2_link: string | null
  imagem_url: string | null
  updated_at: string
}

export interface PropostaRecord {
  id: string
  candidate_id: string
  titulo: string
  descricao: string | null
  ordem: number
  created_at: string
}

export interface EventoRecord {
  id: string
  candidate_id: string
  titulo: string
  data_hora: string
  local: string | null
  endereco: string | null
  descricao: string | null
  entrada_info: string | null
  is_destaque: boolean
  created_at: string
}
