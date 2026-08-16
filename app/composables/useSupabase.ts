import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cliente: SupabaseClient | null = null

/** Cliente Supabase único (chave anônima), usado para ler o conteúdo editorial público. */
export function useSupabase() {
  if (cliente) return cliente

  const { supabaseUrl, supabaseAnonKey } = useRuntimeConfig().public
  cliente = createClient(supabaseUrl, supabaseAnonKey)
  return cliente
}
