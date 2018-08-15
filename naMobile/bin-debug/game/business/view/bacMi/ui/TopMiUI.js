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
    var TopMiUI = (function (_super) {
        __extends(TopMiUI, _super);
        function TopMiUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "topMiSkin.exml";
            return _this;
        }
        TopMiUI.prototype.initSetting = function () {
            console.log(this.card1);
        };
        /** 收到mediator的通知，每个UI要复写这个方法 * */
        TopMiUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        TopMiUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TopMiUI;
    }(game.BaseUI));
    game.TopMiUI = TopMiUI;
    __reflect(TopMiUI.prototype, "game.TopMiUI");
})(game || (game = {}));
//# sourceMappingURL=TopMiUI.js.map