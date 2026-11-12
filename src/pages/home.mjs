import { portrait, photoStory, photoDialogs } from '../components/photos.mjs';
import { privateProjectSection } from '../components/private-projects.mjs';
import { storySection } from '../components/story.mjs';
import { getLocale } from '../lib/locale.mjs';
import { technologySection } from '../components/technologies.mjs';
import { layout } from '../components/layout.mjs';
import { projectCard } from '../components/project-card.mjs';
import { projects, explorations } from '../data/projects.mjs';
import { url, icon, profile } from '../lib/site.mjs';

const steps = [
  { n:'01', title:'Entender o contexto', short:'Entender', icon:'globe', text:'Ouvir quem usa ou vai usar. Investigar o que existe. Encontrar o problema antes de desenhar a solução. Hoje, é fácil partir direto para o código, mas é preciso entender a razão do que está sendo construído.', detail:'No GEDAI, participo do levantamento e da validação de requisitos com usuários e clientes, considerando sistemas legados e regras de negócio. Atuo em sistemas de áreas como biologia, computação e saúde, tornando as necessidades claras para quem vai desenvolver.', evidence:'Na prática · GEDAI / UFLA', href:'#sobre' },
  { n:'02', title:'Tornar as regras claras', short:'Definir', icon:'layers', text:'Transformar necessidades em comportamentos, critérios de aceitação e prioridades compartilhadas.', detail:'No DeuBranco, contribuí com especificações de requisitos, diagramas de sequência e casos de teste para alinhar o comportamento esperado.', evidence:'Na prática · DeuBranco', href:'projetos/deubranco/' },
  { n:'03', title:'Construir com intenção', short:'Construir', icon:'code', text:'Escolher o que construir com base nas necessidades de quem usa. Organizar o trabalho para transformar requisitos em funcionalidades que façam sentido.', detail:'No OrderFlow, parti das regras de pedidos e estoque para definir o comportamento da API, documentar as decisões e organizar os cenários de validação.', evidence:'Na prática · OrderFlow', href:'projetos/orderflow/' },
  { n:'04', title:'Conferir e aprender', short:'Conferir', icon:'check', text:'Conferir se a entrega atende ao que foi combinado, testar os cenários previstos e observar o que acontece na prática. Quando surgem diferenças entre a expectativa e o resultado, revisar as regras, registrar os problemas e ajustar o próximo passo.', detail:'No Olist, consolidei os pedidos históricos e comparei indicadores em pandas e SQL para verificar se os cálculos contavam a mesma história. Também explicitei as regras de atraso e os limites da base, para interpretar os resultados sem extrapolar o que os dados permitem concluir.', evidence:'Na prática · Olist Logistics', href:'projetos/olist/' },
];

