const productNames = {
  "Кошки": ["Корм Нефритовый микс", "Лакомство Лосось", "Мышка-погремушка", "Когтеточка Башня", "Шампунь мягкий", "Лежанка облако", "Миска керамическая", "Щетка для шерсти", "Туннель игровой", "Паста витаминная", "Наполнитель чистый", "Домик сонный", "Игрушка перо", "Корм для котят", "Переноска компакт", "Ошейник мягкий", "Спрей уходовый", "Фонтан-поилка", "Плед теплый", "Набор ухода"],
  "Собаки": ["Корм Active Dog", "Поводок City", "Мяч прочный", "Кость жевательная", "Шампунь блеск", "Лежак просторный", "Миска антискользящая", "Щетка массажная", "Игрушка канат", "Лакомство индейка", "Пеленки гигиенические", "Домик складной", "Намордник мягкий", "Корм для щенков", "Переноска дорожная", "Ошейник яркий", "Спрей лапки", "Бутылка прогулочная", "Плед дорожный", "Набор дрессировки"],
  "Хорьки": ["Корм Ferret Balance", "Гамак уютный", "Тоннель шуршащий", "Игрушка колокольчик", "Шампунь деликатный", "Домик норка", "Миска тяжелая", "Расческа малая", "Лакомство курица", "Паста солодовая", "Наполнитель древесный", "Клетка комфорт", "Шлейка прогулочная", "Корм юниор", "Переноска легкая", "Подстилка мягкая", "Спрей чистота", "Поилка навесная", "Плед мини", "Набор хорьковода"],
  "Попугаи": ["Корм Tropical Bird", "Жердочка натуральная", "Зеркальце игровое", "Колокольчик", "Минеральный камень", "Клетка светлая", "Купалка прозрачная", "Песок гигиенический", "Лакомство зерновое", "Лестница деревянная", "Качели цветные", "Домик гнездовой", "Витамины перо", "Корм для птенцов", "Переноска птиц", "Игрушка веревочная", "Спрей перышко", "Поилка автомат", "Поддон запасной", "Набор BirdCare"],
  "Рыбки": ["Корм Aqua Daily", "Фильтр тихий", "Компрессор воздух", "Грунт речной", "Сачок мягкий", "Аквариум старт", "Декор замок", "Термометр водный", "Корм хлопья", "Кондиционер воды", "Лампа аквариумная", "Домик керамика", "Тест воды", "Корм для мальков", "Отсадник", "Растение шелковое", "Скребок стекла", "Корм гранулы", "Фон синий", "Набор аквариумиста"]
};

const categoryCycle = ["Корм", "Игрушки", "Уход", "Домики и клетки", "Аксессуары"];
const descriptions = {
  "Корм": "Сбалансированный премиум-рацион для здоровья и долголетия.",
  "Игрушки": "Прочные и безопасные игрушки для развития и активных игр.",
  "Уход": "Профессиональная косметика и инструменты для безупречного внешнего вида.",
  "Домики и клетки": "Комфортное и безопасное личное пространство для отдыха.",
  "Аксессуары": "Стильные и функциональные детали для ежедневного использования."
};

const animalStyles = {
  "Кошки": { icon: "cat", color: "#00e68a", accent: "#06b6d4" },
  "Собаки": { icon: "dog", color: "#06b6d4", accent: "#3b82f6" },
  "Хорьки": { icon: "ferret", color: "#8b5cf6", accent: "#d946ef" },
  "Попугаи": { icon: "bird", color: "#f43f5e", accent: "#f59e0b" },
  "Рыбки": { icon: "fish", color: "#3b82f6", accent: "#00e68a" }
};

const categoryIcons = {
  "Корм": "bowl", "Игрушки": "ball", "Уход": "care", "Домики и клетки": "home", "Аксессуары": "tag"
};

