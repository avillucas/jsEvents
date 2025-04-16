//var cat_id = 1;
var timer_id; // reference of the timer, needed to stop it
var speed = 0; // pixels/second
var period = 70; // milliseconds
var sprite; // the element that will move
var distance = 0; // pixels
var distance_step = 0.15; // mtrs
var frameWidth = 113; // mtrs
var backgroundFrameWith = 10; // mtrs


function animate() {
    const position = document.getElementById('cat').style.backgroundPositionY.replace('px', '');
    const nextPosition = (position <= -1243) ? 0 : parseInt(position) - frameWidth;
    console.log('Cat nextPosition', nextPosition);
    document.getElementById('cat').style.backgroundPositionY = nextPosition + 'px';
    const stepEvent = new Event("catStep");
    document.dispatchEvent(stepEvent);
    distance += distance_step;
    updateDistance(distance);
    const backgroundPosition = document.getElementById('background').style.backgroundPositionX.replace('px', '');
    const nextBackgroundPosition = Math.round( parseInt(backgroundPosition) + backgroundFrameWith);
    console.log('Background nextPosition', nextBackgroundPosition);
    document.getElementById('background').style.backgroundPositionX = nextBackgroundPosition + 'px';
}

function updateDistance(distance) {
    document.getElementById('distanceValue').textContent = Math.round(distance);
}
function move(direction) {
    if (timer_id) stop();
    speed = period / 1000;
    timer_id = setInterval(animate, period);
}

function stop() {
    console.log('stop');
    clearInterval(timer_id);
    timer_id = null;
    const stopEvent = new Event("catStops");
    document.dispatchEvent(stopEvent);
}

function init() {
    console.log('init');
    sprite = document.getElementById('cat');
    document.getElementById('cat').style.backgroundPositionY = 0;
    document.getElementById('cat').style.backgroundPositionX = 0;
    updateDistance(0);
    animate();
}


function actionStop() {
    stop();
}

function actionMove() {
    move(1);
}
function actionStep() {
    stop();
    animate();
}

function changeSpeed() {
    stop();
    const selectedSpeed =  document.querySelectorAll('#speedSelector option:selected')[0].value;
    period =  selectedSpeed;
    animate();
}

function onBackgroundChange() {
    const backgroundClassName = document.querySelector('#backgroundSelector input:checked').value;
    console.log('background', backgroundClassName);
    document.getElementById('background').className = backgroundClassName;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ButtonStop').addEventListener('click', actionStop, false);
    document.getElementById('ButtonMove').addEventListener('click', actionMove, false);
    document.getElementById('ButtonStep').addEventListener('click', actionStep, false);
  //  document.getElementById('speedSelector').addEventListener('change', changeSpeed, false);
    const backgrounds = document.querySelectorAll('#backgroundSelector input');
    backgrounds.forEach(
        function (background) {
            background.addEventListener("change", onBackgroundChange, false);
        }
    );

});

window.onload = init;