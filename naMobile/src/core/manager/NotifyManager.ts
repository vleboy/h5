module game {
	export class NotifyManager {
        private static instance: NotifyManager;
        private constructor() {
            this.ObjDic = new Object();
            this.typeDic = new Object();
        }
        public static getInstance(): NotifyManager {
            if (this.instance == null) {
                this.instance = new NotifyManager();
            }
            return this.instance;
        }

		/**
         * 对象字典
         * key 对象名字，string
         * value 对象引用
         */
        private ObjDic: Object;

        /**
         * type字典
         * 一个type对应多个Obj，方便消息的派发
         * key 消息类型
         * value 对象名字，string
         */
        private typeDic: Object;
		

		 /**
         * 注册一个对象到通知队列中，他才可以接收通知
         * @param name {string} 类名
         * @param obj {Object} 对象
         */
        public addRegister(name:string, obj: Object): void {
            if (this.ObjDic[name]) {
                console.log("Notify repeat register:" + name);
            } else {
                this.ObjDic[name] = obj;
                // 配置type字典
                this.configurationType(name, obj);
            }
        }
		/**
         * 从通知队列中移除一个对象
         * @param name {string} 类名
         */
        public removeRegister(name: string): void {
            if (this.ObjDic[name]) {
                this.cleanType(name);
                delete this.ObjDic[name];
            }
        }


		/**
         * Mediator、Server之间指派事件
         * @param type 事件类型
         * @param body 事件数据
         * @param className 可选，如果className存在，则会派发给指定类
         */
        public sendNotify(type: number, body?: any, className?: string): void {
            let n: INotification;
            this.typeDic[type] && this.typeDic[type].forEach(name => {
                if (!className || className === name) {
                    n = <INotification>this.ObjDic[name];
                    n && n.handleNotification(type, body);
                }
            });
        }
		/**
		 * 配置type字典
         * @param name {string} 类名
         * @param obj {Object} 对象
		 */
        private configurationType(name: string, obj: Object): void {
            let n = <INotification>obj;
            n && n.listNotification().forEach(type => {
                if (this.typeDic[type]) {
                    this.typeDic[type].push(name); // 添加到末尾
                } else {
                    this.typeDic[type] = [name];
                }
            });
        }

        /**
         * 清除类型
         */
        private cleanType(name: string): void {
            let n = <INotification>this.ObjDic[name];
            if (n) {
                let list = n.listNotification();
                let arr: Array<string>;
				list.forEach((type)=>{
					arr = this.typeDic[type];
                    if (arr) {
                        let index = arr.indexOf(name);
                        if (index > -1) {
                            arr.splice(index, 1);
                            if (arr.length > 0) {
                                this.typeDic[type] = arr;
                            }
                            else {
                                arr = null;
                                this.typeDic[type] = null;
                                delete this.typeDic[type];
                            }
                        }
                    }
				})
            }
        }

	}
}