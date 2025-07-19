chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

// Example of message handling
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GREETING") {
        console.log("Received greeting:", message.data);
        sendResponse("Hello from background!");
    }
});
