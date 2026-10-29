/* ==========================================================================
   MINIMAL E-COMMERCE - PRODUCT PAGE LOGIC (product-page.js)
   Gallery switcher, variant picker, qty selector, accordions, related
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initGallery();
  initHoverZoom();
  initLightbox();
  initVariantPickers();
  initQtySelector();
  initAccordions();
  initAddToCart();
  initRelatedProducts();
  initPincodeChecker();
  initProductWishlist();
  initReviewSystem();
  initScarcityAlert();
  initRecentlyViewedOnProduct();
});

/* ── PIN Code Delivery Checker ───────────────────────────────── */
function initPincodeChecker() {
  const input = document.getElementById("pincode-input");
  const btn = document.getElementById("pincode-check-btn");
  const result = document.getElementById("pincode-result");
  if (!btn || !input || !result) return;

  function check() {
    const pin = input.value.trim();
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      result.className = "pincode-result-msg";
      result.style.color = "#DC2626";
      result.innerHTML = "⚠️ Please enter a valid 6-digit Indian PIN code.";
      return;
    }
    // Calculate delivery date 3-4 days ahead
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const dateStr = d.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
    result.className = "pincode-result-msg success";
    result.style.color = "";
    result.innerHTML = `✓ <strong>Free Express Delivery</strong> by <strong>${dateStr}</strong> to ${pin} • Cash on Delivery available`;
    showToast(`Delivery available for ${pin}!`);
  }

  btn.addEventListener("click", check);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      check();
    }
  });
}

/* ── Product Wishlist Button ─────────────────────────────────── */
function initProductWishlist() {
  const btn = document.getElementById("product-wishlist-btn");
  const addBtn = document.getElementById("add-to-cart-btn");
  if (!btn) return;
  const productId = btn.dataset.productId || (addBtn ? addBtn.dataset.productId : "");
  if (!productId || typeof Wishlist === "undefined") return;

  function update() {
    const isW = Wishlist.has(productId);
    btn.classList.toggle("active", isW);
    const text = btn.querySelector(".wishlist-text");
    if (text) text.textContent = isW ? "Saved in Wishlist" : "Add to Wishlist";
    const icon = btn.querySelector("svg");
    if (icon) {
      icon.setAttribute("fill", isW ? "#EC4899" : "none");
      icon.setAttribute("stroke", isW ? "#EC4899" : "currentColor");
    }
  }

  update();
  btn.addEventListener("click", () => {
    Wishlist.toggle(productId);
    update();
  });
  window.addEventListener("wishlist:updated", update);
}

/* ── Interactive Reviews System ──────────────────────────────── */
let currentRating = 5;

function openReviewModal() {
  const modal = document.getElementById("review-modal-overlay");
  if (modal) modal.classList.add("active");
}

function closeReviewModal() {
  const modal = document.getElementById("review-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function initReviewSystem() {
  const starsContainer = document.getElementById("review-star-picker");
  if (starsContainer) {
    const stars = starsContainer.querySelectorAll("span");
    stars.forEach((s) => {
      s.addEventListener("click", () => {
        currentRating = parseInt(s.dataset.val) || 5;
        stars.forEach((star) => {
          const val = parseInt(star.dataset.val);
          star.classList.toggle("active", val <= currentRating);
        });
      });
    });
  }

  const form = document.getElementById("submit-review-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const addBtn = document.getElementById("add-to-cart-btn");
      const productId = addBtn ? addBtn.dataset.productId : "product";
      const name = document.getElementById("rev-author").value.trim() || "Verified Buyer";
      const comment = document.getElementById("rev-comment").value.trim();
      if (!comment) return;

      const newReview = {
        author: name,
        rating: currentRating,
        text: comment,
        date: "Just now",
      };

      // Save in localStorage
      const key = "buyhelps_reviews_" + productId;
      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem(key)) || [];
      } catch {
        stored = [];
      }
      stored.unshift(newReview);
      localStorage.setItem(key, JSON.stringify(stored));

      // Append to list
      const listEl = document.getElementById("reviews-list-container");
      if (listEl) {
        const item = document.createElement("div");
        item.style.padding = "0.85rem 0";
        item.style.borderBottom = "1px solid var(--color-border-subtle)";
        item.innerHTML = `
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
            <strong style="font-size:0.9rem;">${newReview.author}</strong>
            <span>${renderStars(newReview.rating)}</span>
            <span class="badge" style="background:#DCFCE7;color:#15803D;font-size:0.7rem;padding:0.1rem 0.4rem;">✓ Verified Review</span>
          </div>
          <p style="font-size:0.875rem;color:var(--color-text-secondary);">${newReview.text}</p>`;
        listEl.prepend(item);
      }

      closeReviewModal();
      form.reset();
      showToast("⭐ Thank you! Your review has been published.");
    });
  }
}

