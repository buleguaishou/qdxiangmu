define(["jquery", "jquery-cookie","bootstrap"], function ($) {
    function history_min() {
        $(function () {
            sc_num();
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
                    console.log(sum);
                }
            }
        });
    }
    return {
        history_min: history_min,
    };
  });
  