module game {
	export class ChipList extends eui.Component{
		private scroller: eui.Scroller;
		private list: eui.List;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "chipListSkin.exml";
			this.once(egret.Event.COMPLETE, this.initSetting, this);
		}

		private initSetting(){
			console.log("chips initsetting");
			
		}
		public setChips(arr:Array<any>){

			let ac = new eui.ArrayCollection();
			arr.unshift("custom");
			arr.reverse();
			ac.source = arr;
			this.list.dataProvider = ac;
			this.list.itemRenderer = ChipItem;
			ac.refresh();

			this.scroller.once(egret.Event.RENDER, ()=>{
				this.scroller.viewport.scrollV = this.scroller.measuredHeight-this.scroller.height;

			}, this)
		}
	}

	export class ChipItem extends AItemRenderer{
		private chipImg: eui.Image;
		private customGroup: eui.Group;
		private selectEffect1: AMovieClip;
		private selectEffect2: AMovieClip;
		private selectEffect: AMovieClip;
		public constructor() {
			super();
		}
		protected onAdd()
		{
		}
		protected dataChanged()
		{
			console.log("dataChanged ",this.data)
			this.customGroup.visible = this.data == "custom";
			this.chipImg.visible = this.data != "custom";
			this.chipImg.visible && (this.chipImg.source = "chouma"+this.data+"_png");
			this.selectEffect1.visible= false;
			this.selectEffect2.visible= false;
			this.selectEffect = this.data == "custom"? this.selectEffect2 : this.selectEffect1;
			this.selectEffect.visible = this.selected;
		}
		protected onRemove()
		{
		}
	}
}