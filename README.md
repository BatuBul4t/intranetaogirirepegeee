# Aogiri Net 2001

Projeto estático feito para GitHub Pages.

## Publicar

1. Crie um repositório novo no GitHub.
2. Extraia o ZIP.
3. Envie todo o conteúdo da pasta `aogiri-net-2001` para a raiz do repositório.
4. Abra `Settings > Pages`.
5. Em `Build and deployment`, escolha `Deploy from a branch`.
6. Selecione `main` e `/ (root)`.
7. Salve.

## Onde editar conteúdo

- `assets/js/data/articles.js`: artigos usados pelo buscador.
- `assets/js/data/searches.js`: histórico e sugestões de pesquisa.
- `assets/js/data/forum.js`: boards, threads e posts iniciais.
- `assets/js/data/sites.js`: diretório de sites.
- `articles/`: páginas HTML individuais.
- `sites/`: páginas separadas inspiradas na web do começo dos anos 2000.

## Exemplo de artigo

```js
{
  id: "meu-artigo",
  title: "Título",
  category: "Categoria",
  site: "Yahoo! Japan",
  date: "2001-09-20",
  keywords: ["palavra", "outra"],
  summary: "Resumo curto.",
  body: "Texto completo."
}
```

O fórum salva threads e respostas no `localStorage` do navegador. Como GitHub Pages é estático, posts não são compartilhados entre visitantes.

Este é um projeto fictício e não oficial. As páginas simuladas não têm vínculo com os sites e marcas mencionados.
