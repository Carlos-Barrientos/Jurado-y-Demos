// View: Ranking Dashboard (Accessible by Admin and Dario / Director General)

import { state, canViewRanking, isDario, isAdmin, getDemoById, companies } from '../data/store.js';

export function renderRankingView() {
  if (!canViewRanking()) {
    return `
      <div class="max-w-[1440px] mx-auto px-4 py-16 text-center space-y-4">
        <span class="material-symbols-outlined text-4xl text-error">lock</span>
        <h2 class="text-xl font-bold text-on-surface">Acceso Denegado</h2>
        <p class="text-sm text-secondary">El Dashboard de Ranking y Calificaciones está reservado exclusivamente para el Administrador y la Dirección General (Dario).</p>
        <a href="#home" class="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-lg inline-flex items-center gap-2 hover:bg-primary-container transition-all">
          <span class="material-symbols-outlined">home</span> Ir a la Galería
        </a>
      </div>
    `;
  }
  setTimeout(attachRankingEventListeners, 50);
  return getRankingHtml();
}

function getRankingHtml() {
  const currentUser = state.currentUser;
  const isDarioUser = isDario();

  // Filter evaluated or presented demos
  const demos = state.demos || [];
  
  // Sort demos by average evaluation rating descending
  const sortedDemos = [...demos].sort((a, b) => {
    const evalsA = a.evaluations || [];
    const evalsB = b.evaluations || [];
    const avgA = evalsA.length > 0 ? (evalsA.reduce((sum, e) => sum + e.average, 0) / evalsA.length) : (a.rating || 0);
    const avgB = evalsB.length > 0 ? (evalsB.reduce((sum, e) => sum + e.average, 0) / evalsB.length) : (b.rating || 0);
    return avgB - avgA;
  });

  const presentedDemos = demos.filter(d => d.readyForEvaluation);
  const totalEvalsCount = demos.reduce((sum, d) => sum + (d.evaluations || []).length, 0);

  const top1 = sortedDemos[0];
  const top2 = sortedDemos[1];
  const top3 = sortedDemos[2];

  // Calculate overall global average score
  let globalAvg = 0;
  const demosWithEvals = demos.filter(d => (d.evaluations || []).length > 0);
  if (demosWithEvals.length > 0) {
    const sumAvg = demosWithEvals.reduce((s, d) => {
      const a = d.evaluations.reduce((acc, e) => acc + e.average, 0) / d.evaluations.length;
      return s + a;
    }, 0);
    globalAvg = (sumAvg / demosWithEvals.length).toFixed(1);
  }

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-950 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-2 z-10">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-4xl text-amber-400">leaderboard</span>
            <div>
              <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">Dashboard de Ranking y Evaluaciones del Jurado</h1>
              <p class="text-xs md:text-sm text-amber-200">Monitoreo oficial de puntuaciones, dictámenes de presentación y desglose por jurado.</p>
            </div>
          </div>
        </div>

        <div class="z-10 flex items-center gap-3">
          <span class="px-3.5 py-1.5 bg-amber-400/20 border border-amber-300/30 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-1.5 backdrop-blur-md">
            <span class="material-symbols-outlined text-sm">verified_user</span>
            ${isDarioUser ? 'Dirección General (Dario)' : 'Super Administrador'}
          </span>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-surface-container-high shadow-sm space-y-1">
          <span class="text-xs font-semibold text-secondary uppercase tracking-wider block">Proyectos Dictaminados</span>
          <div class="text-3xl font-extrabold text-amber-600 flex items-center gap-2">
            ${presentedDemos.length} <span class="text-xs font-normal text-secondary">/ ${demos.length}</span>
          </div>
          <p class="text-[11px] text-secondary">Habilitados para calificación</p>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-surface-container-high shadow-sm space-y-1">
          <span class="text-xs font-semibold text-secondary uppercase tracking-wider block">Evaluaciones Emitidas</span>
          <div class="text-3xl font-extrabold text-primary">${totalEvalsCount}</div>
          <p class="text-[11px] text-secondary">Emitidas por el cuerpo de Jurados</p>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-surface-container-high shadow-sm space-y-1">
          <span class="text-xs font-semibold text-secondary uppercase tracking-wider block">Promedio Global</span>
          <div class="text-3xl font-extrabold text-emerald-600">${globalAvg} <span class="text-xs font-normal text-secondary">/ 100</span></div>
          <p class="text-[11px] text-secondary">Calificación promedio del concurso</p>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-surface-container-high shadow-sm space-y-1">
          <span class="text-xs font-semibold text-secondary uppercase tracking-wider block">Líder Actual</span>
          <div class="text-lg font-bold text-on-surface truncate">${top1 ? top1.title : 'Sin evaluaciones'}</div>
          <p class="text-[11px] text-amber-600 font-bold">${top1 && top1.evaluations && top1.evaluations.length > 0 ? `★ ${(top1.evaluations.reduce((s,e)=>s+e.average,0)/top1.evaluations.length).toFixed(1)} / 100` : 'Pendiente'}</p>
        </div>
      </div>

      <!-- Podium Top 3 Section -->
      ${sortedDemos.length >= 3 ? `
        <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-6">
          <div class="flex items-center gap-2 border-b border-surface-container-high pb-3">
            <span class="material-symbols-outlined text-amber-500 text-2xl">workspace_premium</span>
            <h2 class="font-bold text-lg text-on-surface">Podio de Proyectos Destacados</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            
            <!-- 2nd Place -->
            ${top2 ? `
              <div class="bg-gradient-to-t from-slate-100 to-white p-5 rounded-2xl border-2 border-slate-300 shadow-md text-center space-y-3 relative">
                <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-300 text-slate-900 text-xs font-extrabold uppercase shadow">🥈 2° Lugar</span>
                <img src="${top2.thumbnail}" alt="${top2.title}" class="w-full h-32 object-cover rounded-xl mt-2"/>
                <div>
                  <h3 class="font-bold text-base text-on-surface truncate">${top2.title}</h3>
                  <p class="text-xs text-secondary">${top2.author} • <span class="font-semibold text-primary">${top2.category}</span></p>
                </div>
                <div class="py-2 bg-slate-200/60 rounded-lg border border-slate-300">
                  <span class="text-xl font-extrabold text-slate-800">
                    ★ ${top2.evaluations && top2.evaluations.length > 0 ? (top2.evaluations.reduce((s,e)=>s+e.average,0)/top2.evaluations.length).toFixed(1) : '0'} <span class="text-xs font-normal">/ 100</span>
                  </span>
                  <span class="block text-[10px] text-secondary">(${top2.evaluations ? top2.evaluations.length : 0} evaluaciones)</span>
                </div>
              </div>
            ` : ''}

            <!-- 1st Place -->
            ${top1 ? `
              <div class="bg-gradient-to-t from-amber-100/80 to-amber-50 p-6 rounded-2xl border-2 border-amber-400 shadow-xl text-center space-y-4 relative md:-translate-y-2">
                <span class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase shadow-lg flex items-center gap-1">🥇 1° Lugar Oficial</span>
                <img src="${top1.thumbnail}" alt="${top1.title}" class="w-full h-36 object-cover rounded-xl mt-2 ring-2 ring-amber-400"/>
                <div>
                  <h3 class="font-black text-lg text-on-surface truncate">${top1.title}</h3>
                  <p class="text-xs text-secondary font-medium">${top1.author} • <span class="font-bold text-amber-700">${top1.category}</span></p>
                </div>
                <div class="py-2.5 bg-amber-200/60 rounded-xl border border-amber-300">
                  <span class="text-2xl font-black text-amber-900">
                    ★ ${top1.evaluations && top1.evaluations.length > 0 ? (top1.evaluations.reduce((s,e)=>s+e.average,0)/top1.evaluations.length).toFixed(1) : '0'} <span class="text-xs font-normal">/ 100</span>
                  </span>
                  <span class="block text-[11px] text-amber-800 font-semibold">(${top1.evaluations ? top1.evaluations.length : 0} evaluaciones de jurado)</span>
                </div>
              </div>
            ` : ''}

            <!-- 3rd Place -->
            ${top3 ? `
              <div class="bg-gradient-to-t from-amber-800/10 to-white p-5 rounded-2xl border-2 border-amber-700/30 shadow-md text-center space-y-3 relative">
                <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-800/20 text-amber-900 border border-amber-700/30 text-xs font-extrabold uppercase shadow">🥉 3° Lugar</span>
                <img src="${top3.thumbnail}" alt="${top3.title}" class="w-full h-32 object-cover rounded-xl mt-2"/>
                <div>
                  <h3 class="font-bold text-base text-on-surface truncate">${top3.title}</h3>
                  <p class="text-xs text-secondary">${top3.author} • <span class="font-semibold text-primary">${top3.category}</span></p>
                </div>
                <div class="py-2 bg-amber-100/50 rounded-lg border border-amber-200">
                  <span class="text-xl font-extrabold text-amber-900">
                    ★ ${top3.evaluations && top3.evaluations.length > 0 ? (top3.evaluations.reduce((s,e)=>s+e.average,0)/top3.evaluations.length).toFixed(1) : '0'} <span class="text-xs font-normal">/ 100</span>
                  </span>
                  <span class="block text-[10px] text-secondary">(${top3.evaluations ? top3.evaluations.length : 0} evaluaciones)</span>
                </div>
              </div>
            ` : ''}

          </div>
        </div>
      ` : ''}

      <!-- Main Ranking Table -->
      <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high pb-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">format_list_numbered</span>
            <h2 class="font-bold text-lg text-on-surface">Tabla General de Calificaciones y Dictámenes</h2>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-xs font-semibold text-secondary">Filtrar por Empresa:</label>
            <select id="companyRankingFilter" class="p-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-semibold focus:outline-none focus:border-primary">
              <option value="all">Todas las Empresas (${demos.length})</option>
              ${companies.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-surface-bright border-b border-surface-container-high text-secondary uppercase font-bold text-[11px] tracking-wider">
                <th class="p-3">Posición</th>
                <th class="p-3">Proyecto / Equipo</th>
                <th class="p-3">Empresa</th>
                <th class="p-3">Dictamen Admin</th>
                <th class="p-3">Evaluaciones</th>
                <th class="p-3 text-center">Eficiencia (40%)</th>
                <th class="p-3 text-center">Viabilidad (30%)</th>
                <th class="p-3 text-center">Innovación (20%)</th>
                <th class="p-3 text-center">Pitch (10%)</th>
                <th class="p-3 text-right">Promedio Final</th>
                <th class="p-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody id="rankingTableBody" class="divide-y divide-surface-container">
              ${renderRankingRows(sortedDemos)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL: Detailed Judge Feedback & Scores breakdown -->
      <div id="breakdownModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-600">gavel</span>
              <h3 id="breakdownModalTitle" class="font-bold text-lg text-on-surface">Desglose de Calificaciones del Jurado</h3>
            </div>
            <button id="closeBreakdownModalBtn" class="text-secondary hover:text-primary">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div id="breakdownModalContent" class="space-y-4 text-xs">
            <!-- Dynamic Content populated by JS -->
          </div>

          <div class="flex justify-end pt-3 border-t border-surface-container-high">
            <button id="closeBreakdownModalBtn2" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cerrar</button>
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderRankingRows(demosList) {
  if (!demosList || demosList.length === 0) {
    return `<tr><td colspan="11" class="text-center py-8 text-secondary">No hay proyectos registrados para mostrar.</td></tr>`;
  }

  return demosList.map((demo, index) => {
    const evals = demo.evaluations || [];
    const hasEvals = evals.length > 0;
    
    const avgScore = hasEvals ? (evals.reduce((sum, e) => sum + e.average, 0) / evals.length).toFixed(1) : '0.0';
    
    // Average breakdown scores
    const avgImpact = hasEvals ? (evals.reduce((sum, e) => sum + (e.scores?.impact || 0), 0) / evals.length).toFixed(1) : '-';
    const avgViab = hasEvals ? (evals.reduce((sum, e) => sum + (e.scores?.viability || 0), 0) / evals.length).toFixed(1) : '-';
    const avgInnov = hasEvals ? (evals.reduce((sum, e) => sum + (e.scores?.innovation || 0), 0) / evals.length).toFixed(1) : '-';
    const avgPitch = hasEvals ? (evals.reduce((sum, e) => sum + (e.scores?.pitch || 0), 0) / evals.length).toFixed(1) : '-';

    const rankPos = index + 1;
    const badgeBg = rankPos === 1 ? 'bg-amber-400 text-amber-950 font-black' :
                    rankPos === 2 ? 'bg-slate-300 text-slate-900 font-bold' :
                    rankPos === 3 ? 'bg-amber-800/20 text-amber-900 font-bold' :
                    'bg-surface-container text-secondary font-semibold';

    return `
      <tr class="hover:bg-surface-bright transition-colors group">
        <td class="p-3 font-extrabold text-center">
          <span class="inline-flex items-center justify-center w-7 h-7 rounded-full ${badgeBg} text-xs shadow-sm">
            #${rankPos}
          </span>
        </td>
        <td class="p-3">
          <a href="#demo/${demo.id}" class="font-bold text-on-surface hover:text-primary transition-colors block text-xs">
            ${demo.title}
          </a>
          <span class="text-[11px] text-secondary block">${demo.author}</span>
        </td>
        <td class="p-3 font-semibold text-secondary text-xs">
          ${demo.category || 'Grupo Prosur'}
        </td>
        <td class="p-3">
          ${demo.readyForEvaluation ? `
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Presentado
            </span>
          ` : `
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pendiente
            </span>
          `}
        </td>
        <td class="p-3 font-bold text-center">
          ${hasEvals ? `
            <span class="px-2 py-0.5 bg-primary/10 text-primary rounded font-bold text-xs">
              ${evals.length} ${evals.length === 1 ? 'Jurado' : 'Jurados'}
            </span>
          ` : `
            <span class="text-secondary text-[11px]">0</span>
          `}
        </td>
        <td class="p-3 text-center text-xs font-semibold text-on-surface">${avgImpact}</td>
        <td class="p-3 text-center text-xs font-semibold text-on-surface">${avgViab}</td>
        <td class="p-3 text-center text-xs font-semibold text-on-surface">${avgInnov}</td>
        <td class="p-3 text-center text-xs font-semibold text-on-surface">${avgPitch}</td>
        <td class="p-3 text-right">
          <span class="text-sm font-black ${hasEvals ? 'text-amber-600' : 'text-secondary'}">
            ★ ${avgScore} <span class="text-[10px] font-normal text-secondary">/100</span>
          </span>
        </td>
        <td class="p-3 text-center">
          ${hasEvals ? `
            <button data-breakdown-demo-id="${demo.id}" class="view-breakdown-btn px-2.5 py-1 bg-surface-container hover:bg-amber-100 hover:text-amber-800 text-secondary font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">visibility</span> Ver Jurados
            </button>
          ` : `
            <span class="text-[11px] text-secondary italic">Sin evaluaciones</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function attachRankingEventListeners() {
  // Company Filter
  const filterSelect = document.getElementById('companyRankingFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      const comp = e.target.value;
      const allDemos = state.demos || [];
      const filtered = comp === 'all' ? allDemos : allDemos.filter(d => d.category === comp);
      
      const sorted = [...filtered].sort((a, b) => {
        const evalsA = a.evaluations || [];
        const evalsB = b.evaluations || [];
        const avgA = evalsA.length > 0 ? (evalsA.reduce((sum, e) => sum + e.average, 0) / evalsA.length) : (a.rating || 0);
        const avgB = evalsB.length > 0 ? (evalsB.reduce((sum, e) => sum + e.average, 0) / evalsB.length) : (b.rating || 0);
        return avgB - avgA;
      });

      const body = document.getElementById('rankingTableBody');
      if (body) body.innerHTML = renderRankingRows(sorted);
      attachBreakdownButtons();
    });
  }

  attachBreakdownButtons();

  // Modal close handlers
  const modal = document.getElementById('breakdownModal');
  const closeBtn1 = document.getElementById('closeBreakdownModalBtn');
  const closeBtn2 = document.getElementById('closeBreakdownModalBtn2');

  if (modal) {
    if (closeBtn1) closeBtn1.addEventListener('click', () => modal.classList.add('hidden'));
    if (closeBtn2) closeBtn2.addEventListener('click', () => modal.classList.add('hidden'));
  }
}

function attachBreakdownButtons() {
  const modal = document.getElementById('breakdownModal');
  const modalTitle = document.getElementById('breakdownModalTitle');
  const modalContent = document.getElementById('breakdownModalContent');

  document.querySelectorAll('.view-breakdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.dataset.breakdownDemoId;
      const demo = getDemoById(demoId);
      if (!demo || !modal) return;

      const evals = demo.evaluations || [];
      if (modalTitle) modalTitle.innerText = `Evaluaciones: ${demo.title}`;

      if (modalContent) {
        if (evals.length === 0) {
          modalContent.innerHTML = `<p class="text-center py-6 text-secondary">Aún no hay evaluaciones registradas para este proyecto.</p>`;
        } else {
          modalContent.innerHTML = `
            <div class="space-y-4">
              ${evals.map(ev => `
                <div class="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3">
                  <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                    <div class="flex items-center gap-2">
                      <img src="${ev.judgeAvatar}" alt="${ev.judgeName}" class="w-7 h-7 rounded-full object-cover ring-2 ring-amber-400/30"/>
                      <div>
                        <h4 class="font-bold text-xs text-on-surface">${ev.judgeName}</h4>
                        <span class="text-[10px] text-secondary">${ev.judgeRole || 'Jurado Oficial'}</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      ${ev.judgeId === state.currentUser.id ? `
                        <a href="#demo/${demo.id}" class="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[10px] flex items-center gap-1 transition-all shadow-sm">
                          <span class="material-symbols-outlined text-xs">edit</span> Corregir Mi Calificación
                        </a>
                      ` : ''}
                      ${ev.isConfirmed ? `
                        <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1">
                          <span class="material-symbols-outlined text-xs">verified</span> Confirmada
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">
                          Emitida
                        </span>
                      `}
                      <span class="px-2.5 py-1 bg-amber-600 text-white font-extrabold rounded-lg text-xs">
                        ★ ${ev.average.toFixed(0)} / 100
                      </span>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-white p-2.5 rounded-lg border border-amber-200 text-center font-medium">
                    <div><span class="block text-secondary text-[10px]">Eficiencia (40%)</span><b class="text-amber-700">${ev.scores?.impact || 0}</b></div>
                    <div><span class="block text-secondary text-[10px]">Viabilidad (30%)</span><b class="text-amber-700">${ev.scores?.viability || 0}</b></div>
                    <div><span class="block text-secondary text-[10px]">Innovación (20%)</span><b class="text-amber-700">${ev.scores?.innovation || 0}</b></div>
                    <div><span class="block text-secondary text-[10px]">Pitch (10%)</span><b class="text-amber-700">${ev.scores?.pitch || 0}</b></div>
                  </div>

                  <div>
                    <span class="text-[10px] font-bold text-secondary uppercase block mb-0.5">Observación / Feedback:</span>
                    <p class="text-xs text-on-surface italic bg-white p-3 rounded-lg border border-amber-200 leading-relaxed">"${ev.feedback || 'Sin observaciones'}"</p>
                  </div>
                  <span class="text-[10px] text-secondary block text-right">${ev.date}</span>
                </div>
              `).join('')}
            </div>
          `;
        }
      }

      modal.classList.remove('hidden');
    });
  });
}
