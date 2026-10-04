/**
 * Dynamic Flash Deals System - Limited عروض البركة
 * 6 cards displayed with premium packages (1500+ EGP)
 * First card always shows PUBG with rotating offers every 6 hours
 * Other cards show different games
 */

(function() {
  // PUBG offers only - will appear in first card and rotate every 6 hours
  // Only premium offers above 1500 EGP with 5% discount (from official PUBG prices)
  const pubgOffersConfig = [
    { name: 'PUBG - 8100 UC', img: './Assestant/ppg.png', oldPrice: '4500 جنيه', newPrice: '4275 جنيه', total: 240, speedMultiplier: 2.5, curve: 'fast-start', isPubg: true },
    { name: 'PUBG - 5650 UC', img: './Assestant/ppg.png', oldPrice: '3380 جنيه', newPrice: '3211 جنيه', total: 210, speedMultiplier: 2.3, curve: 'explosive', isPubg: true },
    { name: 'PUBG - 4510 UC', img: './Assestant/ppg.png', oldPrice: '2700 جنيه', newPrice: '2565 جنيه', total: 205, speedMultiplier: 2.4, curve: 'fast-start', isPubg: true },
    { name: 'PUBG - 3850 UC', img: './Assestant/ppg.png', oldPrice: '2250 جنيه', newPrice: '2138 جنيه', total: 200, speedMultiplier: 2.8, curve: 'explosive', isPubg: true },
    { name: 'PUBG - 2460 UC', img: './Assestant/ppg.png', oldPrice: '1580 جنيه', newPrice: '1501 جنيه', total: 190, speedMultiplier: 2.6, curve: 'late-rush', isPubg: true },
    { name: 'PUBG - 9900 UC', img: './Assestant/ppg.png', oldPrice: '5630 جنيه', newPrice: '5349 جنيه', total: 160, speedMultiplier: 2.1, curve: 'slow-steady', isPubg: true },
    { name: 'PUBG - 11950 UC', img: './Assestant/ppg.png', oldPrice: '6750 جنيه', newPrice: '6413 جنيه', total: 145, speedMultiplier: 2.0, curve: 'linear', isPubg: true },
    { name: 'PUBG - 16200 UC', img: './Assestant/ppg.png', oldPrice: '9000 جنيه', newPrice: '8550 جنيه', total: 130, speedMultiplier: 1.8, curve: 'slow-steady', isPubg: true }
  ];

  // All other games (non-PUBG)
  const allGamesConfig = [
    { name: 'COD Mobile - 8000+8000 CP', img: './Assestant/call.png', oldPrice: '5200 جنيه', newPrice: '4940 جنيه', total: 200, speedMultiplier: 0.7, curve: 'slow-steady' },
    { name: 'Mobile Legends - 2015 Diamond+383 Bonus', img: './Assestant/mob.png', oldPrice: '2100 جنيه', newPrice: '1995 جنيه', total: 250, speedMultiplier: 3.2, curve: 'explosive' },
    { name: 'Yalla Ludo - 27,640 Diamonds', img: './Assestant/yl.png', oldPrice: '2900 جنيه', newPrice: '2755 جنيه', total: 160, speedMultiplier: 1.5, curve: 'late-rush' },
    { name: 'Genshin Impact - 6480+1600 Genesis', img: './Assestant/gensin.png', oldPrice: '5000 جنيه', newPrice: '4750 جنيه', total: 150, speedMultiplier: 0.9, curve: 'linear' },
    { name: 'Lords Mobile - 11785 Diamonds', img: './Assestant/lord.png', oldPrice: '7900 جنيه', newPrice: '7505 جنيه', total: 120, speedMultiplier: 1.8, curve: 'fast-start' },
    { name: 'Free Fire - 2200 Diamonds', img: './Assestant/free.png', oldPrice: '1400 جنيه', newPrice: '1330 جنيه', total: 180, speedMultiplier: 2.1, curve: 'explosive' },
    { name: 'Roblox - 10,000 Robux', img: './Assestant/rob.png', oldPrice: '5500 جنيه', newPrice: '5225 جنيه', total: 190, speedMultiplier: 0.8, curve: 'slow-steady' },
    { name: 'FC Mobile - 12000 FC Points', img: './Assestant/fc.png', oldPrice: '3200 جنيه', newPrice: '3040 جنيه', total: 170, speedMultiplier: 1.3, curve: 'late-rush' },
    { name: 'Pool City - 6500 Coins', img: './Assestant/bool.png', oldPrice: '2800 جنيه', newPrice: '2650 جنيه', total: 120, speedMultiplier: 1.4, curve: 'late-rush' },
    { name: 'Pool City - 13500 Coins', img: './Assestant/bool.png', oldPrice: '5400 جنيه', newPrice: '5150 جنيه', total: 100, speedMultiplier: 1.1, curve: 'linear' },
    { name: 'Ludo World - 1,200,000 Coins', img: './Assestant/world.png', oldPrice: '3150 جنيه', newPrice: '3000 جنيه', total: 130, speedMultiplier: 1.3, curve: 'explosive' },
    { name: 'Honor of Kings - 800+4000 Tokens', img: './Assestant/honer.png', oldPrice: '2520 جنيه', newPrice: '2400 جنيه', total: 110, speedMultiplier: 1.6, curve: 'fast-start' },
    { name: 'Honor of Kings - 1600+8000 Tokens', img: './Assestant/honer.png', oldPrice: '4935 جنيه', newPrice: '4700 جنيه', total: 85, speedMultiplier: 0.95, curve: 'slow-steady' },
    { name: 'Delta Force - 3,280+834 IC', img: './Assestant/delta.png', oldPrice: '2625 جنيه', newPrice: '2500 جنيه', total: 95, speedMultiplier: 1.2, curve: 'late-rush' },
    { name: 'Delta Force - 6,480+1944 IC', img: './Assestant/delta.png', oldPrice: '5090 جنيه', newPrice: '4850 جنيه', total: 80, speedMultiplier: 1.5, curve: 'explosive' },
    { name: 'Delta Force - 12,960+3888 IC', img: './Assestant/delta.png', oldPrice: '10080 جنيه', newPrice: '9600 جنيه', total: 75, speedMultiplier: 0.9, curve: 'linear' },
    { name: 'Delta Force - 19,440+5832 IC', img: './Assestant/delta.png', oldPrice: '15225 جنيه', newPrice: '14500 جنيه', total: 60, speedMultiplier: 0.8, curve: 'slow-steady' }
  ];

  let lastSoldValues = [];

  function selectRandomGames(count = 6) {
    // Always select one PUBG offer for the first card
    const randomPubgIndex = Math.floor(Math.random() * pubgOffersConfig.length);
    const pubgOffer = { ...pubgOffersConfig[randomPubgIndex], isPubg: true };
    
    // Shuffle other games for remaining cards
    const shuffledGames = [...allGamesConfig];
    for (let i = shuffledGames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledGames[i], shuffledGames[j]] = [shuffledGames[j], shuffledGames[i]];
    }
    
    // Return PUBG offer + (count - 1) other games
    return [pubgOffer, ...shuffledGames.slice(0, count - 1)];
  }

  function getDealState() {
    const stored = localStorage.getItem('flashDealsState');
    if (stored) {
      const state = JSON.parse(stored);
      if (Date.now() < state.expiresAt && state.selectedGames) {
        lastSoldValues = state.lastSoldValues || state.selectedGames.map(() => 0);
        return state;
      }
    }

    const now = Date.now();
    const duration = 6 * 60 * 60 * 1000; // 6 hours
    const selectedGames = selectRandomGames(6);
    lastSoldValues = selectedGames.map(() => 0);

    const deals = selectedGames.map((game) => {
      return { game: game, startSold: 0, finalSold: game.total, total: game.total };
    });

    return {
      startedAt: now,
      expiresAt: now + duration,
      selectedGames,
      lastSoldValues,
      deals
    };
  }

  function saveDealState(state) {
    state.lastSoldValues = lastSoldValues;
    localStorage.setItem('flashDealsState', JSON.stringify(state));
  }

  let dealState = getDealState();
  saveDealState(dealState);

  function getCurrentSold(dealIndex) {
    const deal = dealState.deals[dealIndex];
    const cfg = deal.game;
    const now = Date.now();
    const elapsed = now - dealState.startedAt;
    const totalMs = dealState.expiresAt - dealState.startedAt;
    let progress = Math.min(1, elapsed / totalMs);

    // تطبيق المنحنيات لكن ضمان أن 100% تحدث فقط عند progress = 1
    switch (cfg.curve) {
      case 'fast-start':
        // سريع في البداية لكن يتباطأ في النهاية
        progress = progress < 0.5 ? Math.sqrt(progress * 2) * 0.5 : 0.5 + (progress - 0.5) * 1.0;
        break;
      case 'slow-steady':
        // بطيء ومستمر
        progress = progress * 0.8 + (progress * progress) * 0.2;
        break;
      case 'explosive':
        // انفجاري في المنتصف
        progress = progress < 0.3 ? progress * 0.5 : (progress < 0.7 ? 0.15 + (progress - 0.3) * 1.5 : 0.75 + (progress - 0.7) * 0.833);
        break;
      case 'late-rush':
        // بطيء ثم يسرع في النهاية
        progress = Math.pow(progress, 0.7);
        break;
      case 'linear':
      default:
        break;
    }

    // ضمان أن الكمية تصل لـ 100% فقط عند انتهاء الوقت تماماً
    const targetSold = Math.floor(deal.startSold + (deal.finalSold - deal.startSold) * progress);

    const lastValue = lastSoldValues[dealIndex] || 0;
    return Math.max(lastValue, Math.min(targetSold, deal.total));
  }

  function showPurchaseAnimation(card) {
    const bubble = document.createElement('div');
    bubble.className = 'purchase-notification';
    bubble.innerHTML = '<i class="fas fa-check-circle"></i> شخص اشترى هذه الباقة الآن!';
    card.style.position = 'relative';
    card.appendChild(bubble);
    setTimeout(() => bubble.classList.add('show'), 50);
    setTimeout(() => {
      bubble.classList.remove('show');
      setTimeout(() => bubble.remove(), 300);
    }, 2500);
  }

  function animateSoldNumber(el) {
    el.classList.add('sold-increase-anim');
    setTimeout(() => el.classList.remove('sold-increase-anim'), 1500);
  }

  function updateCountdown() {
    const now = Date.now();
    const remaining = dealState.expiresAt - now;

    if (remaining <= 0) {
      dealState = getDealState();
      saveDealState(dealState);
      renderDealsHTML();
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  function renderDealsHTML() {
    const grid = document.querySelector('.flash-deals-grid');
    if (!grid) return;

    grid.innerHTML = dealState.deals.map((deal, idx) => {
      const cfg = deal.game;
      const hot = idx === 0 ? 'hot' : ''; // First card (PUBG) is hot
      const pubgBadge = cfg.isPubg ? '<div class="pubg-first-badge"> </div>' : '';
      return `
        <div class="deal-card ${hot}">
          <div class="deal-badge">خصم 5%</div>
          ${pubgBadge}
          <img src="${cfg.img}" alt="${cfg.name}">
          <h3>${cfg.name}</h3>
          <div class="deal-prices">
            <span class="old-price">${cfg.oldPrice}</span>
            <span class="new-price">${cfg.newPrice}</span>
          </div>
          <div class="progress-bar-deal">
            <div class="progress-fill" style="width: 0%;"></div>
          </div>
          <p class="sold-count">تم بيع 0 من ${deal.total}</p>
          <button class="btn-deal" data-game="${cfg.name}" data-price="${cfg.newPrice}">اشتري الآن</button>
        </div>
      `;
    }).join('');
  }

  function updateDealsProgress() {
    const cards = document.querySelectorAll('.deal-card');

    cards.forEach((card, idx) => {
      if (idx >= dealState.deals.length) return;

      const oldSold = lastSoldValues[idx] || 0;
      const currentSold = getCurrentSold(idx);
      const deal = dealState.deals[idx];
      const pct = (currentSold / deal.total) * 100;
      const increased = currentSold > oldSold;

      lastSoldValues[idx] = currentSold;

      const bar = card.querySelector('.progress-fill');
      if (bar) {
        bar.style.transition = 'width 0.8s ease-out';
        bar.style.width = pct.toFixed(1) + '%';
        if (pct >= 80) bar.style.background = 'linear-gradient(90deg, #ff1744, #f50057)';
        else if (pct >= 50) bar.style.background = 'linear-gradient(90deg, #ff9800, #ff5722)';
        else bar.style.background = 'linear-gradient(90deg, #00ff41, #00e676)';
      }

      const soldEl = card.querySelector('.sold-count');
      if (soldEl) {
        if (increased) {
          animateSoldNumber(soldEl);
          if (Math.random() < 0.1) showPurchaseAnimation(card);
        }

        soldEl.textContent = `تم بيع ${currentSold} من ${deal.total}`;
        if (pct >= 90) {
          soldEl.style.color = '#ff1744';
          soldEl.style.fontWeight = '800';
          soldEl.innerHTML = `🔥 تم بيع ${currentSold} من ${deal.total} - أسرع!`;
        } else if (pct >= 70) {
          soldEl.style.color = '#ff9800';
          soldEl.style.fontWeight = '700';
        }
      }
    });

    saveDealState(dealState);
  }

  function updateFlashDeals() {
    updateCountdown();
    updateDealsProgress();
  }

  function injectAnimationCSS() {
    if (document.getElementById('flash-deals-animations')) return;
    const style = document.createElement('style');
    style.id = 'flash-deals-animations';
    style.textContent = `
      @keyframes soldIncrease { 0% { transform: scale(1); } 50% { transform: scale(1.3); color: #00ff41; } 100% { transform: scale(1); } }
      .sold-increase-anim { animation: soldIncrease 1.5s ease-in-out; font-weight: 900 !important; }
      .purchase-notification { position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, rgba(0, 255, 65, 0.95), rgba(0, 230, 118, 0.95)); color: white; padding: 8px 14px; border-radius: 12px; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 20px rgba(0, 255, 65, 0.4); z-index: 100; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease-out; pointer-events: none; }
      .purchase-notification.show { opacity: 1; transform: translateY(0); }
      .purchase-notification i { font-size: 1rem; }
      @media (max-width: 768px) { .purchase-notification { font-size: 0.75rem; padding: 6px 10px; } }
    `;
    document.head.appendChild(style);
  }

  function startSystem() {
    injectAnimationCSS();
    renderDealsHTML();
    updateFlashDeals();
    setInterval(updateFlashDeals, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSystem);
  } else {
    startSystem();
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateFlashDeals();
  });
})();
