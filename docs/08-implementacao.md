# Implementação e validação — 10/11/2026

Este documento registra a implementação e a primeira rodada de validação, prevalecendo sobre os estados futuros dos documentos de planejamento. A revisão posterior no navegador, suas correções e os limites da validação atual estão em [09-revisao-visual.md](09-revisao-visual.md).

## Resultado

O site está implementado localmente, com oito páginas estáticas e código organizado em dados, componentes, templates, estilos e scripts. Quatro projetos têm páginas próprias: OrderFlow, Olist, DeuBranco e CardSort. Contato usa links reais de e-mail e perfis públicos. Nenhum formulário simula envio.

O currículo é uma página web com estilo de impressão, baseada no conteúdo fornecido. O visitante pode usar “Imprimir / salvar PDF”. Isso substitui o link direto ao PDF original nesta versão; o arquivo de entrada não é publicado. A experiência mantém a descrição de evolução de QA para produto/requisitos sem escolher os meses conflitantes entre fontes.

## Decisões alteradas em relação ao plano

| Decisão original | Implementação | Motivo |
| --- | --- | --- |
| Astro + TypeScript | Gerador estático com Node.js e módulos JavaScript | npm retornou EACCES ao conectar ao registry; a política do ambiente também rejeitou a tentativa de execução elevada. Nenhuma dependência é necessária para gerar ou servir o site. |
| Conteúdo em coleções Markdown | Dados estruturados em `src/data/projects.mjs`; templates em módulos | Mantém conteúdo centralizado e páginas geradas sem duplicação. |
| Partículas como experimento futuro | Canvas implementado, conforme pedido adicional de animações | Efeito decorativo de cerca de 650 pontos no mobile e 1.150 no desktop, limitado a aproximadamente 30 quadros/s; pausa quando oculto/fora da tela. Isso é um limite de implementação, não uma medição de FPS. |
| Currículo PDF revisado | Currículo web com impressão | Oferece uma versão pública útil sem divulgar automaticamente telefone e datas em conflito. |
| Fontes locais Geist/Instrument Serif | Google Fonts: DM Sans/Instrument Serif; fallbacks do sistema | Instalação de pacotes bloqueada; texto continua utilizável sem carregar fontes externas. |
| Três casos e um card complementar | Quatro páginas de caso | CardSort também recebeu narrativa e evidências; DeuBranco preserva o recorte da contribuição pessoal. |

As fontes usadas pelo Google Fonts seguem suas respectivas licenças de distribuição na origem. O projeto não redistribui os binários. SVGs, diagramas e animações são implementações próprias, sem bibliotecas visuais copiadas das referências.

## Movimento e interação

- **Hero:** partículas em projeção 3D, rotação lenta, pequenas deformações e resposta suavizada ao ponteiro/rolagem. Canvas decorativo, ignorado por tecnologia assistiva.
- **Tipografia:** entrada em sequência, ênfase em serifa itálica e símbolo em rotação lenta.
- **Navegação:** cabeçalho com blur, mudança ao rolar, link ativo por seção e progresso de leitura.
- **Projetos:** perspectiva no hover em dispositivos com ponteiro preciso, brilho na posição do ponteiro, animação de linhas e elementos internos.
- **Processo:** conexão em movimento e nós sincronizados aos detalhes abertos; controles nativos `details/summary`.
- **Catálogo:** filtros combinados pela categoria do projeto, contagem anunciada por região viva e retorno a “Todos”.
- **Contato:** cópia de e-mail com confirmação acessível e alternativa quando clipboard falha.
- **Mobile:** navegação expansível, fechamento por link, Escape e clique externo; layouts em uma ou duas colunas conforme largura.

O código respeita `prefers-reduced-motion` tanto no CSS quanto no loop de canvas. As animações decorativas de painéis recebem pausa por IntersectionObserver. O texto não começa invisível à espera de scripts; revelações são aprimoramento. Sem JavaScript, o menu vira lista de links, os controles de filtro/cópia são omitidos e o conteúdo permanece no HTML.

## Build e rotas

`scripts/build.mjs` gera os templates em `dist/`, copia arquivos públicos e scripts e valida o contrato básico de projetos. `scripts/verify-build.mjs` verifica alvos locais, âncoras, base, um h1 por página, idioma e caracteres inválidos.

`scripts/serve.mjs` serve somente o diretório de build em loopback, aplica tipos MIME, trata 404 e recusa caminhos inválidos. No modo dev, reconstrói após alterações. Não inclui serviço de aplicação, credenciais nem banco.

`BASE_PATH` aplica o prefixo a rotas e assets. `SITE_URL` habilita canonical, sitemap e robots indexável para o endereço configurado. Sem endereço real, não é criada uma identidade de produção fictícia. A revisão posterior preparou a imagem social PNG de 1200 × 630 e atualizou `og:image`; o SVG original continua como fonte.

## Verificação da primeira rodada (histórico)

| Verificação | Resultado | Limite |
| --- | --- | --- |
| `npm run check` | Aprovado | Sintaxe, sem simulação de browser |
| `npm run build` | Oito páginas geradas | Não é teste visual |
| Validador do build | 193 links/assets locais e âncoras válidos | Não verifica disponibilidade das URLs externas |
| `npm test` | Seis testes aprovados | HTTP e contratos de HTML, não automação de UI |
| Build com `BASE_PATH=/portfolio` e domínio de exemplo | Aprovado | Verificação estrutural; não houve publicação no GitHub Pages |
| Servidor local em `127.0.0.1:4321` | Inicialização confirmada | Sem abrir a página com sucesso pela ferramenta visual |

Os testes HTTP iniciam um servidor isolado em porta livre e verificam páginas, rota profunda, MIME dos assets, recuperação de 404, currículo sem telefone do original e requisição malformada sem perda do serviço.

## Limitações e próximos passos

A primeira rodada ficou sem acesso visual ao Chrome. Na revisão posterior, o navegador integrado permitiu examinar as oito páginas em 320/390/768/1440 px e testar teclado, menu, filtros, clipboard, impressão, animações e fallback de fontes. O registro 09 contém os resultados atuais; o comando `npm test` nesta sessão encontrou `EACCES`, apesar de os contratos terem sido conferidos pelo navegador.

Na conferência de 11/11, após o usuário iniciar o servidor, a resposta HTTP do PNG foi confirmada com `image/png`; essa pendência foi resolvida. Antes de publicar: definir repositório/host/endereço e conferir a configuração do host e os links externos relevantes. Leitor de tela, aparelhos físicos e auditoria completa de acessibilidade não foram cobertos. A versão em inglês permanece fora desta primeira implementação.

O site não foi publicado nem teve seus projetos backend/ML reexecutados nesta rodada. As evidências dos casos remetem aos materiais já identificados na pesquisa, sem anunciar novos resultados de execução.
