const marketCategories = [
  {
    id: 'produce',
    name: 'خضار وفاكهة',
    description: 'طازة كل يوم',
    meta: '24 منتج',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=82',
    products: [
      { name: 'سلة فاكهة موسمية', unit: '1 كجم', price: 95, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=82' },
      { name: 'خضار مشكلة طازة', unit: '1 كجم', price: 65, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=82' },
      { name: 'فراولة طازة', unit: '500 جرام', price: 55, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=82' }
    ]
  },
  {
    id: 'pantry',
    name: 'بقالة أساسية',
    description: 'كل احتياجات البيت',
    meta: '38 منتج',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=82',
    products: [
      { name: 'أرز مصري فاخر', unit: '1 كجم', price: 42, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=82' },
      { name: 'زيت عباد الشمس', unit: '1 لتر', price: 78, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=82' },
      { name: 'مكرونة عائلية', unit: '400 جرام', price: 24, image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=82' }
    ]
  },
  {
    id: 'drinks',
    name: 'مشروبات وسناكس',
    description: 'للقعدة الحلوة',
    meta: '31 منتج',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=82',
    products: [
      { name: 'قهوة مطحونة', unit: '250 جرام', price: 85, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=82' },
      { name: 'عصير فاكهة طبيعي', unit: '1 لتر', price: 48, image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=700&q=82' },
      { name: 'باكدج سناكس', unit: '6 قطع', price: 120, image: 'https://images.unsplash.com/photo-1621939514649-280e2aa7e8f3?auto=format&fit=crop&w=700&q=82' }
    ]
  },
  {
    id: 'dairy',
    name: 'ألبان ومجمدات',
    description: 'اختيارات يومية',
    meta: '27 منتج',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=82',
    products: [
      { name: 'لبن كامل الدسم', unit: '1 لتر', price: 42, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=82' },
      { name: 'زبادي طبيعي', unit: '4 عبوات', price: 50, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=82' },
      { name: 'جبنة رودس', unit: '500 جرام', price: 115, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=700&q=82' },
      { name: 'جبنة عبور لاند', unit: '500 جرام', price: 105, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=82' },
      { name: 'جبنة مراعي', unit: '500 جرام', price: 120, image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=700&q=82' },
      { name: 'جبنة رومي', unit: '250 جرام', price: 135, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=700&q=82' }
    ]
  },
  {
    id: 'care',
    name: 'تنظيف وعناية',
    description: 'بيت مرتب بسهولة',
    meta: '22 منتج',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=82',
    products: [
      { name: 'منظف متعدد الاستخدام', unit: '750 مل', price: 68, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=82' },
      { name: 'مسحوق غسيل', unit: '2.5 كجم', price: 145, image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=700&q=82' },
      { name: 'مناديل ورقية', unit: '6 علب', price: 75, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=700&q=82' }
    ]
  },
  {
    id: 'kitchen',
    name: 'مستلزمات المطبخ',
    description: 'كل شيء في مكانه',
    meta: '19 منتج',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=82',
    products: [
      { name: 'طقم علب حفظ', unit: '3 قطع', price: 130, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=82' },
      { name: 'أكياس تخزين', unit: 'رول 50 كيس', price: 58, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=82' },
      { name: 'أدوات مطبخ أساسية', unit: '5 قطع', price: 175, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=82' }
    ]
  }
];

window.marketCategories = marketCategories;

const catalogBrands = ['الخير', 'بلدي', 'مراعي', 'رودس', 'عبور لاند', 'الضيعة', 'بيتي', 'روابي', 'سوبر فاميلي', 'الصفوة', 'اختيارك', 'الواحة', 'كرم', 'البيت', 'فاميلي', 'روزانا', 'أصالة', 'حكاية', 'روتانا', 'النخبة', 'سفرة', 'يومك', 'حصاد', 'مذاق', 'صحتك'];
const catalogFormats = ['اقتصادي', 'عائلي', 'كبير', 'عرض خاص', 'بريميوم'];
const catalogDetails = {
  produce: { names: ['تفاح', 'برتقال', 'موز', 'عنب', 'مانجو', 'خوخ', 'كمثرى', 'كيوي', 'طماطم', 'خيار', 'بطاطس', 'بصل', 'جزر', 'فلفل', 'كوسة', 'باذنجان', 'ليمون', 'جرجير', 'خس', 'فراولة'], keyword: 'fresh-fruit-vegetables', base: 25 },
  pantry: { names: ['أرز', 'سكر', 'دقيق', 'مكرونة', 'عدس', 'فول', 'حمص', 'زيت', 'سمن', 'صلصة', 'تونة', 'شاي', 'قهوة', 'ملح', 'خل', 'عسل', 'مربى', 'بسكويت', 'شوفان', 'ذرة'], keyword: 'grocery-food', base: 25 },
  drinks: { names: ['قهوة', 'شاي', 'عصير برتقال', 'عصير مانجو', 'مياه معدنية', 'مشروب غازي', 'مشروب طاقة', 'كاكاو', 'ينسون', 'كركديه', 'لبن بالشوكولاتة', 'بسكويت', 'شيبسي', 'فشار', 'مكسرات', 'ويفر', 'كرواسون', 'تمر', 'حلوى', 'علكة'], keyword: 'drinks-snacks', base: 20 },
  dairy: { names: ['لبن كامل الدسم', 'لبن خالي الدسم', 'زبادي طبيعي', 'زبادي بالفواكه', 'جبنة رودس', 'جبنة عبور لاند', 'جبنة مراعي', 'جبنة رومي', 'جبنة بيضاء', 'جبنة شيدر', 'جبنة مثلثات', 'قشطة', 'كريمة طبخ', 'زبدة', 'آيس كريم', 'ميلك شيك', 'لبنة', 'جبنة موتزاريلا', 'جبنة فيتا', 'مهلبية'], keyword: 'dairy-milk-cheese', base: 40 },
  care: { names: ['منظف أرضيات', 'منظف زجاج', 'سائل أطباق', 'مسحوق غسيل', 'معطر جو', 'مطهر', 'مناديل ورقية', 'مناديل مبللة', 'كلور', 'صابون يدين', 'شامبو', 'بلسم', 'معجون أسنان', 'فرشاة أسنان', 'كريم شعر', 'مزيل عرق', 'اسفنجة مطبخ', 'أكياس قمامة', 'مناديل مطبخ', 'ملمع أثاث'], keyword: 'home-cleaning-care', base: 35 },
  kitchen: { names: ['علب حفظ', 'أكياس تخزين', 'ورق فويل', 'ورق زبدة', 'مناديل سفرة', 'أطباق بلاستيك', 'أكواب زجاج', 'ملاعق', 'شوك', 'سكاكين', 'لوح تقطيع', 'مصفاة', 'مبشرة', 'فتاحة علب', 'حافظة طعام', 'زجاجة مياه', 'طقم توابل', 'فوط مطبخ', 'قفازات فرن', 'طقم أدوات'], keyword: 'kitchen-home-tools', base: 45 }
};

marketCategories.forEach(category => {
  const details = catalogDetails[category.id];
  if (!details) return;
  let variant = 0;
  while (category.products.length < 120) {
    const name = details.names[variant % details.names.length];
    const brand = catalogBrands[Math.floor(variant / details.names.length) % catalogBrands.length];
    const format = catalogFormats[variant % catalogFormats.length];
    const productName = `${name} ${brand} ${format}`;
    if (!category.products.some(product => product.name === productName)) {
      category.products.push({ name: productName, unit: variant % 3 === 0 ? '1 كجم' : variant % 3 === 1 ? '500 جرام' : 'عبوة واحدة', price: details.base + ((variant * 7) % 145), image: `https://loremflickr.com/700/520/${details.keyword}?lock=${category.id}-${variant}` });
    }
    variant += 1;
  }
});

(function initCategoryStore() {
  const categoryCards = document.getElementById('categoryCards');
  const productView = document.getElementById('productView');
  const productGrid = document.getElementById('productGrid');
  const categoryTitle = document.getElementById('categoryViewTitle');
  const productTitle = document.getElementById('productViewTitle');
  const productEyebrow = document.getElementById('productCategoryEyebrow');
  const productCount = document.getElementById('productCount');
  const backButton = document.getElementById('categoryBackBtn');
  const searchInput = document.getElementById('categorySearch');

  if (!categoryCards || !productView) return;

  const money = value => `${value.toLocaleString('ar-EG')} جنيه`;
  const getCart = () => JSON.parse(localStorage.getItem('gameCart') || '[]');
  const saveCart = cart => {
    localStorage.setItem('gameCart', JSON.stringify(cart));
    if (typeof updateNavCartUI === 'function') updateNavCartUI();
  };

  function renderCategories(query = '') {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = marketCategories.filter(category =>
      `${category.name} ${category.description}`.toLowerCase().includes(normalizedQuery)
    );
    categoryCards.innerHTML = filtered.map(category => `
      <a class="category-card" href="game-detail.html?category=${category.id}" data-category-id="${category.id}">
        <div class="category-card-image" style="background-image:url('${category.image}')"></div>
        <div class="category-card-content">
          <h3>${category.name}</h3>
          <p>${category.description}</p>
          <div class="category-card-meta"><span>${category.meta}</span><strong>تصفح القسم <i class="fas fa-arrow-left"></i></strong></div>
        </div>
      </a>
    `).join('') || '<p class="category-empty">لم نجد قسمًا بهذا الاسم.</p>';
  }

  function openCategory(categoryId) {
    const category = marketCategories.find(item => item.id === categoryId);
    if (!category) return;
    categoryCards.hidden = true;
    productView.hidden = false;
    backButton.classList.add('visible');
    categoryTitle.textContent = category.name;
    productEyebrow.textContent = category.description;
    productTitle.textContent = `منتجات ${category.name}`;
    productCount.textContent = `${category.products.length} منتجات مختارة`;
    productGrid.innerHTML = category.products.map((product, index) => productTemplate(category, product, index)).join('');
    bindProductActions(category);
    document.querySelector('.category-browser-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function productTemplate(category, product, index) {
    return `<article class="product-card" data-product-index="${index}">
      <div class="product-card-image" style="background-image:url('${product.image}')"></div>
      <div class="product-card-body"><h3>${product.name}</h3><span class="product-unit">${product.unit}</span><strong class="product-price">${money(product.price)}</strong>
        <div class="product-actions"><div class="quantity-control"><button type="button" data-action="decrease" aria-label="تقليل الكمية">-</button><output>1</output><button type="button" data-action="increase" aria-label="زيادة الكمية">+</button></div><button class="product-add-btn" type="button" data-action="add"><i class="fas fa-cart-plus"></i> أضف</button><button class="product-buy-btn" type="button" data-action="buy"><i class="fab fa-whatsapp"></i> شراء</button></div>
      </div>
    </article>`;
  }

  function bindProductActions(category) {
    productGrid.querySelectorAll('.product-card').forEach(card => {
      const product = category.products[Number(card.dataset.productIndex)];
      const output = card.querySelector('output');
      card.querySelector('[data-action="increase"]').addEventListener('click', () => { output.value = Number(output.value || output.textContent) + 1; output.textContent = output.value; });
      card.querySelector('[data-action="decrease"]').addEventListener('click', () => { const next = Math.max(1, Number(output.value || output.textContent) - 1); output.value = next; output.textContent = next; });
      card.querySelector('[data-action="add"]').addEventListener('click', () => addProduct(category, product, Number(output.value || output.textContent), card));
      card.querySelector('[data-action="buy"]').addEventListener('click', () => buyProduct(category, product, Number(output.value || output.textContent)));
    });
  }

  function addProduct(category, product, quantity, card) {
    const cart = getCart();
    const id = `market_${category.id}_${product.name}`;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity = (existing.quantity || 1) + quantity;
    else cart.push({ id, type: 'market', key: category.id, name: product.name, priceEGP: product.price, img: product.image, quantity });
    saveCart(cart);
    if (card) {
      card.classList.remove('is-added');
      requestAnimationFrame(() => card.classList.add('is-added'));
    }
  }

  function buyProduct(category, product, quantity) {
    addProduct(category, product, quantity, null);
    window.location.href = 'checkout.html';
  }

  backButton.addEventListener('click', () => { productView.hidden = true; categoryCards.hidden = false; backButton.classList.remove('visible'); categoryTitle.textContent = 'تسوق حسب القسم'; });
  searchInput?.addEventListener('input', event => renderCategories(event.target.value));
  window.addEventListener('catalog:updated', () => {
    renderCategories(searchInput?.value || '');
    if (!productView.hidden) {
      const activeCategory = marketCategories.find(category => category.name === categoryTitle.textContent);
      if (activeCategory) openCategory(activeCategory.id);
    }
  });
  renderCategories();
})();
