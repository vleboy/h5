module game {
	export class GameScene extends BaseUI implements INotify{
		private tileMask: eui.Rect;
		private tileGroup: eui.Group;
		private bottomBar: BottomBar;
		private connectTip: ConnectTip;
		private rull:Rull;
		private setting:Setting;
		private particleGroup: eui.Group;

		private balance: number;
		private betcfg: number[];
		private betLevel: number;
		private multicfg: number[];
		private multiLevel: number;
		private spinResp: SpinVO;
		private particles:particle.GravityParticleSystem[];

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "gameSceneSkin.exml";
		}
		

		// -------------------- 游戏初始化  ------------------------

		/**初始化显示对象，注册通知 */
		public init(){
			this.initView();
			this.initData();
		}
		/**初始化显示 */
		private initView(){
			this.initPaticles();
			this.connectTip.visible = true;
			this.tileGroup.mask = this.tileMask;
			FilterUtil.setLightFlowFilter(this["title"]);

			for(let i=0; i<15; i++){
				let n = Math.floor(Math.random()*13)+"";
				n= (n=="2" ? "2_1": n);
				this["tile"+i].visible = true;
				this["tile"+i].source = "symbolName_"+n+"_png";
			}
			for(let i=0; i<20; i++){
				this["vagueTile"+i].visible = false;
			}
		}
		/**初始化数据 */
		private initData(){
			NotifyManager.getInstance().addRegister(this,[
				NotifyConst.spin,
				NotifyConst.openHelp,
				NotifyConst.openSetting,
			]);
			
			GameService.getInstance().login().then((resp: LoginVO)=>{
				this.connectTip.visible = false;
				this.balance = +resp.payload.userBalance;
				this.betcfg = resp.payload.betcfg;
				this.betLevel = resp.payload.betLevel;
				this.multicfg = resp.payload.multicfg;
				this.multiLevel = resp.payload.multiLevel;
			});
		}

		// -------------------- 游戏逻辑  ------------------------

		/**接收通知 */
		public handleNotify(key:NotifyConst, body){
			switch(key){
				case NotifyConst.spin:
					this.spin();
					break;
				case NotifyConst.openHelp:
					this.rull.rullShow(true);
					break;
				case NotifyConst.openSetting:
					this.setting.settingShow();
					break;
			}
		}
		/**spin的逻辑 */
		private spin(){
			if(this.balance < this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]){
				console.log("余额不足");
				return;
			}
			this.startSpin();
			GameService.getInstance().sendSpin(this.betLevel).then(this.spinBack.bind(this));
		}
		/**收到spin结果 */
		private spinBack(resp: SpinVO){
			console.log("UI收到spin返回 ",resp);
			this.spinResp = resp;
			this.stopRoll(resp.payload.viewGrid);
		}

		
		// -------------------- 游戏显示  ------------------------

		/**初始化图标粒子 */
		private initPaticles(){
			this.particles = [];
			for(let i=0; i<15; i++){
				let texture = RES.getRes("light_lizi01_png");
				let cfg = RES.getRes("particle_json");
				let p = new particle.GravityParticleSystem(texture, cfg);
				this.particleGroup.addChild(p);
				p.visible = false;
				this.particles.push(p);
			}
		}
		/**开始滚动 */
		private startSpin(){
			this.bottomBar.setSpinEnable(false);
			for(let i=0; i<15; i++){
				this["tile"+i].visible = false;
			}
			for(let i=0; i<20; i++){
				this.singleRoll(this["vagueTile"+i]);
			}
		}
		/**单个模糊图标的滚动逻辑 */
		private singleRoll(tile){
			tile.visible = true;
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
		/**停下来 */
		private stopRoll(arr:any[]){
			// 3 4 5列是否缓停
			let is3Delay: boolean = (arr.slice(0,3).indexOf(1)>-1 && arr.slice(3,6).indexOf(1)>-1);
			let is4Delay: boolean = is3Delay && arr.slice(6,9).indexOf(1)>-1;
			let is5Delay: boolean = is4Delay && arr.slice(9,12).indexOf(1)>-1;
			//处理wild图标的多样性
			arr = arr.map( v => (v==2? "2_1" : (v+"")));


			for(let i=0; i<5; i++){
				let delay = i*250;
				if(is3Delay && i>=2) {
					delay += 2000;
					if(is4Delay && i>=3) {
						delay += 2000;
						if(is5Delay && i==4) {
							delay += 2000;
						}
					}
				}
				this.stopColumn(i, arr.slice(i*3,i*3+3), delay);
			}
		}
		/**单列停下来 */
		private stopColumn(column, arr:any[], delay){
			setTimeout(()=> {
				[0,1,2,3].forEach(i=>{
					egret.Tween.removeTweens(this["vagueTile"+(column+i)]);
					this["vagueTile"+(column*4+i)].visible = false;
					this["vagueTile"+(column*4+i)].y = 21+ i*208;
				});
				
				[0,1,2].forEach(i=>{
					let defaultY = this["tile"+(column*3+i)].y;
					let tile = this["tile"+(column*3+i)];
					tile.visible = true;
					tile.source = "symbolName_"+(arr[i])+"_png";
					egret.Tween.get(tile).set({y:defaultY-100}).to({y:defaultY},500).call(()=>{
						egret.Tween.removeTweens(tile);
						if(column==4 && i==2){
							this.judgeResult();
						}
					});
				})

				if(column==4){
					this.bottomBar.setSpinEnable(true);
				}
			}, delay);
			
		}
		/**判定结果 */
		private async judgeResult(){
			console.log("判定结果 中奖线"+this.spinResp.payload.winGrid.length);
			if(this.spinResp.payload.winGrid.length > 0){
				await this.showAllWinGrid(this.spinResp.payload.winGrid);
			}
		}

		private showAllWinGrid(arr:Array<any>){
			return new Promise(()=>{
				let grids = [];
				arr.forEach((v)=>{
					v.winCard.forEach((value:number,column:number)=>{
						let gridIndex = value+column*3;
						value!=-1 && grids.indexOf(gridIndex)==-1 && grids.push(gridIndex);
					});
				})

				let flag=false;
				grids.forEach((v)=>{
					let p: particle.GravityParticleSystem = this.particles[v];
					let grid: eui.Image = this["tile"+v];
					p.visible = true;
					p.start();
					p.emitterX = p.emitterY = 0;
					p.x = grid.x;
					p.y = grid.y;
					egret.Tween.get(p)
						.to({emitterX: grid.width}, 300)
						.to({emitterY: grid.height}, 300)
						.to({emitterX: 0}, 300)
						.to({emitterY: 0}, 300)
						.to({emitterX: grid.width}, 300)
						.to({emitterY: grid.height}, 300)
						.to({emitterX: 0}, 300)
						.to({emitterY: 0}, 300)
						.call(()=>{
							egret.Tween.removeTweens(p);
							p.stop();
							p.visible = false;
							if(!flag){
								flag = true;
								setTimeout(()=> {
									this.showEveryLineGrid();
								}, 1000);
							}
						})
				})
			})
		}

		private showEveryLineGrid(){

		}
	}
}