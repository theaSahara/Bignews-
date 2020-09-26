$(function() {
    // 1. 发送ajax请求获取真正的用户名和头像链接
    // 1.1 直接发送ajax请求
    //   封装成函数给后面页面也能用
    function getUerInfo() {
        $.ajax({
            type: "get",
            url: '/my/userinfo',
            // headers: {
            //     Authorization: window.localStorage.getItem("token")
            // }, //统一设置了
            success: function(info) {
                // 当状态为0 时才会有一下，所以别把内容放错位置
                if (info.status == 0) {
                    // 欢迎语名字要换掉
                    console.log(info);

                    $(".userInfo .welcome").html(`欢迎&nbsp;&nbsp;${info.data.username}`)

                    // 是要显示头像图片还是显示字母头像要进行判断
                    // console.log(info.data.user_pic);
                    if (info.data.user_pic) {
                        //         // 如果有：欢迎语和头部头像换成用户的
                        $(".userInfo .layui-nav-img").show().attr("src", info.data.user_pic) // 
                        $(".layui-header .layui-nav-img").show().attr("src", info.data.user_pic)
                            //             // 默认的隐藏
                        $(".userInfo .text-avatar,.layui-header .text-avatar").hide();
                    } else {
                        //         // 第一次登陆成功的时候 user_pic是一个null
                        //         // 欢迎语d
                        $(".userInfo .text-avatar").text(info.data.username.slice(0, 1));
                        //         // 头部导航de 
                        $(".layui-header .text-avatar").text(info.data.username.slice(0, 1))
                    }
                }
            }

        })


    }
    // 给退出按钮添加事件。 退出到登入页面
    $(".layui-header .logout").on("click", function() {
        // console.log("hua");
        layer.confirm('真的要退出吗?', function(index) {
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