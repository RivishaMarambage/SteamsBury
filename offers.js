// ===================================
// DOM ELEMENTS
// ===================================
const filterChips = document.querySelectorAll('.chip');
const offerCards = document.querySelectorAll('.offer-card');
const newsletterForm = document.getElementById('newsletterForm');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.top-navbar');

// ===================================
// FILTER FUNCTIONALITY
// ===================================
filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
        // Remove active class from all chips
        filterChips.forEach(c => c.classList.remove('active'));

        // Add active class to clicked chip
        this.classList.add('active');

        // Get filter value
        const filterValue = this.getAttribute('data-filter');

        // Filter cards
        filterOffers(filterValue);
    });
});

function filterOffers(category) {
    offerCards.forEach((card, index) => {
        const cardCategories = card.getAttribute('data-category');

        if (category === 'all') {
            // Show all cards with fade-in animation
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else if (cardCategories && cardCategories.includes(category)) {
            // Show matching cards
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            // Hide non-matching cards
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===================================
// CLAIM CODE BUTTONS
// ===================================
const claimButtons = document.querySelectorAll('.btn-link');

claimButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const card = this.closest('.offer-card');
        const offerTitle = card.querySelector('.offer-title').textContent;

        // Show notification
        showNotification(`Claiming offer: ${offerTitle}`, 'success');

        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ===================================
// SIGN IN BUTTONS
// ===================================
const signInButtons = document.querySelectorAll('.btn-signin');

signInButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        showNotification('Redirecting to sign in page...', 'info');
    });
});

// ===================================
// LOYALTY PROGRAM BUTTON
// ===================================
const loyaltyBtn = document.querySelector('.btn-loyalty');

if (loyaltyBtn) {
    loyaltyBtn.addEventListener('click', function () {
        showNotification('Opening loyalty program registration...', 'success');
    });
}

// ===================================
// HERO BUTTON
// ===================================
const heroBtn = document.querySelector('.btn-hero');

if (heroBtn) {
    heroBtn.addEventListener('click', function () {
        showNotification('Redirecting to order page...', 'success');
    });
}

// ===================================
// NEWSLETTER FORM
// ===================================
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value;

        // Validate email
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }

        // Show loading state on input
        emailInput.disabled = true;
        emailInput.style.opacity = '0.6';
        emailInput.placeholder = 'Subscribing...';

        // Simulate API call
        setTimeout(() => {
            showNotification(`Successfully subscribed: ${email}`, 'success');
            emailInput.value = '';
            emailInput.disabled = false;
            emailInput.style.opacity = '1';
            emailInput.placeholder = 'Enter your email address';
        }, 1500);
    });
}

// ===================================
// EMAIL VALIDATION
// ===================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        fontSize: '0.875rem',
        zIndex: '9999',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '400px'
    });

    // Set colors based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
        notification.style.color = 'white';
    } else if (type === 'info') {
        notification.style.background = '#3b82f6';
        notification.style.color = 'white';
    }

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
        showNotification('Mobile menu would open here', 'info');
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '';
    }
});

// ===================================
// ORDER ONLINE BUTTON
// ===================================
const orderBtn = document.querySelector('.btn-primary');
if (orderBtn) {
    orderBtn.addEventListener('click', function () {
        showNotification('Redirecting to online ordering...', 'success');
    });
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
// LOG INITIALIZATION
// ===================================
console.log('☕ Offers page loaded successfully!');
console.log(`Total offers: ${offerCards.length}`);
console.log('All features initialized and connected!');