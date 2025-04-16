const courses = [
    {
        id: 1,
        title: "Основы написания промптов",
        description: "Научитесь создавать эффективные промпты для GPT с нуля",
        image: "https://img.freepik.com/free-vector/online-games-concept_23-2148533383.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740",
        price: 3000
    },
    {
        id: 2,
        title: "Продвинутые техники промптинга",
        description: "Углубленное изучение методов создания сложных промптов",
        image: "https://img.freepik.com/free-vector/authentication-concept-illustration_114360-2168.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740",
        price: 4500
    },
    {
        id: 3,
        title: "GPT для бизнеса",
        description: "Как использовать GPT для автоматизации бизнес-процессов",
        image: "https://img.freepik.com/free-vector/hand-drawn-vpn-illustration_23-2149229495.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740",
        price: 5000
    },
    {
        id: 4,
        title: "Креативный промптинг",
        description: "Создание креативных и нестандартных промптов",
        image: "https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740",
        price: 3500
    },
    {
        id: 5,
        title: "Эксперт по GPT",
        description: "Полный курс по работе с GPT от основ до продвинутых техник",
        image: "https://img.freepik.com/free-vector/data-points-concept-illustration_114360-2194.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740",
        price: 7000
    }
];

let cart = [];

function showPage(page) {
    const mainContent = document.getElementById('mainContent');
    if (page === 'home') {
        displayCourses();
    } else if (page === 'cart') {
        displayCart();
    }
}

