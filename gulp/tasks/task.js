'use strict';

var gulp        = require('gulp'),
    ngAnnotate  = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    htmlmin     = require('gulp-htmlmin'),
    sourcemaps  = require('gulp-sourcemaps'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    runSequence = require('run-sequence');


// RunSequence run tasks synchronous
gulp.task('build-prod', function(callback) {
  runSequence('build-js',
              'jekyll',
              'js',
              'html',
              callback);
});

gulp.task('build-dev', function(callback) {
  runSequence('build-js',
              'jekyll',
              'browser-sync',
              callback);
});



// Browserify js files
gulp.task('build-js', function() {

    return browserify('./js/dev/script.js')
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('script.js'))
    .pipe(gulp.dest('./js/prod'));

});



// Build jekyll
gulp.task('jekyll', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});
    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['build-dev'], function () {
    browserSync.notify('Building Jekyll');
    browserSync.reload();
});


// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '_site',
        },
        host: "localhost"
    });
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('_sass/**.scss', ['jekyll-rebuild']);
  // Watch .js files
  gulp.watch('js/dev/**.js', ['jekyll-rebuild']);
  // Watch .html files and posts
  gulp.watch(['_includes/*.html', '_layouts/*.html', '*.md', '_posts/*', '*.html'], ['jekyll-rebuild']);
});



// ONLY PROD TASKS ======================================

// Minify html files
gulp.task('html', function() {
    gulp.src('./_site/**/**.html', { base: "./" })
        .pipe(htmlmin({collapseWhitespace: true}))  // Minify the code
        .pipe(gulp.dest("."));                      // Put the files in the same folder (overwrite)
});

// Uglify js files
gulp.task('js', function() {

    gulp.src('./_site/js/prod/script.js')
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    // .pipe(uglify())
    .on('error', console.error.bind(console))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./_site/js/prod'));

});

// ======================================================






// Define default tasks for gulp

gulp.task('dev', function() {
    gulp.start('watch', ['build-dev']);
});

gulp.task('prod', function() {
    gulp.start('build-prod');
});

