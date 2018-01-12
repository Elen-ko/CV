// include necassary gulp plugins for the project
var gulp = require("gulp"),
    concat = require("gulp-concat"),
    imageop = require("gulp-image-optimization"),
    sass = require("gulp-sass"),
    minifyCSS = require("gulp-minify-css"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    livereload = require("gulp-livereload"),
    runTimestamp = Math.round(Date.now() / 1000);

// error handling
var onError = function(err) {
    console.log(err);
};

// defining paths and environmental variables
var bases = {
        dev: "resources/",
        live: "public/"
    },
    paths = {
        css: "css/",
        img: "img/",
        js: "js/",
        sass: "sass/",
        fonts: "fonts/"
    };

gulp.task("styles", function() {
    gulp
        .src(["styles.scss"], { cwd: bases.dev + paths.sass })
        .pipe(
            plumber({
                errorHandler: onError
            })
        )
        .pipe(sass())
        .pipe(concat("styles.css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(bases.live + paths.css));
});

gulp.task("images", function(cb) {
    gulp
        .src([
            bases.dev + "img/*.png",
            bases.dev + "img/*.jpg",
            bases.dev + "img/*.gif",
            bases.dev + "img/*.jpeg"
        ])
        .pipe(
            imageop({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            })
        )
        .pipe(gulp.dest(bases.live + paths.img))
        .on("end", cb)
        .on("error", cb);
});

gulp.task("js", function() {
    gulp
        .src(bases.dev + "js/*.js")
        .pipe(concat("scripts.js"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest(bases.live + paths.js));
});

gulp.task("html", function() {
    gulp.src("resources/*.html").pipe(gulp.dest(bases.live));
});

gulp.task("watch", function() {
    gulp.watch(bases.dev + paths.img + "**/*", ["images"]);
    gulp.watch(bases.dev + paths.sass + "**/*.scss", ["styles"]);
    gulp.watch(bases.dev + paths.js + "**/*.js", ["js"]);
    gulp.watch(bases.dev + "*.html", ["html"]);

    livereload.listen();
    gulp.watch([bases.dev + "**/*", "*.html"]).on("change", livereload.changed);
});

gulp.task("default", ["html", "js", "styles", "watch"]);
