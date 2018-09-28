var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var BaseVO = (function () {
        function BaseVO() {
        }
        return BaseVO;
    }());
    game.BaseVO = BaseVO;
    __reflect(BaseVO.prototype, "game.BaseVO");
})(game || (game = {}));
