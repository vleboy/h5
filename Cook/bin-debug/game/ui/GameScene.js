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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            /**免费模式下本次转动的buff */
            _this.buff = "-1";
            _this.skinName = game.GlobalConfig.skinPath + "gameSceneSkin.exml";
            return _this;
        }
        // -------------------- 游戏初始化  ------------------------
        /**
         * 初始化显示对象，注册通知
         * */
        GameScene.prototype.init = function () {
            this.initView();
            this.initData();
        };
        /**
         * 初始化显示
         * */
        GameScene.prototype.initView = function () {
            this.starArr = [];
            this.initTitle();
            this.initStar();
            this.initSymbols();
            this.tileGroup.mask = this.tileMask;
            this.setState(game.GameState.BET);
            this.initVisible();
            this.initListener();
        };
        /**
         * 标题流光
         * */
        GameScene.prototype.initTitle = function () {
            this.title.play();
            this.titleLight.play();
        };
        /**
         * 星星
        */
        GameScene.prototype.initStar = function (isFree) {
            var _this = this;
            if (isFree === void 0) { isFree = false; }
            var starBg = isFree ? "blueStarBg_png" : "yellowStarBg_png";
            var starSources = isFree ? "blueStar|1-13|_png" : "yellowStar|1-13|_png";
            [0, 1, 2, 3, 4, 5].forEach(function (v) { return _this["starBg" + v].source = starBg; });
            var starPlay = function (index) {
                var star = _this["starAni" + index];
                star.sources = starSources;
                star.speed = 8;
                star.play();
                _this.starArr.push(star);
            };
            this.starArr && this.starArr.forEach(function (v) { return v.stop(); });
            [0, 2, 4].forEach(function (v) { return starPlay(v); });
            setTimeout(function () {
                [1, 3, 5].forEach(function (v) { return starPlay(v); });
            }, 500);
        };
        /**
         * 背景闪烁
        */
        GameScene.prototype.bgAlpha = function (isFree) {
            var _this = this;
            var tar = function (isf) { return isf ? _this.bgFree : _this.bg; };
            egret.Tween.removeTweens(tar(!isFree));
            var theTar = tar(isFree);
            theTar.alpha = 1;
            egret.Tween.get(theTar, { loop: true }).to({ alpha: 0.7 }, 1500).to({ alpha: 1 }, 2500);
        };
        /**
         * 初始图标对象
         * */
        GameScene.prototype.initSymbols = function () {
            this.symbols = [];
            for (var i = 0; i < 15; i++) {
                this.symbols.push(new Symbol(this["tile" + i], this));
            }
            for (var i = 0; i < 15; i++) {
                var n = Math.floor(Math.random() * 13) + "";
                if (((i < 3 || i > 11) && n == "1"))
                    n = "2";
                n = (n == "1" ? "1_1" : n);
                this["tile" + i].visible = true;
                this["tile" + i].source = "symbolName_" + n + "_png";
            }
        };
        /**
         * 初始化一些visible
         * */
        GameScene.prototype.initVisible = function () {
            [this.border2, this.border3, this.border4, this.lineWinTxt].forEach(function (v) {
                v.visible = false;
            });
            for (var i = 0; i < 20; i++) {
                this["vagueTile" + i].visible = false;
            }
        };
        GameScene.prototype.initListener = function () {
            var _this = this;
            this.registerEvent(this.bg, egret.TouchEvent.TOUCH_TAP, function () {
                _this.bottomBar.hideCutGroup(true);
            }, this);
        };
        /**
         * 更新背景音乐
         * */
        GameScene.prototype.updateBgm = function () {
            if (this.isFree) {
                game.SoundPlayer.playMusic("ROT_243_freeGame_mp3");
            }
            else {
                this.freeChoose.visible ? game.SoundPlayer.playMusic("ROT_243_featureChoose_mp3") : game.SoundPlayer.playMusic("ROT_243_normalGame_mp3");
            }
        };
        /**
         * 初始化数据
         * */
        GameScene.prototype.initData = function () {
            game.NotifyManager.getInstance().addRegister(this, [
                game.NotifyConst.spin,
                game.NotifyConst.openHelp,
                game.NotifyConst.openSetting,
                game.NotifyConst.cancelSpin,
                game.NotifyConst.cancelAutoSpin,
                game.NotifyConst.betLevelIndex,
                game.NotifyConst.chooseFreeBack,
                game.NotifyConst.freeComplete,
                game.NotifyConst.updateBgm
            ]);
            var loginVo = game.GameService.getInstance().loginVo;
            this.balance = +loginVo.payload.userBalance;
            this.betcfg = loginVo.payload.betcfg;
            this.betLevel = loginVo.payload.betLevel;
            this.multicfg = loginVo.payload.multicfg;
            this.multiLevel = loginVo.payload.multiLevel;
            this.topBar.setUser(loginVo.payload.nickname);
            this.topBar.setBalance(loginVo.payload.userBalance);
            this.theBalance = loginVo.payload.userBalance;
            this.bottomBar.setBetData(this.betcfg, this.betLevel, this.multicfg[this.multiLevel]);
            //数据恢复检查
            this.checkDataRecover(loginVo);
            this.setting.defaultOpen();
        };
        /**
         * 数据恢复
         * */
        GameScene.prototype.checkDataRecover = function (resp) {
            if (resp.payload.featureData) {
                //进免费游戏玩
                if (resp.payload.featureData.freeSpinRemainCount > 0) {
                    this.isFree = true;
                    this.bottomBar.setFree(true);
                    this.buff = resp.payload.featureData.buff;
                    this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
                    this.featureChanceCount = resp.payload.featureData.featureChanceCount;
                    this.showFreeChoose(false);
                    this.showFreeGame(true);
                    this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
                }
                else if (resp.payload.featureData.featureChanceCount > 0) {
                    this.showFreeChoose(true);
                    this.showFreeGame(false);
                    this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
                    this.featureChanceCount = resp.payload.featureData.featureChanceCount;
                }
                else {
                    this.showFreeChoose(false);
                    this.showFreeGame(false);
                    this.freeSpinRemainCount = 0;
                    this.featureChanceCount = 0;
                }
            }
        };
        // -------------------- 游戏交互逻辑  ------------------------
        /**
         * 接收通知
         * */
        GameScene.prototype.handleNotify = function (key, body) {
            var _this = this;
            switch (key) {
                case game.NotifyConst.spin:
                    this.spin(body);
                    break;
                case game.NotifyConst.openHelp:
                    this.rull.rullShow(body, true);
                    break;
                case game.NotifyConst.openSetting:
                    this.setting.settingShow();
                    break;
                case game.NotifyConst.cancelSpin:
                    if (this.state == game.GameState.STOP)
                        this.cancelSpin();
                    else if (this.state == game.GameState.SHOW_SINGLE_LINES)
                        this.cancelLinesWin();
                    break;
                case game.NotifyConst.cancelAutoSpin:
                    this.autoMax = false;
                    this.autoCount = 0;
                    break;
                case game.NotifyConst.betLevelIndex:
                    this.betLevel = body;
                    break;
                case game.NotifyConst.chooseFreeBack:
                    this.freeSpinRemainCount = body.payload.featureData.freeSpinRemainCount;
                    if (this.spinResp)
                        this.spinResp.payload.featureData.buff = body.payload.featureData.buff;
                    this.buff = body.payload.featureData.buff;
                    this.featureChanceCount--;
                    this.isFree = true;
                    this.bottomBar.setFree(true);
                    this.bottomBar.setAutoBetNum(this.freeSpinRemainCount);
                    this.showFreeChoose(false);
                    this.showFreeGame(true);
                    break;
                case game.NotifyConst.freeComplete:
                    egret.Tween.get(this["gameMask"])
                        .set({ visible: true, alpha: 0 })
                        .to({ alpha: 1 }, 700)
                        .wait(700)
                        .call(function () {
                        _this.freeTotalWin.visible = false;
                        _this.freeComplete();
                    })
                        .to({ alpha: 0 }, 700)
                        .call(function () {
                        _this["gameMask"].visible = false;
                        egret.Tween.removeTweens(_this["gameMask"]);
                    });
                    break;
                case game.NotifyConst.updateBgm:
                    this.updateBgm();
                    break;
            }
        };
        /**
         * 控制游戏状态
         * */
        GameScene.prototype.setState = function (n) {
            this.state = n;
            this.bottomBar.setState(n);
        };
        /**
         * spin的逻辑
         * */
        GameScene.prototype.spin = function (autoCount) {
            console.warn("cbnscjsdbcisdhcisdcs");
            if (this.balance < this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]) {
                console.log("余额不足");
                this.stage.addChild(new game.ErrTip("余额不足", function () { }, this));
                return;
            }
            if (!this.isFree) {
                var txt = (+this.theBalance - this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]).toFixed(2);
                this.topBar.setBalance(txt);
            }
            if (autoCount == "max") {
                this.autoMax = true;
            }
            else if (autoCount > 0) {
                this.autoMax = false;
                this.autoCount = autoCount;
            }
            if (this.spinResp)
                this.buff = this.spinResp.payload.featureData.buff;
            this.startSpin();
            if (this["testInput"].text) {
                game.GameService.getInstance().sendSpin(this.betLevel, this["testInput"].text).then(this.spinBack.bind(this));
            }
            else {
                game.GameService.getInstance().sendSpin(this.betLevel).then(this.spinBack.bind(this));
            }
            this["testInput"].text = "";
            this.isReturnData = false;
            this.setState(game.GameState.SPINNING);
            this.showConnect();
        };
        /**
         * 显示连接
        */
        GameScene.prototype.showConnect = function () {
            var _this = this;
            var timeOut = function (wait) {
                return new Promise(function (res, rej) {
                    _this.spinWain && clearTimeout(_this.spinWain);
                    _this.spinWain = setTimeout(function () { return res(); }, wait);
                });
            };
            timeOut(12000).then(function () {
                if (!_this.isReturnData)
                    _this.connectTip.show(true);
                timeOut(8000).then(function () {
                    if (!_this.isReturnData) {
                        _this.connectTip.show(false);
                        _this.stage.addChild(new game.ErrTip("网络连接错误，是否重连?", function () { return location.reload(); }, _this));
                    }
                });
            });
        };
        /**
         * 收到spin结果 ，把-1的图标筛选掉
         * */
        GameScene.prototype.spinBack = function (resp) {
            resp.payload.winGrid.length > 0 && resp.payload.winGrid.forEach(function (v, i) {
                for (var i_1 = v.winCard.length - 1; i_1 >= 0; i_1--) {
                    if (v.winCard[i_1] == -1) {
                        v.winCard.splice(i_1, 1);
                    }
                }
                for (var i_2 = v.line.length - 1; i_2 >= 0; i_2--) {
                    if (v.line[i_2] == -1) {
                        v.line.splice(i_2, 1);
                    }
                }
            });
            if (resp.payload.scatterGrid.length > 0) {
                for (var i = resp.payload.scatterGrid.length - 1; i >= 0; i--) {
                    if (resp.payload.scatterGrid[i] == -1) {
                        resp.payload.scatterGrid.splice(i, 1);
                    }
                }
            }
            console.log("UI收到spin返回 ", resp);
            this.spinResp = resp;
            if (this.isFree) {
                this.freeSpinRemainCount = this.spinResp.payload.featureData.freeSpinRemainCount;
                this.featureChanceCount = this.spinResp.payload.featureData.featureChanceCount;
                this.featureMultiplier = this.spinResp.payload.featureData.featureMultiplier;
            }
            this.theBalance = resp.payload.userBalance;
            this.stopRoll(resp.payload.viewGrid);
            this.setState(game.GameState.STOP);
            this.isReturnData = true;
            if (this.connectTip.visible)
                this.connectTip.show(false);
        };
        // -------------------- 游戏转动显示  ------------------------
        /**
         * 开始滚动
         * */
        GameScene.prototype.startSpin = function () {
            this.rollChannel = game.SoundPlayer.playEffect("ROT_243_Roll_mp3", -1);
            for (var i = 0; i < 15; i++) {
                this["tile" + i].visible = false;
            }
            for (var i = 0; i < 5; i++) {
                this.singleColumRoll(i);
            }
            this.freeMultiAni(this.featureMultiplier, false);
        };
        /**
         * 单列模糊图标转动
         * */
        GameScene.prototype.singleColumRoll = function (column) {
            var _this = this;
            for (var i = 0; i < 4; i++) {
                this["vagueTile" + (column * 4 + i)].visible = true;
                this["vagueTile" + (column * 4 + i)].source = "vague" + Math.floor(Math.random() * 11 + 2) + "_png";
            }
            egret.Tween.get(this["vagueTile" + (column * 4)], { loop: true })
                .wait(20)
                .call(function () {
                for (var i = 0; i < 4; i++) {
                    var tile = _this["vagueTile" + (column * 4 + i)];
                    tile.y += (game.GlobalConfig.fastSwitch ? 104 : 80);
                    if (tile.y > 658) {
                        tile.y -= 238 * 4;
                        tile.source = "vague" + Math.floor(Math.random() * 11 + 2) + "_png";
                    }
                }
            });
        };
        /**
         * 停下来
         * */
        GameScene.prototype.stopRoll = function (arr) {
            return __awaiter(this, void 0, void 0, function () {
                var is3Delay, is4Delay, is5Delay, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.rollChannel)
                                this.rollChannel.stop();
                            is3Delay = (arr.slice(0, 3).indexOf("0") > -1 && arr.slice(3, 6).indexOf("0") > -1);
                            is4Delay = is3Delay && arr.slice(6, 9).indexOf("0") > -1;
                            is5Delay = is4Delay && arr.slice(9, 12).indexOf("0") > -1;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 5)) return [3 /*break*/, 10];
                            if (!(i < 2)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.stopColumn(i, arr)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 3:
                            if (!(i == 2)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.stopColumn(i, arr, is3Delay)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 5:
                            if (!(i == 3)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.stopColumn(i, arr, is4Delay)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            if (!(i == 4)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.stopColumn(i, arr, is5Delay)];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            i++;
                            return [3 /*break*/, 1];
                        case 10:
                            this.judgeResult();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 单列停下来 isFree 是否freespin缓停
         * */
        GameScene.prototype.stopColumn = function (column, arr, isFree) {
            var _this = this;
            if (isFree === void 0) { isFree = false; }
            var columnArr = arr.slice(column * 3, column * 3 + 3);
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var haveScatterThisColumn, c;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isFree) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.freeEffect(column)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            egret.Tween.removeTweens(this["vagueTile" + (column * 4)]);
                            [0, 1, 2, 3].forEach(function (i) {
                                _this["vagueTile" + (column * 4 + i)].visible = false;
                                _this["vagueTile" + (column * 4 + i)].y = i * 238;
                            });
                            haveScatterThisColumn = true;
                            for (c = 0; c <= column; c++) {
                                if (arr[c * 3] != "0" && arr[c * 3 + 1] != "0" && arr[c * 3 + 2] != "0") {
                                    haveScatterThisColumn = false;
                                }
                            }
                            [0, 1, 2].forEach(function (i) {
                                //处理wild图标的多样性
                                var symbol = _this.symbols[(column * 3 + i)];
                                var str = columnArr[i] == "1" ? "1" + (_this.buff == "-1" ? "" : "_" + _this.buff) : columnArr[i];
                                var defaultY = symbol.tile.y;
                                symbol.tile.visible = true;
                                symbol.value = columnArr[i];
                                symbol.setTexture("symbolName_" + str + "_png");
                                egret.Tween.get(symbol.tile).set({ y: defaultY + 100 }).to({ y: defaultY }, game.GlobalConfig.fastSwitch ? 150 : 250).wait(game.GlobalConfig.fastSwitch ? 50 : 200).call(function () {
                                    egret.Tween.removeTweens(symbol.tile);
                                    resolve();
                                });
                            });
                            if (haveScatterThisColumn)
                                game.SoundPlayer.playEffect("ROT_243_Scatter_" + (column + 1) + "_mp3");
                            game.SoundPlayer.playEffect("ROT_243_RollStop_mp3");
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * 单列freespin缓停动画
         * */
        GameScene.prototype.freeEffect = function (column) {
            var _this = this;
            game.SoundPlayer.playEffect("ROT_243_Scatter_wait_mp3");
            return new Promise(function (resolve, reject) {
                _this["border" + column].visible = true;
                _this["border" + column].play();
                var startX = _this["tile" + column * 3].x + _this["tile" + column * 3].width / 2;
                var startY = _this["tile" + column * 3].y;
                var c = new egret.DisplayObjectContainer();
                _this["freeCoinsGroup"].addChild(c);
                var arr = [];
                var index = 0;
                egret.Tween.get(_this["freeCoinsGroup"], { loop: true })
                    .wait(20)
                    .call(function () {
                    for (var j = arr.length - 1; j >= 0; j--) {
                        var img = arr[j];
                        img.rotation += 5;
                        img.y += img["speed"];
                        img.alpha -= img["alphaSpeed"];
                        if (img.y >= 269 + 658) {
                            img.parent.removeChild(img);
                            arr.splice(j, 1);
                        }
                    }
                });
                if (_this.freeColumnTimeout)
                    clearTimeout(_this.freeColumnTimeout);
                _this.freeColumnTimeout = setTimeout(function () {
                    egret.Tween.removeTweens(_this["freeCoinsGroup"]);
                    while (arr.length > 0) {
                        var img = arr.pop();
                        img.parent.removeChild(img);
                    }
                    if (c.parent)
                        c.parent.removeChild(c);
                    _this["border" + column].stop();
                    _this["border" + column].visible = false;
                    resolve();
                }, 2000);
            });
        };
        /**
         * 立即停止
         * */
        GameScene.prototype.cancelSpin = function () {
            var _this = this;
            if (this.freeColumnTimeout)
                clearTimeout(this.freeColumnTimeout);
            for (var i = 0; i < 20; i++) {
                egret.Tween.removeTweens(this["vagueTile" + i]);
                this["vagueTile" + i].visible = false;
                this["vagueTile" + i].y = (i % 4) * 238;
            }
            var viewGrid = this.spinResp.payload.viewGrid;
            for (var i = 0; i < 15; i++) {
                egret.Tween.removeTweens(this.symbols[i].tile);
                this.symbols[i].value = this.spinResp.payload.viewGrid[i];
                this.symbols[i].tile.visible = true;
                this.symbols[i].tile.y = (i % 3) * 238;
                var str = viewGrid[i] == "1" ? "1" + (this.buff == "-1" ? "" : "_" + this.buff) : viewGrid[i];
                this.symbols[i].setTexture("symbolName_" + str + "_png");
            }
            [2, 3, 4].forEach(function (v) {
                _this["border" + v].stop();
                _this["border" + v].visible = false;
            });
            egret.Tween.removeTweens(this["freeCoinsGroup"]);
            this["freeCoinsGroup"].removeChildren();
            this.judgeResult();
        };
        // -------------------- 游戏结果显示  ------------------------
        /**
         * 判定结果 大赢家=> 所有线 =>freespin =>bonus =>各条单线
         * */
        GameScene.prototype.judgeResult = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("判定结果 中奖线" + this.spinResp.payload.winGrid.length);
                            this.topBar.setBalance(this.spinResp.payload.userBalance, this.spinResp.payload.totalGold);
                            this.setState(game.GameState.SHOW_RESULT);
                            return [4 /*yield*/, this.showBigWin(this.spinResp.payload.winLevel, this.spinResp.payload.totalGold)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.showAllWinGrid(this.spinResp.payload.winGrid)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.showScatterLine()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.showFreeChange()];
                        case 4:
                            _a.sent();
                            this.stopScatterLine();
                            return [4 /*yield*/, this.showBonusLine()];
                        case 5:
                            _a.sent();
                            if (!this.isFree) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.showEveryLineGrid(this.spinResp.payload.winGrid)];
                        case 6:
                            _a.sent();
                            this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
                            if (this.freeSpinRemainCount == 0) {
                                setTimeout(function () {
                                    _this.showFreeTotalWin(_this.spinResp.payload.featureData.featureRoundGold);
                                }, 1000);
                            }
                            else {
                                this.setState(game.GameState.BET);
                                setTimeout(function () {
                                    if (_this.state == game.GameState.BET)
                                        _this.spin();
                                }, 1000);
                            }
                            return [3 /*break*/, 10];
                        case 7:
                            if (!this.spinResp.payload.getFeatureChance) return [3 /*break*/, 8];
                            if (this.autoMax) {
                                this.bottomBar.setAutoBetNum(-1);
                            }
                            else if (this.autoCount > 0) {
                                this.bottomBar.setAutoBetNum(--this.autoCount);
                            }
                            this.showFreeChoose(true);
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, this.showEveryLineGrid(this.spinResp.payload.winGrid)];
                        case 9:
                            _a.sent();
                            if (this.autoMax) {
                                this.bottomBar.setAutoBetNum(-1);
                            }
                            else if (this.autoCount > 0) {
                                this.bottomBar.setAutoBetNum(--this.autoCount);
                            }
                            this.setState(game.GameState.BET);
                            if (this.autoMax || this.autoCount > 0) {
                                setTimeout(function () {
                                    if (_this.state == game.GameState.BET)
                                        _this.spin();
                                }, 1000);
                            }
                            _a.label = 10;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 大赢家 normal middle big mega super
         * */
        GameScene.prototype.showBigWin = function (level, win) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (win <= 0)
                    resolve();
                else if (level == "normal") {
                    game.SoundPlayer.playEffect("ROT_243_SmallWin_mp3");
                    resolve();
                }
                else if (level == "middle") {
                    game.SoundPlayer.playEffect("ROT_243_MiddleWin_mp3");
                    resolve();
                }
                else {
                    _this.bigWin.bigWinStart(level, win).then(function () {
                        resolve();
                    });
                }
            });
        };
        /**
         * 展示所有中奖图标
         * */
        GameScene.prototype.showAllWinGrid = function (arr) {
            var _this = this;
            var grids = [];
            arr.forEach(function (v) {
                v.winCard.forEach(function (value, column) {
                    var gridIndex = value + column * 3;
                    value != -1 && grids.indexOf(gridIndex) == -1 && grids.push(gridIndex);
                });
            });
            this.bottomBar.setWinMoney(this.spinResp.payload.totalGold);
            /**中奖的里面有没有wild*/
            grids.some(function (v) { return _this.spinResp.payload.viewGrid[v] == "1"; }) && this.isFree && this.freeMultiAni(this.featureMultiplier);
            return Promise.all(grids.map(function (v) { return _this.symbols[v].imgWinAni(0); }));
        };
        /**
         * scatter图标动画
         * */
        GameScene.prototype.showScatterLine = function () {
            var _this = this;
            var lineTxt = "";
            if (this.spinResp.payload.getFeatureChance) {
                lineTxt = this.spinResp.payload.scatterGold.toFixed(2);
            }
            return Promise.all(this.spinResp.payload.getFeatureChance ? this.spinResp.payload.scatterGrid.map(function (value, column) {
                var gridIndex = value + column * 3;
                return _this.symbols[gridIndex].imgWinAni(400, false, lineTxt);
            }) : []);
        };
        GameScene.prototype.stopScatterLine = function () {
            var _this = this;
            this.particleBg.visible = false;
            this.lineWinTxt.visible = false;
            this.lineWinTxt.text = "";
            this.spinResp.payload.scatterGrid.forEach(function (value, column) {
                var gridIndex = value + column * 3;
                _this.symbols[gridIndex].reset();
            });
        };
        /**
         * 展示本局获得免费机会
         * */
        GameScene.prototype.showFreeChange = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.spinResp.payload.getFeatureChance) {
                    game.SoundPlayer.playEffect("ROT_243_Get_FreeGame_mp3");
                    _this.setFreeChooseCount(true);
                    //免费游戏文字帧动画
                    _this.freeTxt.visible = true;
                    _this.freeTxtAni.play();
                    _this.freeTxtAni.loop = 1;
                    _this.freeTxtAni.once(game.AMovieClip.COMPLETE, function () {
                        resolve();
                        _this.freeTxt.visible = false;
                    }, _this);
                }
                else {
                    resolve();
                }
            });
        };
        /**
         * bonus图标动画
         * */
        GameScene.prototype.showBonusLine = function () {
            var _this = this;
            var grids = this.spinResp.payload.featureData.featureBonusData.grid;
            var gold = this.spinResp.payload.featureData.featureBonusData.gold;
            gold > 0 && game.SoundPlayer.playEffect("ROT_243_Bonus_mp3");
            return Promise.all(gold > 0 ? grids.map(function (value, column) {
                return new Promise(function (res, rej) {
                    if (value == -1) {
                        res();
                    }
                    else {
                        var gridIndex = value + column * 3;
                        _this.particleBg.visible = true;
                        _this.symbols[gridIndex].imgWinAni(400, false, gold.toFixed(2)).then(function () { return res(); });
                    }
                });
            }) : []);
        };
        /**
         * 各单线中奖展示
         * */
        GameScene.prototype.showEveryLineGrid = function (arr) {
            var _this = this;
            this.setState(game.GameState.SHOW_SINGLE_LINES);
            //去掉scatter线
            arr.forEach(function (v, i) { v.symbol == "0" && arr.splice(i, 1); });
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var singleLineShow, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            singleLineShow = function (v, lineIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var lineTxt;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            lineTxt = v.gold.toFixed(2);
                                            return [4 /*yield*/, Promise.all(v.winCard.map(function (value, column) { return _this.symbols[value + column * 3].imgWinAni(400, false, lineTxt); }))];
                                        case 1:
                                            _a.sent();
                                            console.log("第" + lineIndex + "条中奖线展示完成", v);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < arr.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, singleLineShow(arr[i], i)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            this.particleBg.visible = false;
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * 停止中奖展示
         * */
        GameScene.prototype.cancelLinesWin = function () {
            var _this = this;
            this.setState(game.GameState.BET);
            this.lineWinTxt.visible = false;
            this.particleBg.visible = false;
            this.lineWinTxt.text = "";
            this.symbols.forEach(function (symbol) { return symbol.reset(); });
            if (this.isFree) {
                if (this.freeSpinRemainCount == 0) {
                    this.showFreeTotalWin(this.spinResp.payload.featureData.featureRoundGold);
                }
                else {
                    this.setState(game.GameState.BET);
                    this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
                    setTimeout(function () {
                        if (_this.state == game.GameState.BET)
                            _this.spin();
                    }, 1000);
                }
            }
            else {
                this.setState(game.GameState.BET);
                if (this.autoMax) {
                    this.bottomBar.setAutoBetNum(-1);
                }
                else if (this.autoCount > 0) {
                    this.bottomBar.setAutoBetNum(--this.autoCount);
                }
                if (this.autoMax || this.autoCount > 0) {
                    setTimeout(function () {
                        if (_this.state == game.GameState.BET)
                            _this.spin();
                    }, 1000);
                }
            }
        };
        // -------------------- 免费游戏显示  ------------------------
        /**
         * 显示免费游戏选择的ui
         * */
        GameScene.prototype.showFreeChoose = function (b) {
            this.freeTotalWin.visible = false;
            if (b)
                this.freeChoose.show();
            this.updateBgm();
        };
        /**
         * 显示免费游戏的ui
         * */
        GameScene.prototype.showFreeGame = function (b) {
            var _this = this;
            this.freeTotalWin.visible = false;
            this.bg.visible = !b;
            this.bgFree.visible = b;
            this.bgAlpha(b);
            this.freeMultiGroup.visible = b;
            this.setFreeChooseCount();
            this.initStar(b);
            this.setState(game.GameState.BET);
            this.updateBgm();
            this.wildShow(b);
            setTimeout(function () {
                if (b) {
                    _this.spin();
                }
                else {
                    if (_this.autoMax || _this.autoCount > 0)
                        _this.spin();
                }
            }, 500);
        };
        /**
         * wild图标显示
        */
        GameScene.prototype.wildShow = function (isFree) {
            var _this = this;
            this.symbols && this.symbols.forEach(function (v) {
                v.value == "1" && (v.tile.source = isFree ? ("symbolName_1_" + _this.buff + "_png") : "symbolName_1_png");
            });
        };
        /**
         * 刷新免费选择次数
         * */
        GameScene.prototype.setFreeChooseCount = function (isAn) {
            var _this = this;
            if (isAn === void 0) { isAn = false; }
            egret.Tween.removeTweens(this.freeChooseCountBoom);
            this.freeChooseCountBoom.x = 960;
            this.freeChooseCountBoom.y = 540;
            this.freeChooseCountBoom.source = "feiqiu_png";
            var isShow = this.featureChanceCount > 0;
            if (isAn) {
                isShow && egret.Tween.get(this.freeChooseCountBoom)
                    .call(function () { return _this.freeChooseCountBoom.visible = true; })
                    .to({ x: 1352, y: 128 }, 1000)
                    .to({ scaleX: 1.2, scaleY: 1.2 }, 10)
                    .call(function () {
                    _this.freeChooseCountTxt.text = "x" + _this.featureChanceCount;
                    _this.freeChooseCountTxt.visible = isShow;
                    _this.freeChooseCountBoom.sources = "zz_|1-61|_png";
                    _this.freeChooseCountBg.visible = isShow;
                    _this.freeChooseCountBoom.play();
                    setTimeout(function () {
                        _this.freeChooseCountBoom.stop();
                        _this.freeChooseCountBoom.visible = false;
                    }, 1000);
                });
            }
            else {
                this.freeChooseCountBg.visible = isShow;
                this.freeChooseCountTxt.visible = isShow;
                isShow && (this.freeChooseCountTxt.text = "x" + this.featureChanceCount);
            }
        };
        /**
         * 显示免费的倍数
         * */
        GameScene.prototype.freeMultiAni = function (mul, isStart) {
            var _this = this;
            if (isStart === void 0) { isStart = true; }
            this.freeMulti.visible = isStart;
            this.freeMulitLight.visible = isStart;
            this.freeNoMulit.visible = !isStart;
            //倍数
            if (isStart) {
                this.freeMulti.text = "x" + mul;
                this.freeMulitLight.loop = 1;
                this.freeMulitLight.play();
                this.freeMulitLight.once(game.AMovieClip.COMPLETE, function () {
                    _this.freeMulitLight.visible = false;
                }, this);
            }
            ;
        };
        /**
         * 进入免费结算面板，显示免费总奖励
         * */
        GameScene.prototype.showFreeTotalWin = function (n) {
            this.freeTotalWin.showTotalWin(n);
            this.freeMultiAni(this.featureMultiplier, false);
        };
        /**
         * 免费结算完成
         * */
        GameScene.prototype.freeComplete = function () {
            if (this.featureChanceCount > 0) {
                this.showFreeChoose(true);
            }
            else {
                this.autoCount = 0;
                this.autoMax = false;
                this.bottomBar.setAutoBetNum(0);
                this.isFree = false;
                this.showFreeGame(false);
                this.bottomBar.setFree(false);
                this.setState(game.GameState.BET);
            }
        };
        return GameScene;
    }(game.BaseUI));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene", ["game.INotify"]);
    /**
     * 图标动画类
     * */
    var Symbol = (function () {
        function Symbol(tile, gameScene) {
            this.tile = tile;
            this.gameScene = gameScene;
        }
        /**
         * 设置图标结果
         * */
        Symbol.prototype.setTexture = function (v) {
            this.tile.source = v;
        };
        /**
         * 图标中奖动画
        */
        Symbol.prototype.imgWinAni = function (waitTime, isLong, lineWinTxt) {
            var _this = this;
            if (isLong === void 0) { isLong = true; }
            var src = "";
            if (this.value == "0") {
                src = "0_|1-10|_png";
            }
            else if (this.value == "1") {
                src = this.gameScene.buff != "-1" ? "free" + this.gameScene.buff + "_|1-20|_png" : "1_|1-20|_png";
            }
            else {
                src = "2_|1-20|_png";
            }
            return new Promise(function (res, rej) {
                egret.Tween.get(_this.tile).call(function () {
                    _this.mc = new game.AMovieClip();
                    _this.mc.sources = src;
                    _this.mc.speed = 5;
                    _this.mc.x = _this.tile.x - 88;
                    _this.mc.y = _this.tile.y - 92;
                    _this.mc.scaleX = 1.4;
                    _this.mc.scaleY = 1.4;
                    _this.mc.width = 280;
                    _this.mc.height = 280;
                    _this.gameScene.particleBg.visible = true;
                }).wait(waitTime).call(function () {
                    // (this.gameScene["winGridGroup"] as eui.Group).addChild(this.tile);
                    _this.gameScene["winGridGroup"].addChild(_this.mc);
                    !isLong && (_this.gameScene.lineWinTxt.visible = true);
                    !isLong && lineWinTxt && (_this.gameScene.lineWinTxt.text = lineWinTxt);
                    _this.mc.play();
                    _this.mc.loop = isLong ? 3 : 2;
                    if (_this.value == "0")
                        _this.tile.visible = false;
                    _this.mc.once(game.AMovieClip.COMPLETE, function () {
                        _this.tile.visible = true;
                        _this.mc.visible = false;
                        _this.mc.parent.removeChild(_this.mc);
                        // (this.gameScene["winGridGroup"] as eui.Group).removeChild(this.tile);
                        _this.mc = null;
                        !isLong && (_this.gameScene.lineWinTxt.visible = false);
                        _this.gameScene.particleBg.visible = false;
                        egret.Tween.removeTweens(_this.tile);
                        res();
                    }, _this);
                });
            });
        };
        /**
         * 停止动画
         * */
        Symbol.prototype.reset = function () {
            if (this.mc) {
                this.mc.stop();
                this.mc.visible = false;
                this.mc.parent && this.mc.parent.removeChild(this.mc);
                this.mc = null;
            }
            if (this.value == "1") {
                this.tile.source = this.gameScene.buff == "-1" ? "symbolName_1_png" : ("symbolName_1_" + this.gameScene.buff + "_png");
            }
            this.tile.visible = true;
            if (this.tile.parent != this.gameScene.valueTiles)
                this.gameScene.valueTiles.addChild(this.tile);
        };
        return Symbol;
    }());
    __reflect(Symbol.prototype, "Symbol");
})(game || (game = {}));
