$(function() {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2. 获取选中的上传图片
    // 2.1 给上传按钮注册事件 
    $('.btn-upload').on('click', function() {
        // 2.2 让真正的上传文件的按钮弹出窗口
        $('#avatar').click()
    })

    // 3. 实现图片本地预览功能
    // 3.1 给input标签注册chage事件
    $('#avatar').on('change', function() {
        console.dir(this);
        // 3.2 获取待上传的图片文件
        var file = this.files[0]
            // 3.3 生成图片链接
        var imgUrl = URL.createObjectURL(file)
            // 3.4 实现本地预览功能
            // $image.attr('src', imgUrl)

        // 3.5 更新裁切区域图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    // 4. 上传头像
    // 4.1 给确定按钮注册事件
    $('.btn-sure').on('click', function() {
        // 4.2 获取待上传图片的base64格式的字符串数据
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 4.3 发送ajax请示 
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                // 4.4 图片上传成功这要更新页面
                if (res.status == 0) {
                    // parent是父亲的意思 此处表示父页面index
                    window.parent.getUserInfo(); // getUserInfo()是父页面index中的函数
                }
            }
        })
    })





})