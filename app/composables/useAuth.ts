import type { Session } from '@supabase/supabase-js'

const sessao = ref<Session | null>(null)
const carregando = ref(true)
let iniciado = false

function iniciar() {
  if (iniciado || !import.meta.client) return
  iniciado = true

  const supabase = useSupabase()

  supabase.auth.getSession().then(({ data }) => {
    sessao.value = data.session
    carregando.value = false
  })

  supabase.auth.onAuthStateChange((_evento, novaSessao) => {
    sessao.value = novaSessao
  })
}

/** Sessão do admin (Supabase Auth), compartilhada por todo o painel. */
export function useAuth() {
  iniciar()

  const supabase = useSupabase()

  const entrar = async (email: string, senha: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) throw error
  }

  const sair = () => supabase.auth.signOut()

  return {
    usuario: computed(() => sessao.value?.user ?? null),
    carregando,
    entrar,
    sair
  }
}
