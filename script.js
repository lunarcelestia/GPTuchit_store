const courses = [
    {
        id: 1,
        title: "Основы написания промптов",
        description: "Научитесь создавать эффективные промпты для GPT с нуля",
        image: "https://img.freepik.com/free-vector/online-games-concept_23-2148533383.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740",
        price: 0,
        isFree: true,
        freeLink: "https://docs.google.com/document/d/1N4vn6r5BAvhfDTOGeHeOkGWoJs5f-kZK_vCxN6gGaWU/edit?usp=sharing"
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

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('Initial theme:', savedTheme);

    // Обработчик клика
    themeToggle.addEventListener('click', (e) => {
        console.log('Theme toggle clicked');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Устанавливаем новую тему
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('Theme changed to:', newTheme);
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', initThemeToggle);

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
    popupPrice.textContent = course.isFree ? 'Бесплатно' : `${course.price} ₽`;
    
    const button = popup.querySelector('button');
    button.textContent = 'Добавить в корзину';
    button.onclick = addToCart;
    
    popup.dataset.courseId = course.id;
    popup.style.display = 'flex';
    popup.style.visibility = 'visible';
    
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

// Функция для отображения отладочных сообщений на странице
function debugLog(message) {
    // Используем новый логгер
    if (window.authLogger) {
        window.authLogger.addLog(message);
    }
    
    // Выводим в консоль для отладки (только в режиме разработки)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(message);
    }
}

// Функция для тестирования форм вне Telegram
function testFormSubmission(type, data) {
    debugLog(`Тестовый режим: ${type} с данными ${JSON.stringify({...data, password: '***'})}`);
    
    // Имитация успешного ответа
    setTimeout(() => {
        if (type === 'register') {
            showNotification('Тестовый режим: Регистрация успешно завершена!');
            closeAuthMenu();
        } else if (type === 'login') {
            showNotification('Тестовый режим: Вход выполнен успешно!');
            closeLoginMenu();
        }
    }, 1000);
}

// Функции для работы с localStorage
function saveUserToStorage(userData) {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (error) {
        console.error('Ошибка при сохранении пользователя:', error);
        return false;
    }
}

function findUserByEmail(email) {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.email === email);
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error);
        return null;
    }
}

// Обновляем функцию handleRegistration
function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', true);
        return;
    }

    // Проверяем, существует ли пользователь
    const existingUser = findUserByEmail(email);
    if (existingUser) {
        showNotification('Пользователь с таким email уже существует', true);
        return;
    }

    // Создаем объект пользователя
    const userData = {
        name,
        email,
        password,
        registeredAt: new Date().toISOString()
    };

    // Сохраняем пользователя
    if (saveUserToStorage(userData)) {
        showNotification('Регистрация успешно завершена!');
        closeAuthMenu();
        showLoginMenu();
    } else {
        showNotification('Ошибка при регистрации', true);
    }
}

// Обновляем функцию handleLogin
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }

    // Ищем пользователя
    const user = findUserByEmail(email);
    
    if (!user) {
        showNotification('Пользователь не найден', true);
        return;
    }

    if (user.password !== password) {
        showNotification('Неверный пароль', true);
        return;
    }

    // Сохраняем информацию о входе
    localStorage.setItem('currentUser', JSON.stringify({
        name: user.name,
        email: user.email,
        lastLogin: new Date().toISOString()
    }));

    showNotification('Вход выполнен успешно!');
    closeLoginMenu();
    updateAuthButtons();
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    updateAuthButtons();
    showNotification('Вы вышли из аккаунта');
}

function updateAuthButtons() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelector('.auth-buttons');
    
    if (currentUser) {
        authButtons.innerHTML = `
            <span class="user-name" onclick="showProfileMenu()">${currentUser.name}</span>
            <button class="logout-btn" onclick="handleLogout()">Выйти</button>
            ${currentUser.email === 'admin@example.com' ? '<button class="admin-btn" onclick="showAdminPanel()">Админ</button>' : ''}
        `;
    } else {
        authButtons.innerHTML = `
            <button class="login-btn" onclick="showLoginMenu()">Войти</button>
            <button class="register-btn" onclick="showAuthMenu()">Регистрация</button>
        `;
    }
}

