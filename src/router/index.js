// Simple Hash Router for Single Page Application

import { renderHomeView } from '../views/HomeView.js';
import { renderDetailView } from '../views/DetailView.js';
import { renderCommunityView } from '../views/CommunityView.js';
import { renderProfileView } from '../views/ProfileView.js';
import { renderLoginView } from '../views/LoginView.js';
import { renderAdminView } from '../views/AdminView.js';
import { updateNavbarActiveState, renderNavbar } from '../components/Navbar.js';
import { state, isAdmin } from '../data/store.js';

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);
  window.addEventListener('state-updated', handleRoute);
  // Execute immediately on initialization
  handleRoute();
}

export function navigateTo(hash) {
  window.location.hash = hash;
}

export function handleRoute() {
  let hash = window.location.hash || '#home';
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Protect Routes
  if (!state.isAuthenticated && hash !== '#login') {
    navigateTo('#login');
    return;
  }

  // Scroll to top on navigation
  window.scrollTo(0, 0);

  // Always re-render navbar to update UI based on route/auth state
  renderNavbar();

  if (hash === '#login') {
    appContainer.innerHTML = renderLoginView();
    // No active state for navbar on login
  } else if (hash.startsWith('#demo/')) {
    const demoId = hash.split('/')[1];
    appContainer.innerHTML = renderDetailView(demoId);
    updateNavbarActiveState('demo');
  } else if (hash === '#community') {
    appContainer.innerHTML = renderCommunityView();
    updateNavbarActiveState('community');
  } else if (hash === '#admin' && isAdmin()) {
    appContainer.innerHTML = renderAdminView();
    updateNavbarActiveState('admin');
  } else if (hash === '#profile') {
    appContainer.innerHTML = renderProfileView();
    updateNavbarActiveState('profile');
  } else {
    // Default to Home
    appContainer.innerHTML = renderHomeView();
    updateNavbarActiveState('home');
  }
}
