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
import babel from 'gulp-babel';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


/**
 * Pipe main bower files
 */
gulp.task('bower-files', () => {

  // Filter main bower files
  const jsFiles = filter('**/*.js');
  const cssFiles = filter('**/*.css');

  var mainBower = mainBowerFiles();

  // Pipe js files to vendor directory
  gulp.src(mainBower)
    .pipe(jsFiles)
    .pipe(gulp.dest('.tmp/scripts/vendor/'));

  gulp.src(mainBower)
    .pipe(cssFiles)
    .pipe(gulp.dest('app/styles/'));
});

/**
 * Copy files into dist directory
 */
gulp.task('copy', () => {
  // Copy main files
  gulp.src([
    'app/humans.txt',
    'app/manifest.json',
    'app/robots.txt',
    'app/service-worker.js',
  ]).pipe(gulp.dest('dist'));

  // // Copy CSS-Files
  // gulp.src(['.tmp/styles/*.css',
  //           '.tmp/styles/*.css.map'])
  //   .pipe(gulp.dest('dist/styles'));

  // Copy images
  gulp.src('app/images/**/*.png')
    .pipe(gulp.dest('dist/images'));
});


/**
 * Lint javascript files
 */
gulp.task('lint', () =>
  gulp.src(['app/scripts/**/*.js'])
    .pipe($.eslint({
      fix: true,
      envs: {
        es6: true
      }
    }))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

/**
 * Convert js files from ecmascript 6 
 */
gulp.task('babel', () => {
  gulp.src(['app/scripts/**/*.js',
            'app/scripts/**/*.jsx',
            '!app/scripts/vendor/*.js'])
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-react-jsx']
    }))
    .pipe(gulp.dest('.tmp/scripts'));

  gulp.src('app/service-worker.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(('.tmp/')));
});

/**
 * Optimize images
 */
gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);

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
  gulp.src([
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
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('dist/styles'));

  gulp.src('app/styles/*.css')
    .pipe($.newer('.temp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('dist/styles'));
});

/**
 * Scan your HTML for assets & optimize them
 */
gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({
      searchPath: '{app}',
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
    .pipe(gulp.dest('.tmp'))
    .pipe(gulp.dest('dist'));
});

/**
 * Clean output directory
 */
gulp.task('clean', () => del(['.tmp', 'dist'], {dot: true}));


/**
 * Watch files for changes & reload
 */
gulp.task('serve', ['clean', 'bower-files', 'html', 'styles', 'babel'], () => {
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
      baseDir: ['.tmp']
    }
  });

  gulp.watch(['app/*.html'], ['html', reload]);
  gulp.watch(['app/styles/*.scss'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['babel', 'lint', reload]);
  gulp.watch(['app/scripts/templates/*.jsx'], ['babel', 'lint', reload]);
  gulp.watch(['app/service-worker.js'], ['babel', 'lint', reload]);
});

/**
 * Build and serve the output from the dist build
 */
gulp.task('serve:dist', () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  })
);

/**
 * Build production files, the default task
 */
gulp.task('default', ['clean'], cb =>
  runSequence(
    ['styles', 'bower-files', 'html', 'images', 'babel',
    'copy'],
    cb
  )
);
