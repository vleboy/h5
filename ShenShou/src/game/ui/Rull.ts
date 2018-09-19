module game {
	export class Rull extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "rullSkin.exml";
		}
		private groupMove: eui.Group;
		private groupRull: eui.Group;
		private btnClose: eui.Button;
		//-----------变量------------
		/**页数数组*/
		private pageArr: number[];
		/**落点x*/
		private startX: number;
		/**拖拽多少距离换页*/
		private dragDistance: number;
		/**某一页groupRull的x位置*/
		private rullX: number;
		/**赔率数组*/
		private oddsArr: number[][];
		/**初始化*/
		public init(): void {
			this.defaultData();
			this.eventListen();
			this.defaultUI();
		}
		/**是否显示规则，默认关闭*/
		public rullShow(theBet: number, isShow: boolean = false): void {
			this.visible = isShow;
			if (isShow) {
				this.btnState(0, false);
				this.setOdds(theBet);
				SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3");
			}
		}
		/**默认数据*/
		private defaultData(): void {
			this.pageArr = [0, 1, 2, 3, 4, 5];
			this.startX = 0;
			this.dragDistance = 300;
			this.oddsArr = [
				[800, 100, 50],
				[800, 100, 35],
				[800, 100, 30],
				[300, 50, 20],
				[300, 35, 15],
				[200, 30, 10],
				[200, 20, 10],
				[100, 15, 10],
				[100, 15, 5],
				[100, 10, 5],
				[50, 10, 5],
			]
		}
		private ruleScroll: eui.Group;
		/**默认显示*/
		private defaultUI(): void {
			this.rullShow(0.01);
			this.ruleScroll.mask = new egret.Rectangle(97, 0, 1726, 1080);
		}
		/**设置赔率*/
		private setOdds(theBet: number): void {
			let bet: number = theBet * 100;
			this.oddsArr.forEach((v, i) => {
				v.forEach((k, j) => {
					(this["pageTxt_" + i + "_" + j] as eui.Label).textFlow = [
						{ text: (5 - j) + " ", style: { "textColor": 0xFCC434 } },
						{ text: (k * bet / 100).toFixed(2), style: { "textColor": 0xF1EABD } }
					]
				})
			})
		}
		/**事件监听*/
		private eventListen(): void {
			this.pageArr.forEach(v => { this.registerEvent(this["btnRull" + v] as eui.Button, egret.TouchEvent.TOUCH_TAP, this.toThePage, this); });
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_END, this.onMove, this);
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMove, this);
			this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, () => {
				this.rullShow(0.01);
				SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
			}, this);
		}
		/**点击按钮到当前页*/
		private toThePage(e: egret.TouchEvent): void {
			let tou: string = e.target.name.split("_")[1];
			this.btnState(+tou);
		}
		/**按钮状态*/
		private btnState(num: number, isAni: boolean = true, timer: number = 500, callBack?: Function): void {
			num = Math.floor(num);
			this.pageArr.forEach(v => { (this["btnRull" + v] as eui.Button).currentState = "up"; });
			(this["btnRull" + num] as eui.Button).currentState = "down";
			let move: number = -(num * 1726) + 97;
			isAni ? this.moveAni(move, timer).then(() => {
				callBack && callBack.call(this);
			}) : this.groupRull.left = move;
		}
		/**滑动动画*/
		private moveAni(move: number, timer: number = 500) {
			return new Promise((res, rej) => {
				egret.Tween.removeTweens(this.groupRull);
				egret.Tween.get(this.groupRull)
					.to({ left: move }, timer)
					.call(() => {
						egret.Tween.removeTweens(this.groupRull);
						res();
					});
			})
		}
		/**手指滑动*/
		private onMove(e: egret.TouchEvent): void {
			switch (e.type) {
				case egret.TouchEvent.TOUCH_BEGIN://点击开始
					this.startX = e.localX;
					this.rullX = this.groupRull.left;
					break;
				case egret.TouchEvent.TOUCH_MOVE://拖动
					this.groupRull.left = this.rullX + (e.localX - this.startX);
					break;
				case egret.TouchEvent.TOUCH_END://翻页或回弹
					if (this.groupRull.left > 97 || this.groupRull.left < -8533) {
						this.moveAni(this.rullX, 300).then(() => this.rullX = this.groupRull.left);
					} else {
						let moveX: number = this.groupRull.left - this.rullX;
						let pageDistance: number = moveX >= 0 ? 1726 : -1726;
						let theLeft: number = Math.abs(moveX) < this.dragDistance ? this.rullX : this.rullX + pageDistance;
						this.btnState(Math.abs((theLeft - 97) / 1726), true, 300, () => this.rullX = this.groupRull.left);
					}
					break;
				case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
					this.moveAni(this.rullX, 300);
					break;
			}
		}

		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
		public dispose(): void {
			super.dispose();
		}
	}
}