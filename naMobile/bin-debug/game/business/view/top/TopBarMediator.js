var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var TopBarMediator = (function (_super) {
        __extends(TopBarMediator, _super);
        function TopBarMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据结构 */
        TopBarMediator.prototype.initClientData = function () {
        };
        /**初始化UI */
        TopBarMediator.prototype.initUI = function () {
            this.createUIByName(game.Mediators.Mediator_TopBar.uiName, game.Mediators.Mediator_TopBar.layer);
        };
        /**初始化分发数据，在ui完成初始化后异步调用 */
        TopBarMediator.prototype.initData = function () {
            game.NotifyManager.getInstance().addRegister(egret.getQualifiedClassName(this), this);
        };
        /**
         * 添加需要监听的消息名
         */
        TopBarMediator.prototype.listNotification = function () {
            return [
                NotifyConst.topState
            ];
        };
        /**
         * 处理收到消息体
         */
        TopBarMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case NotifyConst.topState:
                    this.notifyUI(game.UICommand.TopBar_topState, body);
                    break;
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        TopBarMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.NotifyManager.getInstance().removeRegister(egret.getQualifiedClassName(this));
        };
        return TopBarMediator;
    }(game.BaseMediator));
    game.TopBarMediator = TopBarMediator;
    __reflect(TopBarMediator.prototype, "game.TopBarMediator", ["game.INotification"]);
})(game || (game = {}));
//# sourceMappingURL=TopBarMediator.js.map