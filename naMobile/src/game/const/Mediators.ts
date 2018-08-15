module game {
	export class Mediators {
		public constructor() {
		}

		public static Mediator_GameList: MediatorClass = {name:"GameListMediator", uiName:"GameListUI", layer:LayerConst.LAYER_UI};
		public static Mediator_TopBar: MediatorClass = {name:"TopBarMediator", uiName:"TopBarUI", layer:LayerConst.LAYER_TITLE};
		public static Mediator_BacMiList: MediatorClass = {name:"BacMiListMediator", uiName:"BacMiListUI", layer:LayerConst.LAYER_UI};
		public static Mediator_BacMi: MediatorClass = {name:"BacMiMediator", uiName:"BacMiUI", layer:LayerConst.LAYER_UI};
		public static Mediator_TopMi: MediatorClass = {name:"TopMiMediator", uiName:"TopMiUI", layer:LayerConst.LAYER_MENU};
	}

	export class MediatorClass{
		/**mediator类名 */
		name: string;
		/**图片加载组 */
		res?: string;
		/**声音加载组 */
		sounds?: string;
		/**ui类 */
		uiName: string;
		/**它的UI的层级 */
		layer: number;
	}
}