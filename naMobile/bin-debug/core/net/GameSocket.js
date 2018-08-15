var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameSocket = (function () {
        function GameSocket() {
        }
        return GameSocket;
    }());
    game.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "game.GameSocket");
})(game || (game = {}));
//# sourceMappingURL=GameSocket.js.map