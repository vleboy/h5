module game {
    export class BigWin extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "bigWinSkin.exml";
        }
        /**元宝Group*/
        private yuanbaoGroup: eui.Group;
        /**派彩金额*/
        private payout: eui.BitmapLabel;
        private light: AMovieClip;
        private winImg: eui.Image;
        private payoutGroup: eui.Group;

        private theParticle: particle.GravityParticleSystem;
        private winNum: number = 0;

        private winChannel: egret.SoundChannel;
        /**喷元宝的时间数组*/
        private yuanbaoTime: number[];
        /**喷元宝的数量数组*/
        private yuanbaoNum: number[];
        public init(): void {
            this.visible = false;
            this.yuanbaoTime = [10000, 20000, 30000];
            this.yuanbaoNum = [30, 60, 90];
        }
        public bigWinStart(type: string, money: number) {
            this.visible = true;
            //喷元宝的时间
            let timer: number = this.yuanbaoTime[0];
            switch (type) {
                case "big":
                    timer = this.yuanbaoTime[0];
                    break;
                case "mega":
                    timer = this.yuanbaoTime[1];
                    break;
                case "super":
                    timer = this.yuanbaoTime[2];
                    break;
            }
            this.winChannel = SoundPlayer.playEffect("BigWin_mp3");
            this.bigWinLight();
            return Promise.all([this.payOut(money, timer), this.winTxtAni(type)]).then(() => {
                if (this.winChannel) this.winChannel.stop();
            });
        }
        /**喷元宝
         * @param timer 喷元宝时间
         * @param num 喷元宝数量
        */
        private yuanbao(timer: number, num: number) {
            return new Promise((res, rej) => {
                let texture = RES.getRes("yigeyuanb_png");
                let cfg = RES.getRes("particle_yuanbao_json");
                cfg.maxParticles = num;
                this.theParticle = new particle.GravityParticleSystem(texture, cfg);
                this.yuanbaoGroup.addChild(this.theParticle);
                this.theParticle.start();

                let timeOut;
                timeOut && clearTimeout(timeOut);
                timeOut = setTimeout(() => {
                    this.theParticle && this.theParticle.stop();
                    this.theParticle.parent.removeChild(this.theParticle);
                    this.theParticle = null;
                    res();
                }, timer);
            });
        }
        /**winTxtAni*/
        private winTxtAni(type: string) {
            return new Promise((res, rej) => {
                let txtAni = (theSou: string) => {
                    this.winImg.source = theSou;
                    egret.Tween.get(this.winImg)
                        .to({ scaleX: 5, scaleY: 5 }, 200)
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .call(() => {
                            egret.Tween.removeTweens(this.winImg);
                        });
                }
                txtAni("BigWin_png");
                let megaTime: number = this.yuanbaoTime[1] - this.yuanbaoTime[0];
                let superTime: number = this.yuanbaoTime[2] - this.yuanbaoTime[1];
                switch (type) {
                    case "big":
                        this.yuanbao(this.yuanbaoTime[0], this.yuanbaoNum[0]).then(() => {this.visible = false;res();});
                        break;
                    case "mega":
                        this.yuanbao(this.yuanbaoTime[0], this.yuanbaoNum[0]).then(() => {
                            txtAni("MegaWin_png");
                            this.yuanbao(megaTime, this.yuanbaoNum[1]).then(() => {this.visible = false;res();});
                        });
                        break;
                    case "super":
                        this.yuanbao(this.yuanbaoTime[0], this.yuanbaoNum[0]).then(() => {
                            txtAni("MegaWin_png");
                            this.yuanbao(megaTime, this.yuanbaoNum[1]).then(() => {
                                txtAni("SuperWin_png");
                                this.yuanbao(superTime, this.yuanbaoNum[2]).then(() => {this.visible = false;res();});
                            });
                        });
                        break;
                }
            });
        }
        /**派彩*/
        private payOut(mon: number, timer: number) {
            this.winNum = 0;
            return new Promise((res, rej) => {
                egret.Tween.get(this, { onChange: () => { this.payout.text = this.winNum.toFixed(2) }, onChangeObj: this })
                    .to({ winNum: mon }, timer - 2000).call(() => {
                        egret.Tween.removeTweens(this);
                        SoundPlayer.playEffect("BigWinOver_mp3");
                        egret.Tween.get(this.payout)
                            .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                            .to({ scaleX: 1, scaleY: 1 }, 300)
                            .call(() => {
                                egret.Tween.removeTweens(this.payout);
                                this.fireworks();
                                res();
                            });
                    });
            });

        }
        /**light*/
        private bigWinLight(): void {
            this.light.sources = "bigwinLight|1-30|_png";
            this.light.play();
        }

        /**喷烟花*/
        private fireworks() {
            return new Promise((res, rej) => {
                let texture = RES.getRes("fireworks_png");
                let cfg = RES.getRes("particle_fireworks_json");
                let rand: number = Math.ceil(Math.random() * 30);
                let arr: particle.GravityParticleSystem[] = [];
                for (let i = 0; i <= rand; i++) {
                    let particle_fireworks = new particle.GravityParticleSystem(texture, cfg);
                    particle_fireworks.blendMode = egret.BlendMode.ADD;
                    arr.push(particle_fireworks);
                    this.payoutGroup.addChild(particle_fireworks);
                    let ranX: number = 200 - Math.floor(Math.random()) * 400;
                    particle_fireworks.emitterX = 950 + 300 - Math.floor(Math.random() * 600);
                    particle_fireworks.emitterY = 530 + 150 - Math.floor(Math.random() * 300);
                    particle_fireworks.start();
                }
                let timeOut;
                if (timeOut) clearTimeout(timeOut);
                timeOut = setTimeout(() => {
                    arr.forEach(v => v.stop());
                    res();
                }, 80);
            });
        }
    }
}