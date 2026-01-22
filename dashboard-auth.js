console.log("✅ dashboard-auth.js: Script Load Successful");

// ===================================
// SIDEBAR NAVIGATION TOGGLE
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const mainNavLinks = document.querySelectorAll('.nav-list .nav-link-item');

    // Toggle sidebar on button click (Desktop)
    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');

        // Save state to localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('mobile-active')) {
                sidebar.classList.remove('mobile-active');
            }
        }
    });

    // Load saved state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
    }

    // Navigation link ripple effect
    mainNavLinks.forEach(link => {
        link.addEventListener('mousedown', function (e) {
            // Ripple effect on the parent nav-item for better visual containment
            const parentItem = this.closest('.nav-item');
            if (parentItem) {
                createRipple(parentItem, e);
            }
        });

        // Let standard <a> tag click handle the navigation
    });


    // Sidebar logout functionality
    const sidebarLogout = document.querySelector('.logout-section');
    sidebarLogout.addEventListener('click', function (e) {
        // Only confirm if it's the container or link being clicked
        if (confirm('Are you sure you want to logout?')) {
            console.log('Logging out...');
            window.location.href = 'index.html';
        }
    });


    // Ripple effect function
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .nav-item {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes rotating {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .rotating {
            animation: rotating 1s linear infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .stat-card:hover .stat-icon {
            animation: pulse 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Toggle sidebar with Ctrl + B or Cmd + B
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            sidebar.classList.toggle('collapsed');
        }
    });

    // Close sidebar on mobile when clicking outside
    if (window.innerWidth <= 768) {
        document.addEventListener('click', function (e) {
            if (!sidebar.contains(e.target) && !sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
            }
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) {
                const savedState = localStorage.getItem('sidebarCollapsed');
                if (savedState === 'true') {
                    sidebar.classList.add('collapsed');
                } else {
                    sidebar.classList.remove('collapsed');
                }
            }
        }, 250);
    });

    // Add tooltips for collapsed state
    function updateTooltips() {
        mainNavLinks.forEach(link => {
            const text = link.querySelector('.nav-text').textContent;
            if (sidebar.classList.contains('collapsed')) {
                link.setAttribute('title', text);
            } else {
                link.removeAttribute('title');
            }
        });


        const logoutText = sidebarLogout.querySelector('.nav-text').textContent;
        if (sidebar.classList.contains('collapsed')) {
            sidebarLogout.setAttribute('title', logoutText);
        } else {
            sidebarLogout.removeAttribute('title');
        }
    }

    toggleBtn.addEventListener('click', updateTooltips);
    updateTooltips();

    console.log('Sidebar navigation initialized!');
});

// ===================================
// PROGRESS BAR ANIMATION
// ===================================
window.addEventListener('load', () => {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.style.width;
        progressFill.style.width = '0%';

        setTimeout(() => {
            progressFill.style.width = targetWidth;
        }, 300);
    }
});

// ===================================
// EDIT PROFILE BUTTON
// ===================================
const editProfileBtn = document.querySelector('.edit-profile-btn');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        alert('Edit profile functionality would open a modal or navigate to edit page');
    });
}

// ===================================
// REORDER BUTTON
// ===================================
const reorderButtons = document.querySelectorAll('.btn-reorder');
reorderButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const orderName = this.closest('.order-item').querySelector('.order-name').textContent;

        // Add loading state
        this.innerHTML = '<span class="material-icons rotating">refresh</span> Adding...';
        this.disabled = true;

        setTimeout(() => {
            this.innerHTML = '<span class="material-icons">check_circle</span> Added!';
            this.style.background = '#10B981';

            setTimeout(() => {
                this.innerHTML = 'Reorder';
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        }, 1000);
    });
});

// ===================================
// DETAILS BUTTON
// ===================================
const detailsButtons = document.querySelectorAll('.btn-details');
detailsButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const orderName = this.closest('.order-item').querySelector('.order-name').textContent;
        alert(`Order details for: ${orderName}\n\nThis would show full order details in a modal or new page.`);
    });
});

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const infoForm = document.querySelector('.info-form');
if (infoForm) {
    infoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const saveBtn = this.querySelector('.btn-save');
        const originalText = saveBtn.innerHTML;

        // Show loading state
        saveBtn.innerHTML = '<span class="material-icons rotating">refresh</span> Saving...';
        saveBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            saveBtn.innerHTML = '<span class="material-icons">check_circle</span> Saved!';
            saveBtn.style.background = '#10B981';

            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.style.background = '';
                saveBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Cancel button
const cancelBtn = document.querySelector('.btn-cancel');
if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        if (confirm('Discard changes?')) {
            infoForm.reset();
        }
    });
}

// ===================================
// SCAN IN STORE BUTTON
// ===================================
const scanBtn = document.querySelector('.btn-scan');
if (scanBtn) {
    scanBtn.addEventListener('click', () => {
        alert('This would open a QR code scanner or display your loyalty QR code');
    });
}

// ===================================
// VIEW REWARDS BUTTON
// ===================================
const rewardsBtn = document.querySelector('.btn-rewards');
if (rewardsBtn) {
    rewardsBtn.addEventListener('click', () => {
        alert('This would navigate to the rewards page');
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

// Apply animations to elements
document.querySelectorAll('.stat-card, .order-item, .personal-info').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// ===================================
// STAT CARD COUNTER ANIMATION
// ===================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate total orders count
const totalOrdersValue = document.querySelector('.stats-grid .stat-card:first-child .stat-value');
if (totalOrdersValue && totalOrdersValue.textContent === '24') {
    totalOrdersValue.textContent = '0';
    setTimeout(() => {
        animateValue(totalOrdersValue, 0, 24, 1500);
    }, 500);
}

// ===================================
// DATE PICKER (Simple Implementation)
// ===================================
const dateInputs = document.querySelectorAll('input[type="text"]');
dateInputs.forEach(input => {
    if (input.value.includes('/')) {
        input.addEventListener('click', function () {
            console.log('Date picker would open here');
        });
    }
});

console.log('☕ Dashboard with sidebar navigation loaded successfully!');