var gulp = require('gulp');
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var docco = require("gulp-docco");
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: {
        in: 'src/**/*coffee',
        out: 'lib'
    },
    tests: {
        in: 'test/src/**/*coffee',
        out: 'test/lib'
    },
    docs: {
        out: 'docs'
    }
};

gulp.task('compile-scripts', function () {
    return gulp.src(paths.scripts.in)
            .pipe(sourcemaps.init())
            .pipe(coffee())
            .pipe(sourcemaps.write('sourcemaps'))
            .pipe(gulp.dest(paths.scripts.out))
            .pipe(docco())
            .pipe(gulp.dest(paths.docs.out));
});

gulp.task('compile-tests', function () {
    return gulp.src(paths.tests.in)
            .pipe(sourcemaps.init())
            .pipe(coffee())
            .pipe(sourcemaps.write('sourcemaps'))
            .pipe(gulp.dest(paths.tests.out))
            .pipe(docco())
            .pipe(gulp.dest(paths.docs.out));
});

gulp.task('test',['tests']);
gulp.task('tests', ['default'], function () {
    return gulp.src(paths.scripts.out + '/**/*.js')
            .pipe(istanbul())
            .on('finish', function () {
                gulp.src(paths.tests.out + '/*.js', {read: false})
                        .pipe(mocha({
                            reporter: 'spec',
                            timeout: 5000
                        }))
                        .pipe(istanbul.writeReports({
                            reporters: ['lcov', 'text', 'text-summary']
                        }));
            });
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts.in, ['scripts']);
    gulp.watch(paths.tests.in, ['tests']);
});

gulp.task('default', ['compile-tests', 'compile-scripts']);
