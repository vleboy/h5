class LoadingUI extends eui.Component{
	private progressTxt: eui.Label;
	private progressBar: eui.Rect;
	public constructor() {
		super();
	}
	public createView(){
		return new Promise((resolve, reject)=>{
			let loader:egret.URLLoader = new egret.URLLoader();
			//设置加载方式为纹理
			loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
			loader.once(egret.Event.COMPLETE, (e:egret.Event)=>{
				let bg = new eui.Image(e.target.data);
				bg.percentWidth = 100;
				bg.percentHeight = 100;
				this.addChild(bg);

				this.progressTxt = new eui.Label();
				this.progressTxt.horizontalCenter = 0;
				this.progressTxt.bottom = 150;
				this.addChild(this.progressTxt);

				let rect = new eui.Rect();
				rect.width = 100;
				rect.height = 20;
				rect.bottom = 100;
				rect.fillColor = 0xe56e6e;
				this.addChild(rect);

				this.progressBar = new eui.Rect();
				this.progressBar.fillColor = 0xfc0000;
				this.progressBar.height = 20;
				this.progressBar.bottom = 100;
				this.addChild(this.progressBar);

				resolve();
			}, this);
			loader.load(new egret.URLRequest("resource/res/loading.jpg"));
		});
	}
	private reset(){
		this.progressTxt.text = "Loading...0%";
		this.progressBar.percentWidth = 0;
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
