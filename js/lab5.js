//  Задание 1-5
const TASK1_BUTTON_HIDE_FIELD = document.getElementById('hideFieldBtn');
const TASK1_BUTTON_ALERT = document.getElementById('alertBtn');
const TASK1_BUTTON_LOCK = document.getElementById('lockBtn');
const TASK1_BUTTON_HIDE = document.getElementById('hideBtn');
const TASK1_BUTTON = document.getElementById('fillBtn');
const TASK1_INPUT = document.getElementById('fillArea');

var fieldLocked = false;
var fieldHided = false;
var textHided = false;
var hidedText = "";


function hideText() {
    textHided = !textHided;

    if (textHided) {
        TASK1_BUTTON_HIDE.innerHTML = "Показать содержимое";
        hidedText = TASK1_INPUT.value;
        TASK1_INPUT.value = "";
    } else {
        TASK1_BUTTON_HIDE.innerHTML = "Скрыть содержимое";
        TASK1_INPUT.value = hidedText + TASK1_INPUT.value;
        hidedText = "";
    }
}


function hideField() {
    fieldHided = !fieldHided;

    if (fieldHided) {
        TASK1_INPUT.style.visibility = 'hidden';
        TASK1_BUTTON_HIDE_FIELD.innerHTML = "Показать поле";

        TASK1_BUTTON.setAttribute('disabled', false);
        TASK1_BUTTON_ALERT.setAttribute('disabled', false);
        TASK1_BUTTON_LOCK.setAttribute('disabled', false);
        TASK1_BUTTON_HIDE.setAttribute('disabled', false);
    } else {
        TASK1_INPUT.style.visibility = 'visible';
        TASK1_BUTTON_HIDE_FIELD.innerHTML = "Скрыть поле";

        TASK1_BUTTON.removeAttribute('disabled');
        TASK1_BUTTON_ALERT.removeAttribute('disabled');
        TASK1_BUTTON_LOCK.removeAttribute('disabled');
        TASK1_BUTTON_HIDE.removeAttribute('disabled');
    }
}


function lockField() {
    fieldLocked = !fieldLocked;

    if (fieldLocked) {
        TASK1_INPUT.setAttribute('disabled', false);
        TASK1_BUTTON.setAttribute('disabled', false);
        TASK1_BUTTON_HIDE.setAttribute('disabled', false);
        TASK1_BUTTON_HIDE_FIELD.setAttribute('disabled', false);
        TASK1_BUTTON_LOCK.innerHTML = 'Разблокировать поле';
    } else {
        TASK1_INPUT.removeAttribute('disabled');
        TASK1_BUTTON.removeAttribute('disabled');
        TASK1_BUTTON_HIDE.removeAttribute('disabled');
        TASK1_BUTTON_HIDE_FIELD.removeAttribute('disabled', false);
        TASK1_BUTTON_LOCK.innerHTML = 'Заблокировать поле';
    }
}


function alertText() {
    if (TASK1_INPUT.value.trim() != "") {
        alert(TASK1_INPUT.value);
    } else {
        alert('Вы ничего не ввели!');
    }
}


function fillText() {
    TASK1_INPUT.value = `Текст заполнен!`;
}


TASK1_BUTTON_HIDE_FIELD.addEventListener('click', hideField);
TASK1_BUTTON_ALERT.addEventListener('click', alertText);
TASK1_BUTTON_LOCK.addEventListener('click', lockField);
TASK1_BUTTON_HIDE.addEventListener('click', hideText);
TASK1_BUTTON.addEventListener('click', fillText);

// Задание 6
const circle = document.getElementById('circleTouch');

circle.addEventListener('mouseenter', () => {
    circle.style.backgroundColor = 'green';
});

circle.addEventListener('mouseleave', () => {
    circle.style.backgroundColor = 'red';
});

// Задание 7
const circles = document.querySelectorAll('.cliсked');

function inSimpleColor(rgbString) {
    return rgbString === 'rgb(255, 0, 0)' ? 'red' : 'green';
}

circles.forEach((element) => {
    element.addEventListener('click', (event) => {
        let currentColor = inSimpleColor(window.getComputedStyle(element).getPropertyValue('background-color'));

        if (currentColor == 'green') {
            element.style.backgroundColor = 'red';
        } else {
            circles.forEach((circle) => {
                circle.style.backgroundColor = 'red';
            });
            element.style.backgroundColor = 'green';
        }
    });
});

