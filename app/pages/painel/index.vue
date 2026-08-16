<script setup lang="ts">
definePageMeta({ layout: 'painel', ssr: false })

useHead({ title: 'Painel — Mavi Cunha 14' })

const { usuario, carregando } = useAuth()
</script>

<template>
  <div class="painel">
    <p v-if="carregando" class="painel__carregando">Carregando…</p>
    <LoginForm v-else-if="!usuario" />
    <PainelDashboard v-else />
  </div>
</template>

<style scoped>
.painel__carregando {
  padding-top: 64px;
  text-align: center;
  color: var(--texto-fraco);
}
</style>
