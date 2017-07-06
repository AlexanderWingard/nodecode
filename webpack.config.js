const webpack = require("webpack");

module.exports = {
    "entry": "./src/index.js",
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
