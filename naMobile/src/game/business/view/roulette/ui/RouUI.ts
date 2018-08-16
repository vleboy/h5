module game {
	export class RouUI extends BaseUI {
		public constructor(m?: BaseMediator) {
			super(m);
			//引用皮肤
			this.skinName = GlobalConfig.skinPath + "rouSkin.exml";
		}
		//--------------------变量区-------------------
		/**下注区*/
		private groupBets: eui.Group;
		/**对象创建完成后执行 */
		public initSetting() {
			this.defaultUI();
			this.listenEvent();
		}
		/** 收到mediator的通知，每个UI要复写这个方法 * */
		public onMediatorCommand(type: any, params: any = null): void {

		}
		/**事件注册*/
		private listenEvent(): void {
			this.registerEvent(this.groupBets, egret.TouchEvent.TOUCH_TAP, this.betsTouch, this);
		}
		/**默认ui显示*/
		private defaultUI(): void {
			this.cancelLight();
		}
		/**下注区点击事件*/
		private betsTouch(e: egret.Event): void {
			let theTou: string = e.target.name;
			this.betsType(theTou);
		}
		/**下注类型*/
		private betsType(tou: string): void {
			let touArr: string[] = tou.split("_");
			this.cancelLight();
			let lightArr: number[] = [];
			switch (touArr[1]) {
				case "column"://列
					lightArr = this.columnNum(+touArr[2]);
					break;
				case "dozen"://打
					lightArr = this.dozenNum(+touArr[2]);
					break;
				case "small"://小
					lightArr = this.smallNum();
					break;
				case "double"://双
					lightArr = this.singleNum(false);
					break;
				case "red"://红
					lightArr = this.redNum();
					break;
				case "block"://黑
					lightArr = this.redNum(false);
					break;
				case "single"://单
					lightArr = this.singleNum();
					break;
				case "big"://大
					lightArr = this.smallNum(false);
					break;
				default://数字
					touArr.forEach((v, i) => { if (i > 0) lightArr.push(+v) });
					break;
			}
			//显示高亮
			this.betsLight(lightArr);
		}
		/**下注高亮*/
		private betsLight(touArr: number[]): void {
			touArr.forEach(v => { (this["light_" + v] as eui.Image).visible = true; });
		}
		/**撤销高亮*/
		private cancelLight(): void {
			let numArr: number[] = this.betsNum();
			numArr.forEach(v => { (this["light_" + v] as eui.Image).visible = false; });
		}
		//-----------------方法区-----------------
		/**返回轮盘所有下注数字数组*/
		private betsNum(): Array<number> {
			let numArr: number[] = [];
			for (let i = 0; i <= 36; i++) { numArr.push(i); }
			return numArr;
		}
		/**返回单或双数字数组
		 * @param isS 是不是单数字数组
		*/
		private singleNum(isS: boolean = true): number[] {
			let singleArr: number[] = [], doubleArr: number[] = [];
			for (let i = 1; i <= 36; i++) { i % 2 != 0 ? singleArr.push(i) : doubleArr.push(i); }
			return isS ? singleArr : doubleArr;
		}
		/**返回红色或黑色数字数组
		 * @param isRed 是不是红色
		*/
		private redNum(isRed: boolean = true): number[] {
			let redArr: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
			let blockArr: number[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
			return isRed ? redArr : blockArr;
		}
		/**返回小或大数字数组
		 * @param isSmall 是不是小数字数组
		*/
		private smallNum(isSmall: boolean = true): number[] {
			let smallArr: number[] = [], bigArr: number[] = [];
			for (let i = 1; i <= 36; i++) { i <= 18 ? smallArr.push(i) : bigArr.push(i); }
			return isSmall ? smallArr : bigArr;
		}
		/**返回列数字数组
		 * @param index 第几列（默认为第一列）
		*/
		private columnNum(index: number = 1): number[] {
			let columnArr: number[] = [];
			for (let i = 1; i <= 36; i++) { if (i % 3 == index % 3) columnArr.push(i); }
			return columnArr;
		}
		/**返回打数字数组
		 * @param index 第几打（默认为第一打）
		*/
		private dozenNum(index: number = 1): number[] {
			let dozenArr: number[] = [];
			for (let i = 1; i <= 36; i++) { if (i <= 12 * index && i > 12 * (index - 1)) dozenArr.push(i); }
			return dozenArr;
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