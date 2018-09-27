module game {
	export class RouMediator extends BaseMediator implements INotification {
		public constructor() {
			super();
		}

		/**初始化 房间内的数据结构 */
		protected initClientData() {

		}
		/**初始化UI */
		protected initUI() {
			this.createUIByName(Mediators.Mediator_Rou.uiName, Mediators.Mediator_Rou.layer);
			NotifyManager.getInstance().sendNotify(NotifyConst.topState, TopBarUI.STATE_GAMEROOM);
		}
		/**初始化分发数据，在ui完成初始化后异步调用 */
		public initData() {
			NotifyManager.getInstance().addRegister(egret.getQualifiedClassName(this), this);
			this.roomInfo();
		}

		/**
		 * 添加需要监听的消息名
		 */
		listNotification(): Array<number> {
			return [
				NotifyConst.touBetsRou,
				NotifyConst.touCancelRou,
				NotifyConst.touAgainRou,
				NotifyConst.touSureRou
			];
		}
		/**
		 * 处理收到消息体
		 */
		handleNotification(type: number, body?: any): void {
			switch (type) {
				case NotifyConst.touBetsRou://点击下注区
					this.touchBets(body.theTou, body.thePoint);
					break;
				case NotifyConst.touCancelRou://点击撤销
					this.touchCancel();
					break;
				case NotifyConst.touAgainRou://点击重下
					this.touchAgain();
					break;
				case NotifyConst.touSureRou://点击确定
					this.touchSure();
					break;
			}
		}
		/**点击下注区*/
		private touchBets(tou: string, point: egret.Point): void {
			console.warn("click");
			this.notifyUI(UICommand.touBetsRou, { "theTou": tou, "thePoint": point });
		}
		/**点击确定*/
		private touchSure(): void {
			console.warn("sure");
			this.notifyUI(UICommand.sureBetsRou);
		}
		/**点击重下*/
		private touchAgain(): void {
			console.warn("again");
		}
		/**点击撤销*/
		private touchCancel(): void {
			console.warn("cancel");
			this.notifyUI(UICommand.cancelBetsRou);
		}
		/**房间信息*/
		private roomInfo(): void {
			this.notifyUI(UICommand.roomInfoRou, {
				dealer: "LALAINE",
				rounds: "299377",
				limit: "1 - 3k",
				roomNum: "122",
				handNum: "1934381"
			});
		}
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			super.dispose();
			NotifyManager.getInstance().removeRegister(egret.getQualifiedClassName(this));
		}
	}
}