function displayStages() {
    const stages = document.querySelectorAll('.stages__item');
    const leftButton = document.querySelector('.slider-btn-left');
    const rightButton = document.querySelector('.slider-btn-right');
    const maxIndex = stages.length - 1;
    let currentIndex = 0;
    const dots = document.querySelectorAll('.slider__container .slide');


    // показываем первый элемент
    showSlide(currentIndex);

    function updateActiveDot(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateButtons() {
        if (currentIndex <= 0) {
            leftButton.classList.add('slider__button_disabled');
        } else if(currentIndex >= maxIndex) {
            rightButton.classList.add('slider__button_disabled');
        }
        else {
            rightButton.classList.remove('slider__button_disabled');
            leftButton.classList.remove('slider__button_disabled');
        }
    }

    rightButton.addEventListener("click", function() {
        if (currentIndex < maxIndex) {
            hideSlide(currentIndex);
            if (currentIndex === 0) {
                currentIndex = 2; // после 1й карточки попадаем сразу на 3ю карточку
            }
            else {
                currentIndex++;
            }
            showSlide(currentIndex);
        }
    });

    leftButton.addEventListener("click", function() {
        if (currentIndex > 0) {
            hideSlide(currentIndex);
            if (currentIndex === 2) {
                currentIndex = 0; // после 3й карточки попадаем сразу на колонку с 1 и 2 индексами
                updateActiveDot(0);
            } else {
                currentIndex--;
            }
            showSlide(currentIndex);
        }
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            if (currentIndex === 2 || currentIndex === 3 ) {
                updateActiveDot(currentIndex - 1);
                showSlide(currentIndex);
            } else if (currentIndex === 5 || currentIndex === 6) {
                updateActiveDot(currentIndex - 1);
                showSlide(currentIndex - 1);
            } else {
                showSlide(currentIndex);
                updateActiveDot(currentIndex);
            }
        });
    });
    

    function showSlide(index) {
    

    // Затем отображаем карточку, соответствующую переданному индексу
    if (window.innerWidth < 990) {
        // Сначала скрываем все карточки
    const hideCards = stages.forEach(stage => {
        stage.style.display = "none";
    });
        if (index === 0) {
            stages[0].style.display = "flex";
            stages[1].style.display = "flex";
            // stages[4].style.display = "none";
            hideCards;
        }
        if (index === 2) {
            // stages[4].style.display = "none";
            updateActiveDot(1);
            hideCards;
        }
        if (index === 3) {
            // stages[2].style.display = "none";
            stages[3].style.display = "flex";
            stages[4].style.display = "flex";
            // stages[5].style.display = "none";
            hideCards;
            updateActiveDot(2);
        }
        if (index === 4) {
            // stages[4].style.display = "none";
            hideCards;
            stages[5].style.display = "flex";
            updateActiveDot(3);
        } else if (index === 5) {
            hideCards
            stages[6].style.display = "flex";
            // stages[5].style.display = "none";
            updateActiveDot(4);
        }
        else {
            stages[index].style.display = "flex";
        }
    }
    updateButtons();
}

    function hideSlide(index) {
        if (index === 0) {
            stages[0].style.display = "none";
            stages[1].style.display = "none";
        } else {
            stages[index].style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', displayStages);
