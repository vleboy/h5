module game {
	/**按下时缩小的按钮 这个按钮要用horizontalCenter和verticalCenter来定位*/
	export class SmallButton extends eui.Button{
		public constructor() {
			super();
		}
        protected onTouchBegin(event: egret.TouchEvent): void{
			super.onTouchBegin(event);
			this.scaleX = this.scaleY = 0.9;
		}
		protected buttonReleased(): void{
			super.buttonReleased();
			this.scaleX = this.scaleY = 1;
		}
		protected onTouchCancle(event: egret.TouchEvent): void{
			super.onTouchCancle(event);
			this.scaleX = this.scaleY = 1;
		}
	}
}