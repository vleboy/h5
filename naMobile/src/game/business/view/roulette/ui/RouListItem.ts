module game {
	export class RouListItem extends AItemRenderer{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "rouListItemSkin.exml";
		}

        /**添加item时执行*/
		protected onAdd()
		{
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}
        /**数据变化时执行*/
		protected dataChanged()
		{

		}
		/**点击打开Roulette*/
		private onTouch():void {
			MediatorManager.openMediator(Mediators.Mediator_Rou, "gameidxxx");
		}
        /**移除item时执行*/
		protected onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}
	}
}