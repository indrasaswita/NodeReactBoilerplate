"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass")(require('sass'));
var run = require("gulp-run");
var clean = require("gulp-clean");

sass.compiler = require("node-sass");

gulp.task("sass", function () {
	console.log("sass");
	return gulp
		.src("./src/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./src"));
});

gulp.task("sass-watch", function () {
	console.log("sass-watch");
	gulp
		.watch("./src/**/*.scss", gulp.series("sass"));
});

gulp.task("clean", function () {
	console.log("clean");
	return gulp
		.src("./src/**/*.css", { read: false })
		.pipe(clean());
});

gulp.task("compile", function () {
	console.log("compile");
	return run("tsc").exec();
});

// gulp.task("copy-css", function () {
// 	console.log("copy-css");
// 	return gulp
// 		.src("./src/**/*.css")
// 		.pipe(gulp.dest("./core"));
// });

gulp.task("default", async function () {
	const tasks = gulp.series("clean", "sass");
	tasks();
});