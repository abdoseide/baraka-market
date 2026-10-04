// ===== Hero Carousel =====
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.hero-carousel');
  const slides = carousel?.querySelectorAll('.hero-slide');
  const dotsContainer = carousel?.querySelector('.carousel-dots');
  let currentSlide = 0;
  const slideInterval = 5000;
  let autoPlayInterval;

  // Create dots
  if (slides && dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(n) {
    if (!slides) return;
    
    slides[currentSlide].classList.remove('active');
    dotsContainer?.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dotsContainer?.querySelectorAll('.dot')[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, slideInterval);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Navigation buttons
  const prevBtn = carousel?.querySelector('.prev');
  const nextBtn = carousel?.querySelector('.next');

  prevBtn?.addEventListener('click', () => {
    stopAutoPlay();
    goToSlide(currentSlide - 1);
    startAutoPlay();
  });

  nextBtn?.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  // Start autoplay
  if (slides && slides.length > 1) {
    startAutoPlay();
  }

  // Pause on hover
  carousel?.addEventListener('mouseenter', stopAutoPlay);
  carousel?.addEventListener('mouseleave', startAutoPlay);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Mobile Burger Menu =====
(function initBurgerMenu() {
  const burger = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');
  const overlay = document.getElementById('navOverlay');

  if (!burger || !navMenu || !overlay) return;

  const closeMenu = () => {
    navMenu.classList.remove('open');
    burger.classList.remove('active');
    overlay.classList.remove('show');
  };

  const toggleMenu = () => {
    const willOpen = !navMenu.classList.contains('open');
    navMenu.classList.toggle('open');
    burger.classList.toggle('active');
    overlay.classList.toggle('show', willOpen);
  };

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

// ===== Chatbot Toggle & Functionality =====
(function initChatbot() {
  const chatToggle = document.querySelector('.chat-toggle');
  const chatWidget = document.querySelector('.chat-widget');
  const chatClose = document.querySelector('.chat-close');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chips = document.querySelectorAll('.chip');

  if (!chatToggle || !chatWidget) return;

  const toggleChat = () => {
    chatWidget.classList.toggle('open');
    if (chatWidget.classList.contains('open') && !chatMessages.querySelector('.msg.bot:not(.initial-message)')) {
      showWelcomeMessage();
    }
  };

  const closeChat = () => {
    chatWidget.classList.remove('open');
  };

  chatToggle.addEventListener('click', toggleChat);
  if (chatClose) {
    chatClose.addEventListener('click', closeChat);
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (chatWidget.classList.contains('open') && 
        !chatWidget.contains(e.target) && 
        !chatToggle.contains(e.target)) {
      closeChat();
    }
  });

  // ===== محسّن الذكاء الاصطناعي =====
  const aiResponses = {
    'توصيل|الدليفري|يوصل|التسليم': '🚚 التوصيل عندنا سريع ومرن:\n\n✅ اختر عنوانك ووقت الاستلام\n✅ نجهز طلبك بعناية\n✅ متابعة سهلة حتى باب البيت\n\nللاستفسار عن منطقتك تواصل معنا على واتساب.',
    'عروض|خصم|تخفيض': '🏷️ عندنا عروض يومية على البقالة والخضار والمشروبات ومستلزمات البيت. افتح قسم "عروض اليوم" وشوف الاختيارات المتاحة.',
    'دفع|فلوس|كاش|بطاقة': '💳 تقدر تدفع بالطريقة الأنسب لك، ونوفر الدفع عند الاستلام حسب منطقتك. ابعت لنا على واتساب ونأكد لك التفاصيل.',
    'منتجات|أقسام|بتبيعوا|متاح': '🛒 هتلاقي عندنا بقالة أساسية، خضار وفاكهة، مشروبات وسناكس، تنظيف وعناية، مستلزمات مطبخ، وألبان ومجمدات.',
    // الأسعار والألعاب
    'pubg|ببجي': { emoji: '🔫', title: 'PUBG Mobile UC', prices: [
      { amount: '60 UC', price: 50 }, { amount: '325 UC', price: 225 }, { amount: '660 UC', price: 460 },
      { amount: '1800 UC', price: 1120 }, { amount: '3850 UC', price: 2250 }, { amount: '8100 UC', price: 4500 }
    ]},
    'cod|كول|call of duty': { emoji: '🔫', title: 'COD Mobile CP', prices: [
      { amount: '80+80 CP', price: 65 }, { amount: '400+400 CP', price: 300 }, { amount: '800+800 CP', price: 500 },
      { amount: '2000+2000 CP', price: 1400 }, { amount: '4000+4000 CP', price: 2500 }, { amount: '8000+8000 CP', price: 5200 }
    ]},
    'mobile legends|موبايل ليجندز|ml': { emoji: '⚔️', title: 'Mobile Legends Diamond', prices: [
      { amount: '51+5 Diamond', price: 55 }, { amount: '102+10 Diamond', price: 110 }, { amount: '153+15 Diamond', price: 170 },
      { amount: '303+30 Diamond', price: 310 }, { amount: '1007+156 Diamond', price: 1050 }, { amount: '2015+383 Diamond', price: 2100 }
    ]},
    'free fire|فري فاير|ff': { emoji: '🔥', title: 'Free Fire Diamond', prices: [
      { amount: '100 Diamond', price: 60 }, { amount: '210 Diamond', price: 120 }, { amount: '310 Diamond', price: 180 },
      { amount: '520 Diamond', price: 300 }, { amount: '1060 Diamond', price: 600 }, { amount: '2200 Diamond', price: 1200 }
    ]},
    'roblox': { emoji: '🎮', title: 'Roblox Robux', prices: [
      { amount: '1000 Robux', price: 580 }, { amount: '2000 Robux', price: 1100 }, { amount: '2500 Robux', price: 1300 }, { amount: '5250 Robux', price: 2600 }
    ]},
    'fc mobile|فيفا': { emoji: '⚽', title: 'FC Mobile Silver', prices: [
      { amount: '39 Silver', price: 35 }, { amount: '99 Silver', price: 50 }, { amount: '499 Silver', price: 300 },
      { amount: '999 Silver', price: 600 }, { amount: '1999 Silver', price: 1200 }, { amount: '4999 Silver', price: 2700 }
    ]},
    // ===== الأسئلة الشائعة بالعربية الفصحى =====
    'طريقة الشراء|كيفية الدفع|كيف اشترى': 'طريقة الشراء سهلة جداً:\n1️⃣ اختر اللعبة والباقة من الموقع\n2️⃣ اضغط "اشتري الآن"\n3️⃣ ستُفتح رسالة واتساب جاهزة\n4️⃣ أرسلها إلينا والشحن فوري ⚡',
    'طرق الدفع|أقبل ايه|تحويل بنكي': '💳 طرق الدفع المتاحة:\n\n🔹 فودافون كاش - فوري\n🔹 أورنج موني - فوري\n🔹 إتصالات كاش - فوري\n🔹 تحويل بنكي - في نفس اليوم\n🔹 ويسترن يونيون - فوري\n🔹 PayPal - فوري\n\nاختر الطريقة اللي تناسبك، كلهم آمنين وسريعين! ✅',
    'تفاصيل الشحن|ازاى الشحن|هيبقا ازاى': '⚡ تفاصيل الشحن الفوري:\n\n✅ بعد ما تبعت التأكيد:\n• نستقبل طلبك فوراً\n• نتحقق من البيانات (دقيقة)\n• نشحن الرصيد مباشرة على حسابك\n\n✅ الرصيد يظهر عندك في:\n• PUBG/COD: 2-5 دقائق\n• Free Fire: 1-3 دقائق\n• Mobile Legends: 2-4 دقائق\n\n✅ ما في تأخير أو مشاكل، شحن آمن وموثّق 🔐',
    'وقت الشحن|كام وقت|متى بيوصل': '⏱️ وقت الشحن الفوري:\n\n🚀 في الأغلب: 5-10 دقائق من التأكيد\n⚡ أسرع: بعض الطلبات في دقيقة واحدة!\n\n⌛ أقصى مدة: 30 دقيقة (في حالات نادرة)\n\n📞 لو تأخر: اتصل/واتس 201034046979\nنحل المشكلة فوراً ✅',
    'الأمان|آمن|أثق|مش خايف': '🛡️ أموالك آمنة معنا 100%:\n\n✅ آلاف العملاء الراضيين\n✅ شحن موثّق بكوبون موقّع\n✅ ضمان استرجاع المال لو ما وصل\n✅ دعم عملاء 24/7 بسرعة\n✅ كل الطلبات محفوظة وآمنة\n✅ بدون فيروسات أو مشاكل\n\nتقدر تشتري براحة تامة! 😊',
    'عروض|خصم|discount|فلاش': '🔥 عروضنا الحصرية:\n\n⏰ عروض فلاش: كل 6 ساعات!\n💰 خصم حتى 10% على الباقات\n🎁 هدايا مجانية مع الشراء\n🔔 اشترك بالإشعارات ما تفوتك عرض\n\n👉 العروض الحالية في قسم "العروض"\nادخل بسرعة قبل ما تخلص الكميات! ⚡',
    'هل يوجد رسوم|تكاليف إضافية|خفية': '✨ بدون رسوم إضافية:\n\n💯 السعر اللي شايفه = السعر النهائي\n🎉 لا رسوم مخفية\n✅ لا كوميشن أو تحويل\n🔒 أسعار شفافة وآمنة\n\nاللي تشوفه على الموقع = ادفع بالظبط كده!\nالحمد لله على الشفافية! 😊',
    'شكرا|شكراً|تمام|بسيطة': '😊 أهلاً وسهلاً!\nأي سؤال تاني؟ أنا هنا 24/7\nاستمتع باللعبة وخدك رصيد حلو! 🎮💪',
    
    // ===== الأسئلة الشائعة بالعامية المصرية =====
    'تحويل فودافون|vodafone|فودا': '💳 طريقة تحويل فودافون كاش:\n\n1️⃣ اطلع *110# واختر "تحويل رصيد"\n2️⃣ ادخل رقم 201034046979\n3️⃣ ادخل المبلغ المطلوب\n4️⃣ أكّد بالرقم السري\n5️⃣ ابعت لنا رسالة التأكيد\n\nسهلة وسريعة والمبلغ يوصل فوراً! ✅',
    'في حد كاتم فلوسي|ماحدش ضامن|ضايع': '🛡️ احنا ضامنين أموالك 100%:\n\n✅ كل طلب ليه رقم وكوبون موقع\n✅ لو ما وصل الرصيد = فلوسك راجعة\n✅ عندنا مرتجعات سريعة ومضمونة\n✅ دعم فني رد على طول\n✅ آلاف الناس ثقتنا بسرعتنا\n\nما تقلق، انت في أمان! 💪',
    'كام سعر الشحنة|بكام|غالي': '💰 الأسعار عندنا الأرخص:\n\n✅ أسعار تنافسية جداً\n✅ أرخص من أي موقع تاني\n✅ عروض فلاش كل يوم\n✅ ولو لقيت أرخص = نساويه ليك\n\nنحنا بنشتغل بهامش ربح قليل للسرعة والثقة! 🎯',
    'هل في ضمان|لو ما وصل|إذا ضاع': '✅ نعم في ضمان 100%:\n\n🔹 الرصيد ما وصل؟ = استرجاع فلوسك\n🔹 اتأخر كتير؟ = نحل المشكلة فوراً\n🔹 ما وصلت الرسالة؟ = نبعتها ليك برسالة جديدة\n🔹 في مشكلة تقنية؟ = نقدمك أولوية\n\nأموالك محمية معنا! 🛡️',
    'هل الموقع آمن|تطبيق|فايروس': '🔒 الموقع 100% آمن وموثوق:\n\n✅ متطور على Netlify (أفضل سرفر)\n✅ شهادة SSL أمان عالي\n✅ بدون فايروسات أو برامج خبيثة\n✅ بيانات محمية وآمنة\n✅ ما حد قدر يتحايل على التوكن الموقع\n\nتقدر تشتري براحة بلا خوف! 😊',
    'أنا مصري كويس|عايز أتأكد': '🇪🇬 احنا مصريين زي ما أنت!\n\n✅ الفريق مصري 100%\n✅ نفهم احتياجاتك المصرية\n✅ السعر بالجنيه المصري\n✅ وسائل دفع مصرية كلها\n✅ دعم عملاء مصري 24/7\n\nثقتك عندنا محفوظة يا أخ! 💪',
    'يلا بسرعة|زي ما تقول|ماتشتغلش|تمام': '⚡ نعم يا صاحب!\nاضغط على اللعبة واختر الباقة\nنحن جاهزين ننفذ فوراً!\nاحنا هنا طول الوقت! 🚀',
    'تطبيق|app|نزل البرنامج': '📱 تطبيق التطبيق:\n\n✅ الموقع نفسه يشتغل على الموبايل تمام\n✅ تقدر تضيفه للشاشة الرئيسية\n✅ بيشتغل زي التطبيق بالظبط\n✅ بدون ما تنزل حاجة من الستور\n\nافتح من المتصفح وكفاية! 😊',
    'سريع برضو|بسرعة كويسة': '⚡ سرعتنا حاجة تقول!\n\n🚀 الشحن في أقل من 10 دقائق\n💨 التسليم فوري بدون تأخير\n⚡ الدعم الفني رد على طول\n\nكل شيء سريع تمام عندنا! 🔥',
    'الدفع يا عم|دفع من هنا': '💳 الدفع سهل جداً:\n\n1️⃣ اختر اللعبة والباقة\n2️⃣ اضغط "اشتري الآن"\n3️⃣ اختر طريقة الدفع\n4️⃣ أكمل بيانات الدفع\n5️⃣ أكمل التحويل من جوالك\n\nخلاص، رصيدك موجود! 🎮',
  };

  // Add message to chat
  function addMessage(text, isBot = false, animate = false) {
    if (!chatMessages) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = isBot ? 'msg bot' : 'msg user';
    if (animate && isBot) {
      msgDiv.innerHTML = '<span class="typing-indicator"><span></span><span></span><span></span></span>';
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      setTimeout(() => {
        msgDiv.innerHTML = text;
        msgDiv.style.animation = 'slideInBot 0.3s ease';
      }, 800);
    } else {
      msgDiv.innerHTML = text;
    }
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showWelcomeMessage() {
    addMessage('👋 أهلاً وسهلاً في البركة ماركت!', true, true);
    setTimeout(() => {
      addMessage('أنا هنا لمساعدتك في:\n✅ الأقسام والمنتجات\n✅ العروض وطرق الدفع\n✅ التوصيل ومواعيد الاستلام\n\nاكتب سؤالك أو اختار من الأزرار 👆', true);
    }, 1000);
  }

  function findBestResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // البحث عن تطابق دقيق
    for (const [keywords, response] of Object.entries(aiResponses)) {
      const patterns = keywords.split('|');
      if (patterns.some(p => input.includes(p))) {
        return response;
      }
    }

    // البحث عن كلمات مفتاحية - أسئلة شائعة إضافية
    if (input.includes('أسعار') || input.includes('سعر') || input.includes('كام')) {
      return 'اكتب اسم القسم أو المنتج اللي بتدور عليه، وأنا أساعدك تلاقيه بسرعة 🛒';
    }
    if (input.includes('مساعدة') || input.includes('ساعدني') || input.includes('حاجة')) {
      return 'تمام! 💪\nأنا هنا أساعدك في:\n🔹 الأقسام والمنتجات\n🔹 العروض والأسعار\n🔹 التوصيل وطرق الدفع\nقول لي إيه اللي تحتاجه؟';
    }
    if (input.includes('حي') || input.includes('أهلاً') || input.includes('السلام')) {
      return '👋 وعليكم السلام ورحمة الله وبركاته!\nكيف أساعدك اليوم؟ 😊';
    }
    if (input.includes('شنو') || input.includes('إيه') || input.includes('ايه الخدمة')) {
      return 'احنا البركة ماركت:\n🛒 احتياجات البيت في مكان واحد\n💰 عروض وأسعار واضحة\n🚚 توصيل سريع ومرن\n🛡️ منتجات مختارة بعناية\n\nتحب تتسوق أي قسم؟';
    }
    if (input.includes('نوفر') || input.includes('خدمات') || input.includes('فيه إيه')) {
      return '🛒 الخدمات اللي عندنا:\n\n✅ أقسام متنوعة للبيت\n✅ عروض يومية وأسبوعية\n✅ توصيل لباب البيت\n✅ دعم عملاء سريع\n✅ دفع مرن وآمن\n\nتحب تبدأ منين؟ 💪';
    }

    // رد افتراضي ذكي محسّن
    return 'أسف يا صاحب، ما فهمت كويس! 😅\nحاول تكتب:\n🔹 اسم اللعبة (PUBG, COD, FF)\n🔹 السؤال واضح (أسعار، دفع، وقت)\n🔹 استخدم الأزرار أعلى الشات\n\nأنا هنا أساعدك! 💬';
  }

  function createPriceCard(gameData) {
    const prices = gameData.prices.map(p => `<li>• ${p.amount} = <strong>${p.price} ج</strong></li>`).join('');
    return `<div class="price-card">${gameData.emoji} <strong>${gameData.title}</strong></div><ul class="prices-list">${prices}</ul>`;
  }

  // Handle chip buttons
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.getAttribute('data-action');
      const text = chip.textContent;
      
      addMessage(text, false);
      
      setTimeout(() => {
        const matchedData = Object.entries(aiResponses).find(([key, val]) => key.includes(action));
        if (matchedData && matchedData[1].prices) {
          const html = createPriceCard(matchedData[1]);
          const priceDiv = document.createElement('div');
          priceDiv.className = 'msg bot';
          priceDiv.innerHTML = html;
          chatMessages.appendChild(priceDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
          
          setTimeout(() => {
            addMessage('👆 اختر الباقة وادفع براحتك! جميع الطرق متاحة 💳', true);
          }, 500);
        }
      }, 300);
    });
  });

  // Handle send button
  if (chatSend && chatInput) {
    const sendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      
      addMessage(text, false);
      chatInput.value = '';
      
      setTimeout(() => {
        const response = findBestResponse(text);
        if (typeof response === 'string') {
          addMessage(response, true, true);
        } else if (response.prices) {
          const html = createPriceCard(response);
          const priceDiv = document.createElement('div');
          priceDiv.className = 'msg bot';
          priceDiv.innerHTML = html;
          chatMessages.appendChild(priceDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 400);
    };

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
})();

// ===== Shared Cart Drawer (Navbar) =====
const CART_STORAGE_KEY = 'gameCart';

function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    console.warn('Failed to parse cart storage');
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function buildCartWhatsAppMessage(items) {
  if (!items || items.length === 0) return null;

  const grouped = items.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) acc[key] = { name: item.name, price: item.priceEGP, count: 0 };
    acc[key].count += item.quantity || 1;
    return acc;
  }, {});

  const lines = Object.values(grouped).map(entry => {
    const lineTotal = entry.price * entry.count;
    return `• ${entry.name} x${entry.count} = ${lineTotal} جنيه`;
  });

  const total = items.reduce((sum, item) => sum + (item.priceEGP * (item.quantity || 1)), 0);
  const timestamp = new Date().toLocaleString('ar-EG');

  return encodeURIComponent(`  السلام عليكم اريد شراء :\n${lines.join('\n')}\n\nالإجمالي: ${total} جنيه\nالوقت: ${timestamp}`);
}

