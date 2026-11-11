# Caio Teixeira — Portfólio

Site pessoal em **português e inglês** que conecta **produto, requisitos, dados e software**, com apresentação animada, projetos, estudos de caso, experiência e contato.

## Continuar em outra máquina

Repositório privado: [caiotlad/portfolio-caio](https://github.com/caiotlad/portfolio-caio). Autentique-se na sua conta do GitHub para clonar.

```sh
git clone https://github.com/caiotlad/portfolio-caio.git
cd portfolio-caio
npm run dev
```

Use Node.js 22.12 ou superior. Não há dependências npm para instalar. O código, os assets e a documentação são versionados; o build em `dist/` é gerado localmente.

## Abrir localmente

Requisito: **Node.js 22.12 ou superior**. Não é necessário instalar pacotes.

```powershell
npm run dev
```

Acesse **http://127.0.0.1:4321/**. O comando gera o site e acompanha alterações em `src/` e `public/`; recarregue o navegador após editar.

```powershell
npm run check   # sintaxe dos scripts
npm run build   # gera dist/ e verifica links, âncoras e traduções
npm test        # seis testes HTTP/contrato
npm run preview
```

## Idioma, movimento e tecnologias

O inglês começa em **http://127.0.0.1:4321/en/**. EN/PT mantém página, seção e filtros; no celular, a troca fica no menu. Efeitos/Motion pausa as animações, incluindo o canvas, e lembra a escolha. A preferência de movimento reduzido do sistema é respeitada.

A seção Stack/Tecnologias mostra as 21 tecnologias do GitHub e da imagem, com descrições e projetos por hover, teclado ou toque. [Implementação, fontes e conferência](docs/13-idiomas-movimento-tecnologias.md).

Reinicie o servidor para ativar a nova regra de 404 em inglês. As páginas normais e o build são atualizados pelo watcher.

## Experiência implementada

- Composição de partículas em canvas, com rotação, variação de forma na rolagem e resposta ao ponteiro.
- Entrada dos títulos, revelações por seção, indicador de leitura e navegação ativa.
- Projetos com diagramas próprios, profundidade no hover, linhas animadas e elementos flutuantes.
- Fluxo de trabalho com conexões animadas e etapas expansíveis sincronizadas ao diagrama.
- Layouts para desktop, tablet e celular; menu mobile, filtros por área e cópia de e-mail.
- Quatro estudos de caso, catálogo, currículo web imprimível e página 404.
- Preferência de movimento reduzido e pausa de efeitos fora da viewport; conteúdo essencial disponível sem JavaScript.

As capas são **ilustrações conceituais**, não screenshots ou demonstrações de sistemas em execução. O currículo web usa o conteúdo revisado, sem telefone ou meses conflitantes; o botão de impressão permite salvar PDF pelo navegador. O PDF original permanece fora dos arquivos públicos.

O menu Projetos dá acesso direto aos quatro casos, com indicação da página atual. A navegação mobile também lista os casos. [Fluxo revisado e propostas de evolução](docs/12-navegacao-fluxo-e-propostas.md).

O catálogo combina busca e filtros, preserva a seleção na URL e informa a quantidade de resultados. Os estudos de caso têm índice com seção ativa e versão mobile fixa durante a leitura. [Conferência da exploração de projetos](docs/11-exploracao-de-projetos.md).

A navegação também oferece busca por projetos e seções (Ctrl+K / Command+K), retorno ao topo, transições entre páginas e uma descoberta discreta sobre a paleta no rodapé. Os efeitos respeitam movimento reduzido. [Interações e continuidade](docs/10-interacoes-e-continuidade.md).

## Páginas

`/` · `/projetos/` · `/projetos/orderflow/` · `/projetos/olist/` · `/projetos/deubranco/` · `/projetos/cardsort/` · `/curriculo/` · `/404.html`.

Há também oito páginas inglesas: /en/, /en/projects/, os quatro casos em /en/projects/{slug}/, /en/resume/ e /en/404.html.

## Onde editar

| Arquivo | Responsabilidade |
| --- | --- |
| [en.json](src/data/en.json) | Traduções de interface |
| [projects.en.mjs](src/data/projects.en.mjs) | Casos e explorações em inglês |
| [technologies.mjs](src/data/technologies.mjs) | Tecnologias, descrições e associações |
| [motion.js](src/scripts/motion.js) | Controle de movimento e persistência |
| [projects.mjs](src/data/projects.mjs) | Projetos, decisões, contribuição, tecnologias e evidências |
| [home.mjs](src/pages/home.mjs) | Apresentação, processo, experiência e competências |
| [global.css](src/styles/global.css) | Identidade visual, componentes, animações e responsividade |
| [particles.js](src/scripts/particles.js) | Partículas decorativas, ponteiro, rolagem e ciclo de animação |
| [site.js](src/scripts/site.js) | Navegação, filtros, detalhes, cópia e interação |
| [project-experience.js](src/scripts/project-experience.js) | Busca e filtros do catálogo, estado na URL e índice dos estudos de caso |
| [interactions.js](src/scripts/interactions.js) | Busca, diálogos, teclado e revelação da paleta |
| [interactions.mjs](src/components/interactions.mjs) | Pista do rodapé e conteúdo dos diálogos |
| [resume.mjs](src/pages/resume.mjs) | Currículo web e versão para impressão |
| [layout.mjs](src/components/layout.mjs) | Cabeçalho, contato, rodapé e metadados |
| [build.mjs](scripts/build.mjs) | Geração estática, robots e sitemap |

## Arquitetura e publicação

Implementação estática com **Node.js + módulos JavaScript + HTML/CSS**, sem dependências npm. O plano original previa Astro; a instalação foi bloqueada pela rede do ambiente, e a entrega foi adaptada para permanecer executável e verificável. [Registro técnico da implementação](docs/08-implementacao.md).

As fontes Instrument Serif e DM Sans são carregadas pelo Google Fonts quando houver conexão, com Georgia/Segoe UI como fallback. O conteúdo e os efeitos não dependem desse serviço.

Para um build destinado ao GitHub Pages ou outro host estático, informe o domínio efetivo e, se necessário, o subdiretório:

```powershell
$env:SITE_URL = 'https://caiotlad.github.io'
$env:BASE_PATH = '/portfolio'
npm run build
```

Os valores acima são **exemplo**, não uma URL já publicada. Publique o conteúdo de `dist/`. Na raiz de um domínio, use `BASE_PATH=/`. Sem `SITE_URL`, o build local omite canonical e usa `robots.txt` com bloqueio de indexação. Com endereço configurado, gera canonical e sitemap. As rotas profundas são diretórios com `index.html`, compatíveis com hospedagem estática.

O site **não foi publicado** nesta rodada. Não foi configurado domínio ou serviço de hospedagem.

## Verificação realizada

**Estado atual — 11/11/2026:** após o servidor ser iniciado no terminal do usuário, o acesso pelo navegador integrado funcionou. As oito páginas foram examinadas em 1440/768/390/320 px, com novas capturas e testes de teclado e interação. Foram corrigidas sobreposições nas capas de OrderFlow e DeuBranco em telas menores; o menu com rolagem também foi confirmado em 320 × 400 px. Os detalhes desta rodada estão no final do registro 09.

- Sintaxe dos scripts e build: aprovados.
- Dezesseis páginas e 864 referências locais/âncoras: verificadas. A checagem de idiomas conferiu 1.682 textos/atributos e os limites dos casos.
- Nesta revisão, `npm test` foi bloqueado por `EACCES` nas conexões loopback do terminal. Os seis contratos existentes foram conferidos pelo navegador e passaram; isso não equivale a uma execução aprovada do comando.
- Build com `/portfolio/`: aprovado, incluindo links e metadados de domínio.
- Revisão visual das oito páginas em 320, 390, 768 e 1440 px: concluída no navegador integrado, com correções e nova conferência.
- Menu, teclado, filtros, clipboard, movimento reduzido, fontes de fallback e impressão do currículo: conferidos. Impressão em A4 gerou uma página.

O [registro da revisão visual](docs/09-revisao-visual.md) documenta os problemas corrigidos, a matriz de páginas e as medições locais. Não houve auditoria completa de acessibilidade, teste com leitor de tela, Lighthouse ou medição em aparelho físico. As capturas foram examinadas durante a revisão; não estão salvas como arquivos independentes.

A imagem social é `public/social.png`: HTTP 200 com `image/png`, assinatura PNG e dimensões 1200 × 630 confirmados pelo navegador em 11/11. O teste de assets também verifica assinatura e dimensões do PNG. Mudanças no servidor exigem reiniciar `npm run dev`; o watcher acompanha apenas `src/` e `public/`.

## Planejamento e fontes

1. [Fontes e evidências](docs/00-fontes-e-evidencias.md)
2. [Estratégia](docs/01-estrategia.md)
3. [Conteúdo](docs/02-conteudo.md)
4. [Projetos](docs/03-projetos.md)
5. [Design](docs/04-design.md)
6. [Arquitetura original](docs/05-arquitetura.md)
7. [Features e qualidade](docs/06-features-e-qualidade.md)
8. [Plano de execução original](docs/07-plano-de-execucao.md)
9. [Implementação e validação atual](docs/08-implementacao.md)
10. [Revisão visual e funcional](docs/09-revisao-visual.md)
11. [Novas interações e continuidade em outra máquina](docs/10-interacoes-e-continuidade.md)
12. [Exploração de projetos e índice de leitura](docs/11-exploracao-de-projetos.md)
13. [Navegação, fluxo e propostas de evolução](docs/12-navegacao-fluxo-e-propostas.md)
14. [Idiomas, movimento e tecnologias](docs/13-idiomas-movimento-tecnologias.md)

Referência principal: [portfólio de Giovane Oliveira](https://giogodoi.github.io/Portfolio/). Outras referências: [Arsh](https://arshjaved.in), [Custard](https://custard.top/en), [Luca Félix](https://luca-felix.com/pt) e [Samrit](https://samrit.dev). O código, os diagramas e os textos deste site são próprios; nenhuma experiência ou resultado dessas referências foi atribuído a Caio.
