# Funcionalidades e critérios de qualidade

Prioridades: **P0** é necessário para o primeiro lançamento; **P1** amplia a experiência após a base estar pronta; **P2** é opcional. Todos os comportamentos abaixo estão planejados, não implementados.

## Funcionalidades

| ID | Prioridade | Funcionalidade | Comportamento e aceite |
| --- | --- | --- | --- |
| F01 | P0 | Home responsiva | Identifica Caio e suas quatro áreas, apresenta projetos e oferece contato. Leitura sem rolagem horizontal de 320 a 1440 CSS px. |
| F02 | P0 | Navegação por seções | Links chegam à seção correta; cabeçalho não cobre títulos nem foco; menu mobile acessível por teclado. |
| F03 | P0 | Projetos selecionados | OrderFlow, Olist, DeuBranco e CardSort têm contribuição e ações claras. Nenhum botão de demonstração sem destino funcional. |
| F04 | P0 | Três estudos de caso | Cada caso contém problema, papel, decisões, evidências, limites e repositório. DeuBranco pode usar versão curta ou ser substituído no terceiro caso por CardSort conforme a coleta de artefatos. |
| F05 | P0 | Catálogo de projetos | Uma rota reúne a seleção ampliada com categorias textuais. Funciona sem filtro e sem JS. |
| F06 | P0 | Fluxo de decisões | Componente explica Problema → Regra → Solução → Evidência, com conexões aos casos. Todo conteúdo permanece disponível sem JS. |
| F07 | P0 | Currículo público | PDF abre por link convencional; nome e idioma são claros. Revisado quanto a contato e consistência de datas; não afirmar que houve download sem observação. |
| F08 | P0 | Contato | E-mail selecionável, link mailto, LinkedIn e GitHub funcionam. Copiar e-mail é aprimoramento, com mensagem acessível e fallback. |
| F09 | P0 | Redução de movimento | Preferência do sistema remove movimentos decorativos; informações não desaparecem. |
| F10 | P0 | Recuperação de erro | 404 contém retorno à home e projetos; imagens com falha não eliminam o resumo do projeto. |
| F11 | P0 | Metadados por página | Título, descrição, canonical e imagem social corretos para o domínio/base efetivos. |
| F12 | P1 | Filtros por área | Produto, requisitos, dados, software e qualidade; projeto pode pertencer a várias áreas. Estado “Todos”, contagem e “Nenhum projeto nesta seleção” claros. |
| F13 | P1 | Versão completa em inglês | Home, casos, catálogo, navegação e metadados revisados. Seletor preserva caso quando houver equivalente. |
| F14 | P1 | Ilustração interativa OrderFlow | Cenários locais mostram reserva/repetição/cancelamento, sempre rotulados como ilustração. Não faz chamadas nem se apresenta como teste real do backend. |
| F15 | P1 | Demonstrações gravadas | Vídeos curtos, sem autoplay com som, com legenda e resumo textual. Não depender deles para compreender o caso. |
| F16 | P2 | Notas técnicas | Publicar somente quando houver conteúdo autoral que complemente os casos; sem seção vazia “em breve”. |
| F17 | P2 | Tema claro | Todos os componentes e estados revisados, sem flash de tema; preferência não afeta leitura sem JS. |
| F18 | P2 | Analytics agregado | Definir perguntas e política de dados antes de instalar. Não registrar conteúdo de contato nem dados de visitantes sem necessidade. |

O lançamento inclui uma assinatura visual e o fluxo de decisões. Tradução completa, filtros e simulação são ampliações, para que o site não dependa de funcionalidades adicionais para comunicar valor.

## Fluxos críticos

**Recrutador:** abrir home → compreender áreas → entrar em um caso → identificar contribuição → abrir currículo ou contato. No máximo duas navegações para chegar a uma evidência a partir da home.

**Entrevistador técnico:** entrar direto no OrderFlow/Olist → entender problema → seguir link da decisão → consultar artefato → retornar ao caso. Os links de evidência devem dizer o que abrem.

**Visitante pelo celular:** abrir → ler título e ações → abrir menu → ir à experiência → contato. O menu não prende rolagem ou foco depois de fechado.

**Sem JavaScript:** home, casos, catálogo, currículo e links continuam funcionais. Efeitos, cópia e filtros não são necessários para encontrar informação.

## Acessibilidade

