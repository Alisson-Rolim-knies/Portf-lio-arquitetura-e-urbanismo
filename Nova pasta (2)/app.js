/* app.js - Portfolio de Alisson Rolim Knies */
// ============================================================
// Este script implementa a lógica de interação do site,
// incluindo modo escuro, navegação, animações e
// envio do formulário de contato.
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
  experience: [
    {
      id: 1,
      company: "Estagiário de Obras BK Construções",
      position: "Arquiteto Urbanista",
      period: "Janeiro/2021 – Dezembro/2021",
      description: "Estagiário de obra em canteiro de edifícios multifamiliares com sistema em alvenaria estrutural.Acompanhei todas as etapas do ciclo de vida do projeto, garantindo a conformidade com o PBQP-H.Contribuí para a conquista da certificação PBQP-H Nível A, assegurando a qualidade dos processos executivos.",
      achievements: [
        "Suporte à gestão de obras em alvenaria estrutural",
        "Implementação do PBQP-H.",
        "Modelagem em BIM"
      ]
    },
    {
      id: 2,
      company: "BK Construções",
      position: "Arquiteto Urbanista",
      period: "2022 - 2024",
      description: "Gestão simultânea de múltiplos contratos de construção, garantindo conformidade técnica e implementação de metodologias BIM. Coordenação de equipes multidisciplinares e controle de qualidade de projetos.",
      achievements: [
        "Implementação de metodologia BIM em 100% dos projetos",
        "Redução de 30% no tempo de compatibilização de projetos",
        "Gestão de 5 obras simultâneas com orçamento total de R$ 15M"
      ]
    },
    {
      id: 3,
      company: " APAE Santa Maria RS",
      position: "Arquiteto e Urbanista",
      period: "2022 - 2024",
      description: "Atuação voluntária na elaboração de projetos de reforma, ampliação e regularização da sede institucional, com ênfase na adequação dos espaços físicos às normas de acessibilidade e mobilidade previstas na NBR 9050.",
      achievements: [
        "Elaboração de projetos de reforma e ampliação",
        "Elaboração de orçamentos detalhados",
        "Acompanhamento de obras para garantir conformidade com normas de acessibilidade"
      ]
    },
    {
      id: 4,
      company: "APAE CER IV",
      position: "Arquiteto Urbanista",
      period: "2022 - 2025",
      description: "Arquiteto e Urbanista responsável, em parceria com o escritório A3, pelo desenvolvimento do projeto da nova sede da APAE Santa Maria/RS.O projeto, classificado como CER IV (Centro Especializado em Reabilitação – Nível IV), contempla reabilitação multiprofissional para pessoas com deficiência física, intelectual, auditiva e visual, atendendo aos mais altos padrões técnicos e funcionais.A proposta foi elaborada com foco em acessibilidade universal, eficiência espacial e conformidade com as diretrizes do SUS e normas técnicas aplicáveis.",
      achievements: [
        "Elaboração e aprovação de projetos junto aos órgãos competentes",
        "Elaboração completa de orçamentos técnicos detalhados para obras e projetos.",
        "Compatibilização entre disciplinas técnicas, garantindo a integração e coerência dos projetos complementares."
      ]
    }
  ]
};

// -------------------- VARIÁVEIS DE ESTADO ------------------
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// -------------------- INICIALIZAÇÃO ------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando aplicação...');

  // Inicializar tema
  applyTheme();

  // Inicializar componentes
  initNavigation();
  renderSkills();
  initProjectCarousels();
  renderExperience();
  initContactForm();
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

// Adicione esta função em qualquer lugar do seu app.js,
// por exemplo, antes da seção "SCROLL ANIMAÇÕES"

// -------------------- CARROSSEL DE PROJETOS ------------------
function initProjectCarousels() {
  const carousels = document.querySelectorAll('.project-carousel-container');

  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let intervalId; // Para controlar o intervalo de troca automática

    function showSlide(index) {
      // Remove a classe 'active' de todas as imagens e bolinhas
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Adiciona a classe 'active' na imagem e bolinha corretas
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextSlide() {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    // Inicia a troca automática
    function startCarousel() {
      // Troca a cada 4 segundos (4000 milissegundos)
      intervalId = setInterval(nextSlide, 4000);
    }

    // Para o carrossel quando o mouse está sobre ele
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    // Retoma quando o mouse sai
    carousel.addEventListener('mouseleave', startCarousel);

    // Permite clicar nas bolinhas para navegar
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide);
        showSlide(slideIndex);
      });
    });

    // Inicia tudo
    showSlide(0);
    startCarousel();
  });
}


// -------------------- NAVEGAÇÃO ----------------------------
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      // Se for um link de navegação na página
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
          }
        }
      }
    });
  });

  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120; // Offset para ativar o link um pouco antes

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
        <div class="skill-progress" style="width: 0%;" data-level="${skill.level}"></div>
      </div>`;
    grid.appendChild(el);
  });

  // Observer para animar as barras de progresso quando visíveis
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-progress');
        // Anima apenas uma vez
        if (bar && bar.style.width === '0%') {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%';
          }, 200); // Pequeno delay para a animação ser mais visível
        }
      }
    });
  }, { threshold: 0.5 }); // A animação começa quando 50% do item está visível

  document.querySelectorAll('.skill-item').forEach(item => observer.observe(item));
}

// -------------------- EXPERIÊNCIA --------------------------
function renderExperience() {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;

  timeline.innerHTML = ''; // Limpa antes de renderizar

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
    try {
      // Substitua pela sua URL do Formspree
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
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
  setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

// -------------------- DOWNLOADS -----------------------------
function initDownloadButtons() {
  // O querySelectorAll pega todos os botões que podem baixar o CV
  document.querySelectorAll('#downloadCV, #downloadResume').forEach(button => {
    if (button) {
      button.addEventListener('click', downloadCV);
    }
  });
}

function downloadCV() {
  console.log('📄 Iniciando download do currículo...');
  const link = document.createElement('a');
  // Certifique-se que o caminho para o seu currículo está correto
  link.href = 'assets/curriculo_alisson_knies.pdf';
  link.download = 'Curriculo_Alisson_Rolim_Knies.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log('✅ Download do currículo iniciado com sucesso!');
}

// -------------------- SCROLL ANIMAÇÕES ---------------------
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 }); // Anima quando 15% do elemento está visível

  document.querySelectorAll('.fade-in').forEach(el => {
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
