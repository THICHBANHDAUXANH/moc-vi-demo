const products = [
  { id: 'tra-trung-du-dac-biet', name: 'Trà Trung Du đặc biệt', category: 'che', type: 'Trà', packaging: 'Hộp', image: './products/tra-trung-du-dac-biet.svg' },
  { id: 'tra-trung-du-truyen-thong', name: 'Trà Trung Du truyền thống', category: 'che', type: 'Trà', packaging: 'Hộp', image: './products/tra-trung-du-truyen-thong.svg' },
  { id: 'che-thai-nguyen', name: 'Chè Thái Nguyên', category: 'che', type: 'Chè', packaging: 'Gói hút chân không', image: './products/che-thai-nguyen.svg' },
  { id: 'cacao-daklak', name: 'Cacao Đắk Lắk', category: 'cacao', type: 'Cacao', packaging: 'Đang cập nhật', image: './products/cacao-daklak.svg' },
  { id: 'ca-phe', name: 'Cà phê Robusta Đắk Lắk', category: 'caphe', type: 'Robusta', packaging: 'Đã xay', image: './products/ca-phe.svg', prices: { '1 kg': 200000 } },
];
const productById = Object.fromEntries(products.map(product => [product.id, product]));
const page = document.body.dataset.page;
const requestedProduct = new URLSearchParams(location.search).get('id');
const currentProduct = productById[requestedProduct];
const productUrl = product => `./product.html?id=${encodeURIComponent(product.id)}`;
const categories = {
  che: { name: 'Chè', url: './che.html', index: '01', headingClass: 'tea-heading', description: 'Những dòng trà và chè Việt trong danh mục hiện tại. Chọn sản phẩm để xem quy cách 100 g, 200 g và 1 kg.' },
  cacao: { name: 'Cacao', url: './cacao.html', index: '02', headingClass: 'cacao-heading', description: 'Cacao Đắk Lắk với các lựa chọn 200 g, 500 g và 1 kg. Giá bán đang được cập nhật.' },
  caphe: { name: 'Cà phê', url: './caphe.html', index: '03', headingClass: 'coffee-heading', description: 'Robusta Đắk Lắk đã xay, có quy cách 200 g, 500 g và 1 kg. Giá 1 kg: 200.000đ.' },
};
const categoryUrl = category => categories[category].url;
const categoryName = category => categories[category].name;
const formatPrice = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const icon = {
  bag: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1 12H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>',
};

