var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var MediatorManager = (function () {
        function MediatorManager() {
        }
        /**打开某个游戏的mediator */
        MediatorManager.openMediator = function (m, data) {
            if (data === void 0) { data = null; }
            console.log("MediatorManager openMediator " + m.name);
            var name = m.name;
            var layer = m.layer;
            this.startMediator(name, data, layer);
        };
        /**检查这个游戏的图片资源加载了没 */
        MediatorManager.checkResLoad = function (resGroup, soundGroup, name, data, layer) {
            if (data === void 0) { data = null; }
        };
        /**检查这个游戏的音效资源加载了没 */
        MediatorManager.checkSoundLoad = function (soundGroup, name, data, layer) {
            if (data === void 0) { data = null; }
        };
        /**启用指定的mediator */
        MediatorManager.startMediator = function (name, data, layer) {
            var _this = this;
            if (data === void 0) { data = null; }
            var mediator = this.mediatorDic.getValue(name);
            if (mediator && mediator.isStart)
                mediator.dispose();
            if (layer == game.LayerConst.LAYER_UI) {
                this.mediatorDic.getAllKey().forEach(function (key) {
                    var m = _this.mediatorDic.getValue(key);
                    if (m.layer == game.LayerConst.LAYER_UI) {
                        _this.mediatorDic.removeKey(key);
                        m.dispose();
                    }
                }, this);
            }
            if (!mediator) {
                var cls = egret.getDefinitionByName("game." + name);
                mediator = new cls();
                mediator.layer = layer;
                this.mediatorDic.setValue(name, mediator);
            }
            mediator.start(data);
        };
        /**停用指定的Mediator */
        MediatorManager.closeMediator = function (name) {
        };
        /** 判断某个mediator是否打开了 */
        MediatorManager.isMediatorOpen = function (name) {
            var m = this.mediatorDic.getValue(name);
            if (m) {
                return m.isStart;
            }
            return false;
        };
        /**停用所有Mediator 当返回登录界面时需要这个*/
        MediatorManager.closeAllMediator = function () {
            var arr = this.mediatorDic.getAllValue();
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i])
                        arr[i].dispose();
                }
            }
        };
        /**停用当前的UI层的mediator 在打开一个新的UI层Mediator时调用 */
        MediatorManager.closeUIMediator = function (direction) {
            var keys = this.mediatorDic.getAllKey();
            if (keys.length > 0) {
                for (var i = 0; i < keys.length; i++) {
                    var name = keys[i];
                    var m = this.mediatorDic.getValue(name);
                    // if (m && m.isStart && m.ui && m.ui.layer == enums.LayerConst.LAYER_UI) {
                    // 	m.dispose();
                    // }
                }
            }
        };
        /**打开过的mediator对象池 */
        MediatorManager.mediatorDic = new game.Dictionary();
        return MediatorManager;
    }());
    game.MediatorManager = MediatorManager;
    __reflect(MediatorManager.prototype, "game.MediatorManager");
})(game || (game = {}));
//# sourceMappingURL=MediatorManager.js.map