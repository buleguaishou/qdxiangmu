console.log("加载成功");
//引入所有的模块
//配置路径
require.config({
  paths: {
    jquery: "//cdn.staticfile.org/jquery/2.1.1/jquery.min",
    "jquery-cookie": "jquery.cookie",
    home: "home",
    bootstrap:"//cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min"
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    bootstrap: {
      exports: "_",
    },
  },
});

//调用模块
require(["home"], function (home) {
    home.home_min();
});