function header() {
  return `<div class="announcement">Mộc Miên · Chè, cacao &amp; cà phê <span>✦</span> Bản demo giao diện, chưa nhận đơn hàng</div>
    <header class="header">
      <button class="mobile-menu icon-button" id="menu-toggle" aria-label="Mở menu" aria-expanded="false" aria-controls="main-nav">${icon.menu}</button>
      <a href="./index.html" class="brand"><img class="brand-logo" src="./moc-mien-logo.png" alt="Mộc Miên"></a>
      <nav id="main-nav" class="nav" aria-label="Danh mục chính">${Object.entries(categories).map(([key, item]) => `<a href="${item.url}" ${page === key || currentProduct?.category === key ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}<a href="./index.html#story">Câu chuyện</a></nav>
      <button class="cart-trigger icon-button" id="cart-toggle" aria-label="Xem giỏ hàng demo" aria-haspopup="dialog">${icon.bag}<span class="cart-count" id="cart-count">0</span></button>
    </header>`;
}

function footer() {
  return `<footer id="footer"><div><a href="./index.html" class="brand"><img class="brand-logo" src="./moc-mien-logo.png" alt="Mộc Miên"></a><p>Chè, cacao và cà phê cho những phút giây an yên.</p></div><div><strong>Khám phá</strong>${Object.values(categories).map(item => `<a href="${item.url}">${item.name}</a>`).join('')}<a href="./index.html#story">Câu chuyện</a></div><div><strong>Thông tin</strong><span>Thông tin sản phẩm đang được hoàn thiện.</span></div><small>© 2026 Mộc Miên · Bản xem trước giao diện, chưa nhận đơn hàng</small></footer>`;
}

function cartMarkup() {
  return `<div class="drawer-overlay" id="cart-overlay" hidden><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div class="drawer-head"><h2 id="cart-title">Giỏ hàng demo <span id="drawer-count">(0)</span></h2><button class="icon-button" id="cart-close" aria-label="Đóng giỏ hàng">${icon.close}</button></div><div class="cart-items" id="cart-items"></div><p class="empty-cart" id="empty-cart">Giỏ hàng của bạn đang trống. Khám phá chè, cacao và cà phê nhé.</p><p class="cart-disclaimer">Giỏ hàng chỉ dùng để xem thử giao diện. Trang chưa nhận đơn hàng hoặc thanh toán; giá chưa có ở một số quy cách.</p></aside></div>`;
}

function home() {
  return `<section class="hero" id="home"><div class="hero-copy"><span class="eyebrow">— TỪ ĐẤT VIỆT, ĐẾN GÓC BÌNH YÊN</span><h1>Chút mộc mạc<br><em>trong từng vị.</em></h1><p>Chè thơm, cacao đậm và cà phê cho những phút giây chậm lại.</p><a href="#collections" class="primary-link">Khám phá danh mục <span aria-hidden="true">→</span></a><div class="hero-foot"><span>01 / 03</span><div></div><span>CHÈ · CACAO · CÀ PHÊ</span></div></div><div class="hero-art"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><span class="hero-art-label">NATURALLY<br>VIETNAMESE</span><img src="./products/tra-trung-du-dac-biet.svg" alt="Minh họa hộp trà Trung Du"><div class="floating-note">✦ Thức quà từ thiên nhiên</div></div></section>
    <section class="collection collection-landing" id="collections"><div class="section-heading"><div><span class="eyebrow">BA DÒNG SẢN PHẨM</span><h2>Chọn <em>hương vị của bạn</em></h2></div><p>Khám phá từng danh mục và chọn quy cách phù hợp trên trang sản phẩm.</p></div><div class="category-grid"><a class="category-tile tea-tile" href="./che.html"><div class="category-art"><img src="./products/tra-trung-du-dac-biet.svg" alt="Minh họa trà Trung Du"></div><div class="category-copy"><span>01 / CHÈ VIỆT</span><h3>Chè</h3><p>Trà Trung Du và chè Thái Nguyên</p><b aria-hidden="true">↗</b></div></a><a class="category-tile cacao-tile" href="./cacao.html"><div class="category-art"><img src="./products/cacao-daklak.svg" alt="Minh họa cacao Đắk Lắk"></div><div class="category-copy"><span>02 / CACAO VIỆT</span><h3>Cacao</h3><p>Cacao Đắk Lắk</p><b aria-hidden="true">↗</b></div></a><a class="category-tile coffee-tile" href="./caphe.html"><div class="category-art"><img src="./products/ca-phe.svg" alt="Minh họa cà phê Robusta Đắk Lắk đã xay"></div><div class="category-copy"><span>03 / CÀ PHÊ</span><h3>Cà phê</h3><p>Robusta Đắk Lắk đã xay · 1 kg 200.000đ</p><b aria-hidden="true">↗</b></div></a></div><p class="sample-note">Đây là bản xem trước giao diện. Giá bán ở các quy cách chưa ghi rõ đang được cập nhật.</p></section>
    <section class="story" id="story"><div class="story-art"><span class="story-sun"></span><span class="story-hill hill-one"></span><span class="story-hill hill-two"></span><span class="story-word">mộc miên</span></div><div class="story-copy"><span class="eyebrow">CÂU CHUYỆN CỦA CHÚNG MÌNH</span><h2>Từ vùng đất lành,<br>đến <em>tách trà của bạn.</em></h2><p>Chúng mình tin một thức uống ngon bắt đầu từ nguyên liệu tốt và sự trân trọng dành cho người làm ra nó. Mộc Miên là lời mời dành một khoảng lặng nhỏ trong ngày để thưởng thức chè, cacao và cà phê Việt.</p><a href="./che.html" class="text-link">Khám phá chè Việt <span aria-hidden="true">→</span></a></div></section>`;
}

function productCard(product, index) {
  const tone = product.category === 'caphe' ? 'coffee-tone' : `tone-${index % 4}`;
  const label = product.prices ? `1 KG · ${formatPrice(product.prices['1 kg'])}` : product.category === 'che' ? product.packaging : 'QUY CÁCH 200 G · 500 G · 1 KG';
  return `<article class="catalog-card"><a href="${productUrl(product)}" aria-label="Xem ${product.name}"><div class="catalog-image ${tone}"><img src="${product.image}" alt="Minh họa ${product.name}"></div><div class="catalog-meta"><span>${product.type.toUpperCase()}</span><span>${label}</span></div><h2>${product.name}</h2><p>Chọn sản phẩm <span aria-hidden="true">↗</span></p></a></article>`;
}

function category(category) {
  const info = categories[category];
  const items = products.filter(product => product.category === category);
  return `<section class="catalog-hero ${info.headingClass}"><div><span class="eyebrow">MỘC MIÊN / DANH MỤC</span><h1>${info.name}</h1><p>${info.description}</p></div><span class="catalog-index">${info.index} / 03</span></section><section class="catalog-section"><div class="catalog-tools"><span>${String(items.length).padStart(2, '0')} sản phẩm</span><nav aria-label="Chuyển danh mục">${Object.entries(categories).map(([key, item]) => `<a href="${item.url}" ${key === category ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}</nav></div><div class="catalog-grid">${items.map(productCard).join('')}</div><p class="sample-note">Hình minh họa và thông tin trên trang dùng để xem trước giao diện. Giá bán chưa có ở một số quy cách.</p></section>`;
}

function detail(product) {
  if (!product) return `<section class="missing-product"><h1>Không tìm thấy sản phẩm</h1><a href="./che.html" class="text-link">Xem danh mục Chè →</a></section>`;
  document.title = `${product.name} — Mộc Miên (Demo)`;
  const sizes = product.category === 'che' ? [['100 g', '1 lạng'], ['200 g', '2 lạng'], ['1 kg', '1 cân']] : [['200 g', '2 lạng'], ['500 g', '5 lạng'], ['1 kg', '1 cân']];
  const price = product.prices ? `1 kg · ${formatPrice(product.prices['1 kg'])}` : 'Giá bán đang cập nhật';
  const facts = product.category === 'che' ? `Dòng: ${product.type}. Bao bì 1 kg trong bảng sản phẩm: ${product.packaging}. Quy cách 100 g và 200 g đang được hoàn thiện.` : 'Thông tin bao bì và mô tả chi tiết đang được cập nhật.';
  return `<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="./index.html">Trang chủ</a><span>/</span><a href="${categoryUrl(product.category)}">${categoryName(product.category)}</a><span>/</span><span aria-current="page">${product.name}</span></nav><section class="detail-layout"><div class="detail-visual"><img src="${product.image}" alt="Minh họa ${product.name}"></div><div class="detail-info"><span class="eyebrow">MỘC MIÊN / ${categoryName(product.category).toUpperCase()}</span><h1>${product.name}</h1><p class="detail-subtitle">${product.type} Việt${product.packaging === 'Đang cập nhật' ? '' : ` · ${product.packaging}`}</p><p class="detail-price" id="detail-price">${price}</p><div class="detail-divider"></div><div class="variant-block"><div class="variant-heading"><strong>Chọn quy cách</strong><span id="selected-size">Chưa chọn</span></div><div class="variant-options" role="group" aria-label="Quy cách đóng gói">${sizes.map(([weight, label]) => `<button type="button" data-size="${weight}" aria-pressed="false">${weight} <small>${label}</small></button>`).join('')}</div></div><button class="detail-add" id="add-to-cart" disabled>Chọn quy cách để thêm vào giỏ demo</button><p class="detail-note">${product.prices ? 'Giá 200 g và 500 g đang cập nhật.' : 'Giá bán của từng quy cách đang được cập nhật.'} Trang chưa nhận đơn hàng.</p><div class="detail-facts"><details open><summary>Thông tin sản phẩm</summary><p>${facts}</p></details><details><summary>Giao hàng và đặt mua</summary><p>Đây là bản xem trước giao diện. Chức năng nhận đơn và thanh toán chưa hoạt động.</p></details></div></div></section><section class="detail-more"><div><span class="eyebrow">KHÁM PHÁ THÊM</span><h2>${categoryName(product.category)} Mộc Miên</h2></div><a href="${categoryUrl(product.category)}" class="text-link">Xem toàn bộ danh mục <span aria-hidden="true">→</span></a></section>`;
}

const content = page === 'home' ? home() : categories[page] ? category(page) : detail(currentProduct);
document.querySelector('#app').innerHTML = `${header()}<main>${content}</main>${footer()}${cartMarkup()}`;

const menu = document.querySelector('#main-nav');
const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('nav-open'); menuToggle.setAttribute('aria-expanded', String(open)); });

