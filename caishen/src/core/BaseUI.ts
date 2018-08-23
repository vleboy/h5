module game {
    export abstract class BaseUI extends eui.Component {
        private eventDic: Dictionary;
        public constructor() {
            super();
            this.eventDic = new Dictionary();
            this.once(egret.Event.COMPLETE, () => {
                console.log("egret.Event.COMPLETE" + egret.getQualifiedClassName(this));
                this.initSetting();
                this.onStageResize();
            }, this);
        }

        public abstract initSetting();

        public onStageResize(): void {
        }
        /**
         * 事件注册，所有事件的注册都需要走这里
         */
        protected registerEvent(target: egret.EventDispatcher, type: string, callBack: Function, thisObject: any): void {
            var eventParams: any = {};
            eventParams.target = target;
            eventParams.type = type;
            eventParams.callBack = callBack;
            eventParams.thisObject = thisObject;
            if (target) {
                target.addEventListener(type, callBack, thisObject);
                this.eventDic.setValue(target.hashCode + type, eventParams);
            }
        }
        /**
         * 统一移除所有事件
         */
        protected removeAllEvent(): void {
            var eventList: Array<any> = this.eventDic.getAllValue();
            while (eventList.length > 0) {
                var tempEvent: any = eventList.shift();
                if (tempEvent.target != null) {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        }
        /**发送通知*/
        protected sendNotify(key: NotifyConst, body?): void { NotifyManager.getInstance().sendNotify(key, body); }
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void {
            this.removeAllEvent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}