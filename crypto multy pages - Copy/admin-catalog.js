(function initAdminCatalog() {
  const catalog = window.supabaseCatalog;
  if (!catalog) return;

  const categoryForm = document.getElementById('categoryForm');
  const productForm = document.getElementById('productForm');
  const categorySelect = document.getElementById('productCategory');
  const categoryList = document.getElementById('adminCategoryList');
  const productList = document.getElementById('adminProductList');
  const productSearch = document.getElementById('productSearchAdmin');
  const status = document.getElementById('catalogStatus');
  let categories = [];
  let editingCategoryId = null;
  let editingProductId = null;

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.className = isError ? 'catalog-status error' : 'catalog-status';
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  const normalizeSearch = value => String(value || '').toLocaleLowerCase('ar-EG').trim();
  async function getImageUrl(file, fallback) {
    if (!file || !file.size) return fallback;
    const filePath = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const { error } = await catalog.client.storage.from('product-images').upload(filePath, file, { upsert: false });
    if (error) throw error;
    const { data } = catalog.client.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  function render() {
    categorySelect.innerHTML = categories.map(category => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`).join('');
    categoryList.innerHTML = categories.map(category => `
      <div class="catalog-row"><div><strong>${escapeHtml(category.name)}</strong><small>${escapeHtml(category.description)} · ${category.products.length} منتجات</small></div>
      <div class="catalog-row-actions"><button type="button" data-edit-category="${escapeHtml(category.id)}">تعديل</button><button type="button" data-delete-category="${escapeHtml(category.id)}">حذف</button></div></div>`).join('') || '<p>لا توجد فئات بعد.</p>';
    const searchTerm = normalizeSearch(productSearch.value);
    const products = categories.flatMap(category => category.products
      .filter(product => !searchTerm || normalizeSearch(product.name).includes(searchTerm))
      .map(product => ({ category, product })));
    productList.innerHTML = products.map(({ category, product }) => `
      <div class="catalog-row"><div><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(category.name)} · ${product.price} جنيه · ${escapeHtml(product.unit)} · <span class="${product.isActive ? '' : 'catalog-product-unavailable'}">${product.isActive ? 'متاح' : 'غير متاح'}</span></small></div>
      <div class="catalog-row-actions"><button type="button" data-edit-product="${escapeHtml(product.id)}">تعديل</button><button type="button" data-delete-product="${escapeHtml(product.id)}">حذف</button></div></div>`).join('') || '<p>لا توجد منتجات بعد.</p>';
  }

  function resetCategoryForm() {
    editingCategoryId = null;
    categoryForm.reset();
    categoryForm.querySelector('button[type="submit"]').textContent = 'إضافة الفئة';
  }
  function resetProductForm() {
    editingProductId = null;
    productForm.reset();
    productForm.elements.is_active.value = 'true';
    productForm.querySelector('button[type="submit"]').textContent = 'إضافة المنتج';
  }

  categoryForm.addEventListener('submit', async event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(categoryForm));
    let imageUrl;
    try { imageUrl = await getImageUrl(values.image_file, values.image_url.trim()); } catch (error) { return setStatus(error.message, true); }
    const payload = { name: values.name.trim(), description: values.description.trim(), image_url: imageUrl, is_active: true };
    const request = editingCategoryId ? catalog.client.from('categories').update(payload).eq('id', editingCategoryId) : catalog.client.from('categories').insert(payload);
    const { error } = await request;
    if (error) return setStatus(error.message, true);
    setStatus('تم حفظ الفئة.');
    resetCategoryForm();
    await refresh();
  });

  productForm.addEventListener('submit', async event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(productForm));
    let imageUrl;
    try { imageUrl = await getImageUrl(values.image_file, values.image_url.trim()); } catch (error) { return setStatus(error.message, true); }
    const payload = { category_id: values.category_id, name: values.name.trim(), unit: values.unit.trim(), price: Number(values.price), image_url: imageUrl, is_active: values.is_active === 'true' };
    const request = editingProductId ? catalog.client.from('products').update(payload).eq('id', editingProductId) : catalog.client.from('products').insert(payload);
    const { error } = await request;
    if (error) return setStatus(error.message, true);
    setStatus('تم حفظ المنتج.');
    resetProductForm();
    await refresh();
  });

  categoryList.addEventListener('click', async event => {
    const editId = event.target.dataset.editCategory;
    const deleteId = event.target.dataset.deleteCategory;
    if (editId) {
      const category = categories.find(item => String(item.id) === editId);
      editingCategoryId = category.id;
      categoryForm.elements.name.value = category.name;
      categoryForm.elements.description.value = category.description;
      categoryForm.elements.image_url.value = category.image;
      categoryForm.querySelector('button[type="submit"]').textContent = 'حفظ تعديل الفئة';
    }
    if (deleteId && confirm('حذف الفئة وكل منتجاتها؟')) {
      const { error } = await catalog.client.from('categories').delete().eq('id', deleteId);
      if (error) return setStatus(error.message, true);
      await refresh();
    }
  });

  productList.addEventListener('click', async event => {
    const editId = event.target.dataset.editProduct;
    const deleteId = event.target.dataset.deleteProduct;
    if (editId) {
      const product = categories.flatMap(category => category.products).find(item => String(item.id) === editId);
      editingProductId = product.id;
      productForm.elements.category_id.value = product.categoryId;
      productForm.elements.name.value = product.name;
      productForm.elements.unit.value = product.unit;
      productForm.elements.price.value = product.price;
      productForm.elements.is_active.value = product.isActive ? 'true' : 'false';
      productForm.elements.image_url.value = product.image;
      productForm.querySelector('button[type="submit"]').textContent = 'حفظ تعديل المنتج';
    }
    if (deleteId && confirm('حذف المنتج؟')) {
      const { error } = await catalog.client.from('products').delete().eq('id', deleteId);
      if (error) return setStatus(error.message, true);
      await refresh();
    }
  });

  async function refresh() {
    await catalog.loadCatalog();
    categories = window.marketCategories || [];
    render();
  }

  window.addEventListener('catalog:updated', event => {
    categories = event.detail || [];
    render();
  });
  window.addEventListener('catalog:error', event => {
    const message = event.detail?.message || '';
    if (message.includes('schema cache') || message.includes('Could not find the table')) {
      setStatus('لم يتم إنشاء جداول Supabase بعد. افتح ملف supabase-catalog-schema.sql وانسخ محتواه إلى SQL Editor داخل مشروع Supabase ثم اضغط Run.', true);
    } else {
      setStatus(message || 'تعذر الاتصال بـ Supabase.', true);
    }
  });
  document.getElementById('resetCategoryForm').addEventListener('click', resetCategoryForm);
  document.getElementById('resetProductForm').addEventListener('click', resetProductForm);
  productSearch.addEventListener('input', render);
  refresh().catch(error => setStatus(error.message, true));
})();
