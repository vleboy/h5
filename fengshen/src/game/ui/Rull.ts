module game {
	export class Rull extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "rullSkin.exml";
		}
		private startx: number;
		private startContentx: number;
		private distance = 200;
		private isTweening:boolean;
		/**赔率数组*/
		private oddsArr: number[][];
		/**初始化*/
		public init(): void {
			[1,2,3,4,5].forEach((v,i)=>{
				this["page"+v].x = 1920*i;
				
			})
			this["scrollGroup"].mask = new egret.Rectangle(0,0,1920,1080);
			this.registerEvent(this["contentGroup"], egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
			this.registerEvent(this["contentGroup"], egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
			this.registerEvent(this["contentGroup"], egret.TouchEvent.TOUCH_END, this.onEnd, this);
			this.registerEvent(this["contentGroup"], egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
			this.registerEvent(this["returnBtn"], egret.TouchEvent.TOUCH_TAP, this.return, this);
		}

		private onBegin(e: egret.TouchEvent){
			if(this.isTweening) return;
			this.startx = e.stageX;
			this.startContentx = this["contentGroup"].x;
		}
		private onMove(e: egret.TouchEvent){
			if(this.isTweening) return;
			this["contentGroup"].x = this.startContentx + e.stageX-this.startx;
		}
		private onEnd(e: egret.TouchEvent){
			this.isTweening = true;
			let targetX = this.startContentx;
			if(this["contentGroup"].x-this.startContentx > this.distance  && this["contentGroup"].x<0) targetX = this.startContentx+1920;
			else if(this.startContentx-this["contentGroup"].x > this.distance  && this["contentGroup"].x>-1920*4) targetX = this.startContentx-1920;

			egret.Tween.get(this["contentGroup"]).to({x:targetX}, 150).call(()=>{
				egret.Tween.removeTweens(this["contentGroup"]);
				this.isTweening = false;
			});
		}
		
		/**是否显示规则，默认关闭*/
		public rullShow(theBet: number, isShow: boolean = false): void {
			this.visible = isShow;
		}
		private return(){
			this.visible = false;
		}
	}
}