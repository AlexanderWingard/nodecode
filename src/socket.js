var ws_uri = "ws://" + window.location.host + "/ws";

var ws = new WebSocket(ws_uri);
ws.addEventListener("open", function on_open(e) {
    console.log("ws open");
});

ws.addEventListener("message", function on_message(e) {
    console.log("message: " + e.data);
});

if(module.hot) {
    module.hot.dispose(function() {
        ws.close();
    });
}
