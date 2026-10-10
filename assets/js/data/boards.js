const FORUM_BOARDS = [
  {
    "id": "general",
    "name": "雑談 / Geral",
    "description": "Conversas aleatórias, trabalho e vida cotidiana"
  },
  {
    "id": "ccg",
    "name": "CCG / Notícias",
    "description": "Notícias, investigadores e operações"
  },
  {
    "id": "occult",
    "name": "オカルト / Ocultismo",
    "description": "Rumores, ghouls e relatos estranhos"
  },
  {
    "id": "ward20",
    "name": "20区 / Distrito 20",
    "description": "Boatos e ocorrências locais"
  },
  {
    "id": "tech",
    "name": "PC / Internet",
    "description": "Computadores, programação, rede e hardware"
  },
  {
    "id": "games",
    "name": "ゲーム / Games",
    "description": "Arcade, consoles e jogos de PC"
  },
  {
    "id": "anime",
    "name": "アニメ / Anime",
    "description": "Anime, mangá e fanart"
  },
  {
    "id": "books",
    "name": "読書 / Livros",
    "description": "Leitura, história e filosofia"
  }
];
const SEED_THREADS = [
  {
    "board": "general",
    "title": "o que vocês fazem pra se divertirem?",
    "posts": [
      "Eu literalmente não sei o que as pessoas fazem quando não estão trabalhando.",
      "Videogame, fliperama, música, sair com alguém, qualquer coisa.",
      "Se você nunca fez nada disso, começa por uma coisa só."
    ]
  },
  {
    "board": "occult",
    "title": "acho que um ghoul me seguiu no último trem",
    "posts": [
      "Peguei o último trem e alguém ficou atrás de mim por três quarteirões.",
      "Provavelmente outra pessoa indo para casa.",
      "É exatamente isso que um ghoul diria."
    ]
  },
  {
    "board": "ccg",
    "title": "vocês confiam mesmo nos investigadores da CCG?",
    "posts": [
      "Pergunta séria. Sempre tem operação e ninguém explica nada.",
      "Eles não vão publicar relatório completo no jornal, né.",
      ">>2 então como a gente sabe quando o bairro tá realmente seguro?"
    ]
  },
  {
    "board": "ccg",
    "title": "operação enorme perto da estação",
    "posts": [
      "Tem viatura e bloqueio desde o fim da tarde.",
      "Qual estação?",
      "Não vou postar endereço exato. É perto do Distrito 13.",
      "Boa. Não transforma o fórum em mapa em tempo real."
    ]
  },
  {
    "board": "occult",
    "title": "teorias da conspiração sobre a família Washuu",
    "posts": [
      "Alguém está juntando os rumores antigos?",
      "Metade veio deste board.",
      "Isso nunca impediu ninguém de acreditar."
    ]
  },
  {
    "board": "ward20",
    "title": "Anteiku está seguro hoje à noite?",
    "posts": [
      "Preciso passar pela região depois do trabalho.",
      "Tem movimento normal por enquanto.",
      "Só evita rua vazia como em qualquer noite."
    ]
  },
  {
    "board": "ccg",
    "title": "alguém já viu um quinque de perto?",
    "posts": [
      "Só em foto de jornal.",
      "Meu primo diz que parecem bem diferentes do que aparece na TV.",
      "fonte: primo"
    ]
  },
  {
    "board": "ccg",
    "title": "arquivos antigos somem do site da CCG",
    "posts": [
      "Tinha uma página sobre um caso e agora dá erro.",
      "Pode ser migração do servidor.",
      "Ou alguém não queria a página online."
    ]
  },
  {
    "board": "games",
    "title": "Sou o Rei do pinball, meu score é de 39780!",
    "posts": [
      "39780. Quero ver passar.",
      "Meu irmão tem 200 mil.",
      "9 milhões é impossível quem fez isso tá trapaceando!"
    ]
  },
  {
    "board": "tech",
    "title": "Pentium 4 é realmente melhor?",
    "posts": [
      "Vale trocar meu Pentium III agora?",
      "Depende do software. Não compra só pelo número do clock.",
      "Imagine um Beowulf cluster of these..."
    ]
  },
  {
    "board": "anime",
    "title": "que isso de desenho? onde vocês acham esses personagens?",
    "posts": [
      "Tem um monte de wallpaper e eu não sei o nome de ninguém.",
      "Procura por anime e entra nos diretórios de fanart."
    ]
  },
  {
    "board": "books",
    "title": "Só pessoas burras liem livro",
    "posts": [
      "eu não sou burro, eu apenas escrevi errado, normal",
      "Você acabou de provar o contrário.",
      "HUMANOS MALDITOS, PAREM DE ME IRRITAR"
    ]
  },
  {
    "board": "general",
    "title": "como vocês fazem amigos?",
    "posts": [
      "Não existe tutorial.",
      "Frequentar o mesmo lugar ajuda.",
      "Então é só aparecer várias vezes até alguém falar comigo?",
      "Não desse jeito assustador."
    ]
  },
  {
    "board": "ccg",
    "title": "investigador desaparecido no Distrito 11?",
    "posts": [
      "Ouvi isso de duas pessoas hoje.",
      "Nenhum jornal publicou.",
      "Então por enquanto é rumor."
    ]
  },
  {
    "board": "occult",
    "title": "ghouls podem ser felizes?",
    "posts": [
      "Pergunta estranha pra esse board.",
      "Talvez do mesmo jeito que qualquer um: tendo alguém e algum lugar seguro.",
      "Essa resposta foi séria demais pra 2ch."
    ]
  },
  {
    "board": "ward20",
    "title": "barulhos nos telhados de madrugada",
    "posts": [
      "Mais alguém escuta isso perto das lojas?",
      "Gato.",
      "Isso seria um gato enorme.",
      "Então dois gatos."
    ]
  },
  {
    "board": "tech",
    "title": "Napster morreu?",
    "posts": [
      "Tá cada vez mais difícil achar coisa.",
      "WinMX.",
      "Kazaa?",
      "Não confio em metade desses programas."
    ]
  },
  {
    "board": "games",
    "title": "Halo parece bom mesmo?",
    "posts": [
      "Li review na IGN.",
      "Eu só quero saber quando vou conseguir um Xbox.",
      "PS2 já tem jogo demais pra eu trocar agora."
    ]
  },
  {
    "board": "anime",
    "title": "Hellsing alguém viu?",
    "posts": [
      "Vi imagens e parece bom.",
      "Tem vampiro e arma enorme. Internet vai gostar."
    ]
  },
  {
    "board": "general",
    "title": "quantos segundos de silêncio numa conversa ficam estranhos?",
    "posts": [
      "Você cronometra conversa?",
      "Responde a pergunta.",
      "Não existe número exato, robô."
    ]
  }
];
