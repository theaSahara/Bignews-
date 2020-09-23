$(function() {
    // 1. 发送ajax请求获取真正的用户名和头像链接
    // 1.1 直接发送ajax请求
    $.ajax({
        type: "get",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: window.localStorage.getItem("token")
        // }, //统一设置了
        success: function(info) {
            if (info.status == 0) {
                // 欢迎语名字要换掉
                console.log(info);

                $(".userInfo .welcome").html(`欢迎&nbsp;&nbsp;${info.data.username}`)
            };
            // 是要显示头像图片还是显示字母头像要进行判断    
            if (info.data.user_pic) {
                // 如果有：欢迎语和头部头像换成用户的
                $(".userInfo .layui-nav-img").show().attr("src", info.data.user_pic) // 
                $(".layui-header .layui-nav-img").show().attr("src", inf.data.user_pic)
                    // 默认的隐藏
                $(".userInfo .text-avatar,.layui-header .text-avatar").hide();
            } else {
                // 第一次登陆成功的时候 user_pic是一个null
                // 欢迎语中
                $(".userInfo .text-avatar").text(info.data.username.slice(0, 1));
                // 头部导航中
                $(".layui-header .text-avatar").text(info.data.username.slice(0, 1))
            }
        }
    })

    // 给退出按钮添加事件。 退出到登入页面

    $(".layui-header .logout").on("click", function() {
        // console.log("hua");
        layer.confirm('真的要删除吗?', function(index) {
            //do something  

            // 删除本地存储
            window.localStorage.removeItem("token")
                // 关闭弹出层
            layer.close(index);
            // 跳转到登录页面
            window.location.href = "../../login.html";
        });


    })


})