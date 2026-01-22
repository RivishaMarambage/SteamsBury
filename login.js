// PASSWORD TOGGLE
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
        const input = icon.previousElementSibling;
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.textContent = isPassword ? 'visibility' : 'visibility_off';
    });
});

// TAB SWITCHING
const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.auth-form');
const pageTitle = document.querySelector('.form-wrapper h1');
const pageSubtitle = document.querySelector('.subtitle');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));

        tab.classList.add('active');
        const targetForm = document.getElementById(tab.dataset.target);
        targetForm.classList.add('active');

        if (tab.dataset.target === 'signupForm') {
            pageTitle.textContent = 'Create Account';
            pageSubtitle.textContent = 'Join us for exclusive rewards.';
        } else {
            pageTitle.textContent = 'Welcome Back';
            pageSubtitle.textContent = 'Please enter your details to sign in.';
        }
    });
});

// CHECK URL HASH ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#signup') {
        const signupTab = document.querySelector('[data-target="signupForm"]');
        if (signupTab) {
            signupTab.click();
        }
    }
});

// FORM SUBMIT → REDIRECT
forms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const btn = form.querySelector('.btn');
        btn.disabled = true;
        btn.textContent = 'Redirecting...';

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    });
});
