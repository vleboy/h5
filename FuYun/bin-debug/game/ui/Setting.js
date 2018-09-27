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
    var Setting = (function (_super) {
        __extends(Setting, _super);
        function Setting() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "settingSkin.exml";
            return _this;
        }
        /**初始化*/
        Setting.prototype.init = function () {
            this.visible = false;
            this.bgSetting.visible = false;
            this.eventListen();
            this.btnFast.currentState = "down";
        };
        /**事件监听*/
        Setting.prototype.eventListen = function () {
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.settingClose, this);
            this.registerEvent(this.btnMusic, egret.TouchEvent.TOUCH_TAP, this.theMusic, this);
            this.registerEvent(this.btnEffect, egret.TouchEvent.TOUCH_TAP, this.theEffect, this);
            this.registerEvent(this.btnFast, egret.TouchEvent.TOUCH_TAP, this.theFast, this);
        };
        /**显示*/
        Setting.prototype.settingShow = function () {
            var _this = this;
            this.visible = true;
            this.bgSetting.visible = true;
            this.defaultUI(true);
            egret.Tween.get(this.groupSetting)
                .to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 250)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 50)
                .call(function () {
                egret.Tween.removeTweens(_this.groupSetting);
                game.SoundPlayer.playEffect("FuYun_243_GUI_Generic1_mp3");
            });
        };
        /**关闭*/
        Setting.prototype.settingClose = function () {
            var _this = this;
            this.bgSetting.visible = false;
            egret.Tween.get(this.groupSetting)
                .to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 50)
                .to({ scaleX: 0.3, scaleY: 0.3, alpha: 0 }, 250)
                .call(function () {
                _this.defaultUI(false);
                _this.visible = false;
                egret.Tween.removeTweens(_this.groupSetting);
                game.SoundPlayer.playEffect("FuYun_243_GUI_Generic2_mp3");
            });
        };
        /**默认显示*/
        Setting.prototype.defaultUI = function (isShow) {
            this.groupSetting.scaleX = isShow ? 0.3 : 1;
            this.groupSetting.scaleY = isShow ? 0.3 : 1;
            this.groupSetting.alpha = isShow ? 0 : 1;
        };
        /**默认音乐音效开启*/
        Setting.prototype.defaultOpen = function () {
            game.SoundPlayer.closeMusic(false);
            game.SoundPlayer.closeEffect(false);
            this.sendNotify(game.NotifyConst.updateBgm);
        };
        /**音乐*/
        Setting.prototype.theMusic = function (e) {
            var isOpen = e.target.currentState == "up";
            game.SoundPlayer.closeMusic(!isOpen);
            this.sendNotify(game.NotifyConst.updateBgm);
            game.SoundPlayer.playEffect("FuYun_243_GUI_Generic1_mp3");
        };
        /**音效*/
        Setting.prototype.theEffect = function (e) {
            var isOpen = e.target.currentState == "up";
            game.SoundPlayer.closeEffect(!isOpen);
            game.SoundPlayer.playEffect("FuYun_243_GUI_Generic1_mp3");
        };
        /**快速模式*/
        Setting.prototype.theFast = function (e) {
            this.btnFast.currentState = (e.target.currentState == "up") ? "down" : "up";
            game.GlobalConfig.fastSwitch = (this.btnFast.currentState == "up");
            game.SoundPlayer.playEffect("FuYun_243_GUI_Generic1_mp3");
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        Setting.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return Setting;
    }(game.BaseUI));
    game.Setting = Setting;
    __reflect(Setting.prototype, "game.Setting");
})(game || (game = {}));
//# sourceMappingURL=Setting.js.map