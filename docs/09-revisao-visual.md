# Revisão visual e funcional — 10/11/2026

**Estado atual:** o acesso foi restabelecido e uma nova conferência foi concluída em 11/11/2026. Veja “Conferência após o servidor ser iniciado pelo usuário”, ao final. As seções anteriores preservam o histórico, inclusive o bloqueio inicial da retomada.

Revisão do portfólio existente, servido em `http://127.0.0.1:4321/`, pelo navegador integrado do aplicativo. A arquitetura Node.js/HTML/CSS/JavaScript foi preservada. Não houve publicação nem criação de repositório. Este registro complementa o documento 08 e atualiza o estado da validação.

## Cobertura visual

Capturas de página inteira foram examinadas antes e depois dos ajustes. A conferência final cobriu a matriz abaixo, com fontes carregadas. As oito páginas também foram examinadas em 320 px com Google Fonts bloqueado, usando o fallback do sistema.

| Página | 1440 px | 768 px | 390 px | 320 px |
| --- | --- | --- | --- | --- |
| `/` | Conferida | Conferida | Conferida | Conferida |
| `/projetos/` | Conferida | Conferida | Conferida | Conferida |
| `/projetos/orderflow/` | Conferida | Conferida | Conferida | Conferida |
| `/projetos/olist/` | Conferida | Conferida | Conferida | Conferida |
| `/projetos/deubranco/` | Conferida | Conferida | Conferida | Conferida |
| `/projetos/cardsort/` | Conferida | Conferida | Conferida | Conferida |
| `/curriculo/` | Conferida | Conferida | Conferida | Conferida |
| `/404.html` | Conferida | Conferida | Conferida | Conferida |

As larguras são viewports em pixels CSS no navegador desktop, sem comprovar comportamento em hardware de celular. Após os ajustes, `scrollWidth` e `clientWidth` coincidiram nas páginas examinadas, sem rolagem horizontal do documento. A barra vertical do navegador reduz a área útil em aproximadamente 15 px nas páginas longas.

A integração permitiu capturar e examinar as telas, mas bloqueou a exportação das imagens para arquivos por sua política de segurança. As capturas não estão entregues como arquivos independentes; não foi contornado esse bloqueio.

## Problemas corrigidos

| Problema observado | Correção | Conferência |
| --- | --- | --- |
| Rótulos de conteúdo entre 6 e 9 px no mobile | Conteúdo auxiliar com pelo menos 12 px; corpo principal de 15 px e entrelinha de 1,8; controles e links de 13 px | Capturas nas quatro larguras; texto pequeno remanescente fica dentro de ilustrações decorativas com `aria-hidden` |
| Cor discreta insuficiente em alguns painéis | `--quiet` de `#748178` para `#99a79d` | Contraste aproximado de 7,59:1 sobre `#0b1110`, 7,02:1 sobre `#111b17`, 6,91:1 sobre `#111d15` e 6,89:1 sobre `#131c20` |
| Composição absoluta de partículas disputava espaço com o texto mobile | Arte passa ao fluxo normal abaixo da abertura em telas até 760 px | Texto, chamadas e composição separados em 320/390 px |
| Cortes e excesso de densidade nas capas e metadados | Ajustes de proporção, posições e espaçamentos de OrderFlow, DeuBranco e CardSort; metadados passam a quebrar linhas | Catálogo, home e quatro casos conferidos novamente |
| Fallback alterava quebras e excedia espaço estreito | Faixa de áreas em duas colunas; títulos e símbolo decorativo ajustados em 320 px | Oito páginas com fontes externas bloqueadas |
| E-mail podia disputar espaço com o botão de cópia | `min-width:0`, quebra do endereço e alvo de cópia de pelo menos 44 px | Rodapé e currículo estreitos conferidos |
| Quebras ocultadas pelo CSS juntavam palavras | Espaço explícito após quebras de linha nos textos afetados | Abertura, catálogo e parágrafos responsivos |
| Link de pular conteúdo não transferia o foco ao destino | `tabindex="-1"` no `main` | Ativação por teclado confirmou foco no `main` |
| Cabeçalho mobile mudava o fluxo ao carregar o módulo | Marcador `js` síncrono antes da folha de estilo distingue a navegação sem JavaScript; controles continuam condicionados a `enhanced` | CLS local passou de aproximadamente 0,416 para 0 |
| Subtítulo do currículo impresso ficava pouco contrastante no branco | Cor e tipografia de impressão explícitas | Prévia de mídia de impressão examinada; PDF A4 de uma página gerado pelo motor do navegador |
| Imagem social somente em SVG | PNG próprio de 1200 × 630, aproximadamente 44 kB, e referência `og:image` atualizada | Arquivo examinado visualmente e entregue no build |

