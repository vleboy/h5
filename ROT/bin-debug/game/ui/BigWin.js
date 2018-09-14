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
    var BigWin = (function (_super) {
        __extends(BigWin, _super);
        function BigWin() {
            var _this = _super.call(this) || this;
            _this.winNum = 0;
            _this.skinName = game.GlobalConfig.skinPath + "bigWinSkin.exml";
            return _this;
        }
        BigWin.prototype.init = function () {
            this.visible = false;
            this.showTime = [10000, 20000, 30000];
        };
        BigWin.prototype.bigWinStart = function (type, money) {
            var _this = this;
            this.visible = true;
            //喷元宝的时间
            var timer = this.showTime[0];
            switch (type) {
                case "big":
                    timer = this.showTime[0];
                    break;
                case "mega":
                    timer = this.showTime[1];
                    break;
                case "super":
                    timer = this.showTime[2];
                    break;
            }
            this.winChannel = game.SoundPlayer.playEffect("CaiShen_243_BigWin_mp3");
            return new Promise(function (res, rej) {
                _this.boomAni().then(function () {
                    Promise.all([_this.payOut(money, timer), _this.winTxtAni(type)]).then(function () {
                        if (_this.winChannel)
                            _this.winChannel.stop();
                        res();
                    });
                });
            });
            ;
        };
        /**boom动画*/
        BigWin.prototype.boomAni = function () {
            var _this = this;
            return new Promise(function (res, rej) {
                //boom显示
                var booShow = function (isBo) {
                    if (isBo === void 0) { isBo = true; }
                    _this.payoutGroup.visible = !isBo;
                    _this.boomLight.visible = isBo;
                    _this.winLight.visible = !isBo;
                };
                booShow();
                _this.boomLight.play();
                _this.boomLight.once(game.AMovieClip.COMPLETE, function () {
                    booShow(false);
                    _this.winLight.play();
                    res();
                }, _this);
            });
        };
        /**winTxtAni*/
        BigWin.prototype.winTxtAni = function (type) {
            var _this = this;
            return new Promise(function (res, rej) {
                var txtAni = function (theSou) {
                    _this.winImg.source = theSou;
                    egret.Tween.get(_this.winImg)
                        .to({ scaleX: 5, scaleY: 5 }, 200)
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .call(function () { return egret.Tween.removeTweens(_this.winImg); });
                };
                txtAni("bigWin_png");
                // switch (type) {
                //     case "big":
                //         txtAni("BigWin_png").then(() => res());
                //         break;
                //     case "mega":
                //         txtAni("megaWin_png").then(() => {
                //         });
                //         break;
                //     case "superWin_png":
                //         txtAni("BigWin_png").then(() => res());
                //         break;
                // }
            });
        };
        /**派彩*/
        BigWin.prototype.payOut = function (mon, timer) {
            var _this = this;
            this.winNum = 0;
            return new Promise(function (res, rej) {
                egret.Tween.get(_this, { onChange: function () { _this.payout.text = _this.winNum.toFixed(2); }, onChangeObj: _this })
                    .to({ winNum: mon }, timer - 2000).call(function () {
                    egret.Tween.removeTweens(_this);
                    game.SoundPlayer.playEffect("CaiShen_243_BigWinOver_mp3");
                    egret.Tween.get(_this.payout)
                        .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                        .to({ scaleX: 1, scaleY: 1 }, 300)
                        .call(function () {
                        egret.Tween.removeTweens(_this.payout);
                        // this.fireworks();
                        res();
                    });
                });
            });
        };
        /**喷烟花*/
        BigWin.prototype.fireworks = function () {
            var _this = this;
            return new Promise(function (res, rej) {
                var texture = RES.getRes("fireworks_png");
                var cfg = RES.getRes("particle_fireworks_json");
                var rand = Math.ceil(Math.random() * 30);
                var arr = [];
                for (var i = 0; i <= rand; i++) {
                    var particle_fireworks = new particle.GravityParticleSystem(texture, cfg);
                    particle_fireworks.blendMode = egret.BlendMode.ADD;
                    arr.push(particle_fireworks);
                    _this.payoutGroup.addChild(particle_fireworks);
                    var ranX = 200 - Math.floor(Math.random()) * 400;
                    particle_fireworks.emitterX = 950 + 300 - Math.floor(Math.random() * 600);
                    particle_fireworks.emitterY = 530 + 150 - Math.floor(Math.random() * 300);
                    particle_fireworks.start();
                }
                var timeOut;
                if (timeOut)
                    clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    arr.forEach(function (v) { return v.stop(); });
                    res();
                }, 80);
            });
        };
        return BigWin;
    }(game.BaseUI));
    game.BigWin = BigWin;
    __reflect(BigWin.prototype, "game.BigWin");
})(game || (game = {}));
//# sourceMappingURL=BigWin.js.map