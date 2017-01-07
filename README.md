## Grunt-node-sass

A trivial Grunt wrapper for node-sass.

# Use

module.exports = function (grunt) {
    grunt.initConfig({
        gruntNodeSass : {

            // path to write your css
            cssFolder : '/some/path'

            // path (glob) to find your scss
            scssPath : 'path/to/**/*.scss'
        }
    })
}

grunt.loadNpmTasks('grunt-gruntNodeSass');