module game {
	export class Rull extends BaseUI{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "rullSkin.exml";
		}
		/**初始化*/
		public initSetting(): void {
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			
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