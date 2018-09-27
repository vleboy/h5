module game {
	export class TopBarUI extends BaseUI{
		public static STATE_GAMELIST = "gamelist";
		public static STATE_ROOMLIST = "roomlist";
		public static STATE_GAMEROOM = "gameroom";
		private returnImg: eui.Image;
		private settingImg: eui.Image;
		public constructor(m: BaseMediator) {
			super(m);
			this.skinName = GlobalConfig.skinPath + "topBarSkin.exml";
		}
		public initSetting(){
			this.currentState = TopBarUI.STATE_GAMELIST;
			this.initListener();
		}

		private initListener(){
			this.registerEvent(this.returnImg, egret.TouchEvent.TOUCH_TAP, ()=>{
				NotifyManager.getInstance().sendNotify(NotifyConst.topReturn);
			}, this);
			this.registerEvent(this.settingImg, egret.TouchEvent.TOUCH_TAP, ()=>{
				console.log("打开设置界面");
			}, this);
		}

        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type){
				case UICommand.TopBar_topState:
					this.currentState = params;
					break;
			}
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