module game {
	export class RouUI extends BaseUI {
		public constructor(m?: BaseMediator) {
			super(m);
			//引用皮肤
			this.skinName = GlobalConfig.skinPath + "rouSkin.exml";
		}
		//--------------------变量区-------------------
		/**游戏点击区*/
		private touchBet: eui.Group;
		/**0的点击区*/
		private touch_0: eui.Image;

		/**半线宽*/
		private halfLine: number;
		/**竖直线的x位置数组*/
		private verXArr: number[];
		/**水平的y位置数组*/
		private horYArr: number[];
		/**下注类型*/
		private betType: string[];
		/**第一列*/
		private column1: number[];
		/**第二列*/
		private column2: number[];
		/**第三列*/
		private column3: number[];
		//----------------函数区----------------------
		/**对象创建完成后执行 */
		public initSetting() {
			this.defaultData();
			this.defaultUI();
			this.listenEvent();
			this.touch_0.pixelHitTest = true;
		}
		/** 收到mediator的通知，每个UI要复写这个方法 * */
		public onMediatorCommand(type: any, params: any = null): void {

		}
		/**事件注册*/
		private listenEvent(): void {
			this.registerEvent(this.touchBet, egret.TouchEvent.TOUCH_TAP, this.betsTouch, this);
			this.registerEvent(this.touch_0, egret.TouchEvent.TOUCH_TAP, this.ZeroTouch, this)
		}
		/**默认ui显示*/
		private defaultUI(): void {
			this.cancelLight();
		}
		/**默认数据*/
		private defaultData(): void {
			this.betType = ["column", "dozen", "small", "double", "red", "block", "single", "big"];
			this.halfLine = 10;
			this.verXArr = this.ver13X();
			this.horYArr = this.hor5Y();
			[1, 2, 3].forEach(v => { this["column" + v] = this.columnNum(v); });
		}
		/**下注区点击事件*/
		private betsTouch(e: egret.TouchEvent): void {
			//排除0的下注点击事件
			if (!e.target.name) {
				let theTou = this.touchArea(new egret.Point(e.localX, e.localY));
				if (theTou) this.betsShow(theTou);
			}
		}
		/**0的下注点击事件*/
		private ZeroTouch(): void {
			this.betsShow("0");
		}
		//-----------------------玩家操作区----------------------
		/**下注相关显示*/
		private betsShow(tou: string): void {
			let touArr: string[] = tou.split("_");
			this.cancelLight();
			let lightArr: number[] = [];
			switch (touArr[0]) {
				case this.betType[0]://列
					lightArr = this.columnNum(+touArr[1]);
					break;
				case this.betType[1]://打
					lightArr = this.dozenNum(+touArr[1]);
					break;
				case this.betType[2]://小
					lightArr = this.smallNum();
					break;
				case this.betType[3]://双
					lightArr = this.singleNum(false);
					break;
				case this.betType[4]://红
					lightArr = this.redNum();
					break;
				case this.betType[5]://黑
					lightArr = this.redNum(false);
					break;
				case this.betType[6]://单
					lightArr = this.singleNum();
					break;
				case this.betType[7]://大
					lightArr = this.smallNum(false);
					break;
				default://数字
					touArr.forEach((v, i) => { lightArr.push(+v) });
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
		/**显示未确定下注*/
		private showWaitBet(): void {

		}
		/**显示确定下注*/
		private showSureBet(): void {

		}
		/**撤销未确定下注*/
		private cancelWaitBet(): void {

		}
		/**撤销确定下注*/
		private cancelSureBet(): void {

		}
		//-----------------轮盘下注数组方法区-----------------
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
		//------------------点击判断某下注区域的方法区-------------------
		/**返回竖直13条线的x位置数组*/
		private ver13X(): number[] {
			let verArr = [];
			for (let i = 1; i <= 13; i++) { verArr.push((this["ver_" + i] as eui.Rect).left); }
			return verArr;
		}
		/**返回水平5条线的y位置数组*/
		private hor5Y(): number[] {
			let horArr = [];
			for (let i = 1; i <= 5; i++) { horArr.push((this["hor_" + i] as eui.Rect).top); }
			return horArr;
		}
		/**判断是不是列*/
		private touchCol(tou: egret.Point): boolean { return tou.x > this.verXArr[12]; }
		/**判断是不是数字区域*/
		private touchNum(tou: egret.Point): boolean { return tou.y <= this.horYArr[3]; }
		/**点击区域判断并返回下注类型*/
		private touchArea(tou: egret.Point): string {
			//先判断是不是点击列再判断是不是点击数字区域
			return this.touchCol(tou) ? this.colArea(tou) : (this.touchNum(tou) ? this.numArea(tou) : this.smlAndDozArea(tou));
		}
		/**点击数字区域*/
		private numArea(tou: egret.Point): string {
			let areaType = "";
			//判断在哪一行，分为5行(第一列（轮盘显示的），横线上，第二列，横线上，第三列)
			let rowNum = () => {
				let row: number = 0;
				this.horYArr.forEach((v, i, arr) => {
					//特殊处理第三列
					let col3 = i != 2 ? this.halfLine : 0;
					//特殊处理第一列
					let col1 = i != 0 ? this.halfLine : 0;
					//先判断是不是在线上
					if (i <= 2 && tou.y > v - col1 && tou.y <= v + this.halfLine) { row = i * 2 };
					//再判断是不是在列上
					if (i <= 2 && tou.y > v + col1 && tou.y <= arr[i + 1] - col3) { row = (i * 2) + 1; };
				});
				return row;
			}
			//判断在哪一列，分为24列(竖线上，列上，竖线上，列上••••)
			let colNum = () => {
				let col: number = 0;
				this.verXArr.forEach((v, i, arr) => {
					//特殊处理最后一列
					let lastCol = i != 11 ? this.halfLine : 0;
					//先判断是不是在线上
					if (i <= 11 && tou.x > v - this.halfLine && tou.x <= v + this.halfLine) { col = i * 2 + 1 }
					//再判断是不是在竖列上
					if (i <= 11 && tou.x > v + this.halfLine && tou.x <= arr[i + 1] - lastCol) { col = (i + 1) * 2 }
				});
				return col;
			}
			//----判断区域----
			let theRow: number = rowNum(), theCol: number = colNum();
			if (theRow && theCol) {
				let halfRow = theRow / 2;
				//是不是在横线上
				let ishor: boolean = theRow % 2 == 0;
				//特殊处理竖直第一列
				if (theCol == 1) {
					areaType = ishor ? "0_" + halfRow + "_" + (halfRow + 1) : "0_" + Math.ceil(halfRow);
				} else {
					let halfCol = theCol / 2;
					//是不是在竖线上
					let isVer: boolean = theCol % 2 != 0;
					let index: number = Math.floor(halfCol);
					//在横线上
					let onLine = () => {
						//第几列数字数组
						let theArr1: number[] = this["column" + halfRow], theArr2: number[] = this["column" + (halfRow + 1)];
						areaType = isVer ? theArr1[index - 1] + "_" + theArr2[index - 1] + "_" + theArr1[index] + "_" + theArr2[index] : theArr1[index - 1] + "_" + theArr2[index - 1];
					}
					//不在横线上
					let unLine = () => {
						//第几列数字数组
						let theArr: number[] = this["column" + Math.ceil(halfRow)];
						areaType = isVer ? theArr[index - 1] + "_" + theArr[index] : theArr[halfCol - 1] + "";
					}
					ishor ? onLine() : unLine();
				}
			}
			return areaType;
		}
		/**点击列区域*/
		private colArea(tou: egret.Point): string {
			let areaType = "";
			this.horYArr.forEach((v, i, arr) => { if (i <= 2 && tou.y > v && tou.y <= arr[i + 1]) areaType = this.betType[0] + "_" + (i + 1); });
			return areaType;
		}
		/**点击打和小双红黑单大区域*/
		private smlAndDozArea(tou: egret.Point): string {
			let areaType = "";
			//打区域
			let dozArea = () => {
				this.verXArr.forEach((v, i, arr) => {
					if (i > 0 && i % 4 == 0 && tou.x > arr[i - 4] && tou.x <= v) areaType = this.betType[1] + "_" + (i / 4);
				});
			};
			//小双红黑单大区域
			let smlArea = () => {
				this.verXArr.forEach((v, i, arr) => {
					if (i > 0 && i % 2 == 0 && tou.x > arr[i - 2] && tou.x <= v) areaType = this.betType[(i / 2) + 1];
				});
			}
			//是不是打
			tou.y <= this.horYArr[4] ? dozArea() : smlArea();
			return areaType;
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