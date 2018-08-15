module game {
	export abstract class BaseUI extends eui.Component{
        private eventDic: Dictionary;
		public constructor(m?: BaseMediator) {
			super();
            this.eventDic = new Dictionary();
            this.once(egret.Event.COMPLETE, ()=>{
                console.log("egret.Event.COMPLETE"+egret.getQualifiedClassName(this),m);
                this.initSetting();
                this.onStageResize();
                m && m.initData();
            }, this);
		}

        public abstract initSetting();
		
        public onStageResize(): void {
            if (GlobalConfig.isMobile) {
                this.width = StageUtil.width;
                this.height = StageUtil.height;
            } else {
                var stageW = StageUtil.width,
                    stageH = StageUtil.height;
                this.scaleX = stageW / LayerManager.DesignWidth;
                this.scaleY = stageH / LayerManager.DesignHeight;
            }
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
        /** 收到mediator的通知，每个UI要复写这个方法 * */
        public onMediatorCommand(type: any, params: any = null): void {

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
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void {
            this.removeAllEvent();
            if (this.parent) {
                UIManager.closeUI(this)
            }
        }
	}
}