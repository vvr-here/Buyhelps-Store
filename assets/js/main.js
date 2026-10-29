/* ==========================================================================
   MINIMAL E-COMMERCE - MAIN (main.js)
   Global initialisation: navbar, theme, mobile menu, search, cart drawer
   ========================================================================== */

// Apply saved theme immediately (default: light)
const initialTheme = localStorage.getItem("buyhelps_theme") || "light";
document.documentElement.setAttribute("data-theme", initialTheme);

/* ── Wishlist Manager ────────────────────────────────────────── */
const Wishlist = (() => {
  const KEY = "buyhelps_wishlist";
  const DEFAULT_ITEMS = ["minimal-watch", "leather-journal", "ceramic-pour-over"];

  function get() {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  }

  function has(id) {
    return get().includes(id);
  }

  function toggle(id) {
    let list = get();
    const product = typeof getProductById === "function" ? getProductById(id) : null;
    const name = product ? product.title : "Product";
    const exists = list.includes(id);
    if (exists) {
      list = list.filter((item) => item !== id);
      showToast(`${name} removed from wishlist`);
    } else {
      list.push(id);
      showToast(`❤️ ${name} saved to wishlist!`);
    }
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: list }));
    // Update all matching heart buttons in DOM
    document.querySelectorAll(`[data-wishlist-id="${id}"]`).forEach((btn) => {
      btn.classList.toggle("active", !exists);
      const icon = btn.querySelector("svg");
      if (icon) {
        icon.setAttribute("fill", !exists ? "#EC4899" : "none");
        icon.setAttribute("stroke", !exists ? "#EC4899" : "currentColor");
      }
    });
    return !exists;
  }

  return { get, has, toggle };
})();

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  // Keep badge in sync across pages
  window.addEventListener("cart:updated", syncCartBadge);
});

function initApp() {
  initTheme();
  initMobileMenu();
  initCartDrawer();
  initSearchModal();
  syncCartBadge();
  if (typeof SocialProof !== "undefined") SocialProof.init();
  if (typeof ExitIntent !== "undefined") ExitIntent.init();
  if (typeof SupportChat !== "undefined") SupportChat.init();
  if (typeof ProductComparison !== "undefined") ProductComparison.init();
}

/* ── Theme (Light / Dark) ─────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem("buyhelps_theme") || "light";
  setTheme(saved);

  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    btn.onclick = () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    };
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("buyhelps_theme", theme);

  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    btn.innerHTML = theme === "dark"
      ? '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.title = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    btn.setAttribute("aria-label", btn.title);
  });
}

/* ── Image Fallback Resilience ────────────────────────────────── */
function handleImgError(img, title, category) {
  img.onerror = null;
  const cat = typeof getCategoryById === 'function' ? getCategoryById(category) : null;
  const icon = cat ? cat.icon : '🛍️';
  const cleanTitle = (title || 'Buyhelps Product').substring(0, 26);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%2327272a"/><text x="50%" y="45%" font-size="56" text-anchor="middle" dominant-baseline="middle">${icon}</text><text x="50%" y="65%" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="%23a1a1aa" text-anchor="middle">${cleanTitle}</text></svg>`;
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ── Mobile Menu ─────────────────────────────────────────────── */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const nav = document.getElementById("nav-links");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
    const isOpen = nav.classList.contains("mobile-open");
    btn.innerHTML = isOpen
      ? '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });
}

/* ── Cart Badge ──────────────────────────────────────────────── */
function syncCartBadge() {
  const badges = document.querySelectorAll(".cart-badge");
  const count = Cart.getItemCount();
  badges.forEach((b) => {
    b.textContent = count;
    b.style.display = count > 0 ? "grid" : "none";
    // pulse
    b.style.transform = "scale(1.3)";
    setTimeout(() => (b.style.transform = "scale(1)"), 200);
  });
}

