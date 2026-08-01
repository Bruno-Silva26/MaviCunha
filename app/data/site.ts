/**
 * ⭐ ÚNICO LUGAR PARA EDITAR TEXTOS E LINKS DO SITE.
 * Nenhum componente deve conter texto editorial solto.
 */
import type {
  Candidata,
  Links,
  MenuItem,
  Proposta,
  Rede,
  Rodape,
  SiteMeta,
  Valor
} from '~/types/content'

export const site: SiteMeta = {
  url: 'https://mavicunha.com.br',
  titulo: 'Mavi Cunha 14 — Deputada Federal por Mato Grosso do Sul',
  descricao:
    'Mavi Cunha, pré-candidata a Deputada Federal por Mato Grosso do Sul pelo Partido Missão. Conheça as propostas, apoie a campanha e entre no grupo.',
  ogImage: '/og-image.jpg'
}

export const candidata: Candidata = {
  nome: 'Mavi Cunha',
  primeiroNome: 'Mavi',
  sobrenome: 'Cunha',
  numero: '14',
  partido: 'Partido Missão',
  cargo: 'Deputada Federal',
  local: 'Campo Grande / MS',
  slogan:
    'Coragem para enfrentar o que ninguém quer enfrentar. Uma nova geração disposta a devolver Mato Grosso do Sul às mãos de quem trabalha.',
  email: 'contato@mavicunha.com.br'
}

// Links limpos de parâmetros de rastreio (fbclid, _t, _r…): eles vêm do app onde o
// link foi copiado, não fazem falta e sujam o compartilhamento.
export const links: Links = {
  vaquinha: 'https://queroapoiar.com.br/mavi-cunha',
  whatsappGrupo: 'https://chat.whatsapp.com/IwesuN4xAlNLuRQxRAbCjv',
  whatsappDireto: 'https://chat.whatsapp.com/IwesuN4xAlNLuRQxRAbCjv',
  instagram: 'https://www.instagram.com/mavicunhaaa/',
  tiktok: 'https://www.tiktok.com/@mavi.cunha14',
  youtube: '#',
  twitter: '#',
  facebook: '#',
  livroAmarelo: 'https://lp.livroamarelo.com/'
}

export const menu: MenuItem[] = [
  { rotulo: 'Quem é', href: '#quem' },
  { rotulo: 'Propostas', href: '#propostas' },
  { rotulo: 'A Missão', href: '#missao' },
  { rotulo: 'Vaquinha', href: '#apoie' },
  { rotulo: 'Redes', href: '#redes' }
]

export const marquee: string[] = [
  'O futuro é glorioso',
  'Coragem',
  'Verdade',
  'Trabalho',
  'Campo Grande merece mais',
  'Missão 14'
]

export const hero = {
  selo: 'Candidata 2026',
  ctaPrimario: 'Apoiar a campanha',
  ctaSecundario: 'Ver as propostas'
}

export const sobre = {
  eyebrow: 'Quem é ela',
  titulo: ['quem é Mavi Cunha?'],
  paragrafos: [
    'Texto provisório para o layout. Aqui entra a história dela: de onde veio, o que faz, o que a trouxe para a política e por que decidiu disputar uma vaga na Câmara dos Deputados por Mato Grosso do Sul.',
    'Um segundo parágrafo com a virada: o incômodo que virou ação e o compromisso que ela assume com quem confiar o voto.'
  ],
  destaque: 'O futuro é glorioso.'
}

export const valores: Valor[] = [
  { titulo: 'Coragem', texto: 'Não foge do debate difícil, nem quando custa caro.' },
  { titulo: 'Responsabilidade', texto: 'Respeito às leis, aos limites e ao dinheiro do contribuinte.' },
  { titulo: 'Proximidade', texto: 'Escuta as pessoas e transforma indignação em ação.' }
]

export const propostasSecao = {
  eyebrow: 'Bandeiras',
  titulo: 'A luta que carrego comigo',
  intro:
    'Texto provisório: compromissos concretos, sem rodeio e sem promessa vazia. Cada um vira projeto, emenda ou voto na Câmara.'
}

export const propostas: Proposta[] = [
  { titulo: 'Segurança para viver em paz', texto: 'Texto provisório da proposta. Explicação curta do problema e da solução defendida.' },
  { titulo: 'Defesa da mulher', texto: 'Texto provisório da proposta. Explicação curta do problema e da solução defendida.' },
  { titulo: 'Menos imposto, mais emprego', texto: 'Texto provisório da proposta. Explicação curta do problema e da solução defendida.' }
]

export const missao = {
  titulo: 'Quer saber mais? Conheça o Livro Amarelo',
  texto:
    'Mais do que um livro, é o projeto da Missão para o Brasil: uma iniciativa que transforma os anseios e as frustrações da nova geração de brasileiros num plano concreto de reconstrução e desenvolvimento do país. É esse plano que Mavi Cunha leva para Brasília.',
  cta: 'Conhecer o Livro Amarelo',
  pilares: [
    'Diagnóstico dos maiores desafios do Brasil',
    'Propostas práticas, com quem paga a conta em mente',
    'Uma visão de futuro para a nova geração'
  ]
}

export const doacao = {
  eyebrow: 'Vaquinha eleitoral',
  titulo: 'Essa campanha é feita com o seu dinheiro não com o do fundo',
  descricao:
    'Sem fundo eleitoral, cada real vem de quem acredita. As doações seguem integralmente a legislação eleitoral vigente.',
  valores: ['R$ 25', 'R$ 50', 'R$ 100'],
  outroValor: 'outro valor',
  cta: 'Doar na vaquinha'
}

export const grupo = {
  eyebrow: 'Grupos de WhatsApp',
  titulo: 'Entre no grupo e faça parte',
  texto:
    'Texto provisório: é no grupo que a campanha acontece. Avisos, agenda, material para divulgar e conversa direta com a equipe.',
  cta: 'Entrar no grupo do WhatsApp'
}

export const redesSecao = {
  eyebrow: 'Acompanhe',
  titulo: 'Minhas redes',
  intro: 'O dia a dia da campanha, sem filtro de imprensa. Siga, comente e compartilhe.'
}

export const redes: Rede[] = [
  { sigla: 'IG', nome: 'Instagram', handle: '@mavicunha', href: links.instagram },
  { sigla: 'TT', nome: 'TikTok', handle: '@mavicunha', href: links.tiktok },
  { sigla: 'WA', nome: 'WhatsApp', handle: 'Grupo de apoio', href: links.whatsappDireto, destaque: true }
]

export const rodape: Rodape = {
  sobre:
    'Pré-candidata a Deputada Federal por Mato Grosso do Sul pelo Partido Missão. O futuro é glorioso.',
  legais: [
    { rotulo: 'Contato', href: '#grupo' }
  ]
}
