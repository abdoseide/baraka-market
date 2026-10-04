/**
 * DASHBOARD ADVANCED SCRIPT
 * Complete Dashboard Functionality
 */

(function() {
  'use strict';

  let currentUser = null;
  let userData = {
    points: 0, // Will be loaded dynamically
    orders: 42,
    games: 15,
    referrals: 23,
    pendingPoints: 0,
    completedOrders: 38,
    processingOrders: 3,
    cancelledOrders: 1,
    activeReferrals: 18,
    referralEarnings: 0 // Will be calculated dynamically
  };

  // Load Points from Wheel State
  function loadPointsFromWheel() {
    const wheelState = localStorage.getItem('wheelState');
    if (wheelState) {
      try {
        const state = JSON.parse(wheelState);
        if (state.winHistory && Array.isArray(state.winHistory)) {
          // Calculate total points from wheel wins
          let totalPoints = 0;
          state.winHistory.forEach(win => {
            const prize = win.prize || '';
            // Extract discount percentage and convert to points
            if (prize.includes('2%')) totalPoints += 50;
            else if (prize.includes('5%')) totalPoints += 100;
            else if (prize.includes('10%')) totalPoints += 200;
            else if (prize.includes('25%')) totalPoints += 500;
            else if (prize.includes('50%')) totalPoints += 1000;
          });
          userData.points = totalPoints;
          userData.referralEarnings = totalPoints; // For display
        }
      } catch (e) {
        console.error('Error loading wheel state:', e);
      }
    }
    
    // If no points from wheel, use default starting points
    if (userData.points === 0) {
      userData.points = 100; // Starting bonus
    }
  }

  // Initialize Dashboard
  function init() {
    // Check authentication
    if (!window.AuthSystem || !AuthSystem.isLoggedIn()) {
      window.location.href = 'index.html';
      return;
    }

    currentUser = AuthSystem.getCurrentUser();
    
    // Load points from wheel before displaying
    loadPointsFromWheel();
    
    // Load dashboard after short delay
    setTimeout(() => {
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('dashboardWrapper').style.display = 'flex';
      setupDashboard();
    }, 800);
  }

  // Setup Dashboard
  function setupDashboard() {
    updateUserInfo();
    loadOverviewSection();
    setupNavigation();
    setupMobileMenu();
    setupNotifications();
    setupLogout();
  }

  // Update User Info
  function updateUserInfo() {
    const userName = currentUser.name;
    const userInitial = userName.charAt(0).toUpperCase();
    
    document.getElementById('topUserName').textContent = userName;
    document.getElementById('dashAvatarTop').textContent = userInitial;
    
    // Update sidebar badges
    document.querySelector('[data-section="wallet"] .menu-badge').textContent = userData.points.toLocaleString();
    document.querySelector('[data-section="orders"] .menu-badge').textContent = userData.orders;
    document.querySelector('[data-section="referrals"] .menu-badge').textContent = userData.referrals;
  }

  // Navigation
  function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        navigateToSection(section);
        
        // Close mobile menu
        closeMobileMenu();
      });
    });
  }

  function navigateToSection(sectionName) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.dash-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    targetSection.classList.add('active');
    
    // Load section content
    loadSectionContent(sectionName);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Load Section Content
  function loadSectionContent(sectionName) {
    const section = document.getElementById(sectionName);
    
    switch(sectionName) {
      case 'overview':
        loadOverviewSection();
        break;
      case 'wallet':
        loadWalletSection();
        break;
      case 'orders':
        loadOrdersSection();
        break;
      case 'games':
        loadGamesSection();
        break;
      case 'rewards':
        loadRewardsSection();
        break;
      case 'referrals':
        loadReferralsSection();
        break;
      case 'profile':
        loadProfileSection();
        break;
      case 'support':
        loadSupportSection();
        break;
      case 'settings':
        loadSettingsSection();
        break;
    }
  }

  // ============ OVERVIEW SECTION ============
  function loadOverviewSection() {
    const section = document.getElementById('overview');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">مرحباً، ${currentUser.name}! <i class="fas fa-hand-sparkles" style="color: #f59e0b;"></i></h1>
        <p class="section-subtitle">إليك نظرة سريعة على نشاطك في المنصة</p>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid-main">
        <div class="stat-card-modern purple">
          <div class="stat-header">
            <div class="stat-icon-box">
              <i class="fas fa-coins"></i>
            </div>
            <div class="stat-trend up">
              <i class="fas fa-arrow-up"></i>
              <span>+12%</span>
            </div>
          </div>
          <div class="stat-content">
            <div class="stat-value">${userData.points.toLocaleString()}</div>
            <div class="stat-label">نقاط المكافآت</div>
          </div>
          <div class="stat-footer">
            <a href="#wallet" class="stat-link" onclick="dashApp.navigate('wallet')">إدارة النقاط <i class="fas fa-arrow-left"></i></a>
          </div>
        </div>

        <div class="stat-card-modern blue">
          <div class="stat-header">
            <div class="stat-icon-box">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="stat-trend up">
              <i class="fas fa-arrow-up"></i>
              <span>+8</span>
            </div>
          </div>
          <div class="stat-content">
            <div class="stat-value">${userData.orders}</div>
            <div class="stat-label">إجمالي الطلبات</div>
          </div>
          <div class="stat-footer">
            <a href="#orders" class="stat-link" onclick="dashApp.navigate('orders')">عرض الطلبات <i class="fas fa-arrow-left"></i></a>
          </div>
        </div>

        <div class="stat-card-modern green">
          <div class="stat-header">
            <div class="stat-icon-box">
              <i class="fas fa-gamepad"></i>
            </div>
            <div class="stat-trend">
              <i class="fas fa-minus"></i>
              <span>${userData.games}</span>
            </div>
          </div>
          <div class="stat-content">
            <div class="stat-value">${userData.games}</div>
            <div class="stat-label">ألعاب مشتراة</div>
          </div>
          <div class="stat-footer">
            <a href="#games" class="stat-link" onclick="dashApp.navigate('games')">مكتبتي <i class="fas fa-arrow-left"></i></a>
          </div>
        </div>

        <div class="stat-card-modern orange">
          <div class="stat-header">
            <div class="stat-icon-box">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-trend up">
              <i class="fas fa-arrow-up"></i>
              <span>+5</span>
            </div>
          </div>
          <div class="stat-content">
            <div class="stat-value">${userData.referrals}</div>
            <div class="stat-label">الإحالات الناجحة</div>
          </div>
          <div class="stat-footer">
            <a href="#referrals" class="stat-link" onclick="dashApp.navigate('referrals')">دعوة أصدقاء <i class="fas fa-arrow-left"></i></a>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="content-grid-2">
        <!-- Recent Orders -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-clock"></i>
              آخر الطلبات
            </h3>
            <a href="#orders" class="card-link" onclick="dashApp.navigate('orders')">عرض الكل</a>
          </div>
          <div class="card-body">
            <div class="order-list">
              ${generateRecentOrders()}
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-bolt"></i>
              إجراءات سريعة
            </h3>
          </div>
          <div class="card-body">
            <div class="quick-actions">
              <a href="index.html#online-games" class="quick-action-btn purple">
                <i class="fas fa-store"></i>
                <span>تصفح المتجر</span>
              </a>
              <a href="index.html#wheel" class="quick-action-btn green">
                <i class="fas fa-dice"></i>
                <span>عجلة الحظ</span>
              </a>
              <a href="#wallet" class="quick-action-btn blue" onclick="dashApp.navigate('wallet')">
                <i class="fas fa-wallet"></i>
                <span>إضافة رصيد</span>
              </a>
              <a href="#support" class="quick-action-btn orange" onclick="dashApp.navigate('support')">
                <i class="fas fa-headset"></i>
                <span>الدعم الفني</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Special Offers -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-fire"></i>
            عروض خاصة لك
          </h3>
        </div>
        <div class="card-body">
          <div class="offers-grid">
            ${generateOffers()}
          </div>
        </div>
      </div>
    `;
  }

  function generateRecentOrders() {
    const orders = [
      { game: 'FIFA 24', icon: 'gamepad', date: 'منذ يومين', status: 'completed', statusText: 'مكتمل' },
      { game: 'Call of Duty', icon: 'trophy', date: 'منذ 5 أيام', status: 'completed', statusText: 'مكتمل' },
      { game: 'PES 2024', icon: 'futbol', date: 'منذ أسبوع', status: 'processing', statusText: 'قيد التنفيذ' }
    ];

    return orders.map(order => `
      <div class="order-item">
        <div class="order-icon">
          <i class="fas fa-${order.icon}"></i>
        </div>
        <div class="order-details">
          <p class="order-game">${order.game}</p>
          <p class="order-date">${order.date}</p>
        </div>
        <span class="order-status ${order.status}">${order.statusText}</span>
      </div>
    `).join('');
  }

  function generateOffers() {
    const offers = [
      { badge: '-50%', icon: '<i class="fas fa-gamepad" style="font-size: 48px; color: #8b5cf6;"></i>', title: 'خصم على جميع الألعاب', desc: 'استخدم نقاطك واحصل على خصم 50%' },
      { badge: 'هدية', icon: '<i class="fas fa-gift" style="font-size: 48px; color: #ec4899;"></i>', title: 'لعبة مجانية', desc: 'احصل على لعبة مجانية عند شراء 3 ألعاب' },
      { badge: 'جديد', icon: '<i class="fas fa-bolt" style="font-size: 48px; color: #f59e0b;"></i>', title: 'نقاط مضاعفة', desc: 'اربح نقاط مضاعفة على كل طلب هذا الأسبوع' }
    ];

    return offers.map(offer => `
      <div class="offer-card">
        <div class="offer-badge">${offer.badge}</div>
        <div class="offer-icon">${offer.icon}</div>
        <h4>${offer.title}</h4>
        <p>${offer.desc}</p>
        <button class="offer-btn">استفد الآن</button>
      </div>
    `).join('');
  }

  // ============ WALLET SECTION ============
  function loadWalletSection() {
    const section = document.getElementById('wallet');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-wallet"></i>
          المحفظة
        </h1>
        <p class="section-subtitle">إدارة رصيدك ونقاطك</p>
      </div>

      <!-- Wallet Balance -->
      <div class="wallet-hero">
        <div class="wallet-card">
          <div class="wallet-bg"></div>
          <div class="wallet-content">
            <div class="wallet-header">
              <span class="wallet-label">إجمالي الرصيد</span>
              <i class="fas fa-wallet"></i>
            </div>
            <div class="wallet-balance">
              <span class="balance-amount">${userData.points.toLocaleString()}</span>
              <span class="balance-currency">نقطة</span>
            </div>
            <div class="wallet-footer">
              <div class="wallet-info">
                <span>نقاط متاحة: <strong>${userData.points.toLocaleString()}</strong></span>
                <span>نقاط معلقة: <strong>${userData.pendingPoints}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div class="wallet-actions-grid">
          <button class="wallet-action-card" onclick="alert('سيتم إضافة هذه الميزة قريباً!')">
            <i class="fas fa-plus-circle"></i>
            <span>إضافة نقاط</span>
          </button>
          <button class="wallet-action-card" onclick="alert('سيتم إضافة هذه الميزة قريباً!')">
            <i class="fas fa-exchange-alt"></i>
            <span>تحويل نقاط</span>
          </button>
          <button class="wallet-action-card" onclick="alert('سيتم إضافة هذه الميزة قريباً!')">
            <i class="fas fa-history"></i>
            <span>السجل</span>
          </button>
        </div>
      </div>

      <!-- Points History -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-list-alt"></i>
            سجل النقاط
          </h3>
        </div>
        <div class="card-body">
          <div class="points-history">
            ${generatePointsHistory()}
          </div>
        </div>
      </div>
    `;
  }

  function generatePointsHistory() {
    const history = [
      { type: 'earned', icon: 'plus', title: 'شراء لعبة FIFA 24', date: 'منذ يومين', amount: '+150', positive: true },
      { type: 'spent', icon: 'minus', title: 'استبدال نقاط بخصم', date: 'منذ 3 أيام', amount: '-500', positive: false },
      { type: 'earned', icon: 'gift', title: 'مكافأة عجلة الحظ', date: 'منذ 5 أيام', amount: '+300', positive: true },
      { type: 'earned', icon: 'users', title: 'مكافأة إحالة صديق', date: 'منذ أسبوع', amount: '+200', positive: true }
    ];

    return history.map(item => `
      <div class="history-item ${item.type}">
        <div class="history-icon">
          <i class="fas fa-${item.icon}"></i>
        </div>
        <div class="history-details">
          <p class="history-title">${item.title}</p>
          <p class="history-date">${item.date}</p>
        </div>
        <div class="history-amount ${item.positive ? 'positive' : 'negative'}">${item.amount} نقطة</div>
      </div>
    `).join('');
  }

  // ============ ORDERS SECTION ============
  function loadOrdersSection() {
    const section = document.getElementById('orders');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-shopping-bag"></i>
          طلباتي
        </h1>
        <p class="section-subtitle">تتبع جميع طلباتك</p>
      </div>

      <!-- Orders Filter -->
      <div class="filter-tabs">
        <button class="filter-tab active">الكل (${userData.orders})</button>
        <button class="filter-tab">مكتملة (${userData.completedOrders})</button>
        <button class="filter-tab">قيد التنفيذ (${userData.processingOrders})</button>
        <button class="filter-tab">ملغية (${userData.cancelledOrders})</button>
      </div>

      <!-- Orders List -->
      <div class="orders-list">
        ${generateOrders()}
      </div>
    `;
  }

  function generateOrders() {
    const orders = [
      { id: 'ORD-2024-001', date: '4 يناير 2026', game: 'FIFA 24 - نسخة رقمية', platform: 'PlayStation 5 • الإصدار الأساسي', price: '$59.99', status: 'completed', statusText: '<i class="fas fa-check-circle"></i> مكتمل' },
      { id: 'ORD-2024-002', date: '2 يناير 2026', game: 'Call of Duty: Modern Warfare III', platform: 'Xbox Series X • الإصدار الفاخر', price: '$79.99', status: 'processing', statusText: '<i class="fas fa-clock"></i> قيد التنفيذ' },
      { id: 'ORD-2024-003', date: '28 ديسمبر 2025', game: 'PES 2024 - نسخة رقمية', platform: 'PlayStation 4 • الإصدار القياسي', price: '$39.99', status: 'completed', statusText: '<i class="fas fa-check-circle"></i> مكتمل' }
    ];

    return orders.map(order => `
      <div class="order-card">
        <div class="order-card-header">
          <div class="order-number">
            <span class="order-id">#${order.id}</span>
            <span class="order-date">${order.date}</span>
          </div>
          <span class="order-status-badge ${order.status}">${order.statusText}</span>
        </div>
        <div class="order-card-body">
          <div class="order-game-info">
            <div class="order-game-img">
              <i class="fas fa-gamepad"></i>
            </div>
            <div>
              <h4>${order.game}</h4>
              <p>${order.platform}</p>
            </div>
          </div>
          <div class="order-price">
            <span class="price">${order.price}</span>
          </div>
        </div>
        <div class="order-card-footer">
          <button class="order-btn secondary">عرض التفاصيل</button>
          <button class="order-btn primary" ${order.status === 'completed' ? '' : 'disabled'}>
            ${order.status === 'completed' ? 'تحميل الكود' : 'في الانتظار...'}
          </button>
        </div>
      </div>
    `).join('');
  }

  // ============ GAMES SECTION ============
  function loadGamesSection() {
    const section = document.getElementById('games');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-gamepad"></i>
          مكتبة ألعابي
        </h1>
        <p class="section-subtitle">جميع ألعابك في مكان واحد</p>
      </div>

      <!-- Games Grid -->
      <div class="games-grid">
        ${generateGames()}
      </div>
    `;
  }

  function generateGames() {
    const games = [
      { title: 'FIFA 24', platform: 'PlayStation 5', icon: 'gamepad', date: '4 يناير 2026' },
      { title: 'Call of Duty', platform: 'Xbox Series X', icon: 'trophy', date: '2 يناير 2026' },
      { title: 'PES 2024', platform: 'PlayStation 4', icon: 'futbol', date: '28 ديسمبر 2025' }
    ];

    return games.map(game => `
      <div class="game-card">
        <div class="game-image">
          <div class="game-placeholder">
            <i class="fas fa-${game.icon}"></i>
          </div>
          <div class="game-overlay">
            <button class="game-play-btn">
              <i class="fas fa-play"></i>
              لعب الآن
            </button>
          </div>
        </div>
        <div class="game-info">
          <h4 class="game-title">${game.title}</h4>
          <p class="game-platform">${game.platform}</p>
          <div class="game-meta">
            <span class="game-date">
              <i class="fas fa-calendar"></i>
              ${game.date}
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ============ REWARDS SECTION ============
  function loadRewardsSection() {
    const section = document.getElementById('rewards');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-gift"></i>
          المكافآت والجوائز
        </h1>
        <p class="section-subtitle">استبدل نقاطك بمكافآت رائعة</p>
      </div>

      <!-- Rewards Grid -->
      <div class="rewards-grid">
        ${generateRewards()}
      </div>

      <!-- Spin History -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-dice"></i>
            سجل عجلة الحظ
          </h3>
        </div>
        <div class="card-body">
          <div class="spin-history">
            ${generateSpinHistory()}
          </div>
        </div>
      </div>
    `;
  }

  function generateRewards() {
    const rewards = [
      { points: 500, icon: '<i class="fas fa-gamepad" style="font-size: 48px; color: #8b5cf6;"></i>', title: 'خصم 10% على لعبة', desc: 'احصل على خصم 10% على أي لعبة من اختيارك' },
      { points: 1000, icon: '<i class="fas fa-gift" style="font-size: 48px; color: #ec4899;"></i>', title: 'لعبة مجانية', desc: 'احصل على لعبة مجانية من قائمة مختارة' },
      { points: 1500, icon: '<i class="fas fa-credit-card" style="font-size: 48px; color: #3b82f6;"></i>', title: 'بطاقة PSN $25', desc: 'بطاقة PlayStation Network بقيمة $25' },
      { points: 2000, icon: '<i class="fas fa-crown" style="font-size: 48px; color: #f59e0b;"></i>', title: 'عضوية VIP شهر', desc: 'عضوية VIP لمدة شهر مع مزايا حصرية' }
    ];

    return rewards.map(reward => `
      <div class="reward-card">
        <div class="reward-badge">${reward.points} نقطة</div>
        <div class="reward-icon">${reward.icon}</div>
        <h4 class="reward-title">${reward.title}</h4>
        <p class="reward-desc">${reward.desc}</p>
        <button class="reward-btn" onclick="alert('سيتم إضافة نظام الاستبدال قريباً!')">استبدل الآن</button>
      </div>
    `).join('');
  }

  function generateSpinHistory() {
    const spins = [
      { prize: 'فزت بـ 300 نقطة!', date: 'منذ 5 أيام', icon: '<i class="fas fa-trophy" style="font-size: 32px; color: #f59e0b;"></i>', won: true },
      { prize: 'فزت بخصم 20%', date: 'منذ أسبوع', icon: '<i class="fas fa-gift" style="font-size: 32px; color: #10b981;"></i>', won: true },
      { prize: 'حاول مرة أخرى', date: 'منذ أسبوعين', icon: '<i class="fas fa-times-circle" style="font-size: 32px; color: #ef4444;"></i>', won: false }
    ];

    return spins.map(spin => `
      <div class="spin-item ${spin.won ? 'won' : ''}">
        <div class="spin-icon">${spin.icon}</div>
        <div class="spin-details">
          <p class="spin-prize">${spin.prize}</p>
          <p class="spin-date">${spin.date}</p>
        </div>
        <span class="spin-badge ${spin.won ? 'win' : ''}">${spin.won ? 'فوز' : 'محاولة'}</span>
      </div>
    `).join('');
  }

  // ============ REFERRALS SECTION ============
  function loadReferralsSection() {
    const section = document.getElementById('referrals');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-users"></i>
          برنامج الإحالة
        </h1>
        <p class="section-subtitle">ادع أصدقاءك واربح معاً</p>
      </div>

      <!-- Referral Stats -->
      <div class="referral-hero">
        <div class="referral-stats-grid">
          <div class="referral-stat-card">
            <i class="fas fa-users"></i>
            <div class="referral-stat-value">${userData.referrals}</div>
            <div class="referral-stat-label">إجمالي الإحالات</div>
          </div>
          <div class="referral-stat-card">
            <i class="fas fa-user-check"></i>
            <div class="referral-stat-value">${userData.activeReferrals}</div>
            <div class="referral-stat-label">إحالات نشطة</div>
          </div>
          <div class="referral-stat-card">
            <i class="fas fa-coins"></i>
            <div class="referral-stat-value">${userData.referralEarnings.toLocaleString()}</div>
            <div class="referral-stat-label">نقاط مكتسبة</div>
          </div>
        </div>

        <!-- Referral Link -->
        <div class="referral-link-card">
          <h3>
            <i class="fas fa-link"></i>
            رابط الإحالة الخاص بك
          </h3>
          <div class="referral-link-box">
            <input type="text" id="referralLink" value="https://lootohub.com/ref/${currentUser.id}" readonly>
            <button class="copy-btn" onclick="dashApp.copyReferralLink()">
              <i class="fas fa-copy"></i>
              نسخ
            </button>
          </div>
          <p class="referral-hint">شارك هذا الرابط مع أصدقائك واحصل على 200 نقطة لكل صديق يسجل!</p>
          <div class="share-buttons">
            <button class="share-btn whatsapp" onclick="dashApp.shareOnWhatsApp()">
              <i class="fab fa-whatsapp"></i>
              واتساب
            </button>
            <button class="share-btn facebook" onclick="dashApp.shareOnFacebook()">
              <i class="fab fa-facebook"></i>
              فيسبوك
            </button>
            <button class="share-btn twitter" onclick="dashApp.shareOnTwitter()">
              <i class="fab fa-twitter"></i>
              تويتر
            </button>
          </div>
        </div>
      </div>

      <!-- Referral History -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-history"></i>
            سجل الإحالات
          </h3>
        </div>
        <div class="card-body">
          <div class="referral-list">
            ${generateReferralHistory()}
          </div>
        </div>
      </div>
    `;
  }

  function generateReferralHistory() {
    const referrals = [
      { name: 'أحمد محمد', date: 'انضم منذ 3 أيام', initial: 'A' },
      { name: 'محمد علي', date: 'انضم منذ أسبوع', initial: 'M' },
      { name: 'سارة أحمد', date: 'انضمت منذ أسبوعين', initial: 'S' }
    ];

    return referrals.map(ref => `
      <div class="referral-item">
        <div class="referral-avatar">${ref.initial}</div>
        <div class="referral-info">
          <p class="referral-name">${ref.name}</p>
          <p class="referral-date">${ref.date}</p>
        </div>
        <div class="referral-earnings">+200 نقطة</div>
      </div>
    `).join('');
  }

  // ============ PROFILE SECTION ============
  function loadProfileSection() {
    const section = document.getElementById('profile');
    const joinDate = new Date(currentUser.createdAt).toLocaleDateString('ar-EG');
    
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-user-cog"></i>
          الملف الشخصي
        </h1>
        <p class="section-subtitle">إدارة معلوماتك الشخصية</p>
      </div>

      <!-- Profile Form -->
      <div class="profile-grid">
        <div class="profile-sidebar">
          <div class="profile-avatar-section">
            <div class="profile-avatar-large">${currentUser.name.charAt(0).toUpperCase()}</div>
            <button class="avatar-upload-btn">
              <i class="fas fa-camera"></i>
              تغيير الصورة
            </button>
          </div>
          <div class="profile-level-badge">
            <i class="fas fa-crown"></i>
            <div>
              <span class="level-title">عضو ذهبي</span>
              <span class="level-desc">المستوى 12</span>
            </div>
          </div>
          <div class="profile-stats-mini">
            <div class="stat-mini">
              <span class="stat-mini-value">${userData.orders}</span>
              <span class="stat-mini-label">طلب</span>
            </div>
            <div class="stat-mini">
              <span class="stat-mini-value">${userData.games}</span>
              <span class="stat-mini-label">لعبة</span>
            </div>
            <div class="stat-mini">
              <span class="stat-mini-value">${userData.referrals}</span>
              <span class="stat-mini-label">إحالة</span>
            </div>
          </div>
        </div>

        <div class="profile-main">
          <form class="profile-form" id="profileForm" onsubmit="return dashApp.saveProfile(event)">
            <div class="form-section">
              <h3 class="form-section-title">
                <i class="fas fa-user"></i>
                المعلومات الأساسية
              </h3>
              <div class="form-row">
                <div class="form-group">
                  <label>الاسم الكامل</label>
                  <input type="text" id="profileName" value="${currentUser.name}" placeholder="أدخل اسمك الكامل">
                </div>
                <div class="form-group">
                  <label>اسم المستخدم</label>
                  <input type="text" id="profileUsername" value="${currentUser.name.toLowerCase().replace(' ', '_')}" placeholder="اسم المستخدم">
                </div>
              </div>

              <div class="form-group">
                <label>البريد الإلكتروني</label>
                <input type="email" id="profileEmail" value="${currentUser.email}" readonly>
                <small>لا يمكن تغيير البريد الإلكتروني</small>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input type="tel" id="profilePhone" placeholder="+966 xxx xxx xxx">
                </div>
                <div class="form-group">
                  <label>تاريخ الميلاد</label>
                  <input type="date" id="profileBirthdate">
                </div>
              </div>

              <div class="form-group">
                <label>تاريخ التسجيل</label>
                <input type="text" value="${joinDate}" readonly>
              </div>
            </div>

            <div class="form-section">
              <h3 class="form-section-title">
                <i class="fas fa-lock"></i>
                تغيير كلمة المرور
              </h3>
              <div class="form-group">
                <label>كلمة المرور الحالية</label>
                <input type="password" id="currentPassword" placeholder="••••••••">
              </div>
              <div class="form-group">
                <label>كلمة المرور الجديدة</label>
                <input type="password" id="newPassword" placeholder="••••••••">
              </div>
              <div class="form-group">
                <label>تأكيد كلمة المرور</label>
                <input type="password" id="confirmPassword" placeholder="••••••••">
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="form-btn primary">
                <i class="fas fa-save"></i>
                حفظ التغييرات
              </button>
              <button type="button" class="form-btn secondary" onclick="dashApp.navigate('overview')">
                <i class="fas fa-times"></i>
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // ============ SUPPORT SECTION ============
  function loadSupportSection() {
    const section = document.getElementById('support');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-headset"></i>
          الدعم الفني
        </h1>
        <p class="section-subtitle">نحن هنا لمساعدتك على مدار الساعة</p>
      </div>

      <div class="support-grid">
        <!-- Contact Methods -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-phone"></i>
              طرق التواصل
            </h3>
          </div>
          <div class="card-body">
            <div class="contact-methods">
              <a href="https://wa.me/201034046979" target="_blank" class="contact-method whatsapp">
                <i class="fab fa-whatsapp"></i>
                <div>
                  <h4>واتساب</h4>
                  <p>الرد الفوري 24/7</p>
                </div>
                <i class="fas fa-arrow-left"></i>
              </a>

              <a href="mailto:support@lootohub.com" class="contact-method email">
                <i class="fas fa-envelope"></i>
                <div>
                  <h4>البريد الإلكتروني</h4>
                  <p>support@lootohub.com</p>
                </div>
                <i class="fas fa-arrow-left"></i>
              </a>

              <a href="https://wa.me/201034046979" class="contact-method chat">
                <i class="fas fa-comments"></i>
                <div>
                  <h4>الدردشة المباشرة</h4>
                  <p>تحدث مع فريق الدعم</p>
                </div>
                <i class="fas fa-arrow-left"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- New Ticket -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-ticket-alt"></i>
              فتح تذكرة دعم جديدة
            </h3>
          </div>
          <div class="card-body">
            <form class="support-form" id="supportForm" onsubmit="return dashApp.submitTicket(event)">
              <div class="form-group">
                <label>الموضوع</label>
                <select id="ticketSubject" required>
                  <option value="">اختر الموضوع</option>
                  <option>مشكلة في الطلب</option>
                  <option>استفسار عن لعبة</option>
                  <option>مشكلة في الدفع</option>
                  <option>مشكلة تقنية</option>
                  <option>أخرى</option>
                </select>
              </div>
              <div class="form-group">
                <label>الوصف</label>
                <textarea id="ticketDescription" rows="5" placeholder="اشرح مشكلتك بالتفصيل..." required></textarea>
              </div>
              <button type="submit" class="form-btn primary full">
                <i class="fas fa-paper-plane"></i>
                إرسال التذكرة
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-question-circle"></i>
            الأسئلة الشائعة
          </h3>
        </div>
        <div class="card-body">
          <div class="faq-list">
            ${generateFAQ()}
          </div>
        </div>
      </div>
    `;
  }

  function generateFAQ() {
    const faqs = [
      { q: 'كيف أستطيع شراء لعبة؟', a: 'يمكنك تصفح المتجر واختيار اللعبة المطلوبة، ثم إضافتها للسلة وإكمال عملية الدفع عبر الطرق المتاحة.' },
      { q: 'متى أستلم الكود؟', a: 'عادة يتم إرسال الكود خلال 5-15 دقيقة من تأكيد الدفع. في حالات نادرة قد يستغرق الأمر حتى 24 ساعة.' },
      { q: 'كيف أستخدم النقاط؟', a: 'يمكنك استبدال نقاطك بخصومات أو مكافآت من قسم "المكافآت" في لوحة التحكم.' },
      { q: 'هل يمكنني استرجاع أموالي؟', a: 'نعم، يمكنك طلب استرجاع الأموال خلال 24 ساعة من الشراء إذا لم يتم تفعيل الكود بعد.' }
    ];

    return faqs.map((faq, index) => `
      <div class="faq-item">
        <div class="faq-question" onclick="dashApp.toggleFAQ(${index})">
          <i class="fas fa-chevron-down"></i>
          <span>${faq.q}</span>
        </div>
        <div class="faq-answer" id="faq-${index}">
          ${faq.a}
        </div>
      </div>
    `).join('');
  }

  // ============ SETTINGS SECTION ============
  function loadSettingsSection() {
    const section = document.getElementById('settings');
    section.innerHTML = `
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-cog"></i>
          الإعدادات
        </h1>
        <p class="section-subtitle">تخصيص تجربتك في المنصة</p>
      </div>

      <div class="settings-grid">
        <!-- Notifications Settings -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-bell"></i>
              إعدادات الإشعارات
            </h3>
          </div>
          <div class="card-body">
            <div class="settings-list">
              <div class="setting-item">
                <div class="setting-info">
                  <h4>إشعارات البريد الإلكتروني</h4>
                  <p>تلقي إشعارات عبر البريد</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>إشعارات الطلبات</h4>
                  <p>تنبيهات حول حالة طلباتك</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>إشعارات العروض</h4>
                  <p>اطلع على أحدث العروض</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-shield-alt"></i>
              الخصوصية والأمان
            </h3>
          </div>
          <div class="card-body">
            <div class="settings-list">
              <div class="setting-item">
                <div class="setting-info">
                  <h4>المصادقة الثنائية</h4>
                  <p>حماية إضافية لحسابك</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>إظهار النشاط</h4>
                  <p>السماح للآخرين برؤية نشاطك</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Language & Region -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-globe"></i>
              اللغة والمنطقة
            </h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label>اللغة</label>
              <select>
                <option selected>العربية</option>
                <option>English</option>
              </select>
            </div>
            <div class="form-group">
              <label>المنطقة الزمنية</label>
              <select>
                <option selected>مصر (GMT+2)</option>
                <option>السعودية (GMT+3)</option>
                <option>الإمارات (GMT+4)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="content-card danger-zone">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-exclamation-triangle"></i>
              منطقة الخطر
            </h3>
          </div>
          <div class="card-body">
            <button class="danger-btn" onclick="dashApp.deleteAccount()">
              <i class="fas fa-trash-alt"></i>
              حذف الحساب
            </button>
            <p class="danger-warning">⚠️ تحذير: هذا الإجراء لا يمكن التراجع عنه</p>
          </div>
        </div>
      </div>
    `;
  }

  // ============ MOBILE MENU ============
  function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('dashSidebar');
    const overlay = document.getElementById('mobileOverlay');

    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMobileMenu);
  }

  function closeMobileMenu() {
    document.getElementById('dashSidebar').classList.remove('active');
    document.getElementById('mobileOverlay').classList.remove('active');
  }

  // ============ NOTIFICATIONS ============
  function setupNotifications() {
    const notifBtn = document.getElementById('notifBtn');
    const notifPanel = document.getElementById('notifPanel');
    const closeNotif = document.getElementById('closeNotif');

    notifBtn.addEventListener('click', () => {
      notifPanel.classList.toggle('active');
      loadNotifications();
    });

    closeNotif.addEventListener('click', () => {
      notifPanel.classList.remove('active');
    });
  }

  function loadNotifications() {
    const notifList = document.getElementById('notifList');
    const notifications = [
      { type: 'purple', icon: 'gift', title: 'مكافأة جديدة!', text: 'حصلت على 150 نقطة من عملية شرائك الأخيرة', time: 'منذ ساعة', unread: true },
      { type: 'green', icon: 'check-circle', title: 'طلب مكتمل', text: 'تم تسليم طلبك #ORD-2024-001 بنجاح', time: 'منذ 3 ساعات', unread: true },
      { type: 'orange', icon: 'fire', title: 'عرض خاص!', text: 'خصم 50% على جميع ألعاب EA Sports', time: 'أمس', unread: false }
    ];

    notifList.innerHTML = notifications.map(notif => `
      <div class="notif-item ${notif.unread ? 'unread' : ''}">
        <div class="notif-icon ${notif.type}">
          <i class="fas fa-${notif.icon}"></i>
        </div>
        <div class="notif-content">
          <p class="notif-title">${notif.title}</p>
          <p class="notif-text">${notif.text}</p>
          <span class="notif-time">${notif.time}</span>
        </div>
      </div>
    `).join('');
  }

  // ============ LOGOUT ============
  function setupLogout() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
      if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        AuthSystem.logout();
      }
    });
  }

  // ============ PUBLIC API ============
  window.dashApp = {
    navigate: navigateToSection,
    copyReferralLink: function() {
      const link = document.getElementById('referralLink');
      link.select();
      document.execCommand('copy');
      alert('تم نسخ رابط الإحالة!');
    },
    shareOnWhatsApp: function() {
      const link = document.getElementById('referralLink').value;
      const text = `انضم إلى البركة واحصل على ألعابك المفضلة! استخدم رابطي للحصول على نقاط مجانية: ${link}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    },
    shareOnFacebook: function() {
      const link = document.getElementById('referralLink').value;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
    },
    shareOnTwitter: function() {
      const link = document.getElementById('referralLink').value;
      const text = `انضم إلى البركة واحصل على ألعابك المفضلة!`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`, '_blank');
    },
    saveProfile: function(e) {
      e.preventDefault();
      alert('تم حفظ التغييرات بنجاح!');
      return false;
    },
    submitTicket: function(e) {
      e.preventDefault();
      alert('تم إرسال تذكرة الدعم بنجاح! سنرد عليك قريباً.');
      e.target.reset();
      return false;
    },
    toggleFAQ: function(index) {
      const answer = document.getElementById(`faq-${index}`);
      answer.classList.toggle('active');
    },
    deleteAccount: function() {
      if (confirm('هل أنت متأكد من حذف حسابك؟ لن تتمكن من استعادته!')) {
        alert('سيتم حذف حسابك خلال 24 ساعة. يمكنك إلغاء الطلب عن طريق تسجيل الدخول مرة أخرى.');
      }
    }
  };

  // Start Dashboard
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
