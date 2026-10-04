/**
 * AUTH SYSTEM - Registration First Flow
 * Register → Switch to Login → Dashboard
 */

(function() {
  'use strict';

  // Initialize
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

  function setup() {
    setupEventListeners();
    checkSession();
    // Set register as default tab
    setDefaultTab();
  }

  function setDefaultTab() {
    const registerTab = document.querySelector('[data-tab="register"]');
    const loginTab = document.querySelector('[data-tab="login"]');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    if (registerTab && loginTab && registerForm && loginForm) {
      // Ensure register is active
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    }
  }

  // Event Listeners
  function setupEventListeners() {
    // Open Modal
    const loginBtn = document.getElementById('openAuthBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', openModal);
    }

    // Close Modal
    const closeBtn = document.getElementById('closeAuthBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
      });
    });

    // Forms
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);

    // User Menu
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
      userBtn.addEventListener('click', toggleUserMenu);
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const userMenu = document.getElementById('userMenu');
      const userBtn = document.getElementById('userBtn');
      if (userMenu && !userMenu.contains(e.target) && e.target !== userBtn) {
        userMenu.classList.remove('open');
      }
    });
  }

  // Modal
  function openModal() {
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      clearForms();
      hideAlerts();
      // Always show register first
      setDefaultTab();
    }
  }

  function closeModal() {
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      clearForms();
      hideAlerts();
    }
  }

  function switchTab(tab) {
    const loginTab = document.querySelector('[data-tab="login"]');
    const registerTab = document.querySelector('[data-tab="register"]');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (tab === 'login') {
      loginTab?.classList.add('active');
      registerTab?.classList.remove('active');
      loginForm?.classList.add('active');
      registerForm?.classList.remove('active');
    } else {
      registerTab?.classList.add('active');
      loginTab?.classList.remove('active');
      registerForm?.classList.add('active');
      loginForm?.classList.remove('active');
    }
    
    hideAlerts();
  }

  // Register
  function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    // Validation
    if (!name || name.length < 2) {
      showAlert('register', 'error', 'الرجاء إدخال اسم صحيح (حرفين على الأقل)');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('register', 'error', 'الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }

    if (!password || password.length < 6) {
      showAlert('register', 'error', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    // Check if user exists
    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (exists) {
      showAlert('register', 'error', 'هذا البريد مسجل بالفعل! الرجاء تسجيل الدخول');
      return;
    }

    // Create user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Success - Switch to login
    showAlert('register', 'success', 'تم إنشاء الحساب بنجاح! قم بتسجيل الدخول الآن');
    
    setTimeout(() => {
      // Switch to login form
      switchTab('login');
      
      // Clear register form
      e.target.reset();
      hideAlerts();
      
      // Show toast
      showToast(`تم تسجيلك بنجاح يا ${name}! الآن سجل دخولك`);
    }, 1500);
  }

  // Login
  function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validation
    if (!validateEmail(email)) {
      showAlert('login', 'error', 'الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }

    if (!password) {
      showAlert('login', 'error', 'الرجاء إدخال كلمة المرور');
      return;
    }

    // Find user
    const users = getUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (!user) {
      showAlert('login', 'error', 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      return;
    }

    // Success
    loginUser(user);
    closeModal();
    showToast(`مرحباً ${user.name}! تم تسجيل الدخول بنجاح ✓`);
  }

  // Logout
  function handleLogout(e) {
    e.preventDefault();
    
    localStorage.removeItem('currentUser');
    updateUI(null);
    showToast('تم تسجيل الخروج بنجاح');
    
    // Redirect if on dashboard
    if (window.location.pathname.includes('dashboard')) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  }

  // User Management
  function loginUser(user) {
    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
    
    localStorage.setItem('currentUser', JSON.stringify(session));
    updateUI(session);
  }

  function checkSession() {
    const currentUser = getCurrentUser();
    updateUI(currentUser);
  }

  function getCurrentUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  function getUsers() {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  // UI Update
  function updateUI(user) {
    const loginBtn = document.getElementById('openAuthBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    if (user) {
      // Logged in
      if (loginBtn) loginBtn.style.display = 'none';
      if (userMenu) userMenu.classList.add('active');
      if (userName) userName.textContent = user.name;
      if (userAvatar) userAvatar.textContent = user.name.charAt(0).toUpperCase();
    } else {
      // Logged out
      if (loginBtn) loginBtn.style.display = 'flex';
      if (userMenu) userMenu.classList.remove('active');
    }
  }

  function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
      userMenu.classList.toggle('open');
    }
  }

  // Helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showAlert(form, type, message) {
    const alertId = form + 'Alert';
    const alert = document.getElementById(alertId);
    
    if (alert) {
      alert.className = `alert alert-${type} show`;
      alert.textContent = message;
    }
  }

  function hideAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      alert.classList.remove('show');
    });
  }

  function clearForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
  }

  function showToast(message) {
    // Toast is disabled - do nothing
    // Comment out to hide all toast notifications
    return;
  }

  // Public API
  window.AuthSystem = {
    getCurrentUser: getCurrentUser,
    isLoggedIn: () => getCurrentUser() !== null,
    logout: handleLogout
  };

  // Start
  init();

})();