function updateNavCartUI() {
  const cart = getStoredCart();
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartSummary = document.getElementById('cartSummary');
  const cartTotal = document.getElementById('cartTotal');
  const cartPoints = document.getElementById('cartPoints');

  if (!cartBadge) return;

  cartBadge.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (!cartItemsContainer || !cartEmpty || !cartSummary || !cartTotal || !cartPoints) return;

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItemsContainer.innerHTML = '';
    cartSummary.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartSummary.style.display = 'block';

  const total = cart.reduce((sum, item) => sum + ((item.priceEGP || 0) * (item.quantity || 1)), 0);
  const points = Math.floor(total / 50); // 1 point per 50 EGP

  cartTotal.textContent = `${total} جنيه`;
  cartPoints.textContent = `+${points}`;

  cartItemsContainer.innerHTML = cart.map((item, idx) => `
    <div class="cart-item-premium">
      <div class="cart-item-thumb">
        <img src="${item.img || 'https://via.placeholder.com/80'}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.priceEGP} جنيه × ${item.quantity || 1}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromNavCart(${idx})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function removeFromNavCart(index) {
  const cart = getStoredCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateNavCartUI();
}

function toggleCartDrawer(forceOpen = null) {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  if (forceOpen === true) drawer.classList.add('open');
  else if (forceOpen === false) drawer.classList.remove('open');
  else drawer.classList.toggle('open');
}

// Cart buttons - Wrap in DOMContentLoaded with delay to ensure shared-footer.js loads first
document.addEventListener('DOMContentLoaded', function() {
  // Add delay to ensure footer elements are injected
  setTimeout(() => {
    const cartToggleBtn = document.getElementById('cartToggle');
    const cartCloseBtn = document.getElementById('cartClose');
    const cartCheckoutBtn = document.getElementById('cartCheckout');

    if (cartToggleBtn) {
      cartToggleBtn.addEventListener('click', () => toggleCartDrawer());
    }

    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
    }

    if (cartCheckoutBtn) {
      cartCheckoutBtn.addEventListener('click', () => {
        const cart = getStoredCart();
        if (!cart.length) {
          alert('السلة فارغة! أضف بعض المنتجات أولاً.');
          return;
        }
        window.location.href = 'checkout.html';
      });
    }
  }, 200); // Delay to ensure shared-footer.js has injected elements
});

// Sync across tabs/pages
window.addEventListener('storage', (e) => {
  if (e.key === CART_STORAGE_KEY) {
    updateNavCartUI();
  }
});

// Initialize cart UI on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateNavCartUI);
} else {
  updateNavCartUI();
}

// ===== Animated Stats Counters =====
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target).toLocaleString('en-US');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString('en-US');
    }
  }, 16);
}

// Initialize counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.getAttribute('data-target'));
      if (!isNaN(target)) {
        animateCounter(entry.target, target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
  statsObserver.observe(counter);
});

// Update live stats periodically
setInterval(() => {
  const activeUsers = document.querySelector('.stat-number[data-target]');
  const completedOrders = document.querySelectorAll('.stat-number[data-target]')[1];
  
  if (activeUsers && !isNaN(parseInt(activeUsers.getAttribute('data-target')))) {
    const currentUsers = parseInt(activeUsers.getAttribute('data-target'));
    // الزيادة أو النقصان بشكل عشوائي (من -3 إلى +5)
    const change = Math.floor(Math.random() * 9) - 3; // من -3 إلى +5
    const newUsers = Math.max(50, currentUsers + change); // الحد الأدنى 50 مستخدم
    activeUsers.setAttribute('data-target', newUsers);
    activeUsers.textContent = newUsers.toLocaleString('en-US');
  }
  
  if (completedOrders && !isNaN(parseInt(completedOrders.getAttribute('data-target')))) {
    const currentOrders = parseInt(completedOrders.getAttribute('data-target'));
    const newOrders = currentOrders + Math.floor(Math.random() * 3);
    completedOrders.setAttribute('data-target', newOrders);
    completedOrders.textContent = newOrders.toLocaleString('en-US');
  }
}, 10000);

// ===== Flash Timer Countdown with Dynamic Deals Rotation =====
// مدة العداد بالساعات (يمكن تغييرها)
const FLASH_DEAL_DURATION_HOURS = 6;

// قاعدة بيانات جميع العروض المتاحة - صورة كل لعبة ثابتة دائماً
const allAvailableDeals = [
  // PUBG Deals - صورة pubg.png ثابتة (محدثة بأحدث الأسعار)
  {
    name: 'PUBG - 8100 UC',
    img: './Assestant/pubg.png',
    originalPrice: 4500,
    maxStock: 240
  },
  {
    name: 'PUBG - 5650 UC',
    img: './Assestant/pubg.png',
    originalPrice: 3380,
    maxStock: 210
  },
  {
    name: 'PUBG - 4510 UC',
    img: './Assestant/pubg.png',
    originalPrice: 2700,
    maxStock: 205
  },
  {
    name: 'PUBG - 3850 UC',
    img: './Assestant/pubg.png',
    originalPrice: 2250,
    maxStock: 200
  },
  {
    name: 'PUBG - 2460 UC',
    img: './Assestant/pubg.png',
    originalPrice: 1580,
    maxStock: 190
  },
  {
    name: 'PUBG - 1800 UC',
    img: './Assestant/pubg.png',
    originalPrice: 1130,
    maxStock: 185
  },
  {
    name: 'PUBG - 9900 UC',
    img: './Assestant/pubg.png',
    originalPrice: 5630,
    maxStock: 160
  },
  {
    name: 'PUBG - 11950 UC',
    img: './Assestant/pubg.png',
    originalPrice: 6750,
    maxStock: 145
  },
  {
    name: 'PUBG - 16200 UC',
    img: './Assestant/pubg.png',
    originalPrice: 9000,
    maxStock: 130
  },
  // Call of Duty Deals - صورة call.png ثابتة (الأسعار أكثر من 1500 جنيه)
  {
    name: 'COD Mobile - 8000+8000 CP',
    img: './Assestant/call.png',
    originalPrice: 5200,
    maxStock: 200
  },
  {
    name: 'COD Mobile - 4000+4000 CP',
    img: './Assestant/call.png',
    originalPrice: 2500,
    maxStock: 190
  },
  // Mobile Legends Deals - صورة mob.png ثابتة (الأسعار أكثر من 1500 جنيه)
  {
    name: 'Mobile Legends - 2015 Diamond+383 Bonus',
    img: './Assestant/mob.png',
    originalPrice: 2100,
    maxStock: 250
  },
  // Roblox Deals - صورة rob.png ثابتة (الأسعار أكثر من 1500 جنيه)
  {
    name: 'Roblox - 5250 Robux',
    img: './Assestant/rob.png',
    originalPrice: 2600,
    maxStock: 150
  },
  {
    name: 'Roblox - 2500 Robux',
    img: './Assestant/rob.png',
    originalPrice: 1300,
    maxStock: 150
  },
  // FIFA/FC Mobile Deals - صورة fc.png ثابتة (الأسعار أكثر من 1500 جنيه)
  {
    name: 'FC Mobile - 12000 FC Points',
    img: './Assestant/fc.png',
    originalPrice: 3500,
    maxStock: 160
  },
  {
    name: 'FC Mobile - 4600 FC Points',
    img: './Assestant/fc.png',
    originalPrice: 1400,
    maxStock: 170
  },
  // إضافة عروض أخرى بأسعار أكثر من 1500 جنيه
  {
    name: 'COD Mobile - 2000+2000 CP Special',
    img: './Assestant/call.png',
    originalPrice: 1600,
    maxStock: 180
  },
  {
    name: 'Mobile Legends - 1007 Diamond+156 Bonus Premium',
    img: './Assestant/mob.png',
    originalPrice: 1700,
    maxStock: 200
  },
  {
    name: 'Free Fire - 2200 Diamond Plus',
    img: './Assestant/free.png',
    originalPrice: 1200,
    maxStock: 180
  },
  {
    name: 'Free Fire - 3260 Diamond',
    img: './Assestant/free.png',
    originalPrice: 1800,
    maxStock: 170
  },
  {
    name: 'Free Fire - 4400 Diamond',
    img: './Assestant/free.png',
    originalPrice: 2400,
    maxStock: 165
  },
  {
    name: 'Free Fire - 6600 Diamond',
    img: './Assestant/free.png',
    originalPrice: 3600,
    maxStock: 160
  },
  // Yalla Ludo Deals - الباقات فوق 1500 جنيه
  {
    name: 'Yalla Ludo - 27,640 Diamonds',
    img: './Assestant/yl.png',
    originalPrice: 2900,
    maxStock: 160
  },
  {
    name: 'Yalla Ludo - 55,800 Diamonds',
    img: './Assestant/yl.png',
    originalPrice: 5950,
    maxStock: 140
  },
  {
    name: 'Yalla Ludo - 168,860 Diamonds',
    img: './Assestant/yl.png',
    originalPrice: 17000,
    maxStock: 100
  },
  {
    name: 'Yalla Ludo - 283,460 Diamonds',
    img: './Assestant/yl.png',
    originalPrice: 28500,
    maxStock: 80
  },
  {
    name: 'Yalla Ludo - 9,973,990 Gold',
    img: './Assestant/yl.png',
    originalPrice: 3000,
    maxStock: 150
  },
  {
    name: 'Yalla Ludo - 25,236,460 Gold',
    img: './Assestant/yl.png',
    originalPrice: 5950,
    maxStock: 140
  },
  {
    name: 'Yalla Ludo - 76,000,860 Gold',
    img: './Assestant/yl.png',
    originalPrice: 17000,
    maxStock: 100
  },
  {
    name: 'Yalla Ludo - 126,910,990 Gold',
    img: './Assestant/yl.png',
    originalPrice: 28500,
    maxStock: 80
  },
  // Genshin Impact Deals - الباقات فوق 1500 جنيه
  {
    name: 'Genshin Impact - 1980 + 260 Genesis Crystals',
    img: './Assestant/gensin.png',
    originalPrice: 1700,
    maxStock: 180
  },
  {
    name: 'Genshin Impact - 3280 + 600 Genesis Crystals',
    img: './Assestant/gensin.png',
    originalPrice: 2550,
    maxStock: 160
  },
  {
    name: 'Genshin Impact - 6480 + 1600 Genesis Crystals',
    img: './Assestant/gensin.png',
    originalPrice: 5000,
    maxStock: 150
  },
  // Lords Mobile Deals - الباقات فوق 1500 جنيه
  {
    name: 'Lords Mobile - 3928 Diamonds',
    img: './Assestant/lord.png',
    originalPrice: 2600,
    maxStock: 170
  },
  {
    name: 'Lords Mobile - 11785 Diamonds',
    img: './Assestant/lord.png',
    originalPrice: 7900,
    maxStock: 120
  },
  {
    name: 'Lords Mobile - 19642 Diamonds',
    img: './Assestant/lord.png',
    originalPrice: 13000,
    maxStock: 100
  }
];

// حفظ وقت انتهاء العرض الحالي
let flashDealEndTime = localStorage.getItem('flashDealEndTime');
if (!flashDealEndTime || new Date(parseInt(flashDealEndTime)) < new Date()) {
  // إنشاء عداد جديد وحذف العروض القديمة
  flashDealEndTime = new Date().getTime() + (FLASH_DEAL_DURATION_HOURS * 60 * 60 * 1000);
  localStorage.setItem('flashDealEndTime', flashDealEndTime);
  localStorage.removeItem('savedFlashDeals'); // حذف العروض القديمة
}

// دالة اختيار عروض عشوائية
function getRandomDeals(count = 3) {
  const shuffled = [...allAvailableDeals].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// دالة إنشاء وحفظ العروض الجديدة
function createAndSaveFlashDeals() {
  const selectedDeals = getRandomDeals(3);
  const dealsToSave = [];
  
  selectedDeals.forEach((deal, index) => {
    const discountedPrice = Math.round(deal.originalPrice * 0.95); // خصم 5%
    const soldCount = Math.floor(Math.random() * (deal.maxStock * 0.8 - deal.maxStock * 0.3) + deal.maxStock * 0.3);
    const progressPercent = Math.floor((soldCount / deal.maxStock) * 100);
    const isHot = index === 0;
    
    dealsToSave.push({
      name: deal.name,
      img: deal.img,
      originalPrice: deal.originalPrice,
      maxStock: deal.maxStock,
      discountedPrice: discountedPrice,
      soldCount: soldCount,
      progressPercent: progressPercent,
      isHot: isHot
    });
  });
  
  // حفظ العروض في localStorage
  localStorage.setItem('savedFlashDeals', JSON.stringify(dealsToSave));
  return dealsToSave;
}

// دالة عرض العروض على الصفحة
function displayFlashDeals(deals) {
  const dealsGrid = document.querySelector('.flash-deals-grid');
  if (!dealsGrid) return;
  
  dealsGrid.innerHTML = '';
  
  deals.forEach((deal) => {
    const dealCard = document.createElement('div');
    dealCard.className = `deal-card ${deal.isHot ? 'hot' : ''}`;
    dealCard.innerHTML = `
      <div class="deal-badge">خصم 5%</div>
      <img src="${deal.img}" alt="${deal.name}">
      <h3>${deal.name}</h3>
      <div class="deal-prices">
        <span class="old-price">${deal.originalPrice} جنيه</span>
        <span class="new-price">${deal.discountedPrice} جنيه</span>
      </div>
      <div class="progress-bar-deal">
        <div class="progress-fill" style="width: ${deal.progressPercent}%;"></div>
      </div>
      <p class="sold-count">تم بيع ${deal.soldCount} من ${deal.maxStock}</p>
      <button class="btn-deal" data-game="${deal.name}" data-price="${deal.discountedPrice} جنيه">اشتري الآن</button>
    `;
    
    dealsGrid.appendChild(dealCard);
  });
  
  // إعادة ربط أحداث الأزرار
  attachFlashDealButtons();
}

// دالة تحديث أو استعادة العروض
function updateFlashDeals() {
  // التحقق من وجود عروض محفوظة
  const savedDeals = localStorage.getItem('savedFlashDeals');
  
  if (savedDeals) {
    // استعادة العروض المحفوظة
    try {
      const deals = JSON.parse(savedDeals);
      displayFlashDeals(deals);
    } catch (e) {
      // في حالة حدوث خطأ، إنشاء عروض جديدة
      const newDeals = createAndSaveFlashDeals();
      displayFlashDeals(newDeals);
    }
  } else {
    // لا توجد عروض محفوظة، إنشاء عروض جديدة
    const newDeals = createAndSaveFlashDeals();
    displayFlashDeals(newDeals);
  }
}

// دالة العداد
// ===== Push Notifications للعروض الفلاش =====
class FlashDealsNotifier {
  constructor() {
    this.notificationPermission = 'default';
    this.init();
  }

  async init() {
    // التحقق من دعم الإشعارات
    if (!('Notification' in window)) {
      console.log('❌ المتصفح لا يدعم الإشعارات');
      return;
    }

    this.notificationPermission = Notification.permission;
    
    // طلب الإذن إذا لم يتم السؤال من قبل
    if (this.notificationPermission === 'default') {
      setTimeout(() => {
        this.requestPermission();
      }, 5000); // بعد 5 ثواني من دخول الموقع
    }
  }

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      this.notificationPermission = permission;
      
      if (permission === 'granted') {
        console.log('✅ تم منح إذن الإشعارات');
        this.showWelcomeNotification();
      } else {
        console.log('❌ تم رفض إذن الإشعارات');
      }
    } catch (error) {
      console.error('خطأ في طلب إذن الإشعارات:', error);
    }
  }

  showWelcomeNotification() {
    this.sendNotification(
      '🎉 أهلاً بك في البركة',
      'سنرسل لك إشعارات بالعروض الجديدة والخصومات الحصرية!',
      './icons/icon.png'
    );
  }

  sendNotification(title, body, icon = './icons/icon.png', data = {}) {
    if (this.notificationPermission !== 'granted') {
      console.log('⚠️ لا يوجد إذن للإشعارات');
      return;
    }

    // إرسال الإشعار
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // إرسال عبر Service Worker للإشعارات الأفضل
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body: body,
          icon: icon,
          badge: './icons/icon.png',
          vibrate: [200, 100, 200],
          tag: 'flash-deal-' + Date.now(),
          requireInteraction: false,
          data: data,
          actions: [
            { action: 'view', title: '👀 شاهد العروض', icon: './icons/icon.png' },
            { action: 'close', title: 'إغلاق' }
          ]
        });
      });
    } else {
      // fallback للإشعارات العادية
      const notification = new Notification(title, {
        body: body,
        icon: icon,
        badge: './icons/icon.png',
        vibrate: [200, 100, 200],
        tag: 'flash-deal',
        requireInteraction: false
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        if (data.url) {
          window.location.href = data.url;
        }
      };
    }

    console.log(`📢 تم إرسال إشعار: ${title}`);
  }

  notifyNewFlashDeals(deals) {
    if (!deals || deals.length === 0) return;

    // أخذ أول عرض كمثال
    const firstDeal = deals[0];
    const dealText = firstDeal.querySelector('h3')?.textContent || 'عروض جديدة';
    const priceText = firstDeal.querySelector('.new-price')?.textContent || '';

    this.sendNotification(
      '🔥 عروض فلاش جديدة متاحة الآن!',
      `${dealText} - ${priceText}\nاسرع قبل انتهاء الوقت! ⏰`,
      './icons/icon.png',
      { url: '#flash-deals' }
    );
  }

  notifyTimerEnding(minutesLeft) {
    if (minutesLeft === 5) {
      this.sendNotification(
        '⏰ العروض توشك على الانتهاء!',
        'باقي 5 دقائق فقط على انتهاء عروض الفلاش الحالية',
        './icons/icon.png',
        { url: '#flash-deals' }
      );
    } else if (minutesLeft === 1) {
      this.sendNotification(
        '🚨 دقيقة واحدة فقط!',
        'أسرع! العروض ستنتهي خلال دقيقة واحدة',
        './icons/icon.png',
        { url: '#flash-deals' }
      );
    }
  }
}

// إنشاء كائن الإشعارات
const flashNotifier = new FlashDealsNotifier();

function updateFlashTimer() {
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date().getTime();
  const endTime = parseInt(flashDealEndTime);
  const diff = endTime - now;

  if (diff <= 0) {
    // انتهى الوقت - تجديد العداد والعروض
    flashDealEndTime = new Date().getTime() + (FLASH_DEAL_DURATION_HOURS * 60 * 60 * 1000);
    localStorage.setItem('flashDealEndTime', flashDealEndTime);
    localStorage.removeItem('savedFlashDeals'); // حذف العروض القديمة
    
    // إنشاء عروض جديدة
    const newDeals = createAndSaveFlashDeals();
    displayFlashDeals(newDeals);
    
    // 🔔 إرسال إشعار بالعروض الجديدة
    if (typeof flashNotifier !== 'undefined') {
      setTimeout(() => {
        const dealsElements = document.querySelectorAll('.deal-card');
        flashNotifier.notifyNewFlashDeals(Array.from(dealsElements));
      }, 1000);
    }
    
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // 🔔 إشعار عند اقتراب انتهاء الوقت
  if (typeof flashNotifier !== 'undefined') {
    const totalMinutesLeft = hours * 60 + minutes;
    if (totalMinutesLeft === 5 && seconds === 0) {
      flashNotifier.notifyTimerEnding(5);
    } else if (totalMinutesLeft === 1 && seconds === 0) {
      flashNotifier.notifyTimerEnding(1);
    }
  }

  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// ربط أزرار العروض مع الكوبون والوقت
function attachFlashDealButtons() {
  document.querySelectorAll('.btn-deal').forEach(btn => {
    btn.addEventListener('click', async function(e) {
      e.preventDefault();
      const gameName = this.getAttribute('data-game');
      const priceText = this.getAttribute('data-price');
      const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
      
      // إضافة نقاط الولاء
      const pointsToAdd = Math.floor(price / 50);
      if (typeof addPoints === 'function') {
        addPoints(pointsToAdd);
      }
      
      // طلب توكن موقع من السيرفرلس (مع سقوط على الكوبون المحلي لو فشل)
      const { requestId, token, expiresAt } = await requestFlashOrderToken(gameName, price, priceText);
      
      // الحصول على الوقت الحالي
      const time = getCurrentTime();
      
      const message = `السلام عليكم، أريد طلب العرض:\n🔥 ${gameName}\n💰 ${priceText}\n⚡ عرض فلاش محدود\n🆔 رقم الطلب: ${requestId}\n🔐 الكود الموقّع: ${token}\n⏰ الوقت: ${time}\n⌛ صلاحية التوكين: ${new Date(expiresAt).toLocaleString()}`;
      const whatsappUrl = `https://wa.me/201034046979?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
}

// بدء العداد والعروض
// ⚠️ تم نقل إدارة العداد إلى flash-deals-dynamic.js لتجنب التضارب
// setInterval(updateFlashTimer, 1000); // مُوقّف - يُدار من flash-deals-dynamic.js
// updateFlashTimer(); // مُوقّف - يُدار من flash-deals-dynamic.js
// updateFlashDeals(); // مُوقّف - يُدار من flash-deals-dynamic.js
attachFlashDealButtons();

// ===== Price Calculator =====
const gameSelect = document.getElementById('gameSelect');
const amountSelect = document.getElementById('amountSelect');
const resultPrice = document.getElementById('resultPrice');
const orderNowBtn = document.getElementById('orderNowBtn');

// الأسعار الفعلية من باقاتنا
const gamePrices = {
  pubg: [
    { amount: '60 UC', price: 50 },
    { amount: '325 UC', price: 225 },
    { amount: '660 UC', price: 460 },
    { amount: '1800 UC', price: 1120 },
    { amount: '3850 UC', price: 2250 },
    { amount: '8100 UC', price: 4500 }
  ],
  cod: [
    { amount: '80+80 CP', price: 65 },
    { amount: '400+400 CP', price: 300 },
    { amount: '800+800 CP', price: 800 },
    { amount: '2000+2000 CP', price: 1400 },
    { amount: '4000+4000 CP', price: 2800 },
    { amount: '8000+8000 CP', price: 5500 }
  ],
  ml: [
    { amount: '51 Diamond+5 Bonus', price: 55 },
    { amount: '102 Diamond+10 Bonus', price: 110 },
    { amount: '153 Diamond+15 Bonus', price: 170 },
    { amount: '202 Diamond+20 Bonus', price: 210 },
    { amount: '303 Diamond+30 Bonus', price: 310 },
    { amount: '1007 Diamond+156 Bonus', price: 1050 },
    { amount: '2015 Diamond+383 Bonus', price: 2100 }
  ],
  freefire: [
    { amount: '100 Diamond', price: 60 },
    { amount: '210 Diamond', price: 120 },
    { amount: '310 Diamond', price: 180 },
    { amount: '520 Diamond', price: 300 },
    { amount: '1060 Diamond', price: 600 },
    { amount: '2200 Diamond', price: 1200 }
  ],
  roblox: [
    { amount: '1000 Robux', price: 580 },
    { amount: '2000 Robux', price: 1100 },
    { amount: '2500 Robux', price: 1300 },
    { amount: '5250 Robux', price: 2600 }
  ]
};

let selectedPackage = null;

gameSelect?.addEventListener('change', function() {
  const game = this.value;
  amountSelect.disabled = !game;
  amountSelect.innerHTML = '<option value="">-- اختر الكمية --</option>';
  resultPrice.textContent = '-- جنيه';
  orderNowBtn.disabled = true;
  selectedPackage = null;
  
  if (game && gamePrices[game]) {
    gamePrices[game].forEach((pkg, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${pkg.amount} - ${pkg.price} جنيه`;
      amountSelect.appendChild(option);
    });
  }
});

amountSelect?.addEventListener('change', function() {
  const game = gameSelect.value;
  const pkgIndex = this.value;
  
  if (game && pkgIndex !== '' && gamePrices[game]) {
    selectedPackage = gamePrices[game][pkgIndex];
    resultPrice.textContent = `${selectedPackage.price} جنيه`;
    orderNowBtn.disabled = false;
  } else {
    resultPrice.textContent = '-- جنيه';
    orderNowBtn.disabled = true;
    selectedPackage = null;
  }
});

orderNowBtn?.addEventListener('click', function() {
  if (!selectedPackage || !gameSelect.value) return;
  
  const gameName = gameSelect.options[gameSelect.selectedIndex].text;
  const price = parseFloat(selectedPackage.price);
  
  // Add loyalty points: 1 point per 50 EGP
  const pointsToAdd = Math.floor(price / 50);
  if (typeof addPoints === 'function') {
    addPoints(pointsToAdd);
  }
  
  const message = `السلام عليكم، أريد شحن:\n🎮 ${gameName}\n📦 الباقة: ${selectedPackage.amount}\n💰 السعر: ${price} جنيه`;
  const whatsappUrl = `https://wa.me/201034046979?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// ===== Order Tracking =====
const trackBtn = document.getElementById('trackBtn');
const orderIdInput = document.getElementById('orderId');
const trackingResult = document.getElementById('trackingResult');

trackBtn?.addEventListener('click', function() {
  const orderId = orderIdInput?.value.trim();
  
  if (!orderId || !trackingResult) {
    return;
  }
  
  trackingResult.style.display = 'block';
  trackingResult.innerHTML = `
    <div class="tracking-status">
      <div class="status-step active">
        <i class="fas fa-check-circle"></i>
        <span>تم استلام الطلب</span>
      </div>
      <div class="status-step active">
        <i class="fas fa-credit-card"></i>
        <span>تم تأكيد الدفع</span>
      </div>
      <div class="status-step active">
        <i class="fas fa-cog fa-spin"></i>
        <span>جاري المعالجة</span>
      </div>
      <div class="status-step">
        <i class="fas fa-check-circle"></i>
        <span>تم التسليم</span>
      </div>
    </div>
    <p class="tracking-info">رقم الطلب: #${orderId}</p>
    <p class="tracking-info">الوقت المتوقع للتسليم: 5-10 دقائق</p>
  `;
});

// ===== Reviews Slider =====
const reviewsData = [
  { name: 'أحمد محمد', avatar: 'https://i.pravatar.cc/150?img=11', rating: 5, date: 'منذ يومين', text: 'خدمة ممتازة جداً! شحنت 8100 UC لـ PUBG ووصلني الشحن في أقل من 3 دقائق. صراحة سرعة وأمانة في التعامل. شكراً جزيلاً', game: 'PUBG Mobile' },
  { name: 'سارة علي', avatar: 'https://i.pravatar.cc/150?img=5', rating: 5, date: 'منذ 3 أيام', text: 'أول مرة أتعامل معاهم وما ندمتش! الدعم الفني رد عليا بسرعة والأسعار أحسن من أي حد تاني. هكمل معاهم دايماً', game: 'Free Fire' },
  { name: 'محمود حسن', avatar: 'https://i.pravatar.cc/150?img=12', rating: 5, date: 'منذ أسبوع', text: 'ماشاء الله تبارك الله! الصراحة أمانة وسرعة في الشحن. شحنت COD Mobile والرصيد وصل على طول. ربنا يبارك لكم', game: 'COD Mobile' },
  { name: 'ياسمين خالد', avatar: 'https://i.pravatar.cc/150?img=9', rating: 5, date: 'منذ 4 أيام', text: 'تجربة رائعة! شحنت Mobile Legends أكتر من مرة وكل مرة نفس السرعة والاحترافية. شكراً على الخدمة المميزة', game: 'Mobile Legends' },
  { name: 'عمر يوسف', avatar: 'https://i.pravatar.cc/150?img=13', rating: 5, date: 'منذ 5 أيام', text: 'أفضل موقع للشحن في مصر بدون منافس! الأسعار معقولة جداً والتعامل محترم. أنصح أي حد يشحن من هنا', game: 'PUBG Mobile' },
  { name: 'نور إبراهيم', avatar: 'https://i.pravatar.cc/150?img=10', rating: 5, date: 'منذ يوم', text: 'سرعة فوق الخيال! شحنت Roblox Robux وفي خلال دقيقتين كان عندي. ما توقعتش السرعة دي أبداً. مشكورين جداً', game: 'Roblox' },
  { name: 'كريم علاء', avatar: 'https://i.pravatar.cc/150?img=14', rating: 5, date: 'منذ 3 أيام', text: 'صدقوني تعاملت مع ناس كتير بس دول أحسن ناس. أمانة وضمير في الشغل. شحنت PUBG أكتر من 5 مرات كلهم تمام', game: 'PUBG Mobile' },
  { name: 'ليلى حسين', avatar: 'https://i.pravatar.cc/150?img=23', rating: 5, date: 'منذ أسبوعين', text: 'ممتازين في كل حاجة! من الرد السريع للشحن الفوري. أسعارهم كمان كويسة مقارنة بالسوق. ربنا يوفقكم', game: 'Free Fire' },
  { name: 'باسم فراج', avatar: 'https://i.pravatar.cc/150?img=15', rating: 5, date: 'منذ 6 أيام', text: 'تجربة احترافية من البداية للنهاية. شحنت COD Mobile وكانت أسرع عملية شحن في حياتي. شكراً ليكم', game: 'COD Mobile' },
  { name: 'منى صالح', avatar: 'https://i.pravatar.cc/150?img=24', rating: 5, date: 'منذ يومين', text: 'الصراحة خدمة فوق الممتازة! الدعم الفني متعاون جداً وبيساعدك لحد ما تخلص. شحنت Mobile Legends وكان رائع', game: 'Mobile Legends' },
  { name: 'طارق عادل', avatar: 'https://i.pravatar.cc/150?img=16', rating: 5, date: 'منذ 4 أيام', text: 'موقع موثوق 100%. شحنت Free Fire أكتر من مرة ومفيش أي مشكلة خالص. السرعة والأمانة على أعلى مستوى', game: 'Free Fire' },
  { name: 'فاطمة أحمد', avatar: 'https://i.pravatar.cc/150?img=25', rating: 5, date: 'منذ 3 أيام', text: 'بجد خدمة محترمة! من أول ما طلبت لحد ما وصل الشحن كان في متابعة مستمرة. ربنا يبارك في شغلكم', game: 'Roblox' },
  { name: 'حسام الدين', avatar: 'https://i.pravatar.cc/150?img=17', rating: 5, date: 'منذ أسبوع', text: 'أسرع شحن جربته في حياتي! PUBG UC وصل في أقل من دقيقتين. الموقع سهل والتعامل راقي. شكراً جزيلاً', game: 'PUBG Mobile' },
  { name: 'رنا محمود', avatar: 'https://i.pravatar.cc/150?img=26', rating: 5, date: 'منذ 5 أيام', text: 'تعاملت معاهم كذا مرة وكل مرة نفس الجودة. أمانة وسرعة ومصداقية. أنصح بيهم بشدة', game: 'COD Mobile' },
  { name: 'أمير صلاح', avatar: 'https://i.pravatar.cc/150?img=18', rating: 5, date: 'منذ يوم', text: 'خدمة عملاء ممتازة جداً! كان عندي استفسار وردوا عليا فوراً. شحنت Mobile Legends والتجربة كانت سلسة جداً', game: 'Mobile Legends' },
  { name: 'دينا ياسر', avatar: 'https://i.pravatar.cc/150?img=27', rating: 5, date: 'منذ 3 أيام', text: 'موقع رائع بجد! الأسعار معقولة والشحن سريع. شحنت Free Fire Diamonds ووصلوا على طول. مشكورين', game: 'Free Fire' },
  { name: 'خالد رمضان', avatar: 'https://i.pravatar.cc/150?img=19', rating: 5, date: 'منذ أسبوعين', text: 'صراحة فاقوا توقعاتي! السرعة والاحترافية في التعامل. شحنت PUBG UC وكانت تجربة ممتازة. هكرر التعامل', game: 'PUBG Mobile' },
  { name: 'مريم سعيد', avatar: 'https://i.pravatar.cc/150?img=28', rating: 5, date: 'منذ 4 أيام', text: 'أحسن موقع شحن! الدعم سريع والأسعار كويسة جداً. شحنت Roblox وكان كل شيء تمام. ربنا يوفقكم', game: 'Roblox' },
  { name: 'وليد عثمان', avatar: 'https://i.pravatar.cc/150?img=20', rating: 5, date: 'منذ 6 أيام', text: 'تجربة احترافية بكل المقاييس. السرعة في الشحن والأمانة في التعامل. شحنت COD Mobile وكان ممتاز', game: 'COD Mobile' },
  { name: 'هبة فتحي', avatar: 'https://i.pravatar.cc/150?img=29', rating: 5, date: 'منذ يومين', text: 'ماشاء الله خدمة مميزة! شحنت Mobile Legends أكتر من مرة ودايماً نفس الكفاءة. شكراً على الاحترافية', game: 'Mobile Legends' },
  { name: 'زياد ماجد', avatar: 'https://i.pravatar.cc/150?img=21', rating: 5, date: 'منذ 3 أيام', text: 'موقع موثوق وسريع! شحنت PUBG UC وفي خلال دقائق كان الشحن عندي. التعامل محترم جداً. بارك الله فيكم', game: 'PUBG Mobile' },
  { name: 'سلمى طارق', avatar: 'https://i.pravatar.cc/150?img=30', rating: 5, date: 'منذ أسبوع', text: 'خدمة رائعة بكل معنى الكلمة! الدعم الفني متعاون والشحن سريع. شحنت Free Fire وكانت تجربة ممتازة', game: 'Free Fire' },
  { name: 'إبراهيم نبيل', avatar: 'https://i.pravatar.cc/150?img=22', rating: 5, date: 'منذ 5 أيام', text: 'أفضل تجربة شحن! السرعة والأمانة والاحترافية. شحنت Roblox Robux وكل حاجة تمت بسلاسة. شكراً جزيلاً', game: 'Roblox' },
  { name: 'ندى حسام', avatar: 'https://i.pravatar.cc/150?img=31', rating: 5, date: 'منذ يوم', text: 'بجد خدمة محترمة ومميزة! شحنت COD Mobile وكانت أسرع عملية شحن. الأسعار كمان معقولة جداً', game: 'COD Mobile' },
  { name: 'مصطفى كمال', avatar: 'https://i.pravatar.cc/150?img=32', rating: 5, date: 'منذ 4 أيام', text: 'تعاملت معاهم كذا مرة وكل مرة أفضل من اللي قبلها. أمانة وسرعة في الشحن. ربنا يبارك لكم', game: 'PUBG Mobile' },
  { name: 'جنى أيمن', avatar: 'https://i.pravatar.cc/150?img=33', rating: 5, date: 'منذ 3 أيام', text: 'موقع ممتاز! شحنت Mobile Legends وكان الشحن فوري. التعامل راقي والدعم متعاون. مشكورين', game: 'Mobile Legends' },
  { name: 'يوسف رأفت', avatar: 'https://i.pravatar.cc/150?img=34', rating: 5, date: 'منذ أسبوعين', text: 'سرعة وأمانة واحترافية! شحنت Free Fire Diamonds وكانت تجربة رائعة. أنصح الجميع بالتعامل معاهم', game: 'Free Fire' },
  { name: 'آية سامي', avatar: 'https://i.pravatar.cc/150?img=35', rating: 5, date: 'منذ 6 أيام', text: 'خدمة فوق الممتازة! الدعم سريع والشحن أسرع. شحنت Roblox وكل حاجة كانت مثالية. ربنا يوفقكم', game: 'Roblox' },
  { name: 'عبدالله وائل', avatar: 'https://i.pravatar.cc/150?img=36', rating: 5, date: 'منذ يومين', text: 'أحسن موقع للشحن بدون منافسة! شحنت PUBG UC والتجربة كانت سلسة من البداية للنهاية. شكراً', game: 'PUBG Mobile' },
  { name: 'ريهام عصام', avatar: 'https://i.pravatar.cc/150?img=37', rating: 5, date: 'منذ 5 أيام', text: 'تجربة احترافية 100%! السرعة في الرد والشحن الفوري. شحنت COD Mobile وكان كل شيء مثالي', game: 'COD Mobile' },
  { name: 'كمال سعد', avatar: 'https://i.pravatar.cc/150?img=38', rating: 5, date: 'منذ 3 أيام', text: 'موقع موثوق ومضمون! شحنت Mobile Legends أكتر من مرة والخدمة دايماً ممتازة. بارك الله فيكم', game: 'Mobile Legends' },
  { name: 'رشا محمد', avatar: 'https://i.pravatar.cc/150?img=39', rating: 5, date: 'منذ أسبوع', text: 'خدمة رائعة جداً! الأسعار منافسة والشحن سريع. شحنت Free Fire وكانت تجربة ممتازة. شكراً ليكم', game: 'Free Fire' },
  { name: 'هشام علي', avatar: 'https://i.pravatar.cc/150?img=40', rating: 5, date: 'منذ يوم', text: 'أفضل خدمة شحن! السرعة والأمانة والاحترافية في أعلى مستوى. شحنت PUBG UC وكان رائع', game: 'PUBG Mobile' },
  { name: 'نورهان أحمد', avatar: 'https://i.pravatar.cc/150?img=41', rating: 5, date: 'منذ 4 أيام', text: 'بجد خدمة مميزة! التعامل محترم والشحن فوري. شحنت Roblox Robux والتجربة كانت سلسة. مشكورين', game: 'Roblox' },
  { name: 'طه إبراهيم', avatar: 'https://i.pravatar.cc/150?img=42', rating: 5, date: 'منذ 6 أيام', text: 'موقع ممتاز بكل المقاييس! شحنت COD Mobile وكانت أسرع عملية شحن. الدعم كمان متعاون جداً', game: 'COD Mobile' },
  { name: 'مها يوسف', avatar: 'https://i.pravatar.cc/150?img=43', rating: 5, date: 'منذ يومين', text: 'تجربة رائعة! السرعة في الشحن والأمانة في التعامل. شحنت Mobile Legends وكان كل شيء تمام', game: 'Mobile Legends' }
];

function initReviewsSlider() {
  const slider = document.getElementById('reviewsSlider');
  const dotsContainer = document.getElementById('reviewsDots');
  
  if (!slider || !dotsContainer) {
    console.log('Slider not found');
    return;
  }

  // Show only first 3 reviews initially
  let currentPage = 0;
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  // Add all reviews to slider
  reviewsData.forEach((review, index) => {
    const card = document.createElement('div');
    card.className = 'review-card';
    if (index >= reviewsPerPage) card.style.display = 'none'; // Hide cards beyond first page
    
    let starsHTML = '';
    for (let i = 0; i < review.rating; i++) {
      starsHTML += `<i class="fas fa-star" style="--i: ${i}"></i>`;
    }
    
    card.innerHTML = `
      <div class="review-header">
        <img src="${review.avatar}" alt="${review.name}" class="review-avatar">
        <div class="review-info">
          <div class="review-name">${review.name}</div>
          <div class="review-date">${review.date}</div>
        </div>
      </div>
      <div class="review-stars">${starsHTML}</div>
      <p class="review-text">${review.text}</p>
      <div class="review-game">
        <i class="fas fa-gamepad"></i>
        <span>${review.game}</span>
      </div>
    `;
    slider.appendChild(card);
  });

  // Create dots
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToPage(i));
    dotsContainer.appendChild(dot);
  }

  function goToPage(pageIndex) {
    currentPage = pageIndex;
    const allCards = slider.querySelectorAll('.review-card');
    
    // Hide all cards
    allCards.forEach(card => card.style.display = 'none');
    
    // Show cards for current page
    const start = pageIndex * reviewsPerPage;
    const end = start + reviewsPerPage;
    for (let i = start; i < end && i < allCards.length; i++) {
      allCards[i].style.display = 'flex';
    }
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === pageIndex);
    });
  }

  // Navigation buttons
  document.querySelector('.prev-review')?.addEventListener('click', () => {
    const newPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
    goToPage(newPage);
  });

  document.querySelector('.next-review')?.addEventListener('click', () => {
    const newPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
    goToPage(newPage);
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    const newPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
    goToPage(newPage);
  }, 5000);
}

// Wait for page to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewsSlider);
} else {
  initReviewsSlider();
}

