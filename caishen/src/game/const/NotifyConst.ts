module game {
	export enum NotifyConst {
		/**开始转动*/
		spin,
		/**停止转动*/
		cancelSpin,
		/**停止自动转动*/
		cancelAutoSpin,
		/**下注档次下标*/
		betLevelIndex,
		/**打开说明*/
		openHelp,
		/**打开设置*/
		openSetting,
		/**选择免费次数返回 */
		chooseFreeBack,
		/**免费结算完成 */
		freeComplete,
		updateBgm
	}
}