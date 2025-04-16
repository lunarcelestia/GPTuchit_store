const courses = [
    {
        id: 1,
        title: "Основы написания промптов",
        description: "Научитесь создавать эффективные промпты для GPT с нуля",
        image: "https://img.freepik.com/free-vector/online-games-concept_23-2148533383.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740"
    },
    {
        id: 2,
        title: "Продвинутые техники промптинга",
        description: "Углубленное изучение методов создания сложных промптов",
        image: "https://img.freepik.com/free-vector/authentication-concept-illustration_114360-2168.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740"
    },
    {
        id: 3,
        title: "GPT для бизнеса",
        description: "Как использовать GPT для автоматизации бизнес-процессов",
        image: "https://img.freepik.com/free-vector/hand-drawn-vpn-illustration_23-2149229495.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740"
    },
    {
        id: 4,
        title: "Креативный промптинг",
        description: "Создание креативных и нестандартных промптов",
        image: "https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740"
    },
    {
        id: 5,
        title: "Эксперт по GPT",
        description: "Полный курс по работе с GPT от основ до продвинутых техник",
        image: "https://img.freepik.com/free-vector/data-points-concept-illustration_114360-2194.jpg?ga=GA1.1.483021096.1744792171&semt=ais_hybrid&w=740"
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
    
    courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course';
        courseElement.onclick = () => showCourseDetails(course);
        
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            </div>
        `;
        
        container.appendChild(courseElement);
    });
}

function showCourseDetails(course) {
    const popup = document.getElementById('coursePopup');
    document.getElementById('popupTitle').textContent = course.title;
    document.getElementById('popupDescription').textContent = course.description;
    document.getElementById('popupImage').src = course.image;
    popup.style.display = 'flex';
}

function closePopup() {
    document.getElementById('coursePopup').style.display = 'none';
}

function addToCart() {
    const currentCourse = courses.find(course => 
        course.title === document.getElementById('popupTitle').textContent
    );
    
    if (currentCourse && !cart.includes(currentCourse)) {
        cart.push(currentCourse);
        alert('Курс добавлен в корзину!');
    }
}

function displayCart() {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '<h2>Корзина</h2>';
    
    if (cart.length === 0) {
        container.innerHTML += '<p>Корзина пуста</p>';
        return;
    }
    
    cart.forEach(course => {
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
}

function removeFromCart(courseId) {
    cart = cart.filter(course => course.id !== courseId);
    displayCart();
}

// Инициализация при загрузке страницы
window.onload = () => {
    displayCourses();
};
