module game {
	export class GameScene extends BaseUI implements INotify{
		private tileMask: eui.Rect;
		private tileGroup: eui.Group;
		private bottomBar: BottomBar;
		private topBar: TopBar;
		private connectTip: ConnectTip;
		private rull:Rull;
		private setting:Setting;
		private particleGroup: eui.Group;
		private lineWinTxt: eui.BitmapLabel;
		private freeChoose: BaseUI;
		
		private bg: eui.Image;
		private bgFree: eui.Image;
		private kuang: eui.Image;
		private kuangFree: eui.Image;
		private title: eui.Image;
		private titleFree: eui.Image;
		private freeCountBg: eui.Image;
		private freeChooseCountBg: eui.Image;
		private freeCountTxt: eui.Label;
		private freeChooseCountTxt: eui.Label;

		private border2: AMovieClip;
		private border3: AMovieClip;
		private border4: AMovieClip;

		private particles:particle.GravityParticleSystem[];

		private balance: number;
		private betcfg: number[];
		private betLevel: number;
		private multicfg: number[];
		private multiLevel: number;
		private spinResp: SpinVO;
		private state: GameState;
		/**当前是否在免费游戏中 */
		private isFree: boolean;
		/**剩余免费转动次数 */
		private freeSpinRemainCount: number;
		/**剩余免费选择次数 */
		private featureChanceCount: number;
		/**下次出免费 */
		private nextFree:boolean = false;
		

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
			[this.border2, this.border3, this.border4, this.lineWinTxt].forEach(v=>{
				v.visible = false;
			})
			this.connectTip.visible = true;
			this.tileGroup.mask = this.tileMask;
			this.setState(GameState.BET);
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
			this.registerEvent(this["testBtn"], egret.TouchEvent.TOUCH_TAP, ()=>{
				this.nextFree = true;
			}, this);
		}
		/**初始化数据 */
		private initData(){
			NotifyManager.getInstance().addRegister(this,[
				NotifyConst.spin,
				NotifyConst.openHelp,
				NotifyConst.openSetting,
				NotifyConst.cancelSpin,
				NotifyConst.cancelAutoSpin,
				NotifyConst.betLevelIndex,
				NotifyConst.chooseFreeBack
			]);
			
			GameService.getInstance().login().then((resp: LoginVO)=>{
				this.connectTip.visible = false;
				this.balance = +resp.payload.userBalance;
				this.betcfg = resp.payload.betcfg;
				this.betLevel = resp.payload.betLevel;
				this.multicfg = resp.payload.multicfg;
				this.multiLevel = resp.payload.multiLevel;

				this.topBar.setBalance(resp.payload.userBalance);
				
				//数据恢复检查
				this.checkDataRecover(resp);
			});
		}
		/**数据恢复 */
		private checkDataRecover(resp: LoginVO){
			if(resp.payload.featureData){
				//进免费游戏玩
				if(resp.payload.featureData.freeSpinRemainCount>0) {
					this.isFree = true;
					this.bottomBar.setFree(true);
					this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
					this.featureChanceCount = resp.payload.featureData.featureChanceCount;
					this.showFreeChoose(false);
					this.showFreeGame(true);
				}
				//去选择免费游戏
				else if(resp.payload.featureData.featureChanceCount > 0) {
					this.showFreeChoose(true);
					this.showFreeGame(false);
					this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
					this.featureChanceCount = resp.payload.featureData.featureChanceCount;
				}
				else{
					this.showFreeChoose(false);
					this.showFreeGame(false);
					this.freeSpinRemainCount = 0;
					this.featureChanceCount = 0;
				}
			}
		}

		// -------------------- 游戏逻辑  ------------------------

