# Riso de Tela

Catálogo responsivo de comédias brasileiras com sinopses parafraseadas e avaliações de usuários do IMDb. As fontes e a conferência editorial estão em `research/sources.md`.

## Executar localmente

Requer Node.js 18 ou superior; não há dependências externas.

```bash
npm start
```

Abra `http://localhost:3000` no navegador. Para conferir a sintaxe e montar a versão estática:

```bash
npm run check
npm run build
```

O build publica `index.html`, `styles.css`, `script.js`, `manus-routes.json` e `assets/` em `dist/`.

## Estrutura

- `index.html` — estrutura semântica, controles do catálogo e diálogo de detalhes.
- `styles.css` — identidade visual terracota/laranja queimado, responsividade e acessibilidade visual.
- `script.js` — filmes, fontes, busca, filtros, ordenação, seleção aleatória e diálogo.
- `assets/posters/` — cartazes otimizados localmente em WebP.
- `research/sources.md` — sinopses, notas, links e data da conferência.
- `server.js` — servidor estático mínimo para a prévia.

As médias IMDb mostradas no site foram conferidas em 31/10/2026 e podem variar com novas avaliações.
