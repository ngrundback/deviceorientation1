var wsUri = "wss://echo.websocket.org/";
var output;
let websocket = null;

let sendCounter = 0;


function connectWebsocket()
{
  output = document.getElementById("output");
  testWebSocket();
}

function closeWebsocket()
{
    websocket.close();
}

function testWebSocket()
{
    if (websocket == null)
    {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function(evt) { onOpen(evt) };
        websocket.onclose = function(evt) { onClose(evt) };
        websocket.onmessage = function(evt) { onMessage(evt) };
        websocket.onerror = function(evt) { onError(evt) };
    }
}

function onOpen(evt)
{
  writeToScreen("CONNECTED");
  doSend("WebSocket rocks");
}

function onClose(evt)
{
  
  websocket = null;
  writeToScreen("DISCONNECTED");
}

function onMessage(evt)
{
  writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
  //websocket.close();
}

function onError(evt)
{
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message)
{
  writeToScreen("SENT: " + message);
  websocket.send(message);
}

function writeToScreen(message)
{
  output.innerHTML = sendCounter + " " + message;
}


window.addEventListener("deviceorientation", function(event) 
{

 if (websocket != null)
 {
     ++sendCounter;
    doSend(event.alpha + ", " + event.beta + ", " + event.gamma);
 }
}
);



//window.addEventListener("load", init, false);