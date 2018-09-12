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
    var ConnectTip = (function (_super) {
        __extends(ConnectTip, _super);
        function ConnectTip() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "connectTipSkin.exml";
            return _this;
        }
        ConnectTip.prototype.init = function () { };
        ConnectTip.prototype.show = function (isShow) {
            this.visible = isShow;
            isShow ? egret.Tween.get(this["circle"], { loop: true }).to({ rotation: 360 }, 1000, egret.Ease.circInOut) : egret.Tween.removeTweens(this["circle"]);
        };
        return ConnectTip;
    }(game.BaseUI));
    game.ConnectTip = ConnectTip;
    __reflect(ConnectTip.prototype, "game.ConnectTip");
})(game || (game = {}));
//# sourceMappingURL=ConnectTip.js.map