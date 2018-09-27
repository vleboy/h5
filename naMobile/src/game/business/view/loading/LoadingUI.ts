module game {
	export class LoadingUI extends BaseUI{
		private static _instance: LoadingUI;
		private progressTxt: eui.Label;
		private progressBar: eui.Image;
		private constructor() {
			super();
			this.skinName = GlobalConfig.skinPath + "loadingSkin.exml";
		}
		public initSetting(){
		}
		public initData(){
			this.reset();
		}
		private reset(){
			this.progressTxt.text = "Loading...0%";
			this.progressBar.percentWidth = 0;
		}
		public static getInstance():LoadingUI{
			!this._instance && (this._instance= new LoadingUI());
			return this._instance;
		}

		public onProgress(current: number, total: number): void {
			this.progressTxt.text = `Loading...${Math.floor(current/total*100)}%`;
			this.progressBar.percentWidth = Math.floor(current/total*100);
		}

		public show(b:boolean){
			this.visible = b;
			if(b){
				this.reset();
			}
		}

	}
}