// Функция для создания администратора при первом запуске
function createAdminIfNotExists() {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const adminExists = users.some(user => user.email === 'admin@example.com');
        
        // Проверяем, находимся ли мы на GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        // Если мы на GitHub Pages или администратор не существует, создаем его
        if (isGitHubPages || !adminExists) {
            // Удаляем существующего администратора, если он есть
            if (adminExists) {
                const updatedUsers = users.filter(user => user.email !== 'admin@example.com');
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            }
            
            const adminUser = {
                name: 'Администратор',
                email: 'admin@example.com',
                password: 'admin123', // Простой пароль для демонстрации
                registeredAt: new Date().toISOString()
            };
            
            // Получаем обновленный список пользователей
            const updatedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            updatedUsers.push(adminUser);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            console.log('Администратор создан');
        }
    } catch (error) {
        console.error('Ошибка при создании администратора:', error);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    displayCourses();
    createAdminIfNotExists(); // Создаем администратора, если его нет
    updateAuthButtons();
    
    // Добавляем обработчики форм
    document.querySelector('#authMenu form').addEventListener('submit', handleRegistration);
    document.querySelector('#loginMenu form').addEventListener('submit', handleLogin);
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

    // Создаем контейнер для новой структуры корзины
    const cartLayout = document.createElement('div');
    cartLayout.className = 'cart-layout';

    // Левая часть с большими иконками
    const leftSection = document.createElement('div');
    leftSection.className = 'cart-items-large';
    cart.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'cart-item-large';
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button onclick="removeFromCart(${course.id})">Удалить</button>
            </div>
        `;
        leftSection.appendChild(courseElement);
    });

    // Правая часть с итогами
    const rightSection = document.createElement('div');
    rightSection.className = 'cart-summary';
    
    // Заголовок "Итого"
    const summaryTitle = document.createElement('h3');
    summaryTitle.className = 'summary-title';
    summaryTitle.textContent = 'Итого';
    rightSection.appendChild(summaryTitle);

    // Список товаров с ценами
    const itemsList = document.createElement('div');
    itemsList.className = 'summary-items-list';
    let totalAmount = 0;
    cart.forEach(course => {
        const itemRow = document.createElement('div');
        itemRow.className = 'summary-item-row';
        itemRow.innerHTML = `
            <span class="item-title">${course.title}</span>
            <span class="item-price">${course.isFree ? 'Бесплатно' : `${course.price} ₽`}</span>
        `;
        itemsList.appendChild(itemRow);
        totalAmount += course.price;
    });
    rightSection.appendChild(itemsList);

    // Итоговая сумма
    const totalSum = document.createElement('div');
    totalSum.className = 'total-sum';
    totalSum.textContent = `Итого: ${totalAmount} ₽`;
    rightSection.appendChild(totalSum);

    // Добавляем кнопки
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'cart-buttons';

    // Кнопка оформления заказа
    const checkoutButton = document.createElement('button');
    checkoutButton.className = 'checkout-button';
    checkoutButton.textContent = 'Оформить заказ';
    checkoutButton.onclick = showCheckoutModal;
    buttonsContainer.appendChild(checkoutButton);

    // Проверяем наличие бесплатного курса
    const hasFreeIntro = cart.some(course => course.id === 1);
    if (hasFreeIntro) {
        const viewIntroButton = document.createElement('button');
        viewIntroButton.className = 'view-intro-button';
        viewIntroButton.textContent = 'Посмотреть вводный курс';
        viewIntroButton.onclick = () => window.open(courses[0].freeLink, '_blank');
        buttonsContainer.appendChild(viewIntroButton);
    }

    rightSection.appendChild(buttonsContainer);

    // Собираем всё вместе
    cartLayout.appendChild(leftSection);
    cartLayout.appendChild(rightSection);
    container.appendChild(cartLayout);

    // Обновляем отображение общей суммы
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
    initThemeToggle();
};

function exportUserData() {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.length === 0) {
            showNotification('Нет данных пользователей для экспорта', true);
            return;
        }
        
        // Создаем объект с данными для экспорта
        const exportData = {
            users: users,
            exportDate: new Date().toISOString(),
            totalUsers: users.length
        };
        
        // Преобразуем в JSON
        const jsonData = JSON.stringify(exportData, null, 2);
        
        // Создаем Blob и ссылку для скачивания
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Создаем ссылку для скачивания
        const a = document.createElement('a');
        a.href = url;
        a.download = `gptuchit_users_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        
        // Очищаем
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        showNotification('Данные пользователей успешно экспортированы');
    } catch (error) {
        console.error('Ошибка при экспорте данных:', error);
        showNotification('Ошибка при экспорте данных', true);
    }
}

