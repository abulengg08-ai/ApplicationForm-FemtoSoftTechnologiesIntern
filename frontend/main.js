/**
 * Femtosoft Technologies - Main Interactivity & Modal Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);

  const applicationForm = document.getElementById('applicationForm');

  if (applicationForm) {

    applicationForm.addEventListener('submit', async (e) => {

      e.preventDefault();

      const formData = new FormData(applicationForm);

      try {

        const response = await fetch("http://localhost:8080/api/applications", {
          method: "POST",
          body: formData
        });

        if (response.ok) {

          closeAllModals();

          showToast("🎉 Application submitted successfully!");

          applicationForm.reset();

        } else {

          showToast("❌ Failed to submit application.");

        }

      } catch (error) {

        console.error(error);

        showToast("❌ Unable to connect to the server.");

      }

    });

  }
  // Modal Management
  const applyModalOverlay = document.getElementById('applyModal');
  const domainModalOverlay = document.getElementById('domainModal');

  // Triggers for Application Modal
  const applyTriggers = document.querySelectorAll('.js-open-apply');
  const closeModals = document.querySelectorAll('.js-close-modal');

  applyTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const domainAttr = btn.getAttribute('data-domain');
      if (domainAttr) {
        const selectEl = document.getElementById('applyDomainSelect');
        if (selectEl) selectEl.value = domainAttr;
      }
      openModal(applyModalOverlay);
    });
  });

  closeModals.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close modal when clicking outside card
  [applyModalOverlay, domainModalOverlay].forEach((overlay) => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeAllModals();
        }
      });
    }
  });

  // Domain Details Data
  const domainDataMap = {
    'full-stack': {
      title: 'Full Stack Development',
      badge: 'Web Technologies',
      duration: '3 - 6 Months',
      description: 'Master complete web application architecture covering React.js, Node.js, Express, MongoDB, and modern frontend frameworks.',
      syllabus: [
        'HTML5, CSS3, Modern JavaScript (ES6+)',
        'React.js Component Architecture & State Management',
        'Node.js & Express RESTful API Development',
        'Database Design with MongoDB & PostgreSQL',
        'Authentication, Security & Production Deployment'
      ]
    },
    'web-dev': {
      title: 'Web Development',
      badge: 'Frontend Focus',
      duration: '3 Months',
      description: 'Focus deeply on building responsive, high-performance web user interfaces using modern CSS, JavaScript, and Vite.',
      syllabus: [
        'Semantic HTML & Responsive CSS Grid/Flexbox',
        'Vanilla JS DOM Manipulation & Async Programming',
        'Component UI Systems & Glassmorphic Design',
        'Performance Optimization & Accessibility (a11y)'
      ]
    },
    'data-analytics': {
      title: 'Data Analytics',
      badge: 'Data Science',
      duration: '3 - 6 Months',
      description: 'Transform raw data into strategic insights using Python, Pandas, SQL, Excel, and Power BI dashboards.',
      syllabus: [
        'Advanced Data Wrangling with Python & Pandas',
        'SQL Database Querying & Aggregations',
        'Data Visualization with Power BI & Tableau',
        'Statistical Analysis & Executive Reporting'
      ]
    },
    'ai-ml': {
      title: 'Artificial Intelligence & ML',
      badge: 'Advanced Tech',
      duration: '6 Months',
      description: 'Build machine learning pipelines, predictive algorithms, and neural networks with Scikit-Learn and PyTorch.',
      syllabus: [
        'Supervised & Unsupervised Machine Learning',
        'Feature Engineering & Data Preprocessing',
        'Deep Learning Principles with PyTorch',
        'Natural Language Processing (NLP) Applications'
      ]
    },
    'ui-ux': {
      title: 'UI/UX Design',
      badge: 'Design System',
      duration: '3 Months',
      description: 'Design intuitive digital experiences, user flows, wireframes, and interactive prototypes in Figma.',
      syllabus: [
        'User Research, Personas & Journey Mapping',
        'Wireframing & High-Fidelity Prototyping',
        'Design Systems & Component Libraries',
        'Usability Testing & Micro-Interactions'
      ]
    },
    'cyber-security': {
      title: 'Cyber Security',
      badge: 'Security',
      duration: '3 - 6 Months',
      description: 'Understand vulnerability assessment, network penetration testing, and enterprise defense strategies.',
      syllabus: [
        'Network Fundamentals & Security Protocols',
        'Vulnerability Scanning & Penetration Testing',
        'Web Application Security (OWASP Top 10)',
        'Ethical Hacking & Incident Response'
      ]
    }
  };

  // Triggers for Domain Detail Modal
  const domainTriggers = document.querySelectorAll('.js-open-domain');
  domainTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const domainKey = btn.getAttribute('data-domain-key');
      const data = domainDataMap[domainKey] || domainDataMap['full-stack'];

      document.getElementById('modalDomainTitle').textContent = data.title;
      document.getElementById('modalDomainDuration').textContent = data.duration;
      document.getElementById('modalDomainDesc').textContent = data.description;

      const syllabusList = document.getElementById('modalDomainSyllabus');
      syllabusList.innerHTML = data.syllabus.map((item) => `<li>${item}</li>`).join('');

      const applyFromModalBtn = document.getElementById('modalApplyBtn');
      applyFromModalBtn.setAttribute('data-domain', data.title);

      closeAllModals();
      openModal(domainModalOverlay);
    });
  });

  // Modal apply button redirect
  const modalApplyBtn = document.getElementById('modalApplyBtn');
  if (modalApplyBtn) {
    modalApplyBtn.addEventListener('click', () => {
      const selectedDomain = modalApplyBtn.getAttribute('data-domain');
      closeAllModals();
      const selectEl = document.getElementById('applyDomainSelect');
      if (selectEl && selectedDomain) {
        selectEl.value = selectedDomain;
      }
      openModal(applyModalOverlay);
    });
  }

  // Application Form Submit
  const applicationForm = document.getElementById('applicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAllModals();
      showToast('🎉 Application submitted successfully! Our team will contact you shortly.');
      applicationForm.reset();
    });
  }

  // Contact Form Submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✉️ Message sent successfully! Thank you for reaching out.');
      contactForm.reset();
    });
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    [applyModalOverlay, domainModalOverlay].forEach((overlay) => {
      if (overlay) overlay.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
});
