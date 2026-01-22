console.log("✅ menu.js: Script Load Successful");
// ===================================
// MENU FILTER FUNCTIONALITY
// ===================================


(function () {
    console.log('🚀 Menu Script Initializing...');

    const tabs = document.querySelectorAll('.tab');
    const menuSections = document.querySelectorAll('.menu-section');

    // Function to handle tab click and filtering
    function handleTabClick(tab) {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filterCategory = tab.getAttribute('data-filter');

        menuSections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            if (filterCategory === 'all' || sectionCategory === filterCategory) {
                section.style.display = 'block';
                animateSection(section);
            } else {
                section.style.display = 'none';
            }
        });

        const firstVisibleSection = document.querySelector('.menu-section[style="display: block;"]');
        if (firstVisibleSection && filterCategory !== 'all') {
            firstVisibleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            handleTabClick(tab);
        });
    });

    // Check for hash on page load and auto-select custom-coffee tab
    function checkHashAndActivateTab() {
        if (window.location.hash === '#custom-coffee') {
            const customCoffeeTab = document.querySelector('.tab[data-filter="custom-coffee"]');
            if (customCoffeeTab) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    handleTabClick(customCoffeeTab);
                }, 100);
            }
        }
    }

    // Check on DOMContentLoaded
    window.addEventListener('DOMContentLoaded', checkHashAndActivateTab);
    
    // Also check immediately (in case script runs after DOMContentLoaded)
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', checkHashAndActivateTab);
    } else {
        checkHashAndActivateTab();
    }

    function animateSection(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    }

    // ===================================
    // SCROLL PROGRESS BAR
    // ===================================
    const progressDiv = document.createElement('div');
    progressDiv.id = 'scroll-progress-bar';
    progressDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #CF6D17, #F58D37);
        z-index: 1000000;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressDiv);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressDiv.style.width = scrolled + '%';
    });

    // ===================================
    // ADD-ON MODAL LOGIC
    // ===================================
    const modal = document.getElementById('addOnModal');
    const qtyValue = document.getElementById('qtyValue');
    const totalPriceElement = document.getElementById('totalPrice');
    const addOnsList = document.getElementById('addOnsList');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    const addToCartBtn = document.getElementById('addToCartBtn');

    let currentItemBasePrice = 0;
    let currentQuantity = 1;

    const addOnsData = {
        'hot-coffee': [
            { name: 'Extra Shot Espresso', price: 100 },
            { name: 'Hazelnut Syrup', price: 100 },
            { name: 'Vanilla Syrup', price: 100 },
            { name: 'Caramel Sauce', price: 100 },
            { name: 'Oat Milk', price: 150 }
        ],
        'cold-brews': [
            { name: 'Cold Foam', price: 120 },
            { name: 'Vanilla Syrup', price: 100 },
            { name: 'Caramel Drizzle', price: 80 },
            { name: 'Extra Ice', price: 0 }
        ],
        'bakery': [
            { name: 'Cream Cheese', price: 100 },
            { name: 'Extra Butter', price: 50 },
            { name: 'Jam', price: 50 },
            { name: 'Warmed Up', price: 0 }
        ],
        'default': [
            { name: 'Extra Sauce', price: 50 },
            { name: 'Special Packaging', price: 50 }
        ]
    };

    // Global Click Listener for + Buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            console.log('DEBUG: Add button clicked!');

            const card = btn.closest('.menu-card');
            const section = btn.closest('.menu-section');
            const categoryKey = section ? section.getAttribute('data-category') : 'default';

            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('.description').textContent;
            const priceString = card.querySelector('.price').textContent;
            const imgSrc = card.querySelector('img').src;
            const price = parseInt(priceString.replace(/[^0-9]/g, ''));

            openModal({ title, description, price, imgSrc, category: categoryKey });
        }
    });

    function openModal(data) {
        if (!modal) return console.error('Modal not found');

        currentQuantity = 1;
        currentItemBasePrice = data.price;
        if (qtyValue) qtyValue.textContent = '1';

        if (modalImage) modalImage.src = data.imgSrc;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalDescription) modalDescription.textContent = data.description;
        if (modalCategory) modalCategory.textContent = formatCategoryName(data.category);

        renderAddOns(data.category);
        updateTotalPrice();

        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('DEBUG: Modal opened for', data.title);
    }

    function renderAddOns(category) {
        if (!addOnsList) return;
        addOnsList.innerHTML = '';
        const items = addOnsData[category] || addOnsData['default'];

        items.forEach((addon, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'addon-item';
            const addonId = `addon-${category}-${index}`;
            itemDiv.innerHTML = `
                <input type="checkbox" id="${addonId}" data-price="${addon.price}">
                <div class="addon-text">${addon.name}</div>
                <div class="addon-price">+ Rs ${addon.price}</div>
            `;
            itemDiv.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const checkbox = itemDiv.querySelector('input');
                    checkbox.checked = !checkbox.checked;
                    updateTotalPrice();
                }
            });
            const checkbox = itemDiv.querySelector('input');
            checkbox.addEventListener('change', updateTotalPrice);
            addOnsList.appendChild(itemDiv);
        });
    }

    function updateTotalPrice() {
        if (!totalPriceElement) return;
        let addOnsTotal = 0;
        const checkboxes = addOnsList.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => addOnsTotal += parseInt(cb.getAttribute('data-price')));
        totalPriceElement.textContent = (currentItemBasePrice + addOnsTotal) * currentQuantity;
    }

    function formatCategoryName(str) {
        if (!str) return 'Menu Item';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = 'none';
            }
        }, 300);
        document.body.style.overflow = '';
    }

    const qtyMinusBtn = document.getElementById('qtyMinus');
    const qtyPlusBtn = document.getElementById('qtyPlus');

    if (qtyMinusBtn) qtyMinusBtn.addEventListener('click', () => {
        if (currentQuantity > 1) { currentQuantity--; qtyValue.textContent = currentQuantity; updateTotalPrice(); }
    });
    if (qtyPlusBtn) qtyPlusBtn.addEventListener('click', () => {
        if (currentQuantity < 20) { currentQuantity++; qtyValue.textContent = currentQuantity; updateTotalPrice(); }
    });

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const checkboxes = addOnsList.querySelectorAll('input[type="checkbox"]:checked');
            const selectedAddOns = Array.from(checkboxes).map(cb => ({
                name: cb.nextElementSibling.textContent,
                price: parseInt(cb.getAttribute('data-price'))
            }));

            const cartItem = {
                id: Date.now(), // Unique ID for removals
                title: modalTitle.textContent,
                basePrice: currentItemBasePrice,
                quantity: currentQuantity,
                imgSrc: modalImage.src,
                addons: selectedAddOns
            };

            // Get existing cart
            const cart = JSON.parse(localStorage.getItem('steamsbury_cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('steamsbury_cart', JSON.stringify(cart));

            console.log('🛒 Added to Cart:', cartItem);

            // Visual Feedback
            const originalContent = addToCartBtn.innerHTML;
            addToCartBtn.innerHTML = '<span class="material-icons">check</span> Added!';
            addToCartBtn.style.background = '#4CAF50';

            // Update Floating Cart Badge if exists (will add next)
            updateCartBadge();

            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    addToCartBtn.innerHTML = originalContent;
                    addToCartBtn.style.background = '';
                }, 300);
            }, 1000);
        });
    }

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('steamsbury_cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cart-count-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Call on load
    updateCartBadge();

    // Scroll Observer for Cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.menu-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        cardObserver.observe(card);
    });

    // ===================================
    // CUSTOM COFFEE BUILDER
    // ===================================
    const customCoffeePrice = document.getElementById('customCoffeePrice');
    const addCustomCoffeeBtn = document.getElementById('addCustomCoffeeBtn');
    const baseRadios = document.querySelectorAll('input[name="coffeeBase"]');
    const addonCheckboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');

    function calculateCustomPrice() {
        // Get base price
        const selectedBase = document.querySelector('input[name="coffeeBase"]:checked');
        let totalPrice = selectedBase ? parseInt(selectedBase.getAttribute('data-price')) : 0;

        // Add addon prices
        addonCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalPrice += parseInt(checkbox.getAttribute('data-price'));
            }
        });

        if (customCoffeePrice) {
            customCoffeePrice.textContent = `Rs ${totalPrice}`;
        }
        return totalPrice;
    }

    // Listen for base changes
    baseRadios.forEach(radio => {
        radio.addEventListener('change', calculateCustomPrice);
    });

    // Listen for addon changes
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateCustomPrice);
    });

    // Handle Add to Cart for custom coffee
    if (addCustomCoffeeBtn) {
        addCustomCoffeeBtn.addEventListener('click', () => {
            const selectedBase = document.querySelector('input[name="coffeeBase"]:checked');
            if (!selectedBase) {
                alert('Please select a coffee base!');
                return;
            }

            const selectedAddons = [];
            addonCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedAddons.push({
                        name: checkbox.getAttribute('data-addon'),
                        price: parseInt(checkbox.getAttribute('data-price'))
                    });
                }
            });

            const baseName = selectedBase.value;
            const totalPrice = calculateCustomPrice();

            const cartItem = {
                id: Date.now(),
                title: `Custom ${baseName}`,
                basePrice: parseInt(selectedBase.getAttribute('data-price')),
                quantity: 1,
                imgSrc: './MenuAssets/custom-coffee.png', // You can use a default image
                addons: selectedAddons
            };

            const cart = JSON.parse(localStorage.getItem('steamsbury_cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('steamsbury_cart', JSON.stringify(cart));

            console.log('🎨 Custom Coffee Added to Cart:', cartItem);

            // Visual feedback
            const originalContent = addCustomCoffeeBtn.innerHTML;
            addCustomCoffeeBtn.innerHTML = '<span class="material-icons">check</span> Added to Cart!';
            addCustomCoffeeBtn.style.background = '#4CAF50';

            updateCartBadge();

            setTimeout(() => {
                addCustomCoffeeBtn.innerHTML = originalContent;
                addCustomCoffeeBtn.style.background = '';

                // Reset form
                baseRadios[0].checked = true;
                addonCheckboxes.forEach(cb => cb.checked = false);
                calculateCustomPrice();
            }, 2000);
        });
    }

})();

console.log('✅ menu.js: Script Load Successful');

