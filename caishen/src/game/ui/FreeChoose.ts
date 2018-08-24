module game {
	export class FreeChoose extends BaseUI{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeChooseSkin.exml";
		}

		public init(){
			["20","15","10","8","5"].forEach(v=>{
				this.registerEvent(this["choose"+v], egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
			})
			
		}

		private onTouch(e: egret.TouchEvent){
			let n = 0;
			switch(e.target.name){
				case "choose20": n=5;break;
				case "choose15": n=4;break;
				case "choose10": n=3;break;
				case "choose8":  n=2;break;
				case "choose5":  n=1;break;
			}
			n>0 && GameService.getInstance().sendFreeChoose(n).then((resp)=>{
				this.sendNotify(NotifyConst.chooseFreeBack, resp);
			});
		}
	}
}