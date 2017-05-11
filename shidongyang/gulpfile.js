const gulp=require('gulp');
const rev=require('gulp-rev'); // md5 ���ɼ��ܺ���ļ�
const sass=require('gulp-sass'); // ����sass
const uglify=require('gulp-uglify');//ѹ����û�б���
const concat=require('gulp-concat');//�ϲ��ļ�
const rename=require('gulp-rename'); // ������
const imagemin = require('gulp-imagemin'); // ѹ��ͼƬ
const bundle=require('gulp-browserify'); // ��������require.js
const cleanCss=require('gulp-clean-css');//ѹ��css
const webserver=require('gulp-webserver'); // ����������
const revreplace = require('gulp-rev-collector'); // �Զ�����html�е������ļ�

const url = require('url');
const datajson=require('./data/main.js');//�����mock�����ļ�
gulp.task('jsmin',function(){
	//ѹ��js
	gulp.src('js/*.js')//��Ҫѹ�����ļ�Ŀ¼
		.pipe(concat('common.js'))//�ϲ���ѹ��
		.pipe(uglify())//ѹ��
		.pipe(gulp.dest('build/js'))//ѹ�����ļ���
}) 
gulp.task('default',function(){
	//��Ĭ�ϵ�������������
})
//sass���� 
gulp.task('sass',function(){
	return gulp.src('css/*.sass')
		.pipe(sass())	//���ɶ�Ӧ��css
		.pipe(cleanCss())//ѹ��css	
		.pipe(gulp.dest('build/css'))
})
//ѹ��
gulp.task('mincss',['sass'],function(){
	return gulp.src('css/style.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('build/css'))
})
//�Զ�����
/*gulp.task('server',function(){
	gulp.watch('css/*.sass',['mincss'])
	return gulp.src('./')//ָ���Ŀ¼
		.pipe(webserver({
			livereload:true,//�Զ�����ҳ��
			directoryListing:true,
			open:"index.html"//�Զ���Ŀ¼ture�������·��src
		}))
})*/
//������
gulp.task('rename',function(){
	return gulp.src('js/index.js')// ָ���Ŀ¼
		.pipe(bundle()) //����������JavaScript��CSS�ļ����ļ���
		.pipe(rename('public.js'))
        .pipe(gulp.dest('build/js'))
})
//���ܵ��ļ�
gulp.task('rev',function(){
	return gulp.src(['css/style.css'])
		.pipe(rev())			//�����ļ�����
		.pipe(gulp.dest('public/css'))
		.pipe(rev.manifest())  //��ȡjson�嵥
		.pipe(gulp.dest('public/json'))
})
//�Զ�����html�е������ļ�
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
//�¼�����
gulp.task('build',['jsmin','mincss','html','copy-index'])
//�Զ�����HTML�ļ�
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
//�����ļ�
gulp.task('copy-index',function(){
	gulp.src('css/style.css')
		.pipe(gulp.dest('copy'))
})
//ѹ��ͼƬ
gulp.task('imagemin', function () {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});
//��������
gulp.task('webserver',['build'],function(){
	gulp.watch("html/*.html",["html"])
	gulp.src('./build')
		.pipe(webserver({
			livereload:true,
			directoryListing: true,
			middleware:function(res,req,next){
				//�����·�� ���Զ��õ���ַ
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
