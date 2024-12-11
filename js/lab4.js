const TASK1_BTN = document.getElementById('addUser');
const TASK1_TEXT = document.getElementById('task1_result');
const TASK1_RESET_BTN = document.getElementById('reset1');

var users = [];


// Задание 1
function clearInput(input) {
    input.value = "";
}


function printUsers() {
    TASK1_TEXT.innerHTML = formatUsers(users);
}


function formatUsers(users) {
    return users.map(user => `<br>Имя: ${user.name}, возраст: ${user.age}`);
}


function addUser() {
    let user_name = document.getElementById('list_name').value;
    let user_age = document.getElementById('list_age').value;

    // Проверка на корректность ввода
    if (user_name.trim().length == 0 || user_age.trim().length == 0) {
        alert('Некорректный ввод!');
        return;
    }

    // Создаем нового пользователя
    let newUser = {
        name: user_name,
        age: user_age
    };

    // Добовляем пользователя в список
    users.push(newUser);

    // Отображение данных
    printUsers(users);

    // Отчистка полей
    clearInput(document.getElementById('list_name'));
    clearInput(document.getElementById('list_age'));
}


function resetTask1() {
    // Отчистка списка
    users = [];

    TASK1_TEXT.innerHTML = "Результат:";

    // Отчистка полей
    clearInput(document.getElementById('list_name'));
    clearInput(document.getElementById('list_age'));
}


TASK1_BTN.addEventListener('click', addUser);
TASK1_RESET_BTN.addEventListener('click', resetTask1)



// Задание 2
const TASK2_BTN = document.getElementById('addCat');
const TASK2_TBODY = document.getElementById('task2_tbody');
const TASK2_RESET_BTN = document.getElementById('reset2');


function createTableRow(cat) {
    const row = document.createElement('tr');

    Object.values(cat).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
    });

    return row;
}


function addCat() {
    let cat_name = document.getElementById('cat_name').value;
    let cat_color = document.getElementById('cat_color').value;
    let cat_age = document.getElementById('cat_age').value;
    let cat_gender = document.getElementById('cat_gender').value;

    // Проверка на корректность ввода
    let condition1 = cat_name.trim().length == 0 || cat_age.trim().length == 0;
    let condition2 = cat_gender.trim().length == 0 || cat_gender.trim().length == 0;

    if (condition1 || condition2) {
        alert('Некорректный ввод!');
        return;
    }

    // Создание объекта
    let newCat = {
        name: cat_name,
        color: cat_color,
        gender: cat_gender,
        age: cat_age,
    };

    TASK2_TBODY.appendChild(createTableRow(newCat));

    // Отчистка полей
    clearInput(document.getElementById('cat_name'));
    clearInput(document.getElementById('cat_color'));
    clearInput(document.getElementById('cat_age'));
    clearInput(document.getElementById('cat_gender'));
}


function resetTask2() {
    while (TASK2_TBODY.firstChild) {
        TASK2_TBODY.firstChild.remove();
    }

    // Отчистка полей
    clearInput(document.getElementById('cat_name'));
    clearInput(document.getElementById('cat_color'));
    clearInput(document.getElementById('cat_age'));
    clearInput(document.getElementById('cat_gender'));
}


TASK2_BTN.addEventListener('click', addCat);
TASK2_RESET_BTN.addEventListener('click', resetTask2);


// Задание 3
const TASK3_BTN = document.getElementById('prod');
const TASK3_TEXT = document.getElementById('task3_result');

function productOfArray(arr, index = 0, result = 1) {
    if (index >= arr.length) {
        return result;
    }

    return productOfArray(arr, index + 1, result * arr[index]);
}

function product() {
    let digits = document.getElementById('prod_digits').value.split(' ');

    if (digits.some(isNaN)) {
        alert('Некорректный ввод!');
        return;
    }

    TASK3_TEXT.innerHTML = `Результат: ${productOfArray(digits)}`;
}

TASK3_BTN.addEventListener('click', product);



// Задание 4
const TASK4_BTN = document.getElementById('sum');
const TASK4_TEXT = document.getElementById('task4_result');


