var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    del = require("del"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    gulpif = require("gulp-if"),
    runSequence = require("run-sequence");




gulp.task("css", function() {

    return gulp.src("src/sass/main.scss")
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ["last 5 version", "IE 9"]
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());

});


gulp.task("server", function() {

    browserSync.init({
        server: "src/"
    });

});


gulp.task("watch", function() {

    gulp.watch("src/sass/**/*.scss", ["css"]);
    gulp.watch(["src/*.html", "src/**/*.js"], browserSync.reload);

});

gulp.task("clean", function() {

    return del("dist/");

});

gulp.task("html", function() {

    gulp.src("src/*.html")
        .pipe(useref())
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulp.dest("dist/"));

});

gulp.task("build", function(cb) {

    runSequence("clean", "html", "copy");

});

gulp.task("build:server", ["build"], function() {

    browserSync.init({
        server: "dist/"
    });

});

gulp.task("default", ["css", "server", "watch"]);