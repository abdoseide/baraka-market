(function initMarketSearch() {
  const categories = window.marketCategories || [];
  const inputs = document.querySelectorAll('#marketSearch, #categorySearch, #productSearch');
  if (!categories.length || !inputs.length) return;

  const normalize = value => String(value || '').toLowerCase().trim().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[ًٌٍَُِّْـ]/g, '');
  let catalog = categories.flatMap(category => [
    { type: 'category', name: category.name, description: category.description, categoryId: category.id },
    ...category.products.map(product => ({ type: 'product', name: product.name, description: `${category.name} - ${product.unit}`, categoryId: category.id, price: product.price }))
  ]);
  window.addEventListener('catalog:updated', () => {
    catalog = (window.marketCategories || []).flatMap(category => [
      { type: 'category', name: category.name, description: category.description, categoryId: category.id },
      ...category.products.map(product => ({ type: 'product', name: product.name, description: `${category.name} - ${product.unit}`, categoryId: category.id, price: product.price }))
    ]);
  });

  function getResults(query) {
    const normalized = normalize(query);
    if (!normalized) return [];
    return catalog.filter(item => normalize(`${item.name} ${item.description}`).includes(normalized)).slice(0, 8);
  }

  function createResultsBox(input) {
    const wrapper = input.closest('.market-search, .category-search-box, .product-search-box') || input.parentElement;
    wrapper.classList.add('market-search-host');
    let box = wrapper.querySelector('.market-search-results');
    if (!box) { box = document.createElement('div'); box.className = 'market-search-results'; wrapper.appendChild(box); }
    return box;
  }

  function render(input, query) {
    const box = createResultsBox(input);
    const results = getResults(query);
    if (!normalize(query)) { box.innerHTML = ''; box.classList.remove('open'); return; }
    box.innerHTML = results.length ? results.map(item => `
      <a class="market-search-result" href="game-detail.html?category=${encodeURIComponent(item.categoryId)}&product=${encodeURIComponent(item.name)}">
        <span class="market-search-result-icon"><i class="fas ${item.type === 'category' ? 'fa-layer-group' : 'fa-box-open'}"></i></span>
        <span><strong>${item.name}</strong><small>${item.description}${item.price ? ` - ${item.price} جنيه` : ''}</small></span>
        <i class="fas fa-arrow-left market-search-result-arrow"></i>
      </a>
    `).join('') : '<div class="market-search-empty">لا توجد نتائج مطابقة</div>';
    box.classList.add('open');
  }

  inputs.forEach(input => {
    input.addEventListener('input', event => render(input, event.target.value));
    input.addEventListener('focus', event => { if (event.target.value) render(input, event.target.value); });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.market-search-host')) document.querySelectorAll('.market-search-results.open').forEach(box => box.classList.remove('open'));
  });
})();
