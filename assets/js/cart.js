/* ==========================================================================
   MINIMAL E-COMMERCE - CART (cart.js)
   Persistent localStorage cart with event-driven UI sync
   ========================================================================== */

const Cart = (() => {
  const STORAGE_KEY = "buyhelps_cart";

  // ── Internal helpers ─────────────────────────────────────────
  function _read() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function _write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    _dispatch();
  }

  function _dispatch() {
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: Cart.getCart() }));
  }

  function _key(id, variant) {
    return variant ? `${id}__${variant}` : id;
  }

  // ── Public API ───────────────────────────────────────────────
  function addItem(id, qty = 1, variant = "") {
    const items = _read();
    const key = _key(id, variant);
    const existing = items.find((i) => _key(i.id, i.variant) === key);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id, qty, variant });
    }
    _write(items);
    showToast("Item added to cart");
  }

  function removeItem(id, variant = "") {
    let items = _read();
    const key = _key(id, variant);
    items = items.filter((i) => _key(i.id, i.variant) !== key);
    _write(items);
  }

  function updateQty(id, variant = "", qty) {
    const items = _read();
    const key = _key(id, variant);
    const item = items.find((i) => _key(i.id, i.variant) === key);
    if (item) {
      item.qty = Math.max(1, qty);
    }
    _write(items);
  }

  function getCart() {
    const items = _read();
    return items.map((item) => {
      const product = getProductById(item.id);
      return {
        ...item,
        product,
        lineTotal: product ? product.price * item.qty : 0,
      };
    }).filter((i) => i.product);
  }

  function getItemCount() {
    return _read().reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return getCart().reduce((sum, i) => sum + i.lineTotal, 0);
  }

  function clearCart() {
    _write([]);
  }

  return { addItem, removeItem, updateQty, getCart, getItemCount, getSubtotal, clearCart };
})();

/* ==========================================================================
   Toast Notification
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg> ${message}`;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add("active");
  });
  setTimeout(() => {
    toast.classList.remove("active");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
