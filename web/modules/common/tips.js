//该模块是用来监听模态框事件的
define(function(require, exports, module) {
    //引入工具模块
    var tools = require('../tools/tools.js');

    //引入observer观察观察者模式，用于跨模块传递信息
    var Observer = tools.Observer;

    //获取模态框元素
    var $myModal = $('#myModal');
    var $myModalHtml = $('#myModalHtml');

    //监听消息
    Observer.on('msg', function(data) {
        $myModal.modal();
        $myModalHtml.html(data);
    })
})