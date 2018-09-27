module game {
	export class AMovieClip extends eui.Image{
		/**帧图数组 */
		private imgs:Array<string> = [];
		/**当前帧 */
		private currentFrame: number = 0;
		/**是否循环播放 默认-1 循环 */
		public loop:number = -1;
		/**播放速度 值越大播放越慢 */
		public speed: number = 5;
		/**计数器 */
		private _flag:number = 0;
		/**结束事件 */
		public static COMPLETE:string = "loopComplete";

		public constructor() {
			super();

		}



		/** 开始播放 */
		public play()
		{
			this.currentFrame = 0;
			this.source = this.imgs[this.currentFrame];
			this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		}
		/**停止播放 */
		public stop()
		{
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		}
		private onFrame()
		{
			this._flag++;
			if(this._flag >= this.speed)
			{
				this.nextFrame();
				this._flag = 0;
			}
		}
		/**播下一帧 */
		private nextFrame()
		{
			this.currentFrame++;
			if(this.currentFrame == this.imgs.length)
			{
				this.loop--;
				if(this.loop==0)
				{
					this.dispatchEventWith(AMovieClip.COMPLETE);
					this.stop();
					return;
				}
				else
				{
					this.currentFrame = 0;
				}
			}
			this.source = this.imgs[this.currentFrame];
		}

		/**
		 * 设置图片数组 例如 'a0_png'到'a10_png' 那么设置为格式为 'a|0-10|_png'
		 * 兼容'a|01-30|_png' 这种01开头的
		*/
		public set sources(str: any)
		{
			if(!str) return;
			var arr = str.split("|");
			var numArr: string = arr[1].split("-");
			var start: number = parseInt(numArr[0]);
			var end: number = parseInt(numArr[1]);
			var havePre = (numArr[0].length==2 && numArr[0].charAt(0)=="0");

			this.imgs = [];
			for(var i:number=start; i<=end; i++)
			{
				let pre = (havePre&&i<10) ? "0" : "";
				this.imgs.push(arr[0]+pre+i+arr[2]);
			}
		}
	}
}