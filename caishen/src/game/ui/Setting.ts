module game {
	export class Setting extends eui.Component {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "settingSkin.exml";
			this.initData();
			this.eventListen();
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
		private initData(): void {
			this.visible = false;
			this.bgSetting.visible = false;
		}
		/**事件监听*/
		private eventListen(): void {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.theClose, this);
			this.btnMusic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.theMusic, this);
			this.btnSound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.theSound, this);
			this.btnFast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.theFast, this);
		}
		/**显示*/
		public theShow(): void {
			this.visible = true;
			this.bgSetting.visible = true;
			this.defaultUI(true);
			egret.Tween.get(this.groupSetting).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500);
		}
		/**关闭*/
		private theClose(): void {
			this.bgSetting.visible = false;
			egret.Tween.get(this.groupSetting)
				.to({ scaleX: 0, scaleY: 0, alpha: 0 }, 500)
				.call(() => {
					this.defaultUI(false);
					this.visible = false;
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
			//开音乐
			let openMusic = () => {
				console.warn("music open");
			};
			//关音乐
			let closeMusic = () => {
				console.warn("music close");
			};
			e.target.currentState == "up" ? openMusic() : closeMusic();
		}
		/**音效*/
		private theSound(e: egret.TouchEvent): void {
			//开音效
			let openSound = () => {
				console.warn("Sound open");
			};
			//关音效
			let closeSound = () => {
				console.warn("Sound close");
			};
			e.target.currentState == "up" ? openSound() : closeSound();
		}
		/**快速模式*/
		private theFast(e: egret.TouchEvent): void {
			//开快速模式
			let openFast = () => {
				console.warn("Fast open");
			};
			//关快速模式
			let closeFast = () => {
				console.warn("Fast close");
			};
			e.target.currentState == "up" ? openFast() : closeFast();
		}
	}
}