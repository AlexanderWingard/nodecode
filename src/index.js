const d3 = require("d3");
import "./style.css";
import "./socket.js";

d3.selectAll("body").text ("hello D3!!");
if (module.hot) {
    module.hot.accept();
}
