const products = [
  { id: 'tra-trung-du-dac-biet', name: 'Trà Trung Du đặc biệt', category: 'che', type: 'Trà', packaging: 'Hộp', image: './products/tra-trung-du-dac-biet-photo-demo.png', photo: true, prices: { '100 g': 99000, '200 g': 189000, '1 kg': 790000 } },
  { id: 'tra-trung-du-truyen-thong', name: 'Trà Trung Du truyền thống', category: 'che', type: 'Trà', packaging: 'Hộp', image: './products/tra-trung-du-truyen-thong-photo-demo.png', photo: true, prices: { '100 g': 89000, '200 g': 169000, '1 kg': 690000 } },
  { id: 'che-thai-nguyen', name: 'Chè Thái Nguyên', category: 'che', type: 'Chè', packaging: 'Gói hút chân không', image: './products/che-thai-nguyen-photo-demo.png', photo: true, prices: { '100 g': 59000, '200 g': 109000, '1 kg': 349000 } },
  { id: 'cacao-daklak', name: 'Cacao Đắk Lắk', category: 'cacao', type: 'Cacao', packaging: '', image: './products/cacao-photo-demo.png', photo: true, prices: { '200 g': 129000, '500 g': 269000, '1 kg': 500000 } },
  { id: 'ca-phe', name: 'Cà phê xay LA’CAPHE Gia Lai', category: 'caphe', type: 'Cà phê', packaging: 'Đã xay', image: './products/caphe-photo-demo.png', photo: true, prices: { '200 g': 99000, '500 g': 199000, '1 kg': 349000 } },
];
const productById = Object.fromEntries(products.map(product => [product.id, product]));
const page = document.body.dataset.page;
const requestedProduct = new URLSearchParams(location.search).get('id');
const currentProduct = productById[requestedProduct];
const productUrl = product => `./product.html?id=${encodeURIComponent(product.id)}`;
const categories = {
  che: { name: 'Chè', url: './che.html', index: '01', headingClass: 'tea-heading', description: 'Trà Trung Du và chè Thái Nguyên. Chọn hương vị và quy cách phù hợp với bạn.' },
  cacao: { name: 'Cacao', url: './cacao.html', index: '02', headingClass: 'cacao-heading', description: 'Bột cacao Đắk Lắk nguyên chất, dành cho những tách cacao đậm vị.' },
  caphe: { name: 'Cà phê', url: './caphe.html', index: '03', headingClass: 'coffee-heading', description: 'Cà phê xay LA’CAPHE Gia Lai, sẵn sàng cho ly cà phê mỗi ngày.' },
};
const categoryUrl = category => categories[category].url;
const categoryName = category => categories[category].name;
const formatPrice = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const shopPhone = '0367478239';
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const icon = {
  bag: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1 12H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>',
};

