var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var NotifyManager = (function () {
        function NotifyManager() {
            this.ObjDic = new Object();
            this.typeDic = new Object();
        }
        NotifyManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new NotifyManager();
            }
            return this.instance;
        };
        /**
        * 注册一个对象到通知队列中，他才可以接收通知
        * @param name {string} 类名
        * @param obj {Object} 对象
        */
        NotifyManager.prototype.addRegister = function (name, obj) {
            if (this.ObjDic[name]) {
                console.log("Notify repeat register:" + name);
            }
            else {
                this.ObjDic[name] = obj;
                // 配置type字典
                this.configurationType(name, obj);
            }
        };
        /**
         * 从通知队列中移除一个对象
         * @param name {string} 类名
         */
        NotifyManager.prototype.removeRegister = function (name) {
            if (this.ObjDic[name]) {
                this.cleanType(name);
                delete this.ObjDic[name];
            }
        };
        /**
         * Mediator、Server之间指派事件
         * @param type 事件类型
         * @param body 事件数据
         * @param className 可选，如果className存在，则会派发给指定类
         */
        NotifyManager.prototype.sendNotify = function (type, body, className) {
            var _this = this;
            var n;
            this.typeDic[type] && this.typeDic[type].forEach(function (name) {
                if (!className || className === name) {
                    n = _this.ObjDic[name];
                    n && n.handleNotification(type, body);
                }
            });
        };
        /**
         * 配置type字典
         * @param name {string} 类名
         * @param obj {Object} 对象
         */
        NotifyManager.prototype.configurationType = function (name, obj) {
            var _this = this;
            var n = obj;
            n && n.listNotification().forEach(function (type) {
                if (_this.typeDic[type]) {
                    _this.typeDic[type].push(name); // 添加到末尾
                }
                else {
                    _this.typeDic[type] = [name];
                }
            });
        };
        /**
         * 清除类型
         */
        NotifyManager.prototype.cleanType = function (name) {
            var _this = this;
            var n = this.ObjDic[name];
            if (n) {
                var list = n.listNotification();
                var arr_1;
                list.forEach(function (type) {
                    arr_1 = _this.typeDic[type];
                    if (arr_1) {
                        var index = arr_1.indexOf(name);
                        if (index > -1) {
                            arr_1.splice(index, 1);
                            if (arr_1.length > 0) {
                                _this.typeDic[type] = arr_1;
                            }
                            else {
                                arr_1 = null;
                                _this.typeDic[type] = null;
                                delete _this.typeDic[type];
                            }
                        }
                    }
                });
            }
        };
        return NotifyManager;
    }());
    game.NotifyManager = NotifyManager;
    __reflect(NotifyManager.prototype, "game.NotifyManager");
})(game || (game = {}));
//# sourceMappingURL=NotifyManager.js.map