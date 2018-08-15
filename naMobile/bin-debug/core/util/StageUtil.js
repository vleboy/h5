var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var StageUtil = (function () {
        function StageUtil() {
        }
        Object.defineProperty(StageUtil, "stage", {
            set: function (stage) {
                this._stage = stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtil, "width", {
            get: function () {
                return this._stage ? this._stage.stageWidth : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtil, "height", {
            get: function () {
                return this._stage ? this._stage.stageHeight : 0;
            },
            enumerable: true,
            configurable: true
        });
        return StageUtil;
    }());
    game.StageUtil = StageUtil;
    __reflect(StageUtil.prototype, "game.StageUtil");
})(game || (game = {}));
//# sourceMappingURL=StageUtil.js.map