function header() {
  return `<div class="announcement">Mộc Miên · Chè, cacao &amp; cà phê <span>✦</span> Đặt hàng qua Zalo ${shopPhone}</div>
    <header class="header">
      <button class="mobile-menu icon-button" id="menu-toggle" aria-label="Mở menu" aria-expanded="false" aria-controls="main-nav">${icon.menu}</button>
      <a href="./index.html" class="brand"><img class="brand-logo" src="./moc-mien-logo.png" alt="Mộc Miên"></a>
      <nav id="main-nav" class="nav" aria-label="Danh mục chính">${Object.entries(categories).map(([key, item]) => `<a href="${item.url}" ${page === key || currentProduct?.category === key ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}<a href="./index.html#story">Câu chuyện</a></nav>
      <button class="cart-trigger icon-button" id="cart-toggle" aria-label="Xem giỏ hàng" aria-haspopup="dialog">${icon.bag}<span class="cart-count" id="cart-count">0</span></button>
    </header>`;
}

function footer() {
  return `<footer id="footer"><div><a href="./index.html" class="brand"><img class="brand-logo" src="./moc-mien-logo.png" alt="Mộc Miên"></a><p>Chè, cacao và cà phê cho những phút giây an yên.</p></div><div><strong>Khám phá</strong>${Object.values(categories).map(item => `<a href="${item.url}">${item.name}</a>`).join('')}<a href="./index.html#story">Câu chuyện</a></div><div><strong>Liên hệ đặt hàng</strong><a href="https://zalo.me/${shopPhone}" target="_blank" rel="noopener">Nhắn Mộc Miên trên Zalo</a><a href="tel:${shopPhone}">${shopPhone}</a><span>Thanh toán COD hoặc chuyển khoản khi xác nhận đơn.</span></div><small>© 2026 Mộc Miên</small></footer>`;
}

function cartMarkup() {
  return `<div class="drawer-overlay" id="cart-overlay" hidden><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div class="drawer-head"><h2 id="cart-title">Giỏ hàng <span id="drawer-count">(0)</span></h2><button class="icon-button" id="cart-close" aria-label="Đóng giỏ hàng">${icon.close}</button></div><div class="cart-items" id="cart-items"></div><p class="empty-cart" id="empty-cart">Giỏ hàng đang trống. Chọn sản phẩm bạn yêu thích nhé.</p><div class="cart-checkout" id="cart-checkout" hidden><div class="cart-summary" id="cart-summary"></div><form id="order-form"><h3>Thông tin nhận hàng</h3><label>Họ và tên<input name="customerName" autocomplete="name" required maxlength="80"></label><label>Số điện thoại<input name="customerPhone" autocomplete="tel" inputmode="tel" required pattern="[0-9+ .-]{9,15}"></label><label>Địa chỉ nhận hàng<textarea name="customerAddress" autocomplete="street-address" required rows="2" maxlength="240"></textarea></label><fieldset class="payment-methods"><legend>Phương thức thanh toán</legend><label class="payment-option"><input type="radio" name="payment" value="cod" checked><span><strong>Thanh toán khi nhận hàng (COD)</strong><small>Thanh toán khi đơn được giao tới bạn.</small></span></label><label class="payment-option"><input type="radio" name="payment" value="bank_transfer"><span><strong>Chuyển khoản ngân hàng</strong><small>Nhận hướng dẫn hoặc mã QR sau khi đơn được tạo.</small></span></label></fieldset><p class="payment-help" id="payment-help"></p><label>Ghi chú (nếu có)<textarea name="customerNote" rows="2" maxlength="300"></textarea></label><p class="checkout-hint">Phí vận chuyển được báo và xác nhận qua Zalo trước khi gửi hàng.</p><button class="order-submit" type="submit">Xác nhận đặt hàng</button><div class="order-handoff" id="order-handoff" hidden><div class="order-result" id="order-result"></div><label>Nội dung đơn hàng<textarea id="order-message" rows="8" readonly></textarea></label><button type="button" id="copy-order">Sao chép nội dung</button><a href="https://zalo.me/${shopPhone}" target="_blank" rel="noopener" class="zalo-checkout-link">Mở Zalo để gửi đơn ↗</a><p>Dán nội dung vừa sao chép vào cuộc trò chuyện với Mộc Miên để xác nhận đơn.</p></div><p class="checkout-status" id="checkout-status" role="status" aria-live="polite"></p></form></div></aside></div>`;
}

function home() {
  return `<section class="hero" id="home"><div class="hero-copy"><span class="eyebrow">— TỪ ĐẤT VIỆT, ĐẾN GÓC BÌNH YÊN</span><h1>Chút mộc mạc<br><em>trong từng vị.</em></h1><p>Chè thơm, cacao đậm và cà phê cho những phút giây chậm lại.</p><a href="#collections" class="primary-link">Khám phá danh mục <span aria-hidden="true">→</span></a><div class="hero-foot"><span>01 / 03</span><div></div><span>CHÈ · CÀ PHÊ · CACAO</span></div></div><div class="hero-art" aria-label="Ảnh danh mục chè, cà phê và cacao"><div class="hero-slides"><a class="hero-slide is-active" href="./che.html" aria-label="Khám phá chè"><img src="./products/che-thai-nguyen-photo-demo.png" alt="Chè Thái Nguyên"></a><a class="hero-slide" href="./caphe.html" aria-label="Khám phá cà phê"><img src="./products/caphe-photo-demo.png" alt="Cà phê LA’CAPHE Gia Lai"></a><a class="hero-slide" href="./cacao.html" aria-label="Khám phá cacao"><img src="./products/cacao-photo-demo.png" alt="Cacao Đắk Lắk"></a></div><div class="hero-slide-caption"><span id="hero-slide-count">01 / 03</span><strong id="hero-slide-name">Chè Việt</strong><span>Khám phá sản phẩm</span></div><div class="hero-slide-controls" aria-label="Điều khiển ảnh danh mục"><button type="button" class="hero-arrow" id="hero-prev" aria-label="Ảnh trước">‹</button><div class="hero-dots"><button type="button" class="hero-dot is-active" data-slide="0" aria-label="Xem ảnh chè" aria-current="true"></button><button type="button" class="hero-dot" data-slide="1" aria-label="Xem ảnh cà phê"></button><button type="button" class="hero-dot" data-slide="2" aria-label="Xem ảnh cacao"></button></div><button type="button" class="hero-arrow" id="hero-next" aria-label="Ảnh tiếp theo">›</button></div></div></section>
    <section class="collection collection-landing" id="collections"><div class="section-heading"><div><span class="eyebrow">BA DÒNG SẢN PHẨM</span><h2>Chọn <em>hương vị của bạn</em></h2></div><p>Khám phá từng danh mục và chọn quy cách phù hợp trên trang sản phẩm.</p></div><div class="category-grid"><a class="category-tile tea-tile" href="./che.html"><div class="category-art"><img src="./products/che-thai-nguyen-photo-demo.png" alt="Chè Thái Nguyên"></div><div class="category-copy"><span>01 / CHÈ VIỆT</span><h3>Chè</h3><p>Trà Trung Du và chè Thái Nguyên</p><b aria-hidden="true">↗</b></div></a><a class="category-tile cacao-tile" href="./cacao.html"><div class="category-art"><img src="./products/cacao-photo-demo.png" alt="Minh họa cacao Đắk Lắk"></div><div class="category-copy"><span>02 / CACAO VIỆT</span><h3>Cacao</h3><p>Cacao Đắk Lắk</p><b aria-hidden="true">↗</b></div></a><a class="category-tile coffee-tile" href="./caphe.html"><div class="category-art"><img src="./products/caphe-photo-demo.png" alt="Cà phê xay LA’CAPHE Gia Lai"></div><div class="category-copy"><span>03 / CÀ PHÊ</span><h3>Cà phê</h3><p>Cà phê xay LA’CAPHE Gia Lai</p><b aria-hidden="true">↗</b></div></a></div></section>
    <section class="story" id="story"><div class="story-art"><span class="story-sun"></span><span class="story-hill hill-one"></span><span class="story-hill hill-two"></span><span class="story-word">mộc miên</span></div><div class="story-copy"><span class="eyebrow">CÂU CHUYỆN CỦA CHÚNG MÌNH</span><h2>Từ vùng đất lành,<br>đến <em>tách trà của bạn.</em></h2><p>Chúng mình tin một thức uống ngon bắt đầu từ nguyên liệu tốt và sự trân trọng dành cho người làm ra nó. Mộc Miên là lời mời dành một khoảng lặng nhỏ trong ngày để thưởng thức chè, cacao và cà phê Việt.</p><a href="./che.html" class="text-link">Khám phá chè Việt <span aria-hidden="true">→</span></a></div></section>`;
}

function productCard(product, index) {
  const tone = product.category === 'caphe' ? 'coffee-tone' : `tone-${index % 4}`;
  const fromPrice = Math.min(...Object.values(product.prices));
  return `<article class="catalog-card"><a href="${productUrl(product)}" aria-label="Xem ${product.name}"><div class="catalog-image ${tone}"><img src="${product.image}" alt="Hình tham khảo ${product.name}"></div><div class="catalog-meta"><span>${product.type.toUpperCase()}</span><span>TỪ ${formatPrice(fromPrice)}</span></div><h2>${product.name}</h2><p>Xem quy cách và giá <span aria-hidden="true">↗</span></p></a></article>`;
}

function category(category) {
  const info = categories[category];
  const items = products.filter(product => product.category === category);
  return `<section class="catalog-hero ${info.headingClass}"><div><span class="eyebrow">MỘC MIÊN / DANH MỤC</span><h1>${info.name}</h1><p>${info.description}</p></div><span class="catalog-index">${info.index} / 03</span></section><section class="catalog-section"><div class="catalog-tools"><span>${String(items.length).padStart(2, '0')} sản phẩm</span><nav aria-label="Chuyển danh mục">${Object.entries(categories).map(([key, item]) => `<a href="${item.url}" ${key === category ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}</nav></div><div class="catalog-grid">${items.map(productCard).join('')}</div><p class="sample-note">Chọn sản phẩm để xem giá theo từng quy cách. Cần tư vấn thêm? <a href="https://zalo.me/${shopPhone}" target="_blank" rel="noopener">Nhắn Mộc Miên qua Zalo ↗</a></p></section>`;
}

function detail(product) {
  if (!product) return `<section class="missing-product"><h1>Không tìm thấy sản phẩm</h1><a href="./che.html" class="text-link">Xem danh mục Chè →</a></section>`;
  document.title = `${product.name} — Mộc Miên`;
  const sizes = product.category === 'che' ? [['100 g', '1 lạng'], ['200 g', '2 lạng'], ['1 kg', '1 cân']] : [['200 g', '2 lạng'], ['500 g', '5 lạng'], ['1 kg', '1 cân']];
  const startingPrice = Math.min(...Object.values(product.prices));
  return `<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="./index.html">Trang chủ</a><span>/</span><a href="${categoryUrl(product.category)}">${categoryName(product.category)}</a><span>/</span><span aria-current="page">${product.name}</span></nav>
    <section class="detail-layout"><div class="detail-visual"><img src="${product.image}" alt="Hình tham khảo ${product.name}"></div><div class="detail-info"><span class="eyebrow">MỘC MIÊN / ${categoryName(product.category).toUpperCase()}</span><h1>${product.name}</h1><p class="detail-subtitle">${product.type} Việt${product.packaging ? ` · ${product.packaging}` : ''}</p><p class="detail-price" id="detail-price">Từ ${formatPrice(startingPrice)}</p><div class="detail-divider"></div><div class="variant-block"><div class="variant-heading"><strong>Chọn quy cách</strong><span id="selected-size">Chưa chọn</span></div><div class="variant-options" role="group" aria-label="Quy cách đóng gói">${sizes.map(([weight, label]) => `<button type="button" data-size="${weight}" aria-pressed="false">${weight}<small>${label} · ${formatPrice(product.prices[weight])}</small></button>`).join('')}</div></div><button class="detail-add" id="add-to-cart" disabled>Chọn quy cách để thêm vào giỏ hàng</button><p class="detail-note">Giá chưa gồm phí vận chuyển. Shop sẽ báo phí ship để bạn xác nhận trước khi gửi hàng.</p><div class="detail-facts"><details open><summary>Thông tin sản phẩm</summary><p>${product.name} · ${sizes.map(([weight]) => weight).join(', ')}. Hình ảnh bao bì mang tính tham khảo cho từng quy cách.</p></details><details><summary>Giao hàng &amp; thanh toán</summary><p>Đặt hàng qua Zalo ${shopPhone}. Chọn thanh toán khi nhận hàng (COD) hoặc chuyển khoản sau khi shop xác nhận đơn và phí giao hàng.</p></details></div></div></section><section class="detail-more"><div><span class="eyebrow">KHÁM PHÁ THÊM</span><h2>${categoryName(product.category)} Mộc Miên</h2></div><a href="${categoryUrl(product.category)}" class="text-link">Xem toàn bộ danh mục <span aria-hidden="true">→</span></a></section>`;
}

const content = page === 'home' ? home() : categories[page] ? category(page) : detail(currentProduct);
document.querySelector('#app').innerHTML = `${header()}<main>${content}</main>${footer()}${cartMarkup()}`;
if (page === 'product' && currentProduct?.photo) document.querySelector('.detail-visual').insertAdjacentHTML('beforeend', '<span class="photo-disclosure">Hình ảnh tham khảo · Bao bì có thể khác theo quy cách</span>');
if (page === 'home') {
  const hero = document.querySelector('.hero-art');
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dots = [...hero.querySelectorAll('.hero-dot')];
  const slideNames = ['Chè Việt', 'Cà phê Gia Lai', 'Cacao Đắk Lắk'];
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0;
  let slideTimer;
  const showSlide = index => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const active = position === activeSlide;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
      dots[position].classList.toggle('is-active', active);
      if (active) dots[position].setAttribute('aria-current', 'true');
      else dots[position].removeAttribute('aria-current');
    });
    document.querySelector('#hero-slide-count').textContent = `${String(activeSlide + 1).padStart(2, '0')} / 03`;
    document.querySelector('#hero-slide-name').textContent = slideNames[activeSlide];
    document.querySelector('.hero-foot span:first-child').textContent = `${String(activeSlide + 1).padStart(2, '0')} / 03`;
  };
  const stopSlides = () => clearInterval(slideTimer);
  const startSlides = () => {
    stopSlides();
    if (!motionReduced && !document.hidden) slideTimer = setInterval(() => showSlide(activeSlide + 1), 5000);
  };
  document.querySelector('#hero-prev').addEventListener('click', () => { showSlide(activeSlide - 1); startSlides(); });
  document.querySelector('#hero-next').addEventListener('click', () => { showSlide(activeSlide + 1); startSlides(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); startSlides(); }));
  hero.addEventListener('mouseenter', stopSlides);
  hero.addEventListener('mouseleave', startSlides);
  hero.addEventListener('focusin', stopSlides);
  hero.addEventListener('focusout', event => { if (!hero.contains(event.relatedTarget)) startSlides(); });
  document.addEventListener('visibilitychange', startSlides);
  showSlide(0);
  startSlides();
}

