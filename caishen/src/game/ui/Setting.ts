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
		private btnEffect: eui.ToggleSwitch;
		/**快速模式按钮*/
		private btnFast: eui.ToggleSwitch;
		/**背景*/
		private bgSetting: eui.Rect;
		/**设置框*/
		private groupSetting: eui.Group;

		/**初始化*/
		public init(): void {
			this.visible = false;
			this.bgSetting.visible = false;
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.settingClose, this);
			this.registerEvent(this.btnMusic, egret.TouchEvent.TOUCH_TAP, this.theMusic, this);
			this.registerEvent(this.btnEffect, egret.TouchEvent.TOUCH_TAP, this.theEffect, this);
			this.registerEvent(this.btnFast, egret.TouchEvent.TOUCH_TAP, this.theFast, this);
		}
		/**显示*/
		public settingShow(): void {
			this.visible = true;
			this.bgSetting.visible = true;
			this.defaultUI(true);
			egret.Tween.get(this.groupSetting)
				.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500)
				.call(() => {
					egret.Tween.removeTweens(this.groupSetting);
					SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3");
				});
		}
		/**关闭*/
		private settingClose(): void {
			this.bgSetting.visible = false;
			egret.Tween.get(this.groupSetting)
				.to({ scaleX: 0, scaleY: 0, alpha: 0 }, 500)
				.call(() => {
					this.defaultUI(false);
					this.visible = false;
					egret.Tween.removeTweens(this.groupSetting);
					SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
				});
		}
		/**默认显示*/
		private defaultUI(isShow: boolean): void {
			this.groupSetting.scaleX = isShow ? 0 : 1;
			this.groupSetting.scaleY = isShow ? 0 : 1;
			this.groupSetting.alpha = isShow ? 0 : 1;
		}
		/**默认音乐音效开启*/
		public defaultOpen():void{
			SoundPlayer.closeMusic(false);
			SoundPlayer.closeEffect(false);
			this.sendNotify(NotifyConst.updateBgm);
		}
		/**音乐*/
		private theMusic(e: egret.TouchEvent): void {
			let isOpen:boolean = e.target.currentState == "up";
			SoundPlayer.closeMusic(!isOpen);
			this.sendNotify(NotifyConst.updateBgm);
		}
		/**音效*/
		private theEffect(e: egret.TouchEvent): void {
			let isOpen:boolean = e.target.currentState == "up";
			SoundPlayer.closeEffect(!isOpen);
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