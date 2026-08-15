import { state, isAdmin, createUser, updateUser, deleteUser, createDemo, deleteDemo, assignDemo, updateDemo, updateDemoMedia, updateDemoVideoUrl, toggleDemoReadyForEvaluation, resetState, companies } from '../data/store.js';

let adminCompanyFilter = 'all';
let adminSearchQuery = '';
let adminStatusFilter = 'all'; // 'all', 'ready', 'pending'
let adminUserSearch = '';

export function renderAdminView() {
  if (!isAdmin()) {
    return `<div class="p-12 text-center text-error font-bold text-xl">Acceso Denegado. Solo Administradores.</div>`;
  }
  setTimeout(attachAdminEvents, 50);
  return getAdminHtml();
}

function getFilteredAdminDemos() {
  let list = state.demos || [];

  if (adminCompanyFilter !== 'all') {
    list = list.filter(d => d.category === adminCompanyFilter);
  }

  if (adminStatusFilter === 'ready') {
    list = list.filter(d => Boolean(d.readyForEvaluation));
  } else if (adminStatusFilter === 'pending') {
    list = list.filter(d => !d.readyForEvaluation);
  }

  if (adminSearchQuery.trim()) {
    const q = adminSearchQuery.toLowerCase().trim();
    list = list.filter(d => 
      (d.title || '').toLowerCase().includes(q) ||
      (d.author || '').toLowerCase().includes(q) ||
      (d.category || '').toLowerCase().includes(q) ||
      (d.department || '').toLowerCase().includes(q) ||
      (d.description || '').toLowerCase().includes(q) ||
      (d.problemStatement || '').toLowerCase().includes(q)
    );
  }

  return list;
}

function getFilteredAdminUsers() {
  let list = state.users || [];
  if (adminUserSearch.trim()) {
    const q = adminUserSearch.toLowerCase().trim();
    list = list.filter(u => 
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.roleType || '').toLowerCase().includes(q) ||
      (u.roleTitle || '').toLowerCase().includes(q) ||
      (u.unit || '').toLowerCase().includes(q)
    );
  }
  return list;
}

function renderAdminDemosListHtml(demosToRender, users) {
  if (demosToRender.length === 0) {
    return `
      <div class="p-8 text-center bg-surface-container-lowest rounded-xl border border-dashed border-surface-container space-y-2">
        <span class="material-symbols-outlined text-4xl text-secondary">search_off</span>
        <p class="font-bold text-sm text-on-surface">No se encontraron proyectos con los filtros seleccionados.</p>
        <button id="resetAdminDemoFiltersBtn" type="button" class="text-xs text-primary font-bold hover:underline">
          Restablecer Filtros
        </button>
      </div>
    `;
  }

  return demosToRender.map(demo => `
    <div class="p-4 bg-surface-bright rounded-xl border border-surface-container-high space-y-3 shadow-sm hover:border-primary/40 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="space-y-1.5 flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-primary/10 text-primary border border-primary/20">
              ${demo.category || 'General'}
            </span>
            <h4 class="font-bold text-sm text-on-surface truncate">${demo.title}</h4>
          </div>
          
          <p class="text-xs text-secondary">
            Equipo/Autor: <span class="font-bold text-slate-800">${demo.author}</span>
          </p>
          
          <!-- Multimedia Badges & Presentation Dictamen -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <button data-edit-video-id="${demo.id}" class="edit-video-btn inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-900 hover:bg-amber-500 hover:text-white rounded-lg font-bold text-[11px] transition-colors border border-amber-300" title="Editar multimedia (Resumen, Demo, Infografía)">
              <span class="material-symbols-outlined text-xs">video_settings</span> Multimedia ${demo.summaryVideoUrl ? '⚡' : ''}${demo.videoUrl ? '🎬' : ''}${demo.infographicUrl ? '📊' : ''}
            </button>
            
            <button data-toggle-ready-id="${demo.id}" data-ready="${demo.readyForEvaluation ? 'true' : 'false'}" class="toggle-ready-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shadow-sm ${demo.readyForEvaluation ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'}">
              <span class="material-symbols-outlined text-xs">${demo.readyForEvaluation ? 'check_circle' : 'pending'}</span>
              ${demo.readyForEvaluation ? 'Dictaminado: Ya Presentó' : 'Dictaminar: Listo para Evaluar'}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <a href="#demo/${demo.id}" class="p-1.5 text-secondary hover:text-primary hover:bg-surface-container rounded-lg transition-colors" title="Ver Detalle del Proyecto">
            <span class="material-symbols-outlined text-base">visibility</span>
          </a>
          <button data-del-demo-id="${demo.id}" class="del-demo-btn p-1.5 text-secondary hover:text-error hover:bg-error-container/30 rounded-lg transition-colors" title="Eliminar Proyecto">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>
      
      <form class="assign-demo-form flex items-center gap-2 pt-1 border-t border-surface-container-low" data-demo-id="${demo.id}">
        <select class="flex-1 p-2 bg-white rounded-lg border border-surface-container text-xs focus:outline-none focus:border-primary" required>
          <option value="" disabled selected>Reasignar a equipo participante...</option>
          ${users.filter(u => u.roleType === 'participant').map(u => `
            <option value="${u.id}" ${demo.authorId === u.id ? 'selected' : ''}>${u.name} (${u.unit})</option>
          `).join('')}
        </select>
        <button type="submit" class="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-container transition-colors">
          Reasignar
        </button>
      </form>
    </div>
  `).join('');
}

