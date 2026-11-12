export const projectEnglish = {
  orderflow: {
    summary: ["Prevent duplicate sales and repeated orders.", "I developed and documented an orders and inventory API in Java and Spring Boot.", "Transactions, row locking and idempotency."],
    category:'Software & business rules', description:'The last unit cannot be sold twice. An API where every operation must keep that promise.',
    headline:'Consistency, even when everything happens at once.', role:'Backend development', context:'Portfolio project',
    problem:'Two requests compete for the same stock. A connection fails and the client retries an order. How can the balance remain correct and an operation avoid happening twice?',
    contribution:'I developed an orders and inventory API to explore transactions, concurrency and idempotency. Its scope is a distributor with one warehouse, covering order reservation, confirmation and cancellation.',
    decisions:[
      {title:'All or nothing',text:'The order, its items, stock balances and movements share one transaction. If one item cannot be fulfilled, the entire operation must roll back.'},
      {title:'Explicit concurrency',text:'PostgreSQL row locks follow a consistent product order. This choice prioritizes inventory integrity and requires attention to transaction duration.'},
      {title:'Retry without duplicates',text:'An idempotency key links a request to its response. The same key and payload retrieve the original creation; a different payload results in a conflict.'},
    ],
    outcome:'The repository contains the API, its OpenAPI contract and tests for scenarios such as competing for the last unit, repeated operations and rollback. The demonstration guide checks behavior over HTTP.',
    limitations:'The scope covers one warehouse and one currency, without automatic reservation expiry. The tests explore consistency scenarios; evaluating performance under load is a separate step.',
    evidence:['Code and setup instructions','Validation scenarios','Architecture decisions'],
  },
  olist: {
    summary: ["Investigate delays without distorting the metrics.", "Data analysis to investigate factors associated with delivery delays.", "Aggregate by order and cross-check metrics in pandas and SQL."],
    category:'Data & decisions',description:'A data analysis and logistics project.',
    headline:'Historical data. Concrete questions. Metrics with context.',role:'Data engineering and analysis',context:'Portfolio project · public data',
    problem:'Where are delivery delays concentrated, and how do they relate to customer reviews? Answering this requires a definition of delay, correct table consolidation and explicit denominators.',
    contribution:'I built a reproducible pipeline to validate and consolidate historical Olist data and generate analytical tables, metrics, charts and HTML reports.',
    decisions:[
      {title:'The order is the unit',text:'Items and payments are aggregated before joining. This prevents orders with multiple items and payments from multiplying values incorrectly.'},
      {title:'The rule before the calculation',text:'A delivery at night on the promised day is still on time. The metric compares calendar dates; delivery duration uses timestamps.'},
      {title:'Two implementations, one check',text:'Overall metrics are calculated in pandas and SQL. The transactional load is committed only if all 21 metrics agree.'},
    ],
    outcome:'Of 99,441 historical orders, 6,534 of the 96,470 eligible deliveries were late: 6.77%. These figures describe the historical 2016–2018 dataset, not current Olist operations. The association between delays and reviews does not establish causation.',
    limitations:'The analysis describes a historical dataset, without measuring an operational intervention. Building the native Power BI dashboard and loading the complete real dataset into PostgreSQL are next steps for the documented version.',
    evidence:['Project, results and denominators','Rules and methodology','Analysis of findings'],
  },
  deubranco: {
    summary: ["Align the rules of a multiplayer study platform.", "Requirements, diagrams and validation tests in a team project.", "Connect specified behavior to test cases."],
    category:'Product & requirements',description:'A platform for team-based educational matches. I worked as Product Owner, validating the project with clients, planning the software, writing documentation and testing its features.',
    headline:'A good match starts with understandable rules.',role:'Requirements engineering and validation',context:'Academic team project',
    problem:'A multiplayer study platform needs shared understanding at every stage: joining a room, answering questions, tracking time and interpreting rankings. The team needs to agree on this behavior.',
    contribution:'I contributed requirements specifications, sequence diagrams, verification rules and validation test cases. The project was developed as a team at UFLA with Giovane Oliveira and João Vitor Reis Alvarenga.',
    decisions:[
      {title:'Behavior before implementation',text:'My work focused on making expected behavior explicit in specifications, supporting a shared understanding of the product.'},
      {title:'Flows the team can discuss',text:'Sequence diagrams help organize interactions and discuss system behavior with the team.'},
      {title:'Requirements that can be checked',text:'User stories and verification rules connect specification to validation. This is the contribution I highlight in this team project.'},
    ],
    outcome:'The platform brings together real-time educational matches, categorized questions and rankings. My participation concerns requirements documentation and validation; application development is a team deliverable.',
    limitations:'My participation focused on requirements and validation. Platform features, including multiplayer, are the result of team development.',
    evidence:['Product, documentation and team'],
  },
  cardsort: {
    summary: ["Connect creation, participation and analysis in card sorting studies.", "Application with a React frontend and Java backend.", "Recover drafts and provide analysis and exports."],
    category:'Product & software',description:'From organizing cards to analyzing clusters. A tool to support information architecture research.',
    headline:'Understanding how people organize information.',role:'Application development',context:'Software project for HCI studies',
    problem:'Researchers need to create studies, collect participants’ card organizations and interpret groupings. The flow must connect preparation, participation and analysis.',
    contribution:'CardSort Lab combines a React/TypeScript frontend and a Java/Spring Boot backend to create, run and analyze open, closed and hybrid studies.',
    decisions:[
      {title:'A complete journey',text:'The researcher prepares the study and shares a participation link. Participants group cards and review their organization before submitting.'},
      {title:'Pick up where you left off',text:'The documented flow includes automatic saving, a local backup and draft recovery after refreshing the page.'},
      {title:'Analysis and portability',text:'A similarity matrix, dendrogram and exports help explore groupings. Anonymized exports use codes instead of names and email addresses.'},
    ],
    outcome:'The repository documents the application and includes a researcher-to-participant flow test. The local demo offers studies populated with fictional participants, identified as examples.',
    limitations:'The demo account uses fictional participants. The published flow test uses in-memory H2; validation with PostgreSQL is a separate scope.',
    evidence:['Application and local setup','Documented flow test'],
  },
};
export const explorationEnglish = [
  {name:'Diesel Prediction',category:'Machine learning',description:'Diesel S10 volatility using public ANP data and temporal features.'},
  {name:'Museu Bi Moreira',category:'Interface & accessibility',description:'An academic digital experience proposal for exploring the collection and planning a visit.'},
  {name:'Curriculum planner',category:'Graphs & automation',description:'Semester planning with prerequisites, academic records and credit limits.'},
];

