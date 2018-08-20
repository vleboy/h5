module game{
export class RouMediator extends BaseMediator implements INotification{
		public constructor() {
			super();
		}

		/**初始化 房间内的数据结构 */
		protected initClientData(){

		}
		/**初始化UI */
		protected initUI(){
			this.createUIByName(Mediators.Mediator_Rou.uiName, Mediators.Mediator_Rou.layer);
			NotifyManager.getInstance().sendNotify(NotifyConst.topState, TopBarUI.STATE_GAMEROOM);
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
				
			];
		}
		/**
		 * 处理收到消息体
		 */
		handleNotification(type: number, body?: any): void{
			
		}
		/**点击*/
		private touchRou():void{
			console.warn("click");
		}
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			super.dispose();
			NotifyManager.getInstance().removeRegister(egret.getQualifiedClassName(this));
		}
	}
}