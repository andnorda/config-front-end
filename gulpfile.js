'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('styles', function() {
	return gulp.src('app/styles/main.less')
		.pipe($.less())
		.pipe($.autoprefixer())
		.pipe(gulp.dest('dist/styles'))
		.pipe($.livereload());
});

gulp.task('scripts', function() {
	return browserify('./app/scripts/main.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe($.sourcemaps.init({loadMaps: true}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe($.livereload());
});

gulp.task('html', ['styles', 'scripts'], function() {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))
		.pipe($.livereload());
});

gulp.task('jshint', function() {
	return gulp.src('app/scripts/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('connect', ['build'], function() {
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	var app = require('connect')()
		.use(require('connect-livereload')({port: 35729}))
		.use(serveStatic('dist'))
		.use(serveIndex('dist'));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function() {
			console.log('Started connect web server on http://localhost:9000')
		});
});

gulp.task('serve', ['connect', 'watch'], function() {
	require('opn')('http://localhost:9000');
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('watch', ['connect'], function() {
	$.livereload.listen();

	gulp.watch('app/*.html', ['html']);
	gulp.watch('app/styles/**/*.less', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
})

gulp.task('build', ['jshint', 'html']);

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});