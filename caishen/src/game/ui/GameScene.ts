module game {
	export class GameScene extends BaseUI implements INotify {
		private tileMask: eui.Rect;
		private tileGroup: eui.Group;
		private bottomBar: BottomBar;
		private rull: Rull;
		private setting: Setting;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "gameSceneSkin.exml";
		}
		/**初始化显示对象，注册通知 */
		public initSetting() {
			NotifyManager.getInstance().addRegister(this, [
				NotifyConst.spin,
				NotifyConst.openHelp,
				NotifyConst.openSetting
			]);

			FilterUtil.setLightFlowFilter(this["title"]);
			this.tileGroup.mask = this.tileMask;
			this.initTiles();
		}
		/**处理通知 */
		public handleNotify(key: NotifyConst, body) {
			switch (key) {
				case NotifyConst.spin:
					this.startSpin();
					setTimeout(() => {
						this.stopRoll([0, 1, 2, 1, 4, 5, 1, 7, 8, 9, 10, 11, 12, 3, 6]);
					}, 1000);
					break;
				case NotifyConst.openHelp:
					this.rull.rullShow(true);
					break;
				case NotifyConst.openSetting:
					this.setting.settingShow();
					break;
			}
		}

		// -------------------- 游戏逻辑  ------------------------

		// -------------------- 游戏显示  ------------------------

		/**随机初始化图标 */
		private initTiles() {
			for (let i = 0; i < 15; i++) {
				let n = Math.floor(Math.random() * 13) + "";
				n = (n == "2" ? "2_1" : n);
				this["tile" + i].visible = true;
				this["tile" + i].source = "symbolName_" + n + "_png";
			}
			for (let i = 0; i < 20; i++) {
				this["vagueTile" + i].visible = false;
			}
		}
		/**开始滚动 */
		public startSpin() {
			this.bottomBar.setSpinEnable(false);
			for (let i = 0; i < 15; i++) {
				this["tile" + i].visible = false;
			}
			for (let i = 0; i < 20; i++) {
				this.singleRoll(this["vagueTile" + i]);
			}
		}
		/**单个模糊图标的滚动逻辑 */
		private singleRoll(tile) {
			tile.visible = true;
			tile.source = "vague" + Math.floor(Math.random() * 13) + "_png";
			egret.Tween.get(tile, { loop: true })
				.wait(20)
				.call(() => {
					tile.y += 70;
					if (tile.y > 658) {
						tile.y = -200;
						tile.source = "vague" + Math.floor(Math.random() * 13) + "_png";
					}
				})
		}
		/**停下来 */
		private stopRoll(arr: any[]) {
			// 3 4 5列是否缓停
			let is3Delay: boolean = (arr.slice(0, 3).indexOf(1) > -1 && arr.slice(3, 6).indexOf(1) > -1);
			let is4Delay: boolean = is3Delay && arr.slice(6, 9).indexOf(1) > -1;
			let is5Delay: boolean = is4Delay && arr.slice(9, 12).indexOf(1) > -1;
			//处理wild图标的多样性
			arr = arr.map(v => (v == 2 ? "2_1" : (v + "")));


			for (let i = 0; i < 5; i++) {
				let delay = i * 250;
				if (is3Delay && i >= 2) {
					delay += 2000;
					if (is4Delay && i >= 3) {
						delay += 2000;
						if (is5Delay && i == 4) {
							delay += 2000;
						}
					}
				}
				this.stopColumn(i, arr.slice(i * 3, i * 3 + 3), delay);
			}
		}
		/**单列停下来 */
		private stopColumn(column, arr: any[], delay) {
			setTimeout(() => {
				[0, 1, 2, 3].forEach(i => {
					egret.Tween.removeTweens(this["vagueTile" + (column + i)]);
					this["vagueTile" + (column * 4 + i)].visible = false;
					this["vagueTile" + (column * 4 + i)].y = 21 + i * 208;
				});

				[0, 1, 2].forEach(i => {
					let defaultY = this["tile" + (column * 3 + i)].y;
					let tile = this["tile" + (column * 3 + i)];
					tile.visible = true;
					tile.source = "symbolName_" + (arr[i]) + "_png";
					egret.Tween.get(tile).set({ y: defaultY - 100 }).to({ y: defaultY }, 500).call(() => { egret.Tween.removeTweens(tile) });
				})

				if (column == 4) {
					this.bottomBar.setSpinEnable(true);
				}
			}, delay);

		}
	}
}