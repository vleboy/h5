module game {
	export class GameScene extends BaseUI{
		private tileMask: eui.Rect;
		private tileGroup: eui.Group;
		private valueTiles: eui.Group;
		private vagueTiles: eui.Group;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "gameSceneSkin.exml";
		}
		public initSetting(){
			this.tileGroup.mask = this.tileMask;
			this.startRoll();

			setTimeout(()=> {
				this.stopRoll([0,1,2,1,4,5,1,7,8,9,10,11,12,3,6]);
			}, 1000);
		}

		public startRoll(){
			for(let i=0; i<15; i++){
				this["tile"+i].visible = false;
			}

			this.vagueTiles.visible = true;

			for(let i=0; i<20; i++){
				this.singleRoll(this["vagueTile"+i]);
			}
		}

		private singleRoll(tile){
			tile.source = "vague"+Math.floor(Math.random()*13)+"_png";
			egret.Tween.get(tile, {loop:true})
				.wait(20)
				.call(()=>{
					tile.y += 70;

					if(tile.y > 658){
						tile.y = -200;
						tile.source = "vague"+Math.floor(Math.random()*13)+"_png";
					}
				})
		}
		private stopRoll(arr:any[]){
			// 3 4 5列是否缓停
			let is3Delay = false;
			let is4Delay = false;
			let is5Delay = false;
			if(arr.slice(0,3).indexOf(1)>-1 && arr.slice(3,6).indexOf(1)>-1){
				is3Delay = true;
				if(arr.slice(6,9).indexOf(1)>-1){
					is4Delay = true;
					if(arr.slice(9,12).indexOf(1)>-1){
						is5Delay = true;
					}
				}
			}

			arr = arr.map( v => (v==2? "2_1" : (v+"")));
			console.log("停止 ",arr);


			for(let i=0; i<5; i++){
				let delay = i*250;
				if(is3Delay && i>=2) {
					delay += 500;
					if(is4Delay) {
						delay += 500;
						if(is5Delay) {
							delay += 500;
						}
					}
				}
				this.stopCollum(i, arr.slice(i*3,i*3+3), delay);
			}
		}
		private stopCollum(c, arr:any[], delay){
			console.log("停止"+c+" 延迟"+delay)
			setTimeout(()=> {
				[0,1,2,3].forEach(i=>{
					egret.Tween.removeTweens(this["vagueTile"+(c+i)]);
					this["vagueTile"+(c*4+i)].visible = false;
					this["vagueTile"+(c*4+i)].y = 21+ i*208;
				});
				
				[0,1,2].forEach(i=>{
					this["tile"+(c*3+i)].visible = true;
					this["tile"+(c*3+i)].source = "symbolName_"+(arr[i])+"_png";
				})
			}, delay);
			
		}
	}
}