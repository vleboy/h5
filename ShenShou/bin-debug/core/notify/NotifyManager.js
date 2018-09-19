var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var NotifyManager = (function () {
        function NotifyManager() {
            this.pool = {};
        }
        NotifyManager.getInstance = function () {
            return this._instance ? this._instance : (this._instance = new NotifyManager());
        };
        /**给这个对象注册通知 */
        NotifyManager.prototype.addRegister = function (obj, keys) {
            var _this = this;
            if (keys && keys.length > 0) {
                keys.forEach(function (key) {
                    if (!_this.pool[key])
                        _this.pool[key] = [];
                    if (_this.pool[key].indexOf(obj) < 0)
                        _this.pool[key].push(obj);
                });
            }
        };
        NotifyManager.prototype.sendNotify = function (key, body) {
            var objs = this.pool[key];
            objs && objs.forEach(function (obj) {
                obj.handleNotify(key, body);
            });
        };
        NotifyManager.prototype.removeRegister = function (obj) {
            var _this = this;
            this.pool.keys.forEach(function (key) {
                var index = _this.pool[key].indexOf(obj);
                index > -1 && _this.pool[key].splice(index, 1);
                _this.pool[key].length == 0 && delete _this.pool[key];
            });
        };
        return NotifyManager;
    }());
    game.NotifyManager = NotifyManager;
    __reflect(NotifyManager.prototype, "game.NotifyManager");
})(game || (game = {}));
//# sourceMappingURL=NotifyManager.js.map