module game {
	export class GameListUI extends BaseUI{
		public constructor(m?: BaseMediator) {
			super(m);
			this.skinName = GlobalConfig.skinPath + "gameListSkin.exml";
		}

		private gameGroup: eui.Group;
		private gameMi: eui.Image;
		private gameBac: eui.Image;
		private gameRoulette: eui.Image;
		private gameMultiBac: eui.Image;
		private gameVipBac: eui.Image;

		/**对象创建完成后执行 */
		public initSetting(){
			this.gameGroup.touchChildren = true;
			this.gamesAnimation();
		}
		/**从右边飞出来 */
		private gamesAnimation(){
			[this.gameMi, this.gameBac, this.gameRoulette, this.gameMultiBac, this.gameVipBac].forEach((v, i)=>{
				v.x = 2500;
				egret.Tween.get(v).wait(1+i*60).to({x:22+376*i}, 300).call(()=>{
					egret.Tween.removeTweens(v);
					i==4 && this.initListener();
				})
			}, this);
		}
		/**飞到目的地再注册点击事件 */
		private initListener(){
			[this.gameMi, this.gameBac, this.gameRoulette, this.gameMultiBac, this.gameVipBac].forEach((v, i, arr)=>{
				this.registerEvent(v, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent)=>{
					this.gameGroup.touchChildren = false;
					console.log(v.name+"被点击了");
					FilterUtil.setWaterRippleFilter(v, ()=>{
						console.log(v.name+"水波纹结束");
						switch(v.name){
							case "gameMi":
								MediatorManager.openMediator(Mediators.Mediator_BacMiList);
								break;
						}
					}, this)
				}, this)
			}, this);
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