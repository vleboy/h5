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
        private win: number = 0;
        private num: number = 0;
        public init(): void {
            this.visible = false;
        }
        public bigWinStart(type: string, money: number): number {
            this.visible = true;
            //元宝数和喷元宝的时间
            let num: number = 50, timer: number = 10;
            let sou: string = "BigWin_png";
            switch (type) {
                case "big":
                    num = 50;
                    timer = 10;
                    sou = "BigWin_png";
                    break;
                case "mega":
                    num = 100;
                    timer = 20;
                    sou = "MegaWin_png";
                    break;
                case "super":
                    num = 200;
                    timer = 30;
                    sou = "SuperWin_png";
                    break;
            }
            this.yuanbao(timer, num);
            this.payOut(money, timer);
            this.bigWinLight();
            this.winTxtAni(sou);
            SoundPlayer.playMusic("CaiShen_243_BigWin_mp3");
            return timer;
        }
        /**喷元宝
         * @param timer 喷元宝时间
         * @param num 喷元宝数量
        */
        private yuanbao(timer: number, num: number): void {
            let texture = RES.getRes("yigeyuanb_png");
            let cfg = RES.getRes("particle_yuanbao_json");
            this.theParticle = new particle.GravityParticleSystem(texture, cfg);
            this.yuanbaoGroup.addChild(this.theParticle);
            this.theParticle.maxParticles = num;
            this.theParticle.start();

            let timeOut;
            timeOut && clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                this.theParticle && this.theParticle.stop();
                this.visible = false;
                this.theParticle.parent.removeChild(this.theParticle);
                SoundPlayer.playMusic("CaiShen_243_normalGame_mp3");
            }, timer * 1000);

            // let particlesNum: number = 30;
            // interval = setInterval(() => {
            //     particlesNum += Math.ceil((num - particlesNum) / (timer * 1000 / 500));
            //     this.theParticle && (this.theParticle.maxParticles = 150);
            // }, 200);
        }
        /**派彩*/
        private payOut(mon: number, timer: number): void {
            this.win = mon;
            egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this })
                .to({ num: mon }, timer * 1000 - 2000).call(this.theStop);
        }
        private onChange(): void {
            this.payout.text = this.num.toFixed(2);
        }
        private theStop(): void {
            egret.Tween.removeTweens(this);
            this.payout.text = "" + this.win;
            egret.Tween.get(this.payout)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                .to({ scaleX: 1, scaleY: 1 }, 300)
                .call(() => {
                    egret.Tween.removeTweens(this.payout);
                    this.fireworks();
                    SoundPlayer.playMusic("CaiShen_243_BigWinOver_mp3");
                });
        }

        /**light*/
        private bigWinLight(): void {
            this.light.sources = "bigwinLight|1-25|_png";
            this.light.play();
        }

        /**winTxtAni*/
        private winTxtAni(sou: string): void {
            this.winImg.source = sou;
            egret.Tween.get(this.winImg)
                .to({ scaleX: 5, scaleY: 5 }, 200)
                .to({ scaleX: 1, scaleY: 1 }, 200)
                .call(() => {
                    egret.Tween.removeTweens(this.winImg);
                });
        }

        /**喷烟花*/
        private fireworks(): void {
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
            }, 80);
        }
    }
}