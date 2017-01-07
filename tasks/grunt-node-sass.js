'use strict';

module.exports = function(grunt) {

    var pluginName = 'gruntNodeSass',
        sass = require('node-sass'),
        fs = require('fs'),
        path = require('path'),
        mkdirp =  require('mkdirp'),
        glob = require('glob');

    grunt.registerTask(pluginName, '', function() {

        var config = grunt.config(pluginName);

        // verify settings
        if (!config)
            grunt.log.error(pluginName + ' could not find expected config item "' + pluginName +'".');
        

        var done = this.async();
        var scssPath = config.scssPath,
            cssOutFolder = config.cssFolder;
        
        if (!scssPath)
            grunt.log.error(pluginName + ' could not find expected value "scssPath".');

        if (!cssOutFolder)
            grunt.log.error(pluginName + ' could not find expected value for "cssOutFolder".');

        if (!fs.existsSync(cssOutFolder))
            mkdirp.sync(cssOutFolder);

        glob(scssPath, config.globOptions, function (er, files) {
            files.forEach(function(file, i ){
                var outfile = path.join(
                    cssOutFolder,
                    path.basename(file).substr(0, path.basename(file).length - 5) + '.css'); // remove .scss extension

                // ignore partials
                if (path.basename(file).substr(0, 1) === '_')
                    return;

                var result = sass.renderSync({
                    file: file,
                    sourceComments: true
                });

                fs.writeFileSync(outfile, result.css);

                console.log(pluginName + ' compiled ' + outfile);

                if (i == files.length - 1){
                    done();
                }
            });

        });

        
        
    });
};