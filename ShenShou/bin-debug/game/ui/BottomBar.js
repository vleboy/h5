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
    var BottomBar = (function (_super) {
        __extends(BottomBar, _super);
        function BottomBar() {
            var _this = _super.call(this) || this;
            /**自动的次数*/
            _this.autoCount = 0;
            /**赢得钱*/
            _this.winNum = 0;
            _this.skinName = game.GlobalConfig.skinPath + "bottomSkin.exml";
            return _this;
        }
        BottomBar.prototype.setFree = function (b) {
            b && !this.isFree && (this.freeAuto = this.isAuto);
            this.isAuto = b;
            !b && (this.isAuto = false);
            !b && (this.autoNum.text = this.autoCount >= 0 ? (this.autoCount + "") : "MAX");
            this.autoImg.source = b ? "Free_png" : "Auto_1_png";
            this.isFree = b;
            this.autoState();
            !b && this.showAutoBtn(!this.isAuto);
        };
        /**初始化*/
        BottomBar.prototype.init = function () {
            this.initData();
            this.eventListen();
        };
        /**初始化数据*/
        BottomBar.prototype.initData = function () {
            this.isAuto = false;
            this.isFree = false;
            this.freeAuto = false;
            this.autoCount = 0;
        };
        /**事件监听*/
        BottomBar.prototype.eventListen = function () {
            var _this = this;
            this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.isAuto) {
                    _this.sendNotify(game.NotifyConst.cancelSpin);
                }
                else {
                    game.SoundPlayer.playEffect("ShenShou_243_Spin_mp3");
                    _this.sendNotify(game.NotifyConst.spin);
                    _this.imgSpin();
                    _this.setWinMoney(0.00);
                    _this.hideCutGroup(true);
                }
            }, this);
            this.registerEvent(this.stopSpinBtn, egret.TouchEvent.TOUCH_TAP, function () { _this.sendNotify(game.NotifyConst.cancelSpin); }, this);
            this.registerEvent(this.helpBtn, egret.TouchEvent.TOUCH_TAP, function () {
                _this.sendNotify(game.NotifyConst.openHelp, _this.theBetArr[_this.theBetIndex]);
                _this.hideCutGroup();
            }, this);
            ["max", "100", "50", "20", "10"].forEach(function (v) {
                _this.registerEvent(_this["btn_" + v], egret.TouchEvent.TOUCH_TAP, _this.touchAutoNum, _this);
            });
            this.registerEvent(this.betBtn, egret.TouchEvent.TOUCH_TAP, this.chooseBetLevel, this);
            this.registerEvent(this.autoBtn, egret.TouchEvent.TOUCH_TAP, this.touchAuto, this);
            this.registerEvent(this.cancelAutoBtn, egret.TouchEvent.TOUCH_TAP, this.touchCancelAuto, this);
            this.registerEvent(this.BtnLess, egret.TouchEvent.TOUCH_TAP, this.reduceBetLevel, this);
            this.registerEvent(this.BtnMore, egret.TouchEvent.TOUCH_TAP, this.addBetLevel, this);
            this.registerEvent(this.BtnMax, egret.TouchEvent.TOUCH_TAP, this.maxBetLevel, this);
        };
        /**某Group显示隐藏动画*/
        BottomBar.prototype.showTween = function (group, btm) {
            return new Promise(function (res, rej) {
                egret.Tween.get(group).to({ bottom: btm }, 400).call(function () {
                    egret.Tween.removeTweens(group);
                    res();
                });
            });
        };
        /**点击自动转到次数按钮*/
        BottomBar.prototype.touchAutoNum = function (e) {
            var _this = this;
            var str = e.target.name.split("_")[1];
            this.sendNotify(game.NotifyConst.spin, str);
            str == "max" ? this.setAutoBetNum(-1) : this.setAutoBetNum(+str);
            this.showAutoBtn(false);
            this.isAuto = true;
            this.showTween(this.groupAutoNum, -400).then(function () { return _this.groupAutoNum.visible = false; });
            this.autoState();
        };
        /**是否显示自动转动按钮*/
        BottomBar.prototype.showAutoBtn = function (isShow) {
            this.autoBtn.visible = isShow;
            this.cancelAutoBtn.visible = !isShow;
        };
        /**点击单注*/
        BottomBar.prototype.chooseBetLevel = function () {
            var _this = this;
            var betShow = function () {
                _this.hideCutGroup();
                _this.groupBet.visible = true;
                _this.showTween(_this.groupBet, 126).then(function () { return game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic1_mp3"); });
            };
            this.groupBet.visible ? this.showTween(this.groupBet, -100).then(function () {
                _this.groupBet.visible = false;
                game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic2_mp3");
            }) : betShow();
        };
        /**校验加减号状态和设置单注下注档次*/
        BottomBar.prototype.checkPlusReduceState = function () {
            this.BtnLess.enabled = this.theBetIndex != 0;
            this.BtnMore.enabled = this.theBetIndex != this.theBetArr.length - 1;
            this.betTxt.text = this.theBetArr[this.theBetIndex].toFixed(2);
            this.theBet.text = "单注：" + this.theBetArr[this.theBetIndex].toFixed(2);
            this.allBet.text = "总押注：" + (this.theBetArr[this.theBetIndex] * this.theBetMulit).toFixed(2);
            this.sendNotify(game.NotifyConst.betLevelIndex, this.theBetIndex);
        };
        /**单注增加*/
        BottomBar.prototype.addBetLevel = function () {
            game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic1_mp3");
            this.theBetIndex < this.theBetArr.length - 1 && this.theBetIndex++;
            this.checkPlusReduceState();
        };
        /**单注减少*/
        BottomBar.prototype.reduceBetLevel = function () {
            game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic1_mp3");
            this.theBetIndex > 0 && this.theBetIndex--;
            this.checkPlusReduceState();
        };
        /**单注最大*/
        BottomBar.prototype.maxBetLevel = function () {
            game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic1_mp3");
            this.theBetIndex = this.theBetArr.length - 1;
            this.checkPlusReduceState();
        };
        /**自动转动*/
        BottomBar.prototype.touchAuto = function () {
            var _this = this;
            var autoShow = function () {
                _this.hideCutGroup();
                _this.groupAutoNum.visible = true;
                _this.showTween(_this.groupAutoNum, 107).then(function () { return game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic1_mp3"); });
            };
            this.groupAutoNum.visible ? this.showTween(this.groupAutoNum, -400).then(function () {
                _this.groupAutoNum.visible = false;
                game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic2_mp3");
            }) : autoShow();
        };
        /**隐藏切入框*/
        BottomBar.prototype.hideCutGroup = function (isSound) {
            var _this = this;
            if (isSound === void 0) { isSound = false; }
            this.groupBet.visible && this.showTween(this.groupBet, -100).then(function () {
                _this.groupBet.visible = false;
                isSound && game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic2_mp3");
            });
            this.groupAutoNum.visible && this.showTween(this.groupAutoNum, -400).then(function () {
                _this.groupAutoNum.visible = false;
                isSound && game.SoundPlayer.playEffect("ShenShou_243_GUI_Generic2_mp3");
            });
        };
        /**取消自动转动*/
        BottomBar.prototype.touchCancelAuto = function () {
            this.sendNotify(game.NotifyConst.cancelAutoSpin);
            this.isAuto = false;
            this.showAutoBtn(true);
        };
        /**是不是自动状态*/
        BottomBar.prototype.autoState = function () {
            this.spinArrow.visible = !this.isAuto;
            this.stopSpinBtn.visible = !this.isAuto;
            this.groupAuto.visible = this.isAuto;
        };
        /**获得派彩的动画*/
        BottomBar.prototype.payout = function (mon) {
            var _this = this;
            this.winNum = 0;
            egret.Tween.get(this, { onChange: function () { _this.winTxt.text = _this.winNum.toFixed(2); }, onChangeObj: this })
                .to({ winNum: mon }, 800)
                .call(function () { egret.Tween.removeTweens(_this); });
            egret.Tween.get(this.winTxt)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 400)
                .to({ scaleX: 1, scaleY: 1 }, 400)
                .call(function () { egret.Tween.removeTweens(_this.winTxt); });
            var imgLight = function (img, alphaArr, timer, isline) {
                img.visible = true;
                img.alpha = 0;
                egret.Tween.get(img)
                    .to({ alpha: alphaArr[0] }, timer)
                    .to({ alpha: alphaArr[1] }, timer)
                    .call(function () {
                    if (isline) {
                        egret.Tween.removeTweens(img);
                        img.visible = false;
                    }
                })
                    .to({ alpha: alphaArr[2] }, timer)
                    .to({ alpha: alphaArr[3] }, timer)
                    .call(function () {
                    egret.Tween.removeTweens(img);
                    img.visible = false;
                });
            };
            imgLight(this.winLight, [1, .5, 1, 0], 200);
            imgLight(this.btmLight, [.7, 0], 400, true);
        };
        /**图片旋转
         * @param isStop 是不是停止动画
        */
        BottomBar.prototype.imgSpin = function (isStop) {
            if (isStop === void 0) { isStop = false; }
            isStop ? egret.Tween.removeTweens(this.spinArrow) : egret.Tween.get(this.spinArrow).to({ rotation: 360 }, 500);
        };
        /**单注数据和倍数
         * @param betArr 单注数字数组
         * @param index 当前注在数组的下标
         * @param mulit 倍数
        */
        BottomBar.prototype.setBetData = function (betArr, index, mulit) {
            if (betArr)
                this.theBetArr = betArr;
            if (index != undefined)
                this.theBetIndex = index;
            if (mulit != undefined)
                this.theBetMulit = mulit;
            this.checkPlusReduceState();
        };
        /**赢得钱*/
        BottomBar.prototype.setWinMoney = function (mon) {
            if (!mon)
                return;
            this.winTxt.text = mon + "";
            this.payout(mon);
        };
        /**转动按钮显示*/
        BottomBar.prototype.spinBtnShow = function (isShow, isEn) {
            if (isShow === void 0) { isShow = true; }
            if (isEn === void 0) { isEn = true; }
            this.spinBtn.visible = this.isAuto ? true : isShow;
            this.spinBtn.enabled = isEn;
            this.stopSpinBtn.visible = this.isAuto ? false : !isShow;
            this.spinArrow.visible = this.isAuto ? false : isShow;
        };
        /**控制游戏状态 */
        BottomBar.prototype.setState = function (n) {
            var _this = this;
            this.state = n;
            /**下注按钮和自动转动按钮状态*/
            var betAutoState = function (isBetEn, isAutoEn) {
                if (isBetEn === void 0) { isBetEn = true; }
                if (isAutoEn === void 0) { isAutoEn = true; }
                _this.betBtn.enabled = isBetEn;
                _this.autoBtn.enabled = isAutoEn;
            };
            this.autoState();
            switch (n) {
                case game.GameState.BET:
                    this.isFree ? betAutoState(false, false) : betAutoState();
                    this.spinBtnShow();
                    break;
                case game.GameState.SPINNING:
                    this.winTxt.text = "0.00";
                    this.isFree ? betAutoState(false, false) : betAutoState(false, false);
                    this.spinBtnShow(true, false);
                    if (this.isAuto)
                        this.spinBtn.enabled = false;
                    break;
                case game.GameState.SHOW_RESULT:
                    this.isFree ? betAutoState(false, false) : betAutoState(false);
                    this.spinBtnShow(true, false);
                    if (this.isAuto)
                        this.spinBtn.enabled = false;
                    break;
                case game.GameState.STOP:
                case game.GameState.SHOW_SINGLE_LINES:
                    this.isFree ? betAutoState(false, false) : betAutoState(false, false);
                    this.imgSpin(true);
                    this.spinBtnShow(false);
                    if (this.isAuto)
                        this.spinBtn.enabled = true;
                    break;
            }
        };
        /**自动下注次数*/
        BottomBar.prototype.setAutoBetNum = function (num) {
            this.showAutoBtn(num == 0);
            if (this.isAuto && this.cancelAutoBtn.visible)
                this.cancelAutoBtn.enabled = true;
            this.isAuto = num != 0;
            this.autoCount = num;
            this.autoNum.text = num >= 0 ? (num + "") : "MAX";
            if (num == 0)
                this.spinBtnShow();
        };
        /**免费下注次数*/
        BottomBar.prototype.setFreeBetNum = function (num) {
            if (this.cancelAutoBtn.visible)
                this.cancelAutoBtn.enabled = false;
            this.autoNum.text = num + "";
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        BottomBar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BottomBar;
    }(game.BaseUI));
    game.BottomBar = BottomBar;
    __reflect(BottomBar.prototype, "game.BottomBar");
})(game || (game = {}));
//# sourceMappingURL=BottomBar.js.map