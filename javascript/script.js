let beurtenTeller = 0;
let eersteKaart = "";
let tweedeKaart = "";

let kaartGeselecteerd = false; // Variable to track if a kaart is already geselecteerd

const kaarten = document.querySelectorAll(".kaarten .kaart");
const resetButton = document.getElementById('resetButton'); // Selecteert de reset knop

//Speelt een 'goed' of 'fout' geluid af

function speelCorrectGeluid() {
    const audio = new Audio('audio/correct.mp3');
    audio.play();
}

function speelIncorrectGeluid() {
    const audio = new Audio('audio/incorrect.mp3');
    audio.play();
}

//Checkt of het spel is afgelopen door het aantal gecheckte kaarte te vergelijken met het aantal kaarten
function checkSpelStatus() {
    const gecheckedekaarten = document.querySelectorAll('.kaart.gechecked');
    if (gecheckedekaarten.length === kaarten.length) {
        // Alle setjes zijn geraden, toon de reset knop
        resetButton.style.display = 'block';
    }
}

kaarten.forEach((kaart) => {
    kaart.addEventListener("click", () => {
        // Ignore click if the kaart is already geselecteerd
        if (kaart.classList.contains("geselecteerd")) {
            return;
        }

        kaart.classList.add("geselecteerd");
        kaartGeselecteerd = true; // Mark the kaart as geselecteerd

        if (beurtenTeller === 0) {
            eersteKaart = kaart.dataset.bloem;
            beurtenTeller++;

            eesteKaartElement = kaart;
        } else {
            tweedeKaart = kaart.dataset.bloem;
            beurtenTeller = 0;

            if (eersteKaart === tweedeKaart) {
                const correctkaarten = document.querySelectorAll(".kaart[data-bloem='" + eersteKaart + "']");

                correctkaarten[0].classList.add("gechecked");
                correctkaarten[0].classList.remove("geselecteerd");
                correctkaarten[1].classList.add("gechecked");
                correctkaarten[1].classList.remove("geselecteerd");

                speelCorrectGeluid();

            } else {
                const incorrectkaarten = document.querySelectorAll(".kaart.geselecteerd");

                incorrectkaarten[0].classList.add("fout");
                incorrectkaarten[1].classList.add("fout");


                //Dit stuk code zorgt ervoor dat de kaarten weer omdraaien als ze fout zijn
                setTimeout(() => {
                    incorrectkaarten[0].classList.remove("fout");
                    incorrectkaarten[0].classList.remove("geselecteerd");
                    incorrectkaarten[1].classList.remove("fout");
                    incorrectkaarten[1].classList.remove("geselecteerd");
                }, 800);

                speelIncorrectGeluid();
            }

            checkSpelStatus();
        }
    });
});


//Schud de kaarten elk potje opnieuw door de op een andere volgorde weer te geven
function schudkaarten() {
    const kaartenContainer = document.querySelector('.kaarten');
    const kaarten = document.querySelectorAll('.kaarten .kaart');

    const kaartenArray = Array.from(kaarten);

    kaartenArray.sort(() => Math.random() - 0.5);

    kaartenContainer.innerHTML = '';

    kaartenArray.forEach((kaart) => {
        kaartenContainer.appendChild(kaart);
    });
}

document.addEventListener('DOMContentLoaded', schudkaarten);


resetButton.addEventListener('click', () => {
    // Reset alle kaarten
    kaarten.forEach((kaart) => {
        kaart.classList.remove('gechecked', 'geselecteerd', 'fout');
    });

    // Verberg de reset knop
    resetButton.style.display = 'none';

    // Schud de kaarten opnieuw
    schudkaarten();
});