class LoadingUI extends eui.Component {
	public constructor() {
		super();
	}
	private progressTxt: eui.Label;
	private group: eui.Group;
	private interval;
	public createView() {
		let urlArr = [
			{url: "resource/res/load/loading.jpg", texture: null},
			{ url: "resource/res/load/bar2.png", texture: null },
			{ url: "resource/res/load/bar1.png", texture: null },
			{ url: "resource/res/load/light.png", texture: null }
		];
		let promiseArr = [];
		urlArr.forEach(v => {
			promiseArr.push(new Promise((resolve, reject) => {
				let loadImg: egret.ImageLoader = new egret.ImageLoader();
				loadImg.once(egret.Event.COMPLETE, (e: egret.Event) => {
					let texture = new egret.Texture;
					texture.bitmapData = e.target.data;
					v.texture = texture;
					resolve();
				}, this);
				loadImg.load(v.url);
			}));
		})

		let createImg = (texture:egret.Texture, parent:egret.DisplayObjectContainer, hor:number, ver:number, w?:number, h?:number)=>{
			let img = new eui.Image(texture);
			parent.addChild(img);
			img.horizontalCenter = hor;
			img.verticalCenter = ver;
			w && (img.width = w);
			w && (img.height = h);
			return img;
		}

		return Promise.all(promiseArr).then(() => {
			createImg(urlArr[0].texture, this, 0, 0);
			createImg(urlArr[1].texture, this, 0, 325);
			this.addChild(this.group = new eui.Group());
			this.group.left = -534;
			this.group.bottom = 205;
			this.group.width = 996;
			this.group.height = 20;
			createImg(urlArr[2].texture, this.group, 0, 0);
			createImg(urlArr[3].texture, this.group, 423, 0);
			let rect = new eui.Rect;
			rect.fillColor = 0x000000;
			rect.left = 462;
			rect.bottom = 205;
			rect.width = 996;
			rect.height = 20;
			this.addChild(rect);
			this.group.mask = rect;

			///label
			this.progressTxt = new eui.Label();
			this.progressTxt.horizontalCenter = 0;
			this.progressTxt.verticalCenter = 277;
			this.progressTxt.text = "Loading...";
			this.progressTxt.textColor = 0xa59153;
			this.progressTxt.textAlign = "left";
			this.progressTxt.verticalAlign = "middle";
			this.progressTxt.size = 45;
			this.addChild(this.progressTxt);
		});
	}
	/**进度条*/
	public onProgress(current: number, total: number): void {
		let per: number = current / total;
		let w: number = Math.floor(per * 996);
		this.group.left = -534 + w;
		if (this.interval) {
			if (per >= 1) {
				clearInterval(this.interval);
				return;
			};
			return;
		}
		let arr: string[] = ["Loading", "Loading.", "Loading..", "Loading..."], num: number = 0;
		console.warn("do")
		this.interval = setInterval(v => {
			this.progressTxt.text = arr[num];
			num >= 3 ? num = 0 : num++;
		}, 200);
	}
}
