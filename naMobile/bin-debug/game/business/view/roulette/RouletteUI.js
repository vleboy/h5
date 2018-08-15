var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var RouletteUI = (function () {
        function RouletteUI() {
        }
        return RouletteUI;
    }());
    game.RouletteUI = RouletteUI;
    __reflect(RouletteUI.prototype, "game.RouletteUI");
})(game || (game = {}));
//# sourceMappingURL=RouletteUI.js.map