const products = Object.keys(productNames).flatMap((animal, animalIndex) => {
  return productNames[animal].map((name, index) => {
    const category = categoryCycle[(index + animalIndex) % categoryCycle.length];
    const price = 2400 + animalIndex * 1100 + index * 950 + (index % 5) * 1300;
    return {
      id: `${animalIndex + 1}-${index + 1}`,
      name,
      animal,
      category,
      price,
      image: makeProductImage(animal, category, name, index),
      short: descriptions[category],
      full: `${name} — идеальный выбор в категории "${category}" для вашего питомца (${animal}). Товар создан с учетом строгих стандартов качества, обеспечивая максимальный комфорт и безопасность.`,
      specs: [
        "Премиальные гипоаллергенные материалы",
        "Протестировано ветеринарами",
        "Инновационный эргономичный дизайн",
        "Увеличенный срок службы"
      ],
      recommendation: "Следуйте инструкции производителя. При необходимости проконсультируйтесь со специалистом.",
      reviews: [
        "Отличное качество, выглядит очень футуристично!",
        "Питомец в восторге, а дизайн идеально вписался в интерьер.",
        "Определенно стоит своих денег. Рекомендую."
      ]
    };
  });
});

const productsGrid = document.querySelector("#productsGrid");
const searchInput = document.querySelector("#searchInput");
const animalFilter = document.querySelector("#animalFilter");
const priceFilter = document.querySelector("#priceFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const sortSelect = document.querySelector("#sortSelect");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const resetFilters = document.querySelector("#resetFilters");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const loadMoreWrap = document.querySelector("#loadMoreWrap");
const modal = document.querySelector("#productModal");
const modalContent = document.querySelector("#modalContent");
const toTopButton = document.querySelector(".to-top");
const burgerBtn = document.querySelector("#burgerBtn");
const mainNav = document.querySelector("#mainNav");
const toast = document.querySelector("#toast");
const CART_KEY = "zoonefrit-cart-v2";

let cart = loadCart();
let selectedQuantities = {};
let quickBuyProductId = null;
let currentProducts = [];
let itemsPerPage = 12;
let currentPage = 1;

const formatPrice = (price) => `${price.toLocaleString("ru-RU")} ₸`;

function escapeSvg(text) {
  return text.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}

function makeProductImage(animal, category, name, index) {
  const style = animalStyles[animal];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 460">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${style.accent}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${style.color}" stop-opacity="0.05"/>
        </radialGradient>
      </defs>
      <rect width="640" height="460" fill="#0f172a"/>
      <rect width="640" height="460" fill="url(#glow)"/>
      <circle cx="320" cy="200" r="120" fill="none" stroke="${style.color}" stroke-width="2" stroke-dasharray="10 10" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" from="0 320 200" to="360 320 200" dur="20s" repeatCount="indefinite"/>
      </circle>
      <circle cx="320" cy="200" r="80" fill="${style.color}" opacity="0.2"/>
      <text x="320" y="220" font-family="Arial, sans-serif" font-size="80" text-anchor="middle" fill="${style.accent}" font-weight="bold" opacity="0.8">${category.substring(0,2).toUpperCase()}</text>
      <rect x="220" y="340" width="200" height="40" rx="20" fill="rgba(255,255,255,0.05)" stroke="${style.color}" stroke-width="1"/>
      <text x="320" y="366" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#fff" letter-spacing="2">${escapeSvg(animal.toUpperCase())}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function showToast(message) {
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getProduct(productId) { return products.find((item) => item.id === productId); }
function getProductQuantity(productId) { return selectedQuantities[productId] || 1; }
function setProductQuantity(productId, quantity) {
  selectedQuantities[productId] = Math.max(1, Math.min(99, quantity));
  renderProductsList();
}

function addToCart(productId, quantity = getProductQuantity(productId)) {
  cart[productId] = Math.max(1, (cart[productId] || 0) + quantity);
  saveCart();
  const product = getProduct(productId);
  showToast(`${product.name} добавлен в корзину`);
  renderProductsList();
  renderCart(false);
}

function setCartQuantity(productId, quantity) {
  cart[productId] = Math.max(1, Math.min(99, quantity));
  saveCart();
  renderProductsList();
  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  renderProductsList();
  renderCart();
}

function clearCart() {
  cart = {};
  saveCart();
  renderProductsList();
  renderCart();
}

function isPriceMatch(price, filter) {
  if (filter === "under-5000") return price < 5000;
  if (filter === "5000-10000") return price >= 5000 && price <= 10000;
  if (filter === "10000-20000") return price > 10000 && price <= 20000;
  if (filter === "over-20000") return price > 20000;
  return true;
}

// Debounce for search
let searchTimeout;
function handleSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage = 1;
    updateFilteredProducts();
  }, 300);
}

