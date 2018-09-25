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
        FreeChoose.prototype.init = function () {
            var _this = this;
            ["20", "15", "10", "8", "5"].forEach(function (v, i) {
                _this.registerEvent(_this["choose" + v], egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            });
        };
        FreeChoose.prototype.show = function () {
            var _this = this;
            this["chooseGroup"].setChildIndex(this["rect"], 0);
            ["10", "5", "15", "8", "20"].forEach(function (v, i) {
                _this["chooseGroup"].setChildIndex(_this["choose" + v], 1);
            });
            ["20", "8", "15", "5", "10"].forEach(function (v, i) {
                var target = _this["choose" + v];
                var defaultY = target.y;
                egret.Tween.get(target)
                    .set({ y: defaultY - 900 })
                    .wait(i * 150 + 500)
                    .call(function () {
                    game.SoundPlayer.playEffect("FuYun_243_CardAppear_mp3");
                })
                    .to({ y: defaultY }, 400, egret.Ease.backOut)
                    .call(function () {
                    _this.registerEvent(target, egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
                });
            });
            egret.Tween.get(this.tipTxt, { loop: true })
                .wait(2000)
                .to({ alpha: 0.5 }, 500)
                .to({ alpha: 1 }, 500);
        };
        FreeChoose.prototype.onTouch = function (e) {
            var _this = this;
            game.SoundPlayer.playEffect("FuYun_243_ChoseCard_mp3");
            var n = 0;
            switch (e.target) {
                case this["choose20"]:
                    n = 5;
                    break;
                case this["choose15"]:
                    n = 4;
                    break;
                case this["choose10"]:
                    n = 3;
                    break;
                case this["choose8"]:
                    n = 2;
                    break;
                case this["choose5"]:
                    n = 1;
                    break;
            }
            ["20", "15", "10", "8", "5"].forEach(function (v) {
                var target = _this["choose" + v];
                if (e.target != target) {
                    _this["chooseGroup"].setChildIndex(target, 0);
                }
                else {
                    var respData_1;
                    Promise.all([
                        new Promise(function (resolve, reject) {
                            var mc = new game.AMovieClip();
                            mc.sources = "FuYunAni|1-16|_png";
                            mc.x = 144;
                            mc.y = 120;
                            mc.width = 224;
                            mc.height = 224;
                            mc.speed = 4;
                            mc.loop = 2;
                            target.addChildAt(mc, 2);
                            mc.play();
                            mc.once(game.AMovieClip.COMPLETE, function () {
                                mc.parent.removeChild(mc);
                                resolve();
                            }, _this);
                        }),
                        new Promise(function (resolve, reject) {
                            n > 0 && game.GameService.getInstance().sendFreeChoose(n).then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    respData_1 = resp;
                                    resolve();
                                    return [2 /*return*/];
                                });
                            }); });
                        })
                    ]).then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            egret.Tween.removeTweens(this.tipTxt);
                            this.sendNotify(game.NotifyConst.chooseFreeBack, respData_1);
                            return [2 /*return*/];
                        });
                    }); });
                }
            });
        };
        return FreeChoose;
    }(game.BaseUI));
    game.FreeChoose = FreeChoose;
    __reflect(FreeChoose.prototype, "game.FreeChoose");
})(game || (game = {}));
//# sourceMappingURL=FreeChoose.js.map