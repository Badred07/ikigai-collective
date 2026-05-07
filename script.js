const cartButton = document.querySelector('.cart-button');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartClose = document.querySelector('.cart-close');
const cartCount = document.querySelector('.cart-count');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const checkoutButton = document.querySelector('.checkout-button');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

const cart = new Map();

const updateCartCount = () => {
  const totalItems = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
};

const formatPrice = price => `${price.toFixed(2)} DH`;

const renderCart = () => {
  cartList.innerHTML = '';
  let total = 0;

  if (cart.size === 0) {
    cartList.innerHTML = '<p style="color: var(--muted);">Your cart is empty. Add a tee to begin.</p>';
    cartTotal.textContent = formatPrice(0);
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <span>${formatPrice(item.price)} x ${item.quantity}</span>
      </div>
      <div class="cart-action-group">
        <button class="btn secondary-button decrease" data-id="${item.id}">-</button>
        <button class="btn secondary-button increase" data-id="${item.id}">+</button>
      </div>
    `;
    cartList.appendChild(itemElement);
  });

  cartTotal.textContent = formatPrice(total);
};

const handleCartAction = event => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.classList.contains('decrease')) {
    const id = button.dataset.id;
    const item = cart.get(id);
    if (!item) return;
    item.quantity -= 1;
    if (item.quantity <= 0) cart.delete(id);
    updateCartCount();
    renderCart();
  }

  if (button.classList.contains('increase')) {
    const id = button.dataset.id;
    const item = cart.get(id);
    if (!item) return;
    item.quantity += 1;
    cart.set(id, item);
    updateCartCount();
    renderCart();
  }
};

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    if (cart.has(id)) {
      cart.get(id).quantity += 1;
    } else {
      cart.set(id, { id, name, price, quantity: 1 });
    }

    updateCartCount();
    renderCart();
    cartSidebar.classList.add('open');
  });
});

cartButton.addEventListener('click', () => {
  cartSidebar.classList.add('open');
});

cartClose.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});

cartList.addEventListener('click', handleCartAction);

checkoutButton.addEventListener('click', () => {
  if (cart.size === 0) {
    alert('Your cart is empty. Add a product to checkout.');
    return;
  }

  alert('Thank you for your order! Your items are ready for checkout.');
  cart.clear();
  updateCartCount();
  renderCart();
  cartSidebar.classList.remove('open');
});

renderCart();
