let gulp = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  inject = require('gulp-inject'),
  runSequence = require('run-sequence'),
  minify = require('gulp-minify'); 

gulp.task('delete', () => {
  del(['docs']);
});  

gulp.task('index', () => {
  gulp.src('index.html')
    .pipe(gulp.dest('docs'));
});

gulp.task('css-deps', () => {
  gulp.src([
    "node_modules/aos/dist/aos.css",
    "node_modules/animate.css/animate.min.css",
    "node_modules/bulma/css/bulma.css"
  ])
    .pipe(minify())
    .pipe(concat('deps.css'))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('css', () => {
  gulp.src([
    'css/mystyles.css'
  ])
    .pipe(minify())
    .pipe(gulp.dest('docs/css'));
});

gulp.task('js', () => {
  gulp.src('js/*.js')
    .pipe(gulp.dest('docs/js'));
});

gulp.task('img', () => {
  gulp.src('img/*.jpg')
    .pipe(gulp.dest('docs/img'));
});

gulp.task('js-deps', () => {
  gulp.src([
    "node_modules/bulma-carousel/dist/js/bulma-carousel.min.js",
    "node_modules/aos/dist/aos.js"
  ])
    .pipe(uglify())
    .pipe(minify())
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('docs/js'));
});

gulp.task('build', done => {
  runSequence('delete', 'css', 'js', 'css-deps', 'js-deps', 'img', 'index', done);
  console.log('Built!');
});

