module game {
	export class TopBar extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "topBarSkin.exml";
		}
		private setBtn: eui.Button;
		private userName: eui.Label;
		private userMoney: eui.Label;

		private winNum: number;
		/**初始化*/
		public init() {
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.setBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.openSetting); }, this);
		}
		public setUser(name: string) {
			this.userName.text = name;
		}
		public setBalance(money: string, win?: number) {
			if (win) {
				this.winNum = +money - win;
				this.payOut(+money);
			} else {
				this.userMoney.text = money;
			}
		}
		/**派彩*/
		private payOut(mon: number) {
			egret.Tween.get(this, { onChange: () => { this.userMoney.text = this.winNum.toFixed(2) }, onChangeObj: this })
				.to({ winNum: mon }, 800)
				.call(() => egret.Tween.removeTweens(this));
			egret.Tween.get(this.userMoney)
				.to({ scaleX: 1.2, scaleY: 1.2 }, 400)
				.to({ scaleX: 1, scaleY: 1 }, 400)
				.call(() => egret.Tween.removeTweens(this.userMoney));
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