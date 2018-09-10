module game {
	export class ConnectTip extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "connectTipSkin.exml";
		}
		public init() {}
		public show(isShow: boolean): void {
			this.visible = isShow;
			isShow ? egret.Tween.get(this["circle"], { loop: true }).to({ rotation: 360 }, 1000, egret.Ease.circInOut) : egret.Tween.removeTweens(this["circle"]);
		}
	}
}