const menu = document.querySelector('#main-nav');
const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('nav-open'); menuToggle.setAttribute('aria-expanded', String(open)); });

const storageKey = 'moc-mien-cart';
let cart = [];
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored)) cart = stored.filter(item => productById[item.id]?.prices?.[item.size] && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99);
} catch { cart = []; }
const overlay = document.querySelector('#cart-overlay');
const saveCart = () => { try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Keep the current cart in memory. */ } };
const cartTotal = () => cart.reduce((sum, item) => sum + productById[item.id].prices[item.size] * item.quantity, 0);
const renderCart = () => {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('#cart-count').textContent = String(itemCount);
  document.querySelector('#drawer-count').textContent = `(${itemCount})`;
  document.querySelector('#cart-items').innerHTML = cart.map((item, index) => {
    const product = productById[item.id];
    return `<div class="cart-item"><img src="${product.image}" alt=""><div class="cart-item-info"><strong>${escapeHtml(product.name)}</strong><span>${item.size} · ${formatPrice(product.prices[item.size])}</span><div class="quantity-control"><button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Giảm số lượng ${escapeHtml(product.name)}">−</button><span>${item.quantity}</span><button type="button" data-cart-action="increase" data-index="${index}" aria-label="Tăng số lượng ${escapeHtml(product.name)}">+</button></div><button type="button" class="remove-item" data-cart-action="remove" data-index="${index}">Xóa</button></div><strong class="cart-line-total">${formatPrice(product.prices[item.size] * item.quantity)}</strong></div>`;
  }).join('');
  document.querySelector('#empty-cart').hidden = cart.length > 0;
  document.querySelector('#cart-checkout').hidden = cart.length === 0;
  document.querySelector('#cart-summary').innerHTML = `<span>Tạm tính (${itemCount} sản phẩm)</span><strong>${formatPrice(cartTotal())}</strong>`;
  document.querySelector('#order-handoff').hidden = true;
  document.querySelector('#checkout-status').textContent = '';
};
const closeCart = () => { overlay.hidden = true; document.body.style.overflow = ''; document.querySelector('#cart-toggle').focus(); };
document.querySelector('#cart-toggle').addEventListener('click', () => { renderCart(); overlay.hidden = false; document.body.style.overflow = 'hidden'; document.querySelector('#cart-close').focus(); });
document.querySelector('#cart-close').addEventListener('click', closeCart);
overlay.addEventListener('click', event => { if (event.target === overlay) closeCart(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !overlay.hidden) closeCart(); });
document.querySelector('#cart-items').addEventListener('click', event => {
  const button = event.target.closest('[data-cart-action]');
  if (!button) return;
  const index = Number(button.dataset.index);
  if (button.dataset.cartAction === 'remove') cart.splice(index, 1);
  if (button.dataset.cartAction === 'increase' && cart[index]) cart[index].quantity = Math.min(99, cart[index].quantity + 1);
  if (button.dataset.cartAction === 'decrease' && cart[index]) {
    cart[index].quantity -= 1;
    if (cart[index].quantity === 0) cart.splice(index, 1);
  }
  saveCart(); renderCart();
});
renderCart();

