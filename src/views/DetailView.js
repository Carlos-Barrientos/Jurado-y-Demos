import { uploadFileToStorage } from '../data/firebase.js';
import { 
  state, 
  getDemoById, 
  isOwner, 
  isJudge, 
  isAdmin,
  isDario,
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
  isDirectVideoFile,
  companies
} from '../data/store.js';

let detailRenderToken = 0;

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

  // Firestore's realtime listener can trigger a second render (via 'state-updated')
  // milliseconds after this one, e.g. right after an upload/delete calls setDoc.
  // Only the attach scheduled by the LAST render wins, so listeners never stack on the same DOM.
  const renderToken = ++detailRenderToken;
  setTimeout(() => {
    if (renderToken === detailRenderToken) attachDetailEventListeners(demo.id);
  }, 50);
  return getDetailHtml(demo);
}

function getDetailHtml(demo) {
  const isFav = isFavorite(demo.id);
  const userIsOwner = isOwner(demo) || isAdmin();
  const userIsJudge = isJudge();
  const activeUser = state.currentUser;
  const isDirectVideo = isDirectVideoFile(demo.videoUrl);
  const formattedEmbed = isDirectVideo ? '' : formatYoutubeEmbedUrl(demo.videoUrl);
  const iframeSrc = formattedEmbed ? (formattedEmbed.includes('?') ? `${formattedEmbed}&autoplay=0` : `${formattedEmbed}?autoplay=0`) : '';

  // Calculate judge evaluations average and check if active user evaluated
  const evals = demo.evaluations || [];
  const hasEvals = evals.length > 0;
  const myExistingEval = userIsJudge && activeUser ? evals.find(e => e.judgeId === activeUser.id) : null;

  const initialImpact = myExistingEval ? (myExistingEval.scores?.impact !== undefined ? myExistingEval.scores.impact : 40) : 40;
  const initialViab = myExistingEval ? (myExistingEval.scores?.viability !== undefined ? myExistingEval.scores.viability : 30) : 30;
  const initialInnov = myExistingEval ? (myExistingEval.scores?.innovation !== undefined ? myExistingEval.scores.innovation : 20) : 20;
  const initialPitch = myExistingEval ? (myExistingEval.scores?.pitch !== undefined ? myExistingEval.scores.pitch : 10) : 10;
  const initialTotal = initialImpact + initialViab + initialInnov + initialPitch;
  const initialFeedback = myExistingEval ? (myExistingEval.feedback || '') : '';

  const modelBaseVal = demo.specs?.modelType || demo.modelBase || 'N/A';
  const latencyVal = demo.specs?.latency || demo.latency || 'N/A';
  const dataSourceVal = demo.specs?.dataSources || demo.dataSource || 'N/A';
  const statusVal = demo.specs?.status || demo.deploymentStatus || 'En diseño';

  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Breadcrumbs & Role Indicator -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs font-semibold text-secondary">
          <a href="#home" class="hover:text-primary transition-colors flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">home</span> Galería
          </a>
          <span>/</span>
          <span class="text-on-surface font-bold truncate max-w-[200px] sm:max-w-none">${demo.title}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          ${userIsOwner ? `
            <div id="googleCalendarBtnContainer" class="inline-flex items-center"></div>
            <button id="openEditModalBtn" class="px-3.5 py-1.5 bg-primary text-white font-semibold text-xs rounded-lg shadow hover:bg-primary-container transition-all flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">edit</span> Editar Proyecto
            </button>
            <button id="openImageModalBtn" class="px-3.5 py-1.5 bg-surface-container-high text-on-surface font-semibold text-xs rounded-lg border border-surface-container hover:bg-surface-container transition-all flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">cloud_upload</span> Cargar Archivos (${(demo.images || []).length})
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: Video Player, Details, Tech Specs & Gallery -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Video Player Banner -->
          <div class="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video relative group border border-surface-container-high">
            ${isDirectVideo ? `
              <video 
                src="${demo.videoUrl}" 
                controls 
                playsinline 
                preload="metadata"
                class="w-full h-full object-contain bg-black"
              >
                Tu navegador no soporta la reproducción directa de video HTML5.
              </video>
            ` : iframeSrc ? `
              <iframe 
                src="${iframeSrc}" 
                title="${demo.title}"
                class="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            ` : `
              <div class="w-full h-full flex flex-col items-center justify-center text-white/60 p-6 text-center space-y-2">
                <span class="material-symbols-outlined text-5xl">video_off</span>
                <p class="text-sm font-semibold">Video no disponible o enlace no especificado.</p>
              </div>
            `}
          </div>

          <!-- Title & Actions Bar -->
          <div class="bg-white p-6 md:p-8 rounded-2xl border border-surface-container-high space-y-4 shadow-sm">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="space-y-2 max-w-xl">
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                    ${demo.category}
                  </span>
                  <span class="text-xs text-secondary font-semibold">${demo.duration}</span>
                </div>
                <h1 class="text-2xl md:text-3xl font-extrabold text-on-surface leading-tight">${demo.title}</h1>
                <p class="text-base font-semibold text-secondary leading-snug">${demo.subtitle}</p>
              </div>

              <!-- Like & Bookmark Buttons -->
              <div class="flex items-center gap-3">
                <button 
                  id="likeBtn" 
                  class="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold text-xs hover:bg-rose-100 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span class="material-symbols-outlined text-lg fill">favorite</span> ${demo.likes} Me Gusta
                </button>

                <button 
                  id="favBtn" 
                  class="p-2.5 rounded-xl border border-surface-container hover:bg-surface-container transition-colors flex items-center justify-center ${isFav ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-surface-container-low text-secondary'}"
                  title="${isFav ? 'Quitar de guardados' : 'Guardar demo'}"
                >
                  <span class="material-symbols-outlined text-xl ${isFav ? 'fill text-amber-500' : ''}">bookmark</span>
                </button>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 pt-2 border-t border-surface-container-high">
              ${(demo.tags || []).map(tag => `
                <span class="px-2.5 py-1 bg-surface-container text-tertiary text-xs rounded-md font-medium">#${tag}</span>
              `).join('')}
            </div>
          </div>

          <!-- Project Information Tabs / Sections -->
          <div class="space-y-6">
            
            <!-- Description Box -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-3">
              <h3 class="text-xs uppercase font-bold text-secondary tracking-wider">Descripción del Proyecto (MVP)</h3>
              <p class="text-sm text-on-surface leading-relaxed">${demo.description}</p>
            </div>

            <!-- Problem & Impact Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-2">
                <div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <span class="material-symbols-outlined text-base">report_problem</span> Problema Operativo a Resolver
                </div>
                <p class="text-xs text-on-surface leading-relaxed">${demo.problemStatement}</p>
              </div>

              <div class="bg-emerald-50/70 p-6 rounded-xl border border-emerald-200 space-y-2">
                <div class="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <span class="material-symbols-outlined text-base text-emerald-600">trending_up</span> Métricas de Impacto
                </div>
                <p class="text-xs text-emerald-950 leading-relaxed font-medium">${demo.impactMetrics}</p>
              </div>
            </div>

            <!-- Technical Specifications Grid (Ficha Técnica del Modelo) -->
            <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4 shadow-sm">
              <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
                <h3 class="text-base font-extrabold text-on-surface flex items-center gap-2">
                  <span class="material-symbols-outlined text-rose-600 text-xl">memory</span> Ficha Técnica del Modelo
                </h3>
                ${userIsOwner ? `
                  <button class="open-edit-specs-btn px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">edit</span> Editar Ficha
                  </button>
                ` : ''}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="p-3.5 bg-surface-bright rounded-xl border border-surface-container-high space-y-1">
                  <span class="text-[10px] font-bold text-secondary uppercase tracking-wider block">Modelo Base</span>
                  <span class="font-extrabold text-sm text-on-surface">${modelBaseVal}</span>
                </div>

                <div class="p-3.5 bg-surface-bright rounded-xl border border-surface-container-high space-y-1">
                  <span class="text-[10px] font-bold text-secondary uppercase tracking-wider block">Latencia Inferencia</span>
                  <span class="font-extrabold text-sm text-on-surface">${latencyVal}</span>
                </div>

                <div class="p-3.5 bg-surface-bright rounded-xl border border-surface-container-high space-y-1">
                  <span class="text-[10px] font-bold text-secondary uppercase tracking-wider block">Fuente de Datos</span>
                  <span class="font-extrabold text-sm text-on-surface">${dataSourceVal}</span>
                </div>

                <div class="p-3.5 bg-surface-bright rounded-xl border border-surface-container-high space-y-1">
                  <span class="text-[10px] font-bold text-secondary uppercase tracking-wider block">Estado de Despliegue</span>
                  <span class="font-bold text-emerald-600 text-xs flex items-center gap-1.5 pt-0.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>${statusVal}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Evidence Gallery & File Uploads -->
            <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4 shadow-sm">
              <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
                <h3 class="text-xs uppercase font-extrabold text-secondary tracking-wider flex items-center gap-2">
                  <span class="material-symbols-outlined text-base text-primary">folder_open</span> Galería de Evidencias & Archivos (${(demo.images || []).length})
                </h3>
                ${userIsOwner ? `
                  <button id="openImageModalBtn2" class="px-3 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">cloud_upload</span> Cargar Archivo (con Vista Previa)
                  </button>
                ` : ''}
              </div>

              ${(!demo.images || demo.images.length === 0) ? `
                <p class="text-xs text-secondary italic py-6 text-center">No hay evidencias o archivos cargados aún.</p>
              ` : `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${demo.images.map((img, idx) => {
                    const isDoc = img.type === 'document' || (!img.url.startsWith('data:image') && !img.url.match(/\.(jpeg|jpg|gif|png|webp|svg)/i));
                    return `
                      <div class="group relative rounded-xl border border-surface-container bg-surface-bright overflow-hidden shadow-sm hover:shadow-md transition-all">
                        ${isDoc ? `
                          <!-- Document Card -->
                          <div class="p-4 flex flex-col justify-between h-36 space-y-2">
                            <div class="flex items-start gap-3">
                              <span class="material-symbols-outlined text-3xl text-primary p-2 bg-primary/10 rounded-lg">description</span>
                              <div class="flex-1 min-w-0">
                                <h4 class="font-bold text-xs text-on-surface truncate">${img.name || img.caption}</h4>
                                <span class="text-[10px] text-secondary block">${img.size ? img.size + ' • ' : ''}${img.date || 'Documento'}</span>
                              </div>
                            </div>
                            <div class="flex items-center justify-between pt-2 border-t border-surface-container-high">
                              <button data-preview-idx="${idx}" class="preview-item-btn text-xs text-primary font-bold hover:underline flex items-center gap-1">
                                <span class="material-symbols-outlined text-xs">visibility</span> Vista Previa
                              </button>
                              ${userIsOwner ? `
                                <button data-remove-img-idx="${idx}" class="remove-img-btn text-[10px] text-error hover:underline font-bold">
                                  Eliminar
                                </button>
                              ` : ''}
                            </div>
                          </div>
                        ` : `
                          <!-- Image Card -->
                          <div class="aspect-video relative overflow-hidden bg-black/5">
                            <img src="${img.url}" alt="${img.caption}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[11px]">
                              <p class="line-clamp-2 leading-tight font-medium">${img.caption}</p>
                              <div class="flex items-center justify-between">
                                <button data-preview-idx="${idx}" class="preview-item-btn text-[10px] bg-white/90 text-primary font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                                  <span class="material-symbols-outlined text-xs">visibility</span> Vista Previa
                                </button>
                                ${userIsOwner ? `
                                  <button data-remove-img-idx="${idx}" class="remove-img-btn text-[10px] bg-white/90 text-error font-bold px-2 py-0.5 rounded">
                                    Eliminar
                                  </button>
                                ` : ''}
                              </div>
                            </div>
                          </div>
                        `}
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>

            <!-- Section Comments -->
            <div class="bg-white p-6 rounded-xl border border-surface-container-high space-y-4">
              <h3 class="text-lg font-bold text-on-surface">Comentarios & Discusión (${(demo.comments || []).length})</h3>
              
              <div class="flex gap-3">
                <img src="${activeUser ? activeUser.avatar : ''}" alt="User" class="w-9 h-9 rounded-full object-cover"/>
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
                    <h3 class="font-bold text-base text-amber-950">${myExistingEval ? 'Editar Mi Calificación' : 'Panel de Calificación del Jurado'}</h3>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">Jurado Oficial</span>
                </div>

                <form id="judgeEvalForm" class="space-y-4">
                  <div class="space-y-3 text-xs">
                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Eficiencia Operativa (40%)</span>
                        <span class="text-amber-700"><span id="valImpact">${initialImpact}</span> / 40</span>
                      </div>
                      <input type="range" id="scoreImpact" min="0" max="40" step="1" value="${initialImpact}" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>

                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Viabilidad y Escalabilidad (30%)</span>
                        <span class="text-amber-700"><span id="valViab">${initialViab}</span> / 30</span>
                      </div>
                      <input type="range" id="scoreViab" min="0" max="30" step="1" value="${initialViab}" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>

                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Innovación y Aplicación de IA (20%)</span>
                        <span class="text-amber-700"><span id="valInnov">${initialInnov}</span> / 20</span>
                      </div>
                      <input type="range" id="scoreInnov" min="0" max="20" step="1" value="${initialInnov}" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>

                    <div>
                      <div class="flex justify-between font-bold text-on-surface mb-1">
                        <span>Claridad del Pitch (10%)</span>
                        <span class="text-amber-700"><span id="valPitch">${initialPitch}</span> / 10</span>
                      </div>
                      <input type="range" id="scorePitch" min="0" max="10" step="1" value="${initialPitch}" class="w-full accent-amber-600 cursor-pointer"/>
                    </div>
                  </div>

                  <div class="bg-amber-100 p-3 rounded-lg flex items-center justify-between border border-amber-300">
                    <span class="font-bold text-amber-900 text-sm">Puntuación Final:</span>
                    <span class="text-xl font-black text-amber-600"><span id="valTotal">${initialTotal}</span>/100</span>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-on-surface mb-1">Observación Oficial del Jurado:</label>
                    <textarea 
                      id="judgeFeedbackInput" 
                      rows="3" 
                      placeholder="Escribe la evaluación final, fortalezas y recomendaciones..."
                      class="w-full p-2.5 bg-white rounded-lg border border-amber-300 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      required
                    >${initialFeedback}</textarea>
                  </div>

                  <button type="submit" class="w-full py-2.5 bg-amber-600 text-white font-bold text-xs rounded-lg hover:bg-amber-700 transition-all shadow-md flex items-center justify-center gap-1.5">
                    <span class="material-symbols-outlined text-base">${myExistingEval ? 'edit' : 'verified'}</span> ${myExistingEval ? 'Corregir y Guardar Calificación' : 'Emitir y Confirmar Calificación'}
                  </button>
                </form>
              </div>
            `}
          ` : ''}

          <!-- Display Submitted Official Judge Evaluations (Exclusive for Jurado, Admin & Dario) -->
          ${(userIsJudge || isAdmin() || isDario()) ? `
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
                          ${ev.judgeId === activeUser.id ? `
                            <button data-edit-my-eval="true" class="edit-my-eval-btn px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[10px] flex items-center gap-1 transition-all shadow-sm">
                              <span class="material-symbols-outlined text-xs">edit</span> Editar Mi Calificación
                            </button>
                          ` : ''}
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
          ` : ''}

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

          <!-- Participant Appointment Scheduling Card (Exclusive for Project Owner / Participant) -->
          ${userIsOwner ? `
            <div class="bg-gradient-to-br from-rose-50 via-white to-red-50/50 p-6 rounded-2xl border border-red-200 shadow-sm space-y-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">calendar_month</span>
                </div>
                <div>
                  <h4 class="font-bold text-xs text-red-950">Asesoría y Acompañamiento</h4>
                  <span class="text-[10px] font-semibold text-red-700 block">Exclusivo para integrantes del proyecto</span>
                </div>
              </div>
              <p class="text-xs text-secondary leading-relaxed">
                ¿Tienes dudas técnicas o requieres asesoría con el equipo del Reto IA? Programa una sesión personalizada aquí:
              </p>
              <div id="googleCalendarCardContainer" class="pt-1 flex items-center"></div>
            </div>
          ` : ''}

        </div>

      </div>

      <!-- MODAL 1: Edit Project Details & Ficha Técnica (Participant Only) -->
      ${userIsOwner ? `
        <div id="editProjectModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-xl">edit_note</span>
                <h3 class="font-bold text-lg text-on-surface">Editar Proyecto & Ficha Técnica</h3>
              </div>
              <button id="closeEditModalBtn" class="text-secondary hover:text-primary">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form id="editProjectForm" class="space-y-4 text-sm">
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
                <label class="block font-semibold text-xs text-secondary mb-1">Enlace o Archivo de Video (YouTube, Google Drive o archivo local ej. /contaanalytics.mp4)</label>
                <input type="text" id="editVideo" value="${demo.videoUrl || ''}" placeholder="https://www.youtube.com/... o /contaanalytics.mp4" class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none text-xs font-mono"/>
              </div>

              <!-- Section: Ficha Técnica del Modelo -->
              <div class="border-t border-surface-container-high pt-3 space-y-3">
                <h4 class="font-bold text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">memory</span> Ficha Técnica del Modelo
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label class="block font-semibold text-secondary mb-1">Modelo Base</label>
                    <input type="text" id="editModelBase" value="${modelBaseVal}" placeholder="ej. Gemini 1.5 Pro, GPT-4o" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                  </div>

                  <div>
                    <label class="block font-semibold text-secondary mb-1">Latencia Inferencia</label>
                    <input type="text" id="editLatency" value="${latencyVal}" placeholder="ej. 1.2s, < 500ms" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                  </div>

                  <div>
                    <label class="block font-semibold text-secondary mb-1">Fuente de Datos</label>
                    <input type="text" id="editDataSource" value="${dataSourceVal}" placeholder="ej. Excel Nómina + API n8n" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
                  </div>

                  <div>
                    <label class="block font-semibold text-secondary mb-1">Estado de Despliegue</label>
                    <select id="editDeploymentStatus" class="w-full p-2 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none">
                      <option value="En diseño" ${statusVal === 'En diseño' ? 'selected' : ''}>En diseño</option>
                      <option value="Prueba de Concepto (PoC)" ${statusVal === 'Prueba de Concepto (PoC)' ? 'selected' : ''}>Prueba de Concepto (PoC)</option>
                      <option value="MVP Operativo" ${statusVal === 'MVP Operativo' ? 'selected' : ''}>MVP Operativo</option>
                      <option value="En producción" ${statusVal === 'En producción' ? 'selected' : ''}>En producción</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button type="button" id="cancelEditBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      <!-- MODAL 2: Attach Evidence File with Live Preview -->
      ${userIsOwner ? `
        <div id="addImageModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-xl">upload_file</span>
                <h3 class="font-bold text-lg text-on-surface">Cargar Evidencia / Archivo</h3>
              </div>
              <button id="closeImageModalBtn" class="text-secondary hover:text-primary">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <form id="addImageForm" class="space-y-4 text-sm">
              
              <!-- Local File Picker Option -->
              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Seleccionar archivo (Imágenes, PDF, Documentos)</label>
                <input type="file" id="imageFileInput" accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" class="w-full p-2 border border-surface-container rounded-lg text-xs bg-surface-container-low cursor-pointer"/>
              </div>

              <div class="text-center text-xs text-secondary font-bold">O introduce una URL de archivo / imagen</div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">URL de la Imagen o Documento</label>
                <input type="url" id="imageUrlInput" placeholder="https://..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <!-- Live Preview Box (Vista Previa en Vivo) -->
              <div id="filePreviewBox" class="hidden p-3 bg-surface-bright rounded-xl border border-dashed border-primary/40 space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-primary">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">visibility</span> Vista Previa:</span>
                  <span id="previewFileInfo" class="text-[10px] text-secondary"></span>
                </div>
                <div id="previewMediaContainer" class="flex items-center justify-center min-h-[100px] bg-white rounded-lg overflow-hidden border border-surface-container">
                  <!-- Dynamic preview rendered by JS -->
                </div>
              </div>

              <div>
                <label class="block font-semibold text-xs text-secondary mb-1">Pie de foto / Descripción para el Jurado</label>
                <input type="text" id="imageCaptionInput" placeholder="ej. Pruebas de ejecución del modelo / Documento PDF de evidencia..." class="w-full p-2.5 bg-surface-container-low rounded-lg border border-surface-container focus:border-primary focus:outline-none"/>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button type="button" id="cancelImageBtn" class="px-4 py-2 bg-surface-container text-secondary font-semibold text-xs rounded-lg hover:bg-surface-container-high">Cancelar</button>
                <button type="submit" class="px-5 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-container flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">cloud_upload</span> Subir Evidencia
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      <!-- MODAL 3: Lightbox Preview Modal for Images and Documents -->
      <div id="lightboxModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl overflow-hidden animate-fadeIn relative">
          <button id="closeLightboxBtn" class="absolute top-4 right-4 p-2 bg-surface-container text-secondary hover:text-on-surface rounded-full">
            <span class="material-symbols-outlined">close</span>
          </button>
          
          <h3 id="lightboxTitle" class="font-bold text-lg text-on-surface pr-8">Vista Previa de Evidencia</h3>

          <div id="lightboxContent" class="flex items-center justify-center bg-black/5 rounded-xl min-h-[300px] max-h-[70vh] overflow-auto p-4">
            <!-- Dynamic Content -->
          </div>

          <div class="flex items-center justify-between text-xs text-secondary border-t border-surface-container-high pt-3">
            <span id="lightboxCaption" class="italic font-medium text-on-surface"></span>
            <a id="lightboxDownloadBtn" href="#" target="_blank" download class="px-3 py-1.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-container flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">download</span> Abrir / Descargar
            </a>
          </div>
        </div>
      </div>

    </div>
  `;
}

function attachDetailEventListeners(demoId) {
  const demo = getDemoById(demoId);

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
        impact: document.getElementById('scoreImpact').value,
        viability: document.getElementById('scoreViab').value,
        innovation: document.getElementById('scoreInnov').value,
        pitch: document.getElementById('scorePitch').value
      };
      const feedback = document.getElementById('judgeFeedbackInput').value;

      if (submitJudgeEvaluation(demoId, scores, feedback, true)) {
        alert('¡Calificación guardada y confirmada con éxito!');
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  }

  // Judge Confirm Evaluation buttons
  document.querySelectorAll('.confirm-eval-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirmJudgeEvaluation(demoId)) {
        alert('¡Calificación del jurado confirmada!');
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  });

  // Like & Fav buttons
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      if (!demo.likes) demo.likes = 0;
      demo.likes++;
      const app = document.getElementById('app');
      if (app) app.innerHTML = renderDetailView(demoId);
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

  // Comment submission
  const postCommentBtn = document.getElementById('postCommentBtn');
  if (postCommentBtn) {
    postCommentBtn.addEventListener('click', () => {
      const input = document.getElementById('commentInput');
      if (input && input.value.trim()) {
        addCommentToDemo(demoId, input.value.trim());
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  }

  // Edit & Delete Comment buttons
  document.querySelectorAll('.edit-comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const commentId = e.currentTarget.dataset.editCommentId;
      const card = document.querySelector(`[data-comment-id="${commentId}"]`);
      if (card) {
        const textP = card.querySelector('.comment-text-p');
        const editForm = card.querySelector('.edit-comment-form');
        if (textP && editForm) {
          textP.classList.add('hidden');
          editForm.classList.remove('hidden');
        }
      }
    });
  });

  document.querySelectorAll('.cancel-edit-comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const form = e.currentTarget.closest('.edit-comment-form');
      if (form) {
        const card = form.closest('[data-comment-id]');
        const textP = card ? card.querySelector('.comment-text-p') : null;
        form.classList.add('hidden');
        if (textP) textP.classList.remove('hidden');
      }
    });
  });

  document.querySelectorAll('.edit-comment-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentId = e.currentTarget.dataset.commentId;
      const input = e.currentTarget.querySelector('.edit-comment-input');
      if (input && input.value.trim()) {
        editCommentInDemo(demoId, commentId, input.value.trim());
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  });

  document.querySelectorAll('.edit-my-eval-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const form = document.getElementById('judgeEvalForm');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const feedbackElem = document.getElementById('judgeFeedbackInput');
        if (feedbackElem) feedbackElem.focus();
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

  // Edit Modal controls (Project & Tech Specs)
  const openEditBtn = document.getElementById('openEditModalBtn');
  const editModal = document.getElementById('editProjectModal');
  const closeEditBtn = document.getElementById('closeEditModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  const openSpecsBtns = document.querySelectorAll('.open-edit-specs-btn');
  openSpecsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (editModal) {
        editModal.classList.remove('hidden');
        const specField = document.getElementById('editModelBase');
        if (specField) specField.focus();
      }
    });
  });

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
          videoUrl: document.getElementById('editVideo').value,
          modelBase: document.getElementById('editModelBase')?.value || 'N/A',
          latency: document.getElementById('editLatency')?.value || 'N/A',
          dataSource: document.getElementById('editDataSource')?.value || 'N/A',
          deploymentStatus: document.getElementById('editDeploymentStatus')?.value || 'En diseño'
        };
        updateDemo(demoId, updated);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      });
    }
  }

  // Image & File Modal controls
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

  // Live File Preview Listener for Upload Modal
  const fileInput = document.getElementById('imageFileInput');
  const urlInput = document.getElementById('imageUrlInput');
  const previewBox = document.getElementById('filePreviewBox');
  const previewContainer = document.getElementById('previewMediaContainer');
  const previewInfo = document.getElementById('previewFileInfo');

  const updateLivePreview = () => {
    if (!previewBox || !previewContainer) return;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const fileSize = (file.size / 1024).toFixed(1) + ' KB';
      if (previewInfo) previewInfo.innerText = `${file.name} (${fileSize})`;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewContainer.innerHTML = `<img src="${e.target.result}" class="max-h-48 object-contain rounded"/>`;
          previewBox.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      } else {
        previewContainer.innerHTML = `
          <div class="p-4 text-center space-y-2">
            <span class="material-symbols-outlined text-4xl text-primary">description</span>
            <p class="font-bold text-xs text-on-surface">${file.name}</p>
            <span class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">${file.type || 'Documento'}</span>
          </div>
        `;
        previewBox.classList.remove('hidden');
      }
    } else if (urlInput && urlInput.value.trim()) {
      const url = urlInput.value.trim();
      if (previewInfo) previewInfo.innerText = 'Vista previa de URL';
      previewContainer.innerHTML = `<img src="${url}" class="max-h-48 object-contain rounded" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-4 text-center text-xs text-secondary\\'><span class=\\'material-symbols-outlined text-3xl block text-primary\\'>link</span> Archivo / Enlace listo</div>';"/>`;
      previewBox.classList.remove('hidden');
    } else {
      previewBox.classList.add('hidden');
    }
  };

  if (fileInput) fileInput.addEventListener('change', updateLivePreview);
  if (urlInput) urlInput.addEventListener('input', updateLivePreview);

