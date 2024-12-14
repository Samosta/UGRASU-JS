// Функция добавления цифр к текущему выражению
function addDigit(digit) {
    const display = document.getElementById("display");
    if (display.value === "Ошибка") { // Если была ошибка, очищаем дисплей перед вводом новой цифры
        display.value = "";
    }
    display.value += digit;
}

// Функция добавления оператора к текущему выражению
function addOperator(operator) {
    const display = document.getElementById("display");
    let currentValue = display.value.trim();
    
    // Проверяем, чтобы оператор не был первым символом и не следовал сразу за другим оператором
    if (!isNaN(currentValue[currentValue.length - 1]) || currentValue.endsWith(")")) {
        display.value += operator;
    } else if (currentValue.endsWith("+") || currentValue.endsWith("-") || currentValue.endsWith("*") || currentValue.endsWith("/")) {
        // Заменяем последний введенный оператор новым
        display.value = currentValue.slice(0, -1) + operator;
    }
}

// Функция очистки дисплея
function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
}

// Функция вычисления результата
function calculateResult() {
    const display = document.getElementById("display");
    let expression = display.value.trim();
    
    if (expression === "") {
        alert("Введите выражение для расчета.");
        return; // Прекращаем выполнение функции, если поле пустое
    }
    
    try {
        let result = eval(expression);
        
        // Проверим деление на ноль
        if (expression.includes("/0")) {
            throw new Error("Деление на ноль!");
        }
        
        display.value = result;
    } catch (error) {
        alert("Ошибка! Проверьте выражение.");
        display.value = "Ошибка";
    }
}
