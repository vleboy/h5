module game {
	export class FreeChoose extends BaseUI {
		private tipTxt: eui.Image;
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeChooseSkin.exml";
		}

		public init() {
			this["yuanbaoGroup"].visible = false;
			["20", "15", "10", "8", "5"].forEach((v, i) => {
				this.registerEvent(this["choose" + v], egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			})
		}

		public show() {
			this["yuanbaoGroup"].visible = false;
			this.tipTxt.visible = false;
			this["chooseGroup"].setChildIndex(this["rect"], 0);
			["10", "5", "15", "8", "20"].forEach((v, i) => {
				this["chooseGroup"].setChildIndex(this["choose" + v], 1);
			});
			["20", "8", "15", "5", "10"].forEach((v, i) => {
				let target = this["choose" + v];
				let defaultY = target.y;
				egret.Tween.get(target)
					.set({ y: defaultY - 1000 })
					.wait(i * 150 + 500)
					.call(() => {
						SoundPlayer.playEffect("ShenShou_243_CardAppear_mp3");
					})
					.to({ y: defaultY }, 400, egret.Ease.backOut)
					.call(() => {
						this.registerEvent(target, egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
					})
			})
			egret.Tween.get(this.tipTxt, { loop: true })
				.wait(2000)
				.call(() => this.tipTxt.visible = true)
				.to({ alpha: 0.5 }, 500)
				.to({ alpha: 1 }, 500)
		}

		private onTouch(e: egret.TouchEvent) {
			SoundPlayer.playEffect("ShenShou_243_ChoseCard_mp3");
			let n = 0;
			switch (e.target) {
				case this["choose20"]: n = 5; break;
				case this["choose15"]: n = 4; break;
				case this["choose10"]: n = 3; break;
				case this["choose8"]: n = 2; break;
				case this["choose5"]: n = 1; break;
			}

			["20", "15", "10", "8", "5"].forEach((v) => {
				let target = this["choose" + v] as eui.Group;
				if (e.target != target) {
					this["chooseGroup"].setChildIndex(target, 0);
				}
				else {
					let respData;
					Promise.all([
						new Promise((resolve, reject) => {
							let mc = new AMovieClip();
							mc.sources = "wildAni|1-14|_png";
							mc.x = 155;
							mc.y = 46;
							mc.width = 207;
							mc.height = 202;
							mc.speed = 6;
							mc.loop = 2;
							target.addChildAt(mc, 2);
							mc.play();
							mc.once(AMovieClip.COMPLETE, () => {
								mc.parent.removeChild(mc);
								resolve();
							}, this);
						}),
						new Promise((resolve, reject) => {
							n > 0 && GameService.getInstance().sendFreeChoose(n).then(async (resp) => {
								respData = resp;
								resolve();
							});
						})
					]).then(async () => {
						await this.yuanbaoAni();
						this.sendNotify(NotifyConst.chooseFreeBack, respData);
					})

				}
			})
		}

		private yuanbaoAni() {
			SoundPlayer.playEffect("ShenShou_243_CardEffect_mp3");
			egret.Tween.removeTweens(this.tipTxt);
			egret.Tween.removeTweens(this.tipTxt);
			let g = (this["yuanbaoGroup"] as eui.Group);
			let arr = [];
			g.visible = true;

			return Promise.all(
				[1, 2, 3, 4, 5, 6].map((v, i) => {
					let target = this["yun" + v];
					let defaultx = target.x;
					let defaulty = target.y;
					let startx = v % 2 == 0 ? 1920 : -1000;
					let starty = v % 2 == 0 ? 1080 : -500;
					return new Promise((resolve, reject) => {
						egret.Tween.get(target)
							.set({ x: startx, y: starty })
							.wait(Math.floor(i / 2) * 250)
							.to({ x: defaultx, y: defaulty }, 750, egret.Ease.quadOut)
							.wait(500)
							.call(() => {
								egret.Tween.removeTweens(target);
								resolve();
							});
					});
				})
			);
		}

	}
}