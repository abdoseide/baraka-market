// PWA Installer - البركة
// نسخة محسّنة مع نافذة تثبيت بتصميم احترافي

class PWAInstaller {
  constructor() {
    this.deferredPrompt = window.__barakaDeferredPrompt || null;
    this.modalShown = false;
    this.init();
  }

  init() {
    if (!this.isHomePage()) return;

    // استدعاء معالج beforeinstallprompt قبل أي شيء آخر
    this.setupBeforeInstallPrompt();
    
    // التحقق من التثبيت
    const isInstalled = this.checkIfInstalled();
    console.log('🔍 حالة التثبيت:', isInstalled ? 'مثبت ✅' : 'غير مثبت ❌');
    console.log('📊 localStorage pwa-installed:', localStorage.getItem('pwa-installed'));
    
    // عند التثبيت الناجح
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('pwa-installed', 'true');
      this.hideInstallModal();
      this.hideHeroButton();
      console.log('✅ تطبيق مثبت بنجاح');
    });

    // ربط الزر في hero section
    const heroBtn = document.getElementById('heroInstallBtn');
    if (heroBtn) {
      if (isInstalled) this.hideHeroButton();
      else heroBtn.style.display = 'inline-flex';
      heroBtn.addEventListener('click', () => {
        this.triggerInstall();
      });
      console.log('✅ زر التحميل جاهز');
    }

    // إذا لم يكن التطبيق مثبتاً، اعرض نافذة التثبيت بعد تحميل الصفحة
    if (!isInstalled && localStorage.getItem('pwa-install-seen-v3') !== 'true') {
      setTimeout(() => {
        const stillNotInstalled = this.checkIfInstalled();
        console.log('⏱️ بعد 3 ثوان - التحقق من التثبيت:', stillNotInstalled);
        console.log('beforeinstallprompt متاح:', !!this.deferredPrompt);
        
        if (!stillNotInstalled && localStorage.getItem('pwa-install-seen-v3') !== 'true') {
          console.log('✅ التطبيق غير مثبت - سيتم عرض النافذة');
          this.createInstallModal();
        } else {
          console.log('ℹ️ التطبيق مثبت بالفعل - لن تظهر النافذة');
        }
      }, 3000);
    }
  }

  isHomePage() {
    const page = window.location.pathname.split('/').pop();
    return page === '' || page === 'index.html';
  }

  setupBeforeInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      window.__barakaDeferredPrompt = e;
      console.log('✅ beforeinstallprompt تم حفظه بنجاح');
      console.log('📱 deferredPrompt متاح:', !!this.deferredPrompt);
    });
    
    // إذا لم يتم استقبال beforeinstallprompt بعد 5 ثوان، اطبع تحذير
    setTimeout(() => {
      if (!this.deferredPrompt) {
        console.warn('⚠️ beforeinstallprompt لم يتم استقباله بعد 5 ثوان');
      }
    }, 5000);
  }

  checkIfInstalled() {
    // الفحص 1: navigator.standalone (iOS)
    if (window.navigator.standalone === true) {
      return true;
    }
    
    // الفحص 2: display-mode standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    
    // الفحص 3: localStorage
    if (localStorage.getItem('pwa-installed') === 'true') {
      return true;
    }
    
    return false;
  }

  createInstallModal() {
    if (this.modalShown) {
      console.log('⚠️ النافذة مفتوحة بالفعل');
      return;
    }

    console.log('📲 إنشاء نافذة التثبيت...');

    const oldModal = document.getElementById('pwa-install-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'pwa-install-modal';
    modal.className = 'pwa-install-modal';
    modal.innerHTML = `
      <div class="pwa-modal-overlay"></div>
      <div class="pwa-modal-content">
        <button class="pwa-modal-close" id="pwa-modal-close-btn">✕</button>
        
        <div class="pwa-modal-header">
          <img src="./icons/icon.png" alt="البركة ماركت" class="pwa-modal-logo">
          <h2>حمّل تطبيق البركة ماركت</h2>
          <p class="pwa-modal-subtitle">استمتع بتجربة أفضل وأسرع</p>
        </div>
        
        <div class="pwa-modal-features">
          <div class="pwa-feature">
            <i class="fas fa-rocket"></i>
            <span>وصول فوري وسريع</span>
          </div>
          <div class="pwa-feature">
            <i class="fas fa-mobile-alt"></i>
            <span>تجربة تطبيق كامل</span>
          </div>
          <div class="pwa-feature">
            <i class="fas fa-bell"></i>
            <span>إشعارات العروض الجديدة</span>
          </div>
          <div class="pwa-feature">
            <i class="fas fa-star"></i>
            <span>لا يحتاج مساحة كبيرة</span>
          </div>
        </div>
        
        <div class="pwa-modal-actions">
          <button class="pwa-btn-install" id="pwa-modal-install-btn">
            <i class="fas fa-download"></i>
            تحميل التطبيق الآن
          </button>
          <button class="pwa-btn-cancel" id="pwa-modal-cancel-btn">
            ربما لاحقاً
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modalShown = true;
    localStorage.setItem('pwa-install-seen-v3', 'true');

    // أضف styling إلى الـ modal
    this.addModalStyles();

    // ربط الأزرار
    document.getElementById('pwa-modal-install-btn').addEventListener('click', () => {
      this.triggerInstall();
    });

    document.getElementById('pwa-modal-cancel-btn').addEventListener('click', () => {
      this.hideInstallModal();
    });

    document.getElementById('pwa-modal-close-btn').addEventListener('click', () => {
      this.hideInstallModal();
    });

    modal.querySelector('.pwa-modal-overlay').addEventListener('click', () => {
      this.hideInstallModal();
    });

    // إضافة animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 100);
  }

  addModalStyles() {
    if (document.getElementById('pwa-modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'pwa-modal-styles';
    style.textContent = `
      #pwa-install-modal {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeInScale 0.3s ease-out;
      }

      #pwa-install-modal.show {
        opacity: 1;
      }

      .pwa-modal-overlay {
        position: absolute;
        inset: 0;
        background: rgba(16, 42, 42, 0.58);
      }

      .pwa-modal-content {
        position: relative;
        background: linear-gradient(135deg, #fffaf0 0%, #e5f2dc 100%);
        border: 1px solid #9dc99c;
        border-radius: 14px;
        padding: 20px 16px;
        max-width: 340px;
        width: 85%;
        box-shadow: 0 20px 60px rgba(16, 42, 42, 0.22), 0 0 40px rgba(22, 160, 133, 0.12);
        animation: slideUp 0.4s ease-out;
      }

      .pwa-modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: #087f5b;
        font-size: 28px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pwa-modal-close:hover {
        opacity: 1;
      }

      .pwa-modal-header {
        text-align: center;
        margin-bottom: 15px;
      }

      .pwa-modal-logo {
        width: 65px;
        height: 65px;
        object-fit: contain;
        margin-bottom: 10px;
        animation: float 2s ease-in-out infinite;
      }

      .pwa-modal-header h2 {
        font-size: 18px;
        font-weight: bold;
        color: #087f5b;
        margin: 0 0 6px 0;
      }

      .pwa-modal-subtitle {
        color: #60746f;
        font-size: 14px;
        margin: 0;
      }

      .pwa-modal-features {
        display: grid;
        gap: 8px;
        margin: 15px 0;
      }

      .pwa-feature {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: rgba(22, 160, 133, 0.09);
        border-radius: 6px;
        border-left: 3px solid #16a085;
      }

      .pwa-feature i {
        color: #16a085;
        font-size: 14px;
        flex-shrink: 0;
      }

      .pwa-feature span {
        color: #087f5b;
        font-size: 12px;
      }

      .pwa-modal-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 15px;
      }

      .pwa-btn-install,
      .pwa-btn-cancel {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }

      .pwa-btn-install {
        background: #c7e9b2;
        color: #087f5b;
        border: 2px solid #16a085;
        box-shadow: 0 8px 20px rgba(22, 160, 133, 0.18);
      }

      .pwa-btn-install:hover {
        transform: translateY(-2px);
        background: #9bd39c;
        box-shadow: 0 12px 30px rgba(22, 160, 133, 0.28);
      }

      .pwa-btn-install:active {
        transform: translateY(0);
      }

      .pwa-btn-cancel {
        background: transparent;
        color: #087f5b;
        border: 1px solid #75b987;
      }

      .pwa-btn-cancel:hover {
        background: rgba(22, 160, 133, 0.12);
        color: #087f5b;
      }

      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-15px);
        }
      }

      @media (max-width: 480px) {
        .pwa-modal-content {
          padding: 16px 14px;
          border-radius: 12px;
          max-width: 95%;
          width: 95%;
        }

        .pwa-modal-header h2 {
          font-size: 16px;
        }

        .pwa-modal-logo {
          width: 55px;
          height: 55px;
          margin-bottom: 8px;
        }

        .pwa-feature {
          padding: 6px;
          gap: 6px;
        }

        .pwa-feature span {
          font-size: 11px;
        }

        .pwa-feature i {
          font-size: 13px;
        }

        .pwa-btn-install,
        .pwa-btn-cancel {
          padding: 9px 14px;
          font-size: 12px;
        }
      }

      @media (max-width: 360px) {
        .pwa-modal-content {
          padding: 14px 12px;
        }

        .pwa-modal-logo {
          width: 50px;
          height: 50px;
        }

        .pwa-modal-header h2 {
          font-size: 15px;
        }

        .pwa-modal-subtitle {
          font-size: 10px;
        }

        .pwa-feature {
          padding: 6px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  hideInstallModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
      this.modalShown = false;
    }
  }

  hideHeroButton() {
    const btn = document.getElementById('heroInstallBtn');
    if (btn) {
      btn.style.display = 'none';
    }
  }

  triggerInstall() {
    if (!this.deferredPrompt) {
      const subtitle = document.querySelector('#pwa-install-modal .pwa-modal-subtitle');
      if (subtitle) subtitle.textContent = 'التثبيت متاح من قائمة المتصفح: افتح القائمة ثم اختر تثبيت البركة ماركت على جهازك.';
      const button = document.getElementById('heroInstallBtn');
      if (button) button.classList.add('install-help-state');
      return;
    }

    this.deferredPrompt.prompt();
    
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ تم تثبيت التطبيق بنجاح');
        localStorage.setItem('pwa-installed', 'true');
        this.hideInstallModal();
        this.hideHeroButton();
      } else {
        console.log('❌ المستخدم رفض التثبيت');
      }
      this.deferredPrompt = null;
    });
  }
}

// تشغيل الـ installer في أسرع وقت ممكن
let installerInstance = null;

function initPWAInstaller() {
  if (installerInstance) return;
  console.log('🚀 تشغيل PWA Installer');
  installerInstance = new PWAInstaller();
  console.log('✅ PWA Installer جاهز');
}

// حاول التشغيل الفوري
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPWAInstaller);
} else {
  // الـ DOM جاهز بالفعل
  initPWAInstaller();
}

// أيضاً شغّل عند window load كـ backup
window.addEventListener('load', () => {
  console.log('📄 window load event');
  if (!installerInstance) {
    initPWAInstaller();
  }
});
