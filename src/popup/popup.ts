const nativeMessageHandler = "com.xprgv.messenger";

const sendButton = document.getElementById("send-button") as HTMLButtonElement;
const inputText = document.getElementById("input-text") as HTMLInputElement;
const displayArea = document.getElementById("display-area") as HTMLDivElement;

const port = chrome.runtime.connectNative(nativeMessageHandler);
console.log("port created", port.name);
port.onMessage.addListener((msg) => {
    console.log("received:", msg);
    displayArea.textContent = msg.text;
});
port.onDisconnect.addListener(() => {
    console.log("disconnected");
});

sendButton.addEventListener("click", async () => {
    const msg = { text: inputText.value };
    port.postMessage(msg);
    console.log("send:", msg);

    // chrome.runtime.sendNativeMessage(nativeMessageHandler, { text: "hello" }, (response) => {
    //     if (chrome.runtime.lastError) {
    //         console.log("error:", chrome.runtime.lastError);
    //         return;
    //     }
    //     console.log("received:", response);
    // });
});
