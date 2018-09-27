module game {
	export class AItemRenderer extends eui.ItemRenderer{
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
		}

		protected onAdd()
		{
		}
		protected dataChanged()
		{
		}
		protected onRemove()
		{
		}

	}
}