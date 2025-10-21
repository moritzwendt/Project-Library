const languagesMaster = ["HTML","CSS","JavaScript","TypeScript","PHP","Python","Swift"];

const projects = [
  { id:"p1", title:"Flip a Coin", date:"2024-11-20", languages:["HTML","CSS","JavaScript"], image:"previews/flipacoin.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.", url:"flipacoin/index.html" },
  { id:"p2", title:"Projekt 2", date:"2023-07-05", languages:["HTML","CSS"], image:"https://placehold.co/600x400?text=Projekt+2", description:"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id:"p3", title:"Projekt 3", date:"2025-01-14", languages:["Python"], image:"https://placehold.co/600x400?text=Projekt+3", description:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi." },
  { id:"p4", title:"Projekt 4", date:"2022-04-02", languages:["JavaScript","TypeScript"], image:"https://placehold.co/600x400?text=Projekt+4", description:"Duis aute irure dolor in reprehenderit in voluptate velit esse." },
  { id:"p5", title:"Projekt 5", date:"2024-06-18", languages:["Swift"], image:"https://placehold.co/600x400?text=Projekt+5", description:"Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat." },
  { id:"p6", title:"Projekt 6", date:"2021-12-10", languages:["PHP","HTML"], image:"https://placehold.co/600x400?text=Projekt+6", description:"Sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { id:"p7", title:"Projekt 7", date:"2024-02-28", languages:["CSS","JavaScript"], image:"https://placehold.co/600x400?text=Projekt+7", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id:"p8", title:"Test", date:"2025-10-20", languages:["CSS","HTML","JavaScript"], image:"https://placehold.co/600x400?text=Test+Projekt", description:"Test project von heute" },
];

const projectGrid = document.getElementById('projectGrid');
const searchInput = document.getElementById('search');
const searchDesktop = document.getElementById('search-desktop');
const dropdown = document.getElementById('sortDropdown');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const languageFiltersContainer = document.getElementById('language-filters');

let currentSort = "newest";

languagesMaster.forEach(lang=>{
  const label=document.createElement('label');
  label.className='lang-item';
  label.innerHTML=`<input type="checkbox" value="${lang}"><span>${lang}</span>`;
  languageFiltersContainer.appendChild(label);
});

function getSelectedLanguages() {
  return Array.from(languageFiltersContainer.querySelectorAll('input:checked')).map(c=>c.value);
}

dropdownToggle.addEventListener('click', (e)=>{
  e.stopPropagation();
  dropdown.classList.toggle('open');
});
document.addEventListener('click', ()=>dropdown.classList.remove('open'));
dropdownMenu.querySelectorAll('li').forEach(li=>{
  li.addEventListener('click', ()=>{
    currentSort = li.dataset.value;
    dropdownToggle.textContent = "Sortieren nach: " + li.textContent;
    dropdown.classList.remove('open');
    applyFiltersAndRender();
  });
});

function applyFiltersAndRender() {
  const q = (searchInput.value || searchDesktop.value || "").trim().toLowerCase();
  const selectedLangs = getSelectedLanguages();
  let filtered = projects.filter(p=>{
    const matchesSearch = p.title.toLowerCase().includes(q);
    if(!matchesSearch) return false;
    if(selectedLangs.length===0) return true;
    return selectedLangs.every(lang => p.languages.includes(lang));
  });

  filtered.sort((a,b)=>{
    if(currentSort==='newest') return new Date(b.date)-new Date(a.date);
    if(currentSort==='oldest') return new Date(a.date)-new Date(b.date);
    if(currentSort==='name-asc') return a.title.localeCompare(b.title,'de');
    if(currentSort==='name-desc') return b.title.localeCompare(a.title,'de');
    return 0;
  });

  renderGrid(filtered);
}

function renderGrid(list){
  projectGrid.innerHTML='';
  list.forEach(p=>{
    // Card-Link
    const cardLink = document.createElement('a');
    cardLink.href = p.url || '#';
    cardLink.className = 'project-card-link';
    cardLink.style.textDecoration = 'none';
    cardLink.style.color = 'inherit';

    // Card erstellen
    const card = document.createElement('article');
    card.className='project-card';
    card.innerHTML=`
      <div class="image-container">
        <img src="${p.image}" alt="${p.title}">
        <div class="overlay"><p>${p.description}</p></div>
      </div>
      <div class="card-footer">
        <h2>${p.title}</h2>
        <button class="mobile-info-btn">Mehr erfahren</button>
      </div>
    `;

    cardLink.appendChild(card);
    projectGrid.appendChild(cardLink);

    const btn = card.querySelector('.mobile-info-btn');
    const overlay = card.querySelector('.overlay');
    const img = card.querySelector('img');

    // Overlay-Button klick
    btn.addEventListener('click', e=>{
      e.preventDefault();      // verhindert, dass Link ausgelöst wird
      e.stopPropagation();     // verhindert Link-Ausführung
      const active = btn.classList.toggle('active');
      if(active){
        btn.textContent='Schließen';
        overlay.style.opacity='1';
        img.style.filter='blur(4px)';
      } else {
        btn.textContent='Mehr erfahren';
        overlay.style.opacity='0';
        img.style.filter='blur(0)';
      }
    });
  });
}

searchInput.addEventListener('input', ()=>applyFiltersAndRender());
searchDesktop.addEventListener('input', ()=>applyFiltersAndRender());
languageFiltersContainer.addEventListener('change', ()=>applyFiltersAndRender());

applyFiltersAndRender();

function updateDateTime(){
  const now=new Date();
  document.getElementById('time').textContent=now.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('date').textContent=now.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric'});
}
updateDateTime();
setInterval(updateDateTime,60000);




const cardLink = document.createElement('a');
cardLink.href = p.url;
cardLink.className = 'project-card-link';
cardLink.style.textDecoration = 'none';
cardLink.style.color = 'inherit';
cardLink.appendChild(card);
projectGrid.appendChild(cardLink);