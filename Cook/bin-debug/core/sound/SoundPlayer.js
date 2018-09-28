var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SoundPlayer = (function () {
        function SoundPlayer() {
        }
        /**关闭背景音乐*/
        SoundPlayer.closeMusic = function (isClose) {
            if (isClose === void 0) { isClose = true; }
            game.GlobalConfig.musicSwitch = !isClose;
            if (isClose && this.musicChannel) {
                this.musicChannel.stop();
                this.musicChannel = null;
            }
        };
        /**关闭音效*/
        SoundPlayer.closeEffect = function (isClose) {
            if (isClose === void 0) { isClose = true; }
            game.GlobalConfig.effectSwitch = !isClose;
            if (isClose) {
                this.effectArr.forEach(function (v) { return v.stop(); });
                this.effectArr = [];
            }
        };
        /**播放某一个音效*/
        SoundPlayer.playEffect = function (name, count) {
            var _this = this;
            if (count === void 0) { count = 1; }
            if (game.GlobalConfig.effectSwitch) {
                var channel = RES.getRes(name).play(0, count);
                this.effectArr.push(channel);
                channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                    var newArr = [];
                    _this.effectArr.forEach(function (v) { !v["isStopped"] && newArr.push(v); });
                    _this.effectArr = newArr;
                }, this);
                return channel;
            }
        };
        /**播放某一个背景音乐*/
        SoundPlayer.playMusic = function (name) {
            if (game.GlobalConfig.musicSwitch) {
                if (this.musicChannel)
                    this.musicChannel.stop();
                this.musicChannel = RES.getRes(name).play(0);
            }
        };
        SoundPlayer.effectArr = [];
        return SoundPlayer;
    }());
    game.SoundPlayer = SoundPlayer;
    __reflect(SoundPlayer.prototype, "game.SoundPlayer");
})(game || (game = {}));
