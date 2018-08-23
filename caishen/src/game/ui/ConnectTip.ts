module game {
	export class ConnectTip extends BaseUI{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "connectTipSkin.exml";
		}
		public init(){
			egret.Tween.get(this["txt"], {loop:true})
				.wait(200)
				.call(()=>{
					this["txt"].text += ".";
					if(this["txt"].text.length>=18) this["txt"].text = "拼命的connecting";
				})
		}

		private connecting(){

		}
	}
}