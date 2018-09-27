module game {
    export class SoundPlayer {
        private static effectArr: egret.SoundChannel[] = [];
        private static musicChannel: egret.SoundChannel;
        /**关闭背景音乐*/
        public static closeMusic(isClose: boolean = true) {
            GlobalConfig.musicSwitch = !isClose;
            if(isClose && this.musicChannel) {
                this.musicChannel.stop();
                this.musicChannel = null;
            }
        }
        /**关闭音效*/
        public static closeEffect(isClose: boolean = true) {
            GlobalConfig.effectSwitch = !isClose;
            if (isClose) { 
                this.effectArr.forEach(v => v.stop()); 
                this.effectArr = [];
            }
        }
        /**播放某一个音效*/
        public static playEffect(name: string, count:number=1) :egret.SoundChannel{
            // console.log("playeffect "+name);
            // if (GlobalConfig.effectSwitch) {
            //     let channel: egret.SoundChannel = RES.getRes(name).play(0, count);
            //     this.effectArr.push(channel);
            //     channel.addEventListener(egret.Event.SOUND_COMPLETE, () => {
            //         let newArr: egret.SoundChannel[] = [];
            //         this.effectArr.forEach(v => { !v["isStopped"] && newArr.push(v); });
            //         this.effectArr = newArr;
            //     }, this);
            //     return channel;
            // }
            return null;
        }
        /**播放某一个背景音乐*/
        public static playMusic(name: string) {
            if (GlobalConfig.musicSwitch) {
                if (this.musicChannel) this.musicChannel.stop();
                this.musicChannel = RES.getRes(name).play(0);
            }
        }

    }
}
