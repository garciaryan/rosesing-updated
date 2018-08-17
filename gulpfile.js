const gulp = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  ghPages = require('gulp-gh-pages'),
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

gulp.task('css-deps', () => {
  gulp.src([
    "node_modules/aos/dist/aos.css",
    "node_modules/animate.css/animate.min.css",
    "node_modules/bulma/css/bulma.css"
  ])
    .pipe(gulpif(file => !(file.path.includes('.min.css')), minify()))
    .pipe(concat('deps.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('css', () => {
  gulp.src([
    'css/mystyles.css'
  ])
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
  gulp.src('js/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', () => {
  gulp.src('img/*.jpg')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js-deps', () => {
  gulp.src([
    "node_modules/bulma-carousel/dist/js/bulma-carousel.min.js",
    "node_modules/aos/dist/aos.js"
  ])
    .pipe(uglify())
    .pipe(gulpif(file => !(file.path.includes('.min.js')), minify()))
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', done => {
  runSequence('delete', 'css-deps', 'js-deps', 'css', 'js', 'img', 'index', done);
  console.log('Built!');
});

gulp.task('deploy', () => {
  gulp.src('./dist/**/*')
    .pipe(ghPages());
  console.log('Deployed dist folder to gh-pages.');
});