// gulp task runner. crafted by @ardodeardo

const { src, dest, series, watch } = require('gulp');
const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require("rollup-plugin-terser");
const gulpif = require('gulp-if');
const del = require('del');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');


// settings variable
var isProduction = false;
const assets = 'assets';
const root = {
    dev: 'app',
    prod: 'build',
}
const path = {
    dev: {
        scss    : `${ root.dev }/${ assets }/scss/**/*.scss`,
        js      : `${ root.dev }/${ assets }/js/**/*.js`,
        fonts   : `${ root.dev }/${ assets }/fonts/**/*`
    },
    prod: {
        css     : `${ root.prod }/${ assets }/css`,
        js      : `${ root.prod }/${ assets }/js`,
        images  : `${ root.prod }/${ assets }/images`,
        fonts   : `${ root.prod }/${ assets }/fonts`
    }
}


// gulp tasks
function compileHtml() {
    return src(['app/**/*.html', '!app/layout.html'])
        .pipe(nunjucks.compile())
        .pipe(dest(root.prod));
}

function compileSass() {
    return src(path.dev.scss)
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulpif(isProduction, cssnano()))
        .pipe(gulpif(!isProduction, sourcemaps.write('./maps')))    
        .pipe(dest(path.prod.css));
}

function compileJs() {  
    return rollup
        .rollup({
            input: `./${ root.dev }/${ assets }/js/main.js`,
            plugins: [
                ...isProduction ? [
                    nodeResolve(),
                    commonjs(),
                    babel({ babelHelpers: 'bundled' }),
                    terser()
                ] : [
                    nodeResolve(),
                    commonjs(),
                    babel({ babelHelpers: 'bundled' })
                ]
            ]
        }).then(bundle => {
            return bundle.write({
                file: `${ path.prod.js }/main.js`,
                format: 'es',
                name: 'main',
                sourcemap: isProduction ? false : true
        });
    });
}

function browserSync(cb) {
    browsersync.init({
        server: {
            baseDir: root.prod
        },
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

function imageOptimization() {
    return src('app/assets/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(dest(path.prod.images));
}

function copyFonts() {
    return src(path.dev.fonts)
        .pipe(dest(path.prod.fonts));
}

function cleanBuild(cb) {
    del.sync(root.prod);
    cb();
}


function watchTasks() {
    watch('app/**/*.html', series(compileHtml, browserSyncReload));
    watch(path.dev.scss, series(compileSass, browserSyncReload));
    watch(path.dev.js, series(compileJs, browserSyncReload));
}

function setProduction(cb) {
    isProduction = true;
    cb();
}


// gulp command
exports.default = series(
    cleanBuild,
    compileHtml,
    compileSass,
    compileJs,
    browserSync,
    watchTasks
);

exports.dev = series(
    cleanBuild,
    compileHtml,
    compileSass, 
    compileJs,
    copyFonts
);

exports.build = series(
    cleanBuild,
    setProduction,
    compileHtml,
    compileSass, 
    compileJs, 
    imageOptimization, 
    copyFonts
);

exports.clean = cleanBuild;

