module game {
	export class RouListItem extends AItemRenderer{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "rouListItemSkin.exml";
		}

        /**添加item时执行*/
		protected onAdd()
		{
            
		}
        /**数据变化时执行*/
		protected dataChanged()
		{

		}
        /**移除item时执行*/
		protected onRemove()
		{

		}
	}
}