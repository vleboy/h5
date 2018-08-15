module game {
	export class MediatorManager {
		/**打开过的mediator对象池 */
		private static mediatorDic: Dictionary = new Dictionary();
		/**打开某个游戏的mediator */
		public static openMediator(m: MediatorClass, data: any = null): void {
			console.log("MediatorManager openMediator " + m.name);
			var name = m.name;
			let layer = m.layer;
			this.startMediator(name, data, layer);
		}

		
		/**检查这个游戏的图片资源加载了没 */
		private static checkResLoad(resGroup: string, soundGroup: string, name: string, data: any = null, layer: number) {
		}
		
		
		/**检查这个游戏的音效资源加载了没 */
		private static checkSoundLoad(soundGroup: string, name: string, data: any = null, layer: number): void {
		}

		/**启用指定的mediator */
		private static startMediator(name: string, data: any = null, layer: number): void {
			var mediator: BaseMediator = this.mediatorDic.getValue(name);
			if (mediator && mediator.isStart) mediator.dispose();

			if(layer == LayerConst.LAYER_UI){
				this.mediatorDic.getAllKey().forEach((key:string)=>{
					let m: BaseMediator = this.mediatorDic.getValue(key);
					if(m.layer == LayerConst.LAYER_UI) {
						this.mediatorDic.removeKey(key);
						m.dispose();
					}
				}, this);
			}

			if (!mediator) {
				var cls = egret.getDefinitionByName("game." + name);
				mediator = new cls();
				mediator.layer = layer;
				this.mediatorDic.setValue(name, mediator);
			}
			mediator.start(data);
		}
		
		/**停用指定的Mediator */
		public static closeMediator(name: string): void {
		}
		/** 判断某个mediator是否打开了 */
		public static isMediatorOpen(name: string): boolean {
			var m: BaseMediator = this.mediatorDic.getValue(name);
			if (m) {
				return m.isStart;
			}
			return false;
		}
		/**停用所有Mediator 当返回登录界面时需要这个*/
		public static closeAllMediator(): void {
			var arr: BaseMediator[] = this.mediatorDic.getAllValue();
			if (arr.length > 0) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i]) arr[i].dispose();
				}
			}
		}
		/**停用当前的UI层的mediator 在打开一个新的UI层Mediator时调用 */
		private static closeUIMediator(direction?: any): void {
			var keys: string[] = this.mediatorDic.getAllKey();
			if (keys.length > 0) {
				for (var i = 0; i < keys.length; i++) {
					var name = keys[i];
					var m: BaseMediator = this.mediatorDic.getValue(name);
					// if (m && m.isStart && m.ui && m.ui.layer == enums.LayerConst.LAYER_UI) {
					// 	m.dispose();
					// }
				}
			}
		}
	}
}