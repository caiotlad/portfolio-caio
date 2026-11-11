# Curadoria e estudos de caso

## Critério editorial

A seleção considera relação com as quatro áreas escolhidas, clareza de contribuição, profundidade das decisões e disponibilidade de evidências públicas. Estrelas e quantidade de repositórios não definem prioridade. O levantamento foi documental; não é uma certificação de qualidade ou segurança dos projetos.

| Projeto | Lugar na primeira versão | Motivo | Cuidado |
| --- | --- | --- | --- |
| OrderFlow | Caso principal | Regras de negócio e decisões de backend concretas | Distinguir teste documentado de execução conferida |
| Olist | Caso principal | Dados reais, metodologia e resultados contextualizados | Manter denominadores, período histórico e limites |
| DeuBranco | Caso principal | Requisitos, colaboração e contribuição pessoal declarada | Não atribuir toda a aplicação a Caio |
| CardSort Lab | Destaque complementar | Conecta IHC, produto e implementação full stack | Demonstrações usam participantes fictícios; teste lido usa H2 |
| Diesel Prediction | Catálogo | ML ligado a um problema logístico | Sem métricas de modelo não reproduzidas |
| Museu Bi Moreira | Catálogo | Repertório de interface e acessibilidade | Proposta acadêmica, sem afirmar uso institucional |
| Planejador Java | Catálogo | Grafos, restrições e automação | Não confundir com otimização em Python |
| Planejamento Jupyter | Catálogo futuro | Modelagem exata e heurística com documentação | Distinguir ótimo provado de interrupção por tempo |
| Fraude bancária | Posterior | Amplia ML | README insuficiente para explicar avaliação com segurança |

Os quatro primeiros são suficientes na home. O catálogo inicial pode incluir Diesel e Museu. Evitar transformar o lançamento numa cópia de todos os repositórios.

## Formato de cada estudo

1. Resumo em uma frase e pergunta central.
2. Contexto e tipo: pessoal, acadêmico ou profissional.
3. Minha contribuição, explicitando participação em equipe.
4. Problema, restrições e critérios de sucesso do projeto.
5. Duas ou três decisões e suas consequências.
6. Visão resumida da solução.
7. Evidências: código, documento, gráfico ou gravação com origem.
8. Resultado observado/documentado, limitações e próximos passos.
9. Repositório e contato; demonstração somente quando existir e funcionar.

## Caso 1 — OrderFlow

**Título:** “A última unidade não pode ser vendida duas vezes.”

**Resumo:** “Uma API de pedidos e estoque em que reservas, confirmações e cancelamentos precisam preservar as mesmas regras, mesmo com solicitações simultâneas.”

**Contexto:** Projeto de portfólio, cenário de uma distribuidora com um depósito. Não descrever como cliente comercial ou sistema em produção.

