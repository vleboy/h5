module game {
	export class BacMiListUI extends BaseUI{
		private scroller: eui.Scroller;
		private list: eui.List;
		private ac: eui.ArrayCollection;
		public constructor(m?: BaseMediator) {
			super(m);
			this.skinName = GlobalConfig.skinPath + "bacMiListSkin.exml";
		}

		/**对象创建完成后执行 */
		public initSetting (){
			this.ac = new eui.ArrayCollection();
			this.list.dataProvider = this.ac;
			this.list.itemRenderer = BacMiListItem;
			this.ac.addItem({});
			this.ac.addItem({});
			this.ac.addItem({});
			this.ac.refresh();

			this.tweenAnimation();
		}

		private tweenAnimation(){
			this.scroller.top = 1500;
			egret.Tween.get(this.scroller).to({top:240}, 300).call(()=>{egret.Tween.removeTweens(this.scroller)});
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