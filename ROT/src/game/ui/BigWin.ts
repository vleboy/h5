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

        private theParticle: particle.GravityParticleSystem;
        private winNum: number = 0;

        private winChannel: egret.SoundChannel;
        /**展示的时间数组*/
        private showTime: number[];
        public init(): void {
            this.visible = false;
            this.showTime = [10000, 20000, 30000];
        }
        public bigWinStart(type: string, money: number) {
            this.visible = true;
            //喷元宝的时间
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
            this.winChannel = SoundPlayer.playEffect("CaiShen_243_BigWin_mp3");
            return new Promise((res, rej) => {
                    this.boomAni().then(()=>{
                        Promise.all([this.payOut(money, timer), this.winTxtAni(type)]).then(() => {
                            if (this.winChannel) this.winChannel.stop();
                            res();
                        });
                    })
                });;
        }
        /**boom动画*/
        private boomAni(): Promise<{}> {
            return new Promise((res, rej) => {
                    //boom显示
                let booShow = (isBo: boolean = true) => {
                    this.payoutGroup.visible = !isBo;
                    this.boomLight.visible = isBo;
                    this.winLight.visible = !isBo;
                };
                booShow();
                this.boomLight.play();
                this.boomLight.once(AMovieClip.COMPLETE, () => {
                    booShow(false);
                    this.winLight.play();
                    res();
                }, this);
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
                        .call(() => egret.Tween.removeTweens(this.winImg));
                }
                txtAni("bigWin_png");
                // switch (type) {
                //     case "big":
                //         txtAni("BigWin_png").then(() => res());
                //         break;
                //     case "mega":
                //         txtAni("megaWin_png").then(() => {

                //         });
                //         break;
                //     case "superWin_png":
                //         txtAni("BigWin_png").then(() => res());
                //         break;
                // }
            });
        }
        /**派彩*/
        private payOut(mon: number, timer: number) {
            this.winNum = 0;
            return new Promise((res, rej) => {
                egret.Tween.get(this, { onChange: () => { this.payout.text = this.winNum.toFixed(2) }, onChangeObj: this })
                    .to({ winNum: mon }, timer - 2000).call(() => {
                        egret.Tween.removeTweens(this);
                        SoundPlayer.playEffect("CaiShen_243_BigWinOver_mp3");
                        egret.Tween.get(this.payout)
                            .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                            .to({ scaleX: 1, scaleY: 1 }, 300)
                            .call(() => {
                                egret.Tween.removeTweens(this.payout);
                                res();
                            });
                    });
            });

        }
    }
}