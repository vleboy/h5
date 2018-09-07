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
			this["chooseGroup"].setChildIndex(this["rect"], 0);
			["5","8","10","15","20"].forEach((v,i)=>{
				let target = this["choose"+v];
				let defaultY = target.y;
				this["chooseGroup"].setChildIndex(target, 1);
				egret.Tween.get(target)
					.set({y:defaultY-1000})
					.wait((4-i)*100+500)
					.call(()=>{
						SoundPlayer.playEffect("CaiShen_243_CardAppear_mp3");
					})
					.to({y:defaultY+50},200)
					.to({y:defaultY},30)
					.call(()=>{
						this.registerEvent(target, egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
					})
			})

			egret.Tween.get(this.tipTxt, {loop:true})
				.wait(2000)
				.to({alpha: 0.5}, 500)
				.to({alpha: 1}, 500)
		}

		private onTouch(e: egret.TouchEvent){
			SoundPlayer.playEffect("CaiShen_243_ChoseCard_mp3");
			let n = 0;
			switch(e.target){
				case this["choose20"]: n=5;break;
				case this["choose15"]: n=4;break;
				case this["choose10"]: n=3;break;
				case this["choose8"]:  n=2;break;
				case this["choose5"]:  n=1;break;
			}

			["20","15","10","8","5"].forEach((v)=>{
				let target = this["choose"+v] as eui.Group;
				if(e.target != target){
					this["chooseGroup"].setChildIndex(target, 0);
				}
				else{
					let respData;
					Promise.all([
						new Promise((resolve, reject)=>{
							let mc = new AMovieClip();
							mc.sources = "caishenAni|1-16|_png";
							mc.x = 94;
							mc.y = 67;
							mc.width = 319;
							mc.height = 321;
							mc.speed = 4;
							mc.loop = 2;
							target.addChildAt(mc, 2);
							mc.play();
							mc.once(AMovieClip.COMPLETE, ()=>{
								mc.parent.removeChild(mc);
								resolve();
							}, this);
						}),
						new Promise((resolve, reject)=>{
							n>0 && GameService.getInstance().sendFreeChoose(n).then(async (resp)=>{
								respData = resp;
								resolve();
									
							});
						})
					]).then(async()=>{
						await this.yuanbaoAni();
						this.sendNotify(NotifyConst.chooseFreeBack, respData);
					})
					
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
							egret.Tween.get(v).to({alpha:1},200).wait(500).call(()=>{
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