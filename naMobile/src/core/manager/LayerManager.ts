module game {
	export class LayerManager {
        private static instance: LayerManager;
        public static getInstance(): LayerManager {
            if (this.instance == null) {
                this.instance = new LayerManager();
            }
            return this.instance;
        }

        public static DesignWidth = 1920;
        public static DesignHeight = 1080;
		
        private bgLayer: egret.DisplayObjectContainer;
        private uiLayer: egret.DisplayObjectContainer;
        private titleLayer: egret.DisplayObjectContainer;
        private menuLayer: egret.DisplayObjectContainer;
        private tipLayer: egret.DisplayObjectContainer;
        private topLayer: egret.DisplayObjectContainer;
        private systemLayer: egret.DisplayObjectContainer;
        private rooUI: egret.DisplayObjectContainer;

		public constructor() {
            this.bgLayer = new egret.DisplayObjectContainer();
            this.uiLayer = new egret.DisplayObjectContainer();
            this.titleLayer = new egret.DisplayObjectContainer();
            this.menuLayer = new egret.DisplayObjectContainer();
            this.tipLayer = new egret.DisplayObjectContainer();
            this.topLayer = new egret.DisplayObjectContainer();
            this.systemLayer = new egret.DisplayObjectContainer();
        }

        public onStageResize(): void {
            if (this.rooUI) {
                if (GlobalConfig.isMobile) {
                    return;
                }
                else {
                    if (StageUtil.height > LayerManager.DesignHeight) {
                        this.rooUI.y = (StageUtil.height - LayerManager.DesignHeight) / 2;
                        this.rooUI.scaleY = LayerManager.DesignHeight / StageUtil.height;
                    }
                    else {
                        this.rooUI.y = 0;
                        this.rooUI.scaleY = 1;
                    }
                }
            }
        }
		/**
		 * 初始化根显示对象
		 */
        public initRootLayer(root: egret.DisplayObjectContainer): void {
            this.rooUI = root;
            root.addChild(this.bgLayer);
            root.addChild(this.uiLayer);
            root.addChild(this.titleLayer);
            root.addChild(this.menuLayer);
            root.addChild(this.tipLayer);
            root.addChild(this.topLayer);
            root.addChild(this.systemLayer);
            this.onStageResize();
        }
        /**ui层的上一次ui */
        private lastUI:BaseUI;
		/** 添加显示
         * @param ui {BaseUI} 要添加到UI的显示对象
         * @param layer {number} UI层级
         */
        public addUI(ui: BaseUI, layer: number): void {
			switch (layer) {
				case LayerConst.LAYER_BG:
					this.bgLayer.addChild(ui);
					break;
				case LayerConst.LAYER_UI:
					this.uiLayer.addChild(ui);
					break;
				case LayerConst.LAYER_TITLE:
					this.titleLayer.addChild(ui);
					break;
				case LayerConst.LAYER_MENU:
					this.menuLayer.addChild(ui);
					break;
				case LayerConst.LAYER_TIP:
					this.tipLayer.addChild(ui);
					break;
				case LayerConst.LAYER_TOP:
					this.topLayer.addChild(ui);
					break;
				case LayerConst.LAYER_SYSTEM:
					this.systemLayer.addChild(ui);
					break;
			}
        }

	}
}