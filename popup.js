document.getElementById('resetTimer').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'resetTimer' }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else if (response && response.status) {
                alert('Timer has been reset.');
            }
        });
    });
});

document.getElementById('toggleTimer').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleTimer' }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else if (response && response.status) {
                const toggleButton = document.getElementById('toggleTimer');
                toggleButton.textContent = response.status === 'Paused' ? 'Resume' : 'Pause';
            }
        });
    });
});
