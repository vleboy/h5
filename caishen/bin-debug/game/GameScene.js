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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.skinName = game.GlobalConfig.skinPath + "gameSceneSkin.exml";
            return _this;
        }
        GameScene.prototype.initSetting = function () {
            var _this = this;
            this.tileGroup.mask = this.tileMask;
            this.startRoll();
            setTimeout(function () {
                _this.stopRoll([0, 1, 2, 1, 4, 5, 1, 7, 8, 9, 10, 11, 12, 3, 6]);
            }, 1000);
        };
        GameScene.prototype.startRoll = function () {
            for (var i = 0; i < 15; i++) {
                this["tile" + i].visible = false;
            }
            this.vagueTiles.visible = true;
            for (var i = 0; i < 20; i++) {
                this.singleRoll(this["vagueTile" + i]);
            }
        };
        GameScene.prototype.singleRoll = function (tile) {
            tile.source = "vague" + Math.floor(Math.random() * 13) + "_png";
            egret.Tween.get(tile, { loop: true })
                .wait(20)
                .call(function () {
                tile.y += 70;
                if (tile.y > 658) {
                    tile.y = -200;
                    tile.source = "vague" + Math.floor(Math.random() * 13) + "_png";
                }
            });
        };
        GameScene.prototype.stopRoll = function (arr) {
            // 3 4 5列是否缓停
            var is3Delay = false;
            var is4Delay = false;
            var is5Delay = false;
            if (arr.slice(0, 3).indexOf(1) > -1 && arr.slice(3, 6).indexOf(1) > -1) {
                is3Delay = true;
                if (arr.slice(6, 9).indexOf(1) > -1) {
                    is4Delay = true;
                    if (arr.slice(9, 12).indexOf(1) > -1) {
                        is5Delay = true;
                    }
                }
            }
            arr = arr.map(function (v) { return (v == 2 ? "2_1" : (v + "")); });
            console.log("停止 ", arr);
            for (var i = 0; i < 5; i++) {
                var delay = i * 250;
                if (is3Delay && i >= 2) {
                    delay += 500;
                    if (is4Delay) {
                        delay += 500;
                        if (is5Delay) {
                            delay += 500;
                        }
                    }
                }
                this.stopCollum(i, arr.slice(i * 3, i * 3 + 3), delay);
            }
        };
        GameScene.prototype.stopCollum = function (c, arr, delay) {
            var _this = this;
            console.log("停止" + c + " 延迟" + delay);
            setTimeout(function () {
                [0, 1, 2, 3].forEach(function (i) {
                    egret.Tween.removeTweens(_this["vagueTile" + (c + i)]);
                    _this["vagueTile" + (c * 4 + i)].visible = false;
                    _this["vagueTile" + (c * 4 + i)].y = 21 + i * 208;
                });
                [0, 1, 2].forEach(function (i) {
                    _this["tile" + (c * 3 + i)].visible = true;
                    _this["tile" + (c * 3 + i)].source = "symbolName_" + (arr[i]) + "_png";
                });
            }, delay);
        };
        return GameScene;
    }(game.BaseUI));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene");
})(game || (game = {}));
//# sourceMappingURL=GameScene.js.map