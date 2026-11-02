/* ==========================================================================
   BUYHELPS - PRODUCT DATA (data.js)
   Central catalog: 6 categories, 48 unique curated products (INR Currency)
   ========================================================================== */

const STORE = {
  name: "Buyhelps",
  tagline: "Curated Essentials for Intentional Living",
  currency: "₹",
  currencyCode: "INR",
};

const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics & Audio",
    description: "Premium tech gear crafted with precision and minimalist design.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    icon: "🎧",
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    description: "Timeless wardrobe staples made from natural, sustainable materials.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    icon: "👕",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Thoughtfully designed homeware for serene, comfortable spaces.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    icon: "🏠",
  },
  {
    id: "books",
    name: "Books & Stationery",
    description: "Handcrafted journals, fine pens, and analog tools for creative minds.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
    icon: "📚",
  },
  {
    id: "wellness",
    name: "Wellness & Personal Care",
    description: "Botanical-powered self-care essentials for body and mind.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    icon: "🌿",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    description: "Durable, lightweight gear for everyday adventures and active living.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    icon: "⛰️",
  },
];

const PRODUCTS = [
  // ══════════════════════════════════════════════════════════════
  // 1. ELECTRONICS & AUDIO (8 Products)
  // ══════════════════════════════════════════════════════════════
  {
    id: "wireless-headphones",
    title: "Studio Wireless Headphones",
    category: "electronics",
    price: 14999,
    originalPrice: 17999,
    badge: "sale",
    rating: 4.8,
    reviewCount: 324,
    description: "Experience pure, immersive audio with our Studio Wireless Headphones. Featuring 40mm custom drivers, adaptive noise cancellation, and 30-hour battery life wrapped in a featherlight design with memory foam ear cushions.",
    shortDesc: "Premium noise-canceling headphones with 30hr battery.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&q=80",
    ],
    variants: { color: ["Matte Black", "Cloud White", "Forest Green"] },
    specs: [
      { label: "Driver Size", value: "40mm Custom" },
      { label: "Battery Life", value: "30 hours" },
      { label: "Noise Cancellation", value: "Adaptive ANC" },
      { label: "Weight", value: "248g" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
    ],
    reviews: [
      { author: "Alex R.", rating: 5, text: "Best headphones I've ever owned. The ANC is incredible." },
      { author: "Priya S.", rating: 4, text: "Great sound quality, very comfortable for long sessions." },
    ],
    featured: true,
    sku: "EL-WH-001",
    stock: 42,
    dedicatedPage: true,
  },
  {
    id: "mechanical-keyboard",
    title: "Mechanical Desk Keyboard",
    category: "electronics",
    price: 8999,
    badge: "new",
    rating: 4.7,
    reviewCount: 189,
    description: "A beautifully crafted mechanical keyboard with hot-swappable Gateron switches, PBT keycaps, and a machined aluminum frame. Designed for typists who appreciate tactile perfection.",
    shortDesc: "Hot-swap mechanical keyboard with aluminum body.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80",
    ],
    variants: { color: ["Space Gray", "Silver", "Midnight Blue"] },
    specs: [
      { label: "Switch Type", value: "Gateron Brown (hot-swap)" },
      { label: "Keycaps", value: "Double-shot PBT" },
      { label: "Frame", value: "CNC Aluminum" },
      { label: "Connectivity", value: "USB-C / Bluetooth" },
      { label: "Backlighting", value: "White LED" },
    ],
    reviews: [
      { author: "Jason T.", rating: 5, text: "Typing on this is an absolute joy. Build quality is top notch." },
    ],
    featured: true,
    sku: "EL-MK-002",
    stock: 28,
    dedicatedPage: true,
  },
  {
    id: "minimal-watch",
    title: "Minimal Analog Watch",
    category: "electronics",
    price: 6499,
    badge: "new",
    rating: 4.8,
    reviewCount: 156,
    description: "A refined timepiece that strips away the unnecessary. Japanese Miyota quartz movement housed in a 40mm stainless steel case with a sapphire-coated crystal and premium Italian leather strap.",
    shortDesc: "40mm stainless steel, Japanese quartz movement.",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80",
    ],
    variants: { color: ["Silver", "Gold", "Black"] },
    specs: [
      { label: "Movement", value: "Japanese Miyota Quartz" },
      { label: "Case", value: "40mm Stainless Steel" },
      { label: "Water Resistance", value: "5ATM" },
      { label: "Strap", value: "Italian Leather" },
      { label: "Weight", value: "68g" },
    ],
    reviews: [
      { author: "Daniel K.", rating: 5, text: "Elegant and understated. Perfect everyday watch." },
      { author: "Sophie L.", rating: 5, text: "The leather strap quality is exceptional. Love the minimalist dial." },
    ],
    featured: true,
    sku: "EL-MW-005",
    stock: 35,
    dedicatedPage: true,
  },
  {
    id: "desk-lamp",
    title: "Minimal LED Desk Lamp",
    category: "electronics",
    price: 2499,
    rating: 4.5,
    reviewCount: 97,
    description: "Sleek, adjustable LED desk lamp with touch-dimming, warm-to-cool color temperature control, and a wireless charging base.",
    shortDesc: "Adjustable LED lamp with wireless charging base.",
    images: [
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80",
    ],
    variants: { color: ["Matte White", "Graphite"] },
    specs: [
      { label: "Brightness", value: "800 lux" },
      { label: "Color Temp", value: "2700K–6500K" },
      { label: "Power", value: "12W USB-C" },
    ],
    reviews: [],
    featured: false,
    sku: "EL-DL-003",
    stock: 55,
  },
  {
    id: "charging-pad",
    title: "Qi Wireless Charging Pad",
    category: "electronics",
    price: 1299,
    rating: 4.4,
    reviewCount: 216,
    description: "Ultra-slim 15W wireless charging pad with soft-touch fabric surface and silent operation. Compatible with all Qi-enabled devices.",
    shortDesc: "15W slim wireless charger, fabric finish.",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    ],
    variants: { color: ["Charcoal", "Sand"] },
    specs: [
      { label: "Max Power", value: "15W" },
      { label: "Standard", value: "Qi 1.3" },
      { label: "Cable", value: "USB-C included" },
    ],
    reviews: [],
    featured: false,
    sku: "EL-CP-004",
    stock: 130,
  },
  {
    id: "bluetooth-speaker",
    title: "Portable Walnut Bluetooth Speaker",
    category: "electronics",
    price: 7499,
    badge: "new",
    rating: 4.9,
    reviewCount: 112,
    description: "A stunning portable speaker carved from natural American walnut. Delivers room-filling 360-degree acoustic clarity with deep bass and a 20-hour rechargeable battery.",
    shortDesc: "Handcrafted natural walnut, 20hr battery life.",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    ],
    variants: { color: ["Natural Walnut", "Dark Oak"] },
    specs: [
      { label: "Output Power", value: "2 × 15W RMS" },
      { label: "Battery", value: "5200mAh (20 hrs playback)" },
      { label: "Housing", value: "Solid American Walnut" },
      { label: "Bluetooth", value: "5.2 with aptX HD" },
    ],
    reviews: [
      { author: "Liam N.", rating: 5, text: "Acoustics are rich and warm, and it looks like a work of art on my sideboard." },
    ],
    featured: false,
    sku: "EL-BS-006",
    stock: 24,
  },
  {
    id: "wireless-mouse",
    title: "Ergonomic Precision Mouse",
    category: "electronics",
    price: 2999,
    rating: 4.6,
    reviewCount: 145,
    description: "Ultra-quiet optical wireless mouse contoured for hand posture with aluminum scroll wheel, dual Bluetooth/2.4G connectivity, and USB-C quick recharge.",
    shortDesc: "Ergonomic contour, silent switches, dual wireless.",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80",
    ],
    variants: { color: ["Matte Gray", "Off-White"] },
    specs: [
      { label: "DPI Sensor", value: "4000 DPI adjustable" },
      { label: "Connectivity", value: "Bluetooth 5.0 + 2.4G USB" },
      { label: "Battery", value: "Rechargeable Li-ion (70 days)" },
    ],
    reviews: [],
    featured: false,
    sku: "EL-WM-007",
    stock: 62,
  },
  {
    id: "noise-cancelling-earbuds",
    title: "True Wireless ANC Earbuds",
    category: "electronics",
    price: 4999,
    badge: "sale",
    originalPrice: 6499,
    rating: 4.7,
    reviewCount: 280,
    description: "Compact wireless earbuds featuring active noise cancellation, transparency ambient mode, IPX5 water resistance, and 28 hours total playback with charging case.",
    shortDesc: "Compact ANC earbuds, IPX5 water resistant.",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    ],
    variants: { color: ["Midnight Black", "Porcelain"] },
    specs: [
      { label: "Drivers", value: "11mm Dynamic" },
      { label: "Water Rating", value: "IPX5 Sweat & Rainproof" },
      { label: "Total Playtime", value: "28 hours with case" },
    ],
    reviews: [],
    featured: false,
    sku: "EL-EB-008",
    stock: 75,
  },

  // ══════════════════════════════════════════════════════════════
  // 2. FASHION & APPAREL (8 Products)
  // ══════════════════════════════════════════════════════════════
  {
    id: "linen-overshirt",
    title: "Relaxed Linen Overshirt",
    category: "fashion",
    price: 3499,
    badge: "eco",
    rating: 4.9,
    reviewCount: 142,
    description: "An effortlessly cool overshirt cut from premium European flax linen. Relaxed fit with a soft-washed finish, horn buttons, and a versatile layering length.",
    shortDesc: "Soft-washed flax linen overshirt, relaxed fit.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    ],
    variants: { color: ["Oatmeal", "Olive", "Sky Blue"], size: ["S", "M", "L", "XL"] },
    specs: [
      { label: "Material", value: "100% European Flax Linen" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    reviews: [
      { author: "Marina K.", rating: 5, text: "This is THE perfect layering piece. Quality is exceptional." },
    ],
    featured: true,
    sku: "FA-LO-001",
    stock: 34,
    dedicatedPage: true,
  },
  {
    id: "raw-denim-jacket",
    title: "Raw Selvedge Denim Jacket",
    category: "fashion",
    price: 6999,
    rating: 4.6,
    reviewCount: 78,
    description: "A heritage-inspired trucker jacket in 14oz Japanese selvedge denim. Raw unwashed indigo that develops beautiful fades unique to you over time.",
    shortDesc: "14oz Japanese selvedge denim, raw indigo.",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    ],
    variants: { size: ["S", "M", "L", "XL"] },
    specs: [
      { label: "Material", value: "14oz Japanese Selvedge Denim" },
      { label: "Fit", value: "Slim Trucker" },
      { label: "Dye", value: "Raw Indigo" },
    ],
    reviews: [],
    featured: false,
    sku: "FA-DJ-002",
    stock: 19,
  },
  {
    id: "merino-beanie",
    title: "Merino Wool Ribbed Beanie",
    category: "fashion",
    price: 1499,
    badge: "eco",
    rating: 4.7,
    reviewCount: 205,
    description: "Ultra-soft merino wool beanie with a chunky rib knit. Temperature-regulating and itch-free for all-day comfort.",
    shortDesc: "Soft merino wool, chunky rib knit.",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",
    ],
    variants: { color: ["Charcoal", "Camel", "Burgundy", "Cream"] },
    specs: [
      { label: "Material", value: "100% Extra-fine Merino Wool" },
      { label: "Knit", value: "Chunky Rib" },
      { label: "One Size", value: "Fits Most" },
    ],
    reviews: [],
    featured: true,
    sku: "FA-MB-003",
    stock: 88,
  },
  {
    id: "canvas-tote",
    title: "Waxed Canvas Everyday Tote",
    category: "fashion",
    price: 2299,
    rating: 4.5,
    reviewCount: 119,
    description: "A rugged everyday tote in water-resistant waxed cotton canvas with leather handles and brass hardware. Interior laptop sleeve fits up to 14\".",
    shortDesc: "Waxed canvas tote with leather handles.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
    variants: { color: ["Olive", "Navy", "Tan"] },
    specs: [
      { label: "Material", value: "18oz Waxed Canvas, Full-grain Leather" },
      { label: "Capacity", value: "18L" },
      { label: "Laptop Fit", value: "Up to 14\"" },
    ],
    reviews: [],
    featured: false,
    sku: "FA-CT-004",
    stock: 41,
  },
  {
    id: "oxford-cotton-shirt",
    title: "Classic Oxford Button-Down",
    category: "fashion",
    price: 2799,
    rating: 4.8,
    reviewCount: 96,
    description: "Tailored from heavy 100% organic combed cotton with a substantial basketweave texture, button-down collar, and mother-of-pearl buttons.",
    shortDesc: "100% organic combed cotton, basketweave texture.",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    ],
    variants: { color: ["Crisp White", "Light Blue", "Pinstripe"], size: ["S", "M", "L", "XL"] },
    specs: [
      { label: "Fabric", value: "100% Organic Combed Cotton" },
      { label: "Collar", value: "Button-Down" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    reviews: [],
    featured: false,
    sku: "FA-OS-005",
    stock: 50,
  },
  {
    id: "cashmere-crewneck",
    title: "Pure Cashmere Crewneck Sweater",
    category: "fashion",
    price: 7999,
    badge: "new",
    rating: 4.9,
    reviewCount: 84,
    description: "Spun from 2-ply Mongolian grade-A cashmere. Exceptionally soft, lightweight, yet delightfully warm with ribbed hems and cuffs.",
    shortDesc: "Grade-A Mongolian cashmere, 2-ply yarn.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    variants: { color: ["Heather Gray", "Oatmeal", "Midnight"], size: ["S", "M", "L", "XL"] },
    specs: [
      { label: "Fiber", value: "100% Grade-A Mongolian Cashmere" },
      { label: "Gauge", value: "12-gauge 2-ply" },
      { label: "Care", value: "Hand wash cold or dry clean" },
    ],
    reviews: [],
    featured: false,
    sku: "FA-CS-006",
    stock: 22,
  },
  {
    id: "canvas-sneakers",
    title: "Low-Top Minimalist Sneakers",
    category: "fashion",
    price: 3299,
    rating: 4.6,
    reviewCount: 163,
    description: "Clean low-profile sneakers crafted with organic cotton canvas, vulcanized natural rubber soles, and cushioned ortholite insoles.",
    shortDesc: "Organic canvas, vulcanized natural rubber sole.",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    ],
    variants: { color: ["Off-White", "Raw Black"], size: ["40", "41", "42", "43", "44"] },
    specs: [
      { label: "Upper", value: "100% Organic Canvas" },
      { label: "Outsole", value: "Vulcanized Natural Rubber" },
      { label: "Insole", value: "Recycled OrthoLite" },
    ],
    reviews: [],
    featured: false,
    sku: "FA-SN-007",
    stock: 39,
  },
  {
    id: "leather-cardholder",
    title: "Slim Full-Grain Cardholder",
    category: "fashion",
    price: 1199,
    badge: "eco",
    rating: 4.8,
    reviewCount: 194,
    description: "Pocket-slimming card wallet hand-stitched from vegetable-tanned leather. Holds up to 6 cards plus folded banknotes in the center sleeve.",
    shortDesc: "Holds 6 cards + cash, vegetable-tanned leather.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    ],
    variants: { color: ["Tan", "Espresso", "Black"] },
    specs: [
      { label: "Leather", value: "Tuscan Vegetable-Tanned Cowhide" },
      { label: "Capacity", value: "4-8 cards + cash" },
      { label: "Dimensions", value: "10 × 7 cm" },
    ],
    reviews: [],
    featured: false,
    sku: "FA-CH-008",
    stock: 70,
  },

  // ══════════════════════════════════════════════════════════════
  // 3. HOME & LIVING (8 Products)
  // ══════════════════════════════════════════════════════════════
  {
    id: "ceramic-pour-over",
    title: "Ceramic Pour-Over Coffee Set",
    category: "home",
    price: 2999,
    badge: "new",
    rating: 4.9,
    reviewCount: 256,
    description: "Hand-thrown stoneware pour-over dripper paired with a double-wall borosilicate glass carafe. Produces a clean, bright cup every time.",
    shortDesc: "Handmade stoneware dripper + glass carafe.",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    ],
    variants: { color: ["Speckled White", "Matte Black", "Sage"] },
    specs: [
      { label: "Material", value: "Hand-thrown Stoneware + Borosilicate Glass" },
      { label: "Carafe Capacity", value: "600ml" },
      { label: "Dishwasher Safe", value: "Yes" },
    ],
    reviews: [
      { author: "Leo M.", rating: 5, text: "Makes the best pour-over I've had at home. Beautiful craftsmanship." },
      { author: "Sara J.", rating: 5, text: "A daily ritual I look forward to. Love the design." },
    ],
    featured: true,
    sku: "HM-CP-001",
    stock: 37,
    dedicatedPage: true,
  },
  {
    id: "soy-candle",
    title: "Hand-Poured Soy Candle",
    category: "home",
    price: 999,
    rating: 4.6,
    reviewCount: 312,
    description: "Clean-burning, hand-poured soy wax candle with essential oil blends. 60-hour burn time in a reusable stoneware vessel.",
    shortDesc: "Essential oil soy candle, 60hr burn time.",
    images: [
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80",
    ],
    variants: { color: ["Cedar & Moss", "Lavender & Sage", "Citrus & Ginger"] },
    specs: [
      { label: "Wax", value: "100% Soy" },
      { label: "Burn Time", value: "60 hours" },
      { label: "Vessel", value: "Reusable Stoneware" },
    ],
    reviews: [],
    featured: false,
    sku: "HM-SC-002",
    stock: 92,
  },
  {
    id: "stoneware-mug",
    title: "Artisan Stoneware Mug",
    category: "home",
    price: 799,
    rating: 4.8,
    reviewCount: 178,
    description: "A generously sized 12oz mug with a reactive glaze finish, hand-dipped for a unique look. Microwave and dishwasher safe.",
    shortDesc: "12oz reactive-glaze handmade mug.",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    ],
    variants: { color: ["Ocean Blue", "Desert Sand", "Charcoal"] },
    specs: [
      { label: "Material", value: "Stoneware" },
      { label: "Capacity", value: "12oz (350ml)" },
      { label: "Glaze", value: "Reactive, hand-dipped" },
    ],
    reviews: [],
    featured: true,
    sku: "HM-SM-003",
    stock: 64,
  },
  {
    id: "linen-throw",
    title: "Stonewashed Linen Throw",
    category: "home",
    price: 3499,
    badge: "eco",
    rating: 4.7,
    reviewCount: 94,
    description: "Luxuriously soft stonewashed linen throw blanket with delicate fringed edges. Gets softer with every wash.",
    shortDesc: "Soft stonewashed linen with fringed edges.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    ],
    variants: { color: ["Natural", "Dusty Rose", "Slate"] },
    specs: [
      { label: "Material", value: "100% Stonewashed Linen" },
      { label: "Size", value: "130×170 cm" },
      { label: "Care", value: "Machine washable" },
    ],
    reviews: [],
    featured: false,
    sku: "HM-LT-004",
    stock: 29,
  },
  {
    id: "linen-bedsheet-set",
    title: "Washed French Linen Bedding Set",
    category: "home",
    price: 9999,
    badge: "eco",
    rating: 4.9,
    reviewCount: 110,
    description: "Woven from 100% Normandy flax. Includes 1 duvet cover and 2 pillowcases pre-washed for velvety softness and effortless rumpled texture.",
    shortDesc: "100% French flax, pre-washed softness.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    ],
    variants: { color: ["Flax Natural", "Cloud White", "Sagebrush"] },
    specs: [
      { label: "Material", value: "100% French Flax Linen" },
      { label: "Set Includes", value: "Duvet Cover + 2 Pillow Shams" },
      { label: "Weight", value: "175 GSM" },
    ],
    reviews: [],
    featured: false,
    sku: "HM-BS-005",
    stock: 18,
  },
  {
    id: "ceramic-vase",
    title: "Sculptural Ceramic Vase",
    category: "home",
    price: 1899,
    rating: 4.6,
    reviewCount: 75,
    description: "An architectural ceramic vase featuring organic asymmetrical curves and a chalky matte finish. Beautiful with or without floral stems.",
    shortDesc: "Asymmetrical organic curves, matte chalk finish.",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
    ],
    variants: { color: ["Chalk White", "Terracotta"] },
    specs: [
      { label: "Material", value: "Ceramic stoneware" },
      { label: "Height", value: "24 cm" },
      { label: "Waterproof", value: "Yes" },
    ],
    reviews: [],
    featured: false,
    sku: "HM-CV-006",
    stock: 44,
  },
  {
    id: "bamboo-cutting-board",
    title: "End-Grain Bamboo Cutting Board",
    category: "home",
    price: 1299,
    rating: 4.7,
    reviewCount: 138,
    description: "Extra thick organic moso bamboo board featuring deep juice grooves, side finger grips, and knife-friendly end-grain construction.",
    shortDesc: "Knife-friendly end-grain with juice perimeter groove.",
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80",
    ],
    variants: { color: ["Natural Bamboo"] },
    specs: [
      { label: "Material", value: "100% Organic Moso Bamboo" },
      { label: "Dimensions", value: "40 × 30 × 3 cm" },
      { label: "Finish", value: "Food-safe mineral oil" },
    ],
    reviews: [],
    featured: false,
    sku: "HM-CB-007",
    stock: 80,
  },
  {
    id: "wool-area-rug",
    title: "Hand-Tufted Wool Accent Rug",
    category: "home",
    price: 6999,
    rating: 4.8,
    reviewCount: 52,
    description: "Soft high-pile accent rug hand-tufted from un-dyed New Zealand wool. Minimalist geometric line drawing design adds subtle depth.",
    shortDesc: "High-pile un-dyed New Zealand wool rug.",
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80",
    ],
    variants: { color: ["Ivory & Charcoal"] },
    specs: [
      { label: "Material", value: "100% New Zealand Wool, Cotton Backing" },
      { label: "Dimensions", value: "90 × 150 cm" },
      { label: "Pile Height", value: "20mm" },
    ],
    reviews: [],
    featured: false,
    sku: "HM-WR-008",
    stock: 15,
  },

  // ══════════════════════════════════════════════════════════════
  // 4. BOOKS & STATIONERY (8 Products)
  // ══════════════════════════════════════════════════════════════
  {
    id: "leather-journal",
    title: "Full-Grain Leather Journal",
    category: "books",
    price: 1899,
    rating: 4.9,
    reviewCount: 267,
    description: "Beautifully crafted A5 journal bound in full-grain vegetable-tanned leather with 192 pages of 100gsm acid-free paper. Ages gracefully to develop a unique patina.",
    shortDesc: "A5 full-grain leather, 192 pages acid-free.",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
    ],
    variants: { color: ["Cognac", "Dark Brown", "Black"] },
    specs: [
      { label: "Leather", value: "Full-grain Vegetable-tanned" },
      { label: "Pages", value: "192 (100gsm acid-free)" },
      { label: "Size", value: "A5 (14.8 × 21 cm)" },
      { label: "Closure", value: "Leather wrap strap" },
    ],
    reviews: [
      { author: "Emma W.", rating: 5, text: "The leather smells amazing and the paper quality is top-tier." },
    ],
    featured: true,
    sku: "BK-LJ-001",
    stock: 51,
    dedicatedPage: true,
  },
  {
    id: "brass-pen",
    title: "Brass Rollerball Pen",
    category: "books",
    price: 1499,
    rating: 4.6,
    reviewCount: 134,
    description: "A satisfyingly hefty rollerball pen machined from solid brass. Develops a living patina with use. Accepts standard international refills.",
    shortDesc: "Solid brass, smooth rollerball, living patina.",
    images: [
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80",
    ],
    variants: { color: ["Raw Brass", "Brushed Nickel"] },
    specs: [
      { label: "Material", value: "Solid Brass" },
      { label: "Ink Type", value: "Rollerball (standard international)" },
      { label: "Weight", value: "48g" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-BP-002",
    stock: 72,
  },
  {
    id: "archivist-notebook",
    title: "Archivist Hardcover Notebook",
    category: "books",
    price: 899,
    rating: 4.5,
    reviewCount: 89,
    description: "Cloth-bound hardcover notebook with lay-flat binding, dotted grid pages, and a ribbon bookmark. Perfect for bullet journaling.",
    shortDesc: "Cloth-bound, dot grid, lay-flat binding.",
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80",
    ],
    variants: { color: ["Midnight", "Sage", "Terracotta"] },
    specs: [
      { label: "Cover", value: "Bookcloth on board" },
      { label: "Pages", value: "160 (dotted grid, 80gsm)" },
      { label: "Binding", value: "Lay-flat sewn" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-AN-003",
    stock: 105,
  },
  {
    id: "desk-organizer",
    title: "Walnut Desk Organizer",
    category: "books",
    price: 2499,
    rating: 4.7,
    reviewCount: 63,
    description: "A minimalist desk organizer hand-crafted from solid American walnut. Features compartments for pens, phone, cards, and a cable management slot.",
    shortDesc: "Handcrafted walnut, multi-compartment organizer.",
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
    ],
    variants: { color: ["Natural Walnut", "Light Oak"] },
    specs: [
      { label: "Material", value: "Solid American Walnut" },
      { label: "Finish", value: "Natural oil" },
      { label: "Dimensions", value: "25 × 12 × 8 cm" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-DO-004",
    stock: 22,
  },
  {
    id: "fountain-pen",
    title: "Precision Brass Fountain Pen",
    category: "books",
    price: 2799,
    badge: "new",
    rating: 4.9,
    reviewCount: 88,
    description: "Engineered with a German-made stainless steel medium nib, brass barrel, and screw-cap airtight seal to prevent drying out.",
    shortDesc: "German steel medium nib, solid brass body.",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80",
    ],
    variants: { color: ["Raw Brass", "Matte Black PVD"] },
    specs: [
      { label: "Nib", value: "Schmidt Stainless Steel (Medium)" },
      { label: "Filling", value: "Piston Converter or Standard Cartridge" },
      { label: "Weight", value: "52g" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-FP-005",
    stock: 38,
  },
  {
    id: "linen-sketchbook",
    title: "Heavyweight Linen Sketchbook",
    category: "books",
    price: 1199,
    rating: 4.7,
    reviewCount: 114,
    description: "Hardcover artist sketchbook filled with 200gsm cold-pressed acid-free cotton paper suited for ink, watercolor washes, and charcoal.",
    shortDesc: "200gsm cotton cold-press paper, lay-flat.",
    images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80",
    ],
    variants: { color: ["Oatmeal Linen", "Olive Linen"] },
    specs: [
      { label: "Paper", value: "200gsm Cold-Pressed 100% Cotton" },
      { label: "Pages", value: "128 Pages (64 sheets)" },
      { label: "Size", value: "Square (21 × 21 cm)" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-SK-006",
    stock: 60,
  },
  {
    id: "brass-ruler-set",
    title: "Solid Brass Drafting Tools",
    category: "books",
    price: 999,
    rating: 4.6,
    reviewCount: 47,
    description: "Set of three precision drafting instruments: a 15cm metric/imperial ruler, 60-degree triangle, and semi-circle protractor cut from 2mm brass.",
    shortDesc: "3-piece set: ruler, triangle & protractor in brass.",
    images: [
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80",
    ],
    variants: { color: ["Natural Brass"] },
    specs: [
      { label: "Material", value: "Solid 2mm Brass Plate" },
      { label: "Units", value: "Laser-etched cm and inches" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-BR-007",
    stock: 85,
  },
  {
    id: "desk-mat",
    title: "Full-Grain Leather Desk Mat",
    category: "books",
    price: 2999,
    badge: "eco",
    rating: 4.8,
    reviewCount: 130,
    description: "Spacious desk pad cut from vegetable-tanned full-grain leather backed with non-slip natural wool felt. Provides an inspiring tactile workspace.",
    shortDesc: "80×40cm vegetable-tanned leather with wool backing.",
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80",
    ],
    variants: { color: ["Saddle Brown", "Cognac", "Charcoal"] },
    specs: [
      { label: "Dimensions", value: "80 × 40 cm" },
      { label: "Top", value: "Full-Grain Vegetable-Tanned Leather" },
      { label: "Base", value: "1.5mm Natural Merino Wool Felt" },
    ],
    reviews: [],
    featured: false,
    sku: "BK-DM-008",
    stock: 33,
  },

  // ══════════════════════════════════════════════════════════════
  // 5. WELLNESS & PERSONAL CARE (8 Products)
  // ══════════════════════════════════════════════════════════════
  {
    id: "body-oil",
    title: "Botanical Body Oil",
    category: "wellness",
    price: 1699,
    badge: "eco",
    rating: 4.8,
    reviewCount: 198,
    description: "A luxurious blend of jojoba, rosehip, and sweet almond oils infused with botanicals. Fast-absorbing, deeply nourishing, and subtly scented with neroli.",
    shortDesc: "Jojoba, rosehip & almond, neroli scented.",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
    ],
    variants: { color: ["Neroli", "Lavender", "Unscented"] },
    specs: [
      { label: "Key Ingredients", value: "Jojoba, Rosehip, Sweet Almond" },
      { label: "Volume", value: "100ml" },
      { label: "Vegan", value: "Yes" },
      { label: "Cruelty Free", value: "Yes" },
    ],
    reviews: [],
    featured: true,
    sku: "WL-BO-001",
    stock: 67,
  },
  {
    id: "facial-cleanser",
    title: "Gentle Gel Facial Cleanser",
    category: "wellness",
    price: 899,
    rating: 4.6,
    reviewCount: 154,
    description: "A pH-balanced gel cleanser with chamomile extract and hyaluronic acid. Removes impurities without stripping natural moisture.",
    shortDesc: "pH-balanced, chamomile & hyaluronic acid.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    ],
    variants: { color: ["150ml", "250ml"] },
    specs: [
      { label: "Key Ingredients", value: "Chamomile Extract, Hyaluronic Acid" },
      { label: "Skin Type", value: "All" },
      { label: "pH", value: "5.5" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-FC-002",
    stock: 83,
  },
  {
    id: "aromatherapy-mist",
    title: "Calming Room & Pillow Mist",
    category: "wellness",
    price: 799,
    rating: 4.4,
    reviewCount: 231,
    description: "A soothing blend of lavender, bergamot, and vetiver essential oils in a fine mist spray. Perfect for bedtime wind-down rituals.",
    shortDesc: "Lavender, bergamot & vetiver essential oil mist.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    ],
    variants: { color: ["Calm (Lavender)", "Focus (Peppermint)", "Refresh (Citrus)"] },
    specs: [
      { label: "Ingredients", value: "Essential Oils, Purified Water" },
      { label: "Volume", value: "100ml" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-AM-003",
    stock: 110,
  },
  {
    id: "lip-balm-set",
    title: "Natural Lip Balm Trio",
    category: "wellness",
    price: 599,
    rating: 4.7,
    reviewCount: 302,
    description: "Three nourishing lip balms in beeswax, shea butter, and coconut oil bases. Flavored with real vanilla, mint, and honey.",
    shortDesc: "Three-pack: vanilla, mint, honey.",
    images: [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80",
    ],
    variants: {},
    specs: [
      { label: "Ingredients", value: "Beeswax, Shea Butter, Coconut Oil" },
      { label: "Set", value: "3 × 4.5g" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-LB-004",
    stock: 150,
  },
  {
    id: "bath-salts",
    title: "Himalayan Mineral Bath Soak",
    category: "wellness",
    price: 899,
    rating: 4.8,
    reviewCount: 91,
    description: "Raw pink Himalayan crystal salt blended with Dead Sea minerals, dried eucalyptus, and organic sweet orange oil to detoxify and relax muscles.",
    shortDesc: "Pink Himalayan salt with eucalyptus & sweet orange.",
    images: [
      "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?w=600&q=80",
    ],
    variants: { color: ["Eucalyptus & Citrus", "Lavender Bliss"] },
    specs: [
      { label: "Weight", value: "450g Glass Jar" },
      { label: "Ingredients", value: "Himalayan Pink Salt, Dead Sea Salt, Essential Oils" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-BS-005",
    stock: 77,
  },
  {
    id: "dry-brush",
    title: "Natural Sisal Bristle Dry Brush",
    category: "wellness",
    price: 699,
    badge: "eco",
    rating: 4.6,
    reviewCount: 122,
    description: "FSC-certified beechwood body brush fitted with firm natural sisal plant fibers and a comfortable cotton canvas hand strap for exfoliating lymphatic stimulation.",
    shortDesc: "Natural sisal bristles, FSC beechwood base.",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    ],
    variants: { color: ["Natural Beech"] },
    specs: [
      { label: "Bristles", value: "100% Natural Sisal (Agave)" },
      { label: "Wood", value: "FSC Certified Beechwood" },
      { label: "Strap", value: "Organic Cotton" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-DB-006",
    stock: 95,
  },
  {
    id: "face-serum",
    title: "Botanical Vitamin C Serum",
    category: "wellness",
    price: 1999,
    badge: "new",
    rating: 4.9,
    reviewCount: 167,
    description: "Potent brightening facial serum combining 15% stabilized Vitamin C with Kakadu plum extract, ferulic acid, and pure vegan hyaluronic acid.",
    shortDesc: "15% stabilized Vitamin C + Kakadu plum & ferulic.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    ],
    variants: { color: ["30ml Dropper"] },
    specs: [
      { label: "Active", value: "15% Ethyl Ascorbic Acid + Hyaluronic Acid" },
      { label: "Formula", value: "Oil-free, fragrance-free" },
      { label: "Certification", value: "Leaping Bunny Certified" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-FS-007",
    stock: 40,
  },
  {
    id: "bamboo-comb",
    title: "Handmade Sandalwood Comb",
    category: "wellness",
    price: 699,
    rating: 4.7,
    reviewCount: 88,
    description: "Seamless wide-tooth hair comb hand-carved from fragrant green sandalwood. Glides through tangles static-free without snagging.",
    shortDesc: "Green sandalwood wide-tooth, naturally anti-static.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    ],
    variants: { color: ["Natural Sandalwood"] },
    specs: [
      { label: "Wood", value: "100% Genuine Green Sandalwood" },
      { label: "Dimensions", value: "16 × 5 cm" },
      { label: "Feature", value: "Anti-static, natural aromatic scent" },
    ],
    reviews: [],
    featured: false,
    sku: "WL-BC-008",
    stock: 120,
  },

  // ══════════════════════════════════════════════════════════════
  // 6. SPORTS & OUTDOORS (8 Products)
  // ══════════════════════════════════════════════════════════════
  {
    id: "water-bottle",
    title: "Insulated Steel Water Bottle",
    category: "sports",
    price: 1299,
    rating: 4.8,
    reviewCount: 412,
    description: "Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours or hot for 12. Leak-proof bamboo cap.",
    shortDesc: "24hr cold / 12hr hot, bamboo cap.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    ],
    variants: { color: ["Arctic White", "Matte Black", "Ocean", "Sage"] },
    specs: [
      { label: "Material", value: "18/8 Stainless Steel" },
      { label: "Capacity", value: "750ml" },
      { label: "Insulation", value: "Double-wall vacuum" },
      { label: "Cap", value: "Natural Bamboo" },
    ],
    reviews: [
      { author: "Carlos D.", rating: 5, text: "Keeps my water ice cold all day hiking. Love the bamboo cap." },
    ],
    featured: true,
    sku: "SP-WB-001",
    stock: 95,
  },
  {
    id: "daypack",
    title: "Ultralight Daypack 20L",
    category: "sports",
    price: 2999,
    rating: 4.5,
    reviewCount: 156,
    description: "A packable 20L daypack made from ripstop nylon with YKK zippers. Water-resistant, weighs just 290g, and folds into its own pocket.",
    shortDesc: "Packable 20L ripstop, weighs 290g.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    ],
    variants: { color: ["Black", "Olive", "Navy"] },
    specs: [
      { label: "Material", value: "40D Ripstop Nylon" },
      { label: "Volume", value: "20L" },
      { label: "Weight", value: "290g" },
      { label: "Water Resistant", value: "DWR coating" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-DP-002",
    stock: 48,
  },
  {
    id: "yoga-mat",
    title: "Natural Rubber Yoga Mat",
    category: "sports",
    price: 2499,
    badge: "eco",
    rating: 4.7,
    reviewCount: 203,
    description: "A premium 5mm yoga mat made from sustainably harvested natural rubber with a microfiber suede surface. Provides excellent grip when wet or dry.",
    shortDesc: "5mm natural rubber, non-slip suede surface.",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
    ],
    variants: { color: ["Midnight", "Sage", "Terracotta"] },
    specs: [
      { label: "Material", value: "Natural Tree Rubber + Microfiber Suede" },
      { label: "Thickness", value: "5mm" },
      { label: "Size", value: "183 × 68 cm" },
      { label: "Weight", value: "2.5kg" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-YM-003",
    stock: 36,
  },
  {
    id: "camp-mug",
    title: "Enamel Camp Mug",
    category: "sports",
    price: 699,
    rating: 4.3,
    reviewCount: 175,
    description: "Classic enamel camp mug with rolled rim and hand-dipped finish. Safe for campfires, stovetops, and dishwashers.",
    shortDesc: "Classic enamel, campfire-safe.",
    images: [
      "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?w=600&q=80",
    ],
    variants: { color: ["Cream", "Forest Green", "Navy"] },
    specs: [
      { label: "Material", value: "Steel + Enamel Coating" },
      { label: "Capacity", value: "350ml" },
      { label: "Campfire Safe", value: "Yes" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-CM-004",
    stock: 200,
  },
  {
    id: "camping-hammock",
    title: "Ultralight Camping Hammock",
    category: "sports",
    price: 1899,
    badge: "new",
    rating: 4.8,
    reviewCount: 118,
    description: "Strong 210T parachute nylon single/double hammock with tree-friendly straps and wiregate carabiners. Packs down to grapefruit size.",
    shortDesc: "210T parachute nylon with tree straps, 200kg load.",
    images: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&q=80",
    ],
    variants: { color: ["Forest Green", "Charcoal Gray"] },
    specs: [
      { label: "Fabric", value: "210T Breathable Parachute Nylon" },
      { label: "Weight Limit", value: "220 kg (480 lbs)" },
      { label: "Packed Weight", value: "490g" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-HM-005",
    stock: 58,
  },
  {
    id: "trekking-poles",
    title: "Carbon Fiber Trekking Poles",
    category: "sports",
    price: 2499,
    rating: 4.7,
    reviewCount: 92,
    description: "Pair of 100% 3K carbon fiber hiking poles with quick-flick aluminum lever locks, ergonomic natural cork grips, and tungsten carbide tips.",
    shortDesc: "100% 3K carbon fiber, ergonomic cork grips.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    ],
    variants: { color: ["Carbon Black"] },
    specs: [
      { label: "Material", value: "3K Carbon Fiber, Natural Cork" },
      { label: "Adjustable Range", value: "62cm – 135cm" },
      { label: "Weight", value: "210g per pole" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-TP-006",
    stock: 45,
  },
  {
    id: "modular-cooler",
    title: "Thermal Insulated Cooler Bag",
    category: "sports",
    price: 1799,
    rating: 4.6,
    reviewCount: 76,
    description: "Compact 12-can soft-sided cooler bag with leakproof welded lining, 8mm closed-cell thermal foam, and water-repellent TPU shell.",
    shortDesc: "Keeps ice 24+ hours, leak-proof welded seams.",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    ],
    variants: { color: ["Slate Gray", "Canyon Orange"] },
    specs: [
      { label: "Capacity", value: "12 Cans (10 Liters)" },
      { label: "Insulation", value: "8mm High-Density EPE Foam" },
      { label: "Exterior", value: "600D TPU Water-resistant" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-CB-007",
    stock: 66,
  },
  {
    id: "resistance-bands",
    title: "Natural Latex Resistance Bands",
    category: "sports",
    price: 999,
    badge: "eco",
    rating: 4.8,
    reviewCount: 240,
    description: "Set of 5 color-coded loop resistance bands crafted from 100% Malaysian natural tree latex with carrying pouch and exercise instruction manual.",
    shortDesc: "Set of 5 natural latex bands (10 to 50 lbs).",
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80",
    ],
    variants: { color: ["5-Band Set"] },
    specs: [
      { label: "Material", value: "100% Natural Malaysian Latex" },
      { label: "Resistance Range", value: "10 lbs to 50 lbs" },
      { label: "Includes", value: "5 Bands, Breathable Carry Bag, Guide" },
    ],
    reviews: [],
    featured: false,
    sku: "SP-RB-008",
    stock: 115,
  },
];

// ══════════════════════════════════════════════════════════════
// BILINGUAL LOCALIZATION (HINDI DICTIONARY & HELPERS)
// ══════════════════════════════════════════════════════════════
const CATEGORY_TRANSLATIONS_HI = {
  "electronics": { name: "इलेक्ट्रॉनिक्स और ऑडियो", description: "सटीक और मिनिमलिस्ट डिज़ाइन के साथ तैयार प्रीमियम टेक गियर।" },
  "fashion": { name: "फैशन और परिधान", description: "प्राकृतिक और टिकाऊ सामग्रियों से बने सदाबहार परिधान।" },
  "home": { name: "होम और लिविंग", description: "शांत और आरामदायक घरों के लिए सोच-समझकर डिज़ाइन किए गए होमवेयर।" },
  "books": { name: "किताबें और स्टेशनरी", description: "रचनात्मक सोच के लिए हस्तनिर्मित डायरियाँ, पेन और स्टेशनरी।" },
  "wellness": { name: "वेलनेस और पर्सनल केयर", description: "शरीर और मन के लिए प्राकृतिक जड़ी-बूटियों से युक्त उत्पाद।" },
  "sports": { name: "स्पोर्ट्स और आउटडोर्स", description: "रोज़मर्रा के रोमांच और सक्रिय जीवन के लिए टिकाऊ और हल्के गियर।" }
};

const PRODUCT_TRANSLATIONS_HI = {
  "stoneware-mug": {
    title: "कारीगर स्टोनवेयर मग",
    shortDesc: "2 स्पेकल्ड स्टोनवेयर मग का सेट (प्रत्येक 350ml)।",
    description: "हाथ से चाक पर बने स्टोनवेयर मग, खूबसूरत साटन-मैट फिनिश। माइक्रोवेव और डिशवॉशर सुरक्षित, पकड़ने में बेहद आरामदायक।"
  },
  "water-bottle": {
    title: "इंसुलेटेड स्टील पानी की बोतल",
    shortDesc: "बैम्बू कैप वाली 750ml डबल-वॉल वैक्यूम बोतल।",
    description: "18/8 फूड-ग्रेड स्टेनलेस स्टील से बनी वैक्यूम बोतल। पानी को 24 घंटे ठंडा और 12 घंटे गर्म रखती है। बांस के ढक्कन और मजबूत ग्रिप के साथ।"
  },
  "linen-sketchbook": {
    title: "हैवीवेट लिनन स्केचबुक",
    shortDesc: "200gsm कोल्ड-प्रेस मिक्स्ड मीडिया पेपर, 120 पन्ने।",
    description: "100% कॉटन के 200gsm कोल्ड-प्रेस कागज़ से बनी स्केचबुक। वॉटरकलर, स्याही और पेंसिल स्केचिंग के लिए आदर्श।"
  },
  "cashmere-crewneck": {
    title: "प्योर कश्मीरी क्रूनेक स्वेटर",
    shortDesc: "2-प्लाई ग्रेड-ए मंगोलियन कश्मीरी वूल स्वेटर।",
    description: "100% ग्रेड-ए मंगोलियन कश्मीरी वूल से बुना हुआ बेहद हल्का और मुलायम स्वेटर। बिना किसी भारीपन के बेहतरीन गर्माहट प्रदान करता है।"
  },
  "bamboo-cutting-board": {
    title: "एंड-ग्रेन बैम्बू कटिंग बोर्ड",
    shortDesc: "जूस ग्रूव के साथ मजबूत 40x30cm किचन कटिंग बोर्ड।",
    description: "चाकू की धार सुरक्षित रखने वाला एंड-ग्रेन बैम्बू कटिंग बोर्ड। साइड हैंडल और जूस ग्रूव के साथ रसोई का टिकाऊ साथी।"
  },
  "aromatherapy-mist": {
    title: "काल्मिंग रूम व पिलो मिस्ट",
    shortDesc: "फ्रेंच लैवेंडर, बर्गमोट और खस युक्त स्लीप स्प्रे (100ml)।",
    description: "फ्रेंच लैवेंडर और खस के अर्क से बना आरामदायक रूम और तकिया स्प्रे। तनाव कम करने और गहरी नींद लाने में मददगार।"
  },
  "bamboo-comb": {
    title: "हैंडमेड चंदन की लकड़ी की कंघी",
    shortDesc: "एंटी-स्टैटिक ग्रीन चंदन की लकड़ी की चौड़े दांतों वाली कंघी।",
    description: "प्राकृतिक सुगंधित चंदन की लकड़ी से तराशी गई कंघी। बालों को बिना उलझाए और बिना तोड़े संवारती है और सिर की मालिश करती है।"
  },
  "modular-cooler": {
    title: "थर्मल इंसुलेटेड कूलर बैग",
    shortDesc: "लीक-प्रूफ 18L सॉफ्ट कूलर जो 48 घंटे तक बर्फ जमाए रखता है।",
    description: "वॉटरप्रूफ टीपीयू और 25mm मोटे इंसुलेशन से बना कूलर बैग। 48 घंटे तक बर्फ और ड्रिंक्स को ठंडा रखता है। कैंपिंग और पिकनिक के लिए बेहतरीन।"
  },
  "linen-throw": {
    title: "स्टोनवाश्ड लिनन थ्रो कंबल",
    shortDesc: "झालरदार किनारों वाला 130x170cm वॉफ़ल-वीव लिनन कंबल।",
    description: "100% शुद्ध यूरोपीय लिनन से बुना 130x170cm थ्रो। बेहद मुलायम, हल्का और हर मौसम में इस्तेमाल के लिए उपयुक्त।"
  },
  "mechanical-keyboard": {
    title: "मैकेनिकल डेस्क कीबोर्ड",
    shortDesc: "गेटरॉन स्विच के साथ कॉम्पैक्ट 75% मैकेनिकल कीबोर्ड।",
    description: "सटीक और आरामदायक टाइपिंग के लिए निर्मित। सॉलिड एनोडाइज्ड एल्युमिनियम बॉडी, हॉट-स्वैपेबल पीसीबी, प्री-ल्यूब्ड गेटरॉन स्विच और साउंड-डैम्पेनिंग सिलिकॉन पैड एक शानदार टाइपिंग अनुभव प्रदान करते हैं।"
  },
  "desk-mat": {
    title: "फुल-ग्रेन लेदर डेस्क मैट",
    shortDesc: "एंटी-स्लिप वूल बेस के साथ 90x45cm वेजिटेबल-टैन्ड डेस्क पैड।",
    description: "2.5mm मोटे फुल-ग्रेन लेदर और जर्मन वूल फेल्ट बेस से बनी 90x45cm डेस्क मैट। टेबल की सुरक्षा और कार्यक्षेत्र को आकर्षक लुक देती है।"
  },
  "charging-pad": {
    title: "Qi वायरलेस चार्जिंग पैड",
    shortDesc: "सॉलिड अखरोट की लकड़ी और कास्ट एल्युमिनियम का फास्ट चार्जिंग स्टेशन।",
    description: "टिकाऊ अमेरिकी अखरोट की लकड़ी और एयरोस्पेस एल्युमिनियम से निर्मित डुअल चार्जिंग डॉक। स्मार्ट थर्मल नियंत्रण के साथ फोन और ईयरबड्स को एक साथ चार्ज करता है।"
  },
  "soy-candle": {
    title: "हैंड-पोअर्ड सोय मोमबत्ती",
    shortDesc: "देवदार, अंबर और स्मोक सुगंध के साथ 50 घंटे का बर्न टाइम।",
    description: "100% अमेरिकन सोय वैक्स, देवदार और अंबर की शांत सुगंध। री-यूज़ेबल सिरेमिक जार और 50 घंटे तक धुआं-मुक्त जलने वाली कॉटन बत्ती।"
  },
  "face-serum": {
    title: "बॉटनिकल विटामिन सी सीरम",
    shortDesc: "हयालूरोनिक एसिड के साथ 15% स्टेबलाइज़्ड विटामिन सी (30ml)।",
    description: "15% विटामिन सी और हयालूरोनिक एसिड से भरपूर फेशियल सीरम। चेहरे के दाग-धब्बों को हल्का कर प्राकृतिक चमक बढ़ाता है।"
  },
  "fountain-pen": {
    title: "प्रिसिजन ब्रास फ़ाउंटेन पेन",
    shortDesc: "कनवर्टर और इंक कार्ट्रिज के साथ स्टेनलेस स्टील बॉक निब पेन।",
    description: "जर्मन पीटर बॉक फाइन निब और एयरटाइट स्क्रू-कैप के साथ सटीक ब्रास फ़ाउंटेन पेन। स्याही सूखने की समस्या से मुक्त।"
  },
  "bluetooth-speaker": {
    title: "पोर्टेबल वॉलनट ब्लूटूथ स्पीकर",
    shortDesc: "असली लकड़ी के एनक्लोज़र के साथ समृद्ध 360-डिग्री सराउंड साउंड।",
    description: "हाथ से पॉलिश की गई अखरोट की लकड़ी की बॉडी, 20W दमदार साउंड, पैसिव डुअल बास रेडिएटर्स, ब्लूटूथ 5.2 और 16 घंटे का नॉन-स्टॉप प्लेबैक समय।"
  },
  "bath-salts": {
    title: "हिमालयन मिनरल बाथ सोक",
    shortDesc: "एप्सम सॉल्ट, रोज़ क्वार्ट्ज और नीलगिरी युक्त बाथ सॉल्ट (450g)।",
    description: "शुद्ध गुलाबी हिमालयन नमक, एप्सम सॉल्ट और नीलगिरी के तेल का मिश्रण। मांसपेशियों के दर्द और थकान को दूर करने के लिए बेहतरीन।"
  },
  "brass-pen": {
    title: "सॉलिड ब्रास रोलरबॉल पेन",
    shortDesc: "श्मिट सिरेमिक रिफिल के साथ सॉलिड मशीन ब्रास बॉडी पेन।",
    description: "सॉलिड ब्रास से निर्मित पेन, जो इस्तेमाल के साथ अपनी अनूठी चमक बनाता है। जर्मन श्मिट 0.6mm सिरेमिक रिफिल के साथ बेहद स्मूद लिखावट।"
  },
  "linen-overshirt": {
    title: "रिलैक्स्ड लिनन ओवरशर्ट",
    shortDesc: "100% नॉर्मंडी फ्लैक्स लिनन से बनी आरामदायक बॉक्सी फिट ओवरशर्ट।",
    description: "100% फ्रेंच लिनन से तैयार की गई यह सांस लेने योग्य ओवरशर्ट हॉर्न बटन, चेस्ट पैच पॉकेट और गारमेंट-वॉश फिनिश के साथ आती है जो हर धुलाई के साथ और अधिक मुलायम होती जाती है।"
  },
  "desk-organizer": {
    title: "वॉलनट डेस्क ऑर्गेनाइज़र",
    shortDesc: "अमेरिकी काले अखरोट की लकड़ी से बने मैग्नेटिक मॉड्यूलर ट्रे।",
    description: "छिपे हुए चुम्बकों के साथ मॉड्यूलर डेस्क ट्रे सिस्टम। पेन, स्टिकी नोट्स और स्टेशनरी को करीने से व्यवस्थित रखने के लिए उत्तम।"
  },
  "oxford-cotton-shirt": {
    title: "क्लासिक ऑक्सफ़ोर्ड बटन-डाउन शर्ट",
    shortDesc: "100% ऑर्गेनिक कॉम्ब कॉटन, बास्केटवीव बुनाई।",
    description: "100% ऑर्गेनिक कॉटन से तैयार क्लासिक बास्केटवीव शर्ट। बटन-डाउन कॉलर और प्रीमियम बटनों के साथ एक सदाबहार स्टाइल।"
  },
  "canvas-sneakers": {
    title: "लो-टॉप मिनिमलिस्ट स्नीकर्स",
    shortDesc: "ऑर्गेनिक कॉटन कैनवास और प्राकृतिक रबर सोल वाले स्नीकर्स।",
    description: "प्राकृतिक रबर सोल और ऑर्गेनिक डक कैनवास से बने स्नीकर्स। आरामदायक इनसोल और हर स्टाइल के साथ जंचने वाला क्लासिक डिज़ाइन।"
  },
  "merino-beanie": {
    title: "मेरिनो वूल रिब्ड बीनी",
    shortDesc: "100% एक्स्ट्रा-फाइन मेरिनो वूल, बिना खुजली के आरामदायक गर्माहट।",
    description: "100% शुद्ध मेरिनो वूल से बनी रिब्ड बीनी। प्राकृतिक तापमान नियंत्रण, गंध प्रतिरोधी और दिन भर बिना किसी खुजली के आरामदायक गर्माहट प्रदान करती है।"
  },
  "camp-mug": {
    title: "इनेमल कैंप मग",
    shortDesc: "स्पेकल्ड ग्लेज़ के साथ 400ml हेवी-गेज स्टील कैंप मग।",
    description: "मजबूत कार्बन स्टील और पोर्सिलेन इनेमल से बना कैंप मग। सीधे आग, चूल्हे और ग्रिल पर इस्तेमाल के लिए सुरक्षित।"
  },
  "body-oil": {
    title: "बॉटनिकल बॉडी ऑयल",
    shortDesc: "जोजोबा, स्क्वैलेन और नेरोली युक्त हाइड्रेटिंग ड्राई बॉडी ऑयल (100ml)।",
    description: "त्वचा में तुरंत अवशोषित होने वाला नॉन-स्टिकी बॉडी ऑयल। जोजोबा, स्क्वैलेन और नेरोली के अर्क से त्वचा को चमकदार और कोमल बनाता है।"
  },
  "desk-lamp": {
    title: "मिनिमल एलईडी डेस्क लैंप",
    shortDesc: "वायरलेस चार्जिंग बेस के साथ डिमेबल आर्किटेक्चरल लैंप।",
    description: "सटीक मैट एल्युमिनियम संरचना जिसमें टच-सेंसिटिव डिमिंग, 5 कलर टेम्परेचर विकल्प और बेस में एकीकृत 15W Qi फास्ट चार्जिंग पैड शामिल है।"
  },
  "raw-denim-jacket": {
    title: "रॉ सेल्वेज डेनिम जैकेट",
    shortDesc: "14oz जापानी सेल्वेज डेनिम, अनवाश्ट और टिकाऊ।",
    description: "जापान के ओकायामा में विंटेज लूम पर बुनी गई 14oz रॉ सेल्वेज डेनिम जैकेट। कॉपर हार्डवेयर और असली लेदर पैच के साथ, जो समय के साथ अपना अनोखा लुक बनाती है।"
  },
  "wireless-headphones": {
    title: "स्टूडियो वायरलेस हेडफ़ोन",
    shortDesc: "30 घंटे की बैटरी के साथ प्रीमियम नॉइज़-कैंसलिंग हेडफ़ोन।",
    description: "हमारे स्टूडियो वायरलेस हेडफ़ोन के साथ शुद्ध और इमर्सिव ऑडियो का अनुभव करें। 40mm कस्टम ड्राइवर, एडेप्टिव नॉइज़ कैंसलेशन और मेमोरी फोम ईयर कुशन के साथ फेदरलाइट डिज़ाइन में 30 घंटे की लंबी बैटरी लाइफ।"
  },
  "ceramic-pour-over": {
    title: "सिरेमिक पोर-ओवर कॉफ़ी सेट",
    shortDesc: "बोरोसिलिकेट ग्लास कैराफ़े के साथ हस्तनिर्मित सिरेमिक ड्रिपर।",
    description: "हाथ से तैयार किया गया सिरेमिक पोर-ओवर ड्रिपर और हीट-रेसिस्टेंट बोरोसिलिकेट ग्लास कैराफ़े। आंतरिक स्पाइरल रिब्स बेहतरीन कॉफ़ी फ्लेवर निकालते हैं।"
  },
  "brass-ruler-set": {
    title: "सॉलिड ब्रास ड्राफ्टिंग टूल्स",
    shortDesc: "3 का सेट: 15cm रूलर, 45-डिग्री त्रिकोण और चांदा।",
    description: "2mm मोटे सॉलिड ब्रास पर लेज़र-सटीक माप के साथ 3 ड्राफ्टिंग टूल्स का सेट। डिज़ाइनर और वास्तुकारों के लिए सटीक उपकरण।"
  },
  "linen-bedsheet-set": {
    title: "वाश्ड फ्रेंच लिनन बेडिंग सेट",
    shortDesc: "क्वीन-साइज़ डुवेट कवर, फिटेड शीट और 2 तकिए के कवर।",
    description: "प्रीमियम फ्रेंच लिनन से बना शानदार बेडिंग सेट। आरामदायक नींद, प्राकृतिक कोमलता और कोकोनट बटन क्लोज़र के साथ।"
  },
  "leather-cardholder": {
    title: "स्लिम फुल-ग्रेन लेदर कार्डहोल्डर",
    shortDesc: "वेजिटेबल-टैन्ड लेदर में 6 कार्ड और कैश रखने की सुविधा।",
    description: "टस्कन वेजिटेबल-टैन्ड लेदर से हाथ से सिला हुआ स्लिम कार्डहोल्डर। 4 कार्ड स्लॉट, एक सेंट्रल कैश पॉकेट और बीज़वैक्स फिनिश्ड किनारे।"
  },
  "trekking-poles": {
    title: "कार्बन फाइबर ट्रेकिंग पोल्स",
    shortDesc: "एर्गोनोमिक कॉर्क ग्रिप वाली क्विक-लॉक ट्रेकिंग पोल्स की जोड़ी (440g)।",
    description: "100% 3K कार्बन फाइबर से बने हल्के और मजबूत ट्रेकिंग पोल्स। प्राकृतिक कॉर्क ग्रिप और टंगस्टन टिप्स के साथ हर रास्ते पर मजबूत सहारा।"
  },
  "yoga-mat": {
    title: "नेचुरल रबर योगा मैट",
    shortDesc: "संरेखण रेखाओं वाली 4mm नॉन-स्लिप प्राकृतिक रबर मैट।",
    description: "100% प्राकृतिक रबर से निर्मित गैर-फिसलन वाली योगा मैट। लेज़र-एच्ड संरेखण रेखाएं सही मुद्रा बनाए रखने में सहायता करती हैं।"
  },
  "lip-balm-set": {
    title: "नेचुरल लिप बाम ट्रायो",
    shortDesc: "3 का सेट: पिपरमिंट, ब्लड ऑरेंज और अनसेंटेड।",
    description: "शिया बटर और बीज़वैक्स से बने लिप बाम का सेट। गुलाब के बीज का तेल और विटामिन ई से भरपूर, फटे होंठों को दे प्राकृतिक पोषण।"
  },
  "wool-area-rug": {
    title: "हैंड-टफ्टेड वूल एक्सेंट रग",
    shortDesc: "ऑर्गेनिक ज्यामितीय पैटर्न वाला 120x180cm न्यूज़ीलैंड वूल कालीन।",
    description: "100% शुद्ध न्यूज़ीलैंड वूल से भदोही के कारीगरों द्वारा हस्तनिर्मित रग। 15mm मोटा पाइल और एंटी-स्किड बैकिंग के साथ शानदार आराम।"
  },
  "resistance-bands": {
    title: "नेचुरल लेटेक्स रेजिस्टेंस बैंड्स",
    shortDesc: "5 नेचुरल लेटेक्स बैंड्स का सेट (10 से 50 lbs)।",
    description: "100% प्राकृतिक मलेशियन लेटेक्स से बने 5 रेजिस्टेंस बैंड्स का सेट। व्यायाम गाइड और पाउच के साथ फिटनेस के लिए मुकम्मल सेट।"
  },
  "ceramic-vase": {
    title: "स्कल्पचरल सिरेमिक फूलदान",
    shortDesc: "टेक्सचर्ड रॉ फिनिश वाला मिनिमलिस्ट सिरेमिक फूलदान।",
    description: "अनोखे ज्यामितीय आकार वाला कलात्मक सिरेमिक फूलदान। इनडोर सजावट, सूखे फूलों या ताज़े गुलदस्तों के लिए बिल्कुल उपयुक्त।"
  },
  "archivist-notebook": {
    title: "आर्काइविस्ट हार्डकवर नोटबुक",
    shortDesc: "डॉट ग्रिड 120gsm स्वीडिश मुन्केन पेपर, 192 क्रमांकित पन्ने।",
    description: "सपाट खुलने वाली स्माइथ-सीवन बाइंडिंग और 120gsm एसिड-फ्री स्वीडिश कागज़। बैक पॉकेट और दो रिबन मार्कर के साथ विचारों को सहेजने के लिए श्रेष्ठ।"
  },
  "daypack": {
    title: "अल्ट्रालाइट डेपैक 20L",
    shortDesc: "वॉटर-रेसिस्टेंट 210D कॉर्डुरा फ़ोल्डेबल बैकपैक।",
    description: "सिर्फ 320 ग्राम का 20-लीटर बैकपैक। वॉटर-रेसिस्टेंट नायलॉन, मजबूत ज़िप और सांस लेने योग्य स्ट्रैप्स के साथ यात्रा और ट्रैकिंग के लिए उत्तम।"
  },
  "canvas-tote": {
    title: "वैक्स्ड कैनवास एवरीडे टोट बैग",
    shortDesc: "मजबूत 16oz कॉटन कैनवास और लेदर स्ट्रैप के साथ रोज़मर्रा का बैग।",
    description: "16oz वेदर-प्रूफ वैक्स्ड कैनवास और मजबूत लेदर हैंडल से निर्मित टोट बैग। ब्रास ज़िप और पैडेड लैपटॉप कम्पार्टमेंट के साथ सुरक्षित स्टोरेज।"
  },
  "camping-hammock": {
    title: "अल्ट्रालाइट कैंपिंग हैमॉक",
    shortDesc: "पेड़-सुरक्षित पट्टों के साथ रिपस्टॉप पैराशूट नायलॉन हैमॉक।",
    description: "70D हाई-स्ट्रेंथ पैराशूट नायलॉन से बना कैंपिंग झूला (200kg तक भार सहने में सक्षम)। आसान सेटअप के लिए पेड़-सुरक्षित पट्टों के साथ।"
  },
  "noise-cancelling-earbuds": {
    title: "ट्रू वायरलेस ANC ईयरबड्स",
    shortDesc: "वायरलेस चार्जिंग केस के साथ एक्टिव नॉइज़ कैंसलेशन ईयरबड्स।",
    description: "हाइब्रिड डुअल-माइक एक्टिव नॉइज़ कैंसलेशन, ग्राफीन ड्राइवर्स, IPX5 वाटर रेसिस्टेंस, ट्रांसपेरेंसी मोड और पॉकेट-साइज़ चार्जिंग केस के साथ 28 घंटे का कुल बैकअप।"
  },
  "dry-brush": {
    title: "नेचुरल सिसाल ब्रिसल ड्राई ब्रश",
    shortDesc: "बैम्बू हैंडल वाला डिटॉक्सीफाइंग बॉडी ड्राई ब्रश।",
    description: "प्राकृतिक सिसाल रेशों और बांस के हैंडल से बना बॉडी ब्रश। त्वचा के रक्त संचार को बढ़ाता है और मृत त्वचा को हटाकर ताजगी देता है।"
  },
  "facial-cleanser": {
    title: "जेंटल जेल फेशियल क्लींजर",
    shortDesc: "ग्रीन टी और अमीनो एसिड युक्त pH-बैलेंस्ड क्लींजर (150ml)।",
    description: "सल्फ़ेट-मुक्त सौम्य फेस क्लींजर। ग्रीन टी और सेंटेला एशियाटिका से युक्त, जो त्वचा की प्राकृतिक नमी छीने बिना गहराई से सफाई करता है।"
  },
  "leather-journal": {
    title: "फुल-ग्रेन लेदर जर्नल",
    shortDesc: "फ़ाउंटेन पेन फ्रेंडली 100gsm बांस के कागज़ के 240 पन्ने।",
    description: "सैडल ब्राउन लेदर में हाथ से बंधी डायरी। 240 पन्नों का 100gsm आर्काइवल बांस का कागज़, जो फ़ाउंटेन पेन की स्याही को फैलने नहीं देता।"
  },
  "minimal-watch": {
    title: "मिनिमल एनालॉग घड़ी",
    shortDesc: "नीलम क्रिस्टल ग्लास के साथ आकर्षक 38mm टाइमपीस।",
    description: "सादगी और सुंदरता का प्रतीक। 38mm ब्रश किया हुआ 316L स्टेनलेस स्टील केस, स्क्रैच-रेसिस्टेंट नीलम क्रिस्टल, जापानी क्वार्ट्ज मूवमेंट और बदलने योग्य इटैलियन लेदर का पट्टा।"
  },
  "wireless-mouse": {
    title: "एर्गोनोमिक प्रिसिजन माउस",
    shortDesc: "मल्टी-डिवाइस ब्लूटूथ पेयरिंग के साथ शांत और आरामदायक क्लिक माउस।",
    description: "हाथ की थकान दूर करने के लिए विशेष रूप से डिज़ाइन किया गया माउस, साइलेंट क्लिक स्विच, सहज स्क्रॉल व्हील और 3 डिवाइसों के बीच आसानी से स्विच करने की सुविधा।"
  }
};


function getLocalizedProduct(p) {
  if (!p) return null;
  const isHindi = (typeof LanguageManager !== "undefined" ? LanguageManager.get() : (localStorage.getItem("buyhelps_lang") || "EN")) === "HI";
  if (isHindi && typeof PRODUCT_TRANSLATIONS_HI !== "undefined" && PRODUCT_TRANSLATIONS_HI[p.id]) {
    const hi = PRODUCT_TRANSLATIONS_HI[p.id];
    return Object.assign({}, p, {
      title: hi.title || p.title,
      description: hi.description || p.description,
      shortDesc: hi.shortDesc || p.shortDesc
    });
  }
  return p;
}

// Utility helpers
function getProductById(id) {
  const p = PRODUCTS.find((p) => p.id === id) || null;
  return getLocalizedProduct(p);
}

function getProductsByCategory(catId) {
  return PRODUCTS.filter((p) => p.category === catId).map(getLocalizedProduct);
}

function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured).map(getLocalizedProduct);
}

function getAllProducts() {
  return PRODUCTS.map(getLocalizedProduct);
}

function getCategoryById(id) {
  const c = CATEGORIES.find((c) => c.id === id) || null;
  if (!c) return null;
  const isHindi = (typeof LanguageManager !== "undefined" ? LanguageManager.get() : (localStorage.getItem("buyhelps_lang") || "EN")) === "HI";
  if (isHindi && CATEGORY_TRANSLATIONS_HI[c.id]) {
    return Object.assign({}, c, {
      name: CATEGORY_TRANSLATIONS_HI[c.id].name || c.name,
      description: CATEGORY_TRANSLATIONS_HI[c.id].description || c.description
    });
  }
  return c;
}

function getAllCategories() {
  const isHindi = (typeof LanguageManager !== "undefined" ? LanguageManager.get() : (localStorage.getItem("buyhelps_lang") || "EN")) === "HI";
  return CATEGORIES.map((c) => {
    if (isHindi && CATEGORY_TRANSLATIONS_HI[c.id]) {
      return Object.assign({}, c, {
        name: CATEGORY_TRANSLATIONS_HI[c.id].name || c.name,
        description: CATEGORY_TRANSLATIONS_HI[c.id].description || c.description
      });
    }
    return c;
  });
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getAllProducts().filter((p) => {
    const orig = PRODUCTS.find((x) => x.id === p.id) || p;
    return (
      p.title.toLowerCase().includes(q) ||
      orig.title.toLowerCase().includes(q) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
      (orig.shortDesc && orig.shortDesc.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  });
}

function formatPrice(amount) {
  if (amount === undefined || amount === null) return "₹0";
  const curr = typeof CurrencyManager !== "undefined" ? CurrencyManager.get() : (localStorage.getItem("buyhelps_currency") || "INR");
  const rates = {
    INR: { symbol: "₹", rate: 1, locale: "en-IN" },
    USD: { symbol: "$", rate: 0.012, locale: "en-US" },
    EUR: { symbol: "€", rate: 0.011, locale: "de-DE" },
    AED: { symbol: "AED ", rate: 0.044, locale: "en-AE" }
  };
  const config = rates[curr] || rates.INR;
  const converted = Math.round(amount * config.rate);
  return config.symbol + converted.toLocaleString(config.locale);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<span class="star-icon">★</span>'.repeat(full) +
    (half ? '<span class="star-icon" style="opacity:0.5">★</span>' : "") +
    '<span style="color:#D4D4D8">★</span>'.repeat(empty)
  );
}