// Задание 8
const suggestions = [
    "яблоко",
    "груша",
    "банан",
    "апельсин",
    "лимон",
    "персик",
    "слива",
    "виноград"
];


const searchField = document.getElementById('search');
const searchList = document.getElementById('searchList');


searchField.addEventListener('input', function () {
    const value = this.value.toLowerCase();

    if (value.trim().length === 0) {
        searchList.innerHTML = '';
        return;
    }

    // Фильтрация массива по введенному значению
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.includes(value));

    // Очистка списка перед добавлением новых элементов
    searchList.innerHTML = '';

    // Добавление отфильтрованных значений в список
    filteredSuggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        searchList.appendChild(listItem);
    });
});



// Задание 9
document.addEventListener('mousemove', (e) => {
    const container = document.getElementById('cursor-trail-container');

    // Создаем следы при первом запуске
    if (!container.childNodes.length) {
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('span');
            trail.classList.add('cursor-trail');
            container.appendChild(trail);
        }
    }

    const trails = document.querySelectorAll('.cursor-trail');
    trails.forEach((trail, index) => {
        const to = {
            x: e.clientX + Math.random() * 40 - 20, // Смещение по X
            y: e.clientY + Math.random() * 40 - 20  // Смещение по Y
        };

        setTimeout(() => {
            trail.style.transform = `translate(${to.x}px, ${to.y}px)`;
        }, index * 70);
    });
});

// Задание 10
const draggable = document.getElementById('draggable');

draggable.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.id);

    document.body.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    document.body.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const target = document.getElementById(data);
        const rect = target.getBoundingClientRect();

        target.style.left = `${event.pageX - rect.width / 2}px`;
        target.style.top = `${event.pageY - rect.height / 2}px`;
    });
});



// Задание 11

let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
let scoreBlock = document.querySelector(".game-score .score-count");


let score = 0;

const config = {
    step: 0,
    maxStep: 6,
    sizeCell: 16,
    sizeBerry: 16 / 4
};

const snake = {
    x: 160,
    y: 160,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3
};

let berry = {
    x: 0,
    y: 0
}; 

drawScore();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (++config.step < config.maxStep) {
        return;
    }
    config.step = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    updateSnake();
    drawSnake();
    drawBerry();
}

requestAnimationFrame(gameLoop);

function updateSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    snake.tails.unshift({ x: snake.x, y: snake.y });

    if (snake.tails.length > snake.maxTails) {
        snake.tails.pop();
    }

    checkCollisionWithSelf();
    checkCollisionWithBerry();
}

function drawSnake() {
    snake.tails.forEach((el, index) => {
        context.fillStyle = index === 0 ? 'aqua' : 'white';
        context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);
    });
}

function collisionBorder() {
    if (snake.x < 0) {
        snake.x = canvas.width - config.sizeCell;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - config.sizeCell;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
}

function checkCollisionWithSelf() {
    for (let i = 1; i < snake.tails.length; i++) {
        if (snake.tails[0].x === snake.tails[i].x && snake.tails[0].y === snake.tails[i].y) {
            refreshGame();
        }
    }
}

function checkCollisionWithBerry() {
    if (snake.tails[0].x === berry.x && snake.tails[0].y === berry.y) {
        snake.maxTails++;
        incScore();
        randomPositionBerry();
    }
}

function refreshGame() {
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionBerry();
}

function drawBerry() {
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
    context.fill();
}

function randomPositionBerry() {
    do {
        berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
        berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
    } while (isBerryInSnake());
}

function isBerryInSnake() {
    return snake.tails.some(segment => segment.x === berry.x && segment.y === berry.y);
}

function incScore() {
    score++;
    drawScore();
}

function drawScore() {
    scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", function(e) {
    const currentDirection = { x: snake.dx, y: snake.dy };

    switch (e.code) {
        case "KeyW":
            if (currentDirection.y !== config.sizeCell) {
                snake.dy = -config.sizeCell;
                snake.dx = 0;
            }
            break;
        case "KeyA":
            if (currentDirection.x !== config.sizeCell) {
                snake.dx = -config.sizeCell;
                snake.dy = 0;
            }
            break;
        case "KeyS":
            if (currentDirection.y !== -config.sizeCell) {
                snake.dy = config.sizeCell;
                snake.dx = 0;
            }
            break;
        case "KeyD":
            if (currentDirection.x !== -config.sizeCell) {
                snake.dx = config.sizeCell;
                snake.dy = 0;
            }
            break;
    }
});