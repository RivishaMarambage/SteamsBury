// ===================================
// DOM ELEMENTS
// ===================================
const contactForm = document.querySelector('.contact-form');

const orderBtn = document.querySelector('.btn-order');
const applyBtn = document.querySelector('.btn-apply');
const directionsBtn = document.querySelector('.btn-directions');
const joinBtn = document.querySelector('.btn-join');

// ===================================
// FORM SUBMISSION
// ===================================
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };

        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification(`Thank you, ${formData.name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===================================
// FORM VALIDATION
// ===================================
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    input.addEventListener('input', function () {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            this.style.borderColor = '';
        }
    });
});



// ===================================
// BUTTON CLICK HANDLERS
// ===================================
if (orderBtn) {
    orderBtn.addEventListener('click', function () {
        showNotification('Redirecting to online ordering...', 'success');
    });
}

if (directionsBtn) {
    directionsBtn.addEventListener('click', function () {
        showNotification('Opening Google Maps directions...', 'info');
        // In production: window.open('https://maps.google.com/...');
    });
}

if (joinBtn) {
    joinBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
    });
}

if (applyBtn) {
    applyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
        showNotification('Please fill out the form below to apply', 'info');
    });
}

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

// Apply animations to elements
const animatedElements = document.querySelectorAll('.info-card, .hours-card, .careers-content');
animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// ===================================
// PHONE NUMBER CLICK TO CALL
// ===================================
const phoneNumbers = document.querySelectorAll('.info-text');
phoneNumbers.forEach(phone => {
    if (phone.textContent.includes('+1')) {
        phone.style.cursor = 'pointer';
        phone.addEventListener('click', function () {
            window.location.href = `tel:${this.textContent.replace(/\s/g, '')}`;
        });
    }
});

// ===================================
// EMAIL CLICK TO MAILTO
// ===================================
const emailElements = document.querySelectorAll('.info-text');
emailElements.forEach(email => {
    if (email.textContent.includes('@')) {
        email.style.cursor = 'pointer';
        email.addEventListener('click', function () {
            window.location.href = `mailto:${this.textContent}`;
        });
    }
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
// FORM INPUT ANIMATIONS
// ===================================
const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.querySelector('.form-label').style.color = 'var(--color-primary)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.querySelector('.form-label').style.color = '';
    });
});

// ===================================
// SOCIAL ICON HOVER EFFECTS
// ===================================
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
        e.preventDefault();
        showNotification('Social media link clicked!', 'info');
    });
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
console.log('☕ Contact page loaded successfully!');
console.log('All features initialized!');