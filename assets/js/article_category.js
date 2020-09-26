$(function() {
    // 获取文章分类 立即发送ajax请求 渲染页面 。后面估计用得上，所以封装
    renderTable();

    function renderTable() {
        $.ajax({
            type: "get",
            url: '/my/article/cates',
            success: function(info) {
                console.log(info); //含有后台数据，是数组data
                if (info.status === 0) {
                    var html = template("categoryList", info)
                    $("tbody").html(html)
                }
            }
        })
    }

    //2. 弹出添加数据的弹出层
    // 2.1添加按钮注册点击事件
    $(".layui-card-header .btn-add").on("click", function() {
        console.log("hua");
        window.index = layer.open({
            type: 1, // 去掉右下角的确定按钮
            title: "添加文章分类", // 添加弹出层的标题
            area: "520px", //设置弹出层的宽高
            content: $("#addCteTmp").html()
                // content: '<form>用户名: <input type="text"><br/>密码: <input type="text"></form>'
                //这里也可以直接把form表单塞进来，用 `form表单` 但内容太多，所以选择用scrip标签做成模板引擎方式，加上type属性即不直接被HTML渲染有不被当成js内容解析
        })
    })

    // 表单校验
    // layui内置方法
    var form = layui.form
    form.verify({
        catagoryList: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return "用户名不能有特殊字符"
            }
            if (/(^\_)|(\_)|(\_+$)/.test(value)) {
                return "用户名首尾不能出现下划线\'_\'"
            }
            if (/^\d+\d+\d$/.test(value)) {
                return "用户名不能全为数字"
            }

        }
    })


    // 4.添加文章分类
    // 4.1 要是用事件委托 因为form表单不是直接在html中是动态创建的
    $("body").on("submit", ".addForm", function(e) {
        console.log("huan");
        // 阻止表单自行提交行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(info) {
                console.log(info);
                if (info.status === 0) {
                    //     //手动 关闭弹出层，因为它自带的button按钮被删除，要获得当前
                    //     // 弹出层通过索引index拿， 但该出在按钮， 拿不到演出层索引， 到上面跳出弹出层是用变量接收在拿过来用 把他给window  上面的window。index
                    layer.close(window.index)
                        //         // 重新渲染页面
                    renderTable(); // 上面将其封装了，调用就行
                }
            }
        })

    })


    // 删除操作
    // 动态创建的，所以事件委托
    $("tbody").on("click", ".btn-del", function() {
        // // 获取当前的id
        var id = $(this).attr("data-Id")
            // iq封装了data方法：
            // var id = $(this).data("id") ///用data()方法来获取标签中的自定义属性存储的数据
            // 弹出层
        layer.confirm('温馨提示', { icon: 3, title: '提示' }, function(index) {
            //do something 
            // ajax请求 带上id在地址后面
            $.ajax({
                type: "get",
                url: '/my/article/deletecate/' + id,
                success: function(info) {
                    if (info.status === 0) {
                        layer.close(index)
                            //删除成功之后重新渲染页面、
                        renderTable();
                    }
                }
            })
        })

    })

})