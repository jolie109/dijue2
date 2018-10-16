var gulp = require("gulp");
var sass = require("gulp-sass")
	gulp.task("copy-html",function(){
	gulp.src("html/haha.html")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\html"));
	//gulp.src("index1.html")
	//.pipe(gulp.dest("D:\\phpStudy\\WWW\\only\\demo"));
	});
//gulp.task("copy-html",function(){
	//gulp.src("index.html").pipe(gulp.dest("dist"));
	//gulp.src("index1.html")
	//.pipe(gulp.dest("D:\\phpStudy\\WWW\\only\\demo"));
//});
gulp.task("html",function(){
	gulp.src("html/*.html")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\html"));
});
gulp.task("img",function(){
	gulp.src("img/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\img"));
});
gulp.task("data1",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\js"));
});
gulp.task("data2",function(){
	gulp.src("css/*.css")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\css"));
});
gulp.task("font",function(){
	gulp.src("font/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\font"));
});
gulp.task("php",function(){
	gulp.src("php/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\dijue\\php"));
});
gulp.task("sass",function(){
	gulp.src("scss/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"));
});
//gulp.task("sever",function(){
	//connect.sever({
		//root:"dist"
	//});
//});

gulp.task("build",["html","img","data1","data2","font","php"],function(){
	console.log("ok");
});


gulp.task("watch",function(){
	gulp.watch("html/*.html",["html"]);
	gulp.watch("img/**/*",["img"]);
	gulp.watch("js/*.js",["data1"]);
	gulp.watch("css/*.css",["data2"]);
	gulp.watch("html/haha.html",["copy-html"]);
	gulp.watch("font/**/*",["font"]);
	gulp.watch("php/**/*",["php"]);
	
});