// ============ Enhanced Dynamic Recent Orders System ============
const CUSTOMERS_DATA = {
  names: ['أحمد محمد', 'سارة علي', 'محمد يوسف', 'عمر حسن', 'نور الدين', 'ياسمين أحمد', 'فاطمة أحمد', 'علي محمود', 'هناء محمد', 'خالد أحمد', 'ليلى حسن', 'سامي محمد', 'مريم أحمد', 'كريم حسين', 'دينا صلاح', 'يوسف عادل', 'نادية محمود', 'طارق فتحي'],
  games: [
    { name: 'PUBG Mobile', currency: 'UC', amounts: [60, 325, 660, 1800, 3850, 8100], icon: 'fas fa-crosshairs', filter: 'pubg', colors: ['#FF6B35', '#FF8C42'] },
    { name: 'Call of Duty', currency: 'CP', amounts: [800, 2400, 5600, 9500], icon: 'fas fa-gun', filter: 'cod', colors: ['#00D9FF', '#0099CC'] },
    { name: 'Mobile Legends', currency: '💎', amounts: [250, 625, 1400, 3100, 6000], icon: 'fas fa-dragon', filter: 'ml', colors: ['#B721FF', '#9400D3'] },
    { name: 'Free Fire', currency: '💎', amounts: [310, 520, 1080, 2200, 5600], icon: 'fas fa-fire', filter: 'ff', colors: ['#FF3333', '#CC0000'] },
    { name: 'Roblox', currency: 'Robux', amounts: [800, 2000, 4500, 10000], icon: 'fas fa-cube', filter: 'roblox', colors: ['#E8425F', '#B31E32'] },
    { name: 'FC Mobile', currency: 'FC Points', amounts: [1000, 2200, 4600, 12000], icon: 'fas fa-futbol', filter: 'fc', colors: ['#00A859', '#007A3D'] }
  ],
  avatarColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A8E6CF', '#FFD3B6', '#FFAAA5', '#FF6B9D', '#C44569', '#FEA47F', '#25CCF7', '#EAB543', '#55E6C1']
};

