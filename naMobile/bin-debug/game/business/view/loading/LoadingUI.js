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
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "loadingSkin.exml";
            return _this;
        }
        LoadingUI.prototype.initSetting = function () {
        };
        LoadingUI.prototype.initData = function () {
            this.reset();
        };
        LoadingUI.prototype.reset = function () {
            this.progressTxt.text = "Loading...0%";
            this.progressBar.percentWidth = 0;
        };
        LoadingUI.getInstance = function () {
            !this._instance && (this._instance = new LoadingUI());
            return this._instance;
        };
        LoadingUI.prototype.onProgress = function (current, total) {
            this.progressTxt.text = "Loading..." + Math.floor(current / total * 100) + "%";
            this.progressBar.percentWidth = Math.floor(current / total * 100);
        };
        LoadingUI.prototype.show = function (b) {
            this.visible = b;
            if (b) {
                this.reset();
            }
        };
        return LoadingUI;
    }(game.BaseUI));
    game.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "game.LoadingUI");
})(game || (game = {}));
//# sourceMappingURL=LoadingUI.js.map