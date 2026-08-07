// Global Footer Component

export function renderFooter() {
  const container = document.getElementById('footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="bg-surface-container-highest text-on-surface border-t border-surface-container-high mt-16 py-12">
      <div class="max-w-[1440px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded bg-white flex items-center justify-center overflow-hidden">
              <img src="/logo-prosur.png" alt="Prosur Logo" class="w-full h-full object-contain p-0.5" />
            </div>
            <span class="font-bold text-lg">PROSUR <span class="text-primary">AI Showcase</span></span>
          </div>
          <p class="text-sm text-secondary leading-relaxed">
            Plataforma corporativa de colaboración e innovación en Inteligencia Artificial del Grupo Prosur. Impulsando la biotecnología y sostenibilidad.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider mb-4 text-on-surface">Unidades de Negocio</h4>
          <ul class="space-y-2 text-sm text-secondary">
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Food Ingredients</a></li>
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Biotech & Pharma</a></li>
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Operations & Logistics</a></li>
            <li><a href="#home" class="hover:text-primary transition-colors">Prosur Tech & Corporate</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider mb-4 text-on-surface">Recursos & Guías</h4>
          <ul class="space-y-2 text-sm text-secondary">
            <li><a href="#community" class="hover:text-primary transition-colors">Foro de Innovación AI</a></li>
            <li><a href="#profile" class="hover:text-primary transition-colors">Publicar Nueva Demo</a></li>
            <li><a href="javascript:void(0)" class="hover:text-primary transition-colors">Lineamientos Éticos de IA</a></li>
            <li><a href="javascript:void(0)" class="hover:text-primary transition-colors">Documentación de API</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider mb-4 text-on-surface">Soporte Corporativo</h4>
          <p class="text-sm text-secondary mb-3 leading-relaxed">
            ¿Tienes un modelo o proyecto de IA para compartir? Contacta con el equipo de I+D Corporativo.
          </p>
          <a href="mailto:innovation@prosur.com" class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <span class="material-symbols-outlined text-base">mail</span>
            innovation@prosur.com
          </a>
        </div>

      </div>

      <div class="max-w-[1440px] mx-auto px-4 md:px-12 mt-12 pt-6 border-t border-surface-container-high flex flex-col md:flex-row items-center justify-between text-xs text-secondary gap-4">
        <p>© 2026 Grupo Prosur. Todos los derechos reservados. Innovation Hub v2.5</p>
        <div class="flex items-center gap-6">
          <a href="javascript:void(0)" class="hover:underline">Privacidad</a>
          <a href="javascript:void(0)" class="hover:underline">Términos de Uso</a>
          <a href="javascript:void(0)" class="hover:underline">Seguridad Corporativa</a>
        </div>
      </div>
    </footer>
  `;
}
