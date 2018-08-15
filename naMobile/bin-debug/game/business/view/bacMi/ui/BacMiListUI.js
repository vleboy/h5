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
    var BacMiListUI = (function (_super) {
        __extends(BacMiListUI, _super);
        function BacMiListUI(m) {
            var _this = _super.call(this, m) || this;
            _this.skinName = game.GlobalConfig.skinPath + "bacMiListSkin.exml";
            return _this;
        }
        /**对象创建完成后执行 */
        BacMiListUI.prototype.initSetting = function () {
            this.ac = new eui.ArrayCollection();
            this.list.dataProvider = this.ac;
            this.list.itemRenderer = game.BacMiListItem;
            this.ac.addItem({});
            this.ac.addItem({});
            this.ac.addItem({});
            this.ac.refresh();
            this.tweenAnimation();
        };
        BacMiListUI.prototype.tweenAnimation = function () {
            var _this = this;
            this.scroller.top = 1500;
            egret.Tween.get(this.scroller).to({ top: 240 }, 300).call(function () { egret.Tween.removeTweens(_this.scroller); });
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        BacMiListUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BacMiListUI;
    }(game.BaseUI));
    game.BacMiListUI = BacMiListUI;
    __reflect(BacMiListUI.prototype, "game.BacMiListUI");
})(game || (game = {}));
//# sourceMappingURL=BacMiListUI.js.map