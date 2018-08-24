module game {
	export class ConnectTip extends BaseUI{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "connectTipSkin.exml";
		}
		public init(){
			egret.Tween.get(this["circle"], {loop:true})
				.to({rotation:360}, 2000, egret.Ease.circInOut);
		}
	}
}