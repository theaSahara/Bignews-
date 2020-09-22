$(function() {
    // 实现登录页面与注册页面的切换
    // 点击"去注册账号"时，显示注册页面
    $(".login a").on("click", function() {
        // $('.login').hide().next().show()
        // console.log("hua");
        $(".register").show().prev().hide();
    })
    $(".register").on("click", function() {
        $(".register").hide().prev().show();
    })

})