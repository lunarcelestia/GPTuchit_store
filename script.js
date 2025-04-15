// Функция для добавления курса в корзину
function addToCart(courseId) {
    // Здесь можно добавить логику для добавления курса в корзину
    console.log(Курс с ID ${ courseId } добавлен в корзину!);

    // Пример всплывающего уведомления
    alert(Курс с ID ${ courseId } добавлен в корзину!);
}

// Пример загрузки курсов (можно заменить на реальный API запрос)
document.addEventListener("DOMContentLoaded", function () {
    const courses = [
        { id: 1, name: "Курс 1", description: "Описание курса 1" },
        { id: 2, name: "Курс 2", description: "Описание курса 2" },
        { id: 3, name: "Курс 3", description: "Описание курса 3" }
    ];

    const coursesContainer = document.querySelector('.courses-container');

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = 
            <div class="course-title">${course.name}</div>
            <div class="course-description">${course.description}</div>
            <button class="add-to-cart" onclick="addToCart(${course.id})">Добавить в корзину</button>
            ;
        coursesContainer.appendChild(courseCard);
    });
});