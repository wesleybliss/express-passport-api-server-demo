
var gulp       = require('gulp'),
    log        = (new (require('../logging'))).getLogger(),
    supervisor = require('gulp-supervisor')
;

// Log levels { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

/**
 * Runs app via Supervisor to automatically reload after crashes.
 */
gulp.task( 'supervisor', [], function() {
    supervisor( 'src/app.js', {
        args:         [ 'dev' ],
        pollInterval: 500,
        exec:         'node',
        debug:        false,
        noRestartOn:  'exit',
        quiet:        false
    });
});

/**
 * Runs the main application (in debug mode).
 */
gulp.task( 'default', ['supervisor'], function() {
    log.info( 'info', 'Gulp task \'default\' running app under Supervisor as dev.' );
});