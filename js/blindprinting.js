const WORDS = [ "свет", "дом", "книга", "время", "жизнь", "любовь", "душа", "земля", "город", "море", "небо", "солнце", "звезда", "месяц", "ветер", "дождь", "снег", "лето", "зима", "весна", "осень", "цветы", "птицы", "рыбы", "звери", "деревья", "горы", "река", "озеро", "путь", "мечта", "счастье", "грусть", "радость", "страх", "гнев", "сила", "слабость", "мудрость", "глупость", "красота", "уродство", "правда", "ложь", "добро", "зло", "справедливость", "несправедливость", "вера", "надежда", "люди", "мир", "война", "страна", "народ", "культура", "история", "язык", "наука", "искусство", "спорт", "музыка", "песни", "танцы", "театр", "кино", "книги", "журнал", "газета", "интернет", "компьютер", "телефон", "автомобиль", "поезд", "самолет", "корабль", "дом", "квартира", "комната", "кухня", "ванная", "спальня", "гостиная", "стол", "стул", "кровать", "шкаф", "зеркало", "часы", "картина", "ваза", "свеча", "книга", "ручка", "карандаш", "бумага", "нож", "ложка", "вилка", "тарелка", "стакан", "чайник", "кофе", "хлеб", "мясо", "рыба", "овощи", "фрукты", "вода", "молоко", "сок", "чай"]

const INPUT = document.getElementById('user_input');
const TIME = document.getElementById('time');
const HEALTH = document.getElementById('health');
const SCORE = document.getElementById('score');
const BUTTON = document.getElementById('start_btn');
const TEXTLINE = document.getElementById('game_text');

var game;
var timer;

var timeCoolDown;
var health;
var score;
var word;
var wordSpans;
var time;

function generateWord() {
    while (TEXTLINE.firstChild) {
        TEXTLINE.removeChild(TEXTLINE.lastChild);
    }


    word = "";
    INPUT.value = "";

    let countOfWords = 1;

    if (score > 10) {
        countOfWords = 2;
    } else if (score > 20) {
        countOfWords = 2;
    }

    for (let i = 0; i < countOfWords; i++) {
        word += WORDS[Math.floor(Math.random() * WORDS.length)] + " ";
    }   
    word = word.trim();

    for (let i = 0; i < word.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = word[i];
        TEXTLINE.appendChild(span);
    }

    wordSpans = TEXTLINE.childNodes;
}

function setGameSettings() {
    timeCoolDown = 11;
    health = 3;
    score = 0;

    HEALTH.textContent = "❤".repeat(health);
    SCORE.innerHTML = "Счёт: " + score;
}

function startGame() {
    BUTTON.setAttribute('disabled', true)
    INPUT.removeAttribute('disabled');

    setGameSettings();
    Timer();
}

function healthController() {
    HEALTH.textContent = "❤".repeat(--health);

    if (health == 0) {
        gameEnd();
    } else {
        generateWord();
    }
}

function scoreController() {
    INPUT.value = "";
    SCORE.innerHTML = "Счёт: " + ++score;
}

function Timer() {
    clearInterval(game);
    clearInterval(timer);

    generateWord();

    game = setInterval(() => {
        healthController();
    }, timeCoolDown * 1000 / 2);

    time = timeCoolDown;

    timer = setInterval(() => {
        if (time == 0) {
            time = timeCoolDown;
        }
        TIME.textContent = --time;
    }, 500);
}

function inputController() {
    for (let i = 0; i < word.length; i++) {
        if (INPUT.value[i] == word[i]) {
            wordSpans[i].style.color = 'red';
        } else {
            wordSpans[i].style.color = 'black';
        }
    }

    if (word == INPUT.value) {
        scoreController();
        Timer();
    }
}

function gameEnd() {
    BUTTON.removeAttribute('disabled');
    INPUT.setAttribute('disabled', true);
    TEXTLINE.textContent = "";
    TIME.textContent = "ИГРА ЗАКОНЧЕНА!";

    clearInterval(game);
    clearInterval(timer);
}

INPUT.addEventListener("keyup", inputController);