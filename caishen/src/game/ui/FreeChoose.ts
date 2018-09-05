module game {
	export class FreeChoose extends BaseUI{
		private tipTxt: eui.Image;
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
					.to({y:defaultY+50},200)
					.to({y:defaultY},30)
					.call(()=>{
						this.registerEvent(target, egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
					})
			})

			this.tipTxt.alpha = 0.5;
			egret.Tween.get(this.tipTxt, {loop:true})
				.set({alpha: 0.5})
				.to({alpha: 1}, 500)
				.to({alpha: 0.5}, 500)
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

			["20","15","10","8","5"].forEach((v)=>{
				let target = this["choose"+v];
				if(e.target != target){
					this.setChildIndex(target, 0);
				}
				else{
					let mc = new AMovieClip();
					mc.sources = "caishenAni|1-16|_png";
					mc.x = target.x + 131;
					mc.y = target.y + 98;
					mc.width = 331;
					mc.height = 320;
					mc.speed = 4;
					mc.loop = 2;
					this["mcGroup"].addChild(mc);
					mc.play();
					mc.once(AMovieClip.COMPLETE, ()=>{
						this["mcGroup"].removeChild(mc);
						n>0 && GameService.getInstance().sendFreeChoose(n).then(async (resp)=>{
							await this.yuanbaoAni();
							this.sendNotify(NotifyConst.chooseFreeBack, resp);
						});
					}, this);
				}
			})
		}

		private yuanbaoAni(){
			SoundPlayer.playEffect("CaiShen_243_CardEffect_mp3");
			egret.Tween.removeTweens(this.tipTxt);
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