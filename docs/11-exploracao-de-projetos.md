# Exploração dos projetos — 11/11/2026

## Catálogo

A página `/projetos/` combina busca textual com os filtros existentes por área. O índice de busca usa nome, categoria, descrição, atuação, áreas e tecnologias já publicados; as ilustrações decorativas não entram na busca. A comparação ignora acentos e maiúsculas e exige todas as palavras digitadas.

A seleção fica nos parâmetros `area` e `q` da URL. Recarregar ou abrir esse endereço restaura os controles e os resultados; digitar atualiza a URL com `replaceState`, sem criar uma entrada de histórico por caractere. A restauração também considera `popstate` e retorno pelo cache de navegação do navegador. Parâmetros de área desconhecidos não selecionam um filtro inexistente.

A contagem está visível e é anunciada como status. Zero resultados mostra uma mensagem; o botão de limpar volta a todos os projetos e mantém o foco no campo de busca. Escape limpa somente o texto. A busca tem um pequeno intervalo de 160 ms para não anunciar cada tecla imediatamente. Enter aplica o texto na hora. Projetos que reaparecem recebem uma entrada curta, desativada com movimento reduzido.

Sem o aprimoramento JavaScript, os controles são ocultados e os quatro projetos permanecem disponíveis no HTML.

## Estudos de caso

O índice ganhou indicação de seção ativa com `aria-current`, contador visual e progresso dentro do corpo do caso. A largura de tablet mantém a coluna lateral; até 760 px, o índice vira uma faixa com rolagem horizontal que permanece abaixo do cabeçalho durante a leitura do corpo. Os links continuam sendo âncoras nativas. As seções recebem foco após a navegação e ficam abaixo dos controles fixos.

Foi retirada a centralização horizontal automática do item ativo: durante os testes, esse deslocamento competia com o clique em links fora da área visível. A faixa agora responde à rolagem do visitante e ao foco nativo dos links, sem reposicionamentos automáticos.

Os textos, métricas, denominadores e atribuições dos projetos foram preservados. Não houve envio ao GitHub nem publicação nesta rodada; o usuário pediu para manter o foco no site.

## Conferência no navegador

| Verificação | Resultado |
| --- | --- |
| Filtros sem texto | Produto 2; Requisitos 3; Dados 2; Software 2; Todos 4 |
| Dados + SQL | Apenas Olist Logistics; URL e seleção restauradas após recarga |
| Produto + SQL | Estado vazio; limpar restaurou os quatro projetos e foco no campo |
| `validacao` | Encontrou DeuBranco sem exigir acento |
| `Java Spring` | OrderFlow e CardSort Lab |
| Catálogo em 320, 768 e 1440 px | Busca, filtros, mensagem e cards examinados; sem rolagem horizontal da página nas amostras |
| Quatro casos em 320 px, navegação por Enter | `#resultado` recebeu foco; seção a aproximadamente 184 px do topo, abaixo do índice, que termina em aproximadamente 154 px |
| Índice em 390, 768 e 1440 px | Faixa mobile e coluna lateral examinadas; destaque e contador acompanharam a seção |
| Novo módulo HTTP | 200 com `text/javascript` |
| Movimento reduzido | Zero animações em execução nos cards após alternar Dados e Todos |
| Falha simulada do novo módulo | Marcador de aprimoramento removido, controles ocultos e quatro projetos disponíveis |
| Console antes da simulação de falha | Nenhum aviso ou erro retornado |

As substituições de mídia, rede e viewport foram restauradas. As capturas foram examinadas na sessão, sem salvar arquivos independentes. Não houve teste em aparelho físico ou com leitor de tela.

O novo comportamento está em `src/scripts/project-experience.js`, carregado pelo módulo principal e copiado pelo build. O contrato de assets da suíte também inclui esse arquivo. O bloqueio de conexões HTTP no terminal permanece descrito nos registros 09 e 10; as verificações desta rodada no navegador usaram o servidor iniciado pelo usuário.
