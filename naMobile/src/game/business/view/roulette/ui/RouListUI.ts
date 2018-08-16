module game {
	export class RouListUI extends BaseUI {
		//------------------变量区--------------------
		/**轮盘房间scroller*/
		private scrollerRou: eui.Scroller;
		/**轮盘房间list*/
		private listRou: eui.List;
		/**轮盘房间ArrayCollection*/
		private acRou: eui.ArrayCollection;
		public constructor(m?: BaseMediator) {
			super(m);
			//引用皮肤
			this.skinName = GlobalConfig.skinPath + "rouListSkin.exml";
		}
		/**对象创建完成后执行 */
		public initSetting() {
			this.initScroller();
			this.tweenAnimation();
		}
		/**初始化scroller*/
		private initScroller(): void {
			this.acRou = new eui.ArrayCollection();
			this.listRou.dataProvider = this.acRou;
			this.listRou.itemRenderer = RouListItem;
			this.acRou.addItem({});
			this.acRou.refresh();
		}
		/**item出现的动画*/
		private tweenAnimation(){
			this.scrollerRou.top = 1500;
			egret.Tween.get(this.scrollerRou).to({top:240}, 300).call(()=>{egret.Tween.removeTweens(this.scrollerRou)});
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