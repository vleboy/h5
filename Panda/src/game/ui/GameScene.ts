module game {
	export class GameScene extends BaseUI implements INotify {
		private tileMask: eui.Rect;
		private tileGroup: eui.Group;
		private bottomBar: BottomBar;
		private topBar: TopBar;
		private rull: Rull;
		private setting: Setting;
		public particleGroup: eui.Group;
		public lineWinTxt: eui.BitmapLabel;
		private freeChoose: FreeChoose;
		private bg: eui.Image;
		private bgFree: eui.Image;
		private kuang: eui.Image;
		private kuangFree: eui.Image;
		private title: AMovieClip;
		private freeCountBg: eui.Image;
		private freeChooseCountBg: eui.Image;
		private freeChooseCountTxt: eui.BitmapLabel;
		private freeTotalWin: FreeTotalWin;
		private border2: AMovieClip;
		private border3: AMovieClip;
		private border4: AMovieClip;
		public valueTiles: eui.Group;
		public particleBg: eui.Rect;
		public winGridGroup: eui.Group;
		private bigWin: BigWin;
		private freeChanceGroup: eui.Group;
		private freeChangeMc: AMovieClip;
		private freeChangeImg: eui.Image;
		private symbols: Array<Symbol>;
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
		/**当前是否在免费游戏中 */
		public isFree: boolean;
		/**剩余免费转动次数 */
		private freeSpinRemainCount: number;
		/**剩余免费选择次数 */
		private featureChanceCount: number;
		/**当前由于wild替换所随机到的翻倍因子*/
		private featureMultiplier: number
		/**自动次数 */
		private autoCount: number;
		/**免费模式下本次转动的buff */
		public buff: string = "-1";
		private autoMax: boolean;
		private theBalance: string;
		private rollChannel: egret.SoundChannel;
		private thePArr: particle.GravityParticleSystem[];
		/**是否返回数据*/
		private isReturnData: boolean;
		/**spin等待*/
		private spinWain: any;

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
		}
		/**
		 * 初始化显示
		 * */
		private initView() {
			this.initTitle();
			this.initSymbols();
			this.tileGroup.mask = this.tileMask;
			this.setState(GameState.BET);
			this.initVisible();
			this.initListener();
		}
		/**
		 * 标题流光
		 * */
		private initTitle() {
			this.title.play();
		}
		/**
		 * 初始图标对象
		 * */
		private initSymbols() {
			this.symbols = [];
			for (let i = 0; i < 15; i++) {
				this.symbols.push(new Symbol(this["tile" + i], this));
			}
			for (let i = 0; i < 15; i++) {
				let n = Math.floor(Math.random() * 13) + "";
				if(((i<3 || i>11) && n=="1")) n="2";
				n = (n == "1" ? "1_1" : n);
				this["tile" + i].visible = true;
				this["tile" + i].source = "symbolName_" + n + "_png";
			}
		}
		/**
		 * 初始化一些visible
		 * */
		private initVisible() {
			[this.border2, this.border3, this.border4, this.lineWinTxt].forEach(v => {
				v.visible = false;
			})
			for (let i = 0; i < 20; i++) {
				this["vagueTile" + i].visible = false;
			}
		}
		/**
		 * 初始事件监听
		 * */
		private initListener() {
			this.registerEvent(this.bg, egret.TouchEvent.TOUCH_TAP, () => {
				this.bottomBar.hideCutGroup(true);
			}, this);
		}
        /**
         * 更新背景音乐
         * */
		private updateBgm() {
			if (this.isFree) {
				SoundPlayer.playMusic("CaiShen_243_freeGame_mp3");
			}
			else {
				if (this.freeChoose.visible) {
					SoundPlayer.playMusic("CaiShen_243_featureChoose_mp3");
				}
				else {
					SoundPlayer.playMusic("CaiShen_243_normalGame_mp3");
				}
			}
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
			this.bottomBar.setBetData(this.betcfg, this.betLevel, this.multicfg[this.multiLevel]);
			//数据恢复检查
			this.checkDataRecover(loginVo);
			this.setting.defaultOpen();
		}
		/**
		 * 数据恢复
		 * */
		private checkDataRecover(resp: LoginVO) {
			if (resp.payload.featureData) {
				//进免费游戏玩
				if (resp.payload.featureData.freeSpinRemainCount > 0) {
					this.isFree = true;
					this.bottomBar.setFree(true);
					this.buff = resp.payload.featureData.buff;
					this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
					this.featureChanceCount = resp.payload.featureData.featureChanceCount;
					this.showFreeChoose(false);
					this.showFreeGame(true);
					this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
				}
				//去选择免费游戏
				else if (resp.payload.featureData.featureChanceCount > 0) {
					this.showFreeChoose(true);
					this.showFreeGame(false);
					this.freeSpinRemainCount = resp.payload.featureData.freeSpinRemainCount;
					this.featureChanceCount = resp.payload.featureData.featureChanceCount;
				}
				else {
					this.showFreeChoose(false);
					this.showFreeGame(false);
					this.freeSpinRemainCount = 0;
					this.featureChanceCount = 0;
				}
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
					this.rull.rullShow(body, true);
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
					if (this.spinResp) this.spinResp.payload.featureData.buff = (body as ChooseBuffVO).payload.featureData.buff;
					this.buff = (body as ChooseBuffVO).payload.featureData.buff;
					this.featureChanceCount--;
					this.isFree = true;
					this.bottomBar.setFree(true);
					this.bottomBar.setFreeBetNum(this.freeSpinRemainCount);
					this.showFreeChoose(false);
					this.showFreeGame(true);
					break;
				case NotifyConst.freeComplete:
					egret.Tween.get(this["gameMask"])
						.set({visible: true, alpha:0})
						.to({ alpha: 1 }, 700)
						.wait(700)
						.call(() => {
							this.freeTotalWin.visible = false;
							this.freeComplete();
						})
						.to({ alpha: 0 }, 700)
						.call(() => {
							this["gameMask"].visible = false;
							egret.Tween.removeTweens(this["gameMask"]);
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
			this.isReturnData = false;
			this.setState(GameState.SPINNING);
			this.showConnect();
		}
		/**
		 * 显示连接
		*/
		private showConnect(): void {
			let timeOut = (wait: number) => {
				return new Promise((res, rej) => {
					this.spinWain && clearTimeout(this.spinWain);
					this.spinWain = setTimeout(() => res(), wait);
				});
			}
			timeOut(12000).then(() => {
				if (!this.isReturnData) this.connectTip.show(true);
				timeOut(8000).then(() => {
					if (!this.isReturnData) {
						this.connectTip.show(false);
						this.stage.addChild(new game.ErrTip("网络连接错误，是否重连?", () => location.reload(), this));
					}
				});
			});
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

			console.log("UI收到spin返回 ", resp);
			this.spinResp = resp;
			if (this.isFree) {
				this.freeSpinRemainCount = this.spinResp.payload.featureData.freeSpinRemainCount;
				this.featureChanceCount = this.spinResp.payload.featureData.featureChanceCount;
				this.featureMultiplier = this.spinResp.payload.featureData.featureMultiplier;
			}
			this.stopRoll(resp.payload.viewGrid).then(() => {
				let balance: string = resp.payload.userBalance;
				this.topBar.setBalance(balance, resp.payload.totalGold);
				this.theBalance = balance;
			});
			this.setState(GameState.STOP);
			this.isReturnData = true;
			if (this.connectTip.visible) this.connectTip.show(false);
		}


		// -------------------- 游戏转动显示  ------------------------

		/**
		 * 开始滚动
		 * */
		private startSpin() {
			this.rollChannel = SoundPlayer.playEffect("CaiShen_243_Roll_mp3", -1);
			for (let i = 0; i < 15; i++) {
				this["tile" + i].visible = false;
			}
			for (let i = 0; i < 5; i++) {
				this.singleColumRoll(i);
			}
			this.thePArr && this.thePArr.length > 0 && this.freeMultiAni(this.featureMultiplier, false);
		}
		/**
		 * 单列模糊图标转动
		 * */
		private singleColumRoll(column) {
			for (let i = 0; i < 4; i++) {
				this["vagueTile" + (column * 4 + i)].visible = true;
				this["vagueTile" + (column * 4 + i)].source = "vague" + Math.floor(Math.random() * 11 + 2) + "_png";
			}
			egret.Tween.get(this["vagueTile" + (column * 4)], { loop: true })
				.wait(20)
				.call(() => {
					for (let i = 0; i < 4; i++) {
						let tile = this["vagueTile" + (column * 4 + i)];
						tile.y += (GlobalConfig.fastSwitch ? 104 : 80);
						if (tile.y > 658) {
							tile.y -= 208 * 4;
							tile.source = "vague" + Math.floor(Math.random() * 11 + 2) + "_png";
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
					let symbol: Symbol = this.symbols[(column * 3 + i)];
					let str = columnArr[i] == "1" ? "1" + (this.buff == "-1" ? "" : "_" + this.buff) : columnArr[i];
					let defaultY = symbol.tile.y;
					symbol.tile.visible = true;
					symbol.value = columnArr[i];
					symbol.setTexture("symbolName_" + str + "_png");

					egret.Tween.get(symbol.tile).set({ y: defaultY + 100 }).to({ y: defaultY }, GlobalConfig.fastSwitch ? 150 : 250).wait(GlobalConfig.fastSwitch ? 50 : 200).call(() => {
						egret.Tween.removeTweens(symbol.tile);
						resolve();
					});
				})
				if (haveScatterThisColumn) SoundPlayer.playEffect("CaiShen_243_Scatter_" + (column + 1) + "_mp3");
				SoundPlayer.playEffect("CaiShen_243_RollStop_mp3");
			})

		}

		private freeColumnTimeout:number;
		/**
		 * 单列freespin缓停动画
		 * */
		private freeEffect(column: number) {
			SoundPlayer.playEffect("CaiShen_243_Scatter_wait_mp3");
			return new Promise((resolve, reject) => {
				(this["border" + column] as AMovieClip).visible = true;
				(this["border" + column] as AMovieClip).play();

				let startX = this["tile" + column * 3].x + this["tile" + column * 3].width / 2;
				let startY = this["tile" + column * 3].y;
				let c = new egret.DisplayObjectContainer();
				this["freeCoinsGroup"].addChild(c);
				let arr = [];
				let createCoins = () => {
					for (let i = 0; i < 4; i++) {
						let mc = new AMovieClip();
						mc.sources = "coin_pin_|1-9|_png";
						mc.width = mc.height = 20;
						mc.anchorOffsetX = 10;
						mc.anchorOffsetY = 10;
						mc.rotation = Math.random() * 360;
						mc.play();
						mc["speed"] = Math.round(Math.random() * 6 + 3);
						mc["alphaSpeed"] = Math.round(Math.random() * 0.02 + 0.01);
						mc.x = startX + (0.5 - Math.random()) * (this["tile" + column * 3].width);
						c.addChild(mc);
						arr.push(mc);
					}
				}
				let index = 0;
				egret.Tween.get(this["freeCoinsGroup"], { loop: true })
					.wait(20)
					.call(() => {
						if (index++ % 10 == 0) {
							createCoins();
						}
						for (let j = arr.length - 1; j >= 0; j--) {
							let img = arr[j];
							img.rotation += 5;
							img.y += img["speed"];
							img.alpha -= img["alphaSpeed"];

							if (img.y >= 269 + 658) {
								img.parent.removeChild(img);
								arr.splice(j, 1);
							}
						}
					})

				if(this.freeColumnTimeout) clearTimeout(this.freeColumnTimeout);
				this.freeColumnTimeout = setTimeout(() => {
					egret.Tween.removeTweens(this["freeCoinsGroup"]);
					while (arr.length > 0) {
						let img = arr.pop();
						img.parent.removeChild(img);
					}
					if(c.parent) c.parent.removeChild(c);
					(this["border" + column] as AMovieClip).stop();
					(this["border" + column] as AMovieClip).visible = false;
					resolve();
				}, 2000);
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
				egret.Tween.removeTweens(this.symbols[i].tile);
				this.symbols[i].value = this.spinResp.payload.viewGrid[i];
				this.symbols[i].tile.visible = true;
				this.symbols[i].tile.y = (i % 3) * 208 + 21;
				let str = viewGrid[i] == "1" ? "1" + (this.buff == "-1" ? "" : "_" + this.buff) : viewGrid[i];
				this.symbols[i].setTexture("symbolName_" + str + "_png");
			}

			this.border2.stop();
			this.border3.stop();
			this.border4.stop();
			this.border2.visible = false;
			this.border3.visible = false;
			this.border4.visible = false;

			egret.Tween.removeTweens(this["freeCoinsGroup"]);
			(this["freeCoinsGroup"] as eui.Group).removeChildren();

			this.judgeResult();
		}

		// -------------------- 游戏结果显示  ------------------------

		/**
		 * 判定结果 大赢家=> 所有线 =>freespin =>bonus =>各条单线
		 * */
		private async judgeResult() {
			console.log("判定结果 中奖线" + this.spinResp.payload.winGrid.length);

			this.setState(GameState.SHOW_RESULT);
			await this.showBigWin(this.spinResp.payload.winLevel, this.spinResp.payload.totalGold);
			await this.showAllWinGrid(this.spinResp.payload.winGrid);
			await this.showScatterLine();
			await this.showFreeChange();
			this.stopScatterLine();
			await this.showBonusLine();

			if (this.isFree) {
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
					this.showFreeChoose(true);
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
					SoundPlayer.playEffect("CaiShen_243_SmallWin_mp3");
					resolve();
				}
				else if (level == "middle") {
					SoundPlayer.playEffect("CaiShen_243_MiddleWin_mp3");
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
				v.winCard.forEach((value: number, column: number) => {
					let gridIndex = value + column * 3;
					value != -1 && grids.indexOf(gridIndex) == -1 && grids.push(gridIndex);
				});
			})

			this.bottomBar.setWinMoney(this.spinResp.payload.totalGold);
			/**中奖的里面有没有wild*/
			grids.some(v => this.spinResp.payload.viewGrid[v] == "1") && this.isFree && this.freeMultiAni(this.featureMultiplier);
			return Promise.all(
				grids.map((v) => {
					return this.symbols[v].showWinAni();
				})
			);
		}
		/**
		 * scatter图标动画
		 * */
		private showScatterLine() {
			if(this.spinResp.payload.getFeatureChance){
				this.lineWinTxt.visible = true;
				this.lineWinTxt.text = this.spinResp.payload.scatterGold.toFixed(2);
			}

			return Promise.all(
				this.spinResp.payload.getFeatureChance ? this.spinResp.payload.scatterGrid.map((value: number, column: number) => {
					let gridIndex = value + column * 3;
					return this.symbols[gridIndex].showWinAni(false);
				}) : []
			)
		}
		private stopScatterLine(){
            this.particleBg.visible = false;
			this.lineWinTxt.visible = false;
			this.lineWinTxt.text = "";
            this.spinResp.payload.scatterGrid.forEach((value: number, column: number)=>{
                let gridIndex = value + column * 3;
                this.symbols[gridIndex].reset();
			})
		}
		/**
		 * 展示本局获得免费机会
		 * */
		private showFreeChange() {
			return new Promise((resolve, reject) => {
				if (this.spinResp.payload.getFeatureChance) {
					SoundPlayer.playEffect("CaiShen_243_Get_FreeGame_mp3");
					this.freeChanceGroup.visible = true;
					this.freeChangeMc.play();
					this.setFreeChooseCount(true);
					egret.Tween.get(this.freeChangeImg)
						.set({ scaleX: 3, scaleY: 3 })
						.to({ scaleX: 1, scaleY: 1 }, 200)
						.wait(3000)
						.call(() => {
							egret.Tween.removeTweens(this.freeChangeImg);
							this.freeChanceGroup.visible = false;
							resolve();
						})
				}
				else {
					resolve();
				}
			});
		}
		/**
		 * bonus图标动画
		 * */
		private showBonusLine() {
			let grids = this.spinResp.payload.featureData.featureBonusData.grid;
			let gold = this.spinResp.payload.featureData.featureBonusData.gold;
			gold > 0 && SoundPlayer.playEffect("CaiShen_243_Bonus_mp3");
			return Promise.all(
				gold > 0 ? grids.map((value: number, column: number) => {
					return new Promise((res, rej) => {
						if (value == -1) {
							res();
						}
						else {
							this.lineWinTxt.visible = true;
							this.lineWinTxt.text = gold.toFixed(2);
							let gridIndex = value + column * 3;
							let target = this["tile" + gridIndex];
							this.particleBg.visible = true;
							//红包动画
							let mc: AMovieClip = new AMovieClip();
							mc.sources = "T_hongbao_|1-16|_png";
							mc.x = target.x;
							mc.y = target.y;
							this["winGridGroup"].addChild(mc);
							target.visible = false;
							mc.loop = 2;
							mc.play();

							/**喷金币 */
							let coins = [];
							let flag = 0;
							let createCoins = ()=>{
								let coin = new AMovieClip();
								coin.sources = "SU_Coin_Gold_3x3_|1-9|_png";
								coin.x = target.x+target.width/2;
								coin.y = target.y+70;
								coin.width = coin.height = 30;
								coin.anchorOffsetX = coin.anchorOffsetY = 15;
								coin["speedx"] = Math.round((Math.random()*10-5));
								coin["speedy"] = -Math.round((Math.random()*7+7));
								coin["count"] = 0;
								this["bonusEffectGroup"].addChild(coin);
								coins.push(coin);
								coin.play();
							}

							egret.Tween.get(this["bonusEffectGroup"], {loop:true})
								.wait(30)
								.call(()=>{
									if(++flag % 3 == 0)createCoins();
									coins.forEach((v,i)=>{
										v.x += v["speedx"];
										v.y += v["speedy"];
										v["speedy"]++;
										if(++v.count > 24){
											v.stop();
											v.parent.removeChild(v);
											coins.splice(i,1);
										}
									})
								})

							//粒子发散效果
							
							let texture = RES.getRes("star_png");
							let cfg = RES.getRes("bonusParticle_json");
							let p = new particle.GravityParticleSystem(texture, cfg);
							p.blendMode = egret.BlendMode.ADD;
							p.emitterX = target.x+target.width/2;
							p.emitterY = target.y+70;
							this["bonusEffectGroup"].addChild(p);
							p.start();


							mc.once(AMovieClip.COMPLETE, () => {
								mc.parent.removeChild(mc);
								this["tile" + gridIndex].visible = true;
								this.particleBg.visible = false;
								this.lineWinTxt.visible = false;

								egret.Tween.removeTweens(this["bonusEffectGroup"]);
								while(coins.length>0){
									coins.pop().stop();
								}
								this["bonusEffectGroup"].removeChildren();

								if(p){
									p.stop();
									if(p.parent) p.parent.removeChild(p);
								}

								res();
							}, this);
						}

					})
				}) : []
			)
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
					this.lineWinTxt.visible = true;
					this.lineWinTxt.text = v.gold.toFixed(2);
					await Promise.all(
						v.winCard.map((value: number, column: number) => {
							return this.symbols[value + column * 3].showWinAni(false);
						})
					);
					console.log("第" + lineIndex + "条中奖线展示完成", v);
				}

				for (let i = 0; i < arr.length; i++) {
					await singleLineShow(arr[i], i);
				}
				this.particleBg.visible = false;
				resolve();
			})
		}
		/**
		 * 停止中奖展示
		 * */
		private cancelLinesWin() {
            this.particleBg.visible = false;
			this.lineWinTxt.visible = false;
			this.particleBg.visible = false;
			this.lineWinTxt.text = "";
			this.symbols.forEach(symbol => {
				symbol.reset();
			})

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
				this.setState(GameState.BET);
				if (this.autoMax) {
					this.bottomBar.setAutoBetNum(-1);
				}
				else if (this.autoCount > 0) {
					this.bottomBar.setAutoBetNum(--this.autoCount);
				}
				if (this.autoMax || this.autoCount > 0) {
					setTimeout(()=> {
						if(this.state == GameState.BET) this.spin();
					}, 1000);
				}
			}
		}

		// -------------------- 免费游戏显示  ------------------------

        /**
         * 显示免费游戏选择的ui
         * */
		private showFreeChoose(b: boolean) {
			this.freeTotalWin.visible = false;
			this.freeChoose.visible = b;
			if (b) this.freeChoose.show();
			this.updateBgm();
		}
		/**
		 * 显示免费游戏的ui
		 * */
		private showFreeGame(b: boolean) {
			this.freeTotalWin.visible = false;
			this.bg.visible = !b;
			this.bgFree.visible = b;
			this.kuang.visible = !b;
			this.kuangFree.visible = b;
			this.freeCountBg.visible = b;
			this.setFreeChooseCount();
			this.setState(GameState.BET);
			this.updateBgm();
			this.wildShow(b);
			setTimeout(() => {
				if (b) {
					this.spin();
				}
				else {
					if (this.autoMax || this.autoCount > 0) this.spin();
				}
			}, 500);


		}
		/**
		 * wild图标显示
		*/
		private wildShow(isFree: boolean): void {
			this.symbols && this.symbols.forEach(v => {
				v.value == "1" && (v.tile.source = isFree ? ("symbolName_1_" + this.buff + "_png") : "symbolName_1_png");
			});
		}
		/**
		 * 刷新免费选择次数
		 * */
		private setFreeChooseCount(isAn: boolean = false) {
			this.freeChooseCountBoom.sources = "zz_|1-61|_png";
			egret.Tween.removeTweens(this.freeChooseCountBoom);
			this.freeChooseCountBoom.scaleX = 1;
			this.freeChooseCountBoom.scaleY = 1;
			this.freeChooseCountBoom.x = 960;
			this.freeChooseCountBoom.y = 540;

			let isShow: boolean = this.featureChanceCount > 0;
			if (isAn) {
				isShow && egret.Tween.get(this.freeChooseCountBoom)
					.call(() => this.freeChooseCountBoom.visible = true)
					.to({ scaleX: 0.3, scaleY: 0.3, x: 1727, y: 187 }, 1000)
					.to({ scaleX: 1.2, scaleY: 1.2 }, 10)
					.call(() => {
						this.freeChooseCountBoom.play();
						this.freeChooseCountTxt.text = "x" + this.featureChanceCount;
						this.freeChooseCountBg.visible = isShow;
						this.freeChooseCountTxt.visible = isShow;
						setTimeout(() => {
							this.freeChooseCountBoom.stop();
							this.freeChooseCountBoom.visible = false;
						}, 1000)
					})
			} else {
				this.freeChooseCountBg.visible = isShow;
				this.freeChooseCountTxt.visible = isShow;
				isShow && (this.freeChooseCountTxt.text = "x" + this.featureChanceCount);
			}
		}
		/**
		 * 显示免费的倍数
		 * */
		private freeMultiAni(mul: number, isStart: boolean = true): void {
			if (isStart) {
				this.freeMultiGroup.visible = true;
				//倍数
				this.freeMulti.text = "X" + mul;
				let theParticle = (texture, cfg, index, isLight?: boolean) => {
					let theP = new particle.GravityParticleSystem(texture, cfg);
					this.freeMultiGroup.addChildAt(theP, index);
					theP.emitterX = 100;
					theP.emitterY = 70;
					isLight && (theP.blendMode = egret.BlendMode.ADD);
					theP.start();
					return theP;
				}
				this.thePArr = [];
				//光晕效果
				this.thePArr.push(theParticle(RES.getRes("freemultiLight_png"), RES.getRes("particle_multiLight_json"), 0, true));
				//粒子发散效果
				this.thePArr.push(theParticle(RES.getRes("freemulti_png"), RES.getRes("particle_multi_json"), 1));
			} else {
				this.thePArr.forEach(v => {
					v.stop();
					v.visible = false;
					v.parent && v.parent.removeChild(v);
				})
				this.thePArr = [];
				this.freeMultiGroup.visible = false;
			}
		}
		/**
		 * 进入免费结算面板，显示免费总奖励
		 * */
		private showFreeTotalWin(n: string) {
			this.freeTotalWin.showTotalWin(n);
			this.thePArr && this.thePArr.length > 0 && this.freeMultiAni(this.featureMultiplier, false);
		}
		/**
		 * 免费结算完成
		 * */
		private freeComplete() {
			if (this.featureChanceCount > 0) {
				this.showFreeChoose(true);
			}
			else {
				this.isFree = false;
				this.showFreeGame(false);
				this.bottomBar.setFree(false);
				this.setState(GameState.BET);
			}
		}

	}


	/**
	 * 图标动画类
	 * */
	class Symbol {
		public value: string;
		public tile: eui.Image;
		private p: particle.GravityParticleSystem;
		private gameScene: GameScene;
		private mc: AMovieClip;
		private mc2: AMovieClip;
		public constructor(tile: eui.Image, gameScene: GameScene) {
			this.tile = tile;
			this.gameScene = gameScene;

			let texture = RES.getRes("light_lizi01_png");
			let cfg = RES.getRes("particle_json");
			this.p = new particle.GravityParticleSystem(texture, cfg);
			this.p.blendMode = egret.BlendMode.ADD;
			gameScene.particleGroup.addChild(this.p);
			this.p.visible = false;
		}
		/**
		 * 设置图标结果
		 * */
		public setTexture(v) {
			this.tile.source = v;
		}
		/**
		 * 图标中奖动画 isLong：是否是长动画
		 * */
		public showWinAni(isLong: boolean = true) {
			return new Promise((resolve, reject) => {
				this.gameScene.winGridGroup.addChild(this.tile);
				//scatter 金币图标
				if (this.value == "0") {
					this.mc = new AMovieClip();
					this.mc.sources = "T_tongqian_|1-16|_png";
					this.mc.speed = 2;
					this.mc.x = this.tile.x;
					this.mc.y = this.tile.y;
					this.mc.width = this.tile.width;
					this.mc.height = this.tile.height;
					this.gameScene["winGridGroup"].addChild(this.mc);
					this.mc.play();
					this.mc.loop = isLong ? 3 : -1;
					this.tile.visible = false;
					this.mc.once(AMovieClip.COMPLETE, () => {
						this.mc.visible = false;
						this.tile.visible = true;
					}, this)
				}
				//wild图标
				else if (this.value == "1") {
					this.tile.source = this.gameScene.buff != "-1" ? ("wildbg" + this.gameScene.buff + "_png") : "wildBg0_png";

					this.mc = new AMovieClip();
					this.mc.sources = "caishenAni|1-16|_png";
					this.mc.x = this.tile.x + 10;
					this.mc.y = this.tile.y;
					this.mc.width = 173;
					this.mc.height = 173;
					this.mc.speed = 4;
					this.mc.loop = isLong ? 2 : 1;
					this.gameScene["winGridGroup"].addChild(this.mc);
					this.mc.play();

					this.mc2 = new AMovieClip();
					this.mc2.sources = "wildText|1-20|_png";
					this.mc2.x = this.tile.x;
					this.mc2.y = this.tile.y + 99;
					this.mc2.speed = 4;
					this.mc2.loop = isLong ? 2 : 1;
					this.gameScene["winGridGroup"].addChild(this.mc2);
					this.mc2.play();
				}

				this.gameScene.particleBg.visible = true;
				let p = this.p;
				let grid: eui.Image = this.tile
				p.visible = true;
				p.start();
				p.emitterX = p.emitterY = 0;
				p.x = grid.x;
				p.y = grid.y;
				let f = () => {
					egret.Tween.get(p)
						.to({ emitterX: grid.width }, 300)
						.to({ emitterY: grid.height }, 300)
						.to({ emitterX: 0 }, 300)
						.to({ emitterY: 0 }, 300)
						.call(() => {
							p.stop();
							p.visible = false;

							if (this.mc && this.value!="0") {
								this.mc.stop();
								this.mc.parent.removeChild(this.mc);
								this.mc = null;
								this.tile.visible = true;
							}
							if (this.mc2) {
								this.mc2.stop();
								this.mc2.parent.removeChild(this.mc2);
								this.mc2 = null;
							}
							if (this.value == "1") {
								this.tile.source = this.gameScene.buff != "-1" ? "symbolName_1_" + this.gameScene.buff + "_png" : "symbolName_1_png";
							}
							this.gameScene.valueTiles.addChild(this.tile);
							this.gameScene.lineWinTxt.visible = false;
						})
						//单线展示的间隔时间
						.wait(200)
						.call(() => {
							egret.Tween.removeTweens(p);
							resolve();
						})
				}

				if (isLong) {
					egret.Tween.get(p)
						.to({ emitterX: grid.width }, 300)
						.to({ emitterY: grid.height }, 300)
						.to({ emitterX: 0 }, 300)
						.to({ emitterY: 0 }, 300)
						.call(f);
				}
				else {
					f();
				}
			})
		}
		/**
		 * 停止动画
		 * */
		public reset() {
			if (this.p) {
				this.p.stop();
				this.p.visible = false;
				egret.Tween.removeTweens(this.p);
			}

			if (this.mc) {
				this.mc.stop();
				this.mc.parent.removeChild(this.mc);
				this.mc = null;
			}
			if (this.mc2) {
				this.mc2.stop();
				this.mc2.parent.removeChild(this.mc2);
				this.mc2 = null;
			}
			if (this.value == "1") {
				this.tile.source = (this.gameScene.buff=="-1"? "symbolName_1_png" : ("symbolName_1_" + this.gameScene.buff + "_png"));
			}

			this.tile.visible = true;
			if (this.tile.parent != this.gameScene.valueTiles) this.gameScene.valueTiles.addChild(this.tile);
		}
	}
}
