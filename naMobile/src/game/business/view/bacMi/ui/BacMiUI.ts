module game {
	export class BacMiUI extends BaseUI{
		public constructor(m?: BaseMediator) {
			super(m);
			this.skinName = GlobalConfig.skinPath + "bacMiSkin.exml";
		}

		private chiplist: ChipList;
        
		/**对象创建完成后执行 */
		public initSetting(){
			console.log("mi initsetting");
			this.chiplist.setChips([1,5,10,20,50,100,500]);
			this.initListener();
		}
		private initListener(){
			this.registerEvent(this["roomInfoBg"], egret.TouchEvent.TOUCH_TAP, ()=>{
				this["roomSmallInfoGroup"].visible = !this["roomSmallInfoGroup"].visible;
				this["roomAllInfoGroup"].visible = !this["roomAllInfoGroup"].visible;
			}, this);
			this.registerEvent(this["allInfoBg"], egret.TouchEvent.TOUCH_TAP, ()=>{
				this["roomSmallInfoGroup"].visible = !this["roomSmallInfoGroup"].visible;
				this["roomAllInfoGroup"].visible = !this["roomAllInfoGroup"].visible;
			}, this);
			this.registerEvent(this["smallRoadGroup"], egret.TouchEvent.TOUCH_TAP, ()=>{
				egret.Tween.get(this["smallRoadGroup"]).to({x:1920},300).call(()=>{
					egret.Tween.removeTweens(this["smallRoadGroup"]);
					this["smallRoadGroup"].visible = false;
					this["bigRoadGroup"].visible = true;
					this["bigRoadGroup"].x = 1920;
					egret.Tween.get(this["bigRoadGroup"]).to({x:0},300).call(()=>{
						egret.Tween.removeTweens(this["bigRoadGroup"]);
					}, this)
				})
			}, this)
			this.registerEvent(this["bigRoadGroup"], egret.TouchEvent.TOUCH_TAP, ()=>{
				egret.Tween.get(this["bigRoadGroup"]).to({x:1920},300).call(()=>{
					egret.Tween.removeTweens(this["bigRoadGroup"]);
					this["bigRoadGroup"].visible = false;
					this["smallRoadGroup"].visible = true;
					this["smallRoadGroup"].x = 1920;
					egret.Tween.get(this["smallRoadGroup"]).to({x:0},300).call(()=>{
						egret.Tween.removeTweens(this["smallRoadGroup"]);
					}, this)
				})
			}, this)
			this.registerEvent(this["normalBtn"], egret.TouchEvent.TOUCH_TAP, ()=>{
				(this["normalBtn"] as eui.ToggleButton).selected = true;
				(this["noComBtn"] as eui.ToggleButton).selected = false;
				(this["b27Btn"] as eui.ToggleButton).selected = false;

				(this["betArea_normal"] as eui.Group).visible = true;
				(this["betArea_noCom"] as eui.Group).visible = false;
				(this["betArea_b27"] as eui.Group).visible = false;

			}, this)
			this.registerEvent(this["noComBtn"], egret.TouchEvent.TOUCH_TAP, ()=>{
				(this["normalBtn"] as eui.ToggleButton).selected = false;
				(this["noComBtn"] as eui.ToggleButton).selected = true;
				(this["b27Btn"] as eui.ToggleButton).selected = false;

				(this["betArea_normal"] as eui.Group).visible = false;
				(this["betArea_noCom"] as eui.Group).visible = true;
				(this["betArea_b27"] as eui.Group).visible = false;
			}, this)
			this.registerEvent(this["b27Btn"], egret.TouchEvent.TOUCH_TAP, ()=>{
				(this["normalBtn"] as eui.ToggleButton).selected = false;
				(this["noComBtn"] as eui.ToggleButton).selected = false;
				(this["b27Btn"] as eui.ToggleButton).selected = true;

				(this["betArea_normal"] as eui.Group).visible = false;
				(this["betArea_noCom"] as eui.Group).visible = false;
				(this["betArea_b27"] as eui.Group).visible = true;
			}, this)
		}

        /** 收到mediator的通知，每个UI要复写这个方法 * */
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type){

			}
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