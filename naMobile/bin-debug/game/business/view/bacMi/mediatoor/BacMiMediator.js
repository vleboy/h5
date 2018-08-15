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
    var BacMiMediator = (function (_super) {
        __extends(BacMiMediator, _super);
        function BacMiMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据结构 */
        BacMiMediator.prototype.initClientData = function () {
        };
        /**初始化UI */
        BacMiMediator.prototype.initUI = function () {
            this.createUIByName(game.Mediators.Mediator_BacMi.uiName, game.Mediators.Mediator_BacMi.layer);
            game.NotifyManager.getInstance().sendNotify(NotifyConst.topState, game.TopBarUI.STATE_GAMEROOM);
        };
        /**初始化分发数据，在ui完成初始化后异步调用 */
        BacMiMediator.prototype.initData = function () {
            game.NotifyManager.getInstance().addRegister(egret.getQualifiedClassName(this), this);
        };
        /**
         * 添加需要监听的消息名
         */
        BacMiMediator.prototype.listNotification = function () {
            return [
                NotifyConst.topReturn
            ];
        };
        /**
         * 处理收到消息体
         */
        BacMiMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case NotifyConst.topReturn:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_BacMiList);
                    break;
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        BacMiMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.NotifyManager.getInstance().removeRegister(egret.getQualifiedClassName(this));
        };
        return BacMiMediator;
    }(game.BaseMediator));
    game.BacMiMediator = BacMiMediator;
    __reflect(BacMiMediator.prototype, "game.BacMiMediator", ["game.INotification"]);
})(game || (game = {}));
//# sourceMappingURL=BacMiMediator.js.map