function displayStages() {
    const stages = document.querySelectorAll('.stages__item');
    const leftButton = document.querySelector('.slider-btn-left');
    const rightButton = document.querySelector('.slider-btn-right');
    const maxIndex = stages.length - 1;
    let currentIndex = 0;

    // показываем первый элемент
    showSlide(currentIndex);

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
            } else {
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
            } else {
                currentIndex--;
            }
            showSlide(currentIndex);
        }
    });
    
    function showSlide(index) {
        if (window.innerWidth < 990) {
            if (index === 0) {
                stages[0].style.display = "flex";
                stages[1].style.display = "flex";
                stages[4].style.display = "none";
            }
            if (index === 2) {
                stages[4].style.display = "none";
            }
            
            if (index === 3) {
                stages[2].style.display = "none";
                stages[3].style.display = "flex";
                stages[4].style.display = "flex";
                stages[5].style.display = "none";
            }
            if (index === 4) {
                stages[4].style.display = "none";
                stages[5].style.display = "flex";
            } else {
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
