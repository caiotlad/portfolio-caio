# Plano de execução e pendências

> Este documento registra o planejamento inicial. A implementação local já foi realizada; o estado atual, as adaptações e os testes estão no [registro de implementação](08-implementacao.md).

## O que esta rodada entrega

| Pedido | Entrega | Estado |
| --- | --- | --- |
| Etapa 1: planejar a partir de currículo e perfis | Posicionamento, conteúdo, jornada, seleção e casos | Documentado |
| Etapa 2: documentar arquitetura, design, features e conteúdo | Fontes, wireframes, decisões, contratos e critérios | Documentado |
| Construir o site | Código e assets finais | Próxima etapa, não executada |
| Publicar e medir | URL pública, testes e desempenho | Próxima etapa, não executada |

O plano está completo para iniciar implementação. A existência de pendências editoriais não impede construir componentes; limita quais alegações e assets podem entrar no lançamento.

## Sequência proposta para implementação

Sem cronograma artificial: cada bloco termina com um resultado revisável. A duração depende da coleta de assets e do nível de refinamento visual escolhido.

| Bloco | Trabalho | Dependência | Pronto quando |
| --- | --- | --- | --- |
| A — Conteúdo de lançamento | Consolidar textos, fontes e contribuição; selecionar PDF público | Documentos 00–03 | Itens não confirmados são resolvidos ou omitidos com texto seguro |
| B — Base técnica | Criar Astro/TS, rotas, conteúdo estruturado e tokens | Definição do host/caminho pode usar configuração provisória | Build gera home e um caso com conteúdo em HTML |
| C — Home | Header, hero, projetos, experiência, competências e contato | A e B | Fluxo completo funciona no desktop/celular sem efeitos |
| D — Casos | OrderFlow, Olist, DeuBranco ou CardSort; catálogo | A e B | Cada página mostra papel, decisão, evidência e limite |
| E — Identidade e interação | Fluxo vetorial, EvidenceTrail, movimento e microinterações | C e D | Experiência visual coerente, teclado e redução de movimento preservados |
| F — Revisão e publicação | Acessibilidade, SEO, links, performance e implantação | C, D e E | Smoke funciona na URL real e verificação fica registrada |
| G — Expansão | Inglês completo, filtros e demonstrações | Primeiro lançamento utilizável | Ampliações passam pelos mesmos critérios de qualidade |

## Backlog inicial em unidades pequenas

1. Criar estrutura de conteúdo e regras para `draft`/`ready`.
2. Definir `site`, helper de URLs e comportamento com base em subdiretório.
3. Implementar layout, tokens, tipografia e link de pular conteúdo.
4. Implementar home com conteúdo e links, sem animações.
5. Criar template de estudo e publicar o primeiro caso local.
6. Preencher demais casos e catálogo, preservando contribuição individual.
7. Inserir assets revisados, legendas, origem e texto alternativo.
8. Aprimorar menu, cópia de e-mail e EvidenceTrail.
9. Revisar layout e acessibilidade; tratar falhas e ausência de JS.
10. Configurar metadados, sitemap e 404 para o host efetivo.
11. Executar verificações, publicar e conferir rotas profundas/currículo.
12. Registrar o que foi testado e quais limites permanecem.

## Pendências editoriais

| ID | Item | Responsável provável | Decisão segura até resolver |
| --- | --- | --- | --- |
| E01 | Datas de entrada no GEDAI e transição para PO/Requisitos; relação com Fundecc | Caio | Descrever evolução sem meses conflitantes; uma experiência, sem duplicação |
| E02 | Disponibilidade e tipos de oportunidade desejados | Caio | Usar chamada neutra para conversar; áreas já confirmadas |
| E03 | Versão pública do currículo e exposição do telefone | Caio + edição | Não copiar automaticamente o PDF original para pasta pública |
| E04 | Artefatos de requisitos, diagrama e teste do DeuBranco atribuíveis à contribuição | Caio + pesquisa no repo público | Caso curto com papel declarado; CardSort pode assumir a terceira página detalhada |
| E05 | Capturas reais de projetos e origem das imagens | Implementação | Usar esquemas próprios explicativos; nenhum mockup fingindo ser screenshot |
| E06 | Trechos/permalinks de evidência dos três casos | Implementação | Links de README e validação já identificados; fixar commits ao concluir |
| E07 | Execução atual de demonstrações/testes que se deseje anunciar | Ambiente de cada projeto | Descrever como documentado, sem selo “validado” |
| E08 | Identidade visual em screenshot | Implementação + Caio | Usar os tokens e wireframes como direção inicial, não como design aprovado |
| E09 | Repositório, nome público, host e domínio do portfólio | Caio na etapa de publicação | Arquitetura suporta GitHub Pages; não inventar URL publicada |
| E10 | Inglês completo e currículo EN | Tradução + Caio | Publicar primeiro em PT-BR e ocultar seletor incompleto |

Nenhuma dessas confirmações é necessária para concluir a documentação entregue. Na implementação, podem ser coletadas enquanto o trabalho independente avança.

## Riscos e resposta

| Risco | Efeito | Resposta |
| --- | --- | --- |
| Abrangência virar mensagem genérica | Visitante não entende o foco | Unificar pela passagem problema → regra → construção → evidência; associar cada área a um trabalho |
| Aparência ocupar o lugar do conteúdo | Site impressiona pouco em entrevista | Casos e contribuição recebem prioridade antes dos efeitos |
| Atribuição excessiva em equipe | Fragiliza credibilidade | Papel de Caio visível no card e no início do caso |
| Confundir READMEs com teste executado | Alegações sem sustentação | Separar leitura, inspeção e execução no registro de evidência |
| Copiar visual/código da referência | Identidade pouco própria e dúvidas de licença | Construção e copy próprios; registrar bibliotecas e assets |
| Animação pesada em celular | Leitura e interação prejudicadas | SVG, movimento discreto, orçamento e redução de movimento |
| Base incorreta no Pages | PDF e casos quebrados | Helper de URL e smoke com o caminho de produção |
| Dependência de demo fora do ar | Recrutador não consegue avaliar | Caso autossuficiente, imagem, resumo e repositório |

## Definição de pronto do lançamento

- Home e páginas de casos usam a narrativa confirmada e têm conteúdo completo.
- Caio é identificado com suas quatro áreas; cada destaque informa contribuição.
- Datas e métricas são consistentes ou foram omitidas com formulação segura.
- Imagens reais/esquemas, fontes e licenças estão revisados.
- Currículo público, e-mail, LinkedIn e repositórios abrem corretamente.
- Teclado, mobile, reflow, redução de movimento e leitura sem JS foram conferidos.
- Build, rotas e verificações relevantes passam; limitações ficam registradas.
- Metadados, canonical, sitemap e base correspondem à hospedagem real.
- URL publicada passa pelo smoke de home, rota profunda, imagens e PDF.
- Nenhum texto provisório, botão sem ação, número inventado ou falsa demonstração permanece.

## Registro da verificação desta documentação

Executado nesta rodada: levantamento dos arquivos locais; leitura textual do CV; leitura das referências e perfis com limites registrados; consulta de repositórios públicos, READMEs e arquivos selecionados; criação dos documentos; conferência de links locais, estrutura e coerência editorial.

Não executado: revisão visual do PDF ou sites de referência, auditoria completa dos códigos dos projetos, treinamento de modelos, testes das aplicações, build do futuro site, testes no navegador do futuro site ou publicação.

Ao concluir a implementação, criar um registro separado com data, comando/roteiro, resultado, ambiente e limitações. Atualizar o README para refletir o estado real do site, sem transformar este planejamento em prova de implementação.
