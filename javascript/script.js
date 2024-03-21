let counter = 0;
let firstSelection = "";
let secondSelection = "";

const cards = document.querySelectorAll(".cards .card");
const resetButton = document.getElementById('resetButton'); // Selecteer de reset knop

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.add("clicked");

        if (counter === 0) {
            firstSelection = card.dataset.bloem;
            counter++;
        } else {
            secondSelection = card.dataset.bloem;
            counter = 0;

            if (firstSelection === secondSelection) {
                const correctCards = document.querySelectorAll(
                    ".card[data-bloem='" + firstSelection + "']"
                );

                correctCards[0].classList.add("checked");
                correctCards[0].classList.remove("clicked");
                correctCards[1].classList.add("checked");
                correctCards[1].classList.remove("clicked");
            } else {
                const incorrectCards = document.querySelectorAll(".card.clicked");

                incorrectCards[0].classList.add("shake");
                incorrectCards[1].classList.add("shake");

                setTimeout(() => {
                    incorrectCards[0].classList.remove("shake");
                    incorrectCards[0].classList.remove("clicked");
                    incorrectCards[1].classList.remove("shake");
                    incorrectCards[1].classList.remove("clicked");
                }, 800);
            }

            checkGameStatus();
        }
    });
});

function checkGameStatus() {
    const checkedCards = document.querySelectorAll('.card.checked');
    if (checkedCards.length === cards.length) {
        // Alle setjes zijn geraden, toon de reset knop
        resetButton.style.display = 'block';
    }
}

resetButton.addEventListener('click', () => {
    // Reset alle kaarten
    cards.forEach((card) => {
        card.classList.remove('checked', 'clicked', 'shake');
    });

    // Verberg de reset knop
    resetButton.style.display = 'none';

    // Schud de kaarten opnieuw
    shuffleCards();
});

function shuffleCards() {
    const cardsContainer = document.querySelector('.cards');
    const cards = document.querySelectorAll('.cards .card');

    const cardsArray = Array.from(cards);

    cardsArray.sort(() => Math.random() - 0.5);

    cardsContainer.innerHTML = '';

    cardsArray.forEach((card) => {
        cardsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', shuffleCards);
