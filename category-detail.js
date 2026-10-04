(async function initCategoryDetail() {
  const categoryId = new URLSearchParams(window.location.search).get('category');
  const requestedProduct = new URLSearchParams(window.location.search).get('product');
  const categories = window.marketCategories || [];
  const grid = document.getElementById('categoryProductGrid');
  const title = document.getElementById('categoryDetailTitle');
  const description = document.getElementById('categoryDetailDescription');
  const count = document.getElementById('categoryDetailCount');

  if (!grid) return;

  const money = value => `${value.toLocaleString('ar-EG')} جنيه`;
  const getCart = () => JSON.parse(localStorage.getItem('gameCart') || '[]');
  const saveCart = cart => {
    localStorage.setItem('gameCart', JSON.stringify(cart));
    if (typeof updateNavCartUI === 'function') updateNavCartUI();
  };

  function renderCategory(category) {
    if (!category) return;
    document.title = `البركة ماركت - ${category.name}`;
    title.textContent = category.name;
    description.textContent = `${category.description} - اختيارات مختارة بأسعار واضحة وتوصيل سريع.`;
    count.textContent = `${category.products.filter(product => product.isActive !== false).length} منتجات متاحة`;
    grid.innerHTML = category.products.map((product, index) => `
    <article class="product-card${product.isActive === false ? ' is-unavailable' : ''}" data-product-index="${index}" aria-disabled="${product.isActive === false}">
      <div class="product-card-image" style="background-image:url('${product.image}')"></div>
      <div class="product-card-body">
        <h3>${product.name}</h3><span class="product-unit">${product.unit}</span><strong class="product-price">${money(product.price)}</strong>
        ${product.isActive === false ? '<strong class="product-unavailable-label">غير متاح</strong>' : '<div class="product-actions"><div class="quantity-control"><button type="button" data-action="decrease" aria-label="تقليل الكمية">-</button><output>1</output><button type="button" data-action="increase" aria-label="زيادة الكمية">+</button></div><button class="product-add-btn" type="button" data-action="add"><i class="fas fa-cart-plus"></i> أضف للسلة</button><button class="product-buy-btn" type="button" data-action="buy"><i class="fab fa-whatsapp"></i> شراء</button></div>'}
      </div>
    </article>`).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
    const product = category.products[Number(card.dataset.productIndex)];
    if (product.isActive === false) return;
    const output = card.querySelector('output');
    const quantity = () => Number(output.value || output.textContent || 1);
    card.querySelector('[data-action="increase"]').addEventListener('click', () => { output.value = quantity() + 1; output.textContent = output.value; });
    card.querySelector('[data-action="decrease"]').addEventListener('click', () => { output.value = Math.max(1, quantity() - 1); output.textContent = output.value; });
    card.querySelector('[data-action="add"]').addEventListener('click', () => {
      const cart = getCart();
      const id = `market_${category.id}_${product.name}`;
      const existing = cart.find(item => item.id === id);
      if (existing) existing.quantity = (existing.quantity || 1) + quantity();
      else cart.push({ id, type: 'market', key: category.id, name: product.name, priceEGP: product.price, img: product.image, quantity: quantity() });
      saveCart(cart);
      card.classList.remove('is-added');
      requestAnimationFrame(() => card.classList.add('is-added'));
    });
    card.querySelector('[data-action="buy"]').addEventListener('click', () => {
      const cart = getCart();
      const id = `market_${category.id}_${product.name}`;
      const existing = cart.find(item => item.id === id);
      if (existing) existing.quantity = (existing.quantity || 1) + quantity();
      else cart.push({ id, type: 'market', key: category.id, name: product.name, priceEGP: product.price, img: product.image, quantity: quantity() });
      saveCart(cart);
      window.location.href = 'checkout.html';
    });
    });
    if (requestedProduct) {
    const normalizeProduct = value => String(value || '').toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[ًٌٍَُِّْـ]/g, '').trim();
    const target = normalizeProduct(requestedProduct);
    const targetCard = [...grid.querySelectorAll('.product-card')].find(card => {
      const product = category.products[Number(card.dataset.productIndex)];
      return normalizeProduct(product.name) === target;
    });
    if (targetCard) {
      targetCard.classList.add('is-targeted');
      setTimeout(() => targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
    }
  }
  }

  renderCategory(categories.find(item => item.id === categoryId) || categories[0]);
  window.addEventListener('catalog:updated', event => {
  const updatedCategory = (event.detail || []).find(item => item.id === categoryId) || (event.detail || [])[0];
  if (updatedCategory && Array.isArray(updatedCategory.products)
    && (updatedCategory.products.length > 0 || !grid.children.length)) renderCategory(updatedCategory);
  });

  // Show the local catalog immediately, then replace it when the remote catalog is ready.
  if (window.supabaseCatalog?.ready) {
    window.supabaseCatalog.ready.then(() => {
      const updatedCategory = (window.marketCategories || []).find(item => item.id === categoryId);
      if (updatedCategory && Array.isArray(updatedCategory.products)
        && (updatedCategory.products.length > 0 || !grid.children.length)) renderCategory(updatedCategory);
    });
  }
})();
