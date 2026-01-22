// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// ANIMATED COUNTER FOR TESTIMONIALS
// ===================================
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.product-card, .feature, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// NEWSLETTER FORM HANDLING
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.email-input');
        const email = emailInput.value;

        if (email) {
            // Show success message
            const button = newsletterForm.querySelector('.btn-primary');
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="material-icons">check_circle</span> Subscribed!';
            button.style.background = '#10B981';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                emailInput.value = '';
            }, 3000);
        }
    });
}

// ===================================
// VOUCHER CARD SELECTION
// ===================================
const voucherCards = document.querySelectorAll('.voucher-card');
voucherCards.forEach(card => {
    card.addEventListener('click', function () {
        // Remove selected class from all cards
        voucherCards.forEach(c => c.classList.remove('selected'));

        // Add selected class to clicked card
        this.classList.add('selected');

        // Update order summary
        const title = this.querySelector('h4').textContent;
        const price = this.querySelector('.voucher-price').textContent;
        const icon = this.querySelector('.voucher-icon .material-icons').textContent;

        document.querySelector('.summary-details h4').textContent = title;
        document.querySelector('.summary-item .material-icons').textContent = icon;
        document.querySelector('.total-price').textContent = price;
        document.querySelectorAll('.price-row span:last-child')[0].textContent = price;

        // Add animation
        const summaryCard = document.querySelector('.summary-card');
        summaryCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            summaryCard.style.transform = 'scale(1)';
        }, 100);
    });
});

// ===================================
// QUANTITY BUTTONS
// ===================================
let quantity = 1;
const qtyButtons = document.querySelectorAll('.qty-btn');
qtyButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const icon = this.querySelector('.material-icons').textContent;
        const priceElement = document.querySelector('.voucher-card.selected .voucher-price');

        if (priceElement) {
            const basePrice = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));

            if (icon === 'add') {
                quantity++;
            } else if (icon === 'remove' && quantity > 1) {
                quantity--;
            }

            const totalPrice = basePrice * quantity;
            document.querySelector('.qty-val').textContent = quantity;
            document.querySelector('.total-price').textContent = `Rs. ${totalPrice.toLocaleString()}`;
            document.querySelectorAll('.price-row span:last-child')[0].textContent = `Rs. ${totalPrice.toLocaleString()}`;

            // Add pulse animation
            document.querySelector('.total-price').style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                document.querySelector('.total-price').style.animation = '';
            }, 300);
        }
    });
});

// ===================================
// SEARCH BOX FUNCTIONALITY
// ===================================
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('focus', function () {
        this.parentElement.style.background = '#FFFFFF';
        this.parentElement.style.boxShadow = '0 0 0 2px #CF6D17';
    });

    searchInput.addEventListener('blur', function () {
        this.parentElement.style.background = '#F4F2F0';
        this.parentElement.style.boxShadow = 'none';
    });
}

// ===================================
// HERO PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    }
});

// ===================================
// ADD TO CART BUTTON
// ===================================
const addToCartBtn = document.querySelector('.btn-full');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
        const originalContent = this.innerHTML;

        // Show loading state
        this.innerHTML = '<span class="material-icons rotating">refresh</span> Adding...';
        this.disabled = true;

        setTimeout(() => {
            // Show success state
            this.innerHTML = '<span class="material-icons">check_circle</span> Added to Cart!';
            this.style.background = '#10B981';

            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        }, 1000);
    });
}

// ===================================
// CARD HOVER EFFECTS
// ===================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    });
});

// ===================================
// TYPING EFFECT FOR HERO TITLE
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===================================
// ADD CSS ANIMATIONS
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes rotating {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .rotating {
        animation: rotating 1s linear infinite;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .slide-in-right {
        animation: slideInRight 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// ===================================
// RSVP BUTTON FUNCTIONALITY
// ===================================
document.querySelectorAll('.btn-small').forEach(btn => {
    if (btn.textContent.trim() === 'RSVP') {
        btn.addEventListener('click', function () {
            const originalText = this.textContent;
            this.textContent = '✓ Reserved';
            this.style.background = '#10B981';
            this.style.color = '#FFFFFF';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 3000);
        });
    }
});


// ===================================
// RANDOM COFFEE QUOTE ROTATION
// ===================================
const quotes = [
    { text: "Coffee is a language in itself.", accent: "We speak it fluently." },
    { text: "Life begins after coffee.", accent: "One sip at a time." },
    { text: "Behind every success story,", accent: "is a substantial amount of coffee." },
    { text: "Coffee: because adulting is hard.", accent: "Let's make it easier." }
];

let currentQuoteIndex = 0;
const quoteText = document.querySelector('.quote-text');

if (quoteText) {
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        const quote = quotes[currentQuoteIndex];

        quoteText.style.opacity = '0';
        setTimeout(() => {
            quoteText.innerHTML = `
                ${quote.text}<br>
                <span class="quote-accent">${quote.accent}</span>
            `;
            quoteText.style.opacity = '1';
        }, 500);
    }, 8000);
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

console.log('☕ Steamsbury - Premium Coffee Experience loaded!');

console.log('☕ Steamsbury - Premium Coffee Experience loaded!');