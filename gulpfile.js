let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

let pathBuild = './dist/';
let pathApp = './src/';

let pathFonts = [
    pathApp + 'fonts/**/*'
];

gulp.task('sass', function () {
    return gulp.src(pathApp + 'sass/**/*.+(sass|scss)')
        .pipe(plumber({
            errorHandler: function (err) {
            console.log(err);
            this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathBuild + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src(pathApp + '**/*.html')
        .pipe(plumber({
            errorHandler: function (err) {
            console.log(err);
            this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(pathApp + 'js/**/*.js')
        .pipe(plumber({
            errorHandler: function (err) {
            console.log(err);
            this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest(pathBuild + 'js'));
});

gulp.task('img', function () {
    return gulp.src(pathApp + 'img/**/*')
        .pipe(plumber({
            errorHandler: function (err) {
            console.log(err);
            this.emit('end');
            }
        }))
        .pipe(gulp.dest(pathBuild +'img'));
});

gulp.task('fontsDev', () => {
    return gulp.src(pathFonts)
        .pipe(plumber({
            errorHandler: function (err) {
            console.log(err);
            this.emit('end');
            }
        }))
        .pipe(gulp.dest(pathBuild + 'fonts'));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: pathBuild
    });
});

gulp.task('watch', function () {
    gulp.watch(pathApp + '/sass/**/*.+(sass|scss)', ['sass']);
    gulp.watch(pathApp + '**/*.html', ['html']);
    gulp.watch(pathApp + 'js/**/*.js', ['js']);
    gulp.watch(pathApp + 'img/**/*', ['img']);
});

gulp.task('default', [
    'img',
    'js',
    'sass',
    'html',
    'fontsDev',
    'watch',
    'browserSync'
]);