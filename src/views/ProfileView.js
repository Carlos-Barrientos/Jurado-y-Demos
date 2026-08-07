// View 4: Perfil del Participante / Panel del Jurado (Role Aware)

import { state, getDemoById, isJudge } from '../data/store.js';

export function renderProfileView() {
  setTimeout(attachProfileEventListeners, 50);
  return getProfileHtml();
}

function getProfileHtml() {
  const user = state.currentUser;
  const userIsJudge = isJudge();

  const myDemos = state.demos.filter(d => d.authorId === user.id || d.author === user.name);
  const savedDemos = (user.savedDemoIds || []).map(id => getDemoById(id)).filter(Boolean);

  // Judge specific lists
  const evaluatedDemos = state.demos.filter(d => (d.evaluations || []).some(e => e.judgeId === user.id));
  const pendingDemos = state.demos.filter(d => !(d.evaluations || []).some(e => e.judgeId === user.id));

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Profile / Judge Header Card -->
      <div class="bg-white rounded-2xl p-6 md:p-8 border border-surface-container-high shadow-sm relative overflow-hidden space-y-6">
        <div class="absolute top-0 left-0 right-0 h-28 ${userIsJudge ? 'bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800' : 'bg-gradient-to-r from-primary via-primary-container to-tertiary'}"></div>
        
        <div class="relative pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img 
              src="${user.avatar}" 
              alt="${user.name}"
              class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white shadow-md relative z-10"
            />
            <div class="space-y-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 class="text-2xl md:text-3xl font-bold text-on-surface">${user.name}</h1>
                <span class="px-2.5 py-0.5 rounded text-xs font-bold ${userIsJudge ? 'bg-amber-100 text-amber-900 border border-amber-300' : user.unitClass}">
                  ${userIsJudge ? '⚖️ Jurado Oficial' : user.unit}
                </span>
              </div>
              <p class="text-sm font-semibold text-secondary">${user.roleTitle || user.role}</p>
              <p class="text-xs text-secondary flex items-center justify-center sm:justify-start gap-1">
                <span class="material-symbols-outlined text-sm">mail</span> ${user.email}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <span class="px-4 py-2 bg-surface-container rounded-lg text-xs font-bold text-secondary border border-surface-container-high">
              Rol Activo: ${userIsJudge ? 'Jurado Evaluador' : 'Participante / Creador'}
            </span>
          </div>
        </div>

        <p class="text-sm text-secondary leading-relaxed border-t border-surface-container-high pt-4">
          ${user.bio}
        </p>

        <!-- Recognition Badges -->
        <div class="flex flex-wrap items-center gap-2 pt-2">
          <span class="text-xs font-bold uppercase tracking-wider text-secondary mr-2">Insignias:</span>
          ${user.badges.map(b => `
            <span class="px-3 py-1 rounded-full ${userIsJudge ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-primary/10 text-primary border border-primary/20'} text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm fill ${userIsJudge ? 'text-amber-600' : 'text-primary'}">workspace_premium</span> ${b}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Stats Grid Cards -->
      ${userIsJudge ? `
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Proyectos Evaluados</span>
            <div class="text-3xl font-extrabold text-amber-600">${evaluatedDemos.length}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Pendientes de Calificar</span>
            <div class="text-3xl font-extrabold font-bold text-primary">${pendingDemos.length}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Total de Proyectos en Concurso</span>
            <div class="text-3xl font-extrabold text-on-surface">${state.demos.length}</div>
          </div>
        </div>
      ` : `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Demos Publicados</span>
            <div class="text-3xl font-extrabold text-primary">${myDemos.length}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Visualizaciones</span>
            <div class="text-3xl font-extrabold text-on-surface">${user.stats ? user.stats.totalViews : 1200}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Reacciones</span>
            <div class="text-3xl font-extrabold text-primary">${user.stats ? user.stats.totalLikes : 180}</div>
          </div>
          <div class="bg-white p-5 rounded-xl border border-surface-container-high space-y-1 shadow-sm">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Colaboraciones</span>
            <div class="text-3xl font-extrabold text-emerald-600">${user.stats ? user.stats.collaborations : 6}</div>
          </div>
        </div>
      `}

      <!-- Profile Tabs -->
      ${userIsJudge ? `
        <div class="border-b border-surface-container-high flex gap-8 text-sm font-medium">
          <button class="py-3 profile-tab-btn tab-active" data-target="tab-pending-evals">
            Proyectos Pendientes (${pendingDemos.length})
          </button>
          <button class="py-3 profile-tab-btn text-secondary hover:text-amber-700" data-target="tab-done-evals">
            Evaluaciones Completadas (${evaluatedDemos.length})
          </button>
        </div>

        <div id="tab-pending-evals" class="profile-tab-content space-y-4">
          ${pendingDemos.length === 0 ? `
            <p class="text-sm text-secondary text-center py-12">¡Excelente! Has evaluado todos los proyectos presentados.</p>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${pendingDemos.map(d => renderJudgeCard(d, false)).join('')}
            </div>
          `}
        </div>

        <div id="tab-done-evals" class="profile-tab-content hidden space-y-4">
          ${evaluatedDemos.length === 0 ? `
            <p class="text-sm text-secondary text-center py-12">Aún no has emitido ninguna calificación.</p>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${evaluatedDemos.map(d => renderJudgeCard(d, true)).join('')}
            </div>
          `}
        </div>
      ` : `
        <div class="border-b border-surface-container-high flex gap-8 text-sm font-medium">
          <button class="py-3 profile-tab-btn tab-active" data-target="tab-my-demos">
            Mis Demos (${myDemos.length})
          </button>
          <button class="py-3 profile-tab-btn text-secondary hover:text-primary" data-target="tab-saved-demos">
            Demos Guardados (${savedDemos.length})
          </button>
        </div>

        <div id="tab-my-demos" class="profile-tab-content space-y-6">
          ${myDemos.length === 0 ? `
            <p class="text-sm text-secondary text-center py-12">No has publicado demos aún con este usuario.</p>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${myDemos.map(renderParticipantDemoCard).join('')}
            </div>
          `}
        </div>

        <div id="tab-saved-demos" class="profile-tab-content hidden space-y-6">
          ${savedDemos.length === 0 ? `
            <p class="text-sm text-secondary text-center py-12">No tienes demos guardados en favoritos.</p>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${savedDemos.map(renderParticipantDemoCard).join('')}
            </div>
          `}
        </div>
      `}

    </div>
  `;
}

function renderJudgeCard(demo, isEvaluated) {
  const myEval = (demo.evaluations || []).find(e => e.judgeId === state.currentUser.id);

  return `
    <div class="bg-white rounded-xl border border-surface-container-high overflow-hidden demo-card-hover flex flex-col justify-between">
      <div class="relative aspect-video bg-surface-container">
        <img src="${demo.thumbnail}" alt="${demo.title}" class="w-full h-full object-cover"/>
        <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold ${demo.unitClass}">${demo.unit}</span>
        ${isEvaluated ? `
          <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow">
            <span class="material-symbols-outlined text-sm">verified</span> Calificado ★ ${myEval ? myEval.average.toFixed(1) : ''}
          </span>
        ` : `
          <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-xs shadow">
            Pendiente
          </span>
        `}
      </div>
      <div class="p-4 space-y-2 flex-grow">
        <h4 class="font-bold text-sm text-on-surface line-clamp-2">${demo.title}</h4>
        <p class="text-xs text-secondary line-clamp-2">${demo.description}</p>
        <span class="text-[11px] text-secondary font-semibold block">Autor: ${demo.author}</span>
      </div>
      <div class="p-4 bg-surface-bright border-t border-surface-container-high">
        <a href="#demo/${demo.id}" class="w-full py-2 ${isEvaluated ? 'bg-surface-container hover:bg-surface-container-high text-on-surface' : 'bg-amber-600 hover:bg-amber-700 text-white'} font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-sm">${isEvaluated ? 'visibility' : 'gavel'}</span>
          ${isEvaluated ? 'Ver Calificación Emitida' : 'Evaluar y Calificar Proyecto'}
        </a>
      </div>
    </div>
  `;
}

function renderParticipantDemoCard(demo) {
  return `
    <div class="bg-white rounded-xl border border-surface-container-high overflow-hidden demo-card-hover flex flex-col justify-between">
      <div class="relative aspect-video bg-surface-container">
        <img src="${demo.thumbnail}" alt="${demo.title}" class="w-full h-full object-cover"/>
        <a href="#demo/${demo.id}" class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-xl fill">play_arrow</span>
          </div>
        </a>
      </div>
      <div class="p-4 space-y-2">
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${demo.unitClass}">${demo.unit}</span>
        <h4 class="font-bold text-sm text-on-surface line-clamp-2 hover:text-primary">
          <a href="#demo/${demo.id}">${demo.title}</a>
        </h4>
        <p class="text-xs text-secondary line-clamp-2">${demo.description}</p>
      </div>
      <div class="px-4 py-3 bg-surface-bright border-t border-surface-container-high flex items-center justify-between text-xs">
        <span class="text-secondary font-medium">${(demo.images || []).length} imágenes cargadas</span>
        <a href="#demo/${demo.id}" class="font-bold text-primary hover:underline flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">edit</span> Editar
        </a>
      </div>
    </div>
  `;
}

function attachProfileEventListeners() {
  document.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.profile-tab-btn').forEach(b => {
        b.classList.remove('tab-active');
        b.classList.add('text-secondary');
      });
      document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.add('hidden'));

      e.currentTarget.classList.add('tab-active');
      e.currentTarget.classList.remove('text-secondary');

      const targetId = e.currentTarget.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.remove('hidden');
    });
  });
}
