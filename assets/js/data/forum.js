const FORUM_BOARDS = [
  {
    "id": "general",
    "name": "雑談 / Geral",
    "description": "Conversas aleatórias e vida cotidiana"
  },
  {
    "id": "occult",
    "name": "オカルト / Ocultismo",
    "description": "Relatos estranhos, rumores e conspirações"
  },
  {
    "id": "tech",
    "name": "PC / Internet",
    "description": "Computadores, rede, programação e hardware"
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
const FORUM_THREADS_SEED = [
  {
    "id": 1001,
    "board": "general",
    "title": "o que vocês fazem pra se divertirem?",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/14 23:41",
        "text": "Eu literalmente não sei o que as pessoas fazem quando não estão trabalhando."
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/14 23:43",
        "text": "Videogame, fliperama, música, sair com alguém, qualquer coisa."
      },
      {
        "id": 3,
        "author": "名無しさん",
        "date": "2001/09/14 23:45",
        "text": "Se você nunca fez nada disso, começa por uma coisa só."
      }
    ]
  },
  {
    "id": 1002,
    "board": "occult",
    "title": "acho que um ghoul me seguiu no último trem",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/15 01:08",
        "text": "Peguei o último trem e alguém ficou atrás de mim por três quarteirões."
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/15 01:09",
        "text": "Provavelmente outra pessoa indo para casa."
      },
      {
        "id": 3,
        "author": "名無しさん",
        "date": "2001/09/15 01:11",
        "text": "É exatamente isso que um ghoul diria."
      }
    ]
  },
  {
    "id": 1003,
    "board": "occult",
    "title": "teorias da conspiração sobre a CCG",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/16 00:14",
        "text": "Tem alguém compilando os boatos sobre famílias ligadas à CCG?"
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/16 00:17",
        "text": "Metade dessas histórias começou aqui mesmo."
      },
      {
        "id": 3,
        "author": "名無しさん",
        "date": "2001/09/16 00:19",
        "text": "Isso nunca impediu ninguém de acreditar."
      }
    ]
  },
  {
    "id": 1004,
    "board": "games",
    "title": "Sou o Rei do pinball, meu score é de 39780!",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/17 18:12",
        "text": "39780. Quero ver passar."
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/17 18:15",
        "text": "Meu irmão tem 200 mil."
      },
      {
        "id": 3,
        "author": "名無しさん",
        "date": "2001/09/17 18:18",
        "text": "9 milhões é impossível. Quem fez isso tá trapaceando."
      }
    ]
  },
  {
    "id": 1005,
    "board": "tech",
    "title": "Pentium 4 é realmente melhor?",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/18 20:02",
        "text": "Vale trocar meu Pentium III agora?"
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/18 20:04",
        "text": "Depende do software. Não compra só pelo número do clock."
      },
      {
        "id": 3,
        "author": "名無しさん",
        "date": "2001/09/18 20:06",
        "text": "Imagine um cluster Beowulf disso."
      }
    ]
  },
  {
    "id": 1006,
    "board": "anime",
    "title": "que isso de desenho? onde vocês acham esses personagens?",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/19 17:40",
        "text": "Tem um monte de wallpaper e eu não sei o nome de ninguém."
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/19 17:44",
        "text": "Procura por anime e entra nos diretórios de fanart."
      }
    ]
  },
  {
    "id": 1007,
    "board": "books",
    "title": "Só pessoas burras liem livro",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/20 22:11",
        "text": "eu não sou burro, eu apenas escrevi errado, normal"
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/20 22:12",
        "text": "Você acabou de provar o contrário."
      },
      {
        "id": 3,
        "author": "名無しさん",
        "date": "2001/09/20 22:15",
        "text": "HUMANOS MALDITOS, PAREM DE ME IRRITAR"
      }
    ]
  },
  {
    "id": 1008,
    "board": "general",
    "title": "É sério que hentai de tentáculos te deixa mais inteligente?",
    "posts": [
      {
        "id": 1,
        "author": "名無しさん",
        "date": "2001/09/21 01:20",
        "text": "Eu só consigo me sentir desconfortável."
      },
      {
        "id": 2,
        "author": "名無しさん",
        "date": "2001/09/21 01:22",
        "text": "Não. Quem te falou isso estava te zoando."
      }
    ]
  }
];
