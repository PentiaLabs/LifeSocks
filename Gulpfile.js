var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('client/scripts/*.js', ['scripts']);
    gulp.watch('client/**/*.html', ['html']);
    gulp.watch('scss/**/*.scss', ['sass']);
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

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/styles'))
        .pipe(livereload());
});

gulp.task('less', function () {
    return gulp.src('less/**/**/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('client/styles/joypad'))
        .pipe(livereload());
});

gulp.task('test', function() {
  console.log('Eh, good luck mates! We need to make some awesome stuff for this gulpfile!');
});

// use default task to launch livereload and watch JS and SASS files
gulp.task('default', ['watch'], function () {
  nodemon({ script: 'server/server.js' })
    .on('change', ['changed'])
    .on('restart', function () {
        console.log('server restarted!');
    })
});
