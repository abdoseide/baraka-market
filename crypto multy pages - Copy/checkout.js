(function initCheckout() {
  const cart = JSON.parse(localStorage.getItem('gameCart') || '[]');
  const deliveryFee = 20;
  const itemsElement = document.getElementById('invoiceItems');
  const subtotalElement = document.getElementById('invoiceSubtotal');
  const totalElement = document.getElementById('invoiceTotal');
  const form = document.getElementById('checkoutForm');
  const errorElement = document.getElementById('checkoutError');
  const money = value => `${Number(value || 0).toLocaleString('ar-EG')} جنيه`;
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  const itemPrice = item => Number(item.priceEGP ?? item.price ?? 0);
  const itemQuantity = item => Number(item.quantity || 1);
  function renderInvoice() {
    const subtotal = cart.reduce((sum, item) => sum + itemPrice(item) * itemQuantity(item), 0);
    const total = subtotal + deliveryFee;
    if (!cart.length) {
      itemsElement.innerHTML = '<p class="invoice-empty">السلة فاضية. ارجع اختار المنتجات الأول 😊</p>';
      form.querySelector('button').disabled = true;
    } else {
      form.querySelector('button').disabled = false;
      itemsElement.innerHTML = cart.map((item, index) => `
        <article class="invoice-item">
          <img src="${escapeHtml(item.img || 'https://via.placeholder.com/120')}" alt="${escapeHtml(item.name)}">
          <div class="invoice-item-info"><h3>${escapeHtml(item.name)} <button type="button" class="invoice-item-delete" data-remove-index="${index}" aria-label="حذف ${escapeHtml(item.name)}" title="حذف المنتج"><i class="fas fa-trash"></i></button></h3><small>${itemQuantity(item)} × ${money(itemPrice(item))}</small></div>
          <strong>${money(itemPrice(item) * itemQuantity(item))}</strong>
        </article>`).join('');
    }
    subtotalElement.textContent = money(subtotal);
    totalElement.textContent = money(total);
  }

  itemsElement.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-remove-index]');
    if (!removeButton) return;
    cart.splice(Number(removeButton.dataset.removeIndex), 1);
    localStorage.setItem('gameCart', JSON.stringify(cart));
    renderInvoice();
  });

  renderInvoice();

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!cart.length) return;
    const values = Object.fromEntries(new FormData(form));
    const phone = values.customerPhone.trim();
    if (!/^01[0-2,5][0-9]{8}$/.test(phone.replace(/[ -]/g, ''))) {
      errorElement.textContent = 'اكتب رقم موبايل مصري صحيح من فضلك.';
      return;
    }
    errorElement.textContent = '';
    const subtotal = cart.reduce((sum, item) => sum + itemPrice(item) * itemQuantity(item), 0);
    const total = subtotal + deliveryFee;
    const lines = cart.map(item => `• ${item.name} × ${itemQuantity(item)} = ${money(itemPrice(item) * itemQuantity(item))}`).join('\n');
    const message = `السلام عليكم، عايز أأكد الطلب ده من البركة ماركت:\n\nاسم العميل: ${values.customerName}\nالعنوان: ${values.customerAddress}\nرقم الموبايل: ${phone}\n\nالأصناف:\n${lines}\n\nإجمالي المنتجات: ${money(subtotal)}\nالتوصيل: ${money(deliveryFee)}\nالإجمالي النهائي: ${money(total)}`;
    window.open(`https://wa.me/201034046979?text=${encodeURIComponent(message)}`, '_blank');
    localStorage.removeItem('gameCart');
  });
})();
