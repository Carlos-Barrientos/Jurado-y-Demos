// View 3: Feed de Comunidad (Community Feed)

import { state, addPost } from '../data/store.js';

export function renderCommunityView() {
  setTimeout(attachCommunityEventListeners, 50);
  return getCommunityHtml();
}

function getCommunityHtml() {
  return `
    <div class="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-8 animate-fadeIn">
      
      <!-- Community Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container-high pb-6">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span class="material-symbols-outlined text-sm">forum</span> Red de Innovación
          </div>
          <h1 class="text-3xl font-bold text-on-surface">Feed de Comunidad & Foros IA</h1>
          <p class="text-sm text-secondary mt-1">
            Debate arquitecturas, propone casos de uso y comparte aprendizajes sobre la implementación de IA en Prosur.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Main Feed Posts (Left 2 Columns) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Create Post Card -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <img src="${state.currentUser.avatar}" alt="${state.currentUser.name}" class="w-10 h-10 rounded-full object-cover"/>
              <h3 class="font-bold text-base text-on-surface">Iniciar nueva discusión o anuncio</h3>
            </div>
            
            <input 
              id="postTitleInput" 
              type="text" 
              placeholder="Título descriptivo del tema..."
              class="w-full p-3 bg-surface-container-low rounded-lg border border-surface-container text-sm font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
            
            <textarea 
              id="postContentInput" 
              rows="3" 
              placeholder="Detalla tu propuesta, consulta o descubrimiento técnico..."
              class="w-full p-3 bg-surface-container-low rounded-lg border border-surface-container text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
            ></textarea>
            
            <div class="flex items-center justify-between flex-wrap gap-3 pt-2">
              <div class="flex items-center gap-2">
                <select id="postCategorySelect" class="bg-surface-container text-xs font-semibold rounded-lg px-3 py-2 border-0 focus:ring-1 focus:ring-primary text-secondary">
                  <option value="Showcase">Categoría: Showcase</option>
                  <option value="Pregunta">Categoría: Pregunta Técnica</option>
                  <option value="Idea">Categoría: Propuesta de Proyecto</option>
                </select>
              </div>
              <button id="publishPostBtn" class="px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-container transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">send</span> Publicar en Comunidad
              </button>
            </div>
          </div>

          <!-- Posts Feed -->
          <div class="space-y-4">
            ${state.posts.map(post => `
              <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4 shadow-sm hover:border-surface-container-highest transition-all">
                
                <!-- Post Author Header -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img src="${post.avatar}" alt="${post.author}" class="w-10 h-10 rounded-full object-cover"/>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm text-on-surface">${post.author}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${post.unitClass}">${post.unit}</span>
                      </div>
                      <span class="text-xs text-secondary">${post.role} • ${post.date}</span>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-surface-container text-xs font-semibold text-tertiary rounded-full">
                    ${post.type}
                  </span>
                </div>

                <!-- Post Content -->
                <div class="space-y-2">
                  <h3 class="font-bold text-lg text-on-surface leading-snug">${post.title}</h3>
                  <p class="text-sm text-secondary leading-relaxed">${post.content}</p>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  ${post.tags.map(t => `<span class="px-2 py-0.5 bg-surface-container text-xs rounded font-medium text-secondary">#${t}</span>`).join('')}
                </div>

                <!-- Post Actions Bar -->
                <div class="flex items-center justify-between pt-3 border-t border-surface-container-high text-xs text-secondary font-medium">
                  <div class="flex items-center gap-4">
                    <button class="like-post-btn flex items-center gap-1.5 hover:text-primary transition-colors" data-post-id="${post.id}">
                      <span class="material-symbols-outlined text-lg text-primary fill">favorite</span>
                      <span>${post.likes} Me gusta</span>
                    </button>
                    <span class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-lg">chat_bubble</span>
                      <span>${post.commentsCount} Comentarios</span>
                    </span>
                  </div>
                  <button class="hover:text-primary transition-colors">Compartir</button>
                </div>

              </div>
            `).join('')}
          </div>

        </div>

        <!-- Sidebar (Active Contributors & Trending Tags) -->
        <div class="space-y-6">
          
          <!-- Active Members -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-4">
            <h3 class="font-bold text-sm text-on-surface uppercase tracking-wider">Miembros Más Activos</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250" alt="Elena" class="w-8 h-8 rounded-full object-cover"/>
                  <div>
                    <span class="font-bold text-xs text-on-surface block">Dra. Elena Rostova</span>
                    <span class="text-[11px] text-secondary">Prosur Biotech</span>
                  </div>
                </div>
                <span class="text-xs font-bold text-primary">14 Demos</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250" alt="Mariana" class="w-8 h-8 rounded-full object-cover"/>
                  <div>
                    <span class="font-bold text-xs text-on-surface block">Lic. Mariana Gómez</span>
                    <span class="text-[11px] text-secondary">Prosur Corporate</span>
                  </div>
                </div>
                <span class="text-xs font-bold text-primary">9 Demos</span>
              </div>
            </div>
          </div>

          <!-- Trending Topics -->
          <div class="bg-white p-6 rounded-2xl border border-surface-container-high space-y-3">
            <h3 class="font-bold text-sm text-on-surface uppercase tracking-wider">Temas Tendencia</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#Llama3</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#YOLOv8</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#Espectrometria</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#RAG</span>
              <span class="px-3 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary cursor-pointer text-xs rounded-full font-medium transition-colors">#Biotecnologia</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

function attachCommunityEventListeners() {
  const publishBtn = document.getElementById('publishPostBtn');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const title = document.getElementById('postTitleInput').value;
      const content = document.getElementById('postContentInput').value;
      const category = document.getElementById('postCategorySelect').value;

      if (title && content) {
        addPost(title, content, category);
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderCommunityView();
      }
    });
  }

  document.querySelectorAll('.like-post-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const postId = e.currentTarget.dataset.postId;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes += 1;
        const app = document.getElementById('app');
        if (app) app.innerHTML = renderCommunityView();
      }
    });
  });
}
