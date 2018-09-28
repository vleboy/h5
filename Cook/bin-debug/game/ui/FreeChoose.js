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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game;
(function (game) {
    var FreeChoose = (function (_super) {
        __extends(FreeChoose, _super);
        function FreeChoose() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "freeChooseSkin.exml";
            return _this;
        }
        /**初始化*/
        FreeChoose.prototype.init = function () {
            var _this = this;
            this.countArr = ["20", "15", "10", "8", "5"];
            this.parArr = [];
            this.countArr.forEach(function (v) { return _this.registerEvent(_this["choose" + v], egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this); });
        };
        /**显示*/
        FreeChoose.prototype.show = function () {
            var _this = this;
            //默认显示
            var defShow = function () {
                _this.chooseGroup.setChildIndex(_this.rect, 0);
                _this.chooseGroup.setChildIndex(_this.cardBgLight, 1);
                _this.visible = true;
                //选项卡默认位置
                _this.countArr.forEach(function (v, i) {
                    var tar = _this["choose" + v];
                    tar.top = 240;
                    tar.left = FreeChoose.positionArr[i];
                    _this.bgLight.alpha = 0;
                    _this.maxArr.alpha = 0;
                });
                //初始化粒子
                _this.parArr.forEach(function (v) {
                    v.visible = false;
                    v.stop();
                    v.parent && v.parent.removeChild(v);
                });
                _this.parArr = [];
            };
            defShow();
            //选项卡动画
            this.cardIn();
            setTimeout(function () {
                _this.tipTxt.visible = true;
            }, 1000);
            //下方选择免费提示文字图片动画
            egret.Tween.get(this.tipTxt, { loop: true }).wait(2000).to({ alpha: 0.5 }, 500).to({ alpha: 1 }, 500);
        };
        /**
         * 选项卡进入动画(免费类型进入动画)
        */
        FreeChoose.prototype.cardIn = function () {
            var _this = this;
            for (var _i = 0, _a = this.countArr; _i < _a.length; _i++) {
                var value = _a[_i];
                this["cardBg" + value].top = -256;
                this["cardBg" + value].visible = true;
                this["cardBg" + value].alpha = 0;
                this["body" + value].top = -534;
            }
            return new Promise(function (res, rej) {
                var moveAni = function (tar, wait, tar2) {
                    return new Promise(function (res2, rej2) {
                        egret.Tween.get(tar)
                            .wait(wait)
                            .to({ top: 126, alpha: 1 }, 250)
                            .to({ top: 16 }, 250)
                            .call(function () {
                            egret.Tween.get(tar2).to({ top: 0 }, 300).call(function () {
                                egret.Tween.removeTweens(tar);
                                egret.Tween.removeTweens(tar2);
                                res();
                            });
                        });
                    });
                };
                _this.countArr.forEach(function (v) {
                    var mk = new eui.Rect(310, 534);
                    mk.x = 0;
                    mk.y = 66;
                    _this["choose" + v].addChild(mk);
                    _this["body" + v].mask = mk;
                });
                var waitTaimArr = [0, 250, 500, 750, 1000];
                var proArr = [];
                _this.countArr.forEach(function (v, i) {
                    proArr.push(moveAni(_this["cardBg" + v], waitTaimArr[i], _this["body" + v]));
                });
                Promise.all(proArr).then(function () { return res(); });
            });
        };
        /**点击某选项卡其他选项卡退出动画*/
        FreeChoose.prototype.cardOut = function (tar) {
            var _this = this;
            return new Promise(function (res, rej) {
                var freeType = tar.name.split("_")[1];
                var moveAni = function (gro, leftNum, moveTime, wait) {
                    return new Promise(function (res2, rej2) {
                        egret.Tween.get(gro).wait(wait).to({ left: leftNum }, moveTime).call(function () { egret.Tween.removeTweens(gro); res2(); });
                    });
                };
                var moveTop = function (gro, topNum, moveTime, wait) {
                    return new Promise(function (res2, rej2) {
                        egret.Tween.get(gro).wait(wait).to({ top: topNum }, moveTime).call(function () { egret.Tween.removeTweens(gro); res2(); });
                    });
                };
                var moveCenterTime = [200, 100, 0, 100, 200];
                var moveOutTime = [0, 100, 200, 300];
                var index = _this.countArr.indexOf(freeType);
                //移动动画
                var outArr = ["20", "15", "10", "8", "5"];
                outArr.splice(index, 1);
                var proArr = [];
                //其他卡片飞出
                outArr.forEach(function (v, i) { return proArr.push(moveTop(_this["choose" + v], -600, 100, moveOutTime[i])); });
                //选中卡片飞到中间
                proArr.push(moveAni(tar, 806, moveCenterTime[index], 600));
                Promise.all(proArr).then(function () { return res(); });
            });
        };
        /**选项卡背景光动画*/
        FreeChoose.prototype.cardBgAni = function (cardType) {
            var _this = this;
            return new Promise(function (res, rej) {
                //显示背景
                var bgShow = function (tar, timer, wait) {
                    return new Promise(function (res2, rej2) {
                        tar.scaleX = .8;
                        tar.scaleY = .8;
                        tar.alpha = 0;
                        egret.Tween.get(tar).wait(wait).to({ scaleX: 1, scaleY: 1, alpha: 1 }, timer, egret.Ease.quintIn).call(function () { egret.Tween.removeTweens(tar); res2(); });
                    });
                };
                //粒子效果
                var particleEffect = function () {
                    var texture = RES.getRes("particle_" + cardType + "_png");
                    var cfg1 = RES.getRes("freeParticle1_json");
                    var cfg2 = RES.getRes("freeParticle2_json");
                    var p1 = new particle.GravityParticleSystem(texture, cfg1);
                    var p2 = new particle.GravityParticleSystem(texture, cfg2);
                    var playP = function (p, index) {
                        _this.cardBgLight.addChildAt(p, index);
                        p.start();
                        p.emitterX = 155;
                        p.emitterY = 300;
                        p.visible = true;
                        _this.parArr.push(p);
                    };
                    playP(p1, 0);
                    setTimeout(function () { return playP(p2, 1); }, 1000);
                };
                //显示小发阵
                egret.Tween.get(_this["minArr_" + cardType])
                    .wait(200)
                    .to({ alpha: 1 }, 400)
                    .call(function () {
                    egret.Tween.removeTweens(_this["minArr_" + cardType]);
                    _this.bgLight.source = "light_" + cardType + "_png";
                    _this.maxArr.source = "maxArr_" + cardType + "_png";
                    //背景光
                    bgShow(_this.bgLight, 600, 100);
                    //大法阵
                    bgShow(_this.maxArr, 600, 200);
                    //粒子效果
                    particleEffect();
                });
            });
        };
        /**关闭当前页面*/
        FreeChoose.prototype.close = function () {
            var _this = this;
            return new Promise(function (res, rej) {
                _this.closeRect.alpha = 0;
                _this.closeRect.visible = true;
                egret.Tween.get(_this.closeRect).to({ alpha: 1 }, 1500).call(function () {
                    egret.Tween.removeTweens(_this.closeRect);
                    _this.closeRect.visible = false;
                    _this.visible = false;
                    if (game.GlobalConfig.effectSwitch) {
                        game.SoundPlayer.closeEffect();
                        game.SoundPlayer.closeEffect(false);
                    }
                    //去掉粒子
                    _this.parArr.forEach(function (v) {
                        v.visible = false;
                        v.stop();
                        v.parent && v.parent.removeChild(v);
                    });
                    _this.parArr = [];
                    res();
                });
                egret.Tween.get(_this.maxArr).to({ alpha: 0.4 }, 500).call(function () { return egret.Tween.removeTweens(_this.maxArr); });
            });
        };
        /**点击某选项卡*/
        FreeChoose.prototype.onTouch = function (e) {
            var _this = this;
            //发送免费请求
            var respData;
            var cardType = e.target.name.split("_")[1];
            var sendFree = function () {
                return new Promise(function (res, rej) {
                    //发送的免费类型，代表5:20, 4:15, 3:10, 2:8, 1:5
                    var freeAype = [5, 4, 3, 2, 1];
                    var index = _this.countArr.indexOf(cardType);
                    if (cardType) {
                        game.GameService.getInstance().sendFreeChoose(freeAype[index]).then(function (resp) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            respData = resp;
                            res();
                            return [2 /*return*/];
                        }); }); });
                    }
                });
            };
            game.SoundPlayer.playEffect("ROT_243_ChoseCard_mp3");
            this.tipTxt.visible = false;
            this.cardOut(e.target).then(function () {
                game.SoundPlayer.playEffect("ROT_243_CardEffect_mp3");
                _this.cardBgAni(cardType);
                setTimeout(function () {
                    sendFree().then(function () {
                        _this.close().then(function () { return _this.sendNotify(game.NotifyConst.chooseFreeBack, respData); });
                    });
                }, 1500);
            });
        };
        /**卷轴初始位置 */
        FreeChoose.positionArr = [62, 434, 806, 1178, 1550];
        return FreeChoose;
    }(game.BaseUI));
    game.FreeChoose = FreeChoose;
    __reflect(FreeChoose.prototype, "game.FreeChoose");
})(game || (game = {}));
