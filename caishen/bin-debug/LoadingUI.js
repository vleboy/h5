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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        return _super.call(this) || this;
    }
    LoadingUI.prototype.createView = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loader = new egret.URLLoader();
            //设置加载方式为纹理
            loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            loader.once(egret.Event.COMPLETE, function (e) {
                var bg = new eui.Image(e.target.data);
                bg.percentWidth = 100;
                bg.percentHeight = 100;
                _this.addChild(bg);
                _this.progressTxt = new eui.Label();
                _this.progressTxt.horizontalCenter = 0;
                _this.progressTxt.bottom = 150;
                _this.addChild(_this.progressTxt);
                var rect = new eui.Rect();
                rect.width = 100;
                rect.height = 20;
                rect.bottom = 100;
                rect.fillColor = 0xe56e6e;
                _this.addChild(rect);
                _this.progressBar = new eui.Rect();
                _this.progressBar.fillColor = 0xfc0000;
                _this.progressBar.height = 20;
                _this.progressBar.bottom = 100;
                _this.addChild(_this.progressBar);
                resolve();
            }, _this);
            loader.load(new egret.URLRequest("resource/res/loading.jpg"));
        });
    };
    LoadingUI.prototype.reset = function () {
        this.progressTxt.text = "Loading...0%";
        this.progressBar.percentWidth = 0;
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
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map