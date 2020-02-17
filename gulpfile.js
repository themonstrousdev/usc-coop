const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      sourcemaps = require('gulp-sourcemaps'),
      nodemon = require('gulp-nodemon'),
      browserSync = require('browser-sync').create();

let paths = {
    styles: {
        src: "public/scss/*.scss",
        dest: "public/css"
    }
};

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    )
}

function reload() {
    browserSync.reload();
}

function server(cb) {
    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function() {
        if(!started) {
            cb();
            started = true;
        }
    })
}

function browserStart() {
    browserSync.init(null, {
        proxy: "localhost:3000",
        files: ["public/**/*.*", "views/**/*.**"],
        port: 7000
    });
}

function watch() {
    
    server(browserStart);

    gulp.watch(paths.styles.src, style);
    gulp.watch("views/**/*.ejs", reload);
}

exports.default = watch;