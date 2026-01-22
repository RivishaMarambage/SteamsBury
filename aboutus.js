// ===================================
// DOM ELEMENTS
// ===================================
const navbar = document.querySelector('.header');
const heroButtons = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary');
const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary');
const orderButton = document.querySelector('.btn-primary');

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});



// ===================================
// HERO BUTTONS
// ===================================
heroButtons.forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        showNotification(`Redirecting to ${buttonText}...`, 'success');
    });
});

// ===================================
// CTA BUTTONS
// ===================================
ctaButtons.forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        showNotification(`${buttonText} clicked!`, 'success');
    });
});

// ===================================
// ORDER ONLINE BUTTON
// ===================================
if (orderButton) {
    orderButton.addEventListener('click', function () {
        showNotification('Redirecting to online ordering...', 'success');
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to sections
const animatedElements = document.querySelectorAll('.value-card, .team-member, .gallery-img');
animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// ===================================
// TEAM MEMBER HOVER EFFECT
// ===================================
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    member.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// GALLERY IMAGE LIGHTBOX (Simple)
// ===================================
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        showNotification('Image lightbox would open here', 'info');
    });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

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

    // Add keyframes for animation
    if (!document.querySelector('#notification-keyframes')) {
        const style = document.createElement('style');
        style.id = 'notification-keyframes';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
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
// PARALLAX EFFECT ON HERO
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < 800) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// VALUE CARDS STAGGER ANIMATION
// ===================================
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

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
console.log('☕ About Us page loaded successfully!');
console.log('All animations and interactions initialized!');