export function home() {
return layout(`
<section class="hero hero-with-portrait section-shell" aria-labelledby="hero-title">
  <div class="hero-topline"><span class="eyebrow"><span class="status-dot"></span> PORTFÓLIO PESSOAL</span><span class="hero-coordinate">LAVRAS, BRASIL <span>21°14′ S · 44°59′ W</span></span></div>
  <div class="hero-copy"><p class="hero-identity">Caio Teixeira</p><div class="hero-kicker intro-enter">Produto, requisitos e tecnologia</div><h1 id="hero-title" class="hero-title"><span class="intro-line">Do problema</span> <span class="intro-line">à <em>entrega.</em><span class="hero-asterisk" aria-hidden="true">✳</span></span></h1><p class="hero-description intro-enter">Atuo com produto, requisitos e qualidade no GEDAI/UFLA. Desenvolvo projetos de software e análise de dados.</p><div class="hero-actions intro-enter"><a class="button primary" href="#projetos">Conheça meus projetos ${icon('down',18)}</a><a class="text-link" href="${url('curriculo/')}">Ver currículo ${icon('arrow',17)}</a></div></div>
  ${portrait()}
  <div class="hero-art" aria-hidden="true"><div class="orbital-glow"></div><div class="orbit-ring ring-one"></div><div class="orbit-ring ring-two"></div><canvas id="particle-canvas"></canvas><div class="orbital-cross cross-top">+</div><div class="orbital-cross cross-bottom">+</div><div class="orbit-label orbit-label-a"><i></i> intenção</div><div class="orbit-label orbit-label-b"><i></i> conexão</div><div class="orbital-caption"><span class="tiny-square"></span> IDEIAS CONECTADAS. SOLUÇÕES CONCRETAS.</div></div>
  <p class="ambient-hint">Mover o mouse conecta os pontos.</p><div class="hero-bottom"><p>Caio Teixeira <span>Ciência da Computação · UFLA</span></p><a href="#projetos" class="scroll-cue"><span>UM POUCO DO QUE CONSTRUO</span><span class="scroll-line"></span>${icon('down',15)}</a><a class="hero-social" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (nova aba)">LinkedIn ${icon('arrow',15)}</a></div>
</section>
<div class="discipline-strip" aria-label="Áreas conectadas"><div><span>Produto</span><i aria-hidden="true">↗</i><span>Requisitos</span><i aria-hidden="true">↗</i><span>Dados</span><i aria-hidden="true">↗</i><span>Software</span><i aria-hidden="true">✳</i><span class="strip-note">Trabalho com as perspectivas de cliente, usuário, desenvolvedor e PO, mantendo o mesmo cuidado com a entrega.</span></div></div>
<section id="projetos" class="projects-section section-shell" aria-labelledby="projects-title">
  <div class="section-heading"><div><div class="eyebrow reveal"><span class="section-number">01 /</span> TRABALHOS SELECIONADOS</div><h2 id="projects-title" class="reveal">${getLocale()==='en'?'Main<br><em>projects</em>':'Projetos<br><em>principais</em>'}</h2></div><p class="section-intro reveal">Projetos de software, dados e requisitos. Em cada caso, apresento o problema, minha contribuição e as decisões tomadas.</p></div>
  <div class="project-grid">${projects.map(projectCard).join('')}</div>
  <div class="all-projects reveal"><p>Cada projeto é uma nova forma de olhar para um problema.</p><a class="text-link" href="${url('projetos/')}">Explore todos os projetos ${icon('right',18)}</a></div>
</section>
${privateProjectSection()}
<section id="processo" class="process-section section-shell" aria-labelledby="process-title">
  <div class="section-heading"><div><div class="eyebrow reveal"><span class="section-number">02 /</span> COMO EU TRABALHO</div><h2 id="process-title" class="reveal">Como eu<br><em>trabalho.</em></h2></div><p class="section-intro reveal">Do levantamento de requisitos à validação, estas são as etapas que orientam meu trabalho.</p></div>
  <div class="process-layout"><div class="process-map reveal" aria-hidden="true"><div class="process-map-grid"></div><svg viewBox="0 0 480 460" fill="none"><path class="process-connection" d="M120 120H360V340H120Z" stroke="currentColor" stroke-opacity=".25"/><path class="process-connection moving" d="M120 120H360V340H120Z" stroke="currentColor" stroke-width="2"/><circle cx="240" cy="230" r="62" stroke="currentColor" stroke-opacity=".16"/><circle cx="240" cy="230" r="87" stroke="currentColor" stroke-opacity=".08" stroke-dasharray="3 9"/></svg><div class="process-center">ct<span>↗</span></div>${steps.map((s,i)=>`<div class="map-node map-node-${i} ${i===0?'active':''}" data-map-node="${i}"><span>${icon(s.icon,23)}</span><small>${s.short}</small></div>`).join('')}<span class="process-map-caption">CONTEXTO → CLAREZA → CONSTRUÇÃO → EVIDÊNCIA</span></div>
  <div class="process-steps">${steps.map((s,i)=>`<details class="process-step reveal" data-process-step="${i}" ${i===0?'open':''}><summary><span class="step-number">${s.n}</span><h3>${s.title}</h3><span class="step-toggle">${icon('plus',18)}</span></summary><div class="step-body"><p>${s.text}</p><p class="step-detail">${s.detail}</p><a class="step-evidence" href="${url(s.href)}">${s.evidence} ${icon('arrow',14)}</a></div></details>`).join('')}</div></div>
</section>
<section id="sobre" class="about-section story-section section-shell" aria-labelledby="about-title">
  <div class="eyebrow reveal"><span class="section-number">03 /</span> UM POUCO SOBRE MIM</div>
  <div class="about-layout about-timeline-intro"><div class="about-intro"><h2 id="about-title" class="reveal">Minha<br><em>trajetória.</em></h2><p class="about-bio reveal">Sou Caio Teixeira, estudante de Ciência da Computação na UFLA. Gosto de estar onde as perguntas de negócio encontram as possibilidades da tecnologia.</p><p class="about-bio reveal">Minha trajetória passa por produto, requisitos e qualidade no GEDAI. Nos projetos, aprofundo software e dados — conectando o que precisa ser resolvido ao que pode ser construído.</p><a class="text-link reveal" href="${url('curriculo/')}">Ver currículo ${icon('arrow',18)}</a><div class="about-facts reveal"><span>${icon('globe',15)} Lavras, Minas Gerais</span><span>PT nativo · EN fluente</span></div></div>
</div>

${photoStory()}
${storySection()}
  <div class="skills-heading reveal"><span class="eyebrow">FERRAMENTAS COM CONTEXTO</span><span>O repertório acompanha o problema.</span></div>
  <div class="skills-grid">${[
    ['01','Produto & requisitos','Histórias de usuário, critérios de aceitação, refinamento e backlog.','GEDAI & DeuBranco','projetos/deubranco/'],
    ['02','Dados & análise','Python, pandas, SQL, PostgreSQL e qualidade de dados.','Olist Logistics','projetos/olist/'],
    ['03','Software & interfaces','Java, Spring Boot, React e TypeScript.','OrderFlow & CardSort','projetos/orderflow/'],
    ['04','Qualidade & entrega','Selenium, JUnit, Testcontainers, Docker e GitHub Actions.','Da regra à verificação','projetos/orderflow/'],
  ].map(([n,title,text,label,href])=>`<div class="skill-group reveal"><span class="skill-number">/${n}</span><h3>${title}</h3><p>${text}</p><a href="${url(href)}">${label} ${icon('arrow',13)}</a></div>`).join('')}</div>
</section>
${technologySection()}
<section class="explorations-section section-shell" aria-labelledby="explorations-title"><div class="explorations-heading reveal"><div><div class="eyebrow"><span class="section-number">05 /</span> OUTRAS EXPLORAÇÕES</div><h2 id="explorations-title">Continuar <em>aprendendo.</em></h2></div><a class="text-link" href="${profile.github}?tab=repositories" target="_blank" rel="noopener noreferrer" aria-label="Repositórios no GitHub (nova aba)">Mais no GitHub ${icon('arrow',17)}</a></div><div class="exploration-list">${explorations.map((p,i)=>`<a class="exploration-row reveal" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} no GitHub (nova aba)"><span class="exploration-number">0${i+1}</span><div><span class="exploration-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p></div><span class="exploration-tags">${p.tags}</span><span class="exploration-arrow">${icon('arrow',23)}</span></a>`).join('')}</div></section>
${photoDialogs()}
`);
}



