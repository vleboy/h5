module game {
    export class BigWin extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "bigWinSkin.exml";
        }
        /**元宝Group*/
        private yuanbaoGroup: eui.Group;

        private theParticle: particle.GravityParticleSystem;
        public init(): void {

        }
        public bigWinStart(type: string, money: number): void {
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
                    num = 150;
                    timer = 30;
                    break;
            }
            this.yuanbao(type);
            let _helf = this;
            let timeOut, interval;
            timeOut && clearTimeout(timeOut);
            interval && clearInterval(interval);
            timeOut = setTimeout(() => {
                _helf.theParticle && _helf.theParticle.stop();
                interval && clearInterval(interval);
            }, timer * 1000);
            let particlesNum: number = 30;
            interval = setInterval(() => {
                particlesNum += (num - particlesNum) / (timer * 1000 / 500);
                _helf.theParticle && (_helf.theParticle.maxParticles = particlesNum);
            }, 500);
        }
        /**喷元宝*/
        private yuanbao(type: string): void {
            let texture = RES.getRes("yigeyuanb_png");
            let cfg = RES.getRes("particle_yuanbao_json");
            this.theParticle = new particle.GravityParticleSystem(texture, cfg);
            this.yuanbaoGroup.addChild(this.theParticle);
            this.theParticle.start();
        }
        /**派彩*/
        private payOut(mon: number,totalTimer:number): void {
        
        }
    }
}