const storageKey = 'moc-mien-demo-cart';
let cart;
try { const stored = JSON.parse(sessionStorage.getItem(storageKey) || '[]'); cart = Array.isArray(stored) ? stored.filter(item => productById[item.id] && typeof item.size === 'string') : []; } catch { cart = []; }
const overlay = document.querySelector('#cart-overlay');
const saveCart = () => sessionStorage.setItem(storageKey, JSON.stringify(cart));
const renderCart = () => {
  document.querySelector('#cart-count').textContent = String(cart.length);
  document.querySelector('#drawer-count').textContent = `(${cart.length})`;
  document.querySelector('#cart-items').innerHTML = cart.map((item, position) => {
    const product = productById[item.id];
    const price = product.prices?.[item.size];
    return `<div class="cart-item"><img src="${product.image}" alt=""><div><strong>${product.name}</strong><span>${item.size}${price ? ` · ${formatPrice(price)}` : ' · Giá đang cập nhật'}</span><button type="button" data-remove="${position}">Xóa</button></div></div>`;
  }).join('');
  document.querySelector('#empty-cart').hidden = cart.length > 0;
};
const closeCart = () => { overlay.hidden = true; document.body.style.overflow = ''; document.querySelector('#cart-toggle').focus(); };
document.querySelector('#cart-toggle').addEventListener('click', () => { renderCart(); overlay.hidden = false; document.body.style.overflow = 'hidden'; document.querySelector('#cart-close').focus(); });
document.querySelector('#cart-close').addEventListener('click', closeCart);
overlay.addEventListener('click', event => { if (event.target === overlay) closeCart(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !overlay.hidden) closeCart(); });
document.querySelector('#cart-items').addEventListener('click', event => { const button = event.target.closest('[data-remove]'); if (button) { cart.splice(Number(button.dataset.remove), 1); saveCart(); renderCart(); } });
renderCart();

if (page === 'product' && currentProduct) {
  let selectedSize = '';
  const addButton = document.querySelector('#add-to-cart');
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => {
    selectedSize = button.dataset.size;
    document.querySelectorAll('[data-size]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    document.querySelector('#selected-size').textContent = selectedSize;
    const selectedPrice = currentProduct.prices?.[selectedSize];
    document.querySelector('#detail-price').textContent = selectedPrice ? formatPrice(selectedPrice) : 'Giá bán đang cập nhật';
    addButton.disabled = false;
    addButton.textContent = 'Thêm vào giỏ demo';
  }));
  addButton.addEventListener('click', () => {
    if (!selectedSize) return;
    cart.push({ id: currentProduct.id, size: selectedSize });
    saveCart(); renderCart();
    document.querySelector('#cart-toggle').click();
  });
}
