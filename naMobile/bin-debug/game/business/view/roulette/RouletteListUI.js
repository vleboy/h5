var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var RouletteListUI = (function () {
        function RouletteListUI() {
        }
        return RouletteListUI;
    }());
    game.RouletteListUI = RouletteListUI;
    __reflect(RouletteListUI.prototype, "game.RouletteListUI");
})(game || (game = {}));
//# sourceMappingURL=RouletteListUI.js.map