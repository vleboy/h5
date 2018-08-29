module game {
    export class ErrTip extends eui.Component {
        public constructor(txt: string, sureBack: Function,thisObject:any) {
            super();
            this.skinName = GlobalConfig.skinPath + "errSkin.exml";
            this.errTxt.text = txt;
            this.visible = true;
            this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                sureBack && sureBack.call(thisObject);
                this.visible = false;
                this.parent.removeChild(this);
            }, this);
        }
        private errTxt: eui.Label;
        private sureBtn: eui.Button;
    }
}