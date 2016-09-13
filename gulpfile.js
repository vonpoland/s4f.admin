var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var less = require('gulp-less-sourcemap');
var gulp_jspm = require('gulp-jspm');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

// Static server
gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: 'localhost:8889/admin',
		files: ['public/js/lib/**/*.js', 'public/css/**/*.css']
	});
});

gulp.task('test:unit:frontend', function (cb) {
	exec('mocha test/unit/frontend/**/*.spec.js --compilers js:babel-core/register --reporter mocha-jenkins-reporter --reporter-options junit_report_path=frontend.xml', cb);
});

gulp.task('test:unit:frontend:dev', function (cb) {
	require('babel-core/register');

	return watch(['public/**/*.js', 'test/unit/frontend/**/*.js'], function () {
		gulp.src('test/unit/frontend/**/*.spec.js', {read: false})
			.pipe(mocha())
			.on('error', function (error) {
				console.error(error);
			});

		// exec('mocha test/unit/frontend/**/*.spec.js --compilers js:babel-core/register', function (err, stdout, stderr) {
		// 	console.log(stdout);
		// 	console.log(stderr);
		// 	cb(err);
		// });
	});
});

gulp.task('test:unit:backend', function () {
	return gulp.src('test/unit/backend/**/*.spec.js', {read: false})
		.pipe(mocha({
			reporter: 'mocha-jenkins-reporter',
			reporterOptions: {
				junit_report_name: 'Tests',
				junit_report_path: 'backend.xml',
				junit_report_stack: 1
			}
		}));
});

gulp.task('test:unit:backend:dev', function () {
    return gulp.src('test/unit/backend/**/*.spec.js', {read: false})
        .pipe(mocha({}));
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
			'js': 'js/admin.min.js'
		}))
		.pipe(rename('index-production.html'))
		.pipe(gulp.dest('./public/partials/admin'));
});

gulp.task('default', done => runSequence('less', 'bundleScripts', 'concatScripts', 'css', done));