O contraste acima é uma conta sobre cores sólidas específicas, não uma auditoria de cada pixel, estado ou requisito WCAG. A identidade editorial escura e verde e os efeitos existentes foram mantidos. A referência principal foi aberta para comparação visual; seus textos e experiências não foram usados como conteúdo do portfólio.

## Interações no navegador

| Fluxo | Resultado observado |
| --- | --- |
| Menu mobile por teclado | Enter abre; Tab alcança os links; Escape fecha e devolve foco ao botão |
| Link interno do menu | Fecha o menu, atualiza a âncora e transfere o foco à seção escolhida |
| Clique fora e troca para desktop | Menu fecha; estado expandido é atualizado |
| Pular para conteúdo | Foco no `main`, com destino `#main` |
| Etapas de processo por Enter | Abrem/fecham e sincronizam o nó ativo do diagrama; fechamento da etapa ativa mantém a regra implementada |
| Filtros com mouse e teclado | Todos: 4; Dados: 2; Produto: 2; Requisitos: 3; Software: 2. Estado selecionado e contagem anunciada conferidos |
| Copiar e-mail | Mensagem de sucesso visível após o clique; não foi lido o conteúdo pessoal do clipboard |
| Navegação e leitura | `aria-current` na seção ativa e progresso chegando ao fim na área de contato |
| Hover das capas | Perspectiva e escala aplicadas ao movimento do ponteiro |
| Movimento reduzido | Nenhuma animação em execução na amostra; canvas estático entre leituras |
| Movimento normal | Canvas e animações ativos; quatro capas com pausa ao sair da viewport |
| Sem JavaScript | Conteúdo e links de navegação disponíveis; controles dependentes de scripts omitidos |
| Página inexistente | Resposta HTTP 404 real confirmada, com links de recuperação |
| Console | Sem erros ou avisos na consulta final da página de currículo |

A impressão foi conferida por mídia `print` e geração PDF do navegador. Não houve impressão física nem operação da janela nativa de impressão do Windows.

## Build e contratos

`npm run check` e `npm run build` passaram, gerando oito páginas e validando 193 referências locais/assets/âncoras. O build para `/portfolio` também foi conferido em diretório separado, preservando o `dist/` local.

O comando `npm test` foi tentado e os seis testes falharam na conexão com `fetch failed`. A verificação isolada confirmou `EACCES` ao conectar do terminal a `127.0.0.1:4321`. Portanto, esta rodada não tem uma execução aprovada do comando de testes Node.

Os seis contratos existentes foram reproduzidos pelo navegador na mesma origem e passaram: sete páginas normais com HTTP 200/HTML/idioma/um h1/identidade; recuperação de 404; MIME e conteúdo dos quatro assets originais; atribuição coletiva, evidências e limites do DeuBranco; currículo imprimível sem telefone/meses conflitantes; requisição malformada com HTTP 400 sem derrubar o serviço. Essa conferência usa o servidor já existente, enquanto a suíte Node inicia um servidor isolado; os procedimentos não são idênticos.

