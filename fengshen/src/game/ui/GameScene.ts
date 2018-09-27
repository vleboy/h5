module game {
	export class GameScene extends BaseUI implements INotify {
		private contentGroup: eui.Group;
		private tileLocationGroup: eui.Group;
		private tileMask: eui.Rect;
		private tileGroup: eui.Group;
		private winTileGroup: eui.Group;
		private vagueTileGroup: eui.Group;
		private bottomBar: BottomBar;
		private topBar: TopBar;
		private rule: Rule;
		private setting: Setting;
		public particleGroup: eui.Group;
		public lineWinTxt: eui.BitmapLabel;
		private bg: eui.Image;
		private bgFree: eui.Image;
		private kuang: eui.Image;
		private kuangFree: eui.Image;
		private title: AMovieClip;
		private freeCountBg: eui.Image;
		private freeChooseCountBg: eui.Image;
		private freeChooseCountTxt: eui.BitmapLabel;
		private border2: AMovieClip;
		private border3: AMovieClip;
		private border4: AMovieClip;
		public winGridGroup: eui.Group;
		private bigWin: BigWin;
		private freeChanceGroup: eui.Group;
		private freeChangeMc: AMovieClip;
		private freeChangeImg: eui.Image;
		private freeMultiGroup: eui.Group;
		private freeMulti: eui.BitmapLabel;
		private freeChooseCountBoom: AMovieClip;
		private connectTip: ConnectTip;

		private balance: number;
		private betcfg: number[];
		private betLevel: number;
		private multicfg: number[];
		private multiLevel: number;
		public spinResp: SpinVO;
		private state: GameState;
		/**获得免费次数 */
		private moreFreeTimesTxt: eui.BitmapLabel;
		private whiteMask: eui.Rect;
		/**当前是否在免费游戏中 */
		public isFree: boolean;
		/**剩余免费转动次数 */
		private freeSpinRemainCount: number;
		/**当前由于wild替换所随机到的翻倍因子*/
		private featureMultiplier: number
		/**自动次数 */
		private autoCount: number;
		/**免费模式下本次转动的buff */
		public buff: string = "-1";
		private autoMax: boolean;
		private theBalance: string;
		private rollChannel: egret.SoundChannel;
		/**spin等待*/
		private spinWain: any;
		/**图标数组 */
		private symbolArr: Array<Symbol>;

		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "gameSceneSkin.exml";
		}


		// -------------------- 游戏初始化  ------------------------

		/**
		 * 初始化显示对象，注册通知
		 * */
		public init() {
			this.initView();
			this.initData();

			// this.bigWin.bigWinStart("super", 561651);
		}
		/**
		 * 初始化显示
		 * */
		private initView() {
			this.contentGroup.mask = new egret.Rectangle(244, 148, 1430, 764);
			this["title"].play();
			this.initSymbols();
			this.setState(GameState.BET);
			this.initVisible();
			// this.initListener();
		}
		/**
		 * 初始图标对象
		 * */
		private initSymbols() {
			this.symbolArr = [];
			for(let i=0; i<15; i++){
				let s = new Symbol();
				let value = Math.floor(Math.random()*11)+"";
				
				s.horizontalCenter = (this.tileLocationGroup.getChildAt(i) as eui.Image).horizontalCenter;
				s.verticalCenter = (this.tileLocationGroup.getChildAt(i) as eui.Image).verticalCenter;
				s.defaultVerticalCenter = s.verticalCenter;
				s.setValue(value);
				this.tileGroup.addChild(s);
				this.symbolArr.unshift(s);
			}
		}
		/**重置15个图标的层级关系 */
		private resetSymbolsIndex(){
			for(let i=14; i>=0; i--){
				this.symbolArr[i].parent.setChildIndex(this.symbolArr[i], 0);
			}
		}
		/**
		 * 初始化一些visible
		 * */
		private initVisible() {
			this.vagueTileGroup.visible = false;
			this.tileMask.visible = false;
			this.border2.visible = false;
			this.border3.visible = false;
			this.border4.visible = false;
		}
		/**
		 * 初始事件监听
		 * */
		private initListener() {
		}
        /**
         * 更新背景音乐
         * */
		private updateBgm() {
			// if (this.isFree) {
			// 	SoundPlayer.playMusic("CaiShen_243_freeGame_mp3");
			// }
			// else {
			// 	if (this.freeChoose.visible) {
			// 		SoundPlayer.playMusic("CaiShen_243_featureChoose_mp3");
			// 	}
			// 	else {
			// 		SoundPlayer.playMusic("CaiShen_243_normalGame_mp3");
			// 	}
			// }
		}

		/**
		 * 初始化数据
		 * */
		private initData() {
			NotifyManager.getInstance().addRegister(this, [
				NotifyConst.spin,
				NotifyConst.openHelp,
				NotifyConst.openSetting,
				NotifyConst.cancelSpin,
				NotifyConst.cancelAutoSpin,
				NotifyConst.betLevelIndex,
				NotifyConst.chooseFreeBack,
				NotifyConst.freeComplete,
				NotifyConst.updateBgm
			]);

			let loginVo = GameService.getInstance().loginVo;
			this.balance = +loginVo.payload.userBalance;
			this.betcfg = loginVo.payload.betcfg;
			this.betLevel = loginVo.payload.betLevel;
			this.multicfg = loginVo.payload.multicfg;
			this.multiLevel = loginVo.payload.multiLevel;

			this.topBar.setUser(loginVo.payload.nickname);
			this.topBar.setBalance(loginVo.payload.userBalance);
			this.theBalance = loginVo.payload.userBalance;
			this.bottomBar.initBetData(this.betcfg, this.betLevel, this.multicfg[this.multiLevel]);
			// //数据恢复检查
			// this.checkDataRecover(loginVo);
			// this.setting.defaultOpen();
		}
		/**
		 * 数据恢复
		 * */
		private checkDataRecover(resp: LoginVO) {
			if (resp.payload.featureData) {
				//进免费游戏玩
				// if (resp.payload.featureData.freeSpinRemainCount > 0) {
				// 	this.isFree = true;
				// 	this.bottomBar.setFree(true);
				// 	this.buff = resp.payload.featureData.buff;
				// 	this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
				// 	this.featureChanceCount = resp.payload.featureData.featureChanceCount;
				// 	this.showFreeChoose(false);
				// 	this.showFreeGame(true);
				// 	this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
				// }
				// //去选择免费游戏
				// else if (resp.payload.featureData.featureChanceCount > 0) {
				// 	this.showFreeChoose(true);
				// 	this.showFreeGame(false);
				// 	this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
				// 	this.featureChanceCount = resp.payload.featureData.featureChanceCount;
				// }
				// else {
				// 	this.showFreeChoose(false);
				// 	this.showFreeGame(false);
				// 	this.freeSpinRemainCount = 0;
				// 	this.featureChanceCount = 0;
				// }
			}
		}

		// -------------------- 游戏交互逻辑  ------------------------

		/**
		 * 接收通知
		 * */
		public handleNotify(key: NotifyConst, body) {
			switch (key) {
				case NotifyConst.spin:
					this.spin(body);
					break;
				case NotifyConst.openHelp:
					this.rule.rullShow(body, true);
					break;
				case NotifyConst.openSetting:
					this.setting.settingShow();
					break;
				case NotifyConst.cancelSpin:
					if (this.state == GameState.STOP) this.cancelSpin();
					else if (this.state == GameState.SHOW_SINGLE_LINES) this.cancelLinesWin();
					break;
				case NotifyConst.cancelAutoSpin:
					this.autoMax = false;
					this.autoCount = 0;
					break;
				case NotifyConst.betLevelIndex:
					this.betLevel = body;
					break;
				case NotifyConst.chooseFreeBack:
					this.freeSpinRemainCount = (body as ChooseBuffVO).payload.featureData.freeSpinRemainCount;
					this.buff = (body as ChooseBuffVO).payload.featureData.buff;
					this.isFree = true;
					this.bottomBar.setFree(true);
					this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
					this.showFreeGame(true);
					break;
				case NotifyConst.freeComplete:
					egret.Tween.get(this.whiteMask)
						.set({visible: true, alpha:0})
						.to({ alpha: 1 }, 700)
						.wait(700)
						.call(() => {
							this.freeTotalWin.visible = false;
							this.freeComplete();
						})
						.to({ alpha: 0 }, 700)
						.call(() => {
							this.whiteMask.visible = false;
							egret.Tween.removeTweens(this.whiteMask);
						})
					break;
				case NotifyConst.updateBgm:
					this.updateBgm();
					break;
			}
		}
		/**
		 * 控制游戏状态
		 * */
		private setState(n: GameState) {
			this.state = n;
			this.bottomBar.setState(n);
		}
		/**
		 * spin的逻辑
		 * */
		private spin(autoCount?: any) {
			if (this.balance < this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]) {
				console.log("余额不足");
				this.stage.addChild(new game.ErrTip("余额不足", () => { }, this));
				return;
			}
			if(!this.isFree){
				let txt: string = (+this.theBalance - this.betcfg[this.betLevel] * this.multicfg[this.multiLevel]).toFixed(2);
				this.topBar.setBalance(txt);
			}
			if (autoCount == "max") {
				this.autoMax = true;
			}
			else if (autoCount > 0) {
				this.autoMax = false;
				this.autoCount = autoCount;
			}

			if (this.spinResp) this.buff = this.spinResp.payload.featureData.buff;
			this.startSpin();
			if(this["testInput"].text){
				GameService.getInstance().sendSpin(this.betLevel, this["testInput"].text).then(this.spinBack.bind(this));
			}
			else{
				GameService.getInstance().sendSpin(this.betLevel).then(this.spinBack.bind(this));
			}
			this["testInput"].text = "";
			this.setState(GameState.SPINNING);
		}
		/**
		 * 收到spin结果 ，把-1的图标筛选掉
		 * */
		private spinBack(resp: SpinVO) {
			resp.payload.winGrid.length > 0 && resp.payload.winGrid.forEach((v, i) => {
				for (let i = v.winCard.length - 1; i >= 0; i--) {
					if (v.winCard[i] == -1) {
						v.winCard.splice(i, 1);
					}
				}
				for (let i = v.line.length - 1; i >= 0; i--) {
					if (v.line[i] == -1) {
						v.line.splice(i, 1);
					}
				}
			})
			if (resp.payload.scatterGrid.length > 0) {
				for (let i = resp.payload.scatterGrid.length - 1; i >= 0; i--) {
					if (resp.payload.scatterGrid[i] == -1) {
						resp.payload.scatterGrid.splice(i, 1);
					}
				}
			}
			//开发阶段手动剔除11的图标
			resp.payload.viewGrid = resp.payload.viewGrid.map(v=>{return (v=="11"?"6":v)});
			
			
			// let s = "5";
			// resp.payload.viewGrid = ["0",s,"2","3",s,"4","5",s,"6","7",s,"8","9",s,"10"];
			// resp.payload.winGrid = [
			// 	{
			// 		gold: 100,
			// 		line: [1,4,7,10,13],
			// 		lineIndex: 1,
			// 		multiplier: 1,
			// 		symbol: s,
			// 		winCard: [1,4,7,10,13]
			// 	}]
			// resp.payload.totalGold = 100;

			console.log("UI收到spin返回 ", resp);
			this.spinResp = resp;
			this.theBalance = resp.payload.userBalance;
			this.freeSpinRemainCount = this.spinResp.payload.featureData.freeSpinRemainCount;
			this.featureMultiplier = this.spinResp.payload.featureData.featureMultiplier;
			this.stopRoll(resp.payload.viewGrid);
			this.setState(GameState.STOP);
		}


		// -------------------- 游戏转动显示  ------------------------

		/**
		 * 开始滚动
		 * */
		private startSpin() {
			this.rollChannel = SoundPlayer.playEffect("CaiShen_243_Roll_mp3", -1);
			for (let i = 0; i < 15; i++) {
				this.symbolArr[i].visible = false;
			}
			
			this.vagueTileGroup.visible = true;
			for (let i = 0; i < 5; i++) {
				this.singleColumRoll(i);
			}
		}
		/**
		 * 单列模糊图标转动
		 * */
		private singleColumRoll(column) {
			for (let i = 0; i < 4; i++) {
				this["vagueTile" + (column * 4 + i)].visible = true;
				this["vagueTile" + (column * 4 + i)].source = "vague" + Math.floor(Math.random() * 10+1) + "_png";
			}
			egret.Tween.get(this["vagueTile" + (column * 4)], { loop: true })
				.wait(20)
				.call(() => {
					for (let i = 0; i < 4; i++) {
						let tile = this["vagueTile" + (column * 4 + i)];
						tile.verticalCenter += (GlobalConfig.fastSwitch ? 104 : 80);
						if (tile.verticalCenter > 496) {
							tile.verticalCenter -= 248 * 4;
							tile.source = "vague" + Math.floor(Math.random() * 10 + 1) + "_png";
						}
					}
				})
		}
		/**
		 * 停下来
		 * */
		private async stopRoll(arr: any[]) {
			if (this.rollChannel) this.rollChannel.stop();
			// 3 4 5列是否缓停
			let is3Delay: boolean = (arr.slice(0, 3).indexOf("0") > -1 && arr.slice(3, 6).indexOf("0") > -1);
			let is4Delay: boolean = is3Delay && arr.slice(6, 9).indexOf("0") > -1;
			let is5Delay: boolean = is4Delay && arr.slice(9, 12).indexOf("0") > -1;

			for (let i = 0; i < 5; i++) {
				if (i < 2) await this.stopColumn(i, arr);
				else if (i == 2) await this.stopColumn(i, arr, is3Delay);
				else if (i == 3) await this.stopColumn(i, arr, is4Delay);
				else if (i == 4) await this.stopColumn(i, arr, is5Delay);
			}
			this.judgeResult();
		}
		/**
		 * 单列停下来 isFree 是否freespin缓停
		 * */
		private stopColumn(column, arr: any[], isFree: boolean = false) {
			let columnArr = arr.slice(column * 3, column * 3 + 3);
			return new Promise(async (resolve, reject) => {
				if (isFree) await this.freeEffect(column);

				egret.Tween.removeTweens(this["vagueTile" + (column * 4)]);
				[0, 1, 2, 3].forEach(i => {
					this["vagueTile" + (column * 4 + i)].visible = false;
					this["vagueTile" + (column * 4 + i)].y = 21 + i * 208;
				});

				let haveScatterThisColumn = true;
				for(let c=0; c<=column; c++){
					if(arr[c*3]!="0" && arr[c*3+1]!="0" && arr[c*3+2]!="0"){
						haveScatterThisColumn = false;
					}
				}
				[0, 1, 2].forEach(i => {
					//处理wild图标的多样性
					let symbol: Symbol = this.symbolArr[(column * 3 + i)];
					let defaultv = symbol.verticalCenter;
					symbol.visible = true;
					symbol.setValue(columnArr[i]);

					egret.Tween.get(symbol).set({ verticalCenter: defaultv + 100 }).to({ verticalCenter: defaultv }, GlobalConfig.fastSwitch ? 150 : 250).wait(GlobalConfig.fastSwitch ? 50 : 200).call(() => {
						egret.Tween.removeTweens(symbol);
						resolve();
					});
				})
			})

		}

		private freeColumnTimeout:number;
		/**
		 * 单列freespin缓停动画
		 * */
		private freeEffect(column: number) {
			return new Promise((resolve, reject) => {
				(this["border" + column] as AMovieClip).visible = true;
				(this["border" + column] as AMovieClip).loop = 1;
				(this["border" + column] as AMovieClip).play();
				(this["border" + column] as AMovieClip).once(AMovieClip.COMPLETE, ()=>{
					(this["border" + column] as AMovieClip).stop();
					(this["border" + column] as AMovieClip).visible = false;
					resolve();
				}, this);
			})

		}
		/**
		 * 立即停止
		 * */
		private cancelSpin() {
			if(this.freeColumnTimeout) clearTimeout(this.freeColumnTimeout);
			
			for (let i = 0; i < 20; i++) {
				egret.Tween.removeTweens(this["vagueTile" + i]);
				this["vagueTile" + i].visible = false;
				this["vagueTile" + i].y = (i % 4) * 208 + 21;
			}

			let viewGrid = this.spinResp.payload.viewGrid;
			for (let i = 0; i < 15; i++) {
				egret.Tween.removeTweens(this.symbolArr[i]);
				this.symbolArr[i].visible = true;
				this.symbolArr[i].verticalCenter = this.symbolArr[i].defaultVerticalCenter;
				this.symbolArr[i].setValue(this.spinResp.payload.viewGrid[i]);
			}

			this.border2.stop();
			this.border3.stop();
			this.border4.stop();
			this.border2.visible = false;
			this.border3.visible = false;
			this.border4.visible = false;

			this.judgeResult();
		}

		// -------------------- 游戏结果显示  ------------------------

		/**
		 * 判定结果 大赢家=> 所有线 =>freespin =>bonus =>各条单线
		 * */
		private async judgeResult() {
			this.topBar.setBalance(this.spinResp.payload.userBalance, this.spinResp.payload.totalGold);

			this.setState(GameState.SHOW_RESULT);
			await this.showBigWin(this.spinResp.payload.winLevel, this.spinResp.payload.totalGold);
			await this.showAllWinGrid(this.spinResp.payload.winGrid);
			this.hideLinNums();
			await new Promise((resolve, reject)=>{
				setTimeout(function() {
					resolve();
				}, 1000);
			});
			await this.showScatterLine();
			

			if (this.isFree) {
				if(this.spinResp.payload.getFeatureChance){
					await this.showFreeChanceInFree();
				}
				await this.showEveryLineGrid(this.spinResp.payload.winGrid);
				this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
				if (this.freeSpinRemainCount == 0) {
					setTimeout(()=> {
						this.showFreeTotalWin(this.spinResp.payload.featureData.featureRoundGold);
					}, 1000);
				}
				else {
					this.setState(GameState.BET);
					setTimeout(()=> {
						if(this.state == GameState.BET) this.spin();
					}, 1000);
				}
			}
			else {
				if (this.spinResp.payload.getFeatureChance) {
					if (this.autoMax) {
						this.bottomBar.setAutoBetNum(-1);
					}
					else if (this.autoCount > 0) {
						this.bottomBar.setAutoBetNum(--this.autoCount);
					}
					await this.showFreeChance();
				}
				else {
					await this.showEveryLineGrid(this.spinResp.payload.winGrid);
					if (this.autoMax) {
						this.bottomBar.setAutoBetNum(-1);
					}
					else if (this.autoCount > 0) {
						this.bottomBar.setAutoBetNum(--this.autoCount);
					}
					this.setState(GameState.BET);
					if (this.autoMax || this.autoCount > 0) {
						setTimeout(()=> {
							if(this.state == GameState.BET) this.spin();
						}, 1000);
					}
				}
			}


		}
		/**
		 * 大赢家 normal middle big mega super
		 * */
		private showBigWin(level: string, win: number) {
			return new Promise((resolve, reject) => {
				if (win <= 0) resolve();
				else if (level == "normal") {
					// SoundPlayer.playEffect("CaiShen_243_SmallWin_mp3");
					resolve();
				}
				else if (level == "middle") {
					// SoundPlayer.playEffect("CaiShen_243_MiddleWin_mp3");
					resolve();
				}
				else {
					this.bigWin.bigWinStart(level, win).then(() => {
						resolve();
					});
				}
			})
		}
		/**
		 * 展示所有中奖图标
		 * */
		private showAllWinGrid(arr: Array<any>) {
			let grids = [];
			arr.forEach((v) => {
				this.showLineNum(v.lineIndex);
				v.winCard.forEach((gridIndex: number) => {
					grids.indexOf(gridIndex) == -1 && grids.push(gridIndex);
				});
			})

			this.bottomBar.setWinMoney(this.spinResp.payload.totalGold);
			return Promise.all(
				grids.map((v) => {
					this.tileMask.visible = true;
					this.winTileGroup.addChild(this.symbolArr[v]);
					return this.symbolArr[v].showAnimation().then(()=>{
								this.tileGroup.addChild(this.symbolArr[v]);
							});
				})
			).then(()=>{
				this.resetSymbolsIndex();
				this.tileMask.visible = false;
			})
		}
		/**展示中奖的线数字 */
		private showLineNum(n: number){
			let targets = [this["leftLineLight"+(n+1)], this["rightLineLight"+(n+1)]];
			targets.forEach(target =>{
				egret.Tween.get(target, {loop: true})
					.set({visible: true, scaleX:0.87, scaleY:0.87})
					.to({scaleX:1, scaleY: 1}, 300)
					.to({scaleX:0.87, scaleY:0.87}, 300)
			})
		}
		/**停止展示中奖的线数字 */
		private hideLinNums(){
			for(let i=1; i<=9; i++){
				egret.Tween.removeTweens(this["leftLineLight"+i]);
				egret.Tween.removeTweens(this["rightLineLight"+i]);
				this["leftLineLight"+i].visible = false;
				this["rightLineLight"+i].visible = false;
			}
		}
		/**
		 * scatter图标动画
		 * */
		private showScatterLine() {
			return Promise.all(
				this.spinResp.payload.getFeatureChance ? this.spinResp.payload.scatterGrid.map((gridIndex: number, column: number) => {
					this.tileMask.visible = true;
					this.winTileGroup.addChild(this.symbolArr[gridIndex]);
					return this.symbolArr[gridIndex].showAnimation(false).then(()=>{
								this.tileGroup.addChild(this.symbolArr[gridIndex]);
							});
				}) : []
			).then(()=>{
				this.resetSymbolsIndex();
				this.tileMask.visible = false;
			})
		}
		/**
		 * 展示本局获得免费机会
		 * */
		private showFreeChance() {
			return new Promise((resolve, reject) => {
				if (this.spinResp.payload.getFeatureChance) {
					egret.Tween.get(this.whiteMask)
						.set({ visible:true, alpha:0 })
						.to({ alpha: 1}, 1000)
						.call(() => {
							this["freeChange1"].alpha = 0;
							this["freeChange2"].alpha = 0;
							this.moreFreeTimesTxt.text = this.spinResp.payload.featureData.freeSpinRemainCount+"";
							this.freeChanceGroup.visible = true;
						})
						.to({ alpha: 0}, 1000)
						.wait(200)
						.call(() => {
							egret.Tween.removeTweens(this.whiteMask);
							egret.Tween.get(this["freeChange1"]).to({alpha: 1}, 300).wait(200).call(()=>{
								egret.Tween.removeTweens(this["freeChange1"]);
								egret.Tween.get(this["freeChange2"]).to({alpha: 1}, 300).wait(1500).call(()=>{
									egret.Tween.removeTweens(this["freeChange2"]);
									egret.Tween.get(this.whiteMask)
										.set({ visible:true, alpha:0 })
										.to({ alpha: 1}, 1000)
										.call(()=>{
											this.showFreeGame(true);
										})
										.to({ alpha: 0}, 1000)
										.call(()=>{
											egret.Tween.removeTweens(this.whiteMask);
											resolve();
										})
								})
							})
						})
				}
				else {
					resolve();
				}
			});
		}
		private freeChanceInFreeGroup: eui.Group;
		/**免费中再中免费 */
		private showFreeChanceInFree(){
			Promise.all(this.spinResp.payload.scatterGrid.map((index)=>{
				return new Promise((res, rej)=>{
					let p = new particle.GravityParticleSystem(RES.getRes("freeChanceParticle_png"), RES.getRes("freeChanceParticle_json"));
					this.freeChanceInFreeGroup.addChild(p);
					p.blendMode = egret.BlendMode.ADD;
					p.emitterX = 960+this.symbolArr[index].horizontalCenter;
					p.emitterY = 540+this.symbolArr[index].verticalCenter;
					p.start();
					egret.Tween.get(p)
						.to({emitterX:1800, emitterY:950}, 2000)
						.call(()=>{
							egret.Tween.removeTweens(p);
							p.stop();
							setTimeout(()=> {
								if(p && p.parent) p.parent.removeChild(p);
							}, 500);
							res();
						})
				})
			}))
			.then(async ()=>{
				await this.bottomBar.addFreeCount(5);
			})
		}
		/**
		 * 各单线中奖展示
		 * */
		private showEveryLineGrid(arr: { gold: number; line: number[]; lineIndex: number; multiplier: number; symbol: string; winCard: number[]}[] ) {
			this.setState(GameState.SHOW_SINGLE_LINES);
			//去掉scatter线
			arr.forEach((v, i)=>{
				v.symbol == "0" && arr.splice(i,1);
			})
			return new Promise(async (resolve, reject) => {
				let singleLineShow = async (v, lineIndex: number) => {
					this.showLineNum(v.lineIndex);
					this.lineWinTxt.visible = true;
					this.lineWinTxt.text = v.gold.toFixed(2);
					await Promise.all(
						v.winCard.map((value: number) => {
							this.tileMask.visible = true;
							this.winTileGroup.addChild(this.symbolArr[value]);
							return this.symbolArr[value].showAnimation(false).then(()=>{
								this.tileGroup.addChild(this.symbolArr[value]);
							});
						})
					).then(()=>{
						this.resetSymbolsIndex();
						this.tileMask.visible = false;
					})
					this.lineWinTxt.visible = false;
					this.hideLinNums();
				}

				for (let i = 0; i < arr.length; i++) {
					await singleLineShow(arr[i], i);
				}
				resolve();
			})
		}
		/**
		 * 停止中奖展示
		 * */
		private cancelLinesWin() {
			this.hideLinNums();
			this.lineWinTxt.visible = false;
			this.lineWinTxt.text = "";
			this.symbolArr.forEach(symbol => {
				symbol.reset();
				if(symbol.parent.hashCode != this.tileGroup.hashCode) this.tileGroup.addChild(symbol);
			})
			this.tileMask.visible = false;

			if (this.isFree) {
				if (this.freeSpinRemainCount == 0) {
					this.showFreeTotalWin(this.spinResp.payload.featureData.featureRoundGold);
				}
				else {
					this.setState(GameState.BET);
					this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
					setTimeout(()=> {
						if(this.state == GameState.BET) this.spin();
					}, 1000);
				}
			}
			else {
				if (this.autoMax) {
					this.bottomBar.setAutoBetNum(-1);
				}
				else if (this.autoCount > 0) {
					this.bottomBar.setAutoBetNum(--this.autoCount);
				}
				this.setState(GameState.BET);
				
				if (this.autoMax || this.autoCount > 0) {
					setTimeout(()=> {
						if(this.state == GameState.BET) this.spin();
					}, 1000);
				}
			}
		}

		// -------------------- 免费游戏显示  ------------------------

		/**
		 * 显示免费游戏的ui
		 * */
		private showFreeGame(b: boolean) {
			// this.freeTotalWin.visible = false;
			this.freeChanceGroup.visible = false;
			this.isFree = b;
			this.bg.visible = !b;
			this.bgFree.visible = b;
			this.bottomBar.setFree(b);
			this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
			this.setState(GameState.BET);
			this.updateBgm();
			setTimeout(() => {
				if (b) {
					this.spin();
				}
				else {
					if (this.autoMax || this.autoCount > 0) this.spin();
				}
			}, 500);

		}
		
		
		private freeTotalWin: FreeTotalWin;
		private freeWin1: eui.Image;
		private freeWin2: eui.Group;
		/**
		 * 进入免费结算面板，显示免费总奖励
		 * */
		private showFreeTotalWin(n: string) {
			this.freeTotalWin.showTotalWin(n);
		}
		/**
		 * 免费结算完成
		 * */
		private freeComplete() {
			this.isFree = false;
			this.showFreeGame(false);
			this.bottomBar.setFree(false);
			this.setState(GameState.BET);
		}

	}


	/**
	 * 图标类
	 * */
	class Symbol extends eui.Component{
		public defaultVerticalCenter:number;
		public bg: eui.Image;
		private borderLight: AMovieClip;
		public tileImg: eui.Image;
		private tileMc: AMovieClip;
		public value: string;
		/**各图标帧动画的纹理配置 */
		public static SymbolAninations:any = {
			"0":{
				all:{source:"zz_01_png", sources:"zz_0|1-30|_png"},
				single:{source:"zz_01_png", sources:"zz_0|1-30|_png"},
			},
			"1":{
				all:{source:"JZY_breath_01_png", sources:"JZY_breath_|01-30|_png"},
				single:{source:"JZY_wild_01_png", sources:"JZY_wild_|01-30|_png"},
			},
			"2":{
				all:{source:"sgb_breath_01_png", sources:"sgb_breath_|01-40|_png"},
				single:{source:"sgb_wild_01_png", sources:"sgb_wild_|01-30|_png"},
			},
			"3":{
				all:{source:"daji_breath_01_png", sources:"daji_breath_|01-30|_png"},
				single:{source:"daji_wild_01_png", sources:"daji_wild_|01-30|_png"},
			},
			"4":{
				all:{source:"yj_breath_01_png", sources:"yj_breath_|01-40|_png"},
				single:{source:"yj_wild_01_png", sources:"yj_wild_|01-30|_png"},
			},
			"5":{
				all:{source:"NeZha_breath_01_png", sources:"NeZha_breath_|01-40|_png"},
				single:{source:"NeZha_wild_01_png", sources:"NeZha_wild_|01-30|_png"},
			}
		}
		public constructor() {
			super();
			this.skinName = "resource/skins/game_skins/tileSkin.exml";
		}
		/**更新图标的值 */
		public setValue(v: string){
			let isSmallTile = parseInt(v) > 5;
			this.value = v;
			this.bg.visible = true;
			this.bg.source = isSmallTile ? "tilebg6_png" : ("tilebg"+v+"_png");
			this.tileImg.visible = isSmallTile;
			this.tileMc.visible = !isSmallTile;
			this.tileImg.source = isSmallTile ? "symbol"+v+"_png" : "symbol6_png";
			if(!isSmallTile){
				if(v=="0") this.bg.visible = false;
				this.tileMc.source = Symbol.SymbolAninations[v].all.source;
			}
		}
		/**isAll:是否展示全部中奖图标时的动画 */
		public showAnimation(isAll:boolean=true){
			return new Promise((resolve, reject)=>{
				this.borderLight.visible = true;
				this.borderLight.play();
				let isSmallTile = parseInt(this.value) > 5;
				let all = isAll ? "all": "single";
				if(!isSmallTile){
					this.tileMc.sources = Symbol.SymbolAninations[this.value][all].sources;
					this.tileMc.speed = 3;
					this.tileMc.loop = 2;
					this.tileMc.play();
					this.tileMc.once(AMovieClip.COMPLETE, ()=>{
						this.borderLight.visible = false;
						this.borderLight.stop();
						resolve();
					}, this);
				}
				else{
					egret.Tween.get(this.tileImg)
						.to({scaleX: 0.8, scaleY:0.8}, 100)
						.to({scaleX: 1.2, scaleY:1.2}, 200)
						.to({scaleX: 0.9, scaleY:0.9}, 150)
						.to({scaleX: 1.1, scaleY:1.1}, 150)
						.to({scaleX: 0.95, scaleY:0.95}, 120)
						.to({scaleX: 1, scaleY:1}, 80)
						.wait(500)
						.to({scaleX: 0.8, scaleY:0.8}, 100)
						.to({scaleX: 1.2, scaleY:1.2}, 200)
						.to({scaleX: 0.9, scaleY:0.9}, 150)
						.to({scaleX: 1.1, scaleY:1.1}, 150)
						.to({scaleX: 0.95, scaleY:0.95}, 120)
						.to({scaleX: 1, scaleY:1}, 80)
						.call(()=>{
							egret.Tween.removeTweens(this.tileImg);
							this.borderLight.visible = false;
							this.borderLight.stop();
							resolve();
						})
				}
			})
		}
		/**停止这个图标的一切动画 */
		public reset(){
			if(this.tileMc){
				this.tileMc.stop();
			}
			this.borderLight.visible = false;
			this.borderLight.stop();
			egret.Tween.removeTweens(this.tileImg);
			this.tileImg.scaleX = this.tileImg.scaleY = 1;
		}
	}
}