/* ── Gallery ─────────────────────────────────────────────────── */
function initGallery() {
  const mainImg = document.getElementById("main-product-image");
  const thumbs = document.querySelectorAll(".thumbnail-btn");
  if (!mainImg || thumbs.length === 0) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.src = thumb.dataset.src;
      mainImg.alt = thumb.dataset.alt || "";
    });
  });
}

/* ── Variant Pickers ─────────────────────────────────────────── */
function initVariantPickers() {
  document.querySelectorAll(".variant-options").forEach((group) => {
    const pills = group.querySelectorAll(".variant-pill");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
      });
    });
  });

  document.querySelectorAll(".color-options").forEach((group) => {
    const dots = group.querySelectorAll(".color-dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        dots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
      });
    });
  });
}

/* ── Quantity Selector ───────────────────────────────────────── */
function initQtySelector() {
  const minus = document.getElementById("qty-minus");
  const plus = document.getElementById("qty-plus");
  const input = document.getElementById("qty-input");
  if (!minus || !plus || !input) return;

  minus.addEventListener("click", () => {
    let val = parseInt(input.value) || 1;
    input.value = Math.max(1, val - 1);
  });

  plus.addEventListener("click", () => {
    let val = parseInt(input.value) || 1;
    input.value = val + 1;
  });
}

/* ── Accordions ──────────────────────────────────────────────── */
function initAccordions() {
  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const isOpen = item.classList.contains("open");
      // Close all
      document.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("open"));
      // Toggle current
      if (!isOpen) item.classList.add("open");
      // Update chevron
      document.querySelectorAll(".accordion-trigger .chevron").forEach((c) => (c.textContent = "+"));
      if (!isOpen) {
        const chevron = trigger.querySelector(".chevron");
        if (chevron) chevron.textContent = "−";
      }
    });
  });
  // Open first accordion by default
  const first = document.querySelector(".accordion-item");
  if (first) {
    first.classList.add("open");
    const c = first.querySelector(".chevron");
    if (c) c.textContent = "−";
  }
}

/* ── Add To Cart ─────────────────────────────────────────────── */
function initAddToCart() {
  const addBtn = document.getElementById("add-to-cart-btn");
  const buyBtn = document.getElementById("buy-now-btn");
  if (!addBtn) return;

  addBtn.addEventListener("click", () => {
    const productId = addBtn.dataset.productId;
    const qty = parseInt(document.getElementById("qty-input")?.value) || 1;
    // Get selected variant
    const activeVariant = document.querySelector(".variant-pill.active");
    const variant = activeVariant ? activeVariant.textContent.trim() : "";
    Cart.addItem(productId, qty, variant);
  });

  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      addBtn.click();
      const inSubdir = window.location.pathname.replace(/\\/g, "/").includes("/products/");
      const checkoutUrl = inSubdir ? "../checkout.html" : "checkout.html";
      setTimeout(() => (window.location.href = checkoutUrl), 300);
    });
  }
}

/* ── Related Products ────────────────────────────────────────── */
function initRelatedProducts() {
  const container = document.getElementById("related-products");
  if (!container) return;

  const productId = container.dataset.productId;
  const product = getProductById(productId);
  if (!product) return;

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  container.innerHTML = related.map((p) => renderProductCard(p)).join("");
}

/* ── Stock Scarcity & High-Demand Alert ───────────────────────── */
function initScarcityAlert() {
  const actionsRow = document.querySelector(".product-actions-row");
  if (!actionsRow || document.getElementById("scarcity-alert-box")) return;

  const box = document.createElement("div");
  box.id = "scarcity-alert-box";
  box.className = "scarcity-alert-box";
  box.innerHTML = `
    <div class="scarcity-header">
      <span class="scarcity-pulse-dot"></span>
      <span>High Demand: Only 4 units left in stock!</span>
    </div>
    <div style="font-size:0.8rem;color:var(--color-text-secondary);line-height:1.4;">
      🔥 16 shoppers currently have this item in their bag or are viewing right now. Order within <strong>2 hrs 45 mins</strong> to guarantee express dispatch today.
    </div>
    <div class="scarcity-bar-wrap">
      <div class="scarcity-bar-fill" style="width: 20%;"></div>
    </div>
  `;
  actionsRow.parentNode.insertBefore(box, actionsRow);
}

