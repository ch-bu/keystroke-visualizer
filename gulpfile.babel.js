'use strict';

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import include from 'gulp-include';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import handlebars from 'gulp-handlebars';
import wrap from 'gulp-wrap';
import declare from 'gulp-declare';
import concat from 'gulp-concat';
import mainBowerFiles from 'main-bower-files';
import filter from 'gulp-filter';
import requirejsOptimize from 'gulp-requirejs-optimize';
import requireConvert from 'gulp-require-convert';
import rjs from 'gulp-requirejs';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


/**
 * Pipe main bower files
 */
gulp.task('bower-files', () => {

  // Filter main bower files
  const jsFiles = filter('**/*.js');

  var mainBower = mainBowerFiles();

  // Pipe js files to vendor directory
  gulp.src(mainBower)
    .pipe(jsFiles)
    .pipe(gulp.dest('app/scripts/vendor/'));
});

/**
 * Lint javascript files
 */
gulp.task('lint', () =>
  gulp.src(['app/scripts/app/**/*.js'])
    .pipe($.eslint({fix: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// /**
//  * Convert js files from ecmascript 6 
//  */
// gulp.task('babel', () => {
//   return gulp.src('app/babel/app.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('app'));
// });


// /**
//  * Build templates
//  */
// gulp.task('templates', () => {
//   gulp.src('app/templates/*.hbs')
//     .pipe(handlebars({
//       handlebars: require('handlebars')
//     }))
//     .pipe(wrap('Handlebars.template(<%= contents %>)'))
//     .pipe(declare({
//       namespace: 'MyApp.templates',
//       noRedeclare: true,
//     }))
//     .pipe(concat('templates.js'))
//     .pipe(requireConvert())
//     .pipe(gulp.dest('app/scripts/', {overwrite: true}));
// });


// /**
//  * Optimize images
//  */
// gulp.task('images', () =>
//   gulp.src('app/images/**/*')
//     .pipe($.cache($.imagemin({
//       progressive: true,
//       interlaced: true
//     })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe($.size({title: 'images'}))
// );

// /**
//  * Copy all files at the root level (app)
//  */
// gulp.task('copy', () =>
//   gulp.src([
//     'app/*',
//     '!app/*.html',
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'copy'}))
// );

// /**
//  * Copy font files
//  */
// gulp.task('copy-fonts', () => {
//   gulp.src([
//   'app/font/**/*',
//   ])
//   .pipe(gulp.dest('dist/font'));

//   gulp.src([
//     'app/fonts/**/*',
//     ])
//     .pipe(gulp.dest('dist/fonts'));

//   gulp.src([
//     'app/templates/**/*',
//     ])
//     .pipe(gulp.dest('dist/templates'));
// });

/**
 * Compile and automatically prefix stylesheets
 */
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/*.scss',
  ])
  .pipe($.newer('.tmp/styles'))
  .pipe($.sourcemaps.init())
  .pipe($.sass({precision: 10}).on('error', $.sass.logError))
  .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
  // Concatenate and minify styles
  .pipe($.if('*.css', $.cssnano()))
  .pipe($.size({title: 'styles'}))
  .pipe($.sourcemaps.write('./'))
  .pipe(gulp.dest('.tmp/styles'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
// gulp.task('scripts-vendor', () =>
//   gulp.src([
//     // Note: Since we are not using useref in the scripts build pipeline,
//     //       you need to explicitly list your scripts here in the right order
//     //       to be correctly concatenated
//     './app/scripts/vendor/handlebars.js',
//     './app/scripts/vendor/idb.js',
//     './app/scripts/templates.js',
//     './app/scripts/vendor/jquery.js',
//     './app/scripts/vendor/jquery-migrate.js',
//     './app/scripts/vendor/underscore.js',
//     './app/scripts/vendor/backbone.js',
//     './app/scripts/vendor/moment.js',
//     // './app/scripts/vendor/require.js',
//     './app/scripts/vendor/materialize.js',
//     './app/scripts/vendor/d3.js',
//   ])
//     .pipe($.newer('.tmp/scripts'))
//     .pipe($.newer('.dist/scripts'))
//     .pipe($.sourcemaps.init())
//     // .pipe($.babel({compact: false}))
//     .pipe($.sourcemaps.write())
//     .pipe($.concat('vendor.min.js'))
//     .pipe($.uglify())
//     .pipe($.size({title: 'scripts'}))
//     .pipe($.sourcemaps.write('.'))
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(gulp.dest('.tmp/scripts'))
// );


// gulp.task('copy', () =>
//   gulp.src([
//     'app/*',
//     '!app/*.html',
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'copy'}))
// );

/**
 * Scan your HTML for assets & optimize them
 */
gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('.tmp'));
});

/**
 * Clean output directory
 */
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));


/**
 * Watch files for changes & reload
 */
gulp.task('serve', ['styles'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    port: 3000,
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'https://open-api.bahn.de');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
      }
    }
  });

  gulp.watch(['app/*.html'], reload);
  gulp.watch(['app/styles/*.scss'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', reload]);
  // gulp.watch(['app/images/**/*'], reload);
  // gulp.watch(['app/templates/*'], ['templates', reload]);
});

// /**
//  * Build and serve the output from the dist build
//  */
// gulp.task('serve:dist', () =>
//   browserSync({
//     notify: false,
//     logPrefix: 'WSK',
//     // Allow scroll syncing across breakpoints
//     scrollElementMapping: ['main', '.mdl-layout'],
//     // Run as an https by uncommenting 'https: true'
//     // Note: this uses an unsigned certificate which on first access
//     //       will present a certificate warning in the browser.
//     // https: true,
//     server: 'dist',
//     port: 3001
//   })
// );

// /**
//  * Build production files, the default task
//  */
// gulp.task('default', ['clean'], cb =>
//   runSequence(
//     ['clean', 'bower-files', 'lint', 'html',
//     'styles', 'images', 'copy', 'copy-fonts'],
//     cb
//   )
// );
