// ===================================
// QUICK AMOUNT BUTTONS
// ===================================
const amountButtons = document.querySelectorAll('.amount-btn');
const customInput = document.querySelector('.amount-input input');

amountButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const amount = this.textContent.trim().replace('LKR', '').trim();
        customInput.value = amount;

        // Visual feedback
        amountButtons.forEach(b => b.style.background = 'rgba(255, 255, 255, 0.2)');
        this.style.background = 'rgba(255, 255, 255, 0.4)';
    });
});

// ===================================
// TOP UP BUTTON
// ===================================
const topUpBtn = document.querySelector('.btn-topup');

if (topUpBtn) {
    topUpBtn.addEventListener('click', function () {
        const amount = customInput.value;

        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="material-icons rotating">refresh</span> Processing...';
        this.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.innerHTML = '<span class="material-icons">check_circle</span> Added Successfully!';
            this.style.background = '#10B981';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.disabled = false;
                customInput.value = '';

                // Update balance (demo)
                const balanceElement = document.querySelector('.card-value');
                if (balanceElement) {
                    const currentBalance = parseFloat(balanceElement.textContent.replace('LKR ', '').replace(',', ''));
                    const newBalance = currentBalance + parseFloat(amount);
                    balanceElement.textContent = `LKR ${newBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
            }, 2000);
        }, 1500);
    });
}

// ===================================
// SCROLL PROGRESS BAR
// ===================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 77px;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #CF6D17, #F58D37);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});


// ===================================
// REFRESH QR CODE
// ===================================
const refreshBtn = document.querySelector('.btn-refresh');

if (refreshBtn) {
    refreshBtn.addEventListener('click', function () {
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="material-icons rotating">refresh</span> Refreshing...';
        this.disabled = true;

        setTimeout(() => {
            // Generate new random code
            const newCode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
            const formattedCode = `${newCode.slice(0, 4)} ${newCode.slice(4, 8)} ${newCode.slice(8, 12)}`;

            const qrNumber = document.querySelector('.qr-number');
            if (qrNumber) {
                qrNumber.textContent = formattedCode;
            }

            this.innerHTML = '<span class="material-icons">check_circle</span> Refreshed!';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        }, 1000);
    });
}

// ===================================
// TRANSACTION ITEM CLICK
// ===================================
const transactionItems = document.querySelectorAll('.transaction-item');

transactionItems.forEach(item => {
    item.addEventListener('click', function () {
        const transactionName = this.querySelector('h4').textContent;
        alert(`Transaction Details:\n\n${transactionName}\n\nThis would open a detailed view of the transaction.`);
    });
});

// ===================================
// SETTING ITEMS CLICK
// ===================================
const settingItems = document.querySelectorAll('.setting-item.clickable');

settingItems.forEach(item => {
    item.addEventListener('click', function () {
        const settingName = this.querySelector('h4').textContent;

        if (settingName.includes('PIN')) {
            alert('Change Wallet PIN:\n\nThis would open a secure PIN change dialog.');
        } else if (settingName.includes('Terms')) {
            window.open('#', '_blank');
        }
    });
});

// ===================================
// AUTO TOP-UP TOGGLE
// ===================================
const autoTopUpToggle = document.querySelector('.toggle-switch input');

if (autoTopUpToggle) {
    autoTopUpToggle.addEventListener('change', function () {
        if (this.checked) {
            alert('Auto Top-up Enabled\n\nYour wallet will automatically recharge when balance falls below LKR 1,000.');
        } else {
            alert('Auto Top-up Disabled');
        }
    });
}

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
        }, 500);
    }
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

// Apply animations
document.querySelectorAll('.balance-card, .transaction-item, .settings-card, .google-reviews-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// ===================================
// ADD CSS ANIMATIONS
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rotating {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .rotating {
        animation: rotating 1s linear infinite;
    }
`;
document.head.appendChild(style);

console.log('💳 Wallet page loaded successfully!');