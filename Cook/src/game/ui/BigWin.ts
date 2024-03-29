module game {
    export class BigWin extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "bigWinSkin.exml";
        }
        /**派彩金额*/
        private payout: eui.BitmapLabel;
        private boomLight: AMovieClip;
        private winLight: AMovieClip;
        private winImg: eui.Image;
        private payoutGroup: eui.Group;

        private winNum: number = 0;
        private winChannel: egret.SoundChannel;
        private theParticle: particle.GravityParticleSystem;
        private timeOut;
        /**展示的时间数组*/
        private showTime: number[];
        public init(): void {
            this.visible = false;
            this.showTime = [10000, 20000, 30000];
        }
        public bigWinStart(type: string, money: number) {
            this.visible = true;
            //持续时间
            let timer: number = this.showTime[0];
            switch (type) {
                case "big":
                    timer = this.showTime[0];
                    break;
                case "mega":
                    timer = this.showTime[1];
                    break;
                case "super":
                    timer = this.showTime[2];
                    break;
            }
            this.winChannel = SoundPlayer.playEffect("ROT_243_BigWin_mp3");
            return new Promise((res, rej) => {
                this.boomAni();
                if (this.timeOut) clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    this.winLight.play();
                    this.winLight.visible = true;
                    this.payoutGroup.visible = true;
                    Promise.all([this.payOut(money, timer), this.winTxtAni(type)]).then(() => {
                        if (this.winChannel) this.winChannel.stop();
                        this.winLight.visible = false;
                        this.payoutGroup.visible = false;
                        res();
                    })
                }, 400);
            });;
        }
        /**boom动画*/
        private boomAni(): void {
            this.boomLight.visible = true;
            this.boomLight.play();
            this.boomLight.loop = 1;
            this.boomLight.once(AMovieClip.COMPLETE, () => {
                this.boomLight.visible = false;
            }, this);
        }
        /**winTxtAni*/
        private winTxtAni(type: string) {
            return new Promise((res, rej) => {
                let txtAni = (theSou: string) => {
                    this.winImg.source = theSou;
                    egret.Tween.get(this.winImg)
                        .to({ scaleX: 5, scaleY: 5 }, 200)
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .call(() => egret.Tween.removeTweens(this.winImg));
                }
                let waitTimer;
                let wait = (timer: number) => {
                    return new Promise((res2, rej2) => {
                        waitTimer && clearTimeout(waitTimer);
                        waitTimer = setTimeout(() => { res2(); clearTimeout(waitTimer); }, timer);
                    });

                }
                txtAni("bigWin_png");
                let megaTime: number = this.showTime[1] - this.showTime[0];
                let superTime: number = this.showTime[2] - this.showTime[1];
                switch (type) {
                    case "big":
                        wait(this.showTime[0]).then(() => { this.visible = false; res(); });
                        break;
                    case "mega":
                        wait(this.showTime[0]).then(() => {
                            txtAni("megaWin_png");
                            this.spurtCoin(megaTime, 20).then(() => { this.visible = false; res(); });
                        });
                        break;
                    case "super":
                        wait(this.showTime[0]).then(() => {
                            txtAni("megaWin_png");
                            this.spurtCoin(megaTime, 20).then(() => {
                                txtAni("superWin_png");
                                this.spurtCoin(superTime, 40).then(() => { this.visible = false; res(); });
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
                        if (GlobalConfig.effectSwitch) { SoundPlayer.closeEffect(); SoundPlayer.closeEffect(false); }
                        SoundPlayer.playEffect("ROT_243_BigWinOver_mp3");
                    });
                egret.Tween.get(this.payout)
                    .to({ scaleX: 1.5, scaleY: 1.5 }, timer - 2000)
                    .to({ scaleX: 1.8, scaleY: 1.8 }, 300)
                    .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                    .call(() => {
                        egret.Tween.removeTweens(this.payout);
                        res();
                    });
            });
        }
        /**喷银币*/
        private spurtCoin(timer: number, num: number): Promise<{}> {
            return new Promise((res, rej) => {
                let texture = RES.getRes("jinbi_png");
                let cfg = RES.getRes("particleCoin_json");
                cfg.maxParticles = num;
                this.theParticle = new particle.GravityParticleSystem(texture, cfg);
                this.payoutGroup.addChild(this.theParticle);
                this.theParticle.emitterX = 950;
                this.theParticle.emitterY = 860;
                this.theParticle.start();
                let timeOut;
                timeOut && clearTimeout(timeOut);
                timeOut = setTimeout(() => {
                    this.theParticle && this.theParticle.stop();
                    this.theParticle.parent.removeChild(this.theParticle);
                    this.theParticle = null;
                    clearTimeout(timeOut);
                    res();
                }, timer);
            });
        }
    }
}