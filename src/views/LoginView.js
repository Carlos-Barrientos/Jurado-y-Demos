import { login } from '../data/store.js';
import { handleRoute, navigateTo } from '../router/index.js';

export function renderLoginView() {
  setTimeout(attachLoginEvents, 50);
  return getLoginHtml();
}

function getLoginHtml() {
  return `
    <div class="min-h-[80vh] flex items-center justify-center p-4 animate-fadeIn">
      <div class="bg-white max-w-md w-full rounded-2xl border border-surface-container-high shadow-xl overflow-hidden">
        
        <div class="bg-gradient-to-r from-primary to-primary-container p-8 text-center space-y-4">
          <div class="w-16 h-16 bg-white rounded-xl mx-auto flex items-center justify-center shadow-md p-1">
            <img src="/logo-prosur.png" alt="Prosur Logo" class="w-full h-full object-contain" />
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">Acceso a Demo IA</h1>
          <p class="text-primary-container text-sm text-white/80">Reto de Inteligencia Artificial 2026</p>
        </div>

        <div class="p-8 space-y-6">
          <form id="loginForm" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Correo Electrónico</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">mail</span>
                <input 
                  type="email" 
                  id="loginEmail" 
                  class="w-full pl-10 pr-3 py-3 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-medium"
                  placeholder="usuario@prosur.com"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Contraseña</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">lock</span>
                <input 
                  type="password" 
                  id="loginPassword" 
                  class="w-full pl-10 pr-3 py-3 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div id="loginError" class="hidden text-xs text-error font-bold text-center bg-error-container py-2 rounded">
              Credenciales incorrectas. Verifica el correo y la contraseña.
            </div>

            <button type="submit" class="w-full py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">login</span> Iniciar Sesión
            </button>
          </form>

        </div>

      </div>
    </div>
  `;
}

function attachLoginEvents() {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPassword').value;
      const errorMsg = document.getElementById('loginError');

      if (login(email, pass)) {
        errorMsg.classList.add('hidden');
        navigateTo('#home'); // Force redirect
        handleRoute();       // Update the view & navbar
      } else {
        errorMsg.classList.remove('hidden');
      }
    });
  }
}
