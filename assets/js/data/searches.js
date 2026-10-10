const SEARCH_HISTORY_SEED = [
  {
    "id": 1,
    "query": "como morar sozinho no Japão sendo menor de idade",
    "engine": "Google",
    "date": "2001-01-01 18:00"
  },
  {
    "id": 2,
    "query": "onde conseguir moradia barata no Japão",
    "engine": "Yahoo!",
    "date": "2001-02-02 19:07"
  },
  {
    "id": 3,
    "query": "quanto custa alugar um apartamento pequeno em Tóquio?",
    "engine": "Yahoo! Japan",
    "date": "2001-03-03 20:14"
  },
  {
    "id": 4,
    "query": "como conseguir emprego no Japão sem experiência",
    "engine": "2channel",
    "date": "2001-04-04 21:21"
  },
  {
    "id": 5,
    "query": "empreiteiras contratando ajudantes de pedreiro em Tóquio",
    "engine": "Google",
    "date": "2001-05-05 22:28"
  },
  {
    "id": 6,
    "query": "quanto ganha um pedreiro por dia no Japão em 2001",
    "engine": "Yahoo!",
    "date": "2001-06-06 23:35"
  },
  {
    "id": 7,
    "query": "como conseguir trabalho em uma obra sem saber construir",
    "engine": "Yahoo! Japan",
    "date": "2001-07-07 18:42"
  },
  {
    "id": 8,
    "query": "quais documentos são necessários para conseguir emprego",
    "engine": "2channel",
    "date": "2001-08-08 19:49"
  },
  {
    "id": 9,
    "query": "como conseguir documentos sem levantar suspeitas",
    "engine": "Google",
    "date": "2001-09-09 20:56"
  },
  {
    "id": 10,
    "query": "como fazer um currículo se minha única habilidade é lutar",
    "engine": "Yahoo!",
    "date": "2001-10-10 21:03"
  },
  {
    "id": 11,
    "query": "se eu conseguir levantar um carro posso pedir um salário maior?",
    "engine": "Yahoo! Japan",
    "date": "2001-01-11 22:10"
  },
  {
    "id": 12,
    "query": "como conversar com pessoas sem parecer estranho?",
    "engine": "2channel",
    "date": "2001-02-12 23:17"
  },
  {
    "id": 13,
    "query": "como fazer amigos depois de passar a vida isolado?",
    "engine": "Google",
    "date": "2001-03-13 18:24"
  },
  {
    "id": 14,
    "query": "como saber se alguém está brincando ou falando sério?",
    "engine": "Yahoo!",
    "date": "2001-04-14 19:31"
  },
  {
    "id": 15,
    "query": "o que as pessoas fazem quando não estão trabalhando?",
    "engine": "Yahoo! Japan",
    "date": "2001-05-15 20:38"
  },
  {
    "id": 16,
    "query": "por que eu perco tantas lutas?",
    "engine": "2channel",
    "date": "2001-06-16 21:45"
  },
  {
    "id": 17,
    "query": "como melhorar o controle da ponta de uma lança",
    "engine": "Google",
    "date": "2001-07-17 22:52"
  },
  {
    "id": 18,
    "query": "exercícios de movimentação dos pés para combate com lança",
    "engine": "Yahoo!",
    "date": "2001-08-18 23:59"
  },
  {
    "id": 19,
    "query": "como treinar precisão com a lança sem destruir tudo ao redor",
    "engine": "Yahoo! Japan",
    "date": "2001-09-19 18:06"
  },
  {
    "id": 20,
    "query": "como tomar decisões melhores sob pressão",
    "engine": "2channel",
    "date": "2001-10-20 19:13"
  },
  {
    "id": 21,
    "query": "choujin x",
    "engine": "Google",
    "date": "2001-01-21 20:20"
  },
  {
    "id": 22,
    "query": "como ser igual o tokio de choujin x",
    "engine": "Yahoo!",
    "date": "2001-02-22 21:27"
  },
  {
    "id": 23,
    "query": "o que são peitos?",
    "engine": "Yahoo! Japan",
    "date": "2001-03-23 22:34"
  },
  {
    "id": 24,
    "query": "por que as pessoas acham peitos atraentes?",
    "engine": "2channel",
    "date": "2001-04-24 23:41"
  },
  {
    "id": 25,
    "query": "deitar em peitos realmente é como deitar em nuvens?",
    "engine": "Google",
    "date": "2001-05-25 18:48"
  },
  {
    "id": 26,
    "query": "Hentai sem tentáculos",
    "engine": "Yahoo!",
    "date": "2001-06-26 19:55"
  },
  {
    "id": 27,
    "query": "Hentai inteligente",
    "engine": "Yahoo! Japan",
    "date": "2001-07-27 20:02"
  },
  {
    "id": 28,
    "query": "Hentai esperto",
    "engine": "2channel",
    "date": "2001-08-01 21:09"
  },
  {
    "id": 29,
    "query": "Hentai",
    "engine": "Google",
    "date": "2001-09-02 22:16"
  },
  {
    "id": 30,
    "query": "O que é hentai?",
    "engine": "Yahoo!",
    "date": "2001-10-03 23:23"
  },
  {
    "id": 31,
    "query": "Whitehouse.com",
    "engine": "Yahoo! Japan",
    "date": "2001-01-04 18:30"
  },
  {
    "id": 32,
    "query": "Gekiga",
    "engine": "2channel",
    "date": "2001-02-05 19:37"
  },
  {
    "id": 33,
    "query": "DMM Digital Media Mart",
    "engine": "Google",
    "date": "2001-03-06 20:44"
  },
  {
    "id": 34,
    "query": "Hentai é legalizado?",
    "engine": "Yahoo!",
    "date": "2001-04-07 21:51"
  },
  {
    "id": 35,
    "query": "Como consertar um PC?",
    "engine": "Yahoo! Japan",
    "date": "2001-05-08 22:58"
  },
  {
    "id": 36,
    "query": "Como fazer um PC?",
    "engine": "2channel",
    "date": "2001-06-09 23:05"
  },
  {
    "id": 37,
    "query": "Como funciona a Internet?",
    "engine": "Google",
    "date": "2001-07-10 18:12"
  },
  {
    "id": 38,
    "query": "Como consertar uma esteira",
    "engine": "Yahoo!",
    "date": "2001-08-11 19:19"
  },
  {
    "id": 39,
    "query": "como consertar uma esteira de correr",
    "engine": "Yahoo! Japan",
    "date": "2001-09-12 20:26"
  },
  {
    "id": 40,
    "query": "como consertar uma esteira de correr em cima dela",
    "engine": "2channel",
    "date": "2001-10-13 21:33"
  },
  {
    "id": 41,
    "query": "como funciona uma esteira ergométrica",
    "engine": "Google",
    "date": "2001-01-14 22:40"
  },
  {
    "id": 42,
    "query": "como é uma esteira ergométrica por dentro",
    "engine": "Yahoo!",
    "date": "2001-02-15 23:47"
  },
  {
    "id": 43,
    "query": "partes de esteiras ergométricas",
    "engine": "Yahoo! Japan",
    "date": "2001-03-16 18:54"
  },
  {
    "id": 44,
    "query": "como deixar mais rápido a esteira ergométrica",
    "engine": "2channel",
    "date": "2001-04-17 19:01"
  },
  {
    "id": 45,
    "query": "como trocar as peças da esteira ergométrica",
    "engine": "Google",
    "date": "2001-05-18 20:08"
  },
  {
    "id": 46,
    "query": "ferramentas necessárias para manutenção de uma esteira ergométrica",
    "engine": "Yahoo!",
    "date": "2001-06-19 21:15"
  },
  {
    "id": 47,
    "query": "tenho medo do mundo, como posso melhorar?",
    "engine": "Yahoo! Japan",
    "date": "2001-07-20 22:22"
  },
  {
    "id": 48,
    "query": "tem como deixar de ser ghoul?",
    "engine": "2channel",
    "date": "2001-08-21 23:29"
  },
  {
    "id": 49,
    "query": "ghouls podem ser felizes?",
    "engine": "Google",
    "date": "2001-09-22 18:36"
  },
  {
    "id": 50,
    "query": "o que é Washuu?",
    "engine": "Yahoo!",
    "date": "2001-10-23 19:43"
  },
  {
    "id": 51,
    "query": "Rei Amanai",
    "engine": "Yahoo! Japan",
    "date": "2001-01-24 20:50"
  },
  {
    "id": 52,
    "query": "Rei Amanai Washuu",
    "engine": "2channel",
    "date": "2001-02-25 21:57"
  },
  {
    "id": 53,
    "query": "Rei Washuu",
    "engine": "Google",
    "date": "2001-03-26 22:04"
  },
  {
    "id": 54,
    "query": "Projeto Senkii",
    "engine": "Yahoo!",
    "date": "2001-04-27 23:11"
  },
  {
    "id": 55,
    "query": "como não ficar triste diante do vazio existencial?",
    "engine": "Yahoo! Japan",
    "date": "2001-05-01 18:18"
  },
  {
    "id": 56,
    "query": "o que significa sentir desconforto no peito?",
    "engine": "2channel",
    "date": "2001-06-02 19:25"
  },
  {
    "id": 57,
    "query": "ideias de presentes para um amigo ghoul",
    "engine": "Google",
    "date": "2001-07-03 20:32"
  },
  {
    "id": 58,
    "query": "melhores países para viajar",
    "engine": "Yahoo!",
    "date": "2001-08-04 21:39"
  },
  {
    "id": 59,
    "query": "valor de viagem pra italia",
    "engine": "Yahoo! Japan",
    "date": "2001-09-05 22:46"
  },
  {
    "id": 60,
    "query": "Valor de viagem pro Hawaii",
    "engine": "2channel",
    "date": "2001-10-06 23:53"
  },
  {
    "id": 61,
    "query": "Valor de viagem pro Nepal",
    "engine": "Google",
    "date": "2001-01-07 18:00"
  },
  {
    "id": 62,
    "query": "Valor de viagem pra Tailândia",
    "engine": "Yahoo!",
    "date": "2001-02-08 19:07"
  },
  {
    "id": 63,
    "query": "Valor de viagem pra Argentina",
    "engine": "Yahoo! Japan",
    "date": "2001-03-09 20:14"
  },
  {
    "id": 64,
    "query": "Valor de viagem pro Brazil",
    "engine": "2channel",
    "date": "2001-04-10 21:21"
  },
  {
    "id": 65,
    "query": "como abrir uma esteira ergométrica",
    "engine": "Google",
    "date": "2001-05-11 22:28"
  },
  {
    "id": 66,
    "query": "teorias da conspiração sobre a CCG",
    "engine": "Yahoo!",
    "date": "2001-06-12 23:35"
  },
  {
    "id": 67,
    "query": "Ontem peguei o último trem e acho que fui perseguido por um ghoul até em casa",
    "engine": "Yahoo! Japan",
    "date": "2001-07-13 18:42"
  },
  {
    "id": 68,
    "query": "Alguém sabe se o distrito da Anteiku está seguro hoje à noite?",
    "engine": "2channel",
    "date": "2001-08-14 19:49"
  },
  {
    "id": 69,
    "query": "Densha Otoko",
    "engine": "Google",
    "date": "2001-09-15 20:56"
  },
  {
    "id": 70,
    "query": "É sério que hentai de tentáculos te deixa mais inteligente?",
    "engine": "Yahoo!",
    "date": "2001-10-16 21:03"
  },
  {
    "id": 71,
    "query": "Lunar Toons Space Jam",
    "engine": "Yahoo! Japan",
    "date": "2001-01-17 22:10"
  },
  {
    "id": 72,
    "query": "o que vocês fazem pra se divertirem?",
    "engine": "2channel",
    "date": "2001-02-18 23:17"
  },
  {
    "id": 73,
    "query": "O que é visual novel?",
    "engine": "Google",
    "date": "2001-03-19 18:24"
  },
  {
    "id": 74,
    "query": "P2P Ita",
    "engine": "Yahoo!",
    "date": "2001-04-20 19:31"
  },
  {
    "id": 75,
    "query": "Eroge ita",
    "engine": "Yahoo! Japan",
    "date": "2001-05-21 20:38"
  },
  {
    "id": 76,
    "query": "fractais artes abstratas",
    "engine": "2channel",
    "date": "2001-06-22 21:45"
  },
  {
    "id": 77,
    "query": "Skinning",
    "engine": "Google",
    "date": "2001-07-23 22:52"
  },
  {
    "id": 78,
    "query": "wallpapers pixelados",
    "engine": "Yahoo!",
    "date": "2001-08-24 23:59"
  },
  {
    "id": 79,
    "query": "FanArts de Sailor Moon Dragon Ball",
    "engine": "Yahoo! Japan",
    "date": "2001-09-25 18:06"
  },
  {
    "id": 80,
    "query": "que isso de desenho? Onde vocês acham esses personagens?",
    "engine": "2channel",
    "date": "2001-10-26 19:13"
  },
  {
    "id": 81,
    "query": "o que é anime?",
    "engine": "Google",
    "date": "2001-01-27 20:20"
  },
  {
    "id": 82,
    "query": "top 10 melhores animes",
    "engine": "Yahoo!",
    "date": "2001-02-01 21:27"
  },
  {
    "id": 83,
    "query": "the prince of tennis",
    "engine": "Yahoo! Japan",
    "date": "2001-03-02 22:34"
  },
  {
    "id": 84,
    "query": "Hellsing",
    "engine": "2channel",
    "date": "2001-04-03 23:41"
  },
  {
    "id": 85,
    "query": "Fruits Basket",
    "engine": "Google",
    "date": "2001-05-04 18:48"
  },
  {
    "id": 86,
    "query": "Preços de TV",
    "engine": "Yahoo!",
    "date": "2001-06-05 19:55"
  },
  {
    "id": 87,
    "query": "Lojas de eletrônicos",
    "engine": "Yahoo! Japan",
    "date": "2001-07-06 20:02"
  },
  {
    "id": 88,
    "query": "News for Nerds Stuff that Matters",
    "engine": "2channel",
    "date": "2001-08-07 21:09"
  },
  {
    "id": 89,
    "query": "Lançamento do Windows XP",
    "engine": "Google",
    "date": "2001-09-08 22:16"
  },
  {
    "id": 90,
    "query": "Hardware do Xbox e Nintendo GameCube",
    "engine": "Yahoo!",
    "date": "2001-10-09 23:23"
  },
  {
    "id": 91,
    "query": "Pirataria no Napster",
    "engine": "Yahoo! Japan",
    "date": "2001-01-10 18:30"
  },
  {
    "id": 92,
    "query": "Pico's School",
    "engine": "2channel",
    "date": "2001-02-11 19:37"
  },
  {
    "id": 93,
    "query": "Destroy the Britney Spears",
    "engine": "Google",
    "date": "2001-03-12 20:44"
  },
  {
    "id": 94,
    "query": "Xiao Xiao",
    "engine": "Yahoo!",
    "date": "2001-04-13 21:51"
  },
  {
    "id": 95,
    "query": "Clock Crew",
    "engine": "Yahoo! Japan",
    "date": "2001-05-14 22:58"
  },
  {
    "id": 96,
    "query": "Madness Combat",
    "engine": "2channel",
    "date": "2001-06-15 23:05"
  },
  {
    "id": 97,
    "query": "Dating Sim Ganguro Girl",
    "engine": "Google",
    "date": "2001-07-16 18:12"
  },
  {
    "id": 98,
    "query": "Criar UIN ICQ",
    "engine": "Yahoo!",
    "date": "2001-08-17 19:19"
  },
  {
    "id": 99,
    "query": "Pesquisar por usuários ghouls",
    "engine": "Yahoo! Japan",
    "date": "2001-09-18 20:26"
  },
  {
    "id": 100,
    "query": "procurar por pessoas aleatórias no ICQ",
    "engine": "2channel",
    "date": "2001-10-19 21:33"
  },
  {
    "id": 101,
    "query": "chat com estranhos",
    "engine": "Google",
    "date": "2001-01-20 22:40"
  },
  {
    "id": 102,
    "query": "ICQ Yahoo Messenger MSN Messenger",
    "engine": "Yahoo!",
    "date": "2001-02-21 23:47"
  },
  {
    "id": 103,
    "query": "Napster pesquisar músicas",
    "engine": "Yahoo! Japan",
    "date": "2001-03-22 18:54"
  },
  {
    "id": 104,
    "query": "Eminem",
    "engine": "2channel",
    "date": "2001-04-23 19:01"
  },
  {
    "id": 105,
    "query": "Utada Hikaru",
    "engine": "Google",
    "date": "2001-05-24 20:08"
  },
  {
    "id": 106,
    "query": "Ayumi Hamasaki",
    "engine": "Yahoo!",
    "date": "2001-06-25 21:15"
  },
  {
    "id": 107,
    "query": "vazamento O Senhor dos Anéis A Sociedade do Anel",
    "engine": "Yahoo! Japan",
    "date": "2001-07-26 22:22"
  },
  {
    "id": 108,
    "query": "Star Wars Episódio II Ataque dos Clones",
    "engine": "2channel",
    "date": "2001-08-27 23:29"
  },
  {
    "id": 109,
    "query": "Talk Back Marvel",
    "engine": "Google",
    "date": "2001-09-01 18:36"
  },
  {
    "id": 110,
    "query": "reviews de Halo",
    "engine": "Yahoo!",
    "date": "2001-10-02 19:43"
  },
  {
    "id": 111,
    "query": "PS2 irá revolucionar",
    "engine": "Yahoo! Japan",
    "date": "2001-01-03 20:50"
  },
  {
    "id": 112,
    "query": "GTA III",
    "engine": "2channel",
    "date": "2001-02-04 21:57"
  },
  {
    "id": 113,
    "query": "baixando Kana Imōto",
    "engine": "Google",
    "date": "2001-03-05 22:04"
  },
  {
    "id": 114,
    "query": "como ler",
    "engine": "Yahoo!",
    "date": "2001-04-06 23:11"
  },
  {
    "id": 115,
    "query": "como ler sem se sentir entediado",
    "engine": "Yahoo! Japan",
    "date": "2001-05-07 18:18"
  },
  {
    "id": 116,
    "query": "como prestar atenção",
    "engine": "2channel",
    "date": "2001-06-08 19:25"
  },
  {
    "id": 117,
    "query": "qual o sentido da vida?",
    "engine": "Google",
    "date": "2001-07-09 20:32"
  },
  {
    "id": 118,
    "query": "10 top livros fáceis de ler",
    "engine": "Yahoo!",
    "date": "2001-08-10 21:39"
  },
  {
    "id": 119,
    "query": "Só pessoas burras leem livro",
    "engine": "Yahoo! Japan",
    "date": "2001-09-11 22:46"
  },
  {
    "id": 120,
    "query": "Ghouls bebem leite?",
    "engine": "2channel",
    "date": "2001-10-12 23:53"
  },
  {
    "id": 121,
    "query": "sistema digestivo",
    "engine": "Google",
    "date": "2001-01-13 18:00"
  },
  {
    "id": 122,
    "query": "anatomia ghoul",
    "engine": "Yahoo!",
    "date": "2001-02-14 19:07"
  },
  {
    "id": 123,
    "query": "anatomia humana",
    "engine": "Yahoo! Japan",
    "date": "2001-03-15 20:14"
  },
  {
    "id": 124,
    "query": "como joga chess?",
    "engine": "2channel",
    "date": "2001-04-16 21:21"
  },
  {
    "id": 125,
    "query": "Como vencer chess?",
    "engine": "Google",
    "date": "2001-05-17 22:28"
  },
  {
    "id": 126,
    "query": "como ficar inteligente",
    "engine": "Yahoo!",
    "date": "2001-06-18 23:35"
  },
  {
    "id": 127,
    "query": "como estudar?",
    "engine": "Yahoo! Japan",
    "date": "2001-07-19 18:42"
  },
  {
    "id": 128,
    "query": "o que é estudar?",
    "engine": "2channel",
    "date": "2001-08-20 19:49"
  },
  {
    "id": 129,
    "query": "C++",
    "engine": "Google",
    "date": "2001-09-21 20:56"
  },
  {
    "id": 130,
    "query": "Perl",
    "engine": "Yahoo!",
    "date": "2001-10-22 21:03"
  },
  {
    "id": 131,
    "query": "Lojas de eletrônicos no Japão",
    "engine": "Yahoo! Japan",
    "date": "2001-01-23 22:10"
  },
  {
    "id": 132,
    "query": "onde fica Akihabara",
    "engine": "2channel",
    "date": "2001-02-24 23:17"
  },
  {
    "id": 133,
    "query": "Projeto Gutenberg",
    "engine": "Google",
    "date": "2001-03-25 18:24"
  },
  {
    "id": 134,
    "query": "A História da Guerra do Peloponeso Tucídides",
    "engine": "Yahoo!",
    "date": "2001-04-26 19:31"
  },
  {
    "id": 135,
    "query": "A Ilíada",
    "engine": "Yahoo! Japan",
    "date": "2001-05-27 20:38"
  },
  {
    "id": 136,
    "query": "The Officer's Manual Napoleon's Maxims of War",
    "engine": "2channel",
    "date": "2001-06-01 21:45"
  },
  {
    "id": 137,
    "query": "Sun Tzu A Arte da Guerra",
    "engine": "Google",
    "date": "2001-07-02 22:52"
  },
  {
    "id": 138,
    "query": "como se concentrar para ler?",
    "engine": "Yahoo!",
    "date": "2001-08-03 23:59"
  },
  {
    "id": 139,
    "query": "mapa de Tokyo",
    "engine": "Yahoo! Japan",
    "date": "2001-09-04 18:06"
  },
  {
    "id": 140,
    "query": "programação em Flash",
    "engine": "2channel",
    "date": "2001-10-05 19:13"
  },
  {
    "id": 141,
    "query": "como saber se alguém está com medo de mim",
    "engine": "Google",
    "date": "2001-01-06 20:20"
  },
  {
    "id": 142,
    "query": "como pedir desculpas direito",
    "engine": "Yahoo!",
    "date": "2001-02-07 21:27"
  },
  {
    "id": 143,
    "query": "como saber se uma pessoa é minha amiga",
    "engine": "Yahoo! Japan",
    "date": "2001-03-08 22:34"
  },
  {
    "id": 144,
    "query": "como convidar alguém para comer",
    "engine": "2channel",
    "date": "2001-04-09 23:41"
  },
  {
    "id": 145,
    "query": "restaurantes baratos em Tóquio",
    "engine": "Google",
    "date": "2001-05-10 18:48"
  },
  {
    "id": 146,
    "query": "como fazer café",
    "engine": "Yahoo!",
    "date": "2001-06-11 19:55"
  },
  {
    "id": 147,
    "query": "cafeterias abertas de madrugada em Tóquio",
    "engine": "Yahoo! Japan",
    "date": "2001-07-12 20:02"
  },
  {
    "id": 148,
    "query": "como costurar uma camisa rasgada",
    "engine": "2channel",
    "date": "2001-08-13 21:09"
  },
  {
    "id": 149,
    "query": "como escolher roupas normais",
    "engine": "Google",
    "date": "2001-09-14 22:16"
  },
  {
    "id": 150,
    "query": "como começar uma conversa",
    "engine": "Yahoo!",
    "date": "2001-10-15 23:23"
  },
  {
    "id": 151,
    "query": "assuntos normais para conversar",
    "engine": "Yahoo! Japan",
    "date": "2001-01-16 18:30"
  },
  {
    "id": 152,
    "query": "coisas que jovens fazem no fim de semana",
    "engine": "2channel",
    "date": "2001-02-17 19:37"
  },
  {
    "id": 153,
    "query": "arcades baratos em Tóquio",
    "engine": "Google",
    "date": "2001-03-18 20:44"
  },
  {
    "id": 154,
    "query": "como jogar DDR",
    "engine": "Yahoo!",
    "date": "2001-04-19 21:51"
  },
  {
    "id": 155,
    "query": "melhores jogos de Dreamcast",
    "engine": "Yahoo! Japan",
    "date": "2001-05-20 22:58"
  },
  {
    "id": 156,
    "query": "vale a pena comprar PlayStation 2",
    "engine": "2channel",
    "date": "2001-06-21 23:05"
  },
  {
    "id": 157,
    "query": "GameCube lançamento Japão",
    "engine": "Google",
    "date": "2001-07-22 18:12"
  },
  {
    "id": 158,
    "query": "Xbox lançamento Japão",
    "engine": "Yahoo!",
    "date": "2001-08-23 19:19"
  },
  {
    "id": 159,
    "query": "como montar computador barato",
    "engine": "Yahoo! Japan",
    "date": "2001-09-24 20:26"
  },
  {
    "id": 160,
    "query": "Pentium 3 vs Pentium 4",
    "engine": "2channel",
    "date": "2001-10-25 21:33"
  },
  {
    "id": 161,
    "query": "GeForce 2 preço",
    "engine": "Google",
    "date": "2001-01-26 22:40"
  },
  {
    "id": 162,
    "query": "como funciona modem 56k",
    "engine": "Yahoo!",
    "date": "2001-02-27 23:47"
  },
  {
    "id": 163,
    "query": "o que é banda larga",
    "engine": "Yahoo! Japan",
    "date": "2001-03-01 18:54"
  },
  {
    "id": 164,
    "query": "como criar homepage",
    "engine": "2channel",
    "date": "2001-04-02 19:01"
  },
  {
    "id": 165,
    "query": "HTML para iniciantes",
    "engine": "Google",
    "date": "2001-05-03 20:08"
  },
  {
    "id": 166,
    "query": "JavaScript tutorial",
    "engine": "Yahoo!",
    "date": "2001-06-04 21:15"
  },
  {
    "id": 167,
    "query": "como funciona servidor web",
    "engine": "Yahoo! Japan",
    "date": "2001-07-05 22:22"
  },
  {
    "id": 168,
    "query": "o que é Linux",
    "engine": "2channel",
    "date": "2001-08-06 23:29"
  },
  {
    "id": 169,
    "query": "como instalar Linux",
    "engine": "Google",
    "date": "2001-09-07 18:36"
  },
  {
    "id": 170,
    "query": "C ou C++ primeiro",
    "engine": "Yahoo!",
    "date": "2001-10-08 19:43"
  },
  {
    "id": 171,
    "query": "computadores podem pensar",
    "engine": "Yahoo! Japan",
    "date": "2001-01-09 20:50"
  },
  {
    "id": 172,
    "query": "teste de Turing",
    "engine": "2channel",
    "date": "2001-02-10 21:57"
  },
  {
    "id": 173,
    "query": "livros de filosofia para iniciantes",
    "engine": "Google",
    "date": "2001-03-11 22:04"
  },
  {
    "id": 174,
    "query": "o universo tem fim",
    "engine": "Yahoo!",
    "date": "2001-04-12 23:11"
  },
  {
    "id": 175,
    "query": "como entender emoções",
    "engine": "Yahoo! Japan",
    "date": "2001-05-13 18:18"
  },
  {
    "id": 176,
    "query": "lista de emoções humanas",
    "engine": "2channel",
    "date": "2001-06-14 19:25"
  },
  {
    "id": 177,
    "query": "por que pessoas riem",
    "engine": "Google",
    "date": "2001-07-15 20:32"
  },
  {
    "id": 178,
    "query": "o que é sarcasmo",
    "engine": "Yahoo!",
    "date": "2001-08-16 21:39"
  },
  {
    "id": 179,
    "query": "diferença ironia sarcasmo",
    "engine": "Yahoo! Japan",
    "date": "2001-09-17 22:46"
  },
  {
    "id": 180,
    "query": "hobbies baratos",
    "engine": "2channel",
    "date": "2001-10-18 23:53"
  },
  {
    "id": 181,
    "query": "como desenhar rostos",
    "engine": "Google",
    "date": "2001-01-19 18:00"
  },
  {
    "id": 182,
    "query": "câmeras digitais baratas",
    "engine": "Yahoo!",
    "date": "2001-02-20 19:07"
  },
  {
    "id": 183,
    "query": "como gravar CD",
    "engine": "Yahoo! Japan",
    "date": "2001-03-21 20:14"
  },
  {
    "id": 184,
    "query": "como funciona MP3",
    "engine": "2channel",
    "date": "2001-04-22 21:21"
  },
  {
    "id": 185,
    "query": "o que é Winamp",
    "engine": "Google",
    "date": "2001-05-23 22:28"
  },
  {
    "id": 186,
    "query": "skins Winamp",
    "engine": "Yahoo!",
    "date": "2001-06-24 23:35"
  },
  {
    "id": 187,
    "query": "wallpaper 1024x768",
    "engine": "Yahoo! Japan",
    "date": "2001-07-25 18:42"
  },
  {
    "id": 188,
    "query": "como fazer pixel art",
    "engine": "2channel",
    "date": "2001-08-26 19:49"
  },
  {
    "id": 189,
    "query": "como fazer GIF",
    "engine": "Google",
    "date": "2001-09-27 20:56"
  },
  {
    "id": 190,
    "query": "Macromedia Flash tutorial",
    "engine": "Yahoo!",
    "date": "2001-10-01 21:03"
  },
  {
    "id": 191,
    "query": "como funciona Newgrounds",
    "engine": "Yahoo! Japan",
    "date": "2001-01-02 22:10"
  },
  {
    "id": 192,
    "query": "como fazer jogo em Flash",
    "engine": "2channel",
    "date": "2001-02-03 23:17"
  },
  {
    "id": 193,
    "query": "por que uma pessoa oferece comida para outra?",
    "engine": "Google",
    "date": "2001-03-04 18:24"
  },
  {
    "id": 194,
    "query": "se alguém divide um guarda chuva comigo isso significa alguma coisa?",
    "engine": "Yahoo!",
    "date": "2001-04-05 19:31"
  },
  {
    "id": 195,
    "query": "é rude ficar em silêncio durante uma conversa?",
    "engine": "Yahoo! Japan",
    "date": "2001-05-06 20:38"
  },
  {
    "id": 196,
    "query": "quantos minutos de silêncio são estranhos?",
    "engine": "2channel",
    "date": "2001-06-07 21:45"
  },
  {
    "id": 197,
    "query": "o que significa quando alguém sorri sem mostrar os dentes?",
    "engine": "Google",
    "date": "2001-07-08 22:52"
  },
  {
    "id": 198,
    "query": "abraço quanto tempo normal",
    "engine": "Yahoo!",
    "date": "2001-08-09 23:59"
  },
  {
    "id": 199,
    "query": "como saber quando abraço acabou",
    "engine": "Yahoo! Japan",
    "date": "2001-09-10 18:06"
  }
];