function cumulativeSum(arr) {
    if (!arr || arr.length === 0) return [];
    
    const result = [arr[0]];
    let sum = arr[0];

    function recursive(index) {
        if (index >= arr.length) return;
        
        sum += arr[index];
        result.push(sum);
        recursive(index + 1);
    }

    recursive(1);
    return result;
}


function calculate() {
    const inputValue = document.getElementById('sum_digits').value.trim();
    const digits = inputValue.split(/\s+/).map(Number);

    // Проверка корректности введенных данных
    if (digits.some(isNaN)) {
        alert("Некорректный ввод!");
        return;
    }

    TASK4_TEXT.innerHTML = `Результат: ${cumulativeSum(digits)}`;
}


TASK4_BTN.addEventListener('click', calculate);

// Задание 5
const TASK5_BTN = document.getElementById('range');
const TASK5_TEXT = document.getElementById('task5_result');

function range(start, end, step = 1) {
    const result = [];
    let current = start;

    while ((step > 0 ? current <= end : current >= end)) {
        result.push(current);
        current += step;
    }
        
    return result;
}

function rangeHelper() {
    let start = parseInt(document.getElementById("start").value);
    let end = parseInt(document.getElementById("end").value);
    let stepInput = document.getElementById("step").value;
    
    // Если строка пустая, то используем шаг по умолчанию равный 1
    let step = stepInput.trim() !== '' ? parseFloat(stepInput) : 1;

    // Проверяем корректность введенных значений
    if (Number.isNaN(start) || Number.isNaN(end) || step === 0 ||
        ((start > end && step > 0) || (start < end && step < 0))) {
        alert("Некорректные данные введены!");
        return;
    }

    TASK5_TEXT.textContent = range(start, end, step).join(', ');
}

TASK5_BTN.addEventListener('click', rangeHelper);



// Задание 6
const TASK6_BTN = document.getElementById('filterBtn');
const TASK6_TEXT = document.getElementById('task6_result');

function filterData(dataArray, filterObject) {
    const filteredData = [];
    
    // Проходимся по каждому элементу массива dataArray
    dataArray.forEach(item => {
        let isMatch = true;
        
        // Проверяем каждый ключ объекта фильтрации
        Object.keys(filterObject).forEach(key => {
            if (item[key] !== filterObject[key]) {
                isMatch = false; // Если хотя бы одно поле не совпадает, то прекращаем проверку
            }
        });
        
        // Добавляем элемент в результирующий массив, если он прошел фильтрацию
        if (isMatch) {
            filteredData.push(item);
        }
    });
    
    return filteredData;
}

function formatOutput(filteredData) {
    let resultString = 'Результат:\n';
    
    filteredData.forEach((item, index) => {
        resultString += `<br><br>Имя: ${item.name}, Возраст: ${item.age}, Город: ${item.city}`;
    });
    
    return resultString;
}

function filterHelper() {
    const dataArray = [
        { name: "Иван", age: 30, city: "Москва" },
        { name: "Иван", age: 22, city: "Курган" },
        { name: "Анна", age: 25, city: "Санкт-Петербург" },
        { name: "Петр", age: 35, city: "Новосибирск" },
        { name: "Василиса", age: 38, city: "Новосибирск" },
        { name: "Настя", age: 22, city: "Вологда" },
    ];

    let filter_name = document.getElementById('filter_name').value;
    let filter_age = document.getElementById('filter_age').value;
    let filter_city = document.getElementById('filter_city').value;

    const newUser = {};

    if (filter_name.trim()) {
        newUser.name = filter_name;
    }

    if (filter_age.trim()) {
        newUser.age = parseInt(filter_age);
    }

    if (filter_city.trim()) {
        newUser.city = filter_city;
    }

    const filteredResult = filterData(dataArray, newUser);
    const formattedResult = formatOutput(filteredResult);

    TASK6_TEXT.innerHTML = formattedResult;
}

filterHelper();
TASK6_BTN.addEventListener('click', filterHelper);