module game {
	/**接收通知的类必须继承这个接口，并执行NotifyManager.getInstance().addRegister() */
	export interface INotification {
			/**
			 * 添加需要监听的消息名
			 */
			listNotification(): Array<number>;
			/**
			 * 处理收到消息体
			 */
			handleNotification(type: number, body?: any): void;
	}
}
