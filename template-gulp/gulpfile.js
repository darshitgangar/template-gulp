(function () {
    'use strict';

    // Global variables
    var src = {
        js: 'scripts/*.js',
        scss: 'styles/*.scss'
    };
    var dest = {
        js: 'build/js',
        css: 'build/css'
    };

    // Include gulp
    var gulp = require('gulp');

    // Include plug-ins
    var jshint = require('gulp-jshint');
    var sassLint = require('gulp-sass-lint');
    var sass = require('gulp-sass');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var del = require('del');

    // Clean task
    gulp.task('clean', function () {
        gulp.del(['build']);
    });

    // Sass lint task
    gulp.task('sassLint', function () {
        return gulp.src(src.scss)
        .pipe(sassLint());
    });

    // JSHint task
    gulp.task('jsHint', function () {
        return gulp.src(src.js)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError());
    });

    // Compile sass files task
    gulp.task('sass', function () {
        return gulp.src(src.scss)
            .pipe(sass())
            .pipe(gulp.dest(dest.css));
    });

    // Concatenate & minify JS scripts task
    gulp.task('scripts', function () {
        return gulp.src(src.js)
            .pipe(concat('all.js'))
            .pipe(gulp.dest(dest.js))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(dest.js));
    });

    // Watch files for changes
    gulp.task('watch', function () {
        gulp.watch(src.js, ['jsHint', 'scripts']);
        gulp.watch(src.scss, ['sassLint', 'sass']);
    });

    // Default task
    gulp.task('default', ['sassLint', 'jsHint', 'sass', 'scripts', 'watch']);

}());