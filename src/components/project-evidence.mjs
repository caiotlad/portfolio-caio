import { url, escapeHtml as e, icon } from '../lib/site.mjs';
const artifacts = {
  "orderflow": {
    "title": "Cenários de consistência",
    "caption": "Trecho do roteiro de validação do OrderFlow. Descreve os cenários esperados; os testes não são executados nesta página.",
    "source": "https://github.com/caiotlad/orderflow-api/blob/7e9f1cbf13abd8a9337e2a9f2cef468210486963/docs/validation.md",
    "kind": "table"
  },
  "olist": {
    "title": "Avaliações por situação da entrega",
    "caption": "Gráfico original do relatório Olist: base histórica de 2016–2018. Associação entre atraso e avaliação não demonstra causalidade. Fonte: Olist/Kaggle; resultados derivados sob CC BY-NC-SA 4.0.",
    "source": "https://github.com/caiotlad/olist-logistics-analytics/blob/d371f26ed4d6ef9fba9072e599d0cd409fccc821/reports/findings.md",
    "kind": "image",
    "image": "evidence/olist-reviews.png",
    "alt": "Gráfico da nota média: 4,29 nas entregas no prazo e 2,27 nas atrasadas, entre pedidos com avaliação válida."
  },
  "deubranco": {
    "title": "Cadastro de uma pergunta",
    "caption": "Diagrama original da documentação do DeuBranco, desenvolvido em equipe. Minha contribuição no projeto se concentra em requisitos, diagramas e validação.",
    "source": "https://github.com/caiotlad/DeuBranco/blob/331ca8f333f326308da50bea115918cc22249ec8/docs/Diagramas/DiagramaSequenciaCadastrarPergunta.svg",
    "kind": "image",
    "image": "evidence/deubranco-sequence.svg",
    "alt": "Diagrama de sequência do cadastro de perguntas, do formulário à persistência no banco."
  },
  "cardsort": {
    "title": "Recuperação do rascunho",
    "caption": "Trecho original do teste de fluxo do CardSort Lab: verifica a recuperação de uma posição salva no rascunho. O teste publicado usa H2 em memória e não é executado neste site.",
    "source": "https://github.com/caiotlad/cardsort-lab/blob/aea7be6de23ef1ae0f1ef69e1b0971e1b3c10f69/backend/src/test/java/br/com/cardsortlab/CardSortFlowTest.java",
    "kind": "code",
    "code": "mvc.perform(get(\"/api/public/sessions/\" + sessionId).param(\"token\", token))\n    .andExpect(status().isOk())\n    .andExpect(jsonPath(\"$.draft.placements.a\").value(\"g1\"));"
  }
};
export function projectEvidence(project) {
  const artifact = artifacts[project.slug];
  if (!artifact) return '';
  const content = artifact.kind === 'image'
    ? `<a class="artifact-image" href="${artifact.source}" target="_blank" rel="noopener noreferrer"><img src="${url(artifact.image)}" alt="${e(artifact.alt)}" loading="lazy" width="${project.slug==='olist'?1470:1502}" height="${project.slug==='olist'?728:787}"></a>`
    : artifact.kind === 'code'
      ? `<pre class="artifact-code" tabindex="0"><code>${e(artifact.code)}</code></pre>`
      : `<div class="artifact-table-wrap"><table><thead><tr><th scope="col">Cenário</th><th scope="col">Comportamento documentado</th></tr></thead><tbody><tr><th scope="row">Duas compras pela última unidade</th><td>Um pedido e um conflito</td></tr><tr><th scope="row">Reenvios simultâneos com a mesma chave</th><td>Um pedido e uma reserva</td></tr></tbody></table></div>`;
  return `<figure class="project-artifact"><h3>${e(artifact.title)}</h3>${content}<figcaption><p>${e(artifact.caption)}</p><a class="text-link" href="${artifact.source}" target="_blank" rel="noopener noreferrer">Ver artefato na origem ${icon('arrow',16)}</a></figcaption></figure>`;
}
