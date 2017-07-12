const webpack = require("webpack");

module.exports = {
    "entry": [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        "./src/index.js"
    ],
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ],
    "module": {
        "rules": [
            {
                "test": /\.css$/,
                "use": [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    "output": {
        "filename": "bundle.js"
    },
    "devServer": {
        "hot": true
    }
};
