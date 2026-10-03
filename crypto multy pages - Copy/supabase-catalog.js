(function initSupabaseCatalog() {
  const SUPABASE_URL = 'https://rnlvbxtzemsdncwlkkxi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xzoauSK8_LMaut9ornZaBQ_3oC4wFxV';

  if (!window.supabase || typeof window.supabase.createClient !== 'function') return;

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  window.supabaseCatalog = { client, loadedFromDatabase: false, realtimeEnabled: false };

  function mapCategory(category, products) {
    return {
      id: category.id,
      name: category.name,
      description: category.description || '',
      meta: `${products.length} منتج`,
      image: category.image_url || category.image || '',
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        unit: product.unit || '',
        price: Number(product.price) || 0,
        image: product.image_url || product.image || '',
        categoryId: product.category_id,
        isActive: product.is_active !== false
      }))
    };
  }

  async function loadCatalog() {
    const [categoriesResult, productsResult] = await Promise.all([
      client.from('categories').select('*').eq('is_active', true).order('sort_order'),
      client.from('products').select('*').order('created_at', { ascending: false })
    ]);

    if (categoriesResult.error || productsResult.error) {
      window.supabaseCatalog.lastError = categoriesResult.error || productsResult.error;
      console.warn('Supabase catalog is unavailable; using the local catalog.', categoriesResult.error || productsResult.error);
      window.dispatchEvent(new CustomEvent('catalog:error', { detail: window.supabaseCatalog.lastError }));
      return false;
    }

    const productsByCategory = productsResult.data.reduce((groups, product) => {
      (groups[product.category_id] ||= []).push(product);
      return groups;
    }, {});

    const nextCategories = categoriesResult.data.map(category => mapCategory(category, productsByCategory[category.id] || []));
    if (Array.isArray(window.marketCategories)) window.marketCategories.splice(0, window.marketCategories.length, ...nextCategories);
    else window.marketCategories = nextCategories;
    window.supabaseCatalog.loadedFromDatabase = true;
    window.dispatchEvent(new CustomEvent('catalog:updated', { detail: nextCategories }));
    return true;
  }

  window.supabaseCatalog.loadCatalog = loadCatalog;
  window.supabaseCatalog.ready = loadCatalog().catch(error => {
    console.warn('Supabase catalog load failed; using the local catalog.', error);
    return false;
  });

  window.supabaseCatalog.ready.then(() => {
    const channel = client.channel('catalog-live-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => loadCatalog())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => loadCatalog())
      .subscribe((status, error) => {
        if (status === 'SUBSCRIBED') {
          window.supabaseCatalog.realtimeEnabled = true;
          return;
        }
        if (error) console.warn('Supabase catalog realtime is unavailable.', error);
      });
    window.supabaseCatalog.realtimeChannel = channel;
  });
})();
