const projectGrid = document.querySelector('#projects .project-grid');
const projectCards = Array.from(projectGrid.children);
const projectColumns = [document.createElement('div'), document.createElement('div')];
const projectLayoutQuery = window.matchMedia('(max-width: 700px)');

projectColumns.forEach(column => column.classList.add('project-column'));

function layoutProjectCards() {
  if (projectLayoutQuery.matches) {
    projectGrid.replaceChildren(...projectCards);
    return;
  }

  projectColumns.forEach(column => column.replaceChildren());
  projectCards.forEach((card, index) => projectColumns[index % 2].append(card));
  projectGrid.replaceChildren(...projectColumns);
}

layoutProjectCards();
projectLayoutQuery.addEventListener('change', layoutProjectCards);

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();
