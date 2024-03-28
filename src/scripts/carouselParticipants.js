document.addEventListener('DOMContentLoaded', function () {
    const participants = document.querySelectorAll('.competitors__competitor-card');
    const totalParticipants = participants.length;
    let currentIndex = 0; // индекс текущей карточки

    function displayParticipants(startIndex, displayCount) {
        // скрываем все карточки
        participants.forEach(participant => participant.style.display = 'none');
        // отображаем карточки, начиная с startIndex
        for (let i = 0; i < displayCount; i++) {
            // % - оператором остатка от деления не даём выйти циклу за пределы длины массива
            participants[(startIndex + i) % totalParticipants].style.display = 'flex';
        }
    }

    function startCarousel(state) {
        setInterval(function () {
            currentIndex = (currentIndex + 1) % totalParticipants;
            displayParticipants(currentIndex, state.cardsPerPage);
        }, 4000);
    }

    function initializeCarousel() {
        const pagination = {
            left: document.querySelector('.btn-left'),
            right: document.querySelector('.btn-right'),
            count: document.querySelector('.pagination__count > .highlight'),
            total: document.querySelector('.pagination__count > .total')
        };

        const state = {
            currentPage: 1,
            cardsPerPage: 3
        };

        function updatePaginationCounter() {
            const containerWidth = document.querySelector('.competitors__gallery').offsetWidth;
            const cardWidth = participants[0].offsetWidth;
            const displayedCards = Math.floor(containerWidth / cardWidth);

            if (displayedCards >= 3) {
                state.cardsPerPage = 3;
            } else if (displayedCards === 2) {
                state.cardsPerPage = 2;
            } else {
                state.cardsPerPage = 1;
            }

            pagination.count.textContent = state.cardsPerPage;
            pagination.total.textContent = participants.length;
            displayParticipants(currentIndex, state.cardsPerPage);
            updateButtons();
        }

        window.addEventListener('resize', function () {
            currentIndex = 0; // обнуляем currentIndex при изменении размера окна
            updatePaginationCounter();
        });
        window.addEventListener('load', function () {
            updatePaginationCounter();
            startCarousel(state);
        });

        function updateButtons() {
            if (state.currentPage <= 1) {
                pagination.left.classList.add('pagination__button_disabled');
            } else {
                pagination.left.classList.remove('pagination__button_disabled');
            }

            if (state.currentPage >= Math.ceil(participants.length / state.cardsPerPage)) {
                pagination.right.classList.add('pagination__button_disabled');
            } else {
                pagination.right.classList.remove('pagination__button_disabled');
            }
        }

        function clickRight() {
            if (state.currentPage < Math.ceil(participants.length / state.cardsPerPage)) {
                state.currentPage++;
                displayParticipants(state.currentPage, state.cardsPerPage);
                pagination.count.textContent = state.cardsPerPage;
                updateButtons();
            }
        }

        function clickLeft() {
            if (state.currentPage > 1) {
                state.currentPage--;
                displayParticipants(state.currentPage, state.cardsPerPage);
                pagination.count.textContent = state.cardsPerPage;
                updateButtons();
            }
        }
       
        pagination.left.addEventListener('click', clickLeft);
        pagination.right.addEventListener('click', clickRight);

        pagination.count.textContent = state.cardsPerPage;
        pagination.total.textContent = participants.length;
        updateButtons();
    }

    initializeCarousel();
});
