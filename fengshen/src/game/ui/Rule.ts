module game {
	export class Rule extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "ruleSkin.exml";
		}
		private startx: number;
		private startContentx: number;
		private distance = 200;
		private isTweening:boolean;
		private pointRed: eui.Image;
		/**赔率数组*/
		private rateArr: number[][] = [
				[800, 100, 50],
				[800, 100, 35],
				[800, 100, 30],
				[300, 50, 20],
				[300, 35, 15],
				[200, 30, 10],
				[200, 20, 10],
				[100, 15, 10],
				[100, 15, 5],
				[100, 10, 5]
			];
		/**初始化*/
		public init(): void {
			[1,2,3,4,5].forEach((v,i)=>{
				this["page"+v].x = 1920*i;
				this.registerEvent(this["point"+i], egret.TouchEvent.TOUCH_TAP, this.onPoint, this);
			})
			this["scrollGroup"].mask = new egret.Rectangle(182,159,1556,834);
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
				this.showPagePoint(-this["contentGroup"].x/1920);
			});
		}
		private onPoint(e){
			let page = e.target.name;
			this.isTweening = true;
			egret.Tween.get(this["contentGroup"]).to({x:-page*1920}, 150).call(()=>{
				egret.Tween.removeTweens(this["contentGroup"]);
				this.isTweening = false;
				this.showPagePoint(page);
			});
		}
		private showPagePoint(n){
			this.pointRed.horizontalCenter = this["point"+n].horizontalCenter;
		}
		
		/**是否显示规则，默认关闭*/
		public rullShow(theBet: number, isShow: boolean = false): void {
			this.visible = isShow;
			this.rateArr.forEach((v1, i)=>{
				v1.forEach((v2, j)=>{
					(this["rate"+i+j] as eui.BitmapLabel).letterSpacing = -10;
					this["rate"+i+j].text = NumberUtil.toFixed2(v2*theBet);
				})
			})
		}
		private return(){
			this.visible = false;
		}
	}
}