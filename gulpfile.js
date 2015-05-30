/* Gulp operations */
var gulp = require('gulp');
var es = require('event-stream');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var order = require('gulp-order');
/* Content operations */
var concat = require('gulp-concat'); /* sourcemaps */
var uglify = require('gulp-uglify'); /* sourcemaps */
var sourcemaps = require('gulp-sourcemaps'); /* sourcemaps */
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var ghPages = require('gulp-gh-pages');

var debug = require('gulp-debug'); /* DEBUG */

/* =Variables
 * ------------------------------------------------------------ */
var package = require('./package.json');

var basePaths = {
	source: 'src/',
	build: 'build/',
};

var paths = {
	js: basePaths.source+'js/',
	css: basePaths.source,
	html: basePaths.source,
	sourcemaps: '../sourcemaps/',
};

var jsFiles = {
	lib: [
		'miscHelperFunctions.js',
		'vector.js',
		'grid.js',
		'world.js',
		'world_directions.js',
		'world_perception.js',
		'world_logic.js',
		'ai.js',
	],
	data: [
		'legend.js',
		'plans.js',
	],
	view: [
		'color.js',
		'animate.js',
		'main.js'
	]
};
jsFiles.lib.out = "asciilife.js";
jsFiles.data.out = "data.js";
jsFiles.view.out = "main.js";
/* Set jsFiles.<group>.paths */
Object.keys(jsFiles).forEach(function(group) {
	jsFiles[group].paths = jsFiles[group].map(function(fileName) {
		return paths.js+group+'/'+fileName; });
});

package.pretty = {
	name: package.name.replace('-',' '),
	author: package.author,
};

/* Script to be appended to the very end of <body> */
var jsExecInsert = 'main()';

/* =Tasks
 * ------------------------------------------------------------ */

gulp.task('default', ['build']);

gulp.task('deploy', ['buildFull'], function() {
	return gulp.src(basePaths.build+'**/*')
		.pipe(ghPages());
});

gulp.task('buildFull', ['build', 'license']);

gulp.task('build', ['js', 'css', 'html']);

gulp.task('js', function() {
	var jsTasks = [];
	Object.keys(jsFiles).forEach(function(group) {
		jsTasks.push(
			gulp.src(jsFiles[group].paths)
			/* Sourcemaps-compatible operations */
			.pipe(sourcemaps.init())
				.pipe(concat(jsFiles[group].out))
				.pipe(uglify())
			.pipe(sourcemaps.write(paths.sourcemaps))
			.pipe(gulp.dest(basePaths.build))
		);
	});
	return es.concat.apply(null, jsTasks);
});

gulp.task('css', function() {
	return gulp.src(basePaths.source+'*css')
		.pipe(minifyCss())
		.pipe(gulp.dest(basePaths.build));
});

gulp.task('html', function() {
	/* Insert script tags in place of original script */
	var jsTagsInsert = "";
	for (var i = 0, groups = Object.keys(jsFiles);
								 i < groups.length; ++i) {
		if (i > 0) {
			jsTagsInsert += "\t\t<script src=\""; }
		jsTagsInsert += jsFiles[groups[i]].out;
		if (i < groups.length - 1) {
			jsTagsInsert += "\"></script>\n"; }
	}

	return gulp.src(basePaths.source+'*html')
		.pipe(replace('$Title', package.pretty.name))
		.pipe(replace('scriptManager.js', jsTagsInsert))
		.pipe(replace('</body>', '\t<script>'+
					  jsExecInsert+'</script>\n</body>'))
		.pipe(gulp.dest(basePaths.build));
});

gulp.task('license', ['js', 'css', 'html' ], function() {
	var copyrightText =
		"Copyright "+new Date().getFullYear()+" "+
		package.pretty.author+"\n";
	var licenseText =
		"This file is part of "+package.pretty.name+".\n\n"+package.pretty.name+" is free software: you can redistribute it and/or modify\nit under the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\n"+package.pretty.name+" is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with "+package.pretty.name+".  If not, see <http://www.gnu.org/licenses/>.\n";

	var headerText = copyrightText + licenseText;

	return merge(
		gulp.src(basePaths.build+'*.js')
			.pipe(insert.prepend(commentString(headerText, "js"))),
		gulp.src(basePaths.build+'*.css')
			.pipe(insert.prepend(commentString(headerText, "css"))),
		gulp.src(basePaths.build+'*.html')
			.pipe(replace(
				'<!DOCTYPE html>', '<!DOCTYPE html>\n'+commentString(headerText, "html")))
	).pipe(gulp.dest(basePaths.build));

});

/* Helper functions
 * ------------------------------------------------------------ */
function commentString(string, fileType) {
	var tags = {
		html:	['<!--', '-->'],
		css:	['/*', '*/'],
		js:		['/*', '*/']
	};
	return tags[fileType][0]+' '+string+' '+tags[fileType][1];
}
