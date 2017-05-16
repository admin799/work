const gulp=require("gulp");
const uglify=require("gulp-uglify");
gulp.task('jsmin',function(){
	//压缩js
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build'))
});
gulp.task('default',function(){
	//将你的默认的任务代码放在这
});