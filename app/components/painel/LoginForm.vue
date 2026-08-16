<script setup lang="ts">
const { entrar } = useAuth()

const email = ref('')
const senha = ref('')
const enviando = ref(false)
const erro = ref('')

async function enviar() {
  enviando.value = true
  erro.value = ''
  try {
    await entrar(email.value, senha.value)
  } catch {
    erro.value = 'E-mail ou senha inválidos.'
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <div class="login">
    <p class="login__eyebrow">Painel administrativo</p>
    <h1 class="login__titulo">Entrar</h1>

    <form class="login__form" @submit.prevent="enviar">
      <BaseInput v-model="email" label="E-mail" tipo="email" obrigatorio autocomplete="username" />
      <BaseInput v-model="senha" label="Senha" tipo="password" obrigatorio autocomplete="current-password" />

      <p v-if="erro" class="login__erro" role="alert">{{ erro }}</p>

      <BaseButton tipo="submit" :disabled="enviando" variante="solido" tamanho="lg" class="login__botao">
        {{ enviando ? 'Entrando…' : 'Entrar' }}
      </BaseButton>
    </form>
  </div>
</template>

<style scoped>
.login { max-width: 380px; margin-inline: auto; padding-top: 64px; }

.login__eyebrow {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--amarelo);
}

.login__titulo {
  margin-top: 12px;
  font-family: var(--fonte-titulo);
  font-size: 40px;
  letter-spacing: -.03em;
}

.login__form { margin-top: 36px; display: grid; gap: 20px; }
.login__erro { font-size: 14px; color: #ff6b6b; }
.login__botao { justify-self: start; }
</style>
