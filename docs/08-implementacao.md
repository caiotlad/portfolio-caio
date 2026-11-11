# Arquitetura

O site é estático. Módulos JavaScript no Node.js geram as páginas; CSS e módulos no navegador cuidam da apresentação e das interações. Não há servidor de aplicação, autenticação, banco de dados ou dependências npm.

## Geração

`scripts/build.mjs` valida os dados dos projetos, gera oito páginas por idioma e copia os arquivos públicos. A saída padrão é `dist/`; `OUTPUT_DIR` permite testar em um diretório separado. Cada build remove a saída anterior para evitar rotas ou arquivos antigos. O gerador recusa diretórios de código e diretórios não vazios que não tenham a identificação de um build.

`BASE_PATH` aplica o subdiretório a links e assets. `SITE_URL` recebe a origem pública e habilita canonical, sitemap, robots indexável e metadados sociais. `.nojekyll` identifica a saída como conteúdo estático pronto.

## Conteúdo e idiomas

Os projetos ficam em `src/data/projects.mjs`, com versões inglesas em `projects.en.mjs`. O dicionário `en.json` traduz a interface durante o build, sem depender de tradução no navegador. IDs e chaves de filtros permanecem estáveis entre idiomas para preservar seções e seleção na URL.

Os templates ficam em `src/pages/`, com componentes compartilhados em `src/components/`. As rotas profundas geram diretórios com `index.html`.

## Navegador

`site.js` inicializa navegação, leitura ativa e os módulos de busca, projetos, tecnologias, movimento e partículas. O HTML contém o conteúdo principal antes da execução desses scripts. O contato usa links reais e clipboard, sem formulário que simule envio.

As fontes vêm do Google Fonts e têm fallback local. O easter egg solicita uma imagem externa somente quando aberto. Os demais diagramas usam HTML, CSS, SVG e canvas.

## Desenvolvimento e testes

O servidor local atende apenas em loopback, serve o diretório de saída e retorna status 404 para rotas ausentes. O modo dev reconstrói `src/` e `public/`. Ele não é necessário para hospedar os arquivos estáticos.

`npm run check` percorre módulos JavaScript e JSON. `npm run build` verifica links locais, âncoras, idioma e tradução. `npm test` gera seu build e executa contratos HTTP e cenários isolados de compartilhamento e geração. Os testes não substituem inspeção visual ou leitor de tela.
