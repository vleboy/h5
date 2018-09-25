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
    var Rull = (function (_super) {
        __extends(Rull, _super);
        function Rull() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "rullSkin.exml";
            return _this;
        }
        /**初始化*/
        Rull.prototype.init = function () {
            this.defaultData();
            this.eventListen();
            this.defaultUI();
        };
        /**是否显示规则，默认关闭*/
        Rull.prototype.rullShow = function (theBet, isShow) {
            if (isShow === void 0) { isShow = false; }
            this.visible = isShow;
            if (isShow) {
                this.isMove = false;
                this.btnState(0, false);
                this.setOdds(theBet);
                game.SoundPlayer.playEffect("FuYun_243_GUI_Generic1_mp3");
            }
        };
        /**默认数据*/
        Rull.prototype.defaultData = function () {
            this.isMove = false;
            this.pageArr = [0, 1, 2, 3, 4, 5];
            this.startX = 0;
            this.dragDistance = 300;
            this.oddsArr = [
                [800, 100, 50],
                [800, 100, 35],
                [800, 100, 30],
                [300, 50, 20],
                [300, 35, 15],
                [200, 30, 10],
                [200, 20, 10],
                [100, 15, 10],
                [100, 15, 5],
                [100, 10, 5],
                [50, 10, 5],
            ];
        };
        /**默认显示*/
        Rull.prototype.defaultUI = function () {
            this.rullShow(0.01);
            this.ruleScroll.mask = new egret.Rectangle(97, 0, 1726, 1080);
        };
        /**设置赔率*/
        Rull.prototype.setOdds = function (theBet) {
            var _this = this;
            var bet = theBet * 100;
            this.oddsArr.forEach(function (v, i) {
                v.forEach(function (k, j) {
                    _this["pageTxt_" + i + "_" + j].textFlow = [
                        { text: (5 - j) + " ", style: { "textColor": 0xFCC434 } },
                        { text: (k * bet / 100).toFixed(2), style: { "textColor": 0xF1EABD } }
                    ];
                });
            });
        };
        /**事件监听*/
        Rull.prototype.eventListen = function () {
            var _this = this;
            this.pageArr.forEach(function (v) { _this.registerEvent(_this["btnRull" + v], egret.TouchEvent.TOUCH_TAP, _this.toThePage, _this); });
            this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
            this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_END, this.onMove, this);
            this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMove, this);
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, function () {
                _this.rullShow(0.01);
                game.SoundPlayer.playEffect("FuYun_243_GUI_Generic2_mp3");
            }, this);
        };
        /**点击按钮到当前页*/
        Rull.prototype.toThePage = function (e) {
            var tou = e.target.name.split("_")[1];
            this.btnState(+tou);
        };
        /**按钮状态*/
        Rull.prototype.btnState = function (num, isAni, timer, callBack) {
            var _this = this;
            if (isAni === void 0) { isAni = true; }
            if (timer === void 0) { timer = 500; }
            num = Math.floor(num);
            this.pageArr.forEach(function (v) { _this["btnRull" + v].currentState = "up"; });
            this["btnRull" + num].currentState = "down";
            var move = -(num * 1726) + 97;
            isAni ? this.moveAni(move, timer).then(function () {
                callBack && callBack.call(_this);
            }) : this.groupRull.left = move;
        };
        /**滑动动画*/
        Rull.prototype.moveAni = function (move, timer) {
            var _this = this;
            if (timer === void 0) { timer = 500; }
            return new Promise(function (res, rej) {
                egret.Tween.removeTweens(_this.groupRull);
                _this.isMove = true;
                egret.Tween.get(_this.groupRull)
                    .to({ left: move }, timer)
                    .call(function () {
                    egret.Tween.removeTweens(_this.groupRull);
                    _this.isMove = false;
                    res();
                });
            });
        };
        /**手指滑动*/
        Rull.prototype.onMove = function (e) {
            var _this = this;
            if (this.isMove)
                return;
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN://点击开始
                    this.startX = e.localX;
                    this.rullX = this.groupRull.left;
                    break;
                case egret.TouchEvent.TOUCH_MOVE://拖动
                    this.groupRull.left = this.rullX + (e.localX - this.startX);
                    break;
                case egret.TouchEvent.TOUCH_END://翻页或回弹
                    if (this.groupRull.left > 97 || this.groupRull.left < -8533) {
                        this.moveAni(this.rullX, 300).then(function () { return _this.rullX = _this.groupRull.left; });
                    }
                    else {
                        var moveX = this.groupRull.left - this.rullX;
                        var pageDistance = moveX >= 0 ? 1726 : -1726;
                        var theLeft = Math.abs(moveX) < this.dragDistance ? this.rullX : this.rullX + pageDistance;
                        this.btnState(Math.abs((theLeft - 97) / 1726), true, 300, function () { return _this.rullX = _this.groupRull.left; });
                    }
                    break;
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this.moveAni(this.rullX, 300);
                    break;
            }
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        Rull.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return Rull;
    }(game.BaseUI));
    game.Rull = Rull;
    __reflect(Rull.prototype, "game.Rull");
})(game || (game = {}));
//# sourceMappingURL=Rull.js.map