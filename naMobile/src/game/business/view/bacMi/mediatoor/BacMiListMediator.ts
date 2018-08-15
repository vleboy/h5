module game {
	export class BacMiListMediator extends BaseMediator implements INotification{
		public constructor() {
			super();
		}

		/**初始化 房间内的数据结构 */
		protected initClientData(){

		}
		/**初始化UI */
		protected initUI(){
			this.createUIByName(Mediators.Mediator_BacMiList.uiName, Mediators.Mediator_BacMiList.layer);
			NotifyManager.getInstance().sendNotify(NotifyConst.topState, TopBarUI.STATE_ROOMLIST);
		}
		/**初始化分发数据，在ui完成初始化后异步调用 */
		public initData(){
			NotifyManager.getInstance().addRegister(egret.getQualifiedClassName(this), this);
		}

		/**
		 * 添加需要监听的消息名
		 */
		listNotification(): Array<number>{
			return [
				NotifyConst.topReturn
			];
		}
		/**
		 * 处理收到消息体
		 */
		handleNotification(type: number, body?: any): void{
			switch(type){
				case NotifyConst.topReturn:
					MediatorManager.openMediator(Mediators.Mediator_GameList);
					break;
			}
		}

		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			super.dispose();
			NotifyManager.getInstance().removeRegister(egret.getQualifiedClassName(this));
		}
	}
}