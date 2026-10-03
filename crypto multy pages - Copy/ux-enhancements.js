/**
 * UX Enhancements Script
 * سكريبت تحسينات تجربة المستخدم
 * 
 * ⚠️ IMPORTANT: هذا الملف يجب أن يُحمّل بعد pwa-installer.js
 * يتم تحميله بعده لتجنب أي تضارع مع معالجات الأحداث
 */

(function() {
  'use strict';

  // تجاهل إذا كان DOM في بداية التحميل
  if (document.readyState === 'loading') {
    // انتظر قليلاً للسماح بتهيئة جميع الأحداث الأخرى أولاً
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    // DOM جاهز بالفعل
    setTimeout(initEnhancements, 100);
  }

  function initEnhancements() {
    console.log('🎨 UX Enhancements: Starting initialization');
    startEnhancements();
  }

  // ==========================================
  // 1. Reading Progress Bar
  // ==========================================
  function updateReadingProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress / 100})`;
    }
  }

  // ==========================================
  // 2. Active Section Detection
  // ==========================================
  function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const quickNavDots = document.querySelectorAll('.quick-nav-dot');
    const breadcrumb = document.getElementById('currentSection');
    const breadcrumbNav = document.getElementById('breadcrumbNav');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    // تحديث القائمة الرئيسية
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });

    // تحديث نقاط التنقل السريع
    quickNavDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-target') === currentSection) {
        dot.classList.add('active');
      }
    });

    // تحديث Breadcrumb
    if (breadcrumb && currentSection) {
      const sectionNames = {
        'home': 'الرئيسية',
        'online-games': 'الألعاب',
        'flash-deals': 'العروض',
        'reviews': 'التقييمات',
        'trust': 'الثقة والأمان',
        'wheel': 'جرب حظك',
        'loyalty': 'المكافآت',
        'share-earn': 'اربح معنا'
      };
      
      breadcrumb.textContent = sectionNames[currentSection] || 'الرئيسية';
      
      if (currentSection !== 'home' && breadcrumbNav) {
        breadcrumbNav.classList.add('show');
      } else if (breadcrumbNav) {
        breadcrumbNav.classList.remove('show');
      }
    }
  }

  // ==========================================
  // 3. Scroll Top Button
  // ==========================================
  function updateScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }

  // ==========================================
  // 4. Quick Navigation Dots Click
  // ==========================================
  function initQuickNavigation() {
    const quickNavDots = document.querySelectorAll('.quick-nav-dot');
    
    quickNavDots.forEach(dot => {
      dot.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================
  // 5. Intersection Observer للأنيميشنز
  // ==========================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-animate');
          currentObserver.unobserve(entry.target);
          
          // إضافة تأثيرات مختلفة للعناصر الفرعية
          const cards = entry.target.querySelectorAll('.game-card-premium, .deal-card, .payment-card-modern, .category-card, .product-card');
          cards.forEach((card, index) => {
            card.style.setProperty('--reveal-delay', `${Math.min(index * 60, 300)}ms`);
            card.classList.add('card-reveal');
          });
        }
      });
    }, observerOptions);

    // مراقبة جميع الأقسام
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // تهيئة العناصر
    document.querySelectorAll('.game-card-premium, .deal-card, .payment-card-modern, .category-card, .product-card').forEach(card => {
      card.classList.add('card-reveal-pending');
    });
  }

  // ==========================================
  // 6. Smooth Scroll للروابط
  // ==========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================
  // 7. Performance Monitoring
  // ==========================================
  function monitorPerformance() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateReadingProgress();
          updateScrollTopButton();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==========================================
  // 8. Lazy Loading Images Enhancement
  // ==========================================
  function enhanceLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ==========================================
  // 9. تحسين تجربة اللمس للموبايل
  // ==========================================
  function enhanceTouchExperience() {
    // Keep native touch scrolling uninterrupted; no document-level touch tracking.
  }

  // ==========================================
  // 10. تحسين Accessibility
  // ==========================================
  function enhanceAccessibility() {
    // إضافة Skip to Content
    const skipLink = document.createElement('a');
    skipLink.href = '#online-games';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'تخطي إلى المحتوى';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: #8b3dff;
      color: white;
      padding: 8px 16px;
      text-decoration: none;
      border-radius: 0 0 8px 0;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // تحسين ARIA labels
    document.querySelectorAll('section').forEach(section => {
      if (!section.getAttribute('aria-label')) {
        const heading = section.querySelector('h2');
        if (heading) {
          section.setAttribute('aria-label', heading.textContent);
        }
      }
    });
  }

  // ==========================================
  // 11. تحديث الوقت الفعلي
  // ==========================================
  function updateRealTimeElements() {
    // Let CSS animations run without forcing style recalculation on an interval.
  }

  // ==========================================
  // 12. Analytics & User Behavior
  // ==========================================
  function trackUserBehavior() {
    // Avoid layout reads and logging on every scroll; section visibility is already
    // handled by IntersectionObserver.
  }

  // ==========================================
  // التهيئة الرئيسية
  // ==========================================
  function init() {
    // انتظار تحميل DOM بالكامل
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startEnhancements);
    } else {
      startEnhancements();
    }
  }

  function startEnhancements() {
    console.log('🚀 UX Enhancements initialized');
    
    initQuickNavigation();
    initSmoothScroll();
    initScrollAnimations();
    monitorPerformance();
    enhanceLazyLoading();
    enhanceTouchExperience();
    enhanceAccessibility();
    updateRealTimeElements();
    trackUserBehavior();
    
    // تشغيل فوري للوظائف المهمة
    updateReadingProgress();
    updateActiveSection();
    updateScrollTopButton();
  }

  // بدء التهيئة بعد انتظار قصير لضمان تحميل جميع الملفات الأخرى
  setTimeout(init, 200);

})();
