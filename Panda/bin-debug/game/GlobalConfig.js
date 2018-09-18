var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GlobalConfig = (function () {
        function GlobalConfig() {
        }
        /**1 小丰 2提莫 */
        GlobalConfig.testUser = 2;
        /**游戏初始数据用的用户id */
        GlobalConfig.gameUserID = (GlobalConfig.testUser == 1) ? 276064 : 363048;
        /**游戏初始数据用的验证码 */
        GlobalConfig.verifyCode = (GlobalConfig.testUser == 1) ? 3841095 : 4730318;
        /**开发模式下默认账号的login名称 */
        GlobalConfig.defaultUserName = (GlobalConfig.testUser == 1) ? "sj04" : "sj05";
        /**开发模式下默认账号的join名称 */
        GlobalConfig.defaultUserNameJoin = (GlobalConfig.testUser == 1) ? "BZB_sj04" : "BZB_sj05";
        /**auth接口的默认地址 */
        GlobalConfig.host = "https://4oi868q8qh.execute-api.ap-southeast-1.amazonaws.com/N243/games/42001";
        /**skin路径*/
        GlobalConfig.skinPath = "resource/skins/game_skins/";
        /**音乐是否打开*/
        GlobalConfig.musicSwitch = true;
        /**音效是否打开*/
        GlobalConfig.effectSwitch = true;
        /**极速模式是否打开*/
        GlobalConfig.fastSwitch = false;
        return GlobalConfig;
    }());
    game.GlobalConfig = GlobalConfig;
    __reflect(GlobalConfig.prototype, "game.GlobalConfig");
})(game || (game = {}));
//# sourceMappingURL=GlobalConfig.js.map