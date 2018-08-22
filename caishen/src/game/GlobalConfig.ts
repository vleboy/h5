module game {
	export class GlobalConfig {
		public constructor() {
		}
		/**skin路径*/
		public static skinPath: string = "resource/skins/game_skins/";
		/**音乐是否打开*/
		public static musicSwitch: boolean = true;
		/**音效是否打开*/
		public static soundSwitch: boolean = true;
		/**极速模式是否打开*/
		public static fastSwitch: boolean = true;
	}
}