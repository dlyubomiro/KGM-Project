// Инициализация на платното
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

// Контролни точки
let points = [];

// Променлива за влачене
let draggingPoint = null;

// Функция за изчисление на факториел
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Функция за рисуване на Безие крива
function drawBezierCurve() {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let t = 0; t <= 1; t += 0.01) {
        let x = 0, y = 0;
        const n = points.length - 1;

        for (let i = 0; i <= n; i++) {
            let binomialCoeff = factorial(n) / (factorial(i) * factorial(n - i));
            let bernstein = binomialCoeff * Math.pow(1 - t, n - i) * Math.pow(t, i);
            x += bernstein * points[i].x;
            y += bernstein * points[i].y;
        }

        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Функция за изчисление на контролни точки на ходографа
function getHodographPoints() {
    if (points.length < 2) return [];

    let hodographPoints = [];
    const n = points.length - 1;

    // Изчисляваме средната точка на контролния полигон
    let centerX = 0, centerY = 0;
    points.forEach(p => {
        centerX += p.x;
        centerY += p.y;
    });
    centerX /= points.length;
    centerY /= points.length;

    for (let i = 0; i < n; i++) {
        let dx = (points[i + 1].x - points[i].x) * n * 0.5;  // Намаляваме скалирането
        let dy = (points[i + 1].y - points[i].y) * n * 0.5;
        hodographPoints.push({ x: centerX + dx, y: centerY + dy });
    }

    return hodographPoints;
}

// Функция за рисуване на ходографа
function drawHodograph() {
    let hodographPoints = getHodographPoints();
    if (hodographPoints.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(hodographPoints[0].x, hodographPoints[0].y);
    for (let i = 1; i < hodographPoints.length; i++) {
        ctx.lineTo(hodographPoints[i].x, hodographPoints[i].y);
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Рисуваме червените точки (контролни точки на ходографа)
    ctx.fillStyle = "red";
    hodographPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Функция за рисуване на контролни точки и линии
function drawControlPoints() {
    if (points.length < 1) return;

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.fillStyle = "black";
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Анимиране на рендирането
function render() {
    requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawControlPoints();
        drawBezierCurve();
        drawHodograph();
    });
}

// Функция за добавяне на точка
canvas.addEventListener("click", (e) => {
    const { offsetX, offsetY } = e;
    points.push({ x: offsetX, y: offsetY, dragging: false });
    render();
});

// Функция за премахване на точка (десен клик)
canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = e;

    points = points.filter(p => {
        const dx = offsetX - p.x;
        const dy = offsetY - p.y;
        return dx * dx + dy * dy > 64;
    });

    render();
});

// Функция за влачене на точки
canvas.addEventListener("mousedown", (e) => {
    const { offsetX, offsetY } = e;
    points.forEach(p => {
        const dx = offsetX - p.x;
        const dy = offsetY - p.y;
        if (dx * dx + dy * dy < 64) {
            p.dragging = true;
            draggingPoint = p;
        }
    });
});

canvas.addEventListener("mousemove", (e) => {
    if (!draggingPoint) return;

    const { offsetX, offsetY } = e;
    draggingPoint.x = offsetX;
    draggingPoint.y = offsetY;
    render();
});

canvas.addEventListener("mouseup", () => {
    if (draggingPoint) draggingPoint.dragging = false;
    draggingPoint = null;
});

document.getElementById("clearCanvas").addEventListener("click", () => {
    points = [];
    render();
});

// Стартиране на рендирането
render();
