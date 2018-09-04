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

        public init(): void {
            this.visible = false;
        }
        public bigWinStart(type: string, money: number) {
            this.visible = true;
            //元宝数和喷元宝的时间
            let num: number = 50, timer: number = 10;
            switch (type) {
                case "big":
                    num = 50;
                    timer = 10;
                    break;
                case "mega":
                    num = 100;
                    timer = 20;
                    break;
                case "super":
                    num = 200;
                    timer = 30;
                    break;
            }
            this.winChannel = SoundPlayer.playEffect("CaiShen_243_BigWin_mp3");
            return Promise.all([this.yuanbao(timer), this.payOut(money, timer), this.bigWinLight(), this.winTxtAni(type, num)]).then(() => {
                if (this.winChannel) this.winChannel.stop();
            });
        }
        /**喷元宝
         * @param timer 喷元宝时间
         * @param num 喷元宝数量
        */
        private yuanbao(timer: number) {
            return new Promise((res, rej) => {
                let texture = RES.getRes("yigeyuanb_png");
                let cfg = RES.getRes("particle_yuanbao_json");
                this.theParticle = new particle.GravityParticleSystem(texture, cfg);
                this.yuanbaoGroup.addChild(this.theParticle);
                this.theParticle.start();

                let timeOut;
                timeOut && clearTimeout(timeOut);
                timeOut = setTimeout(() => {
                    this.theParticle && this.theParticle.stop();
                    this.visible = false;
                    this.theParticle.parent.removeChild(this.theParticle);
                    res();
                }, timer * 1000);
            });
        }
        /**派彩*/
        private payOut(mon: number, timer: number) {
            this.winNum = 0;
            return new Promise((res, rej) => {
                egret.Tween.get(this, { onChange: () => { this.payout.text = this.winNum.toFixed(2) }, onChangeObj: this })
                    .to({ winNum: mon }, timer * 1000 - 2000).call(() => {
                        egret.Tween.removeTweens(this);
                        egret.Tween.get(this.payout)
                            .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                            .to({ scaleX: 1, scaleY: 1 }, 300)
                            .call(() => {
                                egret.Tween.removeTweens(this.payout);
                                this.fireworks();
                                SoundPlayer.playEffect("CaiShen_243_BigWinOver_mp3");
                                res();
                            });
                    });
            });

        }
        /**light*/
        private bigWinLight(): void {
            this.light.sources = "bigwinLight|1-25|_png";
            this.light.play();
        }

        /**winTxtAni*/
        private winTxtAni(type: string, num: number) {
            return new Promise((res, rej) => {
                let txtAni = (theSou: string, callBack?: Function) => {
                    this.winImg.source = theSou;
                    egret.Tween.get(this.winImg)
                        .to({ scaleX: 5, scaleY: 5 }, 200)
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .call(() => {
                            egret.Tween.removeTweens(this.winImg);
                            callBack && callBack.call(this);
                        });
                }
                this.theParticle && (this.theParticle.maxParticles = 50);
                switch (type) {
                    case "big":
                        txtAni("BigWin_png", () => res() );
                        break;
                    case "mega":
                        txtAni("BigWin_png");
                        setTimeout(() => {
                            txtAni("MegaWin_png", () => res());
                            this.theParticle && (this.theParticle.maxParticles = num);
                        }, 10000);
                        break;
                    case "super":
                        txtAni("BigWin_png");
                        setTimeout(() => {
                            txtAni("MegaWin_png");
                            this.theParticle && (this.theParticle.maxParticles = 100);
                        }, 10000);
                        setTimeout(() => {
                            txtAni("SuperWin_png", () => res());
                            this.theParticle && (this.theParticle.maxParticles = num);
                        }, 20000);
                        break;
                }

            });
        }

        /**喷烟花*/
        private fireworks() {
            return new Promise((res, rej) => {
                let texture = RES.getRes("glow_321_png");
                let cfg = RES.getRes("particle_fireworks_json");
                let rand: number = Math.ceil(Math.random() * 10);
                let arr: particle.GravityParticleSystem[] = [];
                for (let i = 0; i <= rand; i++) {
                    let particle_fireworks = new particle.GravityParticleSystem(texture, cfg);
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