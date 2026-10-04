/* ============================================
   PAYMENT CARDS - Modern JavaScript
   Handles: Buttons, Counters, Animations
   ============================================ */

// ===== CONFIGURATION =====
const CONFIG = {
  whatsappNumber: "201034046979",
  whatsappMessage: "السلام عليكم 👋\n\nأريد الاستفسار عن طرق الدفع المتاحة والباقات المتوفرة لديكم.\n\nشكراً لكم 🌟",
  animationDuration: 2000, // Duration for counter animation
  observerThreshold: 0.3 // When to start animations
};

// ===== COUNTER ANIMATION =====
class CounterAnimator {
  constructor(element) {
    this.element = element;
    this.targetValue = this.parseTarget(element.textContent);
    this.hasAnimated = false;
  }

  parseTarget(text) {
    // Parse numbers like "8K+", "12.5K+", "4.9" etc.
    const cleanText = text.replace(/\+/g, '').trim();
    
    if (cleanText.includes('K')) {
      return parseFloat(cleanText.replace('K', '')) * 1000;
    }
    return parseFloat(cleanText);
  }

  formatValue(value) {
    const originalText = this.element.textContent;
    
    if (originalText.includes('K')) {
      return (value / 1000).toFixed(1).replace('.0', '') + 'K+';
    }
    
    if (originalText.includes('.')) {
      return value.toFixed(1);
    }
    
    return Math.floor(value).toString();
  }

  animate() {
    if (this.hasAnimated) return;
    this.hasAnimated = true;

    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / CONFIG.animationDuration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (this.targetValue - startValue) * easeOutQuart;
      
      this.element.textContent = this.formatValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        this.element.textContent = this.formatValue(this.targetValue);
      }
    };

    requestAnimationFrame(updateCounter);
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initCounterObserver() {
  const counters = document.querySelectorAll('.stat-number');
  const counterAnimators = Array.from(counters).map(counter => new CounterAnimator(counter));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = counters.length - 1 - Array.from(counters).reverse().indexOf(entry.target);
        if (counterAnimators[index]) {
          setTimeout(() => {
            counterAnimators[index].animate();
          }, index * 100); // Stagger animation
        }
      }
    });
  }, {
    threshold: CONFIG.observerThreshold
  });

  counters.forEach(counter => observer.observe(counter));
}

// ===== PAYMENT BUTTON HANDLERS =====
class PaymentHandler {
  constructor() {
    this.initButtons();
    this.initCardHoverEffects();
  }

