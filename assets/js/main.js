/* ==========================================================================
   MINIMAL E-COMMERCE - MAIN (main.js)
   Global initialisation: navbar, theme, mobile menu, search, cart drawer
   ========================================================================== */

// Apply saved theme immediately (default: light)
const initialTheme = localStorage.getItem("buyhelps_theme") || "light";
document.documentElement.setAttribute("data-theme", initialTheme);

// Apply saved language immediately (default: EN, font: Inter; HI, font: Poppins)
const initialLang = localStorage.getItem("buyhelps_lang") || "EN";
document.documentElement.setAttribute("data-lang", initialLang);
document.documentElement.setAttribute("lang", initialLang === "HI" ? "hi" : "en");

/* ── Wishlist Manager ────────────────────────────────────────── */
const Wishlist = (() => {
  const KEY = "buyhelps_wishlist";
  const DEFAULT_ITEMS = ["minimal-watch", "leather-journal", "ceramic-pour-over"];

  function get() {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ITEMS;
    } catch (e) {
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
  try { initTheme(); } catch (e) { console.error(e); }
  try { if (typeof LanguageManager !== "undefined") LanguageManager.init(); } catch (e) { console.error(e); }
  try { initMobileMenu(); } catch (e) { console.error(e); }
  try { initCartDrawer(); } catch (e) { console.error(e); }
  try { initSearchModal(); } catch (e) { console.error(e); }
  try { syncCartBadge(); } catch (e) { console.error(e); }
  try { if (typeof SocialProof !== "undefined") SocialProof.init(); } catch (e) { console.error(e); }
  try { if (typeof ExitIntent !== "undefined") ExitIntent.init(); } catch (e) { console.error(e); }
  try { if (typeof SupportChat !== "undefined") SupportChat.init(); } catch (e) { console.error(e); }
  try { if (typeof ProductComparison !== "undefined") ProductComparison.init(); } catch (e) { console.error(e); }
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

  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
  const cart = Cart.getCart();

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-drawer-empty">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
        <p style="font-weight:600;margin-bottom:0.25rem;">${isHindi ? 'आपकी कार्ट खाली है' : 'Your cart is empty'}</p>
        <p style="font-size:0.85rem;">${isHindi ? 'हमारे संग्रह को देखें और अपनी पसंद का उत्पाद जोड़ें।' : 'Browse our collection and add something you love.'}</p>
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
        <span class="cart-item-remove" onclick="Cart.removeItem('${item.id}','${item.variant}')">${isHindi ? 'हटाएं' : 'Remove'}</span>
      </div>
    </div>`
    )
    .join("");

  if (footer) {
    footer.style.display = "block";
    footer.innerHTML = `
      <div class="cart-subtotal-row">
        <span>${isHindi ? 'उपकुल' : 'Subtotal'}</span>
        <span class="cart-subtotal-price">${formatPrice(Cart.getSubtotal())}</span>
      </div>
      <p class="cart-shipping-notice">${isHindi ? 'शिपिंग और कर चेकआउट के समय जोड़े जाएंगे।' : 'Shipping & taxes calculated at checkout.'}</p>
      <a href="cart.html" class="btn btn-primary btn-block" style="margin-bottom:0.5rem;">${isHindi ? 'कार्ट देखें' : 'View Cart'}</a>
      <a href="checkout.html" class="btn btn-outline btn-block">${isHindi ? 'चेकआउट' : 'Checkout'}</a>`;
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
              <div class="search-live-cat">${(getCategoryById(p.category) && getCategoryById(p.category).name) ? getCategoryById(p.category).name : p.category}</div>
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
  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
  const brandSub = isHindi ? "स्मार्ट स्टोर" : "SMART STORE";
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
        <span class="brand-sub">${brandSub}</span>
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

  const titles = isHindi
    ? {
        currency: "मुद्रा बदलें",
        lang: "भाषा बदलें (English / हिन्दी)",
        theme: "डार्क/लाइट मोड बदलें",
        search: "खोजें (Ctrl+K)",
        account: "मेरा खाता (ऑर्डर और पते)",
        cart: "कार्ट"
      }
    : {
        currency: "Change Currency",
        lang: "Toggle Language (English / हिन्दी)",
        theme: "Toggle Dark/Light Mode",
        search: "Search (Ctrl+K)",
        account: "My Account (Orders & Addresses)",
        cart: "Cart"
      };

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
        <div class="currency-lang-pill" id="currency-pill" onclick="CurrencyManager.toggleDropdown(event)" title="${titles.currency}">
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
        <button type="button" class="lang-toggle-btn" onclick="LanguageManager.toggle()" title="${titles.lang}">
          🌐 <span id="active-lang-label">${isHindi ? 'हिन्दी' : 'EN'}</span>
        </button>

        <button class="action-btn theme-toggle-btn" title="${titles.theme}" aria-label="${titles.theme}">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="action-btn" data-open-search title="${titles.search}">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <a href="${prefix}account.html" class="action-btn ${activePage === 'account' ? 'active' : ''}" title="${titles.account}" aria-label="${titles.account}">
          <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </a>
        <button class="action-btn" data-open-cart title="${titles.cart}">
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
  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";

  const brandDesc = isHindi
    ? "सार्थक जीवन के लिए चुनिंदा आवश्यक वस्तुएं। उत्कृष्ट शिल्प कौशल, टिकाऊ सामग्री और कालातीत डिज़ाइन।"
    : "Curated essentials for intentional living. Quality craftsmanship, sustainable materials, timeless design.";

  const shopHeading = isHindi ? "खरीदारी" : "Shop";
  const accountHeading = isHindi ? "खाता और ऑर्डर" : "Account & Orders";
  const supportHeading = isHindi ? "सहायता" : "Support";

  const shopLinks = isHindi
    ? [
        { href: `${prefix}category.html?cat=electronics`, text: "इलेक्ट्रॉनिक्स" },
        { href: `${prefix}category.html?cat=fashion`, text: "फैशन" },
        { href: `${prefix}category.html?cat=home`, text: "घर और रहन-सहन" },
        { href: `${prefix}category.html?cat=books`, text: "किताबें और स्टेशनरी" },
        { href: `${prefix}category.html?cat=wellness`, text: "वेलनेस" },
        { href: `${prefix}category.html?cat=sports`, text: "खेल और आउटडोर" }
      ]
    : [
        { href: `${prefix}category.html?cat=electronics`, text: "Electronics" },
        { href: `${prefix}category.html?cat=fashion`, text: "Fashion" },
        { href: `${prefix}category.html?cat=home`, text: "Home & Living" },
        { href: `${prefix}category.html?cat=books`, text: "Books & Stationery" },
        { href: `${prefix}category.html?cat=wellness`, text: "Wellness" },
        { href: `${prefix}category.html?cat=sports`, text: "Sports & Outdoors" }
      ];

  const accountLinks = isHindi
    ? [
        { href: `${prefix}account.html?tab=orders`, text: "ऑर्डर ट्रैक करें" },
        { href: `${prefix}account.html?tab=addresses`, text: "सहेजे गए पते" },
        { href: `${prefix}account.html?tab=payments`, text: "भुगतान विधियाँ" },
        { href: `${prefix}account.html?tab=wishlist`, text: "विशलिस्ट" },
        { href: `${prefix}account.html`, text: "खाता सेटिंग्स" }
      ]
    : [
        { href: `${prefix}account.html?tab=orders`, text: "Track Orders" },
        { href: `${prefix}account.html?tab=addresses`, text: "Saved Addresses" },
        { href: `${prefix}account.html?tab=payments`, text: "Payment Methods" },
        { href: `${prefix}account.html?tab=wishlist`, text: "Wishlist" },
        { href: `${prefix}account.html`, text: "Account Settings" }
      ];

  const supportLinks = isHindi
    ? [
        { href: `${prefix}terms.html`, text: "शिपिंग और वापसी" },
        { href: "#", text: "अक्सर पूछे जाने वाले सवाल" },
        { href: "#", text: "साइज गाइड" },
        { href: `${prefix}privacy.html`, text: "गोपनीयता नीति" }
      ]
    : [
        { href: `${prefix}terms.html`, text: "Shipping & Returns" },
        { href: "#", text: "FAQ & Help Center" },
        { href: "#", text: "Size Guide" },
        { href: `${prefix}privacy.html`, text: "Privacy Policy" }
      ];

  const copyrightText = "© 2026 Buyhelps. made with ❤️ By vvr. All rights reserved.";
  const termsText = isHindi ? "नियम व शर्तें" : "Terms & Conditions";
  const privacyText = isHindi ? "गोपनीयता नीति" : "Privacy Policy";

  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${getBrandLogoHTML(prefix + "index.html")}
          <p style="margin-top:0.75rem;">${brandDesc}</p>
        </div>
        <div>
          <h4 class="footer-heading">${shopHeading}</h4>
          <div class="footer-links">
            ${shopLinks.map(l => `<a href="${l.href}">${l.text}</a>`).join("")}
          </div>
        </div>
        <div>
          <h4 class="footer-heading">${accountHeading}</h4>
          <div class="footer-links">
            ${accountLinks.map(l => `<a href="${l.href}">${l.text}</a>`).join("")}
          </div>
        </div>
        <div>
          <h4 class="footer-heading">${supportHeading}</h4>
          <div class="footer-links">
            ${supportLinks.map(l => `<a href="${l.href}">${l.text}</a>`).join("")}
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-credits notranslate" data-no-translate="true">${copyrightText}</div>
        <div class="footer-legal-links">
          <a href="${prefix}terms.html">${termsText}</a>
          <span class="footer-legal-sep">•</span>
          <a href="${prefix}privacy.html">${privacyText}</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function getCartDrawerHTML() {
  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
  const drawerTitle = isHindi ? "आपकी कार्ट" : "Your Cart";
  return `
  <div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>
  <aside class="cart-drawer" id="cart-drawer">
    <div class="cart-drawer-header">
      <h3 class="cart-drawer-title">${drawerTitle}</h3>
      <button class="cart-drawer-close" id="cart-drawer-close">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="cart-drawer-body" id="cart-drawer-body"></div>
    <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
  </aside>`;
}

function getSearchModalHTML() {
  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
  const placeholder = isHindi ? "48 चुनिंदा उत्पादों में खोजें…" : "Search 48 curated products…";
  const popularLbl = isHindi ? "लोकप्रिय:" : "Popular:";
  const chips = isHindi
    ? [
        { q: "Headphones", label: "🎧 हेडफ़ोन" },
        { q: "Keyboard", label: "⌨️ कीबोर्ड" },
        { q: "Coffee", label: "☕ कॉफ़ी सेट" },
        { q: "Watch", label: "⌚ घड़ी" },
        { q: "Overshirt", label: "👕 ओवरशर्ट" },
        { q: "Journal", label: "📓 जर्नल" }
      ]
    : [
        { q: "Headphones", label: "🎧 Headphones" },
        { q: "Keyboard", label: "⌨️ Keyboard" },
        { q: "Coffee", label: "☕ Coffee Set" },
        { q: "Watch", label: "⌚ Watch" },
        { q: "Overshirt", label: "👕 Overshirt" },
        { q: "Journal", label: "📓 Journal" }
      ];

  const helperText = isHindi
    ? "ऊपर कोई कीवर्ड टाइप करें या लोकप्रिय विषय चुनें…"
    : "Type any keyword above or click a trending topic…";

  return `
  <div class="search-modal-overlay" id="search-modal-overlay">
    <div class="search-modal">
      <div class="search-input-wrap">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input class="search-input" id="search-input" type="text" placeholder="${placeholder}" autocomplete="off">
        <kbd style="font-size:0.75rem;background:#f4f4f5;padding:0.15rem 0.45rem;border-radius:4px;border:1px solid #e4e4e7;color:#71717a;">ESC</kbd>
      </div>
      <div class="search-trending-chips">
        <span style="font-size:0.75rem;font-weight:700;color:var(--color-text-muted);text-transform:uppercase;">${popularLbl}</span>
        ${chips.map((c) => `<button type="button" class="trending-chip" onclick="executeSearch('${c.q}')">${c.label}</button>`).join("")}
      </div>
      <div class="search-results" id="search-results">
        <p style="padding:1.5rem;color:var(--color-text-muted);text-align:center;">${helperText}</p>
      </div>
    </div>
  </div>`;
}

/* ── Product Card Renderer ───────────────────────────────────── */
function renderProductCard(product) {
  const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
  const p = (isHindi && typeof PRODUCT_TRANSLATIONS_HI !== 'undefined' && PRODUCT_TRANSLATIONS_HI[product.id])
    ? Object.assign({}, product, PRODUCT_TRANSLATIONS_HI[product.id])
    : product;
  const badgeText = p.badge === 'new'
    ? (isHindi ? 'नया' : 'New')
    : product.badge === 'sale'
      ? (isHindi ? 'छूट' : 'Sale')
      : (isHindi ? 'इको' : 'Eco');

  const badgeHTML = product.badge
    ? `<span class="product-card-badge"><span class="badge badge-${product.badge}">${badgeText}</span></span>`
    : "";
  const inSubdir = window.location.pathname.replace(/\\/g, '/').includes('/products/');
  const prefix = inSubdir ? '../' : '';
  const link = product.dedicatedPage ? `${prefix}products/${product.id}.html` : `${prefix}product.html?id=${product.id}`;
  const isWishlisted = typeof Wishlist !== 'undefined' && Wishlist.has(product.id);
  const isCompared = typeof ProductComparison !== 'undefined' && ProductComparison.get().includes(product.id);
  const addBtnText = isHindi ? "+ जोड़ें" : "+ Add";
  const compareTitle = isHindi ? "तुलना करें" : "Compare Specs";
  const wishlistTitle = isWishlisted
    ? (isHindi ? "विशलिस्ट से हटाएं" : "Remove from Wishlist")
    : (isHindi ? "विशलिस्ट में सहेजें" : "Save to Wishlist");

  const catObj = getCategoryById(product.category);
  const catName = (catObj && catObj.name) ? catObj.name : product.category;

  return `
  <article class="product-card">
    <div class="product-card-image-wrap">
      ${badgeHTML}
      <button type="button" class="product-card-compare-btn ${isCompared ? 'active' : ''}" onclick="event.preventDefault();event.stopPropagation();ProductComparison.toggle('${product.id}')" title="${compareTitle}" aria-label="${compareTitle}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
      </button>
      <button type="button" class="product-card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" onclick="event.preventDefault();event.stopPropagation();Wishlist.toggle('${product.id}')" title="${wishlistTitle}" aria-label="${wishlistTitle}">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="${isWishlisted ? '#EC4899' : 'none'}" stroke="${isWishlisted ? '#EC4899' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <a href="${link}" style="display:block;width:100%;height:100%;">
        <img src="${product.images[0]}" alt="${p.title}" loading="lazy" onerror="handleImgError(this, '${p.title.replace(/'/g, "\\'")}', '${p.category}')">
      </a>
      <div class="product-card-quick-add">
        <button class="btn btn-primary btn-sm" onclick="event.preventDefault();Cart.addItem('${product.id}')">${addBtnText}</button>
      </div>
    </div>
    <div class="product-card-content">
      <span class="product-category">${catName}</span>
      <a href="${link}" class="product-title">${p.title}</a>
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
    const isHindi = localStorage.getItem("buyhelps_lang") === "HI";
    const prodTitle = (isHindi && typeof PRODUCT_TRANSLATIONS_HI !== 'undefined' && PRODUCT_TRANSLATIONS_HI[item.id])
      ? PRODUCT_TRANSLATIONS_HI[item.id].title
      : item.product;

    toastEl.innerHTML = `
      <img src="${item.img}" alt="${prodTitle}" class="social-proof-img" onerror="handleImgError(this, '${prodTitle}', 'Electronics')">
      <div class="social-proof-content">
        <a href="${link}" class="social-proof-title" style="text-decoration:none;display:block;">${prodTitle}</a>
        <div class="social-proof-meta">
          <span>${isHindi ? `${item.city} से किसी ग्राहक ने खरीदा` : `Someone in <strong>${item.city}</strong>`}</span> • <span>${item.time}</span>
        </div>
        <div style="font-size:0.7rem;color:#10B981;font-weight:700;margin-top:0.15rem;">${isHindi ? '✓ सत्यापित ग्राहक खरीदारी' : '✓ Verified Customer Purchase'}</div>
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
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("buyhelps_exit_shown")) return;
    } catch (e) {}
    document.addEventListener("mouseleave", handleMouseLeave);
  }

  function handleMouseLeave(e) {
    if (e.clientY <= 15 && !shown) {
      const cartCount = typeof Cart !== "undefined" ? Cart.getItemCount() : 0;
      if (cartCount > 0) {
        shown = true;
        try {
          if (typeof sessionStorage !== "undefined") sessionStorage.setItem("buyhelps_exit_shown", "true");
        } catch (e) {}
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
    } catch (e) {}
  }

  function getIds() {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
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

    const isHindi = (typeof LanguageManager !== "undefined" ? LanguageManager.get() : (localStorage.getItem("buyhelps_lang") || "EN")) === "HI";
    const titleText = isHindi ? "🕒 हाल ही में देखे गए उत्पाद" : "🕒 Recently Viewed";
    const subText = isHindi ? "वहीं से शुरू करें जहां आपने छोड़ा था" : "Pick up right where you left off";
    const clearText = isHindi ? "इतिहास साफ़ करें" : "Clear History";

    container.style.display = "block";
    container.innerHTML = `
      <section class="section" style="padding-top:2.5rem;border-top:1px solid var(--color-border);">
        <div class="section-header" style="margin-bottom:1.5rem;">
          <div>
            <h2 class="section-title" style="font-size:1.5rem;">${titleText}</h2>
            <p class="section-subtitle">${subText}</p>
          </div>
          <button type="button" class="btn btn-sm btn-secondary" onclick="RecentlyViewed.clear('${containerId}')">${clearText}</button>
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

    const isHindi = (typeof LanguageManager !== "undefined" ? LanguageManager.get() : (localStorage.getItem("buyhelps_lang") || "EN")) === "HI";

    launcherEl = document.createElement("button");
    launcherEl.id = "support-chat-launcher";
    launcherEl.className = "support-chat-launcher";
    launcherEl.title = isHindi ? "Buyhelps सहायक से चैट करें" : "Chat with Buyhelps Assistant";
    launcherEl.innerHTML = `
      <span class="support-online-badge"></span>
      <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    `;
    launcherEl.onclick = toggleWindow;
    document.body.appendChild(launcherEl);

    const greetingMsg = isHindi
      ? `👋 नमस्ते! <strong>Buyhelps</strong> में आपका स्वागत है। मैं आपका शॉपिंग सहायक हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?`
      : `👋 Hello! Welcome to <strong>Buyhelps</strong>. I am your automated shopping assistant. How may I help you today?`;

    const onlineStatus = isHindi ? "ऑनलाइन • आमतौर पर तुरंत जवाब देता है" : "Online • Typically replies instantly";
    const placeholderText = isHindi ? "सवाल पूछें…" : "Ask a question…";

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
            <div style="font-size:0.75rem;opacity:0.85;">${onlineStatus}</div>
          </div>
        </div>
        <button type="button" onclick="SupportChat.toggleWindow()" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;line-height:1;">&times;</button>
      </div>

      <div class="support-chat-messages" id="support-chat-messages">
        <div class="chat-bubble bot">
          ${greetingMsg}
        </div>
      </div>

      <div class="support-chat-chips">
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('Where is my package?')">${isHindi ? '📦 ऑर्डर ट्रैक करें' : '📦 Track Order'}</button>
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('How do returns work?')">${isHindi ? '🔄 रिटर्न पॉलिसी' : '🔄 Return Policy'}</button>
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('What payment methods are supported?')">${isHindi ? '💳 पेमेंट विधियां' : '💳 Payment Methods'}</button>
        <button type="button" class="chat-chip" onclick="SupportChat.sendChip('How to use Buyhelps Cash Wallet?')">${isHindi ? '💰 वॉलेट बैलेंस' : '💰 Wallet Balance'}</button>
      </div>

      <form class="support-chat-input-bar" onsubmit="SupportChat.handleSubmit(event)">
        <input type="text" id="support-input-text" class="form-input" placeholder="${placeholderText}" style="flex:1;padding:0.5rem 0.75rem;font-size:0.875rem;" autocomplete="off">
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
    } catch (e) {
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
    try {
      window.dispatchEvent(new CustomEvent("currency:changed", { detail: { currency: curr } }));
    } catch (e) {}
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

  const DICTIONARY = {
    // Navigation & Global Header
    "Home": "होम",
    "Categories": "श्रेणियां",
    "Shop": "दुकान",
    "Cart": "कार्ट",
    "Account": "खाता",
    "My Account": "मेरा खाता",
    "SMART STORE": "स्मार्ट स्टोर",
    "Discover Thoughtfully Curated Essentials": "सार्थक जीवन के लिए चुनिंदा आवश्यक वस्तुएं",
    "New Collection 2026": "नया संग्रह 2026",
    "Shop Collection": "संग्रह देखें",
    "Browse Categories": "श्रेणियां देखें",
    "Explore our handpicked selection of quality goods designed to elevate your everyday life. From timeless wardrobe staples to modern accessories, find pieces that blend style with substance.": "रोजमर्रा के जीवन को बेहतर बनाने के लिए हमारे द्वारा चुने गए गुणवत्तापूर्ण सामान का अन्वेषण करें। क्लासिक परिधानों से लेकर आधुनिक एक्सेसरीज़ तक, स्टाइल और गुणवत्ता का बेहतरीन संगम पाएं।",
    "Free Delivery over ₹1,999": "₹1,999 से अधिक पर मुफ़्त डिलीवरी",
    "Free Shipping": "मुफ़्त शिपिंग",
    "Over ₹1,999": "₹1,999 से अधिक",
    "Secure Payment": "सुरक्षित भुगतान",
    "100% Protected": "100% सुरक्षित",
    "Easy Returns": "आसान वापसी",
    "30-day policy": "30-दिनों की वापसी नीति",
    "24/7 Support": "24/7 सहायता",
    "Always here to help": "हमेशा आपकी सेवा में",
    "Shop by Category": "श्रेणी के अनुसार खरीदारी करें",
    "View All →": "सभी देखें →",
    "View All": "सभी देखें",
    "Trending This Season": "इस सीज़न में लोकप्रिय",
    "Join the Buyhelps Community": "Buyhelps समुदाय से जुड़ें",
    "Subscribe to get the latest updates on new arrivals, exclusive offers, and styling tips delivered straight to your inbox.": "नए उत्पादों, विशेष ऑफ़र और स्टाइलिंग टिप्स की ताज़ा जानकारी सीधे अपने इनबॉक्स में पाने के लिए सब्सक्राइब करें।",
    "Subscribe": "सब्सक्राइब करें",
    "Enter your email address": "अपना ईमेल पता दर्ज करें",
    "Enter your email": "अपना ईमेल पता दर्ज करें",
    "Recently Viewed": "हाल ही में देखे गए उत्पाद",

    // Categories & Catalog
    "All Categories": "सभी श्रेणियां",
    "Browse our curated collections": "हमारे चुनिंदा संग्रह ब्राउज़ करें",
    "All Products": "सभी उत्पाद",
    "Price Range": "मूल्य दायरा",
    "All": "सभी",
    "Under ₹2,000": "₹2,000 से कम",
    "₹2,000 - ₹5,000": "₹2,000 - ₹5,000",
    "₹5,000 - ₹10,000": "₹5,000 - ₹10,000",
    "Over ₹10,000": "₹10,000 से अधिक",
    "Sort By": "क्रमबद्ध करें",
    "Newest": "नवीनतम",
    "Price: Low to High": "मूल्य: कम से अधिक",
    "Price: High to Low": "मूल्य: अधिक से कम",
    "Popular": "लोकप्रिय",
    "Electronics": "इलेक्ट्रॉनिक्स",
    "Fashion": "फैशन",
    "Home & Living": "घर और रहन-सहन",
    "Books & Stationery": "किताबें और स्टेशनरी",
    "Wellness": "वेलनेस",
    "Sports & Outdoors": "खेल और आउटडोर",
    "Filtered Products": "फ़िल्टर किए गए उत्पाद",
    "Clear All": "सभी साफ़ करें",

    // Product Card & Details
    "+ Add": "+ जोड़ें",
    "+ Add to Cart": "+ कार्ट में जोड़ें",
    "Add to Cart": "कार्ट में जोड़ें",
    "Added!": "जोड़ दिया गया!",
    "Buy Now": "अभी खरीदें",
    "Quick Add": "त्वरित जोड़ें",
    "Compare": "तुलना करें",
    "Compare Specs": "विशिष्टताओं की तुलना करें",
    "Save to Wishlist": "विशलिस्ट में सहेजें",
    "Remove from Wishlist": "विशलिस्ट से हटाएं",
    "New": "नया",
    "Sale": "छूट",
    "Eco": "इको",
    "Eco Friendly": "इको फ्रेंडली",
    "Artisan Crafted": "कारीगर निर्मित",
    "In Stock": "स्टॉक में उपलब्ध",
    "Out of Stock": "स्टॉक समाप्त",
    "Quantity": "मात्रा",
    "Quantity:": "मात्रा:",
    "Color": "रंग",
    "Color:": "रंग:",
    "Size": "साइज",
    "Size:": "साइज:",
    "Product Details": "उत्पाद विवरण",
    "Specifications": "विशिष्टताएं",
    "Customer Reviews": "ग्राहक समीक्षाएं",
    "You May Also Like": "शायद आपको यह भी पसंद आए",
    "Related Products": "संबंधित उत्पाद",
    "Write a Customer Review": "ग्राहक समीक्षा लिखें",
    "★ Write a Review": "★ समीक्षा लिखें",
    "Submit Review": "समीक्षा सबमिट करें",
    "Your Rating *": "आपकी रेटिंग *",
    "Your Name or Alias *": "आपका नाम या उपनाम *",
    "Your Review Comments *": "आपकी समीक्षा टिप्पणी *",
    "Cancel": "रद्द करें",
    "10-Year Craft Warranty": "10-वर्ष शिल्प वारंटी",
    "Ethically Sourced": "नैतिक रूप से प्राप्त",
    "Carbon Neutral Delivery": "कार्बन तटस्थ डिलीवरी",
    "Free Returns within 30 Days": "30 दिनों के भीतर मुफ़्त वापसी",

    // Cart & Checkout
    "Shopping Cart": "शॉपिंग कार्ट",
    "Your Cart": "आपकी कार्ट",
    "Your cart is empty": "आपकी कार्ट खाली है",
    "Browse our collection and add something you love.": "हमारे संग्रह को देखें और अपनी पसंद का उत्पाद जोड़ें।",
    "Subtotal": "उपकुल",
    "Subtotal:": "उपकुल:",
    "Shipping": "शिपिंग",
    "Shipping & taxes calculated at checkout.": "शिपिंग और कर चेकआउट के समय जोड़े जाएंगे।",
    "Estimated Shipping": "अनुमानित शिपिंग",
    "Tax (18% GST Included)": "कर (18% GST शामिल)",
    "Total": "कुल योग",
    "Total:": "कुल योग:",
    "Total Amount": "कुल राशि",
    "View Cart": "कार्ट देखें",
    "Checkout": "चेकआउट",
    "Proceed to Checkout": "चेकआउट पर आगे बढ़ें",
    "Continue Shopping": "खरीदारी जारी रखें",
    "Clear Cart": "कार्ट खाली करें",
    "Have a promo code?": "कूपन कोड है?",
    "Apply": "लागू करें",
    "Apply Coupon": "कूपन लागू करें",
    "Remove": "हटाएं",
    "Order Summary": "ऑर्डर सारांश",
    "Delivery & Shipping Address": "डिलीवरी एवं शिपिंग पता",
    "Select from Saved Addresses": "सहेजे गए पतों में से चुनें",
    "Or Confirm / Edit Address Details": "या पता विवरण की पुष्टि / संपादन करें",
    "Manage in Account →": "खाते में प्रबंधित करें →",
    "First Name *": "पहला नाम *",
    "Last Name": "अंतिम नाम",
    "Email Address *": "ईमेल पता *",
    "10-Digit Mobile Number *": "10-अंकीय मोबाइल नंबर *",
    "Flat, House no., Building, Company, Apartment *": "मकान नं., इमारत, फ्लैट, कंपनी *",
    "Area, Street, Sector, Village *": "क्षेत्र, सड़क, सेक्टर, इलाका *",
    "City / District *": "शहर / ज़िला *",
    "State *": "राज्य *",
    "6-Digit PIN Code *": "6-अंकीय पिन कोड *",
    "Shipping Method": "शिपिंग का तरीका",
    "Standard Delivery (Free)": "मानक डिलीवरी (मुफ़्त)",
    "Express Delivery (₹149)": "एक्सप्रेस डिलीवरी (₹149)",
    "Payment Method": "भुगतान का तरीका",
    "Cash on Delivery": "कैश ऑन डिलीवरी (COD)",
    "Pay Online (UPI / Cards / Net Banking)": "ऑनलाइन भुगतान (UPI / कार्ड / नेट बैंकिंग)",
    "Place Order": "ऑर्डर दें",
    "Place Order & Pay": "ऑर्डर दें और भुगतान करें",
    "Apply Wallet Balance": "वॉलेट बैलेंस लागू करें",
    "Gift Wrap this Order": "इस ऑर्डर को गिफ़्ट रैप करें",

    // Order Confirmation
    "Order Placed Successfully!": "ऑर्डर सफलतापूर्वक दर्ज हो गया!",
    "Thank you for your purchase from Buyhelps. Your shipment is being prepared.": "Buyhelps से खरीदारी के लिए धन्यवाद। आपका ऑर्डर तैयार किया जा रहा है।",
    "Order ID": "ऑर्डर आईडी",
    "Order Date": "ऑर्डर की तारीख",
    "Carrier Partner": "कूरियर पार्टनर",
    "Estimated Delivery": "अनुमानित डिलीवरी",
    "Track Order in Account": "खाते में ऑर्डर ट्रैक करें",
    "Download Tax Invoice": "टैक्स इनवॉइस डाउनलोड करें",

    // Account Hub
    "Orders": "ऑर्डर",
    "Active Delivery": "सक्रिय डिलीवरी",
    "Addresses": "पते",
    "Wallet Cash": "वॉलेट बैलेंस",
    "Orders & Tracking": "ऑर्डर और ट्रैकिंग",
    "Saved Addresses": "सहेजे गए पते",
    "Payment & Wallet": "भुगतान और वॉलेट",
    "My Wishlist": "मेरी विशलिस्ट",
    "VIP Rewards Club": "वीआईपी रिवॉर्ड्स क्लब",
    "Profile & Security": "प्रोफ़ाइल और सुरक्षा",
    "Track Any Shipment": "कोई भी शिपमेंट ट्रैक करें",
    "Track Package": "पैकेज ट्रैक करें",
    "Enter your Buyhelps Order ID or BlueDart AWB number to check real-time package milestones.": "रियल-टाइम डिलीवरी स्थिति देखने के लिए अपना Buyhelps ऑर्डर आईडी या BlueDart AWB नंबर दर्ज करें।",
    "Personal Information": "व्यक्तिगत जानकारी",
    "Full Name": "पूरा नाम",
    "Phone Number": "फ़ोन नंबर",
    "Save Changes": "बदलाव सहेजें",
    "Add New Address": "नया पता जोड़ें",
    "Edit": "संपादित करें",
    "Delete": "हटाएं",
    "Default Address": "डिफ़ॉल्ट पता",
    "Make Default": "डिफ़ॉल्ट बनाएं",
    "Delivered": "डिलीवर हो गया",
    "Shipped": "भेज दिया गया",
    "Out for Delivery": "डिलीवरी के लिए निकला",
    "Processing": "प्रोसेसिंग में",
    "✦ Platinum Member": "✦ प्लैटिनम सदस्य",
    "Member since Jan 2026": "सदस्यता: जनवरी 2026",

    // Footer & Miscellaneous
    "Track Orders": "ऑर्डर ट्रैक करें",
    "Payment Methods": "भुगतान विधियाँ",
    "Wishlist": "विशलिस्ट",
    "Account Settings": "खाता सेटिंग्स",
    "Shipping & Returns": "शिपिंग और वापसी",
    "FAQ & Help Center": "अक्सर पूछे जाने वाले सवाल",
    "Size Guide": "साइज गाइड",
    "Privacy Policy": "गोपनीयता नीति",
    "Terms": "नियम",
    "Privacy": "गोपनीयता",
    "All rights reserved.": "सर्वाधिकार सुरक्षित।",
    "Portable Walnut Bluetooth Speaker": "पोर्टेबल वॉलनट ब्लूटूथ स्पीकर",
    "Handcrafted natural walnut, 20hr battery life.": "असली लकड़ी के एनक्लोज़र के साथ समृद्ध 360-डिग्री सराउंड साउंड।",
    "A stunning portable speaker carved from natural American walnut. Delivers room-filling 360-degree acoustic clarity with deep bass and a 20-hour rechargeable battery.": "हाथ से पॉलिश की गई अखरोट की लकड़ी की बॉडी, 20W दमदार साउंड, पैसिव डुअल बास रेडिएटर्स, ब्लूटूथ 5.2 और 16 घंटे का नॉन-स्टॉप प्लेबैक समय।",
    "Natural Latex Resistance Bands": "नेचुरल लेटेक्स रेजिस्टेंस बैंड्स",
    "Set of 5 natural latex bands (10 to 50 lbs).": "5 नेचुरल लेटेक्स बैंड्स का सेट (10 से 50 lbs)।",
    "Set of 5 color-coded loop resistance bands crafted from 100% Malaysian natural tree latex with carrying pouch and exercise instruction manual.": "100% प्राकृतिक मलेशियन लेटेक्स से बने 5 रेजिस्टेंस बैंड्स का सेट। व्यायाम गाइड और पाउच के साथ फिटनेस के लिए मुकम्मल सेट।",
    "Ultralight Daypack 20L": "अल्ट्रालाइट डेपैक 20L",
    "Packable 20L ripstop, weighs 290g.": "वॉटर-रेसिस्टेंट 210D कॉर्डुरा फ़ोल्डेबल बैकपैक।",
    "A packable 20L daypack made from ripstop nylon with YKK zippers. Water-resistant, weighs just 290g, and folds into its own pocket.": "सिर्फ 320 ग्राम का 20-लीटर बैकपैक। वॉटर-रेसिस्टेंट नायलॉन, मजबूत ज़िप और सांस लेने योग्य स्ट्रैप्स के साथ यात्रा और ट्रैकिंग के लिए उत्तम।",
    "Mechanical Desk Keyboard": "मैकेनिकल डेस्क कीबोर्ड",
    "Hot-swap mechanical keyboard with aluminum body.": "गेटरॉन स्विच के साथ कॉम्पैक्ट 75% मैकेनिकल कीबोर्ड।",
    "A beautifully crafted mechanical keyboard with hot-swappable Gateron switches, PBT keycaps, and a machined aluminum frame. Designed for typists who appreciate tactile perfection.": "सटीक और आरामदायक टाइपिंग के लिए निर्मित। सॉलिड एनोडाइज्ड एल्युमिनियम बॉडी, हॉट-स्वैपेबल पीसीबी, प्री-ल्यूब्ड गेटरॉन स्विच और साउंड-डैम्पेनिंग सिलिकॉन पैड एक शानदार टाइपिंग अनुभव प्रदान करते हैं।",
    "Botanical Vitamin C Serum": "बॉटनिकल विटामिन सी सीरम",
    "15% stabilized Vitamin C + Kakadu plum & ferulic.": "हयालूरोनिक एसिड के साथ 15% स्टेबलाइज़्ड विटामिन सी (30ml)।",
    "Potent brightening facial serum combining 15% stabilized Vitamin C with Kakadu plum extract, ferulic acid, and pure vegan hyaluronic acid.": "15% विटामिन सी और हयालूरोनिक एसिड से भरपूर फेशियल सीरम। चेहरे के दाग-धब्बों को हल्का कर प्राकृतिक चमक बढ़ाता है।",
    "Ergonomic Precision Mouse": "एर्गोनोमिक प्रिसिजन माउस",
    "Ergonomic contour, silent switches, dual wireless.": "मल्टी-डिवाइस ब्लूटूथ पेयरिंग के साथ शांत और आरामदायक क्लिक माउस।",
    "Ultra-quiet optical wireless mouse contoured for hand posture with aluminum scroll wheel, dual Bluetooth/2.4G connectivity, and USB-C quick recharge.": "हाथ की थकान दूर करने के लिए विशेष रूप से डिज़ाइन किया गया माउस, साइलेंट क्लिक स्विच, सहज स्क्रॉल व्हील और 3 डिवाइसों के बीच आसानी से स्विच करने की सुविधा।",
    "Ceramic Pour-Over Coffee Set": "सिरेमिक पोर-ओवर कॉफ़ी सेट",
    "Handmade stoneware dripper + glass carafe.": "बोरोसिलिकेट ग्लास कैराफ़े के साथ हस्तनिर्मित सिरेमिक ड्रिपर।",
    "Hand-thrown stoneware pour-over dripper paired with a double-wall borosilicate glass carafe. Produces a clean, bright cup every time.": "हाथ से तैयार किया गया सिरेमिक पोर-ओवर ड्रिपर और हीट-रेसिस्टेंट बोरोसिलिकेट ग्लास कैराफ़े। आंतरिक स्पाइरल रिब्स बेहतरीन कॉफ़ी फ्लेवर निकालते हैं।",
    "Precision Brass Fountain Pen": "प्रिसिजन ब्रास फ़ाउंटेन पेन",
    "German steel medium nib, solid brass body.": "कनवर्टर और इंक कार्ट्रिज के साथ स्टेनलेस स्टील बॉक निब पेन।",
    "Engineered with a German-made stainless steel medium nib, brass barrel, and screw-cap airtight seal to prevent drying out.": "जर्मन पीटर बॉक फाइन निब और एयरटाइट स्क्रू-कैप के साथ सटीक ब्रास फ़ाउंटेन पेन। स्याही सूखने की समस्या से मुक्त।",
    "Stonewashed Linen Throw": "स्टोनवाश्ड लिनन थ्रो कंबल",
    "Soft stonewashed linen with fringed edges.": "झालरदार किनारों वाला 130x170cm वॉफ़ल-वीव लिनन कंबल।",
    "Luxuriously soft stonewashed linen throw blanket with delicate fringed edges. Gets softer with every wash.": "100% शुद्ध यूरोपीय लिनन से बुना 130x170cm थ्रो। बेहद मुलायम, हल्का और हर मौसम में इस्तेमाल के लिए उपयुक्त।",
    "Studio Wireless Headphones": "स्टूडियो वायरलेस हेडफ़ोन",
    "Premium noise-canceling headphones with 30hr battery.": "30 घंटे की बैटरी के साथ प्रीमियम नॉइज़-कैंसलिंग हेडफ़ोन।",
    "Experience pure, immersive audio with our Studio Wireless Headphones. Featuring 40mm custom drivers, adaptive noise cancellation, and 30-hour battery life wrapped in a featherlight design with memory foam ear cushions.": "हमारे स्टूडियो वायरलेस हेडफ़ोन के साथ शुद्ध और इमर्सिव ऑडियो का अनुभव करें। 40mm कस्टम ड्राइवर, एडेप्टिव नॉइज़ कैंसलेशन और मेमोरी फोम ईयर कुशन के साथ फेदरलाइट डिज़ाइन में 30 घंटे की लंबी बैटरी लाइफ।",
    "True Wireless ANC Earbuds": "ट्रू वायरलेस ANC ईयरबड्स",
    "Compact ANC earbuds, IPX5 water resistant.": "वायरलेस चार्जिंग केस के साथ एक्टिव नॉइज़ कैंसलेशन ईयरबड्स।",
    "Compact wireless earbuds featuring active noise cancellation, transparency ambient mode, IPX5 water resistance, and 28 hours total playback with charging case.": "हाइब्रिड डुअल-माइक एक्टिव नॉइज़ कैंसलेशन, ग्राफीन ड्राइवर्स, IPX5 वाटर रेसिस्टेंस, ट्रांसपेरेंसी मोड और पॉकेट-साइज़ चार्जिंग केस के साथ 28 घंटे का कुल बैकअप।",
    "Hand-Tufted Wool Accent Rug": "हैंड-टफ्टेड वूल एक्सेंट रग",
    "High-pile un-dyed New Zealand wool rug.": "ऑर्गेनिक ज्यामितीय पैटर्न वाला 120x180cm न्यूज़ीलैंड वूल कालीन।",
    "Soft high-pile accent rug hand-tufted from un-dyed New Zealand wool. Minimalist geometric line drawing design adds subtle depth.": "100% शुद्ध न्यूज़ीलैंड वूल से भदोही के कारीगरों द्वारा हस्तनिर्मित रग। 15mm मोटा पाइल और एंटी-स्किड बैकिंग के साथ शानदार आराम।",
    "Pure Cashmere Crewneck Sweater": "प्योर कश्मीरी क्रूनेक स्वेटर",
    "Grade-A Mongolian cashmere, 2-ply yarn.": "2-प्लाई ग्रेड-ए मंगोलियन कश्मीरी वूल स्वेटर।",
    "Spun from 2-ply Mongolian grade-A cashmere. Exceptionally soft, lightweight, yet delightfully warm with ribbed hems and cuffs.": "100% ग्रेड-ए मंगोलियन कश्मीरी वूल से बुना हुआ बेहद हल्का और मुलायम स्वेटर। बिना किसी भारीपन के बेहतरीन गर्माहट प्रदान करता है।",
    "Minimal Analog Watch": "मिनिमल एनालॉग घड़ी",
    "40mm stainless steel, Japanese quartz movement.": "नीलम क्रिस्टल ग्लास के साथ आकर्षक 38mm टाइमपीस।",
    "A refined timepiece that strips away the unnecessary. Japanese Miyota quartz movement housed in a 40mm stainless steel case with a sapphire-coated crystal and premium Italian leather strap.": "सादगी और सुंदरता का प्रतीक। 38mm ब्रश किया हुआ 316L स्टेनलेस स्टील केस, स्क्रैच-रेसिस्टेंट नीलम क्रिस्टल, जापानी क्वार्ट्ज मूवमेंट और बदलने योग्य इटैलियन लेदर का पट्टा।",
    "Handmade Sandalwood Comb": "हैंडमेड चंदन की लकड़ी की कंघी",
    "Green sandalwood wide-tooth, naturally anti-static.": "एंटी-स्टैटिक ग्रीन चंदन की लकड़ी की चौड़े दांतों वाली कंघी।",
    "Seamless wide-tooth hair comb hand-carved from fragrant green sandalwood. Glides through tangles static-free without snagging.": "प्राकृतिक सुगंधित चंदन की लकड़ी से तराशी गई कंघी। बालों को बिना उलझाए और बिना तोड़े संवारती है और सिर की मालिश करती है।",
    "Minimal LED Desk Lamp": "मिनिमल एलईडी डेस्क लैंप",
    "Adjustable LED lamp with wireless charging base.": "वायरलेस चार्जिंग बेस के साथ डिमेबल आर्किटेक्चरल लैंप।",
    "Sleek, adjustable LED desk lamp with touch-dimming, warm-to-cool color temperature control, and a wireless charging base.": "सटीक मैट एल्युमिनियम संरचना जिसमें टच-सेंसिटिव डिमिंग, 5 कलर टेम्परेचर विकल्प और बेस में एकीकृत 15W Qi फास्ट चार्जिंग पैड शामिल है।",
    "Merino Wool Ribbed Beanie": "मेरिनो वूल रिब्ड बीनी",
    "Soft merino wool, chunky rib knit.": "100% एक्स्ट्रा-फाइन मेरिनो वूल, बिना खुजली के आरामदायक गर्माहट।",
    "Ultra-soft merino wool beanie with a chunky rib knit. Temperature-regulating and itch-free for all-day comfort.": "100% शुद्ध मेरिनो वूल से बनी रिब्ड बीनी। प्राकृतिक तापमान नियंत्रण, गंध प्रतिरोधी और दिन भर बिना किसी खुजली के आरामदायक गर्माहट प्रदान करती है।",
    "Heavyweight Linen Sketchbook": "हैवीवेट लिनन स्केचबुक",
    "200gsm cotton cold-press paper, lay-flat.": "200gsm कोल्ड-प्रेस मिक्स्ड मीडिया पेपर, 120 पन्ने।",
    "Hardcover artist sketchbook filled with 200gsm cold-pressed acid-free cotton paper suited for ink, watercolor washes, and charcoal.": "100% कॉटन के 200gsm कोल्ड-प्रेस कागज़ से बनी स्केचबुक। वॉटरकलर, स्याही और पेंसिल स्केचिंग के लिए आदर्श।",
    "Waxed Canvas Everyday Tote": "वैक्स्ड कैनवास एवरीडे टोट बैग",
    "100% organic combed cotton, basketweave texture.": "मजबूत 16oz कॉटन कैनवास और लेदर स्ट्रैप के साथ रोज़मर्रा का बैग।",
    "Tailored from heavy 100% organic combed cotton with a substantial basketweave texture, button-down collar, and mother-of-pearl buttons.": "16oz वेदर-प्रूफ वैक्स्ड कैनवास और मजबूत लेदर हैंडल से निर्मित टोट बैग। ब्रास ज़िप और पैडेड लैपटॉप कम्पार्टमेंट के साथ सुरक्षित स्टोरेज।",
    "Natural Lip Balm Trio": "नेचुरल लिप बाम ट्रायो",
    "Three-pack: vanilla, mint, honey.": "3 का सेट: पिपरमिंट, ब्लड ऑरेंज और अनसेंटेड।",
    "Three nourishing lip balms in beeswax, shea butter, and coconut oil bases. Flavored with real vanilla, mint, and honey.": "शिया बटर और बीज़वैक्स से बने लिप बाम का सेट। गुलाब के बीज का तेल और विटामिन ई से भरपूर, फटे होंठों को दे प्राकृतिक पोषण।",
    "Enamel Camp Mug": "इनेमल कैंप मग",
    "Classic enamel, campfire-safe.": "स्पेकल्ड ग्लेज़ के साथ 400ml हेवी-गेज स्टील कैंप मग।",
    "Classic enamel camp mug with rolled rim and hand-dipped finish. Safe for campfires, stovetops, and dishwashers.": "मजबूत कार्बन स्टील और पोर्सिलेन इनेमल से बना कैंप मग। सीधे आग, चूल्हे और ग्रिल पर इस्तेमाल के लिए सुरक्षित।",
    "Slim Full-Grain Cardholder": "स्लिम फुल-ग्रेन लेदर कार्डहोल्डर",
    "Holds 6 cards + cash, vegetable-tanned leather.": "वेजिटेबल-टैन्ड लेदर में 6 कार्ड और कैश रखने की सुविधा।",
    "Pocket-slimming card wallet hand-stitched from vegetable-tanned leather. Holds up to 6 cards plus folded banknotes in the center sleeve.": "टस्कन वेजिटेबल-टैन्ड लेदर से हाथ से सिला हुआ स्लिम कार्डहोल्डर। 4 कार्ड स्लॉट, एक सेंट्रल कैश पॉकेट और बीज़वैक्स फिनिश्ड किनारे।",
    "Artisan Stoneware Mug": "कारीगर स्टोनवेयर मग",
    "12oz reactive-glaze handmade mug.": "2 स्पेकल्ड स्टोनवेयर मग का सेट (प्रत्येक 350ml)।",
    "A generously sized 12oz mug with a reactive glaze finish, hand-dipped for a unique look. Microwave and dishwasher safe.": "हाथ से चाक पर बने स्टोनवेयर मग, खूबसूरत साटन-मैट फिनिश। माइक्रोवेव और डिशवॉशर सुरक्षित, पकड़ने में बेहद आरामदायक।",
    "Full-Grain Leather Desk Mat": "फुल-ग्रेन लेदर डेस्क मैट",
    "80×40cm vegetable-tanned leather with wool backing.": "एंटी-स्लिप वूल बेस के साथ 90x45cm वेजिटेबल-टैन्ड डेस्क पैड।",
    "Spacious desk pad cut from vegetable-tanned full-grain leather backed with non-slip natural wool felt. Provides an inspiring tactile workspace.": "2.5mm मोटे फुल-ग्रेन लेदर और जर्मन वूल फेल्ट बेस से बनी 90x45cm डेस्क मैट। टेबल की सुरक्षा और कार्यक्षेत्र को आकर्षक लुक देती है।",
    "Natural Rubber Yoga Mat": "नेचुरल रबर योगा मैट",
    "5mm natural rubber, non-slip suede surface.": "संरेखण रेखाओं वाली 4mm नॉन-स्लिप प्राकृतिक रबर मैट।",
    "A premium 5mm yoga mat made from sustainably harvested natural rubber with a microfiber suede surface. Provides excellent grip when wet or dry.": "100% प्राकृतिक रबर से निर्मित गैर-फिसलन वाली योगा मैट। लेज़र-एच्ड संरेखण रेखाएं सही मुद्रा बनाए रखने में सहायता करती हैं।",
    "Full-Grain Leather Journal": "फुल-ग्रेन लेदर जर्नल",
    "A5 full-grain leather, 192 pages acid-free.": "फ़ाउंटेन पेन फ्रेंडली 100gsm बांस के कागज़ के 240 पन्ने।",
    "Beautifully crafted A5 journal bound in full-grain vegetable-tanned leather with 192 pages of 100gsm acid-free paper. Ages gracefully to develop a unique patina.": "सैडल ब्राउन लेदर में हाथ से बंधी डायरी। 240 पन्नों का 100gsm आर्काइवल बांस का कागज़, जो फ़ाउंटेन पेन की स्याही को फैलने नहीं देता।",
    "Calming Room & Pillow Mist": "काल्मिंग रूम व पिलो मिस्ट",
    "Lavender, bergamot & vetiver essential oil mist.": "फ्रेंच लैवेंडर, बर्गमोट और खस युक्त स्लीप स्प्रे (100ml)।",
    "A soothing blend of lavender, bergamot, and vetiver essential oils in a fine mist spray. Perfect for bedtime wind-down rituals.": "फ्रेंच लैवेंडर और खस के अर्क से बना आरामदायक रूम और तकिया स्प्रे। तनाव कम करने और गहरी नींद लाने में मददगार।",
    "Carbon Fiber Trekking Poles": "कार्बन फाइबर ट्रेकिंग पोल्स",
    "100% 3K carbon fiber, ergonomic cork grips.": "एर्गोनोमिक कॉर्क ग्रिप वाली क्विक-लॉक ट्रेकिंग पोल्स की जोड़ी (440g)।",
    "Pair of 100% 3K carbon fiber hiking poles with quick-flick aluminum lever locks, ergonomic natural cork grips, and tungsten carbide tips.": "100% 3K कार्बन फाइबर से बने हल्के और मजबूत ट्रेकिंग पोल्स। प्राकृतिक कॉर्क ग्रिप और टंगस्टन टिप्स के साथ हर रास्ते पर मजबूत सहारा।",
    "Brass Rollerball Pen": "सॉलिड ब्रास रोलरबॉल पेन",
    "Solid brass, smooth rollerball, living patina.": "श्मिट सिरेमिक रिफिल के साथ सॉलिड मशीन ब्रास बॉडी पेन।",
    "A satisfyingly hefty rollerball pen machined from solid brass. Develops a living patina with use. Accepts standard international refills.": "सॉलिड ब्रास से निर्मित पेन, जो इस्तेमाल के साथ अपनी अनूठी चमक बनाता है। जर्मन श्मिट 0.6mm सिरेमिक रिफिल के साथ बेहद स्मूद लिखावट।",
    "Qi Wireless Charging Pad": "Qi वायरलेस चार्जिंग पैड",
    "15W slim wireless charger, fabric finish.": "सॉलिड अखरोट की लकड़ी और कास्ट एल्युमिनियम का फास्ट चार्जिंग स्टेशन।",
    "Ultra-slim 15W wireless charging pad with soft-touch fabric surface and silent operation. Compatible with all Qi-enabled devices.": "टिकाऊ अमेरिकी अखरोट की लकड़ी और एयरोस्पेस एल्युमिनियम से निर्मित डुअल चार्जिंग डॉक। स्मार्ट थर्मल नियंत्रण के साथ फोन और ईयरबड्स को एक साथ चार्ज करता है।",
    "Solid Brass Drafting Tools": "सॉलिड ब्रास ड्राफ्टिंग टूल्स",
    "3-piece set: ruler, triangle & protractor in brass.": "3 का सेट: 15cm रूलर, 45-डिग्री त्रिकोण और चांदा।",
    "Set of three precision drafting instruments: a 15cm metric/imperial ruler, 60-degree triangle, and semi-circle protractor cut from 2mm brass.": "2mm मोटे सॉलिड ब्रास पर लेज़र-सटीक माप के साथ 3 ड्राफ्टिंग टूल्स का सेट। डिज़ाइनर और वास्तुकारों के लिए सटीक उपकरण।",
    "Himalayan Mineral Bath Soak": "हिमालयन मिनरल बाथ सोक",
    "Pink Himalayan salt with eucalyptus & sweet orange.": "एप्सम सॉल्ट, रोज़ क्वार्ट्ज और नीलगिरी युक्त बाथ सॉल्ट (450g)।",
    "Raw pink Himalayan crystal salt blended with Dead Sea minerals, dried eucalyptus, and organic sweet orange oil to detoxify and relax muscles.": "शुद्ध गुलाबी हिमालयन नमक, एप्सम सॉल्ट और नीलगिरी के तेल का मिश्रण। मांसपेशियों के दर्द और थकान को दूर करने के लिए बेहतरीन।",
    "Walnut Desk Organizer": "वॉलनट डेस्क ऑर्गेनाइज़र",
    "Handcrafted walnut, multi-compartment organizer.": "अमेरिकी काले अखरोट की लकड़ी से बने मैग्नेटिक मॉड्यूलर ट्रे।",
    "A minimalist desk organizer hand-crafted from solid American walnut. Features compartments for pens, phone, cards, and a cable management slot.": "छिपे हुए चुम्बकों के साथ मॉड्यूलर डेस्क ट्रे सिस्टम। पेन, स्टिकी नोट्स और स्टेशनरी को करीने से व्यवस्थित रखने के लिए उत्तम।",
    "Natural Sisal Bristle Dry Brush": "नेचुरल सिसाल ब्रिसल ड्राई ब्रश",
    "Natural sisal bristles, FSC beechwood base.": "बैम्बू हैंडल वाला डिटॉक्सीफाइंग बॉडी ड्राई ब्रश।",
    "FSC-certified beechwood body brush fitted with firm natural sisal plant fibers and a comfortable cotton canvas hand strap for exfoliating lymphatic stimulation.": "प्राकृतिक सिसाल रेशों और बांस के हैंडल से बना बॉडी ब्रश। त्वचा के रक्त संचार को बढ़ाता है और मृत त्वचा को हटाकर ताजगी देता है।",
    "Raw Selvedge Denim Jacket": "रॉ सेल्वेज डेनिम जैकेट",
    "14oz Japanese selvedge denim, raw indigo.": "14oz जापानी सेल्वेज डेनिम, अनवाश्ट और टिकाऊ।",
    "A heritage-inspired trucker jacket in 14oz Japanese selvedge denim. Raw unwashed indigo that develops beautiful fades unique to you over time.": "जापान के ओकायामा में विंटेज लूम पर बुनी गई 14oz रॉ सेल्वेज डेनिम जैकेट। कॉपर हार्डवेयर और असली लेदर पैच के साथ, जो समय के साथ अपना अनोखा लुक बनाती है।",
    "End-Grain Bamboo Cutting Board": "एंड-ग्रेन बैम्बू कटिंग बोर्ड",
    "Knife-friendly end-grain with juice perimeter groove.": "जूस ग्रूव के साथ मजबूत 40x30cm किचन कटिंग बोर्ड।",
    "Extra thick organic moso bamboo board featuring deep juice grooves, side finger grips, and knife-friendly end-grain construction.": "चाकू की धार सुरक्षित रखने वाला एंड-ग्रेन बैम्बू कटिंग बोर्ड। साइड हैंडल और जूस ग्रूव के साथ रसोई का टिकाऊ साथी।",
    "Botanical Body Oil": "बॉटनिकल बॉडी ऑयल",
    "Jojoba, rosehip & almond, neroli scented.": "जोजोबा, स्क्वैलेन और नेरोली युक्त हाइड्रेटिंग ड्राई बॉडी ऑयल (100ml)।",
    "A luxurious blend of jojoba, rosehip, and sweet almond oils infused with botanicals. Fast-absorbing, deeply nourishing, and subtly scented with neroli.": "त्वचा में तुरंत अवशोषित होने वाला नॉन-स्टिकी बॉडी ऑयल। जोजोबा, स्क्वैलेन और नेरोली के अर्क से त्वचा को चमकदार और कोमल बनाता है।",
    "Archivist Hardcover Notebook": "आर्काइविस्ट हार्डकवर नोटबुक",
    "Cloth-bound, dot grid, lay-flat binding.": "डॉट ग्रिड 120gsm स्वीडिश मुन्केन पेपर, 192 क्रमांकित पन्ने।",
    "Cloth-bound hardcover notebook with lay-flat binding, dotted grid pages, and a ribbon bookmark. Perfect for bullet journaling.": "सपाट खुलने वाली स्माइथ-सीवन बाइंडिंग और 120gsm एसिड-फ्री स्वीडिश कागज़। बैक पॉकेट और दो रिबन मार्कर के साथ विचारों को सहेजने के लिए श्रेष्ठ।",
    "Sculptural Ceramic Vase": "स्कल्पचरल सिरेमिक फूलदान",
    "Asymmetrical organic curves, matte chalk finish.": "टेक्सचर्ड रॉ फिनिश वाला मिनिमलिस्ट सिरेमिक फूलदान।",
    "An architectural ceramic vase featuring organic asymmetrical curves and a chalky matte finish. Beautiful with or without floral stems.": "अनोखे ज्यामितीय आकार वाला कलात्मक सिरेमिक फूलदान। इनडोर सजावट, सूखे फूलों या ताज़े गुलदस्तों के लिए बिल्कुल उपयुक्त।",
    "Low-Top Minimalist Sneakers": "लो-टॉप मिनिमलिस्ट स्नीकर्स",
    "Organic canvas, vulcanized natural rubber sole.": "ऑर्गेनिक कॉटन कैनवास और प्राकृतिक रबर सोल वाले स्नीकर्स।",
    "Clean low-profile sneakers crafted with organic cotton canvas, vulcanized natural rubber soles, and cushioned ortholite insoles.": "प्राकृतिक रबर सोल और ऑर्गेनिक डक कैनवास से बने स्नीकर्स। आरामदायक इनसोल और हर स्टाइल के साथ जंचने वाला क्लासिक डिज़ाइन।",
    "Gentle Gel Facial Cleanser": "जेंटल जेल फेशियल क्लींजर",
    "pH-balanced, chamomile & hyaluronic acid.": "ग्रीन टी और अमीनो एसिड युक्त pH-बैलेंस्ड क्लींजर (150ml)।",
    "A pH-balanced gel cleanser with chamomile extract and hyaluronic acid. Removes impurities without stripping natural moisture.": "सल्फ़ेट-मुक्त सौम्य फेस क्लींजर। ग्रीन टी और सेंटेला एशियाटिका से युक्त, जो त्वचा की प्राकृतिक नमी छीने बिना गहराई से सफाई करता है।",
    "Classic Oxford Button-Down": "क्लासिक ऑक्सफ़ोर्ड बटन-डाउन शर्ट",
    "100% organic combed cotton, basketweave texture.": "100% ऑर्गेनिक कॉम्ब कॉटन, बास्केटवीव बुनाई।",
    "Tailored from heavy 100% organic combed cotton with a substantial basketweave texture, button-down collar, and mother-of-pearl buttons.": "100% ऑर्गेनिक कॉटन से तैयार क्लासिक बास्केटवीव शर्ट। बटन-डाउन कॉलर और प्रीमियम बटनों के साथ एक सदाबहार स्टाइल।",
    "Hand-Poured Soy Candle": "हैंड-पोअर्ड सोय मोमबत्ती",
    "Essential oil soy candle, 60hr burn time.": "देवदार, अंबर और स्मोक सुगंध के साथ 50 घंटे का बर्न टाइम।",
    "Clean-burning, hand-poured soy wax candle with essential oil blends. 60-hour burn time in a reusable stoneware vessel.": "100% अमेरिकन सोय वैक्स, देवदार और अंबर की शांत सुगंध। री-यूज़ेबल सिरेमिक जार और 50 घंटे तक धुआं-मुक्त जलने वाली कॉटन बत्ती।",
    "Ultralight Camping Hammock": "अल्ट्रालाइट कैंपिंग हैमॉक",
    "210T parachute nylon with tree straps, 200kg load.": "पेड़-सुरक्षित पट्टों के साथ रिपस्टॉप पैराशूट नायलॉन हैमॉक।",
    "Strong 210T parachute nylon single/double hammock with tree-friendly straps and wiregate carabiners. Packs down to grapefruit size.": "70D हाई-स्ट्रेंथ पैराशूट नायलॉन से बना कैंपिंग झूला (200kg तक भार सहने में सक्षम)। आसान सेटअप के लिए पेड़-सुरक्षित पट्टों के साथ।",
    "Insulated Steel Water Bottle": "इंसुलेटेड स्टील पानी की बोतल",
    "24hr cold / 12hr hot, bamboo cap.": "बैम्बू कैप वाली 750ml डबल-वॉल वैक्यूम बोतल।",
    "Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours or hot for 12. Leak-proof bamboo cap.": "18/8 फूड-ग्रेड स्टेनलेस स्टील से बनी वैक्यूम बोतल। पानी को 24 घंटे ठंडा और 12 घंटे गर्म रखती है। बांस के ढक्कन और मजबूत ग्रिप के साथ।",
    "Relaxed Linen Overshirt": "रिलैक्स्ड लिनन ओवरशर्ट",
    "Soft-washed flax linen overshirt, relaxed fit.": "100% नॉर्मंडी फ्लैक्स लिनन से बनी आरामदायक बॉक्सी फिट ओवरशर्ट।",
    "An effortlessly cool overshirt cut from premium European flax linen. Relaxed fit with a soft-washed finish, horn buttons, and a versatile layering length.": "100% फ्रेंच लिनन से तैयार की गई यह सांस लेने योग्य ओवरशर्ट हॉर्न बटन, चेस्ट पैच पॉकेट और गारमेंट-वॉश फिनिश के साथ आती है जो हर धुलाई के साथ और अधिक मुलायम होती जाती है।",
    "Thermal Insulated Cooler Bag": "थर्मल इंसुलेटेड कूलर बैग",
    "Keeps ice 24+ hours, leak-proof welded seams.": "लीक-प्रूफ 18L सॉफ्ट कूलर जो 48 घंटे तक बर्फ जमाए रखता है।",
    "Compact 12-can soft-sided cooler bag with leakproof welded lining, 8mm closed-cell thermal foam, and water-repellent TPU shell.": "वॉटरप्रूफ टीपीयू और 25mm मोटे इंसुलेशन से बना कूलर बैग। 48 घंटे तक बर्फ और ड्रिंक्स को ठंडा रखता है। कैंपिंग और पिकनिक के लिए बेहतरीन।",
    "Washed French Linen Bedding Set": "वाश्ड फ्रेंच लिनन बेडिंग सेट",
    "100% French flax, pre-washed softness.": "क्वीन-साइज़ डुवेट कवर, फिटेड शीट और 2 तकिए के कवर।",
    "Woven from 100% Normandy flax. Includes 1 duvet cover and 2 pillowcases pre-washed for velvety softness and effortless rumpled texture.": "प्रीमियम फ्रेंच लिनन से बना शानदार बेडिंग सेट। आरामदायक नींद, प्राकृतिक कोमलता और कोकोनट बटन क्लोज़र के साथ।",
    "Electronics & Audio": "इलेक्ट्रॉनिक्स और ऑडियो",
    "Premium tech gear crafted with precision and minimalist design.": "सटीक और मिनिमलिस्ट डिज़ाइन के साथ तैयार प्रीमियम टेक गियर।",
    "Fashion & Apparel": "फैशन और परिधान",
    "Timeless wardrobe staples made from natural, sustainable materials.": "प्राकृतिक और टिकाऊ सामग्रियों से बने सदाबहार परिधान।",
    "Home & Living": "होम और लिविंग",
    "Thoughtfully designed homeware for serene, comfortable spaces.": "शांत और आरामदायक घरों के लिए सोच-समझकर डिज़ाइन किए गए होमवेयर।",
    "Books & Stationery": "किताबें और स्टेशनरी",
    "Handcrafted journals, fine pens, and analog tools for creative minds.": "रचनात्मक सोच के लिए हस्तनिर्मित डायरियाँ, पेन और स्टेशनरी।",
    "Wellness & Personal Care": "वेलनेस और पर्सनल केयर",
    "Botanical-powered self-care essentials for body and mind.": "शरीर और मन के लिए प्राकृतिक जड़ी-बूटियों से युक्त उत्पाद।",
    "Sports & Outdoors": "स्पोर्ट्स और आउटडोर्स",
    "Durable, lightweight gear for everyday adventures and active living.": "रोज़मर्रा के रोमांच और सक्रिय जीवन के लिए टिकाऊ और हल्के गियर।",
    "Terms & Conditions": "नियम व शर्तें",
    "Privacy Policy": "गोपनीयता नीति",

    "Hand-thrown stoneware pour-over dripper paired with a thermal-shock resistant borosilicate glass carafe. Designed with internal spiral ribs that calibrate water flow for optimal extraction and a clean, aromatic brew.": "हाथ से तैयार किया गया सिरेमिक पोर-ओवर ड्रिपर और हीट-रेसिस्टेंट बोरोसिलिकेट ग्लास कैराफ़े। आंतरिक स्पाइरल रिब्स बेहतरीन कॉफ़ी फ्लेवर निकालते हैं।",
    "Beautifully crafted A5 journal bound in full-grain vegetable-tanned leather with 192 pages of 100gsm fountain-pen friendly acid-free paper. Ages gracefully with daily use to develop a rich, personal patina.": "फुल-ग्रेन वेजिटेबल-टैन्ड लेदर में खूबसूरती से बंधी A5 डायरी। 100gsm एसिड-फ्री पेपर के 192 पन्ने, जो रोज़ाना इस्तेमाल के साथ अपनी अनूठी चमक बनाते हैं।",
    "An effortlessly cool overshirt cut from premium European flax linen. Features a soft-washed finish, genuine corozo nut buttons, chest patch pockets, and a versatile layering drape that looks great year-round.": "प्रीमियम यूरोपीय लिनन से बनी शानदार ओवरशर्ट। सॉफ्ट-वाश्ड फिनिश, कोरोसो नट बटन, चेस्ट पैच पॉकेट और पूरे साल पहनने के लिए उपयुक्त आरामदायक फिट।",
    "A beautifully crafted mechanical keyboard with hot-swappable Gateron switches, PBT keycaps, and a machined aluminum frame. Designed for typists and creators who appreciate tactile perfection.": "हॉट-स्वैपेबल गेटरॉन स्विच, PBT कीकैप्स और मशीन एल्युमिनियम फ्रेम के साथ खूबसूरती से निर्मित मैकेनिकल कीबोर्ड। बेहतरीन और सटीक टाइपिंग अनुभव के लिए आदर्श।",
    "A refined timepiece that strips away the unnecessary. Japanese Miyota quartz movement housed in a 40mm stainless steel case with a sapphire-coated crystal and premium Italian leather strap.": "सादगी और सुंदरता का बेमिसाल टाइमपीस। जापानी मियोटा क्वार्ट्ज मूवमेंट, 40mm स्टेनलेस स्टील केस, नीलम-कोटेड क्रिस्टल और प्रीमियम इटैलियन लेदर स्ट्रैप।",
    "Ceramic Pour-Over Coffee Set + Relaxed Linen Overshirt": "सिरेमिक पोर-ओवर कॉफ़ी सेट + रिलैक्स्ड लिनन ओवरशर्ट",
    "Free Express Shipping across India (2-4 business days).": "पूरे भारत में मुफ़्त एक्सप्रेस शिपिंग (2-4 कार्य दिवस)।",
    "30-day hassle-free doorstep returns and exchanges.": "30 दिनों की आसान डोरस्टेप वापसी और एक्सचेंज।",
    "1-year comprehensive hardware warranty.": "1-वर्ष की व्यापक हार्डवेयर वारंटी।",
    "Care & Maintenance": "देखभाल और रखरखाव",
    "Past Delivered Orders": "पिछले डिलीवर किए गए ऑर्डर",
    "Items in Shipment (1)": "शिपमेंट में उत्पाद (1)",
    "Buy Again": "फिर से खरीदें",
    "View Item": "उत्पाद देखें",
    "Curated essentials for intentional living. Quality craftsmanship, sustainable materials, timeless design.": "सार्थक जीवन के लिए चुनिंदा आवश्यक वस्तुएं। उत्कृष्ट शिल्प कौशल, टिकाऊ सामग्री और कालातीत डिज़ाइन।"    ,
    "Terms & Conditions": "नियम व शर्तें",
    "Terms &amp; Conditions": "नियम व शर्तें",
    "Privacy Policy": "गोपनीयता नीति",
    "Legal Documentation": "कानूनी दस्तावेज",
    "Security & Data Protection": "सुरक्षा एवं डेटा संरक्षण",
    "Security &amp; Data Protection": "सुरक्षा एवं डेटा संरक्षण",
    "Check Delivery & Services": "डिलीवरी एवं सेवाएं जांचें",
    "Check Delivery &amp; Services": "डिलीवरी एवं सेवाएं जांचें",
    "Enter 6-digit PIN (e.g. 560038)": "6-अंकीय पिन कोड दर्ज करें (उदा. 560038)",
    "Check": "जांचें",
    "Free Express Delivery": "मुफ़्त एक्सप्रेस डिलीवरी",
    "Cash on Delivery available": "कैश ऑन डिलीवरी उपलब्ध",
    "View More →": "और देखें →",
    "High Demand: Only 4 units left in stock!": "भारी मांग: स्टॉक में केवल 4 यूनिट शेष!",
    "Shipping & Free Returns": "शिपिंग और निःशुल्क वापसी",
    "Shipping &amp; Free Returns": "शिपिंग और निःशुल्क वापसी",
    "Free Standard Shipping": "मुफ़्त मानक शिपिंग",
    "30-Day Hassle-Free Returns": "30-दिनों की आसान वापसी",
    "Verified Buyer Feedback": "सत्यापित खरीदार प्रतिक्रिया",
    "Saved in Wishlist": "विशलिस्ट में सहेजा गया",
    "Add to Wishlist": "विशलिस्ट में जोड़ें",
    "Hover to Zoom • Click for Fullscreen": "ज़ूम करने के लिए माउस लाएं • फ़ुलस्क्रीन के लिए क्लिक करें",
    "Pick up right where you left off": "वहीं से शुरू करें जहां आपने छोड़ा था",
    "Clear History": "इतिहास साफ़ करें",
    "Online • Typically replies instantly": "ऑनलाइन • आमतौर पर तुरंत जवाब देता है",
    "Ask a question…": "सवाल पूछें…",
    "Shopping Cart": "शॉपिंग कार्ट",
    "Looks like you haven't added anything yet.": "लगता है आपने अभी तक कुछ नहीं जोड़ा है।",
    "Start Shopping": "खरीदारी शुरू करें",
    "✓ You qualify for free delivery!": "✓ आप मुफ़्त डिलीवरी के पात्र हैं!",
    "Promo Code": "प्रोमो कोड",
    "Delivery & Shipping Address": "डिलीवरी एवं शिपिंग पता",
    "Delivery &amp; Shipping Address": "डिलीवरी एवं शिपिंग पता",
    "Manage in Account →": "खाते में प्रबंधित करें →",
    "Manage in Account &rarr;": "खाते में प्रबंधित करें →",
    "Flat, House No., Building *": "फ्लैट, मकान नं., बिल्डिंग *",
    "Flat, House No., Building": "फ्लैट, मकान नं., बिल्डिंग",
    "Street, Area, Landmark": "सड़क, इलाका, लैंडमार्क",
    "City / Town *": "शहर / कस्बा *",
    "City / Town": "शहर / कस्बा",
    "PIN Code *": "पिन कोड *",
    "PIN Code": "पिन कोड",
    "UPI Instant Payment": "यूपीआई त्वरित भुगतान",
    "Google Pay, PhonePe, Paytm, BHIM UPI": "गूगल पे, फोनपे, पेटीएम, भीम यूपीआई",
    "Credit / Debit / ATM Card": "क्रेडिट / डेबिट / एटीएम कार्ड",
    "Visa, MasterCard, RuPay, Amex": "वीज़ा, मास्टरकार्ड, रुपे, एमेक्स",
    "Cash on Delivery (COD)": "कैश ऑन डिलीवरी (सीओडी)",
    "Cash on Delivery": "कैश ऑन डिलीवरी",
    "Pay with cash or QR scan at doorstep": "डोरस्टेप पर नकद या क्यूआर स्कैन द्वारा भुगतान करें",
    "Order Confirmed": "ऑर्डर की पुष्टि हो गई",
    "Order Confirmed - Buyhelps": "ऑर्डर कन्फ़र्म्ड - Buyhelps",
    "Orders & Tracking": "ऑर्डर और ट्रैकिंग",
    "Orders &amp; Tracking": "ऑर्डर और ट्रैकिंग",
    "Payment & Wallet": "भुगतान और वॉलेट",
    "Payment &amp; Wallet": "भुगतान और वॉलेट",
    "Profile & Security": "प्रोफ़ाइल और सुरक्षा",
    "Profile &amp; Security": "प्रोफ़ाइल और सुरक्षा",
    "In Transit": "रास्ते में है",
    "Order Placed": "ऑर्डर दिया गया",
    "Packed & Ready": "पैक और तैयार",
    "Packed &amp; Ready": "पैक और तैयार",
    "Expected": "अपेक्षित",
    "Pending": "लंबित",
    "Courier Partner": "कूरियर पार्टनर",
    "Tracking Number (AWB)": "ट्रैकिंग नंबर (AWB)",
    "Current Facility": "वर्तमान केंद्र",
    "Delivery Address": "डिलीवरी का पता",
    "Free Delivery": "मुफ़्त डिलीवरी",
    "Delivered ✓": "डिलीवर हो गया ✓",
    "Delivered": "डिलीवर हो गया",
    "Buyhelps Cash Wallet": "Buyhelps कैश वॉलेट",
    "Total Savings": "कुल बचत",
    "Saved Addresses": "सहेजे गए पते",
    "Payment Methods": "भुगतान विधियाँ",
    "Wishlist": "विशलिस्ट",
    "Account Settings": "खाता सेटिंग्स",
    "Track Orders": "ऑर्डर ट्रैक करें",
    "Top Rated": "सर्वोच्च रेटेड",
    "0 products": "0 उत्पाद",
    "No products found matching your filters.": "आपके फ़िल्टर से मेल खाता कोई उत्पाद नहीं मिला।",
    "Delivery": "डिलीवरी",
    "Free": "मुफ़्त",
    "Subtotal": "उपकुल"
  };

  function get() {
    return localStorage.getItem(KEY) || "EN";
  }

  function toggle() {
    const curr = get();
    const next = curr === "EN" ? "HI" : "EN";
    localStorage.setItem(KEY, next);
    document.documentElement.setAttribute("data-lang", next);
    document.documentElement.setAttribute("lang", next === "HI" ? "hi" : "en");
    try {
      window.dispatchEvent(new CustomEvent("language:changed", { detail: { lang: next } }));
    } catch (e) {}
    showToast(next === "HI" ? "भाषा बदलकर 'हिन्दी' कर दी गई है (फॉन्ट: Poppins)" : "Language switched to English (Font: Inter)");
    setTimeout(() => window.location.reload(), 250);
  }

  function translateNodeText(raw) {
    if (!raw) return raw;
    const trimmed = raw.trim();
    if (!trimmed) return raw;

    // Direct exact dictionary match
    if (DICTIONARY[trimmed]) {
      return raw.replace(trimmed, DICTIONARY[trimmed]);
    }

    let result = raw;

    // Pattern: (\d+)\s+products
    result = result.replace(/(\d+)\s+products/gi, '$1 उत्पाद');
    // Pattern: (\d+)\s+reviews
    result = result.replace(/(\d+)\s+reviews/gi, '$1 समीक्षाएं');
    // Pattern: Over (currency) amount
    result = result.replace(/Over\s+([₹$€]|AED\s*)?([0-9,]+)/gi, '$1$2 से अधिक');
    // Pattern: Under (currency) amount
    result = result.replace(/Under\s+([₹$€]|AED\s*)?([0-9,]+)/gi, '$1$2 से कम');

    return result;
  }

  function applyTranslations(root = document.body) {
    if (!root || get() !== "HI") return;

    // 1. Text nodes traversal via TreeWalker
    if (typeof document.createTreeWalker === "function") {
      const SHOW_TEXT = typeof NodeFilter !== "undefined" ? NodeFilter.SHOW_TEXT : 4;
      const FILTER_ACCEPT = typeof NodeFilter !== "undefined" ? NodeFilter.FILTER_ACCEPT : 1;
      const FILTER_REJECT = typeof NodeFilter !== "undefined" ? NodeFilter.FILTER_REJECT : 2;

      const walker = document.createTreeWalker(root, SHOW_TEXT, {
        acceptNode: (node) => {
          if (!node.nodeValue || !node.nodeValue.trim()) return FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return FILTER_REJECT;
          if (parent.closest('.notranslate, [data-no-translate="true"], .footer-credits')) {
            return FILTER_REJECT;
          }
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'code', 'pre', 'noscript'].includes(tag)) {
            return FILTER_REJECT;
          }
          return FILTER_ACCEPT;
        }
      });

      const textNodes = [];
      let cur = walker.nextNode();
      while (cur) {
        textNodes.push(cur);
        cur = walker.nextNode();
      }

      textNodes.forEach((node) => {
        const translated = translateNodeText(node.nodeValue);
        if (translated !== node.nodeValue) {
          node.nodeValue = translated;
        }
      });
    }

    // 2. Input and textarea placeholders
    const inputs = root.querySelectorAll ? root.querySelectorAll('input[placeholder], textarea[placeholder]') : [];
    inputs.forEach((el) => {
      const ph = el.getAttribute('placeholder');
      if (ph) {
        const tr = DICTIONARY[ph.trim()] || translateNodeText(ph);
        if (tr !== ph) el.setAttribute('placeholder', tr);
      }
    });

    // 3. Titles and Aria labels
    const titled = root.querySelectorAll ? root.querySelectorAll('[title], [aria-label]') : [];
    titled.forEach((el) => {
      const t = el.getAttribute('title');
      if (t && DICTIONARY[t.trim()]) el.setAttribute('title', DICTIONARY[t.trim()]);
      const al = el.getAttribute('aria-label');
      if (al && DICTIONARY[al.trim()]) el.setAttribute('aria-label', DICTIONARY[al.trim()]);
    });
  }

  let isTranslating = false;
  function observeMutations() {
    if (typeof MutationObserver === "undefined" || !document.body) return;
    const observer = new MutationObserver((mutations) => {
      if (isTranslating || get() !== "HI") return;
      isTranslating = true;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) { // ELEMENT_NODE
            applyTranslations(node);
          } else if (node.nodeType === 3 && node.parentElement) { // TEXT_NODE
            if (!node.parentElement.closest('.notranslate, [data-no-translate="true"], .footer-credits')) {
              const tr = translateNodeText(node.nodeValue);
              if (tr !== node.nodeValue) node.nodeValue = tr;
            }
          }
        }
      }
      isTranslating = false;
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    const lang = get();
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "HI" ? "hi" : "en");

    const lbl = document.getElementById("active-lang-label");
    if (lbl) {
      lbl.textContent = lang === "HI" ? "हिन्दी" : "EN";
    }

    if (lang === "HI") {
      applyTranslations();
      observeMutations();
    }
  }

  return { get, toggle, init, applyTranslations };
})();