// Helper to optimize image fallback at high resolution (1080p/1920p 85% quality) without exceeding Firestore limit
function compressImageHighQuality(file, maxDimension = 1920, quality = 0.85) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

  const addImgForm = document.getElementById('addImageForm');
  if (addImgForm) {
    addImgForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('imageFileInput');
      const urlInput = document.getElementById('imageUrlInput')?.value.trim();
      const caption = document.getElementById('imageCaptionInput')?.value.trim();
      const submitBtn = addImgForm.querySelector('button[type="submit"]');
      const origBtnText = submitBtn ? submitBtn.innerText : 'Guardar Evidencia';

      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileSize = (file.size / 1024).toFixed(1) + ' KB';
        const fileType = file.type.startsWith('image/') ? 'image' : 'document';
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Subiendo evidencia...';
        }

        try {
          // 1. Try uploading original 100% uncompressed file to Firebase Cloud Storage
          const cloudUrl = await uploadFileToStorage(file, `evidences/${demoId}/${Date.now()}_${file.name}`);
          
          if (cloudUrl) {
            addDemoImage(demoId, cloudUrl, caption, file.name, fileSize, fileType);
          } else {
            // 2. High-quality balanced fallback if Cloud Storage is offline/unreachable
            if (fileType === 'document' && file.size > 700 * 1024) {
              alert('El documento PDF es superior a 700 KB. Por favor sube una versión de tamaño regular o comparte un enlace URL (Google Drive / OneDrive) para no exceder la capacidad del documento.');
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = origBtnText;
              }
              return;
            }

            const optimizedDataUrl = await compressImageHighQuality(file, 1920, 0.85);
            addDemoImage(demoId, optimizedDataUrl, caption, file.name, fileSize, fileType);
          }
        } catch (err) {
          console.error('Upload failed:', err);
          alert('Error al procesar el archivo: ' + err.message);
        }

        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);

      } else if (urlInput) {
        addDemoImage(demoId, urlInput, caption, 'Enlace de Evidencia', '', 'image');
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  }

  // Remove Image/File button
  document.querySelectorAll('.remove-img-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.removeImgIdx);
      if (confirm('¿Deseas eliminar este archivo de evidencia?')) {
        removeDemoImage(demoId, idx);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderDetailView(demoId);
      }
    });
  });

  // Lightbox Preview Modal logic
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => lightboxModal.classList.add('hidden'));
  }

  document.querySelectorAll('.preview-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.previewIdx);
      const item = demo.images ? demo.images[idx] : null;
      if (!item || !lightboxModal) return;

      if (lightboxTitle) lightboxTitle.innerText = item.name || item.caption || 'Vista Previa de Evidencia';
      if (lightboxCaption) lightboxCaption.innerText = item.caption || item.name || '';
      if (lightboxDownloadBtn) {
        lightboxDownloadBtn.href = item.url;
        lightboxDownloadBtn.download = item.name || 'evidencia';
      }

      const isDoc = item.type === 'document' || (!item.url.startsWith('data:image') && !item.url.match(/\.(jpeg|jpg|gif|png|webp|svg)/i));
      if (isDoc) {
        lightboxContent.innerHTML = `
          <div class="p-8 text-center space-y-4">
            <span class="material-symbols-outlined text-6xl text-primary">description</span>
            <div>
              <h4 class="font-bold text-base text-on-surface">${item.name || 'Documento de Evidencia'}</h4>
              <p class="text-xs text-secondary">${item.size ? item.size : ''}</p>
            </div>
            <a href="${item.url}" target="_blank" download class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container text-xs transition-all shadow">
              <span class="material-symbols-outlined text-sm">download</span> Descargar / Ver Documento
            </a>
          </div>
        `;
      } else {
        lightboxContent.innerHTML = `<img src="${item.url}" alt="${item.caption}" class="max-h-[65vh] object-contain rounded-lg shadow"/>`;
      }

      lightboxModal.classList.remove('hidden');
    });
  });

  // Initialize Google Calendar Appointment Scheduling Button for project participants
  const isParticipantOrAdmin = isOwner(demo) || isAdmin();
  if (isParticipantOrAdmin) {
    initGoogleCalendarButton();
  }
}

