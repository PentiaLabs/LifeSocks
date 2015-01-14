var gulp = require('gulp');
var browserSync = require("browser-sync");
var sass = require('gulp-sass');

// use default task to launch BrowserSync and watch JS files
gulp.task('default', ['browser-sync'], function () {

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("client/scripts/*.js", ['js', browserSync.reload]);
    gulp.watch("client/styles/*.scss", ['sass']);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./client/"
        }
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

gulp.task('test', function() {
  console.log('Eh, good luck mates! We need to make some awesome stuff for this gulpfile!');
});