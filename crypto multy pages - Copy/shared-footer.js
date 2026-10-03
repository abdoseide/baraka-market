// Shared Footer Component - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
  const footerHTML = `
  <!-- Advanced Professional Footer -->
  <footer class="advanced-footer">
    <div class="container">
      <!-- Main Footer Grid -->
      <div class="footer-grid">
        <!-- About Column -->
        <div class="footer-column footer-brand">
          <div class="brand-logo">
            <img src="./icons/icon.png" alt="" class="fotimg">
            <span class="baraka-brand">البركة ماركت</span>
          </div>
          <p class="brand-description">
            سوقك اليومي الموثوق لكل احتياجات البيت، من المنتجات الطازة إلى مستلزمات المنزل، مع عروض حقيقية وتوصيل سريع.
          </p>
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-shield-check"></i>
              <span>معاملات آمنة 100%</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-truck-fast"></i>
              <span>توصيل سريع ومرن</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-leaf"></i>
              <span>منتجات مختارة بعناية</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-column">
          <h3 class="column-title">
            <i class="fas fa-link"></i>
            روابط سريعة
          </h3>
          <ul class="footer-links">
            <li><a href="games.html"><i class="fas fa-chevron-left"></i> جميع الأقسام</a></li>
            <li><a href="index.html#offers"><i class="fas fa-chevron-left"></i> العروض الخاصة</a></li>
            <li><a href="index.html#delivery"><i class="fas fa-chevron-left"></i> التوصيل</a></li>
            <li><a href="games.html"><i class="fas fa-chevron-left"></i> تسوق الآن</a></li>
            <li><a href="index.html#about"><i class="fas fa-chevron-left"></i> التوصيل والدعم</a></li>
            <li><a href="index.html#delivery"><i class="fas fa-chevron-left"></i> كيف نوصّل طلبك</a></li>
          </ul>
        </div>

        <!-- Popular Games -->
        <div class="footer-column">
          <h3 class="column-title">
            <i class="fas fa-fire"></i>
            الأقسام الأكثر طلباً
          </h3>
          <ul class="footer-links">
            <li><a href="game-detail.html?category=produce"><i class="fas fa-apple-whole"></i><span>خضار وفاكهة</span></a></li>
            <li><a href="game-detail.html?category=pantry"><i class="fas fa-basket-shopping"></i><span>بقالة أساسية</span></a></li>
            <li><a href="index.html#offers"><i class="fas fa-tags"></i><span>عروض الأسبوع</span></a></li>
            <li><a href="game-detail.html?category=care"><i class="fas fa-spray-can-sparkles"></i><span>تنظيف وعناية</span></a></li>
            <li><a href="index.html#delivery"><i class="fas fa-truck-fast"></i><span>التوصيل</span></a></li>
            <li><a href="index.html#about"><i class="fas fa-store"></i><span>من نحن</span></a></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="footer-column">
          <h3 class="column-title">
            <i class="fas fa-headset"></i>
            خدمة العملاء
          </h3>
          <ul class="footer-links">
            <li><a href="#support"><i class="fas fa-chevron-left"></i> الدعم الفني</a></li>
            <li><a href="#privacy"><i class="fas fa-chevron-left"></i> سياسة الخصوصية</a></li>
            <li><a href="#terms"><i class="fas fa-chevron-left"></i> الشروط والأحكام</a></li>
            <li><a href="#refund"><i class="fas fa-chevron-left"></i> سياسة الاسترجاع</a></li>
            <li><a href="#security"><i class="fas fa-chevron-left"></i> الأمان والحماية</a></li>
            <li><a href="#contact"><i class="fas fa-chevron-left"></i> اتصل بنا</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-column footer-contact">
          <h3 class="column-title">
            <i class="fas fa-address-card"></i>
            معلومات الاتصال
          </h3>
          <div class="contact-items">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-phone-volume"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">اتصل بنا</span>
                <a href="tel:+201034046979" class="contact-value">+20 103 404 6979</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope-open"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">البريد الإلكتروني</span>
                <a href="mailto:support@lootohub.com" class="contact-value">support@lootohub.com</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">العنوان</span>
                <span class="contact-value">مصر - القاهرة</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-business-time"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">ساعات العمل</span>
                <span class="contact-value">24/7 على مدار الساعة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="footer-newsletter">
        <div class="newsletter-wrapper">
          <div class="newsletter-header">
            <div class="newsletter-icon">
              <i class="fas fa-envelope-open-text"></i>
            </div>
            <div class="newsletter-text">
              <h3>اشترك في نشرتنا الإخبارية</h3>
              <p>احصل على آخر العروض والخصومات الحصرية مباشرة في بريدك الإلكتروني</p>
            </div>
          </div>
          <form class="newsletter-form" onsubmit="return handleNewsletterSubscribe(event)">
            <div class="input-group">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="أدخل بريدك الإلكتروني" required>
              <button type="submit">
                <i class="fas fa-paper-plane"></i>
                <span>اشترك الآن</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Social Media & Bottom -->
      <div class="footer-bottom">
        <div class="social-section">
          <h4>تابعنا على</h4>
          <div class="social-icons">
            <a href="https://www.facebook.com/LootoHub" target="_blank" class="social-icon facebook" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
              <span class="social-label">Facebook</span>
            </a>
            <a href="https://wa.me/201034046979" target="_blank" class="social-icon whatsapp" aria-label="WhatsApp">
              <i class="fab fa-whatsapp"></i>
              <span class="social-label">WhatsApp</span>
            </a>
            <a href="https://t.me/lootohub" target="_blank" class="social-icon telegram" aria-label="Telegram">
              <i class="fab fa-telegram-plane"></i>
              <span class="social-label">Telegram</span>
            </a>
            <a href="https://www.tiktok.com/@lootohub" target="_blank" class="social-icon tiktok" aria-label="TikTok">
              <i class="fab fa-tiktok"></i>
              <span class="social-label">TikTok</span>
            </a>
            <a href="https://www.instagram.com/lootohub" target="_blank" class="social-icon instagram" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
              <span class="social-label">Instagram</span>
            </a>
            <a href="https://www.youtube.com/@lootohub" target="_blank" class="social-icon youtube" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
              <span class="social-label">YouTube</span>
            </a>
          </div>
        </div>

        <div class="copyright-section">
          <div class="copyright-text">
            <p>&copy; 2025 <span class="baraka-brand">البركة ماركت</span> - جميع الحقوق محفوظة</p>
          </div>
          <div class="footer-legal">
            <a href="#privacy">الخصوصية</a>
            <span class="separator">•</span>
            <a href="#terms">الشروط</a>
            <span class="separator">•</span>
            <a href="#cookies">الكوكيز</a>
            <span class="separator">•</span>
            <a href="#sitemap">خريطة الموقع</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button class="scroll-top" id="scrollTopBtn" aria-label="العودة للأعلى">
      <i class="fas fa-arrow-up"></i>
    </button>
  </footer>

  <!-- Floating Chatbot CTA -->
  <button class="chat-toggle floating-chat" aria-label="فتح الدردشة">
    <i class="fas fa-comment-dots"></i>
  </button>

  <!-- Chatbot Widget -->
  <div class="chat-widget" role="dialog" aria-label="مساعد الدردشة">
    <div class="chat-header">
      <div class="chat-title">مساعد التسوق</div>
      <button class="chat-close" aria-label="إغلاق">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="chat-messages" id="chatMessages">
      <div class="msg bot">أهلاً بك! اسألني عن الأقسام أو التوصيل أو العروض.</div>
      <div class="quick-actions">
        <button class="chip" data-store-action="delivery">التوصيل</button>
        <button class="chip" data-store-action="prices">الأسعار</button>
        <button class="chip" data-store-action="payment">الدفع</button>
      </div>
    </div>
    <div class="chat-footer">
      <div class="chat-input-row">
        <input id="chatInput" type="text" placeholder="اكتب سؤالك هنا..." aria-label="رسالتك">
        <button id="chatSend" class="btn btn-primary" aria-label="إرسال"><i class="fas fa-paper-plane"></i></button>
      </div>
      <div class="chat-cta-buttons">
        <a href="https://wa.me/201034046979" target="_blank" class="cta-btn whatsapp" aria-label="واتساب"><i class="fab fa-whatsapp"></i> واتساب</a>
        <a href="tg://resolve?phone=201034046979" class="cta-btn telegram" aria-label="تلجرام"><i class="fab fa-telegram"></i> تلجرام</a>
        <a href="https://www.facebook.com/LootoHub/" target="_blank" class="cta-btn facebook" aria-label="فيسبوك"><i class="fab fa-facebook"></i> فيسبوك</a>
      </div>
    </div>
  </div>

  <!-- Social Proof Notification -->
  <div class="social-proof-notification" id="socialProof">
    <div class="notification-content">
      <div class="notification-icon"><i class="fas fa-shopping-basket"></i></div>
      <div class="notification-text">
        <strong id="notifName">أحمد</strong>
        <span id="notifAction">أضاف منتجات للسلة</span>
        <small id="notifTime">منذ دقيقتين</small>
      </div>
    </div>
  </div>

  <!-- Authentication Modal -->
  <div class="auth-overlay" id="authOverlay">
    <div class="auth-modal" id="authModal">
      <button class="auth-close" id="closeAuthBtn">&times;</button>
      
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="register">إنشاء حساب</button>
        <button class="auth-tab" data-tab="login">تسجيل الدخول</button>
      </div>

      <!-- Register Form -->
      <div class="auth-form-container active" id="registerForm">
        <h2>إنشاء حساب جديد</h2>
        <p class="auth-subtitle">انضم إلينا وابدأ رحلتك</p>
        
        <div class="alert alert-error" id="registerAlert"></div>
        
        <form id="registerFormElement" autocomplete="off">
          <div class="form-group">
            <label>الاسم الكامل</label>
            <input type="text" class="form-input" id="registerName" placeholder="أدخل اسمك الكامل" required>
          </div>
          
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="text" inputmode="email" class="form-input" id="registerEmail" placeholder="أدخل بريدك الإلكتروني" autocomplete="off" autocapitalize="none" spellcheck="false" required>
          </div>
          
          <div class="form-group">
            <label>كلمة المرور</label>
            <input type="text" class="form-input private-input" id="registerPassword" placeholder="أدخل كلمة مرور قوية (6 أحرف على الأقل)" autocomplete="off" autocapitalize="none" spellcheck="false" required>
          </div>
          
          <button type="submit" class="btn-submit">إنشاء الحساب</button>
        </form>
      </div>

      <!-- Login Form -->
      <div class="auth-form-container" id="loginForm">
        <h2>مرحباً بعودتك</h2>
        <p class="auth-subtitle">سجل دخولك للوصول إلى حسابك</p>
        
        <div class="alert alert-error" id="loginAlert"></div>
        
        <form id="loginFormElement" autocomplete="off">
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="text" inputmode="email" class="form-input" id="loginEmail" placeholder="أدخل بريدك الإلكتروني" autocomplete="off" autocapitalize="none" spellcheck="false" required>
          </div>
          
          <div class="form-group">
            <label>كلمة المرور</label>
            <input type="text" class="form-input private-input" id="loginPassword" placeholder="أدخل كلمة المرور" autocomplete="off" autocapitalize="none" spellcheck="false" required>
          </div>
          
          <button type="submit" class="btn-submit">تسجيل الدخول</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Toast Notification (Hidden) -->
  <div class="toast" id="toast" style="display: none;"></div>
  
  <!-- Visitor Counter Snippet -->
  <div class="counter-box" style="display:none !important;">
    <div class="counter-title">👾 GAMING STATS</div>
    <div class="counter-row"><span>Total</span><span id="total">...</span></div>
    <div class="counter-row"><span>Today</span><span id="daily">...</span></div>
    <div class="counter-row"><span>Month</span><span id="monthly">...</span></div>
  </div>
`;

  // Insert footer HTML
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
    console.log('✅ Footer HTML injected');
  }

  // Initialize newsletter subscription handler
  window.handleNewsletterSubscribe = function(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert('شكراً لاشتراكك! سنرسل لك أحدث العروض على: ' + email);
    event.target.reset();
    return false;
  };

  // Firebase and other scripts are loaded after footer
  loadFirebaseScripts();
  
  // Initialize chatbot and other features after a short delay
  setTimeout(() => {
    initializeChatbot();
    initializeAuthModal();
    initializeScrollToTop();
    console.log('✅ All footer features initialized');
  }, 150);
});

