# Fontes, evidências e decisões editoriais

Data da pesquisa: **10/11/2026**. Este registro é interno ao projeto; não integra automaticamente o conteúdo público do site.

## Como interpretar as informações

| Classificação | Significado |
| --- | --- |
| Currículo | Informação declarada por Caio no PDF fornecido |
| Fonte pública consultada | Conteúdo encontrado no perfil ou repositório; não equivale a auditoria da implementação |
| Inspeção estática | Arquivo de código ou de teste lido, sem executá-lo |
| Proposta editorial | Texto, hierarquia ou decisão de design sugeridos para o portfólio |
| Pendente | Item que precisa de confirmação ou de um artefato antes de ser anunciado |

Não foram executados os projetos de terceiros ou de Caio nesta pesquisa. Não foram reexecutados notebooks, testes Java, treinamento de modelos ou pipelines de dados. Os estados de CI descritos pelos READMEs não foram auditados em logs de execução.

## Fontes pessoais

| ID | Fonte | Uso e ressalvas |
| --- | --- | --- |
| CV | [curriculo.pdf](../curriculo.pdf) | Nome, resumo, GEDAI, projetos selecionados, formação, tecnologias e idiomas. PDF de uma página; leitura do fluxo textual embutido, sem revisão da aparência do PDF. O extrator convencional não estava instalado e a instalação foi bloqueada pela rede; foi usada extração local do conteúdo textual comprimido. Não publicar a extração intermediária. |
| REF | [Referencias.txt](../Referencias.txt) | Lista das quatro referências adicionais |
| LI | [LinkedIn de Caio](https://www.linkedin.com/in/caio-teixeira-cc/) | Experiência declarada, resumo e descrições de Diesel/Museu. A extração retornou um snapshot adquirido em **21/09/2026**; pode estar desatualizado. A tentativa adicional de leitura direta não conseguiu recuperar a página. |
| GH | [Perfil no GitHub](https://github.com/caiotlad) e [README do perfil](https://github.com/caiotlad/caiotlad/blob/main/README.md) | Nome público, interesses, ingresso em 2024/2 e links de projetos. README consultado via conector GitHub. |
| USER | Resposta nesta conversa | Foco explícito: **produto, requisitos, dados e software**. Prevalece sobre a hipótese inicial de foco principal em backend. |

A consulta de repositórios retornou 26 itens acessíveis à conexão, dos quais 15 eram públicos. A curadoria utilizou somente repositórios públicos. Esse total é um retrato da consulta, não uma contagem para marketing. Nenhum conteúdo de repositório privado foi usado para descrever projetos.

## Repositórios analisados

| ID | Fonte | Material lido | Papel no planejamento |
| --- | --- | --- | --- |
| P01 | [OrderFlow](https://github.com/caiotlad/orderflow-api) | [README](https://github.com/caiotlad/orderflow-api/blob/main/README.md), [roteiro de validação](https://github.com/caiotlad/orderflow-api/blob/main/docs/validation.md) | Estudo de caso de software e consistência de regras |
| P02 | [Olist](https://github.com/caiotlad/olist-logistics-analytics) | [README](https://github.com/caiotlad/olist-logistics-analytics/blob/main/README.md) | Estudo de caso de dados e decisão logística |
| P03 | [DeuBranco](https://github.com/caiotlad/DeuBranco) | [README](https://github.com/caiotlad/DeuBranco/blob/main/README.md) | Produto, requisitos e trabalho em equipe; contribuição individual delimitada pelo CV |
| P04 | [CardSort Lab](https://github.com/caiotlad/cardsort-lab) | [README](https://github.com/caiotlad/cardsort-lab/blob/main/README.md), árvore de arquivos e [CardSortFlowTest.java](https://github.com/caiotlad/cardsort-lab/blob/main/backend/src/test/java/br/com/cardsortlab/CardSortFlowTest.java) | Produto de IHC, integração de frontend e backend; teste lido usa H2 em memória |
| P05 | [Diesel Prediction](https://github.com/caiotlad/Diesel_Prediction) | [README](https://github.com/caiotlad/Diesel_Prediction/blob/main/README.md) | Projeto complementar de ML; sem publicação de métricas preditivas |
| P06 | [Museu Bi Moreira](https://github.com/caiotlad/SiteMuseuBiMoreira) | [README](https://github.com/caiotlad/SiteMuseuBiMoreira/blob/master/README.md) | Interface e acessibilidade; tratar como proposta acadêmica |
| P07 | [Planejador Java](https://github.com/caiotlad/Periodo.java) | [README](https://github.com/caiotlad/Periodo.java/blob/master/README.md), árvore com Main.java | Correspondência com o projeto de grafos descrito no CV |
| P08 | [Planejamento em Jupyter](https://github.com/caiotlad/planejamento-curricular-jupyter) | [README](https://github.com/caiotlad/planejamento-curricular-jupyter/blob/main/README.md) | Projeto distinto, de otimização matemática; não misturar com o planejador Java |
| P09 | [Fraude bancária](https://github.com/caiotlad/ML-Fraude-bancaria) | [README](https://github.com/caiotlad/ML-Fraude-bancaria/blob/main/README.md) | Catálogo futuro; documentação insuficiente para prioridade inicial |

Para reprodução da pesquisa, SHAs de arquivos consultados: P01 README `2313837bc47654183f55b478a998a4325297d5f8`; P02 README `e039a5919d7927fca4bb760dfe761215a6e144e9`; P04 README `76645aba1753aa4a78a10f8d7ffbc9a3779e42ff`; P04 teste `13111570afb53b6bb97bfbfdac7457a8b8126521`; perfil GH README `86d02b52417f62b8538009439c645f03af3635d7`. São SHAs de arquivos, não commits nem evidência de execução.

## Divergências e tratamento adotado

| Item | Divergência | Decisão para a primeira versão |
| --- | --- | --- |
| GEDAI | CV: vínculo desde out/2024, PO/Requisitos desde abr/2026; LI extraído: Fundecc e cargo desde out/2025 | Usar “Atuação em QA e, atualmente, produto e requisitos no GEDAI/UFLA”; confirmar os marcos antes de montar uma linha do tempo mensal. Não tratar GEDAI e Fundecc como dois empregos independentes. |
| Formação | CV e GH: ingresso 2024/2; LI extraído: ano 2024, mês genérico | Preferir 2024/2; previsão 2028/1 é declaração do CV, não graduação concluída. |
| DeuBranco | README antigo do perfil chama de minigame Java; README do projeto apresenta plataforma web em equipe | Apresentar a plataforma e atribuir a Caio requisitos, diagramas e casos de teste, conforme CV. Não atribuir toda a stack ao trabalho individual. |
| Planejador curricular | CV descreve Java/Selenium/grafos; há notebook público de MILP e heurísticas | São dois projetos e dois registros separados. Não dizer que o Java usa CBC ou que o notebook usa Selenium. |
| Olist | Outros históricos podem citar dashboard/ML em branches diferentes; README atual da main deixa Power BI pendente | Usar o que está no README consultado da main. Não anunciar Power BI pronto nem modelo de risco de atraso neste lançamento. |
| Museu | O nome parece institucional; LI descreve origem acadêmica e dados simulados | Chamar de “proposta acadêmica de interface para o Museu Bi Moreira”; não afirmar adoção oficial. |

## Registro de alegações

| Alegação planejada | Fonte | Forma publicável |
| --- | --- | --- |
| Experiência em requisitos e qualidade | CV, LI, GH | Descrever atividades, sem porcentagens de melhoria |
| Inglês fluente | CV e LI | Autodeclaração; não acrescentar certificação ou nível CEFR |
| Olist: 99.441 pedidos históricos | CV, P02 | Escala da base, nunca “clientes atendidos” |
| Olist: 6.534 / 96.470 entregas elegíveis, 6,77% | P02 | Achado histórico de 2016–2018, com denominador e fonte |
| Conferência de 21 indicadores | CV, P02 | Propriedade descrita do pipeline; não “21 indicadores em produção” |
| Reserva, cancelamento, idempotência no OrderFlow | P01 | Funcionalidades documentadas; verificação atual deve ser registrada antes de qualquer selo de execução |
| Testes no CardSort | P04 | Teste de fluxo presente, lido, não executado; H2 não comprova PostgreSQL |
| Contribuição de Caio no DeuBranco | CV e equipe em P03 | Requisitos, diagramas de sequência e casos de teste; linkar artefatos quando selecionados |

## Referências de design

Foram extraídos os conteúdos de todas as cinco páginas. O navegador visual ficou indisponível; **não houve inspeção por screenshot nem validação de animações, responsividade ou desempenho**. A extração pode ser parcial. Observações de aparência da referência principal vêm do CSS consultado; a direção visual proposta para Caio é uma decisão de design.

| Referência | Evidência disponível |
| --- | --- |
| [Giovane](https://giogodoi.github.io/Portfolio/) | Conteúdo extraído em 10/11/2026; [README](https://github.com/giogodoi/Portfolio/blob/main/README.md), árvore e início do [CSS](https://github.com/giogodoi/Portfolio/blob/main/css/style.css) consultados. HTML/CSS/JS sem build; README descreve Three.js, método, PT/EN e fluxo de agentes. CSS declara fundo escuro, azul, Doto, Instrument Serif e Geist. |
| [Arsh](https://arshjaved.in) | Extração de 10/11/2026: introdução direta, projetos destacados e experiência |
| [Custard](https://custard.top/en) | Extração com aquisição em 12/10/2026: método e estudos de caso com decisões e evidências |
| [Luca Félix](https://luca-felix.com/pt) | Extração com aquisição em 05/10/2026: apresentação pessoal, projetos e navegação em português |
| [Samrit](https://samrit.dev) | Extração com aquisição em 07/10/2026: sistemas, projetos, trajetória e repertório técnico |

O repositório da referência principal não apresentou arquivo LICENSE na árvore consultada; há licenças de dependências e créditos no README. Inspiração visual não implica autorização para copiar código, textos ou assets. A proposta usa implementação e conteúdo próprios.

## Fontes técnicas

- [Astro: arquitetura de ilhas](https://docs.astro.build/en/concepts/islands/): base para conteúdo estático e interatividade pontual.
- [Astro: GitHub Pages](https://docs.astro.build/en/guides/deploy/github/): configuração de site/base e publicação estática.
- [Astro: internacionalização](https://docs.astro.build/en/guides/internationalization/): rotas por idioma.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): referência de acessibilidade; conformidade futura exige verificação.

Uma consulta leve ao histórico de trabalho foi usada apenas para preservar a preferência de Caio por alegações demonstráveis. Nenhum resultado antigo de teste ou modelo foi reaproveitado como resultado atual.
