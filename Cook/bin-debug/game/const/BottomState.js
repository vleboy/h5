var game;
(function (game) {
    var GameState;
    (function (GameState) {
        /**可以spin的等待状态 */
        GameState[GameState["BET"] = 0] = "BET";
        /**开始转动，等待服务器返回结果 */
        GameState[GameState["SPINNING"] = 1] = "SPINNING";
        /**收到spin结果，各列缓停，此阶段可以跳过 */
        GameState[GameState["STOP"] = 2] = "STOP";
        /**按顺序展示 bigwin-> all lines -> freespin tiles, 此阶段不可跳过*/
        GameState[GameState["SHOW_RESULT"] = 3] = "SHOW_RESULT";
        /**遍历展示单列中奖，此阶段可以直接点击spin */
        GameState[GameState["SHOW_SINGLE_LINES"] = 4] = "SHOW_SINGLE_LINES";
    })(GameState = game.GameState || (game.GameState = {}));
})(game || (game = {}));
