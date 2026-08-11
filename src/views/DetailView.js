// View 2: Detalle de Demo (with Participant Editing, Image Gallery & Judge Evaluation Panel)

import { 
  state, 
  getDemoById, 
  isOwner, 
  isJudge, 
  isAdmin,
  updateDemo, 
  addDemoImage, 
  removeDemoImage,
  submitJudgeEvaluation, 
  confirmJudgeEvaluation,
  addCommentToDemo, 
  editCommentInDemo,
  deleteCommentFromDemo,
  isFavorite, 
  toggleFavorite,
  formatYoutubeEmbedUrl,
  companies
} from '../data/store.js';

export function renderDetailView(demoId) {
  const demo = getDemoById(demoId) || getDemoById(1);
  const current = state.currentUser;
  
  if (current && current.roleType === 'judge' && !isAdmin() && !demo.readyForEvaluation) {
    return `
      <div class="max-w-[1440px] mx-auto px-4 py-16 text-center space-y-4">
        <span class="material-symbols-outlined text-5xl text-amber-600">lock_clock</span>
        <h2 class="text-2xl font-bold text-on-surface">Proyecto Pendiente de Presentación</h2>
        <p class="text-sm text-secondary max-w-md mx-auto leading-relaxed">
          Este proyecto aún no ha sido dictaminado como <b>Presentado</b> por el Administrador. 
          Como integrante del Jurado, únicamente puedes acceder y visualizar proyectos autorizados para evaluación.
        </p>
        <div class="pt-2">
          <a href="#home" class="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-lg inline-flex items-center gap-2 hover:bg-primary-container transition-all shadow-md">
            <span class="material-symbols-outlined">arrow_back</span> Volver a la Galería
          </a>
        </div>
      </div>
    `;
  }

  setTimeout(() => attachDetailEventListeners(demo.id), 50);
  return getDetailHtml(demo);
}

