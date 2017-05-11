const gulp=require('gulp');
const rev=require('gulp-rev'); // md5 生成加密后的文件
const sass=require('gulp-sass'); // 编译sass
const uglify=require('gulp-uglify');//压缩后没有备份
const concat=require('gulp-concat');//合并文件
const rename=require('gulp-rename'); // 重命名
const imagemin = require('gulp-imagemin'); // 压缩图片
const bundle=require('gulp-browserify'); // 变相运用require.js
const cleanCss=require('gulp-clean-css');//压缩css
const webserver=require('gulp-webserver'); // 开发服务器
const revreplace = require('gulp-rev-collector'); // 自动更改html中的引用文件

const url = require('url');
const datajson=require('./data/main.js');//请求的mock数据文件
gulp.task('jsmin',function(){
	//压缩js
	gulp.src('js/*.js')//需要压缩的文件目录
		.pipe(concat('common.js'))//合并后压缩
		.pipe(uglify())//压缩
		.pipe(gulp.dest('build/js'))//压缩到文件夹
}) 
gulp.task('default',function(){
	//将默认的任务代码放在这
})
//sass任务 
gulp.task('sass',function(){
	return gulp.src('css/*.sass')
		.pipe(sass())	//生成对应的css
		.pipe(cleanCss())//压缩css	
		.pipe(gulp.dest('build/css'))
})
//压缩
gulp.task('mincss',['sass'],function(){
	return gulp.src('css/style.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('build/css'))
})
//自动保存
/*gulp.task('server',function(){
	gulp.watch('css/*.sass',['mincss'])
	return gulp.src('./')//指向根目录
		.pipe(webserver({
			livereload:true,//自动更新页面
			directoryListing:true,
			open:"index.html"//自动打开目录ture，或具体路径src
		}))
})*/
//重命名
gulp.task('rename',function(){
	return gulp.src('js/index.js')// 指向根目录
		.pipe(bundle()) //构建块连接JavaScript和CSS文件的文件快
		.pipe(rename('public.js'))
        .pipe(gulp.dest('build/js'))
})
//加密的文件
gulp.task('rev',function(){
	return gulp.src(['css/style.css'])
		.pipe(rev())			//加密文件命名
		.pipe(gulp.dest('public/css'))
		.pipe(rev.manifest())  //获取json清单
		.pipe(gulp.dest('public/json'))
})
//自动更改html中的引用文件
gulp.task('revreplace',function(){
	return gulp.src(['rev-manifest.json','html/index.html'])
		.pipe(rev())
		.pipe(gulp.dest('build/html'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('public/json'))
})

gulp.task('html',function(){
	gulp.src('html/*.html')
		.pipe(gulp.dest('build/html'))
})
//事件监听
gulp.task('build',['jsmin','mincss','html','copy-index'])
//自动更改HTML文件
/*gulp.task('webserver',['build'],function(){
	gulp.watch('css/*.sass',['mincss'])
	gulp.watch('html/*.html',['html'])
	gulp.src('./build')
		.pipe(webserver({
			livereload:true,
			directoryListing:true,
			open:'html/index.html'
		}))
})*/
//拷贝文件
gulp.task('copy-index',function(){
	gulp.src('css/style.css')
		.pipe(gulp.dest('copy'))
})
//压缩图片
gulp.task('imagemin', function () {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});
//启动服务
gulp.task('webserver',['build'],function(){
	gulp.watch("html/*.html",["html"])
	gulp.src('./build')
		.pipe(webserver({
			livereload:true,
			directoryListing: true,
			middleware:function(res,req,next){
				//请求的路径 会自动拿到地址
				const reqPath=url.parse(res.url).pathname;
				const routes=datajson.data();
				routes.forEach(function(i){
					console.log(i.route)
					console.log(reqPath)
					if(i.route==reqPath){
						i.handle(res,req,next)
					}
				})
				next()
			},
			open: "./html/index.html"
		}))
})
