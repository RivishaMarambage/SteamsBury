document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'steamsbury_cart';

    // DOM Elements
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTax = document.getElementById('summaryTax');
    const summaryTotal = document.getElementById('summaryTotal');
    const checkoutForm = document.getElementById('checkoutForm');

    // Load Cart
    let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveCart() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        renderCart();
        updateSummary();
    }

    function renderCart() {
        // Clear current list
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex';
            summarySubtotal.textContent = 'Rs 0';
            summaryTax.textContent = 'Rs 0';
            summaryTotal.textContent = 'Rs 0';
            return;
        }

        emptyCartMessage.style.display = 'none';

        cart.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'cart-item';

            // Format Addons
            const addonText = item.addons && item.addons.length > 0
                ? item.addons.map(a => a.name).join(', ')
                : 'No add-ons';

            // Calculate item total price (unit + addons) * quantity is handled in summary, 
            // but for display usually showing unit price + addons unit price is good.
            // Let's rely on item.unitTotal which we should store.
            // Or re-calculate:
            const unitTotal = item.basePrice + (item.addons ? item.addons.reduce((sum, a) => sum + a.price, 0) : 0);

            el.innerHTML = `
                <img src="${item.imgSrc || './assets/placeholder.png'}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="item-title">${item.title}</h4>
                    <p class="item-addons">${addonText}</p>
                    <div class="item-price">Rs ${unitTotal * item.quantity}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        <span class="material-icons">delete_outline</span>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });

        // Append empty message hidden so it stays in DOM
        cartItemsContainer.appendChild(emptyCartMessage);
    }

    function updateSummary() {
        if (cart.length === 0) return;

        let subtotal = 0;
        cart.forEach(item => {
            const unitTotal = item.basePrice + (item.addons ? item.addons.reduce((sum, a) => sum + a.price, 0) : 0);
            subtotal += unitTotal * item.quantity;
        });

        const tax = Math.round(subtotal * 0.05); // 5% Service Charge
        const total = subtotal + tax;

        summarySubtotal.textContent = `Rs ${subtotal}`;
        summaryTax.textContent = `Rs ${tax}`;
        summaryTotal.textContent = `Rs ${total}`;
    }

    // Expose global functions for onclick handlers
    window.updateQty = (index, change) => {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            saveCart();
        }
    };

    window.removeItem = (index) => {
        if (confirm('Remove this item?')) {
            cart.splice(index, 1);
            saveCart();
        }
    };

    // Checkout Form Handler
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const name = document.getElementById('custName').value;
        const total = summaryTotal.textContent;

        const confirmMsg = `Thank you, ${name}!\nYour order of ${total} has been placed successfully.\nWe will start brewing immediately!`;
        alert(confirmMsg);

        // Clear Cart
        cart = [];
        saveCart();

        // Redirect to Home or Menu
        window.location.href = 'index.html';
    });

    // Initial Render
    renderCart();
    updateSummary();
});