// Avatar image pool - realistic profile images with gender matching
const CUSTOMERS_WITH_IMAGES = [
  { name: 'أحمد محمد', image: './Assestant/w1.jpg', gender: 'male' },
  { name: 'سارة علي', image: './Assestant/p1.jpg', gender: 'female' },
  { name: 'محمد يوسف', image: './Assestant/w2.jpg', gender: 'male' },
  { name: 'عمر حسن', image: './Assestant/p2.jpg', gender: 'male' },
  { name: 'نور الدين', image: './Assestant/w15.jpg', gender: 'male' },
  { name: 'ياسمين أحمد', image: './Assestant/p15.jpg', gender: 'female' },
  { name: 'فاطمة أحمد', image: './Assestant/p3.jpg', gender: 'female' },
  { name: 'علي محمود', image: './Assestant/w5.jpg', gender: 'male' },
  { name: 'هناء محمد', image: './Assestant/p5.jpg', gender: 'female' },
  { name: 'خالد أحمد', image: './Assestant/w6.jpg', gender: 'male' },
  { name: 'ليلى حسن', image: './Assestant/p4.jpg', gender: 'female' },
  { name: 'سامي محمد', image: './Assestant/w7.jpg', gender: 'male' },
  { name: 'مريم أحمد', image: './Assestant/p6.jpg', gender: 'female' },
  { name: 'كريم حسين', image: './Assestant/w8.jpg', gender: 'male' },
  { name: 'دينا صلاح', image: './Assestant/p7.jpg', gender: 'female' },
  { name: 'يوسف عادل', image: './Assestant/w9.jpg', gender: 'male' },
  { name: 'نادية محمود', image: './Assestant/p8.jpg', gender: 'female' },
  { name: 'طارق فتحي', image: './Assestant/w10.jpg', gender: 'male' },
  { name: 'ريم إبراهيم', image: './Assestant/p9.jpg', gender: 'female' },
  { name: 'محمود السيد', image: './Assestant/w12.jpg', gender: 'male' },
  { name: 'أمل عبدالله', image: './Assestant/p10.jpg', gender: 'female' },
  { name: 'إبراهيم علي', image: './Assestant/w12.jpg', gender: 'male' },
  { name: 'سامية حسن', image: './Assestant/p11.jpg', gender: 'female' },
  { name: 'فهد الأحمد', image: './Assestant/p14.jpg', gender: 'male' }
];

