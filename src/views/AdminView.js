import { state, isAdmin, createUser, updateUser, deleteUser, createDemo, deleteDemo, assignDemo, updateDemoVideoUrl, toggleDemoReadyForEvaluation, resetState, companies } from '../data/store.js';

export function renderAdminView() {
  if (!isAdmin()) {
    return `<div class="p-12 text-center text-error font-bold text-xl">Acceso Denegado. Solo Administradores.</div>`;
  }
  setTimeout(attachAdminEvents, 50);
  return getAdminHtml();
}

function getAdminHtml() {
  const users = state.users;
  const demos = state.demos;

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Header Banner -->
      <div class="bg-white rounded-2xl p-6 md:p-8 border border-surface-container-high shadow-sm relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-3xl text-primary">admin_panel_settings</span>
            <h1 class="text-2xl md:text-3xl font-bold text-on-surface">Panel de Administración Integral</h1>
          </div>
          <p class="text-sm text-secondary">Gestión completa de usuarios, asignación de demos y enlaces de video del sistema.</p>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: User Management & Editing -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- User Registration Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">person_add</span>
              <h2 class="font-bold text-lg text-on-surface">Registrar Nuevo Usuario</h2>
            </div>
            
            <form id="createUserForm" class="space-y-4 text-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Nombre Completo</label>
                  <input type="text" id="newUserName" required placeholder="Ej. Dra. Carmen Silva" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Correo Electrónico</label>
                  <input type="email" id="newUserEmail" required placeholder="carmen@prosur.com" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Contraseña</label>
                  <input type="text" id="newUserPass" value="demo" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Rol en Plataforma</label>
                  <select id="newUserRole" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                    <option value="participant">Participante (Crea/Edita Demo)</option>
                    <option value="judge">Jurado (Califica Demos)</option>
                    <option value="admin">Administrador (Control Total)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-xs text-secondary mb-1">Cargo / Puesto</label>
                  <input type="text" id="newUserTitle" required placeholder="Ej. Especialista en IA" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Unidad / División Prosur</label>
                <input type="text" id="newUserUnit" required placeholder="Ej. Prosur Biotech" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <button type="submit" class="w-full py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-lg">how_to_reg</span> Registrar Usuario
              </button>
            </form>
          </div>

          <!-- Existing Users Directory & Actions -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">group</span>
                <h2 class="font-bold text-lg text-on-surface">Usuarios Registrados (${users.length})</h2>
              </div>
              <span class="text-xs text-secondary font-medium">Edita o elimina cuentas de usuario</span>
            </div>

            <div class="space-y-3">
              ${users.map(u => `
                <div class="p-4 bg-surface-bright rounded-xl border border-surface-container flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img src="${u.avatar}" alt="${u.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"/>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-bold text-sm text-on-surface">${u.name}</h4>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.roleType === 'admin' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                          u.roleType === 'judge' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }">
                          ${u.roleType === 'admin' ? 'Admin' : u.roleType === 'judge' ? 'Jurado' : 'Participante'}
                        </span>
                      </div>
                      <p class="text-xs text-secondary">${u.email} • <span class="italic">${u.roleTitle || 'Sin cargo'}</span></p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button data-edit-user-id="${u.id}" class="edit-user-btn px-3 py-1.5 bg-surface-container hover:bg-primary hover:text-white text-secondary font-semibold text-xs rounded-lg transition-colors flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">edit</span> Editar
                    </button>
                    ${u.roleType !== 'admin' ? `
                      <button data-del-user-id="${u.id}" class="del-user-btn px-2.5 py-1.5 bg-error-container text-error hover:bg-error hover:text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Right Col: Demo Management & Creation -->
        <div class="space-y-8">
          
          <!-- Create New Demo Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">add_box</span>
              <h2 class="font-bold text-lg text-on-surface">Crear Nuevo Proyecto Demo</h2>
            </div>
            
            <form id="createDemoForm" class="space-y-4 text-sm">
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Título del Proyecto</label>
                <input type="text" id="newDemoTitle" required placeholder="Ej. SmartPack AI" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Empresa</label>
                <select id="newDemoCategory" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  ${companies.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Asignar a Equipo / Participante</label>
                <select id="newDemoAuthor" required class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  <option value="" disabled selected>Selecciona un equipo participante...</option>
                  ${users.filter(u => u.roleType === 'participant').map(u => `
                    <option value="${u.id}">${u.name} (${u.unit})</option>
                  `).join('')}
                </select>
              </div>

              <button type="submit" class="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-lg">post_add</span> Crear y Asignar Demo
              </button>
            </form>
          </div>

          <!-- Existing Demos & Reassignment -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
            <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
              <span class="material-symbols-outlined text-primary">assignment_ind</span>
              <h2 class="font-bold text-lg text-on-surface">Proyectos Existentes (${demos.length})</h2>
            </div>
            
            <div class="space-y-4">
              ${demos.map(demo => `
                <div class="p-4 bg-surface-bright rounded-xl border border-surface-container-high space-y-3">
                  <div class="flex items-start justify-between gap-2">
                    <div class="space-y-1">
                      <h4 class="font-bold text-sm text-on-surface">${demo.title}</h4>
                      <p class="text-xs text-secondary">Autor: <span class="font-bold text-primary">${demo.author}</span></p>
                      
                      <!-- Video Link Quick Edit Banner & Presentation Dictamen -->
                      <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <span class="material-symbols-outlined text-sm text-primary">smart_display</span>
                        <span class="font-semibold text-secondary">Video:</span>
                        <button data-edit-video-id="${demo.id}" class="edit-video-btn inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded font-medium text-[11px] transition-colors" title="Editar link del video">
                          <span class="material-symbols-outlined text-xs">edit</span> Editar Link
                        </button>
                        
                        <button data-toggle-ready-id="${demo.id}" data-ready="${demo.readyForEvaluation ? 'true' : 'false'}" class="toggle-ready-btn inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all shadow-sm ${demo.readyForEvaluation ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'}">
                          <span class="material-symbols-outlined text-xs">${demo.readyForEvaluation ? 'check_circle' : 'pending'}</span>
                          ${demo.readyForEvaluation ? 'Dictaminado: Ya Presentó' : 'Dictaminar: Listo para Evaluar'}
                        </button>
                      </div>
                    </div>

                    <div class="flex items-center gap-1">
                      <a href="#demo/${demo.id}" class="p-1 text-secondary hover:text-primary transition-colors" title="Ver Detalle del Proyecto">
                        <span class="material-symbols-outlined text-base">visibility</span>
                      </a>
                      <button data-del-demo-id="${demo.id}" class="del-demo-btn p-1 text-secondary hover:text-error transition-colors" title="Eliminar Proyecto">
                        <span class="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                  
                  <form class="assign-demo-form flex items-center gap-2" data-demo-id="${demo.id}">
                    <select class="flex-1 p-2 bg-white rounded-lg border border-surface-container text-xs focus:outline-none focus:border-primary" required>
                      <option value="" disabled selected>Reasignar a equipo participante...</option>
                      ${users.filter(u => u.roleType === 'participant').map(u => `
                        <option value="${u.id}">${u.name} (${u.unit})</option>
                      `).join('')}
                    </select>
                    <button type="submit" class="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-container transition-colors">
                      Guardar
                    </button>
                  </form>
                </div>
              `).join('')}
            </div>
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

      <!-- MODAL 2: Edit Video Link Modal (Admin) -->
      <div id="editVideoModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">videocam</span>
              <h3 class="font-bold text-lg text-on-surface">Editar Link de Video del Proyecto</h3>
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
              <label class="block font-semibold text-xs text-secondary mb-1">Enlace del Video (URL Embed o Directa)</label>
              <input type="url" id="editVideoUrlInput" required placeholder="https://www.youtube.com/embed/..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none font-mono text-xs"/>
              <p class="text-[11px] text-secondary mt-1">Soporta enlaces embed de YouTube (https://www.youtube.com/embed/...) o videos MP4.</p>
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button type="button" id="cancelEditVideoBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
              <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">save</span> Guardar Video
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

function attachAdminEvents() {

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
      const demoId = form.dataset.demoId;
      const select = form.querySelector('select');
      const authorId = select ? select.value : '';
      if (authorId && assignDemo(demoId, authorId)) {
        alert('Proyecto reasignado exitosamente.');
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

  document.querySelectorAll('.edit-video-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.dataset.editVideoId;
      const demo = state.demos.find(d => String(d.id) === String(demoId));
      if (demo && editVideoModal) {
        const idInput = document.getElementById('editVideoDemoId');
        const titleInput = document.getElementById('editVideoDemoTitle');
        const urlInput = document.getElementById('editVideoUrlInput');

        if (idInput) idInput.value = demo.id;
        if (titleInput) titleInput.value = demo.title;
        if (urlInput) urlInput.value = demo.videoUrl || '';

        editVideoModal.classList.remove('hidden');
      }
    });
  });

  const editVideoForm = document.getElementById('editVideoForm');
  if (editVideoForm) {
    editVideoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const demoId = document.getElementById('editVideoDemoId')?.value || '';
      const videoUrl = (document.getElementById('editVideoUrlInput')?.value || '').trim();
      if (updateDemoVideoUrl(demoId, videoUrl)) {
        alert('Enlace de video actualizado exitosamente.');
        if (editVideoModal) editVideoModal.classList.add('hidden');
        refreshAdminView();
      }
    });
  }
}

function refreshAdminView() {
  const app = document.getElementById('app');
  if (app) app.innerHTML = renderAdminView();
}