function updateFilteredProducts() {
  const query = searchInput?.value.trim().toLowerCase() || "";
  let filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesAnimal = !animalFilter || animalFilter.value === "all" || product.animal === animalFilter.value;
    const matchesCategory = !categoryFilter || categoryFilter.value === "all" || product.category === categoryFilter.value;
    const matchesPrice = !priceFilter || isPriceMatch(product.price, priceFilter.value);
    return matchesSearch && matchesAnimal && matchesCategory && matchesPrice;
  });

  if (sortSelect) {
    const sort = sortSelect.value;
    if (sort === "price-asc") filtered.sort((a,b) => a.price - b.price);
    else if (sort === "price-desc") filtered.sort((a,b) => b.price - a.price);
    else if (sort === "name-asc") filtered.sort((a,b) => a.name.localeCompare(b.name));
  }

  currentProducts = filtered;
  renderProductsList(true);
}

function renderProductsList(reset = false) {
  if (!productsGrid) return;
  
  if (reset) {
    productsGrid.innerHTML = "";
    if(resultCount) resultCount.textContent = `Найдено: ${currentProducts.length}`;
    if(emptyState) emptyState.hidden = currentProducts.length > 0;
  }

  const start = reset ? 0 : (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  const itemsToShow = currentProducts.slice(start, end);

  const html = itemsToShow.map((product, index) => {
    const quantity = getProductQuantity(product.id);
    const delay = reset ? `style="animation-delay: ${index * 0.05}s"` : "";
    return `
      <article class="product-card" tabindex="0" data-open-product="${product.id}" aria-label="Открыть товар ${product.name}" ${delay}>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-body">
          <div class="tag-row">
            <span class="tag">${product.animal}</span>
            <span class="tag">${product.category}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.short}</p>
          <div class="price">${formatPrice(product.price)}</div>
          <div class="buy-row" data-card-control>
            <div class="qty-control" aria-label="Количество товара">
              <button type="button" data-qty-minus="${product.id}" aria-label="Уменьшить количество">−</button>
              <span>${quantity}</span>
              <button type="button" data-qty-plus="${product.id}" aria-label="Увеличить количество">+</button>
            </div>
            <button class="button cart-button" type="button" data-add-cart="${product.id}">В корзину</button>
          </div>
        </div>
      </article>`;
  }).join("");

  if (reset) {
    productsGrid.innerHTML = html;
  } else {
    productsGrid.insertAdjacentHTML('beforeend', html);
  }

  if (loadMoreWrap) {
    loadMoreWrap.hidden = currentProducts.length <= end;
  }

  // Update filter styles
  [searchInput, animalFilter, priceFilter, categoryFilter, sortSelect].forEach((field) => {
    if(!field) return;
    const isDefault = field.value === "" || field.value === "all" || field.value === "default";
    field.classList.toggle("is-active", !isDefault);
  });
}

function loadMore() {
  currentPage++;
  renderProductsList(false);
}

function injectCartPanel() {
  if (!document.querySelector("#cartPanel")) {
    document.body.insertAdjacentHTML("beforeend", `
      <button class="cart-fab" id="cartFab" type="button" aria-label="Открыть корзину">
        Корзина <span id="cartBadge">0</span>
      </button>
      <aside class="cart-panel" id="cartPanel" aria-label="Корзина" hidden>
        <div class="cart-panel-head">
          <div>
            <p class="eyebrow">ZooNefrit</p>
            <h2>Корзина</h2>
          </div>
          <button class="modal-close" type="button" data-close-cart aria-label="Закрыть корзину">×</button>
        </div>
        <div id="cartItems"></div>
        <form class="checkout-form" id="checkoutForm">
          <h3>Доставка</h3>
          <label>
            <span>Способ доставки</span>
            <select id="deliveryType">
              <option value="pickup">Самовывоз — 0 ₸</option>
              <option value="city">Курьер по городу — 1 500 ₸</option>
              <option value="express">Дрон-экспресс — 3 000 ₸</option>
            </select>
          </label>
          <label>
            <span>Имя</span>
            <input id="buyerName" type="text" placeholder="Ваше имя" required>
          </label>
          <label>
            <span>Телефон</span>
            <input id="buyerPhone" type="tel" placeholder="+7 700 000 00 00" required>
          </label>
          <div class="cart-total" id="cartTotal"></div>
          <button class="button primary" type="submit" style="width:100%">Оформить заказ</button>
          <button class="button ghost" id="clearCart" type="button" style="width:100%; margin-top:10px">Очистить корзину</button>
          <p class="order-status" id="orderStatus" aria-live="polite"></p>
        </form>
      </aside>
      <div class="cart-shade" id="cartShade" hidden data-close-cart></div>
    `);
  }
}

function getDeliveryPrice() {
  const type = document.querySelector("#deliveryType")?.value || "pickup";
  return type === "city" ? 1500 : type === "express" ? 3000 : 0;
}

function renderCart(openPanel = false) {
  injectCartPanel();
  const rows = Object.entries(cart)
    .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
    .filter((row) => row.product && row.quantity > 0);
    
  const cartItems = document.querySelector("#cartItems");
  const cartTotal = document.querySelector("#cartTotal");
  const cartBadge = document.querySelector("#cartBadge");
  if(!cartItems) return;

  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.quantity, 0);
  const delivery = rows.length ? getDeliveryPrice() : 0;
  const total = subtotal + delivery;
  cartBadge.textContent = rows.reduce((sum, row) => sum + row.quantity, 0);

  cartItems.innerHTML = rows.length ? rows.map(({ product, quantity }) => `
    <article class="cart-item">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>${product.animal} · ${product.category}</p>
        <div class="cart-item-bottom">
          <div class="qty-control">
            <button type="button" data-cart-minus="${product.id}">−</button>
            <span>${quantity}</span>
            <button type="button" data-cart-plus="${product.id}">+</button>
          </div>
          <strong>${formatPrice(product.price * quantity)}</strong>
          <button class="remove-button" type="button" data-remove-cart="${product.id}">Удалить</button>
        </div>
      </div>
    </article>
  `).join("") : `<div class="cart-empty"><h3>Корзина пуста</h3><p>Добавьте товары из каталога.</p></div>`;

  cartTotal.innerHTML = `
    <span>Товары: <b>${formatPrice(subtotal)}</b></span>
    <span>Доставка: <b>${formatPrice(delivery)}</b></span>
    <strong>Итого: ${formatPrice(total)}</strong>
  `;
  if (openPanel) openCart();
}

