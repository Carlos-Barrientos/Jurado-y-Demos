import { state, isFavorite, toggleFavorite, companies } from '../data/store.js';

export function renderHomeView() {
  setTimeout(attachHomeEventListeners, 50);
  return getHomeHtml();
}

let showAllForParticipant = false;

function getFilteredDemos() {
  // Privacy Filter logic
  let filteredDemos = state.demos;
  const current = state.currentUser;
  
  if (current && current.roleType === 'participant' && !showAllForParticipant) {
    filteredDemos = state.demos.filter(d => d.authorId === current.id || d.author === current.name);
  } else if (current && current.roleType === 'judge' && current.roleType !== 'admin') {
    filteredDemos = state.demos.filter(d => Boolean(d.readyForEvaluation));
  }

  // Filter based on selected category / unit
  if (state.selectedCategory !== 'all') {
    filteredDemos = filteredDemos.filter(d => d.category === state.selectedCategory);
  }
  if (state.selectedUnit !== 'all') {
    filteredDemos = filteredDemos.filter(d => d.unitClass === state.selectedUnit);
  }

  // Search logic
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filteredDemos = filteredDemos.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.description.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  return filteredDemos;
}

function getHomeHtml() {
  const filtered = getFilteredDemos();

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Hero Banner -->
      <section class="relative bg-gradient-to-r from-surface-container-highest via-surface-container to-surface-container-low rounded-2xl p-6 md:p-10 border border-surface-container-high overflow-hidden shadow-sm">
        <div class="relative z-10 max-w-3xl space-y-4">
          <div class="flex items-center gap-4 mb-2">
            <img src="/logo-prosur.png" alt="Prosur Logo" class="h-16 w-auto object-contain" />
            <div class="h-10 w-px bg-surface-container-high"></div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <span class="material-symbols-outlined text-sm">rocket_launch</span> Reto IA 2026
            </div>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-on-surface leading-tight">
            Plataforma de Demos <span class="text-primary">Inteligencia Artificial</span>
          </h1>
          <p class="text-base md:text-lg text-secondary leading-relaxed">
            Bienvenidos al Reto de IA de Grupo Prosur. Explora las soluciones innovadoras creadas por nuestros equipos. Publica tus demos, comparte feedback y evalúa proyectos.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#community" class="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-container transition-all inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-xl">add_circle</span> Unirse a la Conversación
            </a>
            <a href="#profile" class="px-5 py-2.5 bg-white text-on-surface font-semibold rounded-lg border border-surface-container-high hover:bg-surface-container transition-all inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-xl">account_circle</span> Ver Mi Perfil / Jurado
            </a>
          </div>
        </div>
        
        <!-- Participant Filter Banner -->
        ${(state.currentUser && state.currentUser.roleType === 'participant') ? `
          <div class="mt-6 pt-4 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-3 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
            <div class="flex items-center gap-2 text-xs font-semibold text-emerald-950">
              <span class="material-symbols-outlined text-emerald-700">lock_person</span>
              <span>Modo Participante: ${showAllForParticipant ? 'Viendo todos los demos del Reto IA' : 'Viendo únicamente tu proyecto asignado'}</span>
            </div>
            <button id="toggleShowAllBtn" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-sm">${showAllForParticipant ? 'visibility_off' : 'visibility'}</span>
              ${showAllForParticipant ? 'Ver Solo Mi Proyecto' : 'Explorar Todos los Demos'}
            </button>
          </div>
        ` : ''}

        <!-- Decorative Glow -->
        <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      <!-- Company (Empresa) Filter Tabs -->
      <div class="flex items-center justify-between flex-wrap gap-4 border-b border-surface-container-high pb-4">
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          <button data-cat="all" class="cat-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${state.selectedCategory === 'all' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}">
            Todas las Empresas (${state.demos.length})
          </button>
          ${companies.map(comp => `
            <button data-cat="${comp}" class="cat-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${state.selectedCategory === comp ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}">
              ${comp}
            </button>
          `).join('')}
        </div>

        <div class="text-sm text-secondary font-medium">
          Mostrando <span class="text-on-surface font-bold">${filtered.length}</span> proyectos
        </div>
      </div>

      <!-- Demo Cards Grid -->
      ${filtered.length === 0 ? `
        <div class="text-center py-16 bg-surface-container-lowest rounded-xl border border-dashed border-surface-container-high">
          <span class="material-symbols-outlined text-5xl text-secondary mb-3">search_off</span>
          <h3 class="text-lg font-bold text-on-surface">No se encontraron demos</h3>
          <p class="text-sm text-secondary mt-1">Prueba cambiando la categoría o término de búsqueda.</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.map(renderDemoCard).join('')}
        </div>
      `}

    </div>
  `;
}

function renderDemoCard(demo) {
  const isFav = isFavorite(demo.id);
  const evalsCount = (demo.evaluations || []).length;

  return `
    <div class="bg-white rounded-xl border border-surface-container-high overflow-hidden demo-card-hover flex flex-col justify-between">
      
      <!-- Card Image Header -->
      <div class="relative aspect-video bg-surface-container overflow-hidden group">
        <img src="${demo.thumbnail}" alt="${demo.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
        
        <!-- Category Badge -->
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
          ${demo.category}
        </span>

        <!-- Favorite Button -->
        <button 
          data-fav-id="${demo.id}" 
          class="fav-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center backdrop-blur-md"
          title="${isFav ? 'Quitar de guardados' : 'Guardar demo'}"
        >
          <span class="material-symbols-outlined text-lg ${isFav ? 'text-primary fill' : ''}">bookmark</span>
        </button>

        <!-- Play Overlay Link -->
        <a href="#demo/${demo.id}" class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
          <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-white/30">
            <span class="material-symbols-outlined text-2xl fill">play_arrow</span>
          </div>
        </a>

        <!-- Images count indicator -->
        ${(demo.images && demo.images.length > 0) ? `
          <span class="absolute bottom-3 left-3 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">collections</span> ${demo.images.length} fotos
          </span>
        ` : ''}

        <!-- Duration Badge -->
        <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-mono bg-black/80 text-white">
          ${demo.duration}
        </span>
      </div>

      <!-- Card Body -->
      <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
        <div class="space-y-2">
          <!-- Unit Badge -->
          <span class="inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${demo.unitClass}">
            ${demo.unit}
          </span>
          <h3 class="font-bold text-lg text-on-surface leading-snug line-clamp-2 hover:text-primary transition-colors">
            <a href="#demo/${demo.id}">${demo.title}</a>
          </h3>
          <p class="text-sm text-secondary line-clamp-2 leading-relaxed">
            ${demo.description}
          </p>
        </div>

        <!-- Tags List -->
        <div class="flex flex-wrap gap-1.5 pt-2">
          ${demo.tags.slice(0, 3).map(tag => `
            <span class="px-2 py-0.5 bg-surface-container text-tertiary text-xs rounded font-medium">#${tag}</span>
          `).join('')}
        </div>
      </div>

      <!-- Card Footer (Author & Social / Judge Rating Stats) -->
      <div class="px-5 py-3.5 bg-surface-bright border-t border-surface-container-high flex items-center justify-between text-xs text-secondary">
        <div class="flex items-center gap-2">
          <img src="${demo.authorAvatar}" alt="${demo.author}" class="w-7 h-7 rounded-full object-cover ring-1 ring-surface-container-high"/>
          <span class="font-semibold text-on-surface truncate max-w-[120px]">${demo.author}</span>
        </div>

        <div class="flex items-center gap-3 font-medium">
          <span class="flex items-center gap-1 text-primary font-bold"><span class="material-symbols-outlined text-sm fill">favorite</span> ${demo.likes}</span>
          <span class="flex items-center gap-1 text-amber-500 font-bold" title="${evalsCount} evaluaciones del Jurado">
            <span class="material-symbols-outlined text-sm fill">star</span> ${demo.rating}
          </span>
        </div>
      </div>

    </div>
  `;
}

function attachHomeEventListeners() {
  const toggleBtn = document.getElementById('toggleShowAllBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showAllForParticipant = !showAllForParticipant;
      const app = document.getElementById('app');
      if (app) app.innerHTML = renderHomeView();
    });
  }

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedCategory = e.currentTarget.dataset.cat;
      const app = document.getElementById('app');
      if (app) app.innerHTML = renderHomeView();
    });
  });

  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const demoId = e.currentTarget.dataset.favId;
      toggleFavorite(parseInt(demoId, 10));
      const app = document.getElementById('app');
      if (app) app.innerHTML = renderHomeView();
    });
  });

  window.addEventListener('search-updated', () => {
    const app = document.getElementById('app');
    if (app && (window.location.hash === '#home' || !window.location.hash)) {
      app.innerHTML = renderHomeView();
    }
  });
}
