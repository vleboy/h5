module game {
	export class Setting extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "settingSkin.exml";
		}
		//-----------变量----------
		/**关闭按钮*/
		private btnClose: eui.Image;
		/**音乐按钮*/
		private btnMusic: eui.ToggleSwitch;
		/**音效按钮*/
		private btnSound: eui.ToggleSwitch;
		/**极速模式按钮*/
		private btnFast: eui.ToggleSwitch;
		/**背景*/
		private bgSetting: eui.Rect;
		/**设置框*/
		private groupSetting: eui.Group;

		/**初始化*/
		public initSetting(): void {
			this.visible = false;
			this.bgSetting.visible = false;
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.theClose, this);
			this.registerEvent(this.btnMusic, egret.TouchEvent.TOUCH_TAP, this.theMusic, this);
			this.registerEvent(this.btnSound, egret.TouchEvent.TOUCH_TAP, this.theSound, this);
			this.registerEvent(this.btnFast, egret.TouchEvent.TOUCH_TAP, this.theFast, this);
		}
		/**显示*/
		public theShow(): void {
			this.visible = true;
			this.bgSetting.visible = true;
			this.defaultUI(true);
			egret.Tween.get(this.groupSetting)
				.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500)
				.call(() => {
					egret.Tween.removeTweens(this.groupSetting);
				});
		}
		/**关闭*/
		private theClose(): void {
			this.bgSetting.visible = false;
			egret.Tween.get(this.groupSetting)
				.to({ scaleX: 0, scaleY: 0, alpha: 0 }, 500)
				.call(() => {
					this.defaultUI(false);
					this.visible = false;
					egret.Tween.removeTweens(this.groupSetting);
				});
		}
		/**默认显示*/
		private defaultUI(isShow: boolean): void {
			this.groupSetting.scaleX = isShow ? 0 : 1;
			this.groupSetting.scaleY = isShow ? 0 : 1;
			this.groupSetting.alpha = isShow ? 0 : 1;
		}
		/**音乐*/
		private theMusic(e: egret.TouchEvent): void {
			GlobalConfig.musicSwitch = e.target.currentState == "up";
		}
		/**音效*/
		private theSound(e: egret.TouchEvent): void {
			GlobalConfig.soundSwitch = e.target.currentState == "up";
		}
		/**快速模式*/
		private theFast(e: egret.TouchEvent): void {
			GlobalConfig.fastSwitch = e.target.currentState == "up";
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