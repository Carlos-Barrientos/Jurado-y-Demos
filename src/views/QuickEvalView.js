import { state, isJudge, isAdmin, getDemoById, submitJudgeEvaluation, deleteJudgeEvaluation, formatYoutubeEmbedUrl, companies } from '../data/store.js';

export function renderQuickEvalView() {
  if (!isJudge()) {
    return `
      <div class="max-w-[1440px] mx-auto px-4 py-16 text-center space-y-4">
        <span class="material-symbols-outlined text-4xl text-error">gavel</span>
        <h2 class="text-xl font-bold text-on-surface">Acceso Exclusivo para Jurados</h2>
        <p class="text-sm text-secondary">El panel de Evaluación Rápida está reservado para los integrantes del Jurado Oficial.</p>
        <a href="#home" class="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-lg inline-flex items-center gap-2 hover:bg-primary-container transition-all">
          <span class="material-symbols-outlined">home</span> Ir a la Galería
        </a>
      </div>
    `;
  }

  setTimeout(attachQuickEvalEventListeners, 50);
  return getQuickEvalHtml();
}

let activeStatusFilter = 'all'; // 'all', 'pending', 'done'
let activeCompanyFilter = 'all';

function getQuickEvalHtml() {
  const user = state.currentUser;
  
  // Judges only evaluate presented demos (readyForEvaluation === true)
  const presentedDemos = (state.demos || []).filter(d => Boolean(d.readyForEvaluation));
  
  const evaluatedCount = presentedDemos.filter(d => (d.evaluations || []).some(e => e.judgeId === user.id)).length;
  const pendingCount = presentedDemos.length - evaluatedCount;
  const progressPct = presentedDemos.length > 0 ? Math.round((evaluatedCount / presentedDemos.length) * 100) : 0;

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-900 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-6">
        <div class="space-y-2 z-10 max-w-2xl">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-4xl text-amber-300">bolt</span>
            <div>
              <h1 class="text-2xl md:text-3xl font-black tracking-tight">Evaluación Rápida del Jurado</h1>
              <p class="text-xs md:text-sm text-amber-100">Matriz interactiva para revisar descripciones, impactos y calificar proyectos de forma ágil.</p>
            </div>
          </div>
        </div>

        <!-- Progress Widget -->
        <div class="z-10 bg-black/25 backdrop-blur-md p-4 rounded-xl border border-white/20 min-w-[240px] space-y-2">
          <div class="flex justify-between items-center text-xs font-bold">
            <span class="text-amber-200 uppercase tracking-wider">Tu Progreso de Evaluación</span>
            <span class="text-amber-300 text-sm font-black">${progressPct}%</span>
          </div>
          <div class="w-full bg-amber-950/60 rounded-full h-2.5 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500" style="width: ${progressPct}%"></div>
          </div>
          <div class="flex justify-between text-[11px] text-amber-100 pt-0.5">
            <span>Completados: <b>${evaluatedCount}</b></span>
            <span>Pendientes: <b>${pendingCount}</b></span>
          </div>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="bg-white p-5 rounded-2xl border border-surface-container-high shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button data-status="all" class="status-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStatusFilter === 'all' ? 'bg-amber-600 text-white shadow' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}">
            Todos los Presentados (${presentedDemos.length})
          </button>
          <button data-status="pending" class="status-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStatusFilter === 'pending' ? 'bg-amber-600 text-white shadow' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}">
            ⚡ Pendientes por Calificar (${pendingCount})
          </button>
          <button data-status="done" class="status-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStatusFilter === 'done' ? 'bg-amber-600 text-white shadow' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}">
            ✓ Evaluados por ti (${evaluatedCount})
          </button>
        </div>

        <div class="flex items-center gap-3">
          <label class="text-xs font-semibold text-secondary">Empresa:</label>
          <select id="quickCompanyFilter" class="p-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-semibold focus:outline-none focus:border-amber-500">
            <option value="all">Todas las Empresas</option>
            ${companies.map(c => `<option value="${c}" ${activeCompanyFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Main Quick Evaluation Table -->
      <div class="bg-white rounded-2xl border border-surface-container-high shadow-sm overflow-hidden space-y-4 p-6">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-amber-50/70 border-b border-amber-200 text-amber-950 uppercase font-extrabold text-[11px] tracking-wider">
                <th class="p-3.5">Proyecto & Autor</th>
                <th class="p-3.5 min-w-[280px]">Descripción (MVP) & Beneficios</th>
                <th class="p-3.5 min-w-[200px]">Problema Operativo Solucionado</th>
                <th class="p-3.5 text-center">Video / Evidencia</th>
                <th class="p-3.5 text-center">Tu Evaluación</th>
                <th class="p-3.5 text-center">Acción Rápida</th>
              </tr>
            </thead>
            <tbody id="quickEvalTableBody" class="divide-y divide-surface-container">
              ${renderQuickEvalRows(presentedDemos, user)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL: Quick Evaluate Form Modal -->
      <div id="quickEvalModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-600 text-2xl">gavel</span>
              <div>
                <h3 id="quickEvalModalTitle" class="font-bold text-base text-on-surface">Calificación Rápida</h3>
                <span id="quickEvalModalSubtitle" class="text-xs text-secondary block"></span>
              </div>
            </div>
            <button id="closeQuickEvalModalBtn" class="text-secondary hover:text-primary">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="quickEvalModalForm" class="space-y-4">
            <input type="hidden" id="quickEvalDemoId" />

            <div class="space-y-3.5 bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs">
              <div>
                <div class="flex justify-between font-bold text-on-surface mb-1">
                  <span>Eficiencia Operativa (40%)</span>
                  <span class="text-amber-700"><span id="valQuickImpact">40</span> / 40</span>
                </div>
                <input type="range" id="scoreQuickImpact" min="0" max="40" step="1" value="40" class="w-full accent-amber-600 cursor-pointer"/>
              </div>

              <div>
                <div class="flex justify-between font-bold text-on-surface mb-1">
                  <span>Viabilidad y Escalabilidad (30%)</span>
                  <span class="text-amber-700"><span id="valQuickViab">30</span> / 30</span>
                </div>
                <input type="range" id="scoreQuickViab" min="0" max="30" step="1" value="30" class="w-full accent-amber-600 cursor-pointer"/>
              </div>

              <div>
                <div class="flex justify-between font-bold text-on-surface mb-1">
                  <span>Innovación y Aplicación de IA (20%)</span>
                  <span class="text-amber-700"><span id="valQuickInnov">20</span> / 20</span>
                </div>
                <input type="range" id="scoreQuickInnov" min="0" max="20" step="1" value="20" class="w-full accent-amber-600 cursor-pointer"/>
              </div>

              <div>
                <div class="flex justify-between font-bold text-on-surface mb-1">
                  <span>Claridad del Pitch (10%)</span>
                  <span class="text-amber-700"><span id="valQuickPitch">10</span> / 10</span>
                </div>
                <input type="range" id="scoreQuickPitch" min="0" max="10" step="1" value="10" class="w-full accent-amber-600 cursor-pointer"/>
              </div>
            </div>

            <div class="bg-amber-100 p-3.5 rounded-xl flex items-center justify-between border border-amber-300">
              <span class="font-bold text-amber-900 text-xs uppercase tracking-wider">Puntuación Total Calculada:</span>
              <span class="text-2xl font-black text-amber-700"><span id="valQuickTotal">100</span> / 100</span>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Observaciones / Feedback del Jurado:</label>
              <textarea 
                id="quickEvalFeedback" 
                rows="3" 
                placeholder="Fortalezas principales, áreas de oportunidad o comentarios para el equipo..."
                class="w-full p-3 bg-surface-container-low rounded-xl border border-surface-container text-xs focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
                required
              ></textarea>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-surface-container-high">
              <button type="button" id="deleteModalQuickEvalBtn" class="hidden px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">delete</span> Borrar Mi Calificación
              </button>
              <div class="flex items-center gap-2 ml-auto">
                <button type="button" id="cancelQuickEvalModalBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">verified</span> Emitir y Confirmar Calificación
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

function renderQuickEvalRows(demosList, user) {
  let filtered = [...demosList];

  if (activeCompanyFilter !== 'all') {
    filtered = filtered.filter(d => d.category === activeCompanyFilter);
  }

  if (activeStatusFilter === 'pending') {
    filtered = filtered.filter(d => !(d.evaluations || []).some(e => e.judgeId === user.id));
  } else if (activeStatusFilter === 'done') {
    filtered = filtered.filter(d => (d.evaluations || []).some(e => e.judgeId === user.id));
  }

  if (filtered.length === 0) {
    return `<tr><td colspan="6" class="text-center py-10 text-secondary italic">No hay proyectos que coincidan con los filtros seleccionados.</td></tr>`;
  }

  return filtered.map(demo => {
    const myEval = (demo.evaluations || []).find(e => e.judgeId === user.id);
    const hasMyEval = Boolean(myEval);

    return `
      <tr class="hover:bg-amber-50/30 transition-colors group">
        <!-- Project & Author -->
        <td class="p-3.5 space-y-1 align-top">
          <div class="flex items-center gap-2.5">
            <img src="${demo.thumbnail}" alt="${demo.title}" class="w-10 h-10 rounded-lg object-cover ring-1 ring-surface-container-high"/>
            <div>
              <a href="#demo/${demo.id}" class="font-bold text-on-surface hover:text-amber-700 transition-colors block text-xs line-clamp-1">
                ${demo.title}
              </a>
              <span class="text-[11px] text-secondary block font-medium">${demo.author}</span>
            </div>
          </div>
          <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold ${demo.unitClass}">
            ${demo.category} • ${demo.unit}
          </span>
        </td>

        <!-- Description & Impact Metrics -->
        <td class="p-3.5 align-top space-y-1.5">
          <p class="text-xs text-on-surface line-clamp-2 leading-relaxed">${demo.description}</p>
          <div class="bg-emerald-50/70 p-2 rounded-lg border border-emerald-200 text-[11px] text-emerald-950">
            <span class="font-bold text-emerald-800 block text-[10px] uppercase">Impacto & Beneficios:</span>
            <span class="line-clamp-2">${demo.impactMetrics || 'Métricas operativas destacadas'}</span>
          </div>
        </td>

        <!-- Problem Statement -->
        <td class="p-3.5 align-top">
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-secondary">
            <span class="font-bold text-slate-800 block text-[10px] uppercase mb-0.5">Problema Operativo:</span>
            <p class="line-clamp-3 leading-snug">${demo.problemStatement || 'Sin especificar'}</p>
          </div>
        </td>

        <!-- Video Embed Preview Button -->
        <td class="p-3.5 text-center align-middle">
          <div class="inline-flex flex-col items-center gap-1">
            <a href="#demo/${demo.id}" class="inline-flex items-center gap-1 px-3 py-1.5 ${demo.summaryVideoUrl ? 'bg-amber-500 hover:bg-amber-600 text-white font-black' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold'} rounded-lg text-xs transition-all shadow-sm">
              <span class="material-symbols-outlined text-sm">${demo.summaryVideoUrl ? 'bolt' : 'smart_display'}</span>
              <span>${demo.summaryVideoUrl ? '⚡ Ver Resumen' : 'Ver Demo'}</span>
            </a>
            ${demo.infographicUrl ? `
              <span class="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <span class="material-symbols-outlined text-[12px]">dashboard</span> Infografía
              </span>
            ` : ''}
          </div>
        </td>

        <!-- Evaluation Status Badge -->
        <td class="p-3.5 text-center align-middle">
          ${hasMyEval ? `
            <div class="space-y-1">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[11px]">
                <span class="material-symbols-outlined text-xs">verified</span> ★ ${myEval.average.toFixed(0)} / 100
              </span>
              <span class="block text-[10px] text-secondary">${myEval.isConfirmed ? '✓ Confirmada' : 'Emitida'}</span>
            </div>
          ` : `
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px] animate-pulse">
              <span class="material-symbols-outlined text-xs">bolt</span> ⚡ Pendiente
            </span>
          `}
        </td>

        <!-- Action / Quick Grade Button -->
        <td class="p-3.5 text-center align-middle">
          <div class="inline-flex items-center gap-1.5">
            <button 
              data-quick-eval-id="${demo.id}" 
              class="open-quick-eval-btn px-3 py-2 ${hasMyEval ? 'bg-surface-container hover:bg-amber-100 text-amber-900' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'} font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-sm">${hasMyEval ? 'edit' : 'gavel'}</span>
              ${hasMyEval ? 'Editar' : '⚡ Calificar Rápido'}
            </button>
            ${hasMyEval ? `
              <button 
                data-delete-quick-eval-id="${demo.id}" 
                data-demo-title="${demo.title}"
                title="Borrar mi calificación de este proyecto"
                class="delete-quick-eval-btn p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 rounded-xl transition-all inline-flex items-center justify-center cursor-pointer shadow-sm"
              >
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function attachQuickEvalEventListeners() {
  const user = state.currentUser;
  const presentedDemos = (state.demos || []).filter(d => Boolean(d.readyForEvaluation));

  // Status Filter Buttons
  document.querySelectorAll('.status-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeStatusFilter = e.currentTarget.dataset.status;
      document.querySelectorAll('.status-filter-btn').forEach(b => {
        b.classList.remove('bg-amber-600', 'text-white', 'shadow');
        b.classList.add('bg-surface-container', 'text-secondary');
      });
      e.currentTarget.classList.remove('bg-surface-container', 'text-secondary');
      e.currentTarget.classList.add('bg-amber-600', 'text-white', 'shadow');

      const tbody = document.getElementById('quickEvalTableBody');
      if (tbody) tbody.innerHTML = renderQuickEvalRows(presentedDemos, user);
      attachRowButtons();
    });
  });

  // Company Filter
  const companySelect = document.getElementById('quickCompanyFilter');
  if (companySelect) {
    companySelect.addEventListener('change', (e) => {
      activeCompanyFilter = e.target.value;
      const tbody = document.getElementById('quickEvalTableBody');
      if (tbody) tbody.innerHTML = renderQuickEvalRows(presentedDemos, user);
      attachRowButtons();
    });
  }

  attachRowButtons();
  setupModalSliders();
}

function attachRowButtons() {
  const modal = document.getElementById('quickEvalModal');
  const demoIdInput = document.getElementById('quickEvalDemoId');
  const titleElem = document.getElementById('quickEvalModalTitle');
  const subTitleElem = document.getElementById('quickEvalModalSubtitle');
  const feedbackInput = document.getElementById('quickEvalFeedback');
  const deleteModalBtn = document.getElementById('deleteModalQuickEvalBtn');

  document.querySelectorAll('.open-quick-eval-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.dataset.quickEvalId;
      const demo = getDemoById(demoId);
      if (!demo || !modal) return;

      if (demoIdInput) demoIdInput.value = demo.id;
      if (titleElem) titleElem.innerText = `Calificar: ${demo.title}`;
      if (subTitleElem) subTitleElem.innerText = `Autor: ${demo.author} • ${demo.category}`;

      // Populate existing evaluation scores if present
      const user = state.currentUser;
      const existing = (demo.evaluations || []).find(ev => ev.judgeId === user.id);

      if (deleteModalBtn) {
        if (existing) {
          deleteModalBtn.classList.remove('hidden');
        } else {
          deleteModalBtn.classList.add('hidden');
        }
      }

      const impact = existing ? (existing.scores?.impact || 40) : 40;
      const viab = existing ? (existing.scores?.viability || 30) : 30;
      const innov = existing ? (existing.scores?.innovation || 20) : 20;
      const pitch = existing ? (existing.scores?.pitch || 10) : 10;
      const fb = existing ? (existing.feedback || '') : '';

      document.getElementById('scoreQuickImpact').value = impact;
      document.getElementById('valQuickImpact').innerText = impact;

      document.getElementById('scoreQuickViab').value = viab;
      document.getElementById('valQuickViab').innerText = viab;

      document.getElementById('scoreQuickInnov').value = innov;
      document.getElementById('valQuickInnov').innerText = innov;

      document.getElementById('scoreQuickPitch').value = pitch;
      document.getElementById('valQuickPitch').innerText = pitch;

      if (feedbackInput) feedbackInput.value = fb;
      updateQuickTotal();

      modal.classList.remove('hidden');
    });
  });

  // Direct row delete button
  document.querySelectorAll('.delete-quick-eval-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const demoId = e.currentTarget.dataset.deleteQuickEvalId;
      const demoTitle = e.currentTarget.dataset.demoTitle || 'este proyecto';
      if (confirm(`¿Estás seguro de que deseas BORRAR tu calificación para "${demoTitle}"?\n\nEl proyecto volverá a quedar como Pendiente sin afectar ninguna otra calificación.`)) {
        if (deleteJudgeEvaluation(demoId)) {
          alert('Tu calificación ha sido eliminada exitosamente.');
          const app = document.getElementById('app');
          if (app) app.innerHTML = renderQuickEvalView();
        }
      }
    });
  });

  // Modal delete button
  if (deleteModalBtn) {
    deleteModalBtn.addEventListener('click', () => {
      const demoId = demoIdInput?.value;
      if (!demoId) return;
      const demo = getDemoById(demoId);
      const title = demo ? demo.title : 'este proyecto';
      if (confirm(`¿Estás seguro de que deseas BORRAR tu calificación para "${title}"?\n\nEl proyecto volverá a quedar como Pendiente.`)) {
        if (deleteJudgeEvaluation(demoId)) {
          alert('Tu calificación ha sido eliminada exitosamente.');
          modal.classList.add('hidden');
          const app = document.getElementById('app');
          if (app) app.innerHTML = renderQuickEvalView();
        }
      }
    });
  }

  const closeBtn = document.getElementById('closeQuickEvalModalBtn');
  const cancelBtn = document.getElementById('cancelQuickEvalModalBtn');

  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  if (cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));
}

function setupModalSliders() {
  const sliders = ['Impact', 'Viab', 'Innov', 'Pitch'];
  sliders.forEach(s => {
    const input = document.getElementById(`scoreQuick${s}`);
    const val = document.getElementById(`valQuick${s}`);
    if (input && val) {
      input.addEventListener('input', () => {
        val.innerText = input.value;
        updateQuickTotal();
      });
    }
  });

  const form = document.getElementById('quickEvalModalForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const demoId = document.getElementById('quickEvalDemoId').value;
      const scores = {
        impact: parseInt(document.getElementById('scoreQuickImpact').value),
        viability: parseInt(document.getElementById('scoreQuickViab').value),
        innovation: parseInt(document.getElementById('scoreQuickInnov').value),
        pitch: parseInt(document.getElementById('scoreQuickPitch').value)
      };
      const feedback = document.getElementById('quickEvalFeedback').value;

      if (submitJudgeEvaluation(demoId, scores, feedback, true)) {
        alert('Evaluación emitida y confirmada exitosamente.');
        const modal = document.getElementById('quickEvalModal');
        if (modal) modal.classList.add('hidden');
        
        // Refresh Quick Eval view
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderQuickEvalView();
      }
    });
  }
}

function updateQuickTotal() {
  const i = parseInt(document.getElementById('scoreQuickImpact')?.value || 0);
  const v = parseInt(document.getElementById('scoreQuickViab')?.value || 0);
  const n = parseInt(document.getElementById('scoreQuickInnov')?.value || 0);
  const p = parseInt(document.getElementById('scoreQuickPitch')?.value || 0);
  const tot = i + v + n + p;
  const totElem = document.getElementById('valQuickTotal');
  if (totElem) totElem.innerText = tot;
}
