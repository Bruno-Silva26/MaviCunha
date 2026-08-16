/**
 * Modo felina: troca a paleta do site para as cores da logo nova
 * (fundo amarelo, rosa como cor secundária). Toda a mudança de cor
 * acontece via variáveis CSS em tokens.css — aqui só ligamos/desligamos
 * o estado e dois efeitos visuais: a transição suave e o "bote" (as
 * garras que cruzam a tela na ativação).
 */
const CHAVE = 'mavi:felina'

export function useFelina() {
  const felina = useState('felina', () => false)
  const transicionando = useState('felina-transicao', () => false)
  const bote = useState('felina-bote', () => false)

  let timerTransicao: ReturnType<typeof setTimeout> | undefined
  let timerBote: ReturnType<typeof setTimeout> | undefined

  function alternar() {
    const ativando = !felina.value

    transicionando.value = true
    clearTimeout(timerTransicao)
    timerTransicao = setTimeout(() => { transicionando.value = false }, 1800)

    if (ativando && import.meta.client && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bote.value = true
      clearTimeout(timerBote)
      timerBote = setTimeout(() => { bote.value = false }, 1400)
    }

    felina.value = ativando

    if (import.meta.client) {
      try { localStorage.setItem(CHAVE, ativando ? '1' : '0') } catch { /* sem storage */ }
    }
  }

  function lerPreferencia() {
    if (!import.meta.client) return
    try {
      if (localStorage.getItem(CHAVE) === '1') felina.value = true
    } catch { /* sem storage */ }
  }

  return { felina, transicionando, bote, alternar, lerPreferencia }
}
