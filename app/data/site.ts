/**
 * ⭐ ÚNICO LUGAR PARA EDITAR TEXTOS E LINKS DO SITE.
 * Nenhum componente deve conter texto editorial solto.
 */
import type {
  Campanha,
  Candidata,
  Links,
  MenuItem,
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
  numero: '1400',
  partido: 'Partido Missão',
  cargo: 'Deputada Federal',
  local: 'Campo Grande / MS',
  slogan:
    'Coragem para enfrentar o que ninguém quer enfrentar. Uma nova geração disposta a devolver Mato Grosso do Sul às mãos de quem trabalha.',
  email: 'contato@mavicunha.com.br',
  cnpj: '68.499.681/0001-18'
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
  { rotulo: '1400', href: '#vote' },
  { rotulo: 'Agenda', href: '#eventos' },
  { rotulo: 'Vaquinha', href: '#apoie' },
  { rotulo: 'Redes', href: '#redes' }
]

// Seção de campanha — só publicar quando a divulgação do número estiver liberada.
export const campanha: Campanha = {
  tarja: 'Campanha 2026 · Deputada Federal',
  numero: '1400',
  chamada: 'Esse é o número dela na urna. Digite 1400, confirme e ajude a levar a Missão para Brasília.'
}

export const marquee: string[] = [
  'O futuro é glorioso',
  'Coragem',
  'Verdade',
  'Trabalho',
  'Campo Grande merece mais',
  'Missão 14'
]

export const sobre = {
  eyebrow: 'Quem é ela',
  titulo: ['quem é Mavi Cunha?'],
  paragrafos: [
    'Nascida e criada na cidade de Campo Grande, filha de doméstica, sempre sonhei em mudar a realidade do Brasil. Iniciei minha vida ativista com apenas 13 anos, já sofri diversos ataques, físicos e morais.',
    'Com apenas 20 anos aceitei o desafio de me candidatar a um cargo federal, não poderia ter feito uma escolha melhor. A ânsia de ver a atual situação do Brasil e não fazer nada pra mudar não faz parte de mim.',
    'Curso duas faculdades, Direito e Ciências Sociais. Um desafio e tanto, até porque trabalho e ainda faço algumas atividades físicas. Mas eu amo essa correria, faz parte de quem sou.',
    'Vamos mudar o Brasil.'
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
    'Compromissos concretos, sem rodeio e sem promessa vazia. Cada um vira projeto, emenda ou voto na Câmara.'
}

export const eventosSecao = {
  eyebrow: 'Agenda',
  titulo: 'Vamos estar juntos',
  intro: 'Encontros, caminhadas e conversas pelo estado. Confira o próximo e os que vêm depois dele.'
}

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
    'É no grupo que a campanha acontece. Avisos, agenda, material para divulgar e conversa direta com a equipe.',
  cta: 'Entrar no grupo do WhatsApp'
}

export const redesSecao = {
  eyebrow: 'Acompanhe',
  titulo: 'Minhas redes',
  intro: 'O dia a dia da campanha, sem filtro de imprensa. Siga, comente e compartilhe.'
}

export const redes: Rede[] = [
  { sigla: 'IG', nome: 'Instagram', handle: '@mavicunhaaa', href: links.instagram },
  { sigla: 'TT', nome: 'TikTok', handle: '@mavicunhaaa._', href: links.tiktok },
  { sigla: 'WA', nome: 'WhatsApp', handle: 'Grupo de apoio', href: links.whatsappDireto, destaque: true }
]

export const rodape: Rodape = {
  sobre:
    'Pré-candidata a Deputada Federal por Mato Grosso do Sul pelo Partido Missão. O futuro é glorioso.',
  legais: [
    { rotulo: 'Contato', href: '#grupo' }
  ]
}
