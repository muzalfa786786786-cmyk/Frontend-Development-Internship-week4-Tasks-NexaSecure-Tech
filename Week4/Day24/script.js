// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate successful submission
        showFormMessage('Message sent! We’ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

function showFormMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.style.color = type === 'success' ? '#2e7d32' : '#cf3e3e';
    formMessage.style.background = type === 'success' ? '#e8f5e9' : '#ffebee';
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.style.background = 'transparent';
    }, 4000);
}