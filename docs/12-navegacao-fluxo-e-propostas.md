# Navegação, fluxo e propostas — 11/11/2026

## Alterações entregues

O item Projetos do cabeçalho abre os quatro estudos de caso e o catálogo. A implementação usa `details`/`summary` nativos, lista e links comuns, sem aplicar semântica de menu de aplicativo. O projeto atual recebe `aria-current="page"`. No celular, os casos aparecem em um grupo dentro do painel de navegação, com nome e área.

O menu desktop fecha com Escape, clique fora ou saída de foco. Escape restaura foco ao acionador. Mudar para a largura mobile fecha o dropdown; se havia foco nele, o foco vai ao botão do menu mobile. O painel mobile passou a fechar também quando Tab leva o foco para fora do cabeçalho. Seu limite de altura e rolagem interna foram preservados.

O contato do cabeçalho e do menu mobile passou a usar a seção da própria página quando ela existe. Currículo e 404, sem essa seção, continuam apontando ao contato na home. Os casos agora terminam com alternativas explícitas para voltar ao catálogo ou conversar sobre o projeto, além do próximo caso.

## Fluxo revisado

A home apresenta as quatro áreas e permite explorar a seleção. O cabeçalho oferece acesso direto a qualquer caso e ao catálogo. No catálogo, assunto e área podem ser combinados e preservados na URL. O estudo de caso organiza contexto, contribuição, decisões, resultados/limites e evidências, com índice que acompanha a leitura. Ao terminar, há caminhos para outro caso, catálogo ou contato. O currículo segue acessível na abertura, na busca, no menu mobile e no rodapé.

O caminho testado no navegador incluiu catálogo, Olist pelo dropdown, CardSort pelo menu mobile e contato na própria página. A seleção e o estado da página foram conferidos após cada passagem.

## Pesquisa e seis propostas para a próxima rodada

Estas são propostas; não foram implementadas automaticamente nesta revisão. As prioridades são uma avaliação para este portfólio, não resultados medidos com recrutadores.

O estudo da NN/G consultado recomenda leitura fácil de percorrer e clareza sobre problema, participação, processo e restrições. Estou aplicando essa orientação também às áreas de produto, requisitos, dados e software de Caio; essa adaptação é uma inferência para o projeto.

| Adição | Aplicação concreta | Esforço estimado |
| --- | --- | --- |
| Resumo de cada caso | Um bloco curto com problema, minha participação, decisão principal e evidência antes da leitura longa | Baixo |
| Galeria de evidências reais | Exibir trechos verificáveis de diagramas, requisitos, testes e gráficos dos repositórios públicos, com legenda, origem e autoria explícitas | Médio |
| Laboratório interativo | Uma demonstração didática de idempotência/concorrência do OrderFlow ou de denominadores do Olist, identificada como simulação e separada de resultados reais | Alto |
| Controle visível de movimento | Opção para pausar efeitos, incluindo canvas, e lembrar a escolha; a preferência do sistema continua sendo respeitada | Médio |
| Versão English | Traduzir home, casos, navegação, mensagens e currículo; manter a página equivalente ao trocar de idioma, com identificação de língua correta | Médio/alto |
| Notas de bastidor | Três textos curtos baseados em decisões documentadas: requisito e critério de aceitação, escolha de denominador e idempotência | Médio |

Eu começaria pelo resumo e pela galeria: usam evidências já documentadas e ajudam a entender a contribuição antes de investir em demonstrações mais extensas. O controle de movimento também tem prioridade pela quantidade de efeitos existentes.

### Fontes consultadas

- NN/G — [5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/). Base para leitura rápida, participação, decisões e artefatos reais.
- W3C/WAI — [Example Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/). Referência conceitual para navegação expansível, Tab, Escape e saída de foco. O exemplo não foi copiado nem tratado como certificação de acessibilidade.
- web.dev — [Animation and motion](https://web.dev/learn/accessibility/motion). Fundamenta oferecer controle de pausa além de observar movimento reduzido.
- W3C — [Internationalization Quick Tips](https://www.w3.org/International/quicktips/index). Fundamenta identificação do idioma e links visíveis para a versão localizada.

## Validação e limites

No navegador: dropdown em 1440 e 768 px, menu mobile em 390 × 844 e 320 × 400 px, abertura por Enter, Tab para o primeiro caso, Escape com foco restaurado, link direto ao Olist, seleção do CardSort no mobile e contato local com foco em `#contato`. Os estados da página atual foram confirmados. A faixa de índice e o catálogo também foram revisados na rodada registrada em 11.

Em 320 × 400 px, a rolagem interna alcançou o currículo; Tab para fora passou a fechar o painel. Ao trocar de desktop para 320 px com foco no dropdown, o painel fechou e o foco foi para Abrir menu. A amostra permaneceu sem rolagem horizontal da página.

Sintaxe e build foram executados; o build contém oito páginas e 353 referências locais/âncoras. O bloqueio dos testes HTTP no terminal permanece registrado nos documentos 09–11. Não houve teste com leitor de tela ou em aparelho físico, nem publicação ou envio ao GitHub.
