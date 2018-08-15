module game {
	export class StageUtil {
		private static _stage: egret.Stage;
		public constructor() {
		}

		public static set stage(stage: egret.Stage){
			this._stage = stage;
		}

		public static get width(){
			return this._stage? this._stage.stageWidth : 0;
		}
		public static get height(){
			return this._stage? this._stage.stageHeight : 0;
		}
	}
}