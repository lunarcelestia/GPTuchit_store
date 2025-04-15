const courses = {
    'Курс 1': 'Подробное описание курса по написанию промптов.',
    'Курс 2': 'Изучите продвинутые техники промптинга.',
    'Курс 3': 'Как использовать GPT в бизнесе для повышения эффективности.',
    'Курс 4': 'Креативные подходы к созданию промптов.',
    'Бесплатный курс': 'Основы работы с GPT для новичков.'
};

function showCourseDetails(course) {
    document.getElementById('popupTitle').innerText = course;
    document.getElementById('popupDescription').innerText = courses[course];

    const popup = document.getElementById('coursePopup');
    popup.style.display = 'flex'; // Показываем попап
}

function closePopup() {
    const popup = document.getElementById('coursePopup');
    popup.style.display = 'none'; // Скрываем попап
}

function addToCart() {
    alert("Курс добавлен в корзину!");
}

function showPage(page) {
    // Логика для переключения между страницами (если нужно)
}
