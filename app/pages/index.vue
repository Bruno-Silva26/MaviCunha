<script setup lang="ts">
const { site, candidata } = useSiteContent()
const { siteUrl } = useRuntimeConfig().public

useSeoMeta({
  title: site.titulo,
  description: site.descricao,
  ogType: 'website',
  ogLocale: 'pt_BR',
  ogSiteName: `${candidata.nome} ${candidata.numero}`,
  ogTitle: `${candidata.nome} ${candidata.numero} — ${candidata.cargo} por MS`,
  ogDescription: candidata.slogan,
  ogUrl: siteUrl,
  ogImage: `${siteUrl}${site.ogImage}`,
  twitterCard: 'summary_large_image',
  twitterTitle: `${candidata.nome} ${candidata.numero}`,
  twitterDescription: candidata.slogan,
  twitterImage: `${siteUrl}${site.ogImage}`
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: candidata.nome,
        jobTitle: `Pré-candidata a ${candidata.cargo}`,
        affiliation: candidata.partido,
        address: candidata.local,
        email: `mailto:${candidata.email}`,
        url: siteUrl
      })
    }
  ]
})
</script>

<template>
  <HeroSection />
  <EventsSection />
  <MarqueeBar />
  <AboutSection />
  <ProposalsSection />
  <MissionSection />
  <DonateSection />
  <WhatsappSection />
  <SocialSection />
</template>
