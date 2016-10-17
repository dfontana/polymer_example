var gulp = require('gulp');
var sass = require('gulp-sass');
var stylemod = require('gulp-style-modules');
var path = require('path');


//Compiles sass to css
gulp.task('styles', function() {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

// Wrap css files into style modues
gulp.task("modularize-styles",['styles'], function() {
    gulp.src("./css/**/*.css")
        .pipe(stylemod({
            // All files will be named 'styles.html'
            filename: function(file) {
                return path.basename(file.path, path.extname(file.path)) + "-module";
            },
            
            // Use '-css' suffix instead of '-styles' for module ids
            moduleId: function(file) {
                return path.basename(file.path, path.extname(file.path)) + "-css";
            }
        }))
        .pipe(gulp.dest("./"));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['modularize-styles']);
});
