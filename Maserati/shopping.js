define(["jquery", "jquery-cookie","bootstrap"], function ($) {
    function shopping_min() {
$(function () {
    sc_num();
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var id = getUrlParam('goodsid');

    console.log(id);
    $.ajax({
        
        type: 'get',
        async: false,
        url: "data/data.json",
        dataType: 'json',
        success: function (res, status) {

            console.log(res);
            $.each(res, function (idx, val) {
                if (id == val.id) {
                    // console.log(val.id);
                    // var str = `<div id ='small'><img src='${val.img}'/><div id = 'mark'></div> </div><div id = 'big'><img src='${val.img}'/> </div>  <div class="goodsRight"><p class="name">产品名称：${val.name}</p ><p class="introduction">商品简介：${val.introduction} </p ><p class="price">商品价格：抢购价: ${val.price}</p ><div id="${val.goodsId}" class="sc_btn">加入购物车</div></div>`;
                        var str = `<div id ='small'><img src='${val.img}'/><div id = 'mark'></div> </div><div id = 'big'><img src='${val.img}'/> </div>  <div class="goodsRight"><p class="js">${val.js} </p><p class="prirce">抢购价: ${val.prirce}</p><div id="${val.id}" class="sc_btn">加入购物车</div></div>`;
                }
                // $(".goods_box").html(str);
                $('.goods_box').append(str);
            });
        },
    });



    $(".goods_box").on("mouseenter", "#small", function () {

        // if(target.tagName.toLowerCase() == "div"){
        //         //处理
        // eve.type.style.backgroundColor = 'red';
        //     }
        // console.log($(this));
        // $(this).show();
        $("#big,#mark").show();
    }).on("mouseleave", "#small", function () {
        $("#big,#mark").hide();
    }).on("mousemove", "#small", function (ev) {
        var l = ev.pageX - $("#small").offset().left - 100;
        //限制出界
        if (l <= 0) {
            l = 0;
        }
        if (l >= 600) {
            l = 600;
        }
        var t = ev.pageY - $("#small").offset().top - 100;
        if (t <= 20) {
            t = 20;
        }
        if (t >= 220) {
            t = 220;
        }
        $("#mark").css({
            left: l ,
            top: t +100
        })

        //右边的大图片反方向对应放大倍数移动
        $("#big img").css({
            left: -2 * l,
            top: -2 * t + 100
        })
    })

    $(".goods_box").on("click", ".sc_btn", function(){
        //当前加入购物车按钮所在商品的id  id num;
        // alert(this.id); // 存储在cookie
        var id = this.id;
        //1、判断是否是第一次添加
        var first = $.cookie("goods") == null ? true : false;
        if(first){
            var arr = [{id:id, num:1}];
            $.cookie("goods", JSON.stringify(arr), {
                expires: 7
            })
        }else{
            //2、判断之前是否添加过
            var cookieArr = JSON.parse($.cookie("goods"));
            var index = cookieArr.findIndex(item => item.id == id);
            if(index >= 0){
                cookieArr[index].num++;
            }else{
                cookieArr.push({id:id, num:1});
            }

            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }

        sc_num();
        // sc_msg();
    })


    //计算购物车中商品总数
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
});
}
return {
    shopping_min: shopping_min,
};
});