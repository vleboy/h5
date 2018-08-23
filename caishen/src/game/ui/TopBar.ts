module game {
	export class TopBar extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "topBarSkin.exml";
		}
		private groupRight: eui.Group;
		private userName: eui.Label;
		private userMoney: eui.Label;
		/**初始化*/
		public init() {
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.groupRight, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.openSetting);}, this);
		}
		/**玩家信息*/
		public userInfo(theName: string, theMoney: string): void {
			this.userName.text = theName;
			this.userMoney.text = theMoney;
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