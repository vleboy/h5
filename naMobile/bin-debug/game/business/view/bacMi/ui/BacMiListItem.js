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
    var BacMiListItem = (function (_super) {
        __extends(BacMiListItem, _super);
        function BacMiListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "bacMiListItemSkin.exml";
            return _this;
        }
        BacMiListItem.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        BacMiListItem.prototype.onTap = function () {
            // console.log("点击item"+ this.itemIndex);
            game.MediatorManager.openMediator(game.Mediators.Mediator_BacMi, "gameidxxx");
        };
        BacMiListItem.prototype.dataChanged = function () {
        };
        BacMiListItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        return BacMiListItem;
    }(game.AItemRenderer));
    game.BacMiListItem = BacMiListItem;
    __reflect(BacMiListItem.prototype, "game.BacMiListItem");
})(game || (game = {}));
//# sourceMappingURL=BacMiListItem.js.map