O PNG adicional respondeu HTTP 200 com 44.275 bytes, mas o processo antigo ainda retornou `application/octet-stream`. O mapa MIME foi corrigido em `scripts/serve.mjs`. É necessário reiniciar esse processo com `npm run dev` para carregar código do servidor, pois o watcher só reconstrói alterações em `src/` e `public/`. A correção de MIME não foi verificada em um processo reiniciado nesta sessão. O SVG original permanece disponível.

## Medições locais de carregamento

Amostras pelo navegador, sem limitação de rede/CPU, com cache aquecido. Não são Lighthouse, resultados de campo ou garantia de desempenho em produção.

| Amostra após correções | TTFB | DOMContentLoaded | Load | LCP | CLS |
| --- | --- | --- | --- | --- | --- |
| Home em 390 px | 2,9 ms | 145,9 ms | 152,7 ms | 148 ms | 0 |
| Home em 1440 px | 6,3 ms | 297,8 ms | 319,1 ms | 344 ms | 0 |

A amostra mobile anterior registrou CLS de 0,4157, associado à mudança inicial do cabeçalho. O ajuste foi verificado por nova carga e captura. INP, consumo de bateria, FPS sustentado e comportamento em aparelhos físicos não foram medidos.

## Conteúdo e limites mantidos

Nenhuma métrica, resultado, cargo ou contribuição foi acrescentada aos dados dos projetos. Olist mantém a leitura de base histórica, com 99.441 pedidos, 96.470 entregas elegíveis e 6.534 atrasadas (6,77%), conforme período e limites documentados. DeuBranco preserva o trabalho em equipe e a contribuição em requisitos, diagramas de sequência e casos de teste. CardSort mantém participantes fictícios e o limite da evidência com H2. Os meses conflitantes da experiência continuam omitidos. As capas continuam ilustrações conceituais.

Não houve auditoria completa WCAG, leitor de tela, testes em múltiplos motores de navegador, validação do compartilhamento social em uma URL pública, reexecução dos backends/ML ou publicação. As substituições temporárias de viewport, fontes, cache, movimento e execução JavaScript foram restauradas ao fim da conferência.

## Retomada — 11/11/2026

O conteúdo acima já existia nos arquivos ao iniciar esta retomada. Seus resultados são históricos: não foram obtidos novamente nesta sessão.

Não havia servidor na porta 4321. `npm run dev` gerou o site e informou escuta em `127.0.0.1:4321`. A primeira abertura no navegador integrado, anterior ao início do servidor, retornou `ERR_CONNECTION_REFUSED`; com o servidor iniciado, uma nova abertura retornou `ERR_CONNECTION_TIMED_OUT`. O Chrome conectado também retornou timeout. A checagem pelo Node retornou `connect EACCES 127.0.0.1:4321`.

`npm run check` e `npm run build` passaram, com oito páginas e 193 referências verificadas. Os seis testes HTTP falharam em `fetch failed` por conexão local; isso não confirma nem refuta seus contratos de conteúdo. Não houve nova captura das páginas, teste real de teclado, impressão ou medição de performance. A correção de MIME do PNG permanece sem confirmação HTTP nesta rodada, mesmo com o processo iniciado a partir do código atual.

Uma inspeção do CSS identificou que o menu mobile aberto não tinha limite de altura. Foi adicionado `max-height` relativo à viewport, com fallback `vh` e preferência por `svh`, rolagem vertical e contenção de rolagem. Isso permite alcançar os últimos links em janelas baixas e com zoom. A navegação sem JavaScript continua no fluxo normal e sem esse limite. A correção precisa de conferência visual em uma janela baixa, incluindo Tab até “Ver currículo”, Escape e foco restaurado.

O contrato existente de assets foi ampliado para conferir também `social.png`: HTTP 200, MIME `image/png`, assinatura PNG e dimensões 1200 × 630. Essa ampliação ainda não passou por execução HTTP bem-sucedida; a limitação de conexão persiste. Nenhum dado dos projetos foi alterado.

