// 引入express
var express = require('express');
// 引入body-parser
var body_parser = require('body-parser');
// 创建应用程序
var app = express();
// 静态化web目录
app.use('/web/', express.static('./web'));
// 配置body_parser
app.use(body_parser.urlencoded({ extended: false }));
// 引入router路由对象
var router = require('./server/router.js');

//处理index.html
app.get('/index.html', function(req, res) {
    res.redirect('/');
})

//处理 /
app.get('/', function(req, res) {
    //返回登录页面
    res.sendFile(__dirname + '/web/html/login.html');
})

// 挂载router
app.use(router);

// 监听端口号
app.listen(3000);
