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
    var FreeTotalWin = (function (_super) {
        __extends(FreeTotalWin, _super);
        function FreeTotalWin() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            _this.skinName = game.GlobalConfig.skinPath + "freeTotalWinSkin.exml";
            return _this;
        }
        FreeTotalWin.prototype.init = function () {
        };
        FreeTotalWin.prototype.showTotalWin = function (n) {
            game.SoundPlayer.playEffect("ShenShou_243_FreeOver_mp3");
            this.visible = true;
            this.win = +n;
            this.num = 0;
            egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this })
                .to({ num: +n }, 2000)
                .call(this.stop);
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.stop, this);
        };
        FreeTotalWin.prototype.onChange = function () {
            this.winTxt.text = this.num.toFixed(2);
        };
        /**跳过缓动 */
        FreeTotalWin.prototype.stop = function () {
            var _this = this;
            egret.Tween.removeTweens(this);
            this.winTxt.text = this.win.toFixed(2);
            egret.Tween.get(this.winTxt)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                .to({ scaleX: 1, scaleY: 1 }, 300)
                .wait(2000)
                .call(function () {
                egret.Tween.removeTweens(_this.winTxt);
                _this.sendNotify(game.NotifyConst.freeComplete);
            });
        };
        return FreeTotalWin;
    }(game.BaseUI));
    game.FreeTotalWin = FreeTotalWin;
    __reflect(FreeTotalWin.prototype, "game.FreeTotalWin");
})(game || (game = {}));
//# sourceMappingURL=FreeTotalWin.js.map