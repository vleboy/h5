var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var StageUtil = (function () {
        function StageUtil() {
        }
        return StageUtil;
    }());
    game.StageUtil = StageUtil;
    __reflect(StageUtil.prototype, "game.StageUtil");
})(game || (game = {}));
