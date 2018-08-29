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
        public init(): void {

        }
        public bigWinStart(type: string, money: number): void {
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
                    num = 150;
                    timer = 30;
                    sou = "SuperWin_png";
                    break;
            }
            this.yuanbao(type);
            this.cancelYuanbao(timer, num);
            this.payOut(money, timer);
            this.bigWinLight();
            this.winTxtAni(sou);
            SoundPlayer.playMusic("CaiShen_243_BigWin_mp3");
        }
        /**喷元宝*/
        private yuanbao(type: string): void {
            let texture = RES.getRes("yigeyuanb_png");
            let cfg = RES.getRes("particle_yuanbao_json");
            this.theParticle = new particle.GravityParticleSystem(texture, cfg);
            this.yuanbaoGroup.addChild(this.theParticle);
            this.theParticle.start();
        }
        /**结束喷元宝*/
        private cancelYuanbao(timer: number, num: number): void {
            let _helf = this;
            let timeOut, interval;
            timeOut && clearTimeout(timeOut);
            interval && clearInterval(interval);
            timeOut = setTimeout(() => {
                _helf.theParticle && _helf.theParticle.stop();
                interval && clearInterval(interval);
                _helf.visible = false;
                SoundPlayer.playMusic("CaiShen_243_normalGame_mp3");
            }, timer * 1000);
            let particlesNum: number = 30;
            interval = setInterval(() => {
                particlesNum += (num - particlesNum) / (timer * 1000 / 500);
                _helf.theParticle && (_helf.theParticle.maxParticles = particlesNum);
            }, 500);
        }
        /**派彩*/
        private payOut(mon: number, totalTimer: number): void {
            let interval, theMon: number = 0, newMon: number = 0;
            let intervalTime: number = (totalTimer - 2) * 1000;
            let changeMon: number = Math.round(mon * 100 / intervalTime);
            if (interval) clearInterval(interval);
            egret.Tween.removeTweens(this.payout);
            interval = setInterval(() => {
                newMon += changeMon;
                theMon = newMon / 100;
                if (theMon >= mon) {
                    theMon = mon;
                    clearInterval(interval);
                }
                let strMon: string = "" + theMon;
                let strArr: string[] = strMon.split(".");
                if (strArr.length > 1) {
                    if (strArr[1].length == 1) { strMon += "0" };
                } else {
                    strMon += ".00";
                }
                this.payout.text = strMon;
            }, 1);
            this.payout.scaleX = 0.5;
            this.payout.scaleY = 0.5;
            egret.Tween.get(this.payout)
                .to({ scaleX: 1, scaleY: 1 }, intervalTime)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 500)
                .call(() => {
                    egret.Tween.removeTweens(this.payout);
                    if (interval) clearInterval(interval);
                    this.payout.text = mon + "";
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
                let ranX:number = 200 - Math.floor(Math.random()) * 400;
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