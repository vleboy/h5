module game {
	export class FreeChoose extends BaseUI{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeChooseSkin.exml";
		}

		public init(){
			["20","15","10","8","5"].forEach((v,i)=>{
				let target = this["choose"+v];
				let defaultY = target.y;
				egret.Tween.get(target)
					.set({y:-200})
					.wait(i*200+200)
					.to({y:defaultY},500)
					.call(()=>{
						this.registerEvent(target, egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
					})
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