		/**接收通知 */
		public handleNotify(key:NotifyConst, body){
			switch(key){
				case NotifyConst.spin:
					this.spin();
					break;
				case NotifyConst.openHelp:
					this.rull.rullShow(body,true);
					break;
				case NotifyConst.openSetting:
					this.setting.settingShow();
					break;
				case NotifyConst.cancelSpin:
					break;
				case NotifyConst.cancelAutoSpin:
					break;
				case NotifyConst.betLevelIndex:
					break;
				case NotifyConst.chooseFreeBack:
					this.freeSpinRemainCount = (body as ChooseBuffVO).payload.featureData.freeSpinRemainCount;
					this.featureChanceCount --;
					this.isFree = true;
					this.bottomBar.setFree(true);
					this.setFreeCount();
					this.setFreeChooseCount();
					this.showFreeChoose(false);
					this.showFreeGame(true);
					break;
			}
		}
		/**控制游戏状态 */
		private setState(n: GameState){
			this.state = n;
			this.bottomBar.setState(n);
		}
		/**spin的逻辑 */
		private spin(){
			if(this.balance < this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]){
				console.log("余额不足");
				return;
			}
			this.startSpin();
			GameService.getInstance().sendSpin(this.betLevel, this.nextFree?"1":"").then(this.spinBack.bind(this));
			this.nextFree = false;
			this.setState(GameState.SPINNING);
		}
		/**收到spin结果 */
		private spinBack(resp: SpinVO){
			console.log("UI收到spin返回 ",resp);
			this.spinResp = resp;
			if(this.isFree){
				this.freeSpinRemainCount = this.spinResp.payload.featureData.freeSpinRemainCount;
				this.featureChanceCount = this.spinResp.payload.featureData.featureChanceCount;
					
				this.setFreeCount();
				this.setFreeChooseCount();
			}
			this.stopRoll(resp.payload.viewGrid);
			this.setState(GameState.STOP);
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
						tile.y -= 208*4;
						tile.source = "vague"+Math.floor(Math.random()*13)+"_png";
					}
				})
		}
		/**停下来 */
		private async stopRoll(arr:any[]){
			// 3 4 5列是否缓停
			let is3Delay: boolean = (arr.slice(0,3).indexOf("0")>-1 && arr.slice(3,6).indexOf("0")>-1);
			let is4Delay: boolean = is3Delay && arr.slice(6,9).indexOf("0")>-1;
			let is5Delay: boolean = is4Delay && arr.slice(9,12).indexOf("0")>-1;
			//处理wild图标的多样性
			arr = arr.map( v => (v==2? "2_1" : (v+"")));
			for(let i=0; i<5; i++){
				if(i<2) await this.stopColumn(i, arr.slice(i*3,i*3+3));
				else if(i==2) await this.stopColumn(i, arr.slice(i*3,i*3+3), is3Delay);
				else if(i==3) await this.stopColumn(i, arr.slice(i*3,i*3+3), is4Delay);
				else if(i==4) await this.stopColumn(i, arr.slice(i*3,i*3+3), is5Delay);
				// else if(i==2) await this.stopColumn(i, arr.slice(i*3,i*3+3), true);
				// else if(i==3) await this.stopColumn(i, arr.slice(i*3,i*3+3), true);
				// else if(i==4) await this.stopColumn(i, arr.slice(i*3,i*3+3), true);
			}
			this.judgeResult();
		}
		/**单列停下来 */
		private stopColumn(column, arr:any[], isFree:boolean = false){
			console.log("stopColumn "+column);
			
			return new Promise(async(resolve, reject)=>{
				if(isFree) await this.freeEffect(column);

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
						if(i==2){
							setTimeout( resolve, 250);
						}
					});
				})
				
			})
			
		}
		/**单列freespin缓停动画 */
		private freeEffect(column:number){
			return new Promise((resolve, reject)=>{
				(this["border"+column] as AMovieClip).visible = true;
				(this["border"+column] as AMovieClip).play();

				let startX = this["tile"+column*3].x+this["tile"+column*3].width/2;
				let startY = this["tile"+column*3].y;
				let c = new egret.DisplayObjectContainer();
				this["freeEffectGroup"].addChild(c);
				let arr = [];
				let createCoins = ()=>{
					for(let i=0; i<7; i++){
						let img = new eui.Image("yigeyuanb_png");
						let ran = Math.random()*0.08+0.03;
						img.width = 435*ran;
						img.height = 239*ran;
						img.anchorOffsetX = img.width/2;
						img.anchorOffsetY = img.height/2;
						img.rotation = Math.random()*360;
						img["speed"] = Math.round(Math.random()*10+7);
						img["alphaSpeed"] = Math.round(Math.random()*0.02+0.01);
						img.x = startX + (0.5-Math.random())*(this["tile"+column*3].width);
						c.addChild(img);
						arr.push(img);
					}
				}
				let index=0;
				egret.Tween.get(c, {loop:true})
					.wait(20)
					.call(()=>{
						if(index++ % 5 == 0){
							createCoins();
						}
						for(let j=arr.length-1; j>=0; j--){
							let img = arr[j];
							img.rotation += 5;
							img.y += img["speed"];
							img.alpha -= img["alphaSpeed"];

							if(img.y >=269+658){
								img.parent.removeChild(img);
								arr.splice(j,1);
							}
						}
					})
				setTimeout(()=> {
					egret.Tween.removeTweens(c);
					while(arr.length>0){
						let img = arr.pop();
						img.parent.removeChild(img);
					}
					this["freeEffectGroup"].removeChild(c);
					(this["border"+column] as AMovieClip).stop();
					(this["border"+column] as AMovieClip).visible = false;
					resolve();
				}, 2000);
			})
			
		}
		/**判定结果 大赢家=> 所有线 =>freespin =>各条单线*/
		private async judgeResult(){
			console.log("判定结果 中奖线"+this.spinResp.payload.winGrid.length);

			this.setState(GameState.SHOW_RESULT);
			await this.showBigWin(this.spinResp.payload.winLevel, this.spinResp.payload.totalGold);
			await this.showAllWinGrid(this.spinResp.payload.winGrid);

			/**在普通游戏中获得免费游戏 */
			if(this.spinResp.payload.getFeatureChance && !this.isFree){
				this.showFreeChoose(true);
			}
			else{
				await this.showEveryLineGrid(this.spinResp.payload.winGrid);
			}
			
			//	免费游戏结束判定
			if(this.isFree && this.freeSpinRemainCount==0){
				if(this.featureChanceCount>0){
					this.showFreeChoose(true);
				}
				else{
					this.showFreeGame(false);
					this.setState(GameState.BET);
				}
			}
			
		}
		/**normal middle big mega super */
		private showBigWin(level:string, win:number){
			return new Promise((resolve, reject)=>{
				if(level == "normal"){
					resolve();
				}else{
					this["effectGroup"].visible = true;
					this["bigwinTxt"].text = "大赢家 "+level+" "+win;
					setTimeout(()=> {
						this["effectGroup"].visible = false;
						resolve();
					}, 2000);
				}
			})
		}

		private showAllWinGrid(arr:Array<any>){
			return new Promise((resolve, reject)=>{
				if(arr.length == 0) resolve();

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
									resolve();
								}, 1000);
							}
						})
				})
			})
		}

		private showEveryLineGrid(arr:Array<any>){
			this.setState(GameState.SHOW_SINGLE_LINES);
			let promiseArr = [];
			arr.forEach((v, lineIndex:number)=>{
				promiseArr.push(new Promise((resolve, reject)=>{
					let flag = false;
					v.winCard.forEach((value:number,column:number)=>{
						if(value!=-1){
							setTimeout(()=> {
								this.lineWinTxt.visible = true;
								this.lineWinTxt.text = v.gold+"";
								let gridIndex = value+column*3;
								let p: particle.GravityParticleSystem = this.particles[gridIndex];
								let grid: eui.Image = this["tile"+gridIndex];
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
									.call(()=>{
										egret.Tween.removeTweens(p);
										p.stop();
										p.visible = false;
										this.lineWinTxt.visible = false;
										if(!flag){
											flag = true;
											setTimeout(()=> {
												resolve();
											}, 200);
										}
									})
							}, lineIndex*1500);
						}
					})
				}))
			})
			return Promise.all(promiseArr);
		}


		private showFreeChoose(b: boolean){
			this.freeChoose.visible = b;
		}
		/**显示免费游戏的ui */
		private showFreeGame(b: boolean){
			this.bg.visible = !b;
			this.bgFree.visible = b;
			this.kuang.visible = !b;
			this.kuangFree.visible = b;
			this.title.visible = !b;
			this.titleFree.visible = b;
			this.freeCountBg.visible = b;
			this.freeChooseCountBg.visible = b;
			this.freeCountTxt.visible = b;
			this.freeChooseCountTxt.visible = b;
			this.setFreeCount();
			this.setFreeChooseCount();
		}
		
		private setFreeCount(){
			this.freeCountTxt.text = "X"+this.freeSpinRemainCount;
		}
		private setFreeChooseCount(){
			this.freeChooseCountTxt.text = "X"+this.featureChanceCount;
		}


	}
}