const AVATAR_IMAGES = CUSTOMERS_WITH_IMAGES.map(c => c.image);

// State Management
let ordersState = {
  currentFilter: 'all',
  displayedOrders: [],
  totalOrdersToday: 0,
  onlineUsers: 0,
  lastUpdate: Date.now()
};

// Generate realistic order with more details
function generateRandomOrder() {
  const customer = CUSTOMERS_WITH_IMAGES[Math.floor(Math.random() * CUSTOMERS_WITH_IMAGES.length)];
  const gameData = CUSTOMERS_DATA.games[Math.floor(Math.random() * CUSTOMERS_DATA.games.length)];
  const amount = gameData.amounts[Math.floor(Math.random() * gameData.amounts.length)];
  const minutesAgo = Math.floor(Math.random() * 45) + 1;
  const avatarColor = CUSTOMERS_DATA.avatarColors[Math.floor(Math.random() * CUSTOMERS_DATA.avatarColors.length)];
  const orderId = '#' + Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return {
    id: orderId,
    name: customer.name,
    game: gameData.name,
    gameCurrency: gameData.currency,
    amount,
    minutesAgo,
    avatarColor,
    avatarImage: customer.image,
    initials: customer.name.split(' ').map(n => n[0]).join(''),
    gameIcon: gameData.icon,
    gameFilter: gameData.filter,
    gameColors: gameData.colors,
    verified: Math.random() > 0.3 // 70% are verified users
  };
}

