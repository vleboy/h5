var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var UIManager = (function () {
        function UIManager() {
        }
        UIManager.openUI = function (ui, layer) {
            if (layer === void 0) { layer = 2; }
            game.LayerManager.getInstance().addUI(ui, layer);
            this.uiDic.setValue(egret.getQualifiedClassName(ui), ui);
        };
        UIManager.closeUI = function (ui) {
            if (!ui)
                return;
            this.uiDic.removeKey(name);
            if (ui.parent)
                ui.parent.removeChild(ui);
        };
        UIManager.onStageResize = function () {
            if (this.uiDic) {
                var uis = this.uiDic.getAllValue().forEach(function (v) { v.onStageResize(); }, this);
            }
        };
        UIManager.uiDic = new game.Dictionary();
        return UIManager;
    }());
    game.UIManager = UIManager;
    __reflect(UIManager.prototype, "game.UIManager");
})(game || (game = {}));
//# sourceMappingURL=UIManager.js.map