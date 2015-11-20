'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell')
;

/**
 * Runs the main application.
 */
gulp.task( 'default', shell.task( 'node app.js' ) );