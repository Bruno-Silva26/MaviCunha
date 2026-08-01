import { useEventListener } from '@vueuse/core'

/**
 * Brilho amarelo que acompanha o cursor dentro de uma área.
 *
 * A posição é escrita direto no `style` do elemento dentro de um
 * `requestAnimationFrame` — de propósito fora da reatividade do Vue, para não
 * disparar re-render a cada pixel de movimento do mouse.
 */
export function usePointerGlow() {
  const area = ref<HTMLElement | null>(null)
  const brilho = ref<HTMLElement | null>(null)
  let frame = 0

  useEventListener(area, 'pointermove', (evento: PointerEvent) => {
    const el = brilho.value
    const container = area.value
    if (!el || !container || evento.pointerType === 'touch') return

    const caixa = container.getBoundingClientRect()
    const x = evento.clientX - caixa.left
    const y = evento.clientY - caixa.top

    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      el.style.opacity = '1'
    })
  })

  useEventListener(area, 'pointerleave', () => {
    cancelAnimationFrame(frame)
    if (brilho.value) brilho.value.style.opacity = '0'
  })

  onScopeDispose(() => cancelAnimationFrame(frame))

  return { area, brilho }
}
