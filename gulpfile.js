var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('copy-angular', function() {
	gulp.src('node_modules/angular/angular.js')
		.pipe(gulp.dest('web/lib/angular'));
});

gulp.task('copy-bootstrap', function() {
	gulp.src('node_modules/bootstrap/dist/**/bootstrap.css')
		.pipe(gulp.dest('web/lib/bootstrap/'));
	gulp.src('node_modules/bootstrap/dist/fonts/*.*')
		.pipe(gulp.dest('web/lib/bootstrap/fonts'));
});

gulp.task('default', ['copy-angular', 'copy-bootstrap' ]);

gulp.task('webserver', function() {
	gulp.src('.').pipe(server({
		livereload : true,
		directoryListing : false,
		host: '0.0.0.0',
		port: 80,
		open : false
	}));
});