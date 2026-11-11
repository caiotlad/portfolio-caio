const caseLink = slug => ({path:`projetos/${slug}/`,label:({orderflow:'OrderFlow',olist:'Olist Logistics',cardsort:'CardSort Lab'})[slug]});
const diesel = {label:'Diesel Prediction',href:'https://github.com/caiotlad/Diesel_Prediction'};
const museum = {label:'Museu Bi Moreira',href:'https://github.com/caiotlad/SiteMuseuBiMoreira'};
const portfolio = {label:'Este portfólio',path:'#main'};
export const technologies = [
  {name:'Python',mark:'Py',group:'Dados & IA',description:'Linguagem para transformar dados, automatizar análises e construir experimentos reproduzíveis.',links:[caseLink('olist'),diesel]},
  {name:'pandas',mark:'pd',group:'Dados & IA',description:'Manipulação de tabelas, limpeza, agregação e conferência de indicadores antes de interpretar resultados.',links:[caseLink('olist'),diesel]},
  {name:'scikit-learn',mark:'sk',group:'Dados & IA',description:'Modelos de aprendizado de máquina, preparação de atributos e avaliação com atenção à separação temporal dos dados.',links:[diesel]},
  {name:'Java',mark:'Jv',group:'Software',description:'Programação orientada a objetos e construção de serviços com regras de negócio explícitas.',links:[caseLink('orderflow'),caseLink('cardsort')]},
  {name:'Spring Boot',mark:'Sb',group:'Software',description:'APIs e aplicações Java com validação, segurança, persistência e limites transacionais.',links:[caseLink('orderflow'),caseLink('cardsort')]},
  {name:'JUnit',mark:'J5',group:'Qualidade',description:'Testes automatizados para conferir comportamentos e transformar cenários de negócio em verificações executáveis.',links:[caseLink('orderflow')]},
  {name:'C++',mark:'C++',group:'Software',description:'Estruturas de dados, algoritmos e fundamentos de gerenciamento de memória.',links:[]},
  {name:'TypeScript',mark:'TS',group:'Interfaces',description:'Tipos explícitos para organizar interfaces e tornar contratos de dados mais claros durante o desenvolvimento.',links:[caseLink('cardsort'),museum]},
  {name:'Node.js',mark:'N',group:'Software',description:'JavaScript fora do navegador para ferramentas de desenvolvimento e geração deste portfólio estático.',links:[portfolio]},
  {name:'React',mark:'Re',group:'Interfaces',description:'Interfaces compostas por componentes, com estado e interações conectados ao fluxo de quem usa.',links:[caseLink('cardsort'),museum]},
  {name:'Vite',mark:'V',group:'Interfaces',description:'Servidor de desenvolvimento e build para aplicações web, com retorno rápido durante a construção da interface.',links:[caseLink('cardsort'),museum]},
  {name:'Maven',mark:'Mv',group:'Software',description:'Dependências, build e execução de testes de aplicações Java em um fluxo reproduzível.',links:[caseLink('orderflow')]},
  {name:'Tailwind CSS',mark:'Tw',group:'Interfaces',description:'Classes utilitárias para compor estilos e adaptar interfaces a diferentes larguras de tela.',links:[museum]},
  {name:'HTML5',mark:'H5',group:'Interfaces',description:'Estrutura semântica para conteúdo, navegação, formulários e interações acessíveis.',links:[portfolio,museum]},
  {name:'CSS3',mark:'C3',group:'Interfaces',description:'Layout responsivo, tipografia, estados de interação e animações que respeitam a preferência de movimento.',links:[portfolio,museum]},
  {name:'MySQL',mark:'My',group:'Dados & IA',description:'Modelagem relacional e consultas SQL para organizar dados e explicitar seus relacionamentos.',links:[]},
  {name:'PostgreSQL',mark:'Pg',group:'Dados & IA',description:'Persistência relacional, transações e consultas analíticas com integridade dos dados.',links:[caseLink('orderflow'),caseLink('olist')]},
  {name:'Docker',mark:'Dk',group:'Entrega',description:'Ambientes em contêineres e instruções de execução para reduzir diferenças entre desenvolvimento e validação.',links:[caseLink('orderflow'),caseLink('cardsort')]},
  {name:'Jupyter',mark:'Jy',group:'Dados & IA',description:'Notebooks que aproximam código, exploração dos dados, gráficos e documentação do experimento.',links:[diesel]},
  {name:'Git',mark:'Gt',group:'Entrega',description:'Versionamento para acompanhar mudanças, revisar decisões e colaborar no código.',links:[caseLink('orderflow'),caseLink('cardsort')]},
  {name:'GitHub',mark:'Gh',group:'Entrega',description:'Repositórios, documentação e evidências públicas que permitem acompanhar e conferir os projetos.',links:[caseLink('orderflow'),caseLink('olist'),caseLink('cardsort')]},
  {"name": "Power BI", "mark": "BI", "group": "Dados & IA", "description": "Modelagem de indicadores e relatórios visuais. No Olist, as consultas e medidas estão preparadas; o dashboard nativo ainda é um próximo passo.", "links": [{"path": "projetos/olist/", "label": "Olist Logistics"}]},
  {"name": "Figma", "mark": "Fg", "group": "Design & colaboração", "description": "Prototipação de interfaces, exploração de fluxos e organização visual de componentes antes da implementação.", "links": []},
  {"name": "Miro", "mark": "Mi", "group": "Design & colaboração", "description": "Quadros colaborativos para organizar ideias, jornadas, hipóteses e discussões de produto com a equipe.", "links": []},
  {"name": "Kanban", "mark": "Kb", "group": "Produto & processos", "description": "Visualização do fluxo de trabalho, acompanhamento de demandas e identificação de bloqueios e limites de trabalho em andamento.", "links": []},
  {"name": "Metodologias ágeis", "mark": "Ag", "group": "Produto & processos", "description": "Organização de entregas incrementais, priorização, feedback frequente e adaptação do trabalho às necessidades do produto.", "links": []},
  {"name": "Postman", "mark": "Pm", "group": "Qualidade", "description": "Exploração e validação de APIs por requisições HTTP, com inspeção de respostas, autenticação e cenários de erro.", "links": []},
];

