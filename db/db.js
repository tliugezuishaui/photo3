// 引入mongodb
var mongodb = require('mongodb');
// 定义连接数据库
var mongoClient = mongodb.MongoClient;

/**
 * Database 用于封装数据库 简化操作
 * @connectStr 连接字符串 ex: 'mongodb://localhost:27017'
 * @dbname 数据库名称 ex: ickt25
 * @collname 集合名称 ex: students
 */
function Database(connectStr, dbname, collname) {
	// 判断
	if (!(this instanceof Database)) {
		throw new Error('请使用new 调用 Database');
	}
	this.connectStr = connectStr;
	this.dbname = dbname;
	this.collname = collname;
}

// 插入一条数据
Database.prototype.insertOne = function(obj, callback) {
	// 备份this
	var me = this;
	// 通过数据库客户端连接数据库
	mongoClient.connect(this.connectStr, { useNewUrlParser: true }, function(err, client) {
		if (err) {
			callback(err, null);
			return;
		}

		// 如果没有问题 执行以下操作
		// 选定数据库
		var db = client.db(me.dbname);
		// 选定集合
		var coll = db.collection(me.collname);
		// 执行插入操作
		coll.insertOne(obj, function(err, result) {
			// 断开连接
			client.close();
			if (err) {
				callback(err, null);
				return;
			}
			// 没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 封装connect方法
function connect(connectStr, dbname, collname, callback) {
	mongoClient.connect(connectStr, { useNewUrlParser: true }, function(err, client) {
		if (err) {
			callback(err, null);
			return;
		}

		// 选定数据库
		var db = client.db(dbname);
		// 选定集合
		var coll = db.collection(collname);
		// 执行callback
		callback(err, coll, client);
	})
}

// 插入多条
Database.prototype.insertMany = function(arr, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.insertMany(arr, function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 删除一条数据
Database.prototype.deleteOne = function(query, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.deleteOne(query, function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 删除多条数据
Database.prototype.deleteMany = function(query, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.deleteMany(query, function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 修改一条数据
Database.prototype.updateOne = function(query, updated, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.updateOne(query, updated, function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 修改多条数据
Database.prototype.updateMany = function(query, updated, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.updateMany(query, updated, function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 查询一条数据
Database.prototype.findOne = function(query, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.findOne(query, function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}

// 查询多条数据
Database.prototype.findMany= function(query, callback) {
	// 备份this
	var me = this;
	
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		if (err) {
			callback(err, null);
			return;
		}	

		// 执行操作
		coll.find(query).toArray(function(err, result) {
			// 断开连接
			client.close();

			if (err) {
				callback(err, null);
				return;
			}

			// 如果没有问题执行callback 传递数据
			callback(null, result);
		})
	})
}


// 暴露功能
module.exports = Database;




// 实例化对象
// var db = new Database('mongodb://localhost:27017', 'user', 'students');

// 插入一条数据
// db.insertOne({name: '王老五', age: 30, sex: '男'}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// })

// 插入多条数据
// var arr = [{a: 1}, {a: 2}, {a: 3}];
// db.insertMany(arr, function(err, result) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
//  	console.log(result);
//  	console.log('插入数据成功');
// })

// 删除一条数据
// db.deleteOne({a: 1}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// 	console.log('删除数据成功');
// })

// 删除多条数据
// db.deleteMany({}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// 	console.log('删除数据成功');
// })

// 修改一条数据
// db.updateOne({}, {$set: {b: 111}}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// 	console.log('修改数据成功');
// })


// 修改多条数据
// db.updateMany({}, {$set: {b: 111}}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// 	console.log('修改数据成功');
// })

// 查询一条数据
// db.findOne({}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// 	console.log('查询数据成功');
// })

// 查询多条数据
// db.findMany({}, function(err, result) {
// 	console.log(err);
// 	console.log(result);
// 	console.log('查询数据成功');
// })