function displayCourses() {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';
    
    courses.forEach((course, index) => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course hidden';
        courseElement.onclick = () => showCoursePopup(course);
        
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p class="price">${course.price} ₽</p>
            </div>
        `;
        
        container.appendChild(courseElement);
    });
    
    // Запускаем первую проверку видимости
    setTimeout(checkVisibility, 100);
}

// Функция проверки видимости элементов
function checkVisibility() {
    const courses = document.querySelectorAll('.course');
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    courses.forEach(course => {
        const rect = course.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementVisible = 150; // Расстояние до элемента, при котором начинается анимация
        
        if (scrollTop + windowHeight > elementTop + elementVisible) {
            course.classList.add('visible');
            course.classList.remove('hidden');
        } else {
            course.classList.remove('visible');
            course.classList.add('hidden');
        }
    });
}

// Добавляем обработчик прокрутки с устранением дребезга
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(checkVisibility);
});

function showCoursePopup(course) {
    const popup = document.getElementById('coursePopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupPrice = document.getElementById('popupPrice');

    popupImage.src = course.image;
    popupTitle.textContent = course.title;
    popupDescription.textContent = course.description;
    popupPrice.textContent = `${course.price} ₽`;
    
    // Сохраняем ID курса в атрибуте data-course-id
    popup.dataset.courseId = course.id;

    // Сначала показываем попап
    popup.style.display = 'flex';
    popup.style.visibility = 'visible';
    
    // Затем добавляем класс active для анимации
    setTimeout(() => {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closeCoursePopup() {
    const popup = document.getElementById('coursePopup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
    
    // Ждем окончания анимации перед скрытием попапа
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.visibility = 'hidden';
    }, 300);
}

// Закрываем попап при клике вне его содержимого
document.addEventListener('click', (e) => {
    const popup = document.getElementById('coursePopup');
    if (e.target === popup) {
        closeCoursePopup();
    }
});

function showNotification(message, isError = false, duration = 3000) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const notificationIcon = document.querySelector('.notification-icon');
    
    // Удаляем предыдущий таймер, если он существует
    if (notification.hideTimeout) {
        clearTimeout(notification.hideTimeout);
    }
    
    // Сначала удаляем все классы
    notification.classList.remove('show', 'error');
    notificationIcon.classList.remove('error');
    
    notificationText.textContent = message;
    
    // Затем добавляем нужные классы
    if (isError) {
        notification.classList.add('error');
        notificationIcon.classList.add('error');
    }
    
    // Добавляем класс show после небольшой задержки
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Используем переданную длительность или увеличенное время для ошибок
    const displayTime = isError ? 5000 : duration;
    
    // Сохраняем таймер
    notification.hideTimeout = setTimeout(() => {
        notification.classList.remove('show');
    }, displayTime);
}

function validateEmail(email) {
    if (!email || email.trim() === '') {
        showNotification('Пожалуйста, введите email', true);
        return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        showNotification('Пожалуйста, введите корректный email', true);
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (!password || password.trim() === '') {
        showNotification('Пожалуйста, введите пароль', true);
        return false;
    }
    if (password.length < 6) {
        showNotification('Пароль должен содержать минимум 6 символов', true);
        return false;
    }
    return true;
}

async function handleRegistration(event) {
    event.preventDefault();
    const form = document.querySelector('#authMenu .auth-form');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

    if (!name || name.trim() === '') {
        showNotification('Пожалуйста, введите ваше имя', true);
        return;
    }

    if (!validateEmail(email) || !validatePassword(password)) return;
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', true);
        return;
    }

    const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
    const response = await fetch("https://tricky-penguin-27.loca.lt/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            telegram_id: tgUser.id,
            telegram_username: tgUser.username,
            name,
            email,
            password
        })
    });

    const data = await response.json();
    if (response.ok) {
        showNotification('Регистрация успешна!');
        closeAuthMenu();
    } else {
        showNotification(data.error || 'Ошибка регистрации', true);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const form = document.querySelector('#loginMenu .auth-form');
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!validateEmail(email) || !validatePassword(password)) return;

    const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
    const response = await fetch("https://tricky-penguin-27.loca.lt/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            telegram_id: tgUser.id,
            email,
            password
        })
    });

    const data = await response.json();
    if (response.ok) {
        showNotification('Вход выполнен успешно!');
        closeLoginMenu();
    } else {
        showNotification(data.error || 'Ошибка входа', true);
    }
}

// Добавляем обработчики событий при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#authMenu .auth-form');
    const loginForm = document.querySelector('#loginMenu .auth-form');
    const paymentButton = document.getElementById('paymentButton');
    
    // Отключаем стандартную HTML5 валидацию
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.removeAttribute('required');
        input.setAttribute('novalidate', '');
    });
    
    registerForm.addEventListener('submit', handleRegistration);
    loginForm.addEventListener('submit', handleLogin);
    paymentButton.addEventListener('click', handlePayment);
    
    // Запускаем первую проверку видимости
    setTimeout(checkVisibility, 100);
});

function addToCart() {
    const popup = document.getElementById('coursePopup');
    const courseId = parseInt(popup.dataset.courseId);
    addToCartDirect(courseId);
    closeCoursePopup();
}

function addToCartDirect(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course && !cart.includes(course)) {
        cart.push(course);
        showNotification(`Курс "${course.title}" добавлен в корзину`);
        
        // Показываем кнопку оплаты и обновляем сумму
        const paymentButton = document.getElementById('paymentButton');
        const totalAmountDiv = document.getElementById('totalAmount');
        const totalAmount = cart.reduce((sum, c) => sum + c.price, 0);
        
        paymentButton.style.display = 'flex';
        totalAmountDiv.textContent = `Итого: ${totalAmount} ₽`;
        totalAmountDiv.classList.add('show');
    }
}

function displayCart() {
    const container = document.getElementById('coursesContainer');
    const paymentButton = document.getElementById('paymentButton');
    const totalAmountDiv = document.getElementById('totalAmount');
    
    container.innerHTML = '<h2>Корзина</h2>';
    
    if (cart.length === 0) {
        container.innerHTML += '<p>Корзина пуста</p>';
        paymentButton.style.display = 'none';
        totalAmountDiv.classList.remove('show');
        return;
    }
    
    let totalAmount = 0;
    
    cart.forEach(course => {
        totalAmount += course.price;
        const courseElement = document.createElement('div');
        courseElement.className = 'course';
        
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button onclick="removeFromCart(${course.id})">Удалить</button>
            </div>
        `;
        
        container.appendChild(courseElement);
    });

    // Показываем кнопку оплаты и общую сумму
    paymentButton.style.display = 'flex';
    totalAmountDiv.textContent = `Итого: ${totalAmount} ₽`;
    totalAmountDiv.classList.add('show');
}

function removeFromCart(courseId) {
    const course = cart.find(c => c.id === courseId);
    if (course) {
        cart = cart.filter(c => c.id !== courseId);
        showNotification(`Курс "${course.title}" удален из корзины`, false, 4000);
        
        // Обновляем отображение кнопки оплаты и суммы
        const paymentButton = document.getElementById('paymentButton');
        const totalAmountDiv = document.getElementById('totalAmount');
        
        if (cart.length === 0) {
            paymentButton.style.display = 'none';
            totalAmountDiv.classList.remove('show');
        } else {
            const totalAmount = cart.reduce((sum, c) => sum + c.price, 0);
            totalAmountDiv.textContent = `Итого: ${totalAmount} ₽`;
        }
        
        displayCart();
    }
}