/* ── Cart Drawer ─────────────────────────────────────────────── */
function initCartDrawer() {
  const overlay = document.querySelector(".cart-drawer-overlay");
  const drawer = document.querySelector("aside.cart-drawer");
  const openBtns = document.querySelectorAll("[data-open-cart]");
  const closeBtn = document.querySelector(".cart-drawer-close");

  if (!overlay || !drawer) return;

  function open() {
    overlay.classList.add("active");
    drawer.classList.add("active");
    document.body.style.overflow = "hidden";
    renderCartDrawer();
  }
  function close() {
    overlay.classList.remove("active");
    drawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtns.forEach((b) => {
    b.onclick = open;
  });
  if (closeBtn) closeBtn.onclick = close;
  overlay.onclick = close;

  window.addEventListener("cart:updated", () => {
    if (drawer.classList.contains("active")) renderCartDrawer();
  });
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!body) return;

  const cart = Cart.getCart();

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-drawer-empty">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
        <p style="font-weight:600;margin-bottom:0.25rem;">Your cart is empty</p>
        <p style="font-size:0.85rem;">Browse our collection and add something you love.</p>
      </div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  body.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.product.images[0]}" alt="${item.product.title}">
      <div class="cart-item-info">
        <div>
          <div class="cart-item-title">${item.product.title}</div>
          ${item.variant ? `<div class="cart-item-variant">${item.variant}</div>` : ""}
        </div>
        <div class="cart-item-bottom">
          <div class="qty-control">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}','${item.variant}',${item.qty - 1})">−</button>
            <input class="qty-input" type="number" value="${item.qty}" min="1" readonly>
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}','${item.variant}',${item.qty + 1})">+</button>
          </div>
          <span class="cart-item-price">${formatPrice(item.lineTotal)}</span>
        </div>
        <span class="cart-item-remove" onclick="Cart.removeItem('${item.id}','${item.variant}')">Remove</span>
      </div>
    </div>`
    )
    .join("");

  if (footer) {
    footer.style.display = "block";
    footer.innerHTML = `
      <div class="cart-subtotal-row">
        <span>Subtotal</span>
        <span class="cart-subtotal-price">${formatPrice(Cart.getSubtotal())}</span>
      </div>
      <p class="cart-shipping-notice">Shipping & taxes calculated at checkout.</p>
      <a href="cart.html" class="btn btn-primary btn-block" style="margin-bottom:0.5rem;">View Cart</a>
      <a href="checkout.html" class="btn btn-outline btn-block">Checkout</a>`;
  }
}

/* ── Search Modal & Live Predictive Search ───────────────────── */
function executeSearch(query) {
  const input = document.getElementById("search-input");
  const overlay = document.querySelector(".search-modal-overlay");
  if (!input || !overlay) return;
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  input.value = query;
  input.dispatchEvent(new Event("input"));
  input.focus();
}

function initSearchModal() {
  const overlay = document.querySelector(".search-modal-overlay");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const openBtns = document.querySelectorAll("[data-open-search]");

  if (!overlay) return;

  function open() {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => input && input.focus(), 100);
  }
  function close() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    if (input) input.value = "";
    if (results) results.innerHTML = '<p style="padding:1.5rem;color:var(--color-text-muted);text-align:center;">Type any keyword above or click a trending topic…</p>';
  }

  openBtns.forEach((b) => {
    b.onclick = open;
  });
  overlay.onclick = (e) => {
    if (e.target === overlay) close();
  };

  if (input) {
    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (!results) return;
      if (q === "") {
        results.innerHTML = '<p style="padding:1.5rem;color:var(--color-text-muted);text-align:center;">Type any keyword above or click a trending topic…</p>';
        return;
      }
      const matches = searchProducts(q);
      if (matches.length === 0) {
        results.innerHTML = `
          <div style="padding:2rem;text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:0.5rem;opacity:0.6;">🔍</div>
            <p style="font-weight:700;color:var(--color-text-primary);">No products found for "${q}"</p>
            <p style="font-size:0.85rem;color:var(--color-text-muted);margin-top:0.25rem;">Try searching for headphones, keyboard, watch, overshirt, or coffee</p>
          </div>`;
        return;
      }
      const inSubdir = window.location.pathname.replace(/\\/g, '/').includes('/products/');
      const prefix = inSubdir ? '../' : '';

      results.innerHTML = matches
        .slice(0, 7)
        .map((p) => {
          const link = p.dedicatedPage ? `${prefix}products/${p.id}.html` : `${prefix}product.html?id=${p.id}`;
          return `
          <a class="search-live-item" href="${link}">
            <img class="search-live-thumb" src="${p.images[0]}" alt="${p.title}" onerror="handleImgError(this, '${p.title.replace(/'/g, "\\'")}', '${p.category}')">
            <div class="search-live-details">
              <div class="search-live-title">${p.title}</div>
              <div class="search-live-cat">${getCategoryById(p.category)?.name || p.category}</div>
            </div>
            <div class="search-live-price">${formatPrice(p.price)}</div>
          </a>`;
        })
        .join("");
    });
  }

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      overlay.classList.contains("active") ? close() : open();
    }
    if (e.key === "Escape") close();
  });
}

/* ── Shared HTML Snippets ────────────────────────────────────── */
function getBrandLogoHTML(href = "index.html") {
  return `
    <a href="${href}" class="brand-logo" aria-label="Buyhelps Home">
      <span class="brand-emblem">
        <svg class="brand-icon-svg" width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bhBagGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#4F46E5"/>
              <stop offset="50%" stop-color="#7C3AED"/>
              <stop offset="100%" stop-color="#EC4899"/>
            </linearGradient>
            <linearGradient id="bhHeartGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#FDE047"/>
              <stop offset="100%" stop-color="#F97316"/>
            </linearGradient>
            <linearGradient id="bhGloss" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.32"/>
              <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#bhBagGrad)"/>
          <path d="M2 12C2 6.48 6.48 2 12 2H28C33.52 2 38 6.48 38 12V18C28 20 12 20 2 18V12Z" fill="url(#bhGloss)"/>
          <rect x="2.5" y="2.5" width="35" height="35" rx="9.5" stroke="rgba(255,255,255,0.4)" stroke-width="1" fill="none"/>
          <path d="M14 15V11.5C14 8.46 16.69 6 20 6C23.31 6 26 8.46 26 11.5V15" stroke="white" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M20 28.5C20 28.5 12.5 23.8 12.5 18.2C12.5 15.6 14.6 13.5 17.2 13.5C18.6 13.5 20 14.3 20 15C20 14.3 21.4 13.5 22.8 13.5C25.4 13.5 27.5 15.6 27.5 18.2C27.5 23.8 20 28.5 20 28.5Z" fill="url(#bhHeartGrad)"/>
          <path d="M28.5 7L29.3 9.7L32 10.5L29.3 11.3L28.5 14L27.7 11.3L25 10.5L27.7 9.7L28.5 7Z" fill="#FDE047"/>
        </svg>
      </span>
      <span class="brand-text">
        <span class="brand-name-wrap">
          <span class="brand-buy">Buy</span><span class="brand-helps">helps</span>
        </span>
        <span class="brand-sub">SMART STORE</span>
      </span>
    </a>`;
}

function getHeaderHTML(activePage) {
  const inSubdir = window.location.pathname.replace(/\\/g, "/").includes("/products/");
  const prefix = inSubdir ? "../" : "";
  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
  const activeCurr = localStorage.getItem("buyhelps_currency") || "INR";

  const navLabels = isHindi
    ? { home: "होम", categories: "श्रेणियां", shop: "दुकान", cart: "कार्ट", account: "खाता" }
    : { home: "Home", categories: "Categories", shop: "Shop", cart: "Cart", account: "Account" };

  return `
  <header class="site-header">
    <div class="container">
      ${getBrandLogoHTML(prefix + "index.html")}
      <nav class="nav-links" id="nav-links">
        <a href="${prefix}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">${navLabels.home}</a>
        <a href="${prefix}categories.html" class="nav-link ${activePage === 'categories' ? 'active' : ''}">${navLabels.categories}</a>
        <a href="${prefix}category.html?cat=electronics" class="nav-link ${activePage === 'shop' ? 'active' : ''}">${navLabels.shop}</a>
        <a href="${prefix}cart.html" class="nav-link ${activePage === 'cart' ? 'active' : ''}">${navLabels.cart}</a>
        <a href="${prefix}account.html" class="nav-link ${activePage === 'account' ? 'active' : ''}">${navLabels.account}</a>
      </nav>
      <div class="header-actions">
        <!-- Currency Dropdown Pill -->
        <div class="currency-lang-pill" id="currency-pill" onclick="CurrencyManager.toggleDropdown(event)" title="Change Currency">
          <span id="active-currency-label">${activeCurr}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          <div class="currency-dropdown-menu" id="currency-menu">
            <div class="currency-option-item ${activeCurr === 'INR' ? 'active' : ''}" onclick="CurrencyManager.set('INR')"><span>₹ INR</span><span style="font-size:0.75rem;color:var(--color-text-muted);">India</span></div>
            <div class="currency-option-item ${activeCurr === 'USD' ? 'active' : ''}" onclick="CurrencyManager.set('USD')"><span>$ USD</span><span style="font-size:0.75rem;color:var(--color-text-muted);">USA</span></div>
            <div class="currency-option-item ${activeCurr === 'EUR' ? 'active' : ''}" onclick="CurrencyManager.set('EUR')"><span>€ EUR</span><span style="font-size:0.75rem;color:var(--color-text-muted);">Europe</span></div>
            <div class="currency-option-item ${activeCurr === 'AED' ? 'active' : ''}" onclick="CurrencyManager.set('AED')"><span>AED</span><span style="font-size:0.75rem;color:var(--color-text-muted);">UAE</span></div>
          </div>
        </div>

        <!-- Language Switcher Button -->
        <button type="button" class="lang-toggle-btn" onclick="LanguageManager.toggle()" title="Toggle Language (English / हिन्दी)">
          🌐 <span id="active-lang-label">${isHindi ? 'हिन्दी' : 'EN'}</span>
        </button>

        <button class="action-btn theme-toggle-btn" title="Toggle Dark/Light Mode" aria-label="Toggle Dark/Light Mode">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="action-btn" data-open-search title="Search (Ctrl+K)">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <a href="${prefix}account.html" class="action-btn ${activePage === 'account' ? 'active' : ''}" title="My Account (Orders & Addresses)" aria-label="Account">
          <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </a>
        <button class="action-btn" data-open-cart title="Cart">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          <span class="cart-badge" style="display:none">0</span>
        </button>
        <button class="action-btn mobile-menu-btn" id="mobile-menu-btn">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function getFooterHTML() {
  const inSubdir = window.location.pathname.replace(/\\/g, "/").includes("/products/");
  const prefix = inSubdir ? "../" : "";
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${getBrandLogoHTML(prefix + "index.html")}
          <p style="margin-top:0.75rem;">Curated essentials for intentional living. Quality craftsmanship, sustainable materials, timeless design.</p>
        </div>
        <div>
          <h4 class="footer-heading">Shop</h4>
          <div class="footer-links">
            <a href="${prefix}category.html?cat=electronics">Electronics</a>
            <a href="${prefix}category.html?cat=fashion">Fashion</a>
            <a href="${prefix}category.html?cat=home">Home & Living</a>
            <a href="${prefix}category.html?cat=books">Books & Stationery</a>
            <a href="${prefix}category.html?cat=wellness">Wellness</a>
            <a href="${prefix}category.html?cat=sports">Sports & Outdoors</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Account & Orders</h4>
          <div class="footer-links">
            <a href="${prefix}account.html?tab=orders">Track Orders</a>
            <a href="${prefix}account.html?tab=addresses">Saved Addresses</a>
            <a href="${prefix}account.html?tab=payments">Payment Methods</a>
            <a href="${prefix}account.html?tab=wishlist">Wishlist</a>
            <a href="${prefix}account.html">Account Settings</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Support</h4>
          <div class="footer-links">
            <a href="#">Shipping & Returns</a>
            <a href="#">FAQ & Help Center</a>
            <a href="#">Size Guide</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Buyhelps. made with ❤️ By vvr. All rights reserved.</span>
        <div style="display:flex;gap:1rem;">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function getCartDrawerHTML() {
  return `
  <div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>
  <aside class="cart-drawer" id="cart-drawer">
    <div class="cart-drawer-header">
      <h3 class="cart-drawer-title">Your Cart</h3>
      <button class="cart-drawer-close" id="cart-drawer-close">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="cart-drawer-body" id="cart-drawer-body"></div>
    <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
  </aside>`;
}

function getSearchModalHTML() {
  return `
  <div class="search-modal-overlay" id="search-modal-overlay">
    <div class="search-modal">
      <div class="search-input-wrap">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input class="search-input" id="search-input" type="text" placeholder="Search 48 curated products…" autocomplete="off">
        <kbd style="font-size:0.75rem;background:#f4f4f5;padding:0.15rem 0.45rem;border-radius:4px;border:1px solid #e4e4e7;color:#71717a;">ESC</kbd>
      </div>
      <div class="search-trending-chips">
        <span style="font-size:0.75rem;font-weight:700;color:var(--color-text-muted);text-transform:uppercase;">Popular:</span>
        <button type="button" class="trending-chip" onclick="executeSearch('Headphones')">🎧 Headphones</button>
        <button type="button" class="trending-chip" onclick="executeSearch('Keyboard')">⌨️ Keyboard</button>
        <button type="button" class="trending-chip" onclick="executeSearch('Coffee')">☕ Coffee Set</button>
        <button type="button" class="trending-chip" onclick="executeSearch('Watch')">⌚ Watch</button>
        <button type="button" class="trending-chip" onclick="executeSearch('Overshirt')">👕 Overshirt</button>
        <button type="button" class="trending-chip" onclick="executeSearch('Journal')">📓 Journal</button>
      </div>
      <div class="search-results" id="search-results">
        <p style="padding:1.5rem;color:var(--color-text-muted);text-align:center;">Type any keyword above or click a trending topic…</p>
      </div>
    </div>
  </div>`;
}

/* ── Product Card Renderer ───────────────────────────────────── */
function renderProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="product-card-badge"><span class="badge badge-${product.badge}">${product.badge === 'new' ? 'New' : product.badge === 'sale' ? 'Sale' : 'Eco'}</span></span>`
    : "";
  const inSubdir = window.location.pathname.replace(/\\/g, '/').includes('/products/');
  const prefix = inSubdir ? '../' : '';
  const link = product.dedicatedPage ? `${prefix}products/${product.id}.html` : `${prefix}product.html?id=${product.id}`;
  const isWishlisted = typeof Wishlist !== 'undefined' && Wishlist.has(product.id);
  const isCompared = typeof ProductComparison !== 'undefined' && ProductComparison.get().includes(product.id);

  return `
  <article class="product-card">
    <div class="product-card-image-wrap">
      ${badgeHTML}
      <button type="button" class="product-card-compare-btn ${isCompared ? 'active' : ''}" onclick="event.preventDefault();event.stopPropagation();ProductComparison.toggle('${product.id}')" title="Compare Specs" aria-label="Compare">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
      </button>
      <button type="button" class="product-card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" onclick="event.preventDefault();event.stopPropagation();Wishlist.toggle('${product.id}')" title="${isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}" aria-label="Save to Wishlist">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="${isWishlisted ? '#EC4899' : 'none'}" stroke="${isWishlisted ? '#EC4899' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <a href="${link}" style="display:block;width:100%;height:100%;">
        <img src="${product.images[0]}" alt="${product.title}" loading="lazy" onerror="handleImgError(this, '${product.title.replace(/'/g, "\\'")}', '${product.category}')">
      </a>
      <div class="product-card-quick-add">
        <button class="btn btn-primary btn-sm" onclick="event.preventDefault();Cart.addItem('${product.id}')">+ Add</button>
      </div>
    </div>
    <div class="product-card-content">
      <span class="product-category">${getCategoryById(product.category)?.name || product.category}</span>
      <a href="${link}" class="product-title">${product.title}</a>
      <div class="product-price-row">
        <div>
          <span class="product-price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="product-price-old">${formatPrice(product.originalPrice)}</span>` : ""}
        </div>
        <span class="product-rating">${renderStars(product.rating)} ${product.rating}</span>
      </div>
    </div>
  </article>`;
}

/* ── 1. Live Social Proof Purchases ───────────────────────────── */
const SocialProof = (() => {
  const PURCHASES = [
    { name: "Rahul S.", city: "Bengaluru", product: "Studio Wireless Headphones", time: "2m ago", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80", id: "wireless-headphones" },
    { name: "Priya M.", city: "Mumbai", product: "Minimalist Quartz Watch", time: "4m ago", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80", id: "minimal-watch" },
    { name: "Arjun K.", city: "Hyderabad", product: "Gateron Mechanical Keyboard", time: "just now", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80", id: "mechanical-keyboard" },
    { name: "Ananya D.", city: "Delhi NCR", product: "European Linen Overshirt", time: "6m ago", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=200&q=80", id: "linen-overshirt" },
    { name: "Vikram R.", city: "Indiranagar", product: "Ceramic Pour-Over Coffee Set", time: "9m ago", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80", id: "ceramic-pour-over" },
    { name: "Sneha P.", city: "Pune", product: "Full-Grain Leather Journal", time: "12m ago", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80", id: "leather-journal" }
  ];

  let currentIndex = 0;
  let toastEl = null;

  function init() {
    if (document.getElementById("social-proof-toast")) return;
    toastEl = document.createElement("div");
    toastEl.id = "social-proof-toast";
    toastEl.className = "social-proof-toast";
    document.body.appendChild(toastEl);

    setTimeout(showNext, 4500);
    setInterval(showNext, 28000);
  }

  function showNext() {
    if (!toastEl) return;
    const item = PURCHASES[currentIndex];
    currentIndex = (currentIndex + 1) % PURCHASES.length;

    const inSubdir = window.location.pathname.replace(/\\/g, '/').includes('/products/');
    const link = inSubdir ? `${item.id}.html` : `products/${item.id}.html`;

    toastEl.innerHTML = `
      <img src="${item.img}" alt="${item.product}" class="social-proof-img" onerror="handleImgError(this, '${item.product}', 'Electronics')">
      <div class="social-proof-content">
        <a href="${link}" class="social-proof-title" style="text-decoration:none;display:block;">${item.product}</a>
        <div class="social-proof-meta">
          <span>Someone in <strong>${item.city}</strong></span> • <span>${item.time}</span>
        </div>
        <div style="font-size:0.7rem;color:#10B981;font-weight:700;margin-top:0.15rem;">✓ Verified Customer Purchase</div>
      </div>
      <button type="button" class="social-proof-close" onclick="SocialProof.dismiss(event)">&times;</button>
    `;

    toastEl.classList.add("show");
    setTimeout(() => {
      if (toastEl) toastEl.classList.remove("show");
    }, 6000);
  }

  function dismiss(e) {
    if (e) e.stopPropagation();
    if (toastEl) toastEl.classList.remove("show");
  }

  return { init, dismiss };
})();

/* ── 2. Exit-Intent Abandoned Cart Recovery ───────────────────── */
const ExitIntent = (() => {
  let shown = false;
  let overlayEl = null;

  function init() {
    if (sessionStorage.getItem("buyhelps_exit_shown")) return;
    document.addEventListener("mouseleave", handleMouseLeave);
  }

  function handleMouseLeave(e) {
    if (e.clientY <= 15 && !shown) {
      const cartCount = typeof Cart !== "undefined" ? Cart.getItemCount() : 0;
      if (cartCount > 0) {
        shown = true;
        sessionStorage.setItem("buyhelps_exit_shown", "true");
        showModal();
      }
    }
  }

  function showModal() {
    if (document.getElementById("exit-intent-overlay")) return;

    const inSubdir = window.location.pathname.replace(/\\/g, '/').includes('/products/');
    const prefix = inSubdir ? '../' : '';

    overlayEl = document.createElement("div");
    overlayEl.id = "exit-intent-overlay";
    overlayEl.className = "exit-intent-overlay";
    overlayEl.innerHTML = `
      <div class="exit-intent-card">
        <div class="exit-intent-badge">🎁 SPECIAL CART OFFER</div>
        <h3 style="font-size:1.6rem;font-weight:800;margin-bottom:0.5rem;">Wait! Don't leave your cart behind</h3>
        <p style="color:var(--color-text-secondary);font-size:0.95rem;margin-bottom:1.5rem;line-height:1.45;">
          Complete your checkout right now and get an <strong>extra 5% discount</strong> on your entire purchase!
        </p>
        <div style="background:var(--color-surface-subtle);border:2px dashed #4F46E5;border-radius:var(--radius-md);padding:1rem;margin-bottom:1.5rem;">
          <span style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.25rem;">Use Exclusive Coupon at Checkout:</span>
          <strong style="font-size:1.4rem;color:#4F46E5;letter-spacing:0.1em;">EXTRA5</strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <a href="${prefix}checkout.html" class="btn btn-primary btn-block" style="padding:0.95rem;font-size:1.05rem;" onclick="ExitIntent.close()">
            Claim 5% Off &amp; Checkout Now &rarr;
          </a>
          <button type="button" class="btn btn-outline btn-block" onclick="ExitIntent.close()" style="border:none;color:var(--color-text-muted);font-size:0.85rem;cursor:pointer;">
            No thanks, I will pay full price
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlayEl);
    requestAnimationFrame(() => overlayEl.classList.add("active"));
  }

  function close() {
    if (overlayEl) {
      overlayEl.classList.remove("active");
      setTimeout(() => overlayEl.remove(), 350);
    }
  }

  return { init, close };
})();