// Create enhanced order card with more details
function createOrderCard(order) {
  const gradientBg = `linear-gradient(135deg, ${order.gameColors[0]}15, ${order.gameColors[1]}10)`;
  
  return `
    <div class="order-card" data-filter="${order.gameFilter}" data-order-id="${order.id}">
      <div class="game-badge" style="background: linear-gradient(135deg, ${order.gameColors[0]}, ${order.gameColors[1]});">
        <i class="${order.gameIcon}"></i>
      </div>
      <div class="order-avatar" style="background: linear-gradient(135deg, ${order.avatarColor}, ${adjustBrightness(order.avatarColor, -20)}); color: white;">
        <img src="${order.avatarImage}" alt="${order.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\"font-weight: 800; font-size: 1.3rem;\\">${order.initials}</span>';" />
      </div>
      <div class="order-info">
        <h4>${order.name}</h4>
        <p>${order.amount} ${order.gameCurrency} - ${order.game}</p>
        <div class="order-footer">
          <span class="time-ago"><i class="fas fa-clock"></i> منذ ${order.minutesAgo} ${order.minutesAgo === 1 ? 'دقيقة' : 'دقائق'}</span>
          <div class="order-status completed">
            <i class="fas fa-check-circle"></i>
            <span class="order-status-text">تم التسليم</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function adjustBrightness(color, percent) {
  const num = parseInt(color.replace('#',''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Update orders display with filter support
function updateRecentOrders(append = false) {
  const carousel = document.getElementById('ordersCarousel');
  if (!carousel) return;
  
  const ordersCount = append ? 3 : 9; // Load 3 more when appending, 9 initially
  const newOrders = [];
  
  for (let i = 0; i < ordersCount; i++) {
    newOrders.push(generateRandomOrder());
  }
  
  if (append) {
    ordersState.displayedOrders.push(...newOrders);
  } else {
    ordersState.displayedOrders = newOrders;
  }
  
  renderOrders();
  updateLiveStats();
}

// Render orders based on current filter
function renderOrders() {
  const carousel = document.getElementById('ordersCarousel');
  if (!carousel) return;
  
  carousel.innerHTML = '';
  
  const filteredOrders = ordersState.currentFilter === 'all' 
    ? ordersState.displayedOrders 
    : ordersState.displayedOrders.filter(order => order.gameFilter === ordersState.currentFilter);
  
  filteredOrders.forEach(order => {
    carousel.innerHTML += createOrderCard(order);
  });
  
  // Add stagger animation
  const cards = carousel.querySelectorAll('.order-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Update live statistics
function updateLiveStats() {
  // Simulate realistic statistics
  ordersState.totalOrdersToday += Math.floor(Math.random() * 3) + 1;
  ordersState.onlineUsers = Math.floor(Math.random() * 50) + 150; // 150-200 online users
  
  const todayOrdersEl = document.getElementById('todayOrders');
  const onlineNowEl = document.getElementById('onlineNow');
  
  if (todayOrdersEl) {
    animateNumber(todayOrdersEl, ordersState.totalOrdersToday);
  }
  
  if (onlineNowEl) {
    animateNumber(onlineNowEl, ordersState.onlineUsers);
  }
}

// Animate number changes
function animateNumber(element, targetValue) {
  const currentValue = parseInt(element.textContent) || 0;
  const duration = 1000;
  const steps = 20;
  const increment = (targetValue - currentValue) / steps;
  let current = currentValue;
  let step = 0;
  
  const timer = setInterval(() => {
    step++;
    current += increment;
    element.textContent = Math.round(current);
    
    if (step >= steps) {
      element.textContent = targetValue;
      clearInterval(timer);
    }
  }, duration / steps);
}

// Show toast notification for new order
function showOrderToast(order) {
  // Disabled toast notifications as requested
  return;
  
  const toast = document.getElementById('orderToast');
  if (!toast) return;
  
  const toastTitle = toast.querySelector('.toast-title');
  const toastMessage = toast.querySelector('.toast-message');
  
  toastTitle.textContent = `🎉 عملية جديدة من ${order.name}`;
  toastMessage.textContent = `${order.amount} ${order.gameCurrency} - ${order.game}`;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 7000); // Increased to 7 seconds
}

// Setup filter buttons
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update filter and render
      ordersState.currentFilter = btn.dataset.filter;
      renderOrders();
    });
  });
}

// Setup load more button
function setupLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreOrders');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      updateRecentOrders(true);
      
      // Visual feedback
      loadMoreBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        loadMoreBtn.style.transform = 'scale(1)';
      }, 200);
    });
  }
}

// Setup toast close button
function setupToastClose() {
  const toastClose = document.querySelector('.toast-close');
  const toast = document.getElementById('orderToast');
  
  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }
}

// Simulate real-time order updates
function simulateRealTimeOrders() {
  setInterval(() => {
    const newOrder = generateRandomOrder();
    
    // Add to beginning of array
    ordersState.displayedOrders.unshift(newOrder);
    
    // Keep only last 20 orders
    if (ordersState.displayedOrders.length > 20) {
      ordersState.displayedOrders.pop();
    }
    
    renderOrders();
    showOrderToast(newOrder);
    updateLiveStats();
  }, 15000); // New order every 15 seconds (slower)
}

// Initialize recent orders system
function initRecentOrdersSystem() {
  // Initial load
  ordersState.totalOrdersToday = Math.floor(Math.random() * 100) + 250; // Start with 250-350 orders
  ordersState.onlineUsers = Math.floor(Math.random() * 50) + 150;
  
  updateRecentOrders();
  setupFilters();
  setupLoadMore();
  setupToastClose();
  
  // Start real-time simulation
  simulateRealTimeOrders();
  
  // Update stats periodically
  setInterval(updateLiveStats, 15000);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRecentOrdersSystem);
} else {
  initRecentOrdersSystem();
}

// ============ Live How-to-Charge Flow ============
const LIVE_STEPS_FLOW = [
  {
    title: 'اختيار اللعبة',
    description: 'تعرّف على الأسعار والخصومات المحدثة آلياً لأشهر الألعاب قبل بدء الطلب.',
    icon: 'fas fa-gamepad',
    accent: '#ec4899',
    eta: [2, 4],
    detail: 'الأكثر طلباً الآن: PUBG و COD'
  },
  {
    title: 'تحديد الباقة',
    description: 'اختر قيمة الشحن وشاهد التكلفة النهائية قبل الدفع مع حساب الخصومات مباشرة.',
    icon: 'fas fa-layer-group',
    accent: '#7c3aed',
    eta: [3, 5],
    detail: 'تحديث فوري لأسعار العملات'
  },
  {
    title: 'تأكيد الدفع',
    description: 'إرسال الطلب عبر واتساب أو فودافون كاش مع تحقق تلقائي من التحويل.',
    icon: 'fas fa-lock',
    accent: '#06b6d4',
    eta: [2, 4],
    detail: 'توثيق مباشر ومنخفض الأخطاء'
  },
  {
    title: 'تسليم الرصيد',
    description: 'متابعة إرسال الرصيد للحساب في لحظات مع إشعار نجاح لحظي.',
    icon: 'fas fa-bolt',
    accent: '#22c55e',
    eta: [1, 3],
    detail: 'متوسط التسليم الآن أقل من 5 دقائق'
  }
];

const STEP_STATES = [
  { key: 'active', label: 'جارٍ التنفيذ', min: 65, max: 88 },
  { key: 'done', label: 'تم التسليم', min: 90, max: 100 },
  { key: 'waiting', label: 'جاهز للبدء', min: 45, max: 65 }
];

const STEP_TICKER_MESSAGES = [
  'تأكيد دفع جديد عبر واتساب، التحويل قيد التنفيذ.',
  'تم تسليم شحنة UC الآن — نجاح فوري.',
  'مكالمة دعم سريعة تتحقق من بيانات الحساب.',
  'تحديث السعر التلقائي لباقة FC Points.',
  'عملية COD تم التحقق منها، نجهز التسليم.',
  'خطوة الدفع الآمن تعمل حالياً لطلب Roblox.',
  'تم تفعيل عرض خصم الولاء للعميل الحالي.'
];

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildStepCard(step, index) {
  const state = STEP_STATES[Math.min(index, STEP_STATES.length - 1)];
  const etaValue = randomInRange(step.eta[0], step.eta[1]);
  const meterValue = randomInRange(state.min, state.max);

  return `
    <div class="step-card step-card-live state-${state.key}" style="--accent:${step.accent};" data-step="${index + 1}" data-accent="${step.accent}" data-eta-min="${step.eta[0]}" data-eta-max="${step.eta[1]}">
      <div class="step-top">
        <div class="step-sequence">0${index + 1}</div>
        <div class="step-status-badge state-${state.key}">${state.label}</div>
      </div>
      <div class="step-body">
        <div class="step-icon-wrap" style="background: linear-gradient(145deg, ${step.accent}26, ${step.accent}12); color: #fff; box-shadow: 0 14px 40px ${step.accent}33;">
          <i class="${step.icon}"></i>
        </div>
        <div class="step-copy">
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </div>
      </div>
      <div class="step-meta-row">
        <span class="step-eta"><i class="fas fa-clock"></i> ${etaValue} ثانية</span>
        <span class="step-chip subtle"><i class="fas fa-magic"></i> ${step.detail}</span>
      </div>
      <div class="step-meter"><span style="width: ${meterValue}%; background: linear-gradient(135deg, ${step.accent}, var(--pink-primary));"></span></div>
    </div>
  `;
}

function renderLiveSteps() {
  const grid = document.getElementById('liveStepsGrid');
  if (!grid) return;

  grid.innerHTML = LIVE_STEPS_FLOW.map((step, index) => buildStepCard(step, index)).join('');
}

function updateStepsProgress() {
  const fill = document.getElementById('stepsProgressFill');
  const label = document.getElementById('stepsProgressLabel');
  const etaLabel = document.getElementById('stepsEta');

  const value = randomInRange(72, 97);

  if (fill) {
    fill.style.width = `${value}%`;
    fill.style.background = value > 90
      ? 'linear-gradient(135deg, #22c55e, #0ea5e9)'
      : 'linear-gradient(135deg, var(--purple-primary), var(--pink-primary))';
  }

  if (label) {
    label.textContent = `${value}% جاهز`;
  }

  if (etaLabel) {
    const eta = Math.max(1, Math.round((100 - value) / 6) + 1);
    etaLabel.textContent = eta.toString();
  }
}

function refreshStepDynamics() {
  const cards = document.querySelectorAll('.step-card-live');
  if (!cards.length) return;

  cards.forEach(card => {
    const state = STEP_STATES[randomInRange(0, STEP_STATES.length - 1)];
    card.classList.remove('state-active', 'state-done', 'state-waiting');
    card.classList.add(`state-${state.key}`);

    const badge = card.querySelector('.step-status-badge');
    if (badge) {
      badge.textContent = state.label;
      badge.className = `step-status-badge state-${state.key}`;
    }

    const meter = card.querySelector('.step-meter span');
    if (meter) {
      const meterValue = randomInRange(state.min, state.max);
      const accent = card.dataset.accent || 'var(--pink-primary)';
      meter.style.width = `${meterValue}%`;
      meter.style.background = `linear-gradient(135deg, ${accent}, var(--pink-primary))`;
    }

    const etaEl = card.querySelector('.step-eta');
    if (etaEl) {
      const etaMin = parseInt(card.dataset.etaMin, 10) || 2;
      const etaMax = parseInt(card.dataset.etaMax, 10) || 6;
      const nextEta = randomInRange(etaMin, etaMax);
      etaEl.innerHTML = `<i class="fas fa-clock"></i> ${nextEta} ثانية`;
    }
  });
}

function rotateStepsTicker() {
  const ticker = document.getElementById('stepsTicker');
  if (!ticker) return;

  const message = STEP_TICKER_MESSAGES[randomInRange(0, STEP_TICKER_MESSAGES.length - 1)];
  ticker.innerHTML = `<i class="fas fa-bolt"></i><span>${message}</span>`;
}

function initLiveStepsFlow() {
  renderLiveSteps();
  updateStepsProgress();
  rotateStepsTicker();
  refreshStepDynamics();

  setInterval(() => {
    refreshStepDynamics();
    updateStepsProgress();
  }, 4200);

  setInterval(rotateStepsTicker, 5200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLiveStepsFlow);
} else {
  initLiveStepsFlow();
}

// ============ Dynamic Loyalty Program System ============
let userIP = null;
let userLoyaltyData = {
    points: 0,
    tier: 'bronze',
    claimedRewards: [],
    lastActivity: Date.now()
};

// Tier system configuration
const TIERS = {
    bronze: { min: 0, max: 100, name: 'البرونزية', color: 'bronze', next: 'silver' },
    silver: { min: 100, max: 300, name: 'الفضية', color: 'silver', next: 'gold' },
    gold: { min: 300, max: 600, name: 'الذهبية', color: 'gold', next: 'platinum' },
    platinum: { min: 600, max: Infinity, name: 'البلاتينية', color: 'platinum', next: null }
};

// Rewards configuration
const REWARDS = [
    { id: 1, name: 'خصم 3%', icon: 'fas fa-gift', description: 'خصم 3% على أي عملية شراء', cost: 50, type: 'discount' },
    { id: 2, name: 'خصم 5%', icon: 'fas fa-gem', description: 'خصم 5% على أي عملية شراء', cost: 100, type: 'discount' },
    { id: 3, name: 'شحن مجاني', icon: 'fas fa-shipping-fast', description: 'احصل على شحن مجاني بقيمة 50 جنيه', cost: 200, type: 'freebie' },
    { id: 4, name: 'خصم 8%', icon: 'fas fa-star', description: 'خصم 8% على أي عملية شراء', cost: 300, type: 'discount' },
    { id: 5, name: 'بونص 50 نقطة', icon: 'fas fa-fire', description: 'احصل على 50 نقطة إضافية', cost: 400, type: 'bonus' },
    { id: 6, name: 'خصم 12%', icon: 'fas fa-crown', description: 'خصم 12% على أي عملية شراء', cost: 500, type: 'discount' },
    { id: 7, name: 'شحن VIP مجاني', icon: 'fas fa-award', description: 'شحن مجاني بقيمة 100 جنيه', cost: 600, type: 'freebie' },
    { id: 8, name: 'خصم 15%', icon: 'fas fa-trophy', description: 'خصم 15% على أي عملية شراء', cost: 800, type: 'discount' }
];

// Hash function to create customer ID from IP
function hashIP(ip) {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
        const char = ip.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).substring(0, 8).toUpperCase();
}

// Fetch user IP and initialize loyalty system
async function initLoyaltySystem() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIP = data.ip;
        
        // Generate customer ID
        const customerId = hashIP(userIP);
        document.getElementById('customerId').textContent = customerId;
        
        // Load user data from localStorage
        loadUserLoyaltyData();
        
        // Update UI
        updateLoyaltyUI();
        renderRewards();
        
    } catch (error) {
        console.error('Error fetching IP:', error);
        // Use fallback if IP fetch fails
        userIP = 'local-user';
        document.getElementById('customerId').textContent = 'GUEST000';
        loadUserLoyaltyData();
        updateLoyaltyUI();
        renderRewards();
    }
}

// Load user loyalty data from localStorage
function loadUserLoyaltyData() {
    const storedData = localStorage.getItem(`loyalty_${userIP}`);
    if (storedData) {
        userLoyaltyData = JSON.parse(storedData);
    }
    
    // Check for pending loyalty points from other pages (e.g., game-detail.html)
    const pendingPoints = parseInt(localStorage.getItem('pendingLoyaltyPoints') || '0');
    if (pendingPoints > 0) {
        console.log(`Adding ${pendingPoints} pending loyalty points...`);
        userLoyaltyData.points += pendingPoints;
        userLoyaltyData.tier = calculateTier(userLoyaltyData.points);
        saveUserLoyaltyData();
        localStorage.removeItem('pendingLoyaltyPoints'); // Clear pending points
        
        // Show notification
        showPointsAddedNotification(pendingPoints);
    }
}

// Reset loyalty data - called when user completes the cycle
function resetLoyaltyData() {
    userLoyaltyData = {
        points: 0,
        tier: 'bronze',
        claimedRewards: [],
        lastActivity: Date.now(),
        cyclesCompleted: (userLoyaltyData.cyclesCompleted || 0) + 1
    };
    saveUserLoyaltyData();
    updateLoyaltyUI();
    renderRewards();
    
    // Show completion notification
    showCycleCompleteNotification();
}

// Save user loyalty data to localStorage
function saveUserLoyaltyData() {
    localStorage.setItem(`loyalty_${userIP}`, JSON.stringify(userLoyaltyData));
}

// Calculate user tier based on points
function calculateTier(points) {
    if (points >= TIERS.platinum.min) return 'platinum';
    if (points >= TIERS.gold.min) return 'gold';
    if (points >= TIERS.silver.min) return 'silver';
    return 'bronze';
}

// Update loyalty UI with current data
function updateLoyaltyUI() {
  const currentTier = TIERS[userLoyaltyData.tier];
  const tierElement = document.getElementById('loyaltyTier');
  const pointsElement = document.getElementById('loyaltyPoints');
  const progressElement = document.getElementById('tierProgress');
  const progressTextElement = document.getElementById('progressText');
  const nextLevelElement = document.getElementById('nextLevel');
  const ringProgress = document.getElementById('ringProgress');

  // If loyalty UI is not present on this page, skip safely
  if (!tierElement || !pointsElement || !progressElement || !progressTextElement || !nextLevelElement || !ringProgress) {
    return;
  }

  // Update tier display
  tierElement.textContent = currentTier.name;
  tierElement.className = `card-tier ${currentTier.color}`;

  // Update points display
  pointsElement.textContent = userLoyaltyData.points;

  // Calculate progress to next tier
  let progressPercentage = 0;
  let pointsToNext = 0;

  if (currentTier.next) {
    const nextTier = TIERS[currentTier.next];
    const currentProgress = userLoyaltyData.points - currentTier.min;
    const tierRange = nextTier.min - currentTier.min;
    progressPercentage = (currentProgress / tierRange) * 100;
    pointsToNext = nextTier.min - userLoyaltyData.points;

    progressTextElement.textContent = `التقدم نحو المستوى ${nextTier.name}`;
    nextLevelElement.textContent = `${pointsToNext} نقطة للمستوى التالي`;
  } else {
    progressPercentage = 100;
    progressTextElement.textContent = 'وصلت للمستوى الأعلى!';
    nextLevelElement.textContent = 'تهانينا! أنت في أعلى مستوى';
  }

  // Update progress bar
  progressElement.style.width = `${progressPercentage}%`;

  // Update SVG ring
  const circumference = 283; // 2 * PI * r (r = 45)
  const offset = circumference - (progressPercentage / 100) * circumference;
  ringProgress.style.strokeDashoffset = offset;

  // Update WhatsApp button state based on tier
  updateWhatsAppButtonState();
}

// Update WhatsApp button state - only enabled when reaching Platinum
function updateWhatsAppButtonState() {
    const whatsappBtn = document.querySelector('.btn-contact-whatsapp');
    if (whatsappBtn) {
        if (userLoyaltyData.tier === 'platinum') {
            whatsappBtn.disabled = false;
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.cursor = 'pointer';
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> تواصل معنا عبر واتساب - متاح الآن!';
        } else {
            whatsappBtn.disabled = true;
            whatsappBtn.style.opacity = '0.5';
            whatsappBtn.style.cursor = 'not-allowed';
            const pointsNeeded = TIERS.platinum.min - userLoyaltyData.points;
            whatsappBtn.innerHTML = `<i class="fas fa-lock"></i> يتطلب ${pointsNeeded} نقطة للوصول للبلاتينية`;
            whatsappBtn.onclick = (e) => {
                e.preventDefault();
                alert(`يجب أن تصل إلى المستوى البلاتيني (${TIERS.platinum.min} نقطة) لاستخدام هذه الميزة!\nأنت الآن لديك ${userLoyaltyData.points} نقطة فقط.`);
            };
        }
    }
}

// Render rewards grid
function renderRewards() {
    const rewardsGrid = document.getElementById('rewardsGrid');
    // If loyalty rewards UI is not on this page, skip safely
    if (!rewardsGrid) {
        return;
    }
    rewardsGrid.innerHTML = '';
    
    REWARDS.forEach(reward => {
        const isUnlocked = userLoyaltyData.points >= reward.cost;
        const isClaimed = userLoyaltyData.claimedRewards.includes(reward.id);
        
        const rewardCard = document.createElement('div');
        rewardCard.className = `reward-card ${!isUnlocked ? 'locked' : ''}`;
        
        rewardCard.innerHTML = `
            <div class="reward-icon-display ${!isUnlocked ? 'locked' : ''}"><i class="${reward.icon}"></i></div>
            <h3 class="reward-name">${reward.name}</h3>
            <p class="reward-description">${reward.description}</p>
            <div class="reward-cost">${reward.cost} نقطة</div>
            <button class="btn-claim-reward" 
                    ${!isUnlocked || isClaimed ? 'disabled' : ''} 
                    onclick="claimReward(${reward.id})">
                ${isClaimed ? '<i class="fas fa-check"></i> تم الاستلام' : isUnlocked ? 'استلم الآن' : '<i class="fas fa-lock"></i> مغلق'}
            </button>
        `;
        
        rewardsGrid.appendChild(rewardCard);
    });
}

// Add points to user account
function addPoints(amount) {
    const oldPoints = userLoyaltyData.points;
    const oldTier = userLoyaltyData.tier;
    
    userLoyaltyData.points += amount;
    userLoyaltyData.tier = calculateTier(userLoyaltyData.points);
    userLoyaltyData.lastActivity = Date.now();
    
    saveUserLoyaltyData();
    updateLoyaltyUI();
    renderRewards();
    
    // Check if tier upgraded
    if (userLoyaltyData.tier !== oldTier) {
        showTierUpgradeNotification();
    }
    
    // Check if any new rewards unlocked
    checkNewRewardsUnlocked(oldPoints, userLoyaltyData.points);
}

// Show tier upgrade notification
function showTierUpgradeNotification() {
    const tierName = TIERS[userLoyaltyData.tier].name;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--purple-primary), var(--pink-primary));
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(155, 91, 255, 0.5);
        z-index: 9998;
        font-size: 1.1rem;
        font-weight: 700;
        animation: slideInRight 0.5s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-trophy"></i> تهانينا! تمت ترقيتك إلى ${tierName} <i class="fas fa-star"></i>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Show notification when points are added
function showPointsAddedNotification(points) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(76, 175, 80, 0.5);
        z-index: 9998;
        font-size: 1.1rem;
        font-weight: 700;
        animation: slideInRight 0.5s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-coins"></i> تم إضافة ${points} نقطة ولاء! <i class="fas fa-check-circle"></i>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Show notification when loyalty cycle is completed
function showCycleCompleteNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #000;
        padding: 25px 35px;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6);
        z-index: 9998;
        font-size: 1.2rem;
        font-weight: 900;
        animation: slideInRight 0.5s ease;
        border: 3px solid #FFD700;
    `;
    notification.innerHTML = `
        <i class="fas fa-trophy"></i> تهانينا! أكملت دورة الولاء! <i class="fas fa-star"></i><br>
        <small style="font-size: 0.85rem; font-weight: 600;">ابدأ من جديد لجمع المزيد من المكافآت!</small>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 6000);
}

// Check for newly unlocked rewards
function checkNewRewardsUnlocked(oldPoints, newPoints) {
    REWARDS.forEach(reward => {
        if (oldPoints < reward.cost && newPoints >= reward.cost && !userLoyaltyData.claimedRewards.includes(reward.id)) {
            showCelebration(reward);
        }
    });
}

// Show celebration modal
function showCelebration(reward) {
    const modal = document.getElementById('celebrationModal');
    const rewardIcon = document.getElementById('celebrationRewardIcon');
    const rewardName = document.getElementById('celebrationRewardName');
    const whatsappBtn = document.getElementById('whatsappClaimBtn');
    const celebrationText = document.querySelector('.celebration-text');
    
    // Create confetti
    createConfetti();
    
    // Set reward details
    rewardIcon.innerHTML = `<i class="${reward.icon}"></i>`;
    rewardName.textContent = reward.name;
    
    // Special message for final reward
    if (reward.id === 8 && reward.cost === 800) {
        celebrationText.textContent = 'تهانينا! أكملت دورة الولاء بالكامل! 🎉';
        celebrationText.style.fontSize = '1.1rem';
        celebrationText.style.fontWeight = '700';
    } else {
        celebrationText.textContent = 'لقد حصلت على هدية جديدة!';
        celebrationText.style.fontSize = '1rem';
        celebrationText.style.fontWeight = '400';
    }
    
    // Setup WhatsApp button
    whatsappBtn.onclick = () => {
        const message = `مرحباً! أريد استلام مكافأة الولاء:\n${reward.name}\n${reward.description}\n\nرقم العميل: ${document.getElementById('customerId').textContent}`;
        const whatsappUrl = `https://wa.me/201034046979?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    // Show modal
    modal.classList.add('show');
}

