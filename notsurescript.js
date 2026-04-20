// --- Typing Animation for Hero Title ---
const title = document.querySelector('.hero-content h1');
const originalText = title.innerHTML;
let index = 0;
title.innerHTML = '';

function typeEffect() {
  if (index < originalText.length) {
    title.innerHTML += originalText.charAt(index);
    index++;
    setTimeout(typeEffect, 80); // typing speed
  }
}
typeEffect();

// --- Fade-in Animation on Scroll ---
const revealElements = document.querySelectorAll(
  'section, .card, .platform-card, blockquote, footer'
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0px)';
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Set initial animation style
revealElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease-out';
});

// --- Custom Menu Info Box Handling ---
function openSection(type) {
  const box = document.getElementById('info-box');
  const title = document.getElementById('info-title');
  const content = document.getElementById('info-content');

  const data = {
    roadmaps: 'Follow curated step-by-step guides to learn any skill easily.',
    career: 'Explore exciting career paths suitable for your skills.',
    experts: 'Connect with experts for advice and guidance.',
    study: 'Find study fields and subjects that interest you.',
    creators: 'Learn from the creators who build great content.',
    help: 'Need support? We are here to guide you!'
  };

  title.innerText = type.charAt(0).toUpperCase() + type.slice(1);
  content.innerText = data[type];
  box.classList.remove('hidden');
}

// Smooth scroll for Start button
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
  document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
});


// --- Floating Particles Background Animation ---
const particleContainer = document.createElement('div');
particleContainer.style.position = 'fixed';
particleContainer.style.top = '0';
particleContainer.style.left = '0';
particleContainer.style.width = '100%';
particleContainer.style.height = '100%';
particleContainer.style.zIndex = '-1';
particleContainer.style.overflow = 'hidden';
document.body.appendChild(particleContainer);

function createParticle() {
  const particle = document.createElement('span');
  const size = Math.random() * 6 + 4;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.position = 'absolute';
  particle.style.background = 'rgba(74,108,247,0.6)';
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = window.innerHeight + 'px';
  particle.style.animation = `floatUp ${4 + Math.random() * 4}s linear forwards`;

  particleContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 8000);
}

setInterval(createParticle, 250);

// Add animation style
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 0.9; }
  100% { transform: translateY(-120vh) scale(1.4); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);

// --- Glow-on-Hover for Cards ---
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--xPos', x + 'px');
    card.style.setProperty('--yPos', y + 'px');
  });

  card.style.position = 'relative';
  card.style.overflow = 'hidden';

  const glow = document.createElement('div');
  glow.classList.add('glow-effect');
  card.appendChild(glow);
});

// Add glow effect CSS
const glowStyle = document.createElement('style');
glowStyle.innerHTML = `
.glow-effect {
  position: absolute;
  top: var(--yPos);
  left: var(--xPos);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(74,108,247,0.3), transparent 60%);
  transform: translate(-50%, -50%);
  transition: 0.1s;
  pointer-events: none;
}
`;
document.head.appendChild(glowStyle);

// --- Smooth Page Fade In on Load ---
document.body.style.opacity = 0;
window.onload = () => {
  document.body.style.transition = 'opacity 1.5s ease-in-out';
  document.body.style.opacity = 1;
};

