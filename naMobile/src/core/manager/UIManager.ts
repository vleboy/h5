module game {
	export class UIManager {
        private static uiDic: Dictionary = new Dictionary();
		public constructor() {
		}
		
		public static openUI(ui: BaseUI, layer:number=2){
            LayerManager.getInstance().addUI(ui, layer);
            this.uiDic.setValue(egret.getQualifiedClassName(ui), ui);
		}

		public static closeUI(ui: BaseUI){
            if (!ui) return;
			this.uiDic.removeKey(name);
			if(ui.parent) ui.parent.removeChild(ui);
		}

		public static onStageResize() {
            if (this.uiDic) {
				var uis = this.uiDic.getAllValue().forEach(v=>{v.onStageResize()}, this);
            }
        }
	}
}