/* ── Recently Viewed On Product Page ─────────────────────────── */
function initRecentlyViewedOnProduct() {
  const addBtn = document.getElementById("add-to-cart-btn");
  const productId = addBtn ? addBtn.dataset.productId : "";
  if (productId && typeof RecentlyViewed !== "undefined") {
    RecentlyViewed.add(productId);
  }

  // Create container if not exists
  let rvContainer = document.getElementById("recently-viewed-products");
  if (!rvContainer) {
    rvContainer = document.createElement("div");
    rvContainer.id = "recently-viewed-products";
    const main = document.querySelector("main .container") || document.querySelector("main");
    if (main) main.appendChild(rvContainer);
  }

  if (typeof RecentlyViewed !== "undefined") {
    RecentlyViewed.render("recently-viewed-products");
  }
}

/* ── Interactive Hover Lens Zoom (Feature 4) ──────────────────── */
function initHoverZoom() {
  const container = document.querySelector(".product-main-image");
  const img = document.getElementById("main-product-image");
  if (!container || !img) return;

  // Add zoom hint badge if not present
  if (!container.querySelector(".zoom-hint-badge")) {
    const badge = document.createElement("div");
    badge.className = "zoom-hint-badge";
    badge.innerHTML = `
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Hover to Zoom • Click for Fullscreen
    `;
    container.appendChild(badge);
  }

  container.addEventListener("mouseenter", () => {
    container.classList.add("zoomed");
  });

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  });

  container.addEventListener("mouseleave", () => {
    container.classList.remove("zoomed");
    img.style.transformOrigin = "center center";
  });
}

/* ── Fullscreen Image Lightbox (Feature 4) ───────────────────── */
function initLightbox() {
  const mainWrap = document.querySelector(".product-main-image");
  if (!mainWrap) return;

  let lightboxEl = document.getElementById("product-lightbox-overlay");
  if (!lightboxEl) {
    lightboxEl = document.createElement("div");
    lightboxEl.id = "product-lightbox-overlay";
    lightboxEl.className = "lightbox-overlay";
    lightboxEl.innerHTML = `
      <button type="button" class="lightbox-close-btn" id="lightbox-close" aria-label="Close Lightbox">&times;</button>
      <button type="button" class="lightbox-nav-btn prev" id="lightbox-prev" aria-label="Previous Image">&larr;</button>
      <button type="button" class="lightbox-nav-btn next" id="lightbox-next" aria-label="Next Image">&rarr;</button>
      <div class="lightbox-img-wrap">
        <img src="" alt="Fullscreen View" class="lightbox-img" id="lightbox-main-img">
      </div>
      <div class="lightbox-counter" id="lightbox-counter">1 / 1</div>
    `;
    document.body.appendChild(lightboxEl);
  }

  let currentIdx = 0;
  let imgList = [];

  function collectImages() {
    const thumbs = document.querySelectorAll(".thumbnail-btn");
    imgList = [];
    thumbs.forEach((t) => {
      if (t.dataset.src) imgList.push(t.dataset.src);
    });
    if (imgList.length === 0) {
      const mainImg = document.getElementById("main-product-image");
      if (mainImg) imgList.push(mainImg.src);
    }
  }

  function updateLightbox() {
    const imgEl = document.getElementById("lightbox-main-img");
    const countEl = document.getElementById("lightbox-counter");
    if (imgEl && imgList[currentIdx]) {
      imgEl.src = imgList[currentIdx];
      if (countEl) countEl.textContent = `${currentIdx + 1} / ${imgList.length}`;
    }
  }

  function openLightbox() {
    collectImages();
    const mainImg = document.getElementById("main-product-image");
    currentIdx = mainImg ? Math.max(0, imgList.indexOf(mainImg.src)) : 0;
    updateLightbox();
    lightboxEl.classList.add("active");
  }

  function closeLightbox() {
    lightboxEl.classList.remove("active");
  }

  mainWrap.addEventListener("click", openLightbox);

  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + imgList.length) % imgList.length;
    updateLightbox();
  });
  document.getElementById("lightbox-next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % imgList.length;
    updateLightbox();
  });

  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightboxEl.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentIdx = (currentIdx - 1 + imgList.length) % imgList.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      currentIdx = (currentIdx + 1) % imgList.length;
      updateLightbox();
    }
  });
}
