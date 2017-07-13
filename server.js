const express = require("express");
const app = express();
const express_ws = require("express-ws")(app);
const webpack = require("webpack");
var config = require("./webpack.config.js");
const compiler = webpack(config);
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true
    },
    historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.ws("/ws", function(ws, req) {
    ws.on("message", function(msg) {
        console.log(msg);
    });
    setInterval(function() {
        try {
            ws.send("hey");
        } catch(err) {

        }
    }, 1000);
});

app.use(express.static("."));

app.listen(8080, () => {
    console.log("http://localhost:8080");
});