// Добавляем кнопку экспорта в интерфейс администратора
function showAdminPanel() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('Для доступа к панели администратора необходимо войти', true);
        return;
    }
    
    // Проверяем, является ли пользователь администратором
    // В реальном приложении здесь должна быть проверка роли пользователя
    if (currentUser.email !== 'admin@example.com') {
        showNotification('У вас нет прав для доступа к панели администратора', true);
        return;
    }
    
    // Создаем модальное окно администратора
    const adminModal = document.createElement('div');
    adminModal.className = 'admin-modal';
    adminModal.innerHTML = `
        <div class="admin-modal-content">
            <div class="admin-modal-header">
                <h2>Панель администратора</h2>
                <button class="admin-modal-close" onclick="closeAdminPanel()">&times;</button>
            </div>
            <div class="admin-modal-body">
                <h3>Пользователи (${JSON.parse(localStorage.getItem('users') || '[]').length})</h3>
                <button onclick="exportUserData()">Экспортировать данные пользователей</button>
                <div class="admin-users-list">
                    ${renderUsersList()}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(adminModal);
    document.body.style.overflow = 'hidden';
    
    // Добавляем класс для анимации
    setTimeout(() => {
        adminModal.classList.add('active');
    }, 10);
}

function closeAdminPanel() {
    const adminModal = document.querySelector('.admin-modal');
    if (adminModal) {
        adminModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(adminModal);
            document.body.style.overflow = '';
        }, 300);
    }
}

function renderUsersList() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
        return '<p>Нет зарегистрированных пользователей</p>';
    }
    
    return `
        <table class="admin-users-table">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Дата регистрации</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${new Date(user.registeredAt).toLocaleString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showProfileMenu() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('Для просмотра профиля необходимо войти', true);
        return;
    }

    const profileMenu = document.getElementById('profileMenu');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');

    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;

    profileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Добавляем функцию для отображения модального окна оплаты
function showCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
        <div class="checkout-modal-content">
            <h2>Оформление заказа</h2>
            <button class="close-btn" onclick="closeCheckoutModal()">&times;</button>
            <form class="checkout-form">
                <div class="form-group">
                    <label>Номер карты</label>
                    <input type="text" placeholder="0000 0000 0000 0000" maxlength="19">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Срок действия</label>
                        <input type="text" placeholder="ММ/ГГ" maxlength="5">
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="password" placeholder="***" maxlength="3">
                    </div>
                </div>
                <div class="form-group">
                    <label>Имя владельца</label>
                    <input type="text" placeholder="IVAN IVANOV">
                </div>
                <button type="button" class="checkout-submit-btn">Оплатить</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Добавляем обработчик для закрытия по клику вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCheckoutModal();
        }
    });

    // Показываем модальное окно
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.querySelector('.checkout-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}
