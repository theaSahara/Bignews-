$(function() {


    function render() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(info) {
                console.log(info);
                console.log("hua");
                if (info.status === 0) {
                    //给表单赋值 
                    // 需要注意的是：为了赋值成功，必须保证input标签的name值和res.data中的属性名一致 
                    // layui 方法 
                    // $('.myForm input[name=username]').val(info.data.username)
                    // $('.myForm input[name=nickname]').val(info.data.nickname)
                    // $('.myForm input[name=email]').val(info.data.email)
                    var form = layui.form;
                    console.log(form.val("myForm", info.data)); //表单中加上lay-filter="myForm"
                    // console.log(info.data);
                }
            }

        })
    }
    render();

    // 提交表单数据
    $(".myForm").on("submit", function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 请求
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(info) {
                layer.msg(info.message)
            }
        })
    })
})