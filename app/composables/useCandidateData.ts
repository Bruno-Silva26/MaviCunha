import type { CandidateRecord, EventoRecord, PropostaRecord } from '~/types/database'

/** Estrutura pensada para múltiplos candidatos no futuro; hoje só existe este. */
const CANDIDATE_SLUG = 'mavi-cunha'

/**
 * Conteúdo do candidato (hero, propostas e eventos) vindo do Supabase.
 * Mesma chave em toda chamada: o fetch roda uma vez só por request/build.
 */
export async function useCandidateData() {
  const supabase = useSupabase()

  const { data, refresh } = await useAsyncData('candidate-content', async () => {
    const { data: candidate, error: candidateError } = await supabase
      .from('candidates')
      .select('*')
      .eq('slug', CANDIDATE_SLUG)
      .single()

    if (candidateError) throw candidateError

    const [{ data: propostas }, { data: eventos }] = await Promise.all([
      supabase
        .from('propostas')
        .select('*')
        .eq('candidate_id', candidate.id)
        .order('ordem', { ascending: true }),
      supabase
        .from('eventos')
        .select('*')
        .eq('candidate_id', candidate.id)
        .order('data_hora', { ascending: true })
    ])

    return {
      candidate: candidate as CandidateRecord,
      propostas: (propostas ?? []) as PropostaRecord[],
      eventos: (eventos ?? []) as EventoRecord[]
    }
  })

  return {
    candidate: computed(() => data.value?.candidate ?? null),
    propostas: computed(() => data.value?.propostas ?? []),
    eventos: computed(() => data.value?.eventos ?? []),
    refresh
  }
}
