// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ===== ADD TO CART ON PRODUCTS PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons on products page
    const addToCartButtons = document.querySelectorAll('.product-card .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling if card is clickable
            const card = this.closest('.product-card');
            const productName = card.dataset.name || card.querySelector('h3').textContent;
            const price = card.dataset.price || card.querySelector('.price').textContent.replace('$', '');
            showToast(`🛒 ${productName} added to cart! ($${price})`);
        });
    });

    // Contact form validation (kept from before)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all fields.', 2000);
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                showToast('Please enter a valid email address.', 2000);
                return;
            }
            showToast('Message sent! We’ll get back to you soon.', 3000);
            contactForm.reset();
        });
    }
});

// ===== PRODUCT DETAILS PAGE INTERACTIONS =====
// Change main image on thumbnail click
function changeImage(element) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
    const mainImg = document.getElementById('mainProductImg');
    if (mainImg) {
        mainImg.src = element.src;
    }
}

// Color selection
function selectColor(element, colorName) {
    const circles = document.querySelectorAll('.color-circle');
    circles.forEach(c => c.classList.remove('active'));
    element.classList.add('active');
    showToast(`Color selected: ${colorName}`, 1500);
}

// Quantity
function incrementQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    }
}

function decrementQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput && parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Add to cart from details page
function addToCartDetails() {
    const productName = document.querySelector('.product-info h1').textContent;
    const price = document.querySelector('.price').textContent.split(' ')[0]; // gets "$59.99"
    const qty = document.getElementById('quantity').value;
    const color = document.querySelector('.color-circle.active')?.style.backgroundColor || 'selected';
    showToast(`✅ Added ${qty} x ${productName} (${color}) to cart. Total: $${(parseFloat(price.replace('$','')) * qty).toFixed(2)}`);
}

// Buy Now
function buyNow() {
    const productName = document.querySelector('.product-info h1').textContent;
    const qty = document.getElementById('quantity').value;
    showToast(`⚡ Proceeding to buy ${qty} x ${productName}`, 2500);
}