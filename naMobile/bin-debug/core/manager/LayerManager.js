var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var LayerManager = (function () {
        function LayerManager() {
            this.bgLayer = new egret.DisplayObjectContainer();
            this.uiLayer = new egret.DisplayObjectContainer();
            this.titleLayer = new egret.DisplayObjectContainer();
            this.menuLayer = new egret.DisplayObjectContainer();
            this.tipLayer = new egret.DisplayObjectContainer();
            this.topLayer = new egret.DisplayObjectContainer();
            this.systemLayer = new egret.DisplayObjectContainer();
        }
        LayerManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LayerManager();
            }
            return this.instance;
        };
        LayerManager.prototype.onStageResize = function () {
            if (this.rooUI) {
                if (game.GlobalConfig.isMobile) {
                    return;
                }
                else {
                    if (game.StageUtil.height > LayerManager.DesignHeight) {
                        this.rooUI.y = (game.StageUtil.height - LayerManager.DesignHeight) / 2;
                        this.rooUI.scaleY = LayerManager.DesignHeight / game.StageUtil.height;
                    }
                    else {
                        this.rooUI.y = 0;
                        this.rooUI.scaleY = 1;
                    }
                }
            }
        };
        /**
         * 初始化根显示对象
         */
        LayerManager.prototype.initRootLayer = function (root) {
            this.rooUI = root;
            root.addChild(this.bgLayer);
            root.addChild(this.uiLayer);
            root.addChild(this.titleLayer);
            root.addChild(this.menuLayer);
            root.addChild(this.tipLayer);
            root.addChild(this.topLayer);
            root.addChild(this.systemLayer);
            this.onStageResize();
        };
        /** 添加显示
         * @param ui {BaseUI} 要添加到UI的显示对象
         * @param layer {number} UI层级
         */
        LayerManager.prototype.addUI = function (ui, layer) {
            switch (layer) {
                case game.LayerConst.LAYER_BG:
                    this.bgLayer.addChild(ui);
                    break;
                case game.LayerConst.LAYER_UI:
                    this.uiLayer.addChild(ui);
                    break;
                case game.LayerConst.LAYER_TITLE:
                    this.titleLayer.addChild(ui);
                    break;
                case game.LayerConst.LAYER_MENU:
                    this.menuLayer.addChild(ui);
                    break;
                case game.LayerConst.LAYER_TIP:
                    this.tipLayer.addChild(ui);
                    break;
                case game.LayerConst.LAYER_TOP:
                    this.topLayer.addChild(ui);
                    break;
                case game.LayerConst.LAYER_SYSTEM:
                    this.systemLayer.addChild(ui);
                    break;
            }
        };
        LayerManager.DesignWidth = 1920;
        LayerManager.DesignHeight = 1080;
        return LayerManager;
    }());
    game.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "game.LayerManager");
})(game || (game = {}));
//# sourceMappingURL=LayerManager.js.map