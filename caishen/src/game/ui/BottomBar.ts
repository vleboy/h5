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
			this.showAndBtm(this.groupBet, false, -100);
			this.showAndBtm(this.groupAutoNum, false, -400);
		}
		/**某Group的显示隐藏和bottom*/
		private showAndBtm(group: eui.Group, isShow: boolean, btm: number): void {
			group.visible = isShow;
			group.bottom = btm;
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
			let num = e.target.name.split("_")[1];
			this.showTween(this.groupAutoNum, -400, () => {
				this.showAndBtm(this.groupAutoNum, false, -400);
			});
		}
		/**点击单注*/
		private chooseBetLevel(): void {
			let group: eui.Group = this.groupBet;
			let betShow = () => {
				this.showAndBtm(this.groupBet, true, -100);
				this.showTween(group, 126);
			}
			this.groupBet.visible ? this.showTween(group, -100, () => {
				this.showAndBtm(this.groupBet, false, -100);
				this.theBet.text = "单注：" + this.getBetMoney();
				this.allBet.text = "总押注：" + this.getBetMoney() * this.theBetMulit;
			}) : betShow();
		}
		/**校验加减号状态和设置单注下注档次*/
		private checkPlusReduceState(): void {
			this.BtnLess.touchEnabled = this.theBetIndex != 0;
			this.BtnMore.touchEnabled = this.theBetIndex != this.theBetArr.length - 1;
			this.betTxt.text = this.theBetArr[this.theBetIndex] + "";
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
			if (this.groupAutoNum.visible) return;
			this.showAndBtm(this.groupAutoNum, true, -400);
			this.showTween(this.groupAutoNum, 107);
		}
		/**取消自动转动*/
		private touchCancelAuto(): void {

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
			this.theBet.text = "单注：" + this.getBetMoney();
			this.allBet.text = "总押注：" + this.getBetMoney() * this.theBetMulit;
		}
		/**返回单注金额*/
		public getBetMoney(): number { return this.theBetArr[this.theBetIndex]; }
		/**赢得钱*/
		public setWinMoney(mon: number): void {
			this.winTxt.text = mon + "";
		}
		public setSpinEnable(b: boolean) {
			this.spinBtn.enabled = b;
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