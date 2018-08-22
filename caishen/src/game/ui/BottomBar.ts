module game {
	export class BottomBar extends BaseUI{
		private helpBtn: eui.Button;
		private spinBtn: eui.Button;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bottomSkin.exml";
		}

        public initSetting(){
			this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, ()=>{
				console.log("spin");
				NotifyManager.getInstance().sendNotify(NotifyConst.spin);
			}, this)
		}

		public setSpinEnable(b:boolean){
			this.spinBtn.enabled = b;
		}
	}
}