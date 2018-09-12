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
    var ErrTip = (function (_super) {
        __extends(ErrTip, _super);
        function ErrTip(txt, sureBack, thisObject) {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "errSkin.exml";
            _this.errTxt.text = txt;
            _this.visible = true;
            _this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.parent)
                    _this.parent.removeChild(_this);
                sureBack && sureBack.call(thisObject);
                _this.visible = false;
                _this.parent.removeChild(_this);
            }, _this);
            return _this;
        }
        return ErrTip;
    }(eui.Component));
    game.ErrTip = ErrTip;
    __reflect(ErrTip.prototype, "game.ErrTip");
})(game || (game = {}));
//# sourceMappingURL=ErrTip.js.map