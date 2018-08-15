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
    var TopBarUI = (function (_super) {
        __extends(TopBarUI, _super);
        function TopBarUI(m) {
            var _this = _super.call(this, m) || this;
            _this.skinName = game.GlobalConfig.skinPath + "topBarSkin.exml";
            return _this;
        }
        TopBarUI.prototype.initSetting = function () {
            this.currentState = TopBarUI.STATE_GAMELIST;
            this.initListener();
        };
        TopBarUI.prototype.initListener = function () {
            this.registerEvent(this.returnImg, egret.TouchEvent.TOUCH_TAP, function () {
                game.NotifyManager.getInstance().sendNotify(NotifyConst.topReturn);
            }, this);
            this.registerEvent(this.settingImg, egret.TouchEvent.TOUCH_TAP, function () {
                console.log("打开设置界面");
            }, this);
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        TopBarUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.UICommand.TopBar_topState:
                    this.currentState = params;
                    break;
            }
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        TopBarUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        TopBarUI.STATE_GAMELIST = "gamelist";
        TopBarUI.STATE_ROOMLIST = "roomlist";
        TopBarUI.STATE_GAMEROOM = "gameroom";
        return TopBarUI;
    }(game.BaseUI));
    game.TopBarUI = TopBarUI;
    __reflect(TopBarUI.prototype, "game.TopBarUI");
})(game || (game = {}));
//# sourceMappingURL=TopBarUI.js.map