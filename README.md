# 🛍️ Buyhelps — Smart Store E-Commerce Platform

> **Curated Essentials for Intentional Living**  
> *Crafted with ❤️ by VVR*

---

## 📖 Overview

**Buyhelps** is a modern, responsive, high-converting e-commerce web platform engineered with **pure vanilla HTML5, CSS3, and modern ES6+ JavaScript**. It requires zero external dependencies, build tools, or complex compilers—delivering lightning-fast load times, complete offline functionality, and an enterprise-grade shopping experience comparable to Apple, Nike, and top modern direct-to-consumer storefronts.

---

## 📑 Table of Contents

1. [Architecture & Directory Structure](#-architecture--directory-structure)
2. [Brand Identity & Design System](#-brand-identity--design-system)
3. [Feature Breakdown](#-feature-breakdown)
   - [1. Product Catalog & Categories](#1-product-catalog--categories)
   - [2. Multi-Currency & Bilingual Engine](#2-multi-currency--bilingual-engine)
   - [3. Dark & Light Theme System](#3-dark--light-theme-system)
   - [4. Shopping Cart & Drawer](#4-shopping-cart--drawer)
   - [5. Smart Checkout & Order Placement](#5-smart-checkout--order-placement)
   - [6. Account Hub & BlueDart Tracking](#6-account-hub--bluedart-tracking)
   - [7. Buyhelps VIP Club Loyalty Program](#7-buyhelps-vip-club-loyalty-program)
   - [8. Storewide Wishlist System](#8-storewide-wishlist-system)
   - [9. Live Predictive Search Modal (Ctrl+K)](#9-live-predictive-search-modal-ctrlk)
   - [10. PIN Code Delivery Estimator](#10-pin-code-delivery-estimator)
   - [11. Interactive Customer Reviews](#11-interactive-customer-reviews)
   - [12. Social Proof Live Purchases Toast](#12-social-proof-live-purchases-toast)
   - [13. Stock Scarcity & High-Demand Pulse Alert](#13-stock-scarcity--high-demand-pulse-alert)
   - [14. Exit-Intent Cart Recovery Modal](#14-exit-intent-cart-recovery-modal)
   - [15. Recently Viewed Products History](#15-recently-viewed-products-history)
   - [16. Printable GST Tax Invoice & PDF Receipts](#16-printable-gst-tax-invoice--pdf-receipts)
   - [17. Side-by-Side Product Comparison](#17-side-by-side-product-comparison)
   - [18. Interactive Floating AI Support Assistant](#18-interactive-floating-ai-support-assistant)
   - [19. Hover Lens Zoom & Fullscreen Lightbox](#19-hover-lens-zoom--fullscreen-lightbox)
   - [20. Luxury Gift Packaging & Greeting Option](#20-luxury-gift-packaging--greeting-option)
4. [State Management & LocalStorage Keys](#-state-management--localstorage-keys)
5. [Active Promo Codes & Vouchers](#-active-promo-codes--vouchers)
6. [Getting Started & Local Setup](#-getting-started--local-setup)
7. [Browser Compatibility & Testing](#-browser-compatibility--testing)

---

## 📂 Architecture & Directory Structure

```text
minimal-ecommerce/
│
├── index.html                   # Storefront Homepage (Hero, Categories, Trending, Recently Viewed)
├── categories.html              # Full Category Catalog Overview
├── category.html                # Category Filtered Product Listing (URL-driven via ?cat=...)
├── product.html                 # Dynamic Single Product Template (URL-driven via ?id=...)
├── cart.html                    # Dedicated Shopping Cart Page & Summary
├── checkout.html                # Multi-Step Checkout (Addresses, Wallet, Coupons, Gift Wrap)
├── confirmation.html            # Order Confirmed Screen with BlueDart ETA & GST Invoice Button
├── account.html                 # User Account Hub (Tracking, Addresses, Wallet, Wishlist, VIP, Settings)
├── README.md                    # Platform Master Documentation
│
├── assets/
│   ├── css/
│   │   ├── style.css            # Design tokens, CSS variables, typography, reset, grid, layout
│   │   ├── components.css       # Modals, drawers, badges, toast, lightbox, chat, invoices, compare
│   │   └── pages.css            # Specialized styles for account hub, product grids, timelines
│   │
│   └── js/
│       ├── data.js              # Central catalog database (24 unique products, 6 categories, formatPrice)
│       ├── cart.js              # State manager for Cart (addItem, removeItem, updateQty, subtotal)
│       ├── main.js              # Global initialization (Theme, Search, Wishlist, Currency, Chat, Social Proof)
│       └── product-page.js      # Product detail logic (Gallery, Lens Zoom, Lightbox, PIN check, Reviews)
│
└── products/                    # Dedicated Showcase Product Pages
    ├── wireless-headphones.html # Studio Wireless Headphones
    ├── mechanical-keyboard.html # Gateron Mechanical Keyboard
    ├── minimal-watch.html       # Minimalist Quartz Watch
    ├── linen-overshirt.html     # European Linen Overshirt
    ├── ceramic-pour-over.html   # Ceramic Pour-Over Coffee Set
    └── leather-journal.html     # Full-Grain Leather Journal
```

---

## 🎨 Brand Identity & Design System

- **Brand Name**: **Buyhelps**
- **Slogan**: `SMART STORE`
- **Dimensional Emblem**: Custom SVG container with:
  - Multi-stop gradient squircle (`#4F46E5` &rarr; `#7C3AED` &rarr; `#EC4899`).
  - Glossy 3D top tote handle with white stroke curvature.
  - Specular glass curve reflection overlay.
  - Glowing yellow-orange heart badge (`#FDE047` &rarr; `#F97316`).
  - Sparkling 4-point accent star (`#FDE047`).
- **Typography**: Dual-tone brand typography (`Buy` in indigo + `helps` in pink).
- **Footer Copyright Notice**: Present on all 14 pages:
  > `© 2026 Buyhelps. made with ❤️ By vvr. All rights reserved.`

---

## 🚀 Feature Breakdown

### 1. Product Catalog & Categories
- **24 Curated Products** distributed evenly across 6 categories:
  - 🎧 **Electronics & Audio** (Headphones, Keyboards, Wireless Chargers, Speakers)
  - 👕 **Fashion & Apparel** (Linen Overshirts, Cashmere Sweaters, Canvas Totes, Wool Beanies)
  - ☕ **Home & Living** (Ceramic Pour-Over Sets, Stoneware Mugs, Linen Bedding, Soy Candles)
  - 📓 **Books & Stationery** (Leather Journals, Brass Fountain Pens, Desk Mats, Sticky Tabs)
  - 🌿 **Wellness & Beauty** (Aromatherapy Diffusers, Jade Rollers, Herbal Teas, Bath Salts)
  - 🏃 **Sports & Outdoors** (Insulated Bottles, Yoga Mats, Running Belts, Quick-Dry Towels)
- **Zero Image Duplication**: Every product contains authentic, high-resolution Unsplash photography.
- **Fail-Safe SVG Fallbacks**: `handleImgError()` gracefully renders category-themed placeholder SVGs if any network or asset connection drops.

### 2. Multi-Currency & Bilingual Engine
- **Supported Currencies**:
  - `₹ INR` (Indian Rupee, Base 1.0)
  - `$ USD` (US Dollar, Rate 0.012)
  - `€ EUR` (Euro, Rate 0.011)
  - `AED` (UAE Dirham, Rate 0.044)
- **Automatic Conversion**: `formatPrice(amount)` dynamically converts and formats prices using native `toLocaleString` locales (`en-IN`, `en-US`, `de-DE`, `en-AE`).
- **Bilingual Interface**: One-click `🌐 EN / हिन्दी` toggle localizing header navigation, buttons, and system labels.

### 3. Dark & Light Theme System
- **Default State**: Crisp, clean **Light Mode**.
- **Dark Mode**: High-contrast OLED dark theme using CSS variables (`--color-surface`, `--color-bg`, `--color-text-primary`).
- **Persistence**: Saved automatically in `localStorage` under `buyhelps_theme`.

### 4. Shopping Cart & Drawer
- **Quick-Access Drawer**: Slides smoothly from the right edge with overlay backdrop.
- **Dedicated Cart Page** (`cart.html`): Full tabular view with line items, quantity modifiers (`+`/`−`), and item removal.
- **Free Shipping Progress Tracker**: Visual indicator showing how much to add to qualify for Free Shipping (threshold: ₹1,999).
- **Cart Promo Code Box**: Test and apply promo codes directly in the cart before proceeding to checkout.

### 5. Smart Checkout & Order Placement
- **Step 1 — Saved Address Selector**:
  - Displays saved addresses from `buyhelps_addresses` as 1-click selectable cards.
  - Automatically populates or overrides Name, Phone, Street, City, State, and PIN code.
- **Step 2 — Payment Methods**:
  - **Instant UPI**: Direct support for Google Pay, PhonePe, Paytm, BHIM with UPI ID verification.
  - **Credit / Debit Cards**: Card number formatting, Expiry date, and CVV fields.
  - **Cash on Delivery (COD)**: Doorstep cash / UPI payment.
- **Buyhelps Cash Wallet**: One-click checkbox deducting up to **₹1,250** available balance from order total.
- **Order Confirmation**: Clears cart, generates a unique Order ID (e.g. `#BUYHELPS-2026-84920`), and redirects to `confirmation.html`.

### 6. Account Hub & BlueDart Tracking (`account.html`)
- **Live BlueDart Tracking**:
  - Order search bar to query any AWB or Order ID.
  - 5-step milestone timeline: *Order Placed* &rarr; *Packed & Ready* &rarr; *In Transit (Active)* &rarr; *Out for Delivery* &rarr; *Delivered*.
- **Saved Delivery Addresses (CRUD)**:
  - Add, edit, or delete delivery addresses with Home / Work / Other tags and Default address indicators.
- **Payment Methods & Wallet**:
  - View ₹1,250 balance and complete transaction history log.
- **My Wishlist Tab**:
  - Real-time catalog of all favorited items with direct "+ Add to Cart" buttons.
- **Profile & Security**:
  - Update personal information, language preferences, and communication channels (WhatsApp / SMS).

### 7. Buyhelps VIP Club Loyalty Program
- **Status Dashboard**: Highlights customer tier (**Gold VIP Member**), lifetime spend (**₹24,498**), and available club points (**1,250 Pts**).
- **Milestone Progress Bar**: 81% progress towards **Platinum VIP** (Spend ₹5,502 more to unlock).
- **Gold Tier Privileges**:
  - 5% direct cashback credited to wallet on all orders.
  - Free BlueDart Air Express delivery with zero minimum order value.
  - Complimentary luxury gift wrapping on gift orders.
  - 48-hour early access to festive sales and limited drops.
- **Vouchers Hub**: 1-click copyable vouchers (`VIPGOLD500`, `BDAYGIFT500`).
- **Tier Comparison Matrix**: Full side-by-side comparison between Bronze, Silver, Gold, and Platinum VIP.

### 8. Storewide Wishlist System
- **Floating Heart Buttons** (`♡`/`♥`) on every product card across the homepage, categories, catalog, and product detail pages.
- **Global `Wishlist` Manager**: Broadcasts custom `wishlist:updated` DOM events and persists data to `localStorage`.

### 9. Live Predictive Search Modal (Ctrl+K)
- **Shortcut**: `Ctrl+K` (or `Cmd+K` on macOS) or search icon button in the header.
- **Trending Chips**: Instant 1-click searches (`🎧 Headphones`, `⌨️ Keyboard`, `☕ Coffee Set`, `⌚ Watch`, `👕 Overshirt`, `📓 Journal`).
- **Predictive Autocomplete**: Instant search querying titles, descriptions, categories, and tags with thumbnails and direct links.

### 10. PIN Code Delivery Estimator
- Interactive 6-digit Indian PIN code checker (e.g. `560038`, `110001`, `400001`).
- Dynamically calculates the estimated arrival date (4 business days from current date).
- Displays free express delivery status and cash on delivery eligibility.

### 11. Interactive Customer Reviews
- **Write a Review Modal**: Triggered by the "★ Write a Review" button on product pages.
- **Interactive 5-Star Picker**: Hover and click star animations.
- **Instant Persistence**: Appends the review to the DOM with a "✓ Verified Buyer" badge and persists to `buyhelps_reviews_${productId}`.

### 12. Social Proof Live Purchases Toast
- Cycles every 28 seconds in the bottom-left corner.
- Displays realistic purchases across Indian cities (Bengaluru, Mumbai, Hyderabad, Delhi NCR, Indiranagar, Pune).
- Includes product thumbnail, buyer name, time ago, verified purchase badge, and close button.

### 13. Stock Scarcity & High-Demand Pulse Alert
- Displays an alert banner on product pages:
  - Red pulsing indicator dot.
  - *"High Demand: Only 4 units left in stock!"*.
  - Activity alert: *"🔥 16 shoppers currently have this item in their bag or are viewing right now."*.
  - Low-stock progress bar (20% threshold).

### 14. Exit-Intent Cart Recovery Modal
- Monitors cursor movement leaving the browser viewport toward the top URL/tab bar.
- If the cart has items, triggers an offer:
  - Exclusive promo code: **`EXTRA5`** (Extra 5% off).
  - 1-click "Claim 5% Off & Checkout Now" button.
  - Throttled per session via `sessionStorage`.

### 15. Recently Viewed Products History
- Tracks browsed products in `localStorage` under `buyhelps_recently_viewed`.
- Renders a clean 4-column carousel on the Homepage and Product pages with a "Clear History" button.

### 16. Printable GST Tax Invoice & PDF Receipts
- **1-Click Generation** on [confirmation.html](file:///c:/Users/vvrao/Downloads/minimal-ecommerce/confirmation.html) and [account.html](file:///c:/Users/vvrao/Downloads/minimal-ecommerce/account.html).
- **GST Compliance**: Includes Seller Details, Buyer Details, HSN Codes (`85183000`), Taxable Value, CGST (9%), SGST (9%), Total, and QR Code verification stamp.
- **Dedicated Print Styles**: `@media print` rules format the invoice perfectly for A4 paper and PDF saving (`Ctrl+P`).

### 17. Side-by-Side Product Comparison
- Compare button `[⚖️]` on every product card.
- Floating bottom pill: `⚖️ [2] Selected to Compare | Compare Now → | Clear`.
- Comparison matrix comparing photos, titles, prices, ratings, categories, delivery terms, and trial policies.

### 18. Interactive Floating AI Support Assistant
- Bottom-right launcher bubble with online pulse badge.
- Expandable interactive chat window with Buyhelps Assistant.
- Automated quick chips:
  - 📦 *Track Order* (fetches active order `#BUYHELPS-2026-84920` status and BlueDart ETA).
  - 🔄 *Return Policy* (explains 30-day doorstep trial).
  - 💳 *Payment Methods* (explains UPI, Cards, NetBanking, COD, Wallet).
  - 💰 *Wallet Balance* (shows ₹1,250 balance).
- Free-form text input with intelligent conversational replies.

### 19. Hover Lens Zoom & Fullscreen Lightbox
- **Lens Zoom**: Hovering over the main product photo magnifies it at 2.2x zoom with smooth cursor position tracking.
- **Fullscreen Lightbox**: Clicking the image launches a dark fullscreen lightbox with Previous / Next arrow navigation, image counter (`1 / 3`), and keyboard arrow controls.

### 20. Luxury Gift Packaging & Greeting Option
- Checkbox on [checkout.html](file:///c:/Users/vvrao/Downloads/minimal-ecommerce/checkout.html): *"🎁 Add Luxury Gift Packaging & Greeting Card (+₹99)"*.
- Expands recipient name and personal message card input.
- Automatically updates order summary line items and total payable amount.

---

## 💾 State Management & LocalStorage Keys

| Key | Type | Description |
|---|---|---|
| `buyhelps_cart` | `Array<Object>` | Items in cart with product object, quantity, and variant |
| `buyhelps_wishlist` | `Array<String>` | Array of favorited product ID strings |
| `buyhelps_addresses` | `Array<Object>` | Saved user delivery addresses with Home/Work tags |
| `buyhelps_currency` | `String` | Selected currency code (`INR`, `USD`, `EUR`, `AED`) |
| `buyhelps_lang` | `String` | Selected interface language (`EN`, `HI`) |
| `buyhelps_theme` | `String` | Active UI theme (`light`, `dark`) |
| `buyhelps_recently_viewed` | `Array<String>` | Array of up to 8 recently viewed product IDs |
| `buyhelps_compare_ids` | `Array<String>` | Up to 3 product IDs selected for comparison |
| `buyhelps_last_order_id` | `String` | Active order ID (e.g. `#BUYHELPS-2026-84920`) |
| `buyhelps_reviews_${id}` | `Array<Object>` | Customer submitted reviews per product ID |
| `buyhelps_exit_shown` | `SessionStorage` | Flag to prevent repeat exit-intent popups in a session |

---

## 🎟️ Active Promo Codes & Vouchers

| Promo Code | Discount Value | Conditions |
|---|---|---|
| **`BUYHELPS10`** | 10% Off Cart Subtotal | Valid on all orders |
| **`FESTIVE500`** | Flat ₹500 Off | Minimum order value of ₹1,999 |
| **`EXTRA5`** | Extra 5% Off | Exit-intent recovery special |
| **`VVR1000`** | Flat ₹1,000 Off | VIP discount code |
| **`VIPGOLD500`** | Flat ₹500 Off | Exclusive for Gold VIP Club members |
| **`BDAYGIFT500`** | Flat ₹500 Off | Annual birthday gift voucher |

---

## 💻 Getting Started & Local Setup

### Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- No Node.js, npm, or local servers are required!

### Running Locally
1. Clone or download the repository folder:
   ```bash
   cd minimal-ecommerce
   ```
2. Open `index.html` directly in your browser:
   - **Windows**: Double-click `index.html` or open via command line:
     ```powershell
     start index.html
     ```
   - **macOS**:
     ```bash
     open index.html
     ```
   - **Linux**:
     ```bash
     xdg-open index.html
     ```

*(Optional)* You can also run it via any simple static HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node / npx
npx serve .
```

---

## 🧪 Browser Compatibility & Testing

- **Desktop Browsers**: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+.
- **Mobile Browsers**: iOS Safari, Android Chrome, Samsung Internet.
- **Link Integrity**: 100% of internal links, images, stylesheets, and scripts tested and resolved.
- **Syntax Validation**: 100% balanced braces across all JavaScript and CSS files.

---

<p align="center">
  <b>Buyhelps Smart Store</b> • Built with dedication by <b>vineet</b> • © 2026 All Rights Reserved
</p>
