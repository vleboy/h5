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
    var TopBar = (function (_super) {
        __extends(TopBar, _super);
        function TopBar() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "topBarSkin.exml";
            return _this;
        }
        /**初始化*/
        TopBar.prototype.init = function () {
            this.eventListen();
        };
        /**事件监听*/
        TopBar.prototype.eventListen = function () {
            var _this = this;
            this.registerEvent(this.setBtn, egret.TouchEvent.TOUCH_TAP, function () { _this.sendNotify(game.NotifyConst.openSetting); }, this);
        };
        TopBar.prototype.setUser = function (name) {
            this.userName.text = name;
        };
        TopBar.prototype.setBalance = function (money, win) {
            if (win) {
                this.winNum = +money - win;
                this.payOut(+money);
            }
            else {
                this.userMoney.text = money;
            }
        };
        /**派彩*/
        TopBar.prototype.payOut = function (mon) {
            var _this = this;
            egret.Tween.get(this, { onChange: function () { _this.userMoney.text = _this.winNum.toFixed(2); }, onChangeObj: this })
                .to({ winNum: mon }, 800)
                .call(function () { return egret.Tween.removeTweens(_this); });
            egret.Tween.get(this.userMoney)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 400)
                .to({ scaleX: 1, scaleY: 1 }, 400)
                .call(function () { return egret.Tween.removeTweens(_this.userMoney); });
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        TopBar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return TopBar;
    }(game.BaseUI));
    game.TopBar = TopBar;
    __reflect(TopBar.prototype, "game.TopBar");
})(game || (game = {}));
//# sourceMappingURL=TopBar.js.map