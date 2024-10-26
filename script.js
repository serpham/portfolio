document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelector(".projects");
    const info = document.querySelector(".info");
    const contacts = document.querySelector(".contacts");

    if (contacts) {
        contacts.classList.add("hide")
    }
    if (info) {
        info.classList.add("hide"); // Изменено на 'hidden'
    }
    if (projects) {
        projects.classList.add("hide"); // Изменено на 'hidden'
    }
});


const STAR_COLOR = '#fff';
const STAR_SIZE = 1;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 100;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 2;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let scale = 1,
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        });
    }
}

function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}

function recycleStar(star) {
    let direction = 'z';

    let vx = Math.abs(velocity.x),
        vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
        let axis = vx > vy ? 'h' : 'v';

        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 't') {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }
}

function resize() {
    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach(placeStar);
}

function step() {
    context.clearRect(0, 0, width, height);

    update();
    render();

    requestAnimationFrame(step);
}

function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star);
        }
    });
}

function render() {
    stars.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.moveTo(star.x, star.y);

        let tailX = velocity.x * 2,
            tailY = velocity.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}

function movePointer(x, y) {
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        let ox = x - pointerX,
            oy = y - pointerY;

        velocity.tx += (ox / 8) * scale * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8) * scale * (touchInput ? 1 : -1);
    }

    pointerX = x;
    pointerY = y;
}

function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
}

function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY);
    event.preventDefault();
}

function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}




const buttons = document.querySelectorAll('.nav-bar button');
const indicator = document.querySelector('.indicator');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const rect = button.getBoundingClientRect();

        indicator.style.left = `${rect.left + rect.width + 10}px`;
        indicator.style.top = `${rect.top + rect.height / 3}px`;


        indicator.style.visibility = 'visible';
        indicator.style.opacity = '1'
    });
});












const HideElemente1 = [
    document.getElementById("projects"),
    document.getElementById("info"),
    document.getElementById("contacts"),
];

const ShowElemente1 = [
    document.getElementById("home"),
]

document.getElementById("but1").onclick = function() {
    HideElemente1.forEach(function(el) {
        if (el) el.classList.add("hide"); // Проверяем наличие элемента
    });

    ShowElemente1.forEach(function(el) {
        if (el) el.classList.remove("hide"); // Проверяем наличие элемента
    });
}


// KNOKPKA 2
const HideElemente = [
    document.getElementById("info"),
    document.getElementById("home"),
    document.getElementById("contacts"),
];

const ShowElemente = [
    document.getElementById("projects"),
];

document.getElementById("but2").onclick = function() {
    HideElemente.forEach(function(el) {
        if (el) el.classList.add("hide"); // Проверяем наличие элемента
    });

    ShowElemente.forEach(function(el) {
        if (el) el.classList.remove("hide"); // Проверяем наличие элемента
    });
}


// KNOKPKA 3
const HideElemente2 = [
    document.getElementById("home"),
    document.getElementById("projects"),
    document.getElementById("contacts"),
];

const ShowElemente2 = [
    document.getElementById("info"),
];

document.getElementById("but3").onclick = function() {
    HideElemente2.forEach(function(el) {
        if (el) el.classList.add("hide"); // Проверяем наличие элемента
    });

    ShowElemente2.forEach(function(el) {
        if (el) el.classList.remove("hide"); // Проверяем наличие элемента
    });
}


// KNOKPKA 4
const HideElemente4 = [
    document.getElementById("home"),
    document.getElementById("projects"),
    document.getElementById("info"),
];

const ShowElemente4 = [
    document.getElementById("contacts"),
];


document.getElementById("but4").onclick = function() {
    HideElemente4.forEach(function(el) {
        if (el) el.classList.add("hide"); // Проверяем наличие элемента
    });

    ShowElemente4.forEach(function(el) {
        if (el) el.classList.remove("hide"); // Проверяем наличие элемента
    });
}