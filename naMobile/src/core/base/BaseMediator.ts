module game {
	export abstract class BaseMediator {
		public ui: BaseUI;
		protected data: any;
		public isStart: boolean;
		public layer: number;
		public constructor() {
		}

		/**启用这个Mediator */
		public start(data: any = null): void {
			this.isStart = true;
			this.data = data;
			this.initClientData();
			this.initUI();
		}
		
		/**初始化 房间内的数据结构 */
		protected abstract initClientData();
		/**初始化UI */
		protected abstract initUI();
		/**初始化分发数据，在ui完成初始化后异步调用 */
		public abstract initData();

		/**初始化 当前皮肤类型界面*/
		protected createUIByName(name:string, layer:number): void {
			this.ui = eval("new game."+name+"(this)");
			UIManager.openUI(this.ui, layer);
		}
		/**通知UI做显示 */
		protected notifyUI(type: any, params: any = null): void {
			if (this.ui) {
				this.ui.onMediatorCommand(type, params);
			}
		}
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void {
			this.isStart = false;
			this.ui.dispose();
			this.ui = null;
		}
	}
}