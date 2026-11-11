# DW3 - Atividade 02 - Consumo de API com React e Next.js

Fatec Registro – Curso: DSM – Disciplina: Desenvolvimento Web III – Prof. Diego Max

Aplicação front-end em **React + Next.js** que consome a API pública e aberta
[The Rick and Morty API](https://rickandmortyapi.com) (sem autenticação).

## Páginas (rotas)

| Rota | Descrição |
| --- | --- |
| `/` | Catálogo (lista de cards) com imagem, nome e espécie de cada personagem, com paginação. Cada card é clicável. |
| `/personagem/[id]` | Detalhes completos do personagem, buscados na API pelo identificador, com botão para voltar ao catálogo. |

## Endpoints utilizados

- Listagem: `GET https://rickandmortyapi.com/api/character?page=1`
- Detalhe por identificador: `GET https://rickandmortyapi.com/api/character/{id}`

## Como rodar o projeto

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```
src/
├── components/
│   ├── CatalogContent/     # catálogo de cards + paginação (página "/")
│   ├── CharacterDetails/   # detalhes do personagem (página "/personagem/[id]")
│   ├── Container/
│   ├── Footer/
│   ├── Loading/
│   └── Menu/
├── pages/
│   ├── index.js
│   └── personagem/[id].js
└── styles/globals.css
```
