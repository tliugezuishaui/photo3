define(function(require, exports, module) {
    //引入工具模块
    var tools = require('../tools/tools');
    //引入tips
    require('../common/tips');
    //引入Strategy
    var Strategy = tools.Strategy;
    //引入Observer
    var Observer = tools.Observer;


    //获取元素
    var $username = $('#username');
    var $password = $('#password');
    var $rePassword = $('#rePassword');
    var $btn = $('#btn');

    //定义锁
    var username_lock = null;
    var password_lock = null;

    //验证用户名
    $username.blur(function() {
        //获取用户输入的内容
        var val = $(this).val();

        //使用策略模式
        var result = Strategy.use('username', val);
        //判断用户输入的内容
        if (result) {
            //如果出错了，告诉另一个模块要执行事件了
            Observer.trigger('msg', result);
            //关闭锁
            username_lock = false;
            return;
        }

        //关闭锁
        username_lock = false;
        //没有问题就发送ajax请求到数据库中去验证
        // console.log('发送ajax请求')

        $.ajax({
            url: '/checkName',
            data: {
                username: val
            },
            type: 'get',
            dataType: 'json',
            success(data) {
                Observer.trigger('msg', data.data);
                if (!data.error) {
                    return;
                }
            }
        })
    })

    //验证用户输入的密码
    $password.blur(function() {
        //获取用户输入的内容
        var val = $(this).val();

        //利用策略模式判断用户输入的密码规范
        var result = Strategy.use('password', val);

        //比对之后进行判断
        if (result) {
            //如果密码框有输入内容，但是输入的内容不符合规定，反馈给前端
            Observer.trigger('msg', result);
            //关闭锁
            password_lock = false;
            return;
        }
        //开锁
        password_lock = true;
    })

    //确认密码
    $rePassword.blur(function() {
        //获取用户输入的内容
        var val = $(this).val();

        //获取password中的内容
        var value = $password.val();

        //两次密码进行对比判断
        if (val === value) {
            //说明两次输入的密码都是相同的
            //开锁
            password_lock = true;
            return;
        }
        //执行到下面说明两次密码输入不一致 反馈信息到页面
        Observer.trigger('msg', '您两次输入的密码不一致，请重新输入');
        //关闭锁
        password_lock = false;
    })

    //注册逻辑
    $btn.click(function() {
        //判断输入的用户名和密码是否都正确
        if (!(username_lock && password_lock)) {
            //提示用户输入不正确
            Observer.trigger('msg', '您输入的用户名或者密码不正确，请重新输入')
            return;
        }
        console.log('点击注册执行下一步')
    })
})