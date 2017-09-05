// include necassary gulp plugins for the project
var gulp = 				require('gulp'),
	concat = 			require('gulp-concat'),
	//imagemin =				require('gulp-imagemin'),
  //pngquant =          require('imagemin-pngquant'),
	sass =				require('gulp-sass'),
	minifyCSS =			require('gulp-minify-css'),
	plumber = 			require('gulp-plumber'),
	rename = 			require('gulp-rename'),
	uglify = 			require('gulp-uglify'),
	//iconfont =        require('gulp-iconfont'),
	livereload =        require('gulp-livereload'),
  runTimestamp = Math.round(Date.now()/1000);

// error handling
var onError = function(err) {
	    console.log(err);
	}

// defining paths and environmental variables
var bases = {
		dev		: 'resources/',
		live 	: 'public/'
	},
	paths = {
		css 	: 'css/',
		img 	: 'img/',
		js 		: 'js/',
		sass 	: 'sass/',
    fonts   : 'fonts/'
	};


gulp.task('styles', function () {
	gulp.src(['styles.scss'], {cwd: bases.dev + paths.sass})
	.pipe(plumber({
        errorHandler: onError
    }))
	.pipe(sass())
	.pipe(concat('styles.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCSS())
	.pipe(gulp.dest(bases.live + paths.css));
});

/*gulp.task('image', function () {
    return gulp.src('./resources/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(bases.live + paths.img));
});*/

gulp.task('js', function() {
	gulp.src("resources/js/*.js")
		.pipe(concat('scripts.js'))
		.pipe(rename({suffix: '.min'}))
    	.pipe(uglify())
    	.pipe(gulp.dest(bases.live + paths.js));
});


/*gulp.task('iconFont', function(){
  gulp.src('./resources/icons/*.svg')
  .pipe(plumber())
    .pipe(iconfont({
      fontName: 'futterpedia',
      appendCodepoints: true,
      formats: ['ttf', 'eot', 'woff'],
      timestamp: runTimestamp
    }))
      .on('glyphs', function(glyphs, options) {
          console.log(glyphs, options);
      })
    .pipe(gulp.dest(bases.live + paths.fonts));
});
*/

gulp.task('watch', function() {
	//gulp.watch(bases.dev + paths.img + '**/*', ['image']);
	gulp.watch(bases.dev + paths.sass + '**/*.scss', ['styles']);
	gulp.watch(bases.dev + paths.js + '**/*.js', ['js']);
    //gulp.watch(bases.dev + 'icons/*.svg', ['iconFont']);

    livereload.listen();
    gulp.watch(["resources/**/*", "*.html"]).on('change', livereload.changed);

});

gulp.task('default', [ 'js', 'styles',  'watch']);