O servidor iniciado pelo agente foi encerrado para liberar a porta. Próximo passo: iniciar `npm run dev` no terminal do usuário, confirmar que o endereço abre e então repetir a matriz visual de 1440/768/390/320 px, os fluxos de interação e a resposta HTTP do PNG. Não alterar firewall, isolamento ou políticas de segurança para contornar o bloqueio.

## Conferência após o servidor ser iniciado pelo usuário — 11/11/2026

O navegador integrado abriu o site normalmente após o usuário iniciar o servidor. Não foi necessário mudar políticas de segurança, firewall ou arquitetura. O servidor do usuário foi mantido em execução.

### Páginas e correções

Foram capturadas e examinadas as oito páginas inteiras em 1440, 768, 390 e 320 px: home, catálogo, quatro casos, currículo e 404. As medidas de `scrollWidth` coincidiram com `clientWidth` nas amostras, inclusive quando a barra vertical reduziu a área útil em 15 px. A composição mobile de partículas permaneceu separada do texto; os endereços de e-mail couberam nas telas estreitas.

A revisão encontrou sobreposições nas ilustrações de OrderFlow e DeuBranco, especialmente em tablet e em 320 px. `global.css` agora dimensiona a tipografia e os espaços internos dessas duas artes pela largura do próprio painel (`cqw`, com `container-type:inline-size`) até 1000 px. As posições dos elementos de OrderFlow foram separadas; o cartão do DeuBranco foi compactado. As figuras dos casos usam proporção 1,4 nesse intervalo. A proporção comum dos cards do catálogo foi preservada para manter as linhas alinhadas.

As novas composições foram examinadas novamente no catálogo em 768/390/320 px e nos casos afetados. As capturas de antes e depois foram exibidas e examinadas na sessão; não foram salvas como arquivos independentes. Nenhum texto ou dado dos projetos foi modificado.

### Interações conferidas novamente

| Verificação | Resultado observado |
| --- | --- |
| Menu em 320 × 400 px | Rolagem interna disponível; cinco Tab alcançaram “Ver currículo”, com o link dentro da viewport |
| Escape | Fechou o menu e devolveu foco a “Abrir menu” |
| Clique fora e mudança para desktop | Estado expandido voltou a `false` |
| Link “Como trabalho” no menu da home | Fechou o painel, atualizou `#processo` e transferiu foco à seção |
| Pular para o conteúdo | Ativação por Enter transferiu foco a `main` |
| Filtros por Enter | Produto 2; Requisitos 3; Dados 2; Software 2; Todos 4, com contagem e `aria-pressed` coerentes |
| Etapas 02/03/04 por Enter | Abriram uma por vez e sincronizaram o nó do diagrama; fechar a última removeu o destaque |
| Cópia de e-mail | Confirmação de sucesso visível; não foi lido o clipboard pessoal |
| Navegação e progresso | “Projetos” recebeu `aria-current` após a rolagem; progresso chegou a aproximadamente 1 no contato |
| Hover em desktop | Movimento do ponteiro aplicou perspectiva, rotação e escala ao card |
| Movimento reduzido | Zero animações em execução na amostra; canvas idêntico após oito quadros |
| Movimento normal | Canvas mudou após oito quadros e as animações voltaram a executar |
| Home sem JavaScript | Links do menu disponíveis no fluxo normal; conteúdo e navegação preservados |
| Console da carga final | Nenhum erro ou aviso retornado na consulta |

### Fontes e impressão

DM Sans e Instrument Serif foram confirmadas como carregadas. Com as URLs do Google Fonts bloqueadas temporariamente e cache desabilitado, a home e as sete páginas restantes continuaram sem rolagem horizontal em 320 px. Foram examinadas capturas completas da home, OrderFlow, DeuBranco e currículo com fallback. Na home desktop, a amostra de texto visível fora de regiões `aria-hidden` não encontrou fontes menores que 12 px.

