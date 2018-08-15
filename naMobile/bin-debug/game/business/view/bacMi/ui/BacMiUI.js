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
    var BacMiUI = (function (_super) {
        __extends(BacMiUI, _super);
        function BacMiUI(m) {
            var _this = _super.call(this, m) || this;
            _this.skinName = game.GlobalConfig.skinPath + "bacMiSkin.exml";
            return _this;
        }
        /**对象创建完成后执行 */
        BacMiUI.prototype.initSetting = function () {
            console.log("mi initsetting");
            this.chiplist.setChips([1, 5, 10, 20, 50, 100, 500]);
            this.initListener();
        };
        BacMiUI.prototype.initListener = function () {
            var _this = this;
            this.registerEvent(this["roomInfoBg"], egret.TouchEvent.TOUCH_TAP, function () {
                _this["roomSmallInfoGroup"].visible = !_this["roomSmallInfoGroup"].visible;
                _this["roomAllInfoGroup"].visible = !_this["roomAllInfoGroup"].visible;
            }, this);
            this.registerEvent(this["allInfoBg"], egret.TouchEvent.TOUCH_TAP, function () {
                _this["roomSmallInfoGroup"].visible = !_this["roomSmallInfoGroup"].visible;
                _this["roomAllInfoGroup"].visible = !_this["roomAllInfoGroup"].visible;
            }, this);
            this.registerEvent(this["smallRoadGroup"], egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this["smallRoadGroup"]).to({ x: 1920 }, 300).call(function () {
                    egret.Tween.removeTweens(_this["smallRoadGroup"]);
                    _this["smallRoadGroup"].visible = false;
                    _this["bigRoadGroup"].visible = true;
                    _this["bigRoadGroup"].x = 1920;
                    egret.Tween.get(_this["bigRoadGroup"]).to({ x: 0 }, 300).call(function () {
                        egret.Tween.removeTweens(_this["bigRoadGroup"]);
                    }, _this);
                });
            }, this);
            this.registerEvent(this["bigRoadGroup"], egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this["bigRoadGroup"]).to({ x: 1920 }, 300).call(function () {
                    egret.Tween.removeTweens(_this["bigRoadGroup"]);
                    _this["bigRoadGroup"].visible = false;
                    _this["smallRoadGroup"].visible = true;
                    _this["smallRoadGroup"].x = 1920;
                    egret.Tween.get(_this["smallRoadGroup"]).to({ x: 0 }, 300).call(function () {
                        egret.Tween.removeTweens(_this["smallRoadGroup"]);
                    }, _this);
                });
            }, this);
            this.registerEvent(this["normalBtn"], egret.TouchEvent.TOUCH_TAP, function () {
                _this["normalBtn"].selected = true;
                _this["noComBtn"].selected = false;
                _this["b27Btn"].selected = false;
                _this["betArea_normal"].visible = true;
                _this["betArea_noCom"].visible = false;
                _this["betArea_b27"].visible = false;
            }, this);
            this.registerEvent(this["noComBtn"], egret.TouchEvent.TOUCH_TAP, function () {
                _this["normalBtn"].selected = false;
                _this["noComBtn"].selected = true;
                _this["b27Btn"].selected = false;
                _this["betArea_normal"].visible = false;
                _this["betArea_noCom"].visible = true;
                _this["betArea_b27"].visible = false;
            }, this);
            this.registerEvent(this["b27Btn"], egret.TouchEvent.TOUCH_TAP, function () {
                _this["normalBtn"].selected = false;
                _this["noComBtn"].selected = false;
                _this["b27Btn"].selected = true;
                _this["betArea_normal"].visible = false;
                _this["betArea_noCom"].visible = false;
                _this["betArea_b27"].visible = true;
            }, this);
        };
        /** 收到mediator的通知，每个UI要复写这个方法 * */
        BacMiUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
            }
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        BacMiUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BacMiUI;
    }(game.BaseUI));
    game.BacMiUI = BacMiUI;
    __reflect(BacMiUI.prototype, "game.BacMiUI");
})(game || (game = {}));
//# sourceMappingURL=BacMiUI.js.map