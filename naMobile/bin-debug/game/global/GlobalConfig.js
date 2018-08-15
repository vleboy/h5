var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GlobalConfig = (function () {
        function GlobalConfig() {
        }
        GlobalConfig.isMobile = true;
        GlobalConfig.skinPath = "resource/skins/game_skins/";
        return GlobalConfig;
    }());
    game.GlobalConfig = GlobalConfig;
    __reflect(GlobalConfig.prototype, "game.GlobalConfig");
})(game || (game = {}));
//# sourceMappingURL=GlobalConfig.js.map