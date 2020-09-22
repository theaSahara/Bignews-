$(function() {
    // 1.
    // 实现登录页面与注册页面的切换
    // 点击"去注册账号"时，显示注册页面
    $(".login .myForm a").on("click", function() {
        $('.login').hide().next().show()
            // console.log("hua");

    })
    $(".register .myForm a").on("click", function() {
            $(".register").hide().prev().show();
        })
        // 2. 实现验证功能
        // 就相当于是我们引入了jquery.js文件之后，就可以直接 使用$对象
        // 现在我们引入了layui.all.js之后，就可以直接 使用暴露给我们的layui
    var form = layui.form
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            // if (/^\d+\d+\d$/.test(value)) {
            //     return '用户名不能全为数字';
            // }
        },
        // 重新定义一个两次密码是否一样的规则
        repass: function(value, item) {
            // value: 是获取到的确认密码框中的值
            // item： 就是确认密码框这个标签对象
            var passVal = $(".register .myForm input([name=password])").val();
            if (passVal != value) {
                return "两次输入的密码不一致，请确认后再输入"
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]

    });


    // 实现注册功能
    // 给form表单注册submit事件
    // submit事件只能给form标签注册，其它标签无效
    // 给form标签注册了submit事件之后，只有两种情况才能触发这个事件
    // 一般有两种情况会自动提交
    //  1.form 的 input框 type="submit"
    // 2.form 中有button
})
$(".register .myForm").on("click", function(e) {
    e.preventDefault() //阻止表单默认提交行为 
        // 发送ajax情请求
    $.ajax({
        type: "post",
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: $(this).serialize(),
        success: function(info) {
            if (info.status === 0) {
                $('.login').show().next().hide()
            } else {
                layer.open({
                    title: "温馨提示",
                    conten: info.message,
                    time: 2000
                });
            }
        }
    })
})