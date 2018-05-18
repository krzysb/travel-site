var gulp = require("gulp")
    , watch = require("gulp-watch")
    , postcss = require('gulp-postcss')
    , autoprefixer = require("autoprefixer")
    , cssvars = require("postcss-simple-vars")
    , nested = require("postcss-nested")
    , postcssImport = require("postcss-import")
    , browserSync = require("browser-sync").create()
    , plumber = require("gulp-plumber")
    , mixins = require("postcss-mixins");
//TASKS
gulp.task("css", function () {
    return gulp.src("./app/assets/styles/style.css").pipe(plumber()) //catch errors
        .pipe(postcss([postcssImport, mixins, nested, cssvars, autoprefixer])).pipe(gulp.dest("./app/build/styles"))
});
gulp.task("watch", function () {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    watch("./app/index.html", function () {
        browserSync.reload();
    });
    watch("./app/assets/**/*.css", function () {
        gulp.start("cssInject");
    });
});
gulp.task("cssInject", ["css"], function () {
    return gulp.src("./app/build/styles/style.css").pipe(browserSync.stream());
});