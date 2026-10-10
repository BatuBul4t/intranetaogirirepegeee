# Aogiri Net 2001 — Supabase Realtime Edition

Projeto estático para GitHub Pages com fórum anônimo global e comentários globais via Supabase.

## Já configurado no frontend

- Project URL: `https://xklxpjposqndxesnsttv.supabase.co`
- Publishable key: incluída em `assets/js/config.js`
- 60 artigos CCG + artigos extras
- Arquivo CCG pesquisável por categoria
- Fórum global com boards
- Threads e respostas em tempo real
- IDs anônimos por navegador
- Contador de usuários online via Presence
- Comentários em artigos em tempo real
- Busca e sugestões
- Histórico local
- Páginas simuladas CCG, 2channel, Google e Yahoo!

## Único passo obrigatório no Supabase

1. Abra seu projeto no Supabase.
2. Entre em **SQL Editor**.
3. Abra o arquivo `sql/setup.sql` deste projeto.
4. Copie tudo, cole no SQL Editor e clique em **Run**.

O script cria as tabelas, índices, RLS, policies, trigger de bump e ativa Realtime.

## Subir para o GitHub

Extraia este ZIP por cima da pasta do seu repositório e rode:

```bat
git add .
git commit -m "Supabase realtime forum + CCG archive"
git push
```

O GitHub Pages atualizará depois do push.

## Segurança

A chave no frontend é a **publishable key**, própria para uso público com RLS.
Nunca coloque `service_role`, senha do banco ou connection string no repositório.

O fórum está configurado como anônimo e público. Qualquer visitante pode ler e criar posts, mas não pode editar ou apagar registros através das policies atuais.


## Artigos comunitários

A versão atual permite que qualquer visitante publique artigos diretamente pelo site.

Os artigos:
- ficam salvos no Supabase;
- aparecem para todos os visitantes;
- atualizam a lista em tempo real;
- aceitam título, categoria, fonte, data exibida, resumo, texto completo e tags;
- recebem um ID anônimo do navegador que publicou.

Depois de atualizar o projeto, execute novamente `sql/setup.sql` no SQL Editor do Supabase para criar a tabela `community_articles` e ativar o Realtime dela.
