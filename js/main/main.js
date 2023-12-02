
// Обработка скролла в стороны картинок НАЧАЛО
document.getElementById('next').onclick = function () {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function () {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;
}

// КОНЕЦ Обработка скролла в стороны картинок картинок 

