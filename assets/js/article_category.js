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
    $(".layui-card-header add-btn").on("click", function() {
        window.addIndex = layer.open({
            type: 1,
            totle: "添加文章分类",
            area: ""
        })
    })


})