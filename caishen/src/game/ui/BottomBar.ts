module game {
	export class BottomBar extends BaseUI {
		/**说明按钮*/
		private helpBtn: eui.Button;
		/**游戏开始转动按钮*/
		private spinBtn: eui.Button;
		/**游戏停止转动按钮*/
		private stopSpinBtn: eui.Button;
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
		private autoNum: eui.Label;
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

		private state:GameState;
		/**是否在免费游戏中 通过主场景控制它的值*/
		private isFree:boolean;
		public setFree(b:boolean){
			this.isFree = b;
		}

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bottomSkin.exml";
		}
		/**初始化*/
		public init() {
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.spin); }, this);
			this.registerEvent(this.stopSpinBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.cancelSpin); }, this);
			this.registerEvent(this.helpBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.openHelp); }, this);
			["max", "100", "50", "20", "10"].forEach(v => { 
				this.registerEvent(this["btn_" + v] as eui.Button, egret.TouchEvent.TOUCH_TAP, this.touchAutoNum, this); 
			});
			this.registerEvent(this.betBtn, egret.TouchEvent.TOUCH_TAP, this.chooseBetLevel, this);
			this.registerEvent(this.autoBtn, egret.TouchEvent.TOUCH_TAP, this.touchAuto, this);
			this.registerEvent(this.cancelAutoBtn, egret.TouchEvent.TOUCH_TAP, this.touchCancelAuto, this);
			this.registerEvent(this.BtnLess, egret.TouchEvent.TOUCH_TAP, this.reduceBetLevel, this);
			this.registerEvent(this.BtnMore, egret.TouchEvent.TOUCH_TAP, this.addBetLevel, this);
			this.registerEvent(this.BtnMax, egret.TouchEvent.TOUCH_TAP, this.maxBetLevel, this);
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
			this.sendNotify(NotifyConst.betLevelIndex, this.theBetIndex);
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
		/**获得派彩的动画*/
		private payOutAni(mon: number): void {
			let interval, theMon: number = 0, newMon: number = 0;
			if (interval) clearInterval(interval);
			egret.Tween.removeTweens(this.winTxt);
			interval = setInterval(() => {
				newMon++;
				theMon = newMon / 10;
				if (theMon >= mon) {
					theMon = mon;
					clearInterval(interval);
				}
				this.winTxt.text = theMon + "";
			}, 10);
			egret.Tween.get(this.winTxt)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 500)
				.to({ scaleX: 1, scaleY: 1 }, 500)
				.call(() => {
					egret.Tween.removeTweens(this.winTxt);
					if (interval) clearInterval(interval);
					this.winTxt.text = mon + "";
				});
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
		/**赢得钱*/
		public setWinMoney(mon: number): void {
			this.winTxt.text = mon + "";
			this.payOutAni(mon);
		}
		/**开始转动按钮状态*/
		public setSpinEnable(b: boolean) {
			this.spinBtn.enabled = b;
		}
		/**图片旋转
		 * @param isStop 是不是停止动画
		*/
		public imgSpin(isStop: boolean = false): void {
			isStop ? egret.Tween.removeTweens(this.spinArrow) : egret.Tween.get(this.spinArrow).to({ rotation: 360 }, 500);
		}
		/**按钮状态*/
		public setBtnState(type: BottomState) {
			/**下注按钮和自动转动按钮状态*/
			let betAutoState = (isEn: boolean = true) => {
				this.betBtn.enabled = isEn;
				this.autoBtn.enabled = isEn;
			};
			/**转动按钮显示*/
			let spinBtnShow = (isShow: boolean = true, isEn: boolean = true) => {
				this.spinBtn.visible = isShow;
				this.spinBtn.enabled = isEn;
				this.stopSpinBtn.visible = !isShow;
				this.spinArrow.visible = isShow;
			}
			/**是不是自动状态*/
			let autoState = (isAuto: boolean = false, isFree?: boolean) => {
				this.spinArrow.visible = !isAuto;
				this.groupAuto.visible = isAuto;
				this.autoImg.source = isFree ? "Free_png" : "Auto_1_png";
			};
			switch (type) {
				case BottomState.spinAble:
					betAutoState();
					autoState();
					spinBtnShow();
					break;
				case BottomState.spining:
					betAutoState(false);
					autoState();
					spinBtnShow(true, false);
					break;
				case BottomState.stoping:
					betAutoState(false);
					autoState();
					this.imgSpin(true);
					spinBtnShow(false);
					break;
				case BottomState.stop:
					betAutoState(false);
					autoState();
					spinBtnShow(false);
					break;
				case BottomState.auto:
					betAutoState(false);
					spinBtnShow(true, false);
					autoState(true);
					break;
				case BottomState.free:
					betAutoState(false);
					spinBtnShow(true, false);
					autoState(true, true);
					break;
			}
		}
		
		/**控制游戏状态 */
		public setState(n: GameState){
			this.state = n;
			switch(n){
				case GameState.BET:
					break;
				case GameState.SPINNING:
					break;
				case GameState.STOP:
					break;
				case GameState.SHOW_RESULT:
					break;
				case GameState.SHOW_SINGLE_LINES:
					break;
			}
		}
		/**自动或免费下注次数*/
		public setAutoBetNum(num: number): void { 
			this.autoNum.text = num + ""; 
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