// Simple smooth scroll
document.documentElement.style.scrollBehavior = "smooth";

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* Enhanced creative reveal animations */
const observer = new IntersectionObserver((entries, observer)=>{
  entries.forEach((entry, index) => {
    if(entry.isIntersecting) {
      const el = entry.target;
      const delay = index * 0.1; // Stagger animations

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0px)';
      }, delay * 1000);

      // Add floating animation for cards
      if(el.classList.contains('card')) {
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'translateY(-8px) scale(1.02)';
          el.style.boxShadow = '0 20px 40px rgba(2,6,23,0.8)';
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translateY(0) scale(1)';
          el.style.boxShadow = '0 6px 18px rgba(2,6,23,0.5)';
        });
      }

      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card, .timeline-item').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px) scale(0.95)';
  el.style.filter = 'blur(2px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  observer.observe(el);
});

/* Hero text typing effect */
const heroTitle = document.querySelector('.intro h1');
if(heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  const typeWriter = () => {
    if(i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Remove cursor after typing completes
      setTimeout(() => {
        heroTitle.style.borderRight = 'none';
      }, 500);
    }
  };
  setTimeout(typeWriter, 500);
}

/* Quick stats animation */
const quickStats = document.querySelectorAll('.quick-stats li');
quickStats.forEach((stat, index) => {
  stat.style.opacity = '0';
  stat.style.transform = 'translateY(20px)';
  stat.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
  setTimeout(() => {
    stat.style.opacity = '1';
    stat.style.transform = 'translateY(0)';
  }, 1000 + (index * 200));
});

/* Button hover effects */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.05)';
    btn.style.boxShadow = '0 15px 35px rgba(6,182,212,0.3)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = '0 8px 30px rgba(6,182,212,0.12)';
  });
});

/* Timeline item hover effects */
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateX(10px)';
    item.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0)';
    item.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.016), transparent)';
  });
});

/* Dynamic background effect */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if(hero) {
    const rate = scrolled * -0.5;
    hero.style.backgroundPosition = `center ${rate}px`;
  }
});

/* Floating particles background */
const createParticles = () => {
  const hero = document.querySelector('.hero');
  if(!hero) return;

  const colors = ['rgba(0,212,255,0.4)', 'rgba(255,107,107,0.4)', 'rgba(78,205,196,0.4)', 'rgba(255,255,255,0.3)'];

  for(let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    hero.appendChild(particle);
  }
};
createParticles();

/* Enhanced navigation on scroll */
const nav = document.querySelector('.site-nav');
const navLinkElements = document.querySelectorAll('.nav-links a');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    // Scrolled down - make nav more prominent
    nav.classList.add('nav-scrolled');
  } else {
    // At top - normal nav
    nav.classList.remove('nav-scrolled');
  }
  
  // Highlight active section
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinkElements.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  
  lastScrollY = currentScrollY;
});

// Toggle dark mode
const toggleButton = document.getElementById("dark-mode-toggle");

// nav toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle && navLinks){
  navToggle.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  // close menu after clicking a link
  navLinks.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> navLinks.classList.remove('open'));
  });
}