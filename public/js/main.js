document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('my-form');
    const dataList = document.getElementById('data-list');
    const formError = document.getElementById('form-error');

    // Функция для отображения отзывов
    function displayReview(review) {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>Name: ${review.name}</p>
            <p>E-mail: ${review.email}</p>
            <p>Review: ${review.message}</p>
        `;
        dataList.appendChild(li);
    }

    // Функция для загрузки отзывов
    function loadReviews() {
        fetch('/reviews')
            .then(response => response.json())
            .then(reviews => {
                dataList.innerHTML = '';
                reviews.forEach(review => {
                    displayReview(review);
                });
                localStorage.setItem('reviews', JSON.stringify(reviews));
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                formError.textContent = 'Error loading reviews';
            });
    }

    // Функция для отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const review = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            business: formData.get('business') === 'on',
            study: formData.get('study') === 'on',
            development: formData.get('development') === 'on'
        };
        if (!review.name || !review.email || !review.message) {
            displayError('All fields must be filled out');
            return;
        }

        //отправка данных на сервер
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error sending data to server');
                }
                loadReviews();
                return response.json();
            })
            .then(() => {
                form.reset();
                formError.textContent = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Загрузка отзывов при загрузке страницы
    loadReviews();
});



