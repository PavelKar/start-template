var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglifyjs'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    htmlhint     = require('gulp-htmlhint'),
    gutil        = require('gulp-util'),
    ftp          = require('vinyl-ftp');

gulp.task('sass', function() {
  return gulp.src('src/sass/main.sass')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', function() {
  return gulp.src([])
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cleanCSS())
  .pipe(concat('main-prod.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('src/css'));
});

gulp.task('minify-libs', function() {
  return gulp.src([])
  .pipe(concat('libs.js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('src/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
    /*tunnel: true,
    tunnel: test*/
  });
});


gulp.task('clean', function() {
  return del.sync('prod');
});

gulp.task('htmlhint', function() {
  return gulp.src('src/*.html')
  .pipe(htmlhint())
  .pipe(htmlhint.reporter())
  .pipe(htmlhint.failReporter({suppress: true}));
});

gulp.task( 'deploy', function () {

    var conn = ftp.create( {
        host:     '*****',
        user:     '*****',
        password: '*****',
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
        'src/**'
    ];

    return gulp.src( globs, {buffer: false } )
        .pipe( conn.dest( '/public_html' ) );

} );

gulp.task('watch', ['browser-sync', 'htmlhint', 'sass'], function() {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*', browserSync.reload);
  gulp.watch('src/libs/**/*', browserSync.reload);
});

gulp.task('build', ['clean'], function() {

  var buildCSS = gulp.src(['src/css/**/*'])
  .pipe(gulp.dest('prod/css'));

  var buildFonts = gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('prod/fonts'));

  var buildImg = gulp.src('src/img/**/*')
  .pipe(gulp.dest('prod/img'));

  var buildJS = gulp.src('src/js/**/*')
  .pipe(gulp.dest('prod/js'));

  var buildHTML = gulp.src('src/*.html')
  .pipe(gulp.dest('prod'));

  var buildApacheConfig = gulp.src('src/ht.access')
  .pipe(gulp.dest('prod'));

});

gulp.task('default', ['watch']);
