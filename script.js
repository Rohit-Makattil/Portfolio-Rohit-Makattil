const neonParticlesConfig = {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 1000 } },
    color: { value: ['#00d4ff', '#ff00cc', '#8b00ff'] },
    shape: { type: 'circle', stroke: { width: 0 } },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2 } },
    size: { value: 2, random: true, anim: { enable: true, speed: 1, size_min: 0.5 } },
    line_linked: { enable: true, distance: 100, color: '#00d4ff', opacity: 0.3, width: 1 },
    move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 150, line_linked: { opacity: 0.5 } }, push: { particles_nb: 3 } }
  },
  retina_detect: true
};

// Load Particles after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  particlesJS('particles-js', neonParticlesConfig);

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    menuToggle.querySelector('svg').innerHTML = isActive
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        navMenu.classList.remove('active');
        menuToggle.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  });

  // Skill Cards with Devicon
  document.querySelectorAll('.skill-card').forEach(card => {
    const skill = card.dataset.skill;
    const iconClass = card.dataset.icon;
    card.innerHTML = `
      <div class="p-3 sm:p-4 bg-gray-900/20 border border-cyan-400/50 rounded-lg shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-cyan-400/30">
        <i class="${iconClass} text-5xl sm:text-6xl mb-2 block text-center"></i>
        <h4 class="text-base sm:text-lg font-bold font-orbitron text-center">${skill}</h4>
      </div>
    `;
  });

  // Animate Contact Form Inputs
  document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
    input.addEventListener('focus', () => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'SPAN') {
        label.style.transform = 'translateY(-20px)';
        label.style.fontSize = '0.75rem';
        label.style.color = '#00d4ff';
      }
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'SPAN') {
          label.style.transform = 'translateY(0)';
          label.style.fontSize = '0.875rem';
          label.style.color = '#9ca3af';
        }
      }
    });
  });
});

// Smooth Scroll with GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    gsap.to(window, { duration: 0.8, scrollTo: this.getAttribute('href'), ease: 'power2.inOut' });
  });
});

// GSAP Animations
gsap.timeline()
  .from('#hero-name', { 
    duration: 1.5, 
    opacity: 0, 
    y: 50, 
    ease: 'power2.out', 
    onStart: () => {
      document.querySelector('#hero-name').classList.add('typing');
    },
    onComplete: () => {
      document.querySelector('#hero-name').style.borderRight = 'none';
    }
  })
  .from('#hero-title', { duration: 0.6, opacity: 0, y: 20, ease: 'power2.out' }, '-=0.4')
  .from('#hero-desc', { duration: 0.6, opacity: 0, y: 20, ease: 'power2.out' }, '-=0.4')
  .from('#hero-buttons', { duration: 0.6, opacity: 0, y: 20, ease: 'power2.out' }, '-=0.4')
  .from('.profile-image', { duration: 0.8, opacity: 0, scale: 0.9, ease: 'power2.out' }, '-=0.6');

// Section Animations
document.addEventListener('DOMContentLoaded', () => {
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Skill Cards Animation with Stagger
  gsap.from('.skill-card', {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Timeline Animation for Education with Stagger
  gsap.from('.timeline-item', {
    opacity: 0,
    x: (index) => index % 2 === 0 ? -30 : 30,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#education',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animated Achievements with Stagger
  gsap.from('.achievement-item', {
    opacity: 0,
    x: -20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#achievements',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Contact Form Interactivity
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Simulated)');
    const form = e.target;
    form.querySelector('input[type="text"]').value = '';
    form.querySelector('input[type="email"]').value = '';
    form.querySelector('textarea').value = '';
    gsap.to(form, {
      scale: 0.98,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => gsap.to(form, { scale: 1, duration: 0.2 })
    });
  });
});