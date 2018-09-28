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
    var AMovieClip = (function (_super) {
        __extends(AMovieClip, _super);
        function AMovieClip() {
            var _this = _super.call(this) || this;
            /**帧图数组 */
            _this.imgs = [];
            /**当前帧 */
            _this.currentFrame = 0;
            /**是否循环播放 默认-1 循环 */
            _this.loop = -1;
            /**播放速度 值越大播放越慢 */
            _this.speed = 5;
            /**计数器 */
            _this._flag = 0;
            return _this;
        }
        /** 开始播放 */
        AMovieClip.prototype.play = function () {
            this.currentFrame = 0;
            this.source = this.imgs[this.currentFrame];
            this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        };
        /**停止播放 */
        AMovieClip.prototype.stop = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        };
        AMovieClip.prototype.onFrame = function () {
            this._flag++;
            if (this._flag >= this.speed) {
                this.nextFrame();
                this._flag = 0;
            }
        };
        /**播下一帧 */
        AMovieClip.prototype.nextFrame = function () {
            this.currentFrame++;
            if (this.currentFrame == this.imgs.length) {
                this.loop--;
                if (this.loop == 0) {
                    this.dispatchEventWith(AMovieClip.COMPLETE);
                    this.stop();
                    return;
                }
                else {
                    this.currentFrame = 0;
                    this.dispatchEventWith(AMovieClip.VERYLOOPCOMPLETE);
                }
            }
            this.source = this.imgs[this.currentFrame];
        };
        Object.defineProperty(AMovieClip.prototype, "sources", {
            /**设置图片数组 例如 'a0_png'到'a10_png' 那么设置为格式为 'a|0-10|_png' */
            set: function (str) {
                var arr = str.split("|");
                var numStr = arr[1];
                var start = parseInt(numStr.split("-")[0]);
                var end = parseInt(numStr.split("-")[1]);
                this.imgs = [];
                for (var i = start; i <= end; i++) {
                    this.imgs.push(arr[0] + i + arr[2]);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**结束事件 */
        AMovieClip.COMPLETE = "loopComplete";
        /**每一次循环完成*/
        AMovieClip.VERYLOOPCOMPLETE = "veryLoopComplete";
        return AMovieClip;
    }(eui.Image));
    game.AMovieClip = AMovieClip;
    __reflect(AMovieClip.prototype, "game.AMovieClip");
})(game || (game = {}));
