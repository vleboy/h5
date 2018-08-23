module game {
	export class BottomBar extends BaseUI {
		/**说明按钮*/
		private helpBtn: eui.Button;
		/**游戏开始按钮*/
		private spinBtn: eui.Button;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bottomSkin.exml";
		}
		/**初始化*/
		public initSetting() {
			this.defaultData();
			this.eventListen();
			this.defaultUI();
		}
		/**默认数据*/
		private defaultData(): void {
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.spin); }, this);
			this.registerEvent(this.helpBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.openHelp);}, this);
		}
		/**默认显示*/
		private defaultUI(): void {

		}
		public setSpinEnable(b: boolean) {
			this.spinBtn.enabled = b;
		}
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
		public dispose(): void {
			super.dispose();
		}
	}
}