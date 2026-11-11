# Idiomas, controle de movimento e tecnologias — 11/11/2026

## Inglês

O build gera 16 páginas: as oito páginas em português e suas equivalentes em inglês. As novas rotas são `/en/`, `/en/projects/`, quatro casos em `/en/projects/{slug}/`, `/en/resume/` e `/en/404.html`. EN/PT fica no cabeçalho desktop; no celular, English/Português aparece no menu. A troca mantém página, fragmento e parâmetros de busca. Os índices de busca consideram os dois idiomas.

As traduções são emitidas no HTML estático, sem serviço de tradução ou substituição de texto no navegador. O contexto síncrono em `src/lib/locale.mjs` define as URLs. A interface usa `src/data/en.json`; os casos usam `src/data/projects.en.mjs`. O localizador atua em texto e atributos legíveis, preservando scripts, IDs e chaves de estado. O idioma do documento, títulos, descrições, locale social, canonical, links alternativos e sitemap acompanham a versão. A imagem social compartilhada continua sendo a arte existente, sem uma nova capa específica em inglês.

`scripts/verify-locales.mjs` confere cobertura de textos/atributos e limites importantes: denominadores/período do Olist, participação coletiva do DeuBranco e participantes fictícios/H2 do CardSort. Mudanças no texto de interface exigem atualizar o dicionário. Os testes HTTP foram adaptados ao idioma das rotas.

O servidor foi ajustado para usar o HTML inglês em URLs inexistentes sob `/en/`, mantendo status 404. **É preciso reiniciar um `npm run dev` iniciado antes dessa alteração.** O watcher recompila conteúdo, mas não recarrega o próprio servidor. O acesso direto a `/en/404.html` é um arquivo existente com HTTP 200, como `/404.html`.

## Movimento

O botão no canto inferior esquerdo pausa os efeitos e permite retomá-los. No celular, o rótulo compacto é Efeitos/Motion; o nome acessível informa a ação atual. A escolha é lembrada em `localStorage`, compartilhada entre idiomas/páginas e aplicada antes do CSS para evitar entrada animada quando já havia uma pausa escolhida.

`src/scripts/motion.js` fornece a preferência efetiva comum ao canvas, perspectiva, rolagem, filtros e novas interações. Pausar cancela animações em execução e oferece uma composição estática, sem ciclo de canvas ativo. A preferência do sistema por movimento reduzido prevalece; o botão informa esse estado e não a sobrescreve. Sem armazenamento, a escolha funciona na página atual. Sem JavaScript ou após falha do módulo, os links e detalhes nativos permanecem disponíveis em uma composição estática. Há espaço ao final da página para o controle não encobrir os últimos links; ele fica fora da impressão.

## Tecnologias

A home ganhou `#tecnologias`, com as 21 tecnologias da imagem e do README: Python, pandas, scikit-learn, Java, Spring Boot, JUnit, C++, TypeScript, Node.js, React, Vite, Maven, Tailwind CSS, HTML5, CSS3, MySQL, PostgreSQL, Docker, Jupyter, Git e GitHub.

Em desktop, hover revela descrição e projetos. Uma conexão Bézier acompanha a seleção; o símbolo recebe órbitas e flutuação. O painel considera sua altura para não sobrepor o texto seguinte e tem rolagem interna em janelas desktop baixas. Os efeitos da bancada pausam fora da viewport; painéis fechados não mantêm animações decorativas.

A estrutura usa `details`/`summary` e agrupamento nativo. Enter/Espaço abrem os detalhes. No celular, a grade começa recolhida; clicar/tocar expande o detalhe no fluxo. A seleção acionada pelo visitante é levada à região abaixo do cabeçalho. Os símbolos são composições tipográficas próprias, sem carregar 21 imagens externas.

O conteúdo está em `src/data/technologies.mjs`. C++ e MySQL não receberam projeto inventado. Node.js, HTML e CSS incluem este portfólio. Não foram criados percentuais de domínio, certificações ou níveis de senioridade. As associações não alteram a atribuição individual/coletiva dos casos.

### Fontes

- [Perfil — README](https://github.com/caiotlad/caiotlad/blob/main/README.md), SHA `86d02b52417f62b8538009439c645f03af3635d7`, e imagem do usuário.
- [OrderFlow — pom.xml](https://github.com/caiotlad/orderflow-api/blob/main/pom.xml), SHA `e759dc3cc4fc6285691e33c0d1d3116183dfe324`.
- [CardSort — package.json](https://github.com/caiotlad/cardsort-lab/blob/main/package.json), SHA `9ccce13438a6b6ff44246a2cf1ddad28d7f6935a`, e [README](https://github.com/caiotlad/cardsort-lab/blob/main/README.md), SHA `76645aba1753aa4a78a10f8d7ffbc9a3779e42ff`.
- [Museu — package.json](https://github.com/caiotlad/SiteMuseuBiMoreira/blob/master/package.json), SHA `43db786753db477b474eaaa433050c701380f9d7`.
- [Diesel Prediction — README](https://github.com/caiotlad/Diesel_Prediction/blob/main/README.md), SHA `5c11725b260c90088efdd880df13b8494874cc3b`.
- Olist e demais evidências registradas em 00/03.

## Conferência

| Verificação | Resultado observado |
| --- | --- |
| Oito rotas inglesas em 1440/768/390/320 px | `lang="en"`, destino equivalente em português e `scrollWidth` igual ao `clientWidth` nas amostras |
| Capturas completas das oito páginas inglesas | Examinadas em desktop; capturas adicionais da abertura e da bancada em mobile |
| Tecnologias pelo teclado | As 21 seleções abriram um detalhe; C++/MySQL com zero projetos associados |
| Hover em React | CardSort Lab e Museu Bi Moreira |
| Ativação mobile em TypeScript | Descrição e links corretos; caso interno em `/en/projects/cardsort/` |
| Pausa manual | Zero animações na amostra; canvas idêntico após oito quadros |
| Persistência e idioma | Recarga manteve pausa; troca para português preservou `#tecnologias` e traduziu o controle |
| Data + SQL no catálogo | Olist; troca EN/PT preservou área, texto e contagem |
| Busca rápida por `requirements` | Resultados e status em inglês; Escape fechou normalmente |
| Currículo inglês | PDF do motor do navegador: A4, uma página, 85.849 bytes |
| Sintaxe e build | Aprovados: 16 páginas, 864 referências locais/âncoras e 1.682 textos/atributos conferidos |
| Subdiretório e domínio de exemplo | Build aprovado com `/portfolio`, URLs e sitemap bilíngues |
| `npm test` | Nova tentativa falhou nas seis verificações por `fetch failed`, mantendo o bloqueio de conexão do terminal já documentado |

As capturas e o PDF foram examinados na sessão, sem salvar arquivos independentes. Não houve medição de FPS/Lighthouse, leitor de tela ou aparelho físico. O site continua local, sem publicação ou envio ao GitHub.
