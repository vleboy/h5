module game {
    export class Err extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "errSkin.exml";
        }
        private suerBtn:eui.Button;
        public init() {
            this.registerEvent(this.suerBtn, egret.TouchEvent.TOUCH_TAP, ()=>{
                this.visible = false;
            }, this);
            this.visible = false;
        }
        public showErr(txt:string): void {
            this.visible = true;
        }
    }
}