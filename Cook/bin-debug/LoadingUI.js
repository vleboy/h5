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
        var urlArr = [
            { url: "resource/img/load/loading.jpg", texture: null },
            { url: "resource/img/load/bar2.png", texture: null },
            { url: "resource/img/load/bar1.png", texture: null },
            { url: "resource/img/load/light.png", texture: null }
        ];
        var promiseArr = [];
        urlArr.forEach(function (v) {
            promiseArr.push(new Promise(function (resolve, reject) {
                var loadImg = new egret.ImageLoader();
                loadImg.once(egret.Event.COMPLETE, function (e) {
                    var texture = new egret.Texture;
                    texture.bitmapData = e.target.data;
                    v.texture = texture;
                    resolve();
                }, _this);
                loadImg.load(v.url);
            }));
        });
        var createImg = function (texture, parent, hor, ver, w, h) {
            var img = new eui.Image(texture);
            parent.addChild(img);
            img.horizontalCenter = hor;
            img.verticalCenter = ver;
            w && (img.width = w);
            w && (img.height = h);
            return img;
        };
        return Promise.all(promiseArr).then(function () {
            createImg(urlArr[0].texture, _this, 0, 0);
            createImg(urlArr[1].texture, _this, 0, 325);
            _this.addChild(_this.group = new eui.Group());
            _this.group.left = -534;
            _this.group.bottom = 205;
            _this.group.width = 996;
            _this.group.height = 20;
            createImg(urlArr[2].texture, _this.group, 0, 0);
            createImg(urlArr[3].texture, _this.group, 423, 0);
            var img = createImg(urlArr[1].texture, _this, 0, 325, 996, 20);
            _this.addChild(img);
            _this.group.mask = img;
            ///label
            _this.progressTxt = new eui.Label();
            _this.progressTxt.horizontalCenter = 0;
            _this.progressTxt.verticalCenter = 277;
            _this.progressTxt.width = 200;
            _this.progressTxt.text = "Loading...";
            _this.progressTxt.textColor = 0xa59153;
            _this.progressTxt.verticalAlign = "middle";
            _this.progressTxt.size = 45;
            _this.addChild(_this.progressTxt);
        });
    };
    /**进度条*/
    LoadingUI.prototype.onProgress = function (current, total) {
        var _this = this;
        var per = current / total;
        var w = Math.floor(per * 996);
        this.group.left = -534 + w;
        if (this.interval) {
            if (per >= 1) {
                clearInterval(this.interval);
                return;
            }
            ;
            return;
        }
        var arr = ["Loading", "Loading.", "Loading..", "Loading..."], num = 0;
        this.interval = setInterval(function (v) {
            _this.progressTxt.text = arr[num];
            num >= 3 ? num = 0 : num++;
        }, 200);
    };
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI");
