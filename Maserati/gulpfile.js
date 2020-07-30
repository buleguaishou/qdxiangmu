//gulp遵从 commonjs
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
//对当前的html文件进行压缩
gulp.task("copy-html", function () {
  return gulp
    .src("*.html")
    .pipe(
      htmlmin({
        removeEmptyAttibutes: true, // 移出所有空属性
        collapseWhitespace: true, // 压缩 html
      })
    )
    .pipe(gulp.dest("dist/"))
    // .pipe(connect.reload());
});

// 处理图片
gulp.task("images", function () {
  return gulp
    .src("*.{jpeg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

//处理js 如果你使用了第三方库，不需要再进行处理了
gulp.task("scripts", function () {
  return gulp
    .src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

//数据源文件
gulp.task("data", function () {
  return gulp
    .src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
});

//处理scss gulp-sass gulp-minify-css gulp-rename
//如果不重命名，可以批量处理，如果重命名，一个文件一个任务，任务名不能重复
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function () {
  return gulp
    .src("car.css")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("car.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("scss1", function () {
    return gulp
      .src("history.css")
      .pipe(scss())
      .pipe(gulp.dest("dist/css"))
      .pipe(minifyCSS())
      .pipe(rename("history.min.css"))
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
});
gulp.task("scss2", function () {
    return gulp
      .src("home.css")
      .pipe(scss())
      .pipe(gulp.dest("dist/css"))
      .pipe(minifyCSS())
      .pipe(rename("home.min.css"))
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
});
gulp.task("scss3", function () {
    return gulp
      .src("login.css")
      .pipe(scss())
      .pipe(gulp.dest("dist/css"))
      .pipe(minifyCSS())
      .pipe(rename("login.min.css"))
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
});
gulp.task("scss4", function () {
    return gulp
      .src("register.css")
      .pipe(scss())
      .pipe(gulp.dest("dist/css"))
      .pipe(minifyCSS())
      .pipe(rename("register.min.css"))
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
});
gulp.task("scss5", function () {
    return gulp
      .src("shopping.css")
      .pipe(scss())
      .pipe(gulp.dest("dist/css"))
      .pipe(minifyCSS())
      .pipe(rename("shopping.min.css"))
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
});
//先让上面的任务都执行一次，这过程 build
gulp.task(
  "build",
  ["copy-html", "scripts", "images", "data", "scss","scss1","scss2","scss3","scss4","scss5"],
  function () {
    console.log("项目建立成功");
  }
);

//实现监听
gulp.task("watch", function () {
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch("*.{jpeg,png}", ["images"]);
  gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
  gulp.watch(["*.json", "!package.json"], ["data"]);
  gulp.watch("car.css", ["scss"]);
  gulp.watch("history.css", ["scss1"]);
  gulp.watch("home.css", ["scss2"]);
  gulp.watch("login.css", ["scss3"]);
  gulp.watch("register.css", ["scss4"]);
  gulp.watch("shopping.css", ["scss5"]);
});

//启动一个临时的服务器
const connect = require("gulp-connect");

gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 1520,
    livereload: true,
  });
});

//同时启动监听和服务
gulp.task("default", ["watch", "server"]);