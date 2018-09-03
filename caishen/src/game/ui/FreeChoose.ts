module game {
	export class FreeChoose extends BaseUI{
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeChooseSkin.exml";
		}

		public init(){
			this["yuanbaoGroup"].visible = false;
			["20","15","10","8","5"].forEach((v,i)=>{
				this.registerEvent(this["choose"+v], egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
			})
		}

		public show(){
			this["yuanbaoGroup"].visible = false;
			["20","15","10","8","5"].forEach((v,i)=>{
				let target = this["choose"+v];
				let defaultY = target.y;
				egret.Tween.get(target)
					.set({y:defaultY-1000})
					.wait(i*100+100)
					.call(()=>{
						SoundPlayer.playEffect("CaiShen_243_CardAppear_mp3");
					})
					.to({y:defaultY},200)
					.call(()=>{
						this.registerEvent(target, egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
					})
			})
		}

		private onTouch(e: egret.TouchEvent){
			SoundPlayer.playEffect("CaiShen_243_ChoseCard_mp3");
			let n = 0;
			switch(e.target.name){
				case "choose20": n=5;break;
				case "choose15": n=4;break;
				case "choose10": n=3;break;
				case "choose8":  n=2;break;
				case "choose5":  n=1;break;
			}
			n>0 && GameService.getInstance().sendFreeChoose(n).then(async (resp)=>{
				await this.yuanbaoAni();
				this.sendNotify(NotifyConst.chooseFreeBack, resp);
			});
		}

		private yuanbaoAni(){
			SoundPlayer.playEffect("CaiShen_243_CardEffect_mp3");
			let g = (this["yuanbaoGroup"] as eui.Group);
			let arr = [];
			g.visible = true;
			for(let i=g.numChildren-1; i>=0; i--){
				g.getChildAt(i).alpha = 0;
				arr.push(g.getChildAt(i));
			}

			return Promise.all(
				arr.map((v,i)=>{
					return new Promise((resolve, reject)=>{
						setTimeout(()=> {
							egret.Tween.get(v).to({alpha:1},200).call(()=>{
								egret.Tween.removeTweens(v);
								resolve();
							})
						}, 200*i);
					})
				})
			);
		}

	}
}