# Conteúdo e arquitetura de informação

Este documento contém a base editorial em português e uma abertura em inglês. Os textos são propostas para implementação, com origem em [fontes e evidências](00-fontes-e-evidencias.md). “Pendente” identifica trabalho interno e nunca deve aparecer como texto provisório publicado.

## Mapa do site

| Rota lógica | Finalidade | Conteúdo |
| --- | --- | --- |
| `/` | Apresentação em português | Abertura, projetos, forma de trabalhar, experiência, competências, sobre e contato |
| `/projetos/` | Catálogo | Projetos selecionados, categorias e links |
| `/projetos/orderflow/` | Estudo de caso | Regras de estoque, decisões e evidências |
| `/projetos/olist/` | Estudo de caso | Pergunta analítica, pipeline, achados e limites |
| `/projetos/deubranco/` | Estudo de caso | Contexto do produto e contribuição em requisitos |
| `/404.html` | Recuperação | Mensagem breve, home e projetos |
| `/en/` e `/en/projects/.../` | Expansão bilíngue | Mesmos conteúdos após tradução completa; segunda entrega |

Os caminhos lógicos recebem o prefixo de hospedagem quando houver. A primeira entrega pública será PT-BR; o botão EN só aparece quando as páginas correspondentes existirem. A tradução inicial abaixo não significa site bilíngue pronto.

## Ordem da home

1. Cabeçalho: marca “Caio Teixeira”; Projetos, Como trabalho, Experiência e Contato; link Currículo.
2. Abertura: identidade, proposta e duas ações.
3. Projetos selecionados: três estudos de caso e CardSort em chamada complementar.
4. Como trabalho: quatro momentos associados a projetos.
5. Experiência no GEDAI.
6. Competências ligadas a exemplos.
7. Sobre, formação e idiomas.
8. Contato e rodapé.

Projetos vêm cedo para sustentar a apresentação. A experiência pode ser acessada diretamente pelo cabeçalho, sem exigir a leitura de todas as seções.

## Abertura

**Linha de identidade**

> Caio Teixeira · Produto, requisitos, dados e software

**Título**

> Do problema à entrega, com clareza em cada decisão.

**Texto de apoio**

> Sou graduando em Ciência da Computação na UFLA, com experiência em produto, requisitos e qualidade no GEDAI. Nos meus projetos, conecto regras de negócio, desenvolvimento de software e análise de dados.

**Ações**

- Primária: **Conheça meus projetos** → `#projetos`.
- Secundária: **Ver currículo** → PDF público revisado.
- Links discretos: GitHub e LinkedIn.

**Linha de contexto**

> GEDAI / UFLA · Lavras, MG · Português e inglês

Evitar selo “disponível para contratação” sem confirmação de disponibilidade. Não é necessário um retrato para a primeira versão.

## Projetos selecionados

**Título da seção:** “Projetos, decisões e evidências.”

**Introdução:** “Cada projeto parte de uma pergunta diferente. Aqui estão o problema, as escolhas e o que você pode conferir.”

| Card | Categoria | Texto pronto | Ação |
| --- | --- | --- | --- |
| OrderFlow | Software · Regras de negócio | “Como manter pedidos e estoque consistentes quando duas solicitações disputam a última unidade?” | Entenda as decisões |
| Olist Logistics Analytics | Dados · Logística | “Onde se concentram os atrasos de entrega e como analisar esse comportamento com indicadores confiáveis?” | Explore a análise |
| DeuBranco | Produto · Requisitos | “Uma plataforma de partidas educativas em equipe. Minha contribuição: requisitos, diagramas de sequência e casos de teste.” | Veja minha contribuição |
| CardSort Lab | Produto · Software | “Uma aplicação para criar estudos de card sorting, coletar agrupamentos e analisar a organização de informações.” | Veja o repositório |

Cada card contém uma imagem real ou esquema próprio, no máximo quatro tecnologias, tipo de participação e link claro. Os links “Ver repositório” podem coexistir com “Ler estudo de caso”; não usar “Demo” para link de código.

## Como trabalho

**Título:** “Entender, definir, construir e conferir.”

**Introdução:** “Minha experiência e meus projetos se encontram nesses quatro momentos.”

| Momento | Texto público | Evidência associada |
| --- | --- | --- |
| Entender o problema | “No GEDAI, participo do levantamento e da validação de requisitos com usuários e clientes, considerando sistemas legados e regras de negócio.” | Experiência declarada no CV; sem documentos internos |
| Definir o comportamento | “No DeuBranco, contribuí com especificações, diagramas de sequência e casos de teste para tornar o comportamento esperado mais claro.” | Estudo de caso e artefatos públicos selecionados |
| Construir a solução | “No OrderFlow, trabalhei regras de reserva e movimentação de estoque, incluindo concorrência e idempotência.” | README e código do projeto a selecionar no caso |
| Conferir e interpretar | “No Olist, organizei regras para consolidar pedidos e comparar indicadores calculados em pandas e SQL.” | Método e relatórios públicos do Olist |

Esta seção descreve conexões entre trabalhos existentes. Não prometer que todas as etapas foram aplicadas da mesma forma em todos os projetos.

## Experiência

**Título:** “Produto e qualidade, perto de quem usa.”

**Instituição:** GEDAI — Universidade Federal de Lavras.

