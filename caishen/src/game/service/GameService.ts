module game {
		export class GameService {
		private static _instance: GameService;
		private constructor() {
		}
		public static getInstance(){
			return this._instance ? this._instance : (this._instance=new GameService());
		}
		/**游戏初始数据 */
		public initData:LoginVO;
		/**登录游戏 */
		public login(){
			return new Promise(async (resolve, reject)=>{
				try{
					window["isDebug"] && await DefaultUser.getInstance().login();
					this.requestInitData().then((resp:LoginVO)=>{
						this.initData = resp;
						resolve();
					});
				}
				catch(e){
					reject();
				}
				
			});
			
		}
		/**请求游戏初始数据 */
		private requestInitData(){
			return new Promise((resolve, reject)=>{
				HttpUtil.sendRequest("POST",  
					'https://4oi868q8qh.execute-api.ap-southeast-1.amazonaws.com/N243/games/42001/authuser', 
					'{"GameUserID":'+GlobalConfig.gameUserID+',"VerifyCode":'+GlobalConfig.verifyCode+'}')
				.then(resolve)
				.catch(reject);
			})
		}
		/**下注 */
		public sendSpin(betLevel:number, hotkey?: string){
			return new Promise((resolve, reject)=>{
				HttpUtil.sendRequest("POST",  
					'https://4oi868q8qh.execute-api.ap-southeast-1.amazonaws.com/N243/games/42001/spin'+(hotkey?("?"+hotkey):""), 
					'{"betLevel":'+betLevel+',"multiLevel":0}',
					{Authorization: 'Bearer ' + this.initData.payload.token})
				.then(resolve)
				.catch(reject);
			})
		}
	}
}