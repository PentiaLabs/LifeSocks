const gulp = require('gulp');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');

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

gulp.task('html', function() {
	gulp.src('client/**/*.html')
		.pipe(
			livereload()
		);
});

// use default task to launch livereload and watch JS and SASS files
gulp.task('default', ['watch'], function () {
	nodemon({ script: 'server/start.js' })
		.on('change', ['changed'])
		.on('restart', function () {
			console.log('server restarted!');
		});
});