**Papel:** Bolsista · Produto, requisitos e qualidade de software.

**Linha de período segura:** “Atuação em QA e, atualmente, produto e requisitos.”

**Descrição**

> Participo do levantamento, da análise e da validação de requisitos para sistemas relacionados ao Instituto Mineiro de Agropecuária. Meu trabalho envolve compreender regras de negócio, detalhar histórias de usuário e critérios de aceitação e apoiar a comunicação entre stakeholders e desenvolvimento.
>
> Também atuei com testes funcionais e exploratórios em aplicações web, automação com Selenium e documentação com Zettalenium.

**Responsabilidades em destaque**

- Análise de sistemas legados e esclarecimento de regras de negócio.
- Refinamento, organização e priorização de backlog.
- Acompanhamento de sprints e alinhamento do comportamento esperado.
- Investigação de divergências funcionais e validação de entregas.

Omitir meses e entidade contratante até reconciliar CV e LinkedIn. Quando confirmados, a linha do tempo poderá mostrar a transição de QA para PO/Requisitos. Não atribuir a Caio números de usuários, ganhos de produtividade, arquitetura interna ou adoção de padrões sem comprovação.

## Competências com contexto

**Título:** “Ferramentas ligadas ao que construo.”

| Grupo | Seleção de competências | Onde demonstrar |
| --- | --- | --- |
| Produto e requisitos | Histórias de usuário, critérios de aceitação, backlog, refinamento, validação | GEDAI e DeuBranco |
| Dados | Python, pandas, SQL, PostgreSQL, análise e qualidade | Olist |
| Machine learning | scikit-learn, features temporais, avaliação | Diesel Prediction; sem afirmar desempenho |
| Software | Java, Spring Boot, APIs REST, PostgreSQL | OrderFlow e CardSort Lab |
| Interfaces | React, TypeScript | CardSort Lab e Museu; extensão da experiência em software |
| Qualidade e entrega | Selenium, JUnit, Testcontainers, Docker, GitHub Actions | Experiência no GEDAI e projetos correspondentes |

Não mostrar cada tecnologia de todos os repositórios como especialidade. C++ e demais ferramentas do CV podem ficar no currículo, sem competir pela atenção da home.

## Sobre, formação e idiomas

**Título:** “Curiosidade pelo problema. Cuidado com a entrega.”

> Sou Caio Teixeira Ladeira, estudante de Ciência da Computação na Universidade Federal de Lavras. Gosto de conectar a conversa sobre o que precisa ser resolvido com o trabalho de especificar, desenvolver e analisar uma solução.
>
> Minha trajetória passa por requisitos e qualidade de software, enquanto os projetos me permitem aprofundar backend, dados e interfaces. Busco oportunidades em que possa contribuir nessa conexão entre produto e tecnologia.

**Formação:** Bacharelado em Ciência da Computação — UFLA. Ingresso: 2024/2. Conclusão prevista: 2028/1.

**Idiomas:** Português nativo · Inglês fluente, conforme autodeclaração no currículo.

Não inserir hobbies, premiações, pesquisa publicada ou motivações pessoais específicas sem informação de Caio.

## Contato

**Título:** “Vamos conversar sobre o próximo problema?”

> Se você busca alguém para conectar produto, requisitos, dados e desenvolvimento, podemos conversar.

**Ação principal:** Enviar e-mail → `mailto:caiotladeira@gmail.com`.

**Ações secundárias:** [LinkedIn](https://www.linkedin.com/in/caio-teixeira-cc/) · [GitHub](https://github.com/caiotlad).

**Ação auxiliar:** Copiar e-mail. Sucesso: “E-mail copiado.” Falha: manter endereço selecionável e link de e-mail, sem esconder o contato.

**Rodapé:** “Caio Teixeira Ladeira · Produto, requisitos, dados e software.” Ano calculado na geração do site. Link para o código deste portfólio somente após existir repositório público.

O telefone do currículo não será exibido na página. O PDF público deve ser revisado porque também pode expor esse contato. Não publicar documento de identidade, endereço completo ou histórico escolar.

## Base editorial em inglês — expansão

**Identity:** “Caio Teixeira · Product, requirements, data and software.”

**Headline:** “From problem to delivery, with clarity in every decision.”

**Introduction:** “I'm a Computer Science undergraduate at UFLA, with experience in product, requirements and software quality at GEDAI. My projects connect business rules, software development and data analysis.”

**Actions:** “Explore my projects” · “View résumé”.

**Project section:** “Projects, decisions and evidence.”

**Contact:** “Let's talk about the next problem.”

Na segunda entrega, traduzir integralmente os casos, navegação, textos alternativos, metadados e currículo quando houver versão correspondente. Manter nomes próprios, métricas e atribuições equivalentes. Não converter graduação em título já obtido nem QA em cargo de engenharia não declarado.

## Metadados editoriais propostos

**Título da home:** `Caio Teixeira | Produto, Requisitos, Dados e Software`.

**Descrição:** `Conheça a experiência e os projetos de Caio Teixeira em produto, requisitos, análise de dados e desenvolvimento de software.`

**Título de caso:** `OrderFlow: pedidos e estoque consistentes | Caio Teixeira`.

**Imagem social:** nome, quatro áreas e uma composição própria do fluxo de decisões. Não usar logs de empresas como endosso, telas internas ou números sem contexto.
