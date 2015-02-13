var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('watch', function () {
	livereload.listen();

	gulp.watch('client/scripts/*.js', ['scripts']);
	gulp.watch('client/**/*.html', ['html']);
});

gulp.task('changed', function () {
  console.log('Something has changed on the server...');
});

gulp.task('scripts', function() {
	gulp.src('client/js/*.js')
	.pipe(
		livereload()
	);
});

gulp.task('lint', function () {
	return gulp.src(['client/scripts/Board/**/*.js','client/scripts/Controller/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('html', function() {
	gulp.src('client/**/*.html')
	.pipe(
		livereload()
	);
});

gulp.task('test', ['lint'] ,function() {
  console.log('Testing is fun!');
});

// use default task to launch livereload and watch JS and SASS files
gulp.task('default', ['watch'], function () {
  nodemon({ script: 'server/start.js' })
	.on('change', ['changed'])
	.on('restart', function () {
		console.log('server restarted!');
	});
});
