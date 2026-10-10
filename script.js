const products = [
  { id: 'tra-trung-du-dac-biet', name: 'Trà Trung Du đặc biệt', category: 'che', type: 'Trà', packaging: 'Hộp', image: './products/tra-trung-du-dac-biet-photo-demo.png', photo: true, prices: { '100 g': 99000, '200 g': 189000, '1 kg': 790000 }, skus: { '100 g': 'TRA-TD-DB-100G', '200 g': 'TRA-TD-DB-200G', '1 kg': 'TRA-TD-DB-1KG' } },
  { id: 'tra-trung-du-truyen-thong', name: 'Trà Trung Du truyền thống', category: 'che', type: 'Trà', packaging: 'Hộp', image: './products/tra-trung-du-truyen-thong-photo-demo.png', photo: true, prices: { '100 g': 89000, '200 g': 169000, '1 kg': 690000 }, skus: { '100 g': 'TRA-TD-TT-100G', '200 g': 'TRA-TD-TT-200G', '1 kg': 'TRA-TD-TT-1KG' } },
  { id: 'che-thai-nguyen', name: 'Chè Thái Nguyên', category: 'che', type: 'Chè', packaging: 'Gói hút chân không', image: './products/che-thai-nguyen-photo-demo.png', photo: true, prices: { '100 g': 59000, '200 g': 109000, '1 kg': 349000 }, skus: { '100 g': 'CHE-TN-100G', '200 g': 'CHE-TN-200G', '1 kg': 'CHE-TN-1KG' } },
  { id: 'cacao-gia-lai', name: 'Cacao Gia Lai', category: 'cacao', type: 'Cacao', packaging: '', image: './products/cacao-gia-lai-demo.png', photo: true, prices: { '200 g': 129000, '500 g': 259000, '1 kg': 449000 }, skus: { '200 g': 'CACAO-GL-200G', '500 g': 'CACAO-GL-500G', '1 kg': 'CACAO-GL-1KG' } },
  { id: 'cacao-daklak-thuong', name: 'Cacao Đắk Lắk · Thường', category: 'cacao', type: 'Cacao', packaging: 'Thường', image: './products/cacao-daklak-thuong-demo.png?v=2', photo: true, prices: { '200 g': 69000, '500 g': 139000, '1 kg': 239000 }, skus: { '200 g': 'CACAO-DL-T-200G', '500 g': 'CACAO-DL-T-500G', '1 kg': 'CACAO-DL-T-1KG' } },
  { id: 'cacao-daklak-cao-cap', name: 'Cacao Đắk Lắk · Cao cấp', category: 'cacao', type: 'Cacao', packaging: 'Cao cấp', image: './products/cacao-daklak-cao-cap-demo.png', photo: true, prices: { '200 g': 129000, '500 g': 259000, '1 kg': 449000 }, skus: { '200 g': 'CACAO-DL-CC-200G', '500 g': 'CACAO-DL-CC-500G', '1 kg': 'CACAO-DL-CC-1KG' } },
  { id: 'ca-phe', name: 'Cà phê xay Gia Lai', category: 'caphe', type: 'Cà phê', packaging: 'Đã xay', image: './products/caphe-photo-demo.png?v=2', photo: true, prices: { '200 g': 99000, '500 g': 199000, '1 kg': 349000 }, skus: { '200 g': 'CAPHE-GL-200G', '500 g': 'CAPHE-GL-500G', '1 kg': 'CAPHE-GL-1KG' } },
];
const productById = Object.fromEntries(products.map(product => [product.id, product]));
const page = document.body.dataset.page;
const requestedProduct = new URLSearchParams(location.search).get('id');
const currentProduct = productById[requestedProduct];
const productUrl = product => `./product.html?id=${encodeURIComponent(product.id)}`;
const categories = {
  che: { name: 'Chè', url: './che.html', index: '01', headingClass: 'tea-heading', description: 'Trà Trung Du và chè Thái Nguyên. Chọn loại chè hợp gu của bạn.' },
  cacao: { name: 'Cacao', url: './cacao.html', index: '02', headingClass: 'cacao-heading', description: 'Khám phá cacao Gia Lai và hai phân khúc cacao Đắk Lắk: Thường, Cao cấp.' },
  caphe: { name: 'Cà phê', url: './caphe.html', index: '03', headingClass: 'coffee-heading', description: 'Cà phê xay Gia Lai cho ly cà phê mỗi ngày.' },
};
const categoryUrl = category => categories[category].url;
const categoryName = category => categories[category].name;
const formatPrice = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const shopPhone = '0964522093';
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const icon = {
  bag: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1 12H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>',
  user: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6"/></svg>',
};

