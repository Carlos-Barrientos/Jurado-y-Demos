// Application Entry Point

import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { initRouter } from './router/index.js';

function initApp() {
  // 1. Mount Global Layout Components
  renderNavbar();
  renderFooter();

  // 2. Initialize Hash Router
  initRouter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
