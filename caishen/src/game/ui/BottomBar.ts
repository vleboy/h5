module game {
	export class BottomBar extends BaseUI {
		private groupBtm: eui.Group;
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
		/**中间闪烁图片*/
		private winLight: eui.Image;
		/**底部闪烁图片*/
		private btmLight: eui.Image;
		//--------------变量-------------
		/**单注数字数组*/
		private theBetArr: number[];
		/**当前注在数组的下标*/
		private theBetIndex: number;
		/**倍数*/
		private theBetMulit: number;
		/**是不是自动状态(默认不是自动)*/
		private isAuto: boolean;
		/**游戏状态*/
		private state: GameState;
		/**是否在免费游戏中 通过主场景控制它的值*/
		private isFree: boolean;
		/**免费开始前是不是自动*/
		private freeAuto: boolean;
		/**自动的次数*/
		private autoCount: number = 0;
		/**赢得钱*/
		private winNum: number = 0;

		public setFree(b: boolean) {
			b && !this.isFree && (this.freeAuto = this.isAuto);
			this.isAuto = b;
			!b && (this.isAuto = false);
			!b && (this.autoNum.text = this.autoCount >= 0 ? (this.autoCount + "") : "MAX"); 
			this.autoImg.source = b ? "Free_png" : "Auto_1_png";
			this.isFree = b;
			this.autoState();
			!b && this.showAutoBtn(!this.isAuto);
		}

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bottomSkin.exml";
		}
		/**初始化*/
		public init() {
			this.initData();
			this.eventListen();
		}
		/**初始化数据*/
		private initData(): void {
			this.isAuto = false;
			this.isFree = false;
			this.freeAuto = false;
			this.autoCount = 0;
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, () => {
				if (this.isAuto) {
					this.sendNotify(NotifyConst.cancelSpin);
				} else {
					SoundPlayer.playEffect("CaiShen_243_Spin_mp3");
					this.sendNotify(NotifyConst.spin);
					this.imgSpin();
					this.setWinMoney(0.00);
					this.hideCutGroup(true);
				}
			}, this);
			this.registerEvent(this.stopSpinBtn, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.cancelSpin); }, this);
			this.registerEvent(this.helpBtn, egret.TouchEvent.TOUCH_TAP, () => {
				this.sendNotify(NotifyConst.openHelp, this.theBetArr[this.theBetIndex]);
				this.hideCutGroup();
			}, this);
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
		private showTween(group: eui.Group, btm: number) {
			return new Promise((res, rej) => {
				egret.Tween.get(group).to({ bottom: btm }, 400).call(() => {
					egret.Tween.removeTweens(group);
					res();
				});
			})
		}
		/**点击自动转到次数按钮*/
		private touchAutoNum(e: egret.TouchEvent): void {
			let str: string = e.target.name.split("_")[1];
			this.sendNotify(NotifyConst.spin, str);
			str == "max" ? this.setAutoBetNum(-1) : this.setAutoBetNum(+str);
			this.showAutoBtn(false);
			this.isAuto = true;
			this.showTween(this.groupAutoNum, -400).then(() => this.groupAutoNum.visible = false);
			this.autoState();
		}
		/**是否显示自动转动按钮*/
		private showAutoBtn(isShow: boolean): void {
			this.autoBtn.visible = isShow;
			this.cancelAutoBtn.visible = !isShow;
		}
		/**点击单注*/
		private chooseBetLevel(): void {
			let betShow = () => {
				this.hideCutGroup();
				this.groupBet.visible = true;
				this.showTween(this.groupBet, 126).then(() => SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3"));
			}
			this.groupBet.visible ? this.showTween(this.groupBet, -100).then(() => {
				this.groupBet.visible = false;
				SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
			}) : betShow();
		}
		/**校验加减号状态和设置单注下注档次*/
		private checkPlusReduceState(): void {
			this.BtnLess.enabled = this.theBetIndex != 0;
			this.BtnMore.enabled = this.theBetIndex != this.theBetArr.length - 1;
			this.betTxt.text = this.theBetArr[this.theBetIndex].toFixed(2);
			this.theBet.text = "单注：" + this.theBetArr[this.theBetIndex].toFixed(2);
			this.allBet.text = "总押注：" + (this.theBetArr[this.theBetIndex] * this.theBetMulit).toFixed(2);
			this.sendNotify(NotifyConst.betLevelIndex, this.theBetIndex);
		}

		/**单注增加*/
		private addBetLevel(): void {
			SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3");
			this.theBetIndex < this.theBetArr.length - 1 && this.theBetIndex++;
			this.checkPlusReduceState();
		}
		/**单注减少*/
		private reduceBetLevel(): void {
			SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3");
			this.theBetIndex > 0 && this.theBetIndex--;
			this.checkPlusReduceState();
		}
		/**单注最大*/
		private maxBetLevel(): void {
			SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3");
			this.theBetIndex = this.theBetArr.length - 1;
			this.checkPlusReduceState();
		}
		/**自动转动*/
		private touchAuto(): void {
			let autoShow = () => {
				this.hideCutGroup();
				this.groupAutoNum.visible = true;
				this.showTween(this.groupAutoNum, 107).then(() => SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3"));
			}
			this.groupAutoNum.visible ? this.showTween(this.groupAutoNum, -400).then(() => {
				this.groupAutoNum.visible = false;
				SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
			}) : autoShow();
		}
		/**隐藏切入框*/
		public hideCutGroup(isSound: boolean = false): void {
			this.groupBet.visible && this.showTween(this.groupBet, -100).then(() => {
				this.groupBet.visible = false;
				isSound && SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
			});
			this.groupAutoNum.visible && this.showTween(this.groupAutoNum, -400).then(() => {
				this.groupAutoNum.visible = false;
				isSound && SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
			});
		}
		/**取消自动转动*/
		private touchCancelAuto(): void {
			this.sendNotify(NotifyConst.cancelAutoSpin);
			this.isAuto = false;
			this.showAutoBtn(true);
		}
		/**是不是自动状态*/
		private autoState(): void {
			this.spinArrow.visible = !this.isAuto;
			this.stopSpinBtn.visible = !this.isAuto;
			this.groupAuto.visible = this.isAuto;
		}
		/**获得派彩的动画*/
		private payout(mon: number): void {
			this.winNum = 0;
			egret.Tween.get(this, { onChange: () => { this.winTxt.text = this.winNum.toFixed(2); }, onChangeObj: this })
				.to({ winNum: mon }, 800)
				.call(() => { egret.Tween.removeTweens(this); });
			egret.Tween.get(this.winTxt)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 400)
				.to({ scaleX: 1, scaleY: 1 }, 400)
				.call(() => { egret.Tween.removeTweens(this.winTxt); });

			let imgLight = (img: eui.Image, alphaArr: number[], timer: number, isline?: boolean) => {
				img.visible = true;
				img.alpha = 0;
				egret.Tween.get(img)
					.to({ alpha: alphaArr[0] }, timer)
					.to({ alpha: alphaArr[1] }, timer)
					.call(() => {
						if (isline) {
							egret.Tween.removeTweens(img);
							img.visible = false;
						}
					})
					.to({ alpha: alphaArr[2] }, timer)
					.to({ alpha: alphaArr[3] }, timer)
					.call(() => {
						egret.Tween.removeTweens(img);
						img.visible = false;
					});
			}
			imgLight(this.winLight, [1, .5, 1, 0], 200);
			imgLight(this.btmLight, [.7, 0], 400, true);
		}
		/**图片旋转
		 * @param isStop 是不是停止动画
		*/
		private imgSpin(isStop: boolean = false): void {
			isStop ? egret.Tween.removeTweens(this.spinArrow) : egret.Tween.get(this.spinArrow).to({ rotation: 360 }, 500);
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
			if (!mon) return;
			this.winTxt.text = mon + "";
			this.payout(mon);
		}
		/**转动按钮显示*/
		private spinBtnShow(isShow: boolean = true, isEn: boolean = true): void {
			this.spinBtn.visible = this.isAuto ? true : isShow;
			this.spinBtn.enabled = isEn;
			this.stopSpinBtn.visible = this.isAuto ? false : !isShow;
			this.spinArrow.visible = this.isAuto ? false : isShow;
		}
		/**控制游戏状态 */
		public setState(n: GameState) {
			this.state = n;
			/**下注按钮和自动转动按钮状态*/
			let betAutoState = (isBetEn: boolean = true, isAutoEn: boolean = true) => {
				this.betBtn.enabled = isBetEn;
				this.autoBtn.enabled = isAutoEn;
			};
			this.autoState();
			switch (n) {
				case GameState.BET:
					this.isFree ? betAutoState(false, false) : betAutoState();
					this.spinBtnShow();
					break;
				case GameState.SPINNING:
					this.winTxt.text = "0.00";
					betAutoState(false, false);
					this.spinBtnShow(true, false);
					if (this.isAuto) this.spinBtn.enabled = false;
					break;
				case GameState.SHOW_RESULT:
					betAutoState(false, false);
					this.spinBtnShow(true, false);
					if (this.isAuto) this.spinBtn.enabled = false;
					break;
				case GameState.STOP:
				case GameState.SHOW_SINGLE_LINES:
					betAutoState(false, false);
					this.imgSpin(true);
					this.spinBtnShow(false);
					if (this.isAuto) this.spinBtn.enabled = true;
					break;
			}
		}
		/**自动下注次数*/
		public setAutoBetNum(num: number): void {
			this.showAutoBtn(num == 0);
			if (this.isAuto && this.cancelAutoBtn.visible) this.cancelAutoBtn.enabled = true;
			this.isAuto = num != 0;
			this.autoCount = num;
			this.autoNum.text = num >= 0 ? (num + "") : "MAX";
			if(num == 0) this.spinBtnShow();
		}
		/**免费下注次数*/
		public setFreeBetNum(num: number): void {
			if (this.cancelAutoBtn.visible) this.cancelAutoBtn.enabled = false;
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