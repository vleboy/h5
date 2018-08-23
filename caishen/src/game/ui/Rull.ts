module game {
	export class Rull extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "rullSkin.exml";
		}
		private groupMove: eui.Group;
		private groupRull: eui.Group;
		private rullMask: eui.Rect;
		//-----------变量------------
		/**页数数组*/
		private pageArr: number[];
		/**落点x*/
		private startX: number;
		/**拖拽多少距离换页*/
		private dragDistance: number;
		/**某一页groupRull的x位置*/
		private rullX: number;
		/**初始化*/
		public init(): void {
			this.defaultData();
			this.eventListen();
			this.defaultUI();
		}
		/**默认数据*/
		private defaultData(): void {
			this.pageArr = [0, 1, 2, 3, 4, 5];
			this.startX = 0;
			this.dragDistance = 200;
		}
		/**默认显示*/
		private defaultUI(): void {
			this.groupRull.mask = this.rullMask;
			this.btnState(0);
		}
		/**事件监听*/
		private eventListen(): void {
			this.pageArr.forEach(v => { this.registerEvent(this["btnRull" + v] as eui.Button, egret.TouchEvent.TOUCH_TAP, this.toThePage, this); });
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_END, this.onMove, this);
			this.registerEvent(this.groupMove, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMove, this);
		}
		/**点击按钮到当前页*/
		private toThePage(e: egret.TouchEvent): void {
			let tou: string = e.target.name.split("_")[1];
			this.btnState(+tou);
		}
		/**按钮状态*/
		private btnState(num: number): void {
			this.pageArr.forEach(v => { (this["btnRull" + v] as eui.Button).currentState = "up"; });
			(this["btnRull" + num] as eui.Button).currentState = "down";
			this.groupRull.left = -(num * 1726) + 97;
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
						this.groupRull.left = this.rullX;
					} else {
						let moveX: number = this.groupRull.left - this.rullX;
						let pageDistance: number = moveX >= 0 ? 1726 : -1726;
						this.groupRull.left = Math.abs(moveX) >= this.dragDistance ? this.rullX + pageDistance : this.rullX;
						this.btnState(Math.abs((this.groupRull.left - 97) / 1726));
					}
					this.rullX = this.groupRull.left;
					break;
				case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
					this.groupRull.left = this.rullX;
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