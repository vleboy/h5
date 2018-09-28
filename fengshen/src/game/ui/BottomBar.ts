module game {
	export class BottomBar extends BaseUI {
		private groupBtm: eui.Group;
		/**说明按钮*/
		private helpBtn: eui.Button;
		/**游戏开始转动按钮*/
		private spinBtn: eui.Button;
		/**游戏停止转动按钮*/
		private stopSpinBtn: eui.Button;
		/**自动游戏次数按钮*/
		private autoNumBtn: eui.Button;
        /**免费游戏次数按钮*/
        private freeNumBtn: eui.Button;
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
		/**赢得钱*/
		private winNum: number = 0;

		public setFree(b: boolean) {
			this.isFree = b;
		}

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "bottomSkin.exml";
		}
		/**初始化*/
		public init() {
			this.initListenr();
		}
        /**
		 * 初始化数据
         */
        public initBetData(betArr: number[], index: number, mulit: number): void {
            if (betArr) this.theBetArr = betArr;
            if (index != undefined) this.theBetIndex = index;
            if (mulit != undefined) this.theBetMulit = mulit;
            this.checkPlusReduceState();
        }

		/**事件监听*/
		private initListenr(): void {
			this.registerEvent(this.spinBtn, egret.TouchEvent.TOUCH_TAP, this.onSpin, this);
			this.registerEvent(this.stopSpinBtn, egret.TouchEvent.TOUCH_TAP, this.onCancelSpin, this);
			this.registerEvent(this.autoNumBtn, egret.TouchEvent.TOUCH_TAP, this.onCancelSpin, this);
			this.registerEvent(this.freeNumBtn, egret.TouchEvent.TOUCH_TAP, this.onCancelSpin, this);
			this.registerEvent(this.helpBtn, egret.TouchEvent.TOUCH_TAP, this.onRule, this);
			this.registerEvent(this.betBtn, egret.TouchEvent.TOUCH_TAP, this.onBetLevel, this);
			this.registerEvent(this.autoBtn, egret.TouchEvent.TOUCH_TAP, this.showAutoCountChoose, this);
			this.registerEvent(this.cancelAutoBtn, egret.TouchEvent.TOUCH_TAP, this.onCancelAuto, this);
			this.registerEvent(this.BtnLess, egret.TouchEvent.TOUCH_TAP, this.onReduceBetLevel, this);
			this.registerEvent(this.BtnMore, egret.TouchEvent.TOUCH_TAP, this.onAddBetLevel, this);
			this.registerEvent(this.BtnMax, egret.TouchEvent.TOUCH_TAP, this.onMaxBetLevel, this);
            ["max", "100", "50", "20", "10"].forEach(v => {
                this.registerEvent(this["btn_" + v] as eui.Button, egret.TouchEvent.TOUCH_TAP, this.onAutoNum, this);
            });
		}
		private onSpin(){
            this.sendNotify(NotifyConst.spin);
            this.setWinMoney(0.00);
            this.hideCutGroup(true);
			this.showCircleArrow();
		}
        private onCancelSpin(){
            this.sendNotify(NotifyConst.cancelSpin);
        }
        private onRule(){
            this.sendNotify(NotifyConst.openHelp, this.theBetArr[this.theBetIndex]);
            this.hideCutGroup();
        }
        private onAutoNum(e: egret.TouchEvent): void {
            let str: string = e.target.name.split("_")[1];
            this.sendNotify(NotifyConst.spin, str);
            str == "max" ? this.setAutoBetNum(-1) : this.setAutoBetNum(+str);
            this.showAutoBtn(false);
            this.isAuto = true;
            this.showTween(this.groupAutoNum, -400).then(() => this.groupAutoNum.visible = false);
        }
        private onBetLevel(): void {
            let betShow = () => {
                this.hideCutGroup();
                this.groupBet.visible = true;
                this.showTween(this.groupBet, 128).then(() => SoundPlayer.playEffect("CaiShen_243_GUI_Generic1_mp3"));
            }
            this.groupBet.visible ? this.showTween(this.groupBet, -100).then(() => {
                this.groupBet.visible = false;
                SoundPlayer.playEffect("CaiShen_243_GUI_Generic2_mp3");
            }) : betShow();
        }
        private onAddBetLevel(): void {
            this.theBetIndex < this.theBetArr.length - 1 && this.theBetIndex++;
            this.checkPlusReduceState();
        }
        private onReduceBetLevel(): void {
            this.theBetIndex > 0 && this.theBetIndex--;
            this.checkPlusReduceState();
        }
        private onMaxBetLevel(): void {
            this.theBetIndex = this.theBetArr.length - 1;
            this.checkPlusReduceState();
        }
        private showAutoCountChoose(): void {
            let autoShow = () => {
                this.hideCutGroup();
                this.groupAutoNum.visible = true;
                this.showTween(this.groupAutoNum, 128);
            }
            this.groupAutoNum.visible ? this.showTween(this.groupAutoNum, -400).then(() => {
                this.groupAutoNum.visible = false;
            }) : autoShow();
        }
        private onCancelAuto(): void {
            this.sendNotify(NotifyConst.cancelAutoSpin);
            this.isAuto = false;
            this.showAutoBtn(true);
        }


		/**箭头旋转 */
		private showCircleArrow(){
			let img = this.spinBtn.getChildByName("circle");
			egret.Tween.get(img).set({rotation:0}).to({rotation:360}, 500).call(()=>{egret.Tween.removeTweens(img)});
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
		/**是否显示自动转动按钮*/
		private showAutoBtn(isShow: boolean): void {
			this.autoBtn.visible = isShow;
			this.cancelAutoBtn.visible = !isShow;
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


		/**隐藏切入框*/
		public hideCutGroup(isSound: boolean = false): void {
			this.groupBet.visible && this.showTween(this.groupBet, -100).then(() => {
				this.groupBet.visible = false;
			});
			this.groupAutoNum.visible && this.showTween(this.groupAutoNum, -400).then(() => {
				this.groupAutoNum.visible = false
			});
		}
		/**赢得钱*/
		public setWinMoney(mon: number): void {
			if (!mon) return;
			this.winTxt.text = mon + "";
		}
		/**控制游戏状态 */
		public setState(n: GameState) {
			this.state = n;
			if(this.isFree){
				this.cancelAutoBtn.visible = false;
                this.freeNumBtn.visible = true;
				this.betBtn.enabled = false;
				this.autoBtn.enabled = false;
				this.groupBet.touchChildren = false;
				this.groupAutoNum.touchChildren = false;
			}
			else if(this.isAuto){
				this.cancelAutoBtn.visible = true;
                this.autoNumBtn.visible = true;
                this.freeNumBtn.visible = false;
				this.betBtn.enabled = false;
				this.autoBtn.enabled = false;
				this.groupBet.touchChildren = false;
				this.groupAutoNum.touchChildren = false;
			}
			else{
				this.cancelAutoBtn.visible = false;
                this.autoNumBtn.visible = false;
                this.freeNumBtn.visible = false;
				switch (n) {
					case GameState.BET:
                        this.spinBtn.visible = true;
                        this.spinBtn.enabled = true;
                        this.stopSpinBtn.visible = false;
						this.betBtn.enabled = true;
						this.autoBtn.enabled = true;
						this.groupBet.touchChildren = true;
						this.groupAutoNum.touchChildren = true;
						break;
                    case GameState.SPINNING:
                        this.winTxt.text = "0.00";
                        this.spinBtn.visible = true;
                        this.spinBtn.enabled = false;
                        this.stopSpinBtn.visible = false;
						this.betBtn.enabled = false;
						this.autoBtn.enabled = false;
						this.groupBet.touchChildren = false;
						this.groupAutoNum.touchChildren = false;
                        break;
                    case GameState.STOP:
                        this.spinBtn.visible = false;
                        this.stopSpinBtn.visible = true;
                        this.stopSpinBtn.enabled = true;
						this.betBtn.enabled = false;
						this.autoBtn.enabled = false;
						this.groupBet.touchChildren = false;
						this.groupAutoNum.touchChildren = false;
                        break;
					case GameState.SHOW_RESULT:
                        this.spinBtn.visible = true;
                        this.spinBtn.enabled = false;
                        this.stopSpinBtn.visible = false;
						this.betBtn.enabled = false;
						this.autoBtn.enabled = false;
						this.groupBet.touchChildren = false;
						this.groupAutoNum.touchChildren = false;
						break;
					case GameState.SHOW_SINGLE_LINES:
                        this.spinBtn.visible = false;
                        this.stopSpinBtn.visible = true;
                        this.stopSpinBtn.enabled = true;
						this.betBtn.enabled = false;
						this.autoBtn.enabled = false;
						this.groupBet.touchChildren = false;
						this.groupAutoNum.touchChildren = false;
						break;
				}
			}
		}
		/**自动下注次数*/
		public setAutoBetNum(num: number): void {
            this.isAuto = num!=0;
			(this.autoNumBtn.getChildByName("maxImg") as eui.Image).visible = num < 0;
			(this.autoNumBtn.getChildByName("countTxt") as eui.Label).text = num >= 0 ? (num + "") : "";
		}
		/**免费下注次数*/
		public setFreeBetNum(num: number): void {
			if (this.cancelAutoBtn.visible) this.cancelAutoBtn.enabled = false;
			(this.freeNumBtn.getChildByName("countTxt") as eui.Label).text = num + "";
		}
		private freeMc: AMovieClip;
		/**免费中增加免费次数 */
		public addFreeCount(add){
			return new Promise((resolve, reject)=>{
				this.freeMc.visible = true;
				this.freeMc.loop = 1;
				this.freeMc.play();
				this.freeMc.once(AMovieClip.COMPLETE, ()=>{
					this.freeMc.visible = false;
					let target = this.freeNumBtn.getChildByName("countTxt") as eui.Label;
					let n = +target.text;
					target["count"] = n;
					egret.Tween.get(target, {onChange:()=>{target.text = parseInt(target["count"])+""}, onChangeObj:this})
						.to({count:n+add},200)
						.call(()=>{
							egret.Tween.removeTweens(target);
							resolve();
						})
				}, this);
				
			})
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