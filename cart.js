document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'steamsbury_cart';

    // Elements
    const cartList = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('emptyCartState');
    const subtotalEl = document.getElementById('subtotalPrice');
    const totalEl = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Points elements
    const pointsInput = document.getElementById('pointsInput');
    const applyPointsBtn = document.getElementById('applyPointsBtn');
    const pointsInfo = document.getElementById('pointsInfo');
    const pointsSuccess = document.getElementById('pointsSuccess');
    const pointsDiscountRow = document.getElementById('pointsDiscountRow');
    const pointsDiscountEl = document.getElementById('pointsDiscount');

    let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let appliedPoints = 0;

    function saveCart() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        cartList.innerHTML = '';

        if (cart.length === 0) {
            cartList.appendChild(emptyState);
            emptyState.style.display = 'flex';
            subtotalEl.textContent = 'Rs 0';
            totalEl.textContent = 'Rs 0';
            // Disable Checkout link
            checkoutBtn.style.pointerEvents = 'none';
            checkoutBtn.style.opacity = '0.5';
            return;
        }

        emptyState.style.display = 'none';
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';

        let subtotal = 0;

        cart.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'cart-item';

            // Calc unit price (base + addons)
            let addonsTotal = 0;
            let addonsText = '';

            if (item.addons && item.addons.length > 0) {
                addonsText = item.addons.map(a => a.name).join(', ');
                addonsText = `<div class="item-detail"><span class="material-icons" style="font-size:12px;vertical-align:-2px">add_circle_outline</span> ${addonsText}</div>`;
                addonsTotal = item.addons.reduce((sum, a) => sum + a.price, 0);
            }

            const unitPrice = item.basePrice + addonsTotal;
            const lineTotal = unitPrice * item.quantity;
            subtotal += lineTotal;

            el.innerHTML = `
                <img src="${item.imgSrc || './assets/placeholder.png'}" alt="${item.title}" class="item-img">
                <div class="item-info">
                    <h4 class="item-name">${item.title}</h4>
                    ${addonsText}
                    <div class="item-price-unit">Rs ${unitPrice}</div>
                </div>
                <div class="item-controls">
                    <div class="item-total-price">Rs ${lineTotal}</div>
                    
                    <div class="qty-group">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <div class="qty-val">${item.quantity}</div>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>

                    <button class="btn-remove" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartList.appendChild(el);
        });

        subtotalEl.textContent = `Rs ${subtotal}`;

        // Calculate final total with points discount
        const discount = appliedPoints;
        let finalTotal = subtotal - discount;
        if (finalTotal < 0) finalTotal = 0;

        totalEl.textContent = `Rs ${finalTotal}`;

        // Update discount display
        if (appliedPoints > 0) {
            pointsDiscountRow.style.display = 'flex';
            pointsDiscountEl.textContent = `- Rs ${discount}`;
        } else {
            pointsDiscountRow.style.display = 'none';
        }
    }

    // Points Redemption Logic
    if (applyPointsBtn) {
        applyPointsBtn.addEventListener('click', () => {
            const points = parseInt(pointsInput.value) || 0;

            if (points <= 0) {
                pointsSuccess.style.display = 'none';
                pointsInfo.textContent = 'Please enter valid points';
                pointsInfo.style.color = '#ff5757';
                return;
            }

            if (points > 10000) {
                pointsSuccess.style.display = 'none';
                pointsInfo.textContent = 'Maximum 10,000 points allowed';
                pointsInfo.style.color = '#ff5757';
                return;
            }

            // Apply points
            appliedPoints = points;
            pointsSuccess.textContent = `✓ ${points} points applied successfully!`;
            pointsSuccess.style.display = 'block';
            pointsInfo.textContent = '1 point = Rs 1 discount';
            pointsInfo.style.color = '#888';

            renderCart(); // Re-render to update totals
        });
    }

    // Explicitly attach to window for inline onclicks
    window.updateQty = (index, change) => {
        const item = cart[index];
        if (item.quantity + change < 1) return; // Prevent 0, use remove instead
        if (item.quantity + change > 50) return; // Max limit

        item.quantity += change;
        saveCart();
    };

    window.removeItem = (index) => {
        if (confirm('Are you sure you want to remove this item?')) {
            cart.splice(index, 1);
            saveCart();
        }
    };

    renderCart();
});
