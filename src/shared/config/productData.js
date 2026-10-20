export const SPIN_COST = 12

export const productInfo = {
  brand: 'LootForge',
  tagline: 'A roleta mais suspeita de Arkanor Online',
  pitch:
    'Deposite saldo, gire a roleta e tente ganhar skins lendárias. Se perder, o valor vai embora. Se ganhar, ainda precisa pagar o valor da skin para resgatá-la. Sem letras miúdas, sem rodeios: só risco.',
}

export const benefits = [
  {
    title: 'Economia de tempo no grind',
    text: 'Em vez de farmar 30 horas de raid, você perde dinheiro em poucos segundos.',
  },
  {
    title: 'Skins exclusivas de evento',
    text: 'Coleção com visual draconiano, steampunk e celestial, disponível somente na roleta.',
  },
  {
    title: 'Sistema de risco total',
    text: 'Você sabe exatamente a regra: para girar, paga; para ganhar, também paga.',
  },
  {
    title: 'Experiência dramática',
    text: 'Animação rápida, resultado instantâneo e histórico da sua sorte (ou azar).',
  },
]

export const skins = [
  {
    name: 'Armadura Fênix Rubra',
    rarity: 'Mística',
    flavor: 'Asas em chamas e acabamento em ouro velho.',
    price: 64,
    visual: 'RF',
    color: '#e2552d',
  },
  {
    name: 'Manto do Vazio Astral',
    rarity: 'Lendária',
    flavor: 'Partículas cósmicas e brilho etéreo.',
    price: 78,
    visual: 'VA',
    color: '#e3a21f',
  },
  {
    name: 'Katana Circuito Neon',
    rarity: 'Épica',
    flavor: 'Efeito de pulso azul para duelos noturnos.',
    price: 41,
    visual: 'CN',
    color: '#9a5ce6',
  },
  {
    name: 'Escudo Tempestade Obsidiana',
    rarity: 'Rara',
    flavor: 'Raios violeta e textura vulcânica.',
    price: 33,
    visual: 'TO',
    color: '#3f8fe0',
  },
]

// 20 casas na roleta: 7 com skin e 13 vazias (7 de 20 = 35% de chance por giro).
// Quanto mais rara a skin, menos casas ela ocupa.
export const wheelSlots = [
  null, null, 'Escudo Tempestade Obsidiana', null, null,
  'Katana Circuito Neon', null, null, 'Armadura Fênix Rubra', null,
  null, 'Escudo Tempestade Obsidiana', null, null, 'Manto do Vazio Astral',
  null, null, 'Katana Circuito Neon', null, 'Escudo Tempestade Obsidiana',
]

export const steps = [
  'Deposite saldo na carteira da roleta.',
  'Cada giro custa R$ 12,00 e é descontado na hora.',
  'Se não sair prêmio, o valor do giro é perdido.',
  'Se sair skin, pague o valor dela para resgatá-la.',
]

export const testimonials = [
  {
    player: 'Nyra, guilda Eclipse',
    quote: 'Perdi seis giros seguidos. Experiência autêntica de MMO.',
  },
  {
    player: 'ThorgalBR, servidor Solis',
    quote: 'Ganhei uma skin e paguei de novo para pegar. 10/10 em economia quebrada.',
  },
  {
    player: 'LumiHex, speedrunner',
    quote: 'Visual lindo, regras absurdas, interface perfeita para sofrer sorrindo.',
  },
]

export const faq = [
  {
    question: 'Por que preciso pagar para girar e para resgatar?',
    answer:
      'Porque o giro dá o direito de tentar a sorte, e o resgate é a taxa de entrega da skin. São duas cobranças, e ambas aparecem antes de você girar.',
  },
  {
    question: 'Posso sacar o saldo que depositei?',
    answer:
      'Não. Depois de depositado, o valor vira saldo de giro e não pode ser sacado.',
  },
  {
    question: 'O saldo expira?',
    answer:
      'Não expira. Mas, com a roleta, ele costuma acabar antes disso.',
  },
  {
    question: 'A chance de prêmio é transparente?',
    answer:
      'Sim. A roleta tem 20 casas, e 7 delas têm skin. Isso dá 35% de chance de prêmio por giro.',
  },
]
