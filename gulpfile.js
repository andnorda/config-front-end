'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
	return gulp.src('app/styles/main.less')
		.pipe($.less())
		.pipe($.autoprefixer())
		.pipe(gulp.dest('.tmp/styles'));
});

gulp.task('html', ['styles'], function() {
	var assets = $.useref.assets({searchPath: '{.tmp,app}'});

	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('dist'));
});

gulp.task('jshint', function() {
	return gulp.src('app/scripts/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['jshint', 'html']);

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});