import { useWindowScroll, useWindowSize, useDocumentVisibility } from '@vueuse/core'

/**
 * Progresso de leitura da página (0 → 1) e um sinalizador de "já rolou",
 * usado pelo header para ganhar contraste depois do topo.
 */
export function useScrollProgress(limiteHeader = 24) {
  const { y } = useWindowScroll()
  const { height } = useWindowSize()
  useDocumentVisibility() // mantém os valores em dia ao voltar para a aba

  const progresso = computed(() => {
    if (!import.meta.client) return 0
    const total = document.documentElement.scrollHeight - height.value
    if (total <= 0) return 0
    return Math.min(1, Math.max(0, y.value / total))
  })

  const rolou = computed(() => y.value > limiteHeader)

  return { y, progresso, rolou }
}
