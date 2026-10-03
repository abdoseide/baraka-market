// Games Data
const gamesData = [
  {
    id: 1,
    name: 'بقالة أساسية',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
    motivation: 'كل أساسيات البيت في طلب واحد',
    icon: 'fa-basket-shopping',
    color: '#7fcf9b'
  },
  {
    id: 2,
    name: 'خضار وفاكهة',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=80',
    motivation: 'طازة كل يوم وباختيارات كتيرة',
    icon: 'fa-apple-whole',
    color: '#b5d86b'
  },
  {
    id: 3,
    name: 'مشروبات وسناكس',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=80',
    motivation: 'اختيارات خفيفة للقعدة الحلوة',
    icon: 'fa-mug-hot',
    color: '#e8b66a'
  },
  {
    id: 4,
    name: 'تنظيف وعناية',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1600&q=80',
    motivation: 'خلي بيتك أنضف وأسهل',
    icon: 'fa-spray-can-sparkles',
    color: '#a8d8e8'
  },
  {
    id: 5,
    name: 'مستلزمات المطبخ',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
    motivation: 'كل أدوات مطبخك في متناولك',
    icon: 'fa-kitchen-set',
    color: '#f0c98a'
  },
  {
    id: 6,
    name: 'عناية شخصية',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1600&q=80',
    motivation: 'اهتم بنفسك بمنتجات موثوقة',
    icon: 'fa-heart',
    color: '#e9a6bd'
  },
  {
    id: 7,
    name: 'ألبان ومجمدات',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1600&q=80',
    motivation: 'اختيارات يومية لكل أفراد البيت',
    icon: 'fa-temperature-snowflake',
    color: '#a9d8ed'
  },
  {
    id: 8,
    name: 'عروض الأسبوع',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=700&q=80',
    bgImage: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80',
    motivation: 'وفر أكتر مع عروضنا المختارة',
    icon: 'fa-tags',
    color: '#f2a65a'
  }
];

let currentSlideIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
  initSlider();
  setupEventListeners();
});

function initSlider() {
  // Create dots
  const dotsContainer = document.getElementById('sliderDots');
  const thumbnailsContainer = document.getElementById('sliderThumbnails');

  if (!dotsContainer || !thumbnailsContainer) return;
  
  gamesData.forEach((game, index) => {
    // Create dot
    const dot = document.createElement('button');
    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);

    // Create thumbnail
    const thumb = document.createElement('div');
    thumb.className = `slider-thumbnail ${index === 0 ? 'active' : ''}`;
    thumb.style.backgroundImage = `url('${game.image}')`;
    thumb.addEventListener('click', () => goToSlide(index));
    thumbnailsContainer.appendChild(thumb);
  });

  updateSlider();
}

function setupEventListeners() {
  const nextButton = document.getElementById('sliderNext');
  const previousButton = document.getElementById('sliderPrev');
  if (!nextButton || !previousButton) return;

  nextButton.addEventListener('click', nextSlide);
  previousButton.addEventListener('click', prevSlide);

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Auto-advance slider
  setInterval(nextSlide, 4500);
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % gamesData.length;
  updateSlider();
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + gamesData.length) % gamesData.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlider();
}

function updateSlider() {
  const game = gamesData[currentSlideIndex];

  // Update main image
  document.getElementById('mainSliderImage').src = game.image;
  document.getElementById('mainSliderImage').alt = game.name;

  // Update game info
  document.getElementById('gameTitle').textContent = game.name;
  
  // Update motivation with icon
  const motivationElement = document.getElementById('gameMotivation');
  motivationElement.innerHTML = `<i class="fas ${game.icon}"></i> ${game.motivation}`;

  // Update background
  const bgElement = document.getElementById('sliderBg');
  bgElement.style.backgroundImage = `url('${game.bgImage}')`;
  bgElement.style.backgroundColor = game.color;

  // Update dots
  document.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlideIndex);
  });

  // Update thumbnails
  document.querySelectorAll('.slider-thumbnail').forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentSlideIndex);
  });

  // Add animation class
  document.querySelector('.slider-image').style.animation = 'none';
  setTimeout(() => {
    document.querySelector('.slider-image').style.animation = 'slideInImage 0.6s ease-out';
  }, 10);
}
