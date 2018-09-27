module game {
	export class TopMiUI extends BaseUI{
		public card1: TurnCard;

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "topMiSkin.exml";
		}
        public initSetting(){
			 console.log(this.card1);
		}
        /** 收到mediator的通知，每个UI要复写这个方法 * */
        public onMediatorCommand(type: any, params: any = null): void {

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