function getDetailHtml(demo) {
  const isFav = isFavorite(demo.id);
  const userIsOwner = isOwner(demo) || isAdmin();
  const userIsJudge = isJudge();
  const activeUser = state.currentUser;
  const formattedEmbed = formatYoutubeEmbedUrl(demo.videoUrl);
  const iframeSrc = formattedEmbed ? (formattedEmbed.includes('?') ? `${formattedEmbed}&autoplay=0` : `${formattedEmbed}?autoplay=0`) : '';

  // Calculate judge evaluations average
  const evals = demo.evaluations || [];
  const hasEvals = evals.length > 0;

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Breadcrumbs & Role Indicator -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <nav class="flex items-center gap-2 text-xs md:text-sm text-secondary">
          <a href="#home" class="hover:text-primary transition-colors flex items-center gap-1">
            <span class="material-symbols-outlined text-base">home</span> Inicio
          </a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <a href="#home" class="hover:text-primary transition-colors">${demo.category}</a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-on-surface font-semibold truncate max-w-xs">${demo.title}</span>
        </nav>

        <!-- Role Action Notice -->
        ${userIsOwner ? `
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold">
            <span class="material-symbols-outlined text-sm">edit_note</span> Eres el autor de este proyecto (Modo Edición Habilitado)
          </div>
        ` : ''}

        ${userIsJudge ? `
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold">
            <span class="material-symbols-outlined text-sm">gavel</span> Modo Jurado: Habilitado para Calificar
          </div>
        ` : ''}
      </div>

      <!-- Main Video & Header Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Video & Primary Content (Left 2 Columns) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Embedded Player Container -->
          <div class="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
            <iframe 
              src="${iframeSrc}" 
              title="${demo.title}"
              class="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>

          <!-- Title & Actions Bar -->
          <div class="space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <span class="px-3 py-1 rounded-md text-xs font-bold ${demo.unitClass}">
                ${demo.unit}
              </span>
              
              <div class="flex flex-wrap items-center gap-2">
                <!-- Participant Edit Buttons -->
                ${userIsOwner ? `
                  <button id="openEditModalBtn" class="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-lg">edit</span> Editar Proyecto
                  </button>
                  <button id="openImageModalBtn" class="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 border border-surface-container-high">
                    <span class="material-symbols-outlined text-lg">add_photo_alternate</span> Cargar Imagen / Evidencia
                  </button>
                ` : ''}

                <!-- Standard Actions -->
                <button id="likeBtn" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary font-semibold text-sm text-secondary transition-all flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-lg text-primary fill">favorite</span>
                  <span id="likeCount">${demo.likes}</span>
                </button>
                <button id="favBtn" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary font-semibold text-sm text-secondary transition-all flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-lg ${isFav ? 'text-primary fill' : ''}">bookmark</span>
                </button>
              </div>
            </div>

            <h1 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">
              ${demo.title}
            </h1>
            <p class="text-base text-secondary font-medium leading-relaxed">
              ${demo.subtitle}
            </p>
          </div>

            <!-- Section 1: Overview & New Metrics -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-6">
              <div>
                <h3 class="text-lg font-bold text-on-surface mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-primary">description</span> Resumen del Proyecto (MVP)</h3>
                <p class="text-sm text-secondary leading-relaxed">${demo.description}</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container">
                <div>
                  <h4 class="text-sm font-bold text-on-surface mb-1 flex items-center gap-1"><span class="material-symbols-outlined text-sm text-error">warning</span> Problema Operativo a Resolver</h4>
                  <p class="text-xs text-secondary leading-relaxed bg-error-container/20 p-3 rounded-lg border border-error-container">${demo.problemStatement}</p>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-on-surface mb-1 flex items-center gap-1"><span class="material-symbols-outlined text-sm text-emerald-600">monitoring</span> Métricas de Impacto (Antes y Después)</h4>
                  <p class="text-xs text-secondary leading-relaxed bg-emerald-50 p-3 rounded-lg border border-emerald-200">${demo.impactMetrics}</p>
                </div>
              </div>
            </div>

            <!-- Attached Image Evidence Gallery (Viewable by Judges & Participants) -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">collections</span> Galería de Evidencias e Imágenes del Proyecto (${(demo.images || []).length})
                </h3>
                ${userIsOwner ? `
                  <button id="openImageModalBtn2" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">add</span> Añadir Imagen
                  </button>
                ` : ''}
              </div>

              ${(!demo.images || demo.images.length === 0) ? `
                <div class="p-8 text-center bg-surface-bright rounded-lg border border-dashed border-surface-container-high">
                  <span class="material-symbols-outlined text-3xl text-secondary mb-1">image_not_supported</span>
                  <p class="text-xs text-secondary">No hay imágenes adjuntas. El participante puede cargar imágenes abajo para que el jurado las examine.</p>
                </div>
              ` : `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  ${demo.images.map((img, idx) => `
                    <div class="group relative rounded-lg border border-surface-container-high overflow-hidden bg-surface-bright">
                      <img src="${img.url}" alt="${img.caption}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                      <div class="p-3 bg-white border-t border-surface-container-high">
                        <p class="text-xs text-secondary italic leading-snug">${img.caption || 'Sin pie de foto'}</p>
                      </div>
                      ${userIsOwner ? `
                        <button data-del-img="${idx}" class="del-img-btn absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors" title="Eliminar imagen">
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Technical Specifications Grid -->
            <div class="bg-surface-bright p-6 rounded-xl border border-surface-container-high space-y-4">
              <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">memory</span> Ficha Técnica del Modelo
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Modelo Base</span>
                  <span class="font-bold text-on-surface">${demo.specs.modelType}</span>
                </div>
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Latencia Inferencia</span>
                  <span class="font-bold text-on-surface">${demo.specs.latency}</span>
                </div>
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Fuente de Datos</span>
                  <span class="font-bold text-on-surface">${demo.specs.dataSources}</span>
                </div>
                <div class="p-3 bg-white rounded-lg border border-surface-container">
                  <span class="text-xs text-secondary uppercase font-semibold block mb-1">Estado de Despliegue</span>
                  <span class="font-bold text-emerald-600 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> ${demo.specs.status}
                  </span>
                </div>
              </div>
            </div>

            <!-- Section Comments -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-4">
              <h3 class="text-lg font-bold text-on-surface">Comentarios & Discusión (${demo.comments.length})</h3>
              
              <div class="flex gap-3">
                <img src="${activeUser.avatar}" alt="User" class="w-9 h-9 rounded-full object-cover"/>
                <div class="flex-grow space-y-3">
                  <textarea 
                    id="commentInput"
                    rows="2" 
                    placeholder="Escribe una observación o comentario..."
                    class="w-full p-3 bg-surface-container-low rounded-lg border border-surface-container text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
                  ></textarea>
                  <div class="flex justify-end">
                    <button id="postCommentBtn" class="px-4 py-1.5 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container transition-all">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>

              <div class="space-y-3 pt-2">
                ${(demo.comments || []).map(c => {
                  const canEdit = activeUser && (c.authorId === activeUser.id || c.author === activeUser.name || isAdmin());
                  return `
                    <div class="p-4 bg-surface-bright rounded-lg border border-surface-container-high space-y-2" data-comment-id="${c.id}">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-on-surface">${c.author} <span class="font-normal text-secondary">(${c.role})</span></span>
                        <div class="flex items-center gap-2">
                          <span class="text-[10px] text-secondary">${c.date}</span>
                          ${canEdit ? `
                            <button data-edit-comment-id="${c.id}" class="edit-comment-btn text-xs text-primary hover:underline flex items-center gap-0.5">
                              <span class="material-symbols-outlined text-xs">edit</span> Editar
                            </button>
                            <button data-del-comment-id="${c.id}" class="del-comment-btn text-xs text-error hover:underline flex items-center gap-0.5">
                              <span class="material-symbols-outlined text-xs">delete</span>
                            </button>
                          ` : ''}
                        </div>
                      </div>
                      <p class="comment-text-p text-xs text-on-surface">${c.text}</p>
                      
                      <!-- Hidden Inline Edit Form -->
                      <form class="edit-comment-form hidden space-y-2 text-xs pt-1" data-comment-id="${c.id}">
                        <textarea class="edit-comment-input w-full p-2 bg-white rounded border border-surface-container text-xs focus:outline-none focus:border-primary" rows="2" required>${c.text}</textarea>
                        <div class="flex justify-end gap-2">
                          <button type="button" class="cancel-edit-comment-btn px-2.5 py-1 bg-surface-container text-secondary font-semibold text-xs rounded hover:bg-surface-container-high">Cancelar</button>
                          <button type="submit" class="px-3 py-1 bg-primary text-white font-semibold text-xs rounded hover:bg-primary-container">Guardar</button>
                        </div>
                      </form>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

          </div>

        </div>

        <!-- Sidebar: Judge Evaluation Panel & Author Info (Right Column) -->
        <div class="space-y-6">

          <!-- JUDGE EVALUATION WIDGET (Exclusive for Jurado Role) -->
          ${userIsJudge ? `
            ${!demo.readyForEvaluation ? `
              <div class="bg-amber-50 p-5 rounded-2xl border-2 border-amber-300 shadow-sm space-y-2 text-amber-950">
                <div class="flex items-center gap-2 font-bold text-sm text-amber-900">
                  <span class="material-symbols-outlined text-amber-600">pending_actions</span>
                  <span>Pendiente de Dictamen del Administrador</span>
                </div>
                <p class="text-xs text-amber-900 leading-relaxed">
                  Este proyecto aún no ha sido dictaminado como <b>Presentado</b> por el administrador. 
                  Tan pronto como el participante exponga su proyecto y el administrador lo autorice, se habilitará el panel para que puedas calificar.
                </p>
              </div>
            ` : `
              <div class="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white p-6 rounded-2xl border-2 border-amber-400 shadow-md space-y-5">
                <div class="flex items-center justify-between border-b border-amber-200 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-amber-600 text-2xl">gavel</span>
                    <h3 class="font-bold text-base text-amber-950">Panel de Calificación del Jurado</h3>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">Jurado Oficial</span>
                </div>

                <form id="judgeEvalForm" class="space-y-4">
                  <div class="space-y-3 text-xs">
                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Eficiencia Operativa (40%)</span>
                        <span class="text-amber-700"><span id="valImpact">40</span> / 40</span>
                      </div>
                      <input type="range" id="scoreImpact" min="0" max="40" step="1" value="40" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>

                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Viabilidad y Escalabilidad (30%)</span>
                        <span class="text-amber-700"><span id="valViab">30</span> / 30</span>
                      </div>
                      <input type="range" id="scoreViab" min="0" max="30" step="1" value="30" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>

                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Innovación y Aplicación de IA (20%)</span>
                        <span class="text-amber-700"><span id="valInnov">20</span> / 20</span>
                      </div>
                      <input type="range" id="scoreInnov" min="0" max="20" step="1" value="20" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>

                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Claridad del Pitch (10%)</span>
                        <span class="text-amber-700"><span id="valPitch">10</span> / 10</span>
                      </div>
                      <input type="range" id="scorePitch" min="0" max="10" step="1" value="10" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>
                  </div>

                  <div class="bg-amber-100 p-3 rounded-lg flex items-center justify-between border border-amber-300">
                    <span class="font-bold text-amber-900 text-sm">Puntuación Final:</span>
                    <span class="text-xl font-black text-amber-600"><span id="valTotal">100</span>/100</span>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-on-surface mb-1">Observación Oficial del Jurado:</label>
                    <textarea 
                      id="judgeFeedbackInput" 
                      rows="3" 
                      placeholder="Escribe la evaluación final, fortalezas y recomendaciones..."
                      class="w-full p-2.5 bg-white rounded-lg border border-amber-300 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" class="w-full py-2.5 bg-amber-600 text-white font-bold text-xs rounded-lg hover:bg-amber-700 transition-all shadow-md flex items-center justify-center gap-1.5">
                    <span class="material-symbols-outlined text-base">verified</span> Emitir y Confirmar Calificación
                  </button>
                </form>
              </div>
            `}
          ` : ''}

          <!-- Display Submitted Official Judge Evaluations -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xs uppercase font-bold text-secondary tracking-wider">Calificaciones del Jurado (${evals.length})</h3>
              <span class="text-sm font-extrabold text-amber-500 flex items-center gap-1">
                <span class="material-symbols-outlined text-base fill">star</span> ${demo.rating} / 100
              </span>
            </div>

            ${evals.length === 0 ? `
              <p class="text-xs text-secondary text-center py-4">Este proyecto aún no ha sido evaluado formalmente por el Jurado.</p>
            ` : `
              <div class="space-y-4">
                ${evals.map(ev => `
                  <div class="p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-2 text-xs">
                    <div class="flex items-center justify-between border-b border-amber-100 pb-2">
                      <div class="flex items-center gap-2">
                        <img src="${ev.judgeAvatar}" alt="${ev.judgeName}" class="w-6 h-6 rounded-full object-cover"/>
                        <span class="font-bold text-on-surface">${ev.judgeName}</span>
                      </div>

                      <div class="flex items-center gap-2">
                        ${ev.isConfirmed ? `
                          <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">verified</span> Confirmada
                          </span>
                        ` : (userIsJudge && ev.judgeId === activeUser.id ? `
                          <button data-confirm-eval-demo-id="${demo.id}" class="confirm-eval-btn px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] flex items-center gap-1 transition-all">
                            <span class="material-symbols-outlined text-xs">check_circle</span> Confirmar Evaluación
                          </button>
                        ` : '')}
                        <span class="px-2 py-0.5 bg-amber-500 text-white font-bold rounded text-[11px]">
                          ★ ${ev.average.toFixed(0)} / 100
                        </span>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-1 text-[11px] text-secondary py-1">
                      <span>Eficiencia: <b>${ev.scores.impact}</b>/40</span>
                      <span>Viabilidad: <b>${ev.scores.viability}</b>/30</span>
                      <span>Innovación: <b>${ev.scores.innovation}</b>/20</span>
                      <span>Pitch: <b>${ev.scores.pitch}</b>/10</span>
                    </div>

                    <p class="text-on-surface italic leading-snug">"${ev.feedback}"</p>
                    <span class="text-[10px] text-secondary block text-right">${ev.date}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Author Profile Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4 shadow-sm">
            <h3 class="text-xs uppercase font-bold text-secondary tracking-wider">Participante / Creador</h3>
            <div class="flex items-center gap-4">
              <img src="${demo.authorAvatar}" alt="${demo.author}" class="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"/>
              <div>
                <h4 class="font-bold text-sm text-on-surface">${demo.author}</h4>
                <p class="text-xs text-secondary">${demo.authorRole}</p>
                <span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold ${demo.unitClass}">
                  ${demo.unit}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- MODAL 1: Edit Project Details (Participant Only) -->
      ${userIsOwner ? `
        <div id="editProjectModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 class="font-bold text-lg text-on-surface">Editar Proyecto (Participante)</h3>
              <button id="closeEditModalBtn" class="text-secondary hover:text-primary">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form id="editProjectForm" class="space-y-3 text-sm">
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Título del Proyecto</label>
                <input type="text" id="editTitle" value="${demo.title}" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Subtítulo</label>
                <input type="text" id="editSubtitle" value="${demo.subtitle}" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Empresa</label>
                <select id="editCategory" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                  ${companies.map(c => `<option value="${c}" ${demo.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Descripción del Proyecto (MVP)</label>
                <textarea id="editDescription" rows="2" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required>${demo.description}</textarea>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Problema Operativo a Resolver</label>
                <textarea id="editProblem" rows="2" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required>${demo.problemStatement}</textarea>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Métricas de Impacto (Antes y Después)</label>
                <textarea id="editMetrics" rows="2" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required>${demo.impactMetrics}</textarea>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Enlace de Video (YouTube Embed URL)</label>
                <input type="url" id="editVideo" value="${demo.videoUrl}" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none" required/>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button type="button" id="cancelEditBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      <!-- MODAL 2: Attach Evidence Image (Participant Only) -->
      ${userIsOwner ? `
        <div id="addImageModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 class="font-bold text-lg text-on-surface">Cargar Imagen de Evidencia</h3>
              <button id="closeImageModalBtn" class="text-secondary hover:text-primary">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form id="addImageForm" class="space-y-4 text-sm">
              
              <!-- Local File Picker Option -->
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Seleccionar archivo de imagen local</label>
                <input type="file" id="imageFileInput" accept="image/*" class="w-full p-2 border border-surface-container rounded-lg text-xs bg-surface-container-low"/>
              </div>

              <div class="text-center text-xs text-secondary font-bold">O introduce una URL de imagen</div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">URL de la Imagen</label>
                <input type="url" id="imageUrlInput" placeholder="https://..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Pie de foto / Descripción para el Jurado</label>
                <input type="text" id="imageCaptionInput" placeholder="ej. Diagrama de flujo de datos en tiempo real..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button type="button" id="cancelImageBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Subir Imagen</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

function attachDetailEventListeners(demoId) {
  // Range sliders live value update
  const calculateTotal = () => {
    const impact = parseInt(document.getElementById('scoreImpact')?.value || 0);
    const viab = parseInt(document.getElementById('scoreViab')?.value || 0);
    const innov = parseInt(document.getElementById('scoreInnov')?.value || 0);
    const pitch = parseInt(document.getElementById('scorePitch')?.value || 0);
    const totalEl = document.getElementById('valTotal');
    if (totalEl) totalEl.innerText = impact + viab + innov + pitch;
  };

  ['Impact', 'Viab', 'Innov', 'Pitch'].forEach(k => {
    const input = document.getElementById(`score${k}`);
    const val = document.getElementById(`val${k}`);
    if (input && val) {
      input.addEventListener('input', () => {
        val.innerText = input.value;
        calculateTotal();
      });
    }
  });

  // Judge Evaluation submission
  const judgeForm = document.getElementById('judgeEvalForm');
  if (judgeForm) {
    judgeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const scores = {
        impact: parseInt(document.getElementById('scoreImpact').value),
        viability: parseInt(document.getElementById('scoreViab').value),
        innovation: parseInt(document.getElementById('scoreInnov').value),
        pitch: parseInt(document.getElementById('scorePitch').value)
      };
      const feedback = document.getElementById('judgeFeedbackInput').value;

      if (submitJudgeEvaluation(demoId, scores, feedback, true)) {
        alert('Evaluación emitida y confirmada exitosamente.');
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  }

  // Judge Confirm Button
  document.querySelectorAll('.confirm-eval-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoIdToConfirm = e.currentTarget.dataset.confirmEvalDemoId;
      if (confirmJudgeEvaluation(demoIdToConfirm)) {
        alert('Evaluación confirmada oficialmente.');
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoIdToConfirm);
      }
    });
  });

  // Like & Fav buttons
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      const demo = getDemoById(demoId);
      if (demo) {
        demo.likes = (demo.likes || 0) + 1;
        demo.realLikes = demo.likes;
        updateDemo(demo.id, { likes: demo.likes, realLikes: demo.likes });
        const countSpan = document.getElementById('likeCount');
        if (countSpan) countSpan.innerText = demo.likes;
      }
    });
  }

  const favBtn = document.getElementById('favBtn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      toggleFavorite(demoId);
      const app = document.getElementById('app');
      if (app) app.innerHTML = renderDetailView(demoId);
    });
  }

  // Comment Posting
  const postCommentBtn = document.getElementById('postCommentBtn');
  if (postCommentBtn) {
    postCommentBtn.addEventListener('click', () => {
      const input = document.getElementById('commentInput');
      if (input && input.value.trim() !== '') {
        addCommentToDemo(demoId, input.value);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  }

  // Comment Editing & Deleting
  document.querySelectorAll('.edit-comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const commentId = e.currentTarget.dataset.editCommentId;
      const card = document.querySelector(`[data-comment-id="${commentId}"]`);
      if (card) {
        const textP = card.querySelector('.comment-text-p');
        const form = card.querySelector('.edit-comment-form');
        if (textP && form) {
          textP.classList.add('hidden');
          form.classList.remove('hidden');
        }
      }
    });
  });

  document.querySelectorAll('.cancel-edit-comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('[data-comment-id]');
      if (card) {
        const textP = card.querySelector('.comment-text-p');
        const form = card.querySelector('.edit-comment-form');
        if (textP && form) {
          form.classList.add('hidden');
          textP.classList.remove('hidden');
        }
      }
    });
  });

  document.querySelectorAll('.edit-comment-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentId = form.dataset.commentId;
      const input = form.querySelector('.edit-comment-input');
      if (input && input.value.trim() !== '') {
        editCommentInDemo(demoId, commentId, input.value.trim());
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  });

  document.querySelectorAll('.del-comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const commentId = e.currentTarget.dataset.delCommentId;
      if (confirm('¿Estás seguro de eliminar este comentario?')) {
        deleteCommentFromDemo(demoId, commentId);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  });

  // Edit Modal controls
  const openEditBtn = document.getElementById('openEditModalBtn');
  const editModal = document.getElementById('editProjectModal');
  const closeEditBtn = document.getElementById('closeEditModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  if (openEditBtn && editModal) {
    openEditBtn.addEventListener('click', () => editModal.classList.remove('hidden'));
    if (closeEditBtn) closeEditBtn.addEventListener('click', () => editModal.classList.add('hidden'));
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => editModal.classList.add('hidden'));

    const editForm = document.getElementById('editProjectForm');
    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          title: document.getElementById('editTitle').value,
          subtitle: document.getElementById('editSubtitle').value,
          category: document.getElementById('editCategory').value,
          description: document.getElementById('editDescription').value,
          problemStatement: document.getElementById('editProblem').value,
          impactMetrics: document.getElementById('editMetrics').value,
          videoUrl: document.getElementById('editVideo').value
        };
        updateDemo(demoId, updated);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      });
    }
  }

  // Image Modal controls
  const openImgBtn1 = document.getElementById('openImageModalBtn');
  const openImgBtn2 = document.getElementById('openImageModalBtn2');
  const imgModal = document.getElementById('addImageModal');
  const closeImgBtn = document.getElementById('closeImageModalBtn');
  const cancelImgBtn = document.getElementById('cancelImageBtn');

  const showImgModal = () => imgModal && imgModal.classList.remove('hidden');
  const hideImgModal = () => imgModal && imgModal.classList.add('hidden');

  if (openImgBtn1) openImgBtn1.addEventListener('click', showImgModal);
  if (openImgBtn2) openImgBtn2.addEventListener('click', showImgModal);
  if (closeImgBtn) closeImgBtn.addEventListener('click', hideImgModal);
  if (cancelImgBtn) cancelImgBtn.addEventListener('click', hideImgModal);

  const addImgForm = document.getElementById('addImageForm');
  if (addImgForm) {
    addImgForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('imageFileInput');
      const urlInput = document.getElementById('imageUrlInput').value.trim();
      const caption = document.getElementById('imageCaptionInput').value.trim();

      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          addDemoImage(demoId, event.target.result, caption);
          const app = document.getElementById('app');
          if (app) app.innerHTML = renderDetailView(demoId);
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else if (urlInput) {
        addDemoImage(demoId, urlInput, caption);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  }

  // Image Delete Buttons
  document.querySelectorAll('.del-img-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.delImg, 10);
      removeDemoImage(demoId, idx);
      const app = document.getElementById('app');
      if (app) app.innerHTML = renderDetailView(demoId);
    });
  });
}
