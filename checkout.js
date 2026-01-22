document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'steamsbury_cart';
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Elements
    const summaryList = document.getElementById('summaryItemsList');
    const subtotalEl = document.getElementById('summSubtotal');
    const taxEl = document.getElementById('summTax');
    const totalEl = document.getElementById('summTotal');
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');
    const deliveryFeeEl = document.getElementById('summDelivery');

    const orderTypeRadios = document.getElementsByName('orderType');
    const deliveryFields = document.getElementById('deliveryFields');
    const checkoutForm = document.getElementById('checkoutForm');

    // Redirect if empty
    if (cart.length === 0) {
        alert('Your cart is empty. Redirecting to menu.');
        window.location.href = 'menu.html';
        return;
    }

    // 1. Render Summary
    let subtotal = 0;
    cart.forEach(item => {
        let addonsTotal = 0;
        if (item.addons) addonsTotal = item.addons.reduce((sum, a) => sum + a.price, 0);

        const unitPrice = item.basePrice + addonsTotal;
        const lineTotal = unitPrice * item.quantity;
        subtotal += lineTotal;

        const el = document.createElement('div');
        el.className = 'summary-item';
        el.innerHTML = `
            <span>${item.quantity}x</span>
            <strong>${item.title}</strong>
            <span>Rs ${lineTotal}</span>
        `;
        summaryList.appendChild(el);
    });

    const tax = Math.round(subtotal * 0.05); // 5% tax
    const deliveryFee = 350; // Fixed delivery fee

    // Update Totals Function
    function updateTotals() {
        let grandTotal = subtotal + tax;

        // Check order type
        const isDelivery = document.querySelector('input[name="orderType"]:checked').value === 'delivery';

        if (isDelivery) {
            grandTotal += deliveryFee;
            deliveryFeeRow.style.display = 'flex';
        } else {
            deliveryFeeRow.style.display = 'none';
        }

        subtotalEl.textContent = `Rs ${subtotal}`;
        taxEl.textContent = `Rs ${tax}`;
        deliveryFeeEl.textContent = `Rs ${deliveryFee}`;
        totalEl.textContent = `Rs ${grandTotal}`;
    }

    // 2. Event Listeners for Order Type
    orderTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'delivery') {
                deliveryFields.style.display = 'block';
                // Add required attributes
                document.getElementById('addrStreet').setAttribute('required', 'true');
                document.getElementById('addrCity').setAttribute('required', 'true');
            } else {
                deliveryFields.style.display = 'none';
                // Remove required attributes
                document.getElementById('addrStreet').removeAttribute('required');
                document.getElementById('addrCity').removeAttribute('required');
            }
            updateTotals();
        });
    });

    // 3. Handle Submit
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate Processing
        const btn = checkoutForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            alert('🎉 Order Placed Successfully!\nThank you for choosing Steamsbury.');
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = 'index.html';
        }, 2000);
    });

    // Initial Calc
    updateTotals();
});