// Create confetti animation
function createConfetti() {
    const containers = document.querySelectorAll('.confetti-container');
    containers.forEach(container => {
        container.innerHTML = ''; // Clear previous confetti
        
        const colors = ['#9b5bff', '#ff6bd5', '#4facfe', '#ffd700', '#ff6b6b'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
        }
    });
}

// Close celebration modal
function closeCelebration() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.remove('show');
}

// Claim reward
function claimReward(rewardId) {
    const reward = REWARDS.find(r => r.id === rewardId);
    
    if (!reward) return;
    
    // Check if already claimed
    if (userLoyaltyData.claimedRewards.includes(rewardId)) {
        alert('لقد استلمت هذه المكافأة بالفعل!');
        return;
    }
    
    // Check if user has enough points
    if (userLoyaltyData.points < reward.cost) {
        alert('ليس لديك نقاط كافية لاستلام هذه المكافأة!');
        return;
    }
    
    // Mark as claimed
    userLoyaltyData.claimedRewards.push(rewardId);
    saveUserLoyaltyData();
    renderRewards();
    
    // Show celebration
    showCelebration(reward);
    
    // Check if this is the final reward (id: 8, cost: 800)
    if (rewardId === 8 && reward.cost === 800) {
        // User has completed the loyalty cycle
        setTimeout(() => {
            // Reset after celebration
            resetLoyaltyData();
        }, 5000); // Wait 5 seconds after celebration
    }
}

// Test function to simulate purchases (add 2 points = 100 EGP purchase)
function testAddPoints() {
    addPoints(2);
    
    // Show feedback
    const btn = document.getElementById('testAddPoints');
    const originalText = btn.textContent;
    btn.textContent = 'تمت الإضافة! +2 نقطة ✓';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Initialize loyalty system when page loads
window.addEventListener('DOMContentLoaded', () => {
  // Run loyalty system only on pages that contain the loyalty UI
  const isLoyaltyPage = !!document.getElementById('rewardsGrid') || !!document.getElementById('loyaltyPoints');
  if (!isLoyaltyPage) return;

  // Clear all loyalty data for fresh start (run once)
  const shouldReset = localStorage.getItem('loyalty_reset_v2');
  if (!shouldReset) {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('loyalty_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.setItem('loyalty_reset_v2', 'true');
  }

  initLoyaltySystem();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const item = this.parentElement;
    const wasActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    if (!wasActive) {
      item.classList.add('active');
    }
  });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar?.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar?.classList.contains('scroll-down')) {
    navbar?.classList.remove('scroll-up');
    navbar?.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar?.classList.contains('scroll-down')) {
    navbar?.classList.remove('scroll-down');
    navbar?.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  menuToggle?.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navMenu?.classList.remove('active');
    menuToggle?.classList.remove('active');
  }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function setActiveNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Update active link on scroll
window.addEventListener('scroll', setActiveNavLink);

// Set initial active link
setActiveNavLink();

// ===== Form Validation =====
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      alert('برجاء ملء جميع الحقول المطلوبة');
    }
  });
});

// ===== Lazy Loading Images =====
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Animation on Scroll =====
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animateOnScroll.observe(el);
});

// ===== طلب توكن موقع لعروض الفلاش (Netlify Function) =====
async function requestFlashOrderToken(gameName, priceValue, priceText) {
  const payload = {
    game: gameName || 'unknown',
    price: Number(priceValue) || 0,
    label: priceText || ''
  };

  try {
    const res = await fetch('/.netlify/functions/flash-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    return {
      requestId: data.requestId,
      token: data.token,
      expiresAt: data.expiresAt
    };
  } catch (err) {
    console.warn('Flash token request failed, using fallback coupon', err);
    const fallbackToken = generateUniqueCoupon();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 دقائق صلاحية تقريبية
    return {
      requestId: `local-${Date.now()}`,
      token: fallbackToken,
      expiresAt
    };
  }
}

// ===== نظام توليد كوبونات فريدة مع تاريخ قريب =====
const COUPON_HISTORY_KEY = 'recentCoupons';
const COUPON_HISTORY_LIMIT = 30; // نخزن آخر 30 كوبون فقط
const COUPON_COOLDOWN_MIN = 30;  // منع تكرار نفس الكوبون خلال 30 دقيقة

function loadCouponHistory() {
  try {
    const raw = localStorage.getItem(COUPON_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const cutoff = Date.now() - COUPON_COOLDOWN_MIN * 60 * 1000;
    // نحذف السجلات الأقدم من فترة التهدئة
    return parsed.filter((item) => item?.time && item.time >= cutoff);
  } catch (e) {
    return [];
  }
}

function saveCouponHistory(history) {
  try {
    localStorage.setItem(COUPON_HISTORY_KEY, JSON.stringify(history.slice(-COUPON_HISTORY_LIMIT)));
  } catch (e) {
    // تخطي أي خطأ تخزين
  }
}

function generateUniqueCoupon() {
  const prefixes = ['FLASH', 'DEAL', 'SAVE', 'MEGA', 'SUPER', 'PROMO', 'BOOST', 'FIRE'];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const history = loadCouponHistory();
  const recentCodes = new Set(history.map((h) => h.code));
  const lastCode = history.length ? history[history.length - 1].code : null;
  const timestamp = Date.now().toString().slice(-4);

  // نحاول توليد كوبون غير مكرر في آخر فترة قصيرة
  let candidate = '';
  const maxAttempts = 20;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const formats = [
      `${prefix}-${randomCode}`,
      `${prefix}${timestamp}${randomCode.slice(0, 4)}`,
      `${prefix}-${randomCode.slice(0, 3)}-${randomCode.slice(3, 6)}`,
      `${prefix}${randomCode}`,
      `${timestamp}-${prefix}-${randomCode.slice(0, 4)}`
    ];

    candidate = formats[Math.floor(Math.random() * formats.length)];

    if (candidate !== lastCode && !recentCodes.has(candidate)) {
      break;
    }
    // مزيد من التفرد بإضافة رقم إضافي لو فشل التميز
    candidate += `-${Math.floor(Math.random() * 9)}`;
  }

  const updatedHistory = [...history, { code: candidate, time: Date.now() }];
  saveCouponHistory(updatedHistory);

  return candidate;
}

