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
            //持续时间
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
            this.winChannel = game.SoundPlayer.playEffect("ROT_243_BigWin_mp3");
            return new Promise(function (res, rej) {
                _this.boomAni();
                if (_this.timeOut)
                    clearTimeout(_this.timeOut);
                _this.timeOut = setTimeout(function () {
                    _this.winLight.play();
                    _this.winLight.visible = true;
                    _this.payoutGroup.visible = true;
                    Promise.all([_this.payOut(money, timer), _this.winTxtAni(type)]).then(function () {
                        if (_this.winChannel)
                            _this.winChannel.stop();
                        _this.winLight.visible = false;
                        _this.payoutGroup.visible = false;
                        res();
                    });
                }, 400);
            });
            ;
        };
        /**boom动画*/
        BigWin.prototype.boomAni = function () {
            var _this = this;
            this.boomLight.visible = true;
            this.boomLight.play();
            this.boomLight.loop = 1;
            this.boomLight.once(game.AMovieClip.COMPLETE, function () {
                _this.boomLight.visible = false;
            }, this);
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
                var waitTimer;
                var wait = function (timer) {
                    return new Promise(function (res2, rej2) {
                        waitTimer && clearTimeout(waitTimer);
                        waitTimer = setTimeout(function () { res2(); clearTimeout(waitTimer); }, timer);
                    });
                };
                txtAni("bigWin_png");
                var megaTime = _this.showTime[1] - _this.showTime[0];
                var superTime = _this.showTime[2] - _this.showTime[1];
                switch (type) {
                    case "big":
                        wait(_this.showTime[0]).then(function () { _this.visible = false; res(); });
                        break;
                    case "mega":
                        wait(_this.showTime[0]).then(function () {
                            txtAni("megaWin_png");
                            _this.spurtCoin(megaTime, 20).then(function () { _this.visible = false; res(); });
                        });
                        break;
                    case "super":
                        wait(_this.showTime[0]).then(function () {
                            txtAni("megaWin_png");
                            _this.spurtCoin(megaTime, 20).then(function () {
                                txtAni("superWin_png");
                                _this.spurtCoin(superTime, 40).then(function () { _this.visible = false; res(); });
                            });
                        });
                        break;
                }
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
                    if (game.GlobalConfig.effectSwitch) {
                        game.SoundPlayer.closeEffect();
                        game.SoundPlayer.closeEffect(false);
                    }
                    game.SoundPlayer.playEffect("ROT_243_BigWinOver_mp3");
                });
                egret.Tween.get(_this.payout)
                    .to({ scaleX: 1.5, scaleY: 1.5 }, timer - 2000)
                    .to({ scaleX: 1.8, scaleY: 1.8 }, 300)
                    .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                    .call(function () {
                    egret.Tween.removeTweens(_this.payout);
                    res();
                });
            });
        };
        /**喷银币*/
        BigWin.prototype.spurtCoin = function (timer, num) {
            var _this = this;
            return new Promise(function (res, rej) {
                var texture = RES.getRes("jinbi_png");
                var cfg = RES.getRes("particleCoin_json");
                cfg.maxParticles = num;
                _this.theParticle = new particle.GravityParticleSystem(texture, cfg);
                _this.payoutGroup.addChild(_this.theParticle);
                _this.theParticle.emitterX = 950;
                _this.theParticle.emitterY = 860;
                _this.theParticle.start();
                var timeOut;
                timeOut && clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    _this.theParticle && _this.theParticle.stop();
                    _this.theParticle.parent.removeChild(_this.theParticle);
                    _this.theParticle = null;
                    clearTimeout(timeOut);
                    res();
                }, timer);
            });
        };
        return BigWin;
    }(game.BaseUI));
    game.BigWin = BigWin;
    __reflect(BigWin.prototype, "game.BigWin");
})(game || (game = {}));
