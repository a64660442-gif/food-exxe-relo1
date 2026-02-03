
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const reserveBtn = document.getElementById('reserveBtn');
const reserveBtnMobile = document.getElementById('reserveBtnMobile');
const closeModalBtn = document.getElementById('closeModalBtn');
const reservationModal = document.getElementById('reservationModal');
const reservationForm = document.getElementById('reservationForm');
const closeQuestionModalBtn = document.getElementById('closeQuestionModalBtn');
const questionModal = document.getElementById('questionModal');
const questionForm = document.getElementById('questionForm');
const askQuestionBtn = document.getElementById('askQuestionBtn');
const openMapBtn = document.getElementById('openMapBtn');
const closeMapBtn = document.getElementById('closeMapBtn');
const mapOverlay = document.getElementById('mapOverlay');
const floatingCartBtn = document.getElementById('floatingCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const addToCartBtns = document.querySelectorAll('.add-to-cart');


let cart = JSON.parse(localStorage.getItem('cart')) || [];


document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    });
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

function openReservationModal() {
    reservationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    reservationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (reserveBtn) {
    reserveBtn.addEventListener('click', openReservationModal);
}

if (reserveBtnMobile) {
    reserveBtnMobile.addEventListener('click', () => {
        openReservationModal();
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeReservationModal);
}

reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) {
        closeReservationModal();
    }
});

function openQuestionModal() {
    questionModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuestionModal() {
    questionModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (askQuestionBtn) {
    askQuestionBtn.addEventListener('click', openQuestionModal);
}

if (closeQuestionModalBtn) {
    closeQuestionModalBtn.addEventListener('click', closeQuestionModal);
}

questionModal.addEventListener('click', (e) => {
    if (e.target === questionModal) {
        closeQuestionModal();
    }
});

if (openMapBtn) {
    openMapBtn.addEventListener('click', () => {
        mapOverlay.classList.add('active');
    });
}

if (closeMapBtn) {
    closeMapBtn.addEventListener('click', () => {
        mapOverlay.classList.remove('active');
    });
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Ваша корзина пуста</p>
            </div>
        `;
        cartTotalPrice.textContent = '0 ₽';
        checkoutBtn.disabled = true;
        return;
    }
    
    let cartHTML = '';
    let totalPrice = 0;
    
    const cartImages = [
        'https://t4.ftcdn.net/jpg/06/05/83/35/360_F_605833578_EbcLZohjgPGAaRYUOrQF2Bn2DjApUedc.jpg',
        'https://avatars.mds.yandex.net/get-shedevrum/12155741/b43a34e6dcab11eeac8e9e327a4c855e/orig',
        'https://avatars.mds.yandex.net/i?id=0b024f4890a4779861c636f82d16f6bbb8a28736-4536963-images-thumbs&n=13',
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        'https://avatars.mds.yandex.net/i?id=81f5b2b8c51521c0405652c5b4d30ae0c63f86c7-11939057-images-thumbs&n=13'
    ];
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const imageUrl = cartImages[index % cartImages.length] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80';
        
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${imageUrl}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ₽</div>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="cart-item-quantity-btn minus" data-index="${index}">-</button>
                            <span class="cart-item-quantity-value">${item.quantity}</span>
                            <button class="cart-item-quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <button class="remove-cart-item" data-index="${index}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotalPrice.textContent = `${totalPrice} ₽`;
    checkoutBtn.disabled = false;
    
    document.querySelectorAll('.cart-item-quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateCartItemQuantity(index, -1);
        });
    });
    
    document.querySelectorAll('.cart-item-quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateCartItemQuantity(index, 1);
        });
    });
    
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeCartItem(index);
        });
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
    const existingItemIndex = cart.findIndex(item => item.name === name);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    
    showNotification(`${name} добавлен в корзину!`, 'success');
}

function updateCartItemQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartDisplay();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    showNotification('Товар удален из корзины', 'info');
}

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const itemName = this.dataset.item;
        const itemPrice = parseInt(this.dataset.price);
        addToCart(itemName, itemPrice);
        
        this.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        this.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-shopping-cart"></i> В корзину';
            this.style.backgroundColor = '';
        }, 2000);
    });
});

document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const parent = this.closest('.quantity-selector');
        const valueElement = parent.querySelector('.quantity-value');
        let value = parseInt(valueElement.textContent);
        
        if (this.classList.contains('minus') && value > 1) {
            value--;
        } else if (this.classList.contains('plus')) {
            value++;
        }
        
        valueElement.textContent = value;
    });
});

floatingCartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    alert('Заказ оформлен! С вами свяжется наш менеджер для подтверждения.');
    cart = [];
    updateCartDisplay();
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        menuCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            comments: document.getElementById('comments').value
        };
        
        console.log('Reservation data:', formData);
        
        showNotification('Столик забронирован! Мы свяжемся с вами для подтверждения.', 'success');
        
        reservationForm.reset();
        closeReservationModal();
    });
}

if (questionForm) {
    questionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('questionName').value,
            phone: document.getElementById('questionPhone').value,
            email: document.getElementById('questionEmail').value,
            question: document.getElementById('questionText').value
        };
        
        console.log('Question data:', formData);
        
        showNotification('Вопрос отправлен! Мы ответим в течение 15 минут.', 'success');
        
        questionForm.reset();
        closeQuestionModal();
    });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        console.log('Newsletter subscription:', email);
        
        showNotification('Вы успешно подписались на рассылку!', 'success');
        
        this.reset();
    });
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                border-left: 4px solid #d4af37;
            }
            .notification-success {
                border-left-color: #28a745;
            }
            .notification-info {
                border-left-color: #17a2b8;
            }
            .notification-warning {
                border-left-color: #ffc107;
            }
            .notification-danger {
                border-left-color: #dc3545;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-grow: 1;
            }
            .notification-content i {
                font-size: 1.2rem;
            }
            .notification-success .notification-content i {
                color: #28a745;
            }
            .notification-info .notification-content i {
                color: #17a2b8;
            }
            .notification-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

const privacyPolicyBtn = document.getElementById('privacyPolicyBtn');
if (privacyPolicyBtn) {
    privacyPolicyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Политика конфиденциальности открывается в новом окне.', 'info');
    });
}

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}
