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

    export enum GameState{
        /**可以spin的等待状态 */
        BET,
        /**开始转动，等待服务器返回结果 */
        SPINNING,
        /**收到spin结果，各列缓停，此阶段可以跳过 */
        STOP,
        /**按顺序展示 bigwin-> all lines -> freespin tiles, 此阶段不可跳过*/
        SHOW_RESULT,
        /**遍历展示单列中奖，此阶段可以直接点击spin */
        SHOW_SINGLE_LINES
    }
}