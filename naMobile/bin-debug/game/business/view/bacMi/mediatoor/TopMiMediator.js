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
    var TopMiMediator = (function (_super) {
        __extends(TopMiMediator, _super);
        function TopMiMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据结构 */
        TopMiMediator.prototype.initClientData = function () {
        };
        /**初始化UI */
        TopMiMediator.prototype.initUI = function () {
            this.createUIByName(game.Mediators.Mediator_TopMi.uiName, game.Mediators.Mediator_TopMi.layer);
        };
        /**初始化分发数据，在ui完成初始化后异步调用 */
        TopMiMediator.prototype.initData = function () {
            game.NotifyManager.getInstance().addRegister(egret.getQualifiedClassName(this), this);
        };
        /**
         * 添加需要监听的消息名
         */
        TopMiMediator.prototype.listNotification = function () {
            return [
                NotifyConst.topReturn
            ];
        };
        /**
         * 处理收到消息体
         */
        TopMiMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        TopMiMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.NotifyManager.getInstance().removeRegister(egret.getQualifiedClassName(this));
        };
        return TopMiMediator;
    }(game.BaseMediator));
    game.TopMiMediator = TopMiMediator;
    __reflect(TopMiMediator.prototype, "game.TopMiMediator");
})(game || (game = {}));
//# sourceMappingURL=TopMiMediator.js.map