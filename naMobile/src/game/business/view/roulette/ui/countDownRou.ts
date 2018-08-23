module game {
    export class countDownRou extends eui.Component {
        //------------------变量区--------------------
        /**倒计时背景*/
        private timerBg: eui.Image;
        /**倒计时状态*/
        private timerState: eui.Label;
        /**倒计时框*/
        private timer: eui.Group;
        /**倒计时时间*/
        private timerTxt: eui.Label;

        
        public constructor() {
            super();
            //引用皮肤
            this.skinName = GlobalConfig.skinPath + "countDownRouSkin.exml";
            this.initSetting();
        }
        /**对象创建完成后执行 */
        private initSetting() {
            this.defaultData();
            this.theTimerState(false);
        }
        /**默认数据*/
        private defaultData(): void {

        }
        /**倒计时状态
         * @param isBet 是不是下注状态
        */
        private theTimerState(isBet: boolean): void {

        }
    }
}