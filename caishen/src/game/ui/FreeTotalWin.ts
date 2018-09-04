module game {
	export class FreeTotalWin extends BaseUI{
		private winTxt: eui.BitmapLabel;
		private win:number;
		private num:number=0;

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeTotalWinSkin.exml";
		}

		public init(){

		}

		public showTotalWin(n:string){
			SoundPlayer.playEffect("CaiShen_243_FreeOver_mp3");
			this.visible = true;
			this.win = +n;
			this.num = 0;
			egret.Tween.get(this,{onChange:this.onChange, onChangeObj:this})
				.to({num:+n}, 2000)
				.call(this.stop);

			this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.stop, this);
		}
		private onChange(){
			this.winTxt.text = this.num.toFixed(2);
		}
		/**跳过缓动 */
		public stop(){
			egret.Tween.removeTweens(this);
			this.winTxt.text = ""+this.win;
			egret.Tween.get(this.winTxt)
				.to({scaleX:1.2, scaleY:1.2},300)
				.to({scaleX:1, scaleY:1},300)
				.wait(2000)
				.call(()=>{
					egret.Tween.removeTweens(this.winTxt);
					this.dispose();
				});
		}
		public dispose(){
			this.visible = false;
			this.sendNotify(NotifyConst.freeComplete);
		}
	}
}