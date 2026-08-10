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

export function handleRoute(e) {
  let hash = window.location.hash || '#home';
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Protect Routes
  if (!state.isAuthenticated && hash !== '#login') {
    navigateTo('#login');
    return;
  }

  const isStateUpdate = e && e.type === 'state-updated';
  
  // Only scroll to top on actual navigation, NOT on background data syncs
  if (!isStateUpdate) {
    window.scrollTo(0, 0);
  }

  // Preserve scroll position and active input during live sync
  const currentScroll = window.scrollY;
  const activeElement = document.activeElement;
  const activeId = activeElement ? activeElement.id : null;
  let activeValue = null;
  let selectionStart = null;
  let selectionEnd = null;

  if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
    activeValue = activeElement.value;
    try {
      selectionStart = activeElement.selectionStart;
      selectionEnd = activeElement.selectionEnd;
    } catch(err) {}
  }

  // Always re-render navbar to update UI based on route/auth state
  renderNavbar();

  if (hash === '#login') {
    appContainer.innerHTML = renderLoginView();
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

  if (isStateUpdate) {
    // Restore scroll position
    window.scrollTo(0, currentScroll);
    
    // Attempt to restore focus and value if user was typing
    if (activeId) {
      const el = document.getElementById(activeId);
      if (el) {
        el.focus();
        if (activeValue !== null && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
          el.value = activeValue;
          if (selectionStart !== null && selectionEnd !== null) {
            try {
              el.setSelectionRange(selectionStart, selectionEnd);
            } catch(err) {}
          }
        }
      }
    }
  }
}