**Minha contribuição:** “Desenvolvi a API para explorar consistência de estoque, transações e idempotência com Java, Spring Boot e PostgreSQL.” Base: CV e [README](https://github.com/caiotlad/orderflow-api/blob/main/README.md).

**Problema:** Duas solicitações podem ler o mesmo saldo disponível e tentar reservá-lo. Reenvios de rede também podem duplicar uma operação se a API não reconhecer uma solicitação já atendida.

| Decisão | Explicação publicável | Consequência/trade-off |
| --- | --- | --- |
| Pedido e movimentos na mesma transação | “Uma falha em qualquer item deve desfazer a operação inteira.” | Preserva consistência; exige atenção ao tamanho e duração da transação |
| Bloqueios explícitos no banco | “O projeto usa bloqueio de linhas em ordem consistente para tratar disputas pelo mesmo estoque.” | Pode haver espera entre operações concorrentes; não comprova desempenho em escala |
| Chave de idempotência | “Repetir uma criação com a mesma chave e conteúdo recupera a resposta original.” | Exige guardar identidade e resposta; a política de expiração continua uma decisão de domínio |

**Visão da solução:** Cliente HTTP → autenticação/permissões → pedidos e estoque → transação PostgreSQL → histórico de movimentos. Nome e preço são preservados no pedido para que mudanças no catálogo não alterem seu histórico.

**Bloco de evidência:** mostrar o cenário documentado de duas compras pela última unidade. O resultado esperado é uma criação e um conflito. Uma eventual animação será identificada como **“Ilustração da regra de negócio”**. Não deve imitar um teste ao vivo nem exibir “teste passou” sem executar a API.

**Estado publicável:** “O repositório reúne documentação da API e testes para cenários de concorrência, repetição de operações e rollback.” Não acrescentar taxa de disponibilidade, throughput, latência ou porcentagem de cobertura.

**Limitações:** um depósito e uma moeda; reservas sem expiração automática; confirmação representa baixa definitiva; tokens sem revogação individual. Esses limites vêm do README e ajudam a explicar o recorte do projeto.

**Evidências a preparar:** trecho de regra de negócio com permalink de commit, recorte do contrato OpenAPI e gravação curta do cenário HTTP após execução. [Roteiro público de validação](https://github.com/caiotlad/orderflow-api/blob/main/docs/validation.md). Não usar um screenshot de Swagger como prova de concorrência.

## Caso 2 — Olist Logistics Analytics

**Título:** “Antes do indicador, a regra precisa estar certa.”

**Resumo:** “Uma análise reproduzível de entregas históricas da Olist, com cuidado na consolidação dos pedidos e na definição de atraso.”

**Minha contribuição:** “Construí um pipeline em Python e SQL para validar dados, consolidar pedidos e gerar indicadores e relatórios sobre entregas.” Base: CV e [README](https://github.com/caiotlad/olist-logistics-analytics/blob/main/README.md).

**Pergunta:** Onde se concentram atrasos e como eles se relacionam com a experiência registrada nas avaliações?

| Decisão | Explicação publicável | Por que importa |
| --- | --- | --- |
| Pedido como unidade principal | “Itens e pagamentos são agregados antes das junções.” | Evita multiplicar valores de pedidos com várias linhas |
| Atraso por data de calendário | “Entregar à noite no dia prometido continua no prazo.” | Torna o indicador compatível com a regra apresentada |
| Indicadores em pandas e SQL | “O pipeline compara 21 indicadores antes de confirmar a carga.” | Facilita detectar divergências entre implementações |

**Números utilizáveis, sempre com origem:**

| Dado | Contexto obrigatório |
| --- | --- |
| 99.441 pedidos | Total da base histórica analisada; não usuários, vendas geradas ou operação atual |
| 96.470 entregas elegíveis | Denominador que permite comparar prazo prometido e entrega |
| 6.534 atrasadas; 6,77% | Achado no grupo elegível, conforme relatório do repositório |

**Texto de resultado:** “Na base histórica, 6.534 das 96.470 entregas elegíveis atrasaram, correspondendo a 6,77%. O caso mostra como a definição do indicador e a qualidade das junções influenciam a leitura do problema.”

**Interpretação:** diferenças nas notas de avaliações são associações observadas. Não apresentar atraso como causa demonstrada das notas nem alegar redução real de atrasos.

**Visão da solução:** CSVs da origem → validação de qualidade → consolidação por pedido → indicadores pandas/SQL → relatório HTML e gráficos. Base histórica de 2016–2018; fonte Olist/Kaggle. Atribuir a origem e conferir as condições de reutilização das figuras; a fonte é declarada como CC BY-NC-SA 4.0 no README.

**Limitações:** a versão main consultada informa Power BI nativo pendente e carga completa da base real no PostgreSQL ainda por executar. CI e Docker descritos no README foram verificados pelo autor com dados sintéticos; essa execução não foi auditada nesta rodada. Não incluir ML de atraso presente apenas em outra branch ou histórico sem nova revisão.

**Evidências a preparar:** gráfico agregado com legenda, link ao método e relatório. Gerar captura sem dados identificáveis de clientes. Não incorporar o dashboard inteiro em iframe para tornar o caso compreensível.

## Caso 3 — DeuBranco

**Título:** “Uma boa partida começa com regras compreensíveis.”

**Resumo:** “Minha contribuição em requisitos para uma plataforma acadêmica de partidas educativas multiplayer.”

**Contexto:** Projeto em equipe na UFLA. O README identifica Caio, Giovane Oliveira e João Vitor Reis Alvarenga. O repositório de Caio remete ao projeto de equipe; autoria individual de cada componente não foi auditada.

**Minha contribuição:** “Contribuí com especificações de requisitos, diagramas de sequência, regras de verificação e casos de teste de validação.” Base: currículo fornecido. Não dizer “implementei o sistema multiplayer” sem evidência de contribuição correspondente.

**Contexto do produto:** estudantes entram em salas e participam de partidas de perguntas com tempo e pontuação. O produto envolve fluxos de autenticação, ingresso, resposta, classificação e administração de questões, conforme [README do projeto](https://github.com/caiotlad/DeuBranco/blob/main/README.md).

**Narrativa proposta:** explicar como requisitos e exemplos ajudam uma equipe a alinhar comportamento. Mostrar um fragmento real de requisito, sua relação com um diagrama e o teste correspondente. O benefício organizacional é uma intenção do trabalho; não há redução de retrabalho medida nesta pesquisa.

| Parte do caso | Material necessário | Tratamento enquanto faltar |
| --- | --- | --- |
| Uma regra de partida | Selecionar trecho público da especificação | Usar descrição geral do papel, sem inventar regra |
| Um diagrama | Localizar diagrama público e atribuição | Omitir figura; não desenhar retrospectivamente como artefato original |
| Um critério e um teste | Relacionar a um requisito real | Não inventar execução ou status |
| Resultado da colaboração | Evidência de entrega acadêmica ou relato confirmado | Descrever contribuição, sem alegação de impacto quantitativo |

**Limite da contribuição:** a stack geral do projeto inclui frontend e backend, mas isso descreve o sistema da equipe. No cabeçalho do caso, destacar **“Minha atuação: engenharia de requisitos e validação”**. A stack completa fica numa seção de contexto.

**Próximo passo editorial:** reunir os três artefatos públicos. Se não forem reunidos a tempo do lançamento, publicar a versão curta centrada no papel de Caio e transferir a terceira página detalhada para CardSort, sem bloquear a home.

## CardSort Lab — destaque complementar

**Texto:** “Criação e execução de estudos de card sorting, com análise de agrupamentos e exportações.”

O README apresenta React/TypeScript, Java/Spring Boot, tipos aberto/fechado/híbrido, rascunhos recuperáveis, dashboards, matriz, dendrograma e CSV. A árvore contém frontend, backend e teste de fluxo. A inspeção do teste mostrou H2 em memória; isso não comprova comportamento de produção em PostgreSQL.

**Caso futuro:** estudar a jornada pesquisador → participante → agrupamento → análise. Selecionar a decisão de recuperação de rascunho ou exportação anonimizada, verificar sua implementação e demonstrar com dados fictícios identificados. Não usar os participantes fictícios da conta demo como adoção real.

## Projetos complementares

- **Diesel Prediction:** análise da volatilidade do Diesel S10 com dados da ANP, features temporais e Random Forest. O README descreve classificação de alta volatilidade e split temporal; não inserir acurácia, lucro, antecipação de choques ou uso operacional. Revisar o alinhamento temporal do alvo e das features antes de afirmar previsão futura reproduzida.
- **Museu Bi Moreira:** proposta acadêmica de interface em React/TypeScript, com recursos de visitação e acessibilidade descritos. Não dizer “site oficial” ou “adotado pelo museu”.
- **Planejador Java:** extração via Selenium e planejamento com grafos. O README contém instruções incompletas de clone; melhorar reprodução antes de promovê-lo.
- **Planejamento Jupyter:** estudo acadêmico com modelo exato, construção gulosa e busca local. Preservar status do solver e hipóteses experimentais; não afirmar que todo cenário chegou ao ótimo.

## Política de assets e resultados

Capturas devem mostrar o projeto real, com dados de demonstração quando necessário. Diagramas próprios precisam ser rotulados como explicação atual, caso não sejam artefatos originais. Vídeos devem ter legenda e resumo textual. Links públicos devem apontar para o arquivo ou execução relevante, preferencialmente com commit fixo ao concluir o caso.

Não publicar percentuais de melhoria, estatísticas de testes ou métricas de modelos sem artefato, contexto, período e escopo verificáveis. A intenção é dar ao recrutador uma trilha curta para conferir o que leu.
