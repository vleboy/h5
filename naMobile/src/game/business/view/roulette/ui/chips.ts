module game {
	export class chips extends eui.Component {
		//------------------变量区--------------------
        /**chips的name*/
        public name:string;
		public constructor() {
			super();
			//引用皮肤
			this.skinName = GlobalConfig.skinPath + "chipsSkin.exml";
            this.initSetting();
		}
		/**对象创建完成后执行 */
		private initSetting() {
			
		}
	}
}