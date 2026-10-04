const products = [
  { name: 'Chè xanh nguyên lá', price: 89000, image: './products/che-xanh.svg' },
  { name: 'Chè sen thơm', price: 119000, image: './products/che-sen.svg' },
  { name: 'Cacao nguyên chất', price: 129000, image: './products/cacao.svg' },
  { name: 'Cacao rang mộc', price: 149000, image: './products/cacao-rang.svg' },
];
const cart = [];
const overlay = document.querySelector('#cart-overlay');
const money = value => new Intl.NumberFormat('vi-VN').format(value) + '₫';
const renderCart = () => {
  document.querySelector('#cart-count').textContent = cart.length;
  document.querySelector('#drawer-count').textContent = `(${cart.length})`;
  document.querySelector('#cart-items').innerHTML = cart.map((index, position) => {
    const product = products[index];
    return `<div class="cart-item"><img src="${product.image}" alt=""><div><strong>${product.name}</strong><span>${money(product.price)}</span><button type="button" data-remove="${position}">Xóa</button></div></div>`;
  }).join('');
  document.querySelector('#cart-sum').textContent = money(cart.reduce((sum, index) => sum + products[index].price, 0));
  for (const id of ['cart-total', 'cart-disclaimer']) document.getElementById(id).hidden = cart.length === 0;
  document.querySelector('#empty-cart').hidden = cart.length > 0;
};
const closeCart = () => { overlay.hidden = true; document.body.style.overflow = ''; document.querySelector('#cart-toggle').focus(); };
document.querySelector('#cart-toggle').addEventListener('click', () => { renderCart(); overlay.hidden = false; document.body.style.overflow = 'hidden'; document.querySelector('#cart-close').focus(); });
document.querySelector('#cart-close').addEventListener('click', closeCart);
overlay.addEventListener('click', event => { if (event.target === overlay) closeCart(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !overlay.hidden) closeCart(); });
document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => { cart.push(Number(button.dataset.add)); renderCart(); }));
document.querySelector('#cart-items').addEventListener('click', event => { const button = event.target.closest('[data-remove]'); if (button) { cart.splice(Number(button.dataset.remove), 1); renderCart(); } });
const menu = document.querySelector('#main-nav');
const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('nav-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('nav-open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
