const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const runSequence = require("run-sequence");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function () {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("app/css"))
        .pipe(autoprefixer({
            browsers: ["last 4 versions", ">1%"],
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "app"
        },
    })
})

gulp.task("watch", function () {
    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.scss", browserSync.reload);
})

gulp.task("default", function (callback) {
    runSequence(["sass", "browserSync"], "watch",
        callback
    )
});

// Optimizing images
// gulp.task("images", function () {
//     return gulp.src("app/img/**/*.+(png|jpg|jpeg|gif|svg)")
//     // Caching images that ran through imagemin
//         .pipe(cache(imagemin({progressive: true})))
//         .pipe(gulp.dest("dist/img"))
// });

// gulp.task("clean:dist", function() {
//     return del.sync("dist");
//   })

// gulp.task("build", function (callback) {
//     runSequence(
//         "clean:dist",
//         "sass",
//         ["images"],
//         callback
//     )
// });