module game {
	export class TopBar extends BaseUI {
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "topBarSkin.exml";
		}
		private groupRight: eui.Group;
		private userName: eui.Label;
		private userMoney: eui.Label;

		private win:number;
		private num:number;
		/**初始化*/
		public init() {
			this.eventListen();
		}
		/**事件监听*/
		private eventListen(): void {
			this.registerEvent(this.groupRight, egret.TouchEvent.TOUCH_TAP, () => { this.sendNotify(NotifyConst.openSetting); }, this);
		}
		public setUser(name: string) {
			this.userName.text = name;
		}
		public setBalance(money: string, win?: number) {
			if(win){
				this.win = +money - win;
				this.num = +money - win;
				this.payOut(+money);
			}else{
				this.userMoney.text = money;
			}
		}
		/**派彩*/
        private payOut(mon: number) {
            return new Promise((res,rej)=>{
                this.win = mon;
                egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this })
                    .to({ num: mon }, 800)
                    .call(() => {
                        egret.Tween.removeTweens(this);
                        this.userMoney.text = "" + this.win;
                        egret.Tween.get(this.userMoney)
                            .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                            .to({ scaleX: 1, scaleY: 1 }, 300)
                            .call(() => {
                                egret.Tween.removeTweens(this.userMoney);
                                res();
                            });
                    });
            });
            
        }
        private onChange(): void {
            this.userMoney.text = this.num.toFixed(2);
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