var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var GameListUI = (function (_super) {
        __extends(GameListUI, _super);
        function GameListUI(m) {
            var _this = _super.call(this, m) || this;
            _this.skinName = game.GlobalConfig.skinPath + "gameListSkin.exml";
            return _this;
        }
        /**对象创建完成后执行 */
        GameListUI.prototype.initSetting = function () {
            this.gameGroup.touchChildren = true;
            this.gamesAnimation();
        };
        /**从右边飞出来 */
        GameListUI.prototype.gamesAnimation = function () {
            var _this = this;
            [this.gameMi, this.gameBac, this.gameRoulette, this.gameMultiBac, this.gameVipBac].forEach(function (v, i) {
                v.x = 2500;
                egret.Tween.get(v).wait(1 + i * 60).to({ x: 22 + 376 * i }, 300).call(function () {
                    egret.Tween.removeTweens(v);
                    i == 4 && _this.initListener();
                });
            }, this);
        };
        /**飞到目的地再注册点击事件 */
        GameListUI.prototype.initListener = function () {
            var _this = this;
            [this.gameMi, this.gameBac, this.gameRoulette, this.gameMultiBac, this.gameVipBac].forEach(function (v, i, arr) {
                _this.registerEvent(v, egret.TouchEvent.TOUCH_TAP, function (e) {
                    _this.gameGroup.touchChildren = false;
                    console.log(v.name + "被点击了");
                    game.FilterUtil.setWaterRippleFilter(v, function () {
                        console.log(v.name + "水波纹结束");
                        switch (v.name) {
                            case "gameMi":
                                game.MediatorManager.openMediator(game.Mediators.Mediator_BacMiList);
                                break;
                        }
                    }, _this);
                }, _this);
            }, this);
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        GameListUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return GameListUI;
    }(game.BaseUI));
    game.GameListUI = GameListUI;
    __reflect(GameListUI.prototype, "game.GameListUI");
})(game || (game = {}));
//# sourceMappingURL=GameListUI.js.map