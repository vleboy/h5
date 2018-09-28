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
    /**按下时缩小的按钮 这个按钮最好用horizontalCenter和verticalCenter来定位,或者是scale的锚点居中*/
    var SmallButton = (function (_super) {
        __extends(SmallButton, _super);
        function SmallButton() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.buttonReleased, _this);
            }, _this);
            return _this;
        }
        SmallButton.prototype.onTouchBegin = function (event) {
            _super.prototype.onTouchBegin.call(this, event);
            this.scaleX = this.scaleY = 0.9;
        };
        SmallButton.prototype.buttonReleased = function () {
            _super.prototype.buttonReleased.call(this);
            this.scaleX = this.scaleY = 1;
        };
        SmallButton.prototype.onTouchCancle = function (event) {
            _super.prototype.onTouchCancle.call(this, event);
            this.scaleX = this.scaleY = 1;
        };
        return SmallButton;
    }(eui.Button));
    game.SmallButton = SmallButton;
    __reflect(SmallButton.prototype, "game.SmallButton");
})(game || (game = {}));
