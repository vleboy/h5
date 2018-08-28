module game {
    export class BigWin extends BaseUI {
        public constructor() {
            super();
            this.skinName = GlobalConfig.skinPath + "bigWinSkin.exml";
        }
        private yuanbaoGroup:eui.Group;
        public init(): void {
            this.yuanbao();
        }
        //喷元宝
        private yuanbao(): void {
            
        }
    }
}