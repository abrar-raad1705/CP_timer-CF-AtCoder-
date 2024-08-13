let timerElement;
let startTime = Date.now();
let isPaused = false;
let pausedTime = 0;

function createTimer() {
    timerElement = document.createElement('div');
    timerElement.id = 'CP-timer';
    timerElement.style.position = 'fixed';
    timerElement.style.top = '10px';
    timerElement.style.right = '10px';
    timerElement.style.backgroundColor = '#333';
    timerElement.style.color = '#fff';
    timerElement.style.padding = '10px';
    timerElement.style.zIndex = '1000';
    timerElement.style.borderRadius = '5px';
    timerElement.style.fontFamily = 'Arial, sans-serif';
    timerElement.style.fontSize = '24px';
    timerElement.style.textAlign = 'center';
    timerElement.style.cursor = 'pointer';

    // Adjust position for AtCoder
    if (window.location.hostname === 'atcoder.jp') {
        timerElement.style.top = '50px';
    }

    timerElement.addEventListener('click', toggleTimer);

    document.body.appendChild(timerElement);
}

function updateTimer() {
    if (!timerElement) return;

    const now = Date.now();
    const elapsedTime = isPaused ? pausedTime : (now - startTime);
    
    timerElement.innerHTML = `${formatTime(elapsedTime / 1000)}`;

    // Add "Paused" text if paused
    if (isPaused) {
        const pausedText = document.createElement('div');
        pausedText.style.color = 'red';
        pausedText.style.fontSize = '16px';  // Slightly smaller font for "Paused"
        pausedText.style.marginTop = '5px';  // Add some margin to separate from time
        pausedText.textContent = 'Paused';
        timerElement.appendChild(pausedText);
    }
}

function startTimer() {
    function tick() {
        updateTimer();
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}m ${seconds}s`;
}

function toggleTimer() {
    if (isPaused) {
        startTime = Date.now() - pausedTime;
        pausedTime = 0;
        isPaused = false;
    } else {
        pausedTime = Date.now() - startTime;
        isPaused = true;
    }
    updateTimer();
}

createTimer();
startTimer();

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'resetTimer') {
        startTime = Date.now();
        isPaused = false;
        pausedTime = 0;
        updateTimer();
        sendResponse({ status: 'Timer reset' });
    } else if (request.action === 'toggleTimer') {
        toggleTimer();
        sendResponse({ status: isPaused ? 'Paused' : 'Resumed' });
    }
});
