module game {
    export class ErrTip extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "errSkin.exml";
        }
        private errTxt:eui.Label;
        private cancelBtn:eui.Button;
        private suerBtn:eui.Button;

        private cancelBack:Function;
        private sureBack:Function;
        public init() {
            this.registerEvent(this.suerBtn, egret.TouchEvent.TOUCH_TAP, ()=>{
                this.sureBack && this.sureBack.call(this);
                this.sureBack = null;
            }, this);
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, ()=>{
                this.cancelBack && this.cancelBack.call(this);
                this.cancelBack = null;
            }, this);
            this.visible = false;
        }
        public showErr(txt:string,cancelBack:Function,sureBack:Function): void {
            this.visible = true;
            this.errTxt.text = txt;
            this.cancelBack = cancelBack;
            this.sureBack = sureBack;
        }
    }
}