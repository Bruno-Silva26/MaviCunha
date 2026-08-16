export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@vueuse/nuxt'],

  // Estilos globais: tokens (variáveis) → reset → utilitários. A ordem importa.
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
    '~/assets/css/utilities.css'
  ],

  // Sem prefixo de pasta: <HeroSection /> em vez de <SectionsHeroSection />.
  components: [{ path: '~/components', pathPrefix: false }],

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [
        // SVG primeiro (vetor, nítido em qualquer tamanho); PNG para quem não suporta
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Archivo+Black&display=swap'
        }
      ],
      meta: [{ name: 'theme-color', content: '#0A0A0A' }]
    }
  },

  // Disponível no client via useRuntimeConfig().public.siteUrl
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://mavicunha.com.br',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }
  },

  nitro: {
    prerender: { crawlLinks: true, routes: ['/'] }
  },

  typescript: { strict: true }
})
