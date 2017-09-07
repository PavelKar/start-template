var gulp 				 	 = require('gulp'),
		sass 				 	 = require('gulp-sass'), 					// Sass
		autoprefixer 	 = require('gulp-autoprefixer'),  // Автопрефиксер(вендорные префиксы для кроссбраузерности)
		cleanCSS 		 	 = require('gulp-clean-css'),			// Сжатие css
		uglify 			 	 = require('gulp-uglifyjs'),			// Сжатие js
		concat 			 	 = require('gulp-concat'),				// Конкатенация файлов
		browserSync  	 = require('browser-sync'),				// Browser-sync(livereload)
		rename 			 	 = require('gulp-rename'), 				// Переименование файлов
		del 				 	 = require('del'),								// Удаление production
		cache 			 	 = require('gulp-cache'),					// Кэш
		htmlhint 		 	 = require('gulp-htmlhint'),			// Проверка синтаксиса HTML
		gutil					 = require('gulp-util'),					// Deploy проекта по ftp
		ftp						 = require('vinyl-ftp');					// Deploy проекта по ftp

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

gulp.task('clear', function() {
	return cache.clearAll();
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
