module game {
	export class GlobalConfig {
		public constructor() {
		}

		/**1 小丰 2提莫 */
		private static testUser:number = 2;
		/**游戏初始数据用的用户id */
		public static gameUserID:number = (GlobalConfig.testUser==1) ? 276064: 363048;
		/**游戏初始数据用的验证码 */
		public static verifyCode:number = (GlobalConfig.testUser==1) ? 3841095: 4730318;
		/**开发模式下默认账号的login名称 */
		public static defaultUserName: string = (GlobalConfig.testUser==1) ? "sj04": "sj05";
		/**开发模式下默认账号的join名称 */
		public static defaultUserNameJoin: string = (GlobalConfig.testUser==1) ? "BZB_sj04": "BZB_sj05";
		/**auth接口的默认地址 */
		public static host:string = "https://4oi868q8qh.execute-api.ap-southeast-1.amazonaws.com/N243/games/42001";
		
		/**skin路径*/
		public static skinPath: string = "resource/skins/game_skins/";
		/**音乐是否打开*/
		public static musicSwitch: boolean = true;
		/**音效是否打开*/
		public static effectSwitch: boolean = true;
		/**极速模式是否打开*/
		public static fastSwitch: boolean = true;

		public static txtAddZero(txt:string){
			let strArr: string[] = txt.split(".");
			if (strArr.length > 1) {
				if (strArr[1].length == 1) txt += "0";
			} else {
				txt += ".00";
			}
			return txt;
		}
	}
}