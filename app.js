/* app.js - Portfolio de Alisson Rolim Knies */
// ============================================================
// Este script implementa toda a lógica de interação do site,
// incluindo modo escuro, navegação, animações, CRUD de projetos
// (mock via localStorage) e envio do formulário de contato.
// ============================================================

// ----------------------- DADOS ------------------------------
const APP_DATA = {
  personalInfo: {
    name: "Alisson Rolim Knies",
    title: "Arquiteto e Urbanista especializado em BIM e Gestão de Obras",
    email: "alisson.knies@email.com",
    phone: "+55 (11) 99999-9999",
    location: "São Paulo, SP",
    linkedin: "https://linkedin.com/in/alisson-knies",
    bio: "Arquiteto e urbanista com mais de 3 anos de experiência em gestão de obras, tecnologia BIM e coordenação de projetos. Especialista em Revit, MS Project e ferramentas de gestão de construção. Focado em inovação tecnológica aplicada ao setor da construção civil.",
    stats: {
      experience: "3+",
      projects: "15+",
      certifications: "8+"
    }
  },
  skills: [
    { name: "Revit", level: 90, category: "BIM" },
    { name: "MS Project", level: 85, category: "Gestão" },
    { name: "Orçamentos", level: 80, category: "Gestão" },
    { name: "Excel", level: 85, category: "Análise" },
    { name: "SketchUp", level: 75, category: "Modelagem" },
    { name: "AutoCAD", level: 80, category: "Desenho" },
    { name: "Navisworks", level: 75, category: "BIM" },
    { name: "Lumion", level: 85, category: "Gestão" }
  ],
  projects: [
    {
      id: 1,
      title: "Residencial Alto Padrão - Vila Madalena",
      description: "Projeto residencial de alto padrão desenvolvido integralmente em BIM, com coordenação de disciplinas e compatibilização 3D. Gestão completa do cronograma e orçamento.",
      image: "/placeholder-project-1.jpg",
      tags: ["BIM", "Revit", "Residencial", "Gestão"],
      category: "Residential",
      technologies: ["Revit", "MS Project", "Navisworks"],
      year: "2024",
      status: "Concluído"
    },
    {
      id: 2,
      title: "Edifício Comercial - Centro Empresarial",
      description: "Coordenação BIM de edifício comercial com 8 pavimentos. Implementação de metodologia BIM 4D para controle de cronograma e gestão de interferências.",
      image: "/placeholder-project-2.jpg",
      tags: ["BIM", "Comercial", "4D", "Coordenação"],
      category: "Commercial",
      technologies: ["Revit", "Navisworks", "MS Project"],
      year: "2023",
      status: "Em andamento"
    },
    {
      id: 3,
      title: "Plano Diretor - Bairro Sustentável",
      description: "Desenvolvimento de plano diretor para bairro sustentável, com análise de viabilidade, zoneamento e diretrizes de desenvolvimento urbano.",
      image: "/placeholder-project-3.jpg",
      tags: ["Urbanismo", "Sustentabilidade", "Planejamento"],
      category: "Planning",
      technologies: ["AutoCAD", "SketchUp", "Excel"],
      year: "2023",
      status: "Concluído"
    },
    {
      id: 4,
      title: "Retrofit - Edifício Histórico",
      description: "Projeto de retrofit de edifício histórico com implementação de tecnologias sustentáveis e adequação às normas atuais de acessibilidade.",
      image: "/placeholder-project-4.jpg",
      tags: ["Retrofit", "Sustentabilidade", "Patrimônio"],
      category: "Renovation",
      technologies: ["Revit", "AutoCAD", "SketchUp"],
      year: "2024",
      status: "Em desenvolvimento"
    }
  ],
  experience: [
    {
      id: 1,
      company: "BK Construções",
      position: "Arquiteto Urbanista",
      period: "2022 - Presente",
      description: "Gestão simultânea de múltiplos contratos de construção, garantindo conformidade técnica e implementação de metodologias BIM. Coordenação de equipes multidisciplinares e controle de qualidade de projetos.",
      achievements: [
        "Implementação de metodologia BIM em 100% dos projetos",
        "Redução de 30% no tempo de compatibilização de projetos",
        "Gestão de 5 obras simultâneas com orçamento total de R$ 15M"
      ]
    },
    {
      id: 2,
      company: "Construtora Urbana",
      position: "Analista de Projetos BIM",
      period: "2021 - 2022",
      description: "Desenvolvimento e coordenação de projetos em ambiente BIM, com foco em compatibilização de disciplinas e extração de quantitativos para orçamentação.",
      achievements: [
        "Coordenação de projetos BIM para 8 empreendimentos",
        "Treinamento de 15 profissionais em metodologia BIM",
        "Implementação de biblioteca de objetos BIM personalizada"
      ]
    }
  ]
};

