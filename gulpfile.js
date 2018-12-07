let gulp = require("gulp");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");
let cleanCSS = require("gulp-clean-css");
let webs = require("gulp-webserver");
gulp.task("copy",()=>{
	//1、读取所有文件
	gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"))
		//*.*任何文件 将src下的所有文件 复制到dist文件中
	//2、写入到dist目录
})

gulp.task("buildJS",()=>{
	gulp.src("./src/**/*.js")
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest("./dist"))
})
gulp.task("buildCSS",()=>{
	gulp.src("./src/**/*.css")
		.pipe(
			cleanCSS({compatibility: 'ie8'})
			)
		.pipe(gulp.dest("./dist"))
})

gulp.task("web",()=>{
	gulp.src("src")
		.pipe(webs({
			livereload: true,
			https: true,
			proxies:[
				{
					source : '/listmore',
					target : 'https://m.lagou.com/listmore.json'
				}
			]
		}))
})
//可实现上面两个命令同时执行
gulp.task("build",["buildJS","buildCSS"])