function handlePayment() {
    if (cart.length === 0) {
        showNotification('Корзина пуста', true);
        return;
    }
    
    showPaymentMenu();
}

function showPaymentMenu() {
    const paymentMenu = document.getElementById('paymentMenu');
    const paymentItems = document.getElementById('paymentItems');
    const paymentTotal = document.getElementById('paymentTotal');
    
    // Очищаем содержимое
    paymentItems.innerHTML = '';
    
    // Добавляем товары
    let totalAmount = 0;
    cart.forEach(course => {
        totalAmount += course.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'payment-item';
        
        itemElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="payment-item-image">
            <div class="payment-item-info">
                <div class="payment-item-title">${course.title}</div>
                <div class="payment-item-price">${course.price} ₽</div>
            </div>
        `;
        
        paymentItems.appendChild(itemElement);
    });
    
    // Обновляем общую сумму
    paymentTotal.textContent = `Итого к оплате: ${totalAmount} ₽`;
    
    // Показываем меню
    document.body.style.overflow = 'hidden';
    paymentMenu.classList.add('active');
}

function closePaymentMenu() {
    const paymentMenu = document.getElementById('paymentMenu');
    paymentMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function processPayment() {
    const totalAmount = cart.reduce((sum, course) => sum + course.price, 0);
    showNotification(`Оплата на сумму ${totalAmount} ₽ прошла успешно!`);
    cart = [];
    closePaymentMenu();
    displayCart();
}

// Добавляем обработчик клика вне меню
document.addEventListener('click', (e) => {
    const paymentMenu = document.getElementById('paymentMenu');
    if (e.target === paymentMenu) {
        closePaymentMenu();
    }
});

function showAuthMenu() {
    closeLoginMenu();
    const authMenu = document.getElementById('authMenu');
    authMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthMenu() {
    const authMenu = document.getElementById('authMenu');
    authMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function showLoginMenu() {
    closeAuthMenu();
    const loginMenu = document.getElementById('loginMenu');
    loginMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginMenu() {
    const loginMenu = document.getElementById('loginMenu');
    loginMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function showForgotPassword() {
    const title = document.querySelector('#loginMenu .auth-menu-title');
    const form = document.querySelector('#loginMenu .auth-form');
    const footer = document.querySelector('#loginMenu .auth-menu-footer');
    
    title.textContent = 'Восстановление пароля';
    form.innerHTML = `
        <input type="email" placeholder="Email" novalidate>
        <button type="submit" onclick="handleForgotPassword(event)">Отправить инструкции</button>
    `;
    footer.innerHTML = '<p><a href="#" onclick="restoreLoginForm()">Вернуться к входу</a></p>';
}

function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.querySelector('#loginMenu input[type="email"]').value;
    
    if (!validateEmail(email)) {
        return;
    }
    
    showNotification('Инструкции по восстановлению пароля отправлены на ваш email');
    restoreLoginForm();
}

function restoreLoginForm() {
    const title = document.querySelector('#loginMenu .auth-menu-title');
    const form = document.querySelector('#loginMenu .auth-form');
    const footer = document.querySelector('#loginMenu .auth-menu-footer');
    
    title.textContent = 'Вход в аккаунт';
    form.innerHTML = `
        <input type="email" placeholder="Email" required>
        <input type="password" placeholder="Пароль" required>
        <button type="submit">Войти</button>
    `;
    footer.innerHTML = `
        <p>Нет аккаунта? <a href="#" onclick="showAuthMenu()">Зарегистрироваться</a></p>
        <p><a href="#" onclick="showForgotPassword()">Забыли пароль?</a></p>
    `;
}

document.addEventListener('click', (e) => {
    const authMenu = document.getElementById('authMenu');
    const loginMenu = document.getElementById('loginMenu');
    if (e.target === authMenu) {
        closeAuthMenu();
    }
    if (e.target === loginMenu) {
        closeLoginMenu();
    }
});

document.querySelector('.login-btn').onclick = showLoginMenu;

window.onload = () => {
    displayCourses();
};
