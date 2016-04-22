var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var less = require('gulp-less-sourcemap');
var gulp_jspm = require('gulp-jspm');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

// Static server
gulp.task('browser-sync', function () {
	browserSync({
		proxy: "localhost:8085"
	});
});

gulp.task('test:unit:frontend', function (cb) {
	exec('mocha test/unit/frontend/**/*.spec.js --compilers js:babel-core/register --reporter nyan', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb();
	});
});

gulp.task('test:unit:backend', function () {
	return gulp.src('test/unit/backend/**/*.spec.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('less', function () {
	gulp.src('./public/css/*.less')
		.pipe(less())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('css', function () {
	return gulp.src(['./public/css/*.css'])
		.pipe(minifyCss())
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('./public/css/dist'));
});

gulp.task('bundleScripts', function () {
	return gulp.src('./public/js/lib/index.js')
		.pipe(gulp_jspm({
			minify: true,
			mangle: true
		}))
		.pipe(gulp.dest('./public/js/lib'));
});

gulp.task('concatScripts', function () {
	return gulp.src(['./public/js/system-polyfills.js',
			'./public/js/jspm_packages/system.js',
			'./public/js/config.js',
			'./public/js/lib/index.bundle.js'])
		.pipe(concat('admin.min.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('buildIndex', function () {
	gulp.src('./public/partials/admin/index.html')
		.pipe(htmlreplace({
            'css': 'css/dist/app.min.css',
			'js': 'js/admin.min.js',
            'conf': {
                src: [['Basic czRmOnM0ZkAyMDE1IQ==']],
                tpl: '<script>window.auth = "%s"</script>'
            }

		}))
		.pipe(rename('index-production.html'))
		.pipe(gulp.dest('./public/partials/admin'));
});

gulp.task('default', done => runSequence('less', 'bundleScripts', 'concatScripts', 'css', 'buildIndex', done));