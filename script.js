const languagesMaster = ["CSS","JavaScript","HTML","Lua","PHP","Python","React", "Json"];

const projects = [
  { id:"p1", title:"Flip a Coin", date:"2024-11-20", languages:["HTML","CSS","JavaScript"], image:"previews/flipacoin.png", description:"Ein einfaches Münzwurf-Spiel zur Entscheidungsfindung.", url:"flipacoin/index.html" },
  { id:"p2", title:"Praktikum Fachinformatik", date:"2025-04-07", languages:["HTML","CSS", "React", "JavaScript"], image:"previews/praktikumtu.png", description:"Projekt für ein Praktikums- oder Aufgabenmanagement-System.", url:"https://praktikum-tu-ilmenau.de/"},
  { id:"p3", title:"Movingbutton", date:"2024-03-14", languages:["HTML", "CSS", "JavaScript"], image:"previews/movingbutton.png", description:"Interaktiver Button, der sich beim Drüberfahren bewegt.", url:"movingbutton/index.html"},
  { id:"p4", title:"Password Generator", date:"2025-04-02", languages:["JavaScript","HTML"], image:"previews/passwordgen.png", description:"Generiert sichere Passwörter automatisch.", url:"passwordgen/index.html"},
  { id:"p5", title:"Aspect Ratio", date:"2025-06-18", languages:["HTML", "CSS", "JavaScript"], image:"previews/aspectrt.png", description:"Tool zur Berechnung oder Anpassung von Bild-/Seitenverhältnissen.", url:"aspectrt/index.html"},
  { id:"p6", title:"Currency Converter", date:"2025-12-10", languages:["Json","HTML", "JavaScript"], image:"previews/currencycnv.png", description:"Währungsrechner, der Beträge zwischen verschiedenen Währungen umwandelt.", url:"currencycnv/index.html"},
  { id:"p7", title:"To-Do App", date:"2024-02-28", languages:["HTML","JavaScript", "Json"], image:"previews/todoapp.png", description:"Aufgabenliste/To-Do-App zum Verwalten von täglichen Aufgaben.", url:"todoapp/index.html" },
  { id:"p8", title:"Test", date:"2025-10-20", languages:["CSS","HTML","JavaScript"], image:"https://placehold.co/600x400?text=Test+Projekt", description:"Beispielprojekt mit Platzhalterbild, dient als Demo.", url:"google.de"},
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