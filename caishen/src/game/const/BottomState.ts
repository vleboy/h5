module game {
	export enum BottomState {
        /**等待转动*/
		spinAble,
        /**正在转动*/
        spining,
        /**正在停止转动*/
        stoping,
        /**已停止转动*/
        stop,
        /**自动*/
        auto,
        /**免费*/
        free,
	}
}