// ===== دالة الحصول على الوقت بالتفصيل =====
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// ===== Flash Deals Buy Buttons =====
function initFlashDealsButtons() {
  document.querySelectorAll('.btn-deal').forEach(btn => {
    btn.addEventListener('click', async function(e) {
      e.preventDefault();
      const game = this.getAttribute('data-game');
      const priceText = this.getAttribute('data-price');
      const priceValue = parseFloat(priceText.replace(/[^0-9]/g, ''));

      // طلب توكن موقع لعروض الفلاش
      const { requestId, token, expiresAt } = await requestFlashOrderToken(game, priceValue, priceText);
      
      // الحصول على الوقت الحالي
      const time = getCurrentTime();
      
      const message = `السلام عليكم، أريد شراء:\n🎮 ${game}\n💰 السعر: ${priceText}\n🆔 رقم الطلب: ${requestId}\n🔐 الكود الموقّع: ${token}\n⚡ عرض فلاش محدود\n⏰ الوقت: ${time}\n⌛ صلاحية التوكين: ${new Date(expiresAt).toLocaleString()}`;
      const whatsappUrl = `https://wa.me/201034046979?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initFlashDealsButtons);

// ===== Social Proof Notifications =====
function setupSocialProof() {
  const notification = document.getElementById('socialProof');
  if (!notification) return;

  const notifications = [
    { name: 'أحمد محمد', action: 'شحن 1800 UC PUBG', time: 'منذ دقيقتين' },
    { name: 'سارة علي', action: 'شحنت 660 UC PUBG', time: 'منذ 5 دقائق' },
    { name: 'محمود حسن', action: 'شحن 2400 CP COD Mobile', time: 'منذ 10 دقائق' },
    { name: 'ياسمين خالد', action: 'شحنت 800 CP COD Mobile', time: 'منذ 15 دقيقة' },
    { name: 'عمر يوسف', action: 'شحن 2000 💎 Mobile Legends', time: 'منذ 20 دقيقة' },
    { name: 'نور إبراهيم', action: 'شحنت 706 💎 Mobile Legends', time: 'منذ دقيقة' },
    { name: 'كريم علاء', action: 'شحن 1000 💎 Free Fire', time: 'منذ 3 دقائق' },
    { name: 'ليلى حسين', action: 'شحنت 520 💎 Free Fire', time: 'منذ دقيقتين' },
    { name: 'باسم فراج', action: 'شحن 4500 Robux', time: 'منذ 7 دقائق' },
    { name: 'منى صالح', action: 'شحنت 2500 Robux', time: 'منذ 12 دقيقة' },
    { name: 'طارق عادل', action: 'شحن 12000 نقطة FC Mobile', time: 'منذ 8 دقائق' },
    { name: 'فاطمة أحمد', action: 'شحنت 8000 نقطة FC Mobile', time: 'منذ 4 دقائق' },
    { name: 'حسام الدين', action: 'شحن 325 UC PUBG', time: 'منذ دقيقة' },
    { name: 'رنا محمود', action: 'شحنت 100 💎 Free Fire', time: 'منذ 6 دقائق' },
    { name: 'أمير صلاح', action: 'شحن 3850 UC PUBG', time: 'منذ 2 دقائق' },
    { name: 'دينا ياسر', action: 'شحنت 344 💎 Mobile Legends', time: 'منذ 9 دقائق' },
    { name: 'خالد رمضان', action: 'شحن 1060 💎 Free Fire', time: 'منذ 11 دقيقة' },
    { name: 'مريم سعيد', action: 'شحنت 1000 Robux', time: 'منذ 3 دقائق' },
    { name: 'وليد عثمان', action: 'شحن 80 CP COD Mobile', time: 'منذ 14 دقيقة' },
    { name: 'هبة فتحي', action: 'شحنت 6000 UC PUBG', time: 'منذ دقيقتين' },
    { name: 'زياد ماجد', action: 'شحن 1412 💎 Mobile Legends', time: 'منذ 5 دقائق' },
    { name: 'سلمى طارق', action: 'شحنت 160 CP COD Mobile', time: 'منذ 7 دقائق' },
    { name: 'إبراهيم نبيل', action: 'شحن 2180 💎 Free Fire', time: 'منذ دقيقة' },
    { name: 'ندى حسام', action: 'شحنت 800 Robux', time: 'منذ 10 دقائق' },
    { name: 'مصطفى كمال', action: 'شحن 8100 UC PUBG', time: 'منذ 4 دقائق' },
    { name: 'جنى أيمن', action: 'شحنت 240 CP COD Mobile', time: 'منذ 8 دقائق' },
    { name: 'يوسف رأفت', action: 'شحن 5000 نقطة FC Mobile', time: 'منذ 13 دقيقة' },
    { name: 'آية سامي', action: 'شحنت 3688 💎 Mobile Legends', time: 'منذ 3 دقائق' },
    { name: 'عبدالله وائل', action: 'شحن 10000 Robux', time: 'منذ 6 دقائق' },
    { name: 'ريهام عصام', action: 'شحنت 600 UC PUBG', time: 'منذ دقيقتين' }
  ];

  let currentIndex = 0;

  function showNotification() {
    const notif = notifications[currentIndex];
    document.getElementById('notifName').textContent = notif.name;
    document.getElementById('notifAction').textContent = notif.action;
    document.getElementById('notifTime').textContent = notif.time;

    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);

    currentIndex = (currentIndex + 1) % notifications.length;
  }

  // Show first notification after 1 minute
  setTimeout(() => {
    showNotification();
    // Then show every 3 minutes (180000 milliseconds)
    setInterval(showNotification, 180000);
  }, 60000);
}

// Call the function when page loads
setupSocialProof();

// ===== Referral Program - Dynamic Thermometer =====
(function initReferralProgram() {
  const STORAGE_KEY = 'referral_points';
  const linkInput = document.getElementById('referralLink');
  const copyBtn = document.getElementById('copyLink');
  const shareButtons = document.querySelectorAll('.share-action-btn[data-share]');
  const thermoScore = document.getElementById('thermoScore');
  const thermoFill = document.getElementById('thermoFill');
  const claimPrizeBtn = document.getElementById('claimPrizeBtn');

  // Initialize points from localStorage
  let currentPoints = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  let hasCopiedLink = false; // Track if user copied the link

  // Generate unique shareable link
  function generateShareLink() {
    const baseUrl = window.location.origin || 'https://cryptoplaystation.com';
    const userId = localStorage.getItem('user_id') || `USER${Date.now()}`;
    localStorage.setItem('user_id', userId);
    return `${baseUrl}/?ref=${encodeURIComponent(userId)}&utm_source=referral&utm_medium=share`;
  }

  // Update UI based on points
  function updateThermometer() {
    if (!thermoScore || !thermoFill) return;

    const percentage = Math.min(100, currentPoints);
    thermoScore.textContent = currentPoints;
    thermoFill.style.width = `${percentage}%`;

    // Update milestones visual
    document.querySelectorAll('.milestone').forEach(milestone => {
      const points = parseInt(milestone.dataset.points || '0', 10);
      if (currentPoints >= points) {
        milestone.classList.add('reached');
      } else {
        milestone.classList.remove('reached');
      }
    });

    // Enable claim button at 100 points
    if (claimPrizeBtn) {
      if (currentPoints >= 100) {
        claimPrizeBtn.disabled = false;
        claimPrizeBtn.style.animation = 'pulse 1.5s ease-in-out infinite';
      } else {
        claimPrizeBtn.disabled = true;
        claimPrizeBtn.style.animation = 'none';
      }
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, currentPoints.toString());
  }

  // Add point only when user copies AND shares
  function addPoint() {
    if (!hasCopiedLink) {
      showNotification('⚠️ اعمل نسخ للرابط الأول!', 'info');
      return;
    }

    if (currentPoints >= 100) {
      showNotification('لقد وصلت للحد الأقصى! اتصل بنا لاستلام هديتك 🎁', 'success');
      return;
    }

    currentPoints++;
    hasCopiedLink = false; // Reset copy flag after successful share
    updateThermometer();
    showNotification('🎉 +1 نقطة! استمر بالمشاركة', 'success');

    // Confetti effect at 100
    if (currentPoints === 100) {
      triggerConfetti();
      showNotification('🏆 مبروك! وصلت 100 نقطة - اتصل بنا لاستلام الهدية!', 'gold');
    }
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `share-notification ${type}`;
    notif.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    notif.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'gold' ? 'linear-gradient(135deg, #ffd700, #ffed4e)' : 'linear-gradient(135deg, #10b981, #059669)'};
      color: ${type === 'gold' ? '#0a0014' : '#fff'};
      padding: 14px 20px;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }

  // Confetti effect
  function triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ff10f0', '#8b3dff', '#ffd700', '#10b981', '#3b82f6'];

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      const particleCount = 3;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: 50%;
          left: 50%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: confetti 1s ease-out forwards;
        `;
        particle.style.setProperty('--x', `${(Math.random() - 0.5) * 1000}px`);
        particle.style.setProperty('--y', `${(Math.random() - 0.5) * 1000}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
      }

      requestAnimationFrame(frame);
    })();
  }

  // Copy link with feedback
  async function copyLink() {
    if (!linkInput) return;
    try {
      await navigator.clipboard.writeText(linkInput.value);
      hasCopiedLink = true; // Set flag when user copies
      if (copyBtn) {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = original;
          copyBtn.classList.remove('copied');
        }, 1500);
      }
      showNotification('✅ تم النسخ! دلوقتي اعمل مشاركة', 'success');
    } catch (err) {
      showNotification('اضغط مطولاً لنسخ الرابط', 'info');
    }
  }

  // Handle share buttons - Simple and reliable
  function handleShare(platform) {
    const url = linkInput?.value || window.location.href;
    const text = `🎮 اشحن معانا واكسب نقاط هدايا! استخدم رابطي وخد 50 جنيه خصم: ${url}`;

    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    
    // Direct links that work on both mobile apps and web
    const shareLinks = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
      messenger: `https://www.facebook.com/dialog/share?app_id=140586622674265&href=${encodedUrl}&display=popup&redirect_uri=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      tiktok: `https://www.tiktok.com/upload?lang=ar`
    };

    const targetLink = shareLinks[platform];
    if (targetLink) {
      // Open link - will use app if installed, web otherwise
      window.open(targetLink, '_blank', 'width=600,height=600,scrollbars=yes');
      setTimeout(() => addPoint(), 500);
    }
  }

  // Claim prize button
  if (claimPrizeBtn) {
    claimPrizeBtn.addEventListener('click', () => {
      if (currentPoints >= 100) {
        const message = encodeURIComponent(`مرحباً! لقد وصلت إلى 100 نقطة في برنامج الإحالة وأريد استلام هديتي 🎁`);
        window.open(`https://wa.me/201034046979?text=${message}`, '_blank');
        
        // Reset thermometer after claim
        setTimeout(() => {
          currentPoints = 0;
          hasCopiedLink = false;
          updateThermometer();
          showNotification('🔄 تم إعادة تعيين النقاط! ابدأ من جديد', 'info');
        }, 2000);
      }
    });
  }

  // Event listeners
  if (copyBtn) {
    copyBtn.addEventListener('click', copyLink);
  }

  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => handleShare(btn.dataset.share));
  });

  // Initialize
  if (linkInput) {
    linkInput.value = generateShareLink();
  }
  updateThermometer();

  // Add confetti animation CSS
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes confetti {
        to {
          transform: translate(var(--x), var(--y)) rotate(720deg);
          opacity: 0;
        }
      }
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

// ===== Typewriter Effect for Hero =====
(function initTypewriter() {
  const typewriterEl = document.getElementById('typewriterText');
  const cursorEl = document.querySelector('.typewriter-cursor');
  if (!typewriterEl) return;

  const text = 'أهلاً بكم في البركة ماركت';
  let index = 0;
  
  function typeWriter() {
    const currentText = text.substring(0, index);
    
    // Apply special styling to البركة
    const styledText = currentText.replace(
      'البركة ماركت',
      '<span class="baraka-brand">البركة ماركت</span>'
    );
    
    typewriterEl.innerHTML = styledText;
    
    if (index < text.length) {
      index++;
      setTimeout(typeWriter, 80); // Typing speed
    } else {
      // Finished typing, hide cursor
      if (cursorEl) {
        cursorEl.style.display = 'none';
      }
    }
  }
  
  // Start typing immediately with minimal delay
  setTimeout(typeWriter, 100);
})();

// ===== Advanced Footer Functionality =====

// Animate Stats Counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString();
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  stats.forEach(stat => observer.observe(stat));
}

// Newsletter Subscription Handler
function handleNewsletterSubscribe(event) {
  event.preventDefault();
  
  const form = event.target;
  const input = form.querySelector('input[type="email"]');
  const email = input.value.trim();
  
  if (!email) {
    showFooterNotification('❌', 'الرجاء إدخال البريد الإلكتروني', 'error');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFooterNotification('❌', 'الرجاء إدخال بريد إلكتروني صحيح', 'error');
    return false;
  }
  
  // Save to localStorage
  let subscribers = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
  
  if (subscribers.includes(email)) {
    showFooterNotification('ℹ️', 'أنت مشترك بالفعل في نشرتنا', 'info');
    return false;
  }
  
  subscribers.push(email);
  localStorage.setItem('newsletter_emails', JSON.stringify(subscribers));
  
  // Success
  showFooterNotification('✅', 'تم الاشتراك بنجاح! شكراً لك', 'success');
  
  // Create confetti effect
  createConfetti();
  
  // Clear form
  input.value = '';
  
  return false;
}

// Show Footer Notification
function showFooterNotification(icon, message, type = 'info') {
  const existing = document.querySelector('.footer-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `footer-notification ${type}`;
  notification.innerHTML = `
    <span class="notif-icon">${icon}</span>
    <span class="notif-message">${message}</span>
  `;
  
  // Styles
  const style = document.createElement('style');
  if (!document.querySelector('#footer-notification-styles')) {
    style.id = 'footer-notification-styles';
    style.textContent = `
      .footer-notification {
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.98), rgba(118, 75, 162, 0.98));
        color: white;
        padding: 20px 30px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 700;
        font-size: 1.05rem;
        box-shadow: 0 15px 50px rgba(102, 126, 234, 0.5);
        z-index: 999999;
        animation: slideInNotif 0.5s cubic-bezier(0.4, 0, 0.2, 1), slideOutNotif 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.7s;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
      }
      
      .footer-notification.success {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.98), rgba(5, 150, 105, 0.98));
        box-shadow: 0 15px 50px rgba(16, 185, 129, 0.5);
      }
      
      .footer-notification.error {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.98), rgba(220, 38, 38, 0.98));
        box-shadow: 0 15px 50px rgba(239, 68, 68, 0.5);
      }
      
      .footer-notification .notif-icon {
        font-size: 2rem;
        animation: bounce 0.8s ease infinite;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes slideInNotif {
        from {
          transform: translateX(500px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutNotif {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(500px);
          opacity: 0;
        }
      }
      
      @media (max-width: 768px) {
        .footer-notification {
          right: 15px;
          left: 15px;
          top: 80px;
          font-size: 0.95rem;
          padding: 18px 25px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3200);
}

// Create Confetti Effect
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';
    confetti.style.cssText = `
      position: fixed;
      top: 100px;
      right: ${Math.random() * 300 + 50}px;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]};
      border-radius: 50%;
      z-index: 999999;
      pointer-events: none;
      animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
    `;
    
    if (!document.querySelector('#confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confettiFall {
          to {
            transform: translateY(800px) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
  }
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize Footer Features
document.addEventListener('DOMContentLoaded', () => {
  animateFooterSpeedometers();
  animateStats();
  initScrollToTop();
});

// ===== Animate Footer Speedometers =====
function animateFooterSpeedometers() {
  const circumference = 377;
  const gauges = document.querySelectorAll('.footer-gauge-progress');
  const values = document.querySelectorAll('.footer-gauge-value');

  // Ensure initial state (hidden progress)
  gauges.forEach(g => g.style.strokeDashoffset = circumference);

  const animateSpeedometers = () => {
    // Animate gauge fill
    gauges.forEach((gauge, index) => {
      const target = parseFloat(gauge.dataset.target || gauge.dataset.value || 0);
      const max = parseFloat(gauge.dataset.max || 100);
      const percentage = Math.max(0, Math.min(100, (target / max) * 100));
      const offset = circumference - (circumference * percentage) / 100;

      setTimeout(() => {
        gauge.style.strokeDashoffset = offset;
      }, index * 120);
    });

    // Animate numbers with requestAnimationFrame for smoothness
    values.forEach((valueEl, index) => {
      if (valueEl.dataset.static) return;

      const target = parseFloat(valueEl.dataset.target || '0');
      const isDecimal = valueEl.dataset.decimal === 'true';
      const duration = 1800; // ms
      const start = performance.now() + index * 120;

      const tick = (now) => {
        const elapsed = now - start;
        if (elapsed < 0) {
          requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        const current = target * eased;
        valueEl.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        if (progress < 1) requestAnimationFrame(tick);
        else valueEl.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
      };

      requestAnimationFrame(tick);
    });
  };

  // Run once immediately (in case section is already in view)
  animateSpeedometers();

  // Also trigger when section enters viewport
  const statsSection = document.querySelector('.footer-stats');
  if ('IntersectionObserver' in window && statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSpeedometers();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  }
}

// ===== Console Welcome Message =====
console.log('%c🎮 Welcome to البركة! 🎮', 'color: #9b5bff; font-size: 24px; font-weight: bold;');
console.log('%cللدعم التقني: support@lootohub.com', 'color: #00ffcc; font-size: 14px;');


