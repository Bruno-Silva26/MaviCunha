<script setup lang="ts">
const { candidata, menu, redes, rodape, links } = useSiteContent()
const ano = new Date().getFullYear()
</script>

<template>
  <footer class="rodape">
    <div class="rodape__grade container">
      <div>
        <LogoMark variante="completa" :rotulo="candidata.nome" />
        <p class="rodape__sobre">{{ rodape.sobre }}</p>
      </div>

      <nav class="coluna" aria-label="Navegar">
        <p class="coluna__titulo">Navegar</p>
        <a v-for="item in menu" :key="item.href" :href="item.href">{{ item.rotulo }}</a>
        <a href="#grupo">Grupo de WhatsApp</a>
      </nav>

      <nav class="coluna" aria-label="Redes sociais">
        <p class="coluna__titulo">Redes</p>
        <a v-for="rede in redes" :key="rede.nome" :href="rede.href" target="_blank" rel="noopener">
          {{ rede.nome }}
        </a>
      </nav>

      <div class="coluna">
        <p class="coluna__titulo">Contato</p>
        <a :href="`mailto:${candidata.email}`">{{ candidata.email }}</a>
        <BaseButton :href="links.whatsappDireto" externo variante="solido" tamanho="sm" class="coluna__btn">
          Chamar no WhatsApp
        </BaseButton>
      </div>
    </div>

    <div class="rodape__base container">
      <p>© {{ ano }} {{ candidata.nome }} · Todos os direitos reservados. </p>
      <div class="rodape__legais">
        <a v-for="legal in rodape.legais" :key="legal.rotulo" :href="legal.href">{{ legal.rotulo }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  border-top: 1px solid rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, rgba(255, 212, 0, .05), transparent 40%);
}

.rodape__grade {
  padding-block: 72px 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 40px 48px;
}

.rodape__sobre {
  margin-top: 20px;
  max-width: 32ch;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--texto-fraco);
}

.coluna { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.coluna a:not(.btn) { font-size: 15px; color: var(--texto-suave); }
.coluna a:not(.btn):hover { color: var(--amarelo); }
.coluna__titulo {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--texto-tenue);
}
.coluna__btn { margin-top: 8px; }

.rodape__base {
  padding-block: 24px 44px;
  border-top: 1px solid rgba(255, 255, 255, .07);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  font-size: 13px;
}
.rodape__base p { color: var(--texto-tenue); }
.rodape__legais { display: flex; flex-wrap: wrap; gap: 24px; }
.rodape__legais a { color: var(--texto-tenue); }
.rodape__legais a:hover { color: var(--amarelo); }
</style>
