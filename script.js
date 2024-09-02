let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapCount = 0;

function updateDisplay() {
    const currentTime = Date.now();
    const timeDiff = elapsedTime + (isRunning ? currentTime - startTime : 0);
    const milliseconds = Math.floor((timeDiff % 1000) / 10);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

    document.getElementById('display').innerText = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

document.getElementById('start').addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
    }
});

document.getElementById('pause').addEventListener('click', function() {
    if (isRunning) {
        isRunning = false;
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
    }
});

document.getElementById('reset').addEventListener('click', function() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    startTime = 0;
    lapCount = 0;
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('laps').innerHTML = '';
});

document.getElementById('lap').addEventListener('click', function() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.getElementById('display').innerText;
        const lapElement = document.createElement('div');
        lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
        lapElement.style.color = '#000';  // Ensure lap text is visible (black)
        document.getElementById('laps').appendChild(lapElement);
    }
});


