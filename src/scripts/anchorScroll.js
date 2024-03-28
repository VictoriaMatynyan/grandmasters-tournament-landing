const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach(function(anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // получаем значение атрибута href у текущей ссылки и удаляем первый символ - # (1)
        // так мы получим id элемента на странице, к которому хотим прокрутиться
        const elementID = anchor.getAttribute('href').substring(1);
        document.getElementById(elementID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