const orderForm = document.querySelector('#order-form');
const paymentHelp = document.querySelector('#payment-help');
const checkoutStatus = document.querySelector('#checkout-status');
const orderSubmit = orderForm.querySelector('.order-submit');
const updatePaymentHelp = () => {
  const method = new FormData(orderForm).get('payment') || 'cod';
  paymentHelp.textContent = window.MocMienCheckout?.paymentHelp(method) || '';
};
orderForm.addEventListener('input', () => {
  document.querySelector('#order-handoff').hidden = true;
  updatePaymentHelp();
});
updatePaymentHelp();

orderForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!cart.length || orderSubmit.disabled) return;

  const data = new FormData(orderForm);
  const paymentMethod = data.get('payment') === 'bank_transfer' ? 'bank_transfer' : 'cod';
  const orderLines = cart.map((item, index) => {
    const product = productById[item.id];
    return `${index + 1}. ${product.name} — ${item.size} × ${item.quantity}: ${formatPrice(product.prices[item.size] * item.quantity)}`;
  });
  const paymentLabel = paymentMethod === 'bank_transfer' ? 'Chuyển khoản ngân hàng' : 'Thanh toán khi nhận hàng (COD)';
  const message = [
    'MỘC MIÊN — YÊU CẦU ĐẶT HÀNG',
    ...orderLines,
    `Tạm tính: ${formatPrice(cartTotal())}`,
    'Phí vận chuyển: shop xác nhận trước khi gửi',
    `Người nhận: ${String(data.get('customerName')).trim()}`,
    `Điện thoại: ${String(data.get('customerPhone')).trim()}`,
    `Địa chỉ: ${String(data.get('customerAddress')).trim()}`,
    `Thanh toán: ${paymentLabel}`,
    data.get('customerNote') ? `Ghi chú: ${String(data.get('customerNote')).trim()}` : '',
  ].filter(Boolean).join('\n');

  const handoff = document.querySelector('#order-handoff');
  const resultBox = document.querySelector('#order-result');
  document.querySelector('#order-message').value = message;
  orderSubmit.disabled = true;
  orderSubmit.textContent = 'Đang tạo đơn…';
  checkoutStatus.textContent = 'Đang gửi thông tin đơn hàng…';

  try {
    const payload = window.MocMienCheckout.buildOrderPayload({ cart, formData: data });
    const result = await window.MocMienCheckout.createOrder(payload);

    if (result.mode === 'api') {
      const order = result.order || {};
      const orderId = order.id || order.order_id || order.code || order.order_code || '';
      const payment = order.payment || order.payment_info || {};
      const total = order.total ?? order.total_amount;
      const serverTotal = Number(total);
      const bankText = paymentMethod === 'bank_transfer'
        ? (payment.qr_url || payment.checkout_url
            ? 'Thông tin thanh toán đã được máy chủ tạo. Mở liên kết/QR được cung cấp sau khi backend hoàn thiện.'
            : 'Đơn đã tạo. Chờ thông tin chuyển khoản được máy chủ xác nhận.')
        : 'Đơn đã tạo với phương thức COD.';
      resultBox.innerHTML = `<strong>Đơn hàng đã được tạo${orderId ? ` · #${escapeHtml(orderId)}` : ''}</strong><span>${Number.isFinite(serverTotal) ? `Tổng tiền xác nhận: ${formatPrice(serverTotal)}. ` : ''}${bankText}</span>`;
      checkoutStatus.textContent = 'Đã tạo đơn thành công.';
    } else {
      resultBox.innerHTML = '<strong>Chế độ demo</strong><span>Backend chưa được cấu hình trên GitHub Pages. Bạn vẫn có thể sao chép đơn và gửi qua Zalo để shop xác nhận.</span>';
      checkoutStatus.textContent = 'Nội dung đơn đã sẵn sàng. Sao chép rồi gửi qua Zalo để shop xác nhận.';
    }

    handoff.hidden = false;
  } catch (error) {
    resultBox.innerHTML = '';
    handoff.hidden = true;
    checkoutStatus.textContent = error?.message || 'Không thể tạo đơn. Vui lòng thử lại.';
  } finally {
    orderSubmit.disabled = false;
    orderSubmit.textContent = 'Xác nhận đặt hàng';
  }
});
document.querySelector('#copy-order').addEventListener('click', async () => {
  const message = document.querySelector('#order-message').value;
  try {
    await navigator.clipboard.writeText(message);
    document.querySelector('#checkout-status').textContent = 'Đã sao chép. Mở Zalo và dán nội dung đơn vào cuộc trò chuyện.';
  } catch {
    document.querySelector('#order-message').select();
    document.querySelector('#checkout-status').textContent = 'Hãy sao chép nội dung đang được chọn, rồi dán vào Zalo.';
  }
});

if (page === 'product' && currentProduct) {
  let selectedSize = '';
  const addButton = document.querySelector('#add-to-cart');
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => {
    selectedSize = button.dataset.size;
    document.querySelectorAll('[data-size]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    document.querySelector('#selected-size').textContent = selectedSize;
    document.querySelector('#detail-price').textContent = formatPrice(currentProduct.prices[selectedSize]);
    addButton.disabled = false;
    addButton.textContent = 'Thêm vào giỏ hàng';
  }));
  addButton.addEventListener('click', () => {
    if (!selectedSize) return;
    const existing = cart.find(item => item.id === currentProduct.id && item.size === selectedSize);
    if (existing) existing.quantity = Math.min(99, existing.quantity + 1);
    else cart.push({ id: currentProduct.id, size: selectedSize, quantity: 1 });
    saveCart(); renderCart();
    document.querySelector('#cart-toggle').click();
  });
}
