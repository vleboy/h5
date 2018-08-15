module game {
	export class BacMiListItem extends AItemRenderer{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bacMiListItemSkin.exml";
		}


		protected onAdd()
		{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		}

		private onTap(){
			// console.log("点击item"+ this.itemIndex);
			MediatorManager.openMediator(Mediators.Mediator_BacMi, "gameidxxx");
		}

		protected dataChanged()
		{
		}
		protected onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		}
	}
}