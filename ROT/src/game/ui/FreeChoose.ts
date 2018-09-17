module game {
	export class FreeChoose extends BaseUI {
		/**下方选择免费提示文字图片*/
		private tipTxt: eui.Image;
		/**进入免费游戏文字帧动画*/
		private freeTxtAni: game.AMovieClip;
		/**外围大框*/
		private chooseGroup: eui.Group;
		/**透明蒙版*/
		private rect: eui.Rect;
		/**免费卡的背景框*/
		private cardBgLight: eui.Group;
		/**背景光图片*/
		private bgLight: eui.Image;
		/**大法阵图片*/
		private maxArr: eui.Image;
		/**白板*/
		private closeRect: eui.Rect;
		/**次数数组*/
		private countArr: string[];
		/**粒子效果数组*/
		private parArr: particle.GravityParticleSystem[];
		public constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "freeChooseSkin.exml";
		}
		/**初始化*/
		public init() {
			this.countArr = ["20", "15", "10", "8", "5"];
			this.parArr = [];
			this.countArr.forEach(v => this.registerEvent(this["choose" + v], egret.TouchEvent.TOUCH_TAP, this.onClick, this));
			this.registerEvent(this["closeBtn"], egret.TouchEvent.TOUCH_TAP, () => {
				this.close();
			}, this);
		}
		/**显示*/
		public show() {
			//默认显示
			let defShow = () => {
				this.chooseGroup.setChildIndex(this.rect, 0);
				this.chooseGroup.setChildIndex(this.freeTxtAni, 1);
				this.chooseGroup.setChildIndex(this.cardBgLight, 2);
				//选项卡默认位置,隐藏黄光
				this.countArr.forEach((v, i) => {
					let tar: eui.Group = this["choose" + v] as eui.Group;
					tar.left = -310;
					this.chooseGroup.setChildIndex(tar, i + 3);
					(this["cardBg" + v] as eui.Image).alpha = 0;
					(this["minArr_" + v] as eui.Image).alpha = 0;
					this.bgLight.alpha = 0;
					this.maxArr.alpha = 0;
				});
				//初始化粒子
				this.parArr.forEach(v => {
					v.visible = false;
					v.stop();
					v.parent && v.parent.removeChild(v);
				});
				this.parArr = [];
			};
			defShow();
			//免费游戏文字帧动画，选项卡动画
			this.freeTxtIn().then(() => this.cardIn());
			//下方选择免费提示文字图片动画
			egret.Tween.get(this.tipTxt, { loop: true }).wait(2000).to({ alpha: 0.5 }, 500).to({ alpha: 1 }, 500);
		}
		/**
		 * 免费游戏文字帧动画
		*/
		private freeTxtIn(): Promise<{}> {
			return new Promise((res, rej) => {
				this.freeTxtAni.play();
				this.freeTxtAni.loop = 1;
				setTimeout(() => SoundPlayer.playEffect("ROT_243_CardAppear_mp3"), 2000);
				this.freeTxtAni.once(AMovieClip.COMPLETE, () => { res() }, this);
			});
		}
		/**
		 * 选项卡进入动画(免费类型进入动画)
		*/
		private cardIn(): Promise<{}> {
			return new Promise((res, rej) => {
				let moveAni = (tar: eui.Group, leftNum: number, moveTime: number, wait: number) => {
					return new Promise((res2, rej2) => {
						egret.Tween.get(tar).wait(wait).to({ left: leftNum }, moveTime).call(() => { egret.Tween.removeTweens(tar); res2(); });
					});
				};
				let moveTimeArr: number[] = [600, 450, 300, 150, 80];
				let waitTaimArr: number[] = [0, 200, 400, 600, 800];
				let cardArr: number[] = [1550, 1178, 806, 434, 62];
				let proArr: Array<Promise<{}>> = [];
				["5", "8", "10", "15", "20"].forEach((v, i) => { proArr.push(moveAni(this["choose" + v] as eui.Group, cardArr[i], moveTimeArr[i], waitTaimArr[i])) });
				Promise.all(proArr).then(() => res());
			});
		}
		/**点击某选项卡其他选项卡退出动画*/
		private cardOut(tar: eui.Group): Promise<{}> {
			return new Promise((res, rej) => {
				let freeType: string = tar.name.split("_")[1];
				let moveAni = (gro: eui.Group, leftNum: number, moveTime: number, wait: number) => {
					return new Promise((res2, rej2) => {
						egret.Tween.get(gro).wait(wait).to({ left: leftNum }, moveTime).call(() => { egret.Tween.removeTweens(gro); res2(); });
					});
				};
				let moveCenterTime: number[] = [400, 200, 0, 200, 400];
				let moveOutTime: number[] = [80, 150, 300, 450, 600];
				let index: number = this.countArr.indexOf(freeType);
				//闪黄光
				egret.Tween.get(this["cardBg" + freeType])
					.to({ alpha: 1 }, 200)
					.to({ alpha: 0 }, 200)
					.call(() => {
						egret.Tween.removeTweens(this["cardBg" + freeType]);
						//移动动画
						let outArr: string[] = ["20", "15", "10", "8", "5"];
						outArr.splice(index, 1);
						let proArr: Array<Promise<{}>> = [];
						//先设其他卡片的层次
						outArr.forEach(v => this.chooseGroup.setChildIndex(this["choose" + v] as eui.Group, 0));
						//其他卡片飞出
						outArr.forEach(v => proArr.push(moveAni(this["choose" + v] as eui.Group, -310, moveOutTime[index], 0)));
						//设卡片的层次
						this.chooseGroup.setChildIndex(tar, this.chooseGroup.numChildren);
						//选中卡片飞到中间
						proArr.push(moveAni(tar, 806, moveCenterTime[index], 100));
						Promise.all(proArr).then(() => res());
					});
			});
		}
		/**选项卡背景光动画*/
		private cardBgAni(cardType: string): Promise<{}> {
			return new Promise((res, rej) => {
				//显示背景
				let bgShow = (tar: eui.Image, timer: number) => {
					return new Promise((res2, rej2) => {
						tar.scaleX = .8;
						tar.scaleY = .8;
						tar.alpha = 0;
						egret.Tween.get(tar).wait(100).to({ scaleX: 1, scaleY: 1, alpha: 1 }, timer).call(() => { egret.Tween.removeTweens(tar); res2(); });
					});
				}
				//粒子效果
				let particleEffect = () => {
					let texture = RES.getRes("particle_" + cardType + "_png");
					let cfg1 = RES.getRes("freeParticle1_json");
					let cfg2 = RES.getRes("freeParticle2_json");
					let p1 = new particle.GravityParticleSystem(texture, cfg1);
					let p2 = new particle.GravityParticleSystem(texture, cfg2);
					let playP = (p: particle.GravityParticleSystem, index) => {
						this.cardBgLight.addChildAt(p, index);
						p.start();
						p.emitterX = 155;
						p.emitterY = 300;
						p.visible = true;
						this.parArr.push(p);
					}
					playP(p1, 0);
					setTimeout(() => playP(p2, 1), 1000);
				}
				//显示小发阵
				egret.Tween.get(this["minArr_" + cardType] as eui.Image)
					.wait(200)
					.to({ alpha: 1 }, 400)
					.call(() => {
						egret.Tween.removeTweens(this["minArr_" + cardType] as eui.Image);
						this.bgLight.source = "light_" + cardType + "_png";
						this.maxArr.source = "maxArr_" + cardType + "_png";
						//背景光
						bgShow(this.bgLight, 400).then(() => {
							//大法阵
							bgShow(this.maxArr, 200);
							//粒子效果
							particleEffect();
						});
					});
			});
		}
		/**关闭当前页面*/
		private close(): Promise<{}> {
			return new Promise((res, rej) => {
				this.closeRect.alpha = 0;
				this.closeRect.visible = true;
				egret.Tween.get(this.closeRect).to({ alpha: 1 }, 1500).call(() => {
					egret.Tween.removeTweens(this.closeRect);
					this.closeRect.visible = false;
					this.visible = false;
					res();
				});
				egret.Tween.get(this.maxArr).to({ alpha: 0.4 }, 500).call(() => egret.Tween.removeTweens(this.maxArr));
			});
		}
		/**点击某选项卡*/
		private onClick(e: egret.TouchEvent) {
			//发送免费请求
			let respData;
			let cardType: string = e.target.name.split("_")[1];
			let sendFree = () => {
				return new Promise((res, rej) => {
					//发送的免费类型，代表5:20, 4:15, 3:10, 2:8, 1:5
					let freeAype: number[] = [5, 4, 3, 2, 1];
					let index: number = this.countArr.indexOf(cardType);
					if (cardType) {
						GameService.getInstance().sendFreeChoose(freeAype[index]).then(async (resp) => { respData = resp; res(); });
					}
				});
			}
			SoundPlayer.playEffect("ROT_243_ChoseCard_mp3");
			this.cardOut(e.target).then(() => {
				SoundPlayer.playEffect("ROT_243_CardEffect_mp3");
				this.cardBgAni(cardType);
			});
		}
		private onTouch(e: egret.TouchEvent) {
			SoundPlayer.playEffect("ROT_243_ChoseCard_mp3");
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
							n > 0 && GameService.getInstance().sendFreeChoose(n).then(async (resp) => {
								respData = resp;
								resolve();
							});
						})
					]).then(async () => {
						// await this.yuanbaoAni();
						this.sendNotify(NotifyConst.chooseFreeBack, respData);
					})

				}
			})
		}
	}
}