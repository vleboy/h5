module game {
    export class BigWin extends BaseUI {
        private particleGroup1: eui.Group;
        private particleGroup2: eui.Group;
        private particle1: particle.GravityParticleSystem;
        private particle2: particle.GravityParticleSystem;
        private particle3: particle.GravityParticleSystem;
        private particle4: particle.GravityParticleSystem;
        private img1: eui.Image;
        private img2: eui.Image;
        private winTxt: eui.BitmapLabel;
        private winImg:  eui.Image;
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "bigWinSkin.exml";
        }
       
        public init(): void {
            this.visible = false;

            this.particle1 = new particle.GravityParticleSystem(RES.getRes("fx_guang_07_png"), RES.getRes("fx_guang_07_json"));
            this.particle2 = new particle.GravityParticleSystem(RES.getRes("yuanbao_01_png"), RES.getRes("yuanbao_01_json"));
            this.particle3 = new particle.GravityParticleSystem(RES.getRes("fx_golwe_png"), RES.getRes("fx_golwe_json"));
            this.particle4 = new particle.GravityParticleSystem(RES.getRes("fx_guang_00001_png"), RES.getRes("fx_guang_00001_json"));
            this.particleGroup1.addChild(this.particle1);
            this.particleGroup2.addChild(this.particle2);
            this.particleGroup2.addChild(this.particle3);
            this.particleGroup2.addChild(this.particle4);
            this.particle1.blendMode = egret.BlendMode.ADD;
            // this.particle2.blendMode = egret.BlendMode.ADD;
            this.particle3.blendMode = egret.BlendMode.ADD;
            this.particle4.blendMode = egret.BlendMode.ADD;
            this.particle1.emitterX = this.particle2.emitterX = this.particle3.emitterX = this.particle4.emitterX = 960;
            this.particle1.emitterY = this.particle2.emitterY = this.particle3.emitterY = this.particle4.emitterY = 540;
        }
        public bigWinStart(type: string, money: number) {
            return new Promise((resolve, reject)=>{
                
                let time = 10000;
                switch(type){
                    case "big":
                        this.winImg.source = "bigwin_png";
                        this.particle4.visible = false;
                        this.particle2.emissionRate = 40;
                        break;
                    case "mega":
                        time=20000;
                        this.winImg.source = "bigwin_png";
                        this.particle4.visible = false;
                        this.particle2.emissionRate = 40;
                        setTimeout(()=> {
                            egret.Tween.get(this.winImg)
                                .set({scaleX:4, scaleY:4, source:"megawin_png"})
                                .to({scaleX:1, scaleY:1}, 200)
                                .call(()=>{
                                    egret.Tween.removeTweens(this.winImg);
                                })
                            this.particle4.visible = true;
                            this.particle2.emissionRate = 20;
                        }, 10000);
                        break;
                    case "super":
                        time=30000;
                        this.winImg.source = "bigwin_png";
                        this.particle4.visible = false;
                        this.particle2.emissionRate = 40;
                        setTimeout(()=> {
                            egret.Tween.get(this.winImg)
                                .set({scaleX:4, scaleY:4, source:"megawin_png"})
                                .to({scaleX:1, scaleY:1}, 200)
                                .call(()=>{
                                    egret.Tween.removeTweens(this.winImg);
                                })
                            this.particle4.visible = true;
                            this.particle2.emissionRate = 20;
                        }, 10000);
                        setTimeout(()=> {
                            egret.Tween.get(this.winImg)
                                .set({scaleX:4, scaleY:4, source:"superwin_png"})
                                .to({scaleX:1, scaleY:1}, 200)
                                .call(()=>{
                                    egret.Tween.removeTweens(this.winImg);
                                })
                            this.particle2.emissionRate = 10;
                        }, 20000);
                        break;
                }

                this.visible = true;
                egret.Tween.get(this.winImg)
                    .set({scaleX:4, scaleY:4})
                    .to({scaleX:1, scaleY:1}, 200)
                    .call(()=>{
                        egret.Tween.removeTweens(this.winImg);
                    })
                egret.Tween.get(this.img1, {loop: true})
                    .set({rotation:0})
                    .to({rotation:360}, 30000)
                egret.Tween.get(this.img2)
                    .set({alpha:0})
                    .to({alpha:1}, 200)
                    .call(()=>{
                        egret.Tween.removeTweens(this.img2);
                    })
                this.particle1.start();
                this.particle2.start();
                this.particle3.start();
                this.particle4.start();
                
                this.winTxt["value"] = 0;
                egret.Tween.get(this.winTxt, {onChange:()=>{this.winTxt.text = this.winTxt["value"].toFixed(2);}, onChangeObj:this})
                    .to({value:money}, time)
                    .call(()=>{
                        this.particle1.stop();
                        this.particle2.stop();
                        this.particle3.stop();
                        this.particle4.stop();
                        resolve();
                    })
                    .wait(2000)
                    .call(()=>{
                        egret.Tween.removeTweens(this.winTxt);
                        egret.Tween.removeTweens(this.img1);
                        this.visible = false;
                        resolve();
                    })
            })
        }
    }
}