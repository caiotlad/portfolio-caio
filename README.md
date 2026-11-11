# Caio Teixeira — Portfólio

Meu portfólio reúne projetos e experiências em produto, requisitos, dados e software. Sou estudante de Ciência da Computação na UFLA e atuo com produto, requisitos e qualidade no GEDAI.

O site tem versões em português e inglês, quatro estudos de caso e um currículo para leitura e impressão. Os projetos mostram o problema, minha participação, as decisões e as evidências disponíveis.

## Executar

Use **Node.js 22.12 ou superior**. Não há dependências para instalar.

```sh
git clone https://github.com/caiotlad/portfolio-caio.git
cd portfolio-caio
npm run dev
```

Abra http://127.0.0.1:4321/. O servidor acompanha `src/` e `public/`; recarregue a página após editar. Alterações no servidor exigem reiniciar o comando.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Gera o site e inicia o servidor com acompanhamento de arquivos |
| `npm run check` | Confere a sintaxe de todos os módulos JavaScript e arquivos JSON |
| `npm run build` | Gera `dist/` e verifica rotas, assets, âncoras e traduções |
| `npm test` | Gera o build e executa os testes automatizados |
| `npm run preview` | Serve o build local; gera um se ele ainda não existir |

## Estrutura

O gerador usa módulos JavaScript nativos no Node.js. Os templates produzem HTML completo; os scripts no navegador acrescentam interações. Esse formato atende ao conteúdo do site sem um framework ou uma etapa de instalação.

| Caminho | Conteúdo |
| --- | --- |
| `src/data/projects.mjs` e `projects.en.mjs` | Projetos e estudos de caso nos dois idiomas |
| `src/data/en.json` | Traduções dos textos de interface |
| `src/data/technologies.mjs` | Tecnologias, descrições e projetos associados |
| `src/pages/` | Templates das páginas |
| `src/components/` | Navegação, rodapé, cards, diagramas e diálogos |
| `src/scripts/` | Interações, controle de movimento e canvas |
| `src/styles/global.css` | Estilos, animações e layouts responsivos |
| `public/` | Favicon e imagem de compartilhamento |
| `scripts/` | Build, servidor e verificações |
| `tests/` | Testes de HTTP, build e compartilhamento |

## Navegação e interações

- Catálogo com busca, filtros combinados e seleção preservada na URL.
- Estudos de caso com resumo, índice de leitura e cópia do link.
- Busca por projetos e seções com `Ctrl+K` ou `Command+K`.
- Tecnologias exploráveis por mouse, teclado e toque.
- Partículas em canvas, diagramas animados e efeitos de entrada.
- Controle para pausar animações e respeito a `prefers-reduced-motion`.
- Menu adaptado ao celular, contato por e-mail e currículo imprimível.

As páginas em inglês começam em `/en/`; o controle EN/PT mantém a página equivalente. O conteúdo principal é gerado no HTML e permanece disponível sem JavaScript.

## Publicação

O repositório contém o código-fonte. **O site ainda não está publicado.** Para hospedar, execute o build com a origem pública e o caminho do projeto e publique o conteúdo de `dist/`.

Configuração prevista para este repositório no GitHub Pages:

```sh
SITE_URL=https://caiotlad.github.io BASE_PATH=/portfolio-caio npm run build
```

No PowerShell:

```powershell
$env:SITE_URL = 'https://caiotlad.github.io'
$env:BASE_PATH = '/portfolio-caio'
npm run build
```

`SITE_URL` recebe apenas a origem, sem subdiretório. Para hospedar na raiz de um domínio, use `BASE_PATH=/`. Sem `SITE_URL`, o build local bloqueia indexação em `robots.txt`; com a origem configurada, gera canonical, sitemap e metadados de compartilhamento.

O workflow `.github/workflows/pages.yml` gera, testa e publica `dist/`. Para a primeira publicação:

1. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
2. Em **Actions → Publicar portfólio**, clique em **Run workflow** e selecione `main`.
3. Aguarde os jobs `build` e `deploy` concluírem. O endereço previsto é https://caiotlad.github.io/portfolio-caio/.

Depois da ativação, alterações em `src/`, `public/`, `scripts/` ou `package.json` na `main` atualizam o site automaticamente. Alterações somente em documentação ou no workflow podem ser publicadas pelo botão **Run workflow**.

O workflow em `.github/workflows/check.yml` confere sintaxe e testes na raiz e no subdiretório do GitHub Pages a cada atualização da `main` e em pull requests. Ele não publica o site.

## Conteúdo e créditos

As capas dos projetos são ilustrações conceituais, não capturas das aplicações. O DeuBranco é um projeto coletivo; minha participação está delimitada no estudo de caso. Os números da Olist descrevem a base histórica de 2016–2018.

DM Sans e Instrument Serif são carregadas pelo Google Fonts, com fontes locais de fallback. A descoberta sobre a paleta usa uma ilustração oficial de Rayquaza, carregada do site Pokémon ao abrir o diálogo e acompanhada de crédito. A personagem e a ilustração pertencem aos respectivos titulares.

Referências de apresentação: [Giovane Oliveira](https://giogodoi.github.io/Portfolio/), [Arsh](https://arshjaved.in), [Custard](https://custard.top/en), [Luca Félix](https://luca-felix.com/pt) e [Samrit](https://samrit.dev).

As [fontes do conteúdo](docs/00-fontes-e-evidencias.md), as [decisões de design](docs/04-design.md), a [arquitetura](docs/08-implementacao.md) e os [resultados de validação](docs/validacao.md) detalham as escolhas e os limites do projeto.
