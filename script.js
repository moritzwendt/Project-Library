/* -------------------------
   PROJECT DATA (modular)
   - Einfach neues Objekt kopieren + einfügen, dann die Werte anpassen.
   - languages: Array mit Sprach-Kürzeln (die zu languagesMaster passen)
   - date im ISO Format YYYY-MM-DD (wird fürs Sortieren verwendet)
   ------------------------- */
const languagesMaster = ["HTML","CSS","JavaScript","TypeScript","PHP","Python","Swift"]; // leicht erweiterbar

const projects = [
  {
    id: "p1",
    title: "Projekt 1",
    date: "2024-11-20",
    languages: ["HTML","CSS","JavaScript"],
    image: "https://placehold.co/600x400?text=Projekt+1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel odio sed leo ultrices."
  },
  {
    id: "p2",
    title: "Projekt 2",
    date: "2023-07-05",
    languages: ["HTML","CSS"],
    image: "https://placehold.co/600x400?text=Projekt+2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae."
  },
  {
    id: "p3",
    title: "Projekt 3",
    date: "2025-01-14",
    languages: ["Python"],
    image: "https://placehold.co/600x400?text=Projekt+3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel odio."
  },
  {
    id: "p4",
    title: "Projekt 4",
    date: "2022-04-02",
    languages: ["JavaScript","TypeScript"],
    image: "https://placehold.co/600x400?text=Projekt+4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "p5",
    title: "Projekt 5",
    date: "2024-06-18",
    languages: ["Swift"],
    image: "https://placehold.co/600x400?text=Projekt+5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel odio sed."
  },
  {
    id: "p6",
    title: "Projekt 6",
    date: "2021-12-10",
    languages: ["PHP","HTML"],
    image: "https://placehold.co/600x400?text=Projekt+6",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "p7",
    title: "Projekt 7",
    date: "2024-02-28",
    languages: ["CSS","JavaScript"],
    image: "https://placehold.co/600x400?text=Projekt+7",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

/* -------------------------
   Rendering & UI wiring
   ------------------------- */
const projectGrid = document.getElementById('projectGrid');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const languageFiltersContainer = document.getElementById('language-filters');

// Generate language checkboxes from languagesMaster (modular)
function renderLanguageFilters() {
  languagesMaster.forEach(lang => {
    const id = `lang-${lang}`;
    const wrapper = document.createElement('label');
    wrapper.className = 'lang-item';
    wrapper.innerHTML = `
      <input type="checkbox" id="${id}" value="${lang}">
      <span>${lang}</span>
    `;
    languageFiltersContainer.appendChild(wrapper);
  });
}
renderLanguageFilters();

// Utility: get selected languages
function getSelectedLanguages() {
  const checked = Array.from(languageFiltersContainer.querySelectorAll('input[type="checkbox"]:checked'));
  return checked.map(ch => ch.value);
}

// Main: filter, sort, and render projects
function applyFiltersAndRender() {
  const q = searchInput.value.trim().toLowerCase();
  const selectedLangs = getSelectedLanguages(); // array
  const sortBy = sortSelect.value;

  // Filter by search + languages
  let filtered = projects.filter(p => {
    // Search by title
    const matchesSearch = p.title.toLowerCase().includes(q);
    if (!matchesSearch) return false;

    // If no language selected -> pass
    if (selectedLangs.length === 0) return true;

    // Check if project has at least one of the selected languages (OR behaviour)
    return p.languages.some(lang => selectedLangs.includes(lang));
  });

  // Sorting
  filtered.sort((a,b)=>{
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'name-asc') return a.title.localeCompare(b.title, 'de', {sensitivity:'base'});
    if (sortBy === 'name-desc') return b.title.localeCompare(a.title, 'de', {sensitivity:'base'});
    return 0;
  });

  renderProjectGrid(filtered);
}

// Render grid DOM from array
function renderProjectGrid(list) {
  projectGrid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="image-container">
        <img src="${p.image}" alt="${escapeHtml(p.title)}" />
        <div class="overlay"><p>${escapeHtml(p.description)}</p></div>
      </div>
      <h2>${escapeHtml(p.title)}</h2>
      <button class="mobile-info-btn">Mehr erfahren</button>
    `;
    projectGrid.appendChild(card);

    // Mobile button toggle (overlay)
    const btn = card.querySelector('.mobile-info-btn');
    const overlay = card.querySelector('.overlay');
    const img = card.querySelector('img');

    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const active = btn.classList.toggle('active');
      if (active) {
        btn.textContent = 'Schließen';
        overlay.style.opacity = '1';
        img.style.filter = 'blur(4px)';
      } else {
        btn.textContent = 'Mehr erfahren';
        overlay.style.opacity = '0';
        img.style.filter = 'blur(0)';
      }
    });

    // Optional: click card on desktop could navigate to project page (placeholder)
    card.addEventListener('click', ()=> {
      // For now do nothing (hover handles overlay on desktop). Keep this for future nav.
    });
  });
}

/* Simple HTML-escape for safety when interpolating */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* -------------------------
   Events
   ------------------------- */
searchInput.addEventListener('input', debounce(applyFiltersAndRender, 180));
sortSelect.addEventListener('change', applyFiltersAndRender);
languageFiltersContainer.addEventListener('change', applyFiltersAndRender);

/* Initial render */
applyFiltersAndRender();

/* -------------------------
   Date & Time display (left time, right date)
   ------------------------- */
function updateDateTime() {
  const now = new Date();
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');

  // Time (HH:MM)
  timeEl.textContent = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  // Date (weekday, DD.MM.YYYY)
  dateEl.textContent = now.toLocaleDateString('de-DE', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });
}
setInterval(updateDateTime, 1000);
updateDateTime();

/* -------------------------
   Helpers
   ------------------------- */
function debounce(fn, wait=200){
  let t;
  return (...args)=>{
    clearTimeout(t);
    t = setTimeout(()=>fn.apply(this,args), wait);
  };
}

/* -------------------------
   Tips for extending:
   - Neue Sprache hinzufügen: füge den Namen in languagesMaster (oben) hinzu.
   - Neues Projekt: kopiere ein Objekt in `projects` und passe id/title/date/languages/image/description an.
   - images: ersetze die placehold-URLs durch echte Pfade (z.B. ./projekt1/cover.jpg).
   ------------------------- */