function loadFirebaseScripts() {
  if (window.__barakaVisitorTrackerLoaded || !window.supabaseCatalog?.client) return;
  window.__barakaVisitorTrackerLoaded = true;

  const client = window.supabaseCatalog.client;
  const totalEl = document.getElementById("total");
  const dailyEl = document.getElementById("daily");
  const monthlyEl = document.getElementById("monthly");

  const visitorKey = "barakaVisitorCounted:v1";
  const visitorId = localStorage.getItem("barakaVisitorId") || crypto.randomUUID();
  localStorage.setItem("barakaVisitorId", visitorId);

  async function runCounter() {
    const shouldCount = !localStorage.getItem(visitorKey);
    const { data, error } = await client.rpc("track_visitor", { p_count: shouldCount });
    if (error) throw error;
    const stats = Array.isArray(data) ? data[0] : data;
    if (!stats) throw new Error("Visitor counter returned no statistics");
    if (shouldCount) localStorage.setItem(visitorKey, "true");
    if (totalEl) totalEl.innerText = stats.total;
    if (dailyEl) dailyEl.innerText = stats.daily;
    if (monthlyEl) monthlyEl.innerText = stats.monthly;
  }

  const updatePresence = async () => {
    const { error } = await client
      .from("visitor_presence")
      .upsert({ visitor_id: visitorId, last_active: new Date().toISOString() });
    if (error) throw error;
  };

  runCounter().catch((error) => {
    console.error("[Visitor Counter] Failed to update counters:", error);
  });
  updatePresence().catch((error) => {
    console.error("[Visitor Counter] Failed to update online presence:", error);
  });
  setInterval(() => {
    updatePresence().catch((error) => {
      console.error("[Visitor Counter] Failed to update online presence:", error);
    });
  }, 15000);
}