function getAdminHtml() {
  const users = state.users || [];
  const demos = state.demos || [];
  const filteredDemos = getFilteredAdminDemos();
  const filteredUsers = getFilteredAdminUsers();

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Header Banner -->
      <div class="bg-white rounded-2xl p-6 md:p-8 border border-surface-container-high shadow-sm relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-3xl text-primary">admin_panel_settings</span>
            <h1 class="text-2xl md:text-3xl font-bold text-on-surface">Panel de Administración Integral</h1>
          </div>
          <p class="text-sm text-secondary">Control de proyectos, filtros por empresa, enlaces de video/infografía y gestión de usuarios.</p>
        </div>

        <!-- Quick Stats Badge -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 text-center">
            <span class="block text-xl font-black text-primary">${demos.length}</span>
            <span class="text-[10px] font-bold text-secondary uppercase">Proyectos</span>
          </div>
          <div class="px-4 py-2 bg-purple-50 rounded-xl border border-purple-200 text-center">
            <span class="block text-xl font-black text-purple-700">${users.length}</span>
            <span class="text-[10px] font-bold text-secondary uppercase">Usuarios</span>
          </div>
          <div class="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <span class="block text-xl font-black text-emerald-700">${demos.filter(d => d.readyForEvaluation).length}</span>
            <span class="text-[10px] font-bold text-secondary uppercase">Dictaminados</span>
          </div>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: User Management & Registration -->
        <div class="lg:col-span-1 space-y-8">
          
          <!-- User Registration Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">person_add</span>
              <h2 class="font-bold text-base text-on-surface">Registrar Usuario</h2>
            </div>
            
            <form id="createUserForm" class="space-y-3 text-xs">
              <div>
                <label class="block font-semibold text-secondary mb-1">Nombre Completo</label>
                <input type="text" id="newUserName" required placeholder="Ej. Dra. Carmen Silva" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>
              <div>
                <label class="block font-semibold text-secondary mb-1">Correo Electrónico</label>
                <input type="email" id="newUserEmail" required placeholder="carmen@prosur.com" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>
              
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block font-semibold text-secondary mb-1">Contraseña</label>
                  <input type="text" id="newUserPass" value="demo" required class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
                <div>
                  <label class="block font-semibold text-secondary mb-1">Rol</label>
                  <select id="newUserRole" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                    <option value="participant">Participante</option>
                    <option value="judge">Jurado</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-secondary mb-1">Cargo / Puesto</label>
                <input type="text" id="newUserTitle" required placeholder="Ej. Especialista en IA" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div>
                <label class="block font-semibold text-secondary mb-1">Unidad / División</label>
                <input type="text" id="newUserUnit" required placeholder="Ej. Prosur Biotech" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <button type="submit" class="w-full py-2 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-base">how_to_reg</span> Registrar Usuario
              </button>
            </form>
          </div>

          <!-- Existing Users Directory & Actions -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">group</span>
                <h2 class="font-bold text-base text-on-surface">Usuarios (${users.length})</h2>
              </div>
            </div>

            <!-- User Search Input -->
            <div class="relative">
              <span class="material-symbols-outlined absolute left-2.5 top-2 text-secondary text-sm">search</span>
              <input 
                type="text" 
                id="adminUserSearchInput" 
                value="${adminUserSearch}" 
                placeholder="Buscar usuario por nombre o correo..." 
                class="w-full pl-8 pr-3 py-1.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none text-xs"
              />
            </div>

            <div class="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              ${filteredUsers.map(u => `
                <div class="p-3 bg-surface-bright rounded-xl border border-surface-container flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <img src="${u.avatar}" alt="${u.name}" class="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 shrink-0"/>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-bold text-xs text-on-surface truncate">${u.name}</h4>
                        <span class="px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                          u.roleType === 'admin' ? 'bg-purple-100 text-purple-900' :
                          u.roleType === 'judge' ? 'bg-amber-100 text-amber-900' :
                          'bg-emerald-100 text-emerald-900'
                        }">
                          ${u.roleType === 'admin' ? 'Admin' : u.roleType === 'judge' ? 'Jurado' : 'Part.'}
                        </span>
                      </div>
                      <p class="text-[11px] text-secondary truncate">${u.email}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-1 shrink-0">
                    <button data-edit-user-id="${u.id}" class="edit-user-btn p-1 bg-surface-container hover:bg-primary hover:text-white text-secondary rounded-lg transition-colors" title="Editar">
                      <span class="material-symbols-outlined text-sm">edit</span>
                    </button>
                    ${u.roleType !== 'admin' ? `
                      <button data-del-user-id="${u.id}" class="del-user-btn p-1 bg-error-container text-error hover:bg-error hover:text-white rounded-lg transition-colors" title="Eliminar">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Right 2 Cols: Demo Management, Filtering by Company & Quick Actions -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Existing Demos with Rich Filtering & Reassignment -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-2xl">assignment_ind</span>
                <div>
                  <h2 class="font-bold text-lg text-on-surface">Proyectos del Reto IA</h2>
                  <p class="text-xs text-secondary font-medium" id="adminDemosCountLabel">
                    Mostrando <span class="font-bold text-primary">${filteredDemos.length}</span> de ${demos.length} proyectos
                  </p>
                </div>
              </div>

              <!-- Quick Reset Filters Button -->
              <button 
                id="adminClearFiltersBtn" 
                type="button" 
                class="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-secondary text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${adminCompanyFilter === 'all' && !adminSearchQuery && adminStatusFilter === 'all' ? 'hidden' : ''}"
              >
                <span class="material-symbols-outlined text-sm">restart_alt</span> Limpiar Filtros
              </button>
            </div>

            <!-- Search & Filters Toolbar -->
            <div class="space-y-3.5 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              
              <!-- Search Bar -->
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-sm">search</span>
                <input 
                  type="text" 
                  id="adminDemoSearchInput" 
                  value="${adminSearchQuery}" 
                  placeholder="🔍 Buscar proyecto por título, equipo/autor, departamento o palabra clave..." 
                  class="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-surface-container focus:border-primary focus:outline-none text-xs font-medium shadow-sm"
                />
              </div>

              <!-- Filter Selectors Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs text-primary">domain</span> Filtrar por Empresa:
                  </label>
                  <select id="adminCompanyFilterSelect" class="w-full p-2.5 bg-white rounded-xl border border-surface-container focus:border-primary focus:outline-none text-xs font-bold text-slate-800 shadow-sm cursor-pointer">
                    <option value="all">🏢 Todas las Empresas (${demos.length})</option>
                    ${companies.map(c => {
                      const count = demos.filter(d => d.category === c).length;
                      return `<option value="${c}" ${adminCompanyFilter === c ? 'selected' : ''}>${c} (${count})</option>`;
                    }).join('')}
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs text-primary">gavel</span> Estado de Dictamen (Jurado):
                  </label>
                  <select id="adminStatusFilterSelect" class="w-full p-2.5 bg-white rounded-xl border border-surface-container focus:border-primary focus:outline-none text-xs font-bold text-slate-800 shadow-sm cursor-pointer">
                    <option value="all" ${adminStatusFilter === 'all' ? 'selected' : ''}>Todos los Estados</option>
                    <option value="ready" ${adminStatusFilter === 'ready' ? 'selected' : ''}>✓ Dictaminados (Listos para Jurado)</option>
                    <option value="pending" ${adminStatusFilter === 'pending' ? 'selected' : ''}>⏳ Pendientes de Dictamen</option>
                  </select>
                </div>
              </div>

              <!-- Interactive Company Chips (One-Click Quick Filter) -->
              <div class="pt-1">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1.5">Filtro Rápido por Empresa:</span>
                <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                  <button 
                    type="button"
                    data-admin-company="all" 
                    class="admin-company-chip px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${adminCompanyFilter === 'all' ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary hover:bg-surface-container border border-surface-container'}"
                  >
                    Todas (${demos.length})
                  </button>
                  ${companies.map(c => {
                    const count = demos.filter(d => d.category === c).length;
                    const isSelected = adminCompanyFilter === c;
                    return `
                      <button 
                        type="button"
                        data-admin-company="${c}" 
                        class="admin-company-chip px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${isSelected ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary hover:bg-surface-container border border-surface-container'}"
                      >
                        ${c} (${count})
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

            </div>
            
            <!-- Demos List Container -->
            <div id="adminDemosListContainer" class="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              ${renderAdminDemosListHtml(filteredDemos, users)}
            </div>
          </div>

          <!-- Create New Demo Card (Collapsible / Bottom) -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">add_box</span>
              <h2 class="font-bold text-base text-on-surface">Crear Nuevo Proyecto Demo</h2>
            </div>
            
            <form id="createDemoForm" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-secondary mb-1">Título del Proyecto</label>
                  <input type="text" id="newDemoTitle" required placeholder="Ej. SmartPack AI" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>

                <div>
                  <label class="block font-semibold text-secondary mb-1">Empresa</label>
                  <select id="newDemoCategory" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                    ${companies.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-secondary mb-1">Asignar a Equipo / Participante</label>
                <select id="newDemoAuthor" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  <option value="" disabled selected>Selecciona un equipo participante...</option>
                  ${users.filter(u => u.roleType === 'participant').map(u => `
                    <option value="${u.id}">${u.name} (${u.unit})</option>
                  `).join('')}
                </select>
              </div>

              <button type="submit" class="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-base">post_add</span> Crear y Asignar Demo
              </button>
            </form>
          </div>

        </div>

      </div>

      <!-- MODAL 1: Edit User Modal -->
      <div id="editUserModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
            <h3 class="font-bold text-lg text-on-surface">Editar Cuenta de Usuario</h3>
            <button id="closeEditUserModalBtn" class="text-secondary hover:text-primary">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="editUserForm" class="space-y-3 text-sm">
            <input type="hidden" id="editUserId"/>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Nombre Completo</label>
              <input type="text" id="editUserName" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Correo Electrónico</label>
              <input type="email" id="editUserEmail" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Contraseña</label>
                <input type="text" id="editUserPass" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Rol</label>
                <select id="editUserRole" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  <option value="participant">Participante</option>
                  <option value="judge">Jurado</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Cargo / Puesto</label>
              <input type="text" id="editUserTitle" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Unidad / Área</label>
              <input type="text" id="editUserUnit" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button type="button" id="cancelEditUserBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
              <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL 2: Edit Multimedia Links Modal (Admin) -->
      <div id="editVideoModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">video_settings</span>
              <h3 class="font-bold text-lg text-on-surface">Editar Multimedia del Proyecto</h3>
            </div>
            <button id="closeEditVideoModalBtn" class="text-secondary hover:text-primary">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="editVideoForm" class="space-y-3 text-sm">
            <input type="hidden" id="editVideoDemoId"/>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1">Proyecto</label>
              <input type="text" id="editVideoDemoTitle" readonly class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container text-secondary font-semibold cursor-not-allowed"/>
            </div>

            <div>
              <label class="block font-semibold text-xs text-amber-800 mb-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">bolt</span> ⚡ Video Resumen (YouTube Embed o Enlace)
              </label>
              <input type="text" id="editSummaryVideoUrlInput" placeholder="https://youtu.be/... o https://www.youtube.com/embed/..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none font-mono text-xs"/>
              <p class="text-[11px] text-secondary mt-0.5">Video corto recomendado para evaluación rápida del jurado.</p>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">movie</span> 🎬 Demo Completa / Técnica (YouTube, Drive o Local)
              </label>
              <input type="text" id="editVideoUrlInput" placeholder="https://www.youtube.com/embed/... o /contaanalytics.mp4" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none font-mono text-xs"/>
              <p class="text-[11px] text-secondary mt-0.5">Video con la demostración técnica completa.</p>
            </div>

            <div>
              <label class="block font-semibold text-xs text-secondary mb-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">dashboard</span> 📊 Infografía Ejecutiva (Cargar Archivo o Enlace)
              </label>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <label class="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg cursor-pointer text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-sm">upload_file</span> Cargar Imagen / PDF desde tu equipo
                    <input type="file" id="editAdminInfographicFileInput" accept="image/*,application/pdf" class="hidden"/>
                  </label>
                  <span id="editAdminInfographicFileName" class="text-xs text-secondary italic truncate max-w-[180px]">Ningún archivo seleccionado</span>
                </div>

                <!-- Live Preview Box -->
                <div id="editAdminInfographicPreviewBox" class="hidden p-2 bg-surface-container-low rounded-lg border border-surface-container text-center">
                  <div id="editAdminInfographicPreviewContent"></div>
                </div>

                <input type="text" id="editInfographicUrlInput" placeholder="https://... o data:image/..." class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none font-mono text-xs"/>
              </div>
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button type="button" id="cancelEditVideoBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
              <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">save</span> Guardar Multimedia
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

function attachAdminEvents() {

  // Dynamic Demos List Filter Refresh
  const refreshAdminDemosListOnly = () => {
    const listContainer = document.getElementById('adminDemosListContainer');
    const countLabel = document.getElementById('adminDemosCountLabel');
    const clearBtn = document.getElementById('adminClearFiltersBtn');
    const filtered = getFilteredAdminDemos();
    const allDemos = state.demos || [];

    if (listContainer) {
      listContainer.innerHTML = renderAdminDemosListHtml(filtered, state.users || []);
      attachDynamicDemoListEvents();
    }
    if (countLabel) {
      countLabel.innerHTML = `Mostrando <span class="font-bold text-primary">${filtered.length}</span> de ${allDemos.length} proyectos`;
    }
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', adminCompanyFilter === 'all' && !adminSearchQuery && adminStatusFilter === 'all');
    }

    // Update chip styles
    document.querySelectorAll('.admin-company-chip').forEach(chip => {
      const isSelected = chip.dataset.adminCompany === adminCompanyFilter;
      chip.className = `admin-company-chip px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
        isSelected 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-white text-secondary hover:bg-surface-container border border-surface-container'
      }`;
    });

    // Update select dropdown value
    const companySelect = document.getElementById('adminCompanyFilterSelect');
    if (companySelect && companySelect.value !== adminCompanyFilter) {
      companySelect.value = adminCompanyFilter;
    }
  };

  // Search input event
  const searchInput = document.getElementById('adminDemoSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      adminSearchQuery = e.target.value;
      refreshAdminDemosListOnly();
    });
  }

  // Company select dropdown event
  const companySelect = document.getElementById('adminCompanyFilterSelect');
  if (companySelect) {
    companySelect.addEventListener('change', (e) => {
      adminCompanyFilter = e.target.value;
      refreshAdminDemosListOnly();
    });
  }

  // Status select dropdown event
  const statusSelect = document.getElementById('adminStatusFilterSelect');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      adminStatusFilter = e.target.value;
      refreshAdminDemosListOnly();
    });
  }

  // Company chips click events
  document.querySelectorAll('.admin-company-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      adminCompanyFilter = e.currentTarget.dataset.adminCompany;
      refreshAdminDemosListOnly();
    });
  });

  // Clear filters button event
  const clearBtn = document.getElementById('adminClearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      adminCompanyFilter = 'all';
      adminSearchQuery = '';
      adminStatusFilter = 'all';
      if (searchInput) searchInput.value = '';
      refreshAdminDemosListOnly();
    });
  }

  // User search input event
  const userSearchInput = document.getElementById('adminUserSearchInput');
  if (userSearchInput) {
    userSearchInput.addEventListener('input', (e) => {
      adminUserSearch = e.target.value;
      refreshAdminView();
    });
  }

  // Attach dynamic demo items events
  attachDynamicDemoListEvents();

  // Create User
  const createUserForm = document.getElementById('createUserForm');
  if (createUserForm) {
    createUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userData = {
        name: document.getElementById('newUserName')?.value || '',
        email: document.getElementById('newUserEmail')?.value || '',
        password: document.getElementById('newUserPass')?.value || '',
        roleType: document.getElementById('newUserRole')?.value || '',
        roleTitle: document.getElementById('newUserTitle')?.value || '',
        unit: document.getElementById('newUserUnit')?.value || '',
      };
      
      if (createUser(userData)) {
        alert('Usuario registrado exitosamente.');
        createUserForm.reset();
        refreshAdminView();
      }
    });
  }

  // Create Demo
  const createDemoForm = document.getElementById('createDemoForm');
  if (createDemoForm) {
    createDemoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const demoData = {
        title: document.getElementById('newDemoTitle')?.value || '',
        category: document.getElementById('newDemoCategory')?.value || ''
      };
      const authorId = document.getElementById('newDemoAuthor')?.value || '';
      if (createDemo(demoData, authorId)) {
        alert('Proyecto Demo creado exitosamente.');
        createDemoForm.reset();
        refreshAdminView();
      }
    });
  }

  // Edit User Modal logic
  const editUserModal = document.getElementById('editUserModal');
  const closeEditUserBtn = document.getElementById('closeEditUserModalBtn');
  const cancelEditUserBtn = document.getElementById('cancelEditUserBtn');

  if (closeEditUserBtn && editUserModal) closeEditUserBtn.addEventListener('click', () => editUserModal.classList.add('hidden'));
  if (cancelEditUserBtn && editUserModal) cancelEditUserBtn.addEventListener('click', () => editUserModal.classList.add('hidden'));

  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.dataset.editUserId;
      const user = state.users.find(u => u.id === userId);
      if (user && editUserModal) {
        const idInput = document.getElementById('editUserId');
        const nameInput = document.getElementById('editUserName');
        const emailInput = document.getElementById('editUserEmail');
        const passInput = document.getElementById('editUserPass');
        const roleInput = document.getElementById('editUserRole');
        const titleInput = document.getElementById('editUserTitle');
        const unitInput = document.getElementById('editUserUnit');

        if (idInput) idInput.value = user.id;
        if (nameInput) nameInput.value = user.name;
        if (emailInput) emailInput.value = user.email;
        if (passInput) passInput.value = user.password;
        if (roleInput) roleInput.value = user.roleType;
        if (titleInput) titleInput.value = user.roleTitle || '';
        if (unitInput) unitInput.value = user.unit || '';

        editUserModal.classList.remove('hidden');
      }
    });
  });

  const editUserForm = document.getElementById('editUserForm');
  if (editUserForm) {
    editUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = document.getElementById('editUserId')?.value || '';
      const updated = {
        name: document.getElementById('editUserName')?.value || '',
        email: document.getElementById('editUserEmail')?.value || '',
        password: document.getElementById('editUserPass')?.value || '',
        roleType: document.getElementById('editUserRole')?.value || '',
        roleTitle: document.getElementById('editUserTitle')?.value || '',
        unit: document.getElementById('editUserUnit')?.value || '',
      };
      if (updateUser(userId, updated)) {
        if (editUserModal) editUserModal.classList.add('hidden');
        refreshAdminView();
      }
    });
  }

  // Delete User
  document.querySelectorAll('.del-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.dataset.delUserId;
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        deleteUser(userId);
        refreshAdminView();
      }
    });
  });

  // Edit Video Modal logic
  const editVideoModal = document.getElementById('editVideoModal');
  const closeEditVideoBtn = document.getElementById('closeEditVideoModalBtn');
  const cancelEditVideoBtn = document.getElementById('cancelEditVideoBtn');

  if (closeEditVideoBtn && editVideoModal) closeEditVideoBtn.addEventListener('click', () => editVideoModal.classList.add('hidden'));
  if (cancelEditVideoBtn && editVideoModal) cancelEditVideoBtn.addEventListener('click', () => editVideoModal.classList.add('hidden'));

  const editVideoForm = document.getElementById('editVideoForm');
  if (editVideoForm) {
    editVideoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const demoId = document.getElementById('editVideoDemoId')?.value || '';
      const summaryVideoUrl = (document.getElementById('editSummaryVideoUrlInput')?.value || '').trim();
      const videoUrl = (document.getElementById('editVideoUrlInput')?.value || '').trim();
      const infographicUrl = (document.getElementById('editInfographicUrlInput')?.value || '').trim();

      if (updateDemo(demoId, { videoUrl, summaryVideoUrl, infographicUrl })) {
        alert('Multimedia del proyecto actualizada exitosamente.');
        if (editVideoModal) editVideoModal.classList.add('hidden');
        refreshAdminView();
      }
    });

    const adminInfoFileInput = document.getElementById('editAdminInfographicFileInput');
    const adminInfoFileName = document.getElementById('editAdminInfographicFileName');
    const adminInfoUrlInput = document.getElementById('editInfographicUrlInput');
    const adminInfoPreviewBox = document.getElementById('editAdminInfographicPreviewBox');
    const adminInfoPreviewContent = document.getElementById('editAdminInfographicPreviewContent');

    if (adminInfoFileInput) {
      adminInfoFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          if (adminInfoFileName) adminInfoFileName.innerText = file.name;
          
          const reader = new FileReader();
          reader.onload = (evt) => {
            const dataUrl = evt.target.result;
            if (adminInfoUrlInput) adminInfoUrlInput.value = dataUrl;
            if (adminInfoPreviewBox && adminInfoPreviewContent) {
              adminInfoPreviewBox.classList.remove('hidden');
              if (file.type.startsWith('image/')) {
                adminInfoPreviewContent.innerHTML = `<img src="${dataUrl}" class="max-h-32 mx-auto object-contain rounded"/>`;
              } else {
                adminInfoPreviewContent.innerHTML = `<div class="p-2 text-xs font-bold text-primary flex items-center justify-center gap-1"><span class="material-symbols-outlined text-base">picture_as_pdf</span> ${file.name}</div>`;
              }
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
}

function attachDynamicDemoListEvents() {
  const editVideoModal = document.getElementById('editVideoModal');

  // Toggle Demo Dictamen (Presented / Ready for Evaluation)
  document.querySelectorAll('.toggle-ready-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.dataset.toggleReadyId;
      const currentReady = e.currentTarget.dataset.ready === 'true';
      const newReady = !currentReady;
      if (toggleDemoReadyForEvaluation(demoId, newReady)) {
        refreshAdminView();
      }
    });
  });

  // Delete Demo
  document.querySelectorAll('.del-demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.dataset.delDemoId;
      if (confirm('¿Estás seguro de eliminar este proyecto Demo?')) {
        deleteDemo(demoId);
        refreshAdminView();
      }
    });
  });

  // Reassign Demo
  document.querySelectorAll('.assign-demo-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const demoId = e.currentTarget.dataset.demoId;
      const select = e.currentTarget.querySelector('select');
      const authorId = select.value;
      if (assignDemo(demoId, authorId)) {
        alert('Proyecto reasignado exitosamente.');
        refreshAdminView();
      }
    });
  });

  // Open Edit Video / Multimedia Modal
  document.querySelectorAll('.edit-video-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.dataset.editVideoId;
      const demo = (state.demos || []).find(d => String(d.id) === String(demoId));
      if (demo && editVideoModal) {
        const idInput = document.getElementById('editVideoDemoId');
        const titleInput = document.getElementById('editVideoDemoTitle');
        const summaryUrlInput = document.getElementById('editSummaryVideoUrlInput');
        const urlInput = document.getElementById('editVideoUrlInput');
        const infographicUrlInput = document.getElementById('editInfographicUrlInput');

        if (idInput) idInput.value = demo.id;
        if (titleInput) titleInput.value = demo.title;
        if (summaryUrlInput) summaryUrlInput.value = demo.summaryVideoUrl || '';
        if (urlInput) urlInput.value = demo.videoUrl || '';
        if (infographicUrlInput) infographicUrlInput.value = demo.infographicUrl || '';

        editVideoModal.classList.remove('hidden');
      }
    });
  });

  // Reset filter button inside empty state
  const resetBtn = document.getElementById('resetAdminDemoFiltersBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      adminCompanyFilter = 'all';
      adminSearchQuery = '';
      adminStatusFilter = 'all';
      const searchInput = document.getElementById('adminDemoSearchInput');
      if (searchInput) searchInput.value = '';
      refreshAdminView();
    });
  }
}

function refreshAdminView() {
  const app = document.getElementById('app');
  if (app) app.innerHTML = renderAdminView();
}
