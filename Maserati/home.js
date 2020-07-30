define(["jquery", "jquery-cookie","bootstrap"], function ($) {
function home_min() {
$(function () {
sc_num();
show();

function sc_num(){
    var cookieStr = $.cookie("goods");
    if(!cookieStr){
        $(".sc_num").html(0);
    }else{
        var cookieArr = JSON.parse(cookieStr);
        var sum = 0;
        for(var i = 0; i < cookieArr.length; i++){
            sum += cookieArr[i].num;
        }
        $(".sc_num").html(sum);
    }
}
function show (){
    $.ajax({
        url: "data/data.json",
        success: function (arr) {
            // console.log(arr);
            var str = ``;
            for (var i = 0; i < arr.length; i++) {
                // console.log(arr[i].id);
                //创建节点添加到页面上的，写法一、
                str += `<a href="shopping.html?goodsid=${arr[i].id}" >
                    <div class="col-sm-6 col-md-3">
                        <div class="thumbnail">
                            <h3>Ghibli轿车系列</h3>
                            <h6>唤醒不羁自我</h6>
                            <h6>格调高雅、动力强劲，纵享动感操控与舒适驾乘</h6>
                            <img src="${arr[i].img}">
                            <div class="caption">
                                <h6>建议零售价</h6>
                                <p>${arr[i].prirce}</p>
                                <p>
                                    <a href="shopping.html?goodsid=${arr[i].id}" class="btn btn-primary" role="button">
                                        了解更多
                                    </a> 
                                    <a href="shopping.html?goodsid=${arr[i].id}" class="btn btn-default" role="button">
                                        个性化设置
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    </a>`;
            }
            $("#row").html(str);
        },
        error: function (msg) {
            console.log(msg);
        }
    })
}
});
}
return {
    home_min: home_min,
};
});