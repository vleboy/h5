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
    var ChipList = (function (_super) {
        __extends(ChipList, _super);
        function ChipList() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "chipListSkin.exml";
            _this.once(egret.Event.COMPLETE, _this.initSetting, _this);
            return _this;
        }
        ChipList.prototype.initSetting = function () {
            console.log("chips initsetting");
        };
        ChipList.prototype.setChips = function (arr) {
            var _this = this;
            var ac = new eui.ArrayCollection();
            arr.unshift("custom");
            arr.reverse();
            ac.source = arr;
            this.list.dataProvider = ac;
            this.list.itemRenderer = ChipItem;
            ac.refresh();
            this.scroller.once(egret.Event.RENDER, function () {
                _this.scroller.viewport.scrollV = _this.scroller.measuredHeight - _this.scroller.height;
            }, this);
        };
        return ChipList;
    }(eui.Component));
    game.ChipList = ChipList;
    __reflect(ChipList.prototype, "game.ChipList");
    var ChipItem = (function (_super) {
        __extends(ChipItem, _super);
        function ChipItem() {
            return _super.call(this) || this;
        }
        ChipItem.prototype.onAdd = function () {
        };
        ChipItem.prototype.dataChanged = function () {
            this.customGroup.visible = this.data == "custom";
            this.chipImg.visible = this.data != "custom";
            this.chipImg.visible && (this.chipImg.source = "chouma" + this.data + "_png");
        };
        ChipItem.prototype.onRemove = function () {
        };
        return ChipItem;
    }(game.AItemRenderer));
    game.ChipItem = ChipItem;
    __reflect(ChipItem.prototype, "game.ChipItem");
})(game || (game = {}));
//# sourceMappingURL=ChipList.js.map