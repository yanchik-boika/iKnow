var tableCells = document.querySelectorAll('table td button');

// Перебираем каждую ячейку и назначаем обработчик события клика
tableCells.forEach(function(cell) {
    cell.addEventListener('click', function() {
        // Показываем модальное окно, которое является следующим соседним элементом
        this.nextElementSibling.style.display = "block";
    });
});

// Находим все элементы с классом "close"
var closeButtons = document.querySelectorAll('.close');

// Перебираем каждую кнопку закрытия и назначаем обработчик события клика
closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var modal = this.closest('.modal');
        modal.style.display = "none"; // Скрываем модальное окно
    });
});