O currículo foi examinado em mídia `print` e gerado pelo motor do navegador com `preferCSSPageSize`: PDF A4 de uma página, aproximadamente 88 kB. A captura de impressão mostrou todas as seções, com texto escuro em fundo branco. Não houve impressão física nem operação da janela nativa do Windows; o PDF desta checagem não foi salvo como entrega independente.

### Respostas HTTP e limites da suíte

As sete páginas normais e `/404.html` responderam HTTP 200 com HTML. A URL inexistente `/rota-inexistente-revisao/` respondeu HTTP 404 e o link “Conhecer os projetos” abriu o catálogo. O acesso direto a `/404.html` tem HTTP 200 porque é um arquivo existente; a rota inexistente é a verificação de erro real.

Scripts, CSS e favicon responderam com seus tipos MIME corretos. `social.png` respondeu HTTP 200, `image/png`, 44.275 bytes, assinatura PNG e dimensões 1200 × 630. A pendência de MIME das seções anteriores foi resolvida e confirmada.

Pelo navegador também passaram as verificações de atribuição coletiva/evidências/limites do DeuBranco, currículo imprimível sem os padrões de telefone/meses conflitantes cobertos pela suíte e requisição `/%ZZ` retornando 400 seguida de home saudável. São verificações contra o servidor iniciado pelo usuário. Não equivalem a uma nova execução aprovada de `npm test`, cujo bloqueio de conexão no terminal continua registrado no histórico.

### Amostras locais de carregamento

Sem limitação de CPU/rede, após várias visitas, usando a navegação do navegador e observadores com entradas armazenadas de LCP/CLS. Uma amostra por largura; valores não representam aparelho físico nem produção.

| Home | TTFB | DOMContentLoaded | Load | LCP | CLS |
| --- | --- | --- | --- | --- | --- |
| 390 px | 9,1 ms | 463,3 ms | 479,7 ms | 344 ms | 0 |
| 1440 px | 8,2 ms | 414 ms | 416,5 ms | 440 ms | 0 |

Não foram medidos Lighthouse, INP, FPS sustentado ou consumo de bateria. As substituições de viewport, fontes, cache, mídia e JavaScript foram restauradas. A home foi deixada aberta no navegador integrado. A implementação continua local, sem publicação.

## Correções complementares de interação — 11/11/2026

Após o pedido de aplicar as correções, a inspeção confirmou que os ajustes das capas e do menu descritos acima já estavam no código. Foram corrigidos outros problemas de interação identificados nesta passagem:

| Problema | Alteração e conferência |
| --- | --- |
| Texto da abertura com `pointer-events:none` | Removida a restrição da área de texto; duplo clique no navegador selecionou a palavra “negócio” |
| Símbolos decorativos incluídos na leitura acessível | Adicionado `aria-hidden` ao asterisco do título, separadores entre áreas e marca decorativa do card de experiência; a árvore acessível passou a anunciar o título sem o símbolo |
| Falha ao carregar o módulo deixava `.js` ativo e escondia a navegação de fallback | O evento de erro do script principal remove os marcadores de aprimoramento; bloqueios temporários de `site.js` e, separadamente, `particles.js` exibiram os cinco links mobile no fluxo normal, sem botão inoperante |
| Handler do menu interceptava cliques modificados em âncoras | Ctrl/Meta/Shift/Alt e eventos já tratados não passam pelo redirecionamento de foco/âncora; na amostra com Ctrl, a página original manteve URL e menu, sem executar o fluxo de clique comum. A criação efetiva de uma nova aba não foi observada pela integração |

O link de projetos continuou navegável durante a falha simulada. Após restaurar rede/cache e recarregar normalmente, o link “Como trabalho” fechou o menu e transferiu foco a `#processo`. A home permaneceu sem rolagem horizontal nas medidas de 320/768/1440 px. Sintaxe e build passaram novamente, com oito páginas e 193 referências verificadas. Não houve nova execução aprovada de `npm test`; permanece a limitação registrada anteriormente.

As substituições temporárias do navegador foram restauradas. Nenhuma informação profissional, atribuição ou métrica de projeto foi alterada.
