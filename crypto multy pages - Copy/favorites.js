// FavoritesStore utility for badge and storage (no conflicts with game-detail)
(function(){
  const STORAGE_KEY = 'gameFavorites';
  function read() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  }
  function write(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
  function count() { return read().length; }
  function updateBadge() {
    const el = document.getElementById('favoritesBadge');
    if (el) el.textContent = String(count());
  }
  function remove(id) {
    const favs = read().filter(x => x !== id);
    write(favs);
    updateBadge();
  }
  function add(id) {
    const favs = read();
    if (!favs.includes(id)) { favs.push(id); write(favs); updateBadge(); }
  }
  window.FavoritesStore = { read, write, count, updateBadge, remove, add };
  document.addEventListener('DOMContentLoaded', updateBadge);
})();
