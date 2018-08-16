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
    var RouUI = (function (_super) {
        __extends(RouUI, _super);
        function RouUI(m) {
            var _this = _super.call(this, m) || this;
            //引用皮肤
            _this.skinName = game.GlobalConfig.skinPath + "rouSkin.exml";
            return _this;
        }
        /**对象创建完成后执行 */
        RouUI.prototype.initSetting = function () {
            this.defaultUI();
            this.listenEvent();
        };
        /** 收到mediator的通知，每个UI要复写这个方法 * */
        RouUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        /**事件注册*/
        RouUI.prototype.listenEvent = function () {
            this.registerEvent(this.groupBets, egret.TouchEvent.TOUCH_TAP, this.betsTouch, this);
        };
        /**默认ui显示*/
        RouUI.prototype.defaultUI = function () {
            this.cancelLight();
        };
        /**下注区点击事件*/
        RouUI.prototype.betsTouch = function (e) {
            var theTou = e.target.name;
            this.betsType(theTou);
        };
        /**下注类型*/
        RouUI.prototype.betsType = function (tou) {
            var touArr = tou.split("_");
            this.cancelLight();
            var lightArr = [];
            switch (touArr[1]) {
                case "column"://列
                    lightArr = this.columnNum(+touArr[2]);
                    break;
                case "dozen"://打
                    lightArr = this.dozenNum(+touArr[2]);
                    break;
                case "small"://小
                    lightArr = this.smallNum();
                    break;
                case "double"://双
                    lightArr = this.singleNum(false);
                    break;
                case "red"://红
                    lightArr = this.redNum();
                    break;
                case "block"://黑
                    lightArr = this.redNum(false);
                    break;
                case "single"://单
                    lightArr = this.singleNum();
                    break;
                case "big"://大
                    lightArr = this.smallNum(false);
                    break;
                default://数字
                    touArr.forEach(function (v, i) { if (i > 0)
                        lightArr.push(+v); });
                    break;
            }
            //显示高亮
            this.betsLight(lightArr);
        };
        /**下注高亮*/
        RouUI.prototype.betsLight = function (touArr) {
            var _this = this;
            touArr.forEach(function (v) { _this["light_" + v].visible = true; });
        };
        /**撤销高亮*/
        RouUI.prototype.cancelLight = function () {
            var _this = this;
            var numArr = this.betsNum();
            numArr.forEach(function (v) { _this["light_" + v].visible = false; });
        };
        //-----------------方法区-----------------
        /**返回轮盘所有下注数字数组*/
        RouUI.prototype.betsNum = function () {
            var numArr = [];
            for (var i = 0; i <= 36; i++) {
                numArr.push(i);
            }
            return numArr;
        };
        /**返回单或双数字数组
         * @param isS 是不是单数字数组
        */
        RouUI.prototype.singleNum = function (isS) {
            if (isS === void 0) { isS = true; }
            var singleArr = [], doubleArr = [];
            for (var i = 1; i <= 36; i++) {
                i % 2 != 0 ? singleArr.push(i) : doubleArr.push(i);
            }
            return isS ? singleArr : doubleArr;
        };
        /**返回红色或黑色数字数组
         * @param isRed 是不是红色
        */
        RouUI.prototype.redNum = function (isRed) {
            if (isRed === void 0) { isRed = true; }
            var redArr = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
            var blockArr = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
            return isRed ? redArr : blockArr;
        };
        /**返回小或大数字数组
         * @param isSmall 是不是小数字数组
        */
        RouUI.prototype.smallNum = function (isSmall) {
            if (isSmall === void 0) { isSmall = true; }
            var smallArr = [], bigArr = [];
            for (var i = 1; i <= 36; i++) {
                i <= 18 ? smallArr.push(i) : bigArr.push(i);
            }
            return isSmall ? smallArr : bigArr;
        };
        /**返回列数字数组
         * @param index 第几列（默认为第一列）
        */
        RouUI.prototype.columnNum = function (index) {
            if (index === void 0) { index = 1; }
            var columnArr = [];
            for (var i = 1; i <= 36; i++) {
                if (i % 3 == index % 3)
                    columnArr.push(i);
            }
            return columnArr;
        };
        /**返回打数字数组
         * @param index 第几打（默认为第一打）
        */
        RouUI.prototype.dozenNum = function (index) {
            if (index === void 0) { index = 1; }
            var dozenArr = [];
            for (var i = 1; i <= 36; i++) {
                if (i <= 12 * index && i > 12 * (index - 1))
                    dozenArr.push(i);
            }
            return dozenArr;
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        RouUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return RouUI;
    }(game.BaseUI));
    game.RouUI = RouUI;
    __reflect(RouUI.prototype, "game.RouUI");
})(game || (game = {}));
//# sourceMappingURL=RouUI.js.map