/* ── 3. Recently Viewed Products Tracker ──────────────────────── */
const RecentlyViewed = (() => {
  const KEY = "buyhelps_recently_viewed";

  function add(productId) {
    if (!productId) return;
    try {
      let list = getIds();
      list = list.filter((id) => id !== productId);
      list.unshift(productId);
      if (list.length > 8) list = list.slice(0, 8);
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
  }

  function getIds() {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const ids = getIds();
    if (ids.length === 0) {
      container.style.display = "none";
      return;
    }
    const products = ids
      .map((id) => (typeof getProductById === "function" ? getProductById(id) : null))
      .filter(Boolean);
    if (products.length === 0) {
      container.style.display = "none";
      return;
    }

    container.style.display = "block";
    container.innerHTML = `
      <section class="section" style="padding-top:2.5rem;border-top:1px solid var(--color-border);">
        <div class="section-header" style="margin-bottom:1.5rem;">
          <div>
            <h2 class="section-title" style="font-size:1.5rem;">🕒 Recently Viewed</h2>
            <p class="section-subtitle">Pick up right where you left off</p>
          </div>
          <button type="button" class="btn btn-sm btn-secondary" onclick="RecentlyViewed.clear('${containerId}')">Clear History</button>
        </div>
        <div class="grid grid-cols-4">
          ${products.map((p) => renderProductCard(p)).join("")}
        </div>
      </section>
    `;
  }

  function clear(containerId) {
    localStorage.removeItem(KEY);
    const container = document.getElementById(containerId);
    if (container) container.style.display = "none";
    showToast("Browsing history cleared");
  }

  return { add, getIds, render, clear };
})();

/* ── 4. Interactive Floating AI Support Assistant ─────────────── */
const SupportChat = (() => {
  let launcherEl = null;
  let windowEl = null;

  function init() {
    if (document.getElementById("support-chat-launcher")) return;

    launcherEl = document.createElement("button");
    launcherEl.id = "support-chat-launcher";
    launcherEl.className = "support-chat-launcher";
    launcherEl.title = "Chat with Buyhelps Assistant";
    launcherEl.innerHTML = `
      <span class="support-online-badge"></span>
      <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    `;
    launcherEl.onclick = toggleWindow;
    document.body.appendChild(launcherEl);

    windowEl = document.createElement("div");
    windowEl.id = "support-chat-window";
    windowEl.className = "support-chat-window";
    windowEl.innerHTML = `
      <div class="support-chat-header">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div style="position:relative;width:34px;height:34px;border-radius:50%;background:#fff;display:grid;place-items:center;color:#4F46E5;font-weight:800;font-size:1.1rem;">
            🤖
            <span style="position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:#10B981;border:2px solid #fff;"></span>
          </div>
          <div>
            <div style="font-weight:700;font-size:0.95rem;">Buyhelps Assistant</div>
            <div style="font-size:0.75rem;opacity:0.85;">Online • Typically replies instantly</div>
          </div>
        </div>
        <button type="button" onclick="SupportChat.toggleWindow()" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;line-height:1;">&times;</button>
      </div>

      <div class="support-chat-messages" id="support-chat-messages">
        <div class="chat-bubble bot">
          👋 Hello! Welcome to <strong>Buyhelps</strong>. I am your automated shopping assistant. How may I help you today?
        </div>
      </div>

      <div class="support-chat-chips">
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('Where is my package?')">📦 Track Order</button>
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('How do returns work?')">🔄 Return Policy</button>
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('What payment methods are supported?')">💳 Payment Methods</button>
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('How to use Buyhelps Cash Wallet?')">💰 Wallet Balance</button>
      </div>

      <form class="support-chat-input-bar" onsubmit="SupportChat.handleSubmit(event)">
        <input type="text" id="support-input-text" class="form-input" placeholder="Ask a question…" style="flex:1;padding:0.5rem 0.75rem;font-size:0.875rem;" autocomplete="off">
        <button type="submit" class="btn btn-primary" style="padding:0.5rem 0.9rem;border-radius:var(--radius-sm);">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;
    document.body.appendChild(windowEl);
  }

  function toggleWindow() {
    if (!windowEl) return;
    windowEl.classList.toggle("active");
    if (windowEl.classList.contains("active")) {
      setTimeout(() => {
        const inp = document.getElementById("support-input-text");
        if (inp) inp.focus();
      }, 300);
    }
  }

  function appendMsg(text, sender) {
    const msgsEl = document.getElementById("support-chat-messages");
    if (!msgsEl) return;
    const b = document.createElement("div");
    b.className = `chat-bubble ${sender}`;
    b.innerHTML = text;
    msgsEl.appendChild(b);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function sendChip(text) {
    handleQuery(text);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const inp = document.getElementById("support-input-text");
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    inp.value = "";
    handleQuery(val);
  }

  function handleQuery(query) {
    appendMsg(query, "user");

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";

      if (q.includes("track") || q.includes("where") || q.includes("order") || q.includes("package")) {
        const lastOrder = localStorage.getItem("buyhelps_last_order_id") || "#BUYHELPS-2026-84920";
        reply = `📦 Your active order <strong>${lastOrder}</strong> is currently <strong>In Transit</strong> with BlueDart Air Express.<br><br>Estimated arrival is <strong>Monday, Nov 2</strong>. View all live milestones on the <a href="account.html" style="color:#4F46E5;font-weight:700;text-decoration:underline;">Account Tracking Hub</a>.`;
      } else if (q.includes("return") || q.includes("refund")) {
        reply = `🔄 Buyhelps provides a <strong>30-Day Hassle-Free Doorstep Return Guarantee</strong> on all catalog items! Our courier will pick up the item for free and refunds are initiated within 24 hours.`;
      } else if (q.includes("wallet") || q.includes("cash") || q.includes("balance")) {
        reply = `💰 You have an active balance of <strong>₹1,250 Buyhelps Cash</strong> in your wallet! You can apply this with 1 click during checkout to reduce your total.`;
      } else if (q.includes("payment") || q.includes("upi") || q.includes("card") || q.includes("cod")) {
        reply = `💳 We accept all major payment methods:<br>• <strong>Instant UPI</strong> (GPay, PhonePe, Paytm, BHIM)<br>• <strong>Credit/Debit Cards</strong> (Visa, MasterCard, RuPay, Amex)<br>• <strong>Cash on Delivery (COD)</strong><br>• <strong>Buyhelps Cash Wallet</strong> balance.`;
      } else if (q.includes("discount") || q.includes("coupon") || q.includes("promo") || q.includes("code")) {
        reply = `🎟️ Active promo codes available right now:<br>• <strong>BUYHELPS10</strong>: 10% off storewide<br>• <strong>FESTIVE500</strong>: Flat ₹500 off (orders ≥ ₹1,999)<br>• <strong>EXTRA5</strong>: Extra 5% off!`;
      } else {
        reply = `Thank you for your question! For special inquiries, you can reach out directly to our 24/7 support desk at <a href="mailto:support@buyhelps.in" style="color:#4F46E5;font-weight:700;">support@buyhelps.in</a> or call toll-free at 1800-BUY-HELPS.`;
      }

      appendMsg(reply, "bot");
    }, 550);
  }

  return { init, toggleWindow, sendChip, handleSubmit };
})();

/* ── 5. Product Comparison System ─────────────────────────────── */
const ProductComparison = (() => {
  const KEY = "buyhelps_compare_ids";

  function get() {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function toggle(id) {
    let list = get();
    const product = typeof getProductById === "function" ? getProductById(id) : null;
    const title = product ? product.title : "Product";

    if (list.includes(id)) {
      list = list.filter((item) => item !== id);
      showToast(`${title} removed from comparison`);
    } else {
      if (list.length >= 3) {
        showToast("You can compare up to 3 products at a time");
        return;
      }
      list.push(id);
      showToast(`⚖️ ${title} added to comparison!`);
    }

    localStorage.setItem(KEY, JSON.stringify(list));
    renderBar();
  }

  function init() {
    renderBar();
  }

  function renderBar() {
    let barEl = document.getElementById("compare-floating-bar");
    const list = get();

    if (list.length === 0) {
      if (barEl) barEl.classList.remove("show");
      return;
    }

    if (!barEl) {
      barEl = document.createElement("div");
      barEl.id = "compare-floating-bar";
      barEl.className = "compare-floating-bar";
      document.body.appendChild(barEl);
    }

    barEl.innerHTML = `
      <span class="compare-badge-pill">${list.length}</span>
      <span style="font-weight:700;font-size:0.875rem;">Selected to Compare</span>
      <button type="button" class="btn btn-primary btn-sm" onclick="ProductComparison.openModal()" style="padding:0.4rem 0.9rem;">Compare Now &rarr;</button>
      <button type="button" onclick="ProductComparison.clear()" style="background:none;border:none;color:var(--color-text-muted);font-size:0.8rem;text-decoration:underline;cursor:pointer;">Clear</button>
    `;

    requestAnimationFrame(() => barEl.classList.add("show"));
  }

  function clear() {
    localStorage.removeItem(KEY);
    renderBar();
    showToast("Comparison cleared");
  }

  function openModal() {
    const list = get();
    if (list.length === 0) return;
    const products = list
      .map((id) => (typeof getProductById === "function" ? getProductById(id) : null))
      .filter(Boolean);

    let modalEl = document.getElementById("compare-modal-overlay");
    if (!modalEl) {
      modalEl = document.createElement("div");
      modalEl.id = "compare-modal-overlay";
      modalEl.className = "account-modal-overlay active";
      document.body.appendChild(modalEl);
    }

    modalEl.style.display = "flex";
    modalEl.innerHTML = `
      <div class="account-modal-card" style="max-width:850px;width:95%;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;padding-bottom:0.75rem;border-bottom:1px solid var(--color-border);">
          <h3 style="font-size:1.35rem;font-weight:800;">⚖️ Side-by-Side Product Comparison</h3>
          <button type="button" onclick="ProductComparison.closeModal()" style="font-size:1.5rem;line-height:1;opacity:0.6;cursor:pointer;">&times;</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="compare-table">
            <tr>
              <td>Product</td>
              ${products
                .map(
                  (p) => `
                <td>
                  <img src="${p.images[0]}" alt="${p.title}" onerror="handleImgError(this, '${p.title.replace(/'/g, "\\'")}', '${p.category}')" style="width:80px;height:80px;object-fit:cover;border-radius:var(--radius-md);margin:0 auto 0.5rem;display:block;">
                  <strong>${p.title}</strong>
                </td>
              `
                )
                .join("")}
            </tr>
            <tr>
              <td>Price</td>
              ${products
                .map(
                  (p) =>
                    `<td><strong style="color:var(--color-primary);font-size:1.1rem;">${formatPrice(p.price)}</strong></td>`
                )
                .join("")}
            </tr>
            <tr>
              <td>Category</td>
              ${products
                .map((p) => `<td><span class="badge" style="text-transform:capitalize;">${p.category}</span></td>`)
                .join("")}
            </tr>
            <tr>
              <td>Customer Rating</td>
              ${products.map((p) => `<td>${renderStars(p.rating)} <strong>${p.rating} / 5</strong></td>`).join("")}
            </tr>
            <tr>
              <td>Delivery</td>
              ${products
                .map(() => `<td><span style="color:#10B981;font-weight:600;">✓ Free Express (2-4 Days)</span></td>`)
                .join("")}
            </tr>
            <tr>
              <td>Trial &amp; Return</td>
              ${products.map(() => `<td>30-Day Doorstep Trial</td>`).join("")}
            </tr>
            <tr>
              <td>Action</td>
              ${products
                .map(
                  (p) => `
                <td>
                  <button class="btn btn-primary btn-sm btn-block" onclick="Cart.addItem('${p.id}');ProductComparison.closeModal();">+ Add to Cart</button>
                </td>
              `
                )
                .join("")}
            </tr>
          </table>
        </div>
      </div>
    `;
  }

  function closeModal() {
    const modalEl = document.getElementById("compare-modal-overlay");
    if (modalEl) modalEl.style.display = "none";
  }

  return { get, toggle, init, renderBar, clear, openModal, closeModal };
})();

/* ── 6. Printable GST Tax Invoice Generator ──────────────────── */
const InvoiceModal = (() => {
  function open(customOrderId) {
    const orderId = customOrderId || localStorage.getItem("buyhelps_last_order_id") || "#BUYHELPS-2026-84920";
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    let modalEl = document.getElementById("invoice-modal-overlay");
    if (!modalEl) {
      modalEl = document.createElement("div");
      modalEl.id = "invoice-modal-overlay";
      modalEl.className = "account-modal-overlay active";
      document.body.appendChild(modalEl);
    }

    modalEl.style.display = "flex";
    modalEl.innerHTML = `
      <div class="account-modal-card" style="max-width:820px;width:95%;padding:1.5rem;background:transparent;box-shadow:none;">
        <div class="no-print" style="display:flex;justify-content:flex-end;gap:0.75rem;margin-bottom:1rem;">
          <button type="button" class="btn btn-secondary" onclick="InvoiceModal.close()">Close</button>
          <button type="button" class="btn btn-primary" onclick="window.print()" style="display:flex;align-items:center;gap:0.4rem;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="invoice-paper">
          <!-- Header -->
          <div style="display:flex;justify-content:space-between;align-items:start;border-bottom:2px solid #E5E7EB;padding-bottom:1.5rem;margin-bottom:1.5rem;">
            <div>
              <div style="font-size:1.8rem;font-weight:900;color:#4F46E5;letter-spacing:-0.03em;">Buyhelps</div>
              <div style="font-size:0.8rem;font-weight:700;color:#6B7280;letter-spacing:0.1em;">SMART STORE INDIA PVT. LTD.</div>
              <div style="font-size:0.85rem;color:#4B5563;margin-top:0.35rem;line-height:1.4;">
                100 Ft Road, HAL 2nd Stage, Indiranagar<br>
                Bengaluru, Karnataka - 560038<br>
                <strong>GSTIN:</strong> 29AAACB1234F1Z5 • <strong>PAN:</strong> AAACB1234F
              </div>
            </div>
            <div style="text-align:right;">
              <h2 style="font-size:1.5rem;font-weight:800;color:#111827;margin-bottom:0.25rem;">TAX INVOICE</h2>
              <div style="font-size:0.9rem;font-weight:700;color:#4F46E5;">${orderId}</div>
              <div style="font-size:0.85rem;color:#6B7280;margin-top:0.25rem;">Invoice Date: ${dateStr}</div>
              <div style="font-size:0.85rem;color:#6B7280;">Carrier: BlueDart Air Express (AWB: 8492048201)</div>
            </div>
          </div>

          <!-- Billed To / Shipped To -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #E5E7EB;">
            <div>
              <span style="font-size:0.8rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Billed To / Sold To:</span>
              <div style="font-weight:700;font-size:0.95rem;margin-top:0.25rem;">Vikram V. Rao</div>
              <div style="font-size:0.85rem;color:#4B5563;line-height:1.4;">
                Flat 402, Green Acres Residency<br>
                12th Main Road, Indiranagar<br>
                Bengaluru, Karnataka - 560038<br>
                📞 +91 98765 43210
              </div>
            </div>
            <div>
              <span style="font-size:0.8rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Shipping Address:</span>
              <div style="font-weight:700;font-size:0.95rem;margin-top:0.25rem;">Vikram V. Rao (Home)</div>
              <div style="font-size:0.85rem;color:#4B5563;line-height:1.4;">
                Flat 402, Green Acres Residency<br>
                12th Main Road, Indiranagar<br>
                Bengaluru, Karnataka - 560038<br>
                Place of Supply: Karnataka (State Code: 29)
              </div>
            </div>
          </div>

          <!-- Line Items Table -->
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;font-size:0.875rem;">
            <thead>
              <tr style="background:#F9FAFB;border-bottom:2px solid #E5E7EB;text-align:left;">
                <th style="padding:0.75rem;">#</th>
                <th style="padding:0.75rem;">Description of Goods</th>
                <th style="padding:0.75rem;">HSN Code</th>
                <th style="padding:0.75rem;text-align:center;">Qty</th>
                <th style="padding:0.75rem;text-align:right;">Unit Price</th>
                <th style="padding:0.75rem;text-align:right;">Taxable Amt</th>
                <th style="padding:0.75rem;text-align:right;">GST (18%)</th>
                <th style="padding:0.75rem;text-align:right;">Total (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #E5E7EB;">
                <td style="padding:0.75rem;">1</td>
                <td style="padding:0.75rem;"><strong>Studio Wireless Headphones</strong><br><span style="font-size:0.75rem;color:#6B7280;">Color: Matte Black</span></td>
                <td style="padding:0.75rem;">85183000</td>
                <td style="padding:0.75rem;text-align:center;">1</td>
                <td style="padding:0.75rem;text-align:right;">₹12,711.02</td>
                <td style="padding:0.75rem;text-align:right;">₹12,711.02</td>
                <td style="padding:0.75rem;text-align:right;">₹2,287.98</td>
                <td style="padding:0.75rem;text-align:right;font-weight:700;">₹14,999.00</td>
              </tr>
            </tbody>
          </table>

          <!-- Totals Breakdown -->
          <div style="display:flex;justify-content:space-between;align-items:start;margin-top:1.5rem;">
            <div style="max-width:320px;font-size:0.8rem;color:#6B7280;line-height:1.4;">
              <p><strong>Declaration:</strong> We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
              <div style="display:flex;align-items:center;gap:0.75rem;margin-top:1rem;">
                <div style="width:60px;height:60px;background:#F3F4F6;border:1px solid #D1D5DB;display:grid;place-items:center;font-size:0.65rem;font-weight:700;text-align:center;padding:4px;">
                  [QR Validated]
                </div>
                <div>
                  <div style="font-weight:700;color:#111827;">E-Invoice IRN:</div>
                  <div style="font-size:0.7rem;word-break:break-all;">a7f92b...e48109c</div>
                </div>
              </div>
            </div>

            <div style="width:280px;font-size:0.875rem;">
              <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                <span>Subtotal (Excl. Tax):</span>
                <span>₹12,711.02</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                <span>CGST (9.0%):</span>
                <span>₹1,143.99</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                <span>SGST (9.0%):</span>
                <span>₹1,143.99</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                <span>Delivery:</span>
                <span style="color:#10B981;font-weight:600;">FREE</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:2px solid #E5E7EB;font-weight:800;font-size:1.15rem;color:#111827;">
                <span>Total Amount:</span>
                <span>₹14,999.00</span>
              </div>
              <div style="text-align:right;margin-top:1.25rem;">
                <div style="font-size:0.75rem;color:#6B7280;">For Buyhelps India Pvt Ltd</div>
                <div style="font-weight:700;font-size:0.9rem;color:#4F46E5;margin-top:0.25rem;font-style:italic;">Authorized Signatory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function close() {
    const modalEl = document.getElementById("invoice-modal-overlay");
    if (modalEl) modalEl.style.display = "none";
  }

  return { open, close };
})();

/* ── 7. Multi-Currency Manager (Feature 7) ─────────────────────── */
const CurrencyManager = (() => {
  const KEY = "buyhelps_currency";

  function get() {
    return localStorage.getItem(KEY) || "INR";
  }

  function set(curr) {
    localStorage.setItem(KEY, curr);
    showToast(`Currency changed to ${curr}`);
    setTimeout(() => window.location.reload(), 250);
  }

  function toggleDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById("currency-menu");
    if (menu) menu.classList.toggle("show");
  }

  document.addEventListener("click", () => {
    const menu = document.getElementById("currency-menu");
    if (menu) menu.classList.remove("show");
  });

  return { get, set, toggleDropdown };
})();

/* ── 8. Bilingual Language Manager (Feature 7) ─────────────────── */
const LanguageManager = (() => {
  const KEY = "buyhelps_lang";

  function get() {
    return localStorage.getItem(KEY) || "EN";
  }

  function toggle() {
    const curr = get();
    const next = curr === "EN" ? "HI" : "EN";
    localStorage.setItem(KEY, next);
    showToast(next === "HI" ? "भाषा बदलकर 'हिन्दी' कर दी गई है" : "Language switched to English");
    setTimeout(() => window.location.reload(), 250);
  }

  return { get, toggle };
})();
