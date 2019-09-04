// 引入express
var express = require('express');
// 创建路由对象
var router = express.Router();
//引入db数据库
var Database = require('../db/db.js');
// console.log(Database);
//定义连接字符串
var connectStr = 'mongodb://localhost:27017';
//定义数据库
var dbname = 'ickt26';
//定义集合名称
var collname = 'user';

// 处理各种请求
router.get('/checkName', function(req, res) {
	// console.log('检测用户名');

	//获取用户提交过来的用户名
	var username = req.query.username;
	
	//实例化Database
	var db = new Database(connectStr, dbname, collname);

	//在数据库中查找用户输入的数据进行匹配
	db.findOne({username: username}, function(err, result) {
		if (err) {
			//返回内容给前端
			res.send({
				error: 1,
				data: '查找数据库失败'
			})
			return;
		}
		if (result) {
			//说明用户提交的数据在数据库中已经存在
			res.send({
				error: 2,
				data: '该用户名已注册过了'
			})
			return;
		}
		//执行到这，说明没有问题，可以注册
		res.send({
			error: 0,
			data: '恭喜您，该用户名可以注册'
		})
	})
})

// 暴露接口
module.exports = router;
