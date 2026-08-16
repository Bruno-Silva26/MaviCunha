/** Contratos do conteúdo editorial do site. */

export interface Candidata {
  nome: string
  primeiroNome: string
  sobrenome: string
  numero: string
  partido: string
  cargo: string
  local: string
  slogan: string
  email: string
}

export interface SiteMeta {
  url: string
  titulo: string
  descricao: string
  ogImage: string
}

export interface MenuItem {
  rotulo: string
  href: string
}

export interface Valor {
  titulo: string
  texto: string
}

export interface Rede {
  sigla: string
  nome: string
  handle: string
  href: string
  destaque?: boolean
}

export interface LinkLegal {
  rotulo: string
  href: string
}

export interface Rodape {
  sobre: string
  legais: LinkLegal[]
}

export interface Links {
  vaquinha: string
  whatsappGrupo: string
  whatsappDireto: string
  instagram: string
  tiktok: string
  youtube: string
  twitter: string
  facebook: string
  livroAmarelo: string
}
