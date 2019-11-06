//let wsUri = "wss://echo.websocket.org/";
let wsUri = "ws://localhost:8080/ws";
let websocket = null;
let sendCounter = 0;

function connectWebsocket() {
    testWebSocket();
}

function closeWebsocket() {
    websocket.close();
}

function testWebSocket() {
    if (websocket == null) {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) { onOpen(evt) };
        websocket.onclose = function (evt) { onClose(evt) };
        websocket.onmessage = function (evt) { onMessage(evt) };
        websocket.onerror = function (evt) { onError(evt) };
    }
}

function onOpen(evt) {
    writeToStatus("CONNECTED");
    doSend("WebSocket rocks");
}

function onClose(evt) {
    websocket = null;
    writeToStatus("DISCONNECTED");
}

function onMessage(evt) {
    try {
        let object = JSON.parse(evt.data);
        document.getElementById("receivedMessage").innerHTML = 'RESPONSE: ' + JSON.stringify(object, null, 2);
        let latency = new Date() - new Date(object.timestamp);

        document.getElementById("latency").innerHTML = 'LATENCY: ' + latency;
    }
    catch (err) {
        document.getElementById("receivedMessage").innerHTML = 'RESPONSE: ' + evt.data;
    }
}

function onError(evt) {
    writeToStatus('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
    try {
        let object = JSON.parse(message);
        document.getElementById("sentMessage").innerHTML = 'SENT: ' + JSON.stringify(object, null, 2);
    }
    catch (err) {
        document.getElementById("sentMessage").innerHTML = 'SENT: ' + message;
    }
    websocket.send(message);
}

function writeToStatus(message) {
    document.getElementById("websocketStatus").innerHTML = 'STATUS: ' + message;
}

window.addEventListener("deviceorientation", function (event) {

    if (websocket != null) {
        ++sendCounter;

        let messageObject = {
            'angles' : {
                'counter': sendCounter,
                'alpha': event.alpha,
                'beta': event.beta,
                'gamma': event.gamma,
                'timestamp': new Date()
            }
        }

        doSend(JSON.stringify(messageObject));
    }
}
);
