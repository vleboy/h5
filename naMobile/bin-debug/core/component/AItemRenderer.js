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
    var AItemRenderer = (function (_super) {
        __extends(AItemRenderer, _super);
        function AItemRenderer() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        AItemRenderer.prototype.onAdd = function () {
        };
        AItemRenderer.prototype.dataChanged = function () {
        };
        AItemRenderer.prototype.onRemove = function () {
        };
        return AItemRenderer;
    }(eui.ItemRenderer));
    game.AItemRenderer = AItemRenderer;
    __reflect(AItemRenderer.prototype, "game.AItemRenderer");
})(game || (game = {}));
//# sourceMappingURL=AItemRenderer.js.map