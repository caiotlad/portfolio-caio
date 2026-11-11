# Validação para abertura do repositório

Revisão de 11/11/2026, baseada na `main` após a inclusão dos resumos e do compartilhamento dos casos.

## Escopo

Revisão dos arquivos versionados, conteúdo, scripts de geração e servidor, traduções, documentação e histórico disponível. O currículo PDF original, arquivos de ambiente, dependências e builds não fazem parte da árvore publicada.

## Verificações desta revisão

- `npm run check`: 31 arquivos JavaScript/JSON aprovados.
- `npm test`: 13 testes aprovados, com geração automática do build.
- Build na raiz: 16 páginas, 880 referências locais/âncoras e 1.722 textos/atributos conferidos para tradução.
- Build e 13 testes com `BASE_PATH=/portfolio-caio` e `SITE_URL=https://caiotlad.github.io`: aprovados; 848 referências locais/âncoras (canonical e alternates absolutos não entram nessa contagem).
- Links de repositórios e artefatos dos casos: recuperados pelo conector GitHub; disponibilidade externa não é garantida permanentemente.
- CSS: formatação sem alteração de valores, seletores ou ordem de regras.

Execução local com Node.js 24.22.1. O workflow de verificação foi configurado para Node.js 22.12.0, mas seu resultado remoto deve ser consultado no GitHub após o envio.

 Os contratos cobrem páginas em português e inglês, 404 real, MIME dos assets, imagem social PNG, atribuição coletiva, currículo e compartilhamento. A geração também é conferida com o caminho `/portfolio-caio` e origem de produção configurada.

Não foram encontrados tokens, chaves privadas ou credenciais nos arquivos examinados. O e-mail de contato e os perfis profissionais são públicos por intenção do site. O histórico Git é preservado; arquivos removidos de uma revisão continuam acessíveis em commits anteriores.

## Conferência visual anterior

Os registros anteriores relatam inspeção das oito páginas originais em 320, 390, 768 e 1440 px, além de menu, teclado, filtros, clipboard, movimento reduzido, fallback de fontes e currículo A4 em uma página. Não há capturas independentes versionadas para reproduzir essa evidência.

A alteração anterior dos resumos dos casos e do compartilhamento teve testes automatizados, mas não foi inspecionada visualmente. Nesta revisão, o navegador remoto retornou `ERR_CONNECTION_REFUSED` ao acessar o servidor local deste ambiente. Portanto, não há nova aprovação visual dos resumos, nem de cliques reais de clipboard. Leitor de tela, Lighthouse e aparelho físico também não foram cobertos.

## Publicação

A abertura do código e a hospedagem são etapas separadas. A configuração prevista usa `SITE_URL=https://caiotlad.github.io` e `BASE_PATH=/portfolio-caio`. A visibilidade do repositório será alterada por Caio. O host deve ser configurado depois e suas rotas, 404 e compartilhamento precisam de conferência no endereço público.



## Revisão de design — 11/11/2026

Nome e atuação destacados na abertura; textos funcionais mais diretos; contribuição antes das tecnologias nos cartões; ferramentas agrupadas por finalidade; contato com atalhos para LinkedIn e currículo. Os casos incluem artefatos com origem fixada em commit: roteiro do OrderFlow, gráfico histórico do Olist (Olist/Kaggle, CC BY-NC-SA 4.0), diagrama do DeuBranco e teste do CardSort. Os exemplos não são executados no portfólio.

O catálogo passa área e busca na navegação para o caso e recupera ambas nos links de retorno. A navegação geral continua oferecendo o catálogo sem filtros. Testes incluem retorno com busca, área inválida, caracteres especiais e acesso direto. Build, sintaxe e 16 testes passaram localmente.



## Minha história e fundo interativo — 11/11/2026

Sete capítulos na seção Minha história: UFLA, QA no GEDAI, requisitos, PO da Equipe Rebeldes e projetos satélites, NIAD/direção de marketing, Avança Café e convite ao Bootcamp Ipê Start. O painel acompanha a leitura e o índice usa âncoras nativas. Textos e marcos ficam disponíveis sem JavaScript. O ano da promoção a PO foi omitido: março de 2025, informado na conversa, conflita com a entrada no GEDAI em setembro de 2025. NIAD e convite ao bootcamp não receberam datas inventadas.

Power BI, Figma, Miro, Kanban, metodologias ágeis e Postman ampliam o repertório para 27 itens. Power BI mantém explícito que o dashboard nativo do Olist ainda é próximo passo.

O campo de fundo responde ao ponteiro sem capturar cliques, respeita movimento reduzido e a pausa global, não mantém animação em aba oculta e usa um estado estático em dispositivos sem ponteiro preciso. A esfera da abertura também responde mais claramente ao mouse.

Build, sintaxe e 18 testes passaram localmente. Os testes novos verificam o capítulo ativo e o contador com movimento pausado, além de pausa/retomada/aba oculta do fundo. A inspeção visual da publicação é uma etapa separada dos testes unitários.