  initButtons() {
    console.log('🔍 Starting button initialization...');
    
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
      // WhatsApp Button
      const whatsappBtn = document.querySelector('.whatsapp-btn');
      console.log('WhatsApp button element:', whatsappBtn);
      if (whatsappBtn) {
        console.log('✅ WhatsApp button found');
        whatsappBtn.addEventListener('click', (e) => {
          console.log('🔥 WhatsApp button CLICKED!');
          this.handleWhatsApp(e);
        });
      } else {
        console.error('❌ WhatsApp button NOT found');
        console.log('All buttons with payment-btn-modern:', document.querySelectorAll('.payment-btn-modern'));
      }

      // Vodafone Button
      const vodafoneBtn = document.querySelector('.vodafone-btn');
      if (vodafoneBtn) {
        console.log('✅ Vodafone button found');
        vodafoneBtn.addEventListener('click', (e) => this.handleVodafone(e));
      }

      // InstaPay Button
      const instapayBtn = document.querySelector('.instapay-btn');
      if (instapayBtn) {
        console.log('✅ InstaPay button found');
        instapayBtn.addEventListener('click', (e) => this.handleInstaPay(e));
      }

      // Bank Button
      const bankBtn = document.querySelector('.bank-btn');
      if (bankBtn) {
        console.log('✅ Bank button found');
        bankBtn.addEventListener('click', (e) => this.handleBank(e));
      }
    }, 500);
  }

  handleWhatsApp(e) {
    console.log('🔥 WhatsApp button clicked!');
    console.log('📞 Opening WhatsApp with number:', CONFIG.whatsappNumber);
    
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    console.log('🔗 WhatsApp URL:', whatsappURL);
    
    // Add ripple effect
    if (e) {
      this.createRipple(e);
    }
    
    // Open WhatsApp immediately
    window.open(whatsappURL, '_blank');
    
    // Track analytics
    this.trackPaymentClick('WhatsApp');
  }

  handleVodafone(e) {
    const message = 'السلام عليكم 👋\n\nأرغب في إتمام عملية الدفع عن طريق *فودافون كاش*\n\nأرجو إرسال التفاصيل والخطوات اللازمة.\n\nشكراً لكم 💳';
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    this.createRipple(e);
    
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 200);
    
    this.trackPaymentClick('Vodafone Cash');
  }

  handleInstaPay(e) {
    const message = 'السلام عليكم 👋\n\nأرغب في إتمام عملية الدفع عن طريق *InstaPay*\n\nأرجو إرسال رقم المحفظة والتفاصيل المطلوبة.\n\nشكراً لكم ⚡';
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    this.createRipple(e);
    
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 200);
    
    this.trackPaymentClick('InstaPay');
  }

  handleBank(e) {
    const message = 'السلام عليكم 👋\n\nأرغب في إتمام عملية الدفع عن طريق *التحويل البنكي*\n\nأرجو إرسال بيانات الحساب البنكي والتعليمات.\n\nشكراً لكم 🏦';
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    this.createRipple(e);
    
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 200);
    
    this.trackPaymentClick('Bank Transfer');
  }

  createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple-effect 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  initCardHoverEffects() {
    const cards = document.querySelectorAll('.payment-card-modern');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addCardGlow(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeCardGlow(card);
      });
      
      // 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        this.handleCardTilt(card, e);
      });
      
      card.addEventListener('mouseleave', () => {
        this.resetCardTilt(card);
      });
    });
  }

  addCardGlow(card) {
    const theme = card.className.match(/(whatsapp|vodafone|instapay|bank)-theme/)?.[1];
    const glowColors = {
      whatsapp: 'rgba(37, 211, 102, 0.4)',
      vodafone: 'rgba(230, 0, 0, 0.4)',
      instapay: 'rgba(245, 158, 11, 0.4)',
      bank: 'rgba(6, 182, 212, 0.4)'
    };
    
    if (theme && glowColors[theme]) {
      card.style.boxShadow = `0 20px 60px ${glowColors[theme]}`;
    }
  }

  removeCardGlow(card) {
    card.style.boxShadow = '';
  }

  handleCardTilt(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  resetCardTilt(card) {
    card.style.transform = '';
  }

  trackPaymentClick(method) {
    console.log(`Payment method clicked: ${method}`);
    
    // Add your analytics tracking here
    if (typeof gtag !== 'undefined') {
      gtag('event', 'payment_method_click', {
        'method': method,
        'timestamp': new Date().toISOString()
      });
    }
  }
}

// ===== BADGE ANIMATIONS =====
function initBadgeAnimations() {
  const badges = document.querySelectorAll('.popular-ribbon, .trending-badge, .new-badge, .secure-badge');
  
  badges.forEach((badge, index) => {
    // Stagger the initial animation
    setTimeout(() => {
      badge.style.animation = 'badge-entrance 0.5s ease-out forwards';
    }, index * 100);
  });
}

// ===== ICON ROTATION =====
function initIconAnimations() {
  const icons = document.querySelectorAll('.icon-wrapper-modern');
  
  icons.forEach(icon => {
    const card = icon.closest('.payment-card-modern');
    if (!card) return;
    
    card.addEventListener('mouseenter', () => {
      icon.style.transform = 'rotateY(360deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
  });
}

// ===== TRUST SECTION ANIMATIONS =====
function initTrustAnimations() {
  const trustItems = document.querySelectorAll('.trust-item-modern');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = 'fade-in-up 0.6s ease-out forwards';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.5
  });
  
  trustItems.forEach(item => observer.observe(item));
}

// ===== ADD KEYFRAME ANIMATIONS TO DOCUMENT =====
function addAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes badge-entrance {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes fade-in-up {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

// ===== INITIALIZATION =====
function initPaymentCards() {
  console.log('🎴 Initializing Payment Cards...');
  
  // Add CSS animations
  addAnimations();
  
  // Initialize counters with observer
  initCounterObserver();
  
  // Initialize payment buttons
  new PaymentHandler();
  
  // Initialize badge animations
  initBadgeAnimations();
  
  // Initialize icon animations
  initIconAnimations();
  
  // Initialize trust section animations
  initTrustAnimations();
  
  console.log('✅ Payment Cards Initialized Successfully!');
}

// ===== AUTO-INIT ON DOM READY =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPaymentCards);
} else {
  initPaymentCards();
}

// ===== EXPORT FOR EXTERNAL USE =====
window.PaymentCards = {
  init: initPaymentCards,
  config: CONFIG
};
