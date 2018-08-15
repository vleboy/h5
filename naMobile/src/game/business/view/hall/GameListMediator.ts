module game {
	export class GameListMediator extends BaseMediator{
		public constructor() {
			super();
		}

		/**初始化 房间内的数据结构 */
		protected initClientData(){

		}
		/**初始化UI */
		protected initUI(){
			this.createUIByName(Mediators.Mediator_GameList.uiName, Mediators.Mediator_GameList.layer);
		}
		/**初始化分发数据，在ui完成初始化后异步调用 */
		public initData(){
			NotifyManager.getInstance().sendNotify(NotifyConst.topState, TopBarUI.STATE_GAMELIST);
		}
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			super.dispose();
		}
	}
}