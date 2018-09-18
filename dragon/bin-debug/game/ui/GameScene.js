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
            this.initTitle();
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
        /**
         * 初始事件监听
         * */
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
                game.SoundPlayer.playMusic("freeGame_mp3");
            }
            else {
                if (this.freeChoose.visible) {
                    game.SoundPlayer.playMusic("featureChoose_mp3");
                }
                else {
                    game.SoundPlayer.playMusic("normalGame_mp3");
                }
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
                    this.bottomBar.setAutoBetNum(this.freeSpinRemainCount);
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
            if (this.balance < this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]) {
                console.log("余额不足");
                this.stage.addChild(new game.ErrTip("余额不足", function () { }, this));
                return;
            }
            var txt = (+this.theBalance - this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]).toFixed(2);
            this.topBar.setBalance(txt);
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
            var _this = this;
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
            this.stopRoll(resp.payload.viewGrid).then(function () {
                var balance = resp.payload.userBalance;
                _this.topBar.setBalance(balance, resp.payload.totalGold);
                _this.theBalance = balance;
            });
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
            this.rollChannel = game.SoundPlayer.playEffect("Roll_mp3", -1);
            for (var i = 0; i < 15; i++) {
                this["tile" + i].visible = false;
            }
            for (var i = 0; i < 5; i++) {
                this.singleColumRoll(i);
            }
            this.thePArr && this.thePArr.length > 0 && this.freeMultiAni(this.featureMultiplier, false);
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
                        tile.y -= 208 * 4;
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
                                _this["vagueTile" + (column * 4 + i)].y = 21 + i * 208;
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
                                game.SoundPlayer.playEffect("Scatter_" + (column + 1) + "_mp3");
                            game.SoundPlayer.playEffect("RollStop_mp3");
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
            game.SoundPlayer.playEffect("Scatter_wait_mp3");
            return new Promise(function (resolve, reject) {
                _this["border" + column].visible = true;
                _this["border" + column].play();
                var startX = _this["tile" + column * 3].x + _this["tile" + column * 3].width / 2;
                var startY = _this["tile" + column * 3].y;
                var c = new egret.DisplayObjectContainer();
                _this["freeCoinsGroup"].addChild(c);
                var arr = [];
                var createCoins = function () {
                    for (var i = 0; i < 4; i++) {
                        var mc = new game.AMovieClip();
                        mc.sources = "coin_pin_|1-9|_png";
                        mc.width = mc.height = 20;
                        mc.anchorOffsetX = 10;
                        mc.anchorOffsetY = 10;
                        mc.rotation = Math.random() * 360;
                        mc.play();
                        mc["speed"] = Math.round(Math.random() * 6 + 3);
                        mc["alphaSpeed"] = Math.round(Math.random() * 0.02 + 0.01);
                        mc.x = startX + (0.5 - Math.random()) * (_this["tile" + column * 3].width);
                        c.addChild(mc);
                        arr.push(mc);
                    }
                };
                var index = 0;
                egret.Tween.get(_this["freeCoinsGroup"], { loop: true })
                    .wait(20)
                    .call(function () {
                    if (index++ % 10 == 0) {
                        createCoins();
                    }
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
            if (this.freeColumnTimeout)
                clearTimeout(this.freeColumnTimeout);
            for (var i = 0; i < 20; i++) {
                egret.Tween.removeTweens(this["vagueTile" + i]);
                this["vagueTile" + i].visible = false;
                this["vagueTile" + i].y = (i % 4) * 208 + 21;
            }
            var viewGrid = this.spinResp.payload.viewGrid;
            for (var i = 0; i < 15; i++) {
                egret.Tween.removeTweens(this.symbols[i].tile);
                this.symbols[i].value = this.spinResp.payload.viewGrid[i];
                this.symbols[i].tile.visible = true;
                this.symbols[i].tile.y = (i % 3) * 208 + 21;
                var str = viewGrid[i] == "1" ? "1" + (this.buff == "-1" ? "" : "_" + this.buff) : viewGrid[i];
                this.symbols[i].setTexture("symbolName_" + str + "_png");
            }
            this.border2.stop();
            this.border3.stop();
            this.border4.stop();
            this.border2.visible = false;
            this.border3.visible = false;
            this.border4.visible = false;
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
                            this.bottomBar.setAutoBetNum(this.freeSpinRemainCount);
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
                    game.SoundPlayer.playEffect("SmallWin_mp3");
                    resolve();
                }
                else if (level == "middle") {
                    game.SoundPlayer.playEffect("MiddleWin_mp3");
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
            return Promise.all(grids.map(function (v) {
                return _this.symbols[v].showWinAni();
            }));
        };
        /**
         * scatter图标动画
         * */
        GameScene.prototype.showScatterLine = function () {
            var _this = this;
            if (this.spinResp.payload.getFeatureChance) {
                this.lineWinTxt.visible = true;
                this.lineWinTxt.text = this.spinResp.payload.scatterGold.toFixed(2);
            }
            return Promise.all(this.spinResp.payload.getFeatureChance ? this.spinResp.payload.scatterGrid.map(function (value, column) {
                var gridIndex = value + column * 3;
                return _this.symbols[gridIndex].showWinAni(false);
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
                    game.SoundPlayer.playEffect("Get_FreeGame_mp3");
                    _this.freeChanceGroup.visible = true;
                    _this.freeChangeMc.play();
                    _this.setFreeChooseCount(true);
                    egret.Tween.get(_this.freeChangeImg)
                        .set({ scaleX: 3, scaleY: 3 })
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .wait(3000)
                        .call(function () {
                        egret.Tween.removeTweens(_this.freeChangeImg);
                        _this.freeChanceGroup.visible = false;
                        resolve();
                    });
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
            gold > 0 && game.SoundPlayer.playEffect("Bonus_mp3");
            return Promise.all(gold > 0 ? grids.map(function (value, column) {
                return new Promise(function (res, rej) {
                    if (value == -1) {
                        res();
                    }
                    else {
                        _this.lineWinTxt.visible = true;
                        _this.lineWinTxt.text = gold.toFixed(2);
                        var gridIndex_1 = value + column * 3;
                        var target_1 = _this["tile" + gridIndex_1];
                        _this.particleBg.visible = true;
                        //红包动画
                        var mc_1 = new game.AMovieClip();
                        mc_1.sources = "T_hongbao_|1-16|_png";
                        mc_1.x = target_1.x;
                        mc_1.y = target_1.y;
                        _this["winGridGroup"].addChild(mc_1);
                        target_1.visible = false;
                        mc_1.loop = 2;
                        mc_1.play();
                        /**喷金币 */
                        var coins_1 = [];
                        var flag_1 = 0;
                        var createCoins_1 = function () {
                            var coin = new game.AMovieClip();
                            coin.sources = "SU_Coin_Gold_3x3_|1-9|_png";
                            coin.x = target_1.x + target_1.width / 2;
                            coin.y = target_1.y + 70;
                            coin.width = coin.height = 30;
                            coin.anchorOffsetX = coin.anchorOffsetY = 15;
                            coin["speedx"] = Math.round((Math.random() * 10 - 5));
                            coin["speedy"] = -Math.round((Math.random() * 7 + 7));
                            coin["count"] = 0;
                            _this["bonusEffectGroup"].addChild(coin);
                            coins_1.push(coin);
                            coin.play();
                        };
                        egret.Tween.get(_this["bonusEffectGroup"], { loop: true })
                            .wait(30)
                            .call(function () {
                            if (++flag_1 % 3 == 0)
                                createCoins_1();
                            coins_1.forEach(function (v, i) {
                                v.x += v["speedx"];
                                v.y += v["speedy"];
                                v["speedy"]++;
                                if (++v.count > 24) {
                                    v.stop();
                                    v.parent.removeChild(v);
                                    coins_1.splice(i, 1);
                                }
                            });
                        });
                        //粒子发散效果
                        var texture = RES.getRes("star_png");
                        var cfg = RES.getRes("bonusParticle_json");
                        var p_1 = new particle.GravityParticleSystem(texture, cfg);
                        p_1.blendMode = egret.BlendMode.ADD;
                        p_1.emitterX = target_1.x + target_1.width / 2;
                        p_1.emitterY = target_1.y + 70;
                        _this["bonusEffectGroup"].addChild(p_1);
                        p_1.start();
                        mc_1.once(game.AMovieClip.COMPLETE, function () {
                            mc_1.parent.removeChild(mc_1);
                            _this["tile" + gridIndex_1].visible = true;
                            _this.particleBg.visible = false;
                            _this.lineWinTxt.visible = false;
                            egret.Tween.removeTweens(_this["bonusEffectGroup"]);
                            while (coins_1.length > 0) {
                                coins_1.pop().stop();
                            }
                            _this["bonusEffectGroup"].removeChildren();
                            if (p_1) {
                                p_1.stop();
                                if (p_1.parent)
                                    p_1.parent.removeChild(p_1);
                            }
                            res();
                        }, _this);
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
            arr.forEach(function (v, i) {
                v.symbol == "0" && arr.splice(i, 1);
            });
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var singleLineShow, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            singleLineShow = function (v, lineIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.lineWinTxt.visible = true;
                                            this.lineWinTxt.text = v.gold.toFixed(2);
                                            return [4 /*yield*/, Promise.all(v.winCard.map(function (value, column) {
                                                    return _this.symbols[value + column * 3].showWinAni(false);
                                                }))];
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
            this.particleBg.visible = false;
            this.lineWinTxt.visible = false;
            this.particleBg.visible = false;
            this.lineWinTxt.text = "";
            this.symbols.forEach(function (symbol) {
                symbol.reset();
            });
            if (this.isFree) {
                if (this.freeSpinRemainCount == 0) {
                    this.showFreeTotalWin(this.spinResp.payload.featureData.featureRoundGold);
                }
                else {
                    this.bottomBar.setAutoBetNum(this.freeSpinRemainCount);
                    this.setState(game.GameState.BET);
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
            this.freeChoose.visible = b;
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
            this.freeCountBg.visible = b;
            this.setFreeChooseCount();
            this.setState(game.GameState.BET);
            this.updateBgm();
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
         * 刷新免费选择次数
         * */
        GameScene.prototype.setFreeChooseCount = function (isAn) {
            var _this = this;
            if (isAn === void 0) { isAn = false; }
            this.freeChooseCountBoom.sources = "zz_|1-61|_png";
            egret.Tween.removeTweens(this.freeChooseCountBoom);
            this.freeChooseCountBoom.scaleX = 1;
            this.freeChooseCountBoom.scaleY = 1;
            this.freeChooseCountBoom.x = 960;
            this.freeChooseCountBoom.y = 540;
            var isShow = this.featureChanceCount > 0;
            if (isAn) {
                isShow && egret.Tween.get(this.freeChooseCountBoom)
                    .call(function () { return _this.freeChooseCountBoom.visible = true; })
                    .to({ scaleX: 0.3, scaleY: 0.3, x: 1727, y: 187 }, 1000)
                    .to({ scaleX: 1.2, scaleY: 1.2 }, 10)
                    .call(function () {
                    _this.freeChooseCountBoom.play();
                    _this.freeChooseCountTxt.text = "x" + _this.featureChanceCount;
                    _this.freeChooseCountBg.visible = isShow;
                    _this.freeChooseCountTxt.visible = isShow;
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
            if (isStart) {
                this.freeMultiGroup.visible = true;
                //倍数
                this.freeMulti.text = "X" + mul;
                var theParticle = function (texture, cfg, index, isLight) {
                    var theP = new particle.GravityParticleSystem(texture, cfg);
                    _this.freeMultiGroup.addChildAt(theP, index);
                    theP.emitterX = 100;
                    theP.emitterY = 70;
                    isLight && (theP.blendMode = egret.BlendMode.ADD);
                    theP.start();
                    return theP;
                };
                this.thePArr = [];
                //光晕效果
                this.thePArr.push(theParticle(RES.getRes("freemultiLight_png"), RES.getRes("particle_multiLight_json"), 0, true));
                //粒子发散效果
                this.thePArr.push(theParticle(RES.getRes("freemulti_png"), RES.getRes("particle_multi_json"), 1));
            }
            else {
                this.thePArr.forEach(function (v) {
                    v.stop();
                    v.visible = false;
                    v.parent && v.parent.removeChild(v);
                });
                this.thePArr = [];
                this.freeMultiGroup.visible = false;
            }
        };
        /**
         * 进入免费结算面板，显示免费总奖励
         * */
        GameScene.prototype.showFreeTotalWin = function (n) {
            this.freeTotalWin.showTotalWin(n);
            this.thePArr && this.thePArr.length > 0 && this.freeMultiAni(this.featureMultiplier, false);
        };
        /**
         * 免费结算完成
         * */
        GameScene.prototype.freeComplete = function () {
            if (this.featureChanceCount > 0) {
                this.showFreeChoose(true);
            }
            else {
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
            var texture = RES.getRes("light_lizi01_png");
            var cfg = RES.getRes("particle_json");
            this.p = new particle.GravityParticleSystem(texture, cfg);
            this.p.blendMode = egret.BlendMode.ADD;
            gameScene.particleGroup.addChild(this.p);
            this.p.visible = false;
        }
        /**
         * 设置图标结果
         * */
        Symbol.prototype.setTexture = function (v) {
            this.tile.source = v;
        };
        /**
         * 图标中奖动画 isLong：是否是长动画
         * */
        Symbol.prototype.showWinAni = function (isLong) {
            var _this = this;
            if (isLong === void 0) { isLong = true; }
            return new Promise(function (resolve, reject) {
                _this.gameScene.winGridGroup.addChild(_this.tile);
                //scatter 金币图标
                if (_this.value == "0") {
                    _this.mc = new game.AMovieClip();
                    _this.mc.sources = "T_tongqian_|1-16|_png";
                    _this.mc.speed = 2;
                    _this.mc.x = _this.tile.x;
                    _this.mc.y = _this.tile.y;
                    _this.mc.width = _this.tile.width;
                    _this.mc.height = _this.tile.height;
                    _this.gameScene["winGridGroup"].addChild(_this.mc);
                    _this.mc.play();
                    _this.mc.loop = isLong ? 3 : -1;
                    _this.tile.visible = false;
                    _this.mc.once(game.AMovieClip.COMPLETE, function () {
                        _this.mc.visible = false;
                        _this.tile.visible = true;
                    }, _this);
                }
                else if (_this.value == "1") {
                    _this.mc = new game.AMovieClip();
                    _this.mc.sources = _this.gameScene.buff == "-1" ? "wildAni_|1-16|_png" : ("wildAni_" + _this.gameScene.buff + "_|1-16|_png");
                    _this.mc.speed = 2;
                    _this.mc.x = _this.tile.x - 21;
                    _this.mc.y = _this.tile.y - 29;
                    _this.mc.width = 242;
                    _this.mc.height = 242;
                    _this.gameScene["winGridGroup"].addChild(_this.mc);
                    _this.mc.play();
                    _this.mc.loop = isLong ? 2 : 1;
                    _this.tile.visible = false;
                    _this.mc.once(game.AMovieClip.COMPLETE, function () {
                        _this.mc.visible = false;
                        _this.tile.visible = true;
                    }, _this);
                    _this.mc2 = new game.AMovieClip();
                    _this.mc2.sources = "wildText|1-20|_png";
                    _this.mc2.x = _this.tile.x;
                    _this.mc2.y = _this.tile.y + 99;
                    _this.mc2.speed = 4;
                    _this.mc2.loop = isLong ? 2 : 1;
                    _this.gameScene["winGridGroup"].addChild(_this.mc2);
                    _this.mc2.play();
                }
                _this.gameScene.particleBg.visible = true;
                var p = _this.p;
                var grid = _this.tile;
                p.visible = true;
                p.start();
                p.emitterX = p.emitterY = 0;
                p.x = grid.x;
                p.y = grid.y;
                var f = function () {
                    egret.Tween.get(p)
                        .to({ emitterX: grid.width }, 300)
                        .to({ emitterY: grid.height }, 300)
                        .to({ emitterX: 0 }, 300)
                        .to({ emitterY: 0 }, 300)
                        .call(function () {
                        p.stop();
                        p.visible = false;
                        if (_this.mc && _this.value != "0") {
                            _this.mc.stop();
                            _this.mc.parent.removeChild(_this.mc);
                            _this.mc = null;
                            _this.tile.visible = true;
                        }
                        if (_this.mc2) {
                            _this.mc2.stop();
                            _this.mc2.parent.removeChild(_this.mc2);
                            _this.mc2 = null;
                        }
                        if (_this.value == "1") {
                            _this.tile.source = _this.gameScene.buff != "-1" ? "symbolName_1_" + _this.gameScene.buff + "_png" : "symbolName_1_png";
                        }
                        _this.gameScene.valueTiles.addChild(_this.tile);
                        _this.gameScene.lineWinTxt.visible = false;
                    })
                        .wait(200)
                        .call(function () {
                        egret.Tween.removeTweens(p);
                        resolve();
                    });
                };
                if (isLong) {
                    egret.Tween.get(p)
                        .to({ emitterX: grid.width }, 300)
                        .to({ emitterY: grid.height }, 300)
                        .to({ emitterX: 0 }, 300)
                        .to({ emitterY: 0 }, 300)
                        .call(f);
                }
                else {
                    f();
                }
            });
        };
        /**
         * 停止动画
         * */
        Symbol.prototype.reset = function () {
            if (this.p) {
                this.p.stop();
                this.p.visible = false;
                egret.Tween.removeTweens(this.p);
            }
            if (this.mc) {
                this.mc.stop();
                this.mc.parent.removeChild(this.mc);
                this.mc = null;
            }
            if (this.mc2) {
                this.mc2.stop();
                this.mc2.parent.removeChild(this.mc2);
                this.mc2 = null;
            }
            if (this.value == "1") {
                this.tile.source = (this.gameScene.buff == "-1" ? "symbolName_1_png" : ("symbolName_1_" + this.gameScene.buff + "_png"));
            }
            this.tile.visible = true;
            if (this.tile.parent != this.gameScene.valueTiles)
                this.gameScene.valueTiles.addChild(this.tile);
        };
        return Symbol;
    }());
    __reflect(Symbol.prototype, "Symbol");
})(game || (game = {}));
//# sourceMappingURL=GameScene.js.map