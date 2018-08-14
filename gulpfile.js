let gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  minify = require('gulp-minify');

gulp.task('delete', () => {
  del(['dist']);
});  

gulp.task('index', () => {
  gulp.src('index.html')
    .pipe(minify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', () => {
  gulp.src('css/mystyles.css')
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
  gulp.src('js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', () => {
  gulp.src('img/*.jpg')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', done => {
  runSequence('delete', 'index', 'css', 'js', 'img', done);
  console.log('Built!');
});

