module game {
    export class ErrTip extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "errSkin.exml";
        }
        private errTxt:eui.Label;
        private sureBtn:eui.Button;
        private sureBack:Function;
        public init() {
            this.registerEvent(this.sureBtn, egret.TouchEvent.TOUCH_TAP, ()=>{
                this.sureBack && this.sureBack.call(this);
                this.sureBack = null;
                this.visible = false;
            }, this);
            this.visible = false;
        }
        public showErr(txt:string,sureBack:Function): void {
            this.visible = true;
            this.errTxt.text = txt;
            this.sureBack = sureBack;
        }
    }
}