Referência de trabalho: [WCAG 2.2, nível AA](https://www.w3.org/TR/WCAG22/). Os itens abaixo são critérios selecionados, não uma declaração de conformidade completa.

- HTML semântico, um h1 principal por página e hierarquia coerente de títulos.
- Link para pular ao conteúdo e landmarks de navegação/main/rodapé.
- Nome acessível em links e controles, evitando “clique aqui” sem contexto.
- Todas as ações por teclado; foco visível e não encoberto pelo cabeçalho.
- Contraste de pelo menos 4,5:1 para texto normal e 3:1 para texto grande; controles e estados essenciais com contraste adequado.
- Alvos de interação preferencialmente de 44×44 CSS px; verificar requisitos e exceções aplicáveis de WCAG 2.2.
- Reflow em 320 CSS px e texto com zoom de 200%, sem perda de conteúdo.
- Texto alternativo para mídia informativa; ilustrações redundantes/decorativas ignoradas pelo leitor de tela.
- Cor, animação ou hover nunca são o único meio de comunicar informação.
- `prefers-reduced-motion` respeitado; conteúdo não depende de animação.
- Feedback de cópia anunciado sem mover foco; navegação mantém comportamento previsível.

Conferir por automação e por teclado/leitor de tela. Um scanner sem erros não substitui revisão humana.

## Performance

**Orçamentos propostos, ainda não medidos:**

| Indicador | Meta de implementação | Como avaliar |
| --- | --- | --- |
| LCP | até 2,5s | Teste mobile documentado; em produção, dados de campo quando disponíveis |
| CLS | até 0,1 | Medir mudanças de layout; reservar proporção de mídias e fonts |
| INP | até 200ms | Dados de campo quando houver amostra; em laboratório, inspecionar interações e tarefas longas |
| JS inicial próprio | até 60 KB gzip | Conferir saída do build; efeitos opcionais separados |
| Página inicial transferida | até 1 MB, sem vídeo | Inspecionar rede em primeira visita; contar fontes e imagens iniciais |
| Imagem de card | preferencialmente até 180 KB | Otimização visual com dimensões adequadas |

Essas metas servem como orçamento de engenharia. Não publicar selos de “100/100” ou afirmar cumprimento de Core Web Vitals com um único teste local. Registrar dispositivo, rede, ferramenta e data das medições. O site deve continuar utilizável se um efeito visual for removido para cumprir o orçamento.

## SEO e compartilhamento

- Texto principal gerado no HTML, sem depender de fetch posterior.
- Títulos e descrições próprios, sem lista artificial de palavras-chave.
- Canonical, sitemap e robots para o endereço real; não indexar preview de trabalho.
- Imagem Open Graph com proporção e texto legíveis no recorte social.
- JSON-LD `Person` com nome, URL e `sameAs` dos perfis; não preencher prêmios, emprego ou senioridade não confirmados.
- `lang="pt-BR"`; `hreflang` somente quando versões EN existirem.
- Slugs estáveis; testar caminhos profundos e base de projeto no GitHub Pages.
- Não prometer resultado em ranking de busca ou mecanismos de recrutamento.

## Conteúdo, privacidade e dependências externas

Nenhum conteúdo de repositório privado, tela interna ou dados pessoais de terceiros integra o site. Links públicos de projetos não significam que todos os seus assets podem ser reutilizados sem conferir licença. Gráficos e bases têm origem registrada, especialmente no Olist.

Contato usa e-mail e LinkedIn. Um formulário futuro exigirá serviço real de recebimento, validação, feedback de entrega, proteção contra abuso e política de dados definida. Não mostrar mensagem “enviado” apenas após uma animação local.

O site não chama API de IA nem precisa de credenciais de plataforma. Uma funcionalidade futura desse tipo merece decisão de arquitetura própria, motivada por uma necessidade real do visitante.

## Matriz de verificação futura

| Verificação | Escopo | Evidência esperada |
| --- | --- | --- |
| Conteúdo e tipos | Slugs, campos, links, contribuição e fontes | Saída do validador sem erros |
| Build | Geração de todas as rotas e assets | Comando e resultado registrados |
| Navegação | Menu, âncoras, contato, casos e currículo | Roteiro executado no navegador |
| Teclado e acessibilidade | Ordem, foco, menu, trail e mensagens | Revisão manual e relatório automatizado |
| Layout | 320/360/390/768/1024/1440px e zoom | Capturas revisadas, sem corte ou sobreposição |
| Falhas | JS desativado, mídia ausente, clipboard negado | Conteúdo e caminhos essenciais preservados |
| Hospedagem | Home, rota profunda, PDF, imagens e base | Smoke no endereço publicado |
| Performance | Home e caso mais pesado | Medição com ambiente descrito |
| Revisão editorial | Datas, atribuições, métricas e currículo | Lista fechada ou omissões seguras deliberadas |

Testes automatizados devem cobrir comportamentos que podem quebrar a experiência: links de rotas geradas, schema de conteúdo, seleção acessível e menu. Não criar testes que apenas repetem os textos estáticos sem proteger uma regra útil.
