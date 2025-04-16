//var cat_id = 1;
var timer_id; // reference of the timer, needed to stop it
var speed = 350; // pixels/second
var period = 1000; // milliseconds
var sprite; // the element that will move
var sprite_speed = 0; // move per period
var sprite_position = 10000 // pixels
var distance = 0; // pixels
var distance_step = 0.15; // mtrs
var frameHeight = 233; // mtrs


function animate() {
    const position = document.getElementById('cat').style.backgroundPositionY.replace('px', '');
    console.log('position', position);
    const nextPosition = parseInt(position) + frameHeight;
    console.log('nextPosition', nextPosition);
    document.getElementById('cat').style.backgroundPositionY = nextPosition + 'px';
    //
   
    sprite_position += sprite_speed;
    const stepEvent = new Event("catStep");
    document.dispatchEvent(stepEvent);
    distance += distance_step;
    document.getElementById('distanceValue').textContent = distance;
    document.getElementById('background').style.backgroundPositionX = nextPosition + 'px';
}

function move(direction) {
    if (timer_id) stop();
    sprite_speed = speed * period / 1000 * direction;
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
    sprite = document.getElementById('cat'); // the HTML element we will move
    document.getElementById('cat').style.backgroundPositionY = 0;
    document.getElementById('cat').style.backgroundPositionX = 0;
    document.getElementById('speedValue').textContent = speed;
    animate(); // just to initialize sprite position
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
function onBackgroundChange(){
    const backgroundClassName = document.querySelector('#backgroundSelector input:checked').value;
    console.log('background', backgroundClassName);
    document.getElementById('background').className = backgroundClassName;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ButtonStop').addEventListener('click', actionStop, false);
    document.getElementById('ButtonMove').addEventListener('click', actionMove, false);
    document.getElementById('ButtonStep').addEventListener('click', actionStep, false);
    // Listen for the event.
    document.getElementById('ButtonMove').addEventListener("catStops", (e) => { document.getElementById('ButtonMove').disabled = false; }, false);
    document.getElementById('ButtonStep').addEventListener("catStops", (e) => { document.getElementById('ButtonMove').disabled = false; }, false);
    document.getElementById('ButtonStop').addEventListener("catStops", (e) => { document.getElementById('ButtonMove').disabled = true; }, false);
    document.getElementById('ButtonMove').addEventListener("catStep", (e) => { document.getElementById('ButtonMove').disabled = true; }, false);
    document.getElementById('ButtonStep').addEventListener("catStep", (e) => { document.getElementById('ButtonMove').disabled = true; }, false);
    document.getElementById('ButtonStop').addEventListener("catStep", (e) => { document.getElementById('ButtonMove').disabled = false; }, false);
    const backgrounds = document.querySelectorAll('#backgroundSelector input');
    backgrounds.forEach(
        function(background) {
            background.addEventListener("change", onBackgroundChange, false);
        }
      );
    
});

window.onload = init;