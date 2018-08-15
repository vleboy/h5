var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var BaseMediator = (function () {
        function BaseMediator() {
        }
        /**启用这个Mediator */
        BaseMediator.prototype.start = function (data) {
            if (data === void 0) { data = null; }
            this.isStart = true;
            this.data = data;
            this.initClientData();
            this.initUI();
        };
        /**初始化 当前皮肤类型界面*/
        BaseMediator.prototype.createUIByName = function (name, layer) {
            this.ui = eval("new game." + name + "(this)");
            game.UIManager.openUI(this.ui, layer);
        };
        /**通知UI做显示 */
        BaseMediator.prototype.notifyUI = function (type, params) {
            if (params === void 0) { params = null; }
            if (this.ui) {
                this.ui.onMediatorCommand(type, params);
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        BaseMediator.prototype.dispose = function () {
            this.isStart = false;
            this.ui.dispose();
            this.ui = null;
        };
        return BaseMediator;
    }());
    game.BaseMediator = BaseMediator;
    __reflect(BaseMediator.prototype, "game.BaseMediator");
})(game || (game = {}));
//# sourceMappingURL=BaseMediator.js.map