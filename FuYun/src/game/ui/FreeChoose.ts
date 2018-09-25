module game {
	export class FreeChoose extends BaseUI{
		private tipTxt: eui.Image;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeChooseSkin.exml";
		}

		public init(){
			["20","15","10","8","5"].forEach((v,i)=>{
				this.registerEvent(this["choose"+v], egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
			})
		}

		public show(){
			this["chooseGroup"].setChildIndex(this["rect"], 0);
			["10","5","15","8","20"].forEach((v,i)=>{
				this["chooseGroup"].setChildIndex(this["choose"+v], 1);
			});
			["20","8","15","5","10"].forEach((v,i)=>{
				let target = this["choose"+v];
				let defaultY = target.y;
				egret.Tween.get(target)
					.set({y:defaultY-900})
					.wait(i*150+500)
					.call(()=>{
						SoundPlayer.playEffect("FuYun_243_CardAppear_mp3");
					})
					.to({y:defaultY},400, egret.Ease.backOut)
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
			SoundPlayer.playEffect("FuYun_243_ChoseCard_mp3");
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
							mc.sources = "FuYunAni|1-16|_png";
							mc.x = 144;
							mc.y = 120;
							mc.width = 224;
							mc.height = 224;
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
						egret.Tween.removeTweens(this.tipTxt);
						this.sendNotify(NotifyConst.chooseFreeBack, respData);
					})
					
				}
			})
		}
	}
}