// Chatbot Widget Functionality - USES 'open' CLASS
function initializeChatbot() {
  if (typeof window.initializeStoreChatbot === 'function') {
    window.initializeStoreChatbot();
    return;
  }
  const chatToggle = document.querySelector('.chat-toggle');
  const chatWidget = document.querySelector('.chat-widget');
  const chatClose = document.querySelector('.chat-close');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');

  if (!chatToggle || !chatWidget) {
    console.warn('⚠️ Chatbot elements not found');
    return;
  }

  console.log('✅ Chatbot elements found, initializing...');

  // Welcome message flag
  let welcomeShown = false;

  // Toggle chat visibility
  chatToggle.addEventListener('click', function() {
    chatWidget.classList.toggle('open');
    console.log('Chatbot toggled:', chatWidget.classList.contains('open'));
    if (chatWidget.classList.contains('open')) {
      setTimeout(() => chatInput?.focus(), 300);
      
      // Show welcome message on first open
      if (!welcomeShown && chatMessages) {
        welcomeShown = true;
        setTimeout(() => {
          const welcomeMsg = document.createElement('div');
          welcomeMsg.className = 'msg bot';
          welcomeMsg.innerHTML = `أهلاً بيك في البركة! 🎮😎<br>أنا هنا عشان أساعدك تشحن ألعابك بسرعة! ⚡<br><br>اختار اللي عايزه من هنا 👇${getQuickButtons()}`;
          chatMessages.appendChild(welcomeMsg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
          attachButtonHandlers();
        }, 500);
      }
    }
  });

  // Close chat
  if (chatClose) {
    chatClose.addEventListener('click', function() {
      chatWidget.classList.remove('open');
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (chatWidget.classList.contains('open') && 
        !chatWidget.contains(e.target) && 
        !chatToggle.contains(e.target)) {
      chatWidget.classList.remove('open');
    }
  });

  // Game prices database - Real prices from your website
  const gamePrices = {
    'pubg': { 
      name: 'PUBG Mobile', 
      packages: [
        '60 UC - 30 جنيه',
        '325 UC - 145 جنيه', 
        '660 UC - 285 جنيه',
        '1800 UC - 760 جنيه',
        '3850 UC - 1600 جنيه',
        '8100 UC - 3350 جنيه (عرض خاص 💥)'
      ] 
    },
    'free fire': { 
      name: 'Free Fire', 
      packages: [
        '100 Diamond - 45 جنيه',
        '310 Diamond - 135 جنيه',
        '530 Diamond - 225 جنيه',
        '1080 Diamond - 450 جنيه',
        '2200 Diamond - 900 جنيه (عرض 🔥)'
      ] 
    },
    'cod': { 
      name: 'COD Mobile', 
      packages: [
        '80 CP - 40 جنيه',
        '400 CP - 190 جنيه',
        '800 CP - 375 جنيه',
        '2000 CP - 925 جنيه',
        '5000 CP - 2300 جنيه',
        '8000+8000 CP - 5200 جنيه (عرض خاص 💥)'
      ] 
    },
    'mobile legends': { 
      name: 'Mobile Legends', 
      packages: [
        '86 Diamond - 45 جنيه',
        '172 Diamond - 90 جنيه',
        '257 Diamond - 135 جنيه',
        '514 Diamond - 270 جنيه',
        '706 Diamond - 360 جنيه',
        '2195 Diamond - 1100 جنيه (خصم 🌟)'
      ] 
    },
    'roblox': { 
      name: 'Roblox', 
      packages: [
        '400 Robux - 220 جنيه',
        '800 Robux - 440 جنيه',
        '2000 Robux - 1050 جنيه',
        '4500 Robux - 2350 جنيه',
        '10000 Robux - 5100 جنيه (عرض 🎮)'
      ] 
    },
    'genshin': { 
      name: 'Genshin Impact', 
      packages: [
        '60 Genesis - 45 جنيه',
        '330 Genesis - 235 جنيه',
        '1090 Genesis - 760 جنيه',
        '2240 Genesis - 1525 جنيه',
        '3960+1320 Genesis - 2650 جنيه',
        '6480+1600 Genesis - 4200 جنيه (خصم 💎)'
      ] 
    },
    'lords mobile': { 
      name: 'Lords Mobile', 
      packages: [
        '4700 Diamonds - 3800 جنيه',
        '11785 Diamonds - 8800 جنيه (عرض 👑)'
      ] 
    },
    'yalla ludo': { 
      name: 'Yalla Ludo', 
      packages: [
        '5500 Diamonds - 550 جنيه',
        '11100 Diamonds - 1100 جنيه',
        '27640 Diamonds - 2750 جنيه (خصم 🎲)'
      ] 
    }
  };

  // Smart response generator
  function generateResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Greetings - Egyptian style
    if (msg.match(/سلام|هاي|هلا|مرحب|صباح|مساء/)) {
      return ['أهلاً وسهلاً يا معلم! 😎 عايز تشحن إيه النهاردة؟', getQuickButtons()];
    }
    
    // Working hours
    if (msg.match(/مواعيد|ساعات العمل|متى|وقت|مفتوح/)) {
      return ['احنا شغالين من الساعة 9 الصبح لحد 2 الليل! 🌙 على راحتك يعني 😄'];
    }
    
    // Payment methods
    if (msg.match(/دفع|طريقة الدفع|ادفع ازاي|الدفع/)) {
      return ['عندنا كل طرق الدفع يا باشا! 💳\n• فودافون كاش 📱\n• محفظة فورية 💰\n• انستاباي 🏦\n• فيزا/ماستركارد 💳\n• تحويل بنكي 🏧\nكلها سهلة وآمنة 100%! 🔒'];
    }
    
    // Check for game names
    for (let game in gamePrices) {
      if (msg.includes(game)) {
        const data = gamePrices[game];
        let priceList = `أسعار ${data.name} عندنا خرافية! 🔥\n\n`;
        data.packages.forEach(pkg => {
          priceList += `• ${pkg}\n`;
        });
        priceList += '\nأسعارنا مافيش أحسن منها! 😎';
        return [priceList, getGameButtons()];
      }
    }
    
    // Price inquiries
    if (msg.match(/سعر|كام|أسعار|ثمن|price/)) {
      return ['عايز تعرف سعر لعبة معينة؟ اختار من هنا 👇', getGameButtons()];
    }
    
    // Thanks
    if (msg.match(/شكرا|تسلم|ممتاز|جميل|تمام/)) {
      return ['العفو يا حبيبي! 😊 أي خدمة تاني؟', getQuickButtons()];
    }
    
    // Help
    if (msg.match(/مساعدة|help|ساعدني|محتاج/)) {
      return ['أنا هنا عشان أساعدك! 💪\nقولي عايز:\n• أسعار الألعاب 🎮\n• طرق الدفع 💳\n• مواعيد العمل ⏰\n• شحن سريع ⚡'];
    }
    
    // Default responses - Egyptian style
    const defaults = [
      'معلش يا فندم، مش فاهم قصدك 🤔 ممكن تقول تاني؟',
      'انا موجود عشان أساعدك! جرب تسأل عن الأسعار أو طرق الدفع 😊',
      'قول يا معلم عايز إيه بالظبط؟ أسعار ولا شحن ولا إيه؟ 🎮'
    ];
    
    return [defaults[Math.floor(Math.random() * defaults.length)], getQuickButtons()];
  }
  
  // Generate quick action buttons
  function getQuickButtons() {
    return `
      <div class="chat-quick-buttons">
        <button class="chat-btn" data-action="prices">📋 الأسعار</button>
        <button class="chat-btn" data-action="payment">💳 طرق الدفع</button>
        <button class="chat-btn" data-action="hours">⏰ مواعيد العمل</button>
        <button class="chat-btn" data-action="whatsapp">📞 واتساب</button>
      </div>
    `;
  }
  
  function getGameButtons() {
    return `
      <div class="chat-quick-buttons">
        <button class="chat-btn" data-game="pubg">🎮 PUBG</button>
        <button class="chat-btn" data-game="free fire">🔫 Free Fire</button>
        <button class="chat-btn" data-game="cod">⚔️ COD</button>
        <button class="chat-btn" data-game="mobile legends">🗡️ Mobile Legends</button>
        <button class="chat-btn" data-game="roblox">🤖 Roblox</button>
        <button class="chat-btn" data-game="genshin">💎 Genshin</button>
        <button class="chat-btn" data-game="lords mobile">👑 Lords Mobile</button>
        <button class="chat-btn" data-game="yalla ludo">🎲 Yalla Ludo</button>
      </div>
    `;
  }

  // Send message function
  function sendMessage() {
    const message = chatInput?.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = message;
    chatMessages?.appendChild(userMsg);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot response after delay
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot';
      
      const [responseText, buttons] = generateResponse(message);
      botMsg.innerHTML = responseText.replace(/\n/g, '<br>');
      
      if (buttons) {
        botMsg.innerHTML += buttons;
      }
      
      chatMessages?.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Add click handlers to buttons
      attachButtonHandlers();
    }, 600);
  }
  
  // Attach handlers to chat buttons
  function attachButtonHandlers() {
    const chatBtns = document.querySelectorAll('.chat-btn');
    chatBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        const game = this.getAttribute('data-game');
        
        if (action) {
          handleAction(action);
        } else if (game) {
          chatInput.value = game;
          sendMessage();
        }
      });
    });
  }
  
  function handleAction(action) {
    const actions = {
      'prices': 'عايز أعرف الأسعار',
      'payment': 'عايز أعرف طرق الدفع',
      'hours': 'إيه مواعيد العمل؟',
      'whatsapp': 'redirect'
    };
    
    if (action === 'whatsapp') {
      window.open('https://wa.me/201034046979', '_blank');
      return;
    }
    
    chatInput.value = actions[action];
    sendMessage();
  }

  // Send button click
  if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
  }

  // Enter key to send
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Game chips click handler
  const chips = document.querySelectorAll('.quick-actions .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      const gameName = this.textContent;
      if (chatInput) {
        chatInput.value = `أريد شحن ${gameName}`;
        sendMessage();
      }
    });
  });
}

// Auth Modal Functionality
function initializeAuthModal() {
  const openAuthBtn = document.getElementById('openAuthBtn');
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  const authOverlay = document.getElementById('authOverlay');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authFormContainers = document.querySelectorAll('.auth-form-container');

  if (openAuthBtn) {
    openAuthBtn.addEventListener('click', function() {
      authOverlay?.classList.add('active');
    });
  }

  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', function() {
      authOverlay?.classList.remove('active');
    });
  }

  if (authOverlay) {
    authOverlay.addEventListener('click', function(e) {
      if (e.target === authOverlay) {
        authOverlay.classList.remove('active');
      }
    });
  }

  authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      authTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      authFormContainers.forEach(container => {
        container.classList.remove('active');
      });
      
      document.getElementById(tabName + 'Form')?.classList.add('active');
    });
  });
}

// Scroll to Top Functionality
function initializeScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
