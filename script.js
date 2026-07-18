const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function applyTheme(theme){
  body.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'light');
  try{ localStorage_safeSet(theme); }catch(e){}
}

let currentTheme = 'dark';
function localStorage_safeSet(){ /* intentionally no-op: state kept in memory only */ }

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});

const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'UX/UI Designer',
  'AI/ML Enthusiast'
];
const typeTarget = document.getElementById('typeTarget');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if(!deleting){
    charIndex++;
    if(charIndex > current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  typeTarget.textContent = current.slice(0, charIndex);
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();


const filterBar = document.getElementById('filterBar');
const cards = document.querySelectorAll('.project-card');

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if(!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const tags = card.dataset.tags || '';
    const show = filter === 'all' || tags.includes(filter);
    card.classList.toggle('hide', !show);
  });
});


const navBurger = document.getElementById('navBurger');
const nav = document.querySelector('.nav');
if(navBurger){
  navBurger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
}
