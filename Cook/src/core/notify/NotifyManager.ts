module game {
	export class NotifyManager {
		private static _instance: NotifyManager;
		/**通知对象池， key是通知名 value是注册这个通知的对象数组 */
		private pool:any;
		private constructor() {
			this.pool = {};
		}

		public static getInstance(){
			return this._instance ? this._instance : (this._instance=new NotifyManager());
		}

		/**给这个对象注册通知 */
		public addRegister(obj:any, keys:NotifyConst[]){
			if(keys && keys.length>0){
				keys.forEach(key=>{
					if(!this.pool[key]) this.pool[key]=[];
					if(this.pool[key].indexOf(obj)<0) this.pool[key].push(obj);
				});
			}
		}

		public sendNotify(key:NotifyConst, body?){
			let objs:any[] = this.pool[key];
			objs && objs.forEach((obj:INotify)=>{
				obj.handleNotify(key, body);
			})
		}

		public removeRegister(obj){
			this.pool.keys.forEach(key=>{
				let index = this.pool[key].indexOf(obj);
				index>-1 && this.pool[key].splice(index,1);
				this.pool[key].length==0 && delete this.pool[key];
			})
		}


	}
}