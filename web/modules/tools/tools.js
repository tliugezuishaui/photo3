define(function(require, exports, module) {
	// 定义方法
	function format(tpl, dic) {
		return tpl.replace(/<%(\w+(\.\w+)*)%>/g, function(match, $1) {
			// 将$1分割为数组
			var pathArr = $1.split('.');
			// 备份字典
			var result = dic;
			// 遍历数组
			for (var i = 0; i < pathArr.length - 1; i++) {
				// 指向下一层
				result = result[pathArr[i]];
			}
			// 返回内容
			return result[pathArr[i]];
		})
	}


	// 观察者模式
	var Observer = (function() {
		// 定义存储对象
		var ob = {};
		return {
			// 用于存储对象中添加数据
			on(name, fn) {
				// 判断name是否存在
				if (ob[name] instanceof Array) {
					ob[name].push(fn);
				} else {
					// 说明不是数组 变为数组
					ob[name] = [fn];
				}
 			},
			// 用于执行存储对象中的方法
			trigger(name) {
				// 获取剩余参数
				var arg = Array.prototype.slice.call(arguments, 1);
				// 循环执行每一项
				for (var i = 0; i < ob[name].length; i++) {
					ob[name][i].apply(ob, arg);
				}
			}
		} 
	})()


	// 实现策略模式
	var Strategy = (function() {
		// 定义存储对象
		var _S = {
			username(str) {
				// 定义正则表达式
				var reg = /^[a-zA-Z]\w{6,10}$/;
				// 验证并返回内容
				return reg.test(str) ? '' : '请输入以字母开头的6~10位字符';
			},
			password(str) {
				// 定义正则表达式
				var reg = /^\d{6,8}$/;
				// 验证并返回内容
				return reg.test(str) ? '' : '请输入以数字开头的6~8位字符';
			}
		};

		return {
			use(name, str) {
				return _S[name](str);
			}
		}
	})()


	

	// 暴露功能
	module.exports.format = format;
	// 暴露Observer
	module.exports.Observer = Observer;
	// 暴露Strategy
	module.exports.Strategy = Strategy;
})