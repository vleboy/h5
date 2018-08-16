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
    var RouListUI = (function (_super) {
        __extends(RouListUI, _super);
        function RouListUI(m) {
            var _this = _super.call(this, m) || this;
            //引用皮肤
            _this.skinName = game.GlobalConfig.skinPath + "rouListSkin.exml";
            return _this;
        }
        /**对象创建完成后执行 */
        RouListUI.prototype.initSetting = function () {
            this.initScroller();
            this.tweenAnimation();
        };
        /** 收到mediator的通知，每个UI要复写这个方法 * */
        RouListUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        /**初始化scroller*/
        RouListUI.prototype.initScroller = function () {
            this.acRou = new eui.ArrayCollection();
            this.listRou.dataProvider = this.acRou;
            this.listRou.itemRenderer = game.RouListItem;
            this.acRou.addItem({});
            this.acRou.refresh();
        };
        /**item出现的动画*/
        RouListUI.prototype.tweenAnimation = function () {
            var _this = this;
            this.scrollerRou.top = 1500;
            egret.Tween.get(this.scrollerRou).to({ top: 240 }, 300).call(function () { egret.Tween.removeTweens(_this.scrollerRou); });
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        RouListUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return RouListUI;
    }(game.BaseUI));
    game.RouListUI = RouListUI;
    __reflect(RouListUI.prototype, "game.RouListUI");
})(game || (game = {}));
//# sourceMappingURL=RouListUI.js.map