function initGoogleCalendarButton() {
  const scheduleUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1kGEyYSVMTM1_DhUhuQ_tIhECD6ahnD91HQ_IDrZFkEbLikWVSn0K--ZY0LpjfXmWbfn5-pWUM?gv=true';
  const targets = [
    document.getElementById('googleCalendarBtnContainer'),
    document.getElementById('googleCalendarCardContainer')
  ].filter(Boolean);

  if (targets.length === 0) return;

  const loadOnTarget = (targetEl) => {
    if (!targetEl) return;
    targetEl.innerHTML = '';
    if (window.calendar && window.calendar.schedulingButton && typeof window.calendar.schedulingButton.load === 'function') {
      try {
        window.calendar.schedulingButton.load({
          url: scheduleUrl,
          color: '#D50000',
          label: 'Programar una cita',
          target: targetEl,
        });
      } catch (e) {
        console.warn('Error loading Google Calendar scheduling button:', e);
        renderFallbackCalendarBtn(targetEl, scheduleUrl);
      }
    } else {
      renderFallbackCalendarBtn(targetEl, scheduleUrl);
    }
  };

  const tryLoadAll = () => {
    targets.forEach(t => loadOnTarget(t));
  };

  if (window.calendar && window.calendar.schedulingButton) {
    tryLoadAll();
  } else {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.calendar && window.calendar.schedulingButton) {
        clearInterval(interval);
        tryLoadAll();
      } else if (attempts > 12) {
        clearInterval(interval);
        tryLoadAll();
      }
    }, 200);
  }
}

function renderFallbackCalendarBtn(targetEl, url) {
  if (!targetEl || targetEl.children.length > 0) return;
  const btn = document.createElement('a');
  btn.href = url;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = 'px-3.5 py-1.5 bg-[#D50000] text-white font-semibold text-xs rounded-lg shadow hover:bg-red-700 transition-all inline-flex items-center gap-1.5';
  btn.innerHTML = '<span class="material-symbols-outlined text-sm">calendar_month</span> Programar una cita';
  targetEl.appendChild(btn);
}
