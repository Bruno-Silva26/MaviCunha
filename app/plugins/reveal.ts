/**
 * Diretiva `v-reveal` — revela o elemento quando ele entra na viewport.
 *
 *   <div v-reveal>…</div>
 *   <div v-reveal="120">…</div>   <!-- atraso em ms -->
 *
 * O estado inicial (invisível) só é aplicado no client, então quem estiver sem JS
 * continua vendo a página inteira.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const observados = new WeakMap<HTMLElement, IntersectionObserver>()

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    mounted(el, binding) {
      const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (semMovimento) return

      if (binding.value) el.style.setProperty('--reveal-atraso', `${binding.value}ms`)
      el.classList.add('reveal-armado')

      const observer = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue
            el.classList.add('reveal-visivel')
            observer.disconnect()
            observados.delete(el)
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )

      observer.observe(el)
      observados.set(el, observer)
    },

    unmounted(el) {
      observados.get(el)?.disconnect()
      observados.delete(el)
    }
  })
})
