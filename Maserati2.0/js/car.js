define(["jquery", "jquery-cookie","bootstrap"], function ($) {
function car_min() {
$(function () {
    console.log(1);
sc_num();
sc_msg();
checkbox();
totalMoney();


    //计算购物车中商品总数
    function sc_num() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
            $(" .sc_num").html(0);
        } else {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(" .sc_num").html(sum);
            console.log(sum);
        }
    }

    //加载右侧的购物车列表
    //cookie 只存储id和num，商品数据服务器上
    //再去下载数据，从数据中筛选已经加入购物车的数据。
    function sc_msg() {
        $.ajax({
            url: "data/data.json",
            success: function (arr) {
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    // console.log(cookieArr);
                    var arr1 = []; //符合条件数据
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < cookieArr.length; j++) {
                            if (arr[i].id == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                arr1.push(arr[i]);
                                break;
                            }
                        }
                    }
                    console.log(arr1); //购物车显示的数据
                var str = ``;
                var sum = ``;
                    
                for(var i = 0; i < arr1.length; i++){
                    str += `<li id="${arr1[i].id}">
                        <input type="checkbox" id="${arr1[i].id}" class = "boxBtn" style = "margin: 150px 6px 0 6px;" >
                        <div class="sc_goodsPic">
                            <img src="${arr1[i].img}" alt="">
                        </div>
                        <div class="sc_goodsTitle">
                        <p>${arr1[i].js}</p>
                        <p>${arr1[i].prirce}</p>
                        </div>
                        <div class="sc_goodsNum">
                            <button>+</button>
                            ${arr1[i].num}
                            <button>-</button>
                        <div class="totalPrice">${arr1[i].num * parseFloat(arr1[i].prirce)}万RMB</div>
                    </div>
                        <div class="delete_goodsBtn">删除</div>
                    </li>
                    `
                }
                $(".car").html(str);
            }
        },
        error: function(msg){
            console.log(msg);
        } 
        })
    }

    //给右侧购物车的按钮添加删除功能
    $(".car").on("click", ".delete_goodsBtn", function () {
        var id = $(this).closest("li").remove().attr("id");
        console.log(id);
        //在cookie中删除这个数据
        var cookieArr = JSON.parse($.cookie("goods"));
        cookieArr = cookieArr.filter(item => item.id != id);

        cookieArr.length ? $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 }) : $.cookie("goods", null);
        sc_num();
        sc_msg();
        checkbox();
        totalMoney();
    })

    //给右侧购物车的+和-按钮添加点击
    $(".car").on("click", ".sc_goodsNum button", function () {
        var id = $(this).closest("li").attr("id");
        //找到cookie中的商品
        var cookieArr = JSON.parse($.cookie("goods"));
        var res = cookieArr.find(item => item.id == id);

        if (this.innerHTML == "+") {
            if ($(this).checked = true) {
                $(this).checked = true;
            } else {
                $(this).checked =false;
            }
            res.num++;
        } else {
            res.num == 1 ? alert("数量为1，不能减少") : res.num--;
        }
        
        $(this).siblings("span").html(`商品数量：${res.num}`);

        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })

        sc_num();
        sc_msg();
        checkbox();
        totalMoney();
    })

    //清空购物车按钮
    $("#clearCar").click(function () {
        //清空购物车
        //1、清空cookie
        $.cookie("goods", null);
        //2、清空页面
        // $(".sc_right ul").html("");
        $(".car").empty();
        sc_num();
        sc_msg()
    })

    function checkbox(){
        var $allCheckbox = $('input[type="checkbox"]');
        //全部的按钮
        // $allCheckbox.click(function () {
        //     console.log($(this))
        //     if ($(this).is(':checked')) {
        //         $(this).next('label').addClass('mark');
        //     } else {
        //         $(this).next('label').removeClass('mark')
        //     }
        // });
        //全选按钮
        $('.boxAll').click(function () {
            var $checkboxs = $('.car').find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });

    // 判断单个复选框有一个未选中，全选按钮取消选中，若全都选中，则全选打对勾 
    $(".car").each(function(){
        $(".car").on("click", ".boxBtn",function(){
                console.log($(this));
                var $btnAll = $('.car').find('input[type="checkbox"]')
                console.log($btnAll);
                if ($(this).is(':checked')) {
                    $(this).next('label').addClass('mark');
                    var num = 0;
                    var len = $btnAll.length;
                    $btnAll.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.car').prev().find('.boxAll').prop("checked", true);
                        $(this).parents('.car').prev().find('.boxAll').next('label').addClass('mark');
                    }

                } else {
                    //否则，店铺全选取消
                    $(this).next('label').removeClass('mark')
                    $(this).parents('.car').prev().find('.boxAll').prop("checked", false);
                    $(this).parents('.car').prev().find('.boxAll').next('label').removeClass('mark');
                }
                totalMoney();
        
                });
            })

        }       
        function totalMoney() {
        var total_money = 0;
        // $(".car").on("click", ".boxBtn",function(){
        var $btnAll = $('.car').find('input[type="checkbox"]');  
        $btnAll.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseFloat($(this).parent().find('.totalPrice').html());
                total_money += goods;
            }           
        // });
            $('.buyBottom .totalMoney').html('￥'+total_money + "万RMB");
        });
    }
});
}
return {
  car_min: car_min,
};
});