var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Mediators = (function () {
        function Mediators() {
        }
        Mediators.Mediator_GameList = { name: "GameListMediator", uiName: "GameListUI", layer: game.LayerConst.LAYER_UI };
        Mediators.Mediator_TopBar = { name: "TopBarMediator", uiName: "TopBarUI", layer: game.LayerConst.LAYER_TITLE };
        Mediators.Mediator_BacMiList = { name: "BacMiListMediator", uiName: "BacMiListUI", layer: game.LayerConst.LAYER_UI };
        Mediators.Mediator_BacMi = { name: "BacMiMediator", uiName: "BacMiUI", layer: game.LayerConst.LAYER_UI };
        Mediators.Mediator_TopMi = { name: "TopMiMediator", uiName: "TopMiUI", layer: game.LayerConst.LAYER_MENU };
        return Mediators;
    }());
    game.Mediators = Mediators;
    __reflect(Mediators.prototype, "game.Mediators");
    var MediatorClass = (function () {
        function MediatorClass() {
        }
        return MediatorClass;
    }());
    game.MediatorClass = MediatorClass;
    __reflect(MediatorClass.prototype, "game.MediatorClass");
})(game || (game = {}));
//# sourceMappingURL=Mediators.js.map