function header() {
  return `<div class="announcement">Mộc Miên · Chè, cacao &amp; cà phê <span>✦</span> Đặt hàng qua Zalo ${shopPhone}</div>
    <header class="header">
      <button class="mobile-menu icon-button" id="menu-toggle" aria-label="Mở menu" aria-expanded="false" aria-controls="main-nav">${icon.menu}</button>
      <a href="./index.html" class="brand"><img class="brand-logo" src="./moc-mien-logo.png" alt="Mộc Miên" decoding="async"></a>
      <nav id="main-nav" class="nav" aria-label="Danh mục chính">${Object.entries(categories).map(([key, item]) => `<a href="${item.url}" ${page === key || currentProduct?.category === key ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}<a href="./index.html#story">Câu chuyện</a></nav>
      <div class="header-actions">
        <button class="account-trigger icon-button" id="account-toggle" aria-label="Đăng nhập hoặc đăng ký" aria-haspopup="dialog">${icon.user}<span id="account-label">Đăng nhập</span></button>
        <button class="cart-trigger icon-button" id="cart-toggle" aria-label="Xem giỏ hàng" aria-haspopup="dialog">${icon.bag}<span class="cart-count" id="cart-count">0</span></button>
      </div>
    </header>`;
}

function footer() {
  return `<footer id="footer"><div><a href="./index.html" class="brand"><img class="brand-logo" src="./moc-mien-logo.png" alt="Mộc Miên" decoding="async"></a><p>Chè, cacao và cà phê cho những phút giây an yên.</p></div><div><strong>Khám phá</strong>${Object.values(categories).map(item => `<a href="${item.url}">${item.name}</a>`).join('')}<a href="./index.html#story">Câu chuyện</a></div><div><strong>Liên hệ đặt hàng</strong><a href="https://zalo.me/${shopPhone}" target="_blank" rel="noopener">Nhắn Mộc Miên trên Zalo</a><a href="tel:${shopPhone}">${shopPhone}</a><span>Thanh toán COD hoặc chuyển khoản khi xác nhận đơn.</span></div><small>© 2026 Mộc Miên</small></footer>`;
}

function cartMarkup() {
  return `<div class="drawer-overlay" id="cart-overlay" hidden><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div class="drawer-head"><h2 id="cart-title">Giỏ hàng <span id="drawer-count">(0)</span></h2><button class="icon-button" id="cart-close" aria-label="Đóng giỏ hàng">${icon.close}</button></div><div class="cart-items" id="cart-items"></div><p class="empty-cart" id="empty-cart">Giỏ hàng đang trống. Chọn sản phẩm bạn yêu thích nhé.</p><div class="cart-checkout" id="cart-checkout" hidden><div class="cart-summary" id="cart-summary"></div><form id="order-form"><h3>Thông tin nhận hàng</h3><label>Họ và tên<input name="customerName" autocomplete="name" required maxlength="80"></label><label>Số điện thoại<input name="customerPhone" autocomplete="tel" inputmode="tel" required pattern="[0-9+ .-]{9,15}"></label><label>Địa chỉ nhận hàng<textarea name="customerAddress" autocomplete="street-address" required rows="2" maxlength="240"></textarea></label><fieldset class="payment-methods"><legend>Phương thức thanh toán</legend><label class="payment-option"><input type="radio" name="payment" value="cod" checked><span><strong>Thanh toán khi nhận hàng (COD)</strong><small>Thanh toán khi đơn được giao tới bạn.</small></span></label><label class="payment-option"><input type="radio" name="payment" value="bank_transfer"><span><strong>Chuyển khoản ngân hàng</strong><small>Nhận hướng dẫn hoặc mã QR sau khi đơn được tạo.</small></span></label></fieldset><p class="payment-help" id="payment-help"></p><label>Ghi chú (nếu có)<textarea name="customerNote" rows="2" maxlength="300"></textarea></label><p class="checkout-hint">Cacao Đắk Lắk: ship 23.000đ, miễn từ 3 kg. Phí ship mặt hàng khác được shop xác nhận qua Zalo.</p><button class="order-submit" type="submit">Xác nhận đặt hàng</button><div class="order-handoff" id="order-handoff" hidden><div class="order-result" id="order-result"></div><label>Nội dung đơn hàng<textarea id="order-message" rows="8" readonly></textarea></label><button type="button" id="copy-order">Sao chép nội dung</button><a href="https://zalo.me/${shopPhone}" target="_blank" rel="noopener" class="zalo-checkout-link">Mở Zalo để gửi đơn ↗</a><p>Dán nội dung vừa sao chép vào cuộc trò chuyện với Mộc Miên để xác nhận đơn.</p></div><p class="checkout-status" id="checkout-status" role="status" aria-live="polite"></p></form></div></aside></div>`;
}

function cacaoFeature() {
  return `<div class="category-tile cacao-tile"><div class="cacao-region-pair"><a href="${productUrl(productById['cacao-gia-lai'])}" aria-label="Xem Cacao Gia Lai"><img src="./products/cacao-gia-lai-demo.png" alt="Hũ cacao Gia Lai" loading="lazy" decoding="async" fetchpriority="low"><span>GIA LAI</span></a><a href="${productUrl(productById['cacao-daklak-thuong'])}" aria-label="Xem Cacao Đắk Lắk"><img src="./products/cacao-daklak-thuong-demo.png?v=2" alt="Hũ cacao Đắk Lắk loại Thường" loading="lazy" decoding="async" fetchpriority="low"><span>ĐẮK LẮK</span></a></div><div class="category-copy"><span>02 / HAI VÙNG CACAO</span><h3><a href="./cacao.html">Cacao</a></h3><p>Gia Lai · Đắk Lắk Thường &amp; Cao cấp</p><a class="category-more" href="./cacao.html" aria-label="Xem tất cả cacao">↗</a></div></div>`;
}

function home() {
  return `<section class="hero" id="home"><div class="hero-copy"><span class="eyebrow">— TỪ ĐẤT VIỆT, ĐẾN GÓC BÌNH YÊN</span><h1>Chút mộc mạc<br><em>trong từng vị.</em></h1><p>Chè thơm, cacao đậm và cà phê cho những phút giây chậm lại.</p><a href="#collections" class="primary-link">Khám phá danh mục <span aria-hidden="true">→</span></a><div class="hero-foot"><span>01 / 03</span><div></div><span>CHÈ · CÀ PHÊ · CACAO</span></div></div><div class="hero-art" aria-label="Ảnh danh mục chè, cà phê và cacao"><div class="hero-slides"><a class="hero-slide is-active" href="./che.html" aria-label="Khám phá chè"><img src="./products/che-thai-nguyen-photo-demo.png" alt="Chè Thái Nguyên" loading="eager" decoding="async" fetchpriority="high"></a><a class="hero-slide" href="./caphe.html" aria-label="Khám phá cà phê"><img data-src="./products/caphe-photo-demo.png?v=2" alt="Cà phê Gia Lai" decoding="async"></a><a class="hero-slide" href="./cacao.html" aria-label="Khám phá cacao"><span class="cacao-hero-pair"><img data-src="./products/cacao-gia-lai-demo.png" alt="Cacao Gia Lai" decoding="async"><img data-src="./products/cacao-daklak-thuong-demo.png?v=2" alt="Cacao Đắk Lắk" decoding="async"></span></a></div><div class="hero-slide-caption"><span id="hero-slide-count">01 / 03</span><strong id="hero-slide-name">Chè Việt</strong><span>Khám phá sản phẩm</span></div><div class="hero-slide-controls" aria-label="Điều khiển ảnh danh mục"><button type="button" class="hero-arrow" id="hero-prev" aria-label="Ảnh trước">‹</button><div class="hero-dots"><button type="button" class="hero-dot is-active" data-slide="0" aria-label="Xem ảnh chè" aria-current="true"></button><button type="button" class="hero-dot" data-slide="1" aria-label="Xem ảnh cà phê"></button><button type="button" class="hero-dot" data-slide="2" aria-label="Xem ảnh cacao"></button></div><button type="button" class="hero-arrow" id="hero-next" aria-label="Ảnh tiếp theo">›</button></div></div></section>
    <section class="collection collection-landing" id="collections"><div class="section-heading"><div><span class="eyebrow">BA DÒNG SẢN PHẨM</span><h2>Chọn <em>hương vị của bạn</em></h2></div><p>Xem sản phẩm, khối lượng và giá trong từng danh mục.</p></div><div class="category-grid"><a class="category-tile tea-tile" href="./che.html"><div class="category-art"><img src="./products/che-thai-nguyen-photo-demo.png" alt="Chè Thái Nguyên" loading="lazy" decoding="async" fetchpriority="low"></div><div class="category-copy"><span>01 / CHÈ VIỆT</span><h3>Chè</h3><p>Trà Trung Du và chè Thái Nguyên</p><b aria-hidden="true">↗</b></div></a>${cacaoFeature()}<a class="category-tile coffee-tile" href="./caphe.html"><div class="category-art"><img src="./products/caphe-photo-demo.png?v=2" alt="Cà phê xay Gia Lai" loading="lazy" decoding="async" fetchpriority="low"></div><div class="category-copy"><span>03 / CÀ PHÊ</span><h3>Cà phê</h3><p>Cà phê xay Gia Lai</p><b aria-hidden="true">↗</b></div></a></div></section>
    <section class="story-shell" id="story" aria-labelledby="story-title">
      <div class="story-heading"><div><span class="eyebrow">CÂU CHUYỆN MỘC MIÊN</span><h2 id="story-title">Ba vùng vị, <em>ba câu chuyện.</em></h2></div><p>Trượt để khám phá câu chuyện của chè, cacao và cà phê Việt cùng những điểm nổi bật tự nhiên của từng thức uống.</p></div>
      <div class="story-slider">
        <article class="story-panel is-active" data-story-slide="0" aria-hidden="false">
          <div class="story-media"><img src="./products/che-thai-nguyen-photo-demo.png" alt="Chè Thái Nguyên Mộc Miên" loading="lazy" decoding="async" fetchpriority="low"><span class="story-number">01 / CHÈ</span></div>
          <div class="story-copy"><span class="eyebrow">CÂU CHUYỆN CỦA CHÈ</span><h2>Từ vùng đồi đến <em>tách trà bình yên.</em></h2><p>Những búp chè mang hương thơm thanh và vị dịu, gợi lại nhịp sống chậm của vùng trung du. Mộc Miên muốn giữ nét mộc mạc ấy trong một tách trà dễ uống mỗi ngày.</p><ul class="story-benefits"><li><strong>Thanh vị</strong><span>Dễ thưởng thức trong nhiều thời điểm trong ngày.</span></li><li><strong>Chất chống oxy hóa tự nhiên</strong><span>Trà tự nhiên chứa các hợp chất polyphenol.</span></li><li><strong>Một khoảng nghỉ nhẹ nhàng</strong><span>Phù hợp cho thói quen thưởng trà và thư giãn.</span></li></ul><a href="./che.html" class="text-link">Khám phá chè Việt <span aria-hidden="true">→</span></a></div>
        </article>
        <article class="story-panel" data-story-slide="1" aria-hidden="true">
          <div class="story-media"><img data-src="./products/cacao-gia-lai-demo.png" alt="Cacao Mộc Miên" decoding="async"><span class="story-number">02 / CACAO</span></div>
          <div class="story-copy"><span class="eyebrow">CÂU CHUYỆN CỦA CACAO</span><h2>Từ nắng gió cao nguyên đến <em>ly cacao đậm vị.</em></h2><p>Cacao mang nét ấm áp rất riêng: đậm, thơm và tròn vị. Từ nguồn nguyên liệu Việt, Mộc Miên giữ sự cân bằng để cacao có thể đi cùng buổi sáng cần năng lượng hay buổi tối muốn chậm lại.</p><ul class="story-benefits"><li><strong>Đậm vị, linh hoạt</strong><span>Dùng nóng, lạnh hoặc kết hợp trong nhiều công thức.</span></li><li><strong>Hợp chất chống oxy hóa tự nhiên</strong><span>Cacao tự nhiên chứa flavanol và polyphenol.</span></li><li><strong>Khoảnh khắc dễ chịu</strong><span>Hương cacao phù hợp cho một thức uống ấm và thư thái.</span></li></ul><a href="./cacao.html" class="text-link">Khám phá cacao <span aria-hidden="true">→</span></a></div>
        </article>
        <article class="story-panel" data-story-slide="2" aria-hidden="true">
          <div class="story-media"><img data-src="./products/coffee-cherries-story-demo.png" alt="Cà phê Gia Lai Mộc Miên" decoding="async"><span class="story-number">03 / CÀ PHÊ</span></div>
          <div class="story-copy"><span class="eyebrow">CÂU CHUYỆN CỦA CÀ PHÊ</span><h2>Từ cao nguyên Gia Lai đến <em>tách cà phê đậm hương.</em></h2><p>Cà phê Mộc Miên mang tinh thần của cao nguyên: rõ hương, đậm vị và đầy sức sống. Một tách cà phê chỉn chu cho những buổi sáng cần bắt nhịp và những giờ làm việc cần tập trung.</p><ul class="story-benefits"><li><strong>Hương thơm rõ nét</strong><span>Phong vị đậm, hợp gu cà phê truyền thống.</span></li><li><strong>Caffeine tự nhiên</strong><span>Có thể hỗ trợ sự tỉnh táo khi dùng ở mức phù hợp.</span></li><li><strong>Nghi thức khởi đầu ngày mới</strong><span>Một khoảng thời gian nhỏ để tập trung trước ngày dài.</span></li></ul><a href="./caphe.html" class="text-link">Khám phá cà phê <span aria-hidden="true">→</span></a></div>
        </article>
        <div class="story-controls" aria-label="Điều khiển câu chuyện"><button type="button" class="story-arrow" id="story-prev" aria-label="Câu chuyện trước">‹</button><div class="story-dots"><button type="button" class="story-dot is-active" data-story-target="0" aria-label="Câu chuyện chè" aria-current="true"></button><button type="button" class="story-dot" data-story-target="1" aria-label="Câu chuyện cacao"></button><button type="button" class="story-dot" data-story-target="2" aria-label="Câu chuyện cà phê"></button></div><button type="button" class="story-arrow" id="story-next" aria-label="Câu chuyện tiếp theo">›</button></div>
      </div>
      <p class="story-health-note">Thông tin về thành phần và sự tỉnh táo chỉ mang tính tham khảo chung, không thay thế tư vấn sức khỏe.</p>
    </section>`;
}

function productCard(product, index) {
  const tone = product.category === 'caphe' ? 'coffee-tone' : `tone-${index % 4}`;
  const fromPrice = Math.min(...Object.values(product.prices));
  return `<article class="catalog-card"><a href="${productUrl(product)}" aria-label="Xem ${product.name}"><div class="catalog-image ${tone}"><img src="${product.image}" alt="Hình tham khảo ${product.name}" loading="lazy" decoding="async" fetchpriority="low"></div><div class="catalog-meta"><span>${product.type.toUpperCase()}</span><span>TỪ ${formatPrice(fromPrice)}</span></div><h2>${product.name}</h2><p>Xem giá theo khối lượng <span aria-hidden="true">↗</span></p></a></article>`;
}

function category(category) {
  const info = categories[category];
  const items = products.filter(product => product.category === category);
  return `<section class="catalog-hero ${info.headingClass}"><div><span class="eyebrow">MỘC MIÊN / DANH MỤC</span><h1>${info.name}</h1><p>${info.description}</p></div><span class="catalog-index">${info.index} / 03</span></section><section class="catalog-section"><div class="catalog-tools"><span>${String(items.length).padStart(2, '0')} sản phẩm</span><nav aria-label="Chuyển danh mục">${Object.entries(categories).map(([key, item]) => `<a href="${item.url}" ${key === category ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}</nav></div><div class="catalog-grid">${items.map(productCard).join('')}</div><p class="sample-note">Chọn sản phẩm để xem giá theo từng khối lượng. Cần tư vấn thêm? <a href="https://zalo.me/${shopPhone}" target="_blank" rel="noopener">Nhắn Mộc Miên qua Zalo ↗</a></p></section>`;
}

function detail(product) {
  if (!product) return `<section class="missing-product"><h1>Không tìm thấy sản phẩm</h1><a href="./che.html" class="text-link">Xem danh mục Chè →</a></section>`;
  document.title = `${product.name} — Mộc Miên`;
  const sizes = product.category === 'che' ? [['100 g', '1 lạng'], ['200 g', '2 lạng'], ['1 kg', '1 cân']] : [['200 g', '2 lạng'], ['500 g', '5 lạng'], ['1 kg', '1 cân']];
  const startingPrice = Math.min(...Object.values(product.prices));
  return `<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="./index.html">Trang chủ</a><span>/</span><a href="${categoryUrl(product.category)}">${categoryName(product.category)}</a><span>/</span><span aria-current="page">${product.name}</span></nav>
    <section class="detail-layout"><div class="detail-visual"><img src="${product.image}" alt="Hình tham khảo ${product.name}" loading="eager" decoding="async" fetchpriority="high"></div><div class="detail-info"><span class="eyebrow">MỘC MIÊN / ${categoryName(product.category).toUpperCase()}</span><h1>${product.name}</h1><p class="detail-subtitle">${product.type} Việt${product.packaging ? ` · ${product.packaging}` : ''}</p><p class="detail-price" id="detail-price">Từ ${formatPrice(startingPrice)}</p><div class="detail-divider"></div><div class="variant-block"><div class="variant-heading"><strong>Chọn khối lượng</strong><span id="selected-size">Chưa chọn</span></div><div class="variant-options" role="group" aria-label="Khối lượng đóng gói">${sizes.map(([weight, label]) => `<button type="button" data-size="${weight}" aria-pressed="false">${weight}<small>${label} · ${formatPrice(product.prices[weight])}</small></button>`).join('')}</div></div><button class="detail-add" id="add-to-cart" disabled>Chọn khối lượng để thêm vào giỏ hàng</button><p class="detail-note">${product.id.startsWith('cacao-daklak-') ? 'Ship cacao Đắk Lắk 23.000đ; miễn phí khi mua từ 3 kg cacao Đắk Lắk trong cùng đơn.' : 'Giá chưa gồm phí vận chuyển. Shop sẽ báo phí ship để bạn xác nhận trước khi gửi hàng.'}</p><div class="detail-facts"><details open><summary>Thông tin sản phẩm</summary><p>${product.name} · ${sizes.map(([weight]) => weight).join(', ')}. Hình ảnh bao bì chỉ mang tính tham khảo.</p></details><details><summary>Giao hàng &amp; thanh toán</summary><p>Đặt hàng qua Zalo ${shopPhone}. Chọn thanh toán khi nhận hàng (COD) hoặc chuyển khoản sau khi shop xác nhận đơn và phí giao hàng.</p></details></div></div></section><section class="detail-more"><div><span class="eyebrow">KHÁM PHÁ THÊM</span><h2>${categoryName(product.category)} Mộc Miên</h2></div><a href="${categoryUrl(product.category)}" class="text-link">Xem toàn bộ danh mục <span aria-hidden="true">→</span></a></section>`;
}

const content = page === 'home' ? home() : categories[page] ? category(page) : detail(currentProduct);
document.querySelector('#app').innerHTML = `${header()}<main>${content}</main>${footer()}${cartMarkup()}`;
window.MocMienAuth?.init();
if (page === 'product' && currentProduct?.photo) document.querySelector('.detail-visual').insertAdjacentHTML('beforeend', '<span class="photo-disclosure">Hình ảnh tham khảo · Bao bì có thể thay đổi</span>');
if (page === 'home') {
  const hero = document.querySelector('.hero-art');
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dots = [...hero.querySelectorAll('.hero-dot')];
  const slideNames = ['Chè Việt', 'Cà phê Gia Lai', 'Cacao Gia Lai · Đắk Lắk'];
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0;
  let slideTimer;
  const loadDeferredImages = root => {
    root.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  };
  const showSlide = index => {
    activeSlide = (index + slides.length) % slides.length;
    loadDeferredImages(slides[activeSlide]);
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

  const storyRoot = document.querySelector('#story');
  const storyPanels = [...storyRoot.querySelectorAll('[data-story-slide]')];
  const storyDots = [...storyRoot.querySelectorAll('[data-story-target]')];
  let activeStory = 0;
  let touchStartX = 0;

  const showStory = index => {
    activeStory = (index + storyPanels.length) % storyPanels.length;
    storyPanels.forEach((panel, position) => {
      const active = position === activeStory;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
      if (active) loadDeferredImages(panel);
    });
    storyDots.forEach((dot, position) => {
      const active = position === activeStory;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  document.querySelector('#story-prev').addEventListener('click', () => showStory(activeStory - 1));
  document.querySelector('#story-next').addEventListener('click', () => showStory(activeStory + 1));
  storyDots.forEach((dot, index) => dot.addEventListener('click', () => showStory(index)));
  storyRoot.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0]?.clientX || 0; }, { passive: true });
  storyRoot.addEventListener('touchend', event => {
    const delta = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(delta) > 45) showStory(activeStory + (delta < 0 ? 1 : -1));
  }, { passive: true });
  showStory(0);
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
const sizeGrams = { '200 g': 200, '500 g': 500, '1 kg': 1000 };
const daklakShipping = () => {
  const grams = cart.reduce((sum, item) => sum + (item.id.startsWith('cacao-daklak-') ? (sizeGrams[item.size] || 0) * item.quantity : 0), 0);
  return { grams, fee: grams >= 3000 || grams === 0 ? 0 : 23000 };
};
const renderCart = () => {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('#cart-count').textContent = String(itemCount);
  document.querySelector('#drawer-count').textContent = `(${itemCount})`;
  document.querySelector('#cart-items').innerHTML = cart.map((item, index) => {
    const product = productById[item.id];
    return `<div class="cart-item"><img src="${product.image}" alt="" loading="lazy" decoding="async"><div class="cart-item-info"><strong>${escapeHtml(product.name)}</strong><span>${item.size} · ${formatPrice(product.prices[item.size])}</span><div class="quantity-control"><button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Giảm số lượng ${escapeHtml(product.name)}">−</button><span>${item.quantity}</span><button type="button" data-cart-action="increase" data-index="${index}" aria-label="Tăng số lượng ${escapeHtml(product.name)}">+</button></div><button type="button" class="remove-item" data-cart-action="remove" data-index="${index}">Xóa</button></div><strong class="cart-line-total">${formatPrice(product.prices[item.size] * item.quantity)}</strong></div>`;
  }).join('');
  document.querySelector('#empty-cart').hidden = cart.length > 0;
  document.querySelector('#cart-checkout').hidden = cart.length === 0;
  const { grams, fee } = daklakShipping();
  document.querySelector('#cart-summary').innerHTML = `<span>Tạm tính (${itemCount} sản phẩm)</span><strong>${formatPrice(cartTotal())}</strong>${grams ? `<span>Ship cacao Đắk Lắk (${grams >= 3000 ? 'miễn từ 3 kg' : 'dưới 3 kg'})</span><strong>${fee ? formatPrice(fee) : 'Miễn phí'}</strong><span>Tổng tạm tính</span><strong>${formatPrice(cartTotal() + fee)}</strong>` : ''}`;
  document.querySelector('#order-handoff').hidden = true;
  document.querySelector('#checkout-status').textContent = '';
};
const closeCart = () => { overlay.hidden = true; document.body.style.overflow = ''; document.querySelector('#cart-toggle').focus(); };
document.querySelector('#cart-toggle').addEventListener('click', () => { renderCart(); updatePaymentHelp(); overlay.hidden = false; document.body.style.overflow = 'hidden'; document.querySelector('#cart-close').focus(); });
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
  saveCart(); renderCart(); updatePaymentHelp();
});
renderCart();

const orderForm = document.querySelector('#order-form');
const paymentHelp = document.querySelector('#payment-help');
const checkoutStatus = document.querySelector('#checkout-status');
const orderSubmit = orderForm.querySelector('.order-submit');
const updatePaymentHelp = () => {
  const method = new FormData(orderForm).get('payment') || 'cod';
  paymentHelp.textContent = cart.some(item => item.id.startsWith('cacao-'))
    ? 'Đơn có cacao sẽ được gửi qua Zalo để shop xác nhận và hướng dẫn thanh toán.'
    : window.MocMienCheckout?.paymentHelp(method) || '';
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
    ...(daklakShipping().grams ? [`Ship cacao Đắk Lắk: ${daklakShipping().fee ? formatPrice(daklakShipping().fee) : 'Miễn phí (từ 3 kg)'}`, `Tổng tạm tính: ${formatPrice(cartTotal() + daklakShipping().fee)}`] : []),
    ...(cart.some(item => !item.id.startsWith('cacao-daklak-')) ? ['Phí ship sản phẩm khác: shop xác nhận trước khi gửi'] : []),
    `Người nhận: ${String(data.get('customerName')).trim()}`,
    `Điện thoại: ${String(data.get('customerPhone')).trim()}`,
    `Địa chỉ: ${String(data.get('customerAddress')).trim()}`,
    `Thanh toán: ${paymentLabel}`,
    data.get('customerNote') ? `Ghi chú: ${String(data.get('customerNote')).trim()}` : '',
  ].filter(Boolean).join('\n');

  const handoff = document.querySelector('#order-handoff');
  const resultBox = document.querySelector('#order-result');
  const hasCacao = cart.some(item => item.id.startsWith('cacao-'));
  document.querySelector('#order-message').value = message;
  orderSubmit.disabled = true;
  orderSubmit.textContent = hasCacao ? 'Đang chuẩn bị đơn…' : 'Đang tạo đơn…';
  checkoutStatus.textContent = hasCacao ? 'Đang chuẩn bị nội dung gửi shop…' : 'Đang gửi thông tin đơn hàng…';

  try {
    const result = hasCacao
      ? { mode: 'manual', order: null }
      : await window.MocMienCheckout.createOrder(window.MocMienCheckout.buildOrderPayload({ cart, formData: data, catalog: productById }));

    if (result.mode === 'api') {
      const order = result.order || {};
      const orderId = order.id || order.order_id || order.code || order.order_code || '';
      const payment = order.payment || order.payment_info || {};
      const total = order.total ?? order.total_amount;
      const serverTotal = Number(total);
      // 1. Đổi lại câu thông báo
      const bankText = paymentMethod === 'bank_transfer'
        ? 'Đơn đã tạo. Vui lòng quét mã QR bên dưới để chuyển khoản.'
        : 'Đơn đã tạo với phương thức COD.';
        
      // 2. Tạo khối HTML chứa ảnh QR (Chỉ tạo ra nếu khách chọn chuyển khoản)
      const qrCodeHtml = paymentMethod === 'bank_transfer' 
        ? `<div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ccc;">
             <p style="font-weight: 600; color: #1a4a38; margin-bottom: 10px;">Quét mã để thanh toán</p>
             <img src="./qr-thanh-toan.png" alt="QR Thanh toán" style="width: 200px; height: 200px; border-radius: 8px; border: 1px solid #ddd; padding: 5px; background: #fff;">
           </div>` 
        : '';

      // 3. Gắn thông báo và ảnh QR vào giao diện (nối biến qrCodeHtml vào cuối cùng)
      resultBox.innerHTML = `<strong>Đơn hàng đã được tạo${orderId ? ` · #${escapeHtml(orderId)}` : ''}</strong><span>${Number.isFinite(serverTotal) ? `Tổng tiền xác nhận: ${formatPrice(serverTotal)}. ` : ''}${bankText}</span>${qrCodeHtml}`;
      checkoutStatus.textContent = 'Đã tạo đơn thành công.';
    } else {
      resultBox.innerHTML = hasCacao
        ? '<strong>Đơn cacao gửi qua Zalo</strong><span>Sao chép nội dung đơn để shop xác nhận sản phẩm, phí ship và thanh toán.</span>'
        : '<strong>Chế độ demo</strong><span>Backend chưa được cấu hình. Bạn vẫn có thể sao chép đơn và gửi qua Zalo để shop xác nhận.</span>';
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
