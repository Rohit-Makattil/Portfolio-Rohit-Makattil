const futuristicParticlesConfig = {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 1200 } },
    color: { value: ['#00ccff', '#ff00cc', '#00ffcc'] },
    shape: { type: 'circle', stroke: { width: 0 } },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.1 } },
    size: { value: 2, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
    line_linked: { enable: true, distance: 120, color: '#ffffff', opacity: 0.3, width: 0.8 },
    move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 150, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } }
  },
  retina_detect: true
};

// Load Particles after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  particlesJS('particles-js', futuristicParticlesConfig);

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        navMenu.classList.remove('active');
      }
    });
  });
});

// Smooth Scroll with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    gsap.to(window, { duration: 0.8, scrollTo: this.getAttribute('href'), ease: 'power2.inOut' });
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Simplified Hero Animation
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
  .from('#hero-title', { duration: 0.8, opacity: 0, y: 30, ease: 'power2.out' }, '-=0.5')
  .from('#hero-desc', { duration: 0.6, opacity: 0, y: 20, ease: 'power2.out' }, '-=0.4')
  .from('#hero-buttons', { duration: 0.6, opacity: 0, y: 20, ease: 'power2.out' }, '-=0.4')
  .from('.holographic-image', { duration: 0.8, opacity: 0, scale: 0.8, ease: 'power2.out' }, '-=0.6');

// Parallax and Section Animations
document.addEventListener('DOMContentLoaded', () => {
  ScrollTrigger.batch('.parallax-section', {
    onEnter: batch => gsap.to(batch, { y: '10%', ease: 'none', duration: 0.5 }),
    start: 'top 90%',
    end: 'bottom top',
    scrub: true
  });

  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Interactive Skill Cards
  document.querySelectorAll('.skill-card').forEach(card => {
    const skill = card.dataset.skill;
    card.innerHTML = `
      <div class="p-4 sm:p-6 bg-transparent border border-cyan-400 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50 hover:neon-glow">
        <h4 class="text-lg sm:text-xl font-bold font-orbitron mb-2 text-center">${skill}</h4>
      </div>
    `;
    gsap.from(card, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Add click interaction for skill cards
    card.addEventListener('click', () => {
      gsap.to(card, { 
        rotation: 360, 
        scale: 1.1, 
        duration: 0.5, 
        ease: 'elastic.out(1, 0.5)', 
        onComplete: () => gsap.to(card, { rotation: 0, scale: 1, duration: 0.3 })
      });
    });
  });

  // Timeline Animation for Education
  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Animated Achievements
  gsap.utils.toArray('.achievement-item').forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Contact Form Interactivity
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Simulated)');
    // Clear form inputs
    const form = e.target;
    form.querySelector('input[type="text"]').value = '';
    form.querySelector('input[type="email"]').value = '';
    form.querySelector('textarea').value = '';
    // Add a subtle animation to confirm submission
    gsap.to(form, {
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => gsap.to(form, { scale: 1, duration: 0.2 })
    });
  });

  // Improved Custom Cursor with Glow
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { duration: 0.1, left: e.clientX, top: e.clientY });
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .hover-card, .skill-card, .project-card')) {
      cursor.classList.add('cursor-hover');
    } else {
      cursor.classList.remove('cursor-hover');
    }
  });
});