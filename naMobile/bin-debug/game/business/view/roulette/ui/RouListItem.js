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
    var RouListItem = (function (_super) {
        __extends(RouListItem, _super);
        function RouListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "rouListItemSkin.exml";
            return _this;
        }
        /**添加item时执行*/
        RouListItem.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        /**数据变化时执行*/
        RouListItem.prototype.dataChanged = function () {
        };
        /**点击打开Roulette*/
        RouListItem.prototype.onTouch = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_Rou, "gameidxxx");
        };
        /**移除item时执行*/
        RouListItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        return RouListItem;
    }(game.AItemRenderer));
    game.RouListItem = RouListItem;
    __reflect(RouListItem.prototype, "game.RouListItem");
})(game || (game = {}));
//# sourceMappingURL=RouListItem.js.map