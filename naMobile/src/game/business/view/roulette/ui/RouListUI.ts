module game {
	export class RouListUI extends BaseUI{
		public constructor(m?: BaseMediator) {
			super(m);
			//引用皮肤
			this.skinName = GlobalConfig.skinPath + "rouListSkin.exml";
		}
		/**对象创建完成后执行 */
		public initSetting (){
			
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