var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var BaccaratUI = (function () {
        function BaccaratUI() {
        }
        return BaccaratUI;
    }());
    game.BaccaratUI = BaccaratUI;
    __reflect(BaccaratUI.prototype, "game.BaccaratUI");
})(game || (game = {}));
//# sourceMappingURL=BaccaratUI.js.map