// -------------------- VARIÁVEIS DE ESTADO ------------------
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let currentFilter = 'all';
let currentProjectEditing = null;

// -------------------- INICIALIZAÇÃO ------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando aplicação...');

  // Inicializar tema
  applyTheme();

  // Garantir que projetos estejam no localStorage
  ensureProjectsInStorage();

  // Inicializar componentes
  initNavigation();
  renderSkills();
  initProjectsSection();
  renderExperience();
  initContactForm();
  initModals();
  initAdminPanel();
  initScrollAnimations();
  initBackToTop();

  // Botões específicos
  initDownloadButtons();

  console.log('✅ Aplicação inicializada com sucesso!');
});

// -------------------- TEMA / DARK MODE ---------------------
function applyTheme() {
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  updateThemeIcon();

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
  console.log(`🎨 Tema alterado para: ${currentTheme}`);
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
  }
}

// -------------------- NAVEGAÇÃO ----------------------------
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Links com scroll suave
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navMenu) {
          navMenu.classList.remove('active');
        }
        if (navToggle) {
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Destaque do link ativo conforme scroll
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav__link[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// -------------------- SKILLS -------------------------------
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  APP_DATA.skills.forEach(skill => {
    const el = document.createElement('div');
    el.className = 'skill-item fade-in';
    el.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${skill.level}"></div>
      </div>`;
    grid.appendChild(el);
  });

  // Observer para animar barras
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-progress');
        if (bar && !bar.style.width) {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%';
          }, 200);
        }
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill-item').forEach(item => observer.observe(item));
}

// -------------------- PROJETOS -----------------------------
function initProjectsSection() {
  console.log('🏗️ Inicializando seção de projetos...');

  // Renderizar grid inicial
  renderProjectsGrid();

  // Botões de filtro
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProjectsGrid();
    });
  });

  // Botão contato na hero
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function getStoredProjects() {
  const stored = localStorage.getItem('projects');
  return stored ? JSON.parse(stored) : [...APP_DATA.projects];
}

function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function ensureProjectsInStorage() {
  if (!localStorage.getItem('projects')) {
    console.log('📦 Salvando projetos iniciais no localStorage...');
    saveProjectsToStorage(APP_DATA.projects);
  }
}

function renderProjectsGrid() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const projects = getStoredProjects();
  container.innerHTML = '';

  const visibleProjects = currentFilter === 'all' ? projects : projects.filter(p => p.category === currentFilter);

  console.log(`🎯 Renderizando ${visibleProjects.length} projetos (filtro: ${currentFilter})`);

  visibleProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <div class="project-image">🏗️ ${project.title}</div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-meta">
          <span class="project-year">${project.year}</span>
          <span class="project-status status ${statusClass(project.status)}">${project.status}</span>
        </div>
        <div class="project-tags">${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      </div>`;

    card.addEventListener('click', () => openProjectModal(project));
    container.appendChild(card);
  });
}

function statusClass(status) {
  if (status === 'Concluído') return 'status--success';
  if (status === 'Em andamento') return 'status--warning';
  return 'status--info';
}

// Modal de projeto
function openProjectModal(project) {
  const projectModal = document.getElementById('projectModal');
  const projectModalBody = document.getElementById('modalBody');

  if (!projectModal || !projectModalBody) return;

  projectModalBody.innerHTML = `
    <div class="project-modal">
      <div class="project-modal-image">🏗️ ${project.title}</div>
      <h2>${project.title}</h2>
      <div class="project-modal-meta">
        <span class="project-year">${project.year}</span>
        <span class="project-status status ${statusClass(project.status)}">${project.status}</span>
      </div>
      <p class="project-modal-description">${project.description}</p>
      <div class="project-modal-section">
        <h3>Tecnologias Utilizadas</h3>
        <div class="project-technologies">${project.technologies.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="project-modal-section">
        <h3>Tags</h3>
        <div class="project-tags">${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      </div>
    </div>`;

  projectModal.classList.add('active');
}

// -------------------- EXPERIÊNCIA --------------------------
function renderExperience() {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;

  APP_DATA.experience.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'timeline-item fade-in';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3 class="timeline-company">${exp.company}</h3>
        <h4 class="timeline-position">${exp.position}</h4>
        <p class="timeline-period">${exp.period}</p>
        <p class="timeline-description">${exp.description}</p>
        <ul class="timeline-achievements">${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>`;
    timeline.appendChild(item);
  });
}

// -------------------- FORMULÁRIO CONTATO -------------------
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mwpbdbrz", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        showContactMessage('📧 Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        contactForm.reset();
      } else {
        showContactMessage('❌ Ocorreu um erro ao enviar. Tente novamente mais tarde.', 'error');
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      showContactMessage('❌ Erro de rede. Verifique sua conexão.', 'error');
    }
  });
}

function showContactMessage(msg, type) {
  const messageDiv = document.getElementById('formMessage');
  if (!messageDiv) return;

  messageDiv.textContent = msg;
  messageDiv.className = `form-message ${type}`;
  messageDiv.classList.remove('hidden');

  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 5000);
}

// -------------------- DOWNLOADS -----------------------------
function initDownloadButtons() {
  // Botão na hero
  const downloadCVBtn = document.getElementById('downloadCV');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', downloadCV);
  }

  // Botão na seção currículo
  const downloadResumeBtn = document.getElementById('downloadResume');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', downloadCV);
  }
}

function downloadCV() {
  console.log('📄 Iniciando download do currículo...');

  const link = document.createElement('a');
  link.href = 'assets/curriculo_alisson_knies_atualizado.pdf'; // Caminho local do seu PDF
  link.download = 'Curriculo_Alisson_Rolim_Knies.pdf'; // Nome final do arquivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log('✅ Download do currículo iniciado com sucesso!');
}


const blob = new Blob([pdfContent], { type: 'application/pdf' });
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'Curriculo_Alisson_Rolim_Knies.pdf';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

URL.revokeObjectURL(url);

// Mostrar feedback
alert('📄 Download do currículo iniciado com sucesso!');


// -------------------- MODAIS GENÉRICOS ---------------------
function initModals() {
  const projectModal = document.getElementById('projectModal');
  const projectFormModal = document.getElementById('projectFormModal');

  // Fechar modais
  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (projectModal) projectModal.classList.remove('active');
    });
  }

  const closeProjectForm = document.getElementById('closeProjectForm');
  if (closeProjectForm) {
    closeProjectForm.addEventListener('click', () => {
      if (projectFormModal) projectFormModal.classList.remove('active');
    });
  }

  const cancelProjectForm = document.getElementById('cancelProjectForm');
  if (cancelProjectForm) {
    cancelProjectForm.addEventListener('click', () => {
      if (projectFormModal) projectFormModal.classList.remove('active');
    });
  }

  // Fechar clicando fora
  [projectModal, projectFormModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Esc para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal) projectModal.classList.remove('active');
      if (projectFormModal) projectFormModal.classList.remove('active');

      const adminPanel = document.getElementById('adminPanel');
      if (adminPanel) adminPanel.classList.remove('active');
    }
  });
}

// -------------------- PAINEL ADMIN -------------------------
function initAdminPanel() {
  const adminToggle = document.getElementById('adminToggle');
  const adminPanel = document.getElementById('adminPanel');
  const closeAdmin = document.getElementById('closeAdmin');
  const addProject = document.getElementById('addProject');
  const projectForm = document.getElementById('projectForm');

  if (adminToggle && adminPanel) {
    adminToggle.addEventListener('click', () => {
      console.log('⚙️ Abrindo painel administrativo...');
      adminPanel.classList.add('active');
      renderAdminList();
    });
  }

  if (closeAdmin && adminPanel) {
    closeAdmin.addEventListener('click', () => {
      adminPanel.classList.remove('active');
    });
  }

  if (addProject) {
    addProject.addEventListener('click', () => openProjectForm());
  }

  if (projectForm) {
    projectForm.addEventListener('submit', handleProjectSave);
  }
}

function renderAdminList() {
  const adminProjectsContainer = document.getElementById('adminProjects');
  if (!adminProjectsContainer) return;

  const projects = getStoredProjects();
  adminProjectsContainer.innerHTML = '';

  projects.forEach(p => {
    const item = document.createElement('div');
    item.className = 'admin-project-item';
    item.innerHTML = `
      <div>
        <h4>${p.title}</h4>
        <p>${p.category} - ${p.year}</p>
      </div>
      <div class="admin-project-actions">
        <button class="btn btn--sm btn--secondary" onclick="editProject(${p.id})">Editar</button>
        <button class="btn btn--sm btn--outline" onclick="deleteProject(${p.id})">Excluir</button>
      </div>`;
    adminProjectsContainer.appendChild(item);
  });
}

function openProjectForm(project = null) {
  const projectFormModal = document.getElementById('projectFormModal');
  const projectForm = document.getElementById('projectForm');

  if (!projectFormModal || !projectForm) return;

  currentProjectEditing = project;
  projectFormModal.classList.add('active');
  projectForm.reset();

  const title = document.getElementById('projectFormTitle');
  if (title) {
    title.textContent = project ? 'Editar Projeto' : 'Adicionar Projeto';
  }

  if (project) {
    const titleInput = document.getElementById('projectTitle');
    const descInput = document.getElementById('projectDescription');
    const catInput = document.getElementById('projectCategory');
    const yearInput = document.getElementById('projectYear');
    const tagsInput = document.getElementById('projectTags');
    const techInput = document.getElementById('projectTechnologies');
    const statusInput = document.getElementById('projectStatus');

    if (titleInput) titleInput.value = project.title;
    if (descInput) descInput.value = project.description;
    if (catInput) catInput.value = project.category;
    if (yearInput) yearInput.value = project.year;
    if (tagsInput) tagsInput.value = project.tags.join(', ');
    if (techInput) techInput.value = project.technologies.join(', ');
    if (statusInput) statusInput.value = project.status;
  }
}

function handleProjectSave(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newProject = {
    id: currentProjectEditing ? currentProjectEditing.id : Date.now(),
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    year: formData.get('year'),
    tags: formData.get('tags').split(',').map(t => t.trim()).filter(t => t),
    technologies: formData.get('technologies').split(',').map(t => t.trim()).filter(t => t),
    status: formData.get('status'),
    image: `/placeholder-${Date.now()}.jpg`
  };

  const projects = getStoredProjects();

  if (currentProjectEditing) {
    const idx = projects.findIndex(p => p.id === currentProjectEditing.id);
    if (idx !== -1) {
      projects[idx] = newProject;
      console.log('✏️ Projeto editado:', newProject);
    }
  } else {
    projects.push(newProject);
    console.log('➕ Projeto adicionado:', newProject);
  }

  saveProjectsToStorage(projects);

  const projectFormModal = document.getElementById('projectFormModal');
  if (projectFormModal) {
    projectFormModal.classList.remove('active');
  }

  renderProjectsGrid();
  renderAdminList();
}

function editProject(id) {
  const project = getStoredProjects().find(p => p.id === id);
  if (project) {
    openProjectForm(project);
  }
}

function deleteProject(id) {
  if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

  const filtered = getStoredProjects().filter(p => p.id !== id);
  saveProjectsToStorage(filtered);

  console.log('🗑️ Projeto excluído:', id);

  renderProjectsGrid();
  renderAdminList();
}

// Expor para onclick inline
window.editProject = editProject;
window.deleteProject = deleteProject;

// -------------------- SCROLL ANIMAÇÕES ---------------------
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
}

// -------------------- BACK TO TOP --------------------------
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -------------------- UTILITÁRIOS --------------------------
function throttle(fn, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

console.log('📐 Portfolio script carregado!');