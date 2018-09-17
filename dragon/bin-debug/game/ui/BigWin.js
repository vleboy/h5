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
            this.yuanbaoTime = [10000, 20000, 30000];
            this.yuanbaoNum = [30, 60, 90];
        };
        BigWin.prototype.bigWinStart = function (type, money) {
            var _this = this;
            this.visible = true;
            //喷元宝的时间
            var timer = this.yuanbaoTime[0];
            switch (type) {
                case "big":
                    timer = this.yuanbaoTime[0];
                    break;
                case "mega":
                    timer = this.yuanbaoTime[1];
                    break;
                case "super":
                    timer = this.yuanbaoTime[2];
                    break;
            }
            this.winChannel = game.SoundPlayer.playEffect("BigWin_mp3");
            this.bigWinLight();
            return Promise.all([this.payOut(money, timer), this.winTxtAni(type)]).then(function () {
                if (_this.winChannel)
                    _this.winChannel.stop();
            });
        };
        /**喷元宝
         * @param timer 喷元宝时间
         * @param num 喷元宝数量
        */
        BigWin.prototype.yuanbao = function (timer, num) {
            var _this = this;
            return new Promise(function (res, rej) {
                var texture = RES.getRes("yigeyuanb_png");
                var cfg = RES.getRes("particle_yuanbao_json");
                cfg.maxParticles = num;
                _this.theParticle = new particle.GravityParticleSystem(texture, cfg);
                _this.yuanbaoGroup.addChild(_this.theParticle);
                _this.theParticle.start();
                var timeOut;
                timeOut && clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    _this.theParticle && _this.theParticle.stop();
                    _this.theParticle.parent.removeChild(_this.theParticle);
                    _this.theParticle = null;
                    res();
                }, timer);
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
                        .call(function () {
                        egret.Tween.removeTweens(_this.winImg);
                    });
                };
                txtAni("BigWin_png");
                var megaTime = _this.yuanbaoTime[1] - _this.yuanbaoTime[0];
                var superTime = _this.yuanbaoTime[2] - _this.yuanbaoTime[1];
                switch (type) {
                    case "big":
                        _this.yuanbao(_this.yuanbaoTime[0], _this.yuanbaoNum[0]).then(function () { _this.visible = false; res(); });
                        break;
                    case "mega":
                        _this.yuanbao(_this.yuanbaoTime[0], _this.yuanbaoNum[0]).then(function () {
                            txtAni("MegaWin_png");
                            _this.yuanbao(megaTime, _this.yuanbaoNum[1]).then(function () { _this.visible = false; res(); });
                        });
                        break;
                    case "super":
                        _this.yuanbao(_this.yuanbaoTime[0], _this.yuanbaoNum[0]).then(function () {
                            txtAni("MegaWin_png");
                            _this.yuanbao(megaTime, _this.yuanbaoNum[1]).then(function () {
                                txtAni("SuperWin_png");
                                _this.yuanbao(superTime, _this.yuanbaoNum[2]).then(function () { _this.visible = false; res(); });
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
                    game.SoundPlayer.playEffect("BigWinOver_mp3");
                    egret.Tween.get(_this.payout)
                        .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                        .to({ scaleX: 1, scaleY: 1 }, 300)
                        .call(function () {
                        egret.Tween.removeTweens(_this.payout);
                        _this.fireworks();
                        res();
                    });
                });
            });
        };
        /**light*/
        BigWin.prototype.bigWinLight = function () {
            this.light.sources = "bigwinLight|1-30|_png";
            this.light.play();
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