module game {
	export class BottomBar extends BaseUI {
		/**说明按钮*/
		private helpBtn: eui.Button;
		/**游戏开始按钮*/
		private spinBtn: eui.Button;
		/**下注*/
		private betBtn: eui.Button;
		/**单注*/
		private theBet: eui.Label;
		/**赢得*/
		private winTxt: eui.Label;
		/**总押注*/
		private allBet: eui.Label;
		/**自动转动*/
		private autoBtn: eui.Button;
		/**取消自动转动*/
		private cancelAutoBtn: eui.Button;
		/**转动的图片*/
		private spinArrow: eui.Image;
		/**按钮区自动框*/
		private groupAuto: eui.Group;
		/**自动图片*/
		private autoImg: eui.Image;
		/**自动次数*/
		private autoNum: eui.Image;
		/**选择自动转动次数框*/
		private groupAutoNum: eui.Group;
		/**单注选择框*/
		private groupBet: eui.Group;
		/**单注减少按钮*/
		private BtnLess: eui.Button;
		/**单注增加按钮*/
		private BtnMore: eui.Button;
		/**单注最大按钮*/
		private BtnMax: eui.Button;
		/**单注金额*/
		private betTxt: eui.Label;
		//--------------变量-------------
		/**单注数字数组*/
		private theBetArr: number[];
		/**当前注在数组的下标*/
		private theBetIndex: number;
		/**倍数*/
		private theBetMulit: number;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bottomSkin.exml";
		}
		/**初始化*/
		public init() {
			this.defaultData();
			this.eventListen();
			this.defaultUI();
		}
		/**默认数据*/
		private defaultData(): void {
			this.setBetData([0.1, 0.2, 0.5, 1, 2, 5, 10, 20], 0, 25);
			this.setWinMoney(40);
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.spin); }, this);
			this.registerEvent(this.helpBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.openHelp); }, this);
			["max", "100", "50", "20", "10"].forEach(v => { this.registerEvent(this["btn_" + v] as eui.Button, egret.TouchEvent.TOUCH_TAP, this.touchAutoNum, this); });
			this.registerEvent(this.betBtn, egret.TouchEvent.TOUCH_TAP, this.chooseBetLevel, this);
			this.registerEvent(this.autoBtn, egret.TouchEvent.TOUCH_TAP, this.touchAuto, this);
			this.registerEvent(this.cancelAutoBtn, egret.TouchEvent.TOUCH_TAP, this.touchCancelAuto, this);
			this.registerEvent(this.BtnLess, egret.TouchEvent.TOUCH_TAP, this.reduceBetLevel, this);
			this.registerEvent(this.BtnMore, egret.TouchEvent.TOUCH_TAP, this.addBetLevel, this);
			this.registerEvent(this.BtnMax, egret.TouchEvent.TOUCH_TAP, this.maxBetLevel, this);
		}
		/**默认显示*/
		private defaultUI(): void {
			this.imgSpin();
		}
		/**某Group显示隐藏动画*/
		private showTween(group: eui.Group, btm: number, callFun?: Function): void {
			egret.Tween.get(group)
				.to({ bottom: btm }, 400)
				.call(() => {
					egret.Tween.removeTweens(group);
					callFun && callFun.call(this);
				});
		}
		/**点击自动转到次数按钮*/
		private touchAutoNum(e: egret.TouchEvent): void {
			this.sendNotify(NotifyConst.spin, e.target.name.split("_")[1]);
			this.showAutoBtn(false);
			this.showTween(this.groupAutoNum, -400, () => {
				this.groupAutoNum.visible = false;
			});
		}
		/**是否显示自动转动按钮*/
		private showAutoBtn(isShow: boolean): void {
			this.autoBtn.visible = isShow;
			this.cancelAutoBtn.visible = !isShow;
		}
		/**图片旋转*/
		private imgSpin(isStop: boolean = false): void {
			isStop ? egret.Tween.removeTweens(this.spinArrow) : egret.Tween.get(this.spinArrow).to({ rotation: 360 }, 500);
		}
		/**点击单注*/
		private chooseBetLevel(): void {
			let betShow = () => {
				this.groupBet.visible = true;
				this.showTween(this.groupBet, 126);
			}
			this.groupBet.visible ? this.showTween(this.groupBet, -100, () => {
				this.groupBet.visible = false;
			}) : betShow();
		}
		/**校验加减号状态和设置单注下注档次*/
		private checkPlusReduceState(): void {
			this.BtnLess.touchEnabled = this.theBetIndex != 0;
			this.BtnMore.touchEnabled = this.theBetIndex != this.theBetArr.length - 1;
			this.betTxt.text = this.theBetArr[this.theBetIndex] + "";
			this.theBet.text = "单注：" + this.theBetArr[this.theBetIndex];
			this.allBet.text = "总押注：" + this.theBetArr[this.theBetIndex] * this.theBetMulit;
		}

		/**单注增加*/
		private addBetLevel(): void {
			this.theBetIndex < this.theBetArr.length - 1 && this.theBetIndex++;
			this.checkPlusReduceState();
		}
		/**单注减少*/
		private reduceBetLevel(): void {
			this.theBetIndex > 0 && this.theBetIndex--;
			this.checkPlusReduceState();
		}
		/**单注最大*/
		private maxBetLevel(): void {
			this.theBetIndex = this.theBetArr.length - 1;
			this.checkPlusReduceState();
		}
		/**自动转动*/
		private touchAuto(): void {
			if (this.groupAutoNum.visible) {
				this.showTween(this.groupAutoNum, -400, () => { this.groupAutoNum.visible = false; });
			} else {
				this.groupAutoNum.visible = true;
				this.showTween(this.groupAutoNum, 107);
			}
		}
		/**取消自动转动*/
		private touchCancelAuto(): void {
			this.sendNotify(NotifyConst.cancelAutoSpin);
		}
		/**单注数据和倍数
		 * @param betArr 单注数字数组
		 * @param index 当前注在数组的下标
		 * @param mulit 倍数
		*/
		public setBetData(betArr: number[], index: number, mulit: number): void {
			if (betArr) this.theBetArr = betArr;
			if (index != undefined) this.theBetIndex = index;
			if (mulit != undefined) this.theBetMulit = mulit;
			this.checkPlusReduceState();
		}
		/**返回单注金额下标*/
		public getBetMoneyIndex(): number { return this.theBetIndex; }
		/**赢得钱*/
		public setWinMoney(mon: number): void {
			this.winTxt.text = mon + "";
		}
		/**开始转动按钮状态*/
		public setSpinEnable(b: boolean) {
			this.spinBtn.enabled = b;
		}
		/**按钮状态
		 * type--1:等待转动状态，2：正在转动状态，3：转动完成但还没有数据，4：还没转动完成就有数据，5：转动完成，已有数据，6：自动转动状，7：免费状态
		*/
		public btnState(type: number) {
			switch (type) {
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				case 7:
					break;
			}
		}
		/***/
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
		public dispose(): void {
			super.dispose();
		}
	}
}