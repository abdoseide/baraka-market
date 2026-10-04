// =============== GAMING LOADER CONTROLLER ===============

class GamingLoader {
  constructor() {
    this.loader = document.getElementById('gameLoader');
    this.progressBar = document.getElementById('progressBarFill');
    this.progressText = document.getElementById('progressPercentage');
    this.messageElement = document.getElementById('loadingMessage');
    this.particlesContainer = document.getElementById('loaderParticles');
    
    this.progress = 0;
    this.messages = [
      'جاري تحميل الموارد...',
      'تحميل الألعاب...',
      'تجهيز الواجهة...',
      'تحميل المحتوى...',
      'تهيئة التأثيرات...',
      'تحميل الصور...',
      'تحضير العروض...',
      'جاري الانتهاء...',
      'تقريبًا انتهينا...'
    ];
    this.currentMessageIndex = 0;
    
    // Check if this is the first visit in this session
    this.isFirstVisit = !sessionStorage.getItem('siteVisited');
    
    // Mark that site has been visited
    if (this.isFirstVisit) {
      sessionStorage.setItem('siteVisited', 'true');
    }
    
    this.init();
  }

  init() {
    // Check if current page is NOT index.html - if so, hide loader immediately
    const isIndexPage = window.location.pathname.includes('index.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname === '';
    
    if (!isIndexPage) {
      // Hide loader immediately for non-index pages
      if (this.loader) {
        this.loader.style.display = 'none';
        this.loader.remove();
      }
      return; // Don't run loader
    }
    
    // Check if loader already completed in this session
    const loaderCompleted = sessionStorage.getItem('loaderCompleted') === 'true';
    
    if (loaderCompleted) {
      // Hide loader without running it
      if (this.loader) {
        this.loader.style.display = 'none';
        this.loader.remove();
      }
      return;
    }
    
    // Create animated particles
    this.createParticles();
    
    // Start progress animation
    this.simulateLoading();
    
    // Change messages periodically
    this.startMessageRotation();
    
    // Listen for page load complete
    this.setupLoadListener();
  }

  // Create floating particles
  createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positioning
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${12 + Math.random() * 6}s`;
      
      this.particlesContainer.appendChild(particle);
    }
  }

  // Simulate loading progress in stages: 25%, 50%, 75%, 100%
  simulateLoading() {
    const stages = [25, 50, 75, 100];
    let currentStage = 0;
    
    // Set timing based on whether it's first visit or internal navigation
    let stageDelay, animationSpeed, finalDelay;
    
    if (this.isFirstVisit) {
      // First visit: أسرع بكثير (تقليل زمن اللودر لأول دخول)
      stageDelay = 400;    // كان 2500ms، الآن فاصل قصير بين كل مرحلة
      animationSpeed = 5;  // كان 50ms، سرعة أسرع لملء الشريط
      finalDelay = 200;    // كان 1500ms، إنهاء أسرع بعد الوصول لـ 100%
    } else {
      // Internal navigation: Lightning fast loading
      stageDelay = 1;      // 1ms between stages (instant!)
      animationSpeed = 1;  // Instant animation (1ms)
      finalDelay = 10;     // 10ms final delay only
    }
    
    const loadStage = () => {
      if (currentStage < stages.length) {
        const targetProgress = stages[currentStage];
        
        // Animate smoothly to target
        const interval = setInterval(() => {
          if (this.progress < targetProgress) {
            this.progress += 1;
            this.updateProgress(this.progress);
          } else {
            clearInterval(interval);
            
            // Move to next stage after pause
            currentStage++;
            if (currentStage < stages.length) {
              setTimeout(loadStage, stageDelay);
            } else {
              // All stages complete, trigger page load
              setTimeout(() => {
                this.completeLoading();
              }, finalDelay);
            }
          }
        }, animationSpeed);
      }
    };
    
    // Start loading stages
    loadStage();
  }

  // Update progress bar and text
  updateProgress(value) {
    this.progress = Math.min(value, 100);
    
    if (this.progressBar) {
      this.progressBar.style.width = `${this.progress}%`;
    }
    
    if (this.progressText) {
      this.progressText.textContent = `${Math.floor(this.progress)}%`;
    }
  }

  // Rotate loading messages
  startMessageRotation() {
    this.messageInterval = setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
      
      if (this.messageElement) {
        // Fade out
        this.messageElement.style.opacity = '0';
        
        setTimeout(() => {
          // Change message
          this.messageElement.textContent = this.messages[this.currentMessageIndex];
          // Fade in
          this.messageElement.style.opacity = '1';
        }, 300);
      }
    }, 2000);
  }

  // Setup listener for page load
  setupLoadListener() {
    // Disable auto-complete on load, let stages control it
    // Fallback removed - stages will complete naturally
  }

  // Complete loading and hide loader
  completeLoading() {
    // Clear intervals
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }

    // Complete progress to 100%
    this.updateProgress(100);

    // Show completion message
    if (this.messageElement) {
      this.messageElement.textContent = 'اكتمل التحميل! 🎮';
    }

    // Wait a bit then fade out (أسرع خروج)
    setTimeout(() => {
      this.hideLoader();
    }, 600);
  }

  // Hide loader with animation
  hideLoader() {
    if (this.loader) {
      // Mark that loader has been completed in this session
      sessionStorage.setItem('loaderCompleted', 'true');
      
      this.loader.classList.add('fade-out');
      
      // Remove from DOM after animation
      setTimeout(() => {
        this.loader.style.display = 'none';
        this.loader.remove();
      }, 500);
    }
  }

  // Public method to manually hide loader
  hide() {
    this.completeLoading();
  }

  // Public method to show loader
  show() {
    if (this.loader) {
      this.loader.style.display = 'flex';
      this.loader.classList.remove('fade-out');
      this.progress = 0;
      this.updateProgress(0);
      this.simulateLoading();
      this.startMessageRotation();
    }
  }
}

// Initialize loader when DOM is ready
let gamingLoader;

// Check if loader exists
if (document.getElementById('gameLoader')) {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      gamingLoader = new GamingLoader();
    });
  } else {
    gamingLoader = new GamingLoader();
  }
}

// Export for external use
window.GamingLoader = GamingLoader;
window.gamingLoader = gamingLoader;
