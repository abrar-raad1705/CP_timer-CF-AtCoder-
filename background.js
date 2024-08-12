chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ startTime: null, pausedTime: 0, isPaused: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTime') {
        chrome.storage.local.get(['startTime', 'pausedTime', 'isPaused'], (result) => {
            sendResponse(result);
        });
        return true;
    }
});
