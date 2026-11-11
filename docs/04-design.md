# Planejamento de design e experiência

> A implementação ampliou as animações e adicionou partículas em canvas conforme o pedido posterior de Caio. As decisões efetivas e o limite de revisão visual estão no [registro atual](08-implementacao.md).

## Direção visual

**Conceito: clareza entre problema e evidência.** O portfólio terá presença visual próxima à referência principal: fundo escuro, títulos expressivos, respiro e uma composição técnica no topo. A identidade de Caio será construída por um fluxo de conexões, com verde como acento e conteúdos sobre produto, requisitos, dados e software.

O elemento central será um desenho vetorial próprio: quatro pontos ligados por linhas, representando **Problema → Regra → Solução → Evidência**. Cada ponto corresponde a uma parte do conteúdo. A geometria pode reagir discretamente à seção ativa; o significado deve continuar claro na versão estática.

Essa composição é uma metáfora visual, não um diagrama dos sistemas internos do GEDAI. Um mapa com quatro áreas oferece identidade sem exigir cena 3D para apresentar o conteúdo.

## O que aproveitar das referências

As observações abaixo vêm de extração textual e, na referência principal, do README/CSS. Não foi possível revisar screenshots. As escolhas para Caio são propostas, não reprodução visual validada.

| Referência | Ideia aproveitada | Adaptação |
| --- | --- | --- |
| [Giovane](https://giogodoi.github.io/Portfolio/) | Método ligado a evidências; contraste tipográfico; composição escura descrita no CSS | Fluxo próprio de quatro momentos, conteúdo de Caio e acento verde |
| [Arsh](https://arshjaved.in) | Apresentação direta e projetos visíveis cedo | Clareza imediata e destaque seletivo; nenhum contador de alcance sem prova |
| [Custard](https://custard.top/en) | Casos que permitem seguir escolhas e verificação | Bloco “problema, decisão, evidência” em cada caso |
| [Luca Félix](https://luca-felix.com/pt) | Voz pessoal e projetos apresentados por utilidade | Textos naturais em português, com foco no visitante |
| [Samrit](https://samrit.dev) | Projetos com contexto de sistema e trajetória | Visão resumida da solução, sem transformar a home num catálogo extenso |

Não copiar textos, monograma, código, projetos, animações específicas ou conquistas dos autores. Bibliotecas e fontes adotadas na implementação devem ter licença registrada.

## Tokens propostos

| Token | Valor inicial | Uso |
| --- | --- | --- |
| `color.background` | `#0B1012` | Fundo principal |
| `color.surface` | `#131C20` | Superfícies de cards |
| `color.text` | `#F2F5F3` | Texto principal |
| `color.muted` | `#A8B8B0` | Texto secundário |
| `color.accent` | `#A7F3C2` | Ação principal, conexão ativa e foco |
| `color.onAccent` | `#0B1012` | Texto do botão preenchido |
| `color.border` | `#31443D` | Separadores decorativos |
| `color.focus` | `#A7F3C2` | Contorno de foco de 2px, offset de 4px |
| `radius.card` | `20px` | Cards e painéis |
| `radius.control` | `10px` | Botões e campos futuros |
| `content.max` | `1200px` | Largura útil |
| `text.max` | `65ch` | Corpo dos casos |

Os valores são especificação inicial. Contraste dos pares de texto e de controles deve ser medido no contexto final; borda decorativa não pode ser o único sinal de estado. Botões usam também texto, preenchimento ou contorno perceptível.

**Tipografia:** Geist ou família sans equivalente para texto e navegação; Instrument Serif em palavras selecionadas dos títulos; monoespaçada do sistema para pequenos rótulos técnicos. Isso mantém o contraste editorial da referência, com hierarquia e composição próprias. Hospedar arquivos WOFF2 com licença, `font-display: swap` e fallbacks. Evitar fonte pontilhada em textos essenciais.

**Escala:** corpo 17–18px, entrelinha 1,6; rótulos 13–14px; títulos de card 24–28px; h2 fluido entre 32–56px; h1 entre 42–88px. No celular, controlar quebra de linha sem cortar palavras. Serifas em destaque não substituem a legibilidade do texto.

**Espaçamento:** escala de 4, 8, 12, 16, 24, 32, 48, 64, 96 e 128px. Seções com 96px no desktop e 64px no celular; ajustar pela densidade real. Margens laterais entre 20 e 64px.

## Wireframe da home

Esquema de organização, sem representar layout final aprovado:

```text
DESKTOP
┌─────────────────────────────────────────────────────────────┐
│ Caio Teixeira    Projetos  Como trabalho  Experiência Contato │
│                                                  Currículo  │
├─────────────────────────────────────────────────────────────┤
│ Produto · Requisitos · Dados · Software                      │
│ Do problema à entrega,          Problema ─── Regra            │
│ com clareza em cada decisão.          │          │            │
│ Resumo curto                    Evidência ─ Solução          │
│ [Conheça meus projetos] [Ver currículo]                       │
├─────────────────────────────────────────────────────────────┤
│ Projetos, decisões e evidências.                             │
│ [OrderFlow]          [Olist]            [DeuBranco]            │
│ [CardSort Lab — chamada complementar]                        │
├─────────────────────────────────────────────────────────────┤
│ Entender → Definir → Construir → Conferir                     │
│ Decisão selecionada + explicação + link de evidência          │
├─────────────────────────────────────────────────────────────┤
│ Experiência GEDAI       Responsabilidades e contexto         │
│ Competências            Exemplos ligados aos projetos        │
│ Sobre / UFLA / Idiomas                                       │
├─────────────────────────────────────────────────────────────┤
│ Vamos conversar?        [Enviar e-mail] LinkedIn GitHub       │
└─────────────────────────────────────────────────────────────┘

CELULAR
┌─────────────────────────┐
│ Caio Teixeira    Menu   │
├─────────────────────────┤
│ Quatro áreas            │
│ Título em 3–4 linhas    │
│ Resumo                  │
│ [Projetos] [Currículo]  │
│ Fluxo vetorial compacto │
├─────────────────────────┤
│ OrderFlow               │
│ Olist                   │
│ DeuBranco               │
│ CardSort Lab            │
├─────────────────────────┤
│ Como trabalho           │
│ Blocos em sequência     │
│ GEDAI                   │
│ Competências / Sobre    │
│ Contato                 │
└─────────────────────────┘
```

O fluxo do topo é secundário ao título. Não pode empurrar os botões muito abaixo da primeira tela em celulares comuns. No desktop, usar proporção aproximada 60/40 entre texto e composição; se o título precisar, reduzir a ilustração.

## Componentes e estados

| Componente | Especificação | Estados |
| --- | --- | --- |
| Cabeçalho | Marca textual, até quatro links e currículo; fundo sólido/translúcido legível | Inicial, rolagem, foco, menu mobile aberto |
| Botão | Verbo claro, alvo confortável de 44px, ícone opcional | Padrão, hover, foco, pressionado |
| Card de projeto | Categoria, imagem/esquema, pergunta, papel e ações | Padrão, hover discreto, foco nos links |
| EvidenceTrail | Problema, decisão e evidência de um projeto | Conteúdo completo sem JS; seleção aprimorada com JS |
| Item de experiência | Instituição, papel, texto e período quando confirmado | Leitura estática, sem interação obrigatória |
| Grupo de competência | Ferramentas selecionadas e link para exemplo | Leitura estática |
| Contato | E-mail visível e links convencionais | Cópia confirmada por mensagem acessível ou falha com alternativa |
| Mídia | Legenda, origem, proporção reservada | Carregada; fallback descritivo se falhar |

Cards não devem conter botões dentro de links que envolvem o card inteiro. Evitar carrossel de tecnologias em movimento contínuo; um conjunto estável com exemplos favorece leitura e acessibilidade.

## Estudo de caso

```text
Projetos / OrderFlow
Título + resumo + tipo de projeto + minha contribuição
Repositório | Demonstração, se disponível
Imagem ou esquema com legenda
Problema e restrições
Decisões: o que escolhi, por quê e qual o custo
Visão da solução
Evidências e resultado contextualizado
Limitações e evolução
Próximo caso | Contato
```

Limitar cada caso inicial a uma leitura de poucos minutos, com aprofundamento pelos links. Não inserir uma grande lista de dependências antes de explicar o problema.

## Movimento

- Transições de 160–240ms para controles; revelações discretas de até 300ms.
- Animar `opacity` e `transform` quando necessário; todo conteúdo essencial começa legível se o script falhar.
- Usar rolagem nativa e navegação por âncoras; nada de bloquear roda do mouse ou impor telas por rolagem.
- Pausar efeitos fora da viewport; não executar loop de canvas contínuo na primeira entrega.
- Com `prefers-reduced-motion: reduce`, remover deslocamentos e efeitos contínuos, preservando foco e estados.
- Three.js e partículas ficam como experimento posterior, condicionado a desempenho e benefício visual demonstráveis.

## Responsividade e acessibilidade

Adotar layout fluido, com verificações em 360, 390, 768, 1024 e 1440px; também conferir reflow em 320 CSS px e zoom de 200%. Cards passam de três colunas para duas e depois uma conforme o espaço útil, não pelo nome do dispositivo.

O menu mobile deve funcionar por teclado, anunciar expansão, fechar com Escape e devolver foco ao acionador. Preferir painel simples sem modal quando isso bastar. Conteúdo, links e ordem de leitura devem continuar úteis sem estilos ou JavaScript.

Um tema escuro bem resolvido é suficiente na primeira versão. Tema claro e alternância são expansão, com revisão própria de todos os estados. Não incluir controle que apenas troca parte das cores.

## Assets necessários

| Asset | Origem | Situação |
| --- | --- | --- |
| Marca textual e fluxo vetorial | Criação própria | Especificados, ainda não desenhados como assets finais |
| Capa OrderFlow | Diagrama próprio ou captura da API | Pendente |
| Capa Olist | Gráfico agregado com legenda e fonte | Pendente |
| Capa DeuBranco | Tela demonstrativa ou artefato público da contribuição | Pendente |
| Capa CardSort | Tela com dados fictícios identificados | Pendente |
| Currículo público | Versão revisada do PDF fornecido | Pendente |
| Imagem social e favicon | Composição própria | Pendente |

Preferir WebP/AVIF para screenshots e SVG para esquemas. Definir dimensões para evitar mudança de layout. Não gerar interfaces fictícias para apresentá-las como screenshots dos projetos.
