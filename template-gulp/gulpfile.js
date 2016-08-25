(function () {
	'use strict';

	// Global variables
	var path = {
		src: {
			js: 'scripts/*.js',
			scss: 'styles/scss/*.scss',
			appScss: 'styles/app.scss',
			vendorScss: 'styles/vendor.scss'
		},
		dest: {
			js: 'build/js',
			css: 'build/css',
			vendorJs: 'build/vendor/js',
			vendorCss: 'build/vendor/css'
		}
	};

	// Vendor libraries
	var vendorLibPath = {
		jsLibs: ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'],
		jsMinLibs: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'],
		cssLibs: ['bower_components/bootstrap-sass/assets/stylesheets']
	};

	// Include gulp
	var gulp = require('gulp');

	// Include plug-ins
	var del = require('del');
	var concat = require('gulp-concat');
	var sass = require('gulp-sass');
	var rename = require('gulp-rename');
	var gutil = require('gulp-util');
	var plumber = require('gulp-plumber');
	// Linter's
	var jshint = require('gulp-jshint');
	var scsslint = require('gulp-scss-lint');
	// Minifier's
	var uglify = require('gulp-uglify');
	var cleanCss = require('gulp-clean-css');


	// Clean vendor files task
	gulp.task('cleanVendor', function () {
		del.sync(['build/vendor'], { force: true });
	});

	// Clean task
	gulp.task('clean', function () {
		del.sync(['build', 'reports'], { force: true });
	});

	// SCSS lint reporting task
	gulp.task('scssLintReport', function () {
		return gulp.src(path.src.scss)
            .on('error', gutil.log)
            .pipe(plumber())
            .pipe(scsslint({
            	'maxBuffer': 30720000,
            	'filePipeOutput': 'scssReport.json'
            }))
            .pipe(gulp.dest('./reports'));
	});

	// SCSS lint task
	gulp.task('scssLint', function () {
		return gulp.src(path.src.scss)
            .on('error', gutil.log)
            .pipe(plumber())
			.pipe(scsslint())
			.pipe(scsslint.failReporter());
	});

	// JS hint task
	gulp.task('jsHint', function () {
		return gulp.src(path.src.js)
            .on('error', gutil.log)
            .pipe(plumber())
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'));
	});

	// Compile SCSS files task
	gulp.task('scss', ['scssLint'], function () {
		return gulp.src(path.src.appScss)
			.on('error', gutil.log)
            .pipe(plumber())
            .pipe(sass())
            .pipe(rename('app.css'))
            .pipe(gulp.dest(path.dest.css))
            .pipe(cleanCss())
            .pipe(rename('app.min.css'))
            .pipe(gulp.dest(path.dest.css));
	});

	// Concatenate & minify JS scripts task
	gulp.task('scripts', ['jsHint'], function () {
		return gulp.src(path.src.js)
			.on('error', gutil.log)
            .pipe(plumber())
            .pipe(concat('app.js'))
            .pipe(gulp.dest(path.dest.js))
            .pipe(rename('app.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.dest.js));
	});

	// Compile minified vendor SCSS files task
	gulp.task('vendorMinCss', function () {
		return gulp.src(path.src.vendorScss)
            .pipe(sass({
            	includePaths: [vendorLibPath.cssLibs],
            	outputStyle: 'map',
            	preserve: false
            }))
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest(path.dest.vendorCss))
            .pipe(cleanCss())
            .pipe(rename('vendor.min.css'))
            .pipe(gulp.dest(path.dest.vendorCss));
	});

	// Concatenate vendor JS scripts task
	gulp.task('vendorScripts', function () {
		return gulp.src(vendorLibPath.jsLibs)
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest(path.dest.vendorJs));
	});

	// Concatenate minified vendor JS scripts task
	gulp.task('vendorMinScripts', ['vendorScripts'], function () {
		return gulp.src(vendorLibPath.jsMinLibs)
            .pipe(concat('vendor.min.js'))
            .pipe(gulp.dest(path.dest.vendorJs));
	});

	// Vendor task
	gulp.task('vendor', ['cleanVendor', 'vendorMinCss', 'vendorMinScripts']);

	// Full task
	gulp.task('full', ['clean', 'vendorMinCss', 'vendorMinScripts', 'scss', 'scripts']);

	// Watch files for changes
	gulp.task('watch', function () {
		gulp.watch(path.src.scss, ['scss']);
		gulp.watch(path.src.js, ['scripts']);
	});

	// Default task
	gulp.task('default', ['scss', 'scripts', 'watch']);

}());