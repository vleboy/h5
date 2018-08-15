module game {
	export class TurnCard extends eui.Component{
		private backSource:string = "Back_png";
		private valueSource:string = "C1_png";
		private cardGroup:eui.Group;
		private backCard:eui.Image;
		private valueCard:eui.Group;
		private maskImg:eui.Image;
		/**边缘触发咪牌的像素范围 */
		private touchArea:number = 100;
		/**记录起始的点 */
		private startPoints:Array<PointClass> = [];
		/**记录当前移动的点 以touchid为key,point为value*/
		private movePoints:any = {};
		/**咪牌方向 */
		private direction:MiDirection;
		private testLabel: eui.Label;

		public constructor(w,h) {
			super();
			this.width = w;
			this.height = h;

			this.once(egret.Event.ADDED_TO_STAGE, this.initView, this);
		}

		private initView(){
			let touchbg = new eui.Image(this.backSource);
			touchbg.width = this.width;
			touchbg.height = this.height;
			touchbg.alpha = 0.01;
			this.addChild(touchbg);

			this.cardGroup = new eui.Group();
			this.addChild(this.cardGroup);

			this.backCard = new eui.Image(this.backSource);
			this.backCard.width = this.width;
			this.backCard.height = this.height;
			this.cardGroup.addChild(this.backCard);

			this.valueCard = new eui.Group();
			this.valueCard.width = this.width;
			this.valueCard.height = this.height;
			this.valueCard.touchEnabled=false;
			this.valueCard.touchChildren=false;
			this.valueCard.visible = false;
			this.cardGroup.addChild(this.valueCard);

			let img = new eui.Image(this.valueSource);
			img.rotation = 90;
			img.left = img.right = img.top = img.bottom = 0;
			this.valueCard.addChild(img);

			this.maskImg = new eui.Image(this.backSource);
			this.maskImg.width = this.width*2;
			this.maskImg.height = this.width*2;
			this.maskImg.x = -this.width;
			this.maskImg.y = -this.width;
			this.maskImg.visible = false;
			this.maskImg.touchEnabled=false;
			this.maskImg.alpha = 0.5;
			this.addChild(this.maskImg);

			this.testLabel = new eui.Label();
			this.testLabel.percentWidth = 100;
			this.testLabel.y = 50;
			this.testLabel.textAlign = "center";
			this.testLabel.textColor = 0x000000;
			this.addChild(this.testLabel);

			this.initListener();
		}

		private initListener(b:boolean=true){
			if(b){
				this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
				this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
				this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
				this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
			}
			else{
				this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
			}
		}

		private onBegin(e: egret.TouchEvent){
			console.log("onBegin ",e);
			this.movePoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
			this.testLabel.text = "按下 "+e.touchPointID;

			let x = e.stageX - this.x;
			let y = e.stageY - this.y;
			/**按下第一个点 */
			if(!this.startPoints.length){
				if(y>this.height-this.touchArea){
					console.log("从下开始咪牌");
					this.direction = MiDirection.BOTTOM_TOP;
					this.startPoints.push(new PointClass(e.stageX, e.stageY, e.touchPointID));
				}
				else if(y<this.touchArea){
					console.log("从上开始咪牌");
					this.direction = MiDirection.TOP_BOTTOM;
					this.startPoints.push(new PointClass(e.stageX, e.stageY, e.touchPointID));
				}
				else if(y>=this.touchArea && y<=this.height-this.touchArea && x<this.touchArea){
					console.log("从左开始咪牌");
					this.direction = MiDirection.LEFT_RIGHT;
					this.startPoints.push(new PointClass(e.stageX, e.stageY, e.touchPointID));
				}
				else if(y>=this.touchArea && y<=this.height-this.touchArea && x>this.width-this.touchArea){
					console.log("从右开始咪牌");
					this.direction = MiDirection.RIGHT_LEFT;
					this.startPoints.push(new PointClass(e.stageX, e.stageY, e.touchPointID));
				}
				else{
					console.log("落点不在边缘，不能咪牌");
				}
			}
			/**按下第二个点 */
			else if(this.startPoints.length==1 && this.startPoints[0].touchID!=e.touchPointID){
				this.startPoints.push(new PointClass(e.stageX, e.stageY, e.touchPointID));
			}
		}
		private onMove(e: egret.TouchEvent){
			this.movePoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
			/**单手咪牌 */
			if(this.startPoints.length==1 && this.startPoints[0].touchID==e.touchPointID){
				this.testLabel.text = "单手咪牌 移动 "+e.touchPointID;
				console.log("单手咪牌 方向"+this.direction)
				let p = this.startPoints[0];

				this.valueCard.visible = true;
				this.valueCard.x = e.stageX-this.x;
				this.valueCard.y = e.stageY-this.y;
				this.valueCard.anchorOffsetX = e.stageX -this.x;
				this.valueCard.anchorOffsetY = this.y + this.height-e.stageY;
				this.valueCard.rotation = -Math.atan( (p.startX-e.stageX)/(p.startY-e.stageY) )/Math.PI*180*2;

				this.maskImg.visible = true;
				this.maskImg.x = e.stageX-this.x;
				this.maskImg.y = e.stageY-this.y;
				
				if(this.direction == MiDirection.BOTTOM_TOP){
					this.maskImg.anchorOffsetX = this.maskImg.width/2;
					this.maskImg.anchorOffsetY = this.maskImg.height;
					this.maskImg.rotation = -Math.atan( (p.startX-e.stageX)/(p.startY-e.stageY) )/Math.PI*180;
				}
				else if(this.direction == MiDirection.TOP_BOTTOM){
					this.maskImg.anchorOffsetX = this.maskImg.width/2;
					this.maskImg.anchorOffsetY = 0;
					this.maskImg.rotation = -Math.atan( (p.startX-e.stageX)/(p.startY-e.stageY) )/Math.PI*180;
				}
				else if(this.direction == MiDirection.LEFT_RIGHT){
					this.maskImg.anchorOffsetX = 0;
					this.maskImg.anchorOffsetY = this.maskImg.height/2;
					this.maskImg.rotation = Math.atan( (p.startY-e.stageY)/(p.startX-e.stageX) )/Math.PI*180;
				}
				else if(this.direction == MiDirection.RIGHT_LEFT){
					this.maskImg.anchorOffsetX = this.maskImg.width;
					this.maskImg.anchorOffsetY = this.maskImg.height/2;
					this.maskImg.rotation = Math.atan( (p.startY-e.stageY)/(p.startX-e.stageX) )/Math.PI*180;
				}

				
				if(!this.maskImg.hitTestPoint(this.x+this.width/2, this.y+this.height/2)){
					this.miOver();
				}
				else{
					this.cardGroup.mask = this.maskImg;
				}
			}
			/**双手咪牌 */
			else if(this.startPoints.length==2){
				this.testLabel.text = "双手咪牌 移动 "+e.touchPointID;
				this.computeTwoPoints();
			}
		}
		/**计算两只手咪牌的角度 */
		private computeTwoPoints(){
			let arr: egret.Point[] = [];
			for(let touchID in this.movePoints){
				arr.push(this.movePoints[touchID]);
			}

			this.valueCard.visible = true;
			this.valueCard.x = arr[0].x-this.x;
			this.valueCard.y = arr[0].y-this.y;
			this.valueCard.anchorOffsetX = arr[0].x-this.x;
			this.valueCard.anchorOffsetY = this.y + this.height-arr[0].y;
			this.valueCard.rotation = Math.atan((arr[0].y-arr[1].y)/(arr[0].x-arr[1].x)) /Math.PI * 180 * 2;
			
			this.maskImg.visible = true;
			this.maskImg.x = arr[0].x-this.x;
			this.maskImg.y = arr[0].y-this.y;
			
			if(this.direction == MiDirection.BOTTOM_TOP){
				this.maskImg.anchorOffsetX = this.maskImg.width/2;
				this.maskImg.anchorOffsetY = this.maskImg.height;
				this.maskImg.rotation = Math.atan((arr[0].y-arr[1].y)/(arr[0].x-arr[1].x)) /Math.PI * 180;
			}
			else if(this.direction == MiDirection.TOP_BOTTOM){
				this.maskImg.anchorOffsetX = this.maskImg.width/2;
				this.maskImg.anchorOffsetY = 0;
				this.maskImg.rotation = Math.atan((arr[0].y-arr[1].y)/(arr[0].x-arr[1].x)) /Math.PI * 180;
			}
			else if(this.direction == MiDirection.LEFT_RIGHT){
				this.maskImg.anchorOffsetX = 0;
				this.maskImg.anchorOffsetY = this.maskImg.height/2;
				this.maskImg.rotation = -Math.atan((arr[0].x-arr[1].x)/(arr[0].y-arr[1].y)) /Math.PI * 180;
			}
			else if(this.direction == MiDirection.RIGHT_LEFT){
				this.maskImg.anchorOffsetX = this.maskImg.width;
				this.maskImg.anchorOffsetY = this.maskImg.height/2;
				this.maskImg.rotation = -Math.atan((arr[0].x-arr[1].x)/(arr[0].y-arr[1].y)) /Math.PI * 180;
			}
			this.cardGroup.mask = this.maskImg;
			this.testLabel.text = "双手咪牌 方向"+this.direction+" "+this.maskImg.rotation;
		}
		private onEnd(e: egret.TouchEvent){
			this.testLabel.text = "松开 "+e.touchPointID;
			console.log("onEnd ",e);
			this.startPoints.map((v:PointClass,i:number)=>{
				if(v.touchID == e.touchPointID){
					this.startPoints.splice(i,1);
				}
			},this);
			/**停止咪牌 */
			if(!this.startPoints.length){
				this.valueCard.visible = false;
				this.maskImg.visible = false;
				this.cardGroup.mask = null;
				this.direction = 0;
			}
			/**转为单手咪牌 */
			else if(this.startPoints.length == 1){

			}
		}

		/**咪牌完成，翻开正面 */
		private miOver(){
			this.initListener(false);
			this.maskImg.visible = false;
			this.cardGroup.mask = null;
			this.valueCard.visible = true;
			this.valueCard.rotation = 0;
			this.valueCard.x = 0;
			this.valueCard.y = 0;
			this.valueCard.anchorOffsetX = 0;
			this.valueCard.anchorOffsetY = 0;
		}

	}

	class PointClass{
		x:number;
		y:number;
		startX:number;
		startY:number;
		touchID:number;
		constructor(x?:number,y?:number,touchID?:number){
			this.x = x;
			this.y = y;
			this.startX = x;
			this.startY = y;
			this.touchID = touchID;
		}
	}

	enum MiDirection{
		TOP_BOTTOM=1,
		BOTTOM_TOP,
		LEFT_RIGHT,
		RIGHT_LEFT
	}
}