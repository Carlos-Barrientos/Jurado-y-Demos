import { state, logout, isAdmin } from '../data/store.js';
import { handleRoute, navigateTo } from '../router/index.js';

export function renderNavbar() {
  const container = document.getElementById('navbar');
  if (!container) return;

  // Hide Navbar completely on Login screen
  if (window.location.hash === '#login' || !state.isAuthenticated) {
    container.innerHTML = '';
    return;
  }

  const current = state.currentUser;

  container.innerHTML = `
    <header class="sticky top-0 z-50 glass-header border-b border-surface-container-high transition-all">
      <div class="max-w-[1440px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between gap-3">
        
        <!-- Brand / Logo -->
        <div class="flex items-center gap-3">
          <a href="#home" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/logo-prosur.png" alt="Prosur Logo" class="w-full h-full object-contain p-1" />
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-base leading-tight tracking-tight text-on-surface flex items-center gap-1">
                PROSUR <span class="text-primary material-symbols-outlined text-sm">neurology</span>
              </span>
              <span class="text-[10px] uppercase font-bold text-secondary tracking-widest leading-none">AI Showcase</span>
            </div>
          </a>
        </div>

        <!-- Central Search Bar -->
        <div class="hidden lg:flex flex-1 max-w-xs mx-2">
          <div class="relative w-full">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
            <input 
              type="text" 
              placeholder="Buscar demos, modelos..." 
              class="w-full bg-surface-container-low border border-surface-container-high rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all text-on-surface"
            />
          </div>
        </div>

        <!-- Navigation Links & Logout / Profile -->
        <div class="flex items-center gap-4">
          <nav class="flex items-center gap-1 text-xs font-semibold text-secondary">
            <a id="nav-home" href="#home" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-base">grid_view</span>
              <span class="hidden md:inline">Galería</span>
            </a>
            <a id="nav-community" href="#community" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-base">forum</span>
              <span class="hidden md:inline">Comunidad</span>
            </a>
            <a id="nav-profile" href="#profile" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-base">account_circle</span>
              <span class="hidden md:inline">Mi Perfil</span>
            </a>
            ${isAdmin() ? `
              <a id="nav-admin" href="#admin" class="px-2.5 py-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1 text-primary">
                <span class="material-symbols-outlined text-base">admin_panel_settings</span>
                <span class="hidden md:inline">Admin</span>
              </a>
            ` : ''}
          </nav>

          <div class="hidden md:flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container">
            <img src="${current ? current.avatar : ''}" class="w-7 h-7 rounded-full object-cover" />
            <div class="flex flex-col">
              <span class="text-xs font-bold text-on-surface leading-none">${current ? current.name : ''}</span>
              <span class="text-[10px] text-secondary">${current ? (current.roleType === 'judge' ? 'Jurado' : 'Participante') : ''}</span>
            </div>
          </div>
          
          <button id="logoutBtn" class="p-2 rounded-full hover:bg-error/10 text-error transition-colors flex items-center justify-center group" title="Cerrar Sesión">
            <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">logout</span>
          </button>
        </div>

      </div>
    </header>
  `;

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      navigateTo('#login');
      handleRoute();
    });
  }
}

export function updateNavbarActiveState(routeId) {
  const container = document.getElementById('navbar');
  if (!container) return;
  const links = container.querySelectorAll('nav a');
  links.forEach(link => {
    link.classList.remove('text-primary', 'bg-surface-container', 'font-bold');
    if (link.id === 'nav-' + routeId || (routeId === 'demo' && link.id === 'nav-home')) {
      link.classList.add('text-primary', 'bg-surface-container', 'font-bold');
    }
  });
}