function openCart() {
  const cartPanel = document.querySelector("#cartPanel");
  const cartShade = document.querySelector("#cartShade");
  if (!cartPanel) return;
  cartPanel.hidden = false;
  cartShade.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const cartPanel = document.querySelector("#cartPanel");
  const cartShade = document.querySelector("#cartShade");
  if (!cartPanel) return;
  cartPanel.hidden = true;
  cartShade.hidden = true;
  document.body.style.overflow = "";
}

function openProductModal(productId) {
  const product = getProduct(productId);
  if (!product || !modal || !modalContent) return;
  modalContent.innerHTML = `
    <div class="modal-product">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <p class="eyebrow">${product.animal} · ${product.category}</p>
        <h2 id="modalTitle">${product.name}</h2>
        <p class="price">${formatPrice(product.price)}</p>
        <p style="margin-bottom:20px">${product.full}</p>
        <h3>Характеристики</h3>
        <ul class="spec-list">${product.specs.map(s => `<li>✦ ${s}</li>`).join("")}</ul>
        <h3 style="margin-top:20px">Рекомендации</h3>
        <p>${product.recommendation}</p>
        <div class="modal-actions">
          <button class="button primary" type="button" data-add-cart="${product.id}" style="grid-column: span 2">В корзину</button>
          <button class="button ghost" type="button" data-close-modal>Закрыть</button>
        </div>
      </div>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function submitOrder(event) {
  event.preventDefault();
  const rows = Object.entries(cart);
  const status = document.querySelector("#orderStatus");
  if (!rows.length) {
    status.textContent = "Корзина пуста.";
    return;
  }
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  status.textContent = `Заказ №${orderNumber} успешно оформлен!`;
  status.style.color = "var(--jade)";
  setTimeout(() => {
    clearCart();
    closeCart();
    showToast(`Заказ №${orderNumber} оформлен`);
    status.textContent = "";
  }, 2000);
}

// Event Listeners
if (productsGrid) {
  currentPage = 1;
  updateFilteredProducts();
  renderCart();

  if(searchInput) searchInput.addEventListener("input", handleSearchInput);
  [animalFilter, priceFilter, categoryFilter, sortSelect].forEach(f => {
    if(f) f.addEventListener("change", () => { currentPage = 1; updateFilteredProducts(); });
  });

  if(resetFilters) resetFilters.addEventListener("click", () => {
    if(searchInput) searchInput.value = "";
    if(animalFilter) animalFilter.value = "all";
    if(priceFilter) priceFilter.value = "all";
    if(categoryFilter) categoryFilter.value = "all";
    if(sortSelect) sortSelect.value = "default";
    currentPage = 1;
    updateFilteredProducts();
  });

  if(loadMoreBtn) loadMoreBtn.addEventListener("click", loadMore);

  productsGrid.addEventListener("click", (event) => {
    if (event.target.closest("[data-card-control], button")) return;
    const card = event.target.closest("[data-open-product]");
    if (card) openProductModal(card.dataset.openProduct);
  });
} else {
  // We are on index page
  renderCart();
}

// Global clicks
document.addEventListener("click", (event) => {
  const t = event.target;
  
  if (t.closest("[data-qty-minus]")) {
    const id = t.closest("[data-qty-minus]").dataset.qtyMinus;
    setProductQuantity(id, getProductQuantity(id) - 1);
  }
  else if (t.closest("[data-qty-plus]")) {
    const id = t.closest("[data-qty-plus]").dataset.qtyPlus;
    setProductQuantity(id, getProductQuantity(id) + 1);
  }
  else if (t.closest("[data-cart-minus]")) {
    const id = t.closest("[data-cart-minus]").dataset.cartMinus;
    setCartQuantity(id, (cart[id] || 1) - 1);
  }
  else if (t.closest("[data-cart-plus]")) {
    const id = t.closest("[data-cart-plus]").dataset.cartPlus;
    setCartQuantity(id, (cart[id] || 1) + 1);
  }
  else if (t.closest("[data-add-cart]")) addToCart(t.closest("[data-add-cart]").dataset.addCart);
  else if (t.closest("[data-remove-cart]")) removeFromCart(t.closest("[data-remove-cart]").dataset.removeCart);
  else if (t.closest("#cartFab")) openCart();
  else if (t.closest("[data-close-cart]")) closeCart();
  else if (t.closest("#clearCart")) clearCart();
  else if (t.closest("[data-close-modal]")) closeProductModal();
  else if (t.closest("#burgerBtn")) {
    burgerBtn.classList.toggle("open");
    mainNav.classList.toggle("open");
  }
});

document.addEventListener("change", (e) => {
  if (e.target.matches("#deliveryType")) renderCart();
});

document.addEventListener("submit", (e) => {
  if (e.target.matches("#checkoutForm")) submitOrder(e);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeProductModal(); closeCart(); }
});

// Scroll animations
if (toTopButton) {
  window.addEventListener("scroll", () => {
    toTopButton.classList.toggle("visible", window.scrollY > 400);
  });
  toTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Intersection Observer for reveal animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
