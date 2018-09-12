module game {
	/**通知接收者必须实现这个接口 */
	export interface INotify {
		handleNotify(key:NotifyConst, body): void;
	}
}