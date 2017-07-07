module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-webpack");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-concurrent");
	  var webpack = require("webpack");
	  var webpackConfig = require("./webpack.config.js");
    grunt.initConfig({
        shell: {
            mongodb: {
                command: 'env/bin/mongod --dbpath ./data/db',
                options: {
                    async: true,
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        cwd: '.'
                    }
                }
            }
        },
        "webpack-dev-server": {
            "options": {
                "webpack": webpackConfig
            }
        },
        "concurrent": {
            "start": {
                "tasks": ["shell:mongodb", "webpack-dev-server:start "],
                "options": {
                    "logConcurrentOutput": true
                }
            }
        }
    });
    grunt.registerTask("default", ["concurrent:start"]);
}
