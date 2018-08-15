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
    var GameListMediator = (function (_super) {
        __extends(GameListMediator, _super);
        function GameListMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据结构 */
        GameListMediator.prototype.initClientData = function () {
        };
        /**初始化UI */
        GameListMediator.prototype.initUI = function () {
            this.createUIByName(game.Mediators.Mediator_GameList.uiName, game.Mediators.Mediator_GameList.layer);
        };
        /**初始化分发数据，在ui完成初始化后异步调用 */
        GameListMediator.prototype.initData = function () {
            game.NotifyManager.getInstance().sendNotify(NotifyConst.topState, game.TopBarUI.STATE_GAMELIST);
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        GameListMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return GameListMediator;
    }(game.BaseMediator));
    game.GameListMediator = GameListMediator;
    __reflect(GameListMediator.prototype, "game.GameListMediator");
})(game || (game = {}));
//# sourceMappingURL=GameListMediator.js.map