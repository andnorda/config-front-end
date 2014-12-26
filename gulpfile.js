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

gulp.task('connect', ['styles'], function() {
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	var app = require('connect')()
		.use(require('connect-livereload')({port: 35729}))
		.use(serveStatic('.tmp'))
		.use(serveStatic('app'))
		.use('/bower_components', serveStatic('bower_components'))
		.use(serveIndex('app'));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function() {
			console.log('Started connect web server on http://localhost:9000')
		});
});

gulp.task('serve', ['connect', 'watch'], function() {
	require('opn')('http://localhost:9000');
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

// inject bower components
gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	gulp.src('app/styles/*.less')
		.pipe(wiredep())
		.pipe(gulp.dest('app/styles'));

	gulp.src('app/*.html')
		.pipe(wiredep())
		.pipe(gulp.dest('app'));
})

gulp.task('watch', ['connect'], function() {
	$.livereload.listen();

	// watch for changes
	gulp.watch([
		'app/*.html',
		'.tmp/styles/**/*.css',
		'app/scripts/**/*.js'
	]).on('change', $.livereload.changed);


	gulp.watch('app/styles/**/*.less', ['styles']);
	gulp.watch('bower.json', ['wiredep']);
})

gulp.task('build', ['jshint', 'html']);

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});