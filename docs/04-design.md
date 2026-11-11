# Design e interação

A apresentação conecta produto, requisitos, dados e software pela narrativa “Do problema à entrega”. O conteúdo começa com uma apresentação curta e projetos; depois mostra processo, experiência, tecnologias e contato.

## Identidade

Fundo escuro, acento verde e títulos em Instrument Serif contrastam com o texto em DM Sans. As cores, medidas e regras responsivas estão em `src/styles/global.css`. Os valores finais do CSS prevalecem sobre qualquer estudo anterior de paleta.

O canvas do início é decorativo e não carrega informação essencial. As capas dos projetos também são ilustrações conceituais, identificadas nos casos. O easter egg no rodapé revela a referência da paleta sem competir com os caminhos principais.

## Movimento

O controle de efeitos persiste a escolha no navegador e respeita a preferência de movimento reduzido do sistema. O canvas pausa fora da área visível e quando a aba fica oculta. As interações de perspectiva só atuam com ponteiro preciso. Animações não bloqueiam a leitura, os cliques ou a rolagem nativa.

## Navegação

Projetos estão acessíveis pela home, pelo catálogo e pelo menu do cabeçalho. Os casos começam com uma visão rápida e mantêm um índice de leitura. Busca e filtros usam controles convencionais; resultados e cópias são anunciados por regiões de status. O menu mobile fecha por Escape e devolve o foco quando necessário.

Os detalhes de processo e tecnologias usam `details/summary`. Os diálogos usam `dialog`. Sem JavaScript, o HTML mantém os conteúdos e links principais, enquanto controles que dependem de scripts são ocultados.

## Responsividade

O layout tem regras para desktop, tablet e celular. Textos essenciais receberam revisão de escala e contraste; as letras muito pequenas que restam dentro de ilustrações são decorativas e estão fora da árvore de acessibilidade. A conferência visual histórica e os limites da revisão atual estão em [validacao.md](validacao.md).
