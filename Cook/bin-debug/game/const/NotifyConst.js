var game;
(function (game) {
    var NotifyConst;
    (function (NotifyConst) {
        /**开始转动*/
        NotifyConst[NotifyConst["spin"] = 0] = "spin";
        /**停止转动*/
        NotifyConst[NotifyConst["cancelSpin"] = 1] = "cancelSpin";
        /**停止自动转动*/
        NotifyConst[NotifyConst["cancelAutoSpin"] = 2] = "cancelAutoSpin";
        /**下注档次下标*/
        NotifyConst[NotifyConst["betLevelIndex"] = 3] = "betLevelIndex";
        /**打开说明*/
        NotifyConst[NotifyConst["openHelp"] = 4] = "openHelp";
        /**打开设置*/
        NotifyConst[NotifyConst["openSetting"] = 5] = "openSetting";
        /**选择免费次数返回 */
        NotifyConst[NotifyConst["chooseFreeBack"] = 6] = "chooseFreeBack";
        /**免费结算完成 */
        NotifyConst[NotifyConst["freeComplete"] = 7] = "freeComplete";
        NotifyConst[NotifyConst["updateBgm"] = 8] = "updateBgm";
    })(NotifyConst = game.NotifyConst